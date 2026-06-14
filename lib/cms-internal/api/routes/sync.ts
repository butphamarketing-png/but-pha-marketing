import { Router } from "express";
import { syncCustomerRecordsToCms } from "@/lib/cms-customer-sync";
import type { CustomerRecord } from "@/lib/customer-records";

const router = Router();

router.post("/sync/customer-records", async (req, res) => {
  try {
    const records = req.body?.records;
    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ error: "Body must include non-empty records array" });
    }

    const result = await syncCustomerRecordsToCms(records as CustomerRecord[]);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
