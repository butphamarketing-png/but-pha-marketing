import {
  db,
  taxPeriodClosuresTable,
  taxReminderLogsTable,
} from "@/lib/cms-internal/db";
import { and, eq } from "drizzle-orm";
import { createZipArchive } from "@/lib/zip-store";
import {
  getVatQuarterlySummary,
  getTaxDeadlines,
  listIssuedInvoicesForQuarter,
  listInputVatExpensesForQuarter,
  invoicesToCsv,
  inputVatExpensesToCsv,
  getPitQuarterlySummary,
  listContractorPaymentsForQuarter,
  contractorPaymentsToCsv,
  getCitProvisionalSummary,
  citProvisionalToCsv,
  vatQuarterlyDueDate,
  type VatSummaryResult,
} from "@/lib/cms-tax";
import { listEInvoiceQueue, eInvoiceQueueToCsv } from "@/lib/cms-einvoice";

export type TaxPeriodClosureDto = {
  year: number;
  quarter: number;
  periodType: string;
  status: "open" | "closed";
  closedAt: string | null;
  closedBy: string | null;
  notes: string | null;
  snapshot: VatSummaryResult | null;
};

export type TaxReminderBanner = {
  show: boolean;
  level: "info" | "warning" | "danger";
  title: string;
  message: string;
  year: number;
  quarter: number;
  dueDate: string;
  daysUntil: number;
};

function serializeClosure(row: typeof taxPeriodClosuresTable.$inferSelect): TaxPeriodClosureDto {
  return {
    year: row.year,
    quarter: row.quarter,
    periodType: row.periodType,
    status: row.status === "closed" ? "closed" : "open",
    closedAt: row.closedAt ? row.closedAt.toISOString() : null,
    closedBy: row.closedBy,
    notes: row.notes,
    snapshot: (row.snapshot as VatSummaryResult | null) ?? null,
  };
}

export async function getTaxPeriodClosure(year: number, quarter: number): Promise<TaxPeriodClosureDto> {
  const [row] = await db
    .select()
    .from(taxPeriodClosuresTable)
    .where(
      and(
        eq(taxPeriodClosuresTable.year, year),
        eq(taxPeriodClosuresTable.quarter, quarter),
        eq(taxPeriodClosuresTable.periodType, "vat_quarterly"),
      ),
    )
    .limit(1);

  if (row) return serializeClosure(row);
  return {
    year,
    quarter,
    periodType: "vat_quarterly",
    status: "open",
    closedAt: null,
    closedBy: null,
    notes: null,
    snapshot: null,
  };
}

export async function closeTaxPeriod(
  year: number,
  quarter: number,
  closedBy = "Admin",
  notes?: string | null,
): Promise<{ closure: TaxPeriodClosureDto; summary: VatSummaryResult }> {
  const summary = await getVatQuarterlySummary(year, quarter);
  const now = new Date();

  const [existing] = await db
    .select()
    .from(taxPeriodClosuresTable)
    .where(
      and(
        eq(taxPeriodClosuresTable.year, year),
        eq(taxPeriodClosuresTable.quarter, quarter),
        eq(taxPeriodClosuresTable.periodType, "vat_quarterly"),
      ),
    )
    .limit(1);

  if (existing?.status === "closed") {
    return { closure: serializeClosure(existing), summary };
  }

  const values = {
    year,
    quarter,
    periodType: "vat_quarterly",
    status: "closed",
    closedAt: now,
    closedBy,
    snapshot: summary,
    notes: notes ?? null,
    updatedAt: now,
  };

  const [row] = existing
    ? await db
        .update(taxPeriodClosuresTable)
        .set(values)
        .where(eq(taxPeriodClosuresTable.id, existing.id))
        .returning()
    : await db.insert(taxPeriodClosuresTable).values(values).returning();

  return { closure: serializeClosure(row), summary };
}

export async function reopenTaxPeriod(year: number, quarter: number): Promise<TaxPeriodClosureDto> {
  const [existing] = await db
    .select()
    .from(taxPeriodClosuresTable)
    .where(
      and(
        eq(taxPeriodClosuresTable.year, year),
        eq(taxPeriodClosuresTable.quarter, quarter),
        eq(taxPeriodClosuresTable.periodType, "vat_quarterly"),
      ),
    )
    .limit(1);

  if (!existing) {
    return getTaxPeriodClosure(year, quarter);
  }

  const [row] = await db
    .update(taxPeriodClosuresTable)
    .set({
      status: "open",
      closedAt: null,
      closedBy: null,
      notes: null,
      updatedAt: new Date(),
    })
    .where(eq(taxPeriodClosuresTable.id, existing.id))
    .returning();

  return serializeClosure(row);
}

function formatVnd(n: number) {
  return `${Math.round(n).toLocaleString("vi-VN")} đ`;
}

function summaryToText(summary: VatSummaryResult, settingsName?: string | null): string {
  const lines = [
    `TỔNG HỢP GTGT ${summary.label}`,
    settingsName ? `Công ty: ${settingsName}` : "",
    `Kỳ: ${summary.fromDate} → ${summary.toDate}`,
    `Hạn nộp: ${summary.dueDate}`,
    "",
    `VAT đầu ra: ${formatVnd(summary.outputVat)} (${summary.issuedInvoiceCount} HĐ)`,
    `VAT đầu vào: ${formatVnd(summary.inputVat)} (${summary.inputVatExpenseCount} phiếu chi)`,
    `GTGT phải nộp: ${formatVnd(summary.vatPayable)}`,
    `Doanh thu trước VAT: ${formatVnd(summary.revenueBeforeVat)}`,
    `Phiếu thu: ${formatVnd(summary.cashReceiptsTotal)} (${summary.receiptCount} phiếu)`,
    "",
    "Chi tiết theo tháng:",
    ...summary.byMonth.map(
      (m) =>
        `  ${m.label}: VAT ra ${formatVnd(m.outputVat)} | VAT vào ${formatVnd(m.inputVat)} | Thu ${formatVnd(m.cashReceiptsTotal)}`,
    ),
  ];
  if (summary.anomalies.length > 0) {
    lines.push("", "Cảnh báo:", ...summary.anomalies.map((a) => `  - ${a}`));
  }
  lines.push("", "Xuất từ But Pha CMS — tham khảo trước khi nộp trên thuedientu.gdt.gov.vn");
  return lines.filter(Boolean).join("\n");
}

export async function buildTaxExportPackZip(
  year: number,
  quarter: number,
  companyName?: string | null,
): Promise<Buffer> {
  const [summary, invoices, expenses, pitSummary, contractors, citSummary, eInvoiceQueue] =
    await Promise.all([
    getVatQuarterlySummary(year, quarter),
    listIssuedInvoicesForQuarter(year, quarter),
    listInputVatExpensesForQuarter(year, quarter),
    getPitQuarterlySummary(year, quarter),
    listContractorPaymentsForQuarter(year, quarter),
    getCitProvisionalSummary(year, quarter),
    listEInvoiceQueue(year, quarter),
  ]);

  return createZipArchive([
    { name: "tong-hop-gtgt.json", data: JSON.stringify(summary, null, 2) },
    { name: "tong-hop-tncn-ctv.json", data: JSON.stringify(pitSummary, null, 2) },
    { name: "tong-hop-tndn.json", data: JSON.stringify(citSummary, null, 2) },
    { name: "hoa-don-ban-ra.csv", data: invoicesToCsv(invoices) },
    { name: "vat-dau-vao.csv", data: inputVatExpensesToCsv(expenses) },
    { name: "tncn-ctv.csv", data: contractorPaymentsToCsv(contractors) },
    { name: "tndn-tam-nop.csv", data: citProvisionalToCsv(citSummary) },
    { name: "hddt-cho-phat-hanh.csv", data: eInvoiceQueueToCsv(eInvoiceQueue) },
    { name: "tom-tat.txt", data: summaryToText(summary, companyName) },
    {
      name: "README.txt",
      data: `Gói nộp thuế Q${quarter}/${year}\n- tong-hop-gtgt.json / hoa-don / vat-dau-vao\n- tong-hop-tncn-ctv.json / tncn-ctv.csv\n- tong-hop-tndn.json / tndn-tam-nop.csv\n- tom-tat.txt\n`,
    },
  ]);
}

export async function getTaxReminderBanner(
  year?: number,
  quarter?: number,
  today = new Date(),
): Promise<TaxReminderBanner> {
  const y = year ?? today.getFullYear();
  const q = quarter ?? Math.ceil((today.getMonth() + 1) / 3);
  const dueDate = vatQuarterlyDueDate(y, q);
  const due = new Date(`${dueDate}T12:00:00`);
  const daysUntil = Math.ceil((due.getTime() - today.getTime()) / 86_400_000);

  if (daysUntil < 0) {
    return {
      show: true,
      level: "danger",
      title: `Quá hạn nộp GTGT Q${q}/${y}`,
      message: `Đã quá hạn ${Math.abs(daysUntil)} ngày (hạn ${dueDate}). Rà soát và nộp trên cổng thuế.`,
      year: y,
      quarter: q,
      dueDate,
      daysUntil,
    };
  }
  if (daysUntil <= 7) {
    return {
      show: true,
      level: daysUntil <= 3 ? "danger" : "warning",
      title: `Sắp đến hạn GTGT Q${q}/${y}`,
      message: `Còn ${daysUntil} ngày (hạn ${dueDate}). Chốt quý và xuất gói nộp.`,
      year: y,
      quarter: q,
      dueDate,
      daysUntil,
    };
  }

  const deadlines = await getTaxDeadlines(y, today);
  const next = deadlines.find((d) => d.daysUntil >= 0 && d.daysUntil <= 14);
  if (next) {
    return {
      show: true,
      level: "info",
      title: next.label,
      message: `Hạn nộp ${next.dueDate} — còn ${next.daysUntil} ngày.`,
      year: next.year,
      quarter: next.quarter,
      dueDate: next.dueDate,
      daysUntil: next.daysUntil,
    };
  }

  return {
    show: false,
    level: "info",
    title: "",
    message: "",
    year: y,
    quarter: q,
    dueDate,
    daysUntil,
  };
}

export async function wasReminderSent(
  year: number,
  quarter: number,
  reminderKey: string,
  recipient: string,
): Promise<boolean> {
  const [row] = await db
    .select({ id: taxReminderLogsTable.id })
    .from(taxReminderLogsTable)
    .where(
      and(
        eq(taxReminderLogsTable.year, year),
        eq(taxReminderLogsTable.quarter, quarter),
        eq(taxReminderLogsTable.reminderKey, reminderKey),
        eq(taxReminderLogsTable.recipient, recipient),
      ),
    )
    .limit(1);
  return Boolean(row);
}

export async function logReminderSent(
  year: number,
  quarter: number,
  reminderKey: string,
  recipient: string,
): Promise<void> {
  await db
    .insert(taxReminderLogsTable)
    .values({ year, quarter, reminderKey, recipient })
    .onConflictDoNothing({
      target: [
        taxReminderLogsTable.year,
        taxReminderLogsTable.quarter,
        taxReminderLogsTable.reminderKey,
        taxReminderLogsTable.recipient,
      ],
    });
}

export function reminderKeyForDays(daysUntil: number): string | null {
  if (daysUntil === 7) return "due_7";
  if (daysUntil === 3) return "due_3";
  if (daysUntil === 1) return "due_1";
  if (daysUntil === 0) return "due_0";
  if (daysUntil < 0 && daysUntil >= -7) return "overdue";
  return null;
}
