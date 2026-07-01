/**
 * Cấu trúc cây bảng giá — đồng bộ lib/service-pricing.ts & lib/domain-catalog.ts
 */

import { DOMAIN_CATALOG } from "@/lib/domain-catalog";
import {
  FANPAGE_ADS_PACKAGES,
  FANPAGE_BUILD_PACKAGES,
  FANPAGE_CARE_PACKAGES,
  GOOGLE_MAPS_ADS_PACKAGES,
  GOOGLE_MAPS_PACKAGES,
  WEBSITE_ADS_PACKAGES,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_OPERATION_TIER_META,
  WEBSITE_RENOVATION,
} from "@/lib/service-pricing";

export type PricingPeriod = "once" | "month" | "year";

export type PricingBadge = "popular" | "best" | "value";

export type PricingItem = {
  id: string;
  name: string;
  price: number;
  period?: PricingPeriod;
  note?: string;
  features?: readonly string[];
  badge?: PricingBadge;
  /** Nhóm tên miền — chỉ dùng cho branch web-domain */
  domainCategory?: "intl" | "vn" | "extended";
};

export type PricingBranch = {
  id: string;
  label: string;
  items: PricingItem[];
  icon?: string;
};

export type PricingPlatformId = "website" | "facebook" | "googlemaps";

export type PricingPlatform = {
  id: PricingPlatformId;
  label: string;
  color: string;
  tagline: string;
  highlights: readonly string[];
  branches: PricingBranch[];
};

export const PRICING_BADGE_LABEL: Record<PricingBadge, string> = {
  popular: "Phổ biến",
  best: "Lựa chọn tốt",
  value: "Tiết kiệm",
};

export const PRICING_PLATFORMS: PricingPlatform[] = [
  {
    id: "website",
    label: "Website",
    color: "#7C3AED",
    tagline: "Thiết kế, vận hành và phát triển website doanh nghiệp",
    highlights: ["Thiết kế", "Vận hành", "Tên miền", "SEO & Ads"],
    branches: [
      {
        id: "web-build",
        label: "Thiết kế / Xây dựng website",
        items: WEBSITE_BUILD_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: `Gói ${pkg.name}`,
          price: pkg.price,
          period: "once" as const,
          features: pkg.works,
          badge: pkg.id === "web-build-6" ? ("popular" as const) : undefined,
        })),
      },
      {
        id: "web-renovation",
        label: "Cải tạo giao diện",
        items: [
          {
            id: WEBSITE_RENOVATION.id,
            name: WEBSITE_RENOVATION.name,
            price: WEBSITE_RENOVATION.price,
            period: "once",
            features: WEBSITE_RENOVATION.works,
          },
        ],
      },
      {
        id: "web-ops",
        label: "Vận hành website",
        items: WEBSITE_OPERATION_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "year" as const,
          note: WEBSITE_OPERATION_TIER_META[pkg.tier].label,
          features: pkg.works,
          badge:
            pkg.id === "web-ops-sieu-nho"
              ? ("value" as const)
              : "popular" in pkg && pkg.popular
                ? ("popular" as const)
                : undefined,
        })),
      },
      {
        id: "web-domain",
        label: "Tên miền",
        items: DOMAIN_CATALOG.map((domain) => ({
          id: domain.id,
          name: domain.name,
          price: domain.price,
          period: "year" as const,
          note: domain.tagline,
          domainCategory: domain.category,
          badge: domain.id === "com" ? ("popular" as const) : undefined,
        })),
      },
      {
        id: "web-care",
        label: "Chăm sóc website",
        items: WEBSITE_CARE_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: `${pkg.posts} bài/tháng`,
          price: pkg.price,
          period: "month" as const,
          features: pkg.works,
        })),
      },
      {
        id: "web-ads",
        label: "Quảng cáo website",
        items: WEBSITE_ADS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "month" as const,
          note: "Chưa gồm ngân sách ads",
          features: pkg.works,
        })),
      },
    ],
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "#1877F2",
    tagline: "Thiết kế Fanpage, content và quảng cáo Facebook",
    highlights: ["Fanpage", "Content", "Facebook Ads"],
    branches: [
      {
        id: "fb-build",
        label: "Thiết kế Fanpage",
        items: FANPAGE_BUILD_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "once" as const,
          features: pkg.works,
          badge: pkg.id === "fb-build-advanced" ? ("popular" as const) : undefined,
        })),
      },
      {
        id: "fb-care",
        label: "Chăm sóc Fanpage",
        items: FANPAGE_CARE_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: `${pkg.posts} bài/tháng`,
          price: pkg.price,
          period: "month" as const,
          features: pkg.works,
          badge: pkg.posts === 20 ? ("popular" as const) : undefined,
        })),
      },
      {
        id: "fb-ads",
        label: "Quảng cáo Facebook",
        items: FANPAGE_ADS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "month" as const,
          note: "Chưa gồm ngân sách ads",
          features: pkg.works,
        })),
      },
    ],
  },
  {
    id: "googlemaps",
    label: "Google Maps",
    color: "#22C55E",
    tagline: "Google Business Profile, SEO Local và quảng cáo Maps",
    highlights: ["Maps SEO", "Xác minh", "Local Ads"],
    branches: [
      {
        id: "gm-build",
        label: "Thiết kế / Tối ưu Google Maps",
        items: GOOGLE_MAPS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "once" as const,
          features: pkg.works,
          badge: pkg.id === "gm-optimize" ? ("best" as const) : pkg.id === "gm-rebuild" ? ("value" as const) : undefined,
        })),
      },
      {
        id: "gm-ads",
        label: "Quảng cáo Google Maps",
        items: GOOGLE_MAPS_ADS_PACKAGES.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          period: "month" as const,
          note: "Chưa gồm ngân sách ads",
          features: pkg.works,
        })),
      },
    ],
  },
];

export function getPricingPlatform(id: PricingPlatformId): PricingPlatform {
  const platform = PRICING_PLATFORMS.find((entry) => entry.id === id);
  if (!platform) return PRICING_PLATFORMS[0];
  return platform;
}
