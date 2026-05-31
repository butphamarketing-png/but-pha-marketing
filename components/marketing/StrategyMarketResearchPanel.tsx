"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Crosshair,
  Lightbulb,
  MapPinned,
  Shield,
  Swords,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { buildMarketResearch, type MarketResearchReport } from "@/lib/market-research";
import type { IndustryAnalysis } from "@/lib/industry-intelligence";
import type { ComboRecommendation, IndustryProfile, StrategyFormSnapshot } from "@/lib/marketing-strategy-profiles";
import { SectionHeader } from "@/components/marketing/StrategyResultsUI";

const COMPETITION_COLOR: Record<string, string> = {
  "thấp": "bg-emerald-100 text-emerald-800",
  "trung bình": "bg-amber-100 text-amber-800",
  "cao": "bg-orange-100 text-orange-800",
  "rất cao": "bg-red-100 text-red-800",
};

function CompetitionMeter({ score, level }: { score: number; level: string }) {
  const color = COMPETITION_COLOR[level] ?? "bg-slate-100 text-slate-700";
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase text-slate-500">Mức cạnh tranh</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${color}`}>{level}</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <p className="mt-1 text-[10px] font-bold text-slate-600">{score}/100 — càng cao càng cần differentiation rõ</p>
    </div>
  );
}

function SwotGrid({ swot }: { swot: MarketResearchReport["swot"] }) {
  const blocks = [
    { key: "S", title: "Điểm mạnh", items: swot.strengths, color: "border-emerald-200 bg-emerald-50/60", accent: "text-emerald-700", dot: "bg-emerald-500" },
    { key: "W", title: "Điểm yếu", items: swot.weaknesses, color: "border-amber-200 bg-amber-50/60", accent: "text-amber-700", dot: "bg-amber-500" },
    { key: "O", title: "Cơ hội", items: swot.opportunities, color: "border-blue-200 bg-blue-50/60", accent: "text-blue-700", dot: "bg-blue-500" },
    { key: "T", title: "Thách thức", items: swot.threats, color: "border-red-200 bg-red-50/60", accent: "text-red-700", dot: "bg-red-500" },
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {blocks.map(({ key, title, items, color, accent, dot }) => (
        <div key={key} className={`rounded-xl border p-4 ${color}`}>
          <p className={`text-xs font-black uppercase ${accent}`}>{key} — {title}</p>
          <ul className="mt-2 space-y-1.5">
            {items.map((item) => (
              <li key={item} className="flex gap-2 text-[11px] leading-relaxed text-slate-700">
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${dot}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function StrategyMarketResearchPanel({
  profile,
  form,
  industryAnalysis,
  combo,
}: {
  profile: IndustryProfile;
  form: StrategyFormSnapshot;
  industryAnalysis: IndustryAnalysis;
  combo: ComboRecommendation;
}) {
  const report = buildMarketResearch(profile, form, industryAnalysis, combo);

  return (
    <div id="section-market" className="scroll-mt-24 border-b border-violet-100 bg-gradient-to-b from-indigo-50/40 to-white p-4 md:p-8">
      <SectionHeader
        step={2}
        title="Nghiên cứu thị trường"
        subtitle="Phân tích cạnh tranh, tệp khách, SWOT & giải pháp tư vấn theo ngành + khu vực"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-700 to-violet-800 p-5 text-white shadow-lg"
      >
        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-indigo-200">
          <Lightbulb size={14} /> Tóm tắt tư vấn
        </p>
        <p className="mt-2 text-sm leading-relaxed md:text-base">{report.executiveBrief}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold">
            Tin cậy phân tích {report.confidence}%
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold">
            CPC {report.marketOverview.cpcRange}
          </span>
        </div>
      </motion.div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="flex items-center gap-2 text-sm font-black text-slate-800">
            <BarChart3 size={16} className="text-indigo-600" /> Tổng quan thị trường
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-black uppercase text-slate-500">Quy mô ước tính</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-slate-800">{report.marketOverview.sizeEstimate}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-black uppercase text-slate-500">Xu hướng</p>
              <p className="mt-1 text-xs font-bold leading-relaxed text-slate-800">{report.marketOverview.growthTrend}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-black uppercase text-slate-500">Bão hòa digital</p>
              <p className="mt-1 text-xs font-bold text-slate-800">{report.marketOverview.digitalSaturation}% DN cùng ngành đã có kênh online</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-black uppercase text-slate-500">Phạm vi</p>
              <p className="mt-1 text-xs font-bold text-indigo-700">{report.marketOverview.label}</p>
            </div>
          </div>
          <div className="mt-4">
            <CompetitionMeter score={report.marketOverview.competitionScore} level={report.marketOverview.competitionLevel} />
          </div>
        </div>

        <div className="rounded-2xl border border-violet-200 bg-white p-5 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-black text-violet-800">
            <Users size={16} /> Tệp khách mục tiêu
          </p>
          <p className="mt-3 text-xs font-black text-slate-800">{report.customerInsight.primarySegment}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{report.customerInsight.behavior}</p>
          <p className="mt-3 text-[10px] font-black uppercase text-violet-600">Yếu tố quyết định mua</p>
          <ul className="mt-2 space-y-1.5">
            {report.customerInsight.decisionFactors.map((f) => (
              <li key={f} className="flex gap-2 text-[11px] text-slate-700">
                <Target size={12} className="mt-0.5 shrink-0 text-violet-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-black text-slate-800">
          <Swords size={16} className="text-orange-600" /> Cảnh quan cạnh tranh
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{report.competitiveLandscape.summary}</p>
        <p className="mt-2 rounded-lg border border-orange-100 bg-orange-50/60 px-3 py-2 text-[11px] font-bold text-orange-800">
          {report.competitiveLandscape.yourGap}
        </p>
        <p className="mt-3 text-[10px] font-black uppercase text-slate-500">Đối thủ điển hình thường có</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {report.competitiveLandscape.typicalCompetitorProfile.map((item) => (
            <li key={item} className="flex gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 text-[11px] text-slate-700">
              <Shield size={12} className="mt-0.5 shrink-0 text-slate-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50/40 p-5">
        <p className="flex items-center gap-2 text-sm font-black text-violet-900">
          <Crosshair size={16} /> Định vị & thông điệp đề xuất
        </p>
        <p className="mt-3 rounded-xl border border-violet-200 bg-white p-4 text-sm font-bold leading-relaxed text-violet-900">
          &ldquo;{report.positioning.statement}&rdquo;
        </p>
        <p className="mt-3 text-[10px] font-black uppercase text-violet-600">USP gợi ý</p>
        <ul className="mt-2 space-y-1">
          {report.positioning.uspSuggestions.map((u) => (
            <li key={u} className="text-[11px] text-slate-700">→ {u}</li>
          ))}
        </ul>
        <p className="mt-3 text-[10px] text-slate-500">
          Giọng điệu content: <strong className="text-violet-700">{report.positioning.messagingTone}</strong>
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
          <TrendingUp size={16} className="text-emerald-600" /> SWOT — Phân tích chiến lược
        </p>
        <SwotGrid swot={report.swot} />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-black text-slate-800">
          <MapPinned size={16} className="text-indigo-600" /> Chiến lược kênh theo thị trường
        </p>
        <div className="mt-4 space-y-3">
          {report.channelStrategy.map((ch) => (
            <div key={ch.channel} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[9px] font-black uppercase text-white">
                  {ch.priority}
                </span>
                <p className="text-sm font-black text-slate-800">{ch.channel}</p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{ch.rationale}</p>
              <p className="mt-1 text-[11px] font-bold text-indigo-700">→ {ch.action}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
          <Zap size={16} className="text-amber-500" /> Giải pháp tư vấn đề xuất
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {report.solutions.map((sol) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-violet-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-black text-white">
                  {sol.priority}
                </span>
                <div>
                  <p className="text-sm font-black text-slate-900">{sol.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{sol.rationale}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {sol.channels.map((c) => (
                  <span key={c} className="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-700">
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                <div className="rounded-lg bg-slate-50 px-2 py-1.5">
                  <span className="font-black text-slate-500">Timeline</span>
                  <p className="font-bold text-slate-800">{sol.timeline}</p>
                </div>
                <div className="rounded-lg bg-emerald-50 px-2 py-1.5">
                  <span className="font-black text-emerald-600">Kết quả kỳ vọng</span>
                  <p className="font-bold text-emerald-800">{sol.expectedOutcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[10px] italic leading-relaxed text-slate-400">
        {report.methodology}
      </p>
    </div>
  );
}
