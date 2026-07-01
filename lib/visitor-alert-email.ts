import { sendPlainEmail } from "@/lib/mail-transport";
import { formatVisitorLocation } from "@/lib/visitor-geo";
import { riskLevelLabel } from "@/lib/visitor-risk";
import type { VisitorSession } from "@/lib/visitor-types";

const NOTIFY_EMAIL =
  (process.env.VISITOR_ALERT_EMAIL || process.env.BANGGIA_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || "butphamarketing@gmail.com").trim();

const ALERT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

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

export function shouldSendVisitorAlert(session: VisitorSession, previousLevel: string | null) {
  if (session.riskLevel === "normal") return false;

  const escalated =
    session.riskLevel === "alert" &&
    (previousLevel === "normal" || previousLevel === "watch" || previousLevel === null);

  const isHighRisk = session.riskLevel === "alert" || session.riskLevel === "watch";

  if (!isHighRisk && !escalated) return false;

  if (session.lastAlertedAt) {
    const elapsed = Date.now() - new Date(session.lastAlertedAt).getTime();
    if (elapsed < ALERT_COOLDOWN_MS) return false;
  }

  return session.riskLevel === "alert" || escalated;
}

export async function sendVisitorSuspiciousAlert(session: VisitorSession) {
  const location = formatVisitorLocation(session);
  const when = formatVietnamDateTime(session.lastSeenAt);
  const flags = session.riskFlags.length > 0 ? session.riskFlags.join("\n• ") : "Không có";

  const text = [
    "Truy cập nghi ngờ trên website",
    "",
    `Mức: ${riskLevelLabel(session.riskLevel)} (điểm ${session.riskScore})`,
    `IP: ${session.ip}`,
    `Địa điểm: ${location}`,
    `Lượt truy cập: ${session.hits}`,
    `Lần cuối: ${when}`,
    "",
    "Dấu hiệu:",
    `• ${flags}`,
    "",
    `Trang đã vào: ${session.paths.slice(-12).join(", ") || "/"}`,
    session.linkedLeadPhone
      ? `Lead liên kết: ${session.linkedLeadName || "—"} — ${session.linkedLeadPhone}`
      : "Chưa có lead (SĐT) liên kết với IP này",
    "",
    "Xem chi tiết trong Admin → Truy cập.",
  ].join("\n");

  return sendPlainEmail({
    to: NOTIFY_EMAIL,
    subject: `[Website] Truy cập nghi ngờ — ${session.ip} — ${riskLevelLabel(session.riskLevel)}`,
    text,
  });
}
