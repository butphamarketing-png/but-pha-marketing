export const DEFAULT_HOTLINE = "0937417982";

const LEGACY_HOTLINE_DIGITS = new Set(["0901438703", "0901438303"]);

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

export function resolveHotlineDigits(settingsHotline?: string | null) {
  return normalizePhoneDigits(resolveHotline(settingsHotline)) || DEFAULT_HOTLINE;
}

export function getTelHref(settingsHotline?: string | null) {
  return `tel:${resolveHotlineDigits(settingsHotline)}`;
}

export function getZaloUrl(settingsHotline?: string | null) {
  return `https://zalo.me/${resolveHotlineDigits(settingsHotline)}`;
}

export function normalizeStoredHotline(settingsHotline?: string | null) {
  return resolveHotline(settingsHotline);
}
