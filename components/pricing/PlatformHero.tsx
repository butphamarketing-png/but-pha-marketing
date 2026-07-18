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

  return (
    <div className="relative overflow-hidden border-b border-white/[0.06] px-5 py-7 sm:px-8 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 90% at 0% 0%, ${platform.color}22, transparent 55%)`,
        }}
        aria-hidden
      />
      <Icon
        className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 text-white/[0.04] sm:h-36 sm:w-36"
        aria-hidden
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#0b0d12]"
              style={{ background: "linear-gradient(135deg, #f5e6c8, #c4955a)" }}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <h2
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {platform.label}
            </h2>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">{platform.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {platform.highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">
          {platform.branches.length} nhóm ·{" "}
          {platform.branches.reduce((sum, branch) => sum + branch.items.length, 0)} gói
        </p>
      </div>
    </div>
  );
}
