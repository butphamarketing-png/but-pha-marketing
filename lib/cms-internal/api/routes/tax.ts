import { Router } from "express";
import {
  getOrCreateTaxSettings,
  updateTaxSettings,
  getVatQuarterlySummary,
  getTaxDeadlines,
  listIssuedInvoicesForQuarter,
  invoicesToCsv,
  getCurrentQuarter,
} from "@/lib/cms-tax";

const router = Router();

router.get("/tax/settings", async (_req, res) => {
  try {
    const settings = await getOrCreateTaxSettings();
    return res.json(settings);
  } catch (error) {
    console.error("GET /tax/settings failed", error);
    return res.status(500).json({ error: "Không tải được cấu hình thuế." });
  }
});

router.put("/tax/settings", async (req, res) => {
  try {
    const body = req.body ?? {};
    const settings = await updateTaxSettings({
      entityType: typeof body.entityType === "string" ? body.entityType : undefined,
      companyName: typeof body.companyName === "string" ? body.companyName : body.companyName ?? null,
      companyTaxId: typeof body.companyTaxId === "string" ? body.companyTaxId : body.companyTaxId ?? null,
      companyAddress:
        typeof body.companyAddress === "string" ? body.companyAddress : body.companyAddress ?? null,
      vatFilingPeriod:
        body.vatFilingPeriod === "monthly" || body.vatFilingPeriod === "quarterly"
          ? body.vatFilingPeriod
          : undefined,
      vatDefaultRate: body.vatDefaultRate !== undefined ? Number(body.vatDefaultRate) : undefined,
      citRate: body.citRate !== undefined ? Number(body.citRate) : undefined,
      quarterlyVatDueDay:
        body.quarterlyVatDueDay !== undefined ? Number(body.quarterlyVatDueDay) : undefined,
    });
    return res.json(settings);
  } catch (error) {
    console.error("PUT /tax/settings failed", error);
    return res.status(500).json({ error: "Không lưu được cấu hình thuế." });
  }
});

router.get("/tax/vat-summary", async (req, res) => {
  try {
    const now = getCurrentQuarter();
    const year = req.query.year ? parseInt(String(req.query.year), 10) : now.year;
    const quarter = req.query.quarter ? parseInt(String(req.query.quarter), 10) : now.quarter;
    if (!Number.isFinite(year) || !Number.isFinite(quarter) || quarter < 1 || quarter > 4) {
      return res.status(400).json({ error: "year và quarter không hợp lệ." });
    }
    const summary = await getVatQuarterlySummary(year, quarter);
    return res.json(summary);
  } catch (error) {
    console.error("GET /tax/vat-summary failed", error);
    return res.status(500).json({ error: "Không tải được tổng hợp GTGT." });
  }
});

router.get("/tax/deadlines", async (req, res) => {
  try {
    const year = req.query.year ? parseInt(String(req.query.year), 10) : new Date().getFullYear();
    if (!Number.isFinite(year)) {
      return res.status(400).json({ error: "year không hợp lệ." });
    }
    const deadlines = await getTaxDeadlines(year);
    return res.json({ year, items: deadlines });
  } catch (error) {
    console.error("GET /tax/deadlines failed", error);
    return res.status(500).json({ error: "Không tải được lịch hạn nộp." });
  }
});

router.get("/tax/vat-export", async (req, res) => {
  try {
    const now = getCurrentQuarter();
    const year = req.query.year ? parseInt(String(req.query.year), 10) : now.year;
    const quarter = req.query.quarter ? parseInt(String(req.query.quarter), 10) : now.quarter;
    if (!Number.isFinite(year) || !Number.isFinite(quarter)) {
      return res.status(400).json({ error: "year và quarter không hợp lệ." });
    }
    const rows = await listIssuedInvoicesForQuarter(year, quarter);
    const csv = invoicesToCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="hoa-don-ban-ra-Q${quarter}-${year}.csv"`,
    );
    return res.send(csv);
  } catch (error) {
    console.error("GET /tax/vat-export failed", error);
    return res.status(500).json({ error: "Không xuất được sổ HĐ bán ra." });
  }
});

export default router;
