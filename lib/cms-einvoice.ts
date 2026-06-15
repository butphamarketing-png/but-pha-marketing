import { db, invoicesTable, invoiceLinesTable } from "@/lib/cms-internal/db";
import { and, eq, gte, lte, sql, asc } from "drizzle-orm";
import { getOrCreateTaxSettings, getQuarterRange } from "@/lib/cms-tax";
import { validateVietnameseTaxId } from "@/lib/vietnamese-tax-id";

export type EInvoiceStatus = "not_applicable" | "pending" | "registered" | "cancelled";

export type EInvoiceReadiness = {
  ready: boolean;
  blockers: string[];
  warnings: string[];
};

export function checkEInvoiceReadiness(invoice: {
  status: string;
  vatRate: number;
  taxId: string | null;
  buyerName: string;
  buyerAddress: string | null;
  totalAmount: number;
}): EInvoiceReadiness {
  const blockers: string[] = [];
  const warnings: string[] = [];

  if (invoice.status !== "issued") {
    blockers.push("Hóa đơn nội bộ chưa ở trạng thái issued.");
  }
  if (invoice.vatRate <= 0) {
    blockers.push("Hóa đơn không có VAT — không cần HĐĐT GTGT.");
  }
  if (!invoice.taxId?.trim()) {
    blockers.push("Thiếu MST người mua.");
  } else {
    const tax = validateVietnameseTaxId(invoice.taxId);
    if (!tax.valid) blockers.push(tax.error || "MST người mua không hợp lệ.");
  }
  if (!invoice.buyerAddress?.trim()) {
    blockers.push("Thiếu địa chỉ người mua.");
  }
  if (!invoice.buyerName?.trim()) {
    blockers.push("Thiếu tên người mua.");
  }
  if (invoice.totalAmount <= 0) {
    blockers.push("Tổng tiền hóa đơn phải > 0.");
  }

  return { ready: blockers.length === 0, blockers, warnings };
}

export type EInvoiceSummary = {
  year: number;
  quarter: number;
  label: string;
  fromDate: string;
  toDate: string;
  issuedWithVat: number;
  pendingEInvoice: number;
  registeredEInvoice: number;
  notApplicable: number;
  portalUrl: string;
  defaultSymbol: string | null;
  defaultTemplateCode: string | null;
};

export async function getEInvoiceSummary(year: number, quarter: number): Promise<EInvoiceSummary> {
  const range = getQuarterRange(year, quarter);
  const settings = await getOrCreateTaxSettings();

  const where = and(
    gte(invoicesTable.issueDate, range.fromDate),
    lte(invoicesTable.issueDate, range.toDate),
    eq(invoicesTable.status, "issued"),
  );

  const [agg] = await db
    .select({
      issuedWithVat: sql<number>`count(*) filter (where ${invoicesTable.vatRate}::numeric > 0)::int`,
      pending: sql<number>`count(*) filter (where ${invoicesTable.eInvoiceStatus} = 'pending')::int`,
      registered: sql<number>`count(*) filter (where ${invoicesTable.eInvoiceStatus} = 'registered')::int`,
      notApplicable: sql<number>`count(*) filter (where ${invoicesTable.eInvoiceStatus} = 'not_applicable')::int`,
    })
    .from(invoicesTable)
    .where(where);

  return {
    year,
    quarter: range.quarter,
    label: range.label,
    fromDate: range.fromDate,
    toDate: range.toDate,
    issuedWithVat: agg?.issuedWithVat ?? 0,
    pendingEInvoice: agg?.pending ?? 0,
    registeredEInvoice: agg?.registered ?? 0,
    notApplicable: agg?.notApplicable ?? 0,
    portalUrl: settings.eInvoicePortalUrl ?? "https://hoadondientu.gdt.gov.vn",
    defaultSymbol: settings.eInvoiceSymbol,
    defaultTemplateCode: settings.eInvoiceTemplateCode,
  };
}

export async function listEInvoiceQueue(year?: number, quarter?: number) {
  const conditions = [
    eq(invoicesTable.status, "issued"),
    eq(invoicesTable.eInvoiceStatus, "pending"),
    sql`${invoicesTable.vatRate}::numeric > 0`,
  ];

  if (year && quarter) {
    const range = getQuarterRange(year, quarter);
    conditions.push(gte(invoicesTable.issueDate, range.fromDate));
    conditions.push(lte(invoicesTable.issueDate, range.toDate));
  }

  const rows = await db
    .select({
      id: invoicesTable.id,
      code: invoicesTable.code,
      buyerName: invoicesTable.buyerName,
      taxId: invoicesTable.taxId,
      buyerAddress: invoicesTable.buyerAddress,
      issueDate: invoicesTable.issueDate,
      subtotal: invoicesTable.subtotal,
      vatRate: invoicesTable.vatRate,
      vatAmount: invoicesTable.vatAmount,
      totalAmount: invoicesTable.totalAmount,
      eInvoiceStatus: invoicesTable.eInvoiceStatus,
      eInvoiceSymbol: invoicesTable.eInvoiceSymbol,
      eInvoiceNumber: invoicesTable.eInvoiceNumber,
      eInvoiceLookupCode: invoicesTable.eInvoiceLookupCode,
    })
    .from(invoicesTable)
    .where(and(...conditions))
    .orderBy(asc(invoicesTable.issueDate), asc(invoicesTable.id));

  return Promise.all(
    rows.map(async (row) => {
      const readiness = checkEInvoiceReadiness({
        status: "issued",
        vatRate: parseFloat(row.vatRate ?? "0"),
        taxId: row.taxId,
        buyerName: row.buyerName,
        buyerAddress: row.buyerAddress,
        totalAmount: parseFloat(row.totalAmount ?? "0"),
      });
      const [line] = await db
        .select({ description: invoiceLinesTable.description })
        .from(invoiceLinesTable)
        .where(eq(invoiceLinesTable.invoiceId, row.id))
        .orderBy(invoiceLinesTable.lineNo)
        .limit(1);
      return {
        ...row,
        subtotal: parseFloat(row.subtotal ?? "0"),
        vatRate: parseFloat(row.vatRate ?? "0"),
        vatAmount: parseFloat(row.vatAmount ?? "0"),
        totalAmount: parseFloat(row.totalAmount ?? "0"),
        lineDescription: line?.description ?? "",
        readiness,
      };
    }),
  );
}

export async function registerEInvoice(
  invoiceId: number,
  input: {
    eInvoiceSymbol?: string | null;
    eInvoiceNumber: string;
    eInvoiceLookupCode?: string | null;
    eInvoiceLookupUrl?: string | null;
  },
) {
  const [invoice] = await db.select().from(invoicesTable).where(eq(invoicesTable.id, invoiceId)).limit(1);
  if (!invoice) throw new Error("Không tìm thấy hóa đơn.");
  if (invoice.status !== "issued") throw new Error("Chỉ ghi nhận HĐĐT cho hóa đơn đã issued.");
  if (!input.eInvoiceNumber?.trim()) throw new Error("Số HĐĐT bắt buộc.");

  const settings = await getOrCreateTaxSettings();
  const [updated] = await db
    .update(invoicesTable)
    .set({
      eInvoiceStatus: "registered",
      eInvoiceSymbol: input.eInvoiceSymbol?.trim() || settings.eInvoiceSymbol || invoice.eInvoiceSymbol,
      eInvoiceNumber: input.eInvoiceNumber.trim(),
      eInvoiceLookupCode: input.eInvoiceLookupCode?.trim() || null,
      eInvoiceLookupUrl: input.eInvoiceLookupUrl?.trim() || null,
      eInvoiceRegisteredAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(invoicesTable.id, invoiceId))
    .returning();

  return updated;
}

export async function revertEInvoiceRegistration(invoiceId: number) {
  const [updated] = await db
    .update(invoicesTable)
    .set({
      eInvoiceStatus: "pending",
      eInvoiceNumber: null,
      eInvoiceLookupCode: null,
      eInvoiceLookupUrl: null,
      eInvoiceRegisteredAt: null,
      updatedAt: new Date(),
    })
    .where(eq(invoicesTable.id, invoiceId))
    .returning();
  if (!updated) throw new Error("Không tìm thấy hóa đơn.");
  return updated;
}

export function eInvoiceQueueToCsv(
  rows: Awaited<ReturnType<typeof listEInvoiceQueue>>,
): string {
  const header = [
    "Mã nội bộ",
    "Ngày",
    "Người mua",
    "MST",
    "Địa chỉ",
    "Mô tả",
    "Trước VAT",
    "VAT",
    "Tổng",
    "Sẵn sàng",
    "Chặn",
  ];
  const lines = rows.map((r) =>
    [
      r.code,
      r.issueDate,
      r.buyerName,
      r.taxId ?? "",
      r.buyerAddress ?? "",
      r.lineDescription,
      r.subtotal,
      r.vatAmount,
      r.totalAmount,
      r.readiness.ready ? "Có" : "Không",
      r.readiness.blockers.join("; "),
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return `\uFEFF${header.join(",")}\n${lines.join("\n")}`;
}

export function resolveEInvoiceStatusOnIssue(vatRate: number): EInvoiceStatus {
  return vatRate > 0 ? "pending" : "not_applicable";
}
