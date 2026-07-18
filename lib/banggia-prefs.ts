import type { PricingPlatformId } from "@/lib/pricing-catalog";

export const BANGGIA_LAST_TAB_KEY = "butpha_banggia_last_tab";
export const BANGGIA_WELCOMED_SESSION_KEY = "butpha_banggia_welcomed_session";
/** Hồ sơ đã mở bảng giá — nhớ trên thiết bị để lần sau không nhập lại */
export const BANGGIA_PROFILE_KEY = "butpha_banggia_profile";

const VALID_TABS: PricingPlatformId[] = ["website", "facebook", "googlemaps"];

export type BanggiaProfile = {
  name: string;
  phone: string;
  savedAt: string;
};

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

export function getBanggiaProfile(): BanggiaProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BANGGIA_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BanggiaProfile;
    if (
      typeof parsed?.name === "string" &&
      parsed.name.trim() &&
      typeof parsed?.phone === "string" &&
      parsed.phone.trim()
    ) {
      return {
        name: parsed.name.trim(),
        phone: parsed.phone.trim(),
        savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : new Date().toISOString(),
      };
    }
  } catch {
    // no-op
  }
  return null;
}

export function saveBanggiaProfile(name: string, phone: string): BanggiaProfile {
  const profile: BanggiaProfile = {
    name: name.trim(),
    phone: phone.trim(),
    savedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(BANGGIA_PROFILE_KEY, JSON.stringify(profile));
  }
  return profile;
}

export function formatBanggiaPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}
