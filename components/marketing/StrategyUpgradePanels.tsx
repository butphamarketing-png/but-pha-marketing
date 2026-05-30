"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Facebook,
  Gauge,
  MapPin,
  Megaphone,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  buildTierComparison,
  formatVnd,
  type StrategyFormSnapshot,
  type IndustryProfile,
} from "@/lib/marketing-strategy-profiles";
import {
  buildActionPlan,
  buildAdsChannelAdvice,
  buildCostBreakdown,
  buildDigitalReadiness,
  buildKpiProjections,
  buildRoiEstimate,
  type ActionStep,
} from "@/lib/strategy-intelligence";
import type { ComboRecommendation } from "@/lib/marketing-strategy-profiles";

const GRADE_STYLES = {
  red: "from-red-500 to-rose-600 text-white",
  amber: "from-amber-500 to-orange-500 text-white",
  emerald: "from-emerald-500 to-teal-600 text-white",
  violet: "from-violet-600 to-fuchsia-600 text-white",
} as const;

const TIER_STYLES = {
  starter: { border: "border-slate-200", badge: "bg-slate-100 text-slate-700" },
  growth: { border: "border-violet-300 ring-2 ring-violet-400", badge: "bg-violet-600 text-white" },
  professional: { border: "border-fuchsia-200", badge: "bg-fuchsia-100 text-fuchsia-800" },
} as const;

const CHANNEL_ICON = {
  maps: MapPin,
  fanpage: Facebook,
  website: Target,
  ads: Megaphone,
  general: Rocket,
} as const;

function ReadinessGauge({ score, grade, gradeColor }: { score: number; grade: string; gradeColor: keyof typeof GRADE_STYLES }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="url(#readinessGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${score} 100`}
          />
          <defs>
            <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-violet-800">{score}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Điểm sẵn sàng số</p>
        <span className={`mt-1 inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-black ${GRADE_STYLES[gradeColor]}`}>
          {grade}
        </span>
      </div>
    </div>
  );
}

function ActionPlanTimeline({ steps }: { steps: ActionStep[] }) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const Icon = CHANNEL_ICON[step.channel];
        return (
          <div key={step.week} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <Icon size={14} />
              </span>
              {i < steps.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-violet-100" />}
            </div>
            <div className="min-w-0 flex-1 pb-3">
              <p className="text-[10px] font-black uppercase text-violet-600">{step.week}</p>
              <p className="text-sm font-black text-slate-800">{step.title}</p>
              <ul className="mt-1.5 space-y-0.5">
                {step.tasks.map((t) => (
                  <li key={t} className="text-xs text-slate-600">• {t}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StrategyReadinessPanel({
  profileId,
  existingAssets,
}: {
  profileId: string;
  existingAssets: string[];
}) {
  const readiness = buildDigitalReadiness(profileId, existingAssets);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50/40 p-5"
    >
      <p className="flex items-center gap-2 text-sm font-black text-violet-800">
        <Gauge size={16} /> Maturity Marketing
      </p>
      <div className="mt-4">
        <ReadinessGauge score={readiness.score} grade={readiness.grade} gradeColor={readiness.gradeColor} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{readiness.summary}</p>

      {readiness.strengths.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-black uppercase text-emerald-700">Điểm mạnh</p>
          <ul className="mt-1 space-y-1">
            {readiness.strengths.map((s) => (
              <li key={s} className="text-xs text-emerald-800">✓ {s}</li>
            ))}
          </ul>
        </div>
      )}

      {readiness.gaps.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-black uppercase text-amber-700">Cần bổ sung</p>
          <div className="mt-1.5 space-y-1.5">
            {readiness.gaps.map((g) => (
              <div key={g.id} className="rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800">{g.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${g.priority === "high" ? "bg-red-100 text-red-700" : g.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                    {g.priority === "high" ? "Ưu tiên" : g.priority === "medium" ? "Quan trọng" : "Nên có"}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-500">{g.impact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function StrategyTierComparison({
  profile,
  form,
  onSelectTier,
}: {
  profile: IndustryProfile;
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets">;
  onSelectTier?: (itemIds: string[]) => void;
}) {
  const tiers = buildTierComparison(profile, form);

  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-violet-800">
        <LayersIcon /> So sánh 3 gói chiến lược
      </p>
      <p className="mt-1 text-[11px] text-slate-500">Chọn gói phù hợp ngân sách — click để áp dụng vào kế hoạch</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {tiers.map((t) => {
          const style = TIER_STYLES[t.tier];
          return (
            <button
              key={t.tier}
              type="button"
              onClick={() => onSelectTier?.(t.combo.itemIds)}
              className={`relative rounded-xl border bg-white p-4 text-left transition hover:shadow-md ${style.border} ${t.recommended ? "shadow-md" : ""}`}
            >
              {t.recommended && (
                <span className="absolute -top-2 right-3 rounded-full bg-violet-600 px-2 py-0.5 text-[9px] font-black text-white">
                  Đề xuất
                </span>
              )}
              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-black ${style.badge}`}>
                {t.tierLabel}
              </span>
              <p className="mt-2 text-lg font-black text-slate-900">{formatVnd(t.monthTotal)}<span className="text-xs font-bold text-slate-500">/th</span></p>
              <p className="text-[10px] text-slate-500">Setup: {formatVnd(t.onceTotal)} · {t.itemCount} gói</p>
              <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-slate-600">{t.combo.label}</p>
              {onSelectTier && (
                <span className="mt-2 flex items-center gap-1 text-[10px] font-bold text-violet-600">
                  Áp dụng gói này <ArrowUpRight size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18 8 4.5a1 1 0 0 1 0 1.74l-8 4.5a1 1 0 0 1-1 0l-8-4.5a1 1 0 0 1 0-1.74l8-4.5a1 1 0 0 1 1 0Z" />
      <path d="m19.83 12.18 1.22.68a1 1 0 0 1 0 1.74l-8 4.5a1 1 0 0 1-1 0l-8-4.5a1 1 0 0 1 0-1.74l1.22-.68" />
    </svg>
  );
}

export function StrategyKpiPanel({
  profile,
  form,
}: {
  profile: IndustryProfile;
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange">;
}) {
  const kpis = buildKpiProjections(profile, form);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-emerald-800">
        <TrendingUp size={16} /> KPI kỳ vọng (tham khảo)
      </p>
      <p className="mt-1 text-[10px] text-slate-500">Dựa trên ngành, mục tiêu & ngân sách — không cam kết cứng</p>
      <div className="mt-4 space-y-3">
        {kpis.map((kpi) => (
          <div key={kpi.metric} className="rounded-xl border border-emerald-100 bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-black text-slate-800">{kpi.metric}</p>
              <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">{kpi.timeline}</span>
            </div>
            <p className="mt-1 text-base font-black text-emerald-700">{kpi.range}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">{kpi.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategyActionPlanPanel({
  profile,
  form,
  combo,
}: {
  profile: IndustryProfile;
  form: Pick<StrategyFormSnapshot, "existingAssets" | "businessGoal">;
  combo: ComboRecommendation;
}) {
  const steps = buildActionPlan(profile, form, combo);

  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-violet-800">
        <CalendarCheck size={16} /> Lộ trình hành động 30 ngày
      </p>
      <p className="mt-1 text-[10px] text-slate-500">Checklist cụ thể theo combo đã chọn</p>
      <div className="mt-4">
        <ActionPlanTimeline steps={steps} />
      </div>
    </div>
  );
}

export function StrategyAdsAdviceBanner({
  profileId,
  form,
}: {
  profileId: string;
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "existingAssets">;
}) {
  const advice = buildAdsChannelAdvice(profileId, form);
  const Icon = advice.channel === "google-maps" ? MapPin : advice.channel === "facebook" ? Facebook : BarChart3;

  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 p-4">
      <div className="flex flex-wrap items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Icon size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase text-indigo-600">Gợi ý kênh quảng cáo</p>
          <p className="text-sm font-black text-slate-800">{advice.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">{advice.reason}</p>
          <p className="mt-2 text-[11px] font-bold text-indigo-700">💡 {advice.budgetHint}</p>
        </div>
      </div>
    </div>
  );
}

export function FormProgressBar({ percent }: { percent: number }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase text-violet-600">Tiến độ form</span>
        <span className="text-[10px] font-bold text-slate-500">{percent}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-violet-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

export function StrategyCostBreakdown({ itemIds }: { itemIds: string[] }) {
  const channels = buildCostBreakdown(itemIds);
  const monthTotal = channels.reduce((s, c) => s + c.month, 0);
  const onceTotal = channels.reduce((s, c) => s + c.once, 0);

  if (!channels.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-slate-800">
        <BarChart3 size={16} /> Phân bổ chi phí theo kênh
      </p>
      <p className="mt-1 text-[10px] text-slate-500">Setup {formatVnd(onceTotal)} · Duy trì {formatVnd(monthTotal)}/tháng</p>

      {monthTotal > 0 && (
        <div className="mt-4 flex h-4 overflow-hidden rounded-full">
          {channels
            .filter((c) => c.month > 0)
            .map((c) => (
              <div
                key={c.id}
                style={{ width: `${(c.month / monthTotal) * 100}%`, backgroundColor: c.color }}
                title={`${c.label}: ${formatVnd(c.month)}/th`}
              />
            ))}
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <p className="text-xs font-black text-slate-800">{c.label}</p>
            </div>
            {c.once > 0 && <p className="mt-1 text-[10px] text-slate-500">Setup: <strong className="text-slate-700">{formatVnd(c.once)}</strong></p>}
            {c.month > 0 && <p className="text-[10px] text-slate-500">Hàng tháng: <strong className="text-slate-700">{formatVnd(c.month)}</strong></p>}
            {c.year > 0 && <p className="text-[10px] text-slate-500">Hàng năm: <strong className="text-slate-700">{formatVnd(c.year)}</strong></p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategyRoiPanel({
  profile,
  form,
  itemIds,
}: {
  profile: IndustryProfile;
  form: Pick<StrategyFormSnapshot, "scale" | "budgetRange">;
  itemIds: string[];
}) {
  const roi = buildRoiEstimate(profile, form, itemIds);

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-indigo-800">
        <TrendingUp size={16} /> Ước tính ROI (tham khảo)
      </p>
      <p className="mt-1 text-[10px] text-slate-500">Mô hình theo ngành — không cam kết doanh thu</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-indigo-100 bg-white p-3">
          <p className="text-[10px] font-black uppercase text-indigo-600">Lead/tháng</p>
          <p className="text-xl font-black text-slate-900">~{roi.monthlyLeads}</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-3">
          <p className="text-[10px] font-black uppercase text-indigo-600">Chi phí/lead</p>
          <p className="text-xl font-black text-slate-900">{formatVnd(roi.costPerLead)}</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-3">
          <p className="text-[10px] font-black uppercase text-indigo-600">Doanh thu ước tính</p>
          <p className="text-lg font-black text-emerald-700">{formatVnd(roi.estimatedRevenue)}</p>
          <p className="text-[9px] text-slate-400">Tỷ lệ chốt {(roi.conversionRate * 100).toFixed(0)}%</p>
        </div>
        <div className="rounded-xl border border-indigo-100 bg-white p-3">
          <p className="text-[10px] font-black uppercase text-indigo-600">ROI ước tính</p>
          <p className={`text-xl font-black ${roi.estimatedRoi >= 0 ? "text-emerald-700" : "text-amber-600"}`}>
            {roi.estimatedRoi >= 0 ? "+" : ""}{roi.estimatedRoi}%
          </p>
          <p className="text-[9px] text-slate-400">Hoà vốn: ~{roi.breakEvenLeads} lead</p>
        </div>
      </div>
      <p className="mt-3 rounded-lg bg-indigo-100/60 px-3 py-2 text-[11px] leading-relaxed text-indigo-900">{roi.summary}</p>
    </div>
  );
}
