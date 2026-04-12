import { Router } from "express";
import { db, siteSettings, insertSiteSettingsSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await db.query.siteSettings.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const item = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, key),
    });
    if (!item) return res.status(404).json({ error: "Setting not found" });
    return res.json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch setting" });
  }
});

router.post("/", async (req, res) => {
  try {
    const validated = insertSiteSettingsSchema.parse(req.body);
    const [item] = await db.insert(siteSettings)
      .values(validated)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: validated.value, updatedAt: new Date() },
      })
      .returning();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid setting data" });
  }
});

export default router;