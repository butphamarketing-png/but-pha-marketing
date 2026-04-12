import { Router } from "express";
import { db, clientPortals, insertClientPortalSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await db.query.clientPortals.findMany();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch client portals" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validated = insertClientPortalSchema.parse(req.body);
    const [item] = await db.insert(clientPortals).values(validated).returning();
    return res.status(201).json(item);
  } catch (err: any) {
    console.error("Error creating portal:", err);
    return res.status(400).json({ error: err.message || "Invalid client portal data" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [item] = await db.update(clientPortals)
      .set(req.body)
      .where(eq(clientPortals.id, parseInt(id)))
      .returning();
      
    if (!item) return res.status(404).json({ error: "Client portal not found" });
    return res.json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update client portal" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(clientPortals).where(eq(clientPortals.id, parseInt(id)));
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete client portal" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const item = await db.query.clientPortals.findFirst({
      where: eq(clientPortals.username, username),
    });
    
    if (item && item.password === password) {
      return res.json(item);
    }
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;
