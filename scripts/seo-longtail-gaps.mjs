/**
 * Long-tail gaps — ngành × địa phương, so sánh, pain point.
 * Chỉ slug chưa có trên DB (audit trước khi seed).
 */
export const LONGTAIL_GAP_ENTRIES = [
  // Website × địa phương
  {
    slug: "thiet-ke-website-can-tho",
    keywordsMain: "thiết kế website Cần Thơ",
    h1: "Thiết Kế Website Cần Thơ Chuẩn SEO Cho Doanh Nghiệp Địa Phương",
    angle: "website chuyên nghiệp phục vụ khách hàng tại Cần Thơ và ĐBSCL",
    niche: "strategy",
  },
  {
    slug: "thiet-ke-website-binh-duong",
    keywordsMain: "thiết kế website Bình Dương",
    h1: "Thiết Kế Website Bình Dương — KCN Và Doanh Nghiệp SME",
    angle: "website cho doanh nghiệp khu công nghiệp và dịch vụ tại Bình Dương",
    niche: "strategy",
  },
  {
    slug: "thiet-ke-website-hai-phong",
    keywordsMain: "thiết kế website Hải Phòng",
    h1: "Thiết Kế Website Hải Phòng Chuẩn SEO Thu Hút Khách",
    angle: "website doanh nghiệp tại Hải Phòng và miền Bắc",
    niche: "strategy",
  },
  {
    slug: "thiet-ke-website-quan-cafe",
    keywordsMain: "thiết kế website quán cafe",
    h1: "Thiết Kế Website Quán Cafe — Menu, Đặt Bàn Và SEO Local",
    angle: "website F&B cafe kết hợp menu online và Google Maps",
    niche: "strategy",
  },
  {
    slug: "thiet-ke-website-cua-hang-thoi-trang-tphcm",
    keywordsMain: "thiết kế website cửa hàng thời trang tphcm",
    h1: "Thiết Kế Website Cửa Hàng Thời Trang TPHCM",
    angle: "website fashion brand showcase và bán hàng online tại Sài Gòn",
    niche: "strategy",
  },

  // SEO local × địa phương
  {
    slug: "seo-local-binh-duong",
    keywordsMain: "SEO local Bình Dương",
    h1: "SEO Local Bình Dương — Lên Top Google Maps Khu Vực",
    angle: "tối ưu Local Pack cho doanh nghiệp tại Bình Dương",
    niche: "seo",
  },
  {
    slug: "seo-local-can-tho",
    keywordsMain: "SEO local Cần Thơ",
    h1: "SEO Local Cần Thơ — Tăng Khách Từ Google Maps",
    angle: "SEO địa phương cho shop và dịch vụ tại Cần Thơ",
    niche: "seo",
  },
  {
    slug: "seo-spa-tphcm",
    keywordsMain: "SEO spa TPHCM",
    h1: "SEO Spa TPHCM — Lên Top Google Và Maps Ngành Làm Đẹp",
    angle: "SEO cho spa, thẩm mỹ viện tại TP.HCM",
    niche: "seo",
  },

  // Marketing × ngành / địa phương
  {
    slug: "marketing-spa-tphcm",
    keywordsMain: "marketing spa tphcm",
    h1: "Marketing Spa TPHCM — Facebook, Maps Và Website",
    angle: "chiến lược marketing spa tại Sài Gòn tăng lịch hẹn",
    niche: "strategy",
  },
  {
    slug: "marketing-nha-hang-ha-noi",
    keywordsMain: "marketing nhà hàng Hà Nội",
    h1: "Marketing Nhà Hàng Hà Nội — Thu Khách F&B Địa Phương",
    angle: "marketing nhà hàng quán ăn tại Hà Nội đa kênh",
    niche: "strategy",
  },
  {
    slug: "marketing-nha-khoa-tphcm",
    keywordsMain: "marketing nha khoa tphcm",
    h1: "Marketing Nha Khoa TPHCM — Thu Khách Đặt Lịch",
    angle: "marketing phòng khám nha khoa tại TP.HCM",
    niche: "strategy",
  },
  {
    slug: "marketing-tham-my-vien",
    keywordsMain: "marketing thẩm mỹ viện",
    h1: "Marketing Thẩm Mỹ Viện — Ads, Content Và Uy Tín",
    angle: "marketing ngành thẩm mỹ tăng tin tưởng và lead",
    niche: "strategy",
  },
  {
    slug: "marketing-bat-dong-san-tphcm",
    keywordsMain: "marketing bất động sản tphcm",
    h1: "Marketing Bất Động Sản TPHCM — Lead Chất Lượng",
    angle: "marketing BĐS dự án và môi giới tại Sài Gòn",
    niche: "strategy",
  },

  // Facebook × ngành
  {
    slug: "quang-cao-facebook-khach-san",
    keywordsMain: "quảng cáo facebook khách sạn",
    h1: "Quảng Cáo Facebook Cho Khách Sạn — Đặt Phòng Và Upsell",
    angle: "Facebook Ads ngành hospitality thu booking",
    niche: "facebook-ads",
  },
  {
    slug: "quang-cao-facebook-tham-my-vien",
    keywordsMain: "quảng cáo facebook thẩm mỹ viện",
    h1: "Quảng Cáo Facebook Thẩm Mỹ Viện — Lead Đúng Đối Tượng",
    angle: "ads Facebook ngành làm đẹp tuân thủ policy Meta",
    niche: "facebook-ads",
  },
  {
    slug: "quang-cao-facebook-gym",
    keywordsMain: "quảng cáo facebook gym",
    h1: "Quảng Cáo Facebook Cho Gym — Tăng Hội Viên",
    angle: "Facebook Ads phòng gym fitness thu lead đăng ký",
    niche: "facebook-ads",
  },

  // So sánh
  {
    slug: "website-hay-fanpage",
    keywordsMain: "website hay fanpage",
    h1: "Website Hay Fanpage — Nên Đầu Tư Kênh Nào Trước?",
    angle: "so sánh website và fanpage cho doanh nghiệp nhỏ",
    niche: "strategy",
  },
  {
    slug: "google-ads-hay-facebook-ads",
    keywordsMain: "google ads hay facebook ads",
    h1: "Google Ads Hay Facebook Ads — Chọn Kênh Phù Hợp",
    angle: "so sánh quảng cáo Google và Meta theo ngành và ngân sách",
    niche: "google-ads",
  },
  {
    slug: "seo-hay-google-ads",
    keywordsMain: "SEO hay Google Ads",
    h1: "SEO Hay Google Ads — Khi Nào Dùng Organic Vs Paid",
    angle: "phối hợp SEO và Google Ads tối ưu chi phí acquisition",
    niche: "seo",
  },

  // Pain point
  {
    slug: "fanpage-khong-co-khach",
    keywordsMain: "fanpage không có khách",
    h1: "Fanpage Không Có Khách — Nguyên Nhân Và Cách Khắc Phục",
    angle: "xử lý fanpage có reach nhưng không ra đơn hoặc lead",
    niche: "facebook-ads",
  },

  // Batch 2 — địa phương & ngành bổ sung
  {
    slug: "thiet-ke-website-nha-trang",
    keywordsMain: "thiết kế website Nha Trang",
    h1: "Thiết Kế Website Nha Trang Chuẩn SEO Du Lịch & Dịch Vụ",
    angle: "website cho doanh nghiệp du lịch và dịch vụ tại Nha Trang",
    niche: "strategy",
  },
  {
    slug: "seo-local-hai-phong",
    keywordsMain: "SEO local Hải Phòng",
    h1: "SEO Local Hải Phòng — Tối Ưu Google Maps Miền Bắc",
    angle: "Local SEO cho cửa hàng và doanh nghiệp tại Hải Phòng",
    niche: "seo",
  },
  {
    slug: "seo-local-nha-trang",
    keywordsMain: "SEO local Nha Trang",
    h1: "SEO Local Nha Trang — Thu Khách Du Lịch & Địa Phương",
    angle: "SEO Maps cho spa, nhà hàng, khách sạn tại Nha Trang",
    niche: "seo",
  },
  {
    slug: "thiet-ke-website-khach-san-chuyen-nghiep",
    keywordsMain: "thiết kế website khách sạn",
    h1: "Thiết Kế Website Khách Sạn Chuyên Nghiệp — Đặt Phòng Online",
    angle: "website hospitality booking và SEO ngành khách sạn",
    niche: "strategy",
  },
  {
    slug: "thiet-ke-website-phong-gym-chuyen-nghiep",
    keywordsMain: "thiết kế website phòng gym",
    h1: "Thiết Kế Website Phòng Gym Chuyên Nghiệp Thu Hội Viên",
    angle: "website fitness gym đăng ký lớp và gói tập",
    niche: "strategy",
  },
];

const slugs = LONGTAIL_GAP_ENTRIES.map((e) => e.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error("LONGTAIL_GAP_ENTRIES có slug trùng trong batch");
}
