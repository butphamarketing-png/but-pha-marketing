import nodemailer from "nodemailer";

export function getMailConfig() {
  const user = (process.env.GMAIL_USER || process.env.ADMIN_EMAIL || "").trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
  return { user, pass };
}

export async function sendPlainEmail(options: {
  to: string;
  subject: string;
  text: string;
}) {
  const to = options.to.trim();
  const subject = options.subject.trim();
  const text = options.text.trim();
  if (!to || !subject || !text) {
    return { sent: false as const, error: "Thiếu email đích, tiêu đề hoặc nội dung." };
  }

  const { user, pass } = getMailConfig();
  if (!user || !pass) {
    return {
      sent: false as const,
      error: "Chưa cấu hình GMAIL_USER / GMAIL_APP_PASSWORD trên server.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Bứt Phá Marketing" <${user}>`,
      to,
      subject,
      text,
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[mail-transport] send failed", error);
    return { sent: false as const, error: "Gửi Gmail thất bại." };
  }
}
