import {
  daysUntilExpiry,
  getPackageByKey,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const FACEBOOK_CARE_ASSETS_KEY = "facebook_care_assets";

export type FacebookCareStatus = "unverified" | "active" | "expired";

export type FacebookCareAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  careLink: string;
  packageLabel: string;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: FacebookCareStatus;
  lastExpiryEmailAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const FACEBOOK_CARE_STATUS_OPTIONS: { key: FacebookCareStatus; label: string }[] = [
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

export function renewFacebookCareAsset(asset: FacebookCareAsset): FacebookCareAsset {
  const now = new Date().toISOString();
  return {
    ...asset,
    registerDate: addOneMonth(asset.registerDate),
    expireDate: addOneMonth(asset.expireDate),
    status: "active",
    updatedAt: now,
  };
}

export function facebookCareAssetFromCustomer(customer: CustomerRecord): FacebookCareAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const pkg = getPackageByKey(customer.platform, customer.service, customer.subscriptionPackage);
  const days = daysUntilExpiry(customer.expiresAt);
  let status: FacebookCareStatus = "unverified";
  if (days !== null && days < 0) status = "expired";
  else if (customer.expiresAt && customer.platformLink.trim()) status = "active";

  return {
    id: `fbcare-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    careLink: customer.platformLink.trim(),
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

export function mergeFacebookCareFromCustomer(
  existing: FacebookCareAsset,
  customer: CustomerRecord,
): FacebookCareAsset {
  const fromCustomer = facebookCareAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    careLink: fromCustomer.careLink || existing.careLink,
    packageLabel: fromCustomer.packageLabel || existing.packageLabel,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    expireDate: fromCustomer.expireDate ?? existing.expireDate,
    updatedAt: new Date().toISOString(),
  };
}

export type FacebookCareRowTone = "normal" | "warning" | "danger";

export function facebookCareRowTone(asset: FacebookCareAsset, reference = new Date()): FacebookCareRowTone {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null) return "normal";
  if (days < 0 || asset.status === "expired") return "danger";
  if (days <= 30) return "warning";
  return "normal";
}

export function sortFacebookCareAssets(assets: FacebookCareAsset[], reference = new Date()): FacebookCareAsset[] {
  return [...assets].sort((a, b) => {
    const daysA = daysUntilExpiry(a.expireDate, reference);
    const daysB = daysUntilExpiry(b.expireDate, reference);
    const rankA = daysA === null ? Number.MAX_SAFE_INTEGER : daysA;
    const rankB = daysB === null ? Number.MAX_SAFE_INTEGER : daysB;
    return rankA - rankB;
  });
}

export function sanitizeFacebookCareAsset(raw: unknown, index = 0): FacebookCareAsset {
  const now = new Date().toISOString();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const statusRaw = typeof item.status === "string" ? item.status : "unverified";
  const status: FacebookCareStatus =
    statusRaw === "active" || statusRaw === "expired" || statusRaw === "unverified"
      ? statusRaw
      : "unverified";

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `fbcare-${Date.now()}-${index}`,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    careLink: typeof item.careLink === "string" ? item.careLink : "",
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
