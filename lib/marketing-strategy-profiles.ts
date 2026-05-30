import { STRATEGY_PRICING, type StrategyPricingItem } from "./marketing-strategy-pricing";

export type BillingPeriod = "once" | "month" | "year";

export const ITEM_BILLING: Record<string, BillingPeriod> = {
  "web-build-3": "once",
  "web-build-6": "once",
  "web-build-9": "once",
  "web-build-12": "once",
  "web-data-3": "year",
  "web-data-10": "year",
  "web-data-20": "year",
  "web-domain-com": "year",
  "web-care-10": "month",
  "web-care-20": "month",
  "web-care-30": "month",
  "fb-build-basic": "once",
  "fb-build-advanced": "once",
  "fb-build-pro": "once",
  "fb-care-basic": "month",
  "fb-care-advanced": "month",
  "fb-care-pro": "month",
  "fb-ads-under-10": "month",
  "fb-ads-over-10": "month",
  "gm-rebuild": "once",
  "gm-build": "once",
  "gm-optimize": "once",
  "gm-ads-under-10": "month",
  "gm-ads-over-10": "month",
};

export function parsePriceVnd(price: string) {
  return Number(price.replace(/\D/g, "")) || 0;
}

export function getAllPricingItems(): StrategyPricingItem[] {
  return STRATEGY_PRICING.flatMap((column) => column.groups.flatMap((group) => group.items));
}

export function getPricingItemById(id: string) {
  return getAllPricingItems().find((item) => item.id === id) ?? null;
}

export type BudgetFilter = "all" | "under5" | "5to15" | "over15";

export function itemFitsBudgetFilter(itemId: string, filter: BudgetFilter) {
  if (filter === "all") return true;
  const item = getPricingItemById(itemId);
  if (!item) return true;
  const billing = ITEM_BILLING[itemId] ?? "once";
  const price = parsePriceVnd(item.price);

  if (billing === "month") {
    if (filter === "under5") return price <= 5_000_000;
    if (filter === "5to15") return price > 5_000_000 && price <= 15_000_000;
    return price > 15_000_000;
  }

  return true;
}

export type StrategyPhase = {
  title: string;
  duration: string;
  focus: string;
  tasks: string[];
};

export type IndustryProfile = {
  id: string;
  label: string;
  match: RegExp;
  summary: string;
  comboLabel: string;
  comboItemIds: string[];
  phases: StrategyPhase[];
  whyBullets: string[];
  risks: string[];
  expectedResults: string[];
  clientPrep: string[];
  caseStudy: { title: string; result: string };
};

export const BUSINESS_GOALS = [
  "Tăng khách hàng mới",
  "Tăng doanh thu",
  "Xây dựng thương hiệu",
  "Giữ chân khách cũ",
] as const;

export const SCALE_OPTIONS = ["1 cơ sở", "2–5 cơ sở", "Trên 5 cơ sở"] as const;

export const BUDGET_OPTIONS = ["Dưới 5 triệu/tháng", "5–15 triệu/tháng", "Trên 15 triệu/tháng"] as const;

export const EXISTING_ASSET_OPTIONS = [
  { id: "website", label: "Đã có Website" },
  { id: "fanpage", label: "Đã có Fanpage" },
  { id: "maps", label: "Đã có Google Maps" },
  { id: "ads", label: "Đang chạy quảng cáo" },
] as const;

const PROFILES: IndustryProfile[] = [
  {
    id: "health-beauty",
    label: "Nha khoa / Spa / Thẩm mỹ",
    match: /nha khoa|spa|thẩm mỹ|y tế|phòng khám|nha khoa/i,
    summary:
      "Ngành dịch vụ tại chỗ cần xuất hiện mạnh trên Google Maps, website chuyên nghiệp và Fanpage nuôi niềm tin trước khi khách đặt lịch.",
    comboLabel: "Combo đề xuất: Maps + Website + Chăm sóc Fanpage",
    comboItemIds: ["gm-optimize", "web-build-6", "fb-care-basic", "web-care-10"],
    phases: [
      {
        title: "Giai đoạn 1 — Niềm tin & hiện diện",
        duration: "Tuần 1–4",
        focus: "Google Maps + thông tin cơ sở",
        tasks: ["Tối ưu/xây Maps", "Chuẩn hóa thông tin liên hệ", "Thu thập ảnh before/after"],
      },
      {
        title: "Giai đoạn 2 — Nền tảng chuyển đổi",
        duration: "Tuần 5–8",
        focus: "Website + Fanpage",
        tasks: ["Website giới thiệu dịch vụ", "Setup Fanpage chuẩn thương hiệu", "CTA đặt lịch/Zalo"],
      },
      {
        title: "Giai đoạn 3 — Tăng trưởng",
        duration: "Tuần 9–12",
        focus: "Content + quảng cáo",
        tasks: ["Chăm sóc Fanpage hàng tháng", "Content SEO website", "Chạy ads local nếu cần"],
      },
    ],
    whyBullets: [
      "Khách tìm dịch vụ gần nhất trên Google Maps trước khi gọi điện",
      "Website giúp giải thích dịch vụ, giá và quy trình — tăng tỷ lệ chốt",
      "Fanpage duy trì tương tác và review, quan trọng với ngành làm đẹp/y tế",
    ],
    risks: [
      "Maps thiếu thông tin → mất khách cho phòng khám/spa cạnh tranh",
      "Không có content đều → khách vào Fanpage thấy 'bỏ hoang', giảm tin tưởng",
    ],
    expectedResults: [
      "4–6 tuần: tăng lượt xem Maps & inbox",
      "2–3 tháng: ổn định lượt đặt lịch từ kênh online",
    ],
    clientPrep: ["Ảnh cơ sở, đội ngũ, before/after", "Bảng giá/dịch vụ chủ lực", "Người duyệt nội dung & phản hồi inbox"],
    caseStudy: { title: "Spa / Nha khoa local", result: "Tăng inbox & cuộc gọi sau 60 ngày tối ưu Maps + content" },
  },
  {
    id: "fnb",
    label: "Nhà hàng / F&B",
    match: /f&b|nhà hàng|quán|cafe|ăn uống|fnb/i,
    summary:
      "F&B cần Maps để bắt khách quanh khu vực, Fanpage cho menu/khuyến mãi và quảng cáo để fill bàn vào giờ thấp điểm.",
    comboLabel: "Combo đề xuất: Maps + Fanpage nâng cao + Ads",
    comboItemIds: ["gm-optimize", "fb-care-advanced", "fb-ads-under-10", "web-care-10"],
    phases: [
      {
        title: "Giai đoạn 1 — Local discovery",
        duration: "Tuần 1–3",
        focus: "Google Maps",
        tasks: ["Tối ưu Maps", "Ảnh món & không gian", "Thu thập review"],
      },
      {
        title: "Giai đoạn 2 — Nuôi cộng đồng",
        duration: "Tuần 4–8",
        focus: "Fanpage content",
        tasks: ["Lịch đăng bài menu/khuyến mãi", "Thiết kế ảnh bài", "Tương tác inbox"],
      },
      {
        title: "Giai đoạn 3 — Kéo khách",
        duration: "Tuần 9+",
        focus: "Quảng cáo",
        tasks: ["Ads target bán kính", "Tối ưu chi phí/message", "Báo cáo tuần"],
      },
    ],
    whyBullets: [
      "Khách quanh khu vực tìm 'quán gần đây' trên Maps rất nhiều",
      "Fanpage giúp show menu, combo, khuyến mãi theo mùa",
      "Ads giúp chủ động kéo khách vào giờ vắng",
    ],
    risks: ["Maps không cập nhật giờ/menu → khách đến sai kỳ vọng", "Không ads → phụ thuộc walk-in, doanh thu không ổn định"],
    expectedResults: ["3–4 tuần: tăng lượt tìm kiếm Maps", "2 tháng: tăng inbox đặt bàn & check-in"],
    clientPrep: ["Menu, giá, ảnh món", "Giờ mở cửa chính xác", "Khuyến mãi muốn chạy"],
    caseStudy: { title: "Quán ăn / Cafe", result: "Tăng lượt chỉ đường Maps & inbox đặt bàn sau 45 ngày" },
  },
  {
    id: "ecommerce",
    label: "TMĐT / Bán lẻ",
    match: /tmđt|bán lẻ|shop|thương mại|kinh doanh online/i,
    summary: "Bán hàng online cần website chuyển đổi tốt, Fanpage content mạnh và quảng cáo scale đơn hàng.",
    comboLabel: "Combo đề xuất: Website KD + Fanpage Pro + Ads",
    comboItemIds: ["web-build-9", "fb-care-pro", "fb-ads-over-10", "web-care-20"],
    phases: [
      {
        title: "Giai đoạn 1 — Nền tảng bán",
        duration: "Tuần 1–6",
        focus: "Website",
        tasks: ["Website chuyển đổi", "Tích hợp form/Zalo", "Tracking cơ bản"],
      },
      {
        title: "Giai đoạn 2 — Nuôi kênh",
        duration: "Tuần 7–10",
        focus: "Fanpage",
        tasks: ["Content sản phẩm", "Chương trình ưu đãi", "CSKH inbox"],
      },
      {
        title: "Giai đoạn 3 — Scale",
        duration: "Tuần 11+",
        focus: "Quảng cáo",
        tasks: ["Ads conversion", "Retarget", "Tối ưu ROAS"],
      },
    ],
    whyBullets: [
      "Website sở hữu dữ liệu khách, không phụ thuộc thuật toán",
      "Fanpage tạo social proof & remarketing",
      "Ads giúp scale nhanh khi sản phẩm đã được test",
    ],
    risks: ["Chỉ bán trên Fanpage → khó scale & dễ mất tài khoản", "Website chậm → ads tốn tiền mà không ra đơn"],
    expectedResults: ["6–8 tuần: tăng đơn từ website + inbox", "3 tháng: ổn định funnel ads"],
    clientPrep: ["Catalog sản phẩm", "Chính sách giao hàng/đổi trả", "Ngân sách ads dự kiến"],
    caseStudy: { title: "Shop online", result: "Tăng đơn inbox + website sau 90 ngày triển khai funnel" },
  },
  {
    id: "realestate",
    label: "Bất động sản",
    match: /bất động sản|bds|nhà đất|real estate/i,
    summary: "BĐS cần website uy tín, Fanpage showcase dự án và lead ads để thu data khách có nhu cầu.",
    comboLabel: "Combo đề xuất: Website + Fanpage nâng cao + Ads",
    comboItemIds: ["web-build-6", "fb-care-advanced", "fb-ads-under-10", "gm-optimize"],
    phases: [
      {
        title: "Giai đoạn 1 — Uy tín",
        duration: "Tuần 1–4",
        focus: "Website + Maps",
        tasks: ["Website giới thiệu & dự án", "Maps doanh nghiệp", "Form thu lead"],
      },
      {
        title: "Giai đoạn 2 — Nuôi lead",
        duration: "Tuần 5–8",
        focus: "Fanpage",
        tasks: ["Bài case study", "Livestream/tour ảo", "Inbox tư vấn"],
      },
      {
        title: "Giai đoạn 3 — Khai thác",
        duration: "Tuần 9+",
        focus: "Ads lead",
        tasks: ["Ads form/inbox", "Phân loại lead", "Báo cáo chi phí/lead"],
      },
    ],
    whyBullets: ["Khách BĐS cần thấy uy tín trước khi để lại SĐT", "Fanpage giúp nuôi tin & showcase dự án", "Ads thu lead chủ động theo khu vực"],
    risks: ["Không có website → khách nghi ngờ pháp lý/uy tín", "Lead không được nurture → tỷ lệ chốt thấp"],
    expectedResults: ["4–8 tuần: tăng lead chất lượng", "2–3 tháng: pipeline ổn định hơn"],
    clientPrep: ["Hồ sơ pháp lý/dự án", "Ảnh thực tế", "Script tư vấn sales"],
    caseStudy: { title: "Môi giới / sàn nhỏ", result: "Tăng lead inbox form sau 60 ngày content + ads" },
  },
  {
    id: "default",
    label: "Doanh nghiệp dịch vụ",
    match: /.*/,
    summary:
      "Chiến lược tổng thể: Website làm nền tảng, Fanpage nuôi tương tác, Google Maps bắt khách local — triển khai theo giai đoạn.",
    comboLabel: "Combo đề xuất: Website + Fanpage + Maps",
    comboItemIds: ["web-build-6", "fb-care-advanced", "gm-build", "web-care-10"],
    phases: [
      {
        title: "Giai đoạn 1 — Nền móng",
        duration: "Tuần 1–4",
        focus: "Maps & thông tin",
        tasks: ["Setup Maps", "Chuẩn hóa thông tin DN", "Thu thập nội dung cơ bản"],
      },
      {
        title: "Giai đoạn 2 — Kênh sở hữu",
        duration: "Tuần 5–8",
        focus: "Website + Fanpage",
        tasks: ["Website giới thiệu", "Fanpage chuẩn thương hiệu", "CTA liên hệ rõ"],
      },
      {
        title: "Giai đoạn 3 — Tăng trưởng",
        duration: "Tuần 9+",
        focus: "Content & ads",
        tasks: ["Chăm sóc định kỳ", "Content SEO", "Ads khi sẵn sàng scale"],
      },
    ],
    whyBullets: [
      "Website giúp bạn sở hữu kênh, không phụ thuộc nền tảng",
      "Fanpage giữ tương tác & remarketing",
      "Maps giúp khách local tìm thấy bạn nhanh hơn",
    ],
    risks: ["Làm rải rác nhiều kênh cùng lúc → tốn ngân sách, không đo được hiệu quả", "Thiếu content → kênh mới nhưng không có ai thấy"],
    expectedResults: ["4–6 tuần: có tín hiệu traffic/inbox", "3 tháng: hệ thống marketing ổn định"],
    clientPrep: ["Logo, brand cơ bản", "Mô tả dịch vụ", "Người phản hồi khách hàng"],
    caseStudy: { title: "DN dịch vụ vừa & nhỏ", result: "Cải thiện hiện diện online & lead sau 90 ngày triển khai có lộ trình" },
  },
];

export function resolveIndustryProfile(industry: string) {
  const text = industry.trim();
  return PROFILES.find((profile) => profile.id !== "default" && profile.match.test(text)) ?? PROFILES[PROFILES.length - 1];
}

export function budgetFilterFromForm(budget: string): BudgetFilter {
  if (budget.includes("Dưới 5")) return "under5";
  if (budget.includes("5–15") || budget.includes("5-15")) return "5to15";
  if (budget.includes("Trên 15")) return "over15";
  return "all";
}

export function adjustComboForAssets(comboIds: string[], existingAssets: string[]) {
  const has = (key: string) => existingAssets.includes(key);
  return comboIds.filter((id) => {
    if (has("website") && id.startsWith("web-build")) return false;
    if (has("fanpage") && id.startsWith("fb-build")) return false;
    if (has("maps") && (id === "gm-build" || id === "gm-rebuild")) return false;
    if (has("ads") && id.includes("ads")) return false;
    return true;
  });
}

export function buildWhyBullets(profile: IndustryProfile, businessGoal: string, existingAssets: string[]) {
  const bullets = [...profile.whyBullets];
  if (businessGoal.includes("Tăng khách")) {
    bullets.unshift("Mục tiêu tăng khách mới → ưu tiên Maps/Ads/Inbox trước, content nuôi tin sau.");
  } else if (businessGoal.includes("doanh thu")) {
    bullets.unshift("Mục tiêu tăng doanh thu → kết hợp kênh chuyển đổi (website/inbox) với quảng cáo có đo lường.");
  } else if (businessGoal.includes("thương hiệu")) {
    bullets.unshift("Mục tiêu thương hiệu → ưu tiên Fanpage + website showcase trước khi scale ads.");
  } else if (businessGoal.includes("Giữ chân")) {
    bullets.unshift("Mục tiêu giữ chân → content đều, CSKH inbox và remarketing quan trọng hơn kéo khách lạ.");
  }
  if (existingAssets.length > 0) {
    const labels = existingAssets.map(
      (id) => EXISTING_ASSET_OPTIONS.find((a) => a.id === id)?.label || id,
    );
    bullets.push(`Bạn đã có: ${labels.join(", ")} — lộ trình sẽ tập trung bổ sung phần còn thiếu, không làm trùng.`);
  }
  return bullets.slice(0, 4);
}

export function calculatePlanTotals(itemIds: string[]) {
  let once = 0;
  let month = 0;
  let year = 0;
  for (const id of itemIds) {
    const item = getPricingItemById(id);
    if (!item) continue;
    const price = parsePriceVnd(item.price);
    const billing = ITEM_BILLING[id] ?? "once";
    if (billing === "month") month += price;
    else if (billing === "year") year += price;
    else once += price;
  }
  return { once, month, year };
}

export function formatVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export function buildDeploymentTimeline(itemCount: number) {
  return [
    { week: "Tuần 1", task: "Khảo sát, chốt gói & thu nội dung từ doanh nghiệp" },
    { week: "Tuần 2", task: "Setup Google Maps / Fanpage / Website (theo gói đã chọn)" },
    { week: "Tuần 3–4", task: "Triển khai content, tối ưu hiển thị & CTA liên hệ" },
    {
      week: "Tuần 5+",
      task: itemCount > 3 ? "Chạy quảng cáo (nếu có) & tối ưu theo báo cáo tuần" : "Theo dõi inbox/review & điều chỉnh chiến lược",
    },
  ];
}

export type StrategyFormSnapshot = {
  fullName: string;
  companyName: string;
  phone: string;
  address: string;
  email: string;
  industry: string;
  businessGoal: string;
  scale: string;
  budgetRange: string;
  existingAssets: string[];
};

export function buildStrategySummaryText(form: StrategyFormSnapshot, profile: IndustryProfile, planIds: string[]) {
  const comboIds = adjustComboForAssets(profile.comboItemIds, form.existingAssets);
  const totals = calculatePlanTotals(planIds.length ? planIds : comboIds);
  const lines = [
    `CHIẾN LƯỢC MARKETING — ${form.companyName}`,
    `Người liên hệ: ${form.fullName} | ${form.phone} | ${form.email}`,
    `Ngành: ${form.industry} | Quy mô: ${form.scale}`,
    `Mục tiêu: ${form.businessGoal} | Ngân sách: ${form.budgetRange}`,
    "",
    profile.summary,
    "",
    "LỘ TRÌNH 3 GIAI ĐOẠN:",
    ...profile.phases.map((p, i) => `${i + 1}. ${p.title} (${p.duration}): ${p.focus}`),
    "",
    "GÓI ĐỀ XUẤT:",
    ...(planIds.length ? planIds : comboIds).map((id) => {
      const item = getPricingItemById(id);
      return item ? `- ${item.label}: ${item.price}` : "";
    }).filter(Boolean),
    "",
    `Chi phí dự kiến — Một lần: ${formatVnd(totals.once)} | Hàng tháng: ${formatVnd(totals.month)} | Hàng năm: ${formatVnd(totals.year)}`,
    "",
    "Bứt Phá Marketing — butphamarketing.com",
  ];
  return lines.join("\n");
}
