import { db, taxSettingsTable, invoicesTable, receiptsTable, expensesTable, contractorPaymentsTable } from "@/lib/cms-internal/db";
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
  reminderEmail: string | null;
  eInvoiceTemplateCode: string | null;
  eInvoiceSymbol: string | null;
  eInvoicePortalUrl: string | null;
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

/** Hạn nộp GTGT / TNDN tạm nộp quý TNHH: 30/4, 31/7, 31/10, 31/1 (năm sau). */
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

export function citQuarterlyDueDate(year: number, quarter: number): string {
  return vatQuarterlyDueDate(year, quarter);
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
    reminderEmail: row.reminderEmail,
    eInvoiceTemplateCode: row.eInvoiceTemplateCode,
    eInvoiceSymbol: row.eInvoiceSymbol,
    eInvoicePortalUrl: row.eInvoicePortalUrl,
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
      reminderEmail:
        input.reminderEmail !== undefined ? input.reminderEmail : row.reminderEmail,
      eInvoiceTemplateCode:
        input.eInvoiceTemplateCode !== undefined ? input.eInvoiceTemplateCode : row.eInvoiceTemplateCode,
      eInvoiceSymbol:
        input.eInvoiceSymbol !== undefined ? input.eInvoiceSymbol : row.eInvoiceSymbol,
      eInvoicePortalUrl:
        input.eInvoicePortalUrl !== undefined ? input.eInvoicePortalUrl : row.eInvoicePortalUrl,
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
    const citDueDate = citQuarterlyDueDate(year, quarter);
    const citDue = new Date(`${citDueDate}T12:00:00`);
    const citDaysUntil = daysBetween(today, citDue);
    deadlines.push({
      type: "cit_provisional",
      year,
      quarter,
      label: `TNDN tạm nộp Q${quarter}/${year}`,
      dueDate: citDueDate,
      daysUntil: citDaysUntil,
      status: deadlineStatus(citDaysUntil),
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
  inputVatExpenseCount: number;
  expenseTotalAmount: number;
  vatPayable: number;
  byMonth: {
    month: number;
    label: string;
    outputVat: number;
    revenueBeforeVat: number;
    cashReceiptsTotal: number;
    inputVat: number;
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

  const expenseWhere = and(
    gte(expensesTable.expenseDate, range.fromDate),
    lte(expensesTable.expenseDate, range.toDate),
  );

  const [issuedAgg, draftCountRow, receiptAgg, inputVatAgg, expenseTotalAgg] = await Promise.all([
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
    db
      .select({
        inputVat: sql<string>`COALESCE(sum(${expensesTable.vatAmount}::numeric), 0)`,
        count: sql<number>`count(*)::int`,
      })
      .from(expensesTable)
      .where(and(expenseWhere, eq(expensesTable.hasVatInvoice, true))),
    db
      .select({
        total: sql<string>`COALESCE(sum(${expensesTable.amount}::numeric), 0)`,
      })
      .from(expensesTable)
      .where(expenseWhere),
  ]);

  const outputVat = parseFloat(issuedAgg[0]?.outputVat ?? "0");
  const revenueBeforeVat = parseFloat(issuedAgg[0]?.revenueBeforeVat ?? "0");
  const invoiceTotalAmount = parseFloat(issuedAgg[0]?.invoiceTotal ?? "0");
  const issuedInvoiceCount = issuedAgg[0]?.count ?? 0;
  const draftInvoiceCount = draftCountRow[0]?.count ?? 0;
  const cashReceiptsTotal = parseFloat(receiptAgg[0]?.total ?? "0");
  const receiptCount = receiptAgg[0]?.count ?? 0;
  const inputVat = parseFloat(inputVatAgg[0]?.inputVat ?? "0");
  const inputVatExpenseCount = inputVatAgg[0]?.count ?? 0;
  const expenseTotalAmount = parseFloat(expenseTotalAgg[0]?.total ?? "0");

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
      const [inv, rec, exp] = await Promise.all([
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
        db
          .select({ inputVat: sql<string>`COALESCE(sum(${expensesTable.vatAmount}::numeric), 0)` })
          .from(expensesTable)
          .where(
            and(
              gte(expensesTable.expenseDate, fromDate),
              lte(expensesTable.expenseDate, toDate),
              eq(expensesTable.hasVatInvoice, true),
            ),
          ),
      ]);
      return {
        month,
        label: `T${month}/${year}`,
        outputVat: parseFloat(inv[0]?.outputVat ?? "0"),
        revenueBeforeVat: parseFloat(inv[0]?.revenueBeforeVat ?? "0"),
        cashReceiptsTotal: parseFloat(rec[0]?.total ?? "0"),
        inputVat: parseFloat(exp[0]?.inputVat ?? "0"),
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
  if (expenseTotalAmount > 5_000_000 && inputVatExpenseCount === 0) {
    anomalies.push(
      `Có chi phí ${Math.round(expenseTotalAmount).toLocaleString("vi-VN")} đ trong quý nhưng chưa ghi nhận VAT đầu vào — kiểm tra phiếu chi có HĐ GTGT.`,
    );
  }

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
    inputVat: Math.round(inputVat * 100) / 100,
    inputVatExpenseCount,
    expenseTotalAmount: Math.round(expenseTotalAmount * 100) / 100,
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

export async function listInputVatExpensesForQuarter(year: number, quarter: number) {
  const range = getQuarterRange(year, quarter);
  return db
    .select({
      id: expensesTable.id,
      code: expensesTable.code,
      category: expensesTable.category,
      expenseDate: expensesTable.expenseDate,
      amount: expensesTable.amount,
      subtotal: expensesTable.subtotal,
      vatRate: expensesTable.vatRate,
      vatAmount: expensesTable.vatAmount,
      paymentStatus: expensesTable.paymentStatus,
      notes: expensesTable.notes,
    })
    .from(expensesTable)
    .where(
      and(
        gte(expensesTable.expenseDate, range.fromDate),
        lte(expensesTable.expenseDate, range.toDate),
        eq(expensesTable.hasVatInvoice, true),
      ),
    )
    .orderBy(asc(expensesTable.expenseDate));
}

export function inputVatExpensesToCsv(
  rows: Awaited<ReturnType<typeof listInputVatExpensesForQuarter>>,
): string {
  const header = ["Mã PC", "Ngày", "Danh mục", "Trước VAT", "VAT %", "VAT", "Tổng", "TT thanh toán", "Ghi chú"];
  const lines = rows.map((r) =>
    [
      r.code,
      r.expenseDate,
      r.category,
      r.subtotal,
      r.vatRate,
      r.vatAmount,
      r.amount,
      r.paymentStatus,
      r.notes ?? "",
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return `\uFEFF${header.join(",")}\n${lines.join("\n")}`;
}

export type PitQuarterlySummary = {
  year: number;
  quarter: number;
  label: string;
  fromDate: string;
  toDate: string;
  totalGross: number;
  totalPitWithheld: number;
  totalNetPaid: number;
  paymentCount: number;
  byContractor: {
    contractorName: string;
    contractorTaxId: string | null;
    grossAmount: number;
    pitAmount: number;
    netAmount: number;
    paymentCount: number;
  }[];
};

export async function getPitQuarterlySummary(year: number, quarter: number): Promise<PitQuarterlySummary> {
  const range = getQuarterRange(year, quarter);
  const where = and(
    gte(contractorPaymentsTable.paymentDate, range.fromDate),
    lte(contractorPaymentsTable.paymentDate, range.toDate),
  );

  const [agg, rows] = await Promise.all([
    db
      .select({
        totalGross: sql<string>`COALESCE(sum(${contractorPaymentsTable.grossAmount}::numeric), 0)`,
        totalPit: sql<string>`COALESCE(sum(${contractorPaymentsTable.pitAmount}::numeric), 0)`,
        totalNet: sql<string>`COALESCE(sum(${contractorPaymentsTable.netAmount}::numeric), 0)`,
        count: sql<number>`count(*)::int`,
      })
      .from(contractorPaymentsTable)
      .where(where),
    db
      .select({
        contractorName: contractorPaymentsTable.contractorName,
        contractorTaxId: contractorPaymentsTable.contractorTaxId,
        grossAmount: sql<string>`COALESCE(sum(${contractorPaymentsTable.grossAmount}::numeric), 0)`,
        pitAmount: sql<string>`COALESCE(sum(${contractorPaymentsTable.pitAmount}::numeric), 0)`,
        netAmount: sql<string>`COALESCE(sum(${contractorPaymentsTable.netAmount}::numeric), 0)`,
        paymentCount: sql<number>`count(*)::int`,
      })
      .from(contractorPaymentsTable)
      .where(where)
      .groupBy(contractorPaymentsTable.contractorName, contractorPaymentsTable.contractorTaxId)
      .orderBy(asc(contractorPaymentsTable.contractorName)),
  ]);

  return {
    year,
    quarter: range.quarter,
    label: range.label,
    fromDate: range.fromDate,
    toDate: range.toDate,
    totalGross: Math.round(parseFloat(agg[0]?.totalGross ?? "0") * 100) / 100,
    totalPitWithheld: Math.round(parseFloat(agg[0]?.totalPit ?? "0") * 100) / 100,
    totalNetPaid: Math.round(parseFloat(agg[0]?.totalNet ?? "0") * 100) / 100,
    paymentCount: agg[0]?.count ?? 0,
    byContractor: rows.map((r) => ({
      contractorName: r.contractorName,
      contractorTaxId: r.contractorTaxId,
      grossAmount: parseFloat(r.grossAmount),
      pitAmount: parseFloat(r.pitAmount),
      netAmount: parseFloat(r.netAmount),
      paymentCount: r.paymentCount,
    })),
  };
}

export async function listContractorPaymentsForQuarter(year: number, quarter: number) {
  const range = getQuarterRange(year, quarter);
  return db
    .select({
      id: contractorPaymentsTable.id,
      code: contractorPaymentsTable.code,
      contractorName: contractorPaymentsTable.contractorName,
      contractorTaxId: contractorPaymentsTable.contractorTaxId,
      serviceDescription: contractorPaymentsTable.serviceDescription,
      grossAmount: contractorPaymentsTable.grossAmount,
      pitRate: contractorPaymentsTable.pitRate,
      pitAmount: contractorPaymentsTable.pitAmount,
      netAmount: contractorPaymentsTable.netAmount,
      paymentDate: contractorPaymentsTable.paymentDate,
      paymentMethod: contractorPaymentsTable.paymentMethod,
      notes: contractorPaymentsTable.notes,
    })
    .from(contractorPaymentsTable)
    .where(
      and(
        gte(contractorPaymentsTable.paymentDate, range.fromDate),
        lte(contractorPaymentsTable.paymentDate, range.toDate),
      ),
    )
    .orderBy(asc(contractorPaymentsTable.paymentDate));
}

export function contractorPaymentsToCsv(
  rows: Awaited<ReturnType<typeof listContractorPaymentsForQuarter>>,
): string {
  const header = [
    "Mã",
    "Ngày chi",
    "Tên CTV",
    "CCCD/MST",
    "Dịch vụ",
    "Tổng trước thuế",
    "TNCN %",
    "TNCN khấu trừ",
    "Thực chi",
    "Hình thức",
    "Ghi chú",
  ];
  const lines = rows.map((r) =>
    [
      r.code,
      r.paymentDate,
      r.contractorName,
      r.contractorTaxId ?? "",
      r.serviceDescription,
      r.grossAmount,
      r.pitRate,
      r.pitAmount,
      r.netAmount,
      r.paymentMethod,
      r.notes ?? "",
    ]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return `\uFEFF${header.join(",")}\n${lines.join("\n")}`;
}

export type CitProvisionalSummary = {
  year: number;
  quarter: number;
  label: string;
  fromDate: string;
  toDate: string;
  dueDate: string;
  daysUntilDue: number;
  citRate: number;
  revenueBeforeVat: number;
  operatingExpenses: number;
  contractorPayments: number;
  taxableIncome: number;
  citProvisional: number;
  cashReceiptsTotal: number;
  ytdTaxableIncome: number;
  ytdCitProvisional: number;
  anomalies: string[];
  note: string;
};

async function citQuarterTotals(year: number, quarter: number) {
  const range = getQuarterRange(year, quarter);
  const [rev, exp, ctv] = await Promise.all([
    db
      .select({ total: sql<string>`COALESCE(sum(${invoicesTable.subtotal}::numeric), 0)` })
      .from(invoicesTable)
      .where(
        and(
          gte(invoicesTable.issueDate, range.fromDate),
          lte(invoicesTable.issueDate, range.toDate),
          eq(invoicesTable.status, "issued"),
        ),
      ),
    db
      .select({ total: sql<string>`COALESCE(sum(${expensesTable.amount}::numeric), 0)` })
      .from(expensesTable)
      .where(
        and(
          gte(expensesTable.expenseDate, range.fromDate),
          lte(expensesTable.expenseDate, range.toDate),
        ),
      ),
    db
      .select({ total: sql<string>`COALESCE(sum(${contractorPaymentsTable.grossAmount}::numeric), 0)` })
      .from(contractorPaymentsTable)
      .where(
        and(
          gte(contractorPaymentsTable.paymentDate, range.fromDate),
          lte(contractorPaymentsTable.paymentDate, range.toDate),
        ),
      ),
  ]);
  const revenueBeforeVat = parseFloat(rev[0]?.total ?? "0");
  const operatingExpenses = parseFloat(exp[0]?.total ?? "0");
  const contractorPayments = parseFloat(ctv[0]?.total ?? "0");
  const taxableIncome = revenueBeforeVat - operatingExpenses - contractorPayments;
  return { revenueBeforeVat, operatingExpenses, contractorPayments, taxableIncome };
}

export async function getCitProvisionalSummary(year: number, quarter: number): Promise<CitProvisionalSummary> {
  const range = getQuarterRange(year, quarter);
  const settings = await getOrCreateTaxSettings();
  const citRate = settings.citRate;
  const dueDate = citQuarterlyDueDate(year, quarter);
  const today = new Date();
  const daysUntilDue = daysBetween(today, new Date(`${dueDate}T12:00:00`));

  const { revenueBeforeVat, operatingExpenses, contractorPayments, taxableIncome } =
    await citQuarterTotals(year, range.quarter);

  const [cash] = await db
    .select({ total: sql<string>`COALESCE(sum(${receiptsTable.amount}::numeric), 0)` })
    .from(receiptsTable)
    .where(
      and(
        gte(receiptsTable.receiptDate, range.fromDate),
        lte(receiptsTable.receiptDate, range.toDate),
      ),
    );
  const cashReceiptsTotal = parseFloat(cash?.total ?? "0");
  const citProvisional = Math.max(0, taxableIncome) * (citRate / 100);

  let ytdTaxableIncome = 0;
  let ytdCitProvisional = 0;
  for (let q = 1; q <= range.quarter; q += 1) {
    const qTotals = await citQuarterTotals(year, q);
    ytdTaxableIncome += qTotals.taxableIncome;
    ytdCitProvisional += Math.max(0, qTotals.taxableIncome) * (citRate / 100);
  }

  const anomalies: string[] = [];
  if (taxableIncome < 0) {
    anomalies.push(
      `Lỗ quý ${Math.round(Math.abs(taxableIncome)).toLocaleString("vi-VN")} đ — TNDN tạm nộp = 0 (bù trừ khi quyết toán năm).`,
    );
  }
  if (cashReceiptsTotal > 0 && revenueBeforeVat === 0) {
    anomalies.push("Có phiếu thu nhưng chưa ghi doanh thu HĐ issued — TNDN tính theo HĐ, không theo tiền mặt.");
  }
  if (Math.abs(cashReceiptsTotal - revenueBeforeVat) > 1_000_000 && revenueBeforeVat > 0) {
    anomalies.push(
      `Chênh thu tiền (${Math.round(cashReceiptsTotal).toLocaleString("vi-VN")} đ) vs DT HĐ (${Math.round(revenueBeforeVat).toLocaleString("vi-VN")} đ).`,
    );
  }

  return {
    year,
    quarter: range.quarter,
    label: range.label,
    fromDate: range.fromDate,
    toDate: range.toDate,
    dueDate,
    daysUntilDue,
    citRate,
    revenueBeforeVat: Math.round(revenueBeforeVat * 100) / 100,
    operatingExpenses: Math.round(operatingExpenses * 100) / 100,
    contractorPayments: Math.round(contractorPayments * 100) / 100,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    citProvisional: Math.round(citProvisional * 100) / 100,
    cashReceiptsTotal: Math.round(cashReceiptsTotal * 100) / 100,
    ytdTaxableIncome: Math.round(ytdTaxableIncome * 100) / 100,
    ytdCitProvisional: Math.round(ytdCitProvisional * 100) / 100,
    anomalies,
    note: "Ước tính: DT trước VAT (HĐ issued) − chi phí − chi CTV. Tạm nộp = max(0, lợi nhuận) × thuế suất.",
  };
}

export function citProvisionalToCsv(summary: CitProvisionalSummary): string {
  const rows = [
    ["Chỉ tiêu", "Giá trị"],
    ["Kỳ", summary.label],
    ["Hạn nộp", summary.dueDate],
    ["Thuế suất TNDN %", String(summary.citRate)],
    ["Doanh thu trước VAT", String(summary.revenueBeforeVat)],
    ["Chi phí hoạt động", String(summary.operatingExpenses)],
    ["Chi trả CTV", String(summary.contractorPayments)],
    ["Lợi nhuận tạm tính", String(summary.taxableIncome)],
    ["TNDN tạm nộp quý", String(summary.citProvisional)],
    ["Lũy kế LN tạm tính", String(summary.ytdTaxableIncome)],
    ["Lũy kế TNDN tạm nộp", String(summary.ytdCitProvisional)],
    ["Phiếu thu (tham khảo)", String(summary.cashReceiptsTotal)],
  ];
  return `\uFEFF${rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n")}`;
}
