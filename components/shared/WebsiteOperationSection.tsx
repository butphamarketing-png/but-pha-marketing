"use client";

import { useState } from "react";
import {
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_OPERATION_TIER_META,
  type WebsiteOperationTierKey,
  formatPriceVnd,
} from "@/lib/service-pricing";
import { getCompareFeaturesForPackage, getPackageCompareIndex } from "@/lib/website-operation-comparison";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";

const TIER_TABS: { key: WebsiteOperationTierKey; label: string }[] = [
  { key: "yeu", label: "Gói Phổ Thông" },
  { key: "vua", label: "Chất Lượng Cao" },
  { key: "manh", label: "Hosting Cao Cấp" },
];

export function WebsiteOperationSection({
  primaryColor,
  sectionLabel = "Hosting",
  chooseLabel,
}: {
  primaryColor: string;
  sectionLabel?: string;
  chooseLabel?: string;
}) {
  const [activeTier, setActiveTier] = useState<WebsiteOperationTierKey>("yeu");
  const meta = WEBSITE_OPERATION_TIER_META[activeTier];
  const packages = WEBSITE_OPERATION_PACKAGES.filter((p) => p.tier === activeTier);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        {TIER_TABS.map((tab) => {
          const isActive = activeTier === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTier(tab.key)}
              className="rounded-md border px-4 py-2 text-sm font-medium transition-all"
              style={
                isActive
                  ? {
                      borderColor: "rgba(139,124,246,0.45)",
                      backgroundColor: "rgba(109,92,230,0.15)",
                      color: "#ddd6fe",
                    }
                  : {
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.45)",
                      backgroundColor: "rgba(255,255,255,0.03)",
                    }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-white/45">{meta.description}</p>

      <PackageCarousel accent={primaryColor || meta.color} itemCount={packages.length} desktopCols={3}>
        {packages.map((pkg) => {
          const featured = "popular" in pkg && pkg.popular;
          const accent = primaryColor || meta.color;
          const compareIndex = getPackageCompareIndex(pkg.name);
          const compareItems = compareIndex >= 0 ? getCompareFeaturesForPackage(compareIndex) : [];

          return (
            <PricingTierCard
              key={pkg.id}
              accent={accent}
              title={pkg.name}
              price={formatPriceVnd(pkg.price)}
              priceNote="/ năm"
              sectionLabel={`${sectionLabel} — ${pkg.name}`}
              compareItems={compareItems.length > 0 ? compareItems : undefined}
              features={compareItems.length === 0 ? pkg.works : undefined}
              featured={featured}
              ctaLabel={chooseLabel || "Đăng ký ngay"}
            />
          );
        })}
      </PackageCarousel>
    </div>
  );
}
