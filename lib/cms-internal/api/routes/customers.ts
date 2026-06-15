import { Router } from "express";
import { db, customersTable } from "@/lib/cms-internal/db";
import { eq, ilike, sql, and, inArray } from "drizzle-orm";
import { GetCustomerParams, ListCustomersQueryParams } from "@/lib/cms-internal/api-zod";
import { getCustomerOverview } from "@/lib/cms-customer-overview";
import {
  CUSTOMER_READ_ONLY_MESSAGE,
  serializeCustomerForApi,
} from "../lib/customer-serialize";

const router = Router();

const READ_ONLY_RESPONSE = {
  error: "read_only",
  message: CUSTOMER_READ_ONLY_MESSAGE,
};

router.get("/customers", async (req, res) => {
  const query = ListCustomersQueryParams.safeParse(req.query);
  if (!query.success) return res.status(400).json({ error: "Invalid query params" });
  const { search, page = 1, limit = 20 } = query.data;
  const offset = (page - 1) * limit;

  const conditions = search ? [ilike(customersTable.name, `%${search}%`)] : [];
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, totalResult] = await Promise.all([
    db.select().from(customersTable).where(where).limit(limit).offset(offset).orderBy(customersTable.createdAt),
    db.select({ count: sql<number>`count(*)::int` }).from(customersTable).where(where),
  ]);

  return res.json({
    data: rows.map(serializeCustomerForApi),
    total: totalResult[0].count,
    page,
    limit,
  });
});

router.post("/customers", (_req, res) => {
  return res.status(403).json(READ_ONLY_RESPONSE);
});

router.post("/customers/lookup-external", async (req, res) => {
  try {
    const externalIds = Array.isArray(req.body?.externalIds)
      ? req.body.externalIds.map(String).filter(Boolean)
      : [];
    if (externalIds.length === 0) {
      return res.json({ map: {} });
    }
    const rows = await db
      .select({ id: customersTable.id, externalId: customersTable.externalId })
      .from(customersTable)
      .where(inArray(customersTable.externalId, externalIds));
    const map: Record<string, number> = {};
    for (const row of rows) {
      if (row.externalId) map[row.externalId] = row.id;
    }
    return res.json({ map });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/customers/:id/overview", async (req, res) => {
  const id = parseInt(String(req.params.id), 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const overview = await getCustomerOverview(id);
  if (!overview) return res.status(404).json({ error: "Not found" });
  return res.json(overview);
});

router.post("/customers/:id/resync-marketing", async (req, res) => {
  const id = parseInt(String(req.params.id), 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    const { resyncErpCustomerFromMarketing } = await import("@/lib/cms-resync-from-marketing");
    const outcome = await resyncErpCustomerFromMarketing(id);
    if (outcome.status === "error") {
      return res.status(400).json(outcome);
    }
    return res.json(outcome);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/customers/:id", async (req, res) => {
  const params = GetCustomerParams.safeParse(req.params);
  if (!params.success) return res.status(400).json({ error: "Invalid id" });

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, params.data.id))
    .limit(1);
  if (!customer) return res.status(404).json({ error: "Not found" });
  return res.json(serializeCustomerForApi(customer));
});

router.patch("/customers/:id", (_req, res) => {
  return res.status(403).json(READ_ONLY_RESPONSE);
});

router.delete("/customers/:id", (_req, res) => {
  return res.status(403).json(READ_ONLY_RESPONSE);
});

export default router;
