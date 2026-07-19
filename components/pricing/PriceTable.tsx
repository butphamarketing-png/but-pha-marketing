"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

function periodLabel(period?: PricingPeriod) {
  if (period === "month") return { short: "/tháng", full: "mỗi tháng" };
  if (period === "year") return { short: "/năm", full: "mỗi năm" };
  return { short: "", full: "một lần" };
}

export function PriceTable({
  items,
  accent = "#C4955A",
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
      {items.map((item) => {
        const period = periodLabel(item.period);
        const featured = !!item.badge;

        return (
          <motion.li key={item.id} variants={itemVariants} layout>
            <div
              className={`group grid gap-4 py-5 transition sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8 ${
                featured ? "bg-amber-200/[0.03]" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="text-[15px] font-medium text-white/90 sm:text-base">{item.name}</h4>
                  {item.badge ? <TierBadge badge={item.badge} /> : null}
                </div>

                {item.note ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-white/35">{item.note}</p>
                ) : null}

                {item.features && item.features.length > 0 ? (
                  <ul className="mt-3 hidden space-y-1 sm:block">
                    {item.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="text-xs leading-relaxed text-white/35">
                        — {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link
                  href={`/lien-he?service=${encodeURIComponent(item.name)}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-200/70 transition hover:text-amber-100"
                >
                  Tư vấn gói này
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <p
                  className="text-xl font-semibold tabular-nums tracking-tight text-amber-50 sm:text-2xl"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  {formatPriceVnd(item.price)}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/30">
                  {period.short || "một lần"}
                </p>
              </div>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
