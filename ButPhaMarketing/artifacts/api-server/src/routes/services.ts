import { Router } from "express";
import { db, services, insertServiceSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await db.query.services.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validated = insertServiceSchema.parse(req.body);
    const [item] = await db.insert(services).values(validated).returning();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid service data" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [item] = await db.update(services)
      .set(req.body)
      .where(eq(services.id, parseInt(id)))
      .returning();
      
    if (!item) return res.status(404).json({ error: "Service not found" });
    return res.json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update service" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(services).where(eq(services.id, parseInt(id)));
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;