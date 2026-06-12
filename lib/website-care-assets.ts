import {
  daysUntilExpiry,
  getPackageByKey,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const WEBSITE_CARE_ASSETS_KEY = "website_care_assets";

export type WebsiteCareStatus = "unverified" | "active" | "expired";

export type WebsiteCareAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  siteUrl: string;
  packageLabel: string;
  buyPrice: number;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: WebsiteCareStatus;
  lastExpiryEmailAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const WEBSITE_CARE_STATUS_OPTIONS: { key: WebsiteCareStatus; label: string }[] = [
  { key: "unverified", label: "Chưa xác thật" },
  { key: "active", label: "Đang hoạt động" },
  { key: "expired", label: "Đã hết hạn" },
];

export function addOneMonth(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().slice(0, 10);
}

export function renewWebsiteCareAsset(asset: WebsiteCareAsset): WebsiteCareAsset {
  const now = new Date().toISOString();
  return {
    ...asset,
    registerDate: addOneMonth(asset.registerDate),
    expireDate: addOneMonth(asset.expireDate),
    status: "active",
    updatedAt: now,
  };
}

export function websiteCareAssetFromCustomer(customer: CustomerRecord): WebsiteCareAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const pkg = getPackageByKey(customer.platform, customer.service, customer.subscriptionPackage);
  const days = daysUntilExpiry(customer.expiresAt);
  let status: WebsiteCareStatus = "unverified";
  if (days !== null && days < 0) status = "expired";
  else if (customer.expiresAt && customer.platformLink.trim()) status = "active";

  return {
    id: `webcare-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    siteUrl: customer.platformLink.trim(),
    packageLabel: pkg?.label || customer.subscriptionPackage,
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

export function mergeWebsiteCareFromCustomer(
  existing: WebsiteCareAsset,
  customer: CustomerRecord,
): WebsiteCareAsset {
  const fromCustomer = websiteCareAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    siteUrl: fromCustomer.siteUrl || existing.siteUrl,
    packageLabel: fromCustomer.packageLabel || existing.packageLabel,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    expireDate: fromCustomer.expireDate ?? existing.expireDate,
    updatedAt: new Date().toISOString(),
  };
}

export type WebsiteCareRowTone = "normal" | "warning" | "danger";

export function websiteCareRowTone(asset: WebsiteCareAsset, reference = new Date()): WebsiteCareRowTone {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null) return "normal";
  if (days < 0 || asset.status === "expired") return "danger";
  if (days <= 30) return "warning";
  return "normal";
}

export function sortWebsiteCareAssets(assets: WebsiteCareAsset[], reference = new Date()): WebsiteCareAsset[] {
  return [...assets].sort((a, b) => {
    const daysA = daysUntilExpiry(a.expireDate, reference);
    const daysB = daysUntilExpiry(b.expireDate, reference);
    const rankA = daysA === null ? Number.MAX_SAFE_INTEGER : daysA;
    const rankB = daysB === null ? Number.MAX_SAFE_INTEGER : daysB;
    return rankA - rankB;
  });
}

export function shouldSendWebsiteCareExpiryEmail(asset: WebsiteCareAsset, reference = new Date()) {
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

export function buildWebsiteCareExpiryEmail(asset: WebsiteCareAsset) {
  const days = daysUntilExpiry(asset.expireDate) ?? 0;
  const expiryLabel = asset.expireDate
    ? new Date(asset.expireDate).toLocaleDateString("vi-VN")
    : "";
  return {
    subject: `[Bứt Phá Marketing] Chăm sóc website ${asset.siteUrl} sắp hết hạn`,
    text: `Xin chào ${asset.customerName || "Anh/Chị"},

Gói chăm sóc website "${asset.packageLabel || "đang dùng"}" — ${asset.siteUrl} (HĐ: ${asset.contractCode}) sẽ hết hạn vào ${expiryLabel} (còn ${days} ngày).

Vui lòng liên hệ Bứt Phá Marketing để gia hạn kịp thời, tránh gián đoạn dịch vụ.

Trân trọng,
Bứt Phá Marketing`,
  };
}

export function sanitizeWebsiteCareAsset(raw: unknown, index: number): WebsiteCareAsset {
  const now = new Date().toISOString();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const statusRaw = typeof item.status === "string" ? item.status : "unverified";
  const status: WebsiteCareStatus =
    statusRaw === "active" || statusRaw === "expired" || statusRaw === "unverified"
      ? statusRaw
      : "unverified";

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `webcare-${Date.now()}-${index}`,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    siteUrl: typeof item.siteUrl === "string" ? item.siteUrl : "",
    packageLabel: typeof item.packageLabel === "string" ? item.packageLabel : "",
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
