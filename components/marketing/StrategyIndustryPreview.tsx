"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Globe, MapPin, Search, Sparkles, Zap } from "lucide-react";
import { searchIndustrySuggestions } from "@/lib/industry-suggestions";
import {
  POPULAR_INDUSTRIES,
  buildLiveStrategyPreview,
  getProfileShortLabel,
  highlightIndustryLabel,
} from "@/lib/industry-intelligence";
import { formatVnd, getIndustryCount } from "@/lib/marketing-strategy-profiles";
import type { StrategyFormSnapshot } from "@/lib/marketing-strategy-profiles";
import { buildDigitalReadiness } from "@/lib/strategy-intelligence";
import { StrategyLocationPanel } from "@/components/marketing/StrategyLocationPanel";

function useDebouncedValue<T>(value: T, delay = 180) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function ChannelStars({ stars }: { stars: number }) {
  if (stars === 0) return <span className="text-[10px] text-slate-400">—</span>;
  return (
    <span className="text-[10px] font-black text-amber-500">
      {"★".repeat(stars)}
      <span className="text-slate-300">{"★".repeat(3 - stars)}</span>
    </span>
  );
}

const CHANNEL_ICON = {
  website: Globe,
  fanpage: Facebook,
  maps: MapPin,
} as const;

export function IndustryAutocomplete({
  value,
  onChange,
  inputClass,
}: {
  value: string;
  onChange: (value: string) => void;
  inputClass: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debouncedQuery = useDebouncedValue(value);

  const suggestions = useMemo(() => searchIndustrySuggestions(debouncedQuery, 12), [debouncedQuery]);
  const showDropdown = open && debouncedQuery.trim().length >= 1 && suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pick = (label: string) => {
    onChange(label);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && suggestions[activeIndex]) {
      e.preventDefault();
      pick(suggestions[activeIndex].label);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400" />
        <input
          className={`${inputClass} pl-10`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => value.trim().length >= 1 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Gõ ngành hoặc mã VSIC — thang máy, cafe, 43290..."
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
        />
      </div>

      {!value.trim() && (
        <div className="mt-3 space-y-2">
          <p className="text-[11px] font-bold text-slate-500">
            {getIndustryCount()}+ ngành masothue · Chọn nhanh:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_INDUSTRIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onChange(item)}
                className="rounded-full border border-violet-200 bg-violet-50/80 px-2.5 py-1 text-[10px] font-bold text-violet-700 transition hover:border-violet-400 hover:bg-violet-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border border-violet-200 bg-white py-1 shadow-xl shadow-violet-900/10"
            role="listbox"
          >
            {suggestions.map((item, index) => {
              const parts = highlightIndustryLabel(item.label, debouncedQuery);
              return (
                <li
                  key={item.vsicCode ? `${item.vsicCode}-${item.label}` : item.label}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(item.label)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-start gap-2 px-4 py-2.5 text-left transition ${index === activeIndex ? "bg-violet-50 text-violet-900" : "text-slate-700 hover:bg-violet-50/60"}`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-snug">
                        {parts.map((p, i) =>
                          p.match ? (
                            <mark key={i} className="rounded bg-violet-200 px-0.5 text-violet-900">
                              {p.text}
                            </mark>
                          ) : (
                            <span key={i}>{p.text}</span>
                          ),
                        )}
                      </p>
                      {item.curated && (
                        <span className="mt-0.5 inline-block text-[9px] font-black uppercase tracking-wide text-emerald-600">
                          Gợi ý phổ biến
                        </span>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {item.vsicCode && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                          {item.vsicCode}
                        </span>
                      )}
                      <span className="max-w-[120px] truncate rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-600">
                        {item.group}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {value.trim().length >= 1 && debouncedQuery === value && suggestions.length === 0 && open && (
        <p className="mt-2 text-[11px] text-slate-500">
          Không tìm thấy mã masothue — vẫn tư vấn theo mô tả của bạn.
        </p>
      )}
    </div>
  );
}

export function StrategyIndustryPreview({
  form,
}: {
  form: Pick<StrategyFormSnapshot, "industry" | "businessGoal" | "scale" | "budgetRange" | "existingAssets" | "address">;
}) {
  const live = useMemo(
    () => buildLiveStrategyPreview(form.industry, form),
    [form.industry, form.businessGoal, form.scale, form.budgetRange, form.existingAssets],
  );

  if (!live) return null;

  const { analysis, combo, monthTotal, budgetFit } = live;
  const readiness = buildDigitalReadiness(analysis.profile.id, form.existingAssets);
  const confidenceColor =
    analysis.confidence >= 75 ? "text-emerald-700 bg-emerald-100" : analysis.confidence >= 45 ? "text-amber-700 bg-amber-100" : "text-slate-600 bg-slate-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50/30 shadow-sm"
    >
      <div className="border-b border-violet-100 bg-white/70 px-4 py-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="flex items-center gap-2 text-xs font-black text-violet-800">
              <Sparkles size={14} className="text-violet-600" /> AI tư vấn sơ bộ
            </p>
            <p className="mt-1 text-sm font-black text-slate-800">
              {analysis.suggestion?.label ?? form.industry}
            </p>
            <p className="text-[11px] font-bold text-violet-600">
              Profile: {getProfileShortLabel(analysis.profile.id)} · {combo.tierLabel}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${confidenceColor}`}>
              {analysis.confidenceLabel} {analysis.confidence > 0 ? `${analysis.confidence}%` : ""}
            </span>
            {analysis.suggestion?.vsicCode && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-600">
                VSIC {analysis.suggestion.vsicCode}
              </span>
            )}
            <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-black text-indigo-700">
              Sẵn sàng số: {readiness.score}/100
            </span>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{analysis.insight}</p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {analysis.channels.map((ch) => {
          const Icon = CHANNEL_ICON[ch.id];
          return (
            <div
              key={ch.id}
              className={`rounded-xl border p-3 ${ch.active ? "border-violet-200 bg-white" : "border-slate-100 bg-slate-50/80 opacity-50"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-600">
                  <Icon size={12} /> {ch.label}
                </p>
                <ChannelStars stars={ch.stars} />
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500">{ch.reason}</p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-violet-100 bg-white/60 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-black text-violet-700">
            <Zap size={11} /> {combo.itemIds.length} gói đề xuất
          </span>
          <span className="text-[10px] font-bold text-slate-600">~{formatVnd(monthTotal)}/tháng</span>
          <span
            className={`text-[10px] font-bold ${budgetFit.status === "good" ? "text-emerald-600" : budgetFit.status === "warning" ? "text-amber-600" : "text-red-600"}`}
          >
            {budgetFit.message}
          </span>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {combo.websiteStack && !form.existingAssets.includes("website") && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-2.5 text-[10px] text-slate-700">
              <p className="font-black text-emerald-800">Website</p>
              <p className="mt-0.5 font-bold">{combo.websiteStack.buildName}</p>
              <p>{combo.websiteStack.hostingGb}GB + {combo.websiteStack.carePosts} bài/th</p>
            </div>
          )}
          {combo.fanpageStack && (
            <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-2.5 text-[10px] text-slate-700">
              <p className="font-black text-blue-800">Fanpage</p>
              <p className="mt-0.5 font-bold">{combo.fanpageStack.carePosts} bài/th · {formatVnd(combo.fanpageStack.carePrice)}</p>
              {combo.fanpageStack.buildName && !form.existingAssets.includes("fanpage") && (
                <p>+ {combo.fanpageStack.buildName}</p>
              )}
            </div>
          )}
          {combo.mapsStack && !form.existingAssets.includes("maps") && (
            <div className="rounded-lg border border-orange-200 bg-orange-50/80 p-2.5 text-[10px] text-slate-700">
              <p className="font-black text-orange-800">Google Maps</p>
              <p className="mt-0.5 font-bold">{combo.mapsStack.serviceName}</p>
              <p>{formatVnd(combo.mapsStack.servicePrice)}</p>
            </div>
          )}
        </div>

        {analysis.topAlternatives.length > 1 && analysis.matchType !== "exact" && (
          <div className="mt-3 border-t border-violet-100 pt-3">
            <p className="text-[10px] font-black uppercase text-slate-500">Có thể bạn muốn:</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {analysis.topAlternatives.slice(1, 4).map((alt) => (
                <span key={alt.label} className="rounded-full border border-violet-200 bg-white px-2 py-0.5 text-[10px] font-bold text-violet-700">
                  {alt.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {form.address.trim().length >= 8 && (
          <div className="mt-3 border-t border-violet-100 pt-3">
            <StrategyLocationPanel form={form} profile={analysis.profile} compact />
          </div>
        )}
      </div>
    </motion.div>
  );
}
