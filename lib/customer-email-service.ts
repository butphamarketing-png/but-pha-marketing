import { sanitizeCustomerRecord } from "@/lib/customer-record-sanitize";
import { buildCustomerPackageEmail } from "@/lib/customer-package-email";
import { buildDomainExpiryEmail, type DomainAsset } from "@/lib/domain-assets";
import { loadDomainAssets, saveDomainAssets } from "@/lib/domain-assets-store";
import { buildHostingExpiryEmail, type HostingAsset } from "@/lib/hosting-assets";
import { loadHostingAssets, saveHostingAssets } from "@/lib/hosting-assets-store";
import { buildWebsiteCareExpiryEmail, type WebsiteCareAsset } from "@/lib/website-care-assets";
import { loadWebsiteCareAssets, saveWebsiteCareAssets } from "@/lib/website-care-assets-store";
import { buildWebsiteAdsExpiryEmail, type WebsiteAdsAsset } from "@/lib/website-ads-assets";
import { loadWebsiteAdsAssets, saveWebsiteAdsAssets } from "@/lib/website-ads-assets-store";
import { buildFacebookAdsExpiryEmail, type FacebookAdsAsset } from "@/lib/facebook-ads-assets";
import { loadFacebookAdsAssets, saveFacebookAdsAssets } from "@/lib/facebook-ads-assets-store";
import {
  buildGoogleMapsAdsExpiryEmail,
  type GoogleMapsAdsAsset,
} from "@/lib/googlemaps-ads-assets";
import { loadGoogleMapsAdsAssets, saveGoogleMapsAdsAssets } from "@/lib/googlemaps-ads-assets-store";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import { getMailConfig, sendPlainEmail } from "@/lib/mail-transport";
import { createServerClient } from "@/lib/supabase";

export const CUSTOMER_EMAIL_TYPES = [
  "package",
  "domain",
  "hosting",
  "website-care",
  "website-ads",
  "facebook-ads",
  "googlemaps-ads",
] as const;

export type CustomerEmailType = (typeof CUSTOMER_EMAIL_TYPES)[number];

export const CUSTOMER_EMAIL_TYPE_LABELS: Record<CustomerEmailType, string> = {
  package: "Email xác nhận gói dịch vụ",
  domain: "Email nhắc hết hạn domain",
  hosting: "Email nhắc hết hạn hosting",
  "website-care": "Email nhắc hết hạn chăm sóc website",
  "website-ads": "Email nhắc hết hạn quảng cáo website",
  "facebook-ads": "Email nhắc hết hạn quảng cáo Facebook",
  "googlemaps-ads": "Email nhắc hết hạn quảng cáo Google Maps",
};

type StoredCustomers = { entries: CustomerRecord[] };

type ExpiryAsset =
  | DomainAsset
  | HostingAsset
  | WebsiteCareAsset
  | WebsiteAdsAsset
  | FacebookAdsAsset
  | GoogleMapsAdsAsset;

export type CustomerEmailPreview = {
  type: CustomerEmailType;
  typeLabel: string;
  to: string;
  subject: string;
  text: string;
  customerId?: string;
  assetId?: string;
};

export function isCustomerEmailType(value: string): value is CustomerEmailType {
  return (CUSTOMER_EMAIL_TYPES as readonly string[]).includes(value);
}

async function loadCustomerEntries() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();
  if (error) throw error;
  return Array.isArray((data?.value as StoredCustomers | null)?.entries)
    ? (data!.value as StoredCustomers).entries
    : [];
}

async function resolveCustomer(
  customerId?: string,
  customerInput?: unknown,
): Promise<CustomerRecord | null> {
  const entries = await loadCustomerEntries();
  const index = customerId ? entries.findIndex((item) => item.id === customerId) : -1;
  const stored = index >= 0 ? entries[index] : null;
  const rawCustomer =
    typeof customerInput === "object" && customerInput
      ? { ...(stored ?? {}), ...(customerInput as Record<string, unknown>), ...(customerId ? { id: customerId } : {}) }
      : stored;
  if (!rawCustomer) return null;
  return sanitizeCustomerRecord(rawCustomer, Math.max(0, index));
}

async function loadExpiryAsset(type: CustomerEmailType, assetId: string): Promise<ExpiryAsset | null> {
  if (type === "domain") {
    const { assets } = await loadDomainAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  if (type === "hosting") {
    const { assets } = await loadHostingAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  if (type === "website-care") {
    const { assets } = await loadWebsiteCareAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  if (type === "website-ads") {
    const { assets } = await loadWebsiteAdsAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  if (type === "facebook-ads") {
    const { assets } = await loadFacebookAdsAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  if (type === "googlemaps-ads") {
    const { assets } = await loadGoogleMapsAdsAssets();
    return assets.find((item) => item.id === assetId) ?? null;
  }
  return null;
}

function buildExpiryEmail(type: CustomerEmailType, asset: ExpiryAsset) {
  switch (type) {
    case "domain":
      return buildDomainExpiryEmail(asset as DomainAsset);
    case "hosting":
      return buildHostingExpiryEmail(asset as HostingAsset);
    case "website-care":
      return buildWebsiteCareExpiryEmail(asset as WebsiteCareAsset);
    case "website-ads":
      return buildWebsiteAdsExpiryEmail(asset as WebsiteAdsAsset);
    case "facebook-ads":
      return buildFacebookAdsExpiryEmail(asset as FacebookAdsAsset);
    case "googlemaps-ads":
      return buildGoogleMapsAdsExpiryEmail(asset as GoogleMapsAdsAsset);
    default:
      return { subject: "", text: "" };
  }
}

async function markExpiryEmailSent(type: CustomerEmailType, assetId: string) {
  const now = new Date().toISOString();

  if (type === "domain") {
    const { assets } = await loadDomainAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveDomainAssets(next);
    return;
  }
  if (type === "hosting") {
    const { assets } = await loadHostingAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveHostingAssets(next);
    return;
  }
  if (type === "website-care") {
    const { assets } = await loadWebsiteCareAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveWebsiteCareAssets(next);
    return;
  }
  if (type === "website-ads") {
    const { assets } = await loadWebsiteAdsAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveWebsiteAdsAssets(next);
    return;
  }
  if (type === "facebook-ads") {
    const { assets } = await loadFacebookAdsAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveFacebookAdsAssets(next);
    return;
  }
  if (type === "googlemaps-ads") {
    const { assets } = await loadGoogleMapsAdsAssets();
    const next = assets.map((item) =>
      item.id === assetId ? { ...item, lastExpiryEmailAt: now, updatedAt: now } : item,
    );
    await saveGoogleMapsAdsAssets(next);
  }
}

export async function previewCustomerEmail(input: {
  type: CustomerEmailType;
  customerId?: string;
  customer?: unknown;
  assetId?: string;
}): Promise<{ ok: true; preview: CustomerEmailPreview } | { ok: false; error: string }> {
  const typeLabel = CUSTOMER_EMAIL_TYPE_LABELS[input.type];

  if (input.type === "package") {
    const customer = await resolveCustomer(input.customerId, input.customer);
    if (!customer) {
      return { ok: false, error: "Không tìm thấy khách hàng." };
    }
    if (!customer.email.trim()) {
      return { ok: false, error: "Nhập Gmail khách hàng trước." };
    }
    const { subject, text } = buildCustomerPackageEmail(customer);
    return {
      ok: true,
      preview: {
        type: input.type,
        typeLabel,
        to: customer.email.trim(),
        subject,
        text,
        customerId: customer.id,
      },
    };
  }

  if (!input.assetId?.trim()) {
    return { ok: false, error: "Thiếu mã tài sản (assetId)." };
  }

  const asset = await loadExpiryAsset(input.type, input.assetId.trim());
  if (!asset) {
    return { ok: false, error: "Không tìm thấy tài sản." };
  }
  if (!asset.customerEmail.trim()) {
    return { ok: false, error: "Khách hàng chưa có Gmail." };
  }

  const { subject, text } = buildExpiryEmail(input.type, asset);
  return {
    ok: true,
    preview: {
      type: input.type,
      typeLabel,
      to: asset.customerEmail.trim(),
      subject,
      text,
      assetId: asset.id,
      customerId: asset.customerRecordId || undefined,
    },
  };
}

export async function sendCustomerEmailManual(input: {
  type: CustomerEmailType;
  to: string;
  subject: string;
  text: string;
  customerId?: string;
  assetId?: string;
  markExpiryNotified?: boolean;
}) {
  const { user, pass } = getMailConfig();
  if (!user || !pass) {
    return {
      sent: false as const,
      error: "Chưa cấu hình GMAIL_USER / GMAIL_APP_PASSWORD.",
    };
  }

  const outcome = await sendPlainEmail({
    to: input.to,
    subject: input.subject,
    text: input.text,
  });
  if (!outcome.sent) {
    return outcome;
  }

  if (input.type !== "package" && input.assetId && input.markExpiryNotified !== false) {
    await markExpiryEmailSent(input.type, input.assetId);
  }

  return {
    sent: true as const,
    subject: input.subject.trim(),
    text: input.text.trim(),
    to: input.to.trim(),
    customerId: input.customerId,
    assetId: input.assetId,
  };
}
