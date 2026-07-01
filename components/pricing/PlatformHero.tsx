"use client";

import { Facebook, Globe, MapPin, Monitor } from "lucide-react";
import type { PricingPlatform } from "@/lib/pricing-catalog";

const PLATFORM_ICONS = {
  website: Monitor,
  facebook: Facebook,
  googlemaps: MapPin,
} as const;

export function PlatformHero({ platform }: { platform: PricingPlatform }) {
  const Icon = PLATFORM_ICONS[platform.id] ?? Monitor;

  return (
    <div
      className="relative overflow-hidden border-b border-slate-100 px-5 py-6 sm:px-7 sm:py-7"
      style={{
        background: `linear-gradient(135deg, ${platform.color}12 0%, transparent 55%), linear-gradient(180deg, #ffffff 0%, #fafbff 100%)`,
      }}
    >
      <Icon
        className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 opacity-[0.07] sm:h-32 sm:w-32"
        style={{ color: platform.color }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm"
              style={{ backgroundColor: platform.color }}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-indigo-950 sm:text-2xl">{platform.label}</h2>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{platform.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {platform.highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: `${platform.color}12`, color: platform.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {platform.branches.length} nhóm ·{" "}
          {platform.branches.reduce((sum, branch) => sum + branch.items.length, 0)} gói
        </p>
      </div>
    </div>
  );
}
