"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, X } from "lucide-react";
import { isInternalAppPath } from "@/lib/app-paths";
import {
  PUSH_DENY_UNTIL_KEY,
  PUSH_DISMISS_SESSION_KEY,
  markPushPromptPending,
  markPushPromptSettled,
  markPushSubscribed,
} from "@/lib/marketing-popup-gate";

const DISMISS_SESSION_KEY = PUSH_DISMISS_SESSION_KEY;
const DENY_DISMISS_KEY = PUSH_DENY_UNTIL_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function canUseWebPush() {
  return typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator;
}

export function PushNotificationPrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [raised, setRaised] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || isInternalAppPath(pathname)) return;

    if (sessionStorage.getItem(DISMISS_SESSION_KEY)) return;

    const deniedUntil = Number(localStorage.getItem(DENY_DISMISS_KEY) || "0");
    if (deniedUntil > Date.now()) return;

    if (canUseWebPush()) {
      if (Notification.permission === "granted" || Notification.permission === "denied") return;
    }

    const showOnPaths = pathname === "/" || pathname.startsWith("/blog");
    if (!showOnPaths) return;

    const timer = window.setTimeout(() => {
      markPushPromptPending();
      setVisible(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateRaised = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setRaised(isMobile && window.scrollY > 300);
    };

    updateRaised();
    window.addEventListener("scroll", updateRaised, { passive: true });
    window.addEventListener("resize", updateRaised);
    return () => {
      window.removeEventListener("scroll", updateRaised);
      window.removeEventListener("resize", updateRaised);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const autoDismiss = window.setTimeout(() => dismissForSession(), 30000);
    return () => window.clearTimeout(autoDismiss);
  }, [visible]);

  const dismissForSession = () => {
    sessionStorage.setItem(DISMISS_SESSION_KEY, "1");
    markPushPromptSettled();
    setVisible(false);
  };

  const dismissAfterDeny = (days = 14) => {
    localStorage.setItem(DENY_DISMISS_KEY, String(Date.now() + days * 86400000));
    markPushPromptSettled();
    setVisible(false);
  };

  const subscribe = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (!canUseWebPush()) {
        setMessage("Trình duyệt này chưa hỗ trợ thông báo đẩy. Bạn có thể liên hệ qua Zalo hoặc hotline.");
        return;
      }

      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setMessage("Bạn đã từ chối thông báo. Có thể bật lại trong cài đặt trình duyệt.");
        dismissAfterDeny();
        return;
      }

      const vapidRes = await fetch("/api/push/vapid");
      const vapidData = await vapidRes.json();
      if (!vapidData.configured || !vapidData.publicKey) {
        setMessage("Thông báo đẩy chưa được cấu hình trên server.");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidData.publicKey),
        });
      }

      const json = subscription.toJSON();
      if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
        throw new Error("Subscription invalid");
      }

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: json.endpoint,
          keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Subscribe failed");
      }

      localStorage.removeItem(DENY_DISMISS_KEY);
      sessionStorage.removeItem(DISMISS_SESSION_KEY);
      markPushSubscribed();
      setMessage("Đã bật thông báo. Bạn sẽ nhận tin bài viết & ưu đãi mới.");
      setVisible(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể đăng ký thông báo");
    } finally {
      setLoading(false);
    }
  };

  if (!visible && !message) return null;

  return (
    <div
      className={`fixed left-4 right-4 z-[100] mx-auto max-w-md transition-all duration-300 md:left-auto md:right-6 ${
        raised ? "bottom-[5.75rem]" : "bottom-24"
      }`}
    >
      {visible && (
        <div className="rounded-2xl border border-white/15 bg-black p-4 shadow-xl shadow-black/40">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/10 p-2 text-white">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white leading-snug">
                Nhận thông báo ưu đãi & tin mới qua trình duyệt
              </p>
              <p className="mt-1 text-xs text-white/65 leading-snug">
                Bấm Cho phép — không cần nhập SĐT. Thông báo hiện góc màn hình như app.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={subscribe}
                  disabled={loading}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
                >
                  {loading ? "Đang bật..." : "Cho phép"}
                </button>
                <button
                  type="button"
                  onClick={dismissForSession}
                  className="rounded-xl border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Để sau
                </button>
              </div>
            </div>
            <button type="button" onClick={dismissForSession} className="text-white/60 hover:text-white" aria-label="Đóng">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      {message && (
        <div className="mt-2 rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white">
          {message}
        </div>
      )}
    </div>
  );
}
