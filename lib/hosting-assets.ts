import {
  daysUntilExpiry,
  getPackageByKey,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const HOSTING_ASSETS_KEY = "hosting_assets";
export const HOSTING_PROVIDER_DEFAULT = "PA";

export type HostingStatus = "unverified" | "active" | "expired";

export type HostingAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  hostingName: string;
  packageLabel: string;
  provider: string;
  buyPrice: number;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: HostingStatus;
  lastExpiryEmailAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const HOSTING_STATUS_OPTIONS: { key: HostingStatus; label: string }[] = [
  { key: "unverified", label: "Chưa xác thật" },
  { key: "active", label: "Đang hoạt động" },
  { key: "expired", label: "Đã hết hạn" },
];

export function createEmptyHostingAsset(index = 0): HostingAsset {
  const now = new Date().toISOString();
  return {
    id: `hosting-${Date.now()}-${index}`,
    customerRecordId: "",
    contractCode: "",
    customerName: "",
    customerEmail: "",
    hostingName: "",
    packageLabel: "",
    provider: HOSTING_PROVIDER_DEFAULT,
    buyPrice: 0,
    sellPrice: 0,
    registerDate: null,
    expireDate: null,
    status: "unverified",
    lastExpiryEmailAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function addOneYear(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

export function renewHostingAsset(asset: HostingAsset): HostingAsset {
  const now = new Date().toISOString();
  return {
    ...asset,
    registerDate: addOneYear(asset.registerDate),
    expireDate: addOneYear(asset.expireDate),
    status: "active",
    updatedAt: now,
  };
}

export function hostingAssetFromCustomer(customer: CustomerRecord): HostingAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const pkg = getPackageByKey(customer.platform, customer.service, customer.subscriptionPackage);
  const days = daysUntilExpiry(customer.expiresAt);
  let status: HostingStatus = "unverified";
  if (days !== null && days < 0) status = "expired";
  else if (customer.expiresAt && customer.platformLink.trim()) status = "active";

  return {
    id: `hosting-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    hostingName: customer.platformLink.trim(),
    packageLabel: pkg?.label || customer.subscriptionPackage,
    provider: HOSTING_PROVIDER_DEFAULT,
    buyPrice: 0,
    sellPrice,
    registerDate: customer.registeredAt,
    expireDate: customer.expiresAt,
    status,
    lastExpiryEmailAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function mergeHostingFromCustomer(existing: HostingAsset, customer: CustomerRecord): HostingAsset {
  const fromCustomer = hostingAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    hostingName: fromCustomer.hostingName || existing.hostingName,
    packageLabel: fromCustomer.packageLabel || existing.packageLabel,
    provider: HOSTING_PROVIDER_DEFAULT,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    expireDate: fromCustomer.expireDate ?? existing.expireDate,
    updatedAt: new Date().toISOString(),
  };
}

export type HostingRowTone = "normal" | "warning" | "danger";

export function hostingRowTone(asset: HostingAsset, reference = new Date()): HostingRowTone {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null) return "normal";
  if (days < 0 || asset.status === "expired") return "danger";
  if (days <= 30) return "warning";
  return "normal";
}

export function sortHostingAssets(assets: HostingAsset[], reference = new Date()): HostingAsset[] {
  return [...assets].sort((a, b) => {
    const daysA = daysUntilExpiry(a.expireDate, reference);
    const daysB = daysUntilExpiry(b.expireDate, reference);
    const rankA = daysA === null ? Number.MAX_SAFE_INTEGER : daysA;
    const rankB = daysB === null ? Number.MAX_SAFE_INTEGER : daysB;
    return rankA - rankB;
  });
}

export function shouldSendHostingExpiryEmail(asset: HostingAsset, reference = new Date()) {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null || days < 0 || days > 30) return false;
  if (!asset.customerEmail.trim()) return false;

  if (asset.lastExpiryEmailAt) {
    const last = new Date(asset.lastExpiryEmailAt);
    const diffMs = reference.getTime() - last.getTime();
    if (diffMs < 7 * 24 * 60 * 60 * 1000) return false;
  }
  return true;
}

export function buildHostingExpiryEmail(asset: HostingAsset) {
  const days = daysUntilExpiry(asset.expireDate) ?? 0;
  const expiryLabel = asset.expireDate
    ? new Date(asset.expireDate).toLocaleDateString("vi-VN")
    : "";
  return {
    subject: `[Bứt Phá Marketing] Hosting ${asset.hostingName} sắp hết hạn`,
    text: `Xin chào ${asset.customerName || "Anh/Chị"},

Hosting "${asset.hostingName}" — gói ${asset.packageLabel || "đang dùng"} (HĐ: ${asset.contractCode}) sẽ hết hạn vào ${expiryLabel} (còn ${days} ngày).

Vui lòng liên hệ Bứt Phá Marketing để gia hạn kịp thời, tránh gián đoạn dịch vụ.

Trân trọng,
Bứt Phá Marketing`,
  };
}

export function sanitizeHostingAsset(raw: unknown, index: number): HostingAsset {
  const base = createEmptyHostingAsset(index);
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const now = new Date().toISOString();
  const statusRaw = typeof item.status === "string" ? item.status : base.status;
  const status: HostingStatus =
    statusRaw === "active" || statusRaw === "expired" || statusRaw === "unverified"
      ? statusRaw
      : base.status;

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : base.id,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    hostingName: typeof item.hostingName === "string" ? item.hostingName : "",
    packageLabel: typeof item.packageLabel === "string" ? item.packageLabel : "",
    provider: HOSTING_PROVIDER_DEFAULT,
    buyPrice: typeof item.buyPrice === "number" ? item.buyPrice : Number(item.buyPrice) || 0,
    sellPrice: typeof item.sellPrice === "number" ? item.sellPrice : Number(item.sellPrice) || 0,
    registerDate:
      typeof item.registerDate === "string" && item.registerDate.trim()
        ? item.registerDate.slice(0, 10)
        : null,
    expireDate:
      typeof item.expireDate === "string" && item.expireDate.trim() ? item.expireDate.slice(0, 10) : null,
    status,
    lastExpiryEmailAt:
      typeof item.lastExpiryEmailAt === "string" && item.lastExpiryEmailAt.trim()
        ? item.lastExpiryEmailAt
        : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: now,
  };
}
