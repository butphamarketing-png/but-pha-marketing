"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Building2, ExternalLink, Globe, Layers, Lightbulb, MapPin, Facebook, Swords, Zap } from "lucide-react";
import {
  buildOwnedAssetsAdvisory,
  formatVnd,
  type IndustryProfile,
  type StrategyFormSnapshot,
} from "@/lib/marketing-strategy-profiles";
import {
  buildCompetitiveBenchmark,
  buildExecutiveSummary,
  buildMultiLocationAdvisory,
  buildWhatIfScenarios,
} from "@/lib/strategy-intelligence";

export function StrategyExecutiveSummary({
  profile,
  form,
  confidence,
  itemIds,
}: {
  profile: IndustryProfile;
  form: StrategyFormSnapshot;
  confidence: number;
  itemIds: string[];
}) {
  const summary = buildExecutiveSummary(profile, form, confidence, itemIds);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-700 via-violet-800 to-fuchsia-800 p-5 text-white shadow-xl md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-violet-200">
            <Award size={14} /> Tóm tắt chiến lược
          </p>
          <p className="mt-2 text-lg font-black leading-snug md:text-xl">{summary.headline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black">{summary.tierLabel}</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black">{formatVnd(summary.monthTotal)}/tháng</span>
            <span className="rounded-full bg-emerald-400/30 px-3 py-1 text-[10px] font-black text-emerald-100">Điểm tổng {summary.overallScore} — {summary.grade}</span>
          </div>
        </div>
        <div className="flex gap-3">
          {[
            { label: "Sẵn sàng", value: summary.readinessScore },
            { label: "Khớp ngành", value: summary.confidence },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-black">{m.value}</p>
              <p className="text-[9px] font-bold uppercase text-violet-200">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {summary.quickWins.length > 0 && (
        <div className="mt-4 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <p className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-200">
            <Zap size={12} /> Quick wins
          </p>
          <ul className="mt-1.5 space-y-1">
            {summary.quickWins.map((w) => (
              <li key={w} className="text-xs text-white/90">→ {w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 border-t border-white/15 pt-4">
        <p className="text-[10px] font-black uppercase text-violet-200">3 việc làm ngay tuần 1</p>
        <ol className="mt-2 space-y-1">
          {summary.topActions.map((a, i) => (
            <li key={a} className="flex gap-2 text-xs text-white/90">
              <span className="font-black text-violet-300">{i + 1}.</span> {a}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

export function StrategyBenchmarkPanel({
  profileId,
  existingAssets,
}: {
  profileId: string;
  existingAssets: string[];
}) {
  const bench = buildCompetitiveBenchmark(profileId, existingAssets);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-slate-800">
        <Swords size={16} /> So với đối thủ cùng ngành
      </p>
      <p className="mt-1 text-xs font-bold text-violet-700">{bench.headline}</p>
      <p className="mt-1 text-[11px] text-slate-500">{bench.insight}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-center">
          <p className="text-2xl font-black text-violet-700">{bench.yourCoverage}%</p>
          <p className="text-[10px] font-bold text-slate-500">Bạn đang có</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-2xl font-black text-slate-600">{bench.industryAvg}%</p>
          <p className="text-[10px] font-bold text-slate-500">Đối thủ trung bình</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {bench.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${item.youHave ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
              {item.youHave ? "✓" : "—"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-bold text-slate-800">{item.label}</p>
                <span className="shrink-0 text-[10px] font-bold text-slate-400">{item.industryPct}% đối thủ</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.youHave ? "bg-emerald-500" : "bg-slate-300"}`}
                  style={{ width: `${item.youHave ? 100 : item.industryPct * 0.6}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategyWhatIfPanel({
  profile,
  form,
  onApplyAssets,
}: {
  profile: IndustryProfile;
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets">;
  onApplyAssets: (assets: string[]) => void;
}) {
  const scenarios = buildWhatIfScenarios(profile, form);
  if (!scenarios.length) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-amber-900">
        <Lightbulb size={16} /> Kịch bản &quot;Nếu đã có...&quot;
      </p>
      <p className="mt-1 text-[10px] text-slate-500">Xem chi phí thay đổi khi bạn đã sở hữu kênh marketing</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onApplyAssets(s.assets)}
            className="rounded-xl border border-amber-100 bg-white p-3 text-left transition hover:border-amber-300 hover:shadow-sm"
          >
            <p className="text-xs font-black text-slate-800">{s.label}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">{s.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-black text-amber-800">{formatVnd(s.newMonthTotal)}/th</span>
              {s.monthDelta !== 0 && (
                <span className={`text-[10px] font-bold ${s.monthDelta < 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {s.monthDelta > 0 ? "+" : ""}{formatVnd(s.monthDelta)}/th
                </span>
              )}
              <span className="text-[10px] text-slate-400">{s.newItemCount} gói</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const ASSET_ICON: Record<string, typeof Globe> = {
  website: Globe,
  fanpage: Facebook,
  maps: MapPin,
  ads: Zap,
};

export function StrategyOwnedAssetsPanel({
  existingAssets,
}: {
  existingAssets: string[];
}) {
  const items = buildOwnedAssetsAdvisory(existingAssets);
  const ownedCount = items.filter((i) => i.owned && i.id !== "ads").length;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-emerald-900">
        <Layers size={16} /> Tư vấn tài sản số & cải tạo
      </p>
      <p className="mt-1 text-[11px] text-emerald-800/80">
        {ownedCount > 0
          ? `Bạn đã có ${ownedCount} kênh — báo giá cải tạo một lần + hướng bổ sung kênh còn thiếu.`
          : "Chưa chọn kênh nào — combo đề xuất xây mới đầy đủ theo ngành & ngân sách."}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = ASSET_ICON[item.id] ?? Layers;
          return (
            <li
              key={item.id}
              className={`rounded-xl border p-3 ${item.owned ? "border-emerald-200 bg-white" : "border-slate-200 bg-slate-50/80"}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.owned ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}
                >
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-black text-slate-800">{item.label}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${item.owned ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                    >
                      {item.owned ? "Đã có" : "Chưa có"}
                    </span>
                    {item.setupPrice != null && (
                      <span className="text-xs font-black text-violet-700">{formatVnd(item.setupPrice)}</span>
                    )}
                  </div>
                  {item.setupLabel && (
                    <p className="mt-0.5 text-[10px] font-bold text-emerald-700">{item.setupLabel}</p>
                  )}
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{item.advice}</p>
                  {item.pricingPath && item.id !== "ads" && (
                    <Link
                      href={item.pricingPath}
                      target="_blank"
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-black uppercase text-violet-600 hover:text-violet-800"
                    >
                      Xem bảng giá <ExternalLink size={10} />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const PRICING_PAGES = {
  website: { href: "/website", label: "Xem bảng giá Website", color: "text-emerald-700 hover:text-emerald-900" },
  fanpage: { href: "/facebook", label: "Xem bảng giá Fanpage", color: "text-blue-700 hover:text-blue-900" },
  maps: { href: "/google-maps", label: "Xem bảng giá Google Maps", color: "text-orange-700 hover:text-orange-900" },
} as const;

export function PricingDeepLink({ channel }: { channel: keyof typeof PRICING_PAGES }) {
  const page = PRICING_PAGES[channel];
  return (
    <Link
      href={page.href}
      target="_blank"
      className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide print:hidden ${page.color}`}
    >
      {page.label} <ExternalLink size={12} />
    </Link>
  );
}

export function StrategyMultiLocationPanel({
  form,
  mapsSetupOnce,
  baseMonthTotal,
}: {
  form: Pick<StrategyFormSnapshot, "scale" | "budgetRange">;
  mapsSetupOnce: number | null;
  baseMonthTotal: number;
}) {
  const advisory = buildMultiLocationAdvisory(form, mapsSetupOnce, baseMonthTotal);
  if (!advisory) return null;

  return (
    <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5">
      <p className="flex items-center gap-2 text-sm font-black text-sky-900">
        <Building2 size={16} /> {advisory.locationLabel} — {advisory.locationCount}
      </p>
      <p className="mt-1 text-[11px] text-slate-600">
        Dự toán 1 cơ sở ~{formatVnd(baseMonthTotal)}/th · Chuỗi có thể cần thêm ~{formatVnd(advisory.estimatedExtraMonth)}/th
      </p>
      <ul className="mt-3 space-y-2">
        {advisory.bullets.map((b) => (
          <li key={b} className="text-xs leading-relaxed text-slate-700">• {b}</li>
        ))}
      </ul>
    </div>
  );
}
