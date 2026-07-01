"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { DOMAIN_CATEGORIES } from "@/lib/domain-catalog";
import { formatPriceVnd } from "@/lib/service-pricing";
import type { PricingBadge, PricingItem } from "@/lib/pricing-catalog";
import { PRICING_BADGE_LABEL } from "@/lib/pricing-catalog";

const BADGE_STYLE: Record<PricingBadge, string> = {
  popular: "bg-violet-100 text-violet-700",
  best: "bg-emerald-100 text-emerald-700",
  value: "bg-sky-100 text-sky-700",
};

function DomainCard({
  item,
  accent,
}: {
  item: PricingItem;
  accent: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${item.name}: ${formatPriceVnd(item.price)}/năm`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="group relative flex flex-col rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)]"
      style={{ boxShadow: item.badge ? `inset 3px 0 0 0 ${accent}` : undefined }}
    >
      {item.badge ? (
        <span
          className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLE[item.badge]}`}
        >
          {PRICING_BADGE_LABEL[item.badge]}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-lg font-bold tracking-tight text-indigo-950">{item.name}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-white hover:text-violet-600 group-hover:opacity-100"
          aria-label="Sao chép giá"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
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
  const [activeCategory, setActiveCategory] = useState<"intl" | "vn" | "extended" | "all">("all");
  const q = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.note?.toLowerCase().includes(q);
      const matchCat = activeCategory === "all" || item.domainCategory === activeCategory;
      return matchQuery && matchCat;
    });
  }, [items, q, activeCategory]);

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((item) => (
            <DomainCard key={item.id} item={item} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}
