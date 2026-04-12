import { Router } from "express";
import { db, orders, insertOrderSchema } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await db.query.orders.findMany({
      orderBy: [desc(orders.createdAt)],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validated = insertOrderSchema.parse(req.body);
    const [item] = await db.insert(orders).values(validated).returning();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid order data" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status is required" });
    
    const [item] = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, parseInt(id)))
      .returning();
      
    if (!item) return res.status(404).json({ error: "Order not found" });
    return res.json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update order" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(orders).where(eq(orders.id, parseInt(id)));
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});

export default router;