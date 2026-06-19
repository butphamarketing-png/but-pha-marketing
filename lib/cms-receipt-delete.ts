import {
  db,
  receiptsTable,
  contractsTable,
  invoiceReceiptsTable,
  invoiceLinesTable,
  invoicesTable,
} from "@/lib/cms-internal/db";
import { eq, and, sql } from "drizzle-orm";
import { refreshBillingPeriodPaid } from "@/lib/cms-billing-periods";
import { cancelInvoice } from "@/lib/cms-invoices";
import { AUTO_SYNC_INVOICE_NOTE_PREFIX } from "@/lib/cms-sync-invoices";

export type DeleteReceiptResult =
  | { ok: true; deleted: typeof receiptsTable.$inferSelect }
  | { ok: false; error: string; status: number };

async function removeDraftInvoice(invoiceId: number) {
  await db.delete(invoiceReceiptsTable).where(eq(invoiceReceiptsTable.invoiceId, invoiceId));
  await db.delete(invoiceLinesTable).where(eq(invoiceLinesTable.invoiceId, invoiceId));
  await db.delete(invoicesTable).where(eq(invoicesTable.id, invoiceId));
}

async function unlinkReceiptFromInvoices(receiptId: number): Promise<DeleteReceiptResult | null> {
  const links = await db
    .select({ invoiceId: invoiceReceiptsTable.invoiceId })
    .from(invoiceReceiptsTable)
    .where(eq(invoiceReceiptsTable.receiptId, receiptId));

  for (const link of links) {
    const [invoice] = await db
      .select({ id: invoicesTable.id, status: invoicesTable.status, notes: invoicesTable.notes })
      .from(invoicesTable)
      .where(eq(invoicesTable.id, link.invoiceId))
      .limit(1);

    if (invoice?.status === "issued") {
      const isAutoSync = (invoice.notes ?? "").startsWith(AUTO_SYNC_INVOICE_NOTE_PREFIX);
      if (isAutoSync) {
        await cancelInvoice(link.invoiceId);
      } else {
        return {
          ok: false,
          status: 409,
          error:
            "Không thể xóa: phiếu thu đã liên kết hóa đơn đã xuất. Hủy HĐ trước hoặc sửa từ form Khách hàng.",
        };
      }
    }
  }

  for (const link of links) {
    await db
      .delete(invoiceReceiptsTable)
      .where(
        and(
          eq(invoiceReceiptsTable.invoiceId, link.invoiceId),
          eq(invoiceReceiptsTable.receiptId, receiptId),
        ),
      );

    const remaining = await db
      .select({ receiptId: invoiceReceiptsTable.receiptId })
      .from(invoiceReceiptsTable)
      .where(eq(invoiceReceiptsTable.invoiceId, link.invoiceId));

    if (remaining.length === 0) {
      const [invoice] = await db
        .select({ status: invoicesTable.status })
        .from(invoicesTable)
        .where(eq(invoicesTable.id, link.invoiceId))
        .limit(1);
      if (invoice?.status === "draft") {
        await removeDraftInvoice(link.invoiceId);
      }
    }
  }

  return null;
}

export async function deleteReceiptById(id: number): Promise<DeleteReceiptResult> {
  try {
    const [existing] = await db
      .select()
      .from(receiptsTable)
      .where(eq(receiptsTable.id, id))
      .limit(1);

    if (!existing) {
      return { ok: false, status: 404, error: "Không tìm thấy phiếu thu." };
    }

    const unlinkError = await unlinkReceiptFromInvoices(id);
    if (unlinkError) return unlinkError;

    if (existing.contractId) {
      await db
        .update(contractsTable)
        .set({
          paidAmount: sql`GREATEST(0, ${contractsTable.paidAmount}::numeric - ${existing.amount}::numeric)`,
        })
        .where(eq(contractsTable.id, existing.contractId));
    }

    await db.delete(receiptsTable).where(eq(receiptsTable.id, id));

    if (existing.billingPeriodId) {
      await refreshBillingPeriodPaid(existing.billingPeriodId);
    }

    return { ok: true, deleted: existing };
  } catch (error) {
    console.error("deleteReceiptById failed", error);
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : "Không thể xóa phiếu thu.",
    };
  }
}
