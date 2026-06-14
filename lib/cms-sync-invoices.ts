import {
  db,
  invoicesTable,
  invoiceLinesTable,
  invoiceReceiptsTable,
  receiptsTable,
  customersTable,
  contractsTable,
  billingPeriodsTable,
} from "@/lib/cms-internal/db";
import { and, eq } from "drizzle-orm";
import type { CustomerRecord } from "@/lib/customer-records";
import {
  cancelInvoice,
  computeInvoiceTotalsFromGross,
  createInvoice,
  issueInvoice,
  linkReceiptsToInvoice,
} from "@/lib/cms-invoices";
import { assertInvoiceTaxId } from "@/lib/vietnamese-tax-id";

export const AUTO_SYNC_INVOICE_NOTE_PREFIX = "AUTO_SYNC_INVOICE:";

export type SyncInvoiceResult = {
  created: number;
  updated: number;
  issued: number;
  cancelled: number;
  draft: number;
  errors: string[];
};

function autoSyncInvoiceNote(recordId: string) {
  return `${AUTO_SYNC_INVOICE_NOTE_PREFIX}${recordId}`;
}

async function findAutoSyncInvoice(periodId: number, recordId: string) {
  const [invoice] = await db
    .select()
    .from(invoicesTable)
    .where(
      and(
        eq(invoicesTable.billingPeriodId, periodId),
        eq(invoicesTable.notes, autoSyncInvoiceNote(recordId)),
      ),
    )
    .limit(1);
  return invoice ?? null;
}

async function removeDraftInvoice(invoiceId: number) {
  await db.delete(invoiceReceiptsTable).where(eq(invoiceReceiptsTable.invoiceId, invoiceId));
  await db.delete(invoiceLinesTable).where(eq(invoiceLinesTable.invoiceId, invoiceId));
  await db.delete(invoicesTable).where(eq(invoicesTable.id, invoiceId));
}

function resolveVatRate(customer: {
  customerType: string | null;
  needsVatInvoice: boolean | null;
}) {
  return customer.customerType === "company" && customer.needsVatInvoice ? 8 : 0;
}

function canAutoIssueInvoice(
  vatRate: number,
  customer: {
    name: string;
    taxId: string | null;
    address: string | null;
    invoiceAddress: string | null;
  },
): { ok: true } | { ok: false; reason: string } {
  if (vatRate <= 0) return { ok: true };

  const taxCheck = assertInvoiceTaxId(vatRate, customer.taxId, customer.name);
  if (taxCheck && !taxCheck.valid) {
    return { ok: false, reason: taxCheck.error || "MST không hợp lệ" };
  }

  if (!(customer.invoiceAddress?.trim() || customer.address?.trim())) {
    return { ok: false, reason: "Thiếu địa chỉ xuất hóa đơn VAT" };
  }

  return { ok: true };
}

async function buildLineDescription(
  record: CustomerRecord,
  contractId: number,
  periodId: number,
  receiptCode: string,
) {
  const [period] = await db
    .select({ label: billingPeriodsTable.label })
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.id, periodId))
    .limit(1);

  const [contract] = await db
    .select({ code: contractsTable.code, notes: contractsTable.notes })
    .from(contractsTable)
    .where(eq(contractsTable.id, contractId))
    .limit(1);

  if (contract?.notes?.trim()) return contract.notes.trim();

  const label = period?.label || record.registeredAt || "kỳ hiện tại";
  return `Dịch vụ ${label}${contract?.code ? ` — HĐ ${contract.code}` : ""} (${receiptCode})`;
}

export async function syncAutoInvoiceForBillingPeriod(
  record: CustomerRecord,
  customerId: number,
  contractId: number,
  periodId: number,
  receiptId: number | null,
): Promise<SyncInvoiceResult> {
  const result: SyncInvoiceResult = {
    created: 0,
    updated: 0,
    issued: 0,
    cancelled: 0,
    draft: 0,
    errors: [],
  };

  const existing = await findAutoSyncInvoice(periodId, record.id);

  if (!receiptId || record.amountPaid <= 0) {
    if (!existing) return result;
    if (existing.status === "issued") {
      await cancelInvoice(existing.id);
      result.cancelled += 1;
    } else if (existing.status === "draft") {
      await removeDraftInvoice(existing.id);
      result.cancelled += 1;
    }
    return result;
  }

  const [receipt] = await db
    .select()
    .from(receiptsTable)
    .where(eq(receiptsTable.id, receiptId))
    .limit(1);
  if (!receipt) {
    result.errors.push(`${record.contractCode}: Phiếu thu sync không tồn tại`);
    return result;
  }

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, customerId))
    .limit(1);
  if (!customer) {
    result.errors.push(`${record.contractCode}: Khách ERP không tồn tại`);
    return result;
  }

  const vatRate = resolveVatRate(customer);
  const grossAmount = parseFloat(receipt.amount ?? "0");
  const totals = computeInvoiceTotalsFromGross(grossAmount, vatRate);
  const issueCheck = canAutoIssueInvoice(vatRate, customer);

  if (existing?.status === "issued") {
    const currentTotal = parseFloat(existing.totalAmount ?? "0");
    const currentVat = parseFloat(existing.vatRate ?? "0");
    if (
      Math.abs(currentTotal - totals.totalAmount) < 0.01 &&
      Math.abs(currentVat - totals.vatRate) < 0.01
    ) {
      try {
        await linkReceiptsToInvoice(existing.id, [receiptId]);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Link receipt failed";
        if (!message.includes("already linked")) {
          result.errors.push(`${record.contractCode}: ${message}`);
        }
      }
      return result;
    }

    await cancelInvoice(existing.id);
    result.cancelled += 1;
  } else if (existing?.status === "draft") {
    await removeDraftInvoice(existing.id);
    result.updated += 1;
  }

  const description = await buildLineDescription(record, contractId, periodId, receipt.code);
  const invoice = await createInvoice({
    customerId,
    contractId,
    billingPeriodId: periodId,
    taxId: customer.customerType === "company" ? customer.taxId : null,
    buyerName: customer.name,
    buyerAddress: customer.invoiceAddress || customer.address,
    buyerEmail: customer.email,
    buyerPhone: customer.phone,
    vatRate: totals.vatRate,
    issueDate: receipt.receiptDate,
    notes: autoSyncInvoiceNote(record.id),
    createdBy: "Sync",
    lines: [{ description, unitPrice: totals.subtotal, quantity: 1 }],
    receiptIds: [receiptId],
    fixedTotals: totals,
  });
  result.created += 1;

  if (!issueCheck.ok) {
    result.draft += 1;
    result.errors.push(`${record.contractCode}: ${issueCheck.reason} — HĐ ${invoice.code} giữ nháp`);
    return result;
  }

  try {
    await issueInvoice(invoice.id);
    result.issued += 1;
  } catch (error) {
    result.draft += 1;
    result.errors.push(
      `${record.contractCode}: ${error instanceof Error ? error.message : "Không phát hành được HĐ"}`,
    );
  }

  return result;
}
