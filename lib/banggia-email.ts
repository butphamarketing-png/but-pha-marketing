import { sendPlainEmail } from "@/lib/mail-transport";

const NOTIFY_EMAIL =
  (process.env.BANGGIA_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "butphamarketing@gmail.com").trim();

export type BanggiaLeadEmailInput = {
  name: string;
  phone: string;
  accessedAt: string;
  sourceUrl?: string;
};

function formatVietnamDateTime(iso: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export async function sendBanggiaLeadNotification(input: BanggiaLeadEmailInput) {
  const source = input.sourceUrl || "/banggia";
  const when = formatVietnamDateTime(input.accessedAt);

  const text = [
    "Lead mới",
    "",
    `Tên: ${input.name}`,
    `SĐT: ${input.phone}`,
    `Nguồn: ${source}`,
    when,
  ].join("\n");

  return sendPlainEmail({
    to: NOTIFY_EMAIL,
    subject: `Lead mới — ${input.name} — ${source}`,
    text,
  });
}
