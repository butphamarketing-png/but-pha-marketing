import { Router } from "express";
import {
  getOrCreateTaxSettings,
  updateTaxSettings,
  getVatQuarterlySummary,
  getTaxDeadlines,
  listIssuedInvoicesForQuarter,
  invoicesToCsv,
  listInputVatExpensesForQuarter,
  inputVatExpensesToCsv,
  getCurrentQuarter,
  getPitQuarterlySummary,
  listContractorPaymentsForQuarter,
  contractorPaymentsToCsv,
  getCitProvisionalSummary,
  citProvisionalToCsv,
} from "@/lib/cms-tax";
import {
  getTaxPeriodClosure,
  closeTaxPeriod,
  reopenTaxPeriod,
  buildTaxExportPackZip,
  getTaxReminderBanner,
} from "@/lib/cms-tax-closure";

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
      reminderEmail:
        typeof body.reminderEmail === "string" ? body.reminderEmail : body.reminderEmail ?? null,
      eInvoiceTemplateCode:
        typeof body.eInvoiceTemplateCode === "string"
          ? body.eInvoiceTemplateCode
          : body.eInvoiceTemplateCode ?? null,
      eInvoiceSymbol:
        typeof body.eInvoiceSymbol === "string" ? body.eInvoiceSymbol : body.eInvoiceSymbol ?? null,
      eInvoicePortalUrl:
        typeof body.eInvoicePortalUrl === "string"
          ? body.eInvoicePortalUrl
          : body.eInvoicePortalUrl ?? null,
    });
    return res.json(settings);
  } catch (error) {
    console.error("PUT /tax/settings failed", error);
    return res.status(500).json({ error: "Không lưu được cấu hình thuế." });
  }
});

router.get("/tax/vat-summary", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const summary = await getVatQuarterlySummary(parsed.year, parsed.quarter);
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

router.get("/tax/banner", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    const banner = await getTaxReminderBanner(parsed?.year, parsed?.quarter);
    return res.json(banner);
  } catch (error) {
    console.error("GET /tax/banner failed", error);
    return res.status(500).json({ error: "Không tải được nhắc hạn." });
  }
});

router.get("/tax/period", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const closure = await getTaxPeriodClosure(parsed.year, parsed.quarter);
    return res.json(closure);
  } catch (error) {
    console.error("GET /tax/period failed", error);
    return res.status(500).json({ error: "Không tải được trạng thái chốt kỳ." });
  }
});

router.post("/tax/period/close", async (req, res) => {
  try {
    const body = req.body ?? {};
    const year = Number(body.year);
    const quarter = Number(body.quarter);
    if (!Number.isFinite(year) || !Number.isFinite(quarter)) {
      return res.status(400).json({ error: "year và quarter không hợp lệ." });
    }
    const notes = typeof body.notes === "string" ? body.notes : null;
    const result = await closeTaxPeriod(year, quarter, "Admin", notes);
    return res.json(result);
  } catch (error) {
    console.error("POST /tax/period/close failed", error);
    return res.status(500).json({ error: "Không chốt được kỳ." });
  }
});

router.post("/tax/period/reopen", async (req, res) => {
  try {
    const body = req.body ?? {};
    const year = Number(body.year);
    const quarter = Number(body.quarter);
    if (!Number.isFinite(year) || !Number.isFinite(quarter)) {
      return res.status(400).json({ error: "year và quarter không hợp lệ." });
    }
    const closure = await reopenTaxPeriod(year, quarter);
    return res.json(closure);
  } catch (error) {
    console.error("POST /tax/period/reopen failed", error);
    return res.status(500).json({ error: "Không mở lại được kỳ." });
  }
});

router.get("/tax/vat-export", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const rows = await listIssuedInvoicesForQuarter(parsed.year, parsed.quarter);
    const csv = invoicesToCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="hoa-don-ban-ra-Q${parsed.quarter}-${parsed.year}.csv"`,
    );
    return res.send(csv);
  } catch (error) {
    console.error("GET /tax/vat-export failed", error);
    return res.status(500).json({ error: "Không xuất được sổ HĐ bán ra." });
  }
});

router.get("/tax/vat-input-export", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const rows = await listInputVatExpensesForQuarter(parsed.year, parsed.quarter);
    const csv = inputVatExpensesToCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="vat-dau-vao-Q${parsed.quarter}-${parsed.year}.csv"`,
    );
    return res.send(csv);
  } catch (error) {
    console.error("GET /tax/vat-input-export failed", error);
    return res.status(500).json({ error: "Không xuất được sổ VAT đầu vào." });
  }
});

router.get("/tax/pit-summary", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const summary = await getPitQuarterlySummary(parsed.year, parsed.quarter);
    return res.json(summary);
  } catch (error) {
    console.error("GET /tax/pit-summary failed", error);
    return res.status(500).json({ error: "Không tải được tổng hợp TNCN CTV." });
  }
});

router.get("/tax/pit-export", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const rows = await listContractorPaymentsForQuarter(parsed.year, parsed.quarter);
    const csv = contractorPaymentsToCsv(rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="tncn-ctv-Q${parsed.quarter}-${parsed.year}.csv"`,
    );
    return res.send(csv);
  } catch (error) {
    console.error("GET /tax/pit-export failed", error);
    return res.status(500).json({ error: "Không xuất được sổ TNCN CTV." });
  }
});

router.get("/tax/cit-summary", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const summary = await getCitProvisionalSummary(parsed.year, parsed.quarter);
    return res.json(summary);
  } catch (error) {
    console.error("GET /tax/cit-summary failed", error);
    return res.status(500).json({ error: "Không tải được tổng hợp TNDN." });
  }
});

router.get("/tax/cit-export", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const summary = await getCitProvisionalSummary(parsed.year, parsed.quarter);
    const csv = citProvisionalToCsv(summary);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="tndn-tam-nop-Q${parsed.quarter}-${parsed.year}.csv"`,
    );
    return res.send(csv);
  } catch (error) {
    console.error("GET /tax/cit-export failed", error);
    return res.status(500).json({ error: "Không xuất được tổng hợp TNDN." });
  }
});

router.get("/tax/export-pack", async (req, res) => {
  try {
    const parsed = parseYearQuarter(req);
    if (!parsed) return res.status(400).json({ error: "year và quarter không hợp lệ." });
    const settings = await getOrCreateTaxSettings();
    const zip = await buildTaxExportPackZip(parsed.year, parsed.quarter, settings.companyName);
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="goi-nop-gtgt-Q${parsed.quarter}-${parsed.year}.zip"`,
    );
    return res.send(zip);
  } catch (error) {
    console.error("GET /tax/export-pack failed", error);
    return res.status(500).json({ error: "Không xuất được gói ZIP." });
  }
});

export default router;
