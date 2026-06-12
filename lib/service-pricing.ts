/**
 * Nguồn giá chuẩn — đồng bộ với /website, /facebook, /google-maps
 */

export function formatPriceVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export const HOSTING_PACKAGES = [
  { gb: 3, price: 3_348_000, label: "Doanh nghiệp nhỏ, website cá nhân" },
  { gb: 5, price: 4_872_000, label: "Website giới thiệu, landing page" },
  { gb: 7, price: 6_000_000, label: "Blog, website tin tức nhỏ" },
  { gb: 8, price: 6_504_000, label: "Cửa hàng online nhỏ" },
  { gb: 10, price: 7_200_000, label: "Website doanh nghiệp vừa & nhỏ" },
  { gb: 16, price: 10_080_000, label: "Website doanh nghiệp chuyên nghiệp" },
  { gb: 20, price: 12_000_000, label: "Website TMĐT, nhiều sản phẩm" },
  { gb: 30, price: 16_080_000, label: "Website nhiều truy cập, dữ liệu lớn" },
  { gb: 50, price: 24_000_000, label: "Website hệ thống, nhiều tính năng" },
  { gb: 60, price: 28_008_000, label: "Website có lượng truy cập cao" },
  { gb: 70, price: 32_040_000, label: "Dự án lớn, hệ thống web phức tạp" },
  { gb: 80, price: 36_000_000, label: "Enterprise, hệ thống đa site" },
  { gb: 90, price: 39_960_000, label: "Hệ thống lớn, lưu trữ dữ liệu nhiều" },
  { gb: 100, price: 43_200_000, label: "Giải pháp cao cấp, hiệu suất tối đa" },
] as const;

/** Giá .com trên modal đăng ký tên miền (/website) */
export const DOMAIN_COM_PRICE = 350_000;

/** Chăm sóc Fanpage — 3 mốc cố định (trang /facebook) */
export const FANPAGE_CARE_TIERS = [
  { posts: 10, price: 1_500_000 },
  { posts: 20, price: 2_500_000 },
  { posts: 30, price: 3_500_000 },
] as const;

export const FANPAGE_CARE_POST_MIN = 10;
export const FANPAGE_CARE_POST_MAX = 30;
export const FANPAGE_CARE_POST_STEP = 10;

/** Mốc tham chiếu nhanh — 10 / 20 / 30 bài */
export const FANPAGE_CARE_REFERENCE_TIERS = [10, 20, 30] as const;

const FANPAGE_CARE_PRICE_BY_POSTS = Object.fromEntries(
  FANPAGE_CARE_TIERS.map((tier) => [tier.posts, tier.price]),
) as Record<number, number>;

export function fanpageCarePrice(postsPerMonth: number) {
  const posts = snapFanpageCarePosts(postsPerMonth);
  return FANPAGE_CARE_PRICE_BY_POSTS[posts] ?? FANPAGE_CARE_TIERS[0].price;
}

export function clampFanpageCarePosts(posts: number) {
  return Math.min(FANPAGE_CARE_POST_MAX, Math.max(FANPAGE_CARE_POST_MIN, Math.round(posts)));
}

/** Snap bước 10 bài — khớp slider /facebook (10, 20, 30) */
export function snapFanpageCarePosts(posts: number) {
  const clamped = clampFanpageCarePosts(posts);
  return Math.round(clamped / FANPAGE_CARE_POST_STEP) * FANPAGE_CARE_POST_STEP;
}

export function fanpageCareItemId(posts: number) {
  return `fb-care-${snapFanpageCarePosts(posts)}`;
}

/** Đọc số bài từ id `fb-care-20` hoặc legacy `fb-care-basic` */
export function parseFanpageCarePosts(id: string): number | null {
  const dynamic = id.match(/^fb-care-(\d+)$/);
  if (dynamic) return Number(dynamic[1]);
  const legacy: Record<string, number> = {
    "fb-care-basic": 10,
    "fb-care-advanced": 20,
    "fb-care-pro": 30,
  };
  return legacy[id] ?? null;
}

export function getFanpageCareWorks(posts: number): string[] {
  if (posts <= 10) {
    return ["Đăng bài đều đặn", "Thiết kế ảnh bài viết", "Phản hồi tin nhắn cơ bản", "Báo cáo tuần"];
  }
  if (posts <= 20) {
    return ["Content tương tác", "Thiết kế chuyên nghiệp", "Tối ưu giờ đăng", "Báo cáo chi tiết"];
  }
  if (posts <= 30) {
    return ["Chiến lược content tháng", "Video/Reels hỗ trợ", "Tương tác cộng đồng", "Báo cáo chi tiết"];
  }
  return ["Chiến lược content tháng", "Video/Reels hỗ trợ", "Tương tác cộng đồng", "Tối ưu chuyển đổi inbox"];
}

export function getFanpageCareTierLabel(posts: number) {
  if (posts <= 10) return "CS FB 1";
  if (posts <= 20) return "CS FB 2";
  return "CS FB 3";
}

export const WEBSITE_BUILD_PACKAGES = [
  {
    id: "web-build-3",
    name: "Giới thiệu",
    price: 3_000_000,
    quantity: "1 website giới thiệu",
    works: [
      "Website cơ bản, giao diện chuẩn",
      "Tương thích mobile",
      "Chuẩn SEO cơ bản",
      "Hỗ trợ kỹ thuật",
    ],
  },
  {
    id: "web-build-6",
    name: "Tối ưu",
    price: 6_000_000,
    quantity: "1 website chuyên nghiệp",
    works: [
      "Chuẩn SEO + UX",
      "Giao diện chuyên nghiệp",
      "Chuẩn SEO nâng cao",
      "Tối ưu tốc độ & tích hợp marketing",
    ],
  },
  {
    id: "web-build-9",
    name: "Kinh doanh",
    price: 9_000_000,
    quantity: "1 website kinh doanh",
    works: [
      "Tối ưu chuyển đổi (CRO)",
      "Thiết kế độc quyền theo thương hiệu",
      "Tích hợp CRM, Chatbot",
      "Báo cáo & theo dõi dữ liệu",
    ],
  },
  {
    id: "web-build-12",
    name: "Hệ thống",
    price: 12_000_000,
    quantity: "1 hệ thống website",
    works: [
      "Automation + Scale",
      "Hệ thống chuyên sâu, đa tính năng",
      "Tích hợp API, CRM nâng cao",
      "Hỗ trợ ưu tiên 24/7",
    ],
  },
] as const;

export const WEBSITE_CARE_PACKAGES = [
  {
    id: "web-care-10",
    posts: 10,
    price: 1_000_000,
    works: ["Viết & đăng bài SEO", "Tối ưu Onpage cơ bản", "Cập nhật hình ảnh minh họa", "Báo cáo tiến độ hàng tháng"],
  },
  {
    id: "web-care-20",
    posts: 20,
    price: 2_000_000,
    works: ["Viết & đăng bài SEO chuyên sâu", "Tối ưu từ khóa & meta", "Internal link trong website", "Báo cáo & đề xuất cải thiện"],
  },
  {
    id: "web-care-30",
    posts: 30,
    price: 2_500_000,
    works: ["Chiến lược content theo tháng", "Viết bài chuẩn SEO + CTA", "Tối ưu hiển thị & tốc độ", "Hỗ trợ ưu tiên khi cần chỉnh sửa"],
  },
] as const;

export const FANPAGE_BUILD_PACKAGES = [
  {
    id: "fb-build-basic",
    name: "Cải tạo Fanpage",
    price: 500_000,
    works: ["Thiết kế lại logo & ảnh bìa", "Tối ưu thông tin Fanpage", "SEO Fanpage cơ bản"],
  },
  {
    id: "fb-build-advanced",
    name: "Fanpage cơ bản",
    price: 1_000_000,
    works: ["Khởi tạo Fanpage chuyên nghiệp", "Logo, ảnh bìa, CTA", "SEO Fanpage cơ bản", "Hướng dẫn vận hành"],
  },
  {
    id: "fb-build-pro",
    name: "Fanpage nâng cao",
    price: 1_500_000,
    works: ["Setup Fanpage chuyên nghiệp", "SEO Fanpage chuẩn", "Chat tự động cơ bản", "Chiến lược nội dung ban đầu"],
  },
] as const;

export const FANPAGE_CARE_PACKAGES = FANPAGE_CARE_TIERS.map((tier) => ({
  id: `fb-care-${tier.posts}`,
  posts: tier.posts,
  price: tier.price,
  works: getFanpageCareWorks(tier.posts),
}));

/** Các mốc hiển thị trên bảng giá chiến lược & tham chiếu nhanh */
export const FANPAGE_CARE_SHOWCASE_POSTS = [10, 20, 30] as const;

export const FANPAGE_ADS_PACKAGES = [
  {
    id: "fb-ads-under-10",
    name: "Ngân sách dưới 10 triệu",
    price: 1_000_000,
    works: ["Thiết lập chiến dịch", "Target khách hàng mục tiêu", "Theo dõi & tối ưu", "Báo cáo kết quả"],
  },
  {
    id: "fb-ads-over-10",
    name: "Ngân sách trên 10 triệu",
    price: 2_000_000,
    works: ["Tối ưu chiến dịch nâng cao", "A/B Testing", "Tối ưu chuyển đổi", "Báo cáo chuyên sâu"],
  },
] as const;

export const GOOGLE_MAPS_PACKAGES = [
  {
    id: "gm-rebuild",
    name: "Cải tạo Google Maps",
    price: 300_000,
    works: ["Tối ưu thông tin", "Sửa danh mục", "Tối ưu hình ảnh cơ bản"],
  },
  {
    id: "gm-build",
    name: "Xây dựng Google Maps",
    price: 600_000,
    works: ["Tạo Google Business Profile", "Xác minh doanh nghiệp", "Setup đầy đủ thông tin"],
  },
  {
    id: "gm-optimize",
    name: "Tối ưu Google Maps",
    price: 900_000,
    works: ["Tối ưu SEO Maps", "Viết mô tả chuẩn", "Tối ưu hiển thị tìm kiếm"],
  },
] as const;

/**
 * Gói setup khi khách ĐÃ CÓ kênh — khớp bảng giá /website, /facebook, /google-maps
 * Website cải tạo giao diện: 3.000.000đ | Fanpage: 500.000đ (fb-build-basic) | Maps: 300.000đ (gm-rebuild)
 */
export const WEBSITE_RENOVATION = {
  id: "web-renovation",
  name: "Cải tạo giao diện Website",
  price: 3_000_000,
  quantity: "1 lần cải tạo giao diện",
  works: [
    "Thiết kế lại giao diện theo thương hiệu",
    "Tối ưu mobile & tốc độ",
    "Cập nhật CTA liên hệ / đặt lịch",
    "Chuẩn SEO cơ bản sau cải tạo",
  ],
} as const;

export const CHANNEL_OWNED_SETUP = {
  website: {
    itemId: WEBSITE_RENOVATION.id,
    price: WEBSITE_RENOVATION.price,
    label: WEBSITE_RENOVATION.name,
    pricingPath: "/website",
  },
  fanpage: {
    itemId: "fb-build-basic" as const,
    price: FANPAGE_BUILD_PACKAGES[0].price,
    label: FANPAGE_BUILD_PACKAGES[0].name,
    pricingPath: "/facebook",
  },
  maps: {
    itemId: "gm-rebuild" as const,
    price: GOOGLE_MAPS_PACKAGES[0].price,
    label: GOOGLE_MAPS_PACKAGES[0].name,
    pricingPath: "/google-maps",
  },
} as const;

export type OwnedChannelKey = keyof typeof CHANNEL_OWNED_SETUP;

export function getOwnedChannelSetup(channel: OwnedChannelKey) {
  return CHANNEL_OWNED_SETUP[channel];
}

export const GOOGLE_MAPS_ADS_PACKAGES = [
  {
    id: "gm-ads-under-10",
    name: "Ngân sách < 10 triệu",
    price: 1_000_000,
    works: ["Setup chiến dịch Local Ads", "Target khu vực", "Theo dõi hiệu quả", "Báo cáo"],
  },
  {
    id: "gm-ads-over-10",
    name: "Ngân sách > 10 triệu",
    price: 2_000_000,
    works: ["Tối ưu chiến dịch lớn", "A/B test quảng cáo", "Tối ưu chi phí/chuyển đổi", "Báo cáo nâng cao"],
  },
] as const;

export function getHostingPriceByGb(gb: number) {
  return HOSTING_PACKAGES.find((p) => p.gb === gb)?.price ?? HOSTING_PACKAGES[0].price;
}
