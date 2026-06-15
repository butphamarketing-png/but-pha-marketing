import { db, receiptsTable, billingPeriodsTable } from "@/lib/cms-internal/db";
import { and, eq, sql } from "drizzle-orm";
import type { CustomerRecord } from "@/lib/customer-records";
import { receiptPaymentMethodFromCustomer } from "@/lib/customer-payment";
import { deleteReceiptById } from "@/lib/cms-receipt-delete";
import { generateReceiptCode } from "@/lib/cms-receipt-codes";

export const AUTO_SYNC_RECEIPT_NOTE_PREFIX = "AUTO_SYNC:";

export type SyncReceiptResult = {
  created: number;
  updated: number;
  removed: number;
  receiptId: number | null;
};

export function autoSyncReceiptNote(recordId: string) {
  return `${AUTO_SYNC_RECEIPT_NOTE_PREFIX}${recordId}`;
}

function autoSyncNote(recordId: string) {
  return autoSyncReceiptNote(recordId);
}

function isAutoSyncReceipt(notes: string | null) {
  return Boolean(notes?.startsWith(AUTO_SYNC_RECEIPT_NOTE_PREFIX));
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
  const paymentMethod = receiptPaymentMethodFromCustomer(record.paymentMethod ?? "bank_company");

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
        paymentMethod,
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
  const currentMethod = autoReceipt.paymentMethod ?? "";
  result.receiptId = autoReceipt.id;
  if (Math.abs(currentAmount - autoTarget) < 0.01 && currentMethod === paymentMethod) {
    return result;
  }

  await db
    .update(receiptsTable)
    .set({
      amount: String(autoTarget),
      receiptDate,
      paymentMethod,
      updatedAt: new Date(),
    })
    .where(eq(receiptsTable.id, autoReceipt.id));

  result.updated += 1;
  return result;
}

/** Xóa phiếu thu AUTO_SYNC trên kỳ cũ khi đổi ngày ĐK/hết hạn tạo kỳ mới. */
export async function cleanupStaleAutoReceipts(
  record: CustomerRecord,
  contractId: number,
  activePeriodId: number,
): Promise<number> {
  const note = autoSyncReceiptNote(record.id);
  const rows = await db
    .select({ id: receiptsTable.id, billingPeriodId: receiptsTable.billingPeriodId })
    .from(receiptsTable)
    .innerJoin(billingPeriodsTable, eq(receiptsTable.billingPeriodId, billingPeriodsTable.id))
    .where(and(eq(billingPeriodsTable.contractId, contractId), eq(receiptsTable.notes, note)));

  let removed = 0;
  for (const row of rows) {
    if (row.billingPeriodId === activePeriodId) continue;
    try {
      const result = await deleteReceiptById(row.id);
      if (result.ok) removed += 1;
    } catch (error) {
      console.error("cleanupStaleAutoReceipts: delete failed", row.id, error);
    }
  }
  return removed;
}
