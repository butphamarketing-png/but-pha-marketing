import { Router } from "express";
import {
  db,
  billingPeriodsTable,
  customersTable,
  contractsTable,
} from "@/lib/cms-internal/db";
import { eq, sql, and, gte, lte, desc } from "drizzle-orm";
import {
  computeBillingPeriodStatus,
  formatPeriodLabel,
  refreshBillingPeriodPaid,
  serializeBillingPeriod,
} from "@/lib/cms-billing-periods";
import { renewBillingPeriod } from "@/lib/cms-customer-sync";

const router = Router();

async function enrichPeriod(row: typeof billingPeriodsTable.$inferSelect) {
  const [customer] = await db
    .select({ name: customersTable.name })
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId))
    .limit(1);
  const [contract] = await db
    .select({ code: contractsTable.code })
    .from(contractsTable)
    .where(eq(contractsTable.id, row.contractId))
    .limit(1);

  return {
    ...serializeBillingPeriod(row),
    customerName: customer?.name ?? "Unknown",
    contractCode: contract?.code ?? null,
  };
}

router.get("/billing-periods", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page)) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit)) || 20));
    const offset = (page - 1) * limit;

    const customerId = req.query.customerId ? parseInt(String(req.query.customerId)) : undefined;
    const contractId = req.query.contractId ? parseInt(String(req.query.contractId)) : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const month = req.query.month ? parseInt(String(req.query.month)) : undefined;
    const year = req.query.year ? parseInt(String(req.query.year)) : undefined;

    const conditions = [];
    if (customerId) conditions.push(eq(billingPeriodsTable.customerId, customerId));
    if (contractId) conditions.push(eq(billingPeriodsTable.contractId, contractId));
    if (status) conditions.push(eq(billingPeriodsTable.status, status));
    if (month && year) {
      const fromDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const toDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
      conditions.push(gte(billingPeriodsTable.dueDate, fromDate));
      conditions.push(lte(billingPeriodsTable.dueDate, toDate));
    }
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db
        .select()
        .from(billingPeriodsTable)
        .where(where)
        .orderBy(desc(billingPeriodsTable.dueDate))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(billingPeriodsTable).where(where),
    ]);

    const total = countResult[0]?.count ?? 0;
    const data = await Promise.all(rows.map(enrichPeriod));
    return res.json({
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/billing-periods", async (req, res) => {
  try {
    const {
      contractId,
      customerId,
      periodStart,
      periodEnd,
      dueDate,
      amountDue,
      amountPaid,
      notes,
    } = req.body ?? {};

    if (!contractId || !customerId || !periodStart || !periodEnd || !dueDate || amountDue === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const paid = Number(amountPaid ?? 0);
    const due = Number(amountDue);
    const status = computeBillingPeriodStatus(paid, due, String(dueDate));

    const [created] = await db
      .insert(billingPeriodsTable)
      .values({
        contractId,
        customerId,
        periodStart: String(periodStart),
        periodEnd: String(periodEnd),
        dueDate: String(dueDate),
        amountDue: String(due),
        amountPaid: String(paid),
        status,
        label: formatPeriodLabel(String(periodStart)),
        notes: notes ?? null,
      })
      .returning();

    return res.status(201).json(await enrichPeriod(created));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/billing-periods/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [row] = await db.select().from(billingPeriodsTable).where(eq(billingPeriodsTable.id, id)).limit(1);
    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(await enrichPeriod(row));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/billing-periods/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [existing] = await db.select().from(billingPeriodsTable).where(eq(billingPeriodsTable.id, id)).limit(1);
    if (!existing) return res.status(404).json({ error: "Not found" });

    const upd: Record<string, unknown> = { updatedAt: new Date() };
    const body = req.body ?? {};

    if (body.periodStart !== undefined) upd.periodStart = String(body.periodStart);
    if (body.periodEnd !== undefined) upd.periodEnd = String(body.periodEnd);
    if (body.dueDate !== undefined) upd.dueDate = String(body.dueDate);
    if (body.amountDue !== undefined) upd.amountDue = String(body.amountDue);
    if (body.amountPaid !== undefined) upd.amountPaid = String(body.amountPaid);
    if (body.notes !== undefined) upd.notes = body.notes;
    if (body.periodStart !== undefined) upd.label = formatPeriodLabel(String(body.periodStart));

    const amountDue = parseFloat(String(upd.amountDue ?? existing.amountDue ?? "0"));
    const amountPaid = parseFloat(String(upd.amountPaid ?? existing.amountPaid ?? "0"));
    const dueDate = String(upd.dueDate ?? existing.dueDate);
    upd.status = computeBillingPeriodStatus(amountPaid, amountDue, dueDate);

    const [updated] = await db
      .update(billingPeriodsTable)
      .set(upd)
      .where(eq(billingPeriodsTable.id, id))
      .returning();

    return res.json(await enrichPeriod(updated));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/billing-periods/:id/renew", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const amountDue = req.body?.amountDue !== undefined ? Number(req.body.amountDue) : undefined;
    const created = await renewBillingPeriod(id, amountDue);
    if (!created) return res.status(404).json({ error: "Not found" });
    return res.status(201).json(await enrichPeriod(created));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/billing-periods/:id/refresh", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await refreshBillingPeriodPaid(id);
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json(await enrichPeriod(updated));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/billing-periods/:id", async (req, res) => {
  try {
    await db.delete(billingPeriodsTable).where(eq(billingPeriodsTable.id, parseInt(req.params.id)));
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
