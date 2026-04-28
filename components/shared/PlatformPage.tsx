"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X, ShoppingCart, Check, CreditCard, Building2, Smartphone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubPageLayout } from "./SubPageLayout";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { FanpageAudit } from "./FanpageAudit";
import { AudioGuide } from "./AudioGuide";
import { CountUp } from "./CountUp";
import { db } from "@/lib/useData";
import { useAdmin } from "@/lib/AdminContext";
import { getContent, buildDefaultProcessTabs, type ContentOverride } from "@/lib/pageContent";

export interface PricingPackage {
  name: string;
  price: string;
  period?: "month" | "lifetime";
  popular?: boolean;
  features: string[];
  allFeatures: string[];
  audioText: string;
}

export interface PricingTab {
  label: string;
  packages: PricingPackage[];
}

export interface PlatformConfig {
  name: string;
  color: string;
  auditPlatform?: string;
  tabs: PricingTab[];
  stats: { label: string; value: string }[];
  process: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  vision: string;
  mission: string;
  responsibility: string;
}

const SERVICE_LINKS = [
  { href: "/facebook", label: "Facebook Marketing" },
  { href: "/tiktok", label: "TikTok Marketing" },
  { href: "/instagram", label: "Instagram Marketing" },
  { href: "/zalo", label: "Zalo Marketing" },
  { href: "/google-maps", label: "Google Maps Marketing" },
  { href: "/website", label: "Website Marketing" },
];

const DURATION_OPTIONS = [
  { months: 1, label: "1 tháng", discount: 0 },
  { months: 3, label: "3 tháng", discount: 5 },
  { months: 6, label: "6 tháng", discount: 10 },
  { months: 9, label: "9 tháng", discount: 15 },
  { months: 12, label: "12 tháng", discount: 20 },
];

const PAYMENT_METHODS = [
  { id: "bank", label: "Chuyển khoản ACB", icon: Building2, detail: "STK: 20030868 · Nguyễn Thành Long · ACB" },
  { id: "momo", label: "Ví Momo", icon: Smartphone, detail: "Quét mã QR Momo" },
  { id: "zalopay", label: "ZaloPay", icon: CreditCard, detail: "Quét mã QR ZaloPay" },
];

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/\./g, "").replace("đ", ""), 10) || 0;
}
function formatPrice(num: number): string {
  return num.toLocaleString("vi-VN") + "đ";
}

interface CheckoutPkg {
  name: string;
  price: string;
  color: string;
  tabLabel: string;
}

interface ParsedFeatureItem {
  title: string;
  details: string[];
}

function parseFeatureItem(raw: string): ParsedFeatureItem {
  const [titlePart, detailsPart] = raw.split("::");
  const title = (titlePart || "").trim();
  const details = detailsPart
    ? detailsPart
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean)
    : [];
  return { title, details };
}

function parseResponsibility(raw: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const intro: string[] = [];
  const bullets: string[] = [];
  lines.forEach((line) => {
    if (line.startsWith("- ") || line.startsWith("• ")) {
      bullets.push(line.replace(/^(-|•)\s+/, "").trim());
      return;
    }
    if (line.includes(":")) {
      bullets.push(line);
      return;
    }
    intro.push(line);
  });
  return { intro: intro.join("\n"), bullets };
}

function CheckoutModal({ pkg, platformKey, onClose }: { pkg: CheckoutPkg; platformKey: string; onClose: () => void }) {
  const [duration, setDuration] = useState(1);
  const [payMethod, setPayMethod] = useState("bank");
  const [step, setStep] = useState<"config" | "confirm" | "success">("config");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const base = parsePrice(pkg.price);
  const opt = DURATION_OPTIONS.find(o => o.months === duration)!;
  const total = Math.round(base * duration * (1 - opt.discount / 100));
  const saved = base * duration - total;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
        {step === "success" ? (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: `${pkg.color}20` }}>
              <Check className="h-10 w-10" style={{ color: pkg.color }} />
            </motion.div>
            <h3 className="mb-2 text-2xl font-black text-white">Đặt Hàng Thành Công!</h3>
            <p className="mb-6 text-gray-400 text-sm">Đội ngũ sẽ liên hệ trong vòng 30 phút để xác nhận và hướng dẫn thanh toán</p>
            <div className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-left space-y-1">
              <div className="flex justify-between"><span className="text-gray-400">Gói dịch vụ</span><span className="text-white font-medium">{pkg.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Thời hạn</span><span className="text-white">{opt.label}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Tổng tiền</span><span className="font-black" style={{ color: pkg.color }}>{formatPrice(total)}</span></div>
            </div>
            {payMethod === "bank" && (
              <div className="mb-5 w-full rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-left">
                <p className="font-bold text-yellow-400 mb-1">Thông tin chuyển khoản</p>
                <p className="text-white">Ngân hàng: <strong>ACB</strong></p>
                <p className="text-white">STK: <strong>20030868</strong></p>
                <p className="text-white">Chủ TK: <strong>Nguyễn Thành Long</strong></p>
                <p className="text-white">Nội dung: <strong>{name} - {pkg.name}</strong></p>
              </div>
            )}
            <button onClick={onClose} className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: pkg.color }}>Đóng</button>
          </div>
        ) : step === "confirm" ? (
          <div className="p-7">
            <div className="mb-5 flex items-center gap-3"><ShoppingCart className="h-6 w-6" style={{ color: pkg.color }} /><h3 className="text-xl font-black text-white">Xác Nhận Đặt Hàng</h3></div>
            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Gói dịch vụ</span><span className="text-white font-semibold">{pkg.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Thời hạn</span><span className="text-white">{opt.label}{opt.discount > 0 ? ` (Giảm ${opt.discount}%)` : ""}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-2"><span className="font-bold text-white">Tổng thanh toán</span><span className="text-lg font-black" style={{ color: pkg.color }}>{formatPrice(total)}</span></div>
              {saved > 0 && <p className="text-xs text-green-400">→ Tiết kiệm được {formatPrice(saved)}</p>}
            </div>
            <div className="mb-5">
              <p className="mb-2 text-sm font-semibold text-white">Phương thức thanh toán</p>
              <div className="space-y-2">
                {PAYMENT_METHODS.map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${payMethod === m.id ? "border-primary/50 bg-primary/10" : "border-white/10 hover:border-white/20"}`}>
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: payMethod === m.id ? `${pkg.color}20` : "rgba(255,255,255,0.05)" }}>
                      <m.icon size={16} style={{ color: payMethod === m.id ? pkg.color : "#9ca3af" }} />
                    </div>
                    <div><p className="text-sm font-medium text-white">{m.label}</p><p className="text-xs text-gray-500">{m.detail}</p></div>
                    {payMethod === m.id && <div className="ml-auto h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center" style={{ borderColor: pkg.color }}><div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pkg.color }} /></div>}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("config")} className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-medium text-gray-300 hover:bg-white/5">Quay lại</button>
              <button onClick={async () => { await db.orders.add({ name, phone, pkg: pkg.name, tabLabel: pkg.tabLabel, platform: platformKey, duration, total, payMethod }); setStep("success"); }} className="flex-1 rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: pkg.color }}>Xác Nhận Đặt Hàng</button>
            </div>
          </div>
        ) : (
          <div className="p-7">
            <div className="mb-5 flex items-center gap-3"><ShoppingCart className="h-6 w-6" style={{ color: pkg.color }} /><div><h3 className="text-xl font-black text-white">Đăng Ký Dịch Vụ</h3><p className="text-xs text-gray-400 mt-0.5">{pkg.tabLabel} · {pkg.name}</p></div></div>
            <div className="mb-5 space-y-3">
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Họ và tên *" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
              <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại *" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            </div>
            <div className="mb-5">
              <p className="mb-2 text-sm font-semibold text-white">Chọn thời hạn đăng ký</p>
              <div className="grid grid-cols-5 gap-2">
                {DURATION_OPTIONS.map(o => (
                  <button key={o.months} onClick={() => setDuration(o.months)} className={`relative flex flex-col items-center rounded-xl border py-2.5 text-center transition-all ${duration === o.months ? "border-primary/60 bg-primary/10" : "border-white/10 hover:border-white/25"}`}>
                    {o.discount > 0 && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: pkg.color }}>-{o.discount}%</span>}
                    <span className={`text-sm font-bold leading-tight ${duration === o.months ? "text-white" : "text-gray-400"}`}>{o.months}</span>
                    <span className="text-[10px] text-gray-500">tháng</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{pkg.price}/tháng × {duration} tháng{opt.discount > 0 ? ` − ${opt.discount}%` : ""}</p>
                  {saved > 0 && <p className="text-xs text-green-400 mt-0.5">Tiết kiệm {formatPrice(saved)}</p>}
                </div>
                <div className="text-right">
                  {saved > 0 && <p className="text-xs text-gray-500 line-through">{formatPrice(base * duration)}</p>}
                  <p className="text-xl font-black" style={{ color: pkg.color }}>{formatPrice(total)}</p>
                </div>
              </div>
            </div>
            <button onClick={() => { if (!name.trim() || !phone.trim()) { alert("Vui lòng điền đầy đủ họ tên và số điện thoại"); return; } setStep("confirm"); }} className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]" style={{ backgroundColor: pkg.color }}>
              Tiếp Tục Thanh Toán →
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ConsultationModal({ pkg, platformKey, onClose }: { pkg: CheckoutPkg; platformKey: string; onClose: () => void }) {
  const [duration, setDuration] = useState(1);
  const [step, setStep] = useState<"config" | "success">("config");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const base = parsePrice(pkg.price);
  const opt = DURATION_OPTIONS.find((option) => option.months === duration)!;
  const total = Math.round(base * duration * (1 - opt.discount / 100));
  const saved = base * duration - total;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Vui lòng điền đầy đủ họ và tên và số điện thoại.");
      return;
    }

    setSubmitting(true);
    setError("");

    const result = await db.leads.add({
      type: "contact",
      name: name.trim(),
      phone: phone.trim(),
      service: pkg.name,
      note: [
        `Nhu cau: ${pkg.tabLabel} - ${pkg.name}`,
        `Thoi han quan tam: ${opt.label}`,
        `Chi phi tham khao: ${formatPrice(total)}`,
        note.trim() ? `Ghi chu: ${note.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      platform: platformKey,
      url: typeof window !== "undefined" ? window.location.pathname : undefined,
    });

    setSubmitting(false);

    if (result.error) {
      setError("Không gửi được yêu cầu tư vấn lúc này. Vui lòng thử lại sau.");
      return;
    }

    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
        {step === "success" ? (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${pkg.color}20` }}
            >
              <Check className="h-10 w-10" style={{ color: pkg.color }} />
            </motion.div>
            <h3 className="mb-2 text-2xl font-black text-white">Đã gửi yêu cầu tư vấn!</h3>
            <p className="mb-6 text-sm text-gray-400">
              Đội ngũ sẽ liên hệ với bạn trong vòng 30 phút để tư vấn gói phù hợp và báo giá chi tiết.
            </p>
            <div className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm space-y-1">
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">Dịch vụ quan tâm</span>
                <span className="text-right font-medium text-white">{pkg.tabLabel} · {pkg.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nhu cầu triển khai</span>
                <span className="text-white">{opt.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chi phí tham khảo</span>
                <span className="font-black" style={{ color: pkg.color }}>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: pkg.color }}
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="p-7">
            <div className="mb-5 flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" style={{ color: pkg.color }} />
              <div>
                <h3 className="text-xl font-black text-white">Đăng ký tư vấn dịch vụ</h3>
                <p className="mt-0.5 text-xs text-gray-400">{pkg.tabLabel} · {pkg.name}</p>
              </div>
            </div>
            <div className="mb-5 space-y-3">
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Họ và tên *"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Số điện thoại *"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Mô tả ngắn nhu cầu của bạn (không bắt buộc)"
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none resize-none focus:border-primary"
              />
            </div>
            <div className="mb-5">
              <p className="mb-2 text-sm font-semibold text-white">Chọn nhu cầu triển khai</p>
              <div className="grid grid-cols-5 gap-2">
                {DURATION_OPTIONS.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setDuration(option.months)}
                    className={`relative flex flex-col items-center rounded-xl border py-2.5 text-center transition-all ${
                      duration === option.months ? "border-primary/60 bg-primary/10" : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    {option.discount > 0 && (
                      <span
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: pkg.color }}
                      >
                        -{option.discount}%
                      </span>
                    )}
                    <span className={`text-sm font-bold leading-tight ${duration === option.months ? "text-white" : "text-gray-400"}`}>
                      {option.months}
                    </span>
                    <span className="text-[10px] text-gray-500">tháng</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    {pkg.price}/tháng x {duration} tháng{opt.discount > 0 ? ` - ${opt.discount}%` : ""}
                  </p>
                  {saved > 0 && <p className="mt-0.5 text-xs text-green-400">Tiết kiệm {formatPrice(saved)}</p>}
                  <p className="mt-0.5 text-xs text-gray-400">Chi phí này chỉ để đội ngũ tư vấn nhanh hơn cho bạn.</p>
                </div>
                <div className="text-right">
                  {saved > 0 && <p className="text-xs text-gray-500 line-through">{formatPrice(base * duration)}</p>}
                  <p className="text-xl font-black" style={{ color: pkg.color }}>{formatPrice(total)}</p>
                </div>
              </div>
            </div>
            {error && <p className="mb-4 text-sm font-medium text-red-400">{error}</p>}
            <button
              onClick={() => void handleSubmit()}
              disabled={submitting}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              style={{ backgroundColor: pkg.color }}
            >
              {submitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn →"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Slideshow({ color, platformKey }: { color: string; platformKey: string }) {
  const { settings } = useAdmin();
  const [current, setCurrent] = useState(0);
  const platformMedia = settings?.media?.[platformKey] ?? { slideshow: [], cases: [], videoUrl: "" };
  const customSlides = platformMedia.slideshow || [];
  
  const slides = customSlides.map(url => ({ title: "", sub: "", url }));

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      data-section="slideshow"
      id="slideshow"
      className="relative aspect-[16/11] min-h-[250px] overflow-hidden sm:aspect-[16/9] sm:min-h-[340px] md:min-h-[420px]"
    >
      {slides.map((slide, i) => (
        <div 
          key={i} 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700" 
          style={{ 
            opacity: current === i ? 1 : 0, 
            background: slide.url ? `url(${slide.url}) center/cover no-repeat` : `linear-gradient(135deg, ${color}40 0%, #1a0533 50%, ${color}30 100%)` 
          }}
        >
          {slide.url && <div className="absolute inset-0 bg-black/40" />}
          <div className="relative z-10">
            {slide.title && <motion.h1 key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-4xl font-black text-white md:text-6xl">{slide.title}</motion.h1>}
            {slide.sub && <p className="max-w-xl text-lg text-gray-300">{slide.sub}</p>}
          </div>
        </div>
      ))}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white hover:bg-black/50 sm:left-4 sm:h-10 sm:w-10"
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrent(p => (p + 1) % slides.length)}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white hover:bg-black/50 sm:right-4 sm:h-10 sm:w-10"
            type="button"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all"
                style={{ width: current === i ? "24px" : "8px", backgroundColor: current === i ? color : "rgba(255,255,255,0.4)" }}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Accordion({
  title,
  content,
  open,
  onToggle,
  asBullets = false,
}: {
  title: string;
  content: string;
  open: boolean;
  onToggle: () => void;
  asBullets?: boolean;
}) {
  const parsedResponsibility = asBullets ? parseResponsibility(content) : null;
  return (
    <div className="border-b border-white/10">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-4 text-left font-semibold text-white hover:text-gray-300">
        {title}<ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !asBullets && <p className="whitespace-pre-line pb-4 text-sm leading-relaxed text-gray-400">{content}</p>}
      {open && asBullets && parsedResponsibility && (
        <div className="space-y-3 pb-4 text-sm text-gray-400">
          {parsedResponsibility.intro && <p className="whitespace-pre-line leading-relaxed">{parsedResponsibility.intro}</p>}
          {parsedResponsibility.bullets.length > 0 && (
            <ul className="list-disc space-y-1 pl-5 leading-relaxed">
              {parsedResponsibility.bullets.map((item, idx) => (
                <li key={`resp-bullet-${idx}`}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Stats({ stats, color }: { stats: { label: string; value: string }[]; color: string }) {
  return (
    <section data-section="stats" id="stats" className="py-16 px-4">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/10 bg-card p-6 text-center">
            <CountUp value={s.value} color={color} />
            <p className="mt-1 text-sm text-gray-400">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ tabs, color, onCheckout }: { tabs: PricingTab[]; color: string; onCheckout: (pkg: CheckoutPkg) => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const tab = tabs[activeTab];
  const showPager = tab.packages.length > 3;
  const pageSize = 3;
  const maxPage = Math.max(0, Math.ceil(tab.packages.length / pageSize) - 1);
  const start = page * pageSize;
  const visiblePackages = showPager ? tab.packages.slice(start, start + pageSize) : tab.packages;

  return (
    <section data-section="pricing" id="pricing" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">Bảng Giá Dịch Vụ</h2>
        <p className="mb-10 text-center text-gray-400">Đa dạng lựa chọn phù hợp với mọi nhu cầu</p>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setHoveredIdx(null); setPage(0); }} className="rounded-full px-5 py-2 text-sm font-semibold transition-all" style={activeTab === i ? { backgroundColor: color, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.07)", color: "#ccc" }}>
              {t.label}
            </button>
          ))}
        </div>
        {showPager && (
          <div className="mb-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Lướt trái"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-gray-400">Trang {page + 1}/{maxPage + 1}</span>
            <button
              onClick={() => setPage(prev => Math.min(maxPage, prev + 1))}
              disabled={page === maxPage}
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Lướt phải"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {visiblePackages.map((pkg, i) => {
            const originalIndex = showPager ? start + i : i;
            const isHovered = hoveredIdx === i;
            const isPopular = !!pkg.popular;
            return (
              <motion.div key={`${activeTab}-${originalIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="relative flex flex-col rounded-2xl border p-6 cursor-pointer" style={{ borderColor: isHovered || isPopular ? color : "rgba(255,255,255,0.1)", backgroundColor: isHovered ? `${color}15` : isPopular ? "rgba(109,40,217,0.12)" : "var(--card)", boxShadow: isHovered ? `0 0 30px ${color}30, 0 8px 32px rgba(0,0,0,0.4)` : isPopular ? "0 8px 32px rgba(109,40,217,0.2)" : "none", transform: isHovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.2s ease" }}>
                {isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: color }}>Phổ biến nhất</span>}
                <h3 className="mb-2 text-lg font-bold text-white">{pkg.name}</h3>
                <p className="mb-1 text-3xl font-black" style={{ color }}>{pkg.price}</p>
                <p className="mb-4 text-xs text-gray-500">{pkg.period === "lifetime" ? "/vĩnh viễn" : "/tháng"}</p>
                <ul className="mb-6 flex-1 space-y-2">
                  {(pkg.allFeatures?.length ? pkg.allFeatures : pkg.features).map((rawFeature, fi) => {
                    const parsed = parseFeatureItem(rawFeature);
                    if (!parsed.title) return null;
                    const featureKey = `${activeTab}-${originalIndex}-${fi}`;
                    const isExpanded = expandedFeature === featureKey;
                    return (
                      <li key={featureKey} className="rounded-lg border border-white/10 bg-black/15 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => setExpandedFeature(isExpanded ? null : featureKey)}
                          className="flex w-full items-start justify-between gap-3 text-left text-sm text-gray-200"
                        >
                          <span className="flex items-start gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{parsed.title}</span>
                          </span>
                          {parsed.details.length > 0 && (
                            <ChevronDown size={16} className={`mt-0.5 flex-shrink-0 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          )}
                        </button>
                        {isExpanded && parsed.details.length > 0 && (
                          <ul className="mt-2 list-disc space-y-1 pl-8 text-xs text-gray-400">
                            {parsed.details.map((detail, detailIdx) => (
                              <li key={`${featureKey}-detail-${detailIdx}`}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <AudioGuide text={pkg.audioText} color={color} />
                <button onClick={() => onCheckout({ name: pkg.name, price: pkg.price, color, tabLabel: tab.label })} className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-white transition-all" style={{ backgroundColor: isHovered ? color : isPopular ? color : "rgba(255,255,255,0.1)", transform: isHovered ? "scale(1.02)" : "scale(1)" }}>
                  Nhận Tư Vấn Ngay
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function ProcessSection({ processTabs, color }: { processTabs: { label: string; steps: { step: number; title: string; desc: string }[] }[]; color: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const tab = processTabs[activeTab];
  return (
    <section data-section="process" id="process" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-black text-white md:text-4xl">Quy Trình Triển Khai</h2>
        {processTabs.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {processTabs.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className="rounded-full px-4 py-2 text-sm font-medium transition-all" style={activeTab === i ? { backgroundColor: color, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.07)", color: "#ccc" }}>
                {t.label}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-4 md:grid-cols-2">
            {tab.steps.map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-card/80 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: color }}>{p.step}</div>
                  <h4 className="font-bold text-white">{p.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left font-semibold text-white hover:text-gray-300">
        {q}<ChevronDown size={18} className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm text-gray-400 leading-relaxed">{a}</p>}
    </div>
  );
}

function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section data-section="faq" id="faq" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-black text-white md:text-4xl">Câu Hỏi Thường Gặp</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-card px-6 shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>
      </motion.div>
    </section>
  );
}

function ContactForm({ color }: { color: string }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  return (
    <section data-section="contact" id="contact" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-xl">
        <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">Liên Hệ Tư Vấn</h2>
        <p className="mb-10 text-center text-gray-400">Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7</p>
        {sent ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center">
            <p className="text-3xl mb-3">✓</p>
            <p className="text-lg font-bold text-white">Đã nhận thông tin!</p>
            <p className="text-sm text-gray-400 mt-2">Chúng tôi sẽ liên hệ trong vòng 30 phút</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); db.leads.add({ type: "contact", name, phone, service, note }); setSent(true); }} className="rounded-2xl border border-white/10 bg-card p-8 space-y-4">
            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Họ và tên" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary" />
            <select value={service} onChange={e => setService(e.target.value)} className="w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-sm text-gray-400 outline-none">
              <option value="">Dịch vụ quan tâm</option><option>Xây dựng trang/kênh</option><option>Chăm sóc nội dung</option><option>Quảng cáo</option>
            </select>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ghi chú thêm..." rows={4} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none resize-none" />
            <button type="submit" className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: color }}>Gửi Yêu Cầu Tư Vấn</button>
          </form>
        )}
      </motion.div>
    </section>
  );
}

export function PlatformPage({ config }: { config: PlatformConfig }) {
  const { settings } = useAdmin();
  const pathname = usePathname() || "/";
  const [checkoutPkg, setCheckoutPkg] = useState<CheckoutPkg | null>(null);
  const [content, setContent] = useState(config);
  const [openIntro, setOpenIntro] = useState<"vision" | "mission" | "responsibility">("vision");
  const [loadedOverride, setLoadedOverride] = useState<ContentOverride | null>(null);

  const platformKey = (config.auditPlatform || config.name).toLowerCase();
  const platformCms = settings?.cms?.[platformKey] ?? { packages: {} };
  const platformMedia = settings?.media?.[platformKey] ?? { slideshow: [], cases: [], videoUrl: "" };
  const platformColor = settings?.colors?.[platformKey] || config.color;
  const visibility = settings?.visibility ?? {};

  useEffect(() => {
    const loadOverride = async () => {
      const override = await getContent(platformKey);
      if (!override) return;
      setLoadedOverride(override);
      setContent(prev => ({
        ...prev,
        vision: override?.vision || prev.vision,
        mission: override?.mission || prev.mission,
        responsibility: override?.responsibility || prev.responsibility,
        tabs: override?.tabs || prev.tabs,
        stats: override?.stats || prev.stats,
        faqs: override?.faqs || prev.faqs,
      }));
    };
    loadOverride();
  }, [platformKey]);

  // Update tabs packages with dynamic audio, price, and features if available
  const updatedTabs = content.tabs.map(tab => ({
    ...tab,
    packages: tab.packages.map((pkg, idx) => {
      const pkgName = `Gói ${idx + 1}`;
      const override = platformCms.packages?.[pkgName];
      return {
        ...pkg,
        price: override?.price || pkg.price,
        features: override?.features && override.features.length > 0 && override.features[0] !== "" ? override.features : pkg.features,
        allFeatures: override?.allFeatures && override.allFeatures.length > 0 ? override.allFeatures : (pkg.allFeatures || pkg.features),
        audioText: override?.audio || pkg.audioText
      };
    })
  }));
  const tabsForRender = loadedOverride?.tabs || updatedTabs;
  const processTabs = loadedOverride?.processTabs ?? buildDefaultProcessTabs(tabsForRender.map((t: { label: string }) => t.label));
  const cases = platformMedia.cases || [];
  const beforeAfterBefore = loadedOverride?.beforeAfterBefore;
  const beforeAfterAfter = loadedOverride?.beforeAfterAfter;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
  const canonicalUrl = `${baseUrl}${pathname}`;
  const serviceTitle = `Dịch vụ ${content.name} Marketing`;
  const heroTitle = content.name === "Website" ? "Dịch vụ Website Marketing" : serviceTitle;
  const serviceLinks = SERVICE_LINKS.filter((item) => item.href !== pathname).slice(0, 3);
  const offerItems = tabsForRender.flatMap((tab) =>
    tab.packages.map((pkg) => ({
      "@type": "Offer",
      name: `${tab.label} - ${pkg.name}`,
      price: parsePrice(pkg.price),
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      description: pkg.features.join(", "),
    })),
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: baseUrl },
          { "@type": "ListItem", position: 2, name: heroTitle, item: canonicalUrl },
        ],
      },
      {
        "@type": "Service",
        name: heroTitle,
        serviceType: content.name,
        description: content.mission,
        url: canonicalUrl,
        provider: {
          "@type": "Organization",
          name: "Bứt Phá Marketing",
          url: baseUrl,
          logo: `${baseUrl}/logo.jpg`,
        },
        areaServed: {
          "@type": "Country",
          name: "Vietnam",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Bảng giá ${heroTitle}`,
          itemListElement: offerItems,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  const handleCheckout = (pkg: CheckoutPkg) => setCheckoutPkg(pkg);

  return (
    <SubPageLayout platformName={content.name} primaryColor={platformColor}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Slideshow color={platformColor} platformKey={platformKey} />

      <section className="border-b border-white/10 bg-black/20 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Trang chủ</Link></li>
              <li>/</li>
              <li className="text-white">{heroTitle}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl font-black text-white md:text-5xl">{heroTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300 md:text-lg">{content.mission}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: platformColor }}>
                Xem bảng giá
              </a>
              <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white">
                Nhận tư vấn
              </a>
              <a href="#faq" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white">
                Câu hỏi thường gặp
              </a>
            </div>
          </div>
        </div>
      </section>

      {visibility.intro !== false && (
        <section data-section="intro" id="intro" className="py-20 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-black text-white md:text-4xl">Giới Thiệu Về Dịch Vụ {content.name}</h2>
            <div className="rounded-2xl border border-white/10 bg-card divide-y divide-white/10 px-6">
              <Accordion
                title="Tầm Nhìn"
                content={content.vision}
                open={openIntro === "vision"}
                onToggle={() => setOpenIntro("vision")}
              />
              <Accordion
                title="Sứ Mệnh"
                content={content.mission}
                open={openIntro === "mission"}
                onToggle={() => setOpenIntro("mission")}
              />
              <Accordion
                title="Trách Nhiệm"
                content={content.responsibility}
                open={openIntro === "responsibility"}
                onToggle={() => setOpenIntro("responsibility")}
                asBullets
              />
            </div>
          </motion.div>
        </section>
      )}

      {visibility.audit !== false && (
        <FanpageAudit
          primaryColor={platformColor}
          platform={content.auditPlatform ?? "facebook"}
        />
      )}

      {visibility.pricing !== false && (
        <PricingSection tabs={tabsForRender} color={platformColor} onCheckout={handleCheckout} />
      )}

      <BeforeAfterSlider cases={cases} beforeImage={beforeAfterBefore} afterImage={beforeAfterAfter} />
      
      {visibility.stats !== false && (
        <Stats stats={content.stats} color={platformColor} />
      )}
      
      <ProcessSection processTabs={processTabs} color={platformColor} />
      <FAQSection faqs={content.faqs} />

      <ContactForm color={platformColor} />

      <AnimatePresence>
      {checkoutPkg && <ConsultationModal pkg={checkoutPkg} platformKey={platformKey} onClose={() => setCheckoutPkg(null)} />}
      </AnimatePresence>

    </SubPageLayout>
  );
}

