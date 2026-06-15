import { Router } from "express";
import {
  getEInvoiceSummary,
  listEInvoiceQueue,
  registerEInvoice,
  revertEInvoiceRegistration,
  eInvoiceQueueToCsv,
} from "@/lib/cms-einvoice";
import { getCurrentQuarter, updateTaxSettings } from "@/lib/cms-tax";

const router = Router();

function parseYearQuarter(req: { query: Record<string, unknown> }) {
  const now = getCurrentQuarter();
  const year = req.query.year ? parseInt(String(req.query.year), 10) : now.year;
  const quarter = req.query.quarter ? parseInt(String(req.query.quarter), 10) : now.quarter;
  if (!Number.isFinite(year) || !Number.isFinite(quarter) || quarter < 1 || quarter > 4) {
    return null;
  }
  return { year, quarter };
}

router.get("/einvoice/summary", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const summary = await getEInvoiceSummary(parsed.year, parsed.quarter);
    return res.json(summary);
  } catch (error) {
    console.error("GET /einvoice/summary failed", error);
    return res.status(500).json({ error: "Không tải được tổng hợp HĐĐT." });
  }
});

router.get("/einvoice/queue", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    const rows = await listEInvoiceQueue(parsed?.year, parsed?.quarter);
    return res.json({ data: rows, total: rows.length });
  } catch (error) {
    console.error("GET /einvoice/queue failed", error);
    return res.status(500).json({ error: "Không tải được hàng đợi HĐĐT." });
  }
});

router.get("/einvoice/export", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    const rows = await listEInvoiceQueue(parsed?.year, parsed?.quarter);
    const csv = eInvoiceQueueToCsv(rows);
    const suffix = parsed ? `Q${parsed.quarter}-${parsed.year}` : "all";
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="hddt-cho-phat-hanh-${suffix}.csv"`);
    return res.send(csv);
  } catch (error) {
    console.error("GET /einvoice/export failed", error);
    return res.status(500).json({ error: "Không xuất được CSV HĐĐT." });
  }
});

router.post("/einvoice/invoices/:id/register", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
    const body = req.body ?? {};
    const updated = await registerEInvoice(id, {
      eInvoiceSymbol: body.eInvoiceSymbol,
      eInvoiceNumber: String(body.eInvoiceNumber ?? ""),
      eInvoiceLookupCode: body.eInvoiceLookupCode,
      eInvoiceLookupUrl: body.eInvoiceLookupUrl,
    });
    return res.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không ghi nhận được HĐĐT.";
    return res.status(400).json({ error: message });
  }
});

router.post("/einvoice/invoices/:id/revert", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
    const updated = await revertEInvoiceRegistration(id);
    return res.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không hoàn tác được.";
    return res.status(400).json({ error: message });
  }
});

router.put("/einvoice/settings", async (req, res) => {
  try {
    const body = req.body ?? {};
    const settings = await updateTaxSettings({
      eInvoiceTemplateCode:
        typeof body.eInvoiceTemplateCode === "string" ? body.eInvoiceTemplateCode : body.eInvoiceTemplateCode ?? null,
      eInvoiceSymbol:
        typeof body.eInvoiceSymbol === "string" ? body.eInvoiceSymbol : body.eInvoiceSymbol ?? null,
      eInvoicePortalUrl:
        typeof body.eInvoicePortalUrl === "string" ? body.eInvoicePortalUrl : body.eInvoicePortalUrl ?? null,
    });
    return res.json(settings);
  } catch (error) {
    console.error("PUT /einvoice/settings failed", error);
    return res.status(500).json({ error: "Không lưu được cấu hình HĐĐT." });
  }
});

export default router;
