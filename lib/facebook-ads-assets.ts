import {
  daysUntilExpiry,
  getPackageByKey,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const FACEBOOK_ADS_ASSETS_KEY = "facebook_ads_assets";

export type FacebookAdsStatus = "unverified" | "active" | "expired";

export type FacebookAdsAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  campaignLink: string;
  packageLabel: string;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: FacebookAdsStatus;
  lastExpiryEmailAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const FACEBOOK_ADS_STATUS_OPTIONS: { key: FacebookAdsStatus; label: string }[] = [
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

export function renewFacebookAdsAsset(asset: FacebookAdsAsset): FacebookAdsAsset {
  const now = new Date().toISOString();
  return {
    ...asset,
    registerDate: addOneMonth(asset.registerDate),
    expireDate: addOneMonth(asset.expireDate),
    status: "active",
    updatedAt: now,
  };
}

export function facebookAdsAssetFromCustomer(customer: CustomerRecord): FacebookAdsAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const pkg = getPackageByKey(customer.platform, customer.service, customer.subscriptionPackage);
  const days = daysUntilExpiry(customer.expiresAt);
  let status: FacebookAdsStatus = "unverified";
  if (days !== null && days < 0) status = "expired";
  else if (customer.expiresAt && customer.platformLink.trim()) status = "active";

  return {
    id: `fbads-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    campaignLink: customer.platformLink.trim(),
    packageLabel: pkg?.label || customer.subscriptionPackage,
    sellPrice,
    registerDate: customer.registeredAt,
    expireDate: customer.expiresAt,
    status,
    lastExpiryEmailAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function mergeFacebookAdsFromCustomer(
  existing: FacebookAdsAsset,
  customer: CustomerRecord,
): FacebookAdsAsset {
  const fromCustomer = facebookAdsAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    campaignLink: fromCustomer.campaignLink || existing.campaignLink,
    packageLabel: fromCustomer.packageLabel || existing.packageLabel,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    expireDate: fromCustomer.expireDate ?? existing.expireDate,
    updatedAt: new Date().toISOString(),
  };
}

export type FacebookAdsRowTone = "normal" | "warning" | "danger";

export function facebookAdsRowTone(asset: FacebookAdsAsset, reference = new Date()): FacebookAdsRowTone {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null) return "normal";
  if (days < 0 || asset.status === "expired") return "danger";
  if (days <= 30) return "warning";
  return "normal";
}

export function sortFacebookAdsAssets(assets: FacebookAdsAsset[], reference = new Date()): FacebookAdsAsset[] {
  return [...assets].sort((a, b) => {
    const daysA = daysUntilExpiry(a.expireDate, reference);
    const daysB = daysUntilExpiry(b.expireDate, reference);
    const rankA = daysA === null ? Number.MAX_SAFE_INTEGER : daysA;
    const rankB = daysB === null ? Number.MAX_SAFE_INTEGER : daysB;
    return rankA - rankB;
  });
}

export function shouldSendFacebookAdsExpiryEmail(asset: FacebookAdsAsset, reference = new Date()) {
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

export function buildFacebookAdsExpiryEmail(asset: FacebookAdsAsset) {
  const days = daysUntilExpiry(asset.expireDate) ?? 0;
  const expiryLabel = asset.expireDate
    ? new Date(asset.expireDate).toLocaleDateString("vi-VN")
    : "";
  return {
    subject: `[Bứt Phá Marketing] Quảng cáo Facebook sắp hết hạn (HĐ: ${asset.contractCode})`,
    text: `Xin chào ${asset.customerName || "Anh/Chị"},

Gói quảng cáo Facebook "${asset.packageLabel || "đang dùng"}" (HĐ: ${asset.contractCode}) sẽ hết hạn vào ${expiryLabel} (còn ${days} ngày).

Vui lòng liên hệ Bứt Phá Marketing để gia hạn kịp thời, tránh gián đoạn chiến dịch.

Trân trọng,
Bứt Phá Marketing`,
  };
}

export function sanitizeFacebookAdsAsset(raw: unknown, index = 0): FacebookAdsAsset {
  const now = new Date().toISOString();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const statusRaw = typeof item.status === "string" ? item.status : "unverified";
  const status: FacebookAdsStatus =
    statusRaw === "active" || statusRaw === "expired" || statusRaw === "unverified"
      ? statusRaw
      : "unverified";

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `fbads-${Date.now()}-${index}`,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    campaignLink: typeof item.campaignLink === "string" ? item.campaignLink : "",
    packageLabel: typeof item.packageLabel === "string" ? item.packageLabel : "",
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
