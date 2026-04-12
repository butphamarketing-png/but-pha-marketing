import { Router } from "express";
import { db, leads, insertLeadSchema } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await db.query.leads.findMany({
      orderBy: [desc(leads.createdAt)],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validated = insertLeadSchema.parse(req.body);
    const [item] = await db.insert(leads).values(validated).returning();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid lead data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(leads).where(eq(leads.id, parseInt(id)));
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;