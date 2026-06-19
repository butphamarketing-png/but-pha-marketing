import {
  DOMAIN_COM_PRICE,
  formatPriceVnd,
  getWebsiteOperationPackageById,
  getWebsiteOperationPriceById,
  WEBSITE_BUILD_PACKAGES,
  WEBSITE_CARE_PACKAGES,
  WEBSITE_OPERATION_PACKAGES,
  WEBSITE_RENOVATION,
  type WebsiteOperationPackage,
} from "./service-pricing";

export type WebsiteStackRecommendation = {
  buildId: string;
  buildName: string;
  buildPrice: number;
  operationId: string;
  operationName: string;
  operationLabel: string;
  operationPrice: number;
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
  operationBias: "yeu" | "vua" | "manh";
  contentNeed: "low" | "medium" | "high";
};

const INDUSTRY_WEB_PROFILE: Record<string, WebProfile> = {
  "health-beauty": { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
  fnb: { preferredBuild: "web-build-3", minBuild: "web-build-3", operationBias: "yeu", contentNeed: "low" },
  ecommerce: { preferredBuild: "web-build-9", minBuild: "web-build-6", operationBias: "vua", contentNeed: "high" },
  "fashion-retail": { preferredBuild: "web-build-9", minBuild: "web-build-6", operationBias: "vua", contentNeed: "high" },
  realestate: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
  education: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "high" },
  hotel: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
  construction: { preferredBuild: "web-build-9", minBuild: "web-build-6", operationBias: "vua", contentNeed: "medium" },
  "professional-services": { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "yeu", contentNeed: "medium" },
  automotive: { preferredBuild: "web-build-3", minBuild: "web-build-3", operationBias: "yeu", contentNeed: "low" },
  travel: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "high" },
  fitness: { preferredBuild: "web-build-3", minBuild: "web-build-3", operationBias: "yeu", contentNeed: "medium" },
  events: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
  tech: { preferredBuild: "web-build-9", minBuild: "web-build-6", operationBias: "manh", contentNeed: "high" },
  pharmacy: { preferredBuild: "web-build-3", minBuild: "web-build-3", operationBias: "yeu", contentNeed: "low" },
  logistics: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "low" },
  agriculture: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
  default: { preferredBuild: "web-build-6", minBuild: "web-build-3", operationBias: "vua", contentNeed: "medium" },
};

const BUILD_ORDER = ["web-build-3", "web-build-6", "web-build-9", "web-build-12"];

const OPERATION_BY_BUILD: Record<string, string> = {
  "web-build-3": "web-ops-co-ban",
  "web-build-6": "web-ops-tieu-chuan",
  "web-build-9": "web-ops-chuyen-nghiep",
  "web-build-12": "web-ops-phat-trien",
};

const OPERATION_BIAS_DEFAULT: Record<WebProfile["operationBias"], string> = {
  yeu: "web-ops-tieu-chuan",
  vua: "web-ops-chuyen-nghiep",
  manh: "web-ops-phat-trien",
};

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

function getBuildPkg(id: string) {
  return WEBSITE_BUILD_PACKAGES.find((p) => p.id === id) ?? WEBSITE_BUILD_PACKAGES[0];
}

function getCarePkg(id: string) {
  return WEBSITE_CARE_PACKAGES.find((p) => p.id === id) ?? WEBSITE_CARE_PACKAGES[0];
}

function clampBuildId(id: string) {
  return BUILD_ORDER.includes(id) ? id : "web-build-3";
}

function pickOperationPackage(buildId: string, webProfile: WebProfile, scaleTier: number): WebsiteOperationPackage {
  let targetId = OPERATION_BY_BUILD[buildId] ?? OPERATION_BIAS_DEFAULT[webProfile.operationBias];

  if (scaleTier >= 2) {
    const idx = WEBSITE_OPERATION_PACKAGES.findIndex((p) => p.id === targetId);
    targetId = WEBSITE_OPERATION_PACKAGES[Math.min(WEBSITE_OPERATION_PACKAGES.length - 1, idx + 2)]?.id ?? targetId;
  } else if (scaleTier >= 1) {
    const idx = WEBSITE_OPERATION_PACKAGES.findIndex((p) => p.id === targetId);
    targetId = WEBSITE_OPERATION_PACKAGES[Math.min(WEBSITE_OPERATION_PACKAGES.length - 1, idx + 1)]?.id ?? targetId;
  }

  if (webProfile.operationBias === "manh" && buildId !== "web-build-3") {
    const manhMin = WEBSITE_OPERATION_PACKAGES.find((p) => p.tier === "manh");
    if (manhMin) targetId = manhMin.id;
  }

  return getWebsiteOperationPackageById(targetId) ?? WEBSITE_OPERATION_PACKAGES[2];
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
  const operation = pickOperationPackage(buildId, webProfile, input.scaleTier);
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
    `Vận hành "${operation.name}" (${formatPriceVnd(operation.price)}/năm) — khớp bảng gói vận hành /website.`,
  );

  reasons.push(
    `Chăm sóc ${care.posts} bài/tháng (${formatPriceVnd(care.price)}) — ${webProfile.contentNeed === "high" ? "ngành cần content SEO đều" : "duy trì hiện diện Google ổn định"}.`,
  );

  const firstYearSetup = build.price + DOMAIN_COM_PRICE + operation.price;
  const monthlyRecurring = care.price;

  return {
    buildId,
    buildName: build.name,
    buildPrice: build.price,
    operationId: operation.id,
    operationName: operation.name,
    operationLabel: operation.name,
    operationPrice: operation.price,
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
  return [stack.buildId, "web-domain-com", stack.operationId, stack.careId];
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

/** @deprecated use operationId */
export function hostingIdFromGb(_gb: number) {
  return "web-ops-tieu-chuan";
}

export function getHostingLabel(_gb: number) {
  return getWebsiteOperationPackageById("web-ops-tieu-chuan")?.name ?? "Tiêu Chuẩn";
}

export function getHostingPriceByGb(gb: number) {
  return getWebsiteOperationPriceById(hostingIdFromGb(gb));
}
