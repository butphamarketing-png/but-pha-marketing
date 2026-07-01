"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, MessageCircle } from "lucide-react";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingItem, PricingPeriod } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";
import { CountUpPrice } from "./CountUpPrice";

function periodLabel(period?: PricingPeriod) {
  if (period === "month") return { short: "/ tháng", full: "mỗi tháng" };
  if (period === "year") return { short: "/ năm", full: "mỗi năm" };
  return { short: "", full: "một lần" };
}

const BADGE_STYLE = {
  popular: "bg-violet-100 text-violet-700 ring-violet-200/60",
  best: "bg-emerald-100 text-emerald-700 ring-emerald-200/60",
  value: "bg-sky-100 text-sky-700 ring-sky-200/60",
} as const;

function PriceCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-violet-600 sm:opacity-0 sm:group-hover:opacity-100"
      aria-label="Sao chép giá"
      title={copied ? "Đã sao chép" : "Sao chép giá"}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export function PriceTable({
  items,
  accent = "#7C3AED",
  animatePrices = false,
  searchQuery = "",
}: {
  items: PricingItem[];
  accent?: string;
  animatePrices?: boolean;
  searchQuery?: string;
}) {
  const q = searchQuery.trim();

  return (
    <ul className="space-y-3">
      {items.map((item, index) => {
        const period = periodLabel(item.period);
        const priceLabel = `${formatPriceVnd(item.price)}${period.short ? ` ${period.short}` : ""}`;
        const useCountUp = animatePrices && index < 4;
        const featured = !!item.badge;

        return (
          <li key={item.id} className="group">
            <div
              className={`relative overflow-hidden rounded-2xl border bg-white px-4 py-4 transition-all duration-200 sm:px-5 sm:py-5 ${
                featured
                  ? "border-slate-200 shadow-[0_4px_20px_rgba(79,70,229,0.06)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.1)]"
                  : "border-slate-100 hover:border-slate-200 hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              } hover:-translate-y-0.5`}
            >
              <span
                className="absolute inset-y-3 left-0 w-[3px] rounded-r-full opacity-80"
                style={{ backgroundColor: accent }}
                aria-hidden
              />

              <div className="flex flex-col gap-4 pl-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[15px] font-semibold text-slate-800 sm:text-base">{item.name}</h4>
                    {item.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${BADGE_STYLE[item.badge]}`}
                      >
                        {PRICING_BADGE_LABEL[item.badge]}
                      </span>
                    ) : null}
                  </div>

                  {item.note ? (
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{item.note}</p>
                  ) : null}

                  {item.features && item.features.length > 0 ? (
                    <ul className="mt-3 hidden space-y-1.5 sm:block">
                      {item.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-slate-500">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    href={`/lien-he?service=${encodeURIComponent(item.name)}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                    style={{ color: accent }}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Tư vấn gói này
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex shrink-0 items-start gap-1 sm:flex-col sm:items-end">
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-bold tabular-nums tracking-tight text-indigo-950 sm:text-2xl">
                      {useCountUp ? <CountUpPrice value={item.price} /> : formatPriceVnd(item.price)}
                    </p>
                    {period.short ? (
                      <span className="mt-1 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        {period.short}
                      </span>
                    ) : (
                      <span className="mt-1 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                        một lần
                      </span>
                    )}
                  </div>
                  <PriceCopyButton text={`${item.name}: ${priceLabel}`} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
