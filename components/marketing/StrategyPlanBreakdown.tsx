"use client";

import { CalendarDays, Facebook, Globe, MapPin, Sparkles, TrendingUp } from "lucide-react";
import {
  calculatePlanTotals,
  formatVnd,
  getBudgetFitAssessment,
  getItemBilling,
  getPricingItemById,
  orderChannelsByPlatformFocus,
  PLATFORM_FOCUS_OPTIONS,
  type PlatformFocus,
  type StrategyChannelId,
} from "@/lib/marketing-strategy-profiles";
import { DeploymentTimelinePanel } from "@/components/marketing/StrategyFormWizard";
import { PricingDeepLink } from "@/components/marketing/StrategySmartPanels";
import { SectionHeader } from "@/components/marketing/StrategyResultsUI";

const CHANNEL_META: Record<
  StrategyChannelId,
  {
    label: string;
    icon: typeof Globe;
    match: (itemId: string) => boolean;
    deepLink: "maps" | "website" | "fanpage";
    border: string;
    bg: string;
    accent: string;
    badge: string;
    setupHint: string;
  }
> = {
  maps: {
    label: "Google Maps",
    icon: MapPin,
    match: (id) => id.startsWith("gm-"),
    deepLink: "maps",
    border: "border-orange-200",
    bg: "bg-gradient-to-br from-orange-50 via-white to-orange-50/30",
    accent: "text-orange-700",
    badge: "bg-orange-600",
    setupHint: "Hiện diện local & review",
  },
  website: {
    label: "Website",
    icon: Globe,
    match: (id) => id.startsWith("web-"),
    deepLink: "website",
    border: "border-emerald-200",
    bg: "bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30",
    accent: "text-emerald-700",
    badge: "bg-emerald-600",
    setupHint: "Kênh sở hữu & SEO",
  },
  fanpage: {
    label: "Fanpage Facebook",
    icon: Facebook,
    match: (id) => id.startsWith("fb-"),
    deepLink: "fanpage",
    border: "border-blue-200",
    bg: "bg-gradient-to-br from-blue-50 via-white to-blue-50/30",
    accent: "text-blue-700",
    badge: "bg-blue-600",
    setupHint: "Content & inbox",
  },
};

function billingLabel(itemId: string) {
  const b = getItemBilling(itemId);
  if (b === "month") return "Hàng tháng";
  if (b === "year") return "Hàng năm";
  return "Một lần";
}

function BudgetFitBar({ monthTotal, budgetRange }: { monthTotal: number; budgetRange: string }) {
  const fit = getBudgetFitAssessment(monthTotal, budgetRange);
  const barColor = fit.status === "good" ? "bg-emerald-500" : fit.status === "warning" ? "bg-amber-500" : "bg-red-500";
  const textColor = fit.status === "good" ? "text-emerald-700" : fit.status === "warning" ? "text-amber-700" : "text-red-700";
  const bgColor = fit.status === "good" ? "bg-emerald-50 border-emerald-200" : fit.status === "warning" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <div className={`rounded-xl border p-4 ${bgColor}`}>
      <div className="flex items-center justify-between gap-2">
        <p className={`flex items-center gap-1.5 text-xs font-black ${textColor}`}>
          <TrendingUp size={14} /> Mức phù hợp ngân sách
        </p>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${textColor} bg-white/70`}>
          {fit.status === "good" ? "Phù hợp" : fit.status === "warning" ? "Gần ngưỡng" : "Cần điều chỉnh"}
        </span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(fit.percentUsed, 100)}%` }} />
      </div>
      <p className={`mt-2 text-[11px] leading-relaxed ${textColor}`}>{fit.message}</p>
    </div>
  );
}

export function StrategyPlanBreakdown({
  itemIds,
  budgetRange,
  timeline,
  tierLabel,
  platformFocus = "strategy",
  comboReasons = [],
}: {
  itemIds: string[];
  budgetRange: string;
  timeline: { week: string; task: string }[];
  tierLabel: string;
  platformFocus?: PlatformFocus;
  comboReasons?: string[];
}) {
  const totals = calculatePlanTotals(itemIds);
  const channelOrder = orderChannelsByPlatformFocus(platformFocus);
  const focusLabel = PLATFORM_FOCUS_OPTIONS.find((o) => o.id === platformFocus)?.label;

  let step = 0;
  const channelBlocks = channelOrder
    .map((channelId) => {
      const ch = CHANNEL_META[channelId];
      const items = itemIds
        .map((id) => getPricingItemById(id))
        .filter((item): item is NonNullable<typeof item> => !!item && ch.match(item.id));
      if (!items.length) return null;

      step += 1;
      const Icon = ch.icon;
      const isPriority = platformFocus !== "strategy" && channelId === platformFocus;
      const { once, month, year } = calculatePlanTotals(items.map((i) => i.id));

      return (
        <section
          key={channelId}
          className={`relative overflow-hidden rounded-2xl border-2 p-5 shadow-sm ${ch.border} ${ch.bg}`}
        >
          {isPriority && (
            <span className="absolute right-4 top-4 rounded-full bg-violet-700 px-2.5 py-0.5 text-[9px] font-black uppercase text-white">
              Ưu tiên
            </span>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white shadow ${ch.badge}`}>
              {step}
            </span>
            <Icon size={20} className={ch.accent} />
            <div>
              <h3 className={`text-sm font-black ${ch.accent}`}>Bước {step} — {ch.label}</h3>
              <p className="text-[10px] text-slate-500">{ch.setupHint}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/90 bg-white/90 p-3.5 shadow-sm backdrop-blur-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-slate-800">{item.label}</p>
                    {item.quantity && <p className="mt-0.5 text-[10px] text-slate-500">{item.quantity}</p>}
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-black ${ch.accent}`}>{item.price}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{billingLabel(item.id)}</p>
                  </div>
                </div>
                {item.works.length > 0 && (
                  <ul className="mt-2.5 space-y-1 border-t border-slate-100 pt-2.5">
                    {item.works.slice(0, 4).map((w) => (
                      <li key={w} className="flex gap-2 text-[10px] text-slate-600">
                        <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${ch.badge}`} />
                        {w}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/60 px-3 py-2">
            <p className="text-[11px] font-bold text-slate-600">
              {once > 0 && <>Setup: {formatVnd(once)}</>}
              {once > 0 && month > 0 && " · "}
              {month > 0 && <>Duy trì: {formatVnd(month)}/tháng</>}
              {year > 0 && (once > 0 || month > 0 ? " · " : "")}
              {year > 0 && <>Hàng năm: {formatVnd(year)}</>}
            </p>
            <PricingDeepLink channel={ch.deepLink} />
          </div>
        </section>
      );
    })
    .filter(Boolean);

  return (
    <div id="section-pricing" className="scroll-mt-24 space-y-6 border-b border-violet-100 bg-[#faf8ff] p-4 md:p-8">
      <SectionHeader
        step={3}
        title="Báo giá đề xuất"
        subtitle={`Gói ${tierLabel} · ${itemIds.length} hạng mục · khớp bảng giá chính thức`}
      />

      {platformFocus !== "strategy" && focusLabel && (
        <div className="flex items-start gap-2 rounded-xl border border-violet-200 bg-violet-50/80 px-4 py-3">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-violet-600" />
          <p className="text-[11px] leading-relaxed text-violet-800">
            Bạn chọn ưu tiên <strong>{focusLabel}</strong> — kênh này được xếp trước và combo tính theo hướng đó.
          </p>
        </div>
      )}

      {comboReasons.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[10px] font-black uppercase text-slate-500">Vì sao đề xuất như vậy?</p>
          <ul className="mt-2 space-y-1.5">
            {comboReasons.slice(0, 3).map((r) => (
              <li key={r} className="flex gap-2 text-[11px] text-slate-700">
                <span className="font-black text-violet-500">→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">{channelBlocks}</div>

      <section className="overflow-hidden rounded-2xl border-2 border-violet-300 bg-white shadow-md">
        <div className="bg-gradient-to-r from-violet-700 to-violet-700 px-5 py-4 text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-black">
              {step + 1}
            </span>
            <h3 className="text-sm font-black">Tổng kết chi phí</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Một lần", value: totals.once, hint: "Setup & cải tạo", color: "text-violet-700" },
              { label: "Hàng tháng", value: totals.month, hint: "Chăm sóc & quảng cáo", color: "text-violet-700" },
              { label: "Hàng năm", value: totals.year, hint: "Hosting & data", color: "text-indigo-700" },
            ].map((row) => (
              <div key={row.label} className="rounded-xl border border-violet-100 bg-violet-50/40 p-4 text-center">
                <p className="text-[10px] font-black uppercase text-violet-600">{row.label}</p>
                <p className={`mt-1 text-2xl font-black ${row.color}`}>{formatVnd(row.value)}</p>
                <p className="text-[10px] text-slate-500">{row.hint}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <BudgetFitBar monthTotal={totals.month} budgetRange={budgetRange} />
          </div>
        </div>
      </section>

      <section className="print:hidden">
        <p className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
          <CalendarDays size={16} className="text-violet-700" /> Lịch triển khai dự kiến
        </p>
        <DeploymentTimelinePanel timeline={timeline} />
      </section>
    </div>
  );
}
