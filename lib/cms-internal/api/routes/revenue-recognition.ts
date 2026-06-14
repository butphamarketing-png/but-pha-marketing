import { Router } from "express";
import {
  db,
  revenueRecognitionTable,
  billingPeriodsTable,
  customersTable,
  contractsTable,
} from "@/lib/cms-internal/db";
import { eq, and, desc, sql } from "drizzle-orm";
import {
  serializeRecognitionRow,
  syncRecognitionForPeriod,
  syncRecognitionForAllPeriods,
} from "@/lib/cms-revenue-recognition";

const router = Router();

router.get("/revenue-recognition", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page)) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit)) || 20));
    const offset = (page - 1) * limit;
    const year = req.query.year ? parseInt(String(req.query.year)) : undefined;
    const month = req.query.month ? parseInt(String(req.query.month)) : undefined;
    const customerId = req.query.customerId ? parseInt(String(req.query.customerId)) : undefined;
    const contractId = req.query.contractId ? parseInt(String(req.query.contractId)) : undefined;

    const conditions = [];
    if (year) conditions.push(eq(revenueRecognitionTable.recognitionYear, year));
    if (month) conditions.push(eq(revenueRecognitionTable.recognitionMonth, month));
    if (customerId) conditions.push(eq(revenueRecognitionTable.customerId, customerId));
    if (contractId) conditions.push(eq(revenueRecognitionTable.contractId, contractId));
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db
        .select({
          id: revenueRecognitionTable.id,
          billingPeriodId: revenueRecognitionTable.billingPeriodId,
          contractId: revenueRecognitionTable.contractId,
          customerId: revenueRecognitionTable.customerId,
          customerName: customersTable.name,
          contractCode: contractsTable.code,
          recognitionYear: revenueRecognitionTable.recognitionYear,
          recognitionMonth: revenueRecognitionTable.recognitionMonth,
          amount: revenueRecognitionTable.amount,
          method: revenueRecognitionTable.method,
          notes: revenueRecognitionTable.notes,
          createdAt: revenueRecognitionTable.createdAt,
          updatedAt: revenueRecognitionTable.updatedAt,
        })
        .from(revenueRecognitionTable)
        .leftJoin(customersTable, eq(revenueRecognitionTable.customerId, customersTable.id))
        .leftJoin(contractsTable, eq(revenueRecognitionTable.contractId, contractsTable.id))
        .where(where)
        .orderBy(
          desc(revenueRecognitionTable.recognitionYear),
          desc(revenueRecognitionTable.recognitionMonth),
        )
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(revenueRecognitionTable).where(where),
    ]);

    const total = countResult[0]?.count ?? 0;
    return res.json({
      data: rows.map((row) => ({
        ...serializeRecognitionRow(row),
        customerName: row.customerName ?? "Unknown",
        contractCode: row.contractCode ?? null,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/revenue-recognition/regenerate", async (_req, res) => {
  try {
    const result = await syncRecognitionForAllPeriods();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/revenue-recognition/regenerate/:billingPeriodId", async (req, res) => {
  try {
    const billingPeriodId = parseInt(req.params.billingPeriodId);
    const entries = await syncRecognitionForPeriod(billingPeriodId);
    if (entries === 0) {
      const [period] = await db
        .select({ id: billingPeriodsTable.id })
        .from(billingPeriodsTable)
        .where(eq(billingPeriodsTable.id, billingPeriodId))
        .limit(1);
      if (!period) return res.status(404).json({ error: "Billing period not found" });
    }
    return res.json({ billingPeriodId, entries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
