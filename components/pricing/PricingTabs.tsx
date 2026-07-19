"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, MapPin, Monitor } from "lucide-react";
import type { PricingPlatform, PricingPlatformId } from "@/lib/pricing-catalog";
import { PRICING_PLATFORMS } from "@/lib/pricing-catalog";
import { setBanggiaLastTab } from "@/lib/banggia-prefs";
import { PricingDocLayout, PricingSearchBar } from "./PricingDocLayout";

type PricingTabsProps = {
  activeId: PricingPlatformId;
  onChange: (id: PricingPlatformId) => void;
  direction?: number;
};

const TAB_ICONS = {
  website: Monitor,
  facebook: Facebook,
  googlemaps: MapPin,
} as const;

const TAB_ITEMS = PRICING_PLATFORMS.map((platform) => ({
  id: platform.id,
  label: platform.label,
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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Nền tảng dịch vụ"
          className="flex w-full gap-0 sm:w-auto"
        >
          {TAB_ITEMS.map((tab) => {
            const active = tab.id === activeId;
            const Icon = TAB_ICONS[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex flex-1 items-center justify-center gap-2 px-3 py-3.5 text-sm font-medium transition-colors sm:flex-none sm:px-5 ${
                  active ? "text-violet-200" : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                <span className="truncate">{tab.label}</span>
                {active ? (
                  <motion.span
                    layoutId="banggia-tab-line"
                    className="absolute inset-x-2 bottom-0 h-[2px] bg-violet-400/80 sm:inset-x-3"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="w-full pb-3 lg:max-w-xs lg:pb-3.5">
          <PricingSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            accent="#8B7CF6"
            platformId={activeId}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${activeId}-${searchQuery.trim()}`}
          custom={direction}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <PricingDocLayout platform={activePlatform} searchQuery={searchQuery} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
