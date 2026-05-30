"use client";

import { motion } from "framer-motion";
import { MapPinned, Navigation, Target, Users } from "lucide-react";
import {
  analyzeBusinessLocation,
  getMarketBreadthColor,
  type LocationAnalysis,
} from "@/lib/location-intelligence";
import type { IndustryProfile, StrategyFormSnapshot } from "@/lib/marketing-strategy-profiles";

function BreadthMeter({ score, label }: { score: number; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase text-slate-500">Độ rộng thị trường</span>
        <span className="text-xs font-black text-slate-800">{score}/100</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-1 text-[10px] font-bold text-violet-700">{label}</p>
    </div>
  );
}

function LocationPanelBody({ analysis }: { analysis: LocationAnalysis }) {
  const breadthColor = getMarketBreadthColor(analysis.marketBreadth);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {analysis.city && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">
            📍 {analysis.city}
          </span>
        )}
        {analysis.district && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
            {analysis.district}
          </span>
        )}
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${breadthColor}`}>
          {analysis.breadthLabel}
        </span>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
          Bán kính: {analysis.catchmentRange}
        </span>
      </div>

      <BreadthMeter score={analysis.breadthScore} label={analysis.breadthLabel} />

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <p className="text-[10px] font-black uppercase text-slate-500">Loại khu vực</p>
          <p className="mt-0.5 text-xs font-bold text-slate-800">{analysis.areaType}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          <p className="text-[10px] font-black uppercase text-slate-500">Bối cảnh dân số</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-700">{analysis.populationContext}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase text-violet-700">
          <Users size={12} /> Tệp khách phù hợp
        </p>
        <div className="mt-2 space-y-2">
          {analysis.targetAudiences.map((a) => (
            <div key={a.segment} className="rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2">
              <p className="text-xs font-black text-slate-800">{a.segment}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-slate-600">{a.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-2.5">
          <p className="text-[9px] font-black uppercase text-orange-700">Maps</p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-700">{analysis.mapsAdvice}</p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-2.5">
          <p className="text-[9px] font-black uppercase text-blue-700">Ads geo</p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-700">{analysis.adsGeoAdvice}</p>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-2.5">
          <p className="text-[9px] font-black uppercase text-emerald-700">Content</p>
          <p className="mt-0.5 text-[10px] leading-relaxed text-slate-700">{analysis.contentAdvice}</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {analysis.insights.map((tip) => (
          <li key={tip} className="text-[11px] leading-relaxed text-slate-600">💡 {tip}</li>
        ))}
      </ul>
    </>
  );
}

export function StrategyLocationPanel({
  form,
  profile,
  compact,
}: {
  form: Pick<StrategyFormSnapshot, "address" | "scale" | "businessGoal">;
  profile: IndustryProfile;
  compact?: boolean;
}) {
  const analysis = analyzeBusinessLocation(form.address, form.scale, profile, form.businessGoal);
  if (!analysis) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3"
      >
        <p className="flex items-center gap-2 text-[11px] font-black text-indigo-800">
          <MapPinned size={13} /> Khu vực: {analysis.breadthLabel}
        </p>
        <p className="mt-1 text-[10px] text-slate-600">
          {analysis.catchmentRange} · {analysis.targetAudiences[0]?.segment ?? "Khách local"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-indigo-900">
            <MapPinned size={16} /> Phân tích địa chỉ & tệp khách
          </p>
          <p className="mt-1 max-w-lg truncate text-[11px] font-medium text-slate-600" title={analysis.address}>
            {analysis.address}
          </p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-indigo-600">
          Tin cậy {analysis.confidence}%
        </span>
      </div>
      <LocationPanelBody analysis={analysis} />
    </motion.div>
  );
}

export function StrategyLocationPreview({
  address,
  scale,
  profile,
  businessGoal,
}: {
  address: string;
  scale: string;
  profile: IndustryProfile;
  businessGoal: string;
}) {
  const analysis = analyzeBusinessLocation(address, scale, profile, businessGoal);
  if (!analysis || address.trim().length < 8) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-2 overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/40 p-3"
    >
      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-700">
        <Navigation size={12} /> Preview khu vực
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${getMarketBreadthColor(analysis.marketBreadth)}`}>
          {analysis.breadthLabel}
        </span>
        <span className="text-[10px] text-slate-600">
          <Target size={10} className="mr-0.5 inline" />
          {analysis.targetAudiences[0]?.segment}
        </span>
      </div>
    </motion.div>
  );
}
