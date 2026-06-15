import { canUseCmsDatabase } from "@/lib/cms-express-bridge";
import {
  db,
  customersTable,
  billingPeriodsTable,
} from "@/lib/cms-internal/db";
import type { CustomerRecord } from "@/lib/customer-records";
import { eq, inArray } from "drizzle-orm";

export type CustomerErpSyncStatus = {
  marketingId: string;
  erpCustomerId: number | null;
  erpLinked: boolean;
  hasContractCode: boolean;
  state: "synced" | "missing_mshd" | "not_linked" | "removed";
  latestPeriodEnd: string | null;
  cms360Url: string | null;
};

export async function getCustomerErpSyncStatuses(
  records: CustomerRecord[],
): Promise<Record<string, CustomerErpSyncStatus>> {
  const result: Record<string, CustomerErpSyncStatus> = {};

  for (const record of records) {
    result[record.id] = {
      marketingId: record.id,
      erpCustomerId: null,
      erpLinked: false,
      hasContractCode: Boolean(record.contractCode?.trim()),
      state: record.contractCode?.trim() ? "not_linked" : "missing_mshd",
      latestPeriodEnd: null,
      cms360Url: null,
    };
  }

  if (!canUseCmsDatabase() || records.length === 0) {
    return result;
  }

  const marketingIds = records.map((r) => r.id);
  const erpCustomers = await db
    .select()
    .from(customersTable)
    .where(inArray(customersTable.externalId, marketingIds));

  const erpByExternal = new Map(
    erpCustomers
      .filter((row) => row.externalId)
      .map((row) => [row.externalId as string, row]),
  );

  const erpIds = erpCustomers.map((c) => c.id);
  const periodsByCustomer = new Map<number, string>();

  if (erpIds.length > 0) {
    const periods = await db
      .select({
        customerId: billingPeriodsTable.customerId,
        periodEnd: billingPeriodsTable.periodEnd,
      })
      .from(billingPeriodsTable)
      .where(inArray(billingPeriodsTable.customerId, erpIds));

    for (const period of periods) {
      const current = periodsByCustomer.get(period.customerId);
      if (!current || period.periodEnd > current) {
        periodsByCustomer.set(period.customerId, period.periodEnd);
      }
    }
  }

  for (const record of records) {
    const erp = erpByExternal.get(record.id);
    const hasMshd = Boolean(record.contractCode?.trim());

    if (!hasMshd) {
      result[record.id] = {
        marketingId: record.id,
        erpCustomerId: erp?.id ?? null,
        erpLinked: false,
        hasContractCode: false,
        state: "missing_mshd",
        latestPeriodEnd: erp ? periodsByCustomer.get(erp.id) ?? null : null,
        cms360Url: erp ? `/cms/customer-360?id=${erp.id}` : null,
      };
      continue;
    }

    if (!erp || erp.customerStatus === "removed") {
      result[record.id] = {
        marketingId: record.id,
        erpCustomerId: erp?.id ?? null,
        erpLinked: false,
        hasContractCode: true,
        state: erp?.customerStatus === "removed" ? "removed" : "not_linked",
        latestPeriodEnd: null,
        cms360Url: null,
      };
      continue;
    }

    result[record.id] = {
      marketingId: record.id,
      erpCustomerId: erp.id,
      erpLinked: true,
      hasContractCode: true,
      state: "synced",
      latestPeriodEnd: periodsByCustomer.get(erp.id) ?? null,
      cms360Url: `/cms/customer-360?id=${erp.id}`,
    };
  }

  return result;
}
