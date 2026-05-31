"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export const STRATEGY_RESULT_SECTIONS = [
  { id: "section-summary", label: "Tóm tắt", short: "1" },
  { id: "section-pricing", label: "Báo giá", short: "2" },
  { id: "section-roadmap", label: "Lộ trình", short: "3" },
  { id: "section-advice", label: "Tư vấn", short: "4" },
  { id: "section-analysis", label: "Phân tích", short: "5" },
] as const;

export function StrategyResultsNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Điều hướng kết quả chiến lược"
      className="sticky top-0 z-20 border-b border-violet-100 bg-white/95 px-4 py-3 backdrop-blur-md print:hidden md:px-8"
    >
      <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-violet-500">Đi tới phần</p>
      <div className="flex gap-2 overflow-x-auto pb-0.5">
        {STRATEGY_RESULT_SECTIONS.map(({ id, label, short }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50/80 px-3 py-1.5 text-[11px] font-black text-violet-800 transition hover:border-violet-400 hover:bg-violet-100"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-700 text-[9px] text-white">
              {short}
            </span>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function SectionHeader({
  step,
  title,
  subtitle,
  id,
}: {
  step: number;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <header id={id} className="scroll-mt-24">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-black text-white shadow-md">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-black text-slate-900 md:text-xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

export function CollapsibleAdvancedPanel({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-violet-50/50"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-sm font-black text-slate-900">{title}</p>
            {subtitle && <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {open ? <ChevronUp size={20} className="shrink-0 text-violet-600" /> : <ChevronDown size={20} className="shrink-0 text-violet-600" />}
      </button>
      {open && <div className="space-y-4 border-t border-violet-100 bg-[#faf8ff] p-4 md:p-6">{children}</div>}
    </div>
  );
}
