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
  Target,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Copy,
  Send,
  ShoppingCart,
  GitCompare,
  CalendarDays,
} from "lucide-react";
import { db } from "@/lib/useData";
import { STRATEGY_FOOTER, STRATEGY_PRICING, type StrategyPricingItem } from "@/lib/marketing-strategy-pricing";
import {
  BUDGET_OPTIONS,
  BUSINESS_GOALS,
  EXISTING_ASSET_OPTIONS,
  SCALE_OPTIONS,
  adjustComboForAssets,
  buildDeploymentTimeline,
  buildStrategySummaryText,
  buildWhyBullets,
  budgetFilterFromForm,
  calculatePlanTotals,
  formatVnd,
  getAllPricingItems,
  getPricingItemById,
  itemFitsBudgetFilter,
  parsePriceVnd,
  resolveIndustryProfile,
  type BudgetFilter,
  type StrategyFormSnapshot,
} from "@/lib/marketing-strategy-profiles";

type LeadForm = StrategyFormSnapshot;

const initialForm: LeadForm = {
  fullName: "",
  companyName: "",
  phone: "",
  address: "",
  email: "",
  industry: "",
  businessGoal: BUSINESS_GOALS[0],
  scale: SCALE_OPTIONS[0],
  budgetRange: BUDGET_OPTIONS[1],
  existingAssets: [],
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

const inputClass =
  "w-full rounded-xl border border-violet-200/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

const selectClass = inputClass;

function DetailPanel({ item }: { item: StrategyPricingItem }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-violet-200 bg-white p-5 shadow-xl shadow-violet-900/10">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-600">Chi tiết gói dịch vụ</p>
      <h3 className="mt-1 text-xl font-black text-slate-900">{item.label}</h3>
      {item.quantity && <p className="mt-3 inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Số lượng: {item.quantity}</p>}
      <p className="mt-4 text-3xl font-black text-violet-700">{item.price}</p>
      <ul className="mt-4 space-y-2">
        {item.works.map((work) => (
          <li key={work} className="flex gap-2 text-sm text-slate-600">
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
  dimmed,
  inPlan,
  inCompare,
  onSelect,
  onTogglePlan,
  onToggleCompare,
}: {
  item: StrategyPricingItem;
  accent: string;
  recommended?: boolean;
  active?: boolean;
  dimmed?: boolean;
  inPlan?: boolean;
  inCompare?: boolean;
  onSelect: () => void;
  onTogglePlan: () => void;
  onToggleCompare: () => void;
}) {
  const GmIcon = GM_ICONS[item.id];
  return (
    <div className={`rounded-xl border transition ${dimmed ? "opacity-45" : "opacity-100"} ${active ? "border-violet-300 bg-violet-50" : "border-transparent"}`}>
      <div className="flex items-stretch gap-1 p-1">
        <button type="button" onClick={onTogglePlan} title="Thêm vào kế hoạch" className={`shrink-0 rounded-lg px-2 text-[10px] font-black ${inPlan ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-violet-100"}`}>
          +
        </button>
        <button type="button" onClick={onSelect} className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left hover:bg-white">
          <div className="flex min-w-0 items-center gap-2">
            {GmIcon && (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                <GmIcon size={14} />
              </span>
            )}
            <span className="truncate text-sm font-semibold text-slate-700">{item.label}</span>
            {recommended && <span className="hidden rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black uppercase text-amber-700 sm:inline">Gợi ý</span>}
          </div>
          <span className="shrink-0 text-sm font-black" style={{ color: accent }}>{item.price}</span>
        </button>
        <button type="button" onClick={onToggleCompare} title="So sánh" className={`shrink-0 rounded-lg px-2 ${inCompare ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"}`}>
          <GitCompare size={14} />
        </button>
      </div>
    </div>
  );
}

export function StrategyMarketingPage() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [showStrategy, setShowStrategy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<StrategyPricingItem | null>(null);
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>("all");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const profile = useMemo(() => resolveIndustryProfile(form.industry), [form.industry]);
  const comboIds = useMemo(() => adjustComboForAssets(profile.comboItemIds, form.existingAssets), [profile, form.existingAssets]);
  const whyBullets = useMemo(() => buildWhyBullets(profile, form.businessGoal, form.existingAssets), [profile, form.businessGoal, form.existingAssets]);
  const planTotals = useMemo(() => calculatePlanTotals(planIds.length ? planIds : comboIds), [planIds, comboIds]);
  const timeline = useMemo(() => buildDeploymentTimeline(planIds.length || comboIds.length), [planIds.length, comboIds.length]);

  useEffect(() => {
    if (!showStrategy) return;
    setBudgetFilter(budgetFilterFromForm(form.budgetRange));
    setPlanIds(comboIds);
    const first = getPricingItemById(comboIds[0]) || getAllPricingItems()[0];
    setActiveItem(first);
  }, [showStrategy, comboIds, form.budgetRange]);

  const updateField = <K extends keyof LeadForm>(field: K, value: LeadForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleAsset = (assetId: string) => {
    setForm((prev) => ({
      ...prev,
      existingAssets: prev.existingAssets.includes(assetId)
        ? prev.existingAssets.filter((a) => a !== assetId)
        : [...prev.existingAssets, assetId],
    }));
  };

  const togglePlan = (id: string) => {
    setPlanIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const required = [form.fullName, form.companyName, form.phone, form.address, form.email, form.industry, form.businessGoal, form.scale, form.budgetRange];
    if (required.some((v) => !String(v).trim())) {
      setError("Vui lòng điền đầy đủ thông tin trước khi xem chiến lược.");
      return;
    }

    setSubmitting(true);
    const result = await db.leads.add({
      type: "contact",
      name: form.fullName.trim(),
      phone: form.phone.trim(),
      service: "Chiến lược Marketing",
      note: JSON.stringify({ kind: "strategy_marketing", ...form, existingAssets: form.existingAssets }),
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

  const summaryText = buildStrategySummaryText(form, profile, planIds);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Chiến lược Marketing — ${form.companyName}`);
    const body = encodeURIComponent(summaryText);
    window.location.href = `mailto:${form.email}?subject=${subject}&body=${body}`;
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setActionMessage("Đã sao chép chiến lược vào clipboard.");
    } catch {
      setActionMessage("Không sao chép được. Vui lòng dùng Gửi Gmail.");
    }
  };

  if (!showStrategy) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#120a24] px-4 py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr,1.15fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-white lg:sticky lg:top-10">
              <Image src="/logo.png" alt="Logo" width={72} height={72} className="rounded-2xl" />
              <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
                Chiến lược <span className="text-violet-300">dành riêng</span> cho doanh nghiệp bạn
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-violet-100/80">
                Trả lời vài câu hỏi ngắn — hệ thống sẽ gợi ý lộ trình 3 giai đoạn, combo gói phù hợp ngành nghề và bảng báo giá chi tiết.
              </p>
            </motion.div>

            <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/95 p-6 shadow-2xl md:p-8">
              <p className="mb-5 flex items-center gap-2 text-sm font-bold text-violet-800"><Info size={16} /> Thông tin & mục tiêu</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500"><User size={14} className="inline" /> Họ và Tên *</span><input className={inputClass} value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} /></label>
                <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500"><Building2 size={14} className="inline" /> Tên công ty *</span><input className={inputClass} value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">SĐT *</span><input className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Gmail *</span><input type="email" className={inputClass} value={form.email} onChange={(e) => updateField("email", e.target.value)} /></label>
                <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500">Địa chỉ cơ sở *</span><input className={inputClass} value={form.address} onChange={(e) => updateField("address", e.target.value)} /></label>
                <div className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Ngành nghề *</span>
                  <input className={inputClass} value={form.industry} onChange={(e) => updateField("industry", e.target.value)} placeholder="VD: Nha khoa..." />
                  <div className="flex flex-wrap gap-2">{INDUSTRY_SUGGESTIONS.map((item) => (<button key={item} type="button" onClick={() => updateField("industry", item)} className={`rounded-full border px-3 py-1 text-[11px] font-bold ${form.industry === item ? "border-violet-500 bg-violet-600 text-white" : "border-violet-200 bg-violet-50 text-violet-700"}`}>{item}</button>))}</div>
                </div>
                <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500"><Target size={14} className="inline" /> Mục tiêu kinh doanh *</span>
                  <select className={selectClass} value={form.businessGoal} onChange={(e) => updateField("businessGoal", e.target.value)}>{BUSINESS_GOALS.map((g) => <option key={g} value={g}>{g}</option>)}</select>
                </label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Quy mô *</span>
                  <select className={selectClass} value={form.scale} onChange={(e) => updateField("scale", e.target.value)}>{SCALE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                </label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Ngân sách/tháng *</span>
                  <select className={selectClass} value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)}>{BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}</select>
                </label>
                <div className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Đã có gì? (chọn nếu có)</span>
                  <div className="flex flex-wrap gap-2">
                    {EXISTING_ASSET_OPTIONS.map((asset) => (
                      <button key={asset.id} type="button" onClick={() => toggleAsset(asset.id)} className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${form.existingAssets.includes(asset.id) ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>{asset.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">
                {submitting ? "Đang xử lý..." : "Xem chiến lược"} <ChevronRight size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    );
  }

  const compareItems = compareIds.map((id) => getPricingItemById(id)).filter(Boolean) as StrategyPricingItem[];

  return (
    <div className="min-h-screen bg-[#ece6f7] px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button type="button" onClick={() => setShowStrategy(false)} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><ArrowLeft size={14} /> Quay lại</button>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={sendEmail} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Send size={14} /> Gửi Gmail</button>
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Copy size={14} /> Sao chép</button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Printer size={14} /> In/PDF</button>
            <a href={`https://zalo.me/0901438703?msg=${encodeURIComponent(`Xin tư vấn chiến lược cho ${form.companyName} — ${form.industry}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-4 py-2 text-xs font-bold text-white"><MessageCircle size={14} /> Tư vấn Zalo</a>
          </div>
        </div>
        {actionMessage && <p className="mb-4 text-sm text-emerald-600 print:hidden">{actionMessage}</p>}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="border-b border-violet-100 bg-gradient-to-b from-white to-violet-50/40 px-6 py-8 text-center md:px-10">
            <Image src="/logo.png" alt="Logo" width={88} height={88} className="mx-auto" />
            <h1 className="mt-4 text-3xl font-black text-[#4c1d95] md:text-5xl">BỨT PHÁ MARKETING</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
              <strong className="text-violet-800">{form.companyName}</strong> · {form.industry} · {form.fullName} · {form.scale}
            </p>
            <p className="mx-auto mt-2 text-xs font-bold uppercase tracking-wide text-violet-600">{form.businessGoal} · {form.budgetRange}</p>
          </div>

          {/* Consultation blocks */}
          <div className="grid gap-4 border-b border-violet-100 bg-[#faf8ff] p-4 md:grid-cols-2 md:p-8">
            <div className="rounded-2xl border border-violet-100 bg-white p-5">
              <p className="flex items-center gap-2 text-sm font-black text-violet-800"><Sparkles size={16} /> Tư vấn cho {profile.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{profile.summary}</p>
              <ul className="mt-4 space-y-2">{whyBullets.map((b) => (<li key={b} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="shrink-0 text-emerald-500" />{b}</li>))}</ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <p className="flex items-center gap-2 text-xs font-black uppercase text-amber-800"><AlertTriangle size={14} /> Rủi ro nếu chưa triển khai</p>
                <ul className="mt-2 space-y-1">{profile.risks.map((r) => <li key={r} className="text-sm text-amber-900/80">• {r}</li>)}</ul>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs font-black uppercase text-emerald-800">Kết quả kỳ vọng</p>
                <ul className="mt-2 space-y-1">{profile.expectedResults.map((r) => <li key={r} className="text-sm text-emerald-900/80">• {r}</li>)}</ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="flex items-center gap-2 text-xs font-black uppercase text-slate-700"><ClipboardList size={14} /> Bạn cần chuẩn bị</p>
                <ul className="mt-2 space-y-1">{profile.clientPrep.map((r) => <li key={r} className="text-sm text-slate-600">• {r}</li>)}</ul>
              </div>
            </div>
          </div>

          {/* Phases + Combo */}
          <div className="border-b border-violet-100 p-4 md:p-8">
            <h2 className="text-lg font-black text-violet-900">Lộ trình 3 giai đoạn</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {profile.phases.map((phase, i) => (
                <div key={phase.title} className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                  <p className="text-[10px] font-black uppercase tracking-wide text-violet-600">Giai đoạn {i + 1} · {phase.duration}</p>
                  <h3 className="mt-1 font-black text-slate-800">{phase.title}</h3>
                  <p className="mt-1 text-xs font-bold text-violet-700">{phase.focus}</p>
                  <ul className="mt-3 space-y-1">{phase.tasks.map((t) => <li key={t} className="text-xs text-slate-600">• {t}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 text-white">
              <p className="text-xs font-black uppercase tracking-wide opacity-80">Combo đề xuất cho {form.companyName}</p>
              <p className="mt-1 text-lg font-black">{profile.comboLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {comboIds.map((id) => { const item = getPricingItemById(id); return item ? <span key={id} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{item.label} — {item.price}</span> : null; })}
              </div>
              <p className="mt-4 text-sm font-bold">
                Dự toán combo: Một lần {formatVnd(calculatePlanTotals(comboIds).once)} · Hàng tháng {formatVnd(calculatePlanTotals(comboIds).month)} · Hàng năm {formatVnd(calculatePlanTotals(comboIds).year)}
              </p>
              <p className="mt-2 text-xs opacity-80 italic">Case tham khảo: {profile.caseStudy.title} — {profile.caseStudy.result}</p>
            </div>
          </div>

          {/* Pricing toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-violet-100 bg-white px-4 py-3 md:px-8 print:hidden">
            <span className="text-xs font-bold text-slate-500">Lọc ngân sách:</span>
            {([["all", "Tất cả"], ["under5", "< 5tr/th"], ["5to15", "5–15tr/th"], ["over15", "> 15tr/th"]] as const).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setBudgetFilter(key)} className={`rounded-full px-3 py-1 text-[11px] font-bold ${budgetFilter === key ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600"}`}>{label}</button>
            ))}
            <span className="ml-auto flex items-center gap-1 text-xs font-bold text-violet-700"><ShoppingCart size={14} /> Kế hoạch: {planIds.length} gói</span>
          </div>

          {/* Compare panel */}
          {compareItems.length > 0 && (
            <div className="border-b border-indigo-100 bg-indigo-50/50 p-4 md:px-8 print:hidden">
              <p className="mb-3 flex items-center gap-2 text-sm font-black text-indigo-800"><GitCompare size={16} /> So sánh gói ({compareItems.length}/2)</p>
              <div className="grid gap-4 md:grid-cols-2">
                {compareItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-indigo-200 bg-white p-4">
                    <p className="font-black text-slate-800">{item.label}</p>
                    <p className="text-xl font-black text-indigo-600">{item.price}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.quantity}</p>
                    <ul className="mt-2 space-y-1">{item.works.map((w) => <li key={w} className="text-xs text-slate-600">• {w}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing grid */}
          <div className="grid gap-6 p-4 lg:grid-cols-[1fr,300px] lg:p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {STRATEGY_PRICING.map((column) => {
                const Icon = COLUMN_ICONS[column.id];
                const theme = COLUMN_THEME[column.id];
                return (
                  <div key={column.id}>
                    <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-2xl px-4 py-2.5 text-white" style={{ backgroundColor: theme.color }}>
                      <Icon size={18} /><span className="text-sm font-black">{column.title}</span>
                    </div>
                    <div className={`space-y-3 rounded-2xl border bg-gradient-to-b p-3 ${theme.border} ${theme.bg}`}>
                      {column.groups.map((group) => (
                        <div key={group.title} className="rounded-xl border border-white/80 bg-white/95 p-2">
                          <h3 className="mb-2 border-b border-slate-100 pb-1 text-center text-[10px] font-black uppercase text-slate-600">{group.title}</h3>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <PricingRow
                                key={item.id}
                                item={item}
                                accent={theme.color}
                                recommended={comboIds.includes(item.id)}
                                active={activeItem?.id === item.id}
                                dimmed={budgetFilter !== "all" && !itemFitsBudgetFilter(item.id, budgetFilter)}
                                inPlan={planIds.includes(item.id)}
                                inCompare={compareIds.includes(item.id)}
                                onSelect={() => setActiveItem(item)}
                                onTogglePlan={() => togglePlan(item.id)}
                                onToggleCompare={() => toggleCompare(item.id)}
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

            <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <AnimatePresence mode="wait">{activeItem && <DetailPanel key={activeItem.id} item={activeItem} />}</AnimatePresence>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-violet-900"><ShoppingCart size={16} /> Tổng kế hoạch đã chọn</p>
                <p className="mt-2 text-xs text-slate-600">Một lần: <strong>{formatVnd(planTotals.once)}</strong></p>
                <p className="text-xs text-slate-600">Hàng tháng: <strong>{formatVnd(planTotals.month)}</strong></p>
                <p className="text-xs text-slate-600">Hàng năm: <strong>{formatVnd(planTotals.year)}</strong></p>
                <button type="button" onClick={() => setPlanIds(comboIds)} className="mt-3 w-full rounded-xl border border-violet-300 py-2 text-xs font-bold text-violet-700">Dùng combo đề xuất</button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-black text-slate-800"><CalendarDays size={16} /> Timeline triển khai</p>
                <ul className="mt-3 space-y-2">{timeline.map((t) => (<li key={t.week} className="text-xs"><strong className="text-violet-700">{t.week}:</strong> {t.task}</li>))}</ul>
              </div>
            </div>
          </div>

          {/* Post-action CTA */}
          <div className="border-t border-violet-100 bg-gradient-to-r from-violet-700 to-fuchsia-600 p-6 text-center text-white print:hidden">
            <h3 className="text-lg font-black">Sẵn sàng triển khai cùng Bứt Phá Marketing?</h3>
            <p className="mt-2 text-sm opacity-90">Gửi chiến lược về email, in PDF hoặc chat Zalo để được tư vấn lộ trình riêng.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={sendEmail} className="rounded-full bg-white px-5 py-2.5 text-xs font-black text-violet-700"><Send size={14} className="inline" /> Gửi chiến lược qua Gmail</button>
              <a href={`https://zalo.me/0901438703?msg=${encodeURIComponent(`Tư vấn chiến lược: ${form.companyName}`)}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-black"><MessageCircle size={14} className="inline" /> Chat Zalo ngay</a>
            </div>
          </div>

          <div className="grid gap-4 border-t border-violet-100 bg-[#faf8ff] p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-6">
            {STRATEGY_FOOTER.map((item, index) => {
              const Icon = FOOTER_ICONS[index];
              return (
                <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700"><Icon size={20} /></div>
                  <div><p className="text-sm font-black text-violet-900">{item.title}</p><p className="text-[11px] text-slate-500">{item.subtitle}</p></div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
