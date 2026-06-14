import {
  db,
  billingPeriodsTable,
  contractsTable,
  revenueRecognitionTable,
} from "@/lib/cms-internal/db";
import { eq, and, sql } from "drizzle-orm";
import {
  getPackageByKey,
  type CustomerRecord,
} from "@/lib/customer-records";

/** Gói tháng/năm: ghi nhận 100% trong tháng kỳ thu (due), không phân bổ dần. */
export type RecognitionMethod = "monthly" | "annual" | "immediate";
export type BillingCycle = "month" | "year" | "once";

export function resolveBillingCycleFromRecord(record: Pick<CustomerRecord, "platform" | "service" | "subscriptionPackage">): BillingCycle {
  const pkg = getPackageByKey(record.platform, record.service, record.subscriptionPackage);
  if (pkg?.period === "once") return "once";
  if (pkg?.period === "year") return "year";
  if (pkg?.period === "month") return "month";
  if (record.service === "thiet-ke") return "once";
  if (record.service === "domain" || record.service === "hosting") return "year";
  return "month";
}

export function resolveBillingCycleFromContract(
  billingCycle: string | null | undefined,
  periodStart: string,
  periodEnd: string,
): BillingCycle {
  if (billingCycle === "month" || billingCycle === "year" || billingCycle === "once") {
    return billingCycle;
  }
  const start = new Date(`${periodStart}T12:00:00`);
  const end = new Date(`${periodEnd}T12:00:00`);
  const diffDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (diffDays >= 300) return "year";
  if (diffDays <= 45) return "month";
  return "month";
}

export function resolveRecognitionMethod(cycle: BillingCycle): RecognitionMethod {
  if (cycle === "once") return "immediate";
  if (cycle === "year") return "annual";
  return "monthly";
}

type RecognitionSlice = {
  recognitionYear: number;
  recognitionMonth: number;
  amount: number;
  method: RecognitionMethod;
};

export function buildRecognitionSlices(
  amountDue: number,
  recognitionDate: string,
  method: RecognitionMethod,
): RecognitionSlice[] {
  if (amountDue <= 0) return [];

  const anchor = new Date(`${recognitionDate}T12:00:00`);
  if (Number.isNaN(anchor.getTime())) return [];

  return [{
    recognitionYear: anchor.getFullYear(),
    recognitionMonth: anchor.getMonth() + 1,
    amount: amountDue,
    method,
  }];
}

export async function syncRecognitionForPeriod(periodId: number): Promise<number> {
  const [period] = await db
    .select()
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.id, periodId))
    .limit(1);

  if (!period) return 0;

  const [contract] = await db
    .select({ billingCycle: contractsTable.billingCycle })
    .from(contractsTable)
    .where(eq(contractsTable.id, period.contractId))
    .limit(1);

  const cycle = resolveBillingCycleFromContract(
    contract?.billingCycle,
    period.periodStart,
    period.periodEnd,
  );
  const method = resolveRecognitionMethod(cycle);
  const amountDue = parseFloat(period.amountDue ?? "0");
  const recognitionDate = period.dueDate || period.periodStart;
  const slices = buildRecognitionSlices(amountDue, recognitionDate, method);

  await db.delete(revenueRecognitionTable).where(eq(revenueRecognitionTable.billingPeriodId, periodId));

  if (slices.length === 0) return 0;

  await db.insert(revenueRecognitionTable).values(
    slices.map((slice) => ({
      billingPeriodId: period.id,
      contractId: period.contractId,
      customerId: period.customerId,
      recognitionYear: slice.recognitionYear,
      recognitionMonth: slice.recognitionMonth,
      amount: String(slice.amount),
      method: slice.method,
      notes: `Tự động từ kỳ #${period.id}`,
    })),
  );

  return slices.length;
}

export async function syncRecognitionForAllPeriods(): Promise<{ periods: number; entries: number }> {
  const periods = await db.select({ id: billingPeriodsTable.id }).from(billingPeriodsTable);
  let entries = 0;
  for (const period of periods) {
    entries += await syncRecognitionForPeriod(period.id);
  }
  return { periods: periods.length, entries };
}

export async function getRecognizedRevenueForMonth(year: number, month: number): Promise<number> {
  const [result] = await db
    .select({ total: sql<string>`COALESCE(sum(${revenueRecognitionTable.amount}::numeric), 0)` })
    .from(revenueRecognitionTable)
    .where(
      and(
        eq(revenueRecognitionTable.recognitionYear, year),
        eq(revenueRecognitionTable.recognitionMonth, month),
      ),
    );

  return parseFloat(result?.total ?? "0");
}

export function computeAgingBucket(dueDate: string, today = new Date().toISOString().slice(0, 10)) {
  const due = new Date(`${dueDate}T12:00:00`);
  const now = new Date(`${today}T12:00:00`);
  const daysPastDue = Math.floor((now.getTime() - due.getTime()) / 86_400_000);

  if (daysPastDue < 0) return "current" as const;
  if (daysPastDue <= 30) return "days1_30" as const;
  if (daysPastDue <= 60) return "days31_60" as const;
  if (daysPastDue <= 90) return "days61_90" as const;
  return "over90" as const;
}

export type AgingBucketKey = ReturnType<typeof computeAgingBucket>;

export const AGING_BUCKET_LABELS: Record<AgingBucketKey, string> = {
  current: "Chưa đến hạn",
  days1_30: "Quá hạn 1–30 ngày",
  days31_60: "Quá hạn 31–60 ngày",
  days61_90: "Quá hạn 61–90 ngày",
  over90: "Quá hạn trên 90 ngày",
};

export function serializeRecognitionRow(row: typeof revenueRecognitionTable.$inferSelect) {
  return {
    ...row,
    amount: parseFloat(row.amount ?? "0"),
    label: `T${row.recognitionMonth}/${row.recognitionYear}`,
  };
}
