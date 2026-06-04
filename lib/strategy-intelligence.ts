import {
  buildRecommendedCombo,
  calculatePlanTotals,
  getIndustryChannelPlan,
  getItemBilling,
  getPricingItemById,
  parsePriceVnd,
  formatVnd,
  type ComboRecommendation,
  type IndustryProfile,
  type StrategyFormSnapshot,
} from "./marketing-strategy-profiles";

export type ReadinessGap = {
  id: string;
  label: string;
  priority: "high" | "medium" | "low";
  impact: string;
};

export type DigitalReadiness = {
  score: number;
  grade: string;
  gradeColor: "red" | "amber" | "emerald" | "violet";
  gaps: ReadinessGap[];
  strengths: string[];
  summary: string;
};

export type KpiProjection = {
  metric: string;
  range: string;
  timeline: string;
  note: string;
};

export type ActionStep = {
  week: string;
  title: string;
  tasks: string[];
  channel: "maps" | "fanpage" | "website" | "ads" | "general";
};

export type AdsChannelAdvice = {
  channel: "facebook" | "google-maps" | "both";
  label: string;
  reason: string;
  budgetHint: string;
};

const ASSET_LABELS: Record<string, string> = {
  website: "Website",
  fanpage: "Fanpage",
  maps: "Google Maps",
  ads: "Quảng cáo",
};

function hasAsset(assets: string[], id: string) {
  return assets.includes(id);
}

export function buildDigitalReadiness(
  profileId: string,
  existingAssets: string[],
): DigitalReadiness {
  const plan = getIndustryChannelPlan(profileId);
  const gaps: ReadinessGap[] = [];
  const strengths: string[] = [];
  let score = 15;

  if (plan.needsMaps) {
    if (hasAsset(existingAssets, "maps")) {
      score += 22;
      strengths.push("Google Maps — khách tìm 'gần tôi' đã thấy bạn");
    } else {
      gaps.push({
        id: "maps",
        label: "Google Maps",
        priority: plan.localBusiness ? "high" : "medium",
        impact: plan.localBusiness ? "Mất 40–60% khách local tìm trên Maps" : "Thiếu hiện diện khu vực",
      });
    }
  }

  if (plan.needsFanpage) {
    if (hasAsset(existingAssets, "fanpage")) {
      score += 20;
      strengths.push("Fanpage — kênh nuôi tương tác & inbox đã có");
    } else {
      gaps.push({
        id: "fanpage",
        label: "Fanpage",
        priority: "high",
        impact: "Khách không có nơi tin tưởng trước khi liên hệ",
      });
    }
  }

  if (plan.needsWebsite) {
    if (hasAsset(existingAssets, "website")) {
      score += 22;
      strengths.push("Website — kênh sở hữu, SEO & chuyển đổi");
    } else {
      gaps.push({
        id: "website",
        label: "Website",
        priority: profileId === "ecommerce" || profileId === "tech" ? "high" : "medium",
        impact: "Phụ thuộc nền tảng thuê, khó đo lường chuyển đổi",
      });
    }
  }

  if (hasAsset(existingAssets, "ads")) {
    score += 15;
    strengths.push("Đang chạy ads — có data để tối ưu chi phí/lead");
  } else if (plan.localBusiness || profileId === "ecommerce") {
    gaps.push({
      id: "ads",
      label: "Quảng cáo",
      priority: "low",
      impact: "Chưa khai thác kênh trả phí có đo lường",
    });
  }

  score = Math.min(100, score);

  let grade: string;
  let gradeColor: DigitalReadiness["gradeColor"];
  if (score >= 80) {
    grade = "Sẵn sàng scale";
    gradeColor = "violet";
  } else if (score >= 55) {
    grade = "Nền tảng ổn";
    gradeColor = "emerald";
  } else if (score >= 30) {
    grade = "Cần bổ sung";
    gradeColor = "amber";
  } else {
    grade = "Khởi đầu";
    gradeColor = "red";
  }

  const summary =
    gaps.length === 0
      ? "Hạ tầng marketing khá đầy đủ — tập trung tối ưu content & quảng cáo."
      : `Còn thiếu ${gaps.filter((g) => g.priority === "high").length || gaps.length} kênh quan trọng — ưu tiên lấp gap trước khi scale ads.`;

  return { score, grade, gradeColor, gaps, strengths, summary };
}

export function buildAdsChannelAdvice(
  profileId: string,
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "existingAssets">,
): AdsChannelAdvice {
  const plan = getIndustryChannelPlan(profileId);
  const multiLocation = form.scale.includes("2–5") || form.scale.includes("2-5") || form.scale.includes("Trên 5");

  if (hasAsset(form.existingAssets, "ads")) {
    return {
      channel: "both",
      label: "Tối ưu ads hiện tại",
      reason: "Bạn đang chạy quảng cáo — ưu tiên audit chi phí/lead, remarketing & creative mới.",
      budgetHint: "Giữ 60% ngân sách ads cho kênh đang có ROI tốt nhất.",
    };
  }

  if (form.businessGoal.includes("thương hiệu")) {
    return {
      channel: "facebook",
      label: "Facebook Ads",
      reason: "Mục tiêu thương hiệu → FB phù hợp reach, video & engagement trước khi chuyển đổi.",
      budgetHint: "Bắt đầu 2–3tr/th — test creative 2 tuần rồi scale.",
    };
  }

  if (plan.localBusiness && plan.adsPreference === "gm") {
    return {
      channel: "google-maps",
      label: "Google Maps / Local Ads",
      reason: `${plan.localBusiness ? "Ngành local" : "Dịch vụ tại chỗ"} — khách có intent cao khi tìm trên Maps.`,
      budgetHint: multiLocation ? "5–8tr/th chia theo từng chi nhánh." : "3–5tr/th sau khi Maps chuẩn.",
    };
  }

  if (plan.adsPreference === "fb" || profileId === "ecommerce" || profileId === "fashion-retail") {
    return {
      channel: "facebook",
      label: "Facebook Ads",
      reason: "Ngành phù hợp retargeting, catalog & inbox — chuyển đổi nhanh trên social.",
      budgetHint: "3–5tr/th sau khi Fanpage & content ổn định 2 tuần.",
    };
  }

  return {
    channel: "both",
    label: "Facebook + Google Local",
    reason: "Kết hợp nuôi lead (FB) và bắt khách có intent (Maps) cho hiệu quả cân bằng.",
    budgetHint: "Chia 50/50 ngân sách ads, đo lead riêng từng kênh.",
  };
}

export function buildKpiProjections(
  profile: IndustryProfile,
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange">,
): KpiProjection[] {
  const isLocal = getIndustryChannelPlan(profile.id).localBusiness;
  const isLarge = form.scale.includes("Trên 5");
  const isLowBudget = form.budgetRange.includes("Dưới 5");

  const leadRange = isLocal
    ? isLowBudget
      ? "8–20 lead/tháng"
      : isLarge
        ? "40–80 lead/tháng"
        : "15–40 lead/tháng"
    : isLowBudget
      ? "5–15 inquiry/tháng"
      : "20–50 inquiry/tháng";

  const timeline = isLowBudget ? "Sau 60–90 ngày" : "Sau 45–60 ngày";

  if (form.businessGoal.includes("Tăng khách")) {
    return [
      { metric: "Lead / liên hệ mới", range: leadRange, timeline, note: "Từ Maps, inbox FB & form web" },
      { metric: "Tỷ lệ phản hồi inbox", range: "≥ 85% trong 30 phút", timeline: "Tuần 3–4", note: "CSKH nhanh = chốt cao hơn 2×" },
      { metric: "Review Google Maps", range: isLocal ? "+5–15 review/tháng" : "+3–8 review/tháng", timeline: "Tháng 2–3", note: "Nhờ quy trình xin review sau phục vụ" },
    ];
  }

  if (form.businessGoal.includes("doanh thu")) {
    return [
      { metric: "Lead chất lượng", range: leadRange, timeline, note: "Lọc lead qua CTA rõ & landing page" },
      { metric: "Tỷ lệ chốt", range: isLocal ? "15–25%" : "8–15%", timeline: "Tháng 2+", note: "Remarketing cho lead chưa chốt" },
      { metric: "Doanh thu từ kênh số", range: isLowBudget ? "+10–20%" : "+20–40%", timeline: "Quý 1", note: "So với baseline trước triển khai" },
    ];
  }

  if (form.businessGoal.includes("thương hiệu")) {
    return [
      { metric: "Reach organic + paid", range: isLowBudget ? "5K–15K/tháng" : "20K–60K/tháng", timeline: "Tháng 2–3", note: "Content đều + video ngắn" },
      { metric: "Tương tác Fanpage", range: "+30–80%/tháng", timeline: "45 ngày", note: "So với tháng trước triển khai" },
      { metric: "Branded search", range: "+15–30%", timeline: "Quý 1", note: "Khách gõ tên thương hiệu trên Google" },
    ];
  }

  return [
    { metric: "Tỷ lệ quay lại", range: "+10–25%", timeline: "Quý 1", note: "Email/Zalo remarketing + content nuôi" },
    { metric: "Review & rating", range: "Giữ ≥ 4.5 sao", timeline: "Liên tục", note: "Phản hồi review trong 24h" },
    { metric: "Engagement content", range: "+20–50%", timeline: "60 ngày", note: "Content có giá trị, không chỉ bán hàng" },
  ];
}

export function buildActionPlan(
  profile: IndustryProfile,
  form: Pick<StrategyFormSnapshot, "existingAssets" | "businessGoal">,
  combo: ComboRecommendation,
): ActionStep[] {
  const has = (id: string) => form.existingAssets.includes(id);
  const steps: ActionStep[] = [];

  const week1Tasks: string[] = ["Chốt gói & thu logo, ảnh sản phẩm/dịch vụ"];
  if (!has("maps") && combo.itemIds.some((id) => id.startsWith("gm-"))) {
    week1Tasks.push("Claim/verify Google Business Profile", "Chuẩn hóa tên, địa chỉ, giờ mở cửa");
  }
  if (!has("fanpage") && combo.itemIds.some((id) => id.startsWith("fb-"))) {
    week1Tasks.push("Tạo/chuẩn hóa Fanpage — avatar, cover, about");
  }
  steps.push({ week: "Tuần 1", title: "Khởi động & thu nội dung", tasks: week1Tasks, channel: "general" });

  const week2Tasks: string[] = [];
  if (combo.mapsStack && !has("maps")) {
    week2Tasks.push(`Triển khai Maps: ${combo.mapsStack.serviceName}`, "Upload ảnh cơ sở, dịch vụ");
  }
  if (combo.fanpageStack?.buildName) {
    week2Tasks.push(`Setup Fanpage: ${combo.fanpageStack.buildName}`);
  }
  if (combo.websiteStack && !has("website")) {
    week2Tasks.push(`Khởi tạo website: ${combo.websiteStack.buildName}`, "Wireframe & CTA liên hệ/Zalo");
  }
  if (week2Tasks.length) {
    steps.push({ week: "Tuần 2", title: "Xây nền tảng kênh", tasks: week2Tasks, channel: "website" });
  }

  const week3Tasks: string[] = [];
  if (combo.fanpageStack) {
    week3Tasks.push(`Đăng ${combo.fanpageStack.carePosts} bài Fanpage đầu tiên`, "Trả lời inbox trong 30 phút");
  }
  if (combo.websiteStack) {
    week3Tasks.push(`Xuất bản ${combo.websiteStack.carePosts} bài SEO web`, "Gắn pixel/form đo lead");
  }
  if (week3Tasks.length) {
    steps.push({ week: "Tuần 3–4", title: "Content & chuyển đổi", tasks: week3Tasks, channel: "fanpage" });
  }

  const hasAds = combo.itemIds.some((id) => id.includes("ads"));
  if (hasAds && !has("ads")) {
    steps.push({
      week: "Tuần 5+",
      title: "Scale quảng cáo",
      tasks: [
        "Chạy test ads 2 tuần — đo CPL/lead",
        "Tối ưu creative & targeting theo data",
        "Báo cáo tuần — điều chỉnh ngân sách",
      ],
      channel: "ads",
    });
  } else {
    steps.push({
      week: "Tuần 5+",
      title: "Tối ưu & đo lường",
      tasks: [
        "Theo dõi inbox, review & form liên hệ",
        "A/B test CTA & landing",
        profile.phases[2]?.tasks[0] ?? "Đánh giá KPI tháng đầu",
      ],
      channel: "general",
    });
  }

  return steps;
}

export function buildFormProgress(form: StrategyFormSnapshot): { percent: number; filled: number; total: number } {
  const fields = [
    form.fullName,
    form.companyName,
    form.phone,
    form.address,
    form.email,
    form.industry,
    form.businessGoal,
    form.scale,
    form.budgetRange,
    form.platformFocus ?? "strategy",
  ];
  const filled = fields.filter((v) => String(v).trim().length > 0).length;
  return { percent: Math.round((filled / fields.length) * 100), filled, total: fields.length };
}

export type CostChannel = {
  id: "website" | "fanpage" | "maps" | "ads" | "other";
  label: string;
  color: string;
  once: number;
  month: number;
  year: number;
};

function channelForItemId(id: string): CostChannel["id"] {
  if (id.startsWith("web-")) return "website";
  if (id.startsWith("fb-")) return id.includes("ads") ? "ads" : "fanpage";
  if (id.startsWith("gm-")) return id.includes("ads") ? "ads" : "maps";
  return "other";
}

const CHANNEL_META: Record<CostChannel["id"], { label: string; color: string }> = {
  website: { label: "Website", color: "#4F46E5" },
  fanpage: { label: "Fanpage", color: "#1877F2" },
  maps: { label: "Google Maps", color: "#EA580C" },
  ads: { label: "Quảng cáo", color: "#7C3AED" },
  other: { label: "Khác", color: "#64748B" },
};

export function buildCostBreakdown(itemIds: string[]): CostChannel[] {
  const buckets = new Map<CostChannel["id"], CostChannel>();

  for (const id of itemIds) {
    const item = getPricingItemById(id);
    if (!item) continue;
    const ch = channelForItemId(id);
    const meta = CHANNEL_META[ch];
    const existing = buckets.get(ch) ?? { id: ch, label: meta.label, color: meta.color, once: 0, month: 0, year: 0 };
    const price = parsePriceVnd(item.price);
    const billing = getItemBilling(id);
    if (billing === "month") existing.month += price;
    else if (billing === "year") existing.year += price;
    else existing.once += price;
    buckets.set(ch, existing);
  }

  return [...buckets.values()].sort((a, b) => b.month + b.once / 12 - (a.month + a.once / 12));
}

const AVG_ORDER_VALUE: Record<string, number> = {
  "health-beauty": 1_500_000,
  fnb: 250_000,
  ecommerce: 750_000,
  "fashion-retail": 600_000,
  realestate: 30_000_000,
  education: 3_000_000,
  hotel: 2_000_000,
  construction: 50_000_000,
  automotive: 2_500_000,
  pharmacy: 400_000,
  default: 800_000,
};

const CONVERSION_RATE: Record<string, number> = {
  "health-beauty": 0.18,
  fnb: 0.22,
  ecommerce: 0.08,
  realestate: 0.05,
  default: 0.12,
};

function estimateMonthlyLeads(profileId: string, form: Pick<StrategyFormSnapshot, "scale" | "budgetRange">) {
  const isLocal = getIndustryChannelPlan(profileId).localBusiness;
  const isLarge = form.scale.includes("Trên 5");
  const isLow = form.budgetRange.includes("Dưới 5");
  if (isLocal) {
    if (isLow) return 12;
    if (isLarge) return 55;
    return 25;
  }
  if (isLow) return 8;
  if (isLarge) return 35;
  return 18;
}

export type RoiEstimate = {
  monthlyLeads: number;
  costPerLead: number;
  conversionRate: number;
  avgOrderValue: number;
  estimatedRevenue: number;
  estimatedRoi: number;
  breakEvenLeads: number;
  summary: string;
};

export function buildRoiEstimate(
  profile: IndustryProfile,
  form: Pick<StrategyFormSnapshot, "scale" | "budgetRange">,
  itemIds: string[],
): RoiEstimate {
  const totals = calculatePlanTotals(itemIds);
  const monthlyLeads = estimateMonthlyLeads(profile.id, form);
  const monthlyCost = totals.month + totals.once / 12 + totals.year / 12;
  const costPerLead = monthlyLeads > 0 ? Math.round(monthlyCost / monthlyLeads) : 0;
  const conversionRate = CONVERSION_RATE[profile.id] ?? CONVERSION_RATE.default;
  const avgOrderValue = AVG_ORDER_VALUE[profile.id] ?? AVG_ORDER_VALUE.default;
  const estimatedRevenue = Math.round(monthlyLeads * conversionRate * avgOrderValue);
  const estimatedRoi = monthlyCost > 0 ? Math.round(((estimatedRevenue - monthlyCost) / monthlyCost) * 100) : 0;
  const breakEvenLeads = conversionRate > 0 && avgOrderValue > 0
    ? Math.ceil(monthlyCost / (conversionRate * avgOrderValue))
    : 0;

  const summary =
    estimatedRoi >= 100
      ? `Với ~${monthlyLeads} lead/tháng, doanh thu ước tính gấp ${(estimatedRevenue / Math.max(monthlyCost, 1)).toFixed(1)}× chi phí marketing.`
      : estimatedRoi >= 0
        ? `Cần ~${breakEvenLeads} lead chốt/tháng để hoà vốn chi phí marketing.`
        : `Giai đoạn đầu ưu tiên xây nền tảng — ROI tích lũy sau 2–3 tháng.`;

  return {
    monthlyLeads,
    costPerLead,
    conversionRate,
    avgOrderValue,
    estimatedRevenue,
    estimatedRoi,
    breakEvenLeads,
    summary,
  };
}

export function buildStrategyBrief(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
) {
  const combo = buildRecommendedCombo(profile, form);
  const totals = calculatePlanTotals(combo.itemIds);
  return {
    readiness: buildDigitalReadiness(profile.id, form.existingAssets),
    adsAdvice: buildAdsChannelAdvice(profile.id, form),
    kpis: buildKpiProjections(profile, form),
    actionPlan: buildActionPlan(profile, form, combo),
    combo,
    totals,
  };
}

export { ASSET_LABELS };

export type BenchmarkItem = {
  id: string;
  label: string;
  industryPct: number;
  youHave: boolean;
  priority: "critical" | "important" | "nice";
};

export type CompetitiveBenchmark = {
  items: BenchmarkItem[];
  yourCoverage: number;
  industryAvg: number;
  gapCount: number;
  headline: string;
  insight: string;
};

export function buildCompetitiveBenchmark(
  profileId: string,
  existingAssets: string[],
  cityTier?: 1 | 2 | 3,
): CompetitiveBenchmark {
  const plan = getIndustryChannelPlan(profileId);
  const has = (id: string) => existingAssets.includes(id);
  const items: BenchmarkItem[] = [];

  const tierBoost = cityTier === 1 ? 4 : cityTier === 2 ? 0 : -6;

  if (plan.needsMaps) {
    items.push({
      id: "maps",
      label: "Google Maps tối ưu + review",
      industryPct: Math.min(98, (plan.localBusiness ? 94 : 72) + tierBoost),
      youHave: has("maps"),
      priority: plan.localBusiness ? "critical" : "important",
    });
  }
  if (plan.needsFanpage) {
    items.push({
      id: "fanpage",
      label: "Fanpage active + inbox CSKH",
      industryPct: 88,
      youHave: has("fanpage"),
      priority: "critical",
    });
  }
  if (plan.needsWebsite) {
    items.push({
      id: "website",
      label: "Website chuyên nghiệp + SEO",
      industryPct: profileId === "ecommerce" || profileId === "tech" ? 91 : 76,
      youHave: has("website"),
      priority: profileId === "ecommerce" ? "critical" : "important",
    });
  }
  items.push({
    id: "ads",
    label: "Quảng cáo có đo lường (FB/Maps)",
    industryPct: plan.localBusiness ? 68 : 74,
    youHave: has("ads"),
    priority: "nice",
  });
  items.push({
    id: "content",
    label: "Content đều ≥10 bài/tháng",
    industryPct: 62,
    youHave: has("fanpage") || has("website"),
    priority: "important",
  });

  const yourCoverage = items.length
    ? Math.round((items.filter((i) => i.youHave).length / items.length) * 100)
    : 0;
  const industryAvg = Math.round(items.reduce((s, i) => s + i.industryPct, 0) / Math.max(items.length, 1));
  const gapCount = items.filter((i) => !i.youHave && i.priority !== "nice").length;

  const headline =
    yourCoverage >= 80
      ? "Bạn đang ở nhóm top — tập trung tối ưu & scale"
      : yourCoverage >= 50
        ? "Nền tảng trung bình — bổ sung 1–2 kênh để vượt đối thủ"
        : "Đang tụt hậu so với đối thủ cùng ngành";

  const insight =
    gapCount === 0
      ? "Hạ tầng marketing đạt chuẩn ngành — ưu tiên chất lượng content và tối ưu ads."
      : `Còn ${gapCount} hạng mục quan trọng mà ~${industryAvg}% doanh nghiệp cùng ngành${cityTier === 1 ? " tại TP lớn" : cityTier === 3 ? " tại tỉnh" : ""} đã có — lấp gap trước khi scale ngân sách.`;

  return { items, yourCoverage, industryAvg, gapCount, headline, insight };
}

export type WhatIfScenario = {
  id: string;
  label: string;
  description: string;
  monthDelta: number;
  newMonthTotal: number;
  newItemCount: number;
  assets: string[];
};

export function buildWhatIfScenarios(
  profile: IndustryProfile,
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets">,
): WhatIfScenario[] {
  const base = buildRecommendedCombo(profile, form);
  const baseMonth = calculatePlanTotals(base.itemIds).month;
  const scenarios: WhatIfScenario[] = [];

  const candidates = [
    { id: "website", label: "Đã có Website", desc: "Bỏ phí setup web — tập trung chăm sóc & SEO" },
    { id: "fanpage", label: "Đã có Fanpage", desc: "Bỏ setup Fanpage — chỉ chăm sóc content" },
    { id: "maps", label: "Đã có Google Maps", desc: "Bỏ phí xây Maps — tối ưu & review" },
    { id: "ads", label: "Đang chạy quảng cáo", desc: "Bỏ phí quản lý ads — tự chạy hoặc audit" },
  ] as const;

  for (const c of candidates) {
    if (form.existingAssets.includes(c.id)) continue;
    const assets = [...form.existingAssets, c.id];
    const combo = buildRecommendedCombo(profile, { ...form, existingAssets: assets });
    const month = calculatePlanTotals(combo.itemIds).month;
    scenarios.push({
      id: c.id,
      label: c.label,
      description: c.desc,
      monthDelta: month - baseMonth,
      newMonthTotal: month,
      newItemCount: combo.itemIds.length,
      assets,
    });
  }

  return scenarios.sort((a, b) => a.monthDelta - b.monthDelta);
}

export type ExecutiveSummary = {
  overallScore: number;
  grade: string;
  tierLabel: string;
  monthTotal: number;
  readinessScore: number;
  confidence: number;
  topActions: string[];
  quickWins: string[];
  headline: string;
};

export function buildExecutiveSummary(
  profile: IndustryProfile,
  form: StrategyFormSnapshot,
  confidence: number,
  itemIds: string[],
): ExecutiveSummary {
  const readiness = buildDigitalReadiness(profile.id, form.existingAssets);
  const combo = buildRecommendedCombo(profile, form);
  const monthTotal = calculatePlanTotals(itemIds).month;
  const actionPlan = buildActionPlan(profile, form, combo);
  const benchmark = buildCompetitiveBenchmark(profile.id, form.existingAssets);

  const overallScore = Math.round(readiness.score * 0.45 + confidence * 0.35 + benchmark.yourCoverage * 0.2);
  const grade =
    overallScore >= 80 ? "Xuất sắc" : overallScore >= 65 ? "Tốt" : overallScore >= 45 ? "Khá" : "Cần cải thiện";

  const topActions = actionPlan.flatMap((s) => s.tasks).slice(0, 3);
  const quickWins = benchmark.items
    .filter((i) => !i.youHave && i.priority === "critical")
    .map((i) => `Bổ sung ${i.label.split(" ")[0]} ${i.label.split(" ")[1] ?? ""}`.trim())
    .slice(0, 2);

  const headline = `${form.companyName || "Doanh nghiệp"} — ${combo.tierLabel}, ~${formatVnd(monthTotal)}/tháng, ${benchmark.gapCount} gap so với đối thủ`;

  return {
    overallScore,
    grade,
    tierLabel: combo.tierLabel,
    monthTotal,
    readinessScore: readiness.score,
    confidence,
    topActions,
    quickWins,
    headline,
  };
}

export type MultiLocationAdvisory = {
  locationLabel: string;
  locationCount: string;
  mapsPerLocation: number | null;
  contentMultiplier: number;
  bullets: string[];
  estimatedExtraMonth: number;
};

export function buildMultiLocationAdvisory(
  form: Pick<StrategyFormSnapshot, "scale" | "budgetRange">,
  mapsSetupOnce: number | null,
  baseMonthTotal: number,
): MultiLocationAdvisory | null {
  if (form.scale.includes("1 cơ sở")) return null;

  const locationLabel = form.scale.includes("Trên 5") ? "Chuỗi / multi-brand" : "Đa chi nhánh";
  const locationCount = form.scale.includes("Trên 5") ? "6+ cơ sở" : "2–5 cơ sở";
  const branchFactor = form.scale.includes("Trên 5") ? 1.35 : 1.2;
  const mapsPerLocation = mapsSetupOnce && mapsSetupOnce > 0 ? mapsSetupOnce : null;

  const bullets = [
    mapsPerLocation
      ? `Google Maps: tính ~${formatVnd(mapsPerLocation)}/cơ sở setup (tối ưu hoặc xây mới) — ${locationCount} cần profile riêng.`
      : `Google Maps: mỗi cơ sở nên có profile riêng để khách tìm đúng chi nhánh.`,
    "Fanpage: 1 trang trung tâm + content local theo từng khu vực, hoặc page phụ nếu thương hiệu con.",
    "Website: landing theo chi nhánh / schema LocalBusiness cho SEO khu vực.",
    form.scale.includes("Trên 5")
      ? "Ngân sách ads: chia theo vùng — đo lead riêng từng chi nhánh, tránh trộn data."
      : "Ngân sách ads: ưu tiên chi nhánh có doanh thu cao nhất trước, scale dần.",
  ];

  const estimatedExtraMonth = Math.round(baseMonthTotal * (branchFactor - 1));

  return {
    locationLabel,
    locationCount,
    mapsPerLocation,
    contentMultiplier: branchFactor,
    bullets,
    estimatedExtraMonth,
  };
}
