import { Router } from "express";
import { db, invoicesTable, customersTable } from "@/lib/cms-internal/db";
import { eq, sql, and, desc } from "drizzle-orm";
import {
  cancelInvoice,
  deleteInvoiceById,
  createInvoice,
  createInvoiceFromBillingPeriod,
  createInvoiceFromReceipt,
  enrichInvoice,
  issueInvoice,
  linkReceiptsToInvoice,
  renderInvoiceDocument,
  validateTaxIdInput,
  computeInvoiceTotals,
  getInvoiceReconciliationReport,
} from "@/lib/cms-invoices";

const router = Router();

router.get("/invoices", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page)) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(String(req.query.limit)) || 20));
    const offset = (page - 1) * limit;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const customerId = req.query.customerId ? parseInt(String(req.query.customerId)) : undefined;

    const conditions = [];
    if (status) conditions.push(eq(invoicesTable.status, status));
    if (customerId) conditions.push(eq(invoicesTable.customerId, customerId));
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db
        .select({
          invoice: invoicesTable,
          customerName: customersTable.name,
        })
        .from(invoicesTable)
        .leftJoin(customersTable, eq(invoicesTable.customerId, customersTable.id))
        .where(where)
        .orderBy(desc(invoicesTable.issueDate), desc(invoicesTable.id))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(invoicesTable).where(where),
    ]);

    const data = await Promise.all(rows.map((row) => enrichInvoice(row.invoice)));
    const total = countResult[0]?.count ?? 0;

    return res.json({
      data: data.map((item, index) => ({
        ...item,
        customerName: rows[index]?.customerName ?? item.customerName,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/invoices", async (req, res) => {
  try {
    const body = req.body ?? {};
    if (!body.customerId || !body.buyerName || !Array.isArray(body.lines) || body.lines.length === 0) {
      return res.status(400).json({ error: "Missing customerId, buyerName, or lines" });
    }

    const invoice = await createInvoice({
      customerId: Number(body.customerId),
      contractId: body.contractId ?? null,
      billingPeriodId: body.billingPeriodId ?? null,
      taxId: body.taxId ?? null,
      buyerName: String(body.buyerName),
      buyerAddress: body.buyerAddress ?? null,
      buyerEmail: body.buyerEmail ?? null,
      buyerPhone: body.buyerPhone ?? null,
      vatRate: body.vatRate !== undefined ? Number(body.vatRate) : 8,
      issueDate: body.issueDate ? String(body.issueDate) : undefined,
      notes: body.notes ?? null,
      createdBy: body.createdBy ?? "Admin",
      lines: body.lines.map((line: Record<string, unknown>) => ({
        description: String(line.description ?? ""),
        unit: line.unit ? String(line.unit) : "Gói",
        quantity: line.quantity !== undefined ? Number(line.quantity) : 1,
        unitPrice: Number(line.unitPrice ?? 0),
      })),
      receiptIds: Array.isArray(body.receiptIds) ? body.receiptIds.map(Number) : undefined,
    });

    return res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Create failed" });
  }
});

router.post("/invoices/from-billing-period", async (req, res) => {
  try {
    const billingPeriodId = Number(req.body?.billingPeriodId);
    if (!billingPeriodId) return res.status(400).json({ error: "billingPeriodId required" });

    const invoice = await createInvoiceFromBillingPeriod(billingPeriodId, {
      vatRate: req.body?.vatRate !== undefined ? Number(req.body.vatRate) : undefined,
      issueDate: req.body?.issueDate ? String(req.body.issueDate) : undefined,
      notes: req.body?.notes ?? null,
    });
    return res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Create failed" });
  }
});

router.post("/invoices/from-receipt", async (req, res) => {
  try {
    const receiptId = Number(req.body?.receiptId);
    if (!receiptId) return res.status(400).json({ error: "receiptId required" });

    const invoice = await createInvoiceFromReceipt(receiptId, {
      vatRate: req.body?.vatRate !== undefined ? Number(req.body.vatRate) : undefined,
      issueDate: req.body?.issueDate ? String(req.body.issueDate) : undefined,
      notes: req.body?.notes ?? null,
    });
    return res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Create failed" });
  }
});

router.post("/invoices/validate-tax-id", async (req, res) => {
  const taxId = String(req.body?.taxId ?? "");
  return res.json(validateTaxIdInput(taxId));
});

router.post("/invoices/preview-totals", async (req, res) => {
  const subtotal = Number(req.body?.subtotal ?? 0);
  const vatRate = Number(req.body?.vatRate ?? 8);
  return res.json(computeInvoiceTotals(subtotal, vatRate));
});

router.get("/invoices/reconciliation", async (_req, res) => {
  try {
    return res.json(await getInvoiceReconciliationReport());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/invoices/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [invoice] = await db.select().from(invoicesTable).where(eq(invoicesTable.id, id)).limit(1);
    if (!invoice) return res.status(404).json({ error: "Not found" });
    return res.json(await enrichInvoice(invoice));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/invoices/:id/html", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const html = await renderInvoiceDocument(id);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(html);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Render failed";
    return res.status(err instanceof Error && message === "Invoice not found" ? 404 : 500).json({ error: message });
  }
});

router.get("/invoices/:id/pdf", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [invoice] = await db.select({ code: invoicesTable.code }).from(invoicesTable).where(eq(invoicesTable.id, id)).limit(1);
    if (!invoice) return res.status(404).json({ error: "Not found" });

    const html = await renderInvoiceDocument(id);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Content-Disposition", `inline; filename="${invoice.code}.html"`);
    return res.send(html);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err instanceof Error ? err.message : "Render failed" });
  }
});

router.patch("/invoices/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [existing] = await db.select().from(invoicesTable).where(eq(invoicesTable.id, id)).limit(1);
    if (!existing) return res.status(404).json({ error: "Not found" });
    if (existing.status === "issued") {
      return res.status(400).json({ error: "Issued invoices cannot be edited. Cancel and recreate." });
    }
    if (existing.status === "cancelled") {
      return res.status(400).json({ error: "Cancelled invoices cannot be edited" });
    }

    const body = req.body ?? {};
    const upd: Record<string, unknown> = { updatedAt: new Date() };
    if (body.buyerName !== undefined) upd.buyerName = String(body.buyerName);
    if (body.buyerAddress !== undefined) upd.buyerAddress = body.buyerAddress;
    if (body.buyerEmail !== undefined) upd.buyerEmail = body.buyerEmail;
    if (body.buyerPhone !== undefined) upd.buyerPhone = body.buyerPhone;
    if (body.taxId !== undefined) {
      const validation = validateTaxIdInput(String(body.taxId ?? ""));
      upd.taxId = validation.valid ? validation.normalized : body.taxId;
    }
    if (body.issueDate !== undefined) upd.issueDate = String(body.issueDate);
    if (body.notes !== undefined) upd.notes = body.notes;

    if (body.subtotal !== undefined || body.vatRate !== undefined) {
      const subtotal = body.subtotal !== undefined
        ? Number(body.subtotal)
        : parseFloat(existing.subtotal ?? "0");
      const vatRate = body.vatRate !== undefined
        ? Number(body.vatRate)
        : parseFloat(existing.vatRate ?? "0");
      const totals = computeInvoiceTotals(subtotal, vatRate);
      upd.subtotal = String(totals.subtotal);
      upd.vatRate = String(totals.vatRate);
      upd.vatAmount = String(totals.vatAmount);
      upd.totalAmount = String(totals.totalAmount);
    }

    const [updated] = await db.update(invoicesTable).set(upd).where(eq(invoicesTable.id, id)).returning();
    return res.json(await enrichInvoice(updated));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/invoices/:id/issue", async (req, res) => {
  try {
    const invoice = await issueInvoice(parseInt(req.params.id));
    return res.json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Issue failed" });
  }
});

router.post("/invoices/:id/cancel", async (req, res) => {
  try {
    const invoice = await cancelInvoice(parseInt(req.params.id));
    return res.json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Cancel failed" });
  }
});

router.delete("/invoices/:id", async (req, res) => {
  try {
    await deleteInvoiceById(parseInt(req.params.id));
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Delete failed";
    const status = message.includes("not found") ? 404 : 400;
    return res.status(status).json({ error: message });
  }
});

router.post("/invoices/:id/link-receipts", async (req, res) => {
  try {
    const receiptIds = Array.isArray(req.body?.receiptIds)
      ? req.body.receiptIds.map(Number)
      : [];
    if (!receiptIds.length) return res.status(400).json({ error: "receiptIds required" });

    const invoice = await linkReceiptsToInvoice(parseInt(req.params.id), receiptIds);
    return res.json(invoice);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err instanceof Error ? err.message : "Link failed" });
  }
});

export default router;
