"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { PricingBadge } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";

const BADGE_STYLE = {
  popular: "bg-violet-100 text-violet-700 ring-violet-200/60",
  best: "bg-emerald-100 text-emerald-700 ring-emerald-200/60",
  value: "bg-sky-100 text-sky-700 ring-sky-200/60",
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
