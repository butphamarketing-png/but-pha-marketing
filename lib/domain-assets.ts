import {
  daysUntilExpiry,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const DOMAIN_ASSETS_KEY = "domain_assets";
export const DOMAIN_PROVIDER_DEFAULT = "PA";

export type DomainStatus = "unverified" | "active" | "expired";

export type DomainAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  domainName: string;
  provider: string;
  buyPrice: number;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: DomainStatus;
  lastExpiryEmailAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const DOMAIN_STATUS_OPTIONS: { key: DomainStatus; label: string }[] = [
  { key: "unverified", label: "Chưa xác thật" },
  { key: "active", label: "Đang hoạt động" },
  { key: "expired", label: "Đã hết hạn" },
];

export function createEmptyDomainAsset(index = 0): DomainAsset {
  const now = new Date().toISOString();
  return {
    id: `domain-${Date.now()}-${index}`,
    customerRecordId: "",
    contractCode: "",
    customerName: "",
    customerEmail: "",
    domainName: "",
    provider: DOMAIN_PROVIDER_DEFAULT,
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

export function domainStatusLabel(status: DomainStatus) {
  return DOMAIN_STATUS_OPTIONS.find((item) => item.key === status)?.label || status;
}

export function addOneYear(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

export function renewDomainAsset(asset: DomainAsset): DomainAsset {
  const now = new Date().toISOString();
  return {
    ...asset,
    registerDate: addOneYear(asset.registerDate),
    expireDate: addOneYear(asset.expireDate),
    status: "active",
    updatedAt: now,
  };
}

export function domainAssetFromCustomer(customer: CustomerRecord): DomainAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const days = daysUntilExpiry(customer.expiresAt);
  let status: DomainStatus = "unverified";
  if (days !== null && days < 0) status = "expired";
  else if (customer.expiresAt && customer.platformLink.trim()) status = "active";

  return {
    id: `domain-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    domainName: customer.platformLink.trim(),
    provider: DOMAIN_PROVIDER_DEFAULT,
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

export function mergeDomainFromCustomer(existing: DomainAsset, customer: CustomerRecord): DomainAsset {
  const fromCustomer = domainAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    domainName: fromCustomer.domainName || existing.domainName,
    provider: DOMAIN_PROVIDER_DEFAULT,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    expireDate: fromCustomer.expireDate ?? existing.expireDate,
    updatedAt: new Date().toISOString(),
  };
}

export type DomainRowTone = "normal" | "warning" | "danger";

export function domainRowTone(asset: DomainAsset, reference = new Date()): DomainRowTone {
  const days = daysUntilExpiry(asset.expireDate, reference);
  if (days === null) return "normal";
  if (days < 0 || asset.status === "expired") return "danger";
  if (days <= 30) return "warning";
  return "normal";
}

export function sortDomainAssets(assets: DomainAsset[], reference = new Date()): DomainAsset[] {
  return [...assets].sort((a, b) => {
    const daysA = daysUntilExpiry(a.expireDate, reference);
    const daysB = daysUntilExpiry(b.expireDate, reference);
    const rankA = daysA === null ? Number.MAX_SAFE_INTEGER : daysA;
    const rankB = daysB === null ? Number.MAX_SAFE_INTEGER : daysB;
    return rankA - rankB;
  });
}

export function shouldSendDomainExpiryEmail(asset: DomainAsset, reference = new Date()) {
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

export function buildDomainExpiryEmail(asset: DomainAsset) {
  const days = daysUntilExpiry(asset.expireDate) ?? 0;
  const expiryLabel = asset.expireDate
    ? new Date(asset.expireDate).toLocaleDateString("vi-VN")
    : "";
  return {
    subject: `[Bứt Phá Marketing] Domain ${asset.domainName} sắp hết hạn`,
    text: `Xin chào ${asset.customerName || "Anh/Chị"},

Domain "${asset.domainName}" (HĐ: ${asset.contractCode}) sẽ hết hạn vào ${expiryLabel} (còn ${days} ngày).

Vui lòng liên hệ Bứt Phá Marketing để gia hạn kịp thời, tránh gián đoạn dịch vụ.

Trân trọng,
Bứt Phá Marketing`,
  };
}

export function sanitizeDomainAsset(raw: unknown, index: number): DomainAsset {
  const base = createEmptyDomainAsset(index);
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const now = new Date().toISOString();
  const statusRaw = typeof item.status === "string" ? item.status : base.status;
  const status: DomainStatus =
    statusRaw === "active" || statusRaw === "expired" || statusRaw === "unverified"
      ? statusRaw
      : base.status;

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : base.id,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    domainName: typeof item.domainName === "string" ? item.domainName : "",
    provider: DOMAIN_PROVIDER_DEFAULT,
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
