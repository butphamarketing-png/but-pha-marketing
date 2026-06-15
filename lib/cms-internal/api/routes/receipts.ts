import { Router } from "express";
import { db, receiptsTable, contractsTable, customersTable, servicesTable } from "@/lib/cms-internal/db";
import { eq, ilike, sql, and, gte, lte } from "drizzle-orm";
import { CreateReceiptBody, UpdateReceiptBody, GetReceiptParams, UpdateReceiptParams, DeleteReceiptParams, ListReceiptsQueryParams } from "@/lib/cms-internal/api-zod";
import { logAudit } from "../lib/audit";
import { refreshBillingPeriodPaid } from "@/lib/cms-billing-periods";
import { deleteReceiptById } from "@/lib/cms-receipt-delete";
import { generateReceiptCode } from "@/lib/cms-receipt-codes";

const router = Router();

async function enrichReceipt(receipt: typeof receiptsTable.$inferSelect) {
  const [customer] = await db.select({ name: customersTable.name }).from(customersTable).where(eq(customersTable.id, receipt.customerId)).limit(1);
  let contractCode: string | null = null;
  if (receipt.contractId) {
    const [c] = await db.select({ code: contractsTable.code }).from(contractsTable).where(eq(contractsTable.id, receipt.contractId)).limit(1);
    contractCode = c?.code ?? null;
  }
  let serviceName: string | null = null;
  if (receipt.serviceId) {
    const [s] = await db.select({ name: servicesTable.name }).from(servicesTable).where(eq(servicesTable.id, receipt.serviceId)).limit(1);
    serviceName = s?.name ?? null;
  }
  return {
    ...receipt,
    amount: parseFloat(receipt.amount),
    billingPeriodId: receipt.billingPeriodId ?? null,
    customerName: customer?.name ?? "Unknown",
    contractCode,
    serviceName,
  };
}

router.get("/receipts", async (req, res) => {
  const query = ListReceiptsQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { customerId, contractId, serviceId, fromDate, toDate, search, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  const conditions: ReturnType<typeof eq>[] = [];
  if (customerId) conditions.push(eq(receiptsTable.customerId, customerId));
  if (contractId) conditions.push(eq(receiptsTable.contractId, contractId));
  if (serviceId) conditions.push(eq(receiptsTable.serviceId, serviceId));
  if (fromDate) conditions.push(gte(receiptsTable.receiptDate, String(fromDate)));
  if (toDate) conditions.push(lte(receiptsTable.receiptDate, String(toDate)));
  if (search) conditions.push(ilike(receiptsTable.code, `%${search}%`));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, totalResult] = await Promise.all([
    db.select().from(receiptsTable).where(where).limit(limit).offset(offset).orderBy(receiptsTable.receiptDate),
    db.select({ count: sql<number>`count(*)::int` }).from(receiptsTable).where(where),
  ]);

  const data = await Promise.all(rows.map(enrichReceipt));
  return res.json({ data, total: totalResult[0].count, page, limit });
});

router.post("/receipts", async (req, res) => {
  const body = CreateReceiptBody.safeParse(req.body);
  if (!body.success) return res.status(400).json({ error: body.error.message });

  const code = await generateReceiptCode();
  const billingPeriodId =
    typeof req.body?.billingPeriodId === "number" ? req.body.billingPeriodId : undefined;

  if (body.data.contractId) {
    await db
      .update(contractsTable)
      .set({
        paidAmount: sql`${contractsTable.paidAmount}::numeric + ${String(body.data.amount)}::numeric`,
      })
      .where(eq(contractsTable.id, body.data.contractId));
  }

  const [receipt] = await db.insert(receiptsTable).values({
    ...body.data,
    code,
    amount: String(body.data.amount),
    billingPeriodId: billingPeriodId ?? null,
  }).returning();

  if (billingPeriodId) {
    await refreshBillingPeriodPaid(billingPeriodId);
  }
  const enriched = await enrichReceipt(receipt);
  await logAudit("receipt", receipt.id, "create", "Admin", null, enriched);
  return res.status(201).json(enriched);
});

router.get("/receipts/:id", async (req, res) => {
  const params = GetReceiptParams.safeParse(req.params);
  if (!params.success) return res.status(400).json({ error: "Invalid id" });

  const [receipt] = await db.select().from(receiptsTable).where(eq(receiptsTable.id, params.data.id)).limit(1);
  if (!receipt) return res.status(404).json({ error: "Not found" });
  return res.json(await enrichReceipt(receipt));
});

router.patch("/receipts/:id", async (req, res) => {
  const params = UpdateReceiptParams.safeParse(req.params);
  const body = UpdateReceiptBody.safeParse(req.body);
  if (!params.success || !body.success) return res.status(400).json({ error: "Invalid data" });

  const [existing] = await db.select().from(receiptsTable).where(eq(receiptsTable.id, params.data.id)).limit(1);
  if (!existing) return res.status(404).json({ error: "Not found" });

  const updateData: Record<string, unknown> = { ...body.data };
  if (body.data.amount !== undefined) updateData.amount = String(body.data.amount);
  if (req.body?.billingPeriodId !== undefined) {
    updateData.billingPeriodId =
      typeof req.body.billingPeriodId === "number" ? req.body.billingPeriodId : null;
  }

  const [updated] = await db.update(receiptsTable).set(updateData).where(eq(receiptsTable.id, params.data.id)).returning();

  const periodIds = new Set<number>();
  if (existing.billingPeriodId) periodIds.add(existing.billingPeriodId);
  if (updated.billingPeriodId) periodIds.add(updated.billingPeriodId);
  await Promise.all([...periodIds].map((id) => refreshBillingPeriodPaid(id)));
  const enriched = await enrichReceipt(updated);
  await logAudit("receipt", updated.id, "update", "Admin", await enrichReceipt(existing), enriched);
  return res.json(enriched);
});

router.delete("/receipts/:id", async (req, res) => {
  const params = DeleteReceiptParams.safeParse(req.params);
  if (!params.success) return res.status(400).json({ error: "Invalid id" });

  const result = await deleteReceiptById(params.data.id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  const enriched = await enrichReceipt(result.deleted);
  await logAudit("receipt", params.data.id, "delete", "Admin", enriched, null);
  return res.status(204).send();
});

export default router;
