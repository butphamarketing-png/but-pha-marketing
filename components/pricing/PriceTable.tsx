"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingItem, PricingPeriod } from "@/lib/pricing-catalog";
import {
  searchItemInstantVariants,
  searchItemVariants,
  searchListInstantVariants,
  searchListVariants,
} from "@/lib/banggia-motion";
import { CopyRippleButton } from "./CopyRippleButton";
import { CountUpPrice } from "./CountUpPrice";
import { TierBadge } from "./TierBadge";

function periodLabel(period?: PricingPeriod) {
  if (period === "month") return { short: "/ tháng", full: "mỗi tháng" };
  if (period === "year") return { short: "/ năm", full: "mỗi năm" };
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

  return (
    <motion.ul
      key={listKey}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2.5"
    >
      {items.map((item, index) => {
        const period = periodLabel(item.period);
        const priceLabel = `${formatPriceVnd(item.price)}${period.short ? ` ${period.short}` : ""}`;
        const useCountUp = animatePrices && index < 4 && !isFiltering;
        const featured = !!item.badge;

        return (
          <motion.li key={item.id} variants={itemVariants} layout className="group">
            <div
              className={`relative overflow-hidden border px-4 py-4 transition duration-200 sm:px-5 sm:py-5 ${
                featured
                  ? "border-amber-200/25 bg-gradient-to-r from-amber-200/[0.07] to-transparent"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04]"
              }`}
            >
              <span
                className="absolute inset-y-0 left-0 w-[2px]"
                style={{ backgroundColor: featured ? "#C4955A" : accent, opacity: featured ? 1 : 0.45 }}
                aria-hidden
              />

              <div className="flex flex-col gap-4 pl-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[15px] font-medium text-white/90 sm:text-base">{item.name}</h4>
                    {item.badge ? <TierBadge badge={item.badge} /> : null}
                  </div>

                  {item.note ? (
                    <p className="mt-1.5 text-xs leading-relaxed text-white/40">{item.note}</p>
                  ) : null}

                  {item.features && item.features.length > 0 ? (
                    <ul className="mt-3 hidden space-y-1.5 sm:block">
                      {item.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-white/40">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-200/50" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Link
                    href={`/lien-he?service=${encodeURIComponent(item.name)}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-200/80 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Tư vấn gói này
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex shrink-0 items-start gap-1 sm:flex-col sm:items-end">
                  <div className="text-left sm:text-right">
                    <p
                      className="text-xl font-semibold tabular-nums tracking-tight text-amber-50 sm:text-2xl"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                    >
                      {useCountUp ? <CountUpPrice value={item.price} /> : formatPriceVnd(item.price)}
                    </p>
                    <span className="mt-1 inline-flex border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white/45">
                      {period.short || "một lần"}
                    </span>
                  </div>
                  <CopyRippleButton
                    text={`${item.name}: ${priceLabel}`}
                    className="text-white/40 sm:opacity-0 sm:group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
