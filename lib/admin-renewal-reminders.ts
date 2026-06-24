import { daysUntilExpiry } from "@/lib/customer-records";
import { CUSTOMER_EMAIL_TYPE_LABELS, type CustomerEmailType } from "@/lib/customer-email-service";
import { loadDomainAssets } from "@/lib/domain-assets-store";
import { loadHostingAssets } from "@/lib/hosting-assets-store";
import { loadWebsiteCareAssets } from "@/lib/website-care-assets-store";
import { loadWebsiteAdsAssets } from "@/lib/website-ads-assets-store";
import { loadFacebookAdsAssets } from "@/lib/facebook-ads-assets-store";
import { loadGoogleMapsAdsAssets } from "@/lib/googlemaps-ads-assets-store";
import { getMailConfig, sendPlainEmail } from "@/lib/mail-transport";
import { createServerClient } from "@/lib/supabase";

export const ADMIN_RENEWAL_DIGEST_KEY = "admin_renewal_reminder_digest";
export const ADMIN_RENEWAL_REMINDER_DAYS = 3;

export type AdminRenewalDueItem = {
  key: string;
  type: CustomerEmailType;
  typeLabel: string;
  customerName: string;
  customerEmail: string;
  contractCode: string;
  serviceLabel: string;
  expireDate: string;
  daysLeft: number;
  cmsPath: string;
};

type DigestLog = {
  sentDate: string;
  itemKeys: string[];
};

type AssetRow = {
  id: string;
  customerName: string;
  customerEmail: string;
  contractCode: string;
  expireDate: string | null;
  serviceLabel: string;
};

const CMS_PATHS: Record<Exclude<CustomerEmailType, "package">, string> = {
  domain: "/cms/domains",
  hosting: "/cms/hostings",
  "website-care": "/cms/website-care",
  "website-ads": "/cms/website-ads",
  "facebook-ads": "/cms/facebook-ads",
  "googlemaps-ads": "/cms/google-ads",
};

function siteBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com").replace(/\/$/, "");
}

function formatDateVi(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("vi-VN");
}

function toDueItem(
  type: Exclude<CustomerEmailType, "package">,
  asset: AssetRow,
  reference: Date,
): AdminRenewalDueItem | null {
  const daysLeft = daysUntilExpiry(asset.expireDate, reference);
  if (daysLeft === null) return null;

  return {
    key: `${type}:${asset.id}`,
    type,
    typeLabel: CUSTOMER_EMAIL_TYPE_LABELS[type],
    customerName: asset.customerName.trim() || "—",
    customerEmail: asset.customerEmail.trim(),
    contractCode: asset.contractCode.trim() || "—",
    serviceLabel: asset.serviceLabel.trim() || "—",
    expireDate: asset.expireDate || "",
    daysLeft,
    cmsPath: `${CMS_PATHS[type]}?highlight=${encodeURIComponent(asset.id)}`,
  };
}

export async function collectAdminRenewalDueItems(reference = new Date()) {
  const [domainRes, hostingRes, careRes, adsRes, fbRes, mapsRes] = await Promise.all([
    loadDomainAssets(),
    loadHostingAssets(),
    loadWebsiteCareAssets(),
    loadWebsiteAdsAssets(),
    loadFacebookAdsAssets(),
    loadGoogleMapsAdsAssets(),
  ]);

  const items: AdminRenewalDueItem[] = [];

  for (const asset of domainRes.assets) {
    const item = toDueItem(
      "domain",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.domainName,
      },
      reference,
    );
    if (item) items.push(item);
  }

  for (const asset of hostingRes.assets) {
    const item = toDueItem(
      "hosting",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.hostingName || asset.packageLabel,
      },
      reference,
    );
    if (item) items.push(item);
  }

  for (const asset of careRes.assets) {
    const item = toDueItem(
      "website-care",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.siteUrl || asset.packageLabel,
      },
      reference,
    );
    if (item) items.push(item);
  }

  for (const asset of adsRes.assets) {
    const item = toDueItem(
      "website-ads",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.campaignLink || asset.packageLabel,
      },
      reference,
    );
    if (item) items.push(item);
  }

  for (const asset of fbRes.assets) {
    const item = toDueItem(
      "facebook-ads",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.campaignLink || asset.packageLabel,
      },
      reference,
    );
    if (item) items.push(item);
  }

  for (const asset of mapsRes.assets) {
    const item = toDueItem(
      "googlemaps-ads",
      {
        id: asset.id,
        customerName: asset.customerName,
        customerEmail: asset.customerEmail,
        contractCode: asset.contractCode,
        expireDate: asset.expireDate,
        serviceLabel: asset.campaignLink || asset.packageLabel,
      },
      reference,
    );
    if (item) items.push(item);
  }

  return items.sort((a, b) => a.daysLeft - b.daysLeft);
}

export function filterItemsForAdminReminder(
  items: AdminRenewalDueItem[],
  reference = new Date(),
) {
  return items.filter((item) => item.daysLeft === ADMIN_RENEWAL_REMINDER_DAYS);
}

export function filterItemsForAdminBanner(items: AdminRenewalDueItem[]) {
  return items.filter((item) => item.daysLeft >= 0 && item.daysLeft <= ADMIN_RENEWAL_REMINDER_DAYS);
}

async function loadDigestLog(): Promise<DigestLog | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", ADMIN_RENEWAL_DIGEST_KEY)
    .maybeSingle();
  if (error) throw error;
  const value = data?.value;
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.sentDate !== "string" || !Array.isArray(row.itemKeys)) return null;
  return {
    sentDate: row.sentDate,
    itemKeys: row.itemKeys.filter((key): key is string => typeof key === "string"),
  };
}

async function saveDigestLog(log: DigestLog) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: ADMIN_RENEWAL_DIGEST_KEY, value: log }, { onConflict: "key" });
  if (error) throw error;
}

export function getAdminReminderRecipient() {
  return (
    process.env.ADMIN_EMAIL ||
    process.env.GMAIL_USER ||
    ""
  ).trim();
}

export function buildAdminRenewalDigestEmail(items: AdminRenewalDueItem[]) {
  const base = siteBaseUrl();
  const lines = items.map((item, index) => {
    const link = `${base}${item.cmsPath}`;
    const emailLine = item.customerEmail ? ` · Gmail: ${item.customerEmail}` : " · Chưa có Gmail";
    return [
      `${index + 1}. ${item.typeLabel.replace("Email nhắc hết hạn ", "")}`,
      `   KH: ${item.customerName} · HĐ: ${item.contractCode}${emailLine}`,
      `   Dịch vụ: ${item.serviceLabel}`,
      `   Hết hạn: ${formatDateVi(item.expireDate)} (còn ${item.daysLeft} ngày)`,
      `   CMS: ${link}`,
    ].join("\n");
  });

  const subject = `[Bứt Phá CMS] Nhắc gửi Gmail thủ công — ${items.length} khách còn 3 ngày`;
  const text = [
    "Xin chào Admin,",
    "",
    `Có ${items.length} hợp đồng/dịch vụ sắp hết hạn trong đúng ${ADMIN_RENEWAL_REMINDER_DAYS} ngày.`,
    "Hệ thống không tự gửi Gmail cho khách — vui lòng vào CMS, bấm nút Gmail, xem trước và gửi thủ công.",
    "",
    ...lines,
    "",
    "Trân trọng,",
    "Bứt Phá Marketing CMS",
  ].join("\n");

  return { subject, text };
}

export async function processAdminRenewalReminders(reference = new Date()) {
  const allItems = await collectAdminRenewalDueItems(reference);
  const dueItems = filterItemsForAdminReminder(allItems, reference);
  if (dueItems.length === 0) {
    return { ok: true as const, sent: false, reason: "none_due", count: 0, items: [] };
  }

  const dateKey = reference.toISOString().slice(0, 10);
  const existing = await loadDigestLog();
  if (existing?.sentDate === dateKey) {
    return {
      ok: true as const,
      sent: false,
      reason: "already_sent_today",
      count: dueItems.length,
      items: dueItems,
    };
  }

  const recipient = getAdminReminderRecipient();
  if (!recipient) {
    return { ok: true as const, sent: false, reason: "no_recipient", count: dueItems.length, items: dueItems };
  }

  const { user, pass } = getMailConfig();
  if (!user || !pass) {
    return {
      ok: true as const,
      sent: false,
      reason: "no_mail_config",
      count: dueItems.length,
      items: dueItems,
    };
  }

  const { subject, text } = buildAdminRenewalDigestEmail(dueItems);
  const outcome = await sendPlainEmail({ to: recipient, subject, text });
  if (!outcome.sent) {
    return {
      ok: false as const,
      sent: false,
      reason: outcome.error,
      count: dueItems.length,
      items: dueItems,
    };
  }

  await saveDigestLog({
    sentDate: dateKey,
    itemKeys: dueItems.map((item) => item.key),
  });

  return { ok: true as const, sent: true, count: dueItems.length, items: dueItems, recipient };
}
