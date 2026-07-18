"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { PricingBadge } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";

const BADGE_STYLE = {
  popular: "bg-amber-200/15 text-amber-100 ring-amber-200/30",
  best: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/25",
  value: "bg-sky-400/15 text-sky-200 ring-sky-400/25",
} as const;

export function TierBadge({ badge, className = "" }: { badge: PricingBadge; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
      animate={reduceMotion || inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${BADGE_STYLE[badge]} ${className}`}
    >
      {PRICING_BADGE_LABEL[badge]}
    </motion.span>
  );
}
