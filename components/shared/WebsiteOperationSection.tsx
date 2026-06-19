"use client";

import { useState } from "react";
import { Check, Server, Sparkles } from "lucide-react";
import {
  formatPriceVnd,
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_OPERATION_TIER_META,
  WEBSITE_OPERATION_TIERS,
  type WebsiteOperationTierKey,
} from "@/lib/service-pricing";
import { getCompareFeaturesForPackage, getPackageCompareIndex } from "@/lib/website-operation-comparison";
import { PackageCarousel } from "@/components/shared/PackageCarousel";

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
      {/* Tabs */}
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

      {/* 3 cards / row — mobile 3 cột ngang */}
      <PackageCarousel accent={primaryColor} itemCount={packages.length} desktopCols={3}>
        {packages.map((pkg) => {
          const featured = "popular" in pkg && pkg.popular;
          const accent = meta.color;
          const compareIndex = getPackageCompareIndex(pkg.name);
          const compareFeatures =
            compareIndex >= 0 ? getCompareFeaturesForPackage(compareIndex) : [];

          return (
            <div
              key={pkg.id}
              className={`platform-pricing-card landing-interactive-card flex flex-col ${featured ? "platform-pricing-card--featured" : ""}`}
              style={
                featured
                  ? ({ ["--tw-ring-color" as string]: `${accent}45` } as React.CSSProperties)
                  : undefined
              }
            >
              {featured && (
                <div
                  className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                  style={{ backgroundColor: accent, boxShadow: `0 10px 30px ${accent}40` }}
                >
                  <Sparkles size={12} /> Phổ biến
                </div>
              )}

              <div className="flex flex-1 flex-col space-y-5 p-2">
                <h3 className="text-center text-sm font-bold uppercase tracking-wide text-indigo-950">
                  {pkg.name}
                </h3>

                <div className="flex justify-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={
                      featured
                        ? { backgroundColor: accent, color: "#fff" }
                        : { backgroundColor: `${accent}15`, color: accent }
                    }
                  >
                    <Server size={28} />
                  </div>
                </div>

                <ul className="flex-1 space-y-3 border-y border-indigo-100 py-4">
                  {compareFeatures.map((item) => (
                    <li key={item.label} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-right font-semibold text-indigo-950">{item.value}</span>
                    </li>
                  ))}
                  {compareFeatures.length === 0 &&
                    pkg.works.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                        {feature}
                      </li>
                    ))}
                </ul>

                <div className="space-y-1 text-center">
                  <p className="text-2xl font-bold" style={{ color: accent }}>
                    {formatPriceVnd(pkg.price)}
                  </p>
                  <p className="text-xs font-medium text-slate-500">/ năm</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onConsult(
                      `Vận hành ${pkg.name}`,
                      formatPriceVnd(pkg.price),
                      `Gói vận hành — ${activeTab.label}`,
                    )
                  }
                  className="w-full rounded-2xl py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-105"
                  style={{
                    background: `linear-gradient(135deg, #312E81, ${featured ? accent : primaryColor})`,
                  }}
                >
                  {chooseLabel}
                </button>
              </div>
            </div>
          );
        })}
      </PackageCarousel>
    </div>
  );
}
