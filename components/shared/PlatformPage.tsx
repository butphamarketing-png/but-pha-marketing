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
  
  const slides = [
    { title: "Bứt Phá Doanh Số", sub: "Tăng trưởng vượt bậc với chiến lược Marketing tối ưu", url: "/slideshow.jpg" },
    { title: "Xây Dựng Thương Hiệu", sub: "Định vị thương hiệu mạnh mẽ trong tâm trí khách hàng", url: "/slideshow1.jpg" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      data-section="slideshow"
      id="slideshow"
      className="relative aspect-[16/11] min-h-[400px] overflow-hidden sm:aspect-[16/9] sm:min-h-[450px] md:min-h-[550px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-[10000ms] scale-110"
            style={{ 
              backgroundImage: slides[current].url ? `url(${slides[current].url})` : "none",
              background: !slides[current].url ? `linear-gradient(135deg, ${color}40 0%, #0a041a 50%, ${color}20 100%)` : undefined,
              transform: "scale(1.1)",
              animation: "kenburns 20s infinite alternate"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a041a]" />
          
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-md md:p-12"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mx-auto mb-6 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
                {slides[current].title || (platformKey === "website" ? "Thiết Kế Website" : platformKey === "facebook" ? "Facebook Marketing" : "Marketing Toàn Diện")}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl opacity-90">
                {slides[current].sub || "Giải pháp đột phá giúp doanh nghiệp tiếp cận hàng triệu khách hàng mục tiêu và tối ưu chuyển đổi."}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full px-8 py-4 text-sm font-black text-white transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: color }}
                >
                  Xem Bảng Giá Ngay
                </button>
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Tư Vấn Miễn Phí
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
            className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:border-white/30 hidden md:flex"
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent(p => (p + 1) % slides.length)}
            className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:border-white/30 hidden md:flex"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ 
                  width: current === i ? "40px" : "12px", 
                  backgroundColor: current === i ? color : "rgba(255,255,255,0.3)" 
                }}
                type="button"
              />
            ))}
          </div>
        </>
      )}
      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1.1) translate(0, 0); }
          100% { transform: scale(1.2) translate(-1%, -1%); }
        }
      `}</style>
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
    <section data-section="stats" id="stats" className="relative py-24 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[120px]" style={{ backgroundColor: color }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[120px]" style={{ backgroundColor: color }} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity group-hover:opacity-100" 
              style={{ background: `radial-gradient(600px circle at center, ${color}20, transparent 40%)` }} 
            />
            
            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center">
                <CountUp value={s.value} color={color} className="text-4xl font-black md:text-5xl" />
              </div>
              <div className="h-1 w-8 mx-auto mb-4 rounded-full opacity-50" style={{ backgroundColor: color }} />
              <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-200 transition-colors">
                {s.label}
              </p>
            </div>
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
  const pageSize = 4;
  const maxPage = Math.max(0, Math.ceil(tab.packages.length / pageSize) - 1);
  const start = page * pageSize;
  const visiblePackages = showPager ? tab.packages.slice(start, start + pageSize) : tab.packages;

  return (
    <section data-section="pricing" id="pricing" className="py-24 px-4 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-400"
          >
            Bảng Giá Dịch Vụ
          </motion.span>
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl lg:text-6xl">
            Lựa Chọn <span style={{ color }}>Tối Ưu</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Chúng tôi cung cấp các gói dịch vụ linh hoạt, minh bạch và cam kết hiệu quả tối đa cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {tabs.map((t, i) => (
            <button 
              key={i} 
              onClick={() => { setActiveTab(i); setHoveredIdx(null); setPage(0); }} 
              className="relative overflow-hidden rounded-2xl px-8 py-3 text-sm font-black transition-all" 
              style={activeTab === i 
                ? { backgroundColor: color, color: "#fff", boxShadow: `0 10px 20px ${color}30` } 
                : { backgroundColor: "rgba(255,255,255,0.05)", color: "#999" }
              }
            >
              {t.label}
              {activeTab === i && (
                <motion.div layoutId="tab-active" className="absolute inset-0 bg-white/10" />
              )}
            </button>
          ))}
        </div>

        {showPager && (
          <div className="mb-8 flex items-center justify-center gap-6">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 disabled:opacity-20"
            >
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 rounded-full transition-all duration-300" 
                  style={{ 
                    width: page === i ? "24px" : "6px", 
                    backgroundColor: page === i ? color : "rgba(255,255,255,0.2)" 
                  }} 
                />
              ))}
            </div>
            <button
              onClick={() => setPage(prev => Math.min(maxPage, prev + 1))}
              disabled={page === maxPage}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 disabled:opacity-20"
            >
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {visiblePackages.map((pkg, i) => {
            const originalIndex = showPager ? start + i : i;
            const isHovered = hoveredIdx === i;
            const isPopular = !!pkg.popular;
            return (
              <motion.div 
                key={`${activeTab}-${originalIndex}`} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                onMouseEnter={() => setHoveredIdx(i)} 
                onMouseLeave={() => setHoveredIdx(null)} 
                className="relative flex flex-col rounded-[2.5rem] border p-10 transition-all duration-500" 
                style={{ 
                  borderColor: isHovered || isPopular ? `${color}40` : "rgba(255,255,255,0.08)", 
                  backgroundColor: isHovered ? "rgba(255,255,255,0.03)" : isPopular ? "rgba(255,255,255,0.02)" : "transparent",
                  boxShadow: isHovered ? `0 30px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px ${color}20` : "none",
                  transform: isHovered ? "translateY(-10px)" : "translateY(0)"
                }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-6 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl" style={{ backgroundColor: color }}>
                    Phổ biến nhất
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="mb-1 text-xl font-black text-white">{pkg.name}</h3>
                  <p className="mb-4 text-[10px] text-gray-500 uppercase tracking-wider">{pkg.name === "Giới thiệu" ? "Website cơ bản" : pkg.name === "Tối ưu" ? "Chuẩn SEO + UX" : pkg.name === "Kinh doanh" ? "Tối ưu chuyển đổi" : "Automation + Scale"}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white" style={{ color: isHovered ? color : "white" }}>{pkg.price}</span>
                  </div>
                </div>

                <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <ul className="mb-10 flex-1 space-y-4">
                  {(pkg.allFeatures?.length ? pkg.allFeatures : pkg.features).map((rawFeature, fi) => {
                    const parsed = parseFeatureItem(rawFeature);
                    if (!parsed.title) return null;
                    const featureKey = `${activeTab}-${originalIndex}-${fi}`;
                    const isExpanded = expandedFeature === featureKey;
                    return (
                      <li key={featureKey} className="group/item">
                        <button
                          type="button"
                          onClick={() => setExpandedFeature(isExpanded ? null : featureKey)}
                          className="flex w-full items-start justify-between gap-3 text-left"
                        >
                          <span className="flex items-start gap-3">
                            <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover/item:bg-white/10">
                              <Check size={10} style={{ color }} />
                            </div>
                            <span className="text-sm font-medium text-gray-300 transition-colors group-hover/item:text-white">{parsed.title}</span>
                          </span>
                          {parsed.details.length > 0 && (
                            <ChevronDown size={14} className={`mt-1 shrink-0 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          )}
                        </button>
                        <AnimatePresence>
                          {isExpanded && parsed.details.length > 0 && (
                            <motion.ul 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 space-y-2 pb-2 pl-7">
                                {parsed.details.map((detail, detailIdx) => (
                                  <li key={`${featureKey}-detail-${detailIdx}`} className="text-xs leading-relaxed text-gray-500">
                                    • {detail}
                                  </li>
                                ))}
                              </div>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto space-y-4">
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10">Xem chi tiết</button>
                    <button 
                      onClick={() => onCheckout({ name: pkg.name, price: pkg.price, color, tabLabel: tab.label })} 
                      className="flex-1 rounded-xl py-3 text-xs font-black text-white transition-all active:scale-95"
                      style={{ backgroundColor: isHovered || isPopular ? color : "rgba(255,255,255,0.05)" }}
                    >
                      Chọn gói
                    </button>
                  </div>
                </div>
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
    <section data-section="process" id="process" className="py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">Quy Trình <span style={{ color }}>Chuyên Nghiệp</span></h2>
          <p className="mx-auto max-w-2xl text-gray-400">Chúng tôi áp dụng quy trình làm việc khoa học, tối ưu hóa từng bước để mang lại kết quả tốt nhất.</p>
        </div>

        {processTabs.length > 1 && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {processTabs.map((t, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(i)} 
                className="rounded-full px-6 py-2.5 text-sm font-bold transition-all" 
                style={activeTab === i ? { backgroundColor: color, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "#999" }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="absolute left-[50%] top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="space-y-8 md:space-y-0"
            >
              {tab.steps.map((p, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex flex-col md:flex-row md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    {/* Content */}
                    <div className="w-full md:w-1/2">
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:bg-white/[0.04] md:mx-8 ${isEven ? "md:text-left" : "md:text-right"}`}
                      >
                        <div className={`mb-4 flex items-center gap-4 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg" style={{ backgroundColor: color }}>
                            {p.step}
                          </div>
                          <h4 className="text-xl font-bold text-white">{p.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">{p.desc}</p>
                      </motion.div>
                    </div>

                    {/* Center Dot (Desktop) */}
                    <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                      <div className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: color }} />
                    </div>

                    {/* Empty space for the other side */}
                    <div className="hidden w-1/2 md:block" />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
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
    <section data-section="faq" id="faq" className="py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Câu Hỏi Thường Gặp</h2>
          <p className="text-gray-400">Giải đáp những thắc mắc phổ biến nhất của khách hàng</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all hover:bg-white/[0.04]"
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
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
    <section data-section="contact" id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${color}30` }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">Liên Hệ Tư Vấn</h2>
          <p className="text-gray-400">Hãy để chúng tôi đồng hành cùng sự phát triển của doanh nghiệp bạn</p>
        </div>

        {sent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] border border-green-500/30 bg-green-500/10 p-16 text-center backdrop-blur-md"
          >
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/40">
              <Check size={40} />
            </div>
            <h3 className="mb-4 text-2xl font-black text-white">Đã Nhận Thông Tin!</h3>
            <p className="text-gray-400">Chúng tôi sẽ liên hệ lại với bạn trong vòng 30 phút làm việc.</p>
          </motion.div>
        ) : (
          <form 
            onSubmit={e => { e.preventDefault(); db.leads.add({ type: "contact", name, phone, service, note }); setSent(true); }} 
            className="group relative rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Họ và tên</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Số điện thoại</label>
                <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="090 123 4567" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Dịch vụ quan tâm</label>
                <div className="relative">
                  <select value={service} onChange={e => setService(e.target.value)} className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10">
                    <option value="" className="bg-neutral-900">Chọn dịch vụ...</option>
                    <option className="bg-neutral-900">Xây dựng trang/kênh</option>
                    <option className="bg-neutral-900">Chăm sóc nội dung</option>
                    <option className="bg-neutral-900">Quảng cáo</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Ghi chú thêm</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Mô tả nhu cầu của bạn..." rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10 resize-none" />
              </div>
              
              <button 
                type="submit" 
                className="group relative mt-4 w-full overflow-hidden rounded-2xl py-5 text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-95 shadow-2xl" 
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Gửi Yêu Cầu Tư Vấn Ngay</span>
              </button>
            </div>
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

      {visibility.pricing !== false && (
        <PricingSection tabs={tabsForRender} color={platformColor} onCheckout={handleCheckout} />
      )}

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

