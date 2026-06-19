import nodemailer from "nodemailer";
import { paymentMethodLabel } from "@/lib/customer-payment";
import {
  CUSTOMER_PLATFORMS,
  formatPackageDisplay,
  formatVnd,
  getPackageContractTotal,
  getServicesForPlatform,
  isExpiryPermanent,
  type CustomerRecord,
} from "@/lib/customer-records";

function getMailConfig() {
  const user = (process.env.GMAIL_USER || process.env.ADMIN_EMAIL || "").trim();
  const pass = (process.env.GMAIL_APP_PASSWORD || "").trim();
  return { user, pass };
}

function formatDateVi(dateStr: string | null): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("vi-VN");
}

export function buildCustomerPackageEmail(customer: CustomerRecord) {
  const greeting = customer.fullName.trim() || "Anh/Chị";
  const platformLabel =
    CUSTOMER_PLATFORMS.find((p) => p.key === customer.platform)?.label || customer.platform;
  const serviceLabel =
    getServicesForPlatform(customer.platform).find((s) => s.key === customer.service)?.label ||
    customer.service;
  const packageLabel = formatPackageDisplay(
    customer.platform,
    customer.service,
    customer.subscriptionPackage,
  );
  const expiryLabel = isExpiryPermanent(customer.service)
    ? "Vĩnh viễn"
    : customer.expiresAt
      ? formatDateVi(customer.expiresAt)
      : "—";
  const total = getPackageContractTotal(
    customer.platform,
    customer.service,
    customer.subscriptionPackage,
  );

  const lines = [
    `Xin chào ${greeting},`,
    "",
    "Bứt Phá Marketing xác nhận thông tin gói dịch vụ của Quý khách như sau:",
    "",
    `• Mã hợp đồng: ${customer.contractCode.trim() || "—"}`,
    `• Nền tảng: ${platformLabel}`,
    `• Dịch vụ: ${serviceLabel}`,
    `• Gói đăng ký: ${packageLabel}`,
    ...(total !== null ? [`• Giá gói: ${formatVnd(total)}`] : []),
    `• Ngày đăng ký: ${formatDateVi(customer.registeredAt)}`,
    `• Ngày hết hạn: ${expiryLabel}`,
    `• Đã thanh toán: ${formatVnd(customer.amountPaid)}`,
    `• Còn lại: ${formatVnd(customer.amountUnpaid)}`,
    `• Hình thức TT: ${paymentMethodLabel(customer.paymentMethod)}`,
    ...(customer.platformLink.trim() ? [`• Link: ${customer.platformLink.trim()}`] : []),
    "",
    "Nếu có sai sót, vui lòng phản hồi email này để được hỗ trợ.",
    "",
    "Trân trọng,",
    "Bứt Phá Marketing",
  ];

  const contractCode = customer.contractCode.trim() || "—";
  const subject = `[Bứt Phá Marketing] Thông tin gói dịch vụ — HĐ ${contractCode}`;

  return { subject, text: lines.join("\n") };
}

export async function sendCustomerPackageEmail(customer: CustomerRecord) {
  const email = customer.email.trim();
  if (!email) {
    return { sent: false, channel: "skipped" as const, error: "Thiếu Gmail khách hàng." };
  }

  const { user, pass } = getMailConfig();
  if (!user || !pass) {
    return {
      sent: false,
      channel: "skipped" as const,
      error: "Chưa cấu hình GMAIL_USER / GMAIL_APP_PASSWORD.",
    };
  }

  const { subject, text } = buildCustomerPackageEmail(customer);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Bứt Phá Marketing" <${user}>`,
      to: email,
      subject,
      text,
    });
    return { sent: true, channel: "gmail" as const, subject, text };
  } catch (error) {
    console.error("[customer-package-email] send failed", error);
    return { sent: false, channel: "error" as const, error: "Gửi Gmail thất bại." };
  }
}
