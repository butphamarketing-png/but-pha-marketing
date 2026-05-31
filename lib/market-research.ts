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
  hep: "2.000–8.000 khách tiềm năng trong bán kính",
  vua: "8.000–25.000 khách tiềm năng khu vực",
  rong: "25.000–100.000+ khách tiềm năng (thành phố/online)",
  "rat-rong": "100.000+ khách tiềm năng (đa tỉnh/toàn quốc)",
};

const DECISION_FACTORS: Record<string, string[]> = {
  "health-beauty": ["Review Google Maps ≥ 4.5★", "Ảnh before/after thật", "Giá minh bạch & đặt lịch dễ"],
  fnb: ["Ảnh món hấp dẫn", "Vị trí & giờ mở cửa rõ", "Khuyến mãi/check-in trên Fanpage"],
  ecommerce: ["Giá & ưu đãi", "Ship nhanh & đổi trả", "Social proof & video sản phẩm"],
  realestate: ["Uy tín thương hiệu", "Thông tin pháp lý rõ", "Case study dự án đã bán"],
  education: ["Feedback phụ huynh", "Cơ sở gần & tiện đón", "Chương trình học cụ thể"],
  default: ["Uy tín online (review, Fanpage)", "Phản hồi nhanh inbox/Zalo", "Thông tin dịch vụ rõ ràng"],
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
  const strengths: string[] = [...readiness.strengths];
  const weaknesses: string[] = readiness.gaps.map((g) => `${g.label}: ${g.impact}`);
  const opportunities: string[] = [];
  const threats: string[] = [];

  if (location?.areaType.includes("Ngoại thành")) {
    opportunities.push("Khu ngoại thành — cạnh tranh Maps thường thấp hơn, dễ lên top 'gần tôi'.");
  }
  if (location && inferCityTier(location) >= 2) {
    opportunities.push("Thị trường tỉnh — CPC ads thấp hơn TP lớn, ROI dễ positive hơn giai đoạn đầu.");
  }
  if (form.businessGoal.includes("thương hiệu")) {
    opportunities.push("Mục tiêu xây thương hiệu — content & UGC tạo moat dài hạn trước đối thủ chỉ chạy ads.");
  }
  if (plan.localBusiness && !form.existingAssets.includes("maps")) {
    opportunities.push("70%+ khách local tìm trên Maps — lấp gap này có thể tăng lead nhanh nhất.");
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
    strengths.push("Đang bắt đầu từ số 0 — linh hoạt triển khai đúng chuẩn ngay từ đầu, không cần sửa legacy.");
  }
  if (opportunities.length === 0) {
    opportunities.push(`${profile.label} — thị trường Việt Nam digital hóa nhanh, kênh online còn room tăng trưởng.`);
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
  const segment = location?.targetAudiences[0]?.segment ?? "khách hàng mục tiêu";
  const goal = form.businessGoal;

  const statement =
    goal.includes("Tăng khách")
      ? `${form.companyName} — ${profile.label} uy tín tại ${city}, tiếp cận ${segment.toLowerCase()} qua Maps & inbox nhanh.`
      : goal.includes("thương hiệu")
        ? `${form.companyName} — thương hiệu ${profile.label} được tin tưởng tại ${city}, nổi bật bằng content & trải nghiệm khách hàng.`
        : goal.includes("doanh thu")
          ? `${form.companyName} — ${profile.label} chuyển đổi cao tại ${city}, kết hợp kênh sở hữu & ads đo lường ROI.`
          : `${form.companyName} — ${profile.label} giữ chân khách bằng dịch vụ tận tâm & nuôi cộng đồng online.`;

  const uspSuggestions = [
    ...profile.whyBullets.slice(0, 2),
    location?.areaType.includes("Trung tâm")
      ? "Vị trí trung tâm — nhấn mạnh tiện lợi & chất lượng phục vụ nhanh"
      : "Gần khách hàng — nhấn mạnh 'gần bạn', phục vụ tận tâm khu vực",
    form.existingAssets.length > 0
      ? `Tận dụng tài sản đã có (${form.existingAssets.join(", ")}) — triển khai nhanh, tiết kiệm setup`
      : "Xây nền tảng chuẩn từ đầu — đồng bộ Maps, Fanpage & Website",
  ];

  const messagingTone =
    profile.id === "fnb" || profile.id === "fashion-retail"
      ? "Trẻ trung, visual-first, khuyến mãi rõ ràng"
      : profile.id === "health-beauty" || profile.id === "pharmacy"
        ? "Chuyên nghiệp, tin cậy, before/after & review"
        : profile.id === "realestate" || profile.id === "construction"
          ? "Uy tín, minh bạch, case study & số liệu cụ thể"
          : "Thân thiện, phản hồi nhanh, giải thích dịch vụ rõ";

  return { statement, uspSuggestions: uspSuggestions.slice(0, 3), messagingTone };
}

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
        rationale: location?.mapsAdvice ?? "Ngành local — khách tìm 'gần tôi' trước khi gọi.",
        action: combo.mapsStack
          ? `${combo.mapsStack.serviceName} + thu review, ảnh cơ sở thật`
          : "Tối ưu profile Maps, NAP chuẩn, xin review sau phục vụ",
      });
    }
    if (ch === "fanpage" && plan.needsFanpage) {
      strategies.push({
        channel: "Fanpage Facebook",
        priority,
        rationale: "Nuôi trust trước khi khách liên hệ — inbox & content hàng ngày.",
        action: combo.fanpageStack
          ? `${combo.fanpageStack.carePosts} bài/tháng + trả lời inbox ≤ 30 phút`
          : "Setup Fanpage chuẩn thương hiệu + lịch content tuần",
      });
    }
    if (ch === "website" && plan.needsWebsite) {
      strategies.push({
        channel: "Website",
        priority,
        rationale: location?.contentAdvice ?? "Kênh sở hữu — SEO & chuyển đổi dài hạn.",
        action: combo.websiteStack
          ? `${combo.websiteStack.buildName} + ${combo.websiteStack.carePosts} bài SEO/tháng`
          : "Landing page chuyên nghiệp + CTA Zalo/form rõ",
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
  const solutions: MarketSolution[] = [];

  if (plan.needsMaps && !form.existingAssets.includes("maps")) {
    solutions.push({
      priority: plan.localBusiness ? 1 : 2,
      title: "Hiện diện Google Maps chuẩn SEO local",
      rationale: plan.localBusiness
        ? `Thị trường cạnh tranh ${competitionLabel(competitionScore)} — Maps là kênh intent cao nhất cho ${profile.label}.`
        : "Bổ sung hiện diện khu vực trên Google.",
      channels: ["Google Maps"],
      timeline: "Tuần 1–3",
      expectedOutcome: "Tăng lượt xem profile & cuộc gọi từ tìm kiếm 'gần tôi'",
    });
  }

  if (plan.needsFanpage && !form.existingAssets.includes("fanpage")) {
    solutions.push({
      priority: solutions.length === 0 ? 1 : 2,
      title: "Xây Fanpage & nuôi content đều",
      rationale: "Khách Việt check Fanpage trước khi quyết định — thiếu kênh này mất 30–50% trust.",
      channels: ["Fanpage Facebook"],
      timeline: "Tuần 2–6",
      expectedOutcome: "Inbox ổn định, tương tác tăng, remarketing audience",
    });
  }

  if (plan.needsWebsite && !form.existingAssets.includes("website")) {
    solutions.push({
      priority: profile.id === "ecommerce" || profile.id === "tech" ? 1 : 2,
      title: "Website chuyên nghiệp + SEO nền tảng",
      rationale: "Kênh sở hữu — không phụ thuộc thuật toán, đo chuyển đổi chính xác.",
      channels: ["Website"],
      timeline: "Tuần 3–8",
      expectedOutcome: "Lead từ organic search & landing page chuyển đổi",
    });
  }

  if (combo.itemIds.some((id) => id.includes("ads")) && !form.existingAssets.includes("ads")) {
    solutions.push({
      priority: 3,
      title: "Quảng cáo có đo lường (sau khi nền tảng sẵn sàng)",
      rationale: location?.adsGeoAdvice ?? "Scale lead sau khi Maps/Fanpage chuẩn — tránh đốt ngân sách không data.",
      channels: ["Facebook Ads", "Google Local Ads"],
      timeline: "Tuần 5+",
      expectedOutcome: `Lead đo được CPL, target ${form.budgetRange}`,
    });
  }

  if (solutions.length === 0) {
    solutions.push({
      priority: 1,
      title: `Tối ưu & scale combo ${combo.tierLabel}`,
      rationale: "Hạ tầng đã có — tập trung content chất lượng, review & tối ưu ads.",
      channels: ["Maps", "Fanpage", "Website"].filter((c) => form.existingAssets.some((a) => a === c.toLowerCase().split(" ")[0])),
      timeline: "Liên tục",
      expectedOutcome: profile.expectedResults[0] ?? "Tăng trưởng bền vững từ kênh số",
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

  const primarySegment = location?.targetAudiences[0]?.segment ?? `Khách ${profile.label}`;
  const behavior = location?.targetAudiences[0]?.reason ?? profile.summary;
  const decisionFactors = DECISION_FACTORS[profile.id] ?? DECISION_FACTORS.default;

  const gapCount = readiness.gaps.filter((g) => g.priority === "high").length;
  const yourGap =
    gapCount === 0
      ? "Hạ tầng marketing tương đương đối thủ top — ưu tiên chất lượng & scale."
      : `Thiếu ${gapCount} kênh quan trọng so với ${Math.round(digitalSaturation)}% doanh nghiệp cùng ngành đã có digital cơ bản.`;

  const typicalCompetitor = [
    plan.needsMaps ? `Maps tối ưu + review ≥ 4.3★ (${plan.localBusiness ? "94" : "72"}% đối thủ local)` : null,
    plan.needsFanpage ? "Fanpage đăng ≥ 12 bài/tháng + inbox nhanh" : null,
    plan.needsWebsite ? "Website/landing có CTA rõ + SEO cơ bản" : null,
    competitionScore >= 60 ? "Chạy ads local/geo có đo CPL" : "Word-of-mouth + Maps organic",
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
      "Phân tích dựa trên mô hình ngành VSIC, dữ liệu hành vi digital VN (2024–2025), địa lý & quy mô DN — ước tính tham khảo, nên xác nhận thêm qua audit thực tế.",
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
      summary: `Ngành ${profile.label} tại ${location?.city ?? "Việt Nam"} — ${competitionLabel(competitionScore)} cạnh tranh digital, ${digitalSaturation}% DN đã có ít nhất 1 kênh online cơ bản.`,
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
