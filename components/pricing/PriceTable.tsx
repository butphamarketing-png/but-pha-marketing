"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingItem, PricingPeriod } from "@/lib/pricing-catalog";
import {
  searchItemInstantVariants,
  searchItemVariants,
  searchListInstantVariants,
  searchListVariants,
} from "@/lib/banggia-motion";
import { TierBadge } from "./TierBadge";

const ACCENT = "#8B7CF6";

function periodLabel(period?: PricingPeriod) {
  if (period === "month") return { short: "/tháng", full: "mỗi tháng" };
  if (period === "year") return { short: "/năm", full: "mỗi năm" };
  return { short: "", full: "một lần" };
}

function FeatureList({
  features,
  expanded,
  onToggle,
}: {
  features: readonly string[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const mobileVisible = expanded ? features : features.slice(0, 2);
  const canExpand = features.length > 2;

  return (
    <>
      {/* Mobile: 1–2 dòng + xem thêm */}
      <ul className="mt-3 space-y-1 sm:hidden">
        {mobileVisible.map((feature) => (
          <li key={feature} className="text-xs leading-relaxed text-white/38">
            — {feature}
          </li>
        ))}
      </ul>
      {canExpand ? (
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-violet-200/65 sm:hidden"
          aria-expanded={expanded}
        >
          {expanded ? "Thu gọn" : `Xem thêm ${features.length - 2}`}
          <ChevronDown className={`h-3 w-3 transition ${expanded ? "rotate-180" : ""}`} />
        </button>
      ) : null}

      {/* Desktop: tối đa 4 */}
      <ul className="mt-3 hidden space-y-1 sm:block">
        {features.slice(0, 4).map((feature) => (
          <li key={feature} className="text-xs leading-relaxed text-white/35">
            — {feature}
          </li>
        ))}
      </ul>
    </>
  );
}

function PriceRow({ item }: { item: PricingItem }) {
  const [expanded, setExpanded] = useState(false);
  const period = periodLabel(item.period);
  const featured = !!item.badge;
  const features = item.features ?? [];

  return (
    <div
      className={`group relative grid gap-3 py-3.5 transition sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-4 ${
        featured ? "bg-violet-400/[0.04]" : ""
      }`}
      style={featured ? { boxShadow: `inset 2px 0 0 0 ${ACCENT}` } : undefined}
    >
      <div className="min-w-0 pl-0 sm:pl-1" style={featured ? { paddingLeft: "0.75rem" } : undefined}>
        <div className="flex flex-wrap items-center gap-2.5">
          <h4 className="text-[15px] font-medium text-white/90 sm:text-base">{item.name}</h4>
          {item.badge ? <TierBadge badge={item.badge} /> : null}
        </div>

        {item.note ? (
          <p className="mt-1.5 text-xs leading-relaxed text-white/35">{item.note}</p>
        ) : null}

        {features.length > 0 ? (
          <FeatureList
            features={features}
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          />
        ) : null}

        <Link
          href={`/lien-he?service=${encodeURIComponent(item.name)}`}
          className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-violet-200/70 transition hover:text-violet-100 sm:min-h-0"
        >
          Tư vấn gói này
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="shrink-0 text-left sm:pt-0.5 sm:text-right">
        <p
          className={`tabular-nums tracking-tight text-white ${
            featured ? "text-xl font-semibold sm:text-[1.35rem]" : "text-lg font-semibold sm:text-xl"
          }`}
          style={{ fontFamily: '"Be Vietnam Pro", system-ui, sans-serif' }}
        >
          {formatPriceVnd(item.price)}
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/30">
          {period.short || "một lần"}
        </p>
      </div>
    </div>
  );
}

export function PriceTable({
  items,
  accent = ACCENT,
  animatePrices = false,
  searchQuery = "",
}: {
  items: PricingItem[];
  accent?: string;
  animatePrices?: boolean;
  searchQuery?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isFiltering = searchQuery.trim().length > 0;
  const listKey = `${searchQuery.trim().toLowerCase()}-${items.map((item) => item.id).join(",")}`;
  const listVariants = reduceMotion || !isFiltering ? searchListInstantVariants : searchListVariants;
  const itemVariants = reduceMotion || !isFiltering ? searchItemInstantVariants : searchItemVariants;
  void animatePrices;
  void accent;

  return (
    <motion.ul
      key={listKey}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="divide-y divide-white/[0.06] border-y border-white/[0.06]"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants} layout>
          <PriceRow item={item} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
