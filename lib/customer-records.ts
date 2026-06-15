import type { CustomerPaymentMethod } from "@/lib/customer-payment";

export const CUSTOMER_RECORDS_KEY = "customer_records";

export type CustomerPlatform = "facebook" | "website" | "googlemaps";
export type CustomerType = "individual" | "company";
export type CustomerStatus = "active" | "paused" | "stopped";
export type { CustomerPaymentMethod };

export type ServicePackage = {
  key: string;
  label: string;
  price: number;
  period: "year" | "month" | "once";
};

export type CustomerRecord = {
  id: string;
  /** Số gốc HĐ (chỉ số), vd. 100100 */
  contractBase: string;
  /** MSHĐ đầy đủ = contractBase + hậu tố dịch vụ, vd. 100100W */
  contractCode: string;
  customerType: CustomerType;
  fullName: string;
  /** Người liên hệ (công ty); cá nhân thường trùng fullName */
  contactPerson: string;
  establishmentName: string;
  taxId: string;
  /** Địa chỉ in trên hóa đơn VAT — công ty */
  invoiceAddress: string;
  needsVatInvoice: boolean;
  customerStatus: CustomerStatus;
  internalNotes: string;
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
  /** Tiền mặt / CK công ty / CK cá nhân — dùng khi sync phiếu thu ERP */
  paymentMethod: CustomerPaymentMethod;
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

/** Hậu tố MSHĐ theo nền tảng + dịch vụ */
export const SERVICE_CONTRACT_SUFFIX: Record<CustomerPlatform, Record<string, string>> = {
  website: {
    domain: "D",
    hosting: "H",
    "thiet-ke": "W",
    "cham-soc": "C",
    "quang-cao": "Q",
  },
  facebook: {
    "thiet-ke": "F",
    "cham-soc": "S",
    "quang-cao": "A",
  },
  googlemaps: {
    "thiet-ke": "M",
    "quang-cao": "G",
  },
};

const ALL_CONTRACT_SUFFIXES = new Set(
  Object.values(SERVICE_CONTRACT_SUFFIX).flatMap((group) => Object.values(group)),
);

export function getServiceContractSuffix(platform: CustomerPlatform | string, service: string) {
  if (platform === "website" || platform === "facebook" || platform === "googlemaps") {
    return SERVICE_CONTRACT_SUFFIX[platform][service] ?? "";
  }
  return "";
}

export function normalizeContractBase(raw: string) {
  return raw.replace(/\D/g, "");
}

export function extractContractBase(
  contractCode: string,
  platform?: CustomerPlatform | string,
  service?: string,
) {
  const code = contractCode.trim();
  if (!code) return "";

  if (platform && service) {
    const suffix = getServiceContractSuffix(platform, service);
    if (suffix && code.toUpperCase().endsWith(suffix)) {
      const base = code.slice(0, -suffix.length);
      if (/^\d+$/.test(base)) return base;
    }
  }

  const upper = code.toUpperCase();
  if (upper.length > 1 && ALL_CONTRACT_SUFFIXES.has(upper.slice(-1))) {
    const base = code.slice(0, -1);
    if (/^\d+$/.test(base)) return base;
  }

  const digits = code.replace(/\D/g, "");
  return digits || code;
}

export function buildContractCode(
  contractBase: string,
  platform: CustomerPlatform | string,
  service: string,
) {
  const base = normalizeContractBase(contractBase);
  if (!base) return "";
  const suffix = getServiceContractSuffix(platform, service);
  return suffix ? `${base}${suffix}` : base;
}

export function generateContractBase(index = 0) {
  const seq = String(Date.now()).slice(-6);
  return index > 0 ? `${seq}${index}` : seq;
}

export function syncCustomerContract(
  row: Pick<CustomerRecord, "contractBase" | "contractCode" | "platform" | "service">,
  index = 0,
) {
  let base = row.contractBase?.trim()
    ? normalizeContractBase(row.contractBase)
    : extractContractBase(row.contractCode, row.platform, row.service);
  if (!base) base = generateContractBase(index);
  return {
    contractBase: base,
    contractCode: buildContractCode(base, row.platform, row.service),
  };
}

export function getContractBaseFromCode(contractCode: string) {
  return extractContractBase(contractCode);
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
      { key: "2gb", label: "2GB", price: 2_388_000, period: "year" },
      { key: "3gb", label: "3GB", price: 3_348_000, period: "year" },
      { key: "5gb", label: "5GB", price: 4_872_000, period: "year" },
      { key: "7gb", label: "7GB", price: 6_000_000, period: "year" },
      { key: "8gb", label: "8GB", price: 6_504_000, period: "year" },
      { key: "10gb", label: "10GB", price: 7_200_000, period: "year" },
      { key: "16gb", label: "16GB", price: 10_080_000, period: "year" },
      { key: "20gb", label: "20GB", price: 12_000_000, period: "year" },
      { key: "30gb", label: "30GB", price: 16_080_000, period: "year" },
      { key: "50gb", label: "50GB", price: 24_000_000, period: "year" },
      { key: "60gb", label: "60GB", price: 28_008_000, period: "year" },
      { key: "70gb", label: "70GB", price: 32_040_000, period: "year" },
      { key: "80gb", label: "80GB", price: 36_000_000, period: "year" },
      { key: "90gb", label: "90GB", price: 39_960_000, period: "year" },
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

/** Tổng hợp đồng theo giá gói đã chọn (null nếu chưa có gói hoặc gói tự nhập). */
export function getPackageContractTotal(
  platform: CustomerPlatform | string,
  service: string,
  packageKey: string,
): number | null {
  const pkg = getPackageByKey(platform, service, packageKey);
  return pkg?.price ?? null;
}

/** Chưa TT = giá gói − Đã TT (tối thiểu 0). */
export function resolveAmountUnpaid(
  platform: CustomerPlatform | string,
  service: string,
  subscriptionPackage: string,
  amountPaid: number,
): number | null {
  const total = getPackageContractTotal(platform, service, subscriptionPackage);
  if (total === null) return null;
  return Math.max(0, total - amountPaid);
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

/** @deprecated use generateContractBase + buildContractCode */
export function generateContractCode(index = 0) {
  const base = generateContractBase(index);
  return buildContractCode(base, "facebook", "thiet-ke");
}

export function createEmptyCustomer(index = 0): CustomerRecord {
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  const platform: CustomerPlatform = "facebook";
  const service = "thiet-ke";
  const { contractBase, contractCode } = syncCustomerContract(
    { contractBase: generateContractBase(index), contractCode: "", platform, service },
    index,
  );
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    contractBase,
    contractCode,
    customerType: "individual",
    fullName: "",
    contactPerson: "",
    establishmentName: "",
    taxId: "",
    invoiceAddress: "",
    needsVatInvoice: false,
    customerStatus: "active",
    internalNotes: "",
    industry: "",
    phone: "",
    email: "",
    platform,
    service,
    subscriptionPackage: "",
    registeredAt: today,
    expiresAt: null,
    platformLink: "",
    amountPaid: 0,
    amountUnpaid: 0,
    paymentMethod: "bank_company",
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
  { key: "customerType", header: "Loại khách" },
  { key: "fullName", header: "Họ và tên khách hàng" },
  { key: "contactPerson", header: "Người liên hệ" },
  { key: "establishmentName", header: "Tên hộ kinh doanh/ công ty" },
  { key: "taxId", header: "Mã số thuế" },
  { key: "invoiceAddress", header: "Địa chỉ hóa đơn" },
  { key: "needsVatInvoice", header: "Xuất HĐ VAT" },
  { key: "customerStatus", header: "Trạng thái" },
  { key: "internalNotes", header: "Ghi chú nội bộ" },
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
  { key: "paymentMethod", header: "Hình thức TT" },
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
