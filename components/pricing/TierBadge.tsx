"use client";

import type { PricingBadge } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";

const BADGE_STYLE = {
  popular: "border-amber-200/30 text-amber-100",
  best: "border-emerald-400/25 text-emerald-200",
  value: "border-sky-400/25 text-sky-200",
} as const;

export function TierBadge({ badge, className = "" }: { badge: PricingBadge; className?: string }) {
  return (
    <span
      className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${BADGE_STYLE[badge]} ${className}`}
    >
      {PRICING_BADGE_LABEL[badge]}
    </span>
  );
}
