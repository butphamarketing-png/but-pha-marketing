"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DOMAIN_CATEGORIES } from "@/lib/domain-catalog";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingItem } from "@/lib/pricing-catalog";
import {
  searchItemInstantVariants,
  searchItemVariants,
  searchListInstantVariants,
  searchListVariants,
} from "@/lib/banggia-motion";
import { CopyRippleButton } from "./CopyRippleButton";
import { TierBadge } from "./TierBadge";

function DomainCard({ item, accent }: { item: PricingItem; accent: string }) {
  return (
    <div
      className="group relative flex flex-col border border-white/[0.06] bg-white/[0.02] p-4 transition duration-200 hover:border-white/12 hover:bg-white/[0.04]"
      style={{ boxShadow: item.badge ? `inset 2px 0 0 0 ${accent}` : undefined }}
    >
      {item.badge ? (
        <div className="absolute right-3 top-3">
          <TierBadge badge={item.badge} />
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-lg font-semibold tracking-tight text-white/90">{item.name}</p>
        <CopyRippleButton
          text={`${item.name}: ${formatPriceVnd(item.price)}/năm`}
          className="p-1.5 text-white/30 opacity-0 group-hover:opacity-100"
          iconClassName="h-3.5 w-3.5"
        />
      </div>

      <p
        className="mt-2 text-xl font-semibold tabular-nums text-amber-50"
        style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
      >
        {formatPriceVnd(item.price)}
      </p>
      <span className="mt-1 inline-flex w-fit border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white/40">
        / năm
      </span>
      {item.note ? <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/35">{item.note}</p> : null}
    </div>
  );
}

export function DomainPricingGrid({
  items,
  accent,
  searchQuery = "",
}: {
  items: PricingItem[];
  accent: string;
  searchQuery?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<"intl" | "vn" | "extended" | "all">("all");
  const q = searchQuery.trim().toLowerCase();
  const isFiltering = q.length > 0;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchQuery = !q || item.name.toLowerCase().includes(q) || item.note?.toLowerCase().includes(q);
      const matchCat = activeCategory === "all" || item.domainCategory === activeCategory;
      return matchQuery && matchCat;
    });
  }, [items, q, activeCategory]);

  const listVariants = reduceMotion || !isFiltering ? searchListInstantVariants : searchListVariants;
  const itemVariants = reduceMotion || !isFiltering ? searchItemInstantVariants : searchItemVariants;
  const gridKey = `${q}-${activeCategory}-${filtered.map((item) => item.id).join(",")}`;

  const tabs = [
    { id: "all" as const, label: "Tất cả" },
    ...DOMAIN_CATEGORIES.map((cat) => ({
      id: cat.category,
      label: cat.title.replace("Tên miền ", ""),
    })),
  ];

  return (
    <div className="space-y-4">
      {!q ? (
        <div className="flex flex-wrap gap-0 border-b border-white/[0.08]">
          {tabs.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-3.5 py-2.5 text-xs font-medium transition-colors ${
                  active ? "text-amber-100" : "text-white/40 hover:text-white/65"
                }`}
              >
                {tab.label}
                {active ? (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-amber-200/70" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">
          Không có tên miền phù hợp.{" "}
          <Link href="/lien-he" className="font-semibold text-amber-200/80 hover:underline">
            Liên hệ tư vấn
          </Link>
        </p>
      ) : (
        <motion.div
          key={gridKey}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <DomainCard item={item} accent={accent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
