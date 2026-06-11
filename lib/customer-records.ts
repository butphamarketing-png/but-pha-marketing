export const CUSTOMER_RECORDS_KEY = "customer_records";

export type CustomerPlatform = "facebook" | "website" | "googlemaps";

export type CustomerRecord = {
  id: string;
  contractCode: string;
  fullName: string;
  establishmentName: string;
  taxId: string;
  industry: string;
  phone: string;
  email: string;
  platform: CustomerPlatform;
  service: string;
  registeredAt: string | null;
  expiresAt: string | null;
  platformLink: string;
  amountPaid: number;
  amountUnpaid: number;
  /** @deprecated migrated to amountPaid */
  amount?: number;
  renewalReminderEnabled: boolean;
  lastRenewalReminderAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const CUSTOMER_PLATFORMS = [
  { key: "facebook" as const, label: "Facebook" },
  { key: "website" as const, label: "Website" },
  { key: "googlemaps" as const, label: "Maps" },
];

export const PLATFORM_SERVICES: Record<CustomerPlatform, { key: string; label: string }[]> = {
  website: [
    { key: "domain", label: "Domain" },
    { key: "hosting", label: "Hosting" },
    { key: "thiet-ke", label: "Thiết Kế" },
    { key: "cham-soc", label: "Chăm Sóc" },
    { key: "quang-cao", label: "Quảng Cáo" },
  ],
  facebook: [
    { key: "thiet-ke", label: "Thiết Kế" },
    { key: "cham-soc", label: "Chăm Sóc" },
    { key: "quang-cao", label: "Quảng Cáo" },
  ],
  googlemaps: [
    { key: "thiet-ke", label: "Thiết Kế" },
    { key: "quang-cao", label: "Quảng Cáo" },
  ],
};

export function getServicesForPlatform(platform: string) {
  if (platform === "website" || platform === "facebook" || platform === "googlemaps") {
    return PLATFORM_SERVICES[platform];
  }
  return PLATFORM_SERVICES.facebook;
}

export function normalizePlatform(raw: string): CustomerPlatform {
  if (raw === "website" || raw === "googlemaps") return raw;
  return "facebook";
}

export function isExpiryEditable(service: string) {
  return service === "quang-cao" || service === "cham-soc";
}

export function isExpiryPermanent(service: string) {
  return service === "thiet-ke";
}

export function addYears(dateStr: string | null, years: number): string {
  const base = dateStr ? new Date(dateStr) : new Date();
  if (Number.isNaN(base.getTime())) {
    const now = new Date();
    now.setFullYear(now.getFullYear() + years);
    return now.toISOString().slice(0, 10);
  }
  base.setFullYear(base.getFullYear() + years);
  return base.toISOString().slice(0, 10);
}

export function computeExpiryForService(service: string, registeredAt: string | null): string | null {
  if (service === "domain" || service === "hosting") {
    return addYears(registeredAt, 1);
  }
  if (service === "thiet-ke") {
    return null;
  }
  return null;
}

export function resolveExpiryOnServiceChange(
  service: string,
  registeredAt: string | null,
  currentExpiry: string | null,
): string | null {
  if (isExpiryPermanent(service)) return null;
  if (service === "domain" || service === "hosting") {
    return computeExpiryForService(service, registeredAt);
  }
  if (isExpiryEditable(service)) {
    return currentExpiry;
  }
  return currentExpiry;
}

export function generateContractCode(index = 0) {
  const year = new Date().getFullYear();
  const seq = String(Date.now()).slice(-6);
  return `HD-${year}-${seq}${index > 0 ? `-${index}` : ""}`;
}

export function createEmptyCustomer(index = 0): CustomerRecord {
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    contractCode: generateContractCode(index),
    fullName: "",
    establishmentName: "",
    taxId: "",
    industry: "",
    phone: "",
    email: "",
    platform: "facebook",
    service: "thiet-ke",
    registeredAt: today,
    expiresAt: null,
    platformLink: "",
    amountPaid: 0,
    amountUnpaid: 0,
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
    : "vĩnh viễn";
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

export const CUSTOMER_EXPORT_COLUMNS: { key: keyof CustomerRecord | "serviceLabel" | "platformLabel"; header: string }[] = [
  { key: "contractCode", header: "Mã số hợp đồng" },
  { key: "fullName", header: "Họ và tên khách hàng" },
  { key: "establishmentName", header: "Tên hộ kinh doanh/ công ty" },
  { key: "taxId", header: "Mã số thuế" },
  { key: "industry", header: "Ngành nghề" },
  { key: "phone", header: "Số liên hệ" },
  { key: "email", header: "Gmail" },
  { key: "platformLabel", header: "Nền tảng" },
  { key: "serviceLabel", header: "Dịch vụ đăng ký" },
  { key: "registeredAt", header: "Ngày đăng ký" },
  { key: "expiresAt", header: "Ngày hết hạn" },
  { key: "platformLink", header: "Link nền tảng" },
  { key: "amountPaid", header: "Số tiền đã thanh toán" },
  { key: "amountUnpaid", header: "Số tiền chưa thanh toán" },
];

export function exportCustomersToExcel(customers: CustomerRecord[]) {
  const escape = (value: unknown) => {
    const text = value == null ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const header = CUSTOMER_EXPORT_COLUMNS.map((col) => escape(col.header)).join(",");
  const rows = customers.map((row) => {
    const platformLabel = CUSTOMER_PLATFORMS.find((p) => p.key === row.platform)?.label || row.platform;
    const serviceLabel =
      getServicesForPlatform(row.platform).find((s) => s.key === row.service)?.label || row.service;
    return CUSTOMER_EXPORT_COLUMNS.map((col) => {
      if (col.key === "platformLabel") return escape(platformLabel);
      if (col.key === "serviceLabel") return escape(serviceLabel);
      const val = row[col.key as keyof CustomerRecord];
      return escape(val);
    }).join(",");
  });

  const csv = `\uFEFF${header}\n${rows.join("\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `khach-hang-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}
