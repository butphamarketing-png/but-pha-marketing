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
      className="group relative flex flex-col rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)]"
      style={{ boxShadow: item.badge ? `inset 3px 0 0 0 ${accent}` : undefined }}
    >
      {item.badge ? (
        <div className="absolute right-3 top-3">
          <TierBadge badge={item.badge} />
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-lg font-bold tracking-tight text-indigo-950">{item.name}</p>
        <CopyRippleButton
          text={`${item.name}: ${formatPriceVnd(item.price)}/năm`}
          className="p-1.5 opacity-0 group-hover:opacity-100"
          iconClassName="h-3.5 w-3.5"
        />
      </div>

      <p className="mt-2 text-xl font-bold tabular-nums text-indigo-950">{formatPriceVnd(item.price)}</p>
      <span className="mt-1 inline-flex w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
        / năm
      </span>
      {item.note ? <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{item.note}</p> : null}
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
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all"
                style={
                  active
                    ? { backgroundColor: `${accent}18`, color: accent, boxShadow: `inset 0 0 0 1px ${accent}44` }
                    : { backgroundColor: "#F8FAFC", color: "#64748B" }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">
          Không có tên miền phù hợp.{" "}
          <Link href="/lien-he" className="font-semibold text-violet-600 hover:underline">
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
