"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X, Check, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { SubPageLayout } from "./SubPageLayout";
import { db } from "@/lib/useData";
import { useAdmin } from "@/lib/AdminContext";
import { CountUp } from "./CountUp";
import { BRAND } from "@/lib/brand-colors";
import { SITE_CONTACT } from "@/lib/site-contact";

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
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  tabs: PricingTab[];
  stats: { label: string; value: string }[];
  process: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  vision: string;
  mission: string;
  responsibility: string;
  hidePricingHeader?: boolean;
  hideStats?: boolean;
  hideContact?: boolean;
  robotFilter?: string;
  customSections?: { id: string; label: string }[];
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

function notifyMascot(message: string, durationMs = 6000) {
  window.dispatchEvent(new CustomEvent("mascot-alert", { detail: { message, durationMs } }));
}

function isValidVNPhone(value: string) {
  return /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/.test(value.trim());
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

export function ConsultationModal({ pkg, platformKey, onClose }: { pkg: CheckoutPkg; platformKey: string; onClose: () => void }) {
  const [step, setStep] = useState<"config" | "success">("config");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    consultTime: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      notifyMascot(`Bạn đang đăng ký gói ${pkg.name}. Nhập đầy đủ thông tin để đội ngũ Bứt Phá Marketing tư vấn chính xác nhất nhé!`);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [pkg.name]);

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Vui lòng nhập họ và tên.");
      notifyMascot("Bạn chưa nhập họ tên. Nhập giúp mình họ tên để đội ngũ tư vấn xưng hô cho đúng nhé!");
      return;
    }
    if (!isValidVNPhone(form.phone)) {
      setError("Số điện thoại chưa đúng định dạng Việt Nam.");
      notifyMascot("Số điện thoại chưa đúng rồi. Bạn kiểm tra lại để đội ngũ có thể gọi hoặc nhắn Zalo tư vấn nhé!");
      return;
    }
    if (!form.email.trim()) {
      setError("Vui lòng nhập email.");
      notifyMascot("Bạn chưa nhập email. Nhập giúp mình email để nhận thông tin tư vấn chi tiết nhé!");
      return;
    }
    if (!form.address.trim()) {
      setError("Vui lòng nhập địa chỉ tư vấn.");
      notifyMascot("Bạn chưa nhập địa chỉ tư vấn. Nhập giúp mình khu vực để đội ngũ tư vấn sát hơn nhé!");
      return;
    }
    if (!form.consultTime) {
      setError("Vui lòng chọn thời gian tư vấn.");
      notifyMascot("Bạn chưa chọn thời gian tư vấn. Chọn giúp mình khung giờ thuận tiện để đội ngũ liên hệ nhé!");
      return;
    }

    setSubmitting(true);
    setError("");

    const combinedNote = [
      `Gói: ${pkg.tabLabel} - ${pkg.name}`,
      `Email: ${form.email}`,
      `Địa chỉ: ${form.address}`,
      `Thời gian tư vấn: ${form.consultTime}`,
      form.note.trim() ? `Nội dung: ${form.note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await db.leads.add({
      type: "contact",
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: `${pkg.tabLabel} - ${pkg.name}`,
      note: combinedNote,
      platform: platformKey,
      url: typeof window !== "undefined" ? window.location.pathname : undefined,
    });

    setSubmitting(false);

    if (result.error) {
      setError("Không gửi được yêu cầu tư vấn lúc này. Vui lòng thử lại sau.");
      notifyMascot("Hiện chưa gửi được yêu cầu tư vấn. Bạn thử lại giúp mình hoặc gọi trực tiếp cho đội ngũ nhé!");
      return;
    }

    setStep("success");
    notifyMascot("Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn cho bạn sớm nhất.");
  };

  return (
    <div className="brand-modal-backdrop z-[70]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="brand-modal-surface max-w-lg overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
        style={{ boxShadow: `0 24px 64px -16px ${pkg.color}40` }}
      >
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: pkg.color }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[100px] opacity-15 pointer-events-none" style={{ backgroundColor: pkg.color }} />
        
        <button onClick={onClose} className="absolute right-6 top-6 z-20 rounded-full p-1 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-900 hover:rotate-90">
          <X size={20} />
        </button>

        {step === "success" ? (
          <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)` }}
            >
              <Check className="h-12 w-12 text-white" strokeWidth={3} />
            </motion.div>
            <h3 className="mb-3 text-3xl font-bold tracking-tight text-indigo-950">Tuyệt vời!</h3>
            <p className="mb-10 mx-auto max-w-[280px] leading-relaxed text-slate-600">
              Yêu cầu của bạn đã được tiếp nhận. Đội ngũ chuyên gia sẽ liên hệ tư vấn trong thời gian sớm nhất.
            </p>
            <button
              onClick={onClose}
              className="w-full max-w-[200px] rounded-2xl py-4 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
              style={{ backgroundColor: pkg.color }}
            >
              Hoàn tất
            </button>
          </div>
        ) : (
          <div className="relative p-8 sm:p-12">
            <div className="mb-10">
              <span className="brand-eyebrow mb-4 inline-block rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1">
                Đăng ký ngay
              </span>
              <h3 className="text-3xl font-bold leading-tight text-indigo-950">Nhận tư vấn <span style={{ color: pkg.color }}>{pkg.name}</span></h3>
              <p className="mt-2 text-sm font-medium text-slate-600">Chúng tôi sẽ thiết kế lộ trình tối ưu cho riêng bạn.</p>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Họ và tên *"
                    className="brand-input text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Số điện thoại (Zalo) *"
                    className="brand-input text-sm"
                  />
                </div>
              </div>

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Địa chỉ Email *"
                className="brand-input text-sm"
              />

              <input
                required
                value={form.address}
                onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Khu vực / Tỉnh thành *"
                className="brand-input text-sm"
              />

              <div className="space-y-2">
                <label className="ml-1 text-xs font-medium text-slate-500">Thời gian gọi tư vấn *</label>
                <input
                  required
                  type="datetime-local"
                  value={form.consultTime}
                  onChange={(e) => setForm(prev => ({ ...prev, consultTime: e.target.value }))}
                  className="brand-input text-sm"
                />
              </div>

              <textarea
                value={form.note}
                onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Bạn cần chúng tôi hỗ trợ cụ thể về điều gì? (Không bắt buộc)"
                rows={3}
                className="brand-input resize-none text-sm"
              />

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="flex items-center gap-2 px-1 text-xs font-bold text-rose-500"
                >
                  <div className="h-1 w-1 rounded-full bg-rose-500" />
                  {error}
                </motion.div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="group relative mt-2 w-full overflow-hidden rounded-2xl py-5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                style={{ backgroundColor: pkg.color }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? "Đang xử lý..." : "Xác nhận gửi thông tin"}
                </span>
              </button>
              
              <p className="text-center text-[10px] text-gray-600 font-medium italic">Chúng tôi cam kết bảo mật thông tin khách hàng tuyệt đối.</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Stats({ stats, color, isWebsite }: { stats: { label: string; value: string }[]; color: string; isWebsite?: boolean }) {
  if (isWebsite) return null;
  return (
    <section data-section="stats" id="stats" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse" style={{ backgroundColor: color }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse" style={{ backgroundColor: color, animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            className="brand-card-soft group relative p-10 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-brand-lg"
          >
            <div className="absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
              style={{ background: `radial-gradient(400px circle at center, ${color}12, transparent 60%)` }} 
            />
            
            <div className="relative">
              <div className="mb-6 inline-flex items-center justify-center">
                <CountUp value={s.value} color={color} className="text-5xl font-bold tracking-tight text-indigo-950 md:text-6xl" />
              </div>
              <div className="mx-auto mb-6 h-1.5 w-10 rounded-full opacity-40 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" style={{ backgroundColor: color }} />
              <p className="text-xs font-medium tracking-wide text-slate-500 transition-colors group-hover:text-slate-700">
                {s.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ tabs, color, onCheckout, hideHeader }: { tabs: PricingTab[]; color: string; onCheckout: (pkg: CheckoutPkg) => void; hideHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  const tab = tabs[activeTab];
  const pageSize = 4;
  const showPager = tab.packages.length > pageSize;
  const maxPage = Math.max(0, Math.ceil(tab.packages.length / pageSize) - 1);
  const start = page * pageSize;
  const visiblePackages = showPager ? tab.packages.slice(start, start + pageSize) : tab.packages;

  return (
    <section data-section="pricing" id="pricing" className="py-32 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: color }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: color }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 mx-auto max-w-7xl">
        {!hideHeader && (
          <div className="mb-20 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="platform-section-badge"
            >
              <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              Bảng giá dịch vụ
            </motion.div>
            <h2 className="brand-section-title mb-8">
              Lựa chọn <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-600">
                tối ưu
                <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full opacity-40" style={{ backgroundColor: color }} />
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              Các gói giải pháp được may đo riêng biệt, giúp doanh nghiệp bứt phá doanh thu và tối ưu chi phí vận hành.
            </p>
          </div>
        )}

        {tabs.length > 1 && !hideHeader && (
          <div className="mb-16 flex flex-wrap justify-center gap-4">
            {tabs.map((t, i) => (
              <button 
                key={i} 
                onClick={() => { setActiveTab(i); setHoveredIdx(null); setPage(0); }} 
                className="rounded-2xl border px-10 py-4 text-sm font-semibold transition-all" 
                style={activeTab === i 
                  ? { backgroundColor: color, color: "#fff", borderColor: color, boxShadow: `0 14px 32px ${color}28` } 
                  : { backgroundColor: "#fff", color: "#475569", borderColor: "rgba(99,102,241,0.2)" }
                }
              >
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        )}

        {showPager && (
          <div className="mb-12 flex items-center justify-center gap-8">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="brand-icon-btn disabled:opacity-30"
            >
              <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <div className="flex gap-3">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage(i)}
                  className="h-2 rounded-full transition-all duration-500" 
                  style={{ 
                    width: page === i ? "40px" : "8px", 
                    backgroundColor: page === i ? color : "rgba(99,102,241,0.2)" 
                  }} 
                />
              ))}
            </div>
            <button
              onClick={() => setPage(prev => Math.min(maxPage, prev + 1))}
              disabled={page === maxPage}
              className="brand-icon-btn disabled:opacity-30"
            >
              <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
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
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }} 
                onMouseEnter={() => setHoveredIdx(i)} 
                onMouseLeave={() => setHoveredIdx(null)} 
                className={`platform-pricing-card flex flex-col p-10 transition-all duration-500 ${isPopular ? "platform-pricing-card--featured" : ""}`}
                style={{
                  borderColor: isHovered || isPopular ? `${color}55` : undefined,
                  boxShadow: isHovered ? `0 24px 48px -16px ${color}22` : undefined,
                  transform: isHovered ? "translateY(-8px)" : undefined,
                  ...(isPopular ? { ["--tw-ring-color" as string]: `${color}40` } : {}),
                }}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-6 py-2.5 text-[10px] font-semibold text-white shadow-lg" style={{ backgroundColor: color }}>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Phổ biến nhất
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-indigo-950">{pkg.name}</h3>
                  <div className="mb-6 flex items-center gap-2">
                    <div className="h-1 w-8 rounded-full" style={{ backgroundColor: color, opacity: isHovered || isPopular ? 1 : 0.35 }} />
                    <p className="text-[10px] font-medium tracking-wide text-slate-500">{pkg.name === "Giới thiệu" ? "Website cơ bản" : pkg.name === "Tối ưu" ? "Chuẩn SEO + UX" : pkg.name === "Kinh doanh" ? "Tối ưu chuyển đổi" : "Automation + Scale"}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold transition-colors duration-500" style={{ color }}>{pkg.price}</span>
                    {pkg.period && (
                      <span className="text-xs font-medium tracking-wide text-slate-500">
                        / {pkg.period === "month" ? "Tháng" : "Trọn đời"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />

                <ul className="mb-12 flex-1 space-y-5">
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
                          <span className="flex items-start gap-3.5">
                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-indigo-50 transition-all group-hover/item:scale-110" style={{ border: `1px solid ${isHovered || isPopular ? color + "35" : "rgba(99,102,241,0.15)"}` }}>
                              <Check size={12} strokeWidth={3} style={{ color }} />
                            </div>
                            <span className="text-[13px] font-semibold leading-snug text-slate-600 transition-colors group-hover/item:text-indigo-950">{parsed.title}</span>
                          </span>
                          {parsed.details.length > 0 && (
                            <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 transition-all ${isExpanded ? "rotate-180" : ""}`}>
                              <ChevronDown size={12} className="text-slate-500" />
                            </div>
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
                              <div className="ml-2.5 mt-4 space-y-2.5 border-l border-indigo-100 pb-2 pl-9">
                                {parsed.details.map((detail, detailIdx) => (
                                  <li key={`${featureKey}-detail-${detailIdx}`} className="flex items-start gap-2 text-[11px] font-medium leading-relaxed text-slate-500">
                                    <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                                    {detail}
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

                <div className="mt-auto pt-6">
                  <button 
                    onClick={() => onCheckout({ name: pkg.name, price: pkg.price, color, tabLabel: tab.label })} 
                    className="group/btn relative w-full overflow-hidden rounded-[1.5rem] py-5 text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{ backgroundColor: isHovered || isPopular ? color : "#94a3b8" }}
                  >
                    <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity group-hover/btn:opacity-100" />
                    <span className="relative z-10">Tư vấn ngay</span>
                  </button>
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
    <section data-section="process" id="process" className="py-32 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ backgroundColor: color }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="platform-section-badge"
          >
            Quy trình làm việc
          </motion.div>
          <h2 className="brand-section-title mb-6">Quy trình <span style={{ color }}>chuyên nghiệp</span></h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">Chúng tôi áp dụng mô hình triển khai bài bản, đảm bảo tính minh bạch và hiệu quả cao nhất cho từng dự án.</p>
        </div>

        {processTabs.length > 1 && (
          <div className="mb-16 flex flex-wrap justify-center gap-4">
            {processTabs.map((t, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(i)} 
                className="rounded-2xl border px-8 py-4 text-sm font-semibold transition-all shadow-sm" 
                style={activeTab === i 
                  ? { backgroundColor: color, color: "#fff", borderColor: color, boxShadow: `0 14px 32px ${color}28` } 
                  : { backgroundColor: "#fff", color: "#475569", borderColor: "rgba(99,102,241,0.2)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="absolute left-[50%] top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-indigo-200 to-transparent md:block" />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="space-y-12 md:space-y-24"
            >
              {tab.steps.map((p, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className={`relative flex flex-col md:flex-row md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-full md:w-1/2">
                      <motion.div 
                        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8, type: "spring", damping: 15 }}
                        className={`brand-card group relative p-10 transition-all duration-500 hover:-translate-y-0.5 md:mx-12 ${isEven ? "md:text-left" : "md:text-right"}`}
                      >
                        <div className={`mb-6 flex items-center gap-6 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] text-2xl font-bold text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
                            {p.step}
                          </div>
                          <h4 className="text-2xl font-bold tracking-tight text-indigo-950">{p.title}</h4>
                        </div>
                        <p className="text-[15px] font-medium leading-relaxed text-slate-600">{p.desc}</p>
                        
                        <div className={`absolute top-1/2 hidden h-px w-12 -translate-y-1/2 bg-indigo-200 md:block ${isEven ? "-left-12" : "-right-12"}`} />
                      </motion.div>
                    </div>

                    <div className="absolute left-1/2 top-1/2 z-10 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                      <div className="h-3 w-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse" style={{ backgroundColor: color }} />
                    </div>

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
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-indigo-950 hover:text-violet-700">
        {q}<ChevronDown size={18} className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>}
    </div>
  );
}

function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section data-section="faq" id="faq" className="py-24 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="brand-section-title mb-4">Câu hỏi thường gặp</h2>
          <p className="text-slate-600">Giải đáp những thắc mắc phổ biến nhất của khách hàng</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="brand-card overflow-hidden transition-all hover:shadow-brand-lg"
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactForm({ color, robotFilter }: { color: string; robotFilter?: string }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [platform, setPlatform] = useState("website");
  const [note, setNote] = useState("");

  const resolvedFilter = "none";

  const handleInlineContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      notifyMascot("Bạn chưa nhập họ tên. Nhập giúp mình họ tên để đội ngũ tư vấn xưng hô cho đúng nhé!");
      return;
    }
    if (!isValidVNPhone(phone)) {
      notifyMascot("Số điện thoại chưa đúng định dạng Việt Nam. Bạn kiểm tra lại giúp mình để đội ngũ gọi hoặc nhắn Zalo tư vấn nhé!");
      return;
    }
    if (!address.trim()) {
      notifyMascot("Bạn chưa nhập địa điểm. Nhập giúp mình khu vực để đội ngũ tư vấn sát nhu cầu hơn nhé!");
      return;
    }
    if (!consultTime) {
      notifyMascot("Bạn chưa chọn thời gian tư vấn. Chọn giúp mình khung giờ thuận tiện để đội ngũ liên hệ nhé!");
      return;
    }
    await db.leads.add({
      type: "contact",
      name,
      phone,
      service: `Tư vấn ${platform}`,
      note: `Email: ${email}\nĐịa chỉ: ${address}\nThời gian: ${consultTime}\nGhi chú: ${note}`,
      platform: platform === "facebook" ? "facebook" : platform === "google maps" ? "googlemaps" : "website"
    });
    setSent(true);
    notifyMascot("Hoàn tất rồi! Bạn chú ý điện thoại hoặc Zalo nhé, đội ngũ Bứt Phá Marketing sẽ liên hệ tư vấn cho bạn sớm nhất.");
  };

  return (
    <section data-section="contact" id="contact" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full blur-[150px] animate-pulse" style={{ backgroundColor: `${color}40` }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="platform-section-badge"
          >
            <Phone size={12} style={{ color }} />
            Kết nối ngay
          </motion.div>
          <h2 className="brand-section-title mb-6">Đặt lịch tư vấn <span style={{ color }}>trực tiếp</span></h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.</p>
        </div>

        {sent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="brand-card rounded-[2rem] border-violet-200 bg-violet-50/80 p-20 text-center"
          >
            <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${BRAND.main}, ${color})` }}>
              <Check size={48} strokeWidth={3} />
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-indigo-950">Gửi thông tin thành công!</h3>
            <p className="text-lg font-medium leading-relaxed text-slate-600">Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút tới. <br/>Vui lòng giữ điện thoại hoặc kiểm tra Zalo nhé!</p>
          </motion.div>
        ) : (
          <div className="platform-panel relative overflow-hidden rounded-[2rem] p-8 md:rounded-[2.5rem] md:p-16">
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
            
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <form 
                onSubmit={handleInlineContactSubmit} 
                className="space-y-8"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="ml-1 text-xs font-medium text-slate-500">Họ và tên</label>
                    <input required value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" className="brand-input" />
                  </div>
                  <div className="space-y-3">
                    <label className="ml-1 text-xs font-medium text-slate-500">Số điện thoại (Zalo)</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="0937 417 982" className="brand-input" />
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="ml-1 text-xs font-medium text-slate-500">Khu vực / Tỉnh thành</label>
                    <input required value={address} onChange={e => setAddress(e.target.value)} placeholder="Hà Nội, TP.HCM..." className="brand-input" />
                  </div>
                  <div className="space-y-3">
                    <label className="ml-1 text-xs font-medium text-slate-500">Thời gian gọi tư vấn</label>
                    <input required type="datetime-local" value={consultTime} onChange={e => setConsultTime(e.target.value)} className="brand-input" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="ml-1 text-xs font-medium text-slate-500">Nền tảng bạn quan tâm</label>
                  <div className="flex flex-wrap gap-4">
                    {["Website", "Facebook", "Google Maps"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPlatform(p.toLowerCase())}
                        className={`rounded-2xl border px-8 py-4 text-xs font-semibold transition-all ${
                          platform === p.toLowerCase() 
                          ? "scale-[1.02] text-white shadow-md" 
                          : "border-indigo-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-indigo-50"
                        }`}
                        style={platform === p.toLowerCase() ? { backgroundColor: color, borderColor: color } : undefined}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="ml-1 text-xs font-medium text-slate-500">Nội dung yêu cầu</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Mô tả ngắn gọn nhu cầu của bạn để chúng tôi chuẩn bị tốt hơn..." rows={4} className="brand-input resize-none" />
                </div>
                
                <button 
                  type="submit" 
                  className="group relative mt-6 w-full overflow-hidden rounded-[2rem] py-7 text-sm font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg" 
                  style={{ backgroundColor: color }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center justify-center gap-3">
                    ✨ Đặt Lịch Tư Vấn Ngay
                  </span>
                </button>
              </form>

              <div className="hidden lg:block relative">
                <div className="absolute -inset-24 animate-pulse rounded-full blur-[120px]" style={{ backgroundColor: `${color}18` }} />
                <div className="brand-card-soft relative rounded-[2rem] p-12">
                  <img 
                    src="/mascot-home.png" 
                    alt="Mascot" 
                    className="mx-auto w-full max-w-sm animate-float drop-shadow-lg" 
                    style={{ filter: resolvedFilter }}
                  />
                  <div className="mt-12 text-center">
                    <p className="mb-2 text-xl font-bold text-indigo-950">Đội ngũ chuyên gia</p>
                    <p className="text-sm font-medium text-slate-600">Sẵn sàng đồng hành cùng sự phát triển <br/> của doanh nghiệp bạn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export function PlatformPage({ config, children }: { config: PlatformConfig, children?: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [checkoutPkg, setCheckoutPkg] = useState<CheckoutPkg | null>(null);
  
  const platformKey = pathname.split("/").pop() || "home";
  const platformColor = config.color;

  const processTabs = [
    { label: "Quy trình triển khai", steps: config.process }
  ];

  const handleCheckout = (pkg: CheckoutPkg) => {
    setCheckoutPkg(pkg);
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
  const pageH1 =
    [config.heroTitle, config.heroSubtitle].filter(Boolean).join(" — ") ||
    `Dịch vụ ${config.name} Marketing`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.name,
    description: config.mission,
    url: `${siteUrl}${pathname}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Bứt Phá Marketing",
      url: siteUrl,
      image: `${siteUrl}/logo.jpg`,
      telephone: `+84${SITE_CONTACT.hotline.replace(/^0/, "")}`,
      email: SITE_CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONTACT.address,
        addressLocality: "Hồ Chí Minh",
        addressCountry: "VN",
      },
    },
  };

  return (
    <SubPageLayout platformName={config.name} primaryColor={platformColor} customSections={config.customSections}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <h1 className="sr-only">{pageH1}</h1>

      {children}

      {config.tabs && config.tabs.length > 0 && (
        <PricingSection tabs={config.tabs} color={platformColor} onCheckout={handleCheckout} hideHeader={config.hidePricingHeader} />
      )}

      {!config.hideStats && <Stats stats={config.stats} color={platformColor} isWebsite={platformKey === "website"} />}
      
      {!config.hideContact && <ContactForm color={platformColor} robotFilter={config.robotFilter} />}

      <AnimatePresence>
      {checkoutPkg && <ConsultationModal pkg={checkoutPkg} platformKey={platformKey} onClose={() => setCheckoutPkg(null)} />}
      </AnimatePresence>

    </SubPageLayout>
  );
}
