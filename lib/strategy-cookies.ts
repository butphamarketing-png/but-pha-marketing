/** Client-side cookie helpers for strategy form persistence */

export const STRATEGY_DRAFT_COOKIE = "bpm_strategy_draft";
export const STRATEGY_CONTACT_COOKIE = "bpm_strategy_contact";
export const STRATEGY_REMEMBER_COOKIE = "bpm_strategy_remember";

export const STRATEGY_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days
const COOKIE_SIZE_SAFE = 3600;

export type CompactStrategyDraft = {
  v: 1;
  n: string;
  c: string;
  p: string;
  a: string;
  e: string;
  i: string;
  g: string;
  l: string;
  b: string;
  f: string;
  x: string[];
  s: number;
  t: string;
};

export type CompactStrategyContact = {
  v: 1;
  n: string;
  c: string;
  p: string;
  a: string;
  e: string;
};

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string, maxAge = STRATEGY_COOKIE_MAX_AGE) {
  if (typeof document === "undefined") return false;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const encoded = encodeURIComponent(value);
  if (encoded.length > COOKIE_SIZE_SAFE) return false;
  document.cookie = `${name}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
  return true;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function loadRememberPreference(): boolean {
  const raw = getCookie(STRATEGY_REMEMBER_COOKIE);
  if (raw === "0") return false;
  if (raw === "1") return true;
  return true;
}

export function saveRememberPreference(enabled: boolean) {
  setCookie(STRATEGY_REMEMBER_COOKIE, enabled ? "1" : "0", STRATEGY_COOKIE_MAX_AGE);
  if (!enabled) {
    deleteCookie(STRATEGY_DRAFT_COOKIE);
    deleteCookie(STRATEGY_CONTACT_COOKIE);
  }
}

export function readDraftFromCookie(): CompactStrategyDraft | null {
  const raw = getCookie(STRATEGY_DRAFT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CompactStrategyDraft;
    if (parsed?.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDraftToCookie(compact: CompactStrategyDraft): boolean {
  return setCookie(STRATEGY_DRAFT_COOKIE, JSON.stringify(compact));
}

export function readContactFromCookie(): CompactStrategyContact | null {
  const raw = getCookie(STRATEGY_CONTACT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CompactStrategyContact;
    if (parsed?.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeContactToCookie(contact: CompactStrategyContact): boolean {
  return setCookie(STRATEGY_CONTACT_COOKIE, JSON.stringify(contact));
}

export function clearStrategyCookies() {
  deleteCookie(STRATEGY_DRAFT_COOKIE);
  deleteCookie(STRATEGY_CONTACT_COOKIE);
}
