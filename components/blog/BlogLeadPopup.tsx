"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { db } from "@/lib/useData";

const SESSION_DISMISS_KEY = "butpha_blog_lead_dismissed_session";
const SUBMITTED_KEY = "butpha_blog_lead_submitted_until";

function isValidVNPhone(value: string) {
  return /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/.test(value.trim());
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function BlogLeadPopup({ source }: { source: "blog-list" | "blog-article" }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    if (!pathname.startsWith("/blog")) return;
    if (sessionStorage.getItem(SESSION_DISMISS_KEY)) return;

    const submittedUntil = Number(localStorage.getItem(SUBMITTED_KEY) || "0");
    if (submittedUntil > Date.now()) return;

    const openPopup = () => setVisible(true);
    const timer = window.setTimeout(openPopup, 10000);

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) openPopup();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [pathname]);

  const dismissForSession = () => {
    sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    setVisible(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    const phone = form.phone.trim();
    const email = form.email.trim();
    const name = form.name.trim() || "Khách blog";

    if (!phone && !email) {
      setMessage("Vui lòng nhập số điện thoại hoặc email.");
      return;
    }
    if (phone && !isValidVNPhone(phone)) {
      setMessage("Số điện thoại chưa đúng định dạng Việt Nam.");
      return;
    }
    if (email && !isValidEmail(email)) {
      setMessage("Email chưa hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const result = await db.leads.add({
        type: "contact",
        name,
        phone: phone || email,
        platform: "blog",
        url: pathname,
        note: `Nguồn: Blog popup (${source}) | Email: ${email || "—"} | SĐT: ${phone || "—"} | Trang: ${pathname}`,
      });

      if (result.error) throw new Error(result.error);

      localStorage.setItem(SUBMITTED_KEY, String(Date.now() + 30 * 86400000));
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
      setVisible(false);
      setForm({ name: "", phone: "", email: "" });
    } catch {
      setMessage("Chưa gửi được. Bạn thử lại hoặc liên hệ trực tiếp qua Zalo.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 md:items-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">Nhận tư vấn miễn phí</p>
            <p className="mt-1 text-sm text-white/70">
              Để lại SĐT hoặc email, đội ngũ Bứt Phá Marketing sẽ liên hệ sớm nhất.
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
            placeholder="Họ tên (tuỳ chọn)"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Số điện thoại"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/30"
          />

          {message && <p className="text-sm text-red-300">{message}</p>}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Gửi thông tin"}
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
