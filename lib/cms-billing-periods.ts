import {
  db,
  billingPeriodsTable,
  receiptsTable,
  type BillingPeriod,
} from "@/lib/cms-internal/db";
import { eq, sql } from "drizzle-orm";

export type BillingPeriodStatus = "pending" | "partial" | "paid" | "overdue";

export function formatPeriodLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `T${d.getMonth() + 1}/${d.getFullYear()}`;
}

export function computeBillingPeriodStatus(
  amountPaid: number,
  amountDue: number,
  dueDate: string,
  today = new Date().toISOString().slice(0, 10),
): BillingPeriodStatus {
  if (amountDue <= 0 || amountPaid >= amountDue) return "paid";
  if (amountPaid > 0) return dueDate < today ? "overdue" : "partial";
  return dueDate < today ? "overdue" : "pending";
}

function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`);
}

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

export function inferBillingCycle(periodStart: string, periodEnd: string): "month" | "year" {
  const start = parseDate(periodStart);
  const end = parseDate(periodEnd);
  const diffDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return diffDays >= 300 ? "year" : "month";
}

export function nextPeriodRange(
  periodEnd: string,
  cycle: "month" | "year",
): { periodStart: string; periodEnd: string; dueDate: string } {
  const periodStart = addDays(periodEnd, 1);
  const start = parseDate(periodStart);
  const end = new Date(start);

  if (cycle === "year") {
    end.setFullYear(end.getFullYear() + 1);
    end.setDate(end.getDate() - 1);
  } else {
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
  }

  return {
    periodStart,
    periodEnd: formatDate(end),
    dueDate: periodStart,
  };
}

export async function refreshBillingPeriodPaid(periodId: number): Promise<BillingPeriod | null> {
  const [sumRow] = await db
    .select({ total: sql<string>`COALESCE(sum(${receiptsTable.amount}::numeric), 0)` })
    .from(receiptsTable)
    .where(eq(receiptsTable.billingPeriodId, periodId));

  const [period] = await db
    .select()
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.id, periodId))
    .limit(1);

  if (!period) return null;

  const amountPaid = parseFloat(sumRow?.total ?? "0");
  const amountDue = parseFloat(period.amountDue ?? "0");
  const status = computeBillingPeriodStatus(amountPaid, amountDue, period.dueDate);

  const [updated] = await db
    .update(billingPeriodsTable)
    .set({
      amountPaid: String(amountPaid),
      status,
      updatedAt: new Date(),
    })
    .where(eq(billingPeriodsTable.id, periodId))
    .returning();

  return updated ?? null;
}

export function serializeBillingPeriod(row: BillingPeriod) {
  const amountDue = parseFloat(row.amountDue ?? "0");
  const amountPaid = parseFloat(row.amountPaid ?? "0");
  return {
    ...row,
    amountDue,
    amountPaid,
    remainingAmount: Math.max(0, amountDue - amountPaid),
  };
}
