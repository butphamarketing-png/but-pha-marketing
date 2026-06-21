/** Kiểm tra trình duyệt có hỗ trợ Web Push thực sự hay không. */
export function canUseWebPush() {
  if (typeof window === "undefined") return false;
  if (!window.isSecureContext) return false;
  if (!("Notification" in window)) return false;
  if (!("serviceWorker" in navigator)) return false;
  if (!("PushManager" in window)) return false;

  const ua = navigator.userAgent || "";
  // Trình duyệt nhúng (Facebook, Zalo, Instagram…) thường không hỗ trợ push.
  if (/FBAN|FBAV|Instagram|Line\/|Zalo|MicroMessenger|Twitter/i.test(ua)) return false;

  return true;
}
