import { formatPriceVnd, GOOGLE_MAPS_ADS_PACKAGES, GOOGLE_MAPS_PACKAGES } from "./service-pricing";

export type MapsStackRecommendation = {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  adsId: string | null;
  adsName: string | null;
  adsPrice: number;
  reasons: string[];
  setupOnce: number;
  monthlyRecurring: number;
  multiLocationNote: string | null;
};

type MapsProfile = {
  priority: "critical" | "important" | "optional";
  preferLocalAds: boolean;
  reviewSensitive: boolean;
};

const INDUSTRY_MAPS_PROFILE: Record<string, MapsProfile> = {
  "health-beauty": { priority: "critical", preferLocalAds: true, reviewSensitive: true },
  fnb: { priority: "critical", preferLocalAds: true, reviewSensitive: true },
  ecommerce: { priority: "optional", preferLocalAds: false, reviewSensitive: false },
  "fashion-retail": { priority: "important", preferLocalAds: false, reviewSensitive: false },
  realestate: { priority: "important", preferLocalAds: true, reviewSensitive: true },
  education: { priority: "important", preferLocalAds: false, reviewSensitive: true },
  hotel: { priority: "critical", preferLocalAds: true, reviewSensitive: true },
  construction: { priority: "important", preferLocalAds: true, reviewSensitive: false },
  "professional-services": { priority: "important", preferLocalAds: false, reviewSensitive: true },
  automotive: { priority: "critical", preferLocalAds: true, reviewSensitive: true },
  travel: { priority: "important", preferLocalAds: false, reviewSensitive: false },
  fitness: { priority: "critical", preferLocalAds: true, reviewSensitive: false },
  events: { priority: "optional", preferLocalAds: false, reviewSensitive: false },
  tech: { priority: "optional", preferLocalAds: false, reviewSensitive: false },
  pharmacy: { priority: "critical", preferLocalAds: true, reviewSensitive: true },
  logistics: { priority: "important", preferLocalAds: true, reviewSensitive: false },
  agriculture: { priority: "important", preferLocalAds: false, reviewSensitive: false },
  default: { priority: "important", preferLocalAds: true, reviewSensitive: true },
};

function getServicePkg(id: string) {
  return GOOGLE_MAPS_PACKAGES.find((p) => p.id === id) ?? GOOGLE_MAPS_PACKAGES[2];
}

function pickMapsServiceId(
  profile: MapsProfile,
  tier: "starter" | "growth" | "professional",
  hasMaps: boolean,
  businessGoal: string,
): string {
  if (hasMaps) {
    if (businessGoal.includes("Tăng khách") || businessGoal.includes("doanh thu") || tier !== "starter") {
      return "gm-optimize";
    }
    return "gm-rebuild";
  }

  if (profile.priority === "critical") {
    return tier === "starter" ? "gm-build" : "gm-optimize";
  }
  if (profile.priority === "important") {
    return tier === "starter" ? "gm-build" : "gm-optimize";
  }
  return tier === "professional" ? "gm-optimize" : "gm-build";
}

function pickMapsAdsId(
  profile: MapsProfile,
  tier: "starter" | "growth" | "professional",
  businessGoal: string,
  budgetTier: number,
  hasAds: boolean,
): string | null {
  if (hasAds) return null;
  if (!profile.preferLocalAds) {
    if (businessGoal.includes("Tăng khách") && budgetTier >= 2) return "gm-ads-under-10";
    return null;
  }
  if (businessGoal.includes("Giữ chân")) return null;
  if (businessGoal.includes("thương hiệu") && tier !== "professional") return null;
  if (businessGoal.includes("Tăng khách") || businessGoal.includes("doanh thu")) {
    if (budgetTier >= 1) return tier === "professional" ? "gm-ads-over-10" : "gm-ads-under-10";
  }
  if (profile.priority === "critical" && budgetTier >= 1) return "gm-ads-under-10";
  return null;
}

function multiLocationNote(scale: string, serviceId: string): string | null {
  if (scale.includes("1 cơ sở")) return null;
  const action = serviceId === "gm-build" ? "xây Maps" : serviceId === "gm-rebuild" ? "cải tạo Maps" : "tối ưu Maps";
  return `${scale} → mỗi cơ sở cần ${action} riêng (tư vấn báo giá theo số lượng địa điểm).`;
}

export function recommendMapsStack(input: {
  profileId: string;
  businessGoal: string;
  scale: string;
  tier: "starter" | "growth" | "professional";
  budgetTier: number;
  scaleTier: number;
  hasMaps: boolean;
  hasAds: boolean;
}): MapsStackRecommendation | null {
  const profile = INDUSTRY_MAPS_PROFILE[input.profileId] ?? INDUSTRY_MAPS_PROFILE.default;

  if (profile.priority === "optional" && input.profileId === "ecommerce") {
    return null;
  }

  const serviceId = pickMapsServiceId(profile, input.tier, input.hasMaps, input.businessGoal);
  const service = getServicePkg(serviceId);
  const adsId = pickMapsAdsId(profile, input.tier, input.businessGoal, input.budgetTier, input.hasAds);
  const ads = adsId ? GOOGLE_MAPS_ADS_PACKAGES.find((p) => p.id === adsId) ?? null : null;

  const reasons: string[] = [];

  if (input.hasMaps) {
    if (serviceId === "gm-rebuild") {
      reasons.push(`Đã có Maps → Cải tạo (${formatPriceVnd(service.price)}) sửa thông tin, danh mục & ảnh cơ bản — gói /google-maps.`);
    } else {
      reasons.push(`Đã có Maps → Tối ưu (${formatPriceVnd(service.price)}) nâng SEO Maps, mô tả chuẩn & hiển thị tìm kiếm.`);
    }
  } else if (serviceId === "gm-build") {
    reasons.push(`Chưa có Maps → Xây dựng (${formatPriceVnd(service.price)}): tạo profile, xác minh DN & setup đầy đủ.`);
  } else {
    reasons.push(`Gói Tối ưu (${formatPriceVnd(service.price)}) — BEST CHOICE trên /google-maps, phù hợp khi cần cạnh tranh local.`);
  }

  if (profile.priority === "critical") {
    reasons.push("Ngành này khách tìm 'gần tôi' trên Google Maps trước khi gọi — ưu tiên cao.");
  }
  if (profile.reviewSensitive) {
    reasons.push("Ngành nhạy cảm review → Maps giúp tích lũy đánh giá & tăng niềm tin.");
  }

  if (ads) {
    reasons.push(
      `Quảng cáo Google Maps: ${ads.name} (${formatPriceVnd(ads.price)}/th) — target bán kính, chưa gồm ngân sách quảng cáo.`,
    );
  }

  const locationNote = multiLocationNote(input.scale, serviceId);

  return {
    serviceId,
    serviceName: service.name,
    servicePrice: service.price,
    adsId,
    adsName: ads?.name ?? null,
    adsPrice: ads?.price ?? 0,
    reasons,
    setupOnce: service.price,
    monthlyRecurring: ads?.price ?? 0,
    multiLocationNote: locationNote,
  };
}

export function buildMapsStackItemIds(stack: MapsStackRecommendation) {
  const ids = [stack.serviceId];
  if (stack.adsId) ids.push(stack.adsId);
  return ids;
}
