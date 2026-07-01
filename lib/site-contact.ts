export const DEFAULT_HOTLINE = "0937417982";
export const DEFAULT_EMAIL = "butphamarketing@gmail.com";
export const DEFAULT_ADDRESS = "Tổ 8 ấp 6 Bình Mỹ Hồ Chí Minh";

export const SITE_CONTACT = {
  hotline: DEFAULT_HOTLINE,
  email: DEFAULT_EMAIL,
  address: DEFAULT_ADDRESS,
} as const;

const LEGACY_HOTLINE_DIGITS = new Set(["0901438703", "0901438303"]);
const LEGACY_EMAILS = new Set(["hello@butphamarketing.com", "contact@butphamarketing.com"]);
const LEGACY_ADDRESSES = new Set([
  "123 Đường ABC, P. An Lạc, Q. Bình Tân, TP. HCM",
  "123 Đường ABC, TP. HCM",
  "Hồ Chí Minh, Việt Nam",
]);

export function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function resolveHotline(settingsHotline?: string | null) {
  const raw = settingsHotline?.trim();
  if (!raw) return DEFAULT_HOTLINE;

  const digits = normalizePhoneDigits(raw);
  if (LEGACY_HOTLINE_DIGITS.has(digits)) return DEFAULT_HOTLINE;

  return raw;
}

export function resolveEmail(settingsEmail?: string | null) {
  const raw = settingsEmail?.trim();
  if (!raw) return DEFAULT_EMAIL;
  if (LEGACY_EMAILS.has(raw.toLowerCase())) return DEFAULT_EMAIL;
  return raw;
}

export function resolveAddress(settingsAddress?: string | null) {
  const raw = settingsAddress?.trim();
  if (!raw) return DEFAULT_ADDRESS;
  if (LEGACY_ADDRESSES.has(raw)) return DEFAULT_ADDRESS;
  return raw;
}

export function resolveHotlineDigits(settingsHotline?: string | null) {
  return normalizePhoneDigits(resolveHotline(settingsHotline)) || DEFAULT_HOTLINE;
}

export function getTelHref(settingsHotline?: string | null) {
  return `tel:${resolveHotlineDigits(settingsHotline)}`;
}

export function getZaloUrl(settingsHotline?: string | null) {
  return `https://zalo.me/${resolveHotlineDigits(settingsHotline)}`;
}

export const BANGGIA_PUBLIC_PATH = "/banggia";

export function buildZaloPackageUrl(
  packageName: string,
  sectionLabel?: string,
  settingsHotline?: string | null,
) {
  const phone = resolveHotlineDigits(settingsHotline);
  const message = [
    "Xin chào Bứt Phá Marketing,",
    sectionLabel
      ? `Tôi quan tâm gói "${packageName}" (${sectionLabel}).`
      : `Tôi quan tâm gói "${packageName}".`,
    "Nhờ tư vấn chi tiết ạ.",
  ].join(" ");

  return `https://zalo.me/${phone}?msg=${encodeURIComponent(message)}`;
}

export function getMailtoHref(settingsEmail?: string | null) {
  return `mailto:${resolveEmail(settingsEmail)}`;
}

export function normalizeStoredHotline(settingsHotline?: string | null) {
  return resolveHotline(settingsHotline);
}

export function normalizeStoredEmail(settingsEmail?: string | null) {
  return resolveEmail(settingsEmail);
}

export function normalizeStoredAddress(settingsAddress?: string | null) {
  return resolveAddress(settingsAddress);
}
