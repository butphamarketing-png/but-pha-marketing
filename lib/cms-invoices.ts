import {
  db,
  invoicesTable,
  invoiceLinesTable,
  invoiceReceiptsTable,
  receiptsTable,
  customersTable,
  contractsTable,
  billingPeriodsTable,
  type Invoice,
  type InvoiceLine,
} from "@/lib/cms-internal/db";
import { eq, and, sql, inArray } from "drizzle-orm";
import { assertInvoiceTaxId, validateVietnameseTaxId } from "@/lib/vietnamese-tax-id";
import { renderInvoiceHtml, type InvoicePrintData } from "@/lib/cms-invoice-html";
import { resolveEInvoiceStatusOnIssue } from "@/lib/cms-einvoice";

export type InvoiceStatus = "draft" | "issued" | "cancelled";

export function computeInvoiceTotals(subtotal: number, vatRate: number) {
  const safeSubtotal = Math.max(0, subtotal);
  const safeRate = Math.max(0, vatRate);
  const vatAmount = Math.round(safeSubtotal * safeRate) / 100;
  const totalAmount = Math.round((safeSubtotal + vatAmount) * 100) / 100;
  return { subtotal: safeSubtotal, vatRate: safeRate, vatAmount, totalAmount };
}

/** Số tiền thu thực tế (gross) → tách subtotal + VAT sao cho totalAmount = gross. */
export function computeInvoiceTotalsFromGross(grossTotal: number, vatRate: number) {
  const safeGross = Math.max(0, grossTotal);
  if (vatRate <= 0) return computeInvoiceTotals(safeGross, 0);
  const totalAmount = Math.round(safeGross * 100) / 100;
  const subtotal = Math.round((totalAmount / (1 + vatRate / 100)) * 100) / 100;
  const vatAmount = Math.round((totalAmount - subtotal) * 100) / 100;
  return { subtotal, vatRate, vatAmount, totalAmount };
}

export async function generateInvoiceCode(issueDate?: string): Promise<string> {
  const year = issueDate ? issueDate.slice(0, 4) : String(new Date().getFullYear());
  const prefix = `BP-${year}-`;
  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(invoicesTable)
    .where(sql`${invoicesTable.code} like ${prefix + "%"}`);
  const seq = (result?.count ?? 0) + 1;
  return `${prefix}${String(seq).padStart(4, "0")}`;
}

export function serializeInvoice(row: Invoice) {
  return {
    ...row,
    subtotal: parseFloat(row.subtotal ?? "0"),
    vatRate: parseFloat(row.vatRate ?? "0"),
    vatAmount: parseFloat(row.vatAmount ?? "0"),
    totalAmount: parseFloat(row.totalAmount ?? "0"),
  };
}

export function serializeInvoiceLine(row: InvoiceLine) {
  return {
    ...row,
    quantity: parseFloat(row.quantity ?? "1"),
    unitPrice: parseFloat(row.unitPrice ?? "0"),
    amount: parseFloat(row.amount ?? "0"),
  };
}

async function loadInvoiceLines(invoiceId: number) {
  const lines = await db
    .select()
    .from(invoiceLinesTable)
    .where(eq(invoiceLinesTable.invoiceId, invoiceId))
    .orderBy(invoiceLinesTable.lineNo);
  return lines.map(serializeInvoiceLine);
}

async function loadLinkedReceipts(invoiceId: number) {
  return db
    .select({
      receiptId: invoiceReceiptsTable.receiptId,
      amount: invoiceReceiptsTable.amount,
      code: receiptsTable.code,
      receiptDate: receiptsTable.receiptDate,
    })
    .from(invoiceReceiptsTable)
    .innerJoin(receiptsTable, eq(invoiceReceiptsTable.receiptId, receiptsTable.id))
    .where(eq(invoiceReceiptsTable.invoiceId, invoiceId));
}

export async function enrichInvoice(invoice: Invoice) {
  const [customer] = await db
    .select({ name: customersTable.name })
    .from(customersTable)
    .where(eq(customersTable.id, invoice.customerId))
    .limit(1);

  let contractCode: string | null = null;
  if (invoice.contractId) {
    const [contract] = await db
      .select({ code: contractsTable.code })
      .from(contractsTable)
      .where(eq(contractsTable.id, invoice.contractId))
      .limit(1);
    contractCode = contract?.code ?? null;
  }

  const [lines, linkedReceipts] = await Promise.all([
    loadInvoiceLines(invoice.id),
    loadLinkedReceipts(invoice.id),
  ]);

  const linkedAmount = linkedReceipts.reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);

  return {
    ...serializeInvoice(invoice),
    customerName: customer?.name ?? "Unknown",
    contractCode,
    lines,
    linkedReceipts: linkedReceipts.map((row) => ({
      receiptId: row.receiptId,
      code: row.code,
      receiptDate: row.receiptDate,
      amount: parseFloat(row.amount ?? "0"),
    })),
    linkedReceiptAmount: linkedAmount,
    reconciliationGap: Math.round((serializeInvoice(invoice).totalAmount - linkedAmount) * 100) / 100,
  };
}

type CreateInvoiceInput = {
  customerId: number;
  contractId?: number | null;
  billingPeriodId?: number | null;
  taxId?: string | null;
  buyerName: string;
  buyerAddress?: string | null;
  buyerEmail?: string | null;
  buyerPhone?: string | null;
  vatRate?: number;
  issueDate?: string;
  notes?: string | null;
  createdBy?: string;
  lines: Array<{
    description: string;
    unit?: string;
    quantity?: number;
    unitPrice: number;
  }>;
  receiptIds?: number[];
  fixedTotals?: ReturnType<typeof computeInvoiceTotals>;
};

export async function createInvoice(input: CreateInvoiceInput) {
  const issueDate = input.issueDate || new Date().toISOString().slice(0, 10);
  const vatRate = input.vatRate ?? 8;
  const lineSubtotal = input.lines.reduce(
    (sum, line) => sum + (line.quantity ?? 1) * line.unitPrice,
    0,
  );
  const totals = input.fixedTotals ?? computeInvoiceTotals(lineSubtotal, vatRate);
  const code = await generateInvoiceCode(issueDate);

  const normalizedTax = input.taxId ? validateVietnameseTaxId(input.taxId) : null;

  const [invoice] = await db
    .insert(invoicesTable)
    .values({
      code,
      customerId: input.customerId,
      contractId: input.contractId ?? null,
      billingPeriodId: input.billingPeriodId ?? null,
      taxId: normalizedTax?.valid ? normalizedTax.normalized : input.taxId ?? null,
      buyerName: input.buyerName.trim(),
      buyerAddress: input.buyerAddress ?? null,
      buyerEmail: input.buyerEmail ?? null,
      buyerPhone: input.buyerPhone ?? null,
      subtotal: String(totals.subtotal),
      vatRate: String(totals.vatRate),
      vatAmount: String(totals.vatAmount),
      totalAmount: String(totals.totalAmount),
      status: "draft",
      issueDate,
      notes: input.notes ?? null,
      createdBy: input.createdBy ?? "Admin",
    })
    .returning();

  await db.insert(invoiceLinesTable).values(
    input.lines.map((line, index) => ({
      invoiceId: invoice.id,
      lineNo: index + 1,
      description: line.description,
      unit: line.unit ?? "Gói",
      quantity: String(line.quantity ?? 1),
      unitPrice: String(line.unitPrice),
      amount: String(Math.round((line.quantity ?? 1) * line.unitPrice * 100) / 100),
    })),
  );

  if (input.receiptIds?.length) {
    await linkReceiptsToInvoice(invoice.id, input.receiptIds);
  }

  return enrichInvoice(invoice);
}

export async function createInvoiceFromBillingPeriod(
  billingPeriodId: number,
  options?: { vatRate?: number; issueDate?: string; notes?: string | null },
) {
  const [period] = await db
    .select()
    .from(billingPeriodsTable)
    .where(eq(billingPeriodsTable.id, billingPeriodId))
    .limit(1);
  if (!period) throw new Error("Billing period not found");

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, period.customerId))
    .limit(1);
  if (!customer) throw new Error("Customer not found");

  let contractCode: string | null = null;
  let contractNotes: string | null = null;
  if (period.contractId) {
    const [contract] = await db
      .select({ code: contractsTable.code, notes: contractsTable.notes })
      .from(contractsTable)
      .where(eq(contractsTable.id, period.contractId))
      .limit(1);
    contractCode = contract?.code ?? null;
    contractNotes = contract?.notes ?? null;
  }

  const amountDue = parseFloat(period.amountDue ?? "0");
  const description = contractNotes || `Dịch vụ kỳ ${period.label || period.periodStart}`;
  const defaultVatRate =
    customer.customerType === "company" && customer.needsVatInvoice ? 8 : 0;

  return createInvoice({
    customerId: period.customerId,
    contractId: period.contractId,
    billingPeriodId: period.id,
    taxId: customer.customerType === "company" ? customer.taxId : null,
    buyerName: customer.name,
    buyerAddress: customer.invoiceAddress || customer.address,
    buyerEmail: customer.email,
    buyerPhone: customer.phone,
    vatRate: options?.vatRate ?? defaultVatRate,
    issueDate: options?.issueDate,
    notes: options?.notes ?? `Hóa đơn kỳ thu ${period.label || period.periodStart}${contractCode ? ` — HĐ ${contractCode}` : ""}`,
    lines: [{ description, unitPrice: amountDue, quantity: 1 }],
  });
}

export async function createInvoiceFromReceipt(
  receiptId: number,
  options?: { vatRate?: number; issueDate?: string; notes?: string | null },
) {
  const [receipt] = await db
    .select()
    .from(receiptsTable)
    .where(eq(receiptsTable.id, receiptId))
    .limit(1);
  if (!receipt) throw new Error("Receipt not found");

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, receipt.customerId))
    .limit(1);
  if (!customer) throw new Error("Customer not found");

  let contractCode: string | null = null;
  if (receipt.contractId) {
    const [contract] = await db
      .select({ code: contractsTable.code })
      .from(contractsTable)
      .where(eq(contractsTable.id, receipt.contractId))
      .limit(1);
    contractCode = contract?.code ?? null;
  }

  const amount = parseFloat(receipt.amount ?? "0");
  const description = receipt.notes?.trim()
    || `Thanh toán phiếu thu ${receipt.code}${contractCode ? ` — HĐ ${contractCode}` : ""}`;
  const defaultVatRate =
    customer.customerType === "company" && customer.needsVatInvoice ? 8 : 0;
  const totals = computeInvoiceTotalsFromGross(amount, options?.vatRate ?? defaultVatRate);

  return createInvoice({
    customerId: receipt.customerId,
    contractId: receipt.contractId,
    billingPeriodId: receipt.billingPeriodId,
    taxId: customer.customerType === "company" ? customer.taxId : null,
    buyerName: customer.name,
    buyerAddress: customer.invoiceAddress || customer.address,
    buyerEmail: customer.email,
    buyerPhone: customer.phone,
    vatRate: totals.vatRate,
    issueDate: options?.issueDate ?? receipt.receiptDate,
    notes: options?.notes ?? `Tạo từ phiếu thu ${receipt.code}`,
    lines: [{ description, unitPrice: totals.subtotal, quantity: 1 }],
    receiptIds: [receiptId],
    fixedTotals: totals,
  });
}

export async function linkReceiptsToInvoice(invoiceId: number, receiptIds: number[]) {
  const [invoice] = await db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.id, invoiceId))
    .limit(1);
  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status === "cancelled") throw new Error("Cannot link receipts to cancelled invoice");

  const uniqueIds = [...new Set(receiptIds)];
  if (uniqueIds.length === 0) return enrichInvoice(invoice);

  const receipts = await db
    .select()
    .from(receiptsTable)
    .where(inArray(receiptsTable.id, uniqueIds));

  if (receipts.length !== uniqueIds.length) {
    throw new Error("One or more receipts not found");
  }

  for (const receipt of receipts) {
    if (receipt.customerId !== invoice.customerId) {
      throw new Error(`Receipt ${receipt.code} belongs to a different customer`);
    }
  }

  const existingLinks = await db
    .select({ receiptId: invoiceReceiptsTable.receiptId, invoiceId: invoiceReceiptsTable.invoiceId })
    .from(invoiceReceiptsTable)
    .where(inArray(invoiceReceiptsTable.receiptId, uniqueIds));

  const conflict = existingLinks.find((link) => link.invoiceId !== invoiceId);
  if (conflict) {
    throw new Error(`Receipt #${conflict.receiptId} is already linked to another invoice`);
  }

  const currentLinks = await loadLinkedReceipts(invoiceId);
  const currentTotal = currentLinks.reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);
  const newTotal = receipts.reduce((sum, row) => sum + parseFloat(row.amount ?? "0"), 0);
  const invoiceTotal = parseFloat(invoice.totalAmount ?? "0");

  if (currentTotal + newTotal > invoiceTotal + 0.01) {
    throw new Error("Linked receipt amounts exceed invoice total");
  }

  for (const receipt of receipts) {
    const alreadyLinked = currentLinks.some((link) => link.receiptId === receipt.id);
    if (alreadyLinked) continue;

    await db.insert(invoiceReceiptsTable).values({
      invoiceId,
      receiptId: receipt.id,
      amount: receipt.amount,
    });
  }

  const [updated] = await db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.id, invoiceId))
    .limit(1);

  return enrichInvoice(updated!);
}

export async function issueInvoice(invoiceId: number) {
  const [invoice] = await db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.id, invoiceId))
    .limit(1);
  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status === "cancelled") throw new Error("Cannot issue cancelled invoice");
  if (invoice.status === "issued") return enrichInvoice(invoice);

  const vatRate = parseFloat(invoice.vatRate ?? "0");
  const taxCheck = assertInvoiceTaxId(vatRate, invoice.taxId, invoice.buyerName);
  if (taxCheck && !taxCheck.valid) {
    throw new Error(taxCheck.error || "MST không hợp lệ");
  }

  if (vatRate > 0 && !invoice.buyerAddress?.trim()) {
    throw new Error("Địa chỉ người mua bắt buộc khi xuất hóa đơn có VAT");
  }

  const [updated] = await db
    .update(invoicesTable)
    .set({
      status: "issued",
      eInvoiceStatus: resolveEInvoiceStatusOnIssue(vatRate),
      updatedAt: new Date(),
    })
    .where(eq(invoicesTable.id, invoiceId))
    .returning();

  return enrichInvoice(updated);
}

export async function cancelInvoice(invoiceId: number) {
  const [updated] = await db
    .update(invoicesTable)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(invoicesTable.id, invoiceId))
    .returning();
  if (!updated) throw new Error("Invoice not found");
  return enrichInvoice(updated);
}

export async function buildInvoicePrintData(invoiceId: number): Promise<InvoicePrintData> {
  const [invoice] = await db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.id, invoiceId))
    .limit(1);
  if (!invoice) throw new Error("Invoice not found");

  const enriched = await enrichInvoice(invoice);
  return {
    code: enriched.code,
    status: enriched.status,
    issueDate: enriched.issueDate,
    buyerName: enriched.buyerName,
    buyerTaxId: enriched.taxId,
    buyerAddress: enriched.buyerAddress,
    buyerEmail: enriched.buyerEmail,
    buyerPhone: enriched.buyerPhone,
    subtotal: enriched.subtotal,
    vatRate: enriched.vatRate,
    vatAmount: enriched.vatAmount,
    totalAmount: enriched.totalAmount,
    notes: enriched.notes,
    contractCode: enriched.contractCode,
    receiptCodes: enriched.linkedReceipts.map((row) => row.code),
    lines: enriched.lines.map((line) => ({
      lineNo: line.lineNo,
      description: line.description,
      unit: line.unit,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      amount: line.amount,
    })),
  };
}

export async function renderInvoiceDocument(invoiceId: number): Promise<string> {
  const data = await buildInvoicePrintData(invoiceId);
  return renderInvoiceHtml(data);
}

export async function getInvoiceReconciliationReport() {
  const [invoices, receipts, links] = await Promise.all([
    db.select().from(invoicesTable).where(sql`${invoicesTable.status} != 'cancelled'`),
    db.select().from(receiptsTable),
    db.select().from(invoiceReceiptsTable),
  ]);

  const linkedReceiptIds = new Set(links.map((link) => link.receiptId));
  const linksByInvoice = new Map<number, typeof links>();
  for (const link of links) {
    const list = linksByInvoice.get(link.invoiceId) ?? [];
    list.push(link);
    linksByInvoice.set(link.invoiceId, list);
  }

  const unlinkedReceipts = receipts
    .filter((receipt) => !linkedReceiptIds.has(receipt.id))
    .map((receipt) => ({
      id: receipt.id,
      code: receipt.code,
      customerId: receipt.customerId,
      amount: parseFloat(receipt.amount ?? "0"),
      receiptDate: receipt.receiptDate,
    }));

  const invoiceRows = invoices.map((invoice) => {
    const serialized = serializeInvoice(invoice);
    const invoiceLinks = linksByInvoice.get(invoice.id) ?? [];
    const linkedAmount = invoiceLinks.reduce((sum, link) => sum + parseFloat(link.amount ?? "0"), 0);
    return {
      id: invoice.id,
      code: invoice.code,
      status: invoice.status,
      customerId: invoice.customerId,
      totalAmount: serialized.totalAmount,
      linkedReceiptAmount: linkedAmount,
      gap: Math.round((serialized.totalAmount - linkedAmount) * 100) / 100,
      fullyReconciled: Math.abs(serialized.totalAmount - linkedAmount) < 0.01,
    };
  });

  return {
    summary: {
      invoiceCount: invoices.length,
      unlinkedReceiptCount: unlinkedReceipts.length,
      unlinkedReceiptAmount: unlinkedReceipts.reduce((sum, row) => sum + row.amount, 0),
      invoicesWithGap: invoiceRows.filter((row) => !row.fullyReconciled).length,
    },
    unlinkedReceipts,
    invoices: invoiceRows,
  };
}

export function validateTaxIdInput(taxId: string) {
  return validateVietnameseTaxId(taxId);
}
