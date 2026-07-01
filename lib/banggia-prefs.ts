import type { PricingPlatformId } from "@/lib/pricing-catalog";

export const BANGGIA_LAST_TAB_KEY = "butpha_banggia_last_tab";
export const BANGGIA_WELCOMED_SESSION_KEY = "butpha_banggia_welcomed_session";

const VALID_TABS: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

export function getBanggiaLastTab(): PricingPlatformId {
  if (typeof window === "undefined") return "website";
  const stored = localStorage.getItem(BANGGIA_LAST_TAB_KEY);
  if (stored && VALID_TABS.includes(stored as PricingPlatformId)) {
    return stored as PricingPlatformId;
  }
  return "website";
}

export function setBanggiaLastTab(tab: PricingPlatformId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BANGGIA_LAST_TAB_KEY, tab);
}

export function shouldShowBanggiaWelcomeBack(): boolean {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(BANGGIA_WELCOMED_SESSION_KEY);
}

export function markBanggiaWelcomeShown() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BANGGIA_WELCOMED_SESSION_KEY, "1");
}

export function formatBanggiaPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}
