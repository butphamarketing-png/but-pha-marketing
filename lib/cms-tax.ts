import { db, taxSettingsTable, invoicesTable, receiptsTable } from "@/lib/cms-internal/db";
import { and, eq, gte, lte, sql, asc } from "drizzle-orm";

export type TaxSettingsDto = {
  entityType: string;
  companyName: string | null;
  companyTaxId: string | null;
  companyAddress: string | null;
  vatFilingPeriod: "monthly" | "quarterly";
  vatDefaultRate: number;
  citRate: number;
  quarterlyVatDueDay: number;
};

export type QuarterRange = {
  year: number;
  quarter: number;
  fromDate: string;
  toDate: string;
  label: string;
};

export type TaxDeadline = {
  type: "vat_quarterly" | "cit_provisional";
  year: number;
  quarter: number;
  label: string;
  dueDate: string;
  daysUntil: number;
  status: "upcoming" | "due_soon" | "overdue";
};

const QUARTER_MONTHS: Record<number, [number, number, number]> = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
  4: [10, 11, 12],
};

export function getQuarterRange(year: number, quarter: number): QuarterRange {
  const q = Math.min(4, Math.max(1, quarter));
  const months = QUARTER_MONTHS[q];
  const fromDate = `${year}-${String(months[0]).padStart(2, "0")}-01`;
  const lastDay = new Date(year, months[2], 0).getDate();
  const toDate = `${year}-${String(months[2]).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { year, quarter: q, fromDate, toDate, label: `Q${q}/${year}` };
}

export function getCurrentQuarter(date = new Date()): { year: number; quarter: number } {
  const month = date.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  return { year: date.getFullYear(), quarter };
}

/** Hạn nộp GTGT quý TNHH: ngày 30/4, 31/7, 31/10, 31/1 (năm sau). */
export function vatQuarterlyDueDate(year: number, quarter: number): string {
  switch (quarter) {
    case 1:
      return `${year}-04-30`;
    case 2:
      return `${year}-07-31`;
    case 3:
      return `${year}-10-31`;
    case 4:
      return `${year + 1}-01-31`;
    default:
      return `${year}-04-30`;
  }
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.ceil(ms / 86_400_000);
}

function deadlineStatus(daysUntil: number): TaxDeadline["status"] {
  if (daysUntil < 0) return "overdue";
  if (daysUntil <= 7) return "due_soon";
  return "upcoming";
}

export async function getOrCreateTaxSettings(): Promise<TaxSettingsDto> {
  const [row] = await db.select().from(taxSettingsTable).limit(1);
  if (row) return serializeTaxSettings(row);

  const [inserted] = await db
    .insert(taxSettingsTable)
    .values({ entityType: "TNHH", vatFilingPeriod: "quarterly" })
    .returning();
  return serializeTaxSettings(inserted);
}

function serializeTaxSettings(row: typeof taxSettingsTable.$inferSelect): TaxSettingsDto {
  return {
    entityType: row.entityType ?? "TNHH",
    companyName: row.companyName,
    companyTaxId: row.companyTaxId,
    companyAddress: row.companyAddress,
    vatFilingPeriod: row.vatFilingPeriod === "monthly" ? "monthly" : "quarterly",
    vatDefaultRate: parseFloat(row.vatDefaultRate ?? "8"),
    citRate: parseFloat(row.citRate ?? "20"),
    quarterlyVatDueDay: row.quarterlyVatDueDay ?? 30,
  };
}

export async function updateTaxSettings(input: Partial<TaxSettingsDto>): Promise<TaxSettingsDto> {
  const existing = await getOrCreateTaxSettings();
  const [row] = await db.select().from(taxSettingsTable).limit(1);
  if (!row) return existing;

  const [updated] = await db
    .update(taxSettingsTable)
    .set({
      entityType: input.entityType ?? row.entityType,
      companyName: input.companyName !== undefined ? input.companyName : row.companyName,
      companyTaxId: input.companyTaxId !== undefined ? input.companyTaxId : row.companyTaxId,
      companyAddress: input.companyAddress !== undefined ? input.companyAddress : row.companyAddress,
      vatFilingPeriod: input.vatFilingPeriod ?? row.vatFilingPeriod,
      vatDefaultRate:
        input.vatDefaultRate !== undefined ? String(input.vatDefaultRate) : row.vatDefaultRate,
      citRate: input.citRate !== undefined ? String(input.citRate) : row.citRate,
      quarterlyVatDueDay: input.quarterlyVatDueDay ?? row.quarterlyVatDueDay,
      updatedAt: new Date(),
    })
    .where(eq(taxSettingsTable.id, row.id))
    .returning();

  return serializeTaxSettings(updated);
}

export async function getTaxDeadlines(year: number, today = new Date()): Promise<TaxDeadline[]> {
  const deadlines: TaxDeadline[] = [];
  for (let quarter = 1; quarter <= 4; quarter += 1) {
    const dueDate = vatQuarterlyDueDate(year, quarter);
    const due = new Date(`${dueDate}T12:00:00`);
    const daysUntil = daysBetween(today, due);
    deadlines.push({
      type: "vat_quarterly",
      year,
      quarter,
      label: `GTGT Q${quarter}/${year}`,
      dueDate,
      daysUntil,
      status: deadlineStatus(daysUntil),
    });
  }
  return deadlines.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export type VatSummaryResult = {
  year: number;
  quarter: number;
  label: string;
  fromDate: string;
  toDate: string;
  dueDate: string;
  daysUntilDue: number;
  outputVat: number;
  revenueBeforeVat: number;
  invoiceTotalAmount: number;
  issuedInvoiceCount: number;
  draftInvoiceCount: number;
  cashReceiptsTotal: number;
  receiptCount: number;
  inputVat: number;
  vatPayable: number;
  byMonth: {
    month: number;
    label: string;
    outputVat: number;
    revenueBeforeVat: number;
    cashReceiptsTotal: number;
  }[];
  anomalies: string[];
};

export async function getVatQuarterlySummary(year: number, quarter: number): Promise<VatSummaryResult> {
  const range = getQuarterRange(year, quarter);
  const dueDate = vatQuarterlyDueDate(year, quarter);
  const today = new Date();
  const daysUntilDue = daysBetween(today, new Date(`${dueDate}T12:00:00`));

  const invoiceWhere = and(
    gte(invoicesTable.issueDate, range.fromDate),
    lte(invoicesTable.issueDate, range.toDate),
  );

  const [issuedAgg, draftCountRow, receiptAgg] = await Promise.all([
    db
      .select({
        outputVat: sql<string>`COALESCE(sum(${invoicesTable.vatAmount}::numeric), 0)`,
        revenueBeforeVat: sql<string>`COALESCE(sum(${invoicesTable.subtotal}::numeric), 0)`,
        invoiceTotal: sql<string>`COALESCE(sum(${invoicesTable.totalAmount}::numeric), 0)`,
        count: sql<number>`count(*)::int`,
      })
      .from(invoicesTable)
      .where(and(invoiceWhere, eq(invoicesTable.status, "issued"))),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(invoicesTable)
      .where(and(invoiceWhere, eq(invoicesTable.status, "draft"))),
    db
      .select({
        total: sql<string>`COALESCE(sum(${receiptsTable.amount}::numeric), 0)`,
        count: sql<number>`count(*)::int`,
      })
      .from(receiptsTable)
      .where(
        and(
          gte(receiptsTable.receiptDate, range.fromDate),
          lte(receiptsTable.receiptDate, range.toDate),
        ),
      ),
  ]);

  const outputVat = parseFloat(issuedAgg[0]?.outputVat ?? "0");
  const revenueBeforeVat = parseFloat(issuedAgg[0]?.revenueBeforeVat ?? "0");
  const invoiceTotalAmount = parseFloat(issuedAgg[0]?.invoiceTotal ?? "0");
  const issuedInvoiceCount = issuedAgg[0]?.count ?? 0;
  const draftInvoiceCount = draftCountRow[0]?.count ?? 0;
  const cashReceiptsTotal = parseFloat(receiptAgg[0]?.total ?? "0");
  const receiptCount = receiptAgg[0]?.count ?? 0;

  const months = QUARTER_MONTHS[range.quarter];
  const byMonth = await Promise.all(
    months.map(async (month) => {
      const fromDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const toDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
      const monthInvoiceWhere = and(
        gte(invoicesTable.issueDate, fromDate),
        lte(invoicesTable.issueDate, toDate),
        eq(invoicesTable.status, "issued"),
      );
      const [inv, rec] = await Promise.all([
        db
          .select({
            outputVat: sql<string>`COALESCE(sum(${invoicesTable.vatAmount}::numeric), 0)`,
            revenueBeforeVat: sql<string>`COALESCE(sum(${invoicesTable.subtotal}::numeric), 0)`,
          })
          .from(invoicesTable)
          .where(monthInvoiceWhere),
        db
          .select({ total: sql<string>`COALESCE(sum(${receiptsTable.amount}::numeric), 0)` })
          .from(receiptsTable)
          .where(and(gte(receiptsTable.receiptDate, fromDate), lte(receiptsTable.receiptDate, toDate))),
      ]);
      return {
        month,
        label: `T${month}/${year}`,
        outputVat: parseFloat(inv[0]?.outputVat ?? "0"),
        revenueBeforeVat: parseFloat(inv[0]?.revenueBeforeVat ?? "0"),
        cashReceiptsTotal: parseFloat(rec[0]?.total ?? "0"),
      };
    }),
  );

  const anomalies: string[] = [];
  if (draftInvoiceCount > 0) {
    anomalies.push(`${draftInvoiceCount} hóa đơn nháp trong quý — cần MST/địa chỉ trước khi chốt.`);
  }
  if (cashReceiptsTotal > 0 && issuedInvoiceCount === 0) {
    anomalies.push("Có phiếu thu nhưng chưa có hóa đơn đã xuất trong quý.");
  }
  if (Math.abs(cashReceiptsTotal - invoiceTotalAmount) > 1 && issuedInvoiceCount > 0) {
    anomalies.push(
      `Chênh lệch phiếu thu (${Math.round(cashReceiptsTotal).toLocaleString("vi-VN")} đ) vs tổng HĐ (${Math.round(invoiceTotalAmount).toLocaleString("vi-VN")} đ).`,
    );
  }

  const inputVat = 0;

  return {
    year,
    quarter: range.quarter,
    label: range.label,
    fromDate: range.fromDate,
    toDate: range.toDate,
    dueDate,
    daysUntilDue,
    outputVat: Math.round(outputVat * 100) / 100,
    revenueBeforeVat: Math.round(revenueBeforeVat * 100) / 100,
    invoiceTotalAmount: Math.round(invoiceTotalAmount * 100) / 100,
    issuedInvoiceCount,
    draftInvoiceCount,
    cashReceiptsTotal: Math.round(cashReceiptsTotal * 100) / 100,
    receiptCount,
    inputVat,
    vatPayable: Math.round((outputVat - inputVat) * 100) / 100,
    byMonth,
    anomalies,
  };
}

export async function listIssuedInvoicesForQuarter(year: number, quarter: number) {
  const range = getQuarterRange(year, quarter);
  return db
    .select({
      id: invoicesTable.id,
      code: invoicesTable.code,
      buyerName: invoicesTable.buyerName,
      taxId: invoicesTable.taxId,
      issueDate: invoicesTable.issueDate,
      subtotal: invoicesTable.subtotal,
      vatRate: invoicesTable.vatRate,
      vatAmount: invoicesTable.vatAmount,
      totalAmount: invoicesTable.totalAmount,
      status: invoicesTable.status,
    })
    .from(invoicesTable)
    .where(
      and(
        gte(invoicesTable.issueDate, range.fromDate),
        lte(invoicesTable.issueDate, range.toDate),
        eq(invoicesTable.status, "issued"),
      ),
    )
    .orderBy(asc(invoicesTable.issueDate));
}

export function invoicesToCsv(
  rows: Awaited<ReturnType<typeof listIssuedInvoicesForQuarter>>,
): string {
  const header = ["Mã HĐ", "Ngày", "Người mua", "MST", "Tiền hàng", "VAT %", "VAT", "Tổng"];
  const lines = rows.map((r) =>
    [
      r.code,
      r.issueDate,
      r.buyerName,
      r.taxId ?? "",
      r.subtotal,
      r.vatRate,
      r.vatAmount,
      r.totalAmount,
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return `\uFEFF${header.join(",")}\n${lines.join("\n")}`;
}
