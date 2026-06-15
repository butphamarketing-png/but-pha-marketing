/** @typedef {{ slug: string, h1: string, keywordsMain: string, keywordsSecondary: string, definition: string, role: string, components: string[], applySteps: string[], faq: { q: string, a: string }[] }} LocalSeoEntry */

/** @type {LocalSeoEntry[]} */
export const LOCAL_SEO_ENTRIES = [
  {
    slug: "seo-local-la-gi",
    h1: "SEO Local Là Gì? Hướng Dẫn SEO Địa Phương Cho Doanh Nghiệp",
    keywordsMain: "seo local là gì",
    keywordsSecondary: "local seo, seo địa phương, seo google maps",
    definition:
      "SEO local (local SEO) là tập kỹ thuật giúp doanh nghiệp xuất hiện trên Google khi khách tìm dịch vụ theo khu vực — Maps, Local Pack và kết quả organic có địa danh.",
    role:
      "Mang khách có nhu cầu gần bạn: gọi điện, chỉ đường, đặt lịch — conversion cao hơn traffic từ khóa quốc gia chung chung.",
    components: [
      "Google Business Profile (GBP) tối ưu đầy đủ",
      "NAP nhất quán: Tên, Địa chỉ, SĐT",
      "Review và phản hồi khách hàng",
      "Local citation trên danh bạ VN",
      "Trang website + schema LocalBusiness",
    ],
    applySteps: [
      "Claim và verify Google Business Profile",
      "Chuẩn hóa NAP trên website và danh bạ",
      "Thu thập review có nội dung thật",
      "Tạo trang dịch vụ + quận/thành phố",
      "Theo dõi GBP Insights và Search Console",
    ],
    faq: [
      { q: "SEO local mất bao lâu có kết quả?", a: "2–4 tháng với GBP tối ưu và review ổn định; cạnh tranh cao ở TP.HCM có thể 4–6 tháng." },
      { q: "Cần website không?", a: "Nên có — website tăng trust, nhận backlink local và hỗ trợ chuyển đổi sau khi khách thấy trên Maps." },
      { q: "SEO local khác SEO thường?", a: "Local tập trung Maps, NAP, review; SEO thường tập trung content và backlink quốc gia." },
    ],
  },
  {
    slug: "seo-google-maps-la-gi",
    h1: "SEO Google Maps Là Gì? Cách Tối Ưu Hiển Thị Trên Bản Đồ Google",
    keywordsMain: "seo google maps là gì",
    keywordsSecondary: "google maps seo, xếp hạng google maps, local pack",
    definition:
      "SEO Google Maps là tối ưu hồ sơ và tín hiệu liên quan để doanh nghiệp xuất hiện cao trên bản đồ Google và khối Local Pack (3 kết quả maps) khi người dùng tìm kiếm theo khu vực.",
    role:
      "Kênh lead trực tiếp từ mobile — khách bấm Gọi, Chỉ đường, Website ngay trên Maps mà không cần vào top 10 organic.",
    components: [
      "Relevance — danh mục và mô tả khớp từ khóa",
      "Distance — gần vị trí người tìm",
      "Prominence — review, link, độ nổi tiếng",
      "Ảnh, post, Q&A trên GBP",
      "Website liên kết và schema địa phương",
    ],
    applySteps: [
      "Chọn primary category chính xác trên GBP",
      "Nhồi từ khóa tự nhiên vào mô tả và dịch vụ",
      "Upload ảnh thật hàng tuần",
      "Nhắc khách review sau dịch vụ",
      "Đăng Google Post khuyến mãi/dự án",
    ],
    faq: [
      { q: "Lên top 3 Maps khó không?", a: "Tùy ngành và khu vực — spa, nha khoa TP.HCM cạnh tranh mạnh; ngách nhỏ dễ hơn." },
      { q: "Có mua review được không?", a: "Không — vi phạm chính sách Google, rủi ro khóa profile." },
      { q: "Maps có hiển thị trên desktop?", a: "Có — Local Pack xuất hiện cả desktop và mobile search." },
    ],
  },
  {
    slug: "google-maps-seo-la-gi",
    h1: "Google Maps SEO Là Gì? Yếu Tố Xếp Hạng Và Checklist 2026",
    keywordsMain: "google maps seo là gì",
    keywordsSecondary: "tối ưu google maps, ranking maps, seo bản đồ google",
    definition:
      "Google Maps SEO là cách tối ưu sự hiện diện trên Google Maps thông qua Business Profile, review, ảnh, bài đăng và tín hiệu địa phương nhất quán trên toàn web.",
    role:
      "Giúp doanh nghiệp vật lý và dịch vụ tại nhà (SAB) được tìm thấy đúng lúc khách cần gần nhất.",
    components: [
      "Business Profile hoàn chỉnh 100%",
      "Đánh giá sao và số lượng review",
      "Từ khóa trong tên doanh nghiệp (không spam)",
      "Giờ mở cửa và thuộc tính dịch vụ",
      "Liên kết từ báo chí/danh bạ địa phương",
    ],
    applySteps: [
      "Audit GBP: thiếu field nào bổ sung ngay",
      "So sánh profile đối thủ top 3 Maps",
      "Lập kế hoạch thu review 5–10/tháng",
      "Trả lời mọi review trong 24–48h",
      "Cập nhật giờ lễ, Tết tránh sai sót",
    ],
    faq: [
      { q: "Tên doanh nghiệp có cần chèn từ khóa?", a: "Tên thật + không nhồi keyword — spam tên dễ bị suspend." },
      { q: "Bao nhiêu sao là đủ?", a: "4.5+ với volume review tăng dần tốt hơn 5.0 ít review." },
      { q: "Maps SEO có cần ads?", a: "Không bắt buộc; Local Services Ads bổ sung thêm slot quảng cáo." },
    ],
  },
  {
    slug: "seo-maps-la-gi",
    h1: "SEO Maps Là Gì? Chiến Lược SEO Bản Đồ Cho Shop Và Cửa Hàng",
    keywordsMain: "seo maps là gì",
    keywordsSecondary: "seo bản đồ, maps marketing, local search",
    definition:
      "SEO Maps (SEO bản đồ) là thuật ngữ thực hành tối ưu thứ hạng trên Google Maps — gồm GBP, geo-signals và nội dung website nhắm từ khóa có yếu tố địa lý.",
    role:
      "Phù hợp F&B, spa, clinic, retail — ngành khách chọn theo khoảng cách và review trên Maps.",
    components: [
      "Vị trí GPS chính xác trên map pin",
      "Service area (nếu không hiện địa chỉ)",
      "Embed bản đồ trên website",
      "Landing page theo quận",
      "UTM tracking từ nút Website trên GBP",
    ],
    applySteps: [
      "Kiểm tra pin Maps đúng vị trí cửa hàng",
      "Thêm dịch vụ phụ và attributes GBP",
      "Tạo QR review in tại quầy",
      "Đồng bộ NAP lên Facebook, Zalo OA",
      "Đo call và direction trong Insights",
    ],
    faq: [
      { q: "SEO Maps cho online-only?", a: "Khó — cần địa chỉ hoặc SAB hợp lệ; pure ecom tập trung SEO web." },
      { q: "Nhiều chi nhánh xử lý sao?", a: "Mỗi chi nhánh một GBP riêng, NAP riêng, không trùng." },
      { q: "Pin sai có sửa được?", a: "Có — suggest edit hoặc support Google Business." },
    ],
  },
  {
    slug: "seo-dia-phuong-la-gi",
    h1: "SEO Địa Phương Là Gì? Cách Làm SEO Theo Tỉnh Thành Và Quận",
    keywordsMain: "seo địa phương là gì",
    keywordsSecondary: "seo theo khu vực, seo tỉnh thành, local intent",
    definition:
      "SEO địa phương là tối ưu website và Google Business để xếp hạng với từ khóa gắn địa danh — 'thiết kế website TP.HCM', 'spa quận 7' — và intent tìm dịch vụ gần người dùng.",
    role:
      "Giảm cạnh tranh so với từ khóa quốc gia; traffic ít hơn nhưng lead chất lượng và tỷ lệ chốt cao hơn.",
    components: [
      "Trang location / quận / tỉnh",
      "Title và H1 có địa phương tự nhiên",
      "Nội dung case study địa phương",
      "Backlink từ site/báo địa phương",
      "Hreflang không cần; dùng schema areaServed",
    ],
    applySteps: [
      "Liệt kê quận/thành phố mục tiêu",
      "Tạo landing unique mỗi khu vực (không copy)",
      "Gắn schema LocalBusiness + address",
      "Internal link từ blog về trang location",
      "Build citation trên danh bạ VN theo tỉnh",
    ],
    faq: [
      { q: "Mỗi quận một trang có bị phạt?", a: "Không nếu nội dung unique, có giá trị — tránh doorway pages." },
      { q: "Ưu tiên tỉnh nào trước?", a: "Nơi có cửa hàng/team phục vụ thật — Google ưu tiên relevance." },
      { q: "SEO địa phương cần bao nhiêu bài?", a: "1 pillar + 5–15 landing location tùy quy mô." },
    ],
  },
  {
    slug: "local-pack-la-gi",
    h1: "Local Pack Là Gì? Cách Xuất Hiện Top 3 Google Maps",
    keywordsMain: "local pack là gì",
    keywordsSecondary: "map pack, 3 pack google, local 3 pack seo",
    definition:
      "Local Pack (Map Pack) là khối 3 kết quả doanh nghiệp kèm bản đồ nhỏ trên SERP Google — thường xuất hiện khi query có intent địa phương hoặc 'gần tôi'.",
    role:
      "Chiếm CTR cao trên mobile — nhiều user không scroll xuống organic khi đã thấy 3 shop phù hợp.",
    components: [
      "3 slot: relevance + distance + prominence",
      "Sao review hiển thị ngay trên pack",
      "Nút Gọi, Chỉ đường, Website",
      "Ảnh cover và category",
      "Không trả phí để vào pack (organic local)",
    ],
    applySteps: [
      "Tối ưu GBP theo từ khóa pack mục tiêu",
      "Tăng review velocity đều đặn",
      "Đảm bảo mobile site nhanh (từ nút Website)",
      "Theo dõi rank grid theo quận",
      "So sánh đối thủ trong pack hàng tháng",
    ],
    faq: [
      { q: "Local Pack và organic khác gì?", a: "Pack lấy từ Maps/GBP; organic là kết quả website xanh." },
      { q: "Có tool đo rank Maps?", a: "Local Falcon, BrightLocal, hoặc grid search thủ công." },
      { q: "Ads có vào pack không?", a: "Có slot quảng cáo Local trên pack — khác organic pack." },
    ],
  },
  {
    slug: "nap-seo-la-gi",
    h1: "NAP SEO Là Gì? Chuẩn Hóa Tên Địa Chỉ SĐT Cho Local SEO",
    keywordsMain: "nap seo là gì",
    keywordsSecondary: "nap consistency, tên địa chỉ sđt, nap local seo",
    definition:
      "NAP SEO là thực hành giữ nhất quán bộ ba Name (tên doanh nghiệp), Address (địa chỉ), Phone (số điện thoại) trên website, Google Business, mạng xã hội và mọi danh bạ trực tuyến.",
    role:
      "Google dùng NAP để xác minh doanh nghiệp thật — sai lệch làm giảm trust và hạ hạng Maps.",
    components: [
      "Format địa chỉ thống nhất (viết tắt/quận)",
      "Một SĐT chính trên mọi nền tảng",
      "Tên thương hiệu không đổi",
      "Citation audit định kỳ",
      "Redirect khi đổi địa chỉ",
    ],
    applySteps: [
      "Ghi NAP chuẩn vào document nội bộ",
      "Rà soát Facebook, Zalo, Yelp VN, Hotfrog",
      "Sửa listing sai trên danh bạ",
      "Hiển thị NAP footer website + schema",
      "Kiểm tra lại sau mỗi đổi chi nhánh",
    ],
    faq: [
      { q: "SĐT 028 hay +84?", a: "Chọn một format dùng xuyên suốt — quan trọng là nhất quán." },
      { q: "Đổi địa chỉ SEO có mất hạng?", a: "Có thể tạm giảm — cập nhật GBP và citation nhanh, giữ SĐT." },
      { q: "NAP ẩn địa chỉ SAB?", a: "Vẫn cần NAP nội bộ nhất quán; hiển thị service area trên GBP." },
    ],
  },
  {
    slug: "local-citation-la-gi",
    h1: "Local Citation Là Gì? Xây Dựng Danh Bạ Trực Tuyến Chuẩn SEO",
    keywordsMain: "local citation là gì",
    keywordsSecondary: "citation seo, danh bạ doanh nghiệp, directory listing",
    definition:
      "Local citation là lần xuất hiện NAP doanh nghiệp trên website/danh bạ khác — Yelp, Foursquare, danh bạ VN, báo địa phương — kèm hoặc không kèm link về site.",
    role:
      "Tăng prominence và xác thực địa phương — nhiều citation chất lượng hỗ trợ xếp hạng Maps.",
    components: [
      "Structured citation — form danh bạ chuẩn",
      "Unstructured — mention trên báo/blog",
      "Industry directories ngành",
      "Chamber of commerce, hiệp hội",
      "Tránh spam directory kém chất lượng",
    ],
    applySteps: [
      "Liệt kê citation hiện có (Google search tên + SĐT)",
      "Đăng ký 20–50 danh bạ VN uy tín",
      "Đồng bộ NAP khi sửa thông tin",
      "Ưu tiên danh bạ có traffic thật",
      "Audit duplicate listing và merge",
    ],
    faq: [
      { q: "Cần bao nhiêu citation?", a: "Chất lượng > số lượng — 30–50 chuẩn NAP tốt hơn 500 spam." },
      { q: "Citation không link có ích?", a: "Có — Google vẫn đọc NAP mention." },
      { q: "Danh bạ VN phổ biến?", a: "Hotfrog, Cylex, Facebook, Apple Maps, Bing Places." },
    ],
  },
  {
    slug: "danh-gia-google-maps-la-gi",
    h1: "Đánh Giá Google Maps Là Gì? Cách Tăng Review Chuẩn SEO Local",
    keywordsMain: "đánh giá google maps là gì",
    keywordsSecondary: "review google maps, sao đánh giá google, google review seo",
    definition:
      "Đánh giá Google Maps là review sao và bình luận khách để lại trên Google Business Profile — một trong tín hiệu prominence mạnh nhất cho xếp hạng Local Pack.",
    role:
      "Ảnh hưởng CTR và trust — khách so sánh 4.8 sao 200 review vs 3.5 sao 10 review trước khi gọi.",
    components: [
      "Số lượng review theo thời gian",
      "Điểm trung bình sao",
      "Từ khóa trong review (tự nhiên)",
      "Phản hồi của chủ shop",
      "Review có ảnh/video",
    ],
    applySteps: [
      "Tạo link review ngắn từ GBP",
      "Gửi SMS/Zalo sau dịch vụ xong",
      "QR code tại quầy thanh toán",
      "Trả lời cảm ơn review tích cực",
      "Xử lý review tiêu cực chuyên nghiệp",
    ],
    faq: [
      { q: "Mua review có sao không?", a: "Vi phạm — Google xóa review fake và có thể phạt profile." },
      { q: "Review 1 sao có ảnh hưởng?", a: "Có — trả lời và cải thiện dịch vụ; đừng ignore." },
      { q: "Bao nhiêu review/tháng?", a: "5–15 review thật/tháng ổn định tốt hơn 50 review một lần." },
    ],
  },
  {
    slug: "toi-uu-google-business-profile",
    h1: "Tối Ưu Google Business Profile — Hướng Dẫn SEO Maps Chi Tiết",
    keywordsMain: "tối ưu google business profile",
    keywordsSecondary: "tối ưu gbp, google my business seo, hồ sơ google doanh nghiệp",
    definition:
      "Tối ưu Google Business Profile là hoàn thiện và cập nhật mọi trường trên hồ sơ GBP — category, mô tả, ảnh, dịch vụ, giờ, Q&A — để tăng relevance và conversion trên Maps.",
    role:
      "GBP là trung tâm SEO Maps — mọi tín hiệu local đều hội tụ về profile này.",
    components: [
      "Primary + secondary categories",
      "Business description 750 ký tự",
      "Products/Services list",
      "Photos & videos hàng tuần",
      "Google Posts và Offers",
    ],
    applySteps: [
      "Hoàn thành 100% checklist GBP",
      "Thêm secondary category phù hợp",
      "Viết mô tả có từ khóa + USP",
      "Upload 10+ ảnh chất lượng ban đầu",
      "Đăng post 1–2 lần/tuần",
    ],
    faq: [
      { q: "GBP và GMB khác gì?", a: "Cùng một thứ — Google đổi tên từ My Business sang Business Profile." },
      { q: "Đổi category có ảnh hưởng?", a: "Có — chọn sai category làm mất relevance." },
      { q: "Profile bị đình chỉ?", a: "Appeal qua support; thường do vi phạm guideline hoặc địa chỉ ảo." },
    ],
  },
  {
    slug: "dang-ky-google-maps-cho-doanh-nghiep",
    h1: "Đăng Ký Google Maps Cho Doanh Nghiệp — Hướng Dẫn Từng Bước",
    keywordsMain: "đăng ký google maps cho doanh nghiệp",
    keywordsSecondary: "tạo google business, thêm doanh nghiệp lên maps, đăng ký gbp",
    definition:
      "Đăng ký Google Maps cho doanh nghiệp là tạo và xác minh Google Business Profile tại business.google.com — bước đầu tiên để xuất hiện trên bản đồ và Local Pack.",
    role:
      "Miễn phí, bắt buộc với mọi shop có địa chỉ hoặc phục vụ tại nhà hợp lệ tại VN.",
    components: [
      "Tài khoản Google doanh nghiệp",
      "Tên và địa chỉ chính xác",
      "Xác minh postcard/SĐT/video",
      "Chọn category ngay từ đầu",
      "Liên kết website và SĐT",
    ],
    applySteps: [
      "Vào business.google.com → Add business",
      "Nhập NAP chính xác như biển hiệu",
      "Chọn xác minh phương thức phù hợp",
      "Chờ postcard 5–14 ngày (nếu chọn)",
      "Sau verify — tối ưu đầy đủ profile",
    ],
    faq: [
      { q: "Đăng ký mất phí không?", a: "Miễn phí — cảnh giác dịch vụ 'đăng ký hộ' đắt đỏ không cần thiết." },
      { q: "Không có văn phòng?", a: "Chọn service area business — ẩn địa chỉ, hiện khu vực phục vụ." },
      { q: "Trùng listing cũ?", a: "Claim listing có sẵn thay vì tạo duplicate." },
    ],
  },
  {
    slug: "cach-dua-doanh-nghiep-len-google-maps",
    h1: "Cách Đưa Doanh Nghiệp Lên Google Maps Hiệu Quả Nhất",
    keywordsMain: "cách đưa doanh nghiệp lên google maps",
    keywordsSecondary: "lên google maps, xuất hiện trên maps, google maps doanh nghiệp",
    definition:
      "Cách đưa doanh nghiệp lên Google Maps gồm tạo GBP, xác minh quyền sở hữu, tối ưu thông tin và duy trì review — không chỉ 'đăng ký xong' là hết.",
    role:
      "Nhiều shop chỉ verify rồi bỏ quên — đối thủ tối ưu liên tục sẽ vượt lên pack.",
    components: [
      "Verify thành công",
      "Ảnh storefront và logo",
      "Mô tả dịch vụ rõ ràng",
      "Review và Q&A",
      "Website link hoạt động",
    ],
    applySteps: [
      "Tạo/claim GBP và verify",
      "Điền 100% thông tin trong 48h đầu",
      "Mời 5–10 khách quen review đầu tiên",
      "Embed Maps trên website",
      "Theo dõi Insights hàng tuần",
    ],
    faq: [
      { q: "Bao lâu hiện trên Maps?", a: "Sau verify thường 1–3 ngày; pack cần thêm tối ưu 1–3 tháng." },
      { q: "Không thấy trên Maps?", a: "Kiểm tra verify, policy violation, hoặc category sai." },
      { q: "Cần thuê agency?", a: "Tự làm được; agency tiết kiệm thời gian nếu nhiều chi nhánh." },
    ],
  },
  {
    slug: "tang-hang-google-maps",
    h1: "Tăng Hạng Google Maps — 10 Cách Cải Thiện Thứ Hạng Local Pack",
    keywordsMain: "tăng hạng google maps",
    keywordsSecondary: "lên top google maps, cải thiện ranking maps, seo maps nâng cao",
    definition:
      "Tăng hạng Google Maps là tối ưu liên tục relevance, distance và prominence — không có nút bấm một lần mà là quy trình review, content và citation dài hạn.",
    role:
      "Mục tiêu top 3 Local Pack — nơi phần lớn click và cuộc gọi local xảy ra.",
    components: [
      "Review velocity ổn định",
      "GBP engagement (ảnh, post)",
      "Website local landing",
      "Backlink địa phương",
      "Behavior: click-to-call, direction",
    ],
    applySteps: [
      "Benchmark top 3 đối thủ pack",
      "Lấp gap review và ảnh so với họ",
      "Tăng post GBP 2/tuần",
      "Xây 2–3 backlink báo địa phương/quý",
      "Theo dõi rank grid 5km",
    ],
    faq: [
      { q: "Hack Maps có được không?", a: "Không — keyword stuffing tên, review fake dễ bị phạt." },
      { q: "Di chuyển pin để gần trung tâm?", a: "Gian lận — Google phát hiện và suspend." },
      { q: "Ads giúp organic pack?", a: "Không trực tiếp — nhưng tăng brand search có thể gián tiếp." },
    ],
  },
  {
    slug: "schema-local-business-la-gi",
    h1: "Schema Local Business Là Gì? Cấu Trúc Dữ Liệu Cho SEO Local",
    keywordsMain: "schema local business là gì",
    keywordsSecondary: "localbusiness schema, json-ld địa phương, structured data local",
    definition:
      "Schema Local Business là mã JSON-LD mô tả doanh nghiệp địa phương — tên, địa chỉ, SĐT, giờ mở cửa, geo — giúp Google hiểu rõ thực thể và hiển thị rich result.",
    role:
      "Đồng bộ tín hiệu giữa website và GBP — giảm nhầm lẫn entity và hỗ trợ knowledge graph.",
    components: [
      "@type LocalBusiness hoặc subtype",
      "address PostalAddress đầy đủ",
      "geo latitude/longitude",
      "openingHoursSpecification",
      "sameAs link mạng xã hội",
    ],
    applySteps: [
      "Chọn subtype đúng (Restaurant, Dentist…)",
      "Generate JSON-LD khớp NAP GBP",
      "Validate Rich Results Test",
      "Đặt schema trên trang chủ + contact",
      "Cập nhật khi đổi giờ/địa chỉ",
    ],
    faq: [
      { q: "Schema thay GBP?", a: "Không — bổ sung cho nhau; GBP vẫn bắt buộc cho Maps." },
      { q: "Plugin WordPress?", a: "Rank Math, Yoast hỗ trợ LocalBusiness." },
      { q: "Sai schema có sao?", a: "Google bỏ qua hoặc mất rich snippet — sửa ngay." },
    ],
  },
  {
    slug: "google-maps-marketing-la-gi",
    h1: "Google Maps Marketing Là Gì? Chiến Lược Marketing Trên Bản Đồ",
    keywordsMain: "google maps marketing là gì",
    keywordsSecondary: "marketing google maps, quảng bá trên maps, maps ads",
    definition:
      "Google Maps marketing là tập chiến lược thu hút khách qua Google Maps — SEO local, GBP post, review, Maps ads và tích hợp Maps vào hành trình mua.",
    role:
      "Kết hợp organic pack và paid local để chiếm mọi touchpoint khi khách tìm 'gần tôi'.",
    components: [
      "Organic Local SEO",
      "Google Local Services Ads",
      "Performance Max local",
      "Review marketing",
      "Offline → online (QR review)",
    ],
    applySteps: [
      "Audit presence Maps hiện tại",
      "Chia budget organic vs ads",
      "Chạy thử Local Campaign 2 tuần",
      "Đo cost per call từ ads",
      "Tối ưu GBP song song ads",
    ],
    faq: [
      { q: "Maps marketing vs SEO?", a: "Marketing bao gồm SEO + ads + review + content." },
      { q: "Ngân sách ads local?", a: "Từ 3–10 triệu/tháng tùy ngành thành phố." },
      { q: "Chỉ organic được không?", a: "Được — chậm hơn nhưng bền, không tốn CPC." },
    ],
  },
  {
    slug: "service-area-business-la-gi",
    h1: "Service Area Business Là Gì? SEO Maps Không Cần Hiện Địa Chỉ",
    keywordsMain: "service area business là gì",
    keywordsSecondary: "sab google, doanh nghiệp khu vực phục vụ, ẩn địa chỉ gbp",
    definition:
      "Service Area Business (SAB) là loại hồ sơ Google dành cho doanh nghiệp đến tận nơi khách — thợ điện, giao hàng, tư vấn — ẩn địa chỉ văn phòng, chỉ hiện khu vực phục vụ trên Maps.",
    role:
      "Phù hợp freelancer và dịch vụ tại nhà tại VN mà không muốn lộ địa chỉ nhà riêng.",
    components: [
      "Base location ẩn",
      "Service radius hoặc list quận",
      "Verify vẫn bắt buộc",
      "Không spam radius quá rộng",
      "Review và SĐT local",
    ],
    applySteps: [
      "Chọn 'I deliver goods and services' khi tạo GBP",
      "Thêm tối đa service areas hợp lý",
      "Không liệt kê 50 tỉnh nếu không phục vụ",
      "Landing page theo quận phục vụ",
      "SĐT địa phương tăng trust",
    ],
    faq: [
      { q: "SAB có vào pack không?", a: "Có — nếu relevance và review tốt trong vùng." },
      { q: "Có showroom nhỏ?", a: "Nên dùng storefront thay SAB nếu khách ghé thật." },
      { q: "Radius tối đa?", a: "Google giới hạn — khai báo trung thực khu vực." },
    ],
  },
  {
    slug: "geo-tagging-la-gi",
    h1: "Geo Tagging Là Gì? Gắn Vị Trí Địa Lý Hỗ Trợ SEO Maps",
    keywordsMain: "geo tagging là gì",
    keywordsSecondary: "định vị địa lý seo, geo tag ảnh, tọa độ gps seo",
    definition:
      "Geo tagging là gắn metadata vị trí địa lý (GPS coordinates) vào ảnh, video hoặc nội dung — giúp Google xác định nơi dịch vụ/sự kiện diễn ra, hỗ trợ SEO local.",
    role:
      "Bổ sung tín hiệu địa phương — đặc biệt hữu ích cho ảnh upload lên GBP và gallery website ngành F&B, BĐS.",
    components: [
      "EXIF GPS trong ảnh",
      "Schema geo coordinates",
      "Google Maps embed lat/long",
      "Ảnh chụp tại địa điểm thật",
      "Tránh geo tag sai lệch",
    ],
    applySteps: [
      "Chụp ảnh onsite bằng điện thoại (giữ GPS)",
      "Upload ảnh thật lên GBP",
      "Thêm geo trong schema LocalBusiness",
      "Embed map đúng tọa độ cửa hàng",
      "Không dùng stock photo không location",
    ],
    faq: [
      { q: "Geo tag ảnh web có tác dụng?", a: "Nhẹ — Google ưu tiên NAP và GBP hơn EXIF." },
      { q: "Tool geo tag?", a: "ExifTool, hoặc chụp trực tiếp tại shop." },
      { q: "Có vi phạm privacy?", a: "Chỉ tag ảnh public business, không tag nhà riêng SAB." },
    ],
  },
  {
    slug: "seo-local-cho-spa",
    h1: "SEO Local Cho Spa — Tối Ưu Google Maps Ngành Làm Đẹp",
    keywordsMain: "seo local cho spa",
    keywordsSecondary: "seo spa google maps, spa local pack, marketing spa địa phương",
    definition:
      "SEO local cho spa là tối ưu Google Business Profile, review và landing 'spa + quận' để xuất hiện khi khách tìm làm đẹp gần nhất — ngành cạnh tranh pack rất mạnh tại TP.HCM.",
    role:
      "Khách spa chọn theo review, ảnh và khoảng cách — Maps quyết định 70% lead mới.",
    components: [
      "Category Beauty salon / Spa",
      "Ảnh before-after (tuân thủ policy)",
      "Dịch vụ: massage, facial, nail…",
      "Review nhắc tên dịch vụ",
      "Đặt lịch online link GBP",
    ],
    applySteps: [
      "Tối ưu GBP với 20+ ảnh spa thật",
      "Thu review sau mỗi liệu trình",
      "Landing spa quận 1, quận 7…",
      "Post khuyến mãi cuối tuần",
      "Theo dõi competitor pack 3km",
    ],
    faq: [
      { q: "Spa chain nhiều chi nhánh?", a: "Mỗi spa một GBP — không gộp chung." },
      { q: "Từ khóa spa hot?", a: "'spa gần đây', 'spa quận X', 'massage quận Y'." },
      { q: "Ads spa Maps?", a: "Hiệu quả cuối tuần — test budget nhỏ trước." },
    ],
  },
  {
    slug: "seo-local-cho-nha-hang",
    h1: "SEO Local Cho Nhà Hàng — Lên Top Google Maps F&B",
    keywordsMain: "seo local cho nhà hàng",
    keywordsSecondary: "seo nhà hàng maps, restaurant local seo, google maps f&b",
    definition:
      "SEO local cho nhà hàng là tối ưu Maps và GBP để khách tìm 'nhà hàng gần đây', 'quán ăn quận X' thấy bạn trên pack — kèm menu, giờ mở cửa và đặt bàn.",
    role:
      "F&B phụ thuộc foot traffic — Maps + review quyết định bàn trống hay đầy.",
    components: [
      "Schema Restaurant + menu link",
      "Ảnh món ăn không stock",
      "Attributes: dine-in, delivery",
      "Giờ mở cửa chính xác",
      "Reserve with Google / đặt bàn",
    ],
    applySteps: [
      "Upload menu PDF hoặc link website",
      "Cập nhật giờ và ngày nghỉ lễ",
      "Nhắc review sau bữa ăn (QR bill)",
      "Post món mới hàng tuần",
      "Tối ưu từ khóa 'nhà hàng + món + quận'",
    ],
    faq: [
      { q: "GrabFood có ảnh hưởng Maps?", a: "Gián tiếp — brand search tăng có thể hỗ trợ prominence." },
      { q: "Review ẩm thực quan trọng?", a: "Rất — khách đọc review về món và phục vụ." },
      { q: "Nhiều brand một địa chỉ?", a: "Một địa chỉ một GBP chính — tránh duplicate." },
    ],
  },
  {
    slug: "seo-local-cho-phong-kham",
    h1: "SEO Local Cho Phòng Khám — Google Maps Y Tế Chuẩn SEO",
    keywordsMain: "seo local cho phòng khám",
    keywordsSecondary: "seo phòng khám maps, clinic local seo, google maps y tế",
    definition:
      "SEO local cho phòng khám là tối ưu GBP category y tế, review bệnh nhân và trang dịch vụ theo chuyên khoa + quận — tuân thủ guideline Google về medical content.",
    role:
      "Bệnh nhân tìm 'phòng khám nha khoa quận 3', 'đa khoa gần đây' — trust và khoảng cách là yếu tố số 1.",
    components: [
      "Category Medical clinic / Dental",
      "Giờ khám và booking online",
      "Không dùng ảnh misleading",
      "Schema Physician / MedicalClinic",
      "Nội dung E-E-A-T trên website",
    ],
    applySteps: [
      "Verify GBP với giấy phép hành nghề",
      "Trang từng chuyên khoa + quận",
      "Thu review sau khám (tuân thủ ethics)",
      "Q&A GBP trả lời giờ, bảo hiểm",
      "Local citation y tế uy tín",
    ],
    faq: [
      { q: "Quảng cáo y tế trên Maps?", a: "Tuân thủ policy — tránh claim không chứng minh được." },
      { q: "Review bệnh nhân hạn chế?", a: "Nhắc nhẹ — không thưởng tiền cho review." },
      { q: "Nha khoa vs đa khoa category?", a: "Chọn primary sát nhất — Dental clinic vs Medical." },
    ],
  },
  {
    slug: "seo-local-tphcm",
    h1: "SEO Local TPHCM — Chiến Lược Google Maps Tại TP Hồ Chí Minh",
    keywordsMain: "seo local tphcm",
    keywordsSecondary: "seo địa phương tphcm, google maps tp hcm, local seo sài gòn",
    definition:
      "SEO local TP.HCM là tối ưu Maps và website cho thị trường TP.Hồ Chí Minh — từ khóa gắn quận (Q1, Q7, Thủ Đức) và cạnh tranh pack cao nhất cả nước.",
    role:
      "Thị trường lớn nhất VN — volume tìm kiếm local cao nhưng đối thủ đông, cần chiến lược quận + ngách.",
    components: [
      "Landing theo 24 quận/huyện",
      "GBP địa chỉ TP.HCM chuẩn",
      "Review tiếng Việt có địa danh",
      "Backlink báo SG, danh bạ TP.HCM",
      "Ads local test theo quận",
    ],
    applySteps: [
      "Ưu tiên quận có cửa hàng thật",
      "Map rank grid Q1, Q7, Bình Thạnh",
      "Nội dung mention landmark quận",
      "Citation trên trang vàng VN SG",
      "So sánh pack với 5 đối thủ/quận",
    ],
    faq: [
      { q: "TP.HCM cạnh tranh thế nào?", a: "Rất cao — spa, web, F&B pack thường 4.5+ sao 100+ review." },
      { q: "Viết Sài Gòn hay TP.HCM?", a: "Dùng cả hai tự nhiên trong content — search cả hai." },
      { q: "Thủ Đức tách riêng?", a: "Có — landing 'Thủ Đức' riêng sau sáp nhập hành chính." },
    ],
  },
  {
    slug: "seo-local-ha-noi",
    h1: "SEO Local Hà Nội — Tối Ưu Google Maps Thủ Đô",
    keywordsMain: "seo local hà nội",
    keywordsSecondary: "seo địa phương hà nội, google maps hà nội, local seo hn",
    definition:
      "SEO local Hà Nội là chiến lược xếp hạng Maps và organic cho khách tìm dịch vụ tại Hà Nội — quận Ba Đình, Cầu Giấy, Đống Đa và vùng lân cận.",
    role:
      "Thị trường B2B và dịch vụ mạnh — local SEO HN mang lead chất lượng cho agency, clinic, F&B.",
    components: [
      "Địa chỉ phố HN chuẩn NAP",
      "Từ khóa 'Hà Nội' + 'HN'",
      "Danh bạ và báo địa phương HN",
      "Schema addressRegion HN",
      "GBP post tiếng Việt chuẩn",
    ],
    applySteps: [
      "Tạo trang dịch vụ + Hà Nội",
      "Landing 5–10 quận trọng điểm",
      "Build citation HN specific",
      "Review nhắc 'tại Hà Nội' tự nhiên",
      "Grid rank quanh địa chỉ cửa hàng",
    ],
    faq: [
      { q: "HN vs TP.HCM volume?", a: "TP.HCM thường cao hơn F&B; HN mạnh B2B, giáo dục." },
      { q: "Cần văn phòng HN?", a: "Có địa chỉ thật hoặc SAB phục vụ HN hợp lệ." },
      { q: "Từ khóa quận HN?", a: "'Cầu Giấy', 'Đống Đa', 'Thanh Xuân' volume tốt." },
    ],
  },
  {
    slug: "seo-local-da-nang",
    h1: "SEO Local Đà Nẵng — Google Maps Cho Doanh Nghiệp Miền Trung",
    keywordsMain: "seo local đà nẵng",
    keywordsSecondary: "seo địa phương đà nẵng, google maps đà nẵng, local seo miền trung",
    definition:
      "SEO local Đà Nẵng tập trung thị trường du lịch và dịch vụ địa phương — khách sạn, spa, nhà hàng, tour — tối ưu Maps cho query có 'Đà Nẵng'.",
    role:
      "Cạnh tranh thấp hơn TP.HCM — cơ hội lên pack nhanh hơn với GBP và review tốt.",
    components: [
      "Seasonal content du lịch",
      "GBP ảnh beach/cityscape thật",
      "Đa ngôn ngữ EN cho khách du lịch",
      "Category phù hợp hospitality",
      "Citation danh bạ Đà Nẵng",
    ],
    applySteps: [
      "Tối ưu GBP trước mùa du lịch",
      "Landing 'Đà Nẵng' + quận Hải Châu, Sơn Trà",
      "Review từ khách Việt và quốc tế",
      "Post sự kiện/local festival",
      "Link từ blog du lịch ĐN",
    ],
    faq: [
      { q: "Mùa cao điểm SEO ĐN?", a: "Q2–Q3 du lịch — chuẩn bị content trước 2 tháng." },
      { q: "Tiếng Anh trên GBP?", a: "Nên có mô tả EN cho hospitality." },
      { q: "So với Nha Trang?", a: "Mỗi thành phố landing riêng — không gộp." },
    ],
  },
  {
    slug: "google-maps-vs-website",
    h1: "Google Maps Vs Website — Nên Ưu Tiên SEO Maps Hay Website?",
    keywordsMain: "google maps vs website",
    keywordsSecondary: "maps hay website, gbp vs seo web, local maps website",
    definition:
      "Google Maps vs website là so sánh hai kênh: GBP/Maps cho intent gần và gọi nhanh; website cho trust sâu, content và chuyển đổi phức tạp — doanh nghiệp cần cả hai.",
    role:
      "Tránh chỉ làm Maps rồi mất brand; tránh chỉ web không có pack khi khách tìm 'gần tôi'.",
    components: [
      "Maps: pack, call, direction",
      "Website: blog, form, ecommerce",
      "NAP đồng bộ giữa hai kênh",
      "UTM từ nút Website GBP",
      "Schema link entity",
    ],
    applySteps: [
      "Audit Maps và web hiện tại",
      "Đồng bộ NAP và messaging",
      "Website mobile nhanh (từ Maps click)",
      "Landing khớp promise trên GBP",
      "Đo lead source Maps vs organic web",
    ],
    faq: [
      { q: "Chỉ Maps không web được?", a: "Được tạm — thiếu SEO dài hạn và kiểm soát brand." },
      { q: "Web không Maps?", a: "Mất pack — rất yếu với business có địa điểm." },
      { q: "Ưu tiên ngân sách?", a: "GBP miễn phí trước → web chuẩn SEO → ads." },
    ],
  },
  {
    slug: "checklist-seo-local",
    h1: "Checklist SEO Local — 25 Bước Tối Ưu Google Maps Hoàn Chỉnh",
    keywordsMain: "checklist seo local",
    keywordsSecondary: "checklist local seo, danh sách seo maps, audit seo địa phương",
    definition:
      "Checklist SEO local là danh sách kiểm tra có hệ thống — GBP, NAP, review, citation, website, schema — trước khi triển khai hoặc audit chiến dịch Google Maps.",
    role:
      "Tránh bỏ sót bước quan trọng — nhiều shop verify GBP xong nhưng thiếu 50% checklist.",
    components: [
      "GBP 100% complete",
      "NAP audit pass",
      "10+ review minimum",
      "20+ ảnh GBP",
      "3+ local landing pages",
    ],
    applySteps: [
      "In checklist và đánh dấu từng mục",
      "Audit đối thủ top 3 pack",
      "Fix mục đỏ trước (NAP, category)",
      "Lên lịch review và post hàng tuần",
      "Review checklist mỗi quý",
    ],
    faq: [
      { q: "Checklist bao lâu một lần?", a: "Audit đầy đủ mỗi quý; review hàng tuần." },
      { q: "Tool audit local?", a: "BrightLocal, Whitespark, hoặc spreadsheet thủ công." },
      { q: "Ưu tiên mục nào?", a: "Verify → category → review → ảnh → citation." },
    ],
  },
  {
    slug: "tu-khoa-local-seo",
    h1: "Từ Khóa Local SEO — Cách Nghiên Cứu Keyword Cho Google Maps",
    keywordsMain: "từ khóa local seo",
    keywordsSecondary: "keyword local seo, nghiên cứu từ khóa địa phương, local keyword research",
    definition:
      "Từ khóa local SEO là cụm từ có yếu tố địa lý hoặc intent 'gần tôi' — 'spa quận 7', 'sửa điện gần đây' — dùng tối ưu GBP, landing và content Maps.",
    role:
      "Chọn đúng từ khóa local = đúng pack query; sai từ khóa = traffic không gọi điện.",
    components: [
      "Modifier địa phương: quận, thành phố",
      "Near me / gần đây / gần tôi",
      "Service + location",
      "GBP insights search queries",
      "GSC filter by country/city",
    ],
    applySteps: [
      "Brainstorm dịch vụ + quận",
      "Xem search queries trong GBP Insights",
      "Dùng GKP filter location TP.HCM",
      "Gom cluster keyword cùng intent",
      "Gán keyword cho landing và GBP mô tả",
    ],
    faq: [
      { q: "'Gần tôi' có cần trong text?", a: "Không bắt buộc — Google hiểu location user." },
      { q: "Bao nhiêu từ khóa local?", a: "10–30 focus cho SME; mỗi quận 2–5 cụm." },
      { q: "Volume local thấp có làm?", a: "Có — intent cao, conversion tốt." },
    ],
  },
  {
    slug: "local-seo-vs-seo-thuong",
    h1: "Local SEO Vs SEO Thường — Khác Biệt Và Cách Kết Hợp",
    keywordsMain: "local seo vs seo thường",
    keywordsSecondary: "so sánh local seo, seo thông thường và local, organic vs maps",
    definition:
      "Local SEO vs SEO thường: local tập trung Maps, NAP, review và từ khóa địa phương; SEO thường (national) tập trung content, backlink và từ khóa rộng không gắn địa điểm.",
    role:
      "Doanh nghiệp có cửa hàng cần local; thương hiệu online-only tập trung SEO thường — nhiều SME cần hybrid.",
    components: [
      "Local: GBP, pack, citation",
      "National: blog, pillar, backlink",
      "Overlap: website on-page",
      "Tracking khác nhau",
      "Team skill khác nhau",
    ],
    applySteps: [
      "Xác định % doanh thu từ local",
      "Phân budget local vs content",
      "Trang location cho local",
      "Blog pillar cho national",
      "Báo cáo riêng Maps vs organic",
    ],
    faq: [
      { q: "Làm cả hai có conflict?", a: "Không — bổ sung; tránh cannibalize cùng exact keyword." },
      { q: "Agency nào làm local?", a: "Nhiều agency web VN có gói SEO Maps kèm web." },
      { q: "Ecom cần local?", a: "Chỉ nếu có showroom hoặc ship local marketing." },
    ],
  },
  {
    slug: "quang-cao-google-maps-la-gi",
    h1: "Quảng Cáo Google Maps Là Gì? Local Ads Và Local Services Ads",
    keywordsMain: "quảng cáo google maps là gì",
    keywordsSecondary: "google maps ads, local campaign, quảng cáo local pack",
    definition:
      "Quảng cáo Google Maps là các định dạng ads hiển thị trên Maps và Local Pack — Local Services Ads, Performance Max for stores, sponsored map pins — trả phí theo click hoặc lead.",
    role:
      "Bổ sung organic pack khi cạnh tranh cao hoặc cần lead ngay trong khi SEO Maps đang lên.",
    components: [
      "Local Services Ads (LSA)",
      "Google Guaranteed badge",
      "Performance Max location",
      "Search ads with location extension",
      "Conversion tracking call",
    ],
    applySteps: [
      "Kiểm tra ngành eligible LSA tại VN",
      "Verify business cho LSA",
      "Set budget test 100–200k/ngày",
      "Track call vs form",
      "So ROAS với organic Maps",
    ],
    faq: [
      { q: "LSA có ở Việt Nam?", a: "Một số ngành — kiểm tra Google Ads eligibility." },
      { q: "Ads thay SEO Maps?", a: "Không — dừng ads mất hiển thị; SEO bền hơn." },
      { q: "CPC Maps đắt không?", a: "Tùy ngành — lawyer, dental thường cao globally." },
    ],
  },
  {
    slug: "embed-google-maps-website-la-gi",
    h1: "Embed Google Maps Website Là Gì? Nhúng Bản Đồ Chuẩn SEO Local",
    keywordsMain: "embed google maps website là gì",
    keywordsSecondary: "nhúng google maps, iframe maps seo, google map trên web",
    definition:
      "Embed Google Maps website là nhúng bản đồ Google vào trang liên hệ bằng iframe hoặc API — giúp khách chỉ đường, tăng trust và gửi tín hiệu địa lý cho SEO local.",
    role:
      "Trang contact không có map làm tăng bounce — khách không tin địa chỉ thật.",
    components: [
      "Google Maps Embed API",
      "iframe từ Google Maps share",
      "Lat/long chính xác",
      "Mobile responsive map",
      "Link 'Chỉ đường' mở app Maps",
    ],
    applySteps: [
      "Lấy embed code từ Google Maps",
      "Đặt trên trang Liên hệ + footer",
      "Đảm bảo NAP text khớp embed",
      "Lazy load iframe giữ PageSpeed",
      "Test chỉ đường trên mobile",
    ],
    faq: [
      { q: "Embed có giúp ranking?", a: "Tín hiệu phụ — chính là UX và NAP consistency." },
      { q: "iframe làm chậm web?", a: "Có thể — lazy load và placeholder." },
      { q: "Nhiều chi nhánh?", a: "Một map mỗi location page." },
    ],
  },
  {
    slug: "gan-toi-google-maps-la-gi",
    h1: "Gần Tôi Google Maps Là Gì? Tối Ưu Từ Khóa Near Me Và Local Intent",
    keywordsMain: "gần tôi google maps là gì",
    keywordsSecondary: "near me seo, tìm gần đây, google gần tôi",
    definition:
      "'Gần tôi' Google Maps là loại truy vấn local intent — người dùng tìm dịch vụ trong bán kính GPS — Google ưu tiên distance và relevance trên Maps hơn text 'gần tôi' trong website.",
    role:
      "Phần lớn search mobile F&B, y tế, sửa chữa có implicit near me — tối ưu GBP quan trọng hơn nhồi từ 'gần tôi'.",
    components: [
      "Mobile search dominant",
      "GPS của người dùng",
      "Distance ranking factor",
      "Không cần keyword 'gần tôi' trong tên",
      "GBP và pin chính xác",
    ],
    applySteps: [
      "Đảm bảo pin đúng vị trí",
      "Category khớp dịch vụ near me",
      "Tăng review trong bán kính 5km",
      "Mobile site nhanh",
      "Theo dõi 'near me' queries trong Insights",
    ],
    faq: [
      { q: "Có cần viết 'gần tôi' trong web?", a: "Tùy chọn — Google hiểu location; viết tự nhiên nếu có." },
      { q: "Near me volume cao?", a: "Rất cao trên mobile — implicit trong local query." },
      { q: "SAB có near me?", a: "Có — trong service area đã khai báo." },
    ],
  },
];
