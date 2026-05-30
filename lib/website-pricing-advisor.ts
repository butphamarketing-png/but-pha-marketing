import {
  DOMAIN_COM_PRICE,
  formatPriceVnd,
  getHostingPriceByGb,
  HOSTING_PACKAGES,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
  WEBSITE_RENOVATION,
} from "./service-pricing";

export type WebsiteStackRecommendation = {
  buildId: string;
  buildName: string;
  buildPrice: number;
  hostingGb: number;
  hostingId: string;
  hostingLabel: string;
  hostingPrice: number;
  careId: string;
  carePosts: number;
  carePrice: number;
  includeDomain: boolean;
  reasons: string[];
  firstYearSetup: number;
  monthlyRecurring: number;
};

type WebProfile = {
  preferredBuild: string;
  minBuild: string;
  hostingBias: "light" | "standard" | "commerce" | "enterprise";
  contentNeed: "low" | "medium" | "high";
};

const INDUSTRY_WEB_PROFILE: Record<string, WebProfile> = {
  "health-beauty": { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "medium" },
  fnb: { preferredBuild: "web-build-3", minBuild: "web-build-3", hostingBias: "light", contentNeed: "low" },
  ecommerce: { preferredBuild: "web-build-9", minBuild: "web-build-6", hostingBias: "commerce", contentNeed: "high" },
  "fashion-retail": { preferredBuild: "web-build-9", minBuild: "web-build-6", hostingBias: "commerce", contentNeed: "high" },
  realestate: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "medium" },
  education: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "high" },
  hotel: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "medium" },
  construction: { preferredBuild: "web-build-9", minBuild: "web-build-6", hostingBias: "standard", contentNeed: "medium" },
  "professional-services": { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "light", contentNeed: "medium" },
  automotive: { preferredBuild: "web-build-3", minBuild: "web-build-3", hostingBias: "light", contentNeed: "low" },
  travel: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "high" },
  fitness: { preferredBuild: "web-build-3", minBuild: "web-build-3", hostingBias: "light", contentNeed: "medium" },
  events: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "medium" },
  tech: { preferredBuild: "web-build-9", minBuild: "web-build-6", hostingBias: "enterprise", contentNeed: "high" },
  pharmacy: { preferredBuild: "web-build-3", minBuild: "web-build-3", hostingBias: "light", contentNeed: "low" },
  logistics: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "low" },
  agriculture: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "commerce", contentNeed: "medium" },
  default: { preferredBuild: "web-build-6", minBuild: "web-build-3", hostingBias: "standard", contentNeed: "medium" },
};

const BUILD_ORDER = ["web-build-3", "web-build-6", "web-build-9", "web-build-12"];

function buildIndex(id: string) {
  return BUILD_ORDER.indexOf(id);
}

function bumpBuild(id: string, steps: number) {
  const idx = buildIndex(id);
  if (idx === -1) return id;
  return BUILD_ORDER[Math.min(BUILD_ORDER.length - 1, idx + steps)];
}

function lowerBuild(id: string, steps: number) {
  const idx = buildIndex(id);
  if (idx === -1) return id;
  return BUILD_ORDER[Math.max(0, idx - steps)];
}

const HOSTING_FLOOR_BY_BUILD: Record<string, number> = {
  "web-build-3": 3,
  "web-build-6": 7,
  "web-build-9": 16,
  "web-build-12": 30,
};

const HOSTING_BIAS_FLOOR: Record<WebProfile["hostingBias"], number> = {
  light: 3,
  standard: 5,
  commerce: 10,
  enterprise: 20,
};

function getBuildPkg(id: string) {
  return WEBSITE_BUILD_PACKAGES.find((p) => p.id === id) ?? WEBSITE_BUILD_PACKAGES[0];
}

function getCarePkg(id: string) {
  return WEBSITE_CARE_PACKAGES.find((p) => p.id === id) ?? WEBSITE_CARE_PACKAGES[0];
}

function clampBuildId(id: string) {
  return BUILD_ORDER.includes(id) ? id : "web-build-3";
}

function pickHostingGb(buildId: string, webProfile: WebProfile, scaleTier: number): number {
  const floor = Math.max(HOSTING_FLOOR_BY_BUILD[buildId] ?? 3, HOSTING_BIAS_FLOOR[webProfile.hostingBias]);
  let target = floor;
  if (scaleTier >= 2) target = Math.max(target, 20);
  else if (scaleTier >= 1) target = Math.max(target, 10);
  if (webProfile.hostingBias === "enterprise") target = Math.max(target, 30);
  if (webProfile.hostingBias === "commerce" && buildId !== "web-build-3") target = Math.max(target, 16);

  const match = HOSTING_PACKAGES.find((p) => p.gb >= target);
  return match?.gb ?? HOSTING_PACKAGES[HOSTING_PACKAGES.length - 1].gb;
}

function pickWebsiteBuildId(
  profileId: string,
  tier: "starter" | "growth" | "professional",
  scaleTier: number,
  businessGoal: string,
  budgetTier: number,
): string {
  const webProfile = INDUSTRY_WEB_PROFILE[profileId] ?? INDUSTRY_WEB_PROFILE.default;
  let buildId = clampBuildId(webProfile.preferredBuild);

  if (businessGoal.includes("doanh thu") && (profileId === "ecommerce" || profileId === "fashion-retail")) {
    buildId = bumpBuild(buildId, 1);
  }
  if (businessGoal.includes("thương hiệu") && webProfile.contentNeed !== "low") {
    buildId = bumpBuild(buildId, 0);
  }
  if (tier === "professional" || scaleTier >= 2) {
    buildId = bumpBuild(buildId, 1);
  }
  if (tier === "starter" && budgetTier === 0) {
    buildId = lowerBuild(buildId, 1);
  }

  const minBuild = clampBuildId(webProfile.minBuild);
  const minIdx = BUILD_ORDER.indexOf(minBuild);
  const curIdx = BUILD_ORDER.indexOf(clampBuildId(buildId));
  if (curIdx >= 0 && minIdx >= 0 && curIdx < minIdx) buildId = minBuild;

  return clampBuildId(buildId);
}

function pickWebsiteCareId(
  webProfile: WebProfile,
  tier: "starter" | "growth" | "professional",
  businessGoal: string,
  budgetTier: number,
): string {
  if (businessGoal.includes("Giữ chân") && budgetTier === 0) return "web-care-10";

  if (webProfile.contentNeed === "high" || businessGoal.includes("thương hiệu")) {
    if (tier === "professional") return "web-care-30";
    return "web-care-20";
  }
  if (businessGoal.includes("doanh thu") || businessGoal.includes("Tăng khách")) {
    return tier === "starter" ? "web-care-10" : "web-care-20";
  }
  if (tier === "professional") return "web-care-20";
  return "web-care-10";
}

export function hostingIdFromGb(gb: number) {
  return `web-data-${gb}`;
}

export function getHostingLabel(gb: number) {
  return HOSTING_PACKAGES.find((p) => p.gb === gb)?.label ?? `${gb}GB hosting/năm`;
}

export function recommendWebsiteStack(input: {
  profileId: string;
  businessGoal: string;
  scale: string;
  budgetRange: string;
  tier: "starter" | "growth" | "professional";
  budgetTier: number;
  scaleTier: number;
  hasWebsite: boolean;
}): WebsiteStackRecommendation | null {
  if (input.hasWebsite) return null;

  const webProfile = INDUSTRY_WEB_PROFILE[input.profileId] ?? INDUSTRY_WEB_PROFILE.default;
  const buildId = pickWebsiteBuildId(
    input.profileId,
    input.tier,
    input.scaleTier,
    input.businessGoal,
    input.budgetTier,
  );
  const build = getBuildPkg(buildId);
  const hostingGb = pickHostingGb(buildId, webProfile, input.scaleTier);
  const hostingLabel = getHostingLabel(hostingGb);
  const hostingPrice = getHostingPriceByGb(hostingGb);
  const careId = pickWebsiteCareId(webProfile, input.tier, input.businessGoal, input.budgetTier);
  const care = getCarePkg(careId);

  const reasons: string[] = [];

  reasons.push(
    `Gói "${build.name}" (${formatPriceVnd(build.price)}) — phù hợp ngành ${input.profileId === "default" ? "dịch vụ" : input.profileId} và mục tiêu ${input.businessGoal.toLowerCase()}.`,
  );

  if (buildId === "web-build-9" || buildId === "web-build-12") {
    reasons.push(`Cần tối ưu chuyển đổi (CRO) & tích hợp marketing — đúng định hướng gói ${build.name} trên /website.`);
  } else if (buildId === "web-build-6") {
    reasons.push("Gói Tối ưu cân bằng SEO + UX — phù hợp doanh nghiệp cần website chuyên nghiệp mà chưa cần hệ thống phức tạp.");
  } else {
    reasons.push("Gói Giới thiệu đủ cho landing giới thiệu + form liên hệ — tiết kiệm chi phí setup ban đầu.");
  }

  reasons.push(
    `Hosting ${hostingGb}GB/năm (${formatPriceVnd(hostingPrice)}) — ${hostingLabel.toLowerCase()}, khớp bảng slider /website.`,
  );

  reasons.push(
    `Chăm sóc ${care.posts} bài/tháng (${formatPriceVnd(care.price)}) — ${webProfile.contentNeed === "high" ? "ngành cần content SEO đều" : "duy trì hiện diện Google ổn định"}.`,
  );

  const firstYearSetup = build.price + DOMAIN_COM_PRICE + hostingPrice;
  const monthlyRecurring = care.price;

  return {
    buildId,
    buildName: build.name,
    buildPrice: build.price,
    hostingGb,
    hostingId: hostingIdFromGb(hostingGb),
    hostingLabel,
    hostingPrice,
    careId,
    carePosts: care.posts,
    carePrice: care.price,
    includeDomain: true,
    reasons,
    firstYearSetup,
    monthlyRecurring,
  };
}

export function buildWebsiteStackItemIds(stack: WebsiteStackRecommendation) {
  return [stack.buildId, "web-domain-com", stack.hostingId, stack.careId];
}

export function recommendWebsiteCareOnly(input: {
  profileId: string;
  businessGoal: string;
  tier: "starter" | "growth" | "professional";
  budgetTier: number;
}) {
  const webProfile = INDUSTRY_WEB_PROFILE[input.profileId] ?? INDUSTRY_WEB_PROFILE.default;
  const careId = pickWebsiteCareId(webProfile, input.tier, input.businessGoal, input.budgetTier);
  const care = getCarePkg(careId);
  return {
    careId,
    carePosts: care.posts,
    carePrice: care.price,
    reason: `Đã có Website → cải tạo giao diện ${formatPriceVnd(WEBSITE_RENOVATION.price)} (một lần, khớp /website) + chăm sóc ${care.posts} bài/th (${formatPriceVnd(care.price)}).`,
  };
}
