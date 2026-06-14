import { db, receiptsTable } from "@/lib/cms-internal/db";
import { eq, sql } from "drizzle-orm";
import type { CustomerRecord } from "@/lib/customer-records";

export const AUTO_SYNC_RECEIPT_NOTE_PREFIX = "AUTO_SYNC:";

export type SyncReceiptResult = {
  created: number;
  updated: number;
  removed: number;
  receiptId: number | null;
};

function autoSyncNote(recordId: string) {
  return `${AUTO_SYNC_RECEIPT_NOTE_PREFIX}${recordId}`;
}

function isAutoSyncReceipt(notes: string | null) {
  return Boolean(notes?.startsWith(AUTO_SYNC_RECEIPT_NOTE_PREFIX));
}

async function generateReceiptCode(): Promise<string> {
  const result = await db.select({ count: sql<number>`count(*)::int` }).from(receiptsTable);
  const count = result[0].count + 1;
  return `PT${String(count).padStart(4, "0")}`;
}

export async function syncAutoReceiptForBillingPeriod(
  record: CustomerRecord,
  customerId: number,
  contractId: number,
  periodId: number,
  paymentTarget?: number,
): Promise<SyncReceiptResult> {
  const result: SyncReceiptResult = { created: 0, updated: 0, removed: 0, receiptId: null };
  const targetPaid = paymentTarget ?? Math.max(0, record.amountPaid);
  const receiptDate = record.registeredAt || new Date().toISOString().slice(0, 10);
  const note = autoSyncNote(record.id);

  const periodReceipts = await db
    .select()
    .from(receiptsTable)
    .where(eq(receiptsTable.billingPeriodId, periodId));

  const manualTotal = periodReceipts
    .filter((row) => !isAutoSyncReceipt(row.notes))
    .reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);

  const autoTarget = Math.max(0, Math.round((targetPaid - manualTotal) * 100) / 100);
  const [autoReceipt] = periodReceipts.filter((row) => row.notes === note);

  if (autoTarget === 0) {
    if (autoReceipt) {
      await db.delete(receiptsTable).where(eq(receiptsTable.id, autoReceipt.id));
      result.removed += 1;
    }
    return result;
  }

  if (!autoReceipt) {
    const code = await generateReceiptCode();
    const [inserted] = await db
      .insert(receiptsTable)
      .values({
        code,
        customerId,
        contractId,
        billingPeriodId: periodId,
        amount: String(autoTarget),
        paymentMethod: "transfer",
        receiptDate,
        createdBy: "Sync",
        notes: note,
      })
      .returning({ id: receiptsTable.id });
    result.created += 1;
    result.receiptId = inserted?.id ?? null;
    return result;
  }

  const currentAmount = parseFloat(autoReceipt.amount ?? "0");
  result.receiptId = autoReceipt.id;
  if (Math.abs(currentAmount - autoTarget) < 0.01) {
    return result;
  }

  await db
    .update(receiptsTable)
    .set({
      amount: String(autoTarget),
      receiptDate,
      updatedAt: new Date(),
    })
    .where(eq(receiptsTable.id, autoReceipt.id));

  result.updated += 1;
  return result;
}
