/** Điều phối popup marketing: ưu tiên thông báo đẩy, tránh chồng form thu lead. */

import { getBanggiaProfile, saveBanggiaProfile } from "@/lib/banggia-prefs";

export const PUSH_PENDING_KEY = "butpha_push_prompt_pending";
export const PUSH_SUBSCRIBED_KEY = "butpha_push_subscribed";
export const PUSH_DISMISS_SESSION_KEY = "butpha_push_prompt_dismissed_session";
export const PUSH_DENY_UNTIL_KEY = "butpha_push_prompt_dismissed_until";
/** Trang chủ đã qua loading logo — dùng để mở prompt push ngay sau đó. */
export const HOME_READY_KEY = "butpha_home_ready";
export const HOME_READY_EVENT = "butpha-home-ready";

export function markHomeReady() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HOME_READY_KEY, "1");
  window.dispatchEvent(new CustomEvent(HOME_READY_EVENT));
}

export function isHomeReady() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(HOME_READY_KEY) === "1";
}

export const BLOG_LEAD_DISMISS_SESSION_KEY = "butpha_blog_lead_dismissed_session";
export const BLOG_LEAD_SUBMITTED_UNTIL_KEY = "butpha_blog_lead_submitted_until";
export const SITE_CONSULT_DISMISS_SESSION_KEY = "butpha_site_consult_dismissed_session";
export const SITE_CONSULT_SUBMITTED_UNTIL_KEY = "butpha_site_consult_submitted_until";
export const BANGGIA_UNLOCKED_UNTIL_KEY = "butpha_banggia_unlocked_until";

const TEN_YEARS_MS = 10 * 365 * 24 * 60 * 60 * 1000;

export function markPushPromptPending() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PUSH_PENDING_KEY, "1");
}

export function markPushPromptSettled() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PUSH_PENDING_KEY);
}

export function markPushSubscribed() {
  if (typeof window === "undefined") return;
  localStorage.setItem(PUSH_SUBSCRIBED_KEY, "1");
  markPushPromptSettled();
}

export function hasPushSubscription() {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(PUSH_SUBSCRIBED_KEY) === "1") return true;
  return typeof Notification !== "undefined" && Notification.permission === "granted";
}

export function isPushPromptPending() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PUSH_PENDING_KEY) === "1";
}

/** Push đã xử lý xong (bật / từ chối / đóng) — có thể hiện popup khác. */
export function isPushFlowSettled(): boolean {
  if (typeof window === "undefined") return true;
  if (hasPushSubscription()) return true;
  if (typeof Notification !== "undefined" && Notification.permission === "denied") return true;
  if (sessionStorage.getItem(PUSH_DISMISS_SESSION_KEY)) return true;
  const deniedUntil = Number(localStorage.getItem(PUSH_DENY_UNTIL_KEY) || "0");
  if (deniedUntil > Date.now()) return true;
  if (!isPushPromptPending()) return true;
  return false;
}

export function shouldSkipBlogLeadPopup(): boolean {
  if (typeof window === "undefined") return true;
  if (sessionStorage.getItem(BLOG_LEAD_DISMISS_SESSION_KEY)) return true;
  const submittedUntil = Number(localStorage.getItem(BLOG_LEAD_SUBMITTED_UNTIL_KEY) || "0");
  if (submittedUntil > Date.now()) return true;
  if (hasPushSubscription()) return true;
  return false;
}

export function shouldSkipSiteConsultPopup(): boolean {
  if (typeof window === "undefined") return true;
  if (sessionStorage.getItem(SITE_CONSULT_DISMISS_SESSION_KEY)) return true;
  const submittedUntil = Number(localStorage.getItem(SITE_CONSULT_SUBMITTED_UNTIL_KEY) || "0");
  if (submittedUntil > Date.now()) return true;
  return false;
}

/** Đã mở bảng giá trên thiết bị này (đã lưu họ tên + SĐT). */
export function isBanggiaUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  if (getBanggiaProfile()) return true;
  const unlockedUntil = Number(localStorage.getItem(BANGGIA_UNLOCKED_UNTIL_KEY) || "0");
  return unlockedUntil > Date.now();
}

export function markBanggiaUnlocked(profile?: { name: string; phone: string }) {
  if (typeof window === "undefined") return;
  if (profile?.name && profile?.phone) {
    saveBanggiaProfile(profile.name, profile.phone);
  }
  localStorage.setItem(BANGGIA_UNLOCKED_UNTIL_KEY, String(Date.now() + TEN_YEARS_MS));
}
