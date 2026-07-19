"use client";

import type { PricingPlatform } from "@/lib/pricing-catalog";

/** Meta ngắn — không lặp tên tab (đã có trên tablist). */
export function PlatformHero({ platform }: { platform: PricingPlatform }) {
  const packageCount = platform.branches.reduce((sum, branch) => sum + branch.items.length, 0);

  return (
    <div className="border-b border-white/[0.06] pb-3.5 sm:pb-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="max-w-xl text-sm leading-relaxed text-white/40">{platform.tagline}</p>
        <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-white/28">
          {platform.branches.length} nhóm · {packageCount} gói
        </p>
      </div>
      {platform.highlights.length > 0 ? (
        <p className="mt-1.5 text-xs leading-relaxed text-white/28">
          {platform.highlights.slice(0, 3).join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
