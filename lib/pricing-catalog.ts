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

export type PricingItem = {
  id: string;
  name: string;
  price: number;
  period?: PricingPeriod;
  note?: string;
  features?: readonly string[];
};

export type PricingBranch = {
  id: string;
  label: string;
  items: PricingItem[];
};

export type PricingPlatformId = "website" | "facebook" | "googlemaps";

export type PricingPlatform = {
  id: PricingPlatformId;
  label: string;
  color: string;
  branches: PricingBranch[];
};

export const PRICING_PLATFORMS: PricingPlatform[] = [
  {
    id: "website",
    label: "Website",
    color: "#7C3AED",
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
