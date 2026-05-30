"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Shield,
  Clock3,
  BarChart3,
  Headphones,
  ChevronRight,
  ArrowLeft,
  Facebook,
  Building2,
  Phone,
  Mail,
  MapPinned,
  Briefcase,
  User,
  Sparkles,
  MessageCircle,
  Printer,
  Info,
  Wrench,
  Star,
  Megaphone,
} from "lucide-react";
import { db } from "@/lib/useData";
import {
  STRATEGY_FOOTER,
  STRATEGY_PRICING,
  type StrategyPricingItem,
} from "@/lib/marketing-strategy-pricing";

type LeadForm = {
  fullName: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  industry: string;
};

const initialForm: LeadForm = {
  fullName: "",
  companyName: "",
  phone: "",
  address: "",
  email: "",
  industry: "",
};

const INDUSTRY_SUGGESTIONS = [
  "Nha khoa",
  "Spa / Thẩm mỹ",
  "Nhà hàng / F&B",
  "Bất động sản",
  "TMĐT / Bán lẻ",
  "Giáo dục / Đào tạo",
  "Dịch vụ doanh nghiệp",
];

const COLUMN_THEME = {
  website: { color: "#22C55E", bg: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-200" },
  fanpage: { color: "#1877F2", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-200" },
  googlemaps: { color: "#EA580C", bg: "from-orange-500/10 to-orange-500/5", border: "border-orange-200" },
} as const;

const COLUMN_ICONS = { website: Globe, fanpage: Facebook, googlemaps: MapPin } as const;
const FOOTER_ICONS = [Shield, Clock3, BarChart3, Headphones];

const GM_ICONS: Record<string, typeof Wrench> = {
  "gm-rebuild": Wrench,
  "gm-build": MapPin,
  "gm-optimize": Star,
  "gm-ads-under-10": Megaphone,
  "gm-ads-over-10": Megaphone,
};

function getRecommendedIds(industry: string) {
  const text = industry.toLowerCase();
  if (/nha khoa|spa|thẩm mỹ|y tế|phòng khám|nha khoa/.test(text)) {
    return new Set(["gm-optimize", "gm-build", "web-care-10", "fb-care-basic", "web-build-6"]);
  }
  if (/f&b|nhà hàng|quán|cafe|ăn uống/.test(text)) {
    return new Set(["gm-optimize", "fb-care-advanced", "web-care-20", "fb-ads-under-10"]);
  }
  if (/tmđt|bán lẻ|shop|thương mại|kinh doanh online/.test(text)) {
    return new Set(["web-build-9", "fb-care-pro", "fb-ads-over-10", "web-care-30"]);
  }
  if (/bất động sản|bds|nhà đất/.test(text)) {
    return new Set(["web-build-6", "fb-care-advanced", "gm-optimize", "fb-ads-under-10"]);
  }
  return new Set(["web-build-6", "fb-care-advanced", "gm-build"]);
}

function getIndustryAdvice(industry: string) {
  const text = industry.toLowerCase();
  if (/nha khoa|spa|thẩm mỹ|y tế/.test(text)) {
    return "Ngành dịch vụ tại chỗ nên ưu tiên Google Maps + Website chuyên nghiệp + Fanpage chăm sóc để tạo niềm tin và nhận booking.";
  }
  if (/tmđt|bán lẻ|shop/.test(text)) {
    return "Ngành bán hàng nên kết hợp Website chuyển đổi + Fanpage content + quảng cáo để tăng đơn hàng liên tục.";
  }
  return "Chiến lược tổng thể: Website làm nền tảng, Fanpage nuôi tương tác, Google Maps bắt khách local — triển khai theo giai đoạn để tối ưu ngân sách.";
}

const inputClass =
  "w-full rounded-xl border border-violet-200/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

function DetailPanel({ item, onClose }: { item: StrategyPricingItem; onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-violet-200 bg-white p-5 shadow-xl shadow-violet-900/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-600">Chi tiết gói dịch vụ</p>
          <h3 className="mt-1 text-xl font-black text-slate-900">{item.label}</h3>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-slate-50">
            Đóng
          </button>
        )}
      </div>
      {item.quantity && (
        <p className="mt-3 inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
          Số lượng: {item.quantity}
        </p>
      )}
      <p className="mt-4 text-3xl font-black text-violet-700">{item.price}</p>
      <p className="mt-4 text-[11px] font-black uppercase tracking-wide text-slate-400">Công việc bao gồm</p>
      <ul className="mt-3 space-y-2">
        {item.works.map((work) => (
          <li key={work} className="flex gap-2 text-sm leading-relaxed text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
            {work}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PricingRow({
  item,
  accent,
  recommended,
  active,
  onSelect,
}: {
  item: StrategyPricingItem;
  accent: string;
  recommended?: boolean;
  active?: boolean;
  onSelect: () => void;
}) {
  const GmIcon = GM_ICONS[item.id];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-all ${
        active
          ? "border-violet-400 bg-violet-50 shadow-md shadow-violet-100"
          : "border-transparent bg-white/70 hover:border-violet-200 hover:bg-white hover:shadow-sm"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        {GmIcon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
            <GmIcon size={14} />
          </span>
        )}
        <span className="truncate text-sm font-semibold text-slate-700">{item.label}</span>
        {recommended && (
          <span className="hidden shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black uppercase text-amber-700 sm:inline">
            Gợi ý
          </span>
        )}
      </div>
      <span className="shrink-0 text-sm font-black" style={{ color: accent }}>
        {item.price}
      </span>
    </button>
  );
}

export function StrategyMarketingPage() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [showStrategy, setShowStrategy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<StrategyPricingItem | null>(null);

  const recommendedIds = useMemo(() => getRecommendedIds(form.industry), [form.industry]);

  useEffect(() => {
    if (!showStrategy) return;
    const firstRecommended = STRATEGY_PRICING.flatMap((col) => col.groups.flatMap((g) => g.items)).find((item) =>
      recommendedIds.has(item.id),
    );
    setActiveItem(firstRecommended || STRATEGY_PRICING[0].groups[0].items[0]);
  }, [showStrategy, recommendedIds]);

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const required = [
      form.fullName.trim(),
      form.companyName.trim(),
      form.phone.trim(),
      form.address.trim(),
      form.email.trim(),
      form.industry.trim(),
    ];
    if (required.some((value) => !value)) {
      setError("Vui lòng điền đầy đủ thông tin trước khi xem chiến lược.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await db.leads.add({
      type: "contact",
      name: form.fullName.trim(),
      phone: form.phone.trim(),
      service: "Chiến lược Marketing",
      note: JSON.stringify({
        kind: "strategy_marketing",
        companyName: form.companyName.trim(),
        address: form.address.trim(),
        email: form.email.trim(),
        industry: form.industry.trim(),
      }),
      platform: "chienluocmarketing",
    });

    setSubmitting(false);

    if (result.error) {
      setError("Không lưu được thông tin. Vui lòng thử lại.");
      return;
    }

    setShowStrategy(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showStrategy) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#120a24] px-4 py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr,1.1fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-white">
              <Image src="/logo.png" alt="Bứt Phá Marketing" width={72} height={72} className="rounded-2xl" />
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-violet-200">
                <Sparkles size={12} /> Bảng chiến lược riêng
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Chiến lược Marketing
                <span className="block text-violet-300">cho doanh nghiệp của bạn</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-violet-100/80">
                Điền thông tin để mở bảng báo giá Website · Fanpage · Google Maps. Rê chuột hoặc chọn từng gói để xem
                số lượng, công việc và giá chi tiết.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-violet-100/70">
                {["Báo giá minh bạch theo từng hạng mục", "Gợi ý gói phù hợp theo ngành nghề", "Tư vấn triển khai theo giai đoạn"].map(
                  (line) => (
                    <li key={line} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      {line}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white/95 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8"
            >
              <div className="mb-5 flex items-center gap-2 text-violet-800">
                <Info size={16} />
                <p className="text-sm font-bold">Thông tin khách hàng</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 sm:col-span-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <User size={14} /> Họ và Tên *
                  </span>
                  <input className={inputClass} value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Nguyễn Văn A" />
                </label>
                <label className="block space-y-2 sm:col-span-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <Building2 size={14} /> Tên công ty *
                  </span>
                  <input className={inputClass} value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} placeholder="Công ty TNHH ..." />
                </label>
                <label className="block space-y-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <Phone size={14} /> Số điện thoại *
                  </span>
                  <input className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="09xx xxx xxx" />
                </label>
                <label className="block space-y-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <Mail size={14} /> Gmail *
                  </span>
                  <input type="email" className={inputClass} value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="email@company.com" />
                </label>
                <label className="block space-y-2 sm:col-span-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <MapPinned size={14} /> Địa chỉ công ty / cơ sở *
                  </span>
                  <input className={inputClass} value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Số nhà, đường, quận, thành phố" />
                </label>
                <div className="space-y-2 sm:col-span-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <Briefcase size={14} /> Ngành nghề *
                  </span>
                  <input className={inputClass} value={form.industry} onChange={(e) => updateField("industry", e.target.value)} placeholder="VD: Nha khoa, Spa, TMĐT..." />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {INDUSTRY_SUGGESTIONS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => updateField("industry", item)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                          form.industry === item
                            ? "border-violet-500 bg-violet-600 text-white"
                            : "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? "Đang xử lý..." : "Xem chiến lược"}
                <ChevronRight size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece6f7] px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            type="button"
            onClick={() => setShowStrategy(false)}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm hover:bg-violet-50"
          >
            <ArrowLeft size={14} /> Quay lại form
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700 hover:bg-violet-50"
            >
              <Printer size={14} /> In / PDF
            </button>
            <a
              href="https://zalo.me/0901438703"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-4 py-2 text-xs font-bold text-white hover:bg-violet-600"
            >
              <MessageCircle size={14} /> Tư vấn Zalo
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl shadow-violet-900/10 print:shadow-none"
        >
          <div className="border-b border-violet-100 bg-gradient-to-b from-white to-violet-50/40 px-6 py-8 text-center md:px-10">
            <Image src="/logo.png" alt="Bứt Phá Marketing" width={88} height={88} className="mx-auto" />
            <h1 className="mt-4 text-3xl font-black tracking-tight text-[#4c1d95] md:text-5xl">BỨT PHÁ MARKETING</h1>
            <div className="mx-auto mt-4 flex max-w-lg items-center gap-3">
              <div className="h-px flex-1 bg-violet-300" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700">
                Giải pháp Marketing – Hiệu quả – Bền vững
              </p>
              <div className="h-px flex-1 bg-violet-300" />
            </div>
            <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-violet-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
              <span className="font-bold text-violet-800">{form.companyName}</span> · {form.industry} · {form.fullName}
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">{getIndustryAdvice(form.industry)}</p>
          </div>

          <div className="grid gap-6 p-4 lg:grid-cols-[1fr,320px] lg:p-8">
            <div>
              <div className="relative mb-8 hidden md:block">
                <svg viewBox="0 0 900 48" className="h-12 w-full text-violet-700" preserveAspectRatio="none">
                  <path d="M60 8 H840" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M150 8 V44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M450 8 V44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M750 8 V44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {STRATEGY_PRICING.map((column) => {
                  const Icon = COLUMN_ICONS[column.id];
                  const theme = COLUMN_THEME[column.id];
                  return (
                    <div key={column.id} className="relative">
                      <div
                        className="relative z-10 mx-auto mb-5 flex w-fit items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-lg"
                        style={{ backgroundColor: theme.color, boxShadow: `0 12px 30px ${theme.color}40` }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                          <Icon size={22} />
                        </div>
                        <span className="text-base font-black tracking-wide">{column.title}</span>
                      </div>

                      <div className={`space-y-4 rounded-[1.75rem] border bg-gradient-to-b p-4 ${theme.border} ${theme.bg}`}>
                        {column.groups.map((group) => (
                          <div key={group.title} className="rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
                            <h3 className="mb-2 border-b border-slate-100 pb-2 text-center text-[11px] font-black uppercase tracking-wide text-slate-700">
                              {group.title}
                            </h3>
                            <div className="space-y-1.5">
                              {group.items.map((item) => (
                                <PricingRow
                                  key={item.id}
                                  item={item}
                                  accent={theme.color}
                                  recommended={recommendedIds.has(item.id)}
                                  active={activeItem?.id === item.id}
                                  onSelect={() => setActiveItem(item)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
              <AnimatePresence mode="wait">
                {activeItem ? (
                  <DetailPanel key={activeItem.id} item={activeItem} />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-6 text-center text-sm text-violet-700"
                  >
                    Chọn một dòng báo giá để xem chi tiết số lượng, công việc và giá.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-4 border-t border-violet-100 bg-[#faf8ff] p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-6">
            {STRATEGY_FOOTER.map((item, index) => {
              const Icon = FOOTER_ICONS[index];
              return (
                <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-violet-900">{item.title}</p>
                    <p className="text-[11px] leading-snug text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
