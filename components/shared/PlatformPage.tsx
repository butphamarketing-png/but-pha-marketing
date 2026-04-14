import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X, ShoppingCart, Check, CreditCard, Building2, Smartphone } from "lucide-react";
import { SubPageLayout } from "./SubPageLayout";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ComparisonTable } from "./ComparisonTable";
import { FanpageAudit } from "./FanpageAudit";
import { AudioGuide } from "./AudioGuide";
import { CountUp } from "./CountUp";
import { db } from "@/lib/useData";
import { useAdmin } from "@/lib/AdminContext";
import { getContent, buildDefaultProcessTabs } from "@/lib/pageContent";

export interface PricingPackage {
  name: string;
  price: string;
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

function Slideshow({ color, platformKey }: { color: string; platformKey: string }) {
  const { settings } = useAdmin();
  const [current, setCurrent] = useState(0);
  const customSlides = settings.media[platformKey]?.slideshow || [];
  
  const defaultSlides = [
    { title: "Bứt Phá Doanh Số", sub: "Tăng trưởng vượt bậc với chiến lược Marketing tối ưu", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" },
    { title: "Xây Dựng Thương Hiệu", sub: "Định vị thương hiệu mạnh mẽ trong tâm trí khách hàng", url: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&q=80" },
    { title: "Kết Quả Thực Sự", sub: "Cam kết mang lại hiệu quả đo lường được", url: "https://images.unsplash.com/photo-1551288049-bbbda5366392?w=1200&q=80" },
  ];

  const slides = customSlides.length > 0 
    ? customSlides.map(url => ({ title: "", sub: "", url }))
    : defaultSlides;

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section data-section="slideshow" id="slideshow" className="relative overflow-hidden" style={{ height: "420px" }}>
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
      <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/50"><ChevronLeft size={20} /></button>
      <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/50"><ChevronRight size={20} /></button>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className="h-2 rounded-full transition-all" style={{ width: current === i ? "24px" : "8px", backgroundColor: current === i ? color : "rgba(255,255,255,0.4)" }} />)}
      </div>
    </section>
  );
}

function Accordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left font-semibold text-white hover:text-gray-300">
        {title}<ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-gray-400 leading-relaxed">{content}</p>}
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
  const tab = tabs[activeTab];

  return (
    <section data-section="pricing" id="pricing" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">Bảng Giá Dịch Vụ</h2>
        <p className="mb-10 text-center text-gray-400">Đa dạng lựa chọn phù hợp với mọi nhu cầu</p>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setHoveredIdx(null); }} className="rounded-full px-5 py-2 text-sm font-semibold transition-all" style={activeTab === i ? { backgroundColor: color, color: "#fff" } : { backgroundColor: "rgba(255,255,255,0.07)", color: "#ccc" }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tab.packages.map((pkg, i) => {
            const isHovered = hoveredIdx === i;
            const isPopular = !!pkg.popular;
            return (
              <motion.div key={`${activeTab}-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="relative flex flex-col rounded-2xl border p-6 cursor-pointer" style={{ borderColor: isHovered || isPopular ? color : "rgba(255,255,255,0.1)", backgroundColor: isHovered ? `${color}15` : isPopular ? "rgba(109,40,217,0.12)" : "var(--card)", boxShadow: isHovered ? `0 0 30px ${color}30, 0 8px 32px rgba(0,0,0,0.4)` : isPopular ? "0 8px 32px rgba(109,40,217,0.2)" : "none", transform: isHovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.2s ease" }}>
                {isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: color }}>Phổ biến nhất</span>}
                <h3 className="mb-2 text-lg font-bold text-white">{pkg.name}</h3>
                <p className="mb-1 text-3xl font-black" style={{ color }}>{pkg.price}</p>
                <p className="mb-4 text-xs text-gray-500">/tháng</p>
                <ul className="mb-6 flex-1 space-y-2">
                  {pkg.features.map((f, fi) => <li key={fi} className="flex items-start gap-2 text-sm text-gray-300"><span className="mt-0.5 text-green-400">✓</span>{f}</li>)}
                </ul>
                <AudioGuide text={pkg.audioText} color={color} />
                <button onClick={() => onCheckout({ name: pkg.name, price: pkg.price, color, tabLabel: tab.label })} className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-white transition-all" style={{ backgroundColor: isHovered ? color : isPopular ? color : "rgba(255,255,255,0.1)", transform: isHovered ? "scale(1.02)" : "scale(1)" }}>
                  Đăng Ký Ngay
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
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
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
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {tab.steps.map((p, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: color }}>{p.step}</div>
                  {i < tab.steps.length - 1 && <div className="mt-1 w-px flex-1 bg-white/10" />}
                </div>
                <div className="pb-8">
                  <h4 className="mb-1 font-bold text-white">{p.title}</h4>
                  <p className="text-sm text-gray-400">{p.desc}</p>
                </div>
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
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-black text-white md:text-4xl">Câu Hỏi Thường Gặp</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-card px-6">
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
  const [checkoutPkg, setCheckoutPkg] = useState<CheckoutPkg | null>(null);
  const [content, setContent] = useState(config);

  const platformKey = (config.auditPlatform || config.name).toLowerCase();
  const cms = settings.cms[platformKey];

  useEffect(() => {
    const override = getContent(platformKey);
    if (!override) return;
    setContent(prev => ({
      ...prev,
      vision: override?.vision || prev.vision,
      mission: override?.mission || prev.mission,
      responsibility: override?.responsibility || prev.responsibility,
      tabs: override?.tabs || prev.tabs,
      stats: override?.stats || prev.stats,
      faqs: override?.faqs || prev.faqs,
    }));
  }, [platformKey]);

  // Update tabs packages with dynamic audio, price, and features if available
  const updatedTabs = content.tabs.map(tab => ({
    ...tab,
    packages: tab.packages.map((pkg, idx) => {
      const pkgName = `Gói ${idx + 1}`;
      const override = settings.cms[platformKey]?.packages?.[pkgName];
      return {
        ...pkg,
        price: override?.price || pkg.price,
        features: override?.features && override.features.length > 0 && override.features[0] !== "" ? override.features : pkg.features,
        audioText: override?.audio || pkg.audioText
      };
    })
  }));

  const override = getContent(platformKey);
  const processTabs = override?.processTabs ?? buildDefaultProcessTabs(updatedTabs.map(t => t.label));
  const cases = settings.media[platformKey]?.cases || [];
  const beforeAfterBefore = override?.beforeAfterBefore;
  const beforeAfterAfter = override?.beforeAfterAfter;

  const handleCheckout = (pkg: CheckoutPkg) => setCheckoutPkg(pkg);

  return (
    <SubPageLayout platformName={content.name} primaryColor={settings.colors[platformKey] || content.color}>
      <Slideshow color={settings.colors[platformKey] || content.color} platformKey={platformKey} />

      {settings.visibility.intro !== false && (
        <section data-section="intro" id="intro" className="py-20 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-black text-white md:text-4xl">Giới Thiệu Về Dịch Vụ {content.name}</h2>
            <div className="rounded-2xl border border-white/10 bg-card divide-y divide-white/10 px-6">
              <Accordion title="Tầm Nhìn" content={content.vision} />
              <Accordion title="Sứ Mệnh" content={content.mission} />
              <Accordion title="Trách Nhiệm" content={content.responsibility} />
            </div>
          </motion.div>
        </section>
      )}

      {settings.visibility.pricing !== false && (
        <>
          <PricingSection tabs={updatedTabs} color={settings.colors[platformKey] || content.color} onCheckout={handleCheckout} />
          <ComparisonTable tabs={updatedTabs} primaryColor={settings.colors[platformKey] || content.color} onCheckout={pkg => handleCheckout({ ...pkg, color: settings.colors[platformKey] || content.color })} />
        </>
      )}
      
      <BeforeAfterSlider cases={cases} beforeImage={beforeAfterBefore} afterImage={beforeAfterAfter} />
      
      {settings.visibility.audit !== false && (
        <FanpageAudit 
          primaryColor={settings.colors[platformKey] || content.color} 
          platform={content.auditPlatform ?? "facebook"}
        />
      )}
      
      {settings.visibility.stats !== false && (
        <Stats stats={content.stats} color={settings.colors[platformKey] || content.color} />
      )}
      
      <ProcessSection processTabs={processTabs} color={settings.colors[platformKey] || content.color} />
      <FAQSection faqs={content.faqs} />
      <ContactForm color={settings.colors[platformKey] || content.color} />

      <AnimatePresence>
        {checkoutPkg && <CheckoutModal pkg={checkoutPkg} platformKey={platformKey} onClose={() => setCheckoutPkg(null)} />}
      </AnimatePresence>

    </SubPageLayout>
  );
}

