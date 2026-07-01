"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PricingPlatform, PricingPlatformId } from "@/lib/pricing-catalog";
import { PRICING_PLATFORMS } from "@/lib/pricing-catalog";
import { setBanggiaLastTab } from "@/lib/banggia-prefs";
import { PricingDocLayout, PricingSearchBar } from "./PricingDocLayout";

type PricingTabsProps = {
  activeId: PricingPlatformId;
  onChange: (id: PricingPlatformId) => void;
  direction?: number;
};

const TAB_ITEMS = PRICING_PLATFORMS.map((platform) => ({
  id: platform.id,
  label: platform.label,
  color: platform.color,
  branchCount: platform.branches.length,
}));

export function PricingTabs({ activeId, onChange, direction = 0 }: PricingTabsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const tabListRef = useRef<HTMLDivElement>(null);
  const activePlatform = PRICING_PLATFORMS.find((platform) => platform.id === activeId) as PricingPlatform;

  const handleTabChange = (id: PricingPlatformId) => {
    setSearchQuery("");
    setBanggiaLastTab(id);
    onChange(id);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Nền tảng dịch vụ"
          className="relative flex flex-wrap gap-1 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm sm:inline-flex"
        >
          {TAB_ITEMS.map((tab) => {
            const active = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleTabChange(tab.id)}
                className="relative z-10 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 sm:py-3"
                style={{ color: active ? tab.color : "#64748B" }}
              >
                {active ? (
                  <motion.span
                    layoutId="banggia-tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundColor: `${tab.color}14`,
                      boxShadow: `inset 0 0 0 1.5px ${tab.color}44`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative flex items-center gap-2">
                  {tab.label}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      backgroundColor: active ? `${tab.color}18` : "#F1F5F9",
                      color: active ? tab.color : "#94A3B8",
                    }}
                  >
                    {tab.branchCount}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full sm:max-w-xs">
          <PricingSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            accent={activePlatform.color}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeId}
          custom={direction}
          initial={{ opacity: 0, x: direction >= 0 ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction >= 0 ? -24 : 24 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <PricingDocLayout platform={activePlatform} searchQuery={searchQuery} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
