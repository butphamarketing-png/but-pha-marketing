export const CUSTOMER_RECORDS_KEY = "customer_records";

export type CustomerPlatform = "facebook" | "website" | "googlemaps";

export type ServicePackage = {
  key: string;
  label: string;
  price: number;
  period: "year" | "month" | "once";
};

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
  subscriptionPackage: string;
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

export const PLATFORM_SERVICE_PACKAGES: Record<CustomerPlatform, Record<string, ServicePackage[]>> = {
  website: {
    domain: [
      { key: "com", label: ".com", price: 350_000, period: "year" },
      { key: "com-vn", label: ".com.vn", price: 650_000, period: "year" },
      { key: "vn", label: ".vn", price: 750_000, period: "year" },
      { key: "net", label: ".net", price: 420_000, period: "year" },
      { key: "org", label: ".org", price: 400_000, period: "year" },
      { key: "online", label: ".online", price: 900_000, period: "year" },
      { key: "shop", label: ".shop", price: 1_000_000, period: "year" },
      { key: "store", label: ".store", price: 1_500_000, period: "year" },
      { key: "asia", label: ".asia", price: 500_000, period: "year" },
      { key: "edu-vn", label: ".edu.vn", price: 650_000, period: "year" },
    ],
    hosting: [
      { key: "3gb", label: "3GB", price: 3_348_000, period: "year" },
      { key: "5gb", label: "5GB", price: 4_872_000, period: "year" },
      { key: "7gb", label: "7GB", price: 6_000_000, period: "year" },
      { key: "8gb", label: "8GB", price: 6_504_000, period: "year" },
      { key: "10gb", label: "10GB", price: 7_200_000, period: "year" },
      { key: "16gb", label: "16GB", price: 10_080_000, period: "year" },
      { key: "20gb", label: "20GB", price: 12_000_000, period: "year" },
      { key: "30gb", label: "30GB", price: 16_080_000, period: "year" },
      { key: "50gb", label: "50GB", price: 24_000_000, period: "year" },
      { key: "100gb", label: "100GB", price: 43_200_000, period: "year" },
    ],
    "thiet-ke": [],
    "cham-soc": [
      { key: "cs-web-1", label: "CS Web 1", price: 1_000_000, period: "month" },
      { key: "cs-web-2", label: "CS Web 2", price: 2_000_000, period: "month" },
      { key: "cs-web-3", label: "CS Web 3", price: 2_500_000, period: "month" },
    ],
    "quang-cao": [
      { key: "qc-web-1", label: "QC Web 1", price: 1_000_000, period: "month" },
      { key: "qc-web-2", label: "QC Web 2", price: 2_000_000, period: "month" },
    ],
  },
  facebook: {
    "thiet-ke": [
      { key: "xd-fb-1", label: "XD FB 1", price: 500_000, period: "once" },
      { key: "xd-fb-2", label: "XD FB 2", price: 1_000_000, period: "once" },
      { key: "xd-fb-3", label: "XD FB 3", price: 1_500_000, period: "once" },
    ],
    "cham-soc": [
      { key: "cs-fb-1", label: "CS FB 1", price: 1_500_000, period: "month" },
      { key: "cs-fb-2", label: "CS FB 2", price: 2_500_000, period: "month" },
      { key: "cs-fb-3", label: "CS FB 3", price: 3_500_000, period: "month" },
    ],
    "quang-cao": [
      { key: "qc-fb-1", label: "QC FB 1", price: 1_000_000, period: "month" },
      { key: "qc-fb-2", label: "QC FB 2", price: 2_000_000, period: "month" },
    ],
  },
  googlemaps: {
    "thiet-ke": [
      { key: "xd-map-1", label: "XD Map 1", price: 300_000, period: "once" },
      { key: "xd-map-2", label: "XD Map 2", price: 600_000, period: "once" },
      { key: "xd-map-3", label: "XD Map 3", price: 900_000, period: "once" },
    ],
    "quang-cao": [
      { key: "qc-map-1", label: "QC Map 1", price: 1_000_000, period: "month" },
      { key: "qc-map-2", label: "QC Map 2", price: 2_000_000, period: "month" },
    ],
  },
};

/** @deprecated use PLATFORM_SERVICE_PACKAGES.website */
export const WEBSITE_SERVICE_PACKAGES = PLATFORM_SERVICE_PACKAGES.website;

export function getPackagesForService(platform: CustomerPlatform | string, service: string): ServicePackage[] {
  if (platform === "website" || platform === "facebook" || platform === "googlemaps") {
    return PLATFORM_SERVICE_PACKAGES[platform][service] ?? [];
  }
  return [];
}

export function getPackageByKey(
  platform: CustomerPlatform | string,
  service: string,
  packageKey: string,
): ServicePackage | undefined {
  if (!packageKey) return undefined;
  return getPackagesForService(platform, service).find((pkg) => pkg.key === packageKey);
}

export function formatPackageOption(pkg: ServicePackage) {
  if (pkg.period === "once") {
    return `${pkg.label} (${formatVnd(pkg.price)})`;
  }
  const suffix = pkg.period === "year" ? "/năm" : "/tháng";
  return `${pkg.label} (${formatVnd(pkg.price)}${suffix})`;
}

export function formatPackageDisplay(
  platform: CustomerPlatform | string,
  service: string,
  packageKey: string,
) {
  const pkg = getPackageByKey(platform, service, packageKey);
  if (!pkg) return packageKey.trim() ? packageKey : "—";
  return formatPackageOption(pkg);
}

export function isValidPackageForService(
  platform: CustomerPlatform | string,
  service: string,
  packageKey: string,
) {
  if (!packageKey) return true;
  return getPackagesForService(platform, service).some((pkg) => pkg.key === packageKey);
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
    subscriptionPackage: "",
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

export const CUSTOMER_EXPORT_COLUMNS: {
  key: keyof CustomerRecord | "serviceLabel" | "platformLabel" | "packageLabel";
  header: string;
}[] = [
  { key: "contractCode", header: "Mã số hợp đồng" },
  { key: "fullName", header: "Họ và tên khách hàng" },
  { key: "establishmentName", header: "Tên hộ kinh doanh/ công ty" },
  { key: "taxId", header: "Mã số thuế" },
  { key: "industry", header: "Ngành nghề" },
  { key: "phone", header: "Số liên hệ" },
  { key: "email", header: "Gmail" },
  { key: "platformLabel", header: "Nền tảng" },
  { key: "serviceLabel", header: "Dịch vụ đăng ký" },
  { key: "packageLabel", header: "Gói đăng ký" },
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
    const packageLabel = formatPackageDisplay(row.platform, row.service, row.subscriptionPackage);
    return CUSTOMER_EXPORT_COLUMNS.map((col) => {
      if (col.key === "platformLabel") return escape(platformLabel);
      if (col.key === "serviceLabel") return escape(serviceLabel);
      if (col.key === "packageLabel") return escape(packageLabel);
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
