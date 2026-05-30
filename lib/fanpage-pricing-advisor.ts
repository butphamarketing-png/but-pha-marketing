import {
  FANPAGE_ADS_PACKAGES,
  FANPAGE_BUILD_PACKAGES,
  FANPAGE_CARE_PRICE_PER_POST,
  FANPAGE_CARE_REFERENCE_TIERS,
  fanpageCareItemId,
  fanpageCarePrice,
  formatPriceVnd,
  getFanpageCareTierLabel,
  snapFanpageCarePosts,
} from "./service-pricing";

export type FanpageCareAlternative = {
  posts: number;
  price: number;
  label: string;
  selected: boolean;
};

export type FanpageStackRecommendation = {
  buildId: string | null;
  buildName: string | null;
  buildPrice: number;
  carePosts: number;
  careId: string;
  carePrice: number;
  careTierLabel: string;
  careAlternatives: FanpageCareAlternative[];
  adsId: string | null;
  adsName: string | null;
  adsPrice: number;
  reasons: string[];
  setupOnce: number;
  monthlyRecurring: number;
};

type FanpageProfile = {
  contentNeed: "low" | "medium" | "high";
  preferredBuild: "fb-build-advanced" | "fb-build-pro";
  idealPosts: { starter: number; growth: number; professional: number };
  visualHeavy: boolean;
  inboxPriority: boolean;
};

const INDUSTRY_FANPAGE_PROFILE: Record<string, FanpageProfile> = {
  "health-beauty": { contentNeed: "high", preferredBuild: "fb-build-pro", idealPosts: { starter: 15, growth: 25, professional: 35 }, visualHeavy: true, inboxPriority: true },
  fnb: { contentNeed: "high", preferredBuild: "fb-build-advanced", idealPosts: { starter: 20, growth: 30, professional: 40 }, visualHeavy: true, inboxPriority: true },
  ecommerce: { contentNeed: "high", preferredBuild: "fb-build-pro", idealPosts: { starter: 20, growth: 30, professional: 45 }, visualHeavy: true, inboxPriority: true },
  "fashion-retail": { contentNeed: "high", preferredBuild: "fb-build-pro", idealPosts: { starter: 25, growth: 35, professional: 50 }, visualHeavy: true, inboxPriority: true },
  realestate: { contentNeed: "medium", preferredBuild: "fb-build-pro", idealPosts: { starter: 15, growth: 25, professional: 35 }, visualHeavy: true, inboxPriority: true },
  education: { contentNeed: "high", preferredBuild: "fb-build-advanced", idealPosts: { starter: 15, growth: 25, professional: 35 }, visualHeavy: false, inboxPriority: true },
  hotel: { contentNeed: "medium", preferredBuild: "fb-build-pro", idealPosts: { starter: 15, growth: 25, professional: 30 }, visualHeavy: true, inboxPriority: true },
  construction: { contentNeed: "medium", preferredBuild: "fb-build-advanced", idealPosts: { starter: 15, growth: 20, professional: 25 }, visualHeavy: true, inboxPriority: true },
  "professional-services": { contentNeed: "medium", preferredBuild: "fb-build-advanced", idealPosts: { starter: 10, growth: 15, professional: 20 }, visualHeavy: false, inboxPriority: false },
  automotive: { contentNeed: "medium", preferredBuild: "fb-build-advanced", idealPosts: { starter: 15, growth: 20, professional: 25 }, visualHeavy: false, inboxPriority: true },
  travel: { contentNeed: "high", preferredBuild: "fb-build-pro", idealPosts: { starter: 20, growth: 30, professional: 40 }, visualHeavy: true, inboxPriority: true },
  fitness: { contentNeed: "high", preferredBuild: "fb-build-advanced", idealPosts: { starter: 20, growth: 30, professional: 35 }, visualHeavy: true, inboxPriority: true },
  events: { contentNeed: "high", preferredBuild: "fb-build-pro", idealPosts: { starter: 20, growth: 30, professional: 40 }, visualHeavy: true, inboxPriority: true },
  tech: { contentNeed: "medium", preferredBuild: "fb-build-pro", idealPosts: { starter: 10, growth: 15, professional: 25 }, visualHeavy: false, inboxPriority: false },
  pharmacy: { contentNeed: "low", preferredBuild: "fb-build-advanced", idealPosts: { starter: 10, growth: 15, professional: 20 }, visualHeavy: false, inboxPriority: true },
  logistics: { contentNeed: "low", preferredBuild: "fb-build-advanced", idealPosts: { starter: 10, growth: 15, professional: 18 }, visualHeavy: false, inboxPriority: false },
  agriculture: { contentNeed: "medium", preferredBuild: "fb-build-advanced", idealPosts: { starter: 15, growth: 25, professional: 30 }, visualHeavy: true, inboxPriority: true },
  default: { contentNeed: "medium", preferredBuild: "fb-build-advanced", idealPosts: { starter: 10, growth: 20, professional: 30 }, visualHeavy: false, inboxPriority: true },
};

function getBuildPkg(id: string) {
  return FANPAGE_BUILD_PACKAGES.find((p) => p.id === id) ?? FANPAGE_BUILD_PACKAGES[1];
}

/** Map số bài → id động `fb-care-20` — giá = số bài × 150.000đ */
export function careIdFromPosts(posts: number) {
  return fanpageCareItemId(posts);
}

export function buildFanpageCareAlternatives(selectedPosts: number): FanpageCareAlternative[] {
  return FANPAGE_CARE_REFERENCE_TIERS.map((posts) => ({
    posts,
    price: fanpageCarePrice(posts),
    label: getFanpageCareTierLabel(posts),
    selected: posts === selectedPosts,
  }));
}

function budgetCapPosts(budgetTier: number, hasAds: boolean): number {
  if (budgetTier === 0) return hasAds ? 15 : 20;
  if (budgetTier === 1) return 30;
  return 60;
}

function pickFanpagePosts(
  profile: FanpageProfile,
  tier: "starter" | "growth" | "professional",
  businessGoal: string,
  budgetTier: number,
  scaleTier: number,
  hasAds: boolean,
): number {
  let posts = profile.idealPosts[tier];

  if (profile.contentNeed === "high") posts = Math.max(posts, 20);
  if (businessGoal.includes("thương hiệu")) posts = Math.max(posts, 30);
  if (businessGoal.includes("Tăng khách") || businessGoal.includes("doanh thu")) posts = Math.max(posts, 20);
  if (businessGoal.includes("Giữ chân")) posts = Math.min(posts, 20);
  if (scaleTier >= 2) posts = Math.max(posts, 25);
  if (profile.visualHeavy && tier !== "starter") posts = Math.max(posts, 25);

  posts = Math.min(posts, budgetCapPosts(budgetTier, hasAds));

  return snapFanpageCarePosts(posts);
}

function buildCareReason(posts: number, profile: FanpageProfile, tier: string): string {
  const price = fanpageCarePrice(posts);
  const tierLabel = getFanpageCareTierLabel(posts);
  const ref = FANPAGE_CARE_REFERENCE_TIERS.map(
    (p) => `${p} bài = ${formatPriceVnd(fanpageCarePrice(p))}`,
  ).join(" · ");

  let detail = `Chọn ${posts} bài/th (${formatPriceVnd(price)}) — mức "${tierLabel}" cho gói ${tier}.`;
  detail += ` Công thức: ${formatPriceVnd(FANPAGE_CARE_PRICE_PER_POST)}/bài (${ref}).`;

  if (posts === 10) {
    detail += " Phù hợp duy trì hiện diện cơ bản, ngân sách gọn.";
  } else if (posts === 20) {
    detail += " Cân bằng tốt giữa chi phí và tần suất đăng (~5 bài/tuần).";
  } else if (posts >= 30) {
    detail += profile.visualHeavy
      ? " Ngành visual cần feed dày — 30+ bài giúp giữ tương tác & inbox sôi động."
      : " Tần suất cao hơn giúp thuật toán Facebook ưu tiên hiển thị.";
  }

  return detail;
}

function pickFanpageBuildId(
  profile: FanpageProfile,
  tier: "starter" | "growth" | "professional",
  hasFanpage: boolean,
  businessGoal: string,
): string | null {
  if (hasFanpage) {
    return "fb-build-basic";
  }
  if (tier === "professional" || profile.preferredBuild === "fb-build-pro") {
    if (businessGoal.includes("thương hiệu") || profile.visualHeavy) return "fb-build-pro";
  }
  if (tier === "growth") return "fb-build-advanced";
  return profile.preferredBuild === "fb-build-pro" && businessGoal.includes("doanh thu")
    ? "fb-build-pro"
    : "fb-build-advanced";
}

function pickFanpageAdsId(
  tier: "starter" | "growth" | "professional",
  businessGoal: string,
  budgetTier: number,
  hasAds: boolean,
): string | null {
  if (hasAds) return null;
  if (businessGoal.includes("Giữ chân")) return null;
  if (businessGoal.includes("thương hiệu") && tier !== "professional") return null;
  if (businessGoal.includes("Tăng khách") || businessGoal.includes("doanh thu")) {
    if (budgetTier >= 1) return tier === "professional" ? "fb-ads-over-10" : "fb-ads-under-10";
  }
  if (budgetTier >= 2) return "fb-ads-over-10";
  return null;
}

export function recommendFanpageStack(input: {
  profileId: string;
  businessGoal: string;
  tier: "starter" | "growth" | "professional";
  budgetTier: number;
  scaleTier: number;
  hasFanpage: boolean;
  hasAds: boolean;
}): FanpageStackRecommendation | null {
  const profile = INDUSTRY_FANPAGE_PROFILE[input.profileId] ?? INDUSTRY_FANPAGE_PROFILE.default;
  const posts = pickFanpagePosts(
    profile,
    input.tier,
    input.businessGoal,
    input.budgetTier,
    input.scaleTier,
    input.hasAds,
  );
  const carePrice = fanpageCarePrice(posts);
  const careId = careIdFromPosts(posts);
  const buildId = pickFanpageBuildId(profile, input.tier, input.hasFanpage, input.businessGoal);
  const build = buildId ? getBuildPkg(buildId) : null;
  const adsId = pickFanpageAdsId(input.tier, input.businessGoal, input.budgetTier, input.hasAds);
  const ads = adsId ? FANPAGE_ADS_PACKAGES.find((p) => p.id === adsId) ?? null : null;

  const reasons: string[] = [];

  if (build) {
    if (input.hasFanpage && buildId === "fb-build-basic") {
      reasons.push(
        `Đã có Fanpage → gói Cải tạo (${formatPriceVnd(build.price)}) để làm mới logo, ảnh bìa & thông tin — khớp /facebook.`,
      );
    } else {
      reasons.push(
        `Gói "${build.name}" (${formatPriceVnd(build.price)}) — setup chuẩn thương hiệu${profile.inboxPriority ? ", tối ưu inbox chuyển đổi" : ""}.`,
      );
    }
  }

  reasons.push(buildCareReason(posts, profile, input.tier));

  if (ads) {
    reasons.push(
      `Quảng cáo Fanpage: ${ads.name} (${formatPriceVnd(ads.price)}/th) — phí quản lý, chưa gồm ngân sách ads Facebook.`,
    );
  }

  const setupOnce = build?.price ?? 0;
  const monthlyRecurring = carePrice + (ads?.price ?? 0);

  return {
    buildId,
    buildName: build?.name ?? null,
    buildPrice: setupOnce,
    carePosts: posts,
    careId,
    carePrice,
    careTierLabel: getFanpageCareTierLabel(posts),
    careAlternatives: buildFanpageCareAlternatives(posts),
    adsId,
    adsName: ads?.name ?? null,
    adsPrice: ads?.price ?? 0,
    reasons,
    setupOnce,
    monthlyRecurring,
  };
}

export function recommendFanpageCareOnly(input: {
  profileId: string;
  businessGoal: string;
  tier: "starter" | "growth" | "professional";
  budgetTier: number;
  scaleTier: number;
  hasAds?: boolean;
}) {
  const profile = INDUSTRY_FANPAGE_PROFILE[input.profileId] ?? INDUSTRY_FANPAGE_PROFILE.default;
  const posts = pickFanpagePosts(
    profile,
    input.tier,
    input.businessGoal,
    input.budgetTier,
    input.scaleTier,
    input.hasAds ?? false,
  );
  const careId = careIdFromPosts(posts);
  const carePrice = fanpageCarePrice(posts);
  return {
    careId,
    carePosts: posts,
    carePrice,
    careTierLabel: getFanpageCareTierLabel(posts),
    careAlternatives: buildFanpageCareAlternatives(posts),
    reason: `Đã có Fanpage → ${buildCareReason(posts, profile, input.tier)}`,
  };
}

export function buildFanpageStackItemIds(stack: FanpageStackRecommendation) {
  const ids: string[] = [];
  if (stack.buildId) ids.push(stack.buildId);
  ids.push(stack.careId);
  if (stack.adsId) ids.push(stack.adsId);
  return ids;
}
