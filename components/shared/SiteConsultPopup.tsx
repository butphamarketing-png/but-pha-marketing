"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, X } from "lucide-react";
import { db } from "@/lib/useData";
import {
  isPushFlowSettled,
  SITE_CONSULT_DISMISS_SESSION_KEY,
  SITE_CONSULT_SUBMITTED_UNTIL_KEY,
  shouldSkipSiteConsultPopup,
} from "@/lib/marketing-popup-gate";

const SESSION_DISMISS_KEY = SITE_CONSULT_DISMISS_SESSION_KEY;
const SUBMITTED_KEY = SITE_CONSULT_SUBMITTED_UNTIL_KEY;

function isValidVNPhone(value: string) {
  return /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/.test(value.trim());
}

function shouldShowOnPath(pathname: string) {
  if (pathname.startsWith("/blog")) return false;
  if (pathname.startsWith("/lien-he")) return false;
  return true;
}

export function SiteConsultPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    consultTime: "",
    note: "",
  });

  useEffect(() => {
    if (!shouldShowOnPath(pathname)) return;
    if (shouldSkipSiteConsultPopup()) return;

    let cancelled = false;
    let openTimer: number | undefined;
    let pollTimer: number | undefined;

    const schedulePopup = () => {
      if (cancelled || shouldSkipSiteConsultPopup()) return;

      if (!isPushFlowSettled()) {
        pollTimer = window.setTimeout(schedulePopup, 1500);
        return;
      }

      openTimer = window.setTimeout(() => {
        if (!cancelled && !shouldSkipSiteConsultPopup()) setVisible(true);
      }, 6000);
    };

    schedulePopup();

    return () => {
      cancelled = true;
      if (openTimer) window.clearTimeout(openTimer);
      if (pollTimer) window.clearTimeout(pollTimer);
    };
  }, [pathname]);

  const dismissForSession = () => {
    sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    setVisible(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    const name = form.name.trim();
    const phone = form.phone.trim();
    const consultTime = form.consultTime.trim();
    const note = form.note.trim();

    if (!name) {
      setMessage("Vui lòng nhập họ và tên.");
      return;
    }
    if (!isValidVNPhone(phone)) {
      setMessage("Số điện thoại chưa đúng định dạng Việt Nam.");
      return;
    }
    if (!consultTime) {
      setMessage("Vui lòng chọn thời gian tư vấn.");
      return;
    }

    setLoading(true);
    try {
      const result = await db.leads.add({
        type: "contact",
        name,
        phone,
        service: "Hẹn tư vấn",
        platform: "site-popup",
        url: pathname,
        note: `Nguồn: Popup hẹn tư vấn | Thời gian: ${consultTime}${note ? ` | Ghi chú: ${note}` : ""} | Trang: ${pathname}`,
      });

      if (result.error) throw new Error(result.error);

      localStorage.setItem(SUBMITTED_KEY, String(Date.now() + 30 * 86400000));
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
      setVisible(false);
      setForm({ name: "", phone: "", consultTime: "", note: "" });
      window.dispatchEvent(
        new CustomEvent("mascot-alert", {
          detail: {
            message:
              "Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn đúng khung giờ bạn chọn.",
            durationMs: 7000,
          },
        }),
      );
    } catch {
      setMessage("Chưa gửi được. Bạn thử lại hoặc gọi hotline tư vấn.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center bg-black/55 p-4 pb-24 md:items-center md:pb-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">Đặt lịch tư vấn miễn phí</p>
            <p className="mt-1 text-sm text-white/70 leading-snug">
              Để lại thông tin, đội ngũ chuyên gia sẽ liên hệ đúng khung giờ bạn chọn.
            </p>
          </div>
          <button type="button" onClick={dismissForSession} className="text-white/60 hover:text-white" aria-label="Đóng">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Họ và tên *"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Số điện thoại *"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-white/55">
              <CalendarDays size={14} />
              Thời gian tư vấn mong muốn *
            </label>
            <input
              type="datetime-local"
              value={form.consultTime}
              onChange={(e) => setForm((prev) => ({ ...prev, consultTime: e.target.value }))}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30 [color-scheme:dark]"
            />
          </div>
          <textarea
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            placeholder="Nội dung cần tư vấn (tuỳ chọn)"
            rows={2}
            className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />

          {message && <p className="text-sm text-red-300">{message}</p>}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Xác nhận hẹn tư vấn"}
            </button>
            <button
              type="button"
              onClick={dismissForSession}
              className="rounded-xl border border-white/30 px-4 py-2.5 text-sm text-white hover:bg-white/10"
            >
              Để sau
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
