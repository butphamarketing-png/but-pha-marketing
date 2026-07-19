"use client";

import { Facebook, MapPin, Monitor } from "lucide-react";
import type { PricingPlatform } from "@/lib/pricing-catalog";

const PLATFORM_ICONS = {
  website: Monitor,
  facebook: Facebook,
  googlemaps: MapPin,
} as const;

export function PlatformHero({ platform }: { platform: PricingPlatform }) {
  const Icon = PLATFORM_ICONS[platform.id] ?? Monitor;
  const packageCount = platform.branches.reduce((sum, branch) => sum + branch.items.length, 0);

  return (
    <div className="border-b border-white/[0.06] px-0 pb-6 sm:pb-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-amber-200/60" aria-hidden />
          <h3
            className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            {platform.label}
          </h3>
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
          {platform.branches.length} nhóm · {packageCount} gói
        </p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/40">{platform.tagline}</p>
      {platform.highlights.length > 0 ? (
        <p className="mt-3 text-xs leading-relaxed text-white/30">
          {platform.highlights.join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
