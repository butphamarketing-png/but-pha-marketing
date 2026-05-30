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
  ArrowLeft,
  Facebook,
  Building2,
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
  Share2,
  ShoppingCart,
  GitCompare,
  X,
  TrendingUp,
  Layers,
  BadgeCheck,
  Zap,
} from "lucide-react";
import { db } from "@/lib/useData";
import { STRATEGY_FOOTER, STRATEGY_PRICING, type StrategyPricingItem } from "@/lib/marketing-strategy-pricing";
import { DOMAIN_COM_PRICE } from "@/lib/service-pricing";
import { IndustryAutocomplete } from "@/components/marketing/StrategyIndustryPreview";
import {
  FormNavButtons,
  FormStepIndicator,
  GoalCards,
  FormIntroPanel,
  PlatformFocusCards,
  OwnedChannelCards,
  DeploymentTimelinePanel,
  DraftRestoredBanner,
  RememberCookieToggle,
  FieldError,
  SharedPreviewBanner,
  FormProgressBar,
  TOTAL_FORM_STEPS,
} from "@/components/marketing/StrategyFormWizard";
import {
  StrategyActionPlanPanel,
  StrategyAdsAdviceBanner,
  StrategyCostBreakdown,
  StrategyKpiPanel,
  StrategyReadinessPanel,
  StrategyRoiPanel,
  StrategyTierComparison,
} from "@/components/marketing/StrategyUpgradePanels";
import {
  StrategyBenchmarkPanel,
  StrategyExecutiveSummary,
  StrategyMultiLocationPanel,
  StrategyWhatIfPanel,
  PricingDeepLink,
} from "@/components/marketing/StrategySmartPanels";
import { StrategyLocationPanel, StrategyLocationPreview } from "@/components/marketing/StrategyLocationPanel";
import { analyzeIndustryInput, getProfileShortLabel } from "@/lib/industry-intelligence";
import { buildFormProgress, buildDigitalReadiness, buildRoiEstimate } from "@/lib/strategy-intelligence";
import {
  clearStrategyDraft,
  hasStrategyDraftContent,
  loadRememberPreference,
  loadStrategyDraft,
  saveRememberPreference,
  saveStrategyDraft,
  type StrategyDraftSource,
} from "@/lib/strategy-storage";
import { buildStrategyShareUrl, decodeStrategyShare, isStrategyFormComplete, isStrategyViewReady, mergeSharedFormWithContact } from "@/lib/strategy-share";
import { readContactFromCookie } from "@/lib/strategy-cookies";
import { getContactFieldErrors, isContactStepValid, firstContactError } from "@/lib/strategy-validation";
import { analyzeBusinessLocation } from "@/lib/location-intelligence";
import {
  BUDGET_OPTIONS,
  BUSINESS_GOALS,
  PLATFORM_FOCUS_OPTIONS,
  SCALE_OPTIONS,
  buildDeploymentTimeline,
  buildRecommendedCombo,
  buildStrategySummaryText,
  buildWhyBullets,
  budgetFilterFromForm,
  calculatePlanTotals,
  formatVnd,
  getAllPricingItems,
  getBudgetFitAssessment,
  getIndustryCount,
  getPricingItemById,
  itemFitsBudgetFilter,
  resolveIndustryProfile,
  type BudgetFilter,
  type PlatformFocus,
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
  platformFocus: "strategy" as PlatformFocus,
  existingAssets: [],
};

const TRUST_STATS = [
  { icon: Layers, label: `${getIndustryCount()}+ ngành`, sub: "Theo masothue" },
  { icon: Zap, label: "Combo tự động", sub: "Theo ngân sách" },
  { icon: BadgeCheck, label: "Báo giá rõ", sub: "Minh bạch 100%" },
] as const;

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

function PhaseStepper({ phases }: { phases: { title: string; duration: string; focus: string }[] }) {
  return (
    <div className="relative mt-4">
      <div className="absolute left-4 right-4 top-5 hidden h-0.5 bg-violet-200 md:block" />
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((phase, i) => (
          <div key={phase.title} className="relative rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-black text-white shadow-md">
                {i + 1}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-violet-600">{phase.duration}</p>
                <p className="text-xs font-bold text-slate-500">Giai đoạn {i + 1}</p>
              </div>
            </div>
            <h3 className="font-black leading-snug text-slate-800">{phase.title.replace(/^Giai đoạn \d+ — /, "")}</h3>
            <p className="mt-1 text-xs font-bold text-violet-700">{phase.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetFitBar({ monthTotal, budgetRange }: { monthTotal: number; budgetRange: string }) {
  const fit = getBudgetFitAssessment(monthTotal, budgetRange);
  const barColor = fit.status === "good" ? "bg-emerald-500" : fit.status === "warning" ? "bg-amber-500" : "bg-red-500";
  const textColor = fit.status === "good" ? "text-emerald-700" : fit.status === "warning" ? "text-amber-700" : "text-red-700";

  return (
    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-black text-slate-700">
          <TrendingUp size={14} /> Mức phù hợp ngân sách
        </p>
        <span className={`text-[10px] font-black uppercase ${textColor}`}>
          {fit.status === "good" ? "Phù hợp" : fit.status === "warning" ? "Gần ngưỡng" : "Cần điều chỉnh"}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(fit.percentUsed, 100)}%` }} />
      </div>
      <p className={`mt-2 text-[11px] leading-relaxed ${textColor}`}>{fit.message}</p>
    </div>
  );
}

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
    <div className={`rounded-xl border transition ${dimmed ? "opacity-45" : "opacity-100"} ${active ? "border-violet-400 bg-violet-50 shadow-sm" : "border-slate-100 bg-white hover:border-violet-200"}`}>
      <div className="flex gap-2 p-2.5">
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            onClick={onTogglePlan}
            title="Thêm vào kế hoạch"
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black ${inPlan ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-violet-100 hover:text-violet-700"}`}
          >
            +
          </button>
          <button
            type="button"
            onClick={onToggleCompare}
            title="So sánh"
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${inCompare ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"}`}
          >
            <GitCompare size={14} />
          </button>
        </div>
        <button type="button" onClick={onSelect} className="min-w-0 flex-1 rounded-lg px-1 py-0.5 text-left transition hover:bg-violet-50/60">
          <div className="flex items-start gap-2.5">
            {GmIcon && (
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ backgroundColor: accent }}>
                <GmIcon size={15} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-bold leading-snug text-slate-800">{item.label}</span>
                {recommended && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-800">
                    Gợi ý
                  </span>
                )}
              </div>
              {item.quantity && <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{item.quantity}</p>}
              <p className="mt-1.5 text-base font-black leading-none" style={{ color: accent }}>
                {item.price}
              </p>
            </div>
          </div>
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
  const [pricingColumnTab, setPricingColumnTab] = useState<"website" | "fanpage" | "googlemaps">("website");
  const [formStep, setFormStep] = useState(1);
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | undefined>();
  const [draftSource, setDraftSource] = useState<StrategyDraftSource | undefined>();
  const [rememberEnabled, setRememberEnabled] = useState(true);
  const [storageReady, setStorageReady] = useState(false);
  const [sharedPreview, setSharedPreview] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [contactTouched, setContactTouched] = useState(false);

  useEffect(() => {
    setRememberEnabled(loadRememberPreference());

    const params = new URLSearchParams(window.location.search);
    const shared = params.get("s");
    const isViewMode = params.get("view") === "1";

    if (shared) {
      const sharedForm = decodeStrategyShare(shared);
      if (sharedForm) {
        const merged = mergeSharedFormWithContact(sharedForm, readContactFromCookie());
        setForm(merged);
        setDraftRestored(true);
        if (isViewMode && isStrategyViewReady(merged)) {
          setShowStrategy(true);
          setSharedPreview(true);
          setLeadCaptured(isStrategyFormComplete(merged));
        }
        setStorageReady(true);
        return;
      }
    }

    const loaded = loadStrategyDraft();
    if (loaded) {
      setForm(loaded.draft.form);
      setFormStep(loaded.draft.step);
      setDraftRestored(true);
      setDraftSavedAt(loaded.draft.savedAt);
      setDraftSource(loaded.source);
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady || !rememberEnabled) return;
    saveStrategyDraft(form, formStep);
    if (hasStrategyDraftContent(form)) {
      setDraftSavedAt(new Date().toISOString());
    }
  }, [form, formStep, storageReady, rememberEnabled]);

  useEffect(() => {
    if (!actionMessage) return;
    const timer = window.setTimeout(() => setActionMessage(null), 4500);
    return () => window.clearTimeout(timer);
  }, [actionMessage]);

  const handleRememberChange = (enabled: boolean) => {
    setRememberEnabled(enabled);
    saveRememberPreference(enabled);
    if (!enabled) {
      clearStrategyDraft();
      setDraftRestored(false);
      setDraftSavedAt(undefined);
      setDraftSource(undefined);
    } else if (hasStrategyDraftContent(form)) {
      saveStrategyDraft(form, formStep);
      setDraftSavedAt(new Date().toISOString());
    }
  };

  const profile = useMemo(() => resolveIndustryProfile(form.industry), [form.industry]);
  const industryAnalysis = useMemo(
    () => analyzeIndustryInput(form.industry, form),
    [form.industry, form.businessGoal, form.scale, form.budgetRange, form.existingAssets],
  );
  const comboRecommendation = useMemo(
    () => buildRecommendedCombo(profile, form),
    [profile, form.businessGoal, form.scale, form.budgetRange, form.existingAssets],
  );
  const comboIds = comboRecommendation.itemIds;
  const whyBullets = useMemo(() => buildWhyBullets(profile, form.businessGoal, form.existingAssets), [profile, form.businessGoal, form.existingAssets]);
  const planTotals = useMemo(() => calculatePlanTotals(planIds.length ? planIds : comboIds), [planIds, comboIds]);
  const timeline = useMemo(() => buildDeploymentTimeline(planIds.length || comboIds.length), [planIds.length, comboIds.length]);
  const planItems = useMemo(
    () => (planIds.length ? planIds : comboIds).map((id) => getPricingItemById(id)).filter(Boolean) as StrategyPricingItem[],
    [planIds, comboIds],
  );
  const formProgress = useMemo(() => buildFormProgress(form), [form]);
  const contactErrors = useMemo(() => getContactFieldErrors(form), [form]);

  const step1Valid = isContactStepValid(form);
  const step2Valid = form.industry.trim().length >= 2 && !!form.businessGoal;
  const step3Valid = !!form.platformFocus;
  const step4Valid = !!form.scale && !!form.budgetRange;
  const canAdvance =
    formStep === 1 ? step1Valid : formStep === 2 ? step2Valid : formStep === 3 ? step3Valid : step4Valid;

  useEffect(() => {
    if (!showStrategy) return;
    setBudgetFilter(budgetFilterFromForm(form.budgetRange));
    setPlanIds(comboIds);
    const first = getPricingItemById(comboIds[0]) || getAllPricingItems()[0];
    setActiveItem(first);
  }, [showStrategy]);

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

  const removeFromPlan = (id: string) => {
    setPlanIds((prev) => prev.filter((x) => x !== id));
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (submitting) return;

    if (!step1Valid || !step2Valid || !step3Valid || !step4Valid) {
      if (formStep === 1) setContactTouched(true);
      setError(
        formStep === 1
          ? firstContactError(form) ?? "Vui lòng kiểm tra lại thông tin liên hệ."
          : formStep === 2
            ? "Vui lòng chọn ngành nghề và mục tiêu."
            : formStep === 3
              ? "Vui lòng chọn nền tảng ưu tiên."
              : "Vui lòng chọn quy mô và ngân sách.",
      );
      return;
    }

    setSubmitting(true);
    const totals = calculatePlanTotals(comboIds);
    const result = await db.leads.add({
      type: "contact",
      name: form.fullName.trim(),
      phone: form.phone.trim(),
      service: "Chiến lược Marketing",
      note: JSON.stringify({
        kind: "strategy_marketing",
        ...form,
        existingAssets: form.existingAssets,
        tierLabel: comboRecommendation.tierLabel,
        monthTotal: totals.month,
        setupTotal: totals.once,
        itemCount: comboIds.length,
      }),
      platform: "chienluocmarketing",
    });
    setSubmitting(false);

    if (result.error) {
      setError("Không lưu được thông tin. Vui lòng thử lại.");
      return;
    }
    saveStrategyDraft(form, formStep);
    setLeadCaptured(true);
    setSharedPreview(false);
    setShowStrategy(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const summaryText = useMemo(() => {
    const base = buildStrategySummaryText(form, profile, planIds);
    const extras: string[] = [];
    if (industryAnalysis.suggestion?.vsicCode) {
      extras.push(`Mã VSIC: ${industryAnalysis.suggestion.vsicCode}`);
    }
    if (industryAnalysis.confidence > 0) {
      extras.push(`Độ khớp ngành: ${industryAnalysis.confidenceLabel} (${industryAnalysis.confidence}%)`);
    }
    if (industryAnalysis.insight) {
      extras.push(`Ghi chú AI: ${industryAnalysis.insight}`);
    }
    const readiness = buildDigitalReadiness(profile.id, form.existingAssets);
    extras.push(`Điểm sẵn sàng số: ${readiness.score}/100 (${readiness.grade})`);
    if (readiness.gaps.length) {
      extras.push(`Cần bổ sung: ${readiness.gaps.map((g) => g.label).join(", ")}`);
    }
    const roi = buildRoiEstimate(profile, form, planIds.length ? planIds : comboIds);
    extras.push(`ROI ước tính: ${roi.estimatedRoi >= 0 ? "+" : ""}${roi.estimatedRoi}% · ~${roi.monthlyLeads} lead/th · CPL ${formatVnd(roi.costPerLead)}`);
    const loc = analyzeBusinessLocation(form.address, form.scale, profile, form.businessGoal);
    if (loc) {
      extras.push(`Khu vực: ${loc.breadthLabel} · Bán kính ${loc.catchmentRange}`);
      extras.push(`Tệp khách: ${loc.targetAudiences.map((a) => a.segment).join("; ")}`);
    }
    return extras.length ? `${base}\n\n${extras.join("\n")}` : base;
  }, [form, profile, planIds, industryAnalysis, comboIds]);

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

  const copyShareLink = async () => {
    try {
      const url = buildStrategyShareUrl(form, { view: true });
      await navigator.clipboard.writeText(url);
      setActionMessage("Đã sao chép link chiến lược (không chứa SĐT/email) — an toàn để gửi khách.");
    } catch {
      setActionMessage("Không sao chép được link.");
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
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {TRUST_STATS.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                    <Icon size={18} className="text-violet-300" />
                    <p className="mt-2 text-sm font-black">{label}</p>
                    <p className="text-[11px] text-violet-200/70">{sub}</p>
                  </div>
                ))}
              </div>
              <FormIntroPanel />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/95 p-6 shadow-2xl md:p-8">
              {draftRestored && (
                <DraftRestoredBanner
                  savedAt={draftSavedAt}
                  source={draftSource}
                  onClear={() => {
                    clearStrategyDraft();
                    setForm(initialForm);
                    setFormStep(1);
                    setDraftRestored(false);
                    setDraftSavedAt(undefined);
                    setDraftSource(undefined);
                  }}
                />
              )}
              <FormProgressBar percent={formProgress.percent} />
              <FormStepIndicator currentStep={formStep} />
              <p className="mb-5 flex items-center gap-2 text-sm font-bold text-violet-800">
                <Info size={16} />
                {formStep === 1
                  ? "Bước 1 — Thông tin liên hệ"
                  : formStep === 2
                    ? "Bước 2 — Ngành nghề & mục tiêu"
                    : formStep === 3
                      ? "Bước 3 — Nền tảng & tài sản hiện có"
                      : "Bước 4 — Quy mô & ngân sách"}
              </p>

              {formStep === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <RememberCookieToggle enabled={rememberEnabled} onChange={handleRememberChange} />
                  </div>
                  <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500"><User size={14} className="inline" /> Họ và Tên *</span><input className={inputClass} value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} onBlur={() => setContactTouched(true)} autoComplete="name" /><FieldError message={contactTouched ? contactErrors.fullName : null} /></label>
                  <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500"><Building2 size={14} className="inline" /> Tên công ty *</span><input className={inputClass} value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} onBlur={() => setContactTouched(true)} autoComplete="organization" /><FieldError message={contactTouched ? contactErrors.companyName : null} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">SĐT *</span><input className={inputClass} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} onBlur={() => setContactTouched(true)} autoComplete="tel" inputMode="tel" /><FieldError message={contactTouched ? contactErrors.phone : null} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Gmail *</span><input type="email" className={inputClass} value={form.email} onChange={(e) => updateField("email", e.target.value)} onBlur={() => setContactTouched(true)} autoComplete="email" /><FieldError message={contactTouched ? contactErrors.email : null} /></label>
                  <label className="space-y-2 sm:col-span-2"><span className="text-xs font-bold uppercase text-slate-500">Địa chỉ cơ sở *</span><input className={inputClass} value={form.address} onChange={(e) => updateField("address", e.target.value)} onBlur={() => setContactTouched(true)} autoComplete="street-address" placeholder="VD: 123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP. Hồ Chí Minh" /><FieldError message={contactTouched ? contactErrors.address : null} /></label>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-500">Ngành nghề *</span>
                    <IndustryAutocomplete value={form.industry} onChange={(v) => updateField("industry", v)} inputClass={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-500"><Target size={14} className="inline" /> Mục tiêu kinh doanh *</span>
                    <GoalCards value={form.businessGoal} onChange={(g) => updateField("businessGoal", g)} />
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6">
                  <PlatformFocusCards
                    value={form.platformFocus}
                    onChange={(focus) => updateField("platformFocus", focus)}
                  />
                  <OwnedChannelCards ownedIds={form.existingAssets} onToggle={toggleAsset} />
                </div>
              )}

              {formStep === 4 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Quy mô *</span>
                    <select className={selectClass} value={form.scale} onChange={(e) => updateField("scale", e.target.value)}>{SCALE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                  </label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-500">Ngân sách/tháng *</span>
                    <select className={selectClass} value={form.budgetRange} onChange={(e) => updateField("budgetRange", e.target.value)}>{BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}</select>
                  </label>
                  <p className="sm:col-span-2 rounded-xl border border-violet-100 bg-violet-50/80 px-3 py-2 text-[11px] text-violet-700">
                    Sau bước này hệ thống sẽ hiển thị chiến lược, báo giá từng kênh và timeline triển khai chi tiết.
                  </p>
                </div>
              )}

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
              <FormNavButtons
                step={formStep}
                totalSteps={TOTAL_FORM_STEPS}
                canNext={canAdvance}
                submitting={submitting}
                onBack={() => { setFormStep((s) => s - 1); setError(null); }}
                onNext={() => {
                  if (!canAdvance) {
                    if (formStep === 1) {
                      setContactTouched(true);
                      setError(firstContactError(form) ?? "Vui lòng điền đủ thông tin liên hệ.");
                    } else if (formStep === 2) {
                      setError("Vui lòng chọn ngành nghề và mục tiêu.");
                    } else if (formStep === 3) {
                      setError("Vui lòng chọn nền tảng ưu tiên.");
                    } else {
                      setError("Vui lòng chọn quy mô và ngân sách.");
                    }
                    return;
                  }
                  setError(null);
                  setFormStep((s) => s + 1);
                }}
                onSubmit={() => handleSubmit()}
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const compareItems = compareIds.map((id) => getPricingItemById(id)).filter(Boolean) as StrategyPricingItem[];

  return (
    <div className="min-h-screen bg-[#ece6f7] px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button type="button" onClick={() => setShowStrategy(false)} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><ArrowLeft size={14} /> Quay lại</button>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyShareLink} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Share2 size={14} /> Chia sẻ link</button>
            <button type="button" onClick={sendEmail} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Send size={14} /> Gửi Gmail</button>
            <button type="button" onClick={copySummary} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Copy size={14} /> Sao chép</button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold text-violet-700"><Printer size={14} /> In/PDF</button>
            <a href={`https://zalo.me/0901438703?msg=${encodeURIComponent(`Xin tư vấn chiến lược — ${form.companyName} · ${form.industry} · ${form.budgetRange}\n${buildStrategyShareUrl(form, { view: true })}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-4 py-2 text-xs font-bold text-white"><MessageCircle size={14} /> Tư vấn Zalo</a>
          </div>
        </div>
        {sharedPreview && !leadCaptured && (
          <SharedPreviewBanner
            onCompleteContact={() => {
              setShowStrategy(false);
              setFormStep(1);
              setContactTouched(true);
            }}
          />
        )}
        {actionMessage && <p className="mb-4 text-sm text-emerald-600 print:hidden">{actionMessage}</p>}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-violet-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="border-b border-violet-100 bg-gradient-to-b from-white to-violet-50/40 px-6 py-8 text-center md:px-10">
            <Image src="/logo.png" alt="Logo" width={88} height={88} className="mx-auto" />
            <h1 className="mt-4 text-3xl font-black text-[#4c1d95] md:text-5xl">BỨT PHÁ MARKETING</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
              <strong className="text-violet-800">{form.companyName}</strong> · {industryAnalysis.suggestion?.label ?? form.industry} · {form.fullName} · {form.scale}
            </p>
            <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-black text-violet-700">
                {getProfileShortLabel(profile.id)}
              </span>
              {industryAnalysis.confidence > 0 && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700">
                  {industryAnalysis.confidenceLabel} {industryAnalysis.confidence}%
                </span>
              )}
              {industryAnalysis.suggestion?.vsicCode && (
                <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-bold text-slate-600">
                  VSIC {industryAnalysis.suggestion.vsicCode}
                </span>
              )}
            </div>
            <p className="mx-auto mt-2 max-w-xl text-[11px] leading-relaxed text-slate-500">{industryAnalysis.insight}</p>
            <p className="mx-auto mt-2 text-xs font-bold uppercase tracking-wide text-violet-600">
              {form.businessGoal} · {PLATFORM_FOCUS_OPTIONS.find((o) => o.id === form.platformFocus)?.label ?? "Chiến lược"} · {form.budgetRange}
            </p>
            {(() => {
              const loc = analyzeBusinessLocation(form.address, form.scale, profile, form.businessGoal);
              if (!loc) return null;
              return (
                <p className="mx-auto mt-2 max-w-xl text-[11px] text-indigo-700">
                  📍 {loc.city ?? "Khu vực"} · {loc.breadthLabel} · {loc.catchmentRange}
                </p>
              );
            })()}
          </div>

          {/* KPI summary */}
          <div className="grid grid-cols-2 gap-3 border-b border-violet-100 bg-white p-4 md:grid-cols-4 md:p-6">
            {[
              { label: "Gói đề xuất", value: comboRecommendation.tierLabel, sub: `${planItems.length} dịch vụ` },
              { label: "Chi phí một lần", value: formatVnd(planTotals.once), sub: "Setup & xây dựng" },
              { label: "Chi phí / tháng", value: formatVnd(planTotals.month), sub: "Chăm sóc & ads" },
              { label: "Chi phí / năm", value: formatVnd(planTotals.year), sub: "Hosting & data" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-wide text-violet-600">{kpi.label}</p>
                <p className="mt-1 text-lg font-black text-slate-900 md:text-xl">{kpi.value}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{kpi.sub}</p>
              </div>
            ))}
          </div>

          <div className="border-b border-violet-100 p-4 md:p-8">
            <StrategyExecutiveSummary
              profile={profile}
              form={form}
              confidence={industryAnalysis.confidence}
              itemIds={planIds.length ? planIds : comboIds}
            />
          </div>

          {/* Smart strategy panels */}
          <div className="space-y-4 border-b border-violet-100 bg-[#faf8ff] p-4 md:p-8 print:hidden">
            <StrategyAdsAdviceBanner profileId={profile.id} form={form} />
            <div className="grid gap-4 lg:grid-cols-2">
              <StrategyBenchmarkPanel profileId={profile.id} existingAssets={form.existingAssets} />
              <StrategyLocationPanel form={form} profile={profile} />
            </div>
            <StrategyWhatIfPanel
              profile={profile}
              form={form}
              onApplyAssets={(assets) => {
                setForm((prev) => ({ ...prev, existingAssets: assets }));
                setActionMessage("Đã áp dụng kịch bản — combo tính lại theo tài sản mới.");
              }}
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <StrategyReadinessPanel profileId={profile.id} existingAssets={form.existingAssets} />
              <StrategyKpiPanel profile={profile} form={form} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <StrategyCostBreakdown itemIds={planIds.length ? planIds : comboIds} />
              <StrategyRoiPanel profile={profile} form={form} itemIds={planIds.length ? planIds : comboIds} />
            </div>
            <StrategyTierComparison profile={profile} form={form} onSelectTier={setPlanIds} />
            <StrategyMultiLocationPanel
              form={form}
              mapsSetupOnce={comboRecommendation.mapsStack?.setupOnce ?? null}
              baseMonthTotal={planTotals.month}
            />
            <StrategyActionPlanPanel profile={profile} form={form} combo={comboRecommendation} />
          </div>

          {/* Consultation blocks */}
          <div className="grid gap-4 border-b border-violet-100 bg-[#faf8ff] p-4 md:grid-cols-2 md:p-8">
            <div className="rounded-2xl border border-violet-100 bg-white p-5">
              <p className="flex items-center gap-2 text-sm font-black text-violet-800"><Sparkles size={16} /> Tư vấn cho {profile.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{profile.summary}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {industryAnalysis.channels.filter((ch) => ch.active).map((ch) => (
                  <div key={ch.id} className="rounded-xl border border-violet-100 bg-violet-50/50 px-3 py-2">
                    <p className="text-[10px] font-black uppercase text-violet-700">{ch.label}</p>
                    <p className="text-[10px] font-bold text-amber-500">{"★".repeat(ch.stars)}{"☆".repeat(3 - ch.stars)}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500">{ch.reason}</p>
                  </div>
                ))}
              </div>
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
            <PhaseStepper phases={profile.phases} />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {profile.phases.map((phase) => (
                <div key={`tasks-${phase.title}`} className="rounded-xl border border-violet-100 bg-violet-50/30 p-3">
                  <p className="text-[10px] font-black uppercase text-violet-600">{phase.focus}</p>
                  <ul className="mt-2 space-y-1">
                    {phase.tasks.map((t) => (
                      <li key={t} className="text-xs text-slate-600">• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wide">
                  {comboRecommendation.tierLabel}
                </span>
                <p className="text-xs font-black uppercase tracking-wide opacity-80">Combo đề xuất cho {form.companyName}</p>
              </div>
              <p className="mt-2 text-lg font-black">{comboRecommendation.label}</p>
              <ul className="mt-3 space-y-1">
                {comboRecommendation.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2 text-xs opacity-90">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {comboIds.map((id) => { const item = getPricingItemById(id); return item ? <span key={id} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{item.label} — {item.price}</span> : null; })}
              </div>
              <p className="mt-4 text-sm font-bold">
                Dự toán combo: Một lần {formatVnd(calculatePlanTotals(comboIds).once)} · Hàng tháng {formatVnd(calculatePlanTotals(comboIds).month)} · Hàng năm {formatVnd(calculatePlanTotals(comboIds).year)}
              </p>
              <div className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs opacity-90 print:hidden">
                {getBudgetFitAssessment(calculatePlanTotals(comboIds).month, form.budgetRange).message}
              </div>
              <p className="mt-2 text-xs opacity-80 italic">Case tham khảo: {profile.caseStudy.title} — {profile.caseStudy.result}</p>
            </div>

            {comboRecommendation.websiteStack && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
                <p className="flex items-center gap-2 text-sm font-black text-emerald-800">
                  <Globe size={16} /> Tư vấn Website (khớp bảng giá /website)
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Thiết kế", value: comboRecommendation.websiteStack.buildName, price: comboRecommendation.websiteStack.buildPrice },
                    { label: "Hosting/năm", value: `${comboRecommendation.websiteStack.hostingGb}GB`, price: comboRecommendation.websiteStack.hostingPrice, sub: comboRecommendation.websiteStack.hostingLabel },
                    { label: "Tên miền .com", value: "1 năm", price: DOMAIN_COM_PRICE },
                    { label: "Chăm sóc/tháng", value: `${comboRecommendation.websiteStack.carePosts} bài SEO`, price: comboRecommendation.websiteStack.carePrice },
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl border border-emerald-100 bg-white p-3">
                      <p className="text-[10px] font-black uppercase text-emerald-600">{row.label}</p>
                      <p className="mt-0.5 text-sm font-bold text-slate-800">{row.value}</p>
                      {"sub" in row && row.sub && <p className="text-[10px] text-slate-500">{row.sub}</p>}
                      <p className="mt-1 text-base font-black text-emerald-700">{formatVnd(row.price)}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs font-bold text-slate-600">
                  Năm đầu (setup): {formatVnd(comboRecommendation.websiteStack.firstYearSetup)} · Duy trì content web: {formatVnd(comboRecommendation.websiteStack.monthlyRecurring)}/tháng
                </p>
                <PricingDeepLink channel="website" />
              </div>
            )}

            {comboRecommendation.fanpageStack && (
              <div className="mt-4 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
                <p className="flex items-center gap-2 text-sm font-black text-blue-800">
                  <Facebook size={16} /> Tư vấn Fanpage (khớp bảng giá /facebook)
                </p>
                <p className="mt-1 text-[11px] font-bold text-blue-600">
                  Công thức: 150.000đ × số bài/tháng — kéo slider 10–60 trên /facebook
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {comboRecommendation.fanpageStack.careAlternatives.map((tier) => (
                    <div
                      key={tier.posts}
                      className={`rounded-xl border p-3 text-center transition ${tier.selected ? "border-blue-500 bg-blue-100 ring-2 ring-blue-300" : "border-blue-100 bg-white opacity-75"}`}
                    >
                      <p className="text-[10px] font-black uppercase text-blue-600">{tier.label}</p>
                      <p className="mt-1 text-2xl font-black text-slate-800">{tier.posts}</p>
                      <p className="text-[10px] font-bold text-slate-500">bài/tháng</p>
                      <p className="mt-1 text-sm font-black text-blue-700">{formatVnd(tier.price)}</p>
                      <p className="text-[9px] text-slate-400">{tier.posts} × 150.000đ</p>
                      {tier.selected && (
                        <span className="mt-1 inline-block rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-black text-white">Đề xuất</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ...(comboRecommendation.fanpageStack.buildName
                      ? [{ label: "Setup Fanpage", value: comboRecommendation.fanpageStack.buildName, price: comboRecommendation.fanpageStack.buildPrice }]
                      : []),
                    {
                      label: "Chăm sóc/tháng",
                      value: `${comboRecommendation.fanpageStack.carePosts} bài · ${comboRecommendation.fanpageStack.careTierLabel}`,
                      price: comboRecommendation.fanpageStack.carePrice,
                    },
                    ...(comboRecommendation.fanpageStack.adsName
                      ? [{ label: "Quảng cáo FB", value: comboRecommendation.fanpageStack.adsName, price: comboRecommendation.fanpageStack.adsPrice }]
                      : []),
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl border border-blue-100 bg-white p-3">
                      <p className="text-[10px] font-black uppercase text-blue-600">{row.label}</p>
                      <p className="mt-0.5 text-sm font-bold text-slate-800">{row.value}</p>
                      <p className="mt-1 text-base font-black text-blue-700">
                        {formatVnd(row.price)}
                        {row.label.includes("Quảng cáo") || row.label.includes("Chăm sóc") ? "/tháng" : ""}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs font-bold text-slate-600">
                  Setup: {formatVnd(comboRecommendation.fanpageStack.setupOnce)} · Duy trì Fanpage: {formatVnd(comboRecommendation.fanpageStack.monthlyRecurring)}/tháng
                </p>
                <PricingDeepLink channel="fanpage" />
              </div>
            )}

            {comboRecommendation.mapsStack && (
              <div className="mt-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5">
                <p className="flex items-center gap-2 text-sm font-black text-orange-800">
                  <MapPin size={16} /> Tư vấn Google Maps (khớp bảng giá /google-maps)
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Dịch vụ Maps", value: comboRecommendation.mapsStack.serviceName, price: comboRecommendation.mapsStack.servicePrice },
                    ...(comboRecommendation.mapsStack.adsName
                      ? [{ label: "Quảng cáo Local", value: comboRecommendation.mapsStack.adsName, price: comboRecommendation.mapsStack.adsPrice }]
                      : []),
                  ].map((row) => (
                    <div key={row.label} className="rounded-xl border border-orange-100 bg-white p-3">
                      <p className="text-[10px] font-black uppercase text-orange-600">{row.label}</p>
                      <p className="mt-0.5 text-sm font-bold text-slate-800">{row.value}</p>
                      <p className="mt-1 text-base font-black text-orange-700">{formatVnd(row.price)}{row.label.includes("Quảng cáo") ? "/tháng" : ""}</p>
                    </div>
                  ))}
                </div>
                {comboRecommendation.mapsStack.multiLocationNote && (
                  <p className="mt-3 flex items-start gap-2 text-xs font-bold text-orange-700">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    {comboRecommendation.mapsStack.multiLocationNote}
                  </p>
                )}
                <p className="mt-3 text-xs font-bold text-slate-600">
                  Setup Maps: {formatVnd(comboRecommendation.mapsStack.setupOnce)}
                  {comboRecommendation.mapsStack.monthlyRecurring > 0 && ` · Quảng cáo: ${formatVnd(comboRecommendation.mapsStack.monthlyRecurring)}/tháng`}
                </p>
                <PricingDeepLink channel="maps" />
              </div>
            )}
          </div>

          {/* Pricing toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-violet-100 bg-white px-4 py-3 md:px-8 print:hidden">
            <span className="text-xs font-bold text-slate-500">Lọc ngân sách:</span>
            {([["all", "Tất cả"], ["under5", "< 5tr/th"], ["5to15", "5–15tr/th"], ["over15", "> 15tr/th"]] as const).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setBudgetFilter(key)} className={`rounded-full px-3 py-1 text-[11px] font-bold ${budgetFilter === key ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600"}`}>{label}</button>
            ))}
            <span className="text-[10px] font-bold text-emerald-600">✓ Giá đồng bộ /website · /facebook · /google-maps</span>
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
          <div className="grid gap-8 p-4 xl:grid-cols-[minmax(0,1fr),380px] xl:p-8">
            <div>
              <div className="mb-4 flex gap-2 lg:hidden">
                {STRATEGY_PRICING.map((column) => {
                  const Icon = COLUMN_ICONS[column.id];
                  const theme = COLUMN_THEME[column.id];
                  const active = pricingColumnTab === column.id;
                  return (
                    <button
                      key={column.id}
                      type="button"
                      onClick={() => setPricingColumnTab(column.id)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[11px] font-black uppercase transition ${active ? "text-white shadow-md" : "border border-slate-200 bg-white text-slate-600"}`}
                      style={active ? { backgroundColor: theme.color } : undefined}
                    >
                      <Icon size={14} />
                      {column.title}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                {STRATEGY_PRICING.map((column) => {
                  const Icon = COLUMN_ICONS[column.id];
                  const theme = COLUMN_THEME[column.id];
                  const hiddenOnMobile = pricingColumnTab !== column.id;
                  return (
                    <div key={column.id} className={`min-w-0 print:block ${hiddenOnMobile ? "hidden lg:block" : ""}`}>
                      <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-2xl px-5 py-3 text-white shadow-sm" style={{ backgroundColor: theme.color }}>
                        <Icon size={20} />
                        <span className="text-sm font-black tracking-wide">{column.title}</span>
                      </div>
                      <div className={`space-y-4 rounded-2xl border bg-gradient-to-b p-4 ${theme.border} ${theme.bg}`}>
                        {column.groups.map((group) => (
                          <div key={group.title} className="rounded-xl border border-white/90 bg-white p-3 shadow-sm">
                            <h3 className="mb-3 border-b border-slate-100 pb-2 text-center text-[11px] font-black uppercase leading-snug text-slate-600">
                              {group.title}
                            </h3>
                            <div className="space-y-2">
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
            </div>

            <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
              <AnimatePresence mode="wait">{activeItem && <DetailPanel key={activeItem.id} item={activeItem} />}</AnimatePresence>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <p className="flex items-center gap-2 text-sm font-black text-violet-900"><ShoppingCart size={16} /> Tổng kế hoạch đã chọn</p>
                <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                  {planItems.map((item) => (
                    <li key={item.id} className="flex items-start justify-between gap-2 rounded-lg bg-white px-2.5 py-2 text-xs">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800">{item.label}</p>
                        <p className="font-black text-violet-700">{item.price}</p>
                      </div>
                      {planIds.length > 0 && (
                        <button type="button" onClick={() => removeFromPlan(item.id)} className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 print:hidden" title="Bỏ gói">
                          <X size={14} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-violet-200 pt-3">
                  <p className="text-xs text-slate-600">Một lần: <strong>{formatVnd(planTotals.once)}</strong></p>
                  <p className="text-xs text-slate-600">Hàng tháng: <strong>{formatVnd(planTotals.month)}</strong></p>
                  <p className="text-xs text-slate-600">Hàng năm: <strong>{formatVnd(planTotals.year)}</strong></p>
                </div>
                <BudgetFitBar monthTotal={planTotals.month} budgetRange={form.budgetRange} />
                <button type="button" onClick={() => setPlanIds(comboIds)} className="mt-3 w-full rounded-xl border border-violet-300 py-2 text-xs font-bold text-violet-700 print:hidden">Dùng combo đề xuất</button>
              </div>
              <DeploymentTimelinePanel timeline={timeline} />
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

          <div className="grid gap-4 border-t border-violet-100 bg-[#faf8ff] p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-6 print:hidden">
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

          <div className="hidden print:block border-t border-slate-300 p-6 text-sm text-slate-900">
            <p className="text-xs font-black uppercase text-violet-700">Bản in chiến lược marketing</p>
            <h2 className="mt-1 text-xl font-black">{form.companyName}</h2>
            <p className="mt-1 text-slate-600">{form.fullName} · {form.phone} · {form.email}</p>
            <p className="mt-1 text-slate-600">{industryAnalysis.suggestion?.label ?? form.industry} · {form.businessGoal} · {form.budgetRange}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <p><strong>Gói:</strong> {comboRecommendation.tierLabel}</p>
              <p><strong>Dịch vụ:</strong> {planItems.length} gói</p>
              <p><strong>Setup:</strong> {formatVnd(planTotals.once)}</p>
              <p><strong>Hàng tháng:</strong> {formatVnd(planTotals.month)}</p>
            </div>
            <p className="mt-4 text-xs leading-relaxed whitespace-pre-wrap">{summaryText}</p>
            <p className="mt-6 text-[10px] text-slate-500">butphamarketing.com · Hotline/Zalo 0901438703</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
