"use client";

import type { PricingBadge } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";

const BADGE_STYLE = {
      popular: "border-violet-400/30 bg-violet-400/[0.08] text-violet-100",
  best: "border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-200",
  value: "border-sky-400/30 bg-sky-400/[0.06] text-sky-200",
} as const;

export function TierBadge({ badge, className = "" }: { badge: PricingBadge; className?: string }) {
  return (
    <span
      className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${BADGE_STYLE[badge]} ${className}`}
    >
      {PRICING_BADGE_LABEL[badge]}
    </span>
  );
}
