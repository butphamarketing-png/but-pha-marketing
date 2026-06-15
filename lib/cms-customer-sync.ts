import {
  db,
  customersTable,
  contractsTable,
  billingPeriodsTable,
} from "@/lib/cms-internal/db";
import { eq, and, sql } from "drizzle-orm";
import {
  type CustomerRecord,
  getPackageContractTotal,
  formatPackageDisplay,
  PLATFORM_SERVICES,
} from "@/lib/customer-records";
import {
  computeBillingPeriodStatus,
  formatPeriodLabel,
  inferBillingCycle,
  nextPeriodRange,
  refreshBillingPeriodPaid,
} from "@/lib/cms-billing-periods";
import {
  resolveBillingCycleFromRecord,
  syncRecognitionForPeriod,
} from "@/lib/cms-revenue-recognition";
import { syncAutoReceiptForBillingPeriod } from "@/lib/cms-sync-receipts";
import { syncAutoInvoiceForBillingPeriod } from "@/lib/cms-sync-invoices";
import { resolveServiceId, seedErpServicesFromMarketing } from "@/lib/cms-services";

export type CmsSyncResult = {
  customersCreated: number;
  customersUpdated: number;
  contractsCreated: number;
  contractsUpdated: number;
  periodsCreated: number;
  periodsUpdated: number;
  receiptsCreated: number;
  receiptsUpdated: number;
  receiptsRemoved: number;
  invoicesCreated: number;
  invoicesUpdated: number;
  invoicesIssued: number;
  invoicesCancelled: number;
  invoicesDraft: number;
  recognitionEntries: number;
  customersRemoved: number;
  skipped: number;
  errors: string[];
};

function customerDisplayName(record: CustomerRecord): string {
  if (record.customerType === "company" && record.establishmentName?.trim()) {
    return record.establishmentName.trim();
  }
  return record.fullName?.trim() || record.establishmentName?.trim() || "Khách hàng";
}

function customerNotes(record: CustomerRecord): string | null {
  const parts = [
    record.customerType === "company" ? "Loại: Công ty" : "Loại: Cá nhân",
    record.contactPerson?.trim() ? `Liên hệ: ${record.contactPerson.trim()}` : null,
    record.industry?.trim() ? `Ngành: ${record.industry.trim()}` : null,
    record.internalNotes?.trim() || null,
  ].filter(Boolean);
  return parts.length ? parts.join(" | ") : null;
}

function serviceLabel(platform: string, service: string): string {
  const group = PLATFORM_SERVICES[platform as keyof typeof PLATFORM_SERVICES];
  const match = group?.find((item) => item.key === service);
  return match?.label ?? service;
}

function contractNotes(record: CustomerRecord): string {
  const pkg = record.subscriptionPackage
    ? formatPackageDisplay(record.platform, record.service, record.subscriptionPackage)
    : "—";
  return [
    `Nền tảng: ${record.platform}`,
    `Dịch vụ: ${serviceLabel(record.platform, record.service)}`,
    `Gói: ${pkg}`,
    `MSHĐ marketing: ${record.contractCode}`,
  ].join(" | ");
}

function resolveContractTotal(record: CustomerRecord): number {
  const packageTotal = getPackageContractTotal(
    record.platform,
    record.service,
    record.subscriptionPackage,
  );
  if (packageTotal !== null) return packageTotal;
  return Math.max(0, record.amountPaid) + Math.max(0, record.amountUnpaid);
}

function resolvePeriodDates(record: CustomerRecord): {
  periodStart: string;
  periodEnd: string;
  dueDate: string;
} | null {
  const today = new Date().toISOString().slice(0, 10);
  const periodStart = record.registeredAt || today;
  const periodEnd = record.expiresAt || record.registeredAt || today;
  if (!periodStart || !periodEnd) return null;
  return {
    periodStart,
    periodEnd,
    dueDate: periodStart,
  };
}

async function upsertCustomer(record: CustomerRecord): Promise<{ id: number; created: boolean }> {
  const [existing] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.externalId, record.id))
    .limit(1);

  const values = {
    name: customerDisplayName(record),
    phone: record.phone || null,
    email: record.email || null,
    taxId: record.customerType === "company" ? record.taxId || null : null,
    address: record.invoiceAddress?.trim() || null,
    externalId: record.id,
    customerType: record.customerType,
    contactPerson: record.contactPerson?.trim() || record.fullName?.trim() || null,
    invoiceAddress: record.invoiceAddress?.trim() || null,
    needsVatInvoice: record.customerType === "company" && record.needsVatInvoice,
    customerStatus: record.customerStatus || "active",
    notes: customerNotes(record),
    updatedAt: new Date(),
  };

  if (existing) {
    const [updated] = await db
      .update(customersTable)
      .set(values)
      .where(eq(customersTable.id, existing.id))
      .returning();
    return { id: updated.id, created: false };
  }

  const [created] = await db.insert(customersTable).values(values).returning();
  return { id: created.id, created: true };
}

async function upsertContract(
  record: CustomerRecord,
  customerId: number,
): Promise<{ id: number; created: boolean }> {
  const code = record.contractCode.trim();
  const [existing] = await db
    .select()
    .from(contractsTable)
    .where(eq(contractsTable.externalContractCode, code))
    .limit(1);

  const totalValue = resolveContractTotal(record);
  const startDate = record.registeredAt || new Date().toISOString().slice(0, 10);
  const billingCycle = resolveBillingCycleFromRecord(record);
  const serviceId = await resolveServiceId(record.platform, record.service);
  const values = {
    code,
    customerId,
    serviceId,
    totalValue: String(totalValue),
    paidAmount: String(Math.max(0, record.amountPaid)),
    status: "active" as const,
    startDate,
    endDate: record.expiresAt,
    dueDate: record.expiresAt,
    externalContractCode: code,
    billingCycle,
    notes: contractNotes(record),
    updatedAt: new Date(),
  };

  if (existing) {
    const [updated] = await db
      .update(contractsTable)
      .set(values)
      .where(eq(contractsTable.id, existing.id))
      .returning();
    return { id: updated.id, created: false };
  }

  const [created] = await db.insert(contractsTable).values(values).returning();
  return { id: created.id, created: true };
}

async function computeRenewalPaymentTarget(
  record: CustomerRecord,
  contractId: number,
  isNewPeriod: boolean,
): Promise<number | undefined> {
  if (!isNewPeriod) return undefined;

  const siblings = await db
    .select({ amountPaid: billingPeriodsTable.amountPaid })
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.contractId, contractId));

  if (siblings.length === 0) return undefined;

  const paidOnOtherPeriods = siblings.reduce(
    (sum, row) => sum + parseFloat(row.amountPaid ?? "0"),
    0,
  );
  return Math.max(0, Math.round((record.amountPaid - paidOnOtherPeriods) * 100) / 100);
}

async function upsertBillingPeriod(
  record: CustomerRecord,
  customerId: number,
  contractId: number,
): Promise<{
  id: number;
  created: boolean;
  updated: boolean;
  recognitionEntries: number;
  receiptsCreated: number;
  receiptsUpdated: number;
  receiptsRemoved: number;
  invoicesCreated: number;
  invoicesUpdated: number;
  invoicesIssued: number;
  invoicesCancelled: number;
  invoicesDraft: number;
  invoiceErrors: string[];
}> {
  const dates = resolvePeriodDates(record);
  if (!dates) {
    return {
      id: 0,
      created: false,
      updated: false,
      recognitionEntries: 0,
      receiptsCreated: 0,
      receiptsUpdated: 0,
      receiptsRemoved: 0,
      invoicesCreated: 0,
      invoicesUpdated: 0,
      invoicesIssued: 0,
      invoicesCancelled: 0,
      invoicesDraft: 0,
      invoiceErrors: [],
    };
  }

  const amountDue = resolveContractTotal(record);
  const label = formatPeriodLabel(dates.periodStart);

  const [existing] = await db
    .select()
    .from(billingPeriodsTable)
    .where(
      and(
        eq(billingPeriodsTable.contractId, contractId),
        eq(billingPeriodsTable.periodStart, dates.periodStart),
        eq(billingPeriodsTable.periodEnd, dates.periodEnd),
      ),
    )
    .limit(1);

  let periodId: number;
  let created = false;
  let updated = false;

  if (existing) {
    const existingPaid = parseFloat(existing.amountPaid ?? "0");
    const status = computeBillingPeriodStatus(existingPaid, amountDue, dates.dueDate);
    const [row] = await db
      .update(billingPeriodsTable)
      .set({
        contractId,
        customerId,
        periodStart: dates.periodStart,
        periodEnd: dates.periodEnd,
        dueDate: dates.dueDate,
        amountDue: String(amountDue),
        amountPaid: String(existingPaid),
        status,
        label,
        notes: `Đồng bộ từ admin (${record.contractCode})`,
        updatedAt: new Date(),
      })
      .where(eq(billingPeriodsTable.id, existing.id))
      .returning();
    periodId = row?.id ?? existing.id;
    updated = true;
  } else {
    const status = computeBillingPeriodStatus(0, amountDue, dates.dueDate);
    const [row] = await db
      .insert(billingPeriodsTable)
      .values({
        contractId,
        customerId,
        periodStart: dates.periodStart,
        periodEnd: dates.periodEnd,
        dueDate: dates.dueDate,
        amountDue: String(amountDue),
        amountPaid: "0",
        status,
        label,
        notes: `Đồng bộ từ admin (${record.contractCode}) — kỳ mới`,
      })
      .returning();
    periodId = row?.id ?? 0;
    created = true;
  }

  if (!periodId) {
    return {
      id: 0,
      created: false,
      updated: false,
      recognitionEntries: 0,
      receiptsCreated: 0,
      receiptsUpdated: 0,
      receiptsRemoved: 0,
      invoicesCreated: 0,
      invoicesUpdated: 0,
      invoicesIssued: 0,
      invoicesCancelled: 0,
      invoicesDraft: 0,
      invoiceErrors: [],
    };
  }

  const isNewPeriod = created;
  const paymentTarget = await computeRenewalPaymentTarget(record, contractId, isNewPeriod);

  const receiptSync = await syncAutoReceiptForBillingPeriod(
    record,
    customerId,
    contractId,
    periodId,
    paymentTarget,
  );
  await refreshBillingPeriodPaid(periodId);
  const invoiceSync = await syncAutoInvoiceForBillingPeriod(
    record,
    customerId,
    contractId,
    periodId,
    receiptSync.receiptId,
  );
  const recognitionEntries = await syncRecognitionForPeriod(periodId);

  return {
    id: periodId,
    created,
    updated,
    recognitionEntries,
    receiptsCreated: receiptSync.created,
    receiptsUpdated: receiptSync.updated,
    receiptsRemoved: receiptSync.removed,
    invoicesCreated: invoiceSync.created,
    invoicesUpdated: invoiceSync.updated,
    invoicesIssued: invoiceSync.issued,
    invoicesCancelled: invoiceSync.cancelled,
    invoicesDraft: invoiceSync.draft,
    invoiceErrors: invoiceSync.errors,
  };
}

export async function syncCustomerRecordsToCms(records: CustomerRecord[]): Promise<CmsSyncResult> {
  const result: CmsSyncResult = {
    customersCreated: 0,
    customersUpdated: 0,
    contractsCreated: 0,
    contractsUpdated: 0,
    periodsCreated: 0,
    periodsUpdated: 0,
    receiptsCreated: 0,
    receiptsUpdated: 0,
    receiptsRemoved: 0,
    invoicesCreated: 0,
    invoicesUpdated: 0,
    invoicesIssued: 0,
    invoicesCancelled: 0,
    invoicesDraft: 0,
    recognitionEntries: 0,
    customersRemoved: 0,
    skipped: 0,
    errors: [],
  };

  await seedErpServicesFromMarketing();

  for (const record of records) {
    try {
      if (!record.contractCode?.trim()) {
        result.skipped += 1;
        continue;
      }

      const customer = await upsertCustomer(record);
      if (customer.created) result.customersCreated += 1;
      else result.customersUpdated += 1;

      const contract = await upsertContract(record, customer.id);
      if (contract.created) result.contractsCreated += 1;
      else result.contractsUpdated += 1;

      const period = await upsertBillingPeriod(record, customer.id, contract.id);
      if (period.created) result.periodsCreated += 1;
      else if (period.updated) result.periodsUpdated += 1;
      result.receiptsCreated += period.receiptsCreated;
      result.receiptsUpdated += period.receiptsUpdated;
      result.receiptsRemoved += period.receiptsRemoved;
      result.invoicesCreated += period.invoicesCreated;
      result.invoicesUpdated += period.invoicesUpdated;
      result.invoicesIssued += period.invoicesIssued;
      result.invoicesCancelled += period.invoicesCancelled;
      result.invoicesDraft += period.invoicesDraft;
      result.recognitionEntries += period.recognitionEntries;
      result.errors.push(...period.invoiceErrors);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown sync error";
      result.errors.push(`${record.contractCode}: ${message}`);
    }
  }

  return result;
}

export async function renewBillingPeriod(periodId: number, amountDue?: number) {
  const [current] = await db
    .select()
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.id, periodId))
    .limit(1);

  if (!current) return null;

  const cycle = inferBillingCycle(current.periodStart, current.periodEnd);
  const range = nextPeriodRange(current.periodEnd, cycle);
  const dueAmount = amountDue ?? parseFloat(current.amountDue ?? "0");

  const [existing] = await db
    .select()
    .from(billingPeriodsTable)
    .where(
      and(
        eq(billingPeriodsTable.contractId, current.contractId),
        eq(billingPeriodsTable.periodStart, range.periodStart),
        eq(billingPeriodsTable.periodEnd, range.periodEnd),
      ),
    )
    .limit(1);

  if (existing) {
    await syncRecognitionForPeriod(existing.id);
    return existing;
  }

  const status = computeBillingPeriodStatus(0, dueAmount, range.dueDate);
  const [created] = await db
    .insert(billingPeriodsTable)
    .values({
      contractId: current.contractId,
      customerId: current.customerId,
      periodStart: range.periodStart,
      periodEnd: range.periodEnd,
      dueDate: range.dueDate,
      amountDue: String(dueAmount),
      amountPaid: "0",
      status,
      label: formatPeriodLabel(range.periodStart),
      notes: `Gia hạn từ kỳ #${current.id}`,
    })
    .returning();

  await db
    .update(contractsTable)
    .set({
      startDate: range.periodStart,
      endDate: range.periodEnd,
      dueDate: range.dueDate,
      updatedAt: new Date(),
    })
    .where(eq(contractsTable.id, current.contractId));

  await syncRecognitionForPeriod(created.id);
  return created;
}
