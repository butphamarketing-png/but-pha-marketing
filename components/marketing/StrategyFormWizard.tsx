"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Heart,
  Sparkles,
  TrendingUp,
  UserPlus,
  Wallet,
} from "lucide-react";
import { buildLiveStrategyPreview, getProfileShortLabel } from "@/lib/industry-intelligence";
import {
  BUDGET_OPTIONS,
  BUSINESS_GOALS,
  buildRecommendedCombo,
  calculatePlanTotals,
  formatVnd,
  getBudgetFitAssessment,
  resolveIndustryProfile,
} from "@/lib/marketing-strategy-profiles";
import type { StrategyFormSnapshot } from "@/lib/marketing-strategy-profiles";
import { buildDigitalReadiness } from "@/lib/strategy-intelligence";
import { formatDraftSavedAt } from "@/lib/strategy-storage";

export const FORM_STEPS = [
  { step: 1, label: "Liên hệ", desc: "Thông tin cơ bản" },
  { step: 2, label: "Ngành & mục tiêu", desc: "AI tư vấn sơ bộ" },
  { step: 3, label: "Ngân sách", desc: "Chốt combo gói" },
] as const;

const GOAL_META: Record<string, { icon: typeof UserPlus; hint: string; color: string }> = {
  "Tăng khách hàng mới": {
    icon: UserPlus,
    hint: "Maps, ads & inbox — kéo lead nhanh",
    color: "border-emerald-400 bg-emerald-50 text-emerald-800",
  },
  "Tăng doanh thu": {
    icon: TrendingUp,
    hint: "Chuyển đổi web + remarketing",
    color: "border-blue-400 bg-blue-50 text-blue-800",
  },
  "Xây dựng thương hiệu": {
    icon: Sparkles,
    hint: "Content & showcase trước ads",
    color: "border-violet-400 bg-violet-50 text-violet-800",
  },
  "Giữ chân khách cũ": {
    icon: Heart,
    hint: "Nuôi content, CSKH & review",
    color: "border-rose-400 bg-rose-50 text-rose-800",
  },
};

export function FormStepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2">
        {FORM_STEPS.map(({ step, label, desc }, i) => {
          const active = currentStep === step;
          const done = currentStep > step;
          return (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                    active
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md"
                      : done
                        ? "bg-emerald-500 text-white"
                        : "bg-violet-100 text-violet-400"
                  }`}
                >
                  {done ? "✓" : step}
                </span>
                <p className={`mt-1.5 truncate text-[10px] font-black uppercase ${active ? "text-violet-800" : "text-slate-400"}`}>
                  {label}
                </p>
                <p className="hidden truncate text-[9px] text-slate-400 sm:block">{desc}</p>
              </div>
              {i < FORM_STEPS.length - 1 && (
                <div className={`mb-5 hidden h-0.5 flex-1 sm:block ${done ? "bg-emerald-300" : "bg-violet-100"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GoalCards({
  value,
  onChange,
}: {
  value: string;
  onChange: (goal: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {BUSINESS_GOALS.map((goal) => {
        const meta = GOAL_META[goal] ?? GOAL_META["Tăng khách hàng mới"];
        const Icon = meta.icon;
        const selected = value === goal;
        return (
          <button
            key={goal}
            type="button"
            onClick={() => onChange(goal)}
            className={`rounded-xl border-2 p-3 text-left transition hover:shadow-md ${
              selected ? `${meta.color} ring-2 ring-violet-300` : "border-slate-200 bg-white hover:border-violet-200"
            }`}
          >
            <div className="flex items-start gap-2">
              <Icon size={18} className={selected ? "opacity-100" : "text-slate-400"} />
              <div>
                <p className="text-xs font-black text-slate-800">{goal}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{meta.hint}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function LiveStrategySidebar({
  form,
}: {
  form: Pick<
    StrategyFormSnapshot,
    "industry" | "businessGoal" | "scale" | "budgetRange" | "existingAssets" | "companyName"
  >;
}) {
  const live = form.industry.trim() ? buildLiveStrategyPreview(form.industry, form) : null;
  const readiness = live ? buildDigitalReadiness(live.analysis.profile.id, form.existingAssets) : null;

  if (!live) {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
        <p className="text-xs font-black uppercase text-violet-300">Tư vấn trực tiếp</p>
        <p className="mt-2 text-sm leading-relaxed text-violet-100/70">
          Điền ngành nghề ở bước 2 — hệ thống gợi ý combo, kênh ưu tiên và dự toán chi phí ngay lập tức.
        </p>
        <ul className="mt-4 space-y-2 text-[11px] text-violet-200/60">
          <li>✓ 1.234+ ngành masothue</li>
          <li>✓ Combo theo ngân sách</li>
          <li>✓ Báo giá đồng bộ 3 kênh</li>
        </ul>
      </div>
    );
  }

  const { analysis, combo, monthTotal, budgetFit } = live;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-900/40 to-fuchsia-900/20 p-5 backdrop-blur-sm"
    >
      <p className="flex items-center gap-2 text-xs font-black text-violet-200">
        <Sparkles size={14} /> Tư vấn cho {form.companyName || "bạn"}
      </p>
      <p className="mt-2 text-lg font-black text-white">
        {getProfileShortLabel(analysis.profile.id)}
      </p>
      <p className="text-[11px] text-violet-200/80">{analysis.insight}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-[9px] font-bold uppercase text-violet-300">Gói đề xuất</p>
          <p className="text-xs font-black text-white">{combo.tierLabel}</p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-[9px] font-bold uppercase text-violet-300">Sẵn sàng số</p>
          <p className="text-xs font-black text-white">{readiness?.score ?? 0}/100</p>
        </div>
        <div className="col-span-2 rounded-xl bg-white/10 px-3 py-2">
          <p className="text-[9px] font-bold uppercase text-violet-300">Dự toán / tháng</p>
          <p className="text-base font-black text-white">{formatVnd(monthTotal)}</p>
          <p
            className={`text-[10px] font-bold ${budgetFit.status === "good" ? "text-emerald-300" : budgetFit.status === "warning" ? "text-amber-300" : "text-red-300"}`}
          >
            {budgetFit.message}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {analysis.channels
          .filter((c) => c.active)
          .map((c) => (
            <span key={c.id} className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold text-white">
              {c.label} {"★".repeat(c.stars)}
            </span>
          ))}
      </div>
    </motion.div>
  );
}

export function FormNavButtons({
  step,
  onBack,
  onNext,
  onSubmit,
  submitting,
  canNext,
}: {
  step: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting: boolean;
  canNext: boolean;
}) {
  return (
    <div className="mt-6 flex gap-3">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-violet-200 py-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      )}
      {step < 3 ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-50"
        >
          Tiếp tục <ArrowRight size={16} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || !canNext}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60"
        >
          {submitting ? "Đang xử lý..." : "Xem chiến lược"} <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

export function BudgetSimulator({
  form,
  onSelectBudget,
}: {
  form: Pick<StrategyFormSnapshot, "industry" | "businessGoal" | "scale" | "budgetRange" | "existingAssets">;
  onSelectBudget: (budget: string) => void;
}) {
  if (!form.industry.trim()) return null;

  const profile = resolveIndustryProfile(form.industry);

  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
      <p className="flex items-center gap-2 text-xs font-black text-violet-800">
        <Wallet size={14} /> Mô phỏng ngân sách — chọn để xem combo thay đổi
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {BUDGET_OPTIONS.map((budget) => {
          const combo = buildRecommendedCombo(profile, { ...form, budgetRange: budget });
          const month = calculatePlanTotals(combo.itemIds).month;
          const fit = getBudgetFitAssessment(month, budget);
          const selected = form.budgetRange === budget;
          return (
            <button
              key={budget}
              type="button"
              onClick={() => onSelectBudget(budget)}
              className={`rounded-xl border-2 p-3 text-left transition hover:shadow-md ${
                selected ? "border-violet-500 bg-white ring-2 ring-violet-200" : "border-violet-100 bg-white/80"
              }`}
            >
              <p className="text-[10px] font-black uppercase text-violet-600">{budget.replace("/tháng", "")}</p>
              <p className="mt-1 text-base font-black text-slate-900">{formatVnd(month)}<span className="text-[10px] font-bold text-slate-400">/th</span></p>
              <p className="mt-0.5 text-[10px] font-bold text-slate-500">{combo.tierLabel} · {combo.itemIds.length} gói</p>
              <p className={`mt-1 text-[9px] font-bold ${fit.status === "good" ? "text-emerald-600" : fit.status === "warning" ? "text-amber-600" : "text-red-600"}`}>
                {fit.status === "good" ? "✓ Phù hợp" : fit.status === "warning" ? "⚠ Gần ngưỡng" : "✗ Vượt ngân sách"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DraftRestoredBanner({
  savedAt,
  onClear,
}: {
  savedAt?: string;
  onClear: () => void;
}) {
  const when = savedAt ? formatDraftSavedAt(savedAt) : "";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
      <div>
        <p className="text-xs font-bold text-emerald-800">✓ Đã tự điền lại thông tin bạn nhập trước đó</p>
        {when && <p className="text-[10px] text-emerald-700/80">Lưu trên thiết bị này lúc {when}</p>}
      </div>
      <button type="button" onClick={onClear} className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-800">
        Xoá & nhập mới
      </button>
    </div>
  );
}
