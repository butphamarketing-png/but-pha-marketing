import { STRATEGY_PRICING, type StrategyPricingItem } from "./marketing-strategy-pricing";
import {
  DOMAIN_COM_PRICE,
  fanpageCareItemId,
  fanpageCarePrice,
  formatPriceVnd,
  FANPAGE_CARE_PRICE_PER_POST,
  getFanpageCareWorks,
  HOSTING_PACKAGES,
  parseFanpageCarePosts,
  getFanpageCareTierLabel,
} from "./service-pricing";
import {
  buildWebsiteStackItemIds,
  recommendWebsiteCareOnly,
  recommendWebsiteStack,
  type WebsiteStackRecommendation,
} from "./website-pricing-advisor";
import {
  buildFanpageStackItemIds,
  buildFanpageCareAlternatives,
  recommendFanpageCareOnly,
  recommendFanpageStack,
  type FanpageStackRecommendation,
} from "./fanpage-pricing-advisor";
import { findIndustrySuggestion, getIndustrySuggestionCount } from "./industry-suggestions";
import {
  buildMapsStackItemIds,
  recommendMapsStack,
  type MapsStackRecommendation,
} from "./googlemaps-pricing-advisor";

export type BillingPeriod = "once" | "month" | "year";

export const ITEM_BILLING: Record<string, BillingPeriod> = {
  "web-build-3": "once",
  "web-build-6": "once",
  "web-build-9": "once",
  "web-build-12": "once",
  ...Object.fromEntries(HOSTING_PACKAGES.map((p) => [`web-data-${p.gb}`, "year"] as const)),
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

export function getItemBilling(itemId: string): BillingPeriod {
  if (ITEM_BILLING[itemId]) return ITEM_BILLING[itemId];
  if (parseFanpageCarePosts(itemId) !== null) return "month";
  return "once";
}

export function buildDynamicPricingItem(id: string): StrategyPricingItem | null {
  const posts = parseFanpageCarePosts(id);
  if (posts === null) return null;
  return {
    id,
    label: `${posts} bài / tháng`,
    price: formatPriceVnd(fanpageCarePrice(posts)),
    quantity: `${posts} × ${formatPriceVnd(FANPAGE_CARE_PRICE_PER_POST)}/bài`,
    works: getFanpageCareWorks(posts),
  };
}

export function getPricingItemById(id: string) {
  return getAllPricingItems().find((item) => item.id === id) ?? buildDynamicPricingItem(id);
}

export type BudgetFilter = "all" | "under5" | "5to15" | "over15";

export function itemFitsBudgetFilter(itemId: string, filter: BudgetFilter) {
  if (filter === "all") return true;
  const item = getPricingItemById(itemId);
  if (!item) return true;
  const billing = getItemBilling(itemId);
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
    match: /nha khoa|spa|thẩm mỹ|phòng khám|làm đẹp|y khoa thẩm mỹ/i,
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
    match: /tmđt|ecommerce|bán lẻ|thương mại điện tử|kinh doanh online|shop online|sàn thương mại/i,
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
    id: "education",
    label: "Giáo dục / Đào tạo",
    match: /giáo dục|đào tạo|trung tâm|khóa học|dạy|học viện|education/i,
    summary:
      "Ngành đào tạo cần website giới thiệu khóa học, Fanpage tuyển sinh và quảng cáo thu lead — Maps hỗ trợ nếu có cơ sở offline.",
    comboLabel: "Combo đề xuất: Website + Fanpage + Ads tuyển sinh",
    comboItemIds: ["web-build-6", "fb-care-advanced", "fb-ads-under-10", "web-care-10"],
    phases: [
      {
        title: "Giai đoạn 1 — Nền tảng tuyển sinh",
        duration: "Tuần 1–4",
        focus: "Website + Fanpage",
        tasks: ["Landing khóa học", "Setup Fanpage tuyển sinh", "Form đăng ký / Zalo"],
      },
      {
        title: "Giai đoạn 2 — Nuôi quan tâm",
        duration: "Tuần 5–8",
        focus: "Content & review",
        tasks: ["Bài chia sẻ kiến thức", "Feedback học viên", "Livestream/Q&A"],
      },
      {
        title: "Giai đoạn 3 — Kéo học viên",
        duration: "Tuần 9+",
        focus: "Quảng cáo lead",
        tasks: ["Ads form/inbox", "Retarget học viên quan tâm", "Tối ưu chi phí/lead"],
      },
    ],
    whyBullets: [
      "Phụ huynh/học viên tìm hiểu online trước khi đăng ký — website & Fanpage là bắt buộc",
      "Content đều giúp xây uy tín giảng viên & chương trình",
      "Ads giúp chủ động thu lead theo mùa khai giảng",
    ],
    risks: ["Không có landing rõ ràng → lead rớt giữa chừng", "Fanpage không cập nhật → mất niềm tin phụ huynh"],
    expectedResults: ["4–6 tuần: tăng inbox & form đăng ký", "2–3 tháng: pipeline tuyển sinh ổn định"],
    clientPrep: ["Chương trình & học phí", "Ảnh lớp học / giảng viên", "Lịch khai giảng"],
    caseStudy: { title: "Trung tâm đào tạo", result: "Tăng lead đăng ký khóa học sau 60 ngày landing + ads" },
  },
  {
    id: "hotel",
    label: "Khách sạn / Lưu trú",
    match: /khách sạn|lưu trú|homestay|resort|villa|motel|hostel|bnb/i,
    summary:
      "Ngành lưu trú cần Maps & OTA visibility, website đặt phòng/trải nghiệm và Fanpage nuôi review, ưu đãi theo mùa.",
    comboLabel: "Combo đề xuất: Maps + Website + Fanpage + Ads mùa vụ",
    comboItemIds: ["gm-optimize", "web-build-6", "fb-care-advanced", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Hiện diện & niềm tin", duration: "Tuần 1–4", focus: "Maps + ảnh cơ sở", tasks: ["Tối ưu Maps", "Ảnh phòng & tiện ích", "Thu thập review Google"] },
      { title: "Giai đoạn 2 — Kênh đặt phòng", duration: "Tuần 5–8", focus: "Website + Fanpage", tasks: ["Website giới thiệu & form đặt phòng", "Fanpage ưu đãi", "CTA Zalo/hotline"] },
      { title: "Giai đoạn 3 — Lấp phòng", duration: "Tuần 9+", focus: "Ads & content", tasks: ["Ads theo mùa/lễ", "Content trải nghiệm", "Retarget khách đã xem"] },
    ],
    whyBullets: ["Khách du lịch tìm 'khách sạn gần đây' trên Maps trước", "Website giúp kể câu chuyện thương hiệu & chính sách rõ ràng", "Fanpage + ads giúp lấp phòng ngày thường & mùa thấp điểm"],
    risks: ["Maps thiếu ảnh/review → tỷ lệ chọn đối thủ cao hơn", "Không có kênh sở hữu → phụ thuộc OTA, margin thấp"],
    expectedResults: ["3–5 tuần: tăng lượt xem Maps & inbox", "2–3 tháng: cải thiện direct booking & nhận diện"],
    clientPrep: ["Ảnh phòng, sảnh, view", "Bảng giá & chính sách hủy", "Ưu đãi theo mùa"],
    caseStudy: { title: "Homestay / Khách sạn boutique", result: "Tăng inbox đặt phòng trực tiếp sau 60 ngày Maps + content" },
  },
  {
    id: "construction",
    label: "Xây dựng / Nội thất",
    match: /xây dựng|nội thất|kiến trúc|thiết kế nội thất|xưởng mộc|thi công|renovation/i,
    summary:
      "Ngành xây dựng & nội thất cần portfolio website, Fanpage showcase công trình và lead ads để thu khách có nhu cầu rõ.",
    comboLabel: "Combo đề xuất: Website portfolio + Fanpage + Ads lead",
    comboItemIds: ["web-build-9", "fb-care-advanced", "fb-ads-under-10", "gm-optimize"],
    phases: [
      { title: "Giai đoạn 1 — Portfolio uy tín", duration: "Tuần 1–5", focus: "Website + Maps", tasks: ["Website công trình tiêu biểu", "Maps văn phòng/xưởng", "Form báo giá"] },
      { title: "Giai đoạn 2 — Nuôi tin", duration: "Tuần 6–10", focus: "Fanpage", tasks: ["Before/after công trình", "Video tiến độ", "Tư vấn inbox"] },
      { title: "Giai đoạn 3 — Thu lead", duration: "Tuần 11+", focus: "Quảng cáo", tasks: ["Ads lead theo khu vực", "Retarget khách xem portfolio", "Tối ưu chi phí/lead"] },
    ],
    whyBullets: ["Khách cần xem công trình thực tế trước khi liên hệ", "Fanpage giúp cập nhật dự án đang thi công — tăng tin tưởng", "Ads giúp chủ động tiếp cận khách có nhu cầu thi công/nội thất"],
    risks: ["Không có portfolio online → mất cơ hội với khách so sánh 3–5 nhà thầu", "Lead không phản hồi nhanh → rớt đơn cho đối thủ"],
    expectedResults: ["4–8 tuần: tăng lead chất lượng", "3 tháng: pipeline báo giá ổn định hơn"],
    clientPrep: ["Ảnh công trình before/after", "Quy trình & bảo hành", "Khu vực phục vụ"],
    caseStudy: { title: "Công ty nội thất", result: "Tăng lead báo giá sau 75 ngày website portfolio + ads" },
  },
  {
    id: "professional-services",
    label: "Luật / Kế toán / Tư vấn",
    match: /luật|kế toán|tư vấn|kiểm toán|đại lý thuế|law|accounting|consulting/i,
    summary:
      "Dịch vụ chuyên môn cần website uy tín, content giải thích dịch vụ và Fanpage/ads thu lead doanh nghiệp có nhu cầu rõ.",
    comboLabel: "Combo đề xuất: Website uy tín + Fanpage + Ads B2B",
    comboItemIds: ["web-build-6", "fb-care-basic", "web-care-10", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Uy tín số", duration: "Tuần 1–4", focus: "Website", tasks: ["Website giới thiệu & dịch vụ", "Case study / quy trình", "Form tư vấn"] },
      { title: "Giai đoạn 2 — Thought leadership", duration: "Tuần 5–8", focus: "Content", tasks: ["Bài chia sẻ chuyên môn", "Fanpage cập nhật chính sách", "SEO từ khóa dịch vụ"] },
      { title: "Giai đoạn 3 — Thu lead B2B", duration: "Tuần 9+", focus: "Ads & nurture", tasks: ["Ads lead doanh nghiệp", "Retarget", "Nuôi lead qua inbox/email"] },
    ],
    whyBullets: ["Khách B2B tìm đối tác uy tín qua Google & website trước", "Content chuyên môn giúp phân biệt với đối thủ giá rẻ", "Ads giúp chủ động tiếp cận DN mới thành lập / cần dịch vụ"],
    risks: ["Website sơ sài → khách nghi ngờ năng lực chuyên môn", "Không có content → khó SEO & khó thuyết phục"],
    expectedResults: ["6–8 tuần: tăng form tư vấn", "3 tháng: pipeline lead B2B ổn định"],
    clientPrep: ["Hồ sơ năng lực / chứng chỉ", "Bảng dịch vụ & phí tham khảo", "Case study khách hàng"],
    caseStudy: { title: "Công ty kế toán / luật", result: "Tăng lead tư vấn sau 90 ngày website + content SEO" },
  },
  {
    id: "automotive",
    label: "Ô tô / Garage",
    match: /ô tô|oto|garage|sửa xe|rửa xe|detailing|car wash|workshop xe/i,
    summary:
      "Ngành ô tô local cần Maps để bắt khách quanh khu vực, Fanpage show dịch vụ/khuyến mãi và ads khi cần tăng lịch hẹn.",
    comboLabel: "Combo đề xuất: Maps + Fanpage + Ads local",
    comboItemIds: ["gm-optimize", "fb-care-advanced", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Local discovery", duration: "Tuần 1–3", focus: "Google Maps", tasks: ["Tối ưu Maps", "Ảnh xưởng & dịch vụ", "Thu thập review"] },
      { title: "Giai đoạn 2 — Nuôi khách quen", duration: "Tuần 4–8", focus: "Fanpage", tasks: ["Bài bảo dưỡng / tips", "Khuyến mãi combo", "Inbox đặt lịch"] },
      { title: "Giai đoạn 3 — Tăng lịch hẹn", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads bán kính", "Retarget khách cũ", "Tối ưu chi phí/inbox"] },
    ],
    whyBullets: ["Khách tìm 'garage gần đây' trên Maps rất nhiều", "Fanpage giúp nhắc bảo dưỡng & khuyến mãi theo mùa", "Ads giúp lấp lịch ngày vắng"],
    risks: ["Maps thiếu review → khách chọn xưởng đối thủ", "Không nhắc khách cũ online → mất doanh thu tái mua"],
    expectedResults: ["3–4 tuần: tăng cuộc gọi & chỉ đường Maps", "2 tháng: tăng inbox đặt lịch"],
    clientPrep: ["Bảng dịch vụ & giá", "Ảnh xưởng, thiết bị", "Chương trình khuyến mãi"],
    caseStudy: { title: "Garage / Detailing", result: "Tăng lịch hẹn inbox sau 45 ngày Maps + Fanpage" },
  },
  {
    id: "fashion-retail",
    label: "Thời trang / Mỹ phẩm",
    match: /thời trang|quần áo|mỹ phẩm|cosmetic|fashion|làm đẹp bán lẻ|skincare/i,
    summary:
      "Bán thời trang & mỹ phẩm cần Fanpage content sản phẩm mạnh, website/catalog chuyển đổi và ads scale đơn hàng.",
    comboLabel: "Combo đề xuất: Website + Fanpage Pro + Ads",
    comboItemIds: ["web-build-6", "fb-care-pro", "fb-ads-under-10", "web-care-10"],
    phases: [
      { title: "Giai đoạn 1 — Showcase sản phẩm", duration: "Tuần 1–5", focus: "Website + Fanpage", tasks: ["Website/catalog", "Fanpage chuẩn visual", "CTA inbox/Zalo"] },
      { title: "Giai đoạn 2 — Content bán hàng", duration: "Tuần 6–10", focus: "Content", tasks: ["Lookbook / review SP", "Livestream / flash sale", "CSKH inbox nhanh"] },
      { title: "Giai đoạn 3 — Scale đơn", duration: "Tuần 11+", focus: "Quảng cáo", tasks: ["Ads conversion", "Retarget khách xem SP", "Tối ưu ROAS"] },
    ],
    whyBullets: ["Visual content quyết định 80% quyết định mua với ngành này", "Website giúp sở hữu catalog & SEO sản phẩm", "Ads giúp test nhanh mẫu bán chạy"],
    risks: ["Chỉ bán inbox không hệ thống → khó scale & dễ sót đơn", "Content không đều → fan không quay lại"],
    expectedResults: ["4–6 tuần: tăng inbox & đơn", "3 tháng: funnel ads ổn định"],
    clientPrep: ["Catalog & giá sản phẩm", "Ảnh chụp / video SP", "Chính sách đổi trả"],
    caseStudy: { title: "Shop thời trang / mỹ phẩm", result: "Tăng đơn inbox sau 60 ngày content + ads" },
  },
  {
    id: "travel",
    label: "Du lịch / Tour",
    match: /du lịch|tour|lữ hành|travel|vé máy bay|booking tour/i,
    summary:
      "Ngành du lịch cần website tour/landing hấp dẫn, Fanpage nuôi cảm hứng đi & ads theo mùa để thu booking.",
    comboLabel: "Combo đề xuất: Website tour + Fanpage + Ads mùa vụ",
    comboItemIds: ["web-build-6", "fb-care-advanced", "fb-ads-under-10", "web-care-10"],
    phases: [
      { title: "Giai đoạn 1 — Landing tour", duration: "Tuần 1–4", focus: "Website", tasks: ["Landing tour hot", "Form booking / Zalo", "Tích hợp FAQ & lịch trình"] },
      { title: "Giai đoạn 2 — Nuôi cảm hứng", duration: "Tuần 5–8", focus: "Fanpage", tasks: ["Ảnh/video điểm đến", "Review khách đi tour", "Tương tác inbox tư vấn"] },
      { title: "Giai đoạn 3 — Booking mùa cao", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads theo mùa/lễ", "Retarget khách xem tour", "Tối ưu chi phí/booking"] },
    ],
    whyBullets: ["Khách đặt tour sau khi xem hình ảnh & review — Fanpage rất quan trọng", "Website giúp chốt tour cụ thể với lịch trình rõ", "Ads mùa vụ giúp lấp chỗ tour trước peak season"],
    risks: ["Không có landing rõ → khách hỏi nhiều nhưng không chốt", "Content cũ → mất niềm tin về tour hiện tại"],
    expectedResults: ["4–6 tuần: tăng inbox tư vấn tour", "2–3 tháng: booking ổn định theo mùa"],
    clientPrep: ["Lịch trình & giá tour", "Ảnh/video điểm đến", "Chính sách hủy/đổi"],
    caseStudy: { title: "Công ty tour local", result: "Tăng booking inbox trước mùa cao điểm sau 60 ngày" },
  },
  {
    id: "fitness",
    label: "Gym / Yoga / Fitness",
    match: /gym|yoga|fitness|pilates| võ|võ thuật|crossfit|pt cá nhân/i,
    summary:
      "Phòng gym & yoga cần Maps local, Fanpage nuôi cộng đồng và ads thu học viên mới, website giới thiệu gói tập.",
    comboLabel: "Combo đề xuất: Maps + Website + Fanpage + Ads",
    comboItemIds: ["gm-optimize", "web-build-3", "fb-care-advanced", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Local & niềm tin", duration: "Tuần 1–4", focus: "Maps + Website", tasks: ["Tối ưu Maps", "Website gói tập/lịch", "CTA đăng ký thử"] },
      { title: "Giai đoạn 2 — Cộng đồng", duration: "Tuần 5–8", focus: "Fanpage", tasks: ["Content transformation", "Lịch lớp học", "Inbox tư vấn gói"] },
      { title: "Giai đoạn 3 — Tuyển hội viên", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads lead thử buổi", "Retarget khách quan tâm", "Tối ưu chi phí/lead"] },
    ],
    whyBullets: ["Khách tìm phòng tập gần nhà trên Maps", "Fanpage show kết quả học viên — thúc đẩy quyết định", "Ads giúp tuyển hội viên mới ổn định hàng tháng"],
    risks: ["Maps không cập nhật giờ/lớp → khách đến sai", "Không có content transformation → khó bán gói cao"],
    expectedResults: ["3–5 tuần: tăng inbox & đăng ký thử", "2–3 tháng: hội viên mới ổn định hơn"],
    clientPrep: ["Bảng gói tập & giá", "Ảnh cơ sở, HLV", "Chương trình thử / ưu đãi"],
    caseStudy: { title: "Phòng gym / Yoga", result: "Tăng đăng ký thử & inbox sau 45 ngày Maps + ads" },
  },
  {
    id: "events",
    label: "Sự kiện / Wedding",
    match: /sự kiện|wedding|tiệc cưới|nhiếp ảnh|studio ảnh|trang trí tiệc|event planner/i,
    summary:
      "Ngành sự kiện & cưới cần portfolio website/Fanpage visual mạnh và ads thu lead theo mùa cưới/lễ.",
    comboLabel: "Combo đề xuất: Website portfolio + Fanpage + Ads",
    comboItemIds: ["web-build-6", "fb-care-pro", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Portfolio", duration: "Tuần 1–4", focus: "Website + Fanpage", tasks: ["Website album tiêu biểu", "Fanpage visual chuẩn", "Form báo giá nhanh"] },
      { title: "Giai đoạn 2 — Social proof", duration: "Tuần 5–8", focus: "Content", tasks: ["Ảnh/video sự kiện mới", "Review khách hàng", "Behind the scenes"] },
      { title: "Giai đoạn 3 — Thu lead mùa vụ", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads lead wedding/event", "Retarget cặp đôi quan tâm", "Tối ưu chi phí/lead"] },
    ],
    whyBullets: ["Khách chọn vendor dựa 90% vào portfolio visual", "Fanpage giúp cập nhật style mới nhất", "Ads giúp chủ động tiếp cận cặp đôi đang lên kế hoạch"],
    risks: ["Portfolio cũ → khách nghĩ bạn không còn active", "Phản hồi chậm → mất lead cho studio khác"],
    expectedResults: ["4–6 tuần: tăng inbox báo giá", "2–3 tháng: pipeline booking mùa vụ"],
    clientPrep: ["Album tiêu biểu", "Bảng gói & giá", "Lịch trống theo mùa"],
    caseStudy: { title: "Studio wedding / Event", result: "Tăng lead báo giá trước mùa cưới sau 60 ngày" },
  },
  {
    id: "tech",
    label: "Công nghệ / IT",
    match: /công nghệ|phần mềm|\bit\b|saas|startup|thiết kế app|digital agency/i,
    summary:
      "Công ty công nghệ cần website chuyên nghiệp showcase sản phẩm/dịch vụ, content thought leadership và ads B2B lead.",
    comboLabel: "Combo đề xuất: Website chuyên sâu + Content + Ads B2B",
    comboItemIds: ["web-build-9", "fb-care-advanced", "web-care-20", "fb-ads-over-10"],
    phases: [
      { title: "Giai đoạn 1 — Product showcase", duration: "Tuần 1–6", focus: "Website", tasks: ["Website sản phẩm/dịch vụ", "Case study khách hàng", "Form demo/liên hệ"] },
      { title: "Giai đoạn 2 — Authority", duration: "Tuần 7–10", focus: "Content", tasks: ["Blog kỹ thuật / insight", "Fanpage cập nhật sản phẩm", "SEO từ khóa ngành"] },
      { title: "Giai đoạn 3 — Lead B2B", duration: "Tuần 11+", focus: "Ads", tasks: ["Ads lead doanh nghiệp", "Retarget visitor website", "Tối ưu chi phí/demo"] },
    ],
    whyBullets: ["Khách B2B đánh giá năng lực qua website & case study trước", "Content kỹ thuật giúp SEO & xây uy tín chuyên gia", "Ads giúp tiếp cận DN đang tìm giải pháp số"],
    risks: ["Website lỗi thời → mất niềm tin với khách enterprise", "Không có case study → khó chốt deal giá cao"],
    expectedResults: ["6–10 tuần: tăng demo request", "3 tháng: pipeline B2B ổn định"],
    clientPrep: ["Mô tả sản phẩm/dịch vụ", "Case study & logo khách hàng", "Đối tượng khách mục tiêu"],
    caseStudy: { title: "Công ty phần mềm SME", result: "Tăng demo request sau 90 ngày website + content SEO" },
  },
  {
    id: "pharmacy",
    label: "Nhà thuốc / Dược",
    match: /nhà thuốc|dược phẩm|thuốc tân dược|pharmacy|drug store/i,
    summary:
      "Nhà thuốc cần Maps để khách tìm gần nhất, Fanpage tư vấn sản phẩm & website giới thiệu dịch vụ/chính sách.",
    comboLabel: "Combo đề xuất: Maps + Fanpage + Website giới thiệu",
    comboItemIds: ["gm-optimize", "web-build-3", "fb-care-basic"],
    phases: [
      { title: "Giai đoạn 1 — Hiện diện local", duration: "Tuần 1–3", focus: "Google Maps", tasks: ["Tối ưu Maps", "Giờ mở cửa & dịch vụ", "Thu thập review"] },
      { title: "Giai đoạn 2 — Tư vấn online", duration: "Tuần 4–7", focus: "Fanpage + Website", tasks: ["Website giới thiệu", "Fanpage tips sức khỏe", "Inbox tư vấn SP"] },
      { title: "Giai đoạn 3 — Giữ chân khách", duration: "Tuần 8+", focus: "Content", tasks: ["Chương trình khách quen", "Content theo mùa bệnh", "Tối ưu hiển thị Maps"] },
    ],
    whyBullets: ["Khách tìm 'nhà thuốc gần đây' trên Maps khi cần gấp", "Fanpage giúp tư vấn SP & chương trình khuyến mãi", "Website tăng uy tín với khách mua thuốc định kỳ"],
    risks: ["Maps sai giờ/địa chỉ → mất khách cấp bách", "Không phản hồi inbox → khách mua ở nhà thuốc khác"],
    expectedResults: ["2–4 tuần: tăng lượt tìm Maps", "2 tháng: tăng inbox & khách quen online"],
    clientPrep: ["Danh mục SP chủ lực", "Giờ mở cửa chính xác", "Chương trình khuyến mãi"],
    caseStudy: { title: "Nhà thuốc chuỗi nhỏ", result: "Tăng lượt chỉ đường Maps & inbox sau 30 ngày" },
  },
  {
    id: "logistics",
    label: "Logistics / Vận chuyển",
    match: /logistics|vận chuyển|giao hàng|freight|kho bãi|ship hàng|fulfillment/i,
    summary:
      "Logistics cần website giới thiệu dịch vụ & báo giá, Fanpage cập nhật uy tín và ads thu lead doanh nghiệp cần vận chuyển.",
    comboLabel: "Combo đề xuất: Website + Fanpage + Ads B2B",
    comboItemIds: ["web-build-6", "fb-care-basic", "fb-ads-under-10", "gm-optimize"],
    phases: [
      { title: "Giai đoạn 1 — Dịch vụ rõ ràng", duration: "Tuần 1–4", focus: "Website + Maps", tasks: ["Website dịch vụ & bảng giá", "Maps văn phòng/kho", "Form báo giá"] },
      { title: "Giai đoạn 2 — Uy tín vận hành", duration: "Tuần 5–8", focus: "Fanpage", tasks: ["Cập nhật quy trình giao nhận", "Feedback khách hàng", "Tuyển dụng / mở rộng tuyến"] },
      { title: "Giai đoạn 3 — Thu lead B2B", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads lead DN", "Retarget", "Tối ưu chi phí/lead"] },
    ],
    whyBullets: ["Khách B2B so sánh 3–5 đơn vị vận chuyển qua website trước", "Fanpage giúp show quy mô & uy tín vận hành", "Ads giúp tiếp cận shop/ DN mới cần ship"],
    risks: ["Không có báo giá/minh bạch online → khách chọn đối thủ rõ ràng hơn", "Lead chậm phản hồi → mất hợp đồng"],
    expectedResults: ["4–8 tuần: tăng form báo giá", "3 tháng: pipeline B2B ổn định"],
    clientPrep: ["Bảng giá theo tuyến/trọng lượng", "Quy trình giao nhận", "Khu vực phục vụ"],
    caseStudy: { title: "Công ty giao hàng nội thành", result: "Tăng lead báo giá B2B sau 60 ngày website + ads" },
  },
  {
    id: "agriculture",
    label: "Nông sản / Thực phẩm",
    match: /nông sản|thực phẩm sạch|nông nghiệp|farm|trang trại|thủy sản|đặc sản/i,
    summary:
      "Nông sản & thực phẩm cần Fanpage show sản phẩm tươi, website đặt hàng/ giới thiệu nguồn gốc và ads mở rộng kênh bán.",
    comboLabel: "Combo đề xuất: Fanpage + Website + Ads",
    comboItemIds: ["web-build-3", "fb-care-advanced", "fb-ads-under-10"],
    phases: [
      { title: "Giai đoạn 1 — Story nguồn gốc", duration: "Tuần 1–4", focus: "Fanpage + Website", tasks: ["Fanpage ảnh farm/thu hoạch", "Website giới thiệu & đặt hàng", "CTA Zalo/inbox"] },
      { title: "Giai đoạn 2 — Nuôi khách quen", duration: "Tuần 5–8", focus: "Content", tasks: ["Bài mùa vụ", "Combo gia đình", "Giao hàng & feedback"] },
      { title: "Giai đoạn 3 — Mở rộng bán", duration: "Tuần 9+", focus: "Ads", tasks: ["Ads theo mùa vụ", "Retarget khách cũ", "Tối ưu chi phí/đơn"] },
    ],
    whyBullets: ["Khách muốn thấy nguồn gốc & quy trình trước khi mua online", "Fanpage giúp bán theo mùa vụ nhanh", "Website giúp đặt hàng có hệ thống hơn inbox lẻ"],
    risks: ["Không show nguồn gốc → khách nghi chất lượng", "Chỉ bán word-of-mouth → khó mở rộng"],
    expectedResults: ["4–6 tuần: tăng inbox & đơn lẻ", "3 tháng: khách quen & đơn định kỳ"],
    clientPrep: ["Catalog sản phẩm theo mùa", "Ảnh farm/quy trình", "Chính sách giao hàng"],
    caseStudy: { title: "Farm / Đặc sản vùng miền", result: "Tăng đơn inbox & website sau 60 ngày content + ads" },
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
  if (!text) return PROFILES[PROFILES.length - 1];

  const suggestion = findIndustrySuggestion(text);
  if (suggestion) {
    return PROFILES.find((p) => p.id === suggestion.profileId) ?? PROFILES[PROFILES.length - 1];
  }

  return PROFILES.find((profile) => profile.id !== "default" && profile.match.test(text)) ?? PROFILES[PROFILES.length - 1];
}

export function budgetFilterFromForm(budget: string): BudgetFilter {
  if (budget.includes("Dưới 5")) return "under5";
  if (budget.includes("5–15") || budget.includes("5-15")) return "5to15";
  if (budget.includes("Trên 15")) return "over15";
  return "all";
}

export type PackageTier = "starter" | "growth" | "professional";

export type ComboRecommendation = {
  tier: PackageTier;
  tierLabel: string;
  label: string;
  reasons: string[];
  itemIds: string[];
  websiteStack: WebsiteStackRecommendation | null;
  fanpageStack: FanpageStackRecommendation | null;
  mapsStack: MapsStackRecommendation | null;
};

type BudgetTier = 0 | 1 | 2;
type ScaleTier = 0 | 1 | 2;

type IndustryChannelConfig = {
  needsWebsite: boolean;
  needsFanpage: boolean;
  needsMaps: boolean;
  adsPreference: "fb" | "gm" | "auto";
  localBusiness: boolean;
};

const TIER_LABELS: Record<PackageTier, string> = {
  starter: "Gói Khởi đầu",
  growth: "Gói Tăng trưởng",
  professional: "Gói Chuyên sâu",
};

const INDUSTRY_CHANNELS: Record<string, IndustryChannelConfig> = {
  "health-beauty": { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "gm", localBusiness: true },
  fnb: { needsWebsite: false, needsFanpage: true, needsMaps: true, adsPreference: "gm", localBusiness: true },
  ecommerce: { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  realestate: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "fb", localBusiness: true },
  education: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "fb", localBusiness: true },
  hotel: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "fb", localBusiness: true },
  construction: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "fb", localBusiness: true },
  "professional-services": { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  automotive: { needsWebsite: false, needsFanpage: true, needsMaps: true, adsPreference: "gm", localBusiness: true },
  "fashion-retail": { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  travel: { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  fitness: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "gm", localBusiness: true },
  events: { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  tech: { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  pharmacy: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "gm", localBusiness: true },
  logistics: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "fb", localBusiness: false },
  agriculture: { needsWebsite: true, needsFanpage: true, needsMaps: false, adsPreference: "fb", localBusiness: false },
  default: { needsWebsite: true, needsFanpage: true, needsMaps: true, adsPreference: "auto", localBusiness: true },
};

function getBudgetTier(budgetRange: string): BudgetTier {
  if (budgetRange.includes("Dưới 5")) return 0;
  if (budgetRange.includes("Trên 15")) return 2;
  return 1;
}

function getScaleTier(scale: string): ScaleTier {
  if (scale.includes("Trên 5")) return 2;
  if (scale.includes("2–5") || scale.includes("2-5")) return 1;
  return 0;
}

function resolvePackageTier(budget: BudgetTier, scale: ScaleTier): PackageTier {
  const score = budget + (scale >= 2 ? 1 : 0);
  if (score >= 3) return "professional";
  if (score >= 1) return "growth";
  return "starter";
}

const DISPLAY_ORDER = [
  "gm-",
  "web-build",
  "web-domain",
  "web-data",
  "web-care",
  "fb-build",
  "fb-care",
  "fb-ads",
  "gm-ads",
];

function sortComboIds(ids: string[]) {
  return [...ids].sort((a, b) => {
    const rank = (id: string) => DISPLAY_ORDER.findIndex((prefix) => id.startsWith(prefix));
    return (rank(a) === -1 ? 99 : rank(a)) - (rank(b) === -1 ? 99 : rank(b));
  });
}

function trimComboToMonthlyBudget(itemIds: string[], budgetRange: string): string[] {
  const maxMonthly = budgetRange.includes("Dưới 5") ? 5_000_000 : budgetRange.includes("Trên 15") ? Number.POSITIVE_INFINITY : 15_000_000;
  let ids = [...itemIds];

  const downgradeCare = () => {
    for (let i = 0; i < ids.length; i++) {
      const posts = parseFanpageCarePosts(ids[i]);
      if (posts !== null && posts > 10) {
        ids[i] = fanpageCareItemId(posts - 5);
        return true;
      }
    }
    const careDown: Record<string, string> = {
      "web-care-30": "web-care-20",
      "web-care-20": "web-care-10",
      "fb-care-pro": "fb-care-35",
      "fb-care-advanced": "fb-care-25",
      "fb-care-basic": "fb-care-10",
    };
    for (let i = 0; i < ids.length; i++) {
      const next = careDown[ids[i]];
      if (next) {
        ids[i] = next;
        return true;
      }
    }
    return false;
  };

  while (calculatePlanTotals(ids).month > maxMonthly) {
    const adsId = ids.find((id) => id.includes("ads"));
    if (adsId) {
      ids = ids.filter((id) => id !== adsId);
      continue;
    }
    if (downgradeCare()) continue;
    break;
  }

  return ids;
}

function buildComboLabel(itemIds: string[]): string {
  const parts: string[] = [];
  if (itemIds.some((id) => id.startsWith("gm-") && !id.includes("ads"))) parts.push("Google Maps");
  if (itemIds.some((id) => id.startsWith("web-build"))) parts.push("Website");
  if (itemIds.some((id) => id.startsWith("web-care"))) parts.push("Chăm sóc Website");
  if (itemIds.some((id) => id.startsWith("fb-build"))) parts.push("Xây Fanpage");
  if (itemIds.some((id) => id.startsWith("fb-care"))) parts.push("Chăm sóc Fanpage");
  if (itemIds.some((id) => id.includes("ads"))) parts.push("Quảng cáo");
  return parts.length ? `Combo: ${parts.join(" + ")}` : "Combo đề xuất";
}

export function buildRecommendedCombo(
  profile: IndustryProfile,
  form: Pick<StrategyFormSnapshot, "businessGoal" | "scale" | "budgetRange" | "existingAssets">,
): ComboRecommendation {
  const has = (key: string) => form.existingAssets.includes(key);
  const budgetTier = getBudgetTier(form.budgetRange);
  const scaleTier = getScaleTier(form.scale);
  const tier = resolvePackageTier(budgetTier, scaleTier);
  const channels = INDUSTRY_CHANNELS[profile.id] ?? INDUSTRY_CHANNELS.default;

  const ids: string[] = [];
  const reasons: string[] = [];

  let websiteStack: WebsiteStackRecommendation | null = null;
  let fanpageStack: FanpageStackRecommendation | null = null;
  let mapsStack: MapsStackRecommendation | null = null;

  const stackInput = {
    profileId: profile.id,
    businessGoal: form.businessGoal,
    scale: form.scale,
    tier,
    budgetTier,
    scaleTier,
  };

  reasons.push(`Gói ${TIER_LABELS[tier]} phù hợp ngân sách ${form.budgetRange.toLowerCase()} và quy mô ${form.scale}.`);

  if (channels.needsMaps) {
    mapsStack = recommendMapsStack({
      ...stackInput,
      hasMaps: has("maps"),
      hasAds: has("ads"),
    });
    if (mapsStack) {
      ids.push(...buildMapsStackItemIds(mapsStack));
      reasons.push(mapsStack.reasons[0]);
      if (mapsStack.multiLocationNote) reasons.push(mapsStack.multiLocationNote);
    }
  }

  if (channels.needsWebsite) {
    if (!has("website")) {
      websiteStack = recommendWebsiteStack({
        profileId: profile.id,
        businessGoal: form.businessGoal,
        scale: form.scale,
        budgetRange: form.budgetRange,
        tier,
        budgetTier,
        scaleTier,
        hasWebsite: false,
      });
      if (websiteStack) {
        ids.push(...buildWebsiteStackItemIds(websiteStack));
        reasons.push(websiteStack.reasons[0], websiteStack.reasons[2]);
      }
    } else {
      const careOnly = recommendWebsiteCareOnly({
        profileId: profile.id,
        businessGoal: form.businessGoal,
        tier,
        budgetTier,
      });
      ids.push(careOnly.careId);
      reasons.push(careOnly.reason);
    }
  }

  if (channels.needsFanpage) {
    if (!has("fanpage")) {
      fanpageStack = recommendFanpageStack({
        ...stackInput,
        hasFanpage: false,
        hasAds: has("ads"),
      });
      if (fanpageStack) {
        ids.push(...buildFanpageStackItemIds(fanpageStack));
        reasons.push(fanpageStack.reasons[0], fanpageStack.reasons[1]);
      }
    } else {
      const careOnly = recommendFanpageCareOnly({ ...stackInput, hasAds: has("ads") });
      ids.push(careOnly.careId);
      reasons.push(careOnly.reason);
      fanpageStack = recommendFanpageStack({
        ...stackInput,
        hasFanpage: true,
        hasAds: has("ads"),
      });
      if (fanpageStack?.adsId) {
        ids.push(fanpageStack.adsId);
        const adsReason = fanpageStack.reasons.find((r) => r.includes("Quảng cáo"));
        if (adsReason) reasons.push(adsReason);
      }
      if (fanpageStack) {
        fanpageStack = {
          ...fanpageStack,
          buildId: null,
          buildName: null,
          buildPrice: 0,
          setupOnce: 0,
        };
      }
    }
  }

  if (form.businessGoal.includes("thương hiệu")) {
    reasons.push("Mục tiêu thương hiệu → ưu tiên content Website/Fanpage trước khi scale ads.");
  } else if (has("ads")) {
    reasons.push("Đã chạy quảng cáo → bỏ phí quản lý ads, tập trung nội dung & tối ưu kênh.");
  }

  let itemIds = sortComboIds([...new Set(ids)]);
  itemIds = trimComboToMonthlyBudget(itemIds, form.budgetRange);

  const monthTotal = calculatePlanTotals(itemIds).month;
  if (monthTotal > 0 && form.budgetRange.includes("Dưới 5") && monthTotal <= 5_000_000) {
    reasons.push(`Tổng phí hàng tháng ~${formatVnd(monthTotal)} — nằm trong ngân sách đã khai.`);
  }

  if (itemIds.length === 0) {
    return {
      tier,
      tierLabel: TIER_LABELS[tier],
      label: profile.comboLabel,
      reasons: ["Gói mặc định theo ngành nghề."],
      itemIds: sortComboIds(adjustComboForAssets(profile.comboItemIds, form.existingAssets)),
      websiteStack: null,
      fanpageStack: null,
      mapsStack: null,
    };
  }

  if (websiteStack && !itemIds.includes(websiteStack.buildId)) {
    websiteStack = null;
  }
  if (fanpageStack?.buildId && !itemIds.includes(fanpageStack.buildId)) {
    fanpageStack = { ...fanpageStack, buildId: null, buildName: null, buildPrice: 0, setupOnce: 0 };
  }
  if (fanpageStack?.adsId && !itemIds.includes(fanpageStack.adsId)) {
    fanpageStack = { ...fanpageStack, adsId: null, adsName: null, adsPrice: 0, monthlyRecurring: fanpageStack.carePrice };
  }
  const fbCareId = itemIds.find((id) => id.startsWith("fb-care"));
  if (fanpageStack && fbCareId) {
    const posts = parseFanpageCarePosts(fbCareId);
    if (posts !== null) {
      const carePrice = fanpageCarePrice(posts);
      fanpageStack = {
        ...fanpageStack,
        careId: fbCareId,
        carePosts: posts,
        carePrice,
        careTierLabel: getFanpageCareTierLabel(posts),
        careAlternatives: buildFanpageCareAlternatives(posts),
        monthlyRecurring: carePrice + fanpageStack.adsPrice,
      };
    }
  }
  if (mapsStack?.adsId && !itemIds.includes(mapsStack.adsId)) {
    mapsStack = { ...mapsStack, adsId: null, adsName: null, adsPrice: 0, monthlyRecurring: 0 };
  }

  const finalReasons = [...reasons];
  if (websiteStack) {
    finalReasons.push(
      `Tổng setup năm đầu (web + domain + hosting): ${formatVnd(websiteStack.firstYearSetup)} · Chăm sóc web: ${formatVnd(websiteStack.monthlyRecurring)}/tháng.`,
    );
  }
  if (fanpageStack) {
    finalReasons.push(
      `Fanpage — setup: ${formatVnd(fanpageStack.setupOnce)} · Chăm sóc ${fanpageStack.carePosts} bài: ${formatVnd(fanpageStack.monthlyRecurring)}/tháng.`,
    );
  }
  if (mapsStack) {
    finalReasons.push(
      `Google Maps — ${mapsStack.serviceName}: ${formatVnd(mapsStack.setupOnce)}${mapsStack.monthlyRecurring ? ` · Ads: ${formatVnd(mapsStack.monthlyRecurring)}/tháng` : ""}.`,
    );
  }

  return {
    tier,
    tierLabel: TIER_LABELS[tier],
    label: buildComboLabel(itemIds),
    reasons: finalReasons.slice(0, 6),
    itemIds,
    websiteStack,
    fanpageStack,
    mapsStack,
  };
}

export function adjustComboForAssets(comboIds: string[], existingAssets: string[]) {
  const has = (key: string) => existingAssets.includes(key);
  return comboIds.filter((id) => {
    if (has("website") && (id.startsWith("web-build") || id.startsWith("web-data") || id === "web-domain-com")) return false;
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
    const billing = getItemBilling(id);
    if (billing === "month") month += price;
    else if (billing === "year") year += price;
    else once += price;
  }
  return { once, month, year };
}

export function formatVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export function getBudgetMonthlyLimit(budgetRange: string) {
  if (budgetRange.includes("Dưới 5")) return 5_000_000;
  if (budgetRange.includes("Trên 15")) return null;
  return 15_000_000;
}

export function getBudgetFitAssessment(monthTotal: number, budgetRange: string) {
  const limit = getBudgetMonthlyLimit(budgetRange);
  if (limit === null) {
    return {
      status: "good" as const,
      message: "Ngân sách linh hoạt — có thể triển khai gói chuyên sâu.",
      percentUsed: Math.min(100, Math.round((monthTotal / 20_000_000) * 100)),
    };
  }
  const percentUsed = Math.round((monthTotal / limit) * 100);
  if (percentUsed <= 85) {
    return {
      status: "good" as const,
      message: `Phí hàng tháng ~${formatVnd(monthTotal)} — nằm trong ${budgetRange.toLowerCase()}.`,
      percentUsed,
    };
  }
  if (percentUsed <= 100) {
    return {
      status: "warning" as const,
      message: `Gần ngưỡng ngân sách (${formatVnd(monthTotal)}/tháng). Có thể bỏ ads để tối ưu.`,
      percentUsed,
    };
  }
  return {
    status: "over" as const,
    message: `Vượt ngân sách khai báo — hãy bỏ bớt gói hoặc hạ cấp chăm sóc.`,
    percentUsed: Math.min(percentUsed, 150),
  };
}

export function getIndustryCount() {
  return getIndustrySuggestionCount();
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
  const rec = buildRecommendedCombo(profile, form);
  const comboIds = rec.itemIds;
  const totals = calculatePlanTotals(planIds.length ? planIds : comboIds);
  const lines = [
    `CHIẾN LƯỢC MARKETING — ${form.companyName}`,
    `Người liên hệ: ${form.fullName} | ${form.phone} | ${form.email}`,
    `Ngành: ${form.industry} | Quy mô: ${form.scale}`,
    `Mục tiêu: ${form.businessGoal} | Ngân sách: ${form.budgetRange}`,
    "",
    profile.summary,
    "",
    `${rec.tierLabel} — ${rec.label}`,
    ...rec.reasons.map((r) => `• ${r}`),
    ...(rec.websiteStack
      ? [
          "",
          "GÓI WEBSITE CHI TIẾT (theo /website):",
          `• Thiết kế: ${rec.websiteStack.buildName} — ${formatVnd(rec.websiteStack.buildPrice)}`,
          `• Hosting: ${rec.websiteStack.hostingGb}GB/năm — ${formatVnd(rec.websiteStack.hostingPrice)} (${rec.websiteStack.hostingLabel})`,
          `• Tên miền .com — ${formatVnd(DOMAIN_COM_PRICE)}`,
          `• Chăm sóc: ${rec.websiteStack.carePosts} bài/tháng — ${formatVnd(rec.websiteStack.carePrice)}`,
          `• Setup năm đầu: ${formatVnd(rec.websiteStack.firstYearSetup)} | Chăm sóc: ${formatVnd(rec.websiteStack.monthlyRecurring)}/tháng`,
        ]
      : []),
    ...(rec.fanpageStack
      ? [
          "",
          "GÓI FANPAGE CHI TIẾT (theo /facebook):",
          ...(rec.fanpageStack.buildName
            ? [`• Setup: ${rec.fanpageStack.buildName} — ${formatVnd(rec.fanpageStack.buildPrice)}`]
            : []),
          `• Chăm sóc: ${rec.fanpageStack.carePosts} bài/th — ${formatVnd(rec.fanpageStack.carePrice)} (${formatVnd(FANPAGE_CARE_PRICE_PER_POST)}/bài, mức "${rec.fanpageStack.careTierLabel}")`,
          `• Tham chiếu: ${rec.fanpageStack.careAlternatives.map((a) => `${a.posts} bài = ${formatVnd(a.price)}`).join(" · ")}`,
          ...(rec.fanpageStack.adsName
            ? [`• Quảng cáo: ${rec.fanpageStack.adsName} — ${formatVnd(rec.fanpageStack.adsPrice)}/tháng`]
            : []),
          `• Setup: ${formatVnd(rec.fanpageStack.setupOnce)} | Duy trì: ${formatVnd(rec.fanpageStack.monthlyRecurring)}/tháng`,
        ]
      : []),
    ...(rec.mapsStack
      ? [
          "",
          "GÓI GOOGLE MAPS CHI TIẾT (theo /google-maps):",
          `• Dịch vụ: ${rec.mapsStack.serviceName} — ${formatVnd(rec.mapsStack.servicePrice)}`,
          ...(rec.mapsStack.adsName
            ? [`• Quảng cáo: ${rec.mapsStack.adsName} — ${formatVnd(rec.mapsStack.adsPrice)}/tháng`]
            : []),
          ...(rec.mapsStack.multiLocationNote ? [`• Lưu ý: ${rec.mapsStack.multiLocationNote}`] : []),
        ]
      : []),
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
