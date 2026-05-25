export const CUSTOMER_RECORDS_KEY = "customer_records";

export type CustomerRecord = {
  id: string;
  fullName: string;
  industry: string;
  establishmentName: string;
  phone: string;
  email: string;
  platform: string;
  service: string;
  registeredAt: string | null;
  expiresAt: string | null;
  platformLink: string;
  amount: number;
  renewalReminderEnabled: boolean;
  lastRenewalReminderAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const CUSTOMER_PLATFORMS = [
  { key: "facebook", label: "Facebook" },
  { key: "googlemaps", label: "Google Maps" },
  { key: "website", label: "Website" },
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "zalo", label: "Zalo" },
] as const;

export function createEmptyCustomer(): CustomerRecord {
  const now = new Date().toISOString();
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    fullName: "",
    industry: "",
    establishmentName: "",
    phone: "",
    email: "",
    platform: "facebook",
    service: "",
    registeredAt: new Date().toISOString().slice(0, 10),
    expiresAt: null,
    platformLink: "",
    amount: 0,
    renewalReminderEnabled: true,
    lastRenewalReminderAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizePhoneForZalo(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("84")) return digits;
  if (digits.startsWith("0")) return `84${digits.slice(1)}`;
  return digits;
}

export function buildZaloRenewalUrl(phone: string, message: string) {
  const id = normalizePhoneForZalo(phone);
  const encoded = encodeURIComponent(message);
  return `https://zalo.me/${id}?msg=${encoded}`;
}

export function buildRenewalMessage(customer: Pick<CustomerRecord, "fullName" | "service" | "expiresAt">) {
  const expiryLabel = customer.expiresAt
    ? new Date(customer.expiresAt).toLocaleDateString("vi-VN")
    : "";
  return `Xin chào ${customer.fullName || "Anh/Chị"}, dịch vụ "${customer.service || "đang sử dụng"}" sẽ hết hạn vào ${expiryLabel}. Bứt Phá Marketing nhắc gia hạn trước 3 ngày — vui lòng phản hồi để được hỗ trợ tiếp tục.`;
}

export function daysUntilExpiry(expiresAt: string | null, reference = new Date()) {
  if (!expiresAt) return null;
  const end = new Date(expiresAt);
  if (Number.isNaN(end.getTime())) return null;
  const start = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((endDay.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
}

export function shouldSendRenewalReminder(customer: CustomerRecord, reference = new Date()) {
  if (!customer.renewalReminderEnabled || !customer.expiresAt || !customer.phone.trim()) {
    return false;
  }
  const days = daysUntilExpiry(customer.expiresAt, reference);
  if (days !== 3) return false;
  if (customer.lastRenewalReminderAt) {
    const last = new Date(customer.lastRenewalReminderAt);
    const sameDay =
      last.getFullYear() === reference.getFullYear() &&
      last.getMonth() === reference.getMonth() &&
      last.getDate() === reference.getDate();
    if (sameDay) return false;
  }
  return true;
}

export function formatVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount || 0) + " đ";
}
