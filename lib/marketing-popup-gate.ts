/** Điều phối popup marketing: ưu tiên thông báo đẩy, tránh chồng form thu lead. */

export const PUSH_PENDING_KEY = "butpha_push_prompt_pending";
export const PUSH_SUBSCRIBED_KEY = "butpha_push_subscribed";
export const PUSH_DISMISS_SESSION_KEY = "butpha_push_prompt_dismissed_session";
export const PUSH_DENY_UNTIL_KEY = "butpha_push_prompt_dismissed_until";
export const BLOG_LEAD_DISMISS_SESSION_KEY = "butpha_blog_lead_dismissed_session";
export const BLOG_LEAD_SUBMITTED_UNTIL_KEY = "butpha_blog_lead_submitted_until";

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
