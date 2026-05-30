import {
  buildRecommendedCombo,
  calculatePlanTotals,
  getIndustryChannelPlan,
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
  ];
  const filled = fields.filter((v) => String(v).trim().length > 0).length;
  return { percent: Math.round((filled / fields.length) * 100), filled, total: fields.length };
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
