"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, MapPin, Monitor } from "lucide-react";
import type { PricingPlatform, PricingPlatformId } from "@/lib/pricing-catalog";
import { PRICING_PLATFORMS } from "@/lib/pricing-catalog";
import { tabIconSpring } from "@/lib/banggia-motion";
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
  color: platform.color,
  branchCount: platform.branches.length,
}));

function TabIcon({ active, Icon, tabId }: { active: boolean; Icon: typeof Monitor; tabId: string }) {
  if (!active) {
    return <Icon className="h-4 w-4 shrink-0" aria-hidden />;
  }

  return (
    <motion.span
      key={`${tabId}-active`}
      initial={{ scale: 0.88, rotate: -5 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={tabIconSpring}
      className="inline-flex"
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
    </motion.span>
  );
}

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Nền tảng dịch vụ"
          className="relative flex w-full rounded-2xl border border-slate-100 bg-slate-100/80 p-1 shadow-inner sm:inline-flex sm:w-auto"
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
                className="relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:px-5 sm:py-3"
                style={{ color: active ? tab.color : "#64748B" }}
              >
                {active ? (
                  <motion.span
                    layoutId="banggia-tab-pill"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm"
                    style={{ boxShadow: `0 1px 3px rgba(15,23,42,0.06), inset 0 0 0 1px ${tab.color}22` }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  />
                ) : null}
                <span className="relative flex items-center gap-2">
                  <TabIcon active={active} Icon={Icon} tabId={tab.id} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full lg:max-w-sm">
          <PricingSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            accent={activePlatform.color}
            platformId={activeId}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${activeId}-${searchQuery.trim()}`}
          custom={direction}
          initial={{ opacity: 0, x: isFilteringTransition(direction, searchQuery) ? 0 : direction >= 0 ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction >= 0 ? -12 : 12 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        >
          <PricingDocLayout platform={activePlatform} searchQuery={searchQuery} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function isFilteringTransition(_direction: number, query: string) {
  return query.trim().length > 0;
}
