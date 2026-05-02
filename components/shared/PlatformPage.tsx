"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, X, Check, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { SubPageLayout } from "./SubPageLayout";
import { db } from "@/lib/useData";
import { useAdmin } from "@/lib/AdminContext";
import { CountUp } from "./CountUp";

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

function ConsultationModal({ pkg, platformKey, onClose }: { pkg: CheckoutPkg; platformKey: string; onClose: () => void }) {
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

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim() || !form.consultTime) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
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
      service: pkg.name,
      note: combinedNote,
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="relative w-full max-w-lg my-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0e0918] shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-6 top-6 z-10 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
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
            <button
              onClick={onClose}
              className="w-full rounded-2xl py-4 text-sm font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: pkg.color }}
            >
              Đóng
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white">Đăng ký tư vấn trực tiếp</h3>
              <p className="mt-1 text-sm text-gray-500">{pkg.tabLabel} · {pkg.name}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Họ và tên *"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Số điện thoại *"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
                />
              </div>

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Gmail (Email) *"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
              />

              <input
                required
                value={form.address}
                onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Địa chỉ tư vấn *"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
              />

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Thời gian tư vấn mong muốn *</label>
                <input
                  required
                  type="datetime-local"
                  value={form.consultTime}
                  onChange={(e) => setForm(prev => ({ ...prev, consultTime: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30"
                />
              </div>

              <textarea
                value={form.note}
                onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Nội dung bạn cần tư vấn"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none focus:border-white/30 resize-none"
              />

              {error && <p className="text-xs font-bold text-rose-500 ml-1">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="group relative mt-2 w-full overflow-hidden rounded-2xl py-5 text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                style={{ backgroundColor: pkg.color }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">{submitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn ngay"}</span>
              </button>
              
              <p className="text-center text-[10px] text-gray-600 italic">Thông tin của bạn được bảo mật tuyệt đối 100%</p>
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
    <section data-section="stats" id="stats" className="relative py-24 px-4 overflow-hidden">
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
  const pageSize = 4;
  const showPager = tab.packages.length > pageSize;
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

        {tabs.length > 1 && (
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
        )}

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
                    <span className="text-3xl font-black text-white" style={{ color: isHovered || isPopular ? color : "white" }}>{pkg.price}</span>
                    {pkg.period && (
                      <span className="text-sm text-gray-500 font-medium">
                        / {pkg.period === "month" ? "tháng" : "trọn đời"}
                      </span>
                    )}
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

                <div className="mt-auto">
                  <button 
                    onClick={() => onCheckout({ name: pkg.name, price: pkg.price, color, tabLabel: tab.label })} 
                    className="w-full rounded-2xl py-4 text-sm font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                    style={{ backgroundColor: isHovered || isPopular ? color : "rgba(255,255,255,0.08)" }}
                  >
                    Tư vấn trực tiếp
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

                    <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                      <div className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: color }} />
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
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [platform, setPlatform] = useState("website");
  const [note, setNote] = useState("");

  return (
    <section data-section="contact" id="contact" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${color}30` }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">Đặt lịch tư vấn trực tiếp</h2>
          <p className="text-gray-400">Để ngũ chuyên gia sẽ tư vấn giải pháp phù hợp nhất cho bạn</p>
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
            onSubmit={e => { 
              e.preventDefault(); 
              db.leads.add({ 
                type: "contact", 
                name, 
                phone, 
                service: `Tư vấn ${platform}`, 
                note: `Email: ${email}\nĐịa chỉ: ${address}\nThời gian: ${consultTime}\nGhi chú: ${note}` 
              }); 
              setSent(true); 
            }} 
            className="group relative rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl md:p-14"
          >
            <div className="grid gap-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Họ và tên</label>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="Nhập họ và tên" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Số điện thoại</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Nhập số điện thoại" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Địa điểm</label>
                  <input required value={address} onChange={e => setAddress(e.target.value)} placeholder="Chọn địa điểm" className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Thời gian</label>
                  <input required type="datetime-local" value={consultTime} onChange={e => setConsultTime(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Nền tảng</label>
                <div className="flex flex-wrap gap-3">
                  {["Website", "Facebook", "Google Maps"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p.toLowerCase())}
                      className={`rounded-xl px-6 py-3 text-xs font-bold transition-all border ${
                        platform === p.toLowerCase() 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Nội dung</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Bạn muốn tư vấn về vấn đề gì?" rows={4} className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-white/30 focus:bg-white/10 resize-none" />
              </div>
              
              <button 
                type="submit" 
                className="group relative mt-4 w-full overflow-hidden rounded-2xl py-6 text-sm font-black text-white transition-all hover:scale-[1.01] active:scale-95 shadow-2xl" 
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center justify-center gap-2">
                  ✨ Đặt lịch tư vấn ngay
                </span>
              </button>
            </div>
          </form>
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": config.name,
    "description": config.mission,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Bứt Phá Marketing",
      "image": "https://butphamarketing.com/logo.png"
    }
  };

  return (
    <SubPageLayout platformName={config.name} primaryColor={platformColor}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {config.tabs && config.tabs.length > 0 && (
        <PricingSection tabs={config.tabs} color={platformColor} onCheckout={handleCheckout} />
      )}

      {children}

      <Stats stats={config.stats} color={platformColor} isWebsite={platformKey === "website"} />
      
      <ContactForm color={platformColor} />

      <AnimatePresence>
      {checkoutPkg && <ConsultationModal pkg={checkoutPkg} platformKey={platformKey} onClose={() => setCheckoutPkg(null)} />}
      </AnimatePresence>

    </SubPageLayout>
  );
}
