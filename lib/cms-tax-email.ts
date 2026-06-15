import nodemailer from "nodemailer";
import {
  getOrCreateTaxSettings,
  getVatQuarterlySummary,
  getTaxDeadlines,
  vatQuarterlyDueDate,
} from "@/lib/cms-tax";
import {
  logReminderSent,
  reminderKeyForDays,
  wasReminderSent,
} from "@/lib/cms-tax-closure";

function getMailConfig() {
  const user = (process.env.GMAIL_USER || process.env.ADMIN_EMAIL || "").trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
  return { user, pass };
}

function formatVnd(n: number) {
  return `${Math.round(n).toLocaleString("vi-VN")} đ`;
}

export async function sendTaxDeadlineReminder(input: {
  year: number;
  quarter: number;
  daysUntil: number;
  recipient: string;
  companyName?: string | null;
}) {
  const { year, quarter, daysUntil, recipient, companyName } = input;
  const reminderKey = reminderKeyForDays(daysUntil);
  if (!reminderKey) return { sent: false, channel: "skipped" as const, reason: "no_key" };

  if (await wasReminderSent(year, quarter, reminderKey, recipient)) {
    return { sent: false, channel: "skipped" as const, reason: "already_sent" };
  }

  const { user, pass } = getMailConfig();
  if (!user || !pass || !recipient.trim()) {
    return { sent: false, channel: "skipped" as const, reason: "no_mail_config" };
  }

  const dueDate = vatQuarterlyDueDate(year, quarter);
  const summary = await getVatQuarterlySummary(year, quarter);
  const label = `Q${quarter}/${year}`;
  const urgency =
    daysUntil < 0
      ? `QUÁ HẠN ${Math.abs(daysUntil)} ngày`
      : daysUntil === 0
        ? "HÔM NAY là hạn nộp"
        : `Còn ${daysUntil} ngày`;

  const subject = `[But Pha] Nhắc GTGT ${label} — ${urgency}`;
  const text = [
    companyName ? `Công ty: ${companyName}` : "But Pha Marketing TNHH",
    "",
    `Nhắc nộp GTGT quý ${label}`,
    `Hạn: ${dueDate} (${urgency})`,
    "",
    "Số liệu tham khảo từ CMS:",
    `- VAT đầu ra: ${formatVnd(summary.outputVat)}`,
    `- VAT đầu vào: ${formatVnd(summary.inputVat)}`,
    `- GTGT phải nộp: ${formatVnd(summary.vatPayable)}`,
    "",
    summary.anomalies.length > 0
      ? `Cần rà soát:\n${summary.anomalies.map((a) => `• ${a}`).join("\n")}`
      : "Không có cảnh báo nghiêm trọng.",
    "",
    "Vào CMS → Trách nhiệm thuế để chốt quý và xuất gói ZIP.",
    "Nộp thực tế trên: https://thuedientu.gdt.gov.vn",
  ].join("\n");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Bứt Phá Marketing" <${user}>`,
      to: recipient.trim(),
      subject,
      text,
    });
    await logReminderSent(year, quarter, reminderKey, recipient.trim());
    return { sent: true, channel: "gmail" as const, reminderKey };
  } catch (error) {
    console.error("[cms-tax-email] send failed", error);
    return { sent: false, channel: "error" as const, reminderKey };
  }
}

export async function processTaxDeadlineReminders(today = new Date()) {
  const settings = await getOrCreateTaxSettings();
  const recipient =
    (settings.reminderEmail || process.env.ADMIN_EMAIL || process.env.GMAIL_USER || "").trim();
  if (!recipient) {
    return { ok: true, sent: 0, results: [], reason: "no_recipient" };
  }

  const year = today.getFullYear();
  const deadlines = await getTaxDeadlines(year, today);
  const results: Array<{ year: number; quarter: number; daysUntil: number; sent: boolean; channel: string }> = [];

  for (const d of deadlines) {
    const key = reminderKeyForDays(d.daysUntil);
    if (!key) continue;

    const outcome = await sendTaxDeadlineReminder({
      year: d.year,
      quarter: d.quarter,
      daysUntil: d.daysUntil,
      recipient,
      companyName: settings.companyName,
    });
    results.push({
      year: d.year,
      quarter: d.quarter,
      daysUntil: d.daysUntil,
      sent: outcome.sent,
      channel: outcome.channel,
    });
  }

  return {
    ok: true,
    sent: results.filter((r) => r.sent).length,
    results,
  };
}
