"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, MessageCircle } from "lucide-react";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingItem, PricingPeriod } from "@/lib/pricing-catalog";
import { CountUpPrice } from "./CountUpPrice";

function periodSuffix(period?: PricingPeriod) {
  if (period === "month") return "/ tháng";
  if (period === "year") return "/ năm";
  return "";
}

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
      className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-violet-600 group-hover:opacity-100 focus:opacity-100"
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
}: {
  items: PricingItem[];
  accent?: string;
  animatePrices?: boolean;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => {
        const priceLabel = `${formatPriceVnd(item.price)}${periodSuffix(item.period) ? ` ${periodSuffix(item.period)}` : ""}`;
        const useCountUp = animatePrices && index < 4;

        return (
          <li key={item.id} className="group">
            <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3.5 transition-all duration-200 hover:-translate-y-px hover:border-slate-200 hover:bg-white hover:shadow-md sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 sm:text-[15px]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ backgroundColor: accent }} />
                  {item.name}
                </p>
                {item.note ? <p className="mt-1 pl-3.5 text-xs text-slate-500">{item.note}</p> : null}
                {item.features && item.features.length > 0 ? (
                  <ul className="mt-2 hidden space-y-1 pl-3.5 md:block">
                    {item.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="text-xs leading-relaxed text-slate-500">
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href={`/lien-he?service=${encodeURIComponent(item.name)}`}
                  className="mt-2 inline-flex items-center gap-1 pl-3.5 text-xs font-semibold text-violet-600 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                  style={{ color: accent }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Tư vấn gói này
                </Link>
              </div>

              <div className="flex shrink-0 items-center gap-1 pl-3.5 sm:pl-0">
                <p className="text-sm font-bold text-indigo-950 sm:text-right sm:text-base">
                  {useCountUp ? (
                    <CountUpPrice value={item.price} />
                  ) : (
                    formatPriceVnd(item.price)
                  )}
                  {periodSuffix(item.period) ? (
                    <span className="ml-1 text-xs font-medium text-slate-500">{periodSuffix(item.period)}</span>
                  ) : null}
                </p>
                <PriceCopyButton text={`${item.name}: ${priceLabel}`} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
