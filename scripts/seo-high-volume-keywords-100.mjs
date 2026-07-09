/**
 * 100 từ khóa volume cao — head term + commercial intent (VN 2026).
 * Dùng với seed-high-volume-keywords-100.mjs
 */
function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function e(slug, keywordsMain, h1, angle, niche = "strategy") {
  return { slug, keywordsMain, h1, angle, niche };
}

export const HIGH_VOLUME_KEYWORDS_100 = [
  // Website head (1–20)
  e("thiet-ke-website", "thiết kế website", "Thiết Kế Website Chuyên Nghiệp Chuẩn SEO — Báo Giá & Quy Trình 2026", "xây website làm nền tảng marketing trung tâm"),
  e("lam-website", "làm website", "Làm Website Chuẩn SEO — Quy Trình, Giá Và Checklist 2026", "quy trình làm website từ A-Z cho doanh nghiệp Việt Nam"),
  e("gia-re-uy-tin", "thiết kế website giá rẻ", "Thiết Kế Website Giá Rẻ Uy Tín Không Phát Sinh", "cân bằng chi phí thấp và chất lượng bền vững"),
  e("bao-gia-thiet-ke-website", "báo giá thiết kế website", "Báo Giá Thiết Kế Website 2026 — Bảng Giá & Yếu Tố Ảnh Hưởng", "minh bạch chi phí website theo gói và scope"),
  e("gia-thiet-ke-website", "giá thiết kế website", "Giá Thiết Kế Website 2026 — Bảng Giá Và Yếu Tố Ảnh Hưởng", "bảng giá và yếu tố làm tăng giảm chi phí thiết kế website"),
  e("chuyen-nghiep-gia-tot", "thiết kế website chuyên nghiệp", "Thiết Kế Website Chuyên Nghiệp Giá Tốt Cho SME", "website chuyên nghiệp với ngân sách hợp lý"),
  e("thiet-ke-website-chuan-seo", "thiết kế website chuẩn SEO", "Thiết Kế Website Chuẩn SEO Giúp Tăng Thứ Hạng Google", "SEO on-page và kỹ thuật ngay từ khâu thiết kế", "seo"),
  e("thiet-ke-website-ban-hang", "làm website bán hàng", "Làm Website Bán Hàng Tăng Tỷ Lệ Chuyển Đổi", "website bán hàng online chuẩn UX và checkout"),
  e("thiet-ke-website-doanh-nghiep", "làm website cho doanh nghiệp", "Làm Website Cho Doanh Nghiệp — Quy Trình & Báo Giá", "website corporate phục vụ uy tín và thu lead"),
  e("thiet-ke-website-wordpress", "thiết kế website wordpress", "Thiết Kế Website WordPress Chuyên Nghiệp Chuẩn SEO", "WordPress cho SME cần CMS linh hoạt và SEO"),
  e("landing-page-la-gi", "thiết kế landing page", "Landing Page Là Gì? Cách Thiết Kế Trang Đích Chuyển Đổi Cao", "landing page tối ưu cho quảng cáo và lead", "content"),
  e("thiet-ke-website-tphcm", "thiết kế website TP.HCM", "Thiết Kế Website TPHCM Uy Tín Chuẩn SEO", "dịch vụ thiết kế website tại TP Hồ Chí Minh"),
  e("thiet-ke-website-ha-noi", "thiết kế website Hà Nội", "Thiết Kế Website Hà Nội Chuẩn SEO Cho Doanh Nghiệp", "dịch vụ thiết kế website tại Hà Nội"),
  e("thiet-ke-website-da-nang", "thiết kế website Đà Nẵng", "Thiết Kế Website Đà Nẵng Chuẩn SEO", "dịch vụ thiết kế website tại Đà Nẵng"),
  e("chi-phi-lam-website", "chi phí làm website", "Chi Phí Làm Website 2026 — Bảng Giá Và Yếu Tố Ảnh Hưởng", "minh bạch chi phí làm web cho SME"),
  e("website-gia-bao-nhieu", "website giá bao nhiêu", "Website Giá Bao Nhiêu? Bảng Giá Tham Khảo 2026", "giá website theo gói và tính năng"),
  e("thiet-ke-web", "thiết kế web", "Thiết Kế Web Chuyên Nghiệp Chuẩn SEO — Báo Giá 2026", "thiết kế web cho doanh nghiệp cần có mặt trên Google"),
  e("tao-website", "tạo website", "Tạo Website Doanh Nghiệp — Quy Trình Và Chi Phí 2026", "tạo website từ A-Z cho shop và công ty"),
  e("thiet-ke-website-responsive", "thiết kế website responsive", "Thiết Kế Website Responsive — Mobile-First Chuẩn SEO", "website hiển thị tốt mọi thiết bị"),
  e("thiet-ke-website-cong-ty", "thiết kế website công ty", "Thiết Kế Website Công Ty Chuyên Nghiệp Chuẩn SEO", "website corporate showcase uy tín và dịch vụ"),

  // SEO & Google (21–40)
  e("seo-la-gi", "SEO website lên top Google", "SEO Là Gì? Cách Tối Ưu Website Lên Top Google", "lộ trình SEO website bền vững lên top Google", "seo"),
  e("seo-website", "seo website", "SEO Website — Dịch Vụ & Hướng Dẫn Đưa Web Lên Top Google", "dịch vụ SEO website và checklist on-page", "seo"),
  e("dich-vu-seo", "dịch vụ seo", "Dịch Vụ SEO Chuyên Nghiệp — Quy Trình & Báo Giá 2026", "gói SEO on-page, content và kỹ thuật cho doanh nghiệp", "seo"),
  e("thiet-ke-website-dich-vu-seo", "dịch vụ SEO website", "Dịch Vụ SEO Website Chuyên Nghiệp — Quy Trình & Báo Giá", "gói SEO website on-page, content và kỹ thuật", "seo"),
  e("lam-sao-len-top-google", "làm sao lên top Google", "Làm Sao Lên Top Google — SEO Và Local Maps", "lộ trình lên top Google Search và Maps", "seo"),
  e("toi-uu-seo", "tối ưu seo", "Tối Ưu SEO Website — Checklist On-Page & Kỹ Thuật 2026", "tối ưu SEO giúp tăng traffic organic bền vững", "seo"),
  e("seo-on-page-la-gi", "tối ưu SEO onpage", "SEO On Page Là Gì? Checklist Tối Ưu On-Page Chuẩn Google", "checklist SEO on-page từng trang website", "seo"),
  e("seo-offpage", "seo offpage", "SEO Offpage Là Gì? Chiến Lược Backlink & Brand Signal", "xây authority ngoài website qua backlink và PR", "seo"),
  e("seo-google", "seo google", "SEO Google — Cách Đưa Website Lên Top Tìm Kiếm", "chiến lược SEO trên Google Search cho SME", "seo"),
  e("chi-phi-seo-website", "chi phí SEO website", "Chi Phí SEO Website — Bảng Giá Và Yếu Tố Ảnh Hưởng", "minh bạch chi phí SEO theo gói và ngành", "seo"),
  e("bao-gia-seo", "báo giá seo", "Báo Giá SEO 2026 — Gói Dịch Vụ Và Yếu Tố Ảnh Hưởng Giá", "bảng giá SEO minh bạch cho doanh nghiệp", "seo"),
  e("audit-seo-website", "audit SEO website", "Audit SEO Website — Checklist Đánh Giá Toàn Diện", "phát hiện lỗi SEO kỹ thuật và cơ hội xếp hạng", "seo"),
  e("tu-van-seo-mien-phi", "tư vấn SEO miễn phí", "Tư Vấn SEO Miễn Phí — Nhận Lộ Trình Tối Ưu Website", "tư vấn SEO ban đầu giúp ưu tiên việc cần làm trước", "seo"),
  e("seo-cho-doanh-nghiep", "SEO cho doanh nghiệp", "SEO Cho Doanh Nghiệp — Chiến Lược Tăng Trưởng Organic", "SEO phù hợp mô hình B2B và B2C Việt Nam", "seo"),
  e("viet-content-chuan-seo", "viết content chuẩn SEO", "Viết Content Chuẩn SEO — Quy Trình & Checklist", "viết bài SEO đúng intent và chuyển đổi", "content"),
  e("content-marketing", "content marketing", "Content Marketing Là Gì? Chiến Lược Nội Dung Thu Khách", "xây content pillar thu traffic và lead organic", "content"),
  e("backlink-la-gi", "backlink là gì", "Backlink Là Gì? Cách Xây Dựng Link Chuẩn SEO", "hiểu backlink và tránh spam link gây phạt Google", "seo"),
  e("tu-khoa-seo", "từ khóa seo", "Từ Khóa SEO — Cách Nghiên Cứu Keyword Cho Website", "nghiên cứu từ khóa đúng intent trước khi viết bài", "seo"),
  e("cong-cu-seo", "công cụ seo", "Công Cụ SEO Miễn Phí & Trả Phí — Gợi Ý Cho Doanh Nghiệp", "chọn công cụ SEO phù hợp quy mô và ngân sách", "seo"),
  e("toi-uu-seo-website", "tối ưu seo website", "Tối Ưu SEO Website — Hướng Dẫn On-Page & Kỹ Thuật", "checklist tối ưu SEO toàn diện cho website", "seo"),

  // Google Maps & Local (41–55)
  e("seo-google-maps-la-gi", "SEO Google Maps", "SEO Google Maps Là Gì? Cách Tối Ưu Hiển Thị Trên Bản Đồ Google", "tối ưu xếp hạng trên Google Maps và Local Pack", "seo"),
  e("toi-uu-google-maps-doanh-nghiep", "tối ưu Google Maps doanh nghiệp", "Tối Ưu Google Maps Doanh Nghiệp — Checklist 2026", "tối ưu hồ sơ Maps cho cửa hàng và dịch vụ", "seo"),
  e("cach-dua-doanh-nghiep-len-google-maps", "đưa doanh nghiệp lên Google Maps", "Cách Đưa Doanh Nghiệp Lên Google Maps Hiệu Quả Nhất", "hướng dẫn đăng ký và xác minh Maps", "seo"),
  e("google-business-profile-la-gi", "xác minh Google Business Profile", "Google Business Profile Là Gì? Tối Ưu Maps Và Local SEO", "xác minh và quản lý Google Business Profile", "seo"),
  e("toi-uu-google-business-profile", "tối ưu Google Business Profile", "Tối Ưu Google Business Profile — Hướng Dẫn SEO Maps Chi Tiết", "tối ưu GBP tăng hiển thị Local Pack", "seo"),
  e("danh-gia-google-maps-la-gi", "tăng đánh giá Google Maps", "Đánh Giá Google Maps Là Gì? Cách Tăng Review Chuẩn SEO Local", "tăng review Google Maps hợp lệ và uy tín", "seo"),
  e("seo-local-la-gi", "SEO local việt nam", "SEO Local Là Gì? Hướng Dẫn SEO Địa Phương Cho Doanh Nghiệp", "SEO local giúp khách gần bạn tìm thấy trên Google", "seo"),
  e("local-seo-viet-nam", "local SEO việt nam", "Local SEO Việt Nam — Chiến Lược Google Maps Toàn Quốc", "local SEO phù hợp thị trường Việt Nam", "seo"),
  e("seo-dia-phuong-la-gi", "SEO địa phương", "SEO Địa Phương Là Gì? Cách Làm SEO Theo Tỉnh Thành Và Quận", "SEO theo khu vực địa lý và intent local", "seo"),
  e("dang-ky-google-maps", "đăng ký google maps", "Đăng Ký Google Maps Cho Doanh Nghiệp — Hướng Dẫn A-Z", "đăng ký và xác minh doanh nghiệp trên Google Maps", "seo"),
  e("quang-cao-google-maps-la-gi", "quảng cáo Google Maps", "Quảng Cáo Google Maps Là Gì? Local Ads Và Local Services Ads", "quảng cáo trên Maps tiếp cận khách gần bạn", "google-ads"),
  e("hien-thi-tren-ban-do-google", "hiển thị trên bản đồ Google", "Hiển Thị Trên Bản Đồ Google — Yếu Tố Xếp Hạng Local", "xuất hiện trên Google Maps khi khách tìm kiếm", "seo"),
  e("marketing-cua-hang-dia-phuong", "marketing cửa hàng địa phương", "Marketing Cửa Hàng Địa Phương — Maps, Ads Và Social", "marketing cho shop có địa chỉ cố định"),
  e("tang-khach-ghe-cua-hang", "tăng khách ghé cửa hàng", "Tăng Khách Ghé Cửa Hàng — Chiến Lược Offline + Online", "kéo foot traffic từ Maps, ads và social"),
  e("seo-local-tphcm", "SEO Google Maps TP.HCM", "SEO Local TPHCM — Chiến Lược Google Maps Tại TP Hồ Chí Minh", "SEO Maps cho doanh nghiệp tại TPHCM", "seo"),

  // Facebook & Fanpage (56–75)
  e("quang-cao-facebook", "quảng cáo Facebook", "Quảng Cáo Facebook — Hướng Dẫn Chạy Ads Hiệu Quả 2026", "setup chiến dịch Facebook Ads từ A-Z", "facebook-ads"),
  e("facebook-ads", "facebook ads", "Facebook Ads Là Gì? Hướng Dẫn Chạy Quảng Cáo Meta 2026", "triển khai quảng cáo Facebook/Meta cho SME", "facebook-ads"),
  e("chay-ads-facebook-tphcm", "chạy ads facebook TP.HCM", "Chạy Ads Facebook TP.HCM — Agency Meta Ads", "dịch vụ chạy Facebook Ads tại TPHCM", "facebook-ads"),
  e("thue-chay-ads-facebook", "thuê chạy ads facebook", "Thuê Chạy Ads Facebook — Tiêu Chí Chọn Đối Tác", "thuê ngoài vận hành quảng cáo Meta", "facebook-ads"),
  e("dich-vu-facebook-ads", "dịch vụ facebook ads", "Dịch Vụ Facebook Ads Trọn Gói Cho Doanh Nghiệp", "agency chạy và tối ưu Facebook Ads", "facebook-ads"),
  e("quang-cao-facebook-hieu-qua", "quảng cáo facebook hiệu quả", "Quảng Cáo Facebook Hiệu Quả — Tối Ưu CPA Và ROAS", "tối ưu quảng cáo Facebook giảm chi phí tăng lead", "facebook-ads"),
  e("bao-gia-quang-cao-facebook", "báo giá quảng cáo facebook", "Báo Giá Quảng Cáo Facebook — Phí Agency Và Ngân Sách Ads", "minh bạch chi phí chạy và quản lý Facebook Ads", "facebook-ads"),
  e("toi-uu-quang-cao-facebook", "tối ưu quảng cáo facebook", "Tối Ưu Quảng Cáo Facebook — Checklist A/B Test", "tối ưu audience, creative và landing page", "facebook-ads"),
  e("thiet-ke-fanpage-facebook", "thiết kế fanpage", "Thiết Kế Fanpage Facebook Chuyên Nghiệp — Cover & Layout 2026", "cover, avatar và layout fanpage chuẩn thương hiệu", "social"),
  e("lam-fanpage-chuyen-nghiep", "làm fanpage chuyên nghiệp", "Làm Fanpage Chuyên Nghiệp — Quy Trình Setup A-Z", "setup fanpage đầy đủ tab, CTA và tracking", "social"),
  e("quan-tri-fanpage", "quản trị fanpage", "Quản Trị Fanpage — Vai Trò Và KPI Cần Theo Dõi", "quản trị fanpage bài bản cho doanh nghiệp", "social"),
  e("cham-soc-fanpage", "chăm sóc fanpage", "Chăm Sóc Fanpage — Gói Content & Quản Trị Hàng Tháng", "đăng bài, trả lời inbox và báo cáo fanpage", "social"),
  e("pixel-facebook-la-gi", "setup pixel facebook", "Pixel Facebook Là Gì? Cài Đặt Meta Pixel Đo Lường Quảng Cáo", "cài Meta Pixel và conversion API chuẩn", "facebook-ads"),
  e("quang-cao-facebook-ban-hang", "quảng cáo facebook bán hàng", "Quảng Cáo Facebook Bán Hàng — Funnel Và Creative", "ads Facebook tối ưu chốt đơn online", "facebook-ads"),
  e("lam-sao-co-khach-tu-facebook", "làm sao có khách từ facebook", "Làm Sao Có Khách Từ Facebook — Organic Và Ads", "biến Facebook thành kênh thu khách ổn định", "facebook-ads"),
  e("tang-tuong-tac-fanpage", "tăng tương tác fanpage", "Tăng Tương Tác Fanpage — 10 Cách Organic Và Ads", "tăng comment, share và reach fanpage", "social"),
  e("tang-like-fanpage", "tăng like fanpage", "Tăng Like Fanpage — Organic Vs Quảng Cáo", "tăng follower fanpage chất lượng không ảo", "social"),
  e("xay-dung-thuong-hieu-facebook", "xây dựng thương hiệu facebook", "Xây Dựng Thương Hiệu Trên Facebook", "branding và content xây thương hiệu trên Meta", "branding"),
  e("fanpage-khong-co-tuong-tac", "fanpage không có tương tác", "Fanpage Không Có Tương Tác — Cách Cải Thiện Nhanh", "xử lý fanpage reach thấp và tương tác kém", "social"),
  e("bao-gia-cham-soc-fanpage", "báo giá chăm sóc fanpage", "Báo Giá Chăm Sóc Fanpage — Gói Content Hàng Tháng", "minh bạch giá chăm sóc fanpage theo gói", "social"),

  // Google Ads (76–85)
  e("google-ads", "google ads", "Google Ads Là Gì? Hướng Dẫn Quảng Cáo Google Cho Doanh Nghiệp", "triển khai Google Search và Display Ads", "google-ads"),
  e("quang-cao-google", "quảng cáo google", "Quảng Cáo Google — Google Ads Cho Doanh Nghiệp Việt Nam", "triển khai quảng cáo Google Search và Display hiệu quả", "google-ads"),
  e("chay-google-ads", "chạy google ads", "Chạy Google Ads — Quy Trình Setup Chiến Dịch 2026", "setup và tối ưu chiến dịch Google Ads cho SME", "google-ads"),
  e("dich-vu-google-ads", "dịch vụ google ads", "Dịch Vụ Google Ads Trọn Gói Cho Doanh Nghiệp", "agency chạy và tối ưu Google Ads", "google-ads"),
  e("thue-chay-google-ads", "thuê chạy google ads", "Thuê Chạy Google Ads — Tiêu Chí Chọn Đối Tác Uy Tín", "thuê ngoài vận hành quảng cáo Google", "google-ads"),
  e("bao-gia-google-ads", "báo giá google ads", "Báo Giá Google Ads — Phí Agency Và Ngân Sách Quảng Cáo", "minh bạch chi phí chạy Google Ads", "google-ads"),
  e("quang-cao-google-search", "quảng cáo google search", "Quảng Cáo Google Search — Chiến Lược Từ Khóa & Landing", "tối ưu Search Ads thu lead chất lượng", "google-ads"),
  e("remarketing-la-gi", "remarketing website", "Remarketing Là Gì? Cách Tiếp Cận Lại Khách Đã Vào Website", "remarketing Google và Meta từ dữ liệu website", "google-ads"),
  e("quang-cao-website", "quảng cáo website", "Quảng Cáo Website — Google Ads Và Remarketing Hiệu Quả", "đưa traffic về website và tối ưu chuyển đổi", "google-ads"),
  e("quang-cao-cua-hang-tren-google", "quảng cáo cửa hàng trên Google", "Quảng Cáo Cửa Hàng Trên Google — Search Và Maps", "Google Ads kết hợp Local cho cửa hàng", "google-ads"),

  // Marketing tổng & Agency (86–95)
  e("marketing-online", "marketing online", "Marketing Online Là Gì? Chiến Lược Digital Cho Doanh Nghiệp 2026", "tổng quan marketing online đa kênh cho SME"),
  e("digital-marketing", "digital marketing", "Digital Marketing Là Gì? Lộ Trình Triển Khai Cho SME Việt Nam", "chiến lược digital marketing từ nền tảng đến scale"),
  e("dich-vu-marketing", "dịch vụ marketing", "Dịch Vụ Marketing Trọn Gói Cho Doanh Nghiệp", "triển khai marketing đa kênh có đo lường KPI"),
  e("agency-marketing-tphcm", "agency marketing TP.HCM", "Agency Marketing TP.HCM — Dịch Vụ Tại TP Hồ Chí Minh", "agency marketing phục vụ doanh nghiệp TPHCM"),
  e("cong-ty-marketing-uy-tin", "công ty marketing uy tín", "Công Ty Marketing Uy Tín — Checklist Đánh Giá", "dấu hiệu đơn vị marketing đáng tin cậy tại Việt Nam"),
  e("tu-van-marketing-mien-phi", "tư vấn marketing", "Tư Vấn Marketing Miễn Phí — Đặt Lịch Với Bứt Phá", "buổi tư vấn marketing ban đầu không mất phí"),
  e("marketing-cho-doanh-nghiep-nho", "marketing cho doanh nghiệp nhỏ", "Marketing Cho Doanh Nghiệp Nhỏ — Gói Phù Hợp Ngân Sách", "chiến lược marketing tiết kiệm cho SME và shop nhỏ"),
  e("chien-luoc-marketing-hieu-qua", "chiến lược marketing hiệu quả", "Chiến Lược Marketing Hiệu Quả Cho SME", "lập kế hoạch marketing 6–12 tháng có KPI rõ"),
  e("goi-marketing-tron-goi", "gói marketing trọn gói", "Gói Marketing Trọn Gói — Website, Facebook, Maps", "combo marketing đa kênh một đối tác"),
  e("marketing-da-kenh-website-facebook-google-maps", "marketing đa kênh website facebook google maps", "Marketing Đa Kênh Website — Facebook — Google Maps", "phối hợp ba trụ cột digital marketing phổ biến"),

  // Ngành hot + xu hướng (96–100)
  e("thiet-ke-website-spa", "thiết kế website spa", "Thiết Kế Website Spa Chuyên Nghiệp Chuẩn SEO", "website spa thu lead đặt lịch và SEO local"),
  e("thiet-ke-website-nha-khoa", "thiết kế website nha khoa", "Thiết Kế Website Nha Khoa Hiện Đại Thu Hút Khách Hàng", "website nha khoa tăng tin tưởng và đặt lịch"),
  e("marketing-cho-spa", "marketing cho spa", "Marketing Cho Spa — Maps, Facebook Và Website", "marketing ngành spa làm đẹp tăng lịch hẹn"),
  e("quang-cao-tiktok", "quảng cáo tiktok", "Quảng Cáo TikTok — Hướng Dẫn Chạy Ads Cho Doanh Nghiệp 2026", "triển khai TikTok Ads thu khách trẻ và F&B", "facebook-ads"),
  e("ai-marketing", "ai marketing", "AI Marketing Là Gì? Ứng Dụng AI Trong Digital Marketing 2026", "dùng AI tối ưu content, ads và automation", "strategy"),
];

if (HIGH_VOLUME_KEYWORDS_100.length !== 100) {
  throw new Error(`HIGH_VOLUME_KEYWORDS_100 phải có đúng 100 mục, hiện: ${HIGH_VOLUME_KEYWORDS_100.length}`);
}

const slugSet = new Set(HIGH_VOLUME_KEYWORDS_100.map((x) => x.slug));
if (slugSet.size !== HIGH_VOLUME_KEYWORDS_100.length) {
  throw new Error("Phát hiện slug trùng trong HIGH_VOLUME_KEYWORDS_100");
}
