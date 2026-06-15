import { Router } from "express";
import { db, contractorPaymentsTable } from "@/lib/cms-internal/db";
import { eq, ilike, sql, and, gte, lte } from "drizzle-orm";
import { computeContractorPit, resolveContractorPitFromBody } from "@/lib/contractor-pit";
import { logAudit } from "../lib/audit";

const router = Router();

function enrichPayment(row: typeof contractorPaymentsTable.$inferSelect) {
  const pit = computeContractorPit({
    grossAmount: parseFloat(row.grossAmount),
    pitRate: parseFloat(row.pitRate ?? "10"),
  });
  return {
    ...row,
    grossAmount: pit.grossAmount,
    pitRate: pit.pitRate,
    pitAmount: pit.pitAmount,
    netAmount: pit.netAmount,
  };
}

async function generateCode(): Promise<string> {
  const result = await db.select({ count: sql<number>`count(*)::int` }).from(contractorPaymentsTable);
  return `CTV${String((result[0]?.count ?? 0) + 1).padStart(4, "0")}`;
}

function buildPitFields(body: Record<string, unknown>, grossAmount: number) {
  const pit = resolveContractorPitFromBody(body, grossAmount);
  return {
    grossAmount: String(pit.grossAmount),
    pitRate: String(pit.pitRate),
    pitAmount: String(pit.pitAmount),
    netAmount: String(pit.netAmount),
  };
}

router.get("/contractor-payments", async (req, res) => {
  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit ?? "20"), 10) || 20));
  const offset = (page - 1) * limit;
  const search = req.query.search ? String(req.query.search) : undefined;
  const fromDate = req.query.fromDate ? String(req.query.fromDate) : undefined;
  const toDate = req.query.toDate ? String(req.query.toDate) : undefined;

  const conditions: ReturnType<typeof eq>[] = [];
  if (search) conditions.push(ilike(contractorPaymentsTable.contractorName, `%${search}%`));
  if (fromDate) conditions.push(gte(contractorPaymentsTable.paymentDate, fromDate));
  if (toDate) conditions.push(lte(contractorPaymentsTable.paymentDate, toDate));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(contractorPaymentsTable)
      .where(where)
      .orderBy(contractorPaymentsTable.paymentDate)
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(contractorPaymentsTable).where(where),
  ]);

  return res.json({
    data: rows.map(enrichPayment),
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  });
});

router.post("/contractor-payments", async (req, res) => {
  const body = req.body ?? {};
  const contractorName = String(body.contractorName ?? "").trim();
  const serviceDescription = String(body.serviceDescription ?? "").trim();
  const grossAmount = Number(body.grossAmount);
  const paymentDate = String(body.paymentDate ?? "").trim();

  if (!contractorName || !serviceDescription || !paymentDate || !Number.isFinite(grossAmount)) {
    return res.status(400).json({ error: "Thiếu tên CTV, mô tả, ngày chi hoặc số tiền." });
  }

  const code = await generateCode();
  const pitFields = buildPitFields(body, grossAmount);
  const [row] = await db
    .insert(contractorPaymentsTable)
    .values({
      code,
      contractorName,
      contractorTaxId: body.contractorTaxId ? String(body.contractorTaxId).trim() : null,
      serviceDescription,
      paymentDate,
      paymentMethod: body.paymentMethod === "cash" ? "cash" : "transfer",
      notes: body.notes ? String(body.notes) : null,
      ...pitFields,
    })
    .returning();

  const enriched = enrichPayment(row);
  await logAudit("contractor_payment", row.id, "create", "Admin", null, enriched);
  return res.status(201).json(enriched);
});

router.get("/contractor-payments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const [row] = await db.select().from(contractorPaymentsTable).where(eq(contractorPaymentsTable.id, id)).limit(1);
  if (!row) return res.status(404).json({ error: "Not found" });
  return res.json(enrichPayment(row));
});

router.patch("/contractor-payments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

  const [existing] = await db.select().from(contractorPaymentsTable).where(eq(contractorPaymentsTable.id, id)).limit(1);
  if (!existing) return res.status(404).json({ error: "Not found" });

  const body = req.body ?? {};
  const updateData: Record<string, unknown> = {};
  if (body.contractorName !== undefined) updateData.contractorName = String(body.contractorName).trim();
  if (body.contractorTaxId !== undefined) {
    updateData.contractorTaxId = body.contractorTaxId ? String(body.contractorTaxId).trim() : null;
  }
  if (body.serviceDescription !== undefined) updateData.serviceDescription = String(body.serviceDescription).trim();
  if (body.paymentDate !== undefined) updateData.paymentDate = String(body.paymentDate);
  if (body.paymentMethod !== undefined) {
    updateData.paymentMethod = body.paymentMethod === "cash" ? "cash" : "transfer";
  }
  if (body.notes !== undefined) updateData.notes = body.notes ? String(body.notes) : null;

  const grossAmount =
    body.grossAmount !== undefined ? Number(body.grossAmount) : parseFloat(existing.grossAmount);
  if (body.grossAmount !== undefined || body.pitRate !== undefined) {
    Object.assign(updateData, buildPitFields({ pitRate: body.pitRate ?? existing.pitRate }, grossAmount));
  }

  const [updated] = await db
    .update(contractorPaymentsTable)
    .set(updateData)
    .where(eq(contractorPaymentsTable.id, id))
    .returning();

  const enriched = enrichPayment(updated);
  await logAudit("contractor_payment", id, "update", "Admin", enrichPayment(existing), enriched);
  return res.json(enriched);
});

router.delete("/contractor-payments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const [existing] = await db.select().from(contractorPaymentsTable).where(eq(contractorPaymentsTable.id, id)).limit(1);
  if (!existing) return res.status(404).json({ error: "Not found" });
  await db.delete(contractorPaymentsTable).where(eq(contractorPaymentsTable.id, id));
  await logAudit("contractor_payment", id, "delete", "Admin", enrichPayment(existing), null);
  return res.status(204).send();
});

export default router;
