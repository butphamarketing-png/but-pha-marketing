/**
 * 100 từ khóa khách hàng hay tìm — map slug duy nhất (không trùng trong batch).
 * Slug có sẵn trên DB → viết lại nội dung dài; slug mới → tạo bài mới.
 */
export const CUSTOMER_KEYWORDS_100 = [
  // Tổng quan / Agency (1–10)
  { slug: "dich-vu-marketing", keywordsMain: "dịch vụ marketing", h1: "Dịch Vụ Marketing Trọn Gói Cho Doanh Nghiệp", angle: "triển khai marketing đa kênh có đo lường KPI", niche: "strategy" },
  { slug: "agency-marketing-viet-nam", keywordsMain: "agency marketing việt nam", h1: "Agency Marketing Việt Nam Uy Tín — Cách Chọn Đối Tác", angle: "tiêu chí chọn agency marketing phù hợp quy mô doanh nghiệp", niche: "strategy" },
  { slug: "cong-ty-marketing-uy-tin", keywordsMain: "công ty marketing uy tín", h1: "Công Ty Marketing Uy Tín — Checklist Đánh Giá", angle: "dấu hiệu đơn vị marketing đáng tin cậy tại Việt Nam", niche: "strategy" },
  { slug: "tu-van-marketing-doanh-nghiep", keywordsMain: "tư vấn marketing doanh nghiệp", h1: "Tư Vấn Marketing Doanh Nghiệp — Lộ Trình Tăng Trưởng", angle: "tư vấn chiến lược marketing theo giai đoạn phát triển", niche: "strategy" },
  { slug: "giai-phap-marketing-tong-the", keywordsMain: "giải pháp marketing tổng thể", h1: "Giải Pháp Marketing Tổng Thể Website — Facebook — Maps", angle: "phối hợp đa kênh thay vì làm rời rạc", niche: "strategy" },
  { slug: "marketing-tang-doanh-thu", keywordsMain: "marketing tăng doanh thu", h1: "Marketing Tăng Doanh Thu — Chiến Lược Thực Chiến", angle: "kết nối marketing với doanh số và ROI đo được", niche: "analytics" },
  { slug: "chien-luoc-marketing-hieu-qua", keywordsMain: "chiến lược marketing hiệu quả", h1: "Chiến Lược Marketing Hiệu Quả Cho SME", angle: "lập kế hoạch marketing 6–12 tháng có KPI rõ", niche: "strategy" },
  { slug: "bao-gia-dich-vu-marketing", keywordsMain: "báo giá dịch vụ marketing", h1: "Báo Giá Dịch Vụ Marketing — Yếu Tố Ảnh Hưởng Giá", angle: "minh bạch chi phí marketing theo gói và scope", niche: "strategy" },
  { slug: "thue-team-marketing", keywordsMain: "thuê team marketing", h1: "Thuê Team Marketing Outsourcing — Lợi Ích Và Rủi Ro", angle: "so sánh in-house và thuê ngoài team marketing", niche: "strategy" },
  { slug: "marketing-cho-doanh-nghiep-nho", keywordsMain: "marketing cho doanh nghiệp nhỏ", h1: "Marketing Cho Doanh Nghiệp Nhỏ — Gói Phù Hợp Ngân Sách", angle: "chiến lược marketing tiết kiệm cho SME và shop nhỏ", niche: "strategy" },

  // Website (11–30)
  { slug: "thiet-ke-website", keywordsMain: "thiết kế website", h1: "Thiết Kế Website Chuyên Nghiệp Chuẩn SEO — Báo Giá & Quy Trình 2026", angle: "xây website làm nền tảng marketing trung tâm", niche: "strategy" },
  { slug: "chuyen-nghiep-gia-tot", keywordsMain: "thiết kế website chuyên nghiệp", h1: "Thiết Kế Website Chuyên Nghiệp Giá Tốt Cho SME", angle: "website chuyên nghiệp với ngân sách hợp lý", niche: "strategy" },
  { slug: "gia-re-uy-tin", keywordsMain: "thiết kế website giá rẻ", h1: "Thiết Kế Website Giá Rẻ Uy Tín Không Phát Sinh", angle: "cân bằng chi phí thấp và chất lượng bền vững", niche: "strategy" },
  { slug: "thiet-ke-website-doanh-nghiep", keywordsMain: "làm website cho doanh nghiệp", h1: "Làm Website Cho Doanh Nghiệp — Quy Trình & Báo Giá", angle: "website corporate phục vụ uy tín và thu lead", niche: "strategy" },
  { slug: "thiet-ke-website-chuan-seo", keywordsMain: "thiết kế website chuẩn SEO", h1: "Thiết Kế Website Chuẩn SEO Giúp Tăng Thứ Hạng Google", angle: "SEO on-page và kỹ thuật ngay từ khâu thiết kế", niche: "seo" },
  { slug: "landing-page-la-gi", keywordsMain: "thiết kế landing page", h1: "Landing Page Là Gì? Cách Thiết Kế Trang Đích Chuyển Đổi Cao", angle: "landing page tối ưu cho quảng cáo và lead", niche: "content" },
  { slug: "thiet-ke-website-ban-hang", keywordsMain: "làm website bán hàng", h1: "Làm Website Bán Hàng Tăng Tỷ Lệ Chuyển Đổi", angle: "website bán hàng online chuẩn UX và checkout", niche: "strategy" },
  { slug: "thiet-ke-website-spa", keywordsMain: "thiết kế website spa", h1: "Thiết Kế Website Spa Chuyên Nghiệp Chuẩn SEO", angle: "website spa thu lead đặt lịch và SEO local", niche: "strategy" },
  { slug: "thiet-ke-website-nha-khoa", keywordsMain: "thiết kế website nha khoa", h1: "Thiết Kế Website Nha Khoa Hiện Đại Thu Hút Khách Hàng", angle: "website nha khoa tăng tin tưởng và đặt lịch", niche: "strategy" },
  { slug: "thiet-ke-website-cong-ty-xay-dung", keywordsMain: "thiết kế website xây dựng", h1: "Thiết Kế Website Công Ty Xây Dựng Chuyên Nghiệp", angle: "website nhà thầu showcase dự án và hồ s năng lực", niche: "strategy" },
  { slug: "thiet-ke-website-nha-hang", keywordsMain: "thiết kế website nhà hàng", h1: "Thiết Kế Website Nhà Hàng Chuyên Nghiệp", angle: "website F&B kết hợp menu, đặt bàn và Maps", niche: "strategy" },
  { slug: "bao-tri-website", keywordsMain: "bảo trì website", h1: "Bảo Trì Website Định Kỳ — Checklist Doanh Nghiệp", angle: "bảo trì kỹ thuật, bảo mật và cập nhật nội dung", niche: "strategy" },
  { slug: "cham-soc-website", keywordsMain: "chăm sóc website", h1: "Chăm Sóc Website Hàng Tháng — Gói Dịch Vụ", angle: "cập nhật nội dung, SEO và theo dõi hiệu suất website", niche: "seo" },
  { slug: "van-hanh-website", keywordsMain: "vận hành website", h1: "Vận Hành Website Doanh Nghiệp — Quy Trình Chuẩn", angle: "vận hành hosting, backup, monitoring và content", niche: "strategy" },
  { slug: "thiet-ke-website-toc-do-cao", keywordsMain: "tối ưu tốc độ website", h1: "Tối Ưu Tốc Độ Website — Core Web Vitals Xanh", angle: "tăng tốc website cải thiện SEO và chuyển đổi", niche: "seo" },
  { slug: "domain-la-gi", keywordsMain: "mua tên miền website", h1: "Domain Là Gì? Cách Chọn Tên Miền Chuẩn SEO Cho Website", angle: "chọn và đăng ký domain phù hợp thương hiệu", niche: "content" },
  { slug: "dang-ky-domain-gia-re", keywordsMain: "đăng ký domain giá rẻ", h1: "Đăng Ký Domain Giá Rẻ — Lưu Ý Bảo Mật Và SEO", angle: "đăng ký tên miền tiết kiệm nhưng không rủi ro", niche: "content" },
  { slug: "hosting-la-gi", keywordsMain: "hosting website việt nam", h1: "Hosting Là Gì? Các Loại Hosting Và Cách Chọn Cho Website", angle: "chọn hosting Việt Nam phù hợp tốc độ và bảo mật", niche: "content" },
  { slug: "quang-cao-website", keywordsMain: "quảng cáo website", h1: "Quảng Cáo Website — Google Ads Và Remarketing Hiệu Quả", angle: "đưa traffic về website và tối ưu chuyển đổi", niche: "google-ads" },
  { slug: "remarketing-la-gi", keywordsMain: "remarketing website", h1: "Remarketing Là Gì? Cách Tiếp Cận Lại Khách Đã Vào Website", angle: "remarketing Google và Meta từ dữ liệu website", niche: "analytics" },

  // SEO Website (31–40)
  { slug: "thiet-ke-website-dich-vu-seo", keywordsMain: "dịch vụ SEO website", h1: "Dịch Vụ SEO Website Chuyên Nghiệp — Quy Trình & Báo Giá", angle: "gói SEO website on-page, content và kỹ thuật", niche: "seo" },
  { slug: "seo-la-gi", keywordsMain: "SEO website lên top Google", h1: "SEO Là Gì? Cách Tối Ưu Website Lên Top Google", angle: "lộ trình SEO website bền vững lên top Google", niche: "seo" },
  { slug: "seo-on-page-la-gi", keywordsMain: "tối ưu SEO onpage", h1: "SEO On Page Là Gì? Checklist Tối Ưu On-Page Chuẩn Google", angle: "checklist SEO on-page từng trang website", niche: "seo" },
  { slug: "seo-cho-doanh-nghiep", keywordsMain: "SEO cho doanh nghiệp", h1: "SEO Cho Doanh Nghiệp — Chiến Lược Tăng Trưởng Organic", angle: "SEO phù hợp mô hình B2B và B2C Việt Nam", niche: "seo" },
  { slug: "seo-local-la-gi", keywordsMain: "SEO local việt nam", h1: "SEO Local Là Gì? Hướng Dẫn SEO Địa Phương Cho Doanh Nghiệp", angle: "SEO local giúp khách gần bạn tìm thấy trên Google", niche: "seo" },
  { slug: "audit-seo-website", keywordsMain: "audit SEO website", h1: "Audit SEO Website — Checklist Đánh Giá Toàn Diện", angle: "phát hiện lỗi SEO kỹ thuật và cơ hội xếp hạng", niche: "seo" },
  { slug: "tu-van-seo-mien-phi", keywordsMain: "tư vấn SEO miễn phí", h1: "Tư Vấn SEO Miễn Phí — Nhận Lộ Trình Tối Ưu Website", angle: "tư vấn SEO ban đầu giúp ưu tiên việc cần làm trước", niche: "seo" },
  { slug: "chi-phi-seo-website", keywordsMain: "chi phí SEO website", h1: "Chi Phí SEO Website — Bảng Giá Và Yếu Tố Ảnh Hưởng", angle: "minh bạch chi phí SEO theo gói và ngành", niche: "seo" },
  { slug: "seo-website-ban-hang", keywordsMain: "SEO website bán hàng", h1: "SEO Website Bán Hàng — Tăng Đơn Organic", angle: "SEO cho trang sản phẩm và danh mục ecommerce", niche: "seo" },
  { slug: "viet-content-chuan-seo", keywordsMain: "viết content chuẩn SEO", h1: "Viết Content Chuẩn SEO — Quy Trình & Checklist", angle: "viết bài SEO đúng intent và chuyển đổi", niche: "content" },

  // Facebook / Fanpage (41–60)
  { slug: "thiet-ke-fanpage-facebook", keywordsMain: "thiết kế fanpage facebook", h1: "Thiết Kế Fanpage Facebook Chuyên Nghiệp", angle: "cover, avatar và layout fanpage chuẩn thương hiệu", niche: "social" },
  { slug: "thiet-ke-cover-fanpage", keywordsMain: "thiết kế cover fanpage", h1: "Thiết Kế Cover Fanpage — Kích Thước Và Ý Tưởng 2026", angle: "cover fanpage thu hút và truyền tải USP", niche: "social" },
  { slug: "lam-fanpage-chuyen-nghiep", keywordsMain: "làm fanpage chuyên nghiệp", h1: "Làm Fanpage Chuyên Nghiệp — Quy Trình Setup A-Z", angle: "setup fanpage đầy đủ tab, CTA và tracking", niche: "social" },
  { slug: "quan-tri-fanpage", keywordsMain: "quản trị fanpage", h1: "Quản Trị Fanpage — Vai Trò Và KPI Cần Theo Dõi", angle: "quản trị fanpage bài bản cho doanh nghiệp", niche: "social" },
  { slug: "cham-soc-fanpage", keywordsMain: "chăm sóc fanpage", h1: "Chăm Sóc Fanpage Hàng Tháng — Gói Dịch Vụ", angle: "đăng bài, trả lời inbox và báo cáo fanpage", niche: "social" },
  { slug: "viet-content-fanpage", keywordsMain: "viết content fanpage", h1: "Viết Content Fanpage — Lịch Đăng Và Format Hiệu Quả", angle: "nội dung fanpage cân bằng giá trị và bán hàng", niche: "content" },
  { slug: "quang-cao-facebook", keywordsMain: "chạy quảng cáo facebook", h1: "Chạy Quảng Cáo Facebook — Hướng Dẫn Cho Người Mới", angle: "setup chiến dịch Facebook Ads từ A-Z", niche: "facebook-ads" },
  { slug: "quang-cao-facebook-hieu-qua", keywordsMain: "quảng cáo facebook hiệu quả", h1: "Quảng Cáo Facebook Hiệu Quả — Tối Ưu CPA Và ROAS", angle: "tối ưu quảng cáo Facebook giảm chi phí tăng lead", niche: "facebook-ads" },
  { slug: "dich-vu-facebook-ads", keywordsMain: "dịch vụ facebook ads", h1: "Dịch Vụ Facebook Ads Trọn Gói Cho Doanh Nghiệp", angle: "agency chạy và tối ưu Facebook Ads", niche: "facebook-ads" },
  { slug: "thue-chay-ads-facebook", keywordsMain: "thuê chạy ads facebook", h1: "Thuê Chạy Ads Facebook — Tiêu Chí Chọn Đối Tác", angle: "thuê ngoài vận hành quảng cáo Meta", niche: "facebook-ads" },
  { slug: "toi-uu-quang-cao-facebook", keywordsMain: "tối ưu quảng cáo facebook", h1: "Tối Ưu Quảng Cáo Facebook — Checklist A/B Test", angle: "tối ưu audience, creative và landing page", niche: "facebook-ads" },
  { slug: "pixel-facebook-la-gi", keywordsMain: "setup pixel facebook", h1: "Pixel Facebook Là Gì? Cài Đặt Meta Pixel Đo Lường Quảng Cáo", angle: "cài Meta Pixel và conversion API chuẩn", niche: "facebook-ads" },
  { slug: "quang-cao-facebook-ban-hang", keywordsMain: "quảng cáo facebook bán hàng", h1: "Quảng Cáo Facebook Bán Hàng — Funnel Và Creative", angle: "ads Facebook tối ưu chốt đơn online", niche: "facebook-ads" },
  { slug: "quang-cao-facebook-spa", keywordsMain: "quảng cáo facebook spa", h1: "Quảng Cáo Facebook Cho Spa — Target Và Nội Dung", angle: "Facebook Ads ngành spa làm đẹp", niche: "facebook-ads" },
  { slug: "quang-cao-facebook-nha-hang", keywordsMain: "quảng cáo facebook nhà hàng", h1: "Quảng Cáo Facebook Cho Nhà Hàng — Thu Khách F&B", angle: "quảng cáo Facebook cho quán ăn và nhà hàng", niche: "facebook-ads" },
  { slug: "tang-tuong-tac-fanpage", keywordsMain: "tăng tương tác fanpage", h1: "Tăng Tương Tác Fanpage — 10 Cách Organic Và Ads", angle: "tăng comment, share và reach fanpage", niche: "social" },
  { slug: "tang-like-fanpage", keywordsMain: "tăng like fanpage", h1: "Tăng Like Fanpage — Organic Vs Quảng Cáo", angle: "tăng follower fanpage chất lượng không ảo", niche: "social" },
  { slug: "xay-dung-thuong-hieu-facebook", keywordsMain: "xây dựng thương hiệu facebook", h1: "Xây Dựng Thương Hiệu Trên Facebook", angle: "branding và content xây thương hiệu trên Meta", niche: "branding" },
  { slug: "audit-fanpage-mien-phi", keywordsMain: "audit fanpage miễn phí", h1: "Audit Fanpage Miễn Phí — Checklist Đánh Giá", angle: "đánh giá fanpage và đề xuất cải thiện", niche: "social" },
  { slug: "bao-gia-quang-cao-facebook", keywordsMain: "báo giá quảng cáo facebook", h1: "Báo Giá Quảng Cáo Facebook — Phí Agency Và Ngân Sách Ads", angle: "minh bạch chi phí chạy và quản lý Facebook Ads", niche: "facebook-ads" },

  // Google Maps / Local (61–75)
  { slug: "seo-google-maps-la-gi", keywordsMain: "SEO Google Maps", h1: "SEO Google Maps Là Gì? Cách Tối Ưu Hiển Thị Trên Bản Đồ Google", angle: "tối ưu xếp hạng trên Google Maps và Local Pack", niche: "seo" },
  { slug: "toi-uu-google-maps-doanh-nghiep", keywordsMain: "tối ưu Google Maps doanh nghiệp", h1: "Tối Ưu Google Maps Doanh Nghiệp — Checklist 2026", angle: "tối ưu hồ sơ Maps cho cửa hàng và dịch vụ", niche: "seo" },
  { slug: "thiet-ke-google-maps", keywordsMain: "thiết kế Google Maps", h1: "Thiết Kế Google Maps Doanh Nghiệp — Hồ Sơ Chuẩn SEO", angle: "thiết kế và hoàn thiện Google Business Profile", niche: "seo" },
  { slug: "quang-cao-google-maps-la-gi", keywordsMain: "quảng cáo Google Maps", h1: "Quảng Cáo Google Maps Là Gì? Local Ads Và Local Services Ads", angle: "quảng cáo trên Maps tiếp cận khách gần bạn", niche: "google-ads" },
  { slug: "cach-dua-doanh-nghiep-len-google-maps", keywordsMain: "đưa doanh nghiệp lên Google Maps", h1: "Cách Đưa Doanh Nghiệp Lên Google Maps Hiệu Quả Nhất", angle: "hướng dẫn đăng ký và xác minh Maps", niche: "seo" },
  { slug: "google-business-profile-la-gi", keywordsMain: "xác minh Google Business Profile", h1: "Google Business Profile Là Gì? Tối Ưu Maps Và Local SEO", angle: "xác minh và quản lý Google Business Profile", niche: "seo" },
  { slug: "toi-uu-google-business-profile", keywordsMain: "tối ưu Google Business Profile", h1: "Tối Ưu Google Business Profile — Hướng Dẫn SEO Maps Chi Tiết", angle: "tối ưu GBP tăng hiển thị Local Pack", niche: "seo" },
  { slug: "danh-gia-google-maps-la-gi", keywordsMain: "tăng đánh giá Google Maps", h1: "Đánh Giá Google Maps Là Gì? Cách Tăng Review Chuẩn SEO Local", angle: "tăng review Google Maps hợp lệ và uy tín", niche: "seo" },
  { slug: "seo-dia-phuong-la-gi", keywordsMain: "SEO địa phương", h1: "SEO Địa Phương Là Gì? Cách Làm SEO Theo Tỉnh Thành Và Quận", angle: "SEO theo khu vực địa lý và intent local", niche: "seo" },
  { slug: "local-seo-viet-nam", keywordsMain: "local SEO việt nam", h1: "Local SEO Việt Nam — Chiến Lược Google Maps Toàn Quốc", angle: "local SEO phù hợp thị trường Việt Nam", niche: "seo" },
  { slug: "marketing-cua-hang-dia-phuong", keywordsMain: "marketing cửa hàng địa phương", h1: "Marketing Cửa Hàng Địa Phương — Maps, Ads Và Social", angle: "marketing cho shop có địa chỉ cố định", niche: "strategy" },
  { slug: "quang-cao-cua-hang-tren-google", keywordsMain: "quảng cáo cửa hàng trên Google", h1: "Quảng Cáo Cửa Hàng Trên Google — Search Và Maps", angle: "Google Ads kết hợp Local cho cửa hàng", niche: "google-ads" },
  { slug: "tang-khach-ghe-cua-hang", keywordsMain: "tăng khách ghé cửa hàng", h1: "Tăng Khách Ghé Cửa Hàng — Chiến Lược Offline + Online", angle: "kéo foot traffic từ Maps, ads và social", niche: "strategy" },
  { slug: "hien-thi-tren-ban-do-google", keywordsMain: "hiển thị trên bản đồ Google", h1: "Hiển Thị Trên Bản Đồ Google — Yếu Tố Xếp Hạng Local", angle: "xuất hiện trên Google Maps khi khách tìm kiếm", niche: "seo" },
  { slug: "seo-local-cho-spa", keywordsMain: "dịch vụ Google Maps cho spa", h1: "SEO Local Cho Spa — Tối Ưu Google Maps Ngành Làm Đẹp", angle: "Google Maps marketing chuyên ngành spa", niche: "seo" },

  // Pain point / ngành (76–90)
  { slug: "tang-khach-hang-online", keywordsMain: "tăng khách hàng online", h1: "Tăng Khách Hàng Online — 7 Kênh Marketing Hiệu Quả", angle: "kết hợp website, ads, SEO và social thu khách", niche: "strategy" },
  { slug: "tang-doanh-so-ban-hang-online", keywordsMain: "tăng doanh số bán hàng online", h1: "Tăng Doanh Số Bán Hàng Online — Funnel Và Tối Ưu", angle: "tăng doanh số ecommerce và bán hàng qua mạng", niche: "analytics" },
  { slug: "lam-sao-co-khach-tu-facebook", keywordsMain: "làm sao có khách từ facebook", h1: "Làm Sao Có Khách Từ Facebook — Organic Và Ads", angle: "biến Facebook thành kênh thu khách ổn định", niche: "facebook-ads" },
  { slug: "lam-sao-len-top-google", keywordsMain: "làm sao lên top Google", h1: "Làm Sao Lên Top Google — SEO Và Local Maps", angle: "lộ trình lên top Google Search và Maps", niche: "seo" },
  { slug: "website-khong-co-khach", keywordsMain: "website không có khách", h1: "Website Không Có Khách — Nguyên Nhân Và Cách Khắc Phục", angle: "chẩn đoán website không traffic và không lead", niche: "seo" },
  { slug: "fanpage-khong-co-tuong-tac", keywordsMain: "fanpage không có tương tác", h1: "Fanpage Không Có Tương Tác — Cách Cải Thiện Nhanh", angle: "xử lý fanpage reach thấp và tương tác kém", niche: "social" },
  { slug: "quang-cao-ton-tien-khong-hieu-qua", keywordsMain: "quảng cáo tốn tiền không hiệu quả", h1: "Quảng Cáo Tốn Tiền Không Hiệu Quả — Checklist Audit", angle: "audit ads lãng phí ngân sách và cách sửa", niche: "analytics" },
  { slug: "cach-tim-khach-hang-moi", keywordsMain: "cách tìm khách hàng mới", h1: "Cách Tìm Khách Hàng Mới — Lead Gen Đa Kênh", angle: "chiến lược prospecting và thu lead mới", niche: "strategy" },
  { slug: "marketing-cho-shop-online", keywordsMain: "marketing cho shop online", h1: "Marketing Cho Shop Online — Sàn Và Website Riêng", angle: "marketing cho shop bán trên Shopee, TikTok Shop, web", niche: "strategy" },
  { slug: "marketing-cho-spa", keywordsMain: "marketing cho spa", h1: "Marketing Cho Spa — Maps, Facebook Và Website", angle: "marketing ngành spa làm đẹp tăng lịch hẹn", niche: "strategy" },
  { slug: "marketing-cho-nha-khoa", keywordsMain: "marketing cho nha khoa", h1: "Marketing Cho Nha Khoa — SEO Local Và Quảng Cáo", angle: "marketing phòng khám nha khoa thu bệnh nhân mới", niche: "strategy" },
  { slug: "marketing-cho-salon-toc", keywordsMain: "marketing cho salon tóc", h1: "Marketing Cho Salon Tóc — Google Maps Và Social", angle: "marketing salon tóc tăng lịch hẹn và walk-in", niche: "strategy" },
  { slug: "marketing-cho-quan-an", keywordsMain: "marketing cho quán ăn", h1: "Marketing Cho Quán Ăn — Maps, Food App Và Social", angle: "marketing F&B thu khách dine-in và delivery", niche: "strategy" },
  { slug: "marketing-cho-cua-hang-thoi-trang", keywordsMain: "marketing cho cửa hàng thời trang", h1: "Marketing Cho Cửa Hàng Thời Trang — Online Và Offline", angle: "marketing shop thời trang đa kênh", niche: "strategy" },
  { slug: "xay-dung-thuong-hieu-online", keywordsMain: "xây dựng thương hiệu online", h1: "Xây Dựng Thương Hiệu Online — Website Và Social", angle: "branding số đồng bộ website, fanpage và ads", niche: "branding" },

  // Ý định mua / địa phương (91–100)
  { slug: "thiet-ke-website-tphcm", keywordsMain: "thiết kế website TP.HCM", h1: "Thiết Kế Website TPHCM Uy Tín Chuẩn SEO", angle: "dịch vụ thiết kế website tại TP Hồ Chí Minh", niche: "strategy" },
  { slug: "agency-marketing-tphcm", keywordsMain: "agency marketing TP.HCM", h1: "Agency Marketing TP.HCM — Dịch Vụ Tại TP Hồ Chí Minh", angle: "agency marketing phục vụ doanh nghiệp TPHCM", niche: "strategy" },
  { slug: "chay-ads-facebook-tphcm", keywordsMain: "chạy ads facebook TP.HCM", h1: "Chạy Ads Facebook TP.HCM — Agency Meta Ads", angle: "dịch vụ chạy Facebook Ads tại TPHCM", niche: "facebook-ads" },
  { slug: "seo-local-tphcm", keywordsMain: "SEO Google Maps TP.HCM", h1: "SEO Local TPHCM — Chiến Lược Google Maps Tại TP Hồ Chí Minh", angle: "SEO Maps cho doanh nghiệp tại TPHCM", niche: "seo" },
  { slug: "tu-van-marketing-mien-phi", keywordsMain: "tư vấn marketing miễn phí", h1: "Tư Vấn Marketing Miễn Phí — Đặt Lịch Với Bứt Phá", angle: "buổi tư vấn marketing ban đầu không mất phí", niche: "strategy" },
  { slug: "dat-lich-tu-van-marketing", keywordsMain: "đặt lịch tư vấn marketing", h1: "Đặt Lịch Tư Vấn Marketing — Hẹn Chuyên Gia", angle: "đặt lịch hẹn tư vấn chiến lược marketing", niche: "strategy" },
  { slug: "bao-gia-thiet-ke-website", keywordsMain: "báo giá thiết kế website", h1: "Báo Giá Thiết Kế Website Và Những Yếu Tố Ảnh Hưởng", angle: "bảng giá và yếu tố ảnh hưởng chi phí website", niche: "strategy" },
  { slug: "bao-gia-cham-soc-fanpage", keywordsMain: "báo giá chăm sóc fanpage", h1: "Báo Giá Chăm Sóc Fanpage — Gói Content Hàng Tháng", angle: "minh bạch giá chăm sóc fanpage theo gói", niche: "social" },
  { slug: "goi-marketing-tron-goi", keywordsMain: "gói marketing trọn gói", h1: "Gói Marketing Trọn Gói — Website, Facebook, Maps", angle: "combo marketing đa kênh một đối tác", niche: "strategy" },
  { slug: "marketing-da-kenh-website-facebook-google-maps", keywordsMain: "marketing đa kênh website facebook google maps", h1: "Marketing Đa Kênh Website — Facebook — Google Maps", angle: "phối hợp ba trụ cột digital marketing phổ biến", niche: "strategy" },
];

if (CUSTOMER_KEYWORDS_100.length !== 100) {
  throw new Error(`CUSTOMER_KEYWORDS_100 phải có đúng 100 mục, hiện: ${CUSTOMER_KEYWORDS_100.length}`);
}

const slugSet = new Set(CUSTOMER_KEYWORDS_100.map((e) => e.slug));
if (slugSet.size !== CUSTOMER_KEYWORDS_100.length) {
  throw new Error("Phát hiện slug trùng trong CUSTOMER_KEYWORDS_100");
}
