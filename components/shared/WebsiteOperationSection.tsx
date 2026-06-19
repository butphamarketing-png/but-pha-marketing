"use client";

import { useState } from "react";
import {
  formatPriceVnd,
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_OPERATION_TIER_META,
  type WebsiteOperationTierKey,
} from "@/lib/service-pricing";
import { getCompareFeaturesForPackage, getPackageCompareIndex } from "@/lib/website-operation-comparison";
import { PackageCarousel } from "@/components/shared/PackageCarousel";
import { PricingTierCard } from "@/components/shared/PricingTierCard";

type ConsultHandler = (pkgName: string, pkgPrice: string, tabLabel: string) => void;

const TIER_TABS: { key: WebsiteOperationTierKey; emoji: string; label: string }[] = [
  { key: "yeu", emoji: "🟢", label: "Nhóm Khởi Đầu" },
  { key: "vua", emoji: "🔵", label: "Nhóm Tăng Trưởng" },
  { key: "manh", emoji: "🟣", label: "Nhóm Doanh Nghiệp" },
];

export function WebsiteOperationSection({
  primaryColor,
  onConsult,
  chooseLabel = "Chọn gói",
}: {
  primaryColor: string;
  onConsult: ConsultHandler;
  chooseLabel?: string;
}) {
  const [activeTier, setActiveTier] = useState<WebsiteOperationTierKey>("yeu");
  const meta = WEBSITE_OPERATION_TIER_META[activeTier];
  const packages = WEBSITE_OPERATION_PACKAGES.filter((p) => p.tier === activeTier);
  const activeTab = TIER_TABS.find((t) => t.key === activeTier)!;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {TIER_TABS.map((tab) => {
          const tabMeta = WEBSITE_OPERATION_TIER_META[tab.key];
          const isActive = activeTier === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTier(tab.key)}
              className="rounded-2xl border px-5 py-3 text-sm font-bold transition-all"
              style={
                isActive
                  ? {
                      borderColor: tabMeta.color,
                      backgroundColor: `${tabMeta.color}12`,
                      color: tabMeta.color,
                      boxShadow: `0 8px 24px ${tabMeta.color}18`,
                    }
                  : { borderColor: "rgba(99,102,241,0.15)", color: "#475569", backgroundColor: "#fff" }
              }
            >
              {tab.emoji} {tab.label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-slate-600">{meta.description}</p>

      <PackageCarousel accent={meta.color} itemCount={packages.length} desktopCols={3}>
        {packages.map((pkg) => {
          const featured = "popular" in pkg && pkg.popular;
          const accent = meta.color;
          const compareIndex = getPackageCompareIndex(pkg.name);
          const compareItems = compareIndex >= 0 ? getCompareFeaturesForPackage(compareIndex) : [];

          return (
            <PricingTierCard
              key={pkg.id}
              accent={accent}
              title={pkg.name}
              price={formatPriceVnd(pkg.price)}
              priceNote="/ năm"
              compareItems={compareItems.length > 0 ? compareItems : undefined}
              features={compareItems.length === 0 ? pkg.works : undefined}
              featured={featured}
              ctaLabel={chooseLabel}
              onCta={() =>
                onConsult(`Vận hành ${pkg.name}`, formatPriceVnd(pkg.price), `Gói vận hành — ${activeTab.label}`)
              }
            />
          );
        })}
      </PackageCarousel>
    </div>
  );
}
