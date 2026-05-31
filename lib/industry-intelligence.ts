import {
  findIndustrySuggestion,
  searchIndustrySuggestions,
  type IndustrySuggestion,
} from "./industry-suggestions";
import { analyzeBusinessLocation } from "./location-intelligence";
import {
  getChannelReason,
  getIndustryInsight,
} from "./consultancy-content";
import {
  buildRecommendedCombo,
  getBudgetFitAssessment,
  getIndustryChannelPlan,
  resolveIndustryProfile,
  calculatePlanTotals,
  type IndustryProfile,
  type StrategyFormSnapshot,
} from "./marketing-strategy-profiles";

export type IndustryMatchType = "exact" | "fuzzy" | "profile" | "unknown";

export type ChannelPriority = {
  id: "website" | "fanpage" | "maps";
  label: string;
  active: boolean;
  stars: number;
  reason: string;
};

export type IndustryAnalysis = {
  input: string;
  matchType: IndustryMatchType;
  confidence: number;
  confidenceLabel: string;
  suggestion: IndustrySuggestion | null;
  profile: IndustryProfile;
  isGenericProfile: boolean;
  channels: ChannelPriority[];
  insight: string;
  topAlternatives: ReturnType<typeof searchIndustrySuggestions>;
};

const PROFILE_SHORT: Record<string, string> = {
  "health-beauty": "Y tế & Làm đẹp",
  fnb: "F&B & Ăn uống",
  ecommerce: "TMĐT & Bán lẻ",
  "fashion-retail": "Thời trang & Mỹ phẩm",
  realestate: "Bất động sản",
  education: "Giáo dục",
  hotel: "Khách sạn & Lưu trú",
  construction: "Xây dựng & Lắp đặt",
  "professional-services": "Dịch vụ chuyên môn",
  automotive: "Ô tô & Garage",
  travel: "Du lịch",
  fitness: "Gym & Fitness",
  events: "Sự kiện & Wedding",
  tech: "Công nghệ & IT",
  pharmacy: "Nhà thuốc",
  logistics: "Logistics",
  agriculture: "Nông sản",
  default: "Doanh nghiệp dịch vụ",
};

export const POPULAR_INDUSTRIES = [
  "Quán cafe",
  "Nha khoa",
  "Spa / Thẩm mỹ",
  "Lắp đặt thang máy",
  "Shop online / TMĐT",
  "Nhà hàng",
  "Bất động sản",
  "Công ty xây dựng",
  "Garage / Sửa xe",
  "Trung tâm Anh ngữ",
] as const;

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function confidenceLabel(score: number, matchType: IndustryMatchType) {
  if (matchType === "exact") return "Khớp chính xác";
  if (score >= 90) return "Khớp rất cao";
  if (score >= 75) return "Khớp tốt";
  if (score >= 55) return "Khớp tương đối";
  if (score >= 30) return "Tư vấn theo mô tả";
  return "Cần chọn rõ hơn";
}

function buildChannelPriorities(profileId: string): ChannelPriority[] {
  const plan = getIndustryChannelPlan(profileId);

  const mapsStars = plan.needsMaps ? (plan.localBusiness ? 3 : 2) : 0;
  const fanpageStars = plan.needsFanpage ? (profileId === "ecommerce" || profileId === "fashion-retail" ? 3 : 2) : 0;
  const webStars = plan.needsWebsite
    ? profileId === "ecommerce" || profileId === "tech" || profileId === "realestate"
      ? 3
      : 2
    : 0;

  return [
    {
      id: "maps" as const,
      label: "Google Maps",
      active: plan.needsMaps,
      stars: mapsStars,
      reason: plan.needsMaps ? getChannelReason(profileId, "maps") : "Không ưu tiên cho ngành này",
    },
    {
      id: "fanpage" as const,
      label: "Fanpage",
      active: plan.needsFanpage,
      stars: fanpageStars,
      reason: plan.needsFanpage ? getChannelReason(profileId, "fanpage") : "Không ưu tiên cho ngành này",
    },
    {
      id: "website" as const,
      label: "Website",
      active: plan.needsWebsite,
      stars: webStars,
      reason: plan.needsWebsite ? getChannelReason(profileId, "website") : "Không ưu tiên cho ngành này",
    },
  ].sort((a, b) => b.stars - a.stars);
}

function buildInsight(
  profile: IndustryProfile,
  businessGoal: string,
  matchType: IndustryMatchType,
  address?: string,
  scale?: string,
) {
  let locationHint = "";
  if (address && address.trim().length >= 8 && scale) {
    const loc = analyzeBusinessLocation(address, scale, profile, businessGoal);
    if (loc) {
      const competition =
        loc.areaType.includes("Trung tâm") ? "cao" : loc.areaType.includes("Ngoại thành") ? "thấp hơn nội thành" : "vừa";
      locationHint = ` · ${loc.city ?? "Khu vực local"}: cạnh tranh ${competition}, bán kính ${loc.catchmentRange}.`;
    }
  }
  return getIndustryInsight(profile.id, businessGoal, matchType, locationHint);
}

export function analyzeIndustryInput(
  industryText: string,
  form?: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets"> &
    Partial<Pick<StrategyFormSnapshot, "address">>,
): IndustryAnalysis {
  const trimmed = industryText.trim();
  const suggestion = trimmed ? findIndustrySuggestion(trimmed) : null;
  const topAlternatives = trimmed ? searchIndustrySuggestions(trimmed, 4) : [];
  const profile = resolveIndustryProfile(trimmed);
  const isGenericProfile = profile.id === "default";

  let matchType: IndustryMatchType = "unknown";
  let confidence = 0;

  if (suggestion && normalize(suggestion.label) === normalize(trimmed)) {
    matchType = "exact";
    confidence = 98;
  } else if (suggestion && topAlternatives[0]) {
    matchType = "fuzzy";
    confidence = Math.min(95, topAlternatives[0].score);
  } else if (!isGenericProfile && trimmed.length >= 2) {
    matchType = "profile";
    confidence = 60;
  } else if (trimmed.length >= 3) {
    confidence = 30;
  }

  const channels = buildChannelPriorities(profile.id);
  const insight = buildInsight(profile, form?.businessGoal ?? "", matchType, form?.address, form?.scale);

  return {
    input: trimmed,
    matchType,
    confidence,
    confidenceLabel: confidenceLabel(confidence, matchType),
    suggestion,
    profile,
    isGenericProfile,
    channels,
    insight,
    topAlternatives,
  };
}

export function getProfileShortLabel(profileId: string) {
  return PROFILE_SHORT[profileId] ?? "Doanh nghiệp";
}

/** Highlight từ khớp trong label dropdown (substring trực tiếp) */
export function highlightIndustryLabel(label: string, query: string) {
  const q = query.trim();
  if (!q || q.length < 2) return [{ text: label, match: false }];

  const idx = label.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return [{ text: label, match: false }];

  return [
    ...(idx > 0 ? [{ text: label.slice(0, idx), match: false }] : []),
    { text: label.slice(idx, idx + q.length), match: true },
    ...(idx + q.length < label.length ? [{ text: label.slice(idx + q.length), match: false }] : []),
  ];
}

export function buildLiveStrategyPreview(
  industryText: string,
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets">,
) {
  const analysis = analyzeIndustryInput(industryText, form);
  if (!analysis.input) return null;

  const combo = buildRecommendedCombo(analysis.profile, form);
  const monthTotal = calculatePlanTotals(combo.itemIds).month;
  const budgetFit = getBudgetFitAssessment(monthTotal, form.budgetRange);

  return { analysis, combo, monthTotal, budgetFit };
}
