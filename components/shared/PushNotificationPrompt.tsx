"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, X } from "lucide-react";
import { isInternalAppPath } from "@/lib/app-paths";

const DISMISS_KEY = "butpha_push_prompt_dismissed_until";

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

export function PushNotificationPrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || isInternalAppPath(pathname)) return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;

    const dismissedUntil = Number(localStorage.getItem(DISMISS_KEY) || "0");
    if (dismissedUntil > Date.now()) return;

    if (Notification.permission === "granted" || Notification.permission === "denied") return;

    const showOnPaths = pathname === "/" || pathname.startsWith("/blog");
    if (!showOnPaths) return;

    const timer = window.setTimeout(() => setVisible(true), 4000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const dismiss = (days = 7) => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + days * 86400000));
    setVisible(false);
  };

  const subscribe = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setMessage("Bạn đã từ chối thông báo. Có thể bật lại trong cài đặt trình duyệt.");
        dismiss(14);
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

      localStorage.removeItem(DISMISS_KEY);
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
    <div className="fixed bottom-24 left-4 right-4 z-[60] mx-auto max-w-md md:left-auto md:right-6">
      {visible && (
        <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-xl shadow-violet-200/40">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-violet-100 p-2 text-violet-700">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-indigo-950">Nhận thông báo tin mới</p>
              <p className="mt-1 text-sm text-slate-600">
                Cập nhật bài viết marketing, tips SEO và ưu đãi dịch vụ website từ Bứt Phá Marketing.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={subscribe}
                  disabled={loading}
                  className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
                >
                  {loading ? "Đang bật..." : "Cho phép thông báo"}
                </button>
                <button
                  type="button"
                  onClick={() => dismiss()}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Để sau
                </button>
              </div>
            </div>
            <button type="button" onClick={() => dismiss()} className="text-slate-400 hover:text-slate-600" aria-label="Đóng">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      {message && (
        <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </div>
      )}
    </div>
  );
}
