import nodemailer from "nodemailer";
import { buildWebsiteCareExpiryEmail, type WebsiteCareAsset } from "@/lib/website-care-assets";

function getMailConfig() {
  const user = (process.env.GMAIL_USER || process.env.ADMIN_EMAIL || "").trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
  return { user, pass };
}

export async function sendWebsiteCareExpiryEmail(asset: WebsiteCareAsset) {
  const { user, pass } = getMailConfig();
  if (!user || !pass || !asset.customerEmail.trim()) {
    return { sent: false, channel: "skipped" as const };
  }

  const { subject, text } = buildWebsiteCareExpiryEmail(asset);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Bứt Phá Marketing" <${user}>`,
      to: asset.customerEmail.trim(),
      subject,
      text,
    });
    return { sent: true, channel: "gmail" as const };
  } catch (error) {
    console.error("[website-care-email] send failed", error);
    return { sent: false, channel: "error" as const };
  }
}
