import { analyzeIndustryInput, type IndustryAnalysis } from "./industry-intelligence";
import {
  analyzeBusinessLocation,
  type LocationAnalysis,
} from "./location-intelligence";
import {
  buildRecommendedCombo,
  calculatePlanTotals,
  formatVnd,
  getIndustryChannelPlan,
  type ComboRecommendation,
  type IndustryProfile,
  type StrategyFormSnapshot,
} from "./marketing-strategy-profiles";
import { buildDigitalReadiness, buildAdsChannelAdvice } from "./strategy-intelligence";
import {
  getChannelReason,
  getConsultancyProfile,
  getDecisionFactors,
  getPositioningLine,
} from "./consultancy-content";

export type SwotAnalysis = {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
};

export type MarketChannelStrategy = {
  channel: string;
  priority: "Ưu tiên 1" | "Ưu tiên 2" | "Hỗ trợ";
  rationale: string;
  action: string;
};

export type MarketSolution = {
  priority: 1 | 2 | 3;
  title: string;
  rationale: string;
  channels: string[];
  timeline: string;
  expectedOutcome: string;
};

export type MarketResearchReport = {
  methodology: string;
  confidence: number;
  marketOverview: {
    label: string;
    sizeEstimate: string;
    competitionLevel: "thấp" | "trung bình" | "cao" | "rất cao";
    competitionScore: number;
    digitalSaturation: number;
    cpcRange: string;
    growthTrend: string;
  };
  customerInsight: {
    primarySegment: string;
    behavior: string;
    decisionFactors: string[];
  };
  competitiveLandscape: {
    summary: string;
    typicalCompetitorProfile: string[];
    yourGap: string;
  };
  positioning: {
    statement: string;
    uspSuggestions: string[];
    messagingTone: string;
  };
  swot: SwotAnalysis;
  channelStrategy: MarketChannelStrategy[];
  solutions: MarketSolution[];
  executiveBrief: string;
};

type CityTier = 1 | 2 | 3;

const COMPETITION_BY_PROFILE: Record<string, Record<CityTier, number>> = {
  "health-beauty": { 1: 88, 2: 58, 3: 38 },
  fnb: { 1: 92, 2: 62, 3: 42 },
  ecommerce: { 1: 85, 2: 70, 3: 55 },
  "fashion-retail": { 1: 90, 2: 65, 3: 45 },
  realestate: { 1: 82, 2: 55, 3: 35 },
  education: { 1: 78, 2: 52, 3: 32 },
  hotel: { 1: 80, 2: 50, 3: 30 },
  construction: { 1: 65, 2: 45, 3: 28 },
  "professional-services": { 1: 72, 2: 48, 3: 30 },
  automotive: { 1: 75, 2: 50, 3: 32 },
  travel: { 1: 70, 2: 48, 3: 30 },
  fitness: { 1: 82, 2: 55, 3: 35 },
  events: { 1: 68, 2: 45, 3: 28 },
  tech: { 1: 78, 2: 58, 3: 40 },
  pharmacy: { 1: 76, 2: 50, 3: 32 },
  logistics: { 1: 60, 2: 42, 3: 25 },
  agriculture: { 1: 45, 2: 35, 3: 22 },
  default: { 1: 70, 2: 48, 3: 30 },
};

const CPC_RANGE: Record<CityTier, { low: number; high: number }> = {
  1: { low: 8_000, high: 35_000 },
  2: { low: 5_000, high: 18_000 },
  3: { low: 3_000, high: 10_000 },
};

const DIGITAL_PENETRATION: Record<CityTier, number> = { 1: 78, 2: 58, 3: 42 };

const MARKET_SIZE_BY_BREADTH: Record<string, string> = {
  hep: "2.000–8.000 khách tiềm năng trong bán kính (ước tính)",
  vua: "8.000–25.000 khách tiềm năng khu vực (ước tính)",
  rong: "25.000–100.000+ khách tiềm năng — thành phố & online",
  "rat-rong": "100.000+ khách — phạm vi đa tỉnh / toàn quốc",
};

function competitionLabel(score: number): MarketResearchReport["marketOverview"]["competitionLevel"] {
  if (score >= 80) return "rất cao";
  if (score >= 60) return "cao";
  if (score >= 40) return "trung bình";
  return "thấp";
}

function inferCityTier(location: LocationAnalysis | null): CityTier {
  if (!location?.city) return 3;
  const tier1 = /Hồ Chí Minh|Hà Nội|Đà Nẵng|Hải Phòng|Cần Thơ/i;
  if (tier1.test(location.city)) return 1;
  const tier2 = /Bình Dương|Đồng Nai|Khánh Hòa|Bà Rịa|Huế|Quảng Ninh|Lâm Đồng/i;
  if (tier2.test(location.city)) return 2;
  return 3;
}

function adjustCompetition(base: number, location: LocationAnalysis | null, plan: ReturnType<typeof getIndustryChannelPlan>): number {
  let score = base;
  if (location?.areaType.includes("Trung tâm")) score += 8;
  if (location?.areaType.includes("Ngoại thành")) score -= 10;
  if (location?.marketBreadth === "rat-rong" || location?.marketBreadth === "rong") score += 5;
  if (location?.marketBreadth === "hep") score -= 8;
  if (!plan.localBusiness) score -= 12;
  return Math.max(15, Math.min(98, score));
}

function buildSwot(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  location: LocationAnalysis | null,
  readiness: ReturnType<typeof buildDigitalReadiness>,
  competitionScore: number,
): SwotAnalysis {
  const plan = getIndustryChannelPlan(profile.id);
  const consultancy = getConsultancyProfile(profile.id);
  const strengths: string[] = [...readiness.strengths];
  const weaknesses: string[] = readiness.gaps.map((g) => `${g.label}: ${g.impact}`);
  const opportunities: string[] = [];
  const threats: string[] = [];

  if (location?.areaType.includes("Ngoại thành")) {
    opportunities.push("Khu ngoại thành — ít đối thủ Maps chuẩn, cơ hội lên top 'gần tôi' nhanh hơn nội thành 30–50%.");
  }
  if (location && inferCityTier(location) >= 2) {
    opportunities.push("Thị trường tỉnh/ven đô — CPC ads thấp hơn TP lớn 40–60%, dễ ROI positive giai đoạn đầu.");
  }
  if (form.businessGoal.includes("thương hiệu")) {
    opportunities.push("Mục tiêu thương hiệu — content & UGC tạo lợi thế dài hạn trước đối thủ chỉ chạy ads ngắn hạn.");
  }
  if (plan.localBusiness && !form.existingAssets.includes("maps")) {
    opportunities.push("Lấp gap Maps trước — kênh intent cao nhất, chi phí organic thấp nhất trong 90 ngày đầu.");
  }
  if (consultancy.marketContext && opportunities.length < 4) {
    opportunities.push(consultancy.marketContext);
  }

  if (competitionScore >= 75) {
    threats.push(`Cạnh tranh ${competitionLabel(competitionScore)} — đối thủ đã đầu tư Maps, review & ads trước.`);
  }
  if (plan.localBusiness && !form.existingAssets.includes("maps")) {
    threats.push("Thiếu Google Maps tối ưu → khách chọn đối thủ có review cao hơn trong bán kính.");
  }
  if (!form.existingAssets.includes("fanpage") && plan.needsFanpage) {
    threats.push("Không có Fanpage active — khách check social trước khi liên hệ, mất trust.");
  }
  profile.risks.slice(0, 2).forEach((r) => threats.push(r));

  if (strengths.length === 0) {
    strengths.push("Khởi đầu sạch — triển khai đúng chuẩn ngay từ đầu, không tốn chi phí sửa hạ tầng cũ.");
  }
  if (opportunities.length === 0) {
    opportunities.push(consultancy.marketContext);
  }

  return {
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    opportunities: opportunities.slice(0, 4),
    threats: threats.slice(0, 4),
  };
}

function buildPositioning(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  location: LocationAnalysis | null,
): MarketResearchReport["positioning"] {
  const city = location?.city ?? "khu vực của bạn";
  const consultancy = getConsultancyProfile(profile.id);

  const statement = getPositioningLine(profile.id, form.companyName, city, form.businessGoal);

  const uspSuggestions = [
    ...profile.whyBullets.slice(0, 2),
    location?.areaType.includes("Trung tâm")
      ? "Vị trí trung tâm — USP tiện lợi, phục vụ nhanh & chất lượng ổn định"
      : "Gần khách hàng — USP 'phục vụ tận tâm khu vực', phản hồi inbox/Zalo ≤ 30 phút",
    form.existingAssets.length > 0
      ? `Tận dụng ${form.existingAssets.map((a) => EXISTING_ASSET_LABEL[a] ?? a).join(", ")} — combo tính cải tạo, triển khai nhanh hơn xây mới`
      : "Xây bộ ba Maps + Fanpage + Website đồng bộ — mọi touchpoint khách thấy cùng một thông điệp",
  ];

  return { statement, uspSuggestions: uspSuggestions.slice(0, 3), messagingTone: consultancy.messagingTone };
}

const EXISTING_ASSET_LABEL: Record<string, string> = {
  website: "Website",
  fanpage: "Fanpage",
  maps: "Google Maps",
  ads: "Quảng cáo",
};

function buildChannelStrategy(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  location: LocationAnalysis | null,
  combo: ComboRecommendation,
): MarketChannelStrategy[] {
  const plan = getIndustryChannelPlan(profile.id);
  const adsAdvice = buildAdsChannelAdvice(profile.id, form);
  const strategies: MarketChannelStrategy[] = [];

  const focusOrder = form.platformFocus && form.platformFocus !== "strategy"
    ? [form.platformFocus, ...(["maps", "fanpage", "website"] as const).filter((c) => c !== form.platformFocus)]
    : (["maps", "fanpage", "website"] as const);

  focusOrder.forEach((ch, i) => {
    const priority = i === 0 ? "Ưu tiên 1" : i === 1 ? "Ưu tiên 2" : "Hỗ trợ";
    if (ch === "maps" && plan.needsMaps) {
      strategies.push({
        channel: "Google Maps",
        priority,
        rationale: location?.mapsAdvice ?? getChannelReason(profile.id, "maps"),
        action: combo.mapsStack
          ? `${combo.mapsStack.serviceName} · Ảnh thật · Quy trình xin review sau mỗi lần phục vụ`
          : "Chuẩn hóa NAP (tên/địa chỉ/SĐT) · Ảnh cơ sở · Category đúng ngành",
      });
    }
    if (ch === "fanpage" && plan.needsFanpage) {
      strategies.push({
        channel: "Fanpage Facebook",
        priority,
        rationale: getChannelReason(profile.id, "fanpage"),
        action: combo.fanpageStack
          ? `${combo.fanpageStack.carePosts} bài/tháng · Inbox ≤ 30 phút · CTA Zalo/form rõ`
          : "Setup chuẩn thương hiệu · Lịch content tuần · Script trả lời inbox",
      });
    }
    if (ch === "website" && plan.needsWebsite) {
      strategies.push({
        channel: "Website",
        priority,
        rationale: location?.contentAdvice ?? getChannelReason(profile.id, "website"),
        action: combo.websiteStack
          ? `${combo.websiteStack.buildName} · ${combo.websiteStack.carePosts} bài SEO/th · Pixel/form đo lead`
          : "Landing chuyên nghiệp · CTA nổi bật · Tốc độ tải < 3 giây",
      });
    }
  });

  if (combo.itemIds.some((id) => id.includes("ads"))) {
    strategies.push({
      channel: "Quảng cáo",
      priority: "Hỗ trợ",
      rationale: adsAdvice.reason,
      action: `${adsAdvice.label} — ${adsAdvice.budgetHint}`,
    });
  }

  return strategies.slice(0, 4);
}

function buildSolutions(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  combo: ComboRecommendation,
  location: LocationAnalysis | null,
  competitionScore: number,
): MarketSolution[] {
  const plan = getIndustryChannelPlan(profile.id);
  const consultancy = getConsultancyProfile(profile.id);
  const solutions: MarketSolution[] = [];

  if (plan.needsMaps && !form.existingAssets.includes("maps")) {
    solutions.push({
      priority: plan.localBusiness ? 1 : 2,
      title: consultancy.solutions.maps.title,
      rationale: plan.localBusiness
        ? `${consultancy.competitiveNote} Cạnh tranh hiện tại: ${competitionLabel(competitionScore)}.`
        : getChannelReason(profile.id, "maps"),
      channels: ["Google Maps"],
      timeline: "Tuần 1–3",
      expectedOutcome: consultancy.solutions.maps.outcome,
    });
  }

  if (plan.needsFanpage && !form.existingAssets.includes("fanpage")) {
    solutions.push({
      priority: solutions.length === 0 ? 1 : 2,
      title: consultancy.solutions.fanpage.title,
      rationale: getChannelReason(profile.id, "fanpage"),
      channels: ["Fanpage Facebook"],
      timeline: "Tuần 2–6",
      expectedOutcome: consultancy.solutions.fanpage.outcome,
    });
  }

  if (plan.needsWebsite && !form.existingAssets.includes("website")) {
    solutions.push({
      priority: profile.id === "ecommerce" || profile.id === "tech" ? 1 : 2,
      title: consultancy.solutions.website.title,
      rationale: getChannelReason(profile.id, "website"),
      channels: ["Website"],
      timeline: "Tuần 3–8",
      expectedOutcome: consultancy.solutions.website.outcome,
    });
  }

  if (combo.itemIds.some((id) => id.includes("ads")) && !form.existingAssets.includes("ads")) {
    solutions.push({
      priority: 3,
      title: consultancy.solutions.ads.title,
      rationale: location?.adsGeoAdvice ?? "Chỉ scale ads sau khi Maps/Fanpage đủ trust — tránh đốt ngân sách không đo được CPL.",
      channels: ["Facebook Ads", "Google Local Ads"],
      timeline: "Tuần 5+",
      expectedOutcome: `${consultancy.solutions.ads.outcome} · Ngân sách: ${form.budgetRange}`,
    });
  }

  if (solutions.length === 0) {
    solutions.push({
      priority: 1,
      title: consultancy.solutions.optimize.title,
      rationale: "Hạ tầng marketing đã có — tập trung nâng chất content, review & tối ưu chi phí/lead.",
      channels: ["Maps", "Fanpage", "Website"].filter((c) =>
        form.existingAssets.some((a) => a === c.toLowerCase().split(" ")[0] || (c === "Fanpage" && a === "fanpage")),
      ),
      timeline: "Liên tục",
      expectedOutcome: consultancy.solutions.optimize.outcome,
    });
  }

  return solutions.sort((a, b) => a.priority - b.priority).slice(0, 4);
}

export function buildMarketResearch(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  industryAnalysis?: IndustryAnalysis,
  combo?: ComboRecommendation,
): MarketResearchReport {
  const analysis = industryAnalysis ?? analyzeIndustryInput(form.industry, form);
  const recommendation = combo ?? buildRecommendedCombo(profile, form);
  const location = analyzeBusinessLocation(form.address, form.scale, profile, form.businessGoal);
  const readiness = buildDigitalReadiness(profile.id, form.existingAssets);
  const plan = getIndustryChannelPlan(profile.id);

  const cityTier = inferCityTier(location);
  const baseCompetition = COMPETITION_BY_PROFILE[profile.id] ?? COMPETITION_BY_PROFILE.default;
  const competitionScore = adjustCompetition(baseCompetition[cityTier], location, plan);
  const cpc = CPC_RANGE[cityTier];
  const digitalSaturation = DIGITAL_PENETRATION[cityTier] + (location?.areaType.includes("Trung tâm") ? 8 : 0);

  const confidence = Math.round(
    (analysis.confidence * 0.35 + (location?.confidence ?? 30) * 0.35 + readiness.score * 0.3),
  );

  const consultancy = getConsultancyProfile(profile.id);
  const primarySegment = location?.targetAudiences[0]?.segment ?? `Khách mục tiêu — ${consultancy.sectorLabel}`;
  const behavior = location?.targetAudiences[0]?.reason ?? consultancy.marketContext;
  const decisionFactors = getDecisionFactors(profile.id);

  const gapCount = readiness.gaps.filter((g) => g.priority === "high").length;
  const yourGap =
    gapCount === 0
      ? "Hạ tầng marketing ngang tầm top ngành — ưu tiên chất lượng content, review & tối ưu CPL."
      : `Còn ${gapCount} kênh trọng yếu — trong khi ~${Math.round(digitalSaturation)}% DN ${consultancy.sectorLabel} cùng khu vực đã có digital cơ bản.`;

  const typicalCompetitor = consultancy.typicalCompetitor.length
    ? consultancy.typicalCompetitor
    : [
        plan.needsMaps ? "Maps tối ưu + review ≥ 4.3★" : null,
        plan.needsFanpage ? "Fanpage content đều + inbox nhanh" : null,
        plan.needsWebsite ? "Website/landing CTA rõ" : null,
      ].filter(Boolean) as string[];

  const swot = buildSwot(profile, form, location, readiness, competitionScore);
  const positioning = buildPositioning(profile, form, location);
  const channelStrategy = buildChannelStrategy(profile, form, location, recommendation);
  const solutions = buildSolutions(profile, form, recommendation, location, competitionScore);

  const growthTrend =
    cityTier === 1
      ? "Tăng trưởng ổn định — cạnh tranh cao, cần differentiation rõ"
      : cityTier === 2
        ? "Tăng trưởng nhanh — digital adoption đang tăng, cơ hội chiếm slot sớm"
        : "Thị trường mới nổi digital — first-mover advantage nếu làm chuẩn";

  const monthTotal = calculatePlanTotals(recommendation.itemIds).month;

  const executiveBrief = [
    `${form.companyName} (${profile.label}) tại ${location?.city ?? "khu vực chưa xác định rõ"}.`,
    `Thị trường: cạnh tranh ${competitionLabel(competitionScore)} (${competitionScore}/100), ${location?.breadthLabel ?? "phạm vi vừa"}.`,
    `Đề xuất: ${recommendation.tierLabel} — ~${formatVnd(monthTotal)}/tháng.`,
    `Ưu tiên triển khai: ${channelStrategy.slice(0, 2).map((c) => c.channel).join(" → ") || solutions[0]?.title}.`,
  ].join(" ");

  return {
    methodology:
      "Mô hình tư vấn Bứt Phá: phân loại ngành VSIC · hành vi khách VN · địa lý & quy mô DN · playbook 17 ngành. Số liệu cạnh tranh/CPC là ước tính tham khảo — nên xác nhận qua audit thực tế trước khi cam kết KPI.",
    confidence,
    marketOverview: {
      label: location?.breadthLabel ?? "Thị trường trực tuyến Việt Nam",
      sizeEstimate: MARKET_SIZE_BY_BREADTH[location?.marketBreadth ?? "vua"],
      competitionLevel: competitionLabel(competitionScore),
      competitionScore,
      digitalSaturation,
      cpcRange: `${formatVnd(cpc.low)} – ${formatVnd(cpc.high)}/click (ước tính)`,
      growthTrend,
    },
    customerInsight: { primarySegment, behavior, decisionFactors },
    competitiveLandscape: {
      summary: `${consultancy.competitiveNote} Tại ${location?.city ?? "Việt Nam"} — cạnh tranh digital ${competitionLabel(competitionScore)} (${competitionScore}/100).`,
      typicalCompetitorProfile: typicalCompetitor,
      yourGap,
    },
    positioning,
    swot,
    channelStrategy,
    solutions,
    executiveBrief,
  };
}

export function formatMarketResearchSummary(report: MarketResearchReport): string {
  const lines = [
    "=== NGHIÊN CỨU THỊ TRƯỜNG ===",
    report.executiveBrief,
    "",
    `Cạnh tranh: ${report.marketOverview.competitionLevel} (${report.marketOverview.competitionScore}/100)`,
    `Quy mô: ${report.marketOverview.sizeEstimate}`,
    `CPC ước tính: ${report.marketOverview.cpcRange}`,
    "",
    "ĐỊNH VỊ:",
    report.positioning.statement,
    "",
    "SWOT:",
    `Mạnh: ${report.swot.strengths.join("; ")}`,
    `Yếu: ${report.swot.weaknesses.join("; ")}`,
    `Cơ hội: ${report.swot.opportunities.join("; ")}`,
    `Thách thức: ${report.swot.threats.join("; ")}`,
    "",
    "GIẢI PHÁP ĐỀ XUẤT:",
    ...report.solutions.map((s) => `${s.priority}. ${s.title} (${s.timeline}) — ${s.expectedOutcome}`),
    "",
    `(${report.methodology})`,
  ];
  return lines.join("\n");
}
