/**
 * 500 từ khóa long-tail batch 4 — ngành mở rộng, địa phương Tây Nguyên/duyên hải, technical SEO, content, ecommerce.
 * Export: KEYWORDS_500_BATCH4
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function webIndustryCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `thiet-ke-website-${indSlug}-${citySlug}`,
    keywordsMain: `thiết kế website ${industry} ${city}`,
    h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webIndustry(slug, kw, angle) {
  return {
    slug: `thiet-ke-website-${slug}`,
    keywordsMain: `thiết kế website ${kw}`,
    h1: `Thiết Kế Website ${cap(kw)} Chuyên Nghiệp Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webPricing(indSlug, industry, angle) {
  return {
    slug: `bao-gia-thiet-ke-website-${indSlug}`,
    keywordsMain: `báo giá thiết kế website ${industry}`,
    h1: `Báo Giá Thiết Kế Website ${cap(industry)} 2026`,
    angle,
    niche: "strategy",
  };
}

function shopeeAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-shopee-${slug}`,
    keywordsMain: `quảng cáo shopee ${kw}`,
    h1: `Quảng Cáo Shopee ${cap(kw)} — Tăng Doanh Số`,
    angle,
    niche: "strategy",
  };
}

function lazadaAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-lazada-${slug}`,
    keywordsMain: `quảng cáo lazada ${kw}`,
    h1: `Quảng Cáo Lazada ${cap(kw)} — Tối Ưu Shop`,
    angle,
    niche: "strategy",
  };
}

function techSeo(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "seo" };
}

function contentMkt(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "content" };
}

function mapsIndCity(indSlug, citySlug, industry, city, angle) {
  return {
    slug: `seo-google-maps-${indSlug}-${citySlug}`,
    keywordsMain: `seo google maps ${industry} ${city}`,
    h1: `SEO Google Maps ${cap(industry)} ${city}`,
    angle,
    niche: "seo",
  };
}

function marketingInd(slug, kw, angle) {
  return {
    slug: `marketing-${slug}`,
    keywordsMain: `marketing ${kw}`,
    h1: `Marketing ${cap(kw)} — Chiến Lược Tăng Trưởng`,
    angle,
    niche: "strategy",
  };
}

function compare(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

function pain(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function laGi(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "seo" };
}

function agency(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

/** A — 200: ngành mới × 10 thành phố duyên hải / Tây Nguyên */
const INDUSTRIES_B4 = [
  ["nha-may-thuy-san", "nhà máy thủy sản", "website nhà máy chế biến thủy sản"],
  ["xuong-dong-goi", "xưởng đóng gói", "website xưởng đóng gói B2B"],
  ["cua-hang-dong-phuc", "cửa hàng đồng phục", "website may đồng phục công ty"],
  ["dich-vu-khac-bau-troi", "dịch vụ khắc bầu trời", "website dịch vụ khắc laser"],
  ["trung-tam-tro-giup-tre", "trung tâm trợ giúp trẻ", "website trung tâm hỗ trợ trẻ em"],
  ["phong-kham-ho-hap", "phòng khám hô hấp", "website phòng khám hô hấp"],
  ["cua-hang-thiet-bi-phong-tap", "cửa hàng thiết bị phòng tập", "website bán dụng cụ gym"],
  ["dich-vu-cho-thue-may-in", "dịch vụ cho thuê máy in", "website thuê máy photocopy"],
  ["cong-ty-phan-phoi-duoc-pham", "công ty phân phối dược phẩm", "website phân phối dược B2B"],
  ["xuong-che-bien-ca", "xưởng chế biến cá", "website xưởng chế biến hải sản"],
  ["cua-hang-van-phong-cho-thue", "cửa hàng văn phòng cho thuê", "website cho thuê VP ảo"],
  ["trung-tam-tro-giup-phap-ly", "trung tâm trợ giúp pháp lý", "website tư vấn pháp lý miễn phí"],
  ["phong-kham-phu-san", "phòng khám phụ sản", "website phụ sản đặt khám"],
  ["dich-vu-lap-dat-solar", "dịch vụ lắp đặt solar", "website lắp pin năng lượng mặt trời"],
  ["cua-hang-thiet-bi-nong-nghiep", "cửa hàng thiết bị nông nghiệp", "website máy nông nghiệp"],
  ["xuong-san-xuat-gach", "xưởng sản xuất gạch", "website nhà máy gạch xây dựng"],
  ["cong-ty-tu-van-quy-hoach", "công ty tư vấn quy hoạch", "website tư vấn quy hoạch đô thị"],
  ["trung-tam-day-mc", "trung tâm dạy MC", "website học dẫn chương trình"],
  ["dich-vu-thiet-ke-van-phong", "dịch vụ thiết kế văn phòng", "website thiết kế nội thất VP"],
  ["cua-hang-thiet-bi-bao-ho", "cửa hàng thiết bị bảo hộ", "website PPE an toàn lao động"],
];

const CITIES_B4 = [
  ["phan-thiet", "Phan Thiết"],
  ["quy-nhon", "Quy Nhon"],
  ["vinh", "Vinh"],
  ["ha-long", "Hạ Long"],
  ["cao-bang", "Cao Bằng"],
  ["lang-son", "Lạng Sơn"],
  ["bac-lieu", "Bạc Liêu"],
  ["tra-vinh", "Trà Vinh"],
  ["binh-thuan", "Bình Thuận"],
  ["dak-lak", "Đắk Lắk"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B4) {
  for (const [citySlug, city] of CITIES_B4) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50: website ngành mới */
const B_EXTRA_WEB = [
  ["cong-ty-dien-luc", "công ty điện lực", "website dịch vụ điện công nghiệp"],
  ["xuong-che-bien-go", "xưởng chế biến gỗ", "website xưởng gỗ xuất khẩu"],
  ["cua-hang-thiet-bi-y-te", "cửa hàng thiết bị y tế", "website bán thiết bị y tế"],
  ["dich-vu-thu-gom-rac", "dịch vụ thu gom rác", "website công ty môi trường"],
  ["trung-tam-ho-tro-nguoi-cao-tuoi", "trung tâm hỗ trợ người cao tuổi", "website dưỡng lão chăm sóc"],
  ["phong-kham-than-kinh", "phòng khám thần kinh", "website thần kinh đặt khám"],
  ["cua-hang-thiet-bi-bep-cong-nghiep", "cửa hàng thiết bị bếp công nghiệp", "website bếp công nghiệp"],
  ["dich-vu-cho-thue-container", "dịch vụ cho thuê container", "website thuê container vận chuyển"],
  ["cong-ty-phan-phoi-bia", "công ty phân phối bia", "website phân phối đồ uống B2B"],
  ["xuong-san-xuat-banh-keo", "xưởng sản xuất bánh kẹo", "website nhà máy bánh kẹo"],
  ["cua-hang-thiet-bi-nha-khoa", "cửa hàng thiết bị nha khoa", "website bán thiết bị nha khoa"],
  ["dich-vu-thiet-ke-showroom", "dịch vụ thiết kế showroom", "website thiết kế showroom ô tô"],
  ["trung-tam-day-tieng-han", "trung tâm dạy tiếng Hàn", "website học tiếng Hàn"],
  ["phong-kham-chinh-nha", "phòng khám chỉnh nha", "website chỉnh nha niềng răng"],
  ["cua-hang-thiet-bi-ve-sinh-cong-nghiep", "cửa hàng thiết bị vệ sinh công nghiệp", "website thiết bị vệ sinh CN"],
  ["dich-vu-cho-thue-nhan-su", "dịch vụ cho thuê nhân sự", "website cung ứng lao động"],
  ["cong-ty-tu-van-dau-gia", "công ty tư vấn đấu giá", "website tư vấn đấu thầu"],
  ["xuong-san-xuat-nhua", "xưởng sản xuất nhựa", "website nhà máy nhựa injection"],
  ["cua-hang-thiet-bi-chieu-sang", "cửa hàng thiết bị chiếu sáng", "website đèn chiếu sáng LED"],
  ["dich-vu-thiet-ke-booth", "dịch vụ thiết kế booth", "website thiết kế gian hàng triển lãm"],
  ["trung-tam-day-tieng-nhat", "trung tâm dạy tiếng Nhật", "website học tiếng Nhật JLPT"],
  ["phong-kham-tim-mach", "phòng khám tim mạch", "website tim mạch đặt khám"],
  ["cua-hang-thiet-bi-the-thao-chuyen-dung", "cửa hàng thiết bị thể thao chuyên dụng", "website đồ thể thao chuyên nghiệp"],
  ["dich-vu-cho-thue-audio", "dịch vụ cho thuê audio", "website thuê âm thanh sự kiện"],
  ["cong-ty-tu-van-fdi", "công ty tư vấn FDI", "website tư vấn đầu tư nước ngoài"],
  ["xuong-san-xuat-giay", "xưởng sản xuất giày", "website xưởng giày xuất khẩu"],
  ["cua-hang-thiet-bi-ho-boi", "cửa hàng thiết bị hồ bơi", "website thiết bị bể bơi"],
  ["dich-vu-thiet-ke-catalogue", "dịch vụ thiết kế catalogue", "website catalogue sản phẩm in ấn"],
  ["trung-tam-day-tieng-trung", "trung tâm dạy tiếng Trung", "website học tiếng Trung HSK"],
  ["phong-kham-tieu-hoa", "phòng khám tiêu hóa", "website tiêu hóa nội soi"],
  ["cua-hang-thiet-bi-cafe", "cửa hàng thiết bị cafe", "website máy pha cafe chuyên nghiệp"],
  ["dich-vu-cho-thue-khung-truss", "dịch vụ cho thuê khung truss", "website thuê khung sân khấu"],
  ["cong-ty-tu-van-esg", "công ty tư vấn ESG", "website tư vấn bền vững ESG"],
  ["xuong-san-xuat-tui-xach", "xưởng sản xuất túi xách", "website xưởng túi xách OEM"],
  ["cua-hang-thiet-bi-nha-bep", "cửa hàng thiết bị nhà bếp", "website thiết bị bếp cao cấp"],
  ["dich-vu-thiet-ke-menu", "dịch vụ thiết kế menu", "website thiết kế menu nhà hàng"],
  ["trung-tam-day-tieng-phap", "trung tâm dạy tiếng Pháp", "website học tiếng Pháp DELF"],
  ["phong-kham-noi-tiet", "phòng khám nội tiết", "website nội tiết tiểu đường"],
  ["cua-hang-thiet-bi-lam-banh", "cửa hàng thiết bị làm bánh", "website dụng cụ làm bánh"],
  ["dich-vu-cho-thue-ban-ghe", "dịch vụ cho thuê bàn ghế", "website thuê bàn ghế sự kiện"],
  ["cong-ty-tu-van-iso", "công ty tư vấn ISO", "website tư vấn chứng nhận ISO"],
  ["xuong-san-xuat-may-mac", "xưởng sản xuất may mặc", "website xưởng may FOB"],
  ["cua-hang-thiet-bi-nong-lanh", "cửa hàng thiết bị nông lạnh", "website kho lạnh nông sản"],
  ["dich-vu-thiet-ke-bao-thu", "dịch vụ thiết kế bao thư", "website thiết kế bao bì thương hiệu"],
  ["trung-tam-day-tieng-duc", "trung tâm dạy tiếng Đức", "website học tiếng Đức A1-C1"],
  ["phong-kham-xuong-khop", "phòng khám xương khớp", "website xương khớp phục hồi"],
  ["cua-hang-thiet-bi-nha-tam", "cửa hàng thiết bị nhà tắm", "website thiết bị vệ sinh cao cấp"],
  ["dich-vu-cho-thue-tent", "dịch vụ cho thuê tent", "website thuê lều sự kiện"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40: báo giá ngành mới */
const C_PRICING = [
  ["thuy-san", "thủy sản", "giá website nhà máy thủy sản"],
  ["dong-goi", "đóng gói", "giá website xưởng đóng gói"],
  ["dong-phuc", "đồng phục", "giá website may đồng phục"],
  ["khac-bau-troi", "khắc bầu trời", "giá website dịch vụ khắc"],
  ["tro-giup-tre", "trợ giúp trẻ", "giá website trung tâm trẻ em"],
  ["ho-hap", "hô hấp", "giá website phòng khám hô hấp"],
  ["thiet-bi-gym", "thiết bị gym", "giá website bán dụng cụ gym"],
  ["thue-may-in", "thuê máy in", "giá website thuê máy in"],
  ["phan-phoi-duoc", "phân phối dược", "giá website phân phối dược"],
  ["che-bien-ca", "chế biến cá", "giá website chế biến hải sản"],
  ["vp-ao", "văn phòng ảo", "giá website cho thuê VP ảo"],
  ["tro-giup-phap-ly", "trợ giúp pháp lý", "giá website tư vấn pháp lý"],
  ["phu-san", "phụ sản", "giá website phòng khám phụ sản"],
  ["lap-solar", "lắp solar", "giá website lắp pin mặt trời"],
  ["thiet-bi-nong-nghiep", "thiết bị nông nghiệp", "giá website máy nông nghiệp"],
  ["san-xuat-gach", "sản xuất gạch", "giá website nhà máy gạch"],
  ["tu-van-quy-hoach", "tư vấn quy hoạch", "giá website tư vấn quy hoạch"],
  ["day-mc", "dạy MC", "giá website học MC"],
  ["thiet-ke-vp", "thiết kế văn phòng", "giá website thiết kế VP"],
  ["thiet-bi-bao-ho", "thiết bị bảo hộ", "giá website PPE an toàn"],
  ["dien-luc", "điện lực", "giá website công ty điện"],
  ["che-bien-go", "chế biến gỗ", "giá website xưởng gỗ"],
  ["thu-gom-rac", "thu gom rác", "giá website môi trường"],
  ["duong-lao", "dưỡng lão", "giá website chăm sóc người già"],
  ["than-kinh", "thần kinh", "giá website phòng khám thần kinh"],
  ["bep-cong-nghiep", "bếp công nghiệp", "giá website bếp CN"],
  ["thue-container", "thuê container", "giá website thuê container"],
  ["phan-phoi-bia", "phân phối bia", "giá website phân phối bia"],
  ["san-xuat-banh-keo", "sản xuất bánh kẹo", "giá website nhà máy bánh kẹo"],
  ["thiet-bi-nha-khoa", "thiết bị nha khoa", "giá website thiết bị nha khoa"],
  ["thiet-ke-showroom", "thiết kế showroom", "giá website thiết kế showroom"],
  ["day-tieng-han", "dạy tiếng Hàn", "giá website học tiếng Hàn"],
  ["chinh-nha", "chỉnh nha", "giá website chỉnh nha"],
  ["cho-thue-nhan-su", "cho thuê nhân sự", "giá website cung ứng lao động"],
  ["tu-van-dau-gia", "tư vấn đấu giá", "giá website tư vấn đấu thầu"],
  ["tim-mach", "tim mạch", "giá website phòng khám tim mạch"],
  ["tu-van-iso", "tư vấn ISO", "giá website tư vấn chứng nhận ISO"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: Shopee + Lazada ads */
const D_SHOPEE = [
  ["my-pham", "mỹ phẩm", "Shopee ads skincare shop"],
  ["thoi-trang", "thời trang", "Shopee ads fashion"],
  ["dien-thoai", "điện thoại", "Shopee ads phụ kiện điện thoại"],
  ["do-gia-dung", "đồ gia dụng", "Shopee ads gia dụng"],
  ["thuc-pham", "thực phẩm", "Shopee ads thực phẩm"],
  ["do-choi", "đồ chơi", "Shopee ads đồ chơi trẻ em"],
  ["noi-that", "nội thất", "Shopee ads nội thất"],
  ["giay-dep", "giày dép", "Shopee ads giày dép"],
  ["my-pham-han", "mỹ phẩm Hàn", "Shopee ads mỹ phẩm Hàn Quốc"],
  ["phu-kien-thoi-trang", "phụ kiện thời trang", "Shopee ads phụ kiện"],
  ["do-cong-nghe", "đồ công nghệ", "Shopee ads gadget"],
  ["sach", "sách", "Shopee ads nhà sách online"],
  ["do-handmade", "đồ handmade", "Shopee ads thủ công"],
  ["thuc-pham-sach", "thực phẩm sạch", "Shopee ads organic"],
  ["do-the-thao", "đồ thể thao", "Shopee ads thể thao"],
  ["do-be", "đồ bé", "Shopee ads mẹ và bé"],
  ["noi-that-mini", "nội thất mini", "Shopee ads decor"],
  ["my-pham-organic", "mỹ phẩm organic", "Shopee ads mỹ phẩm thiên nhiên"],
].map(([s, k, a]) => shopeeAdsInd(s, k, a));

const D_LAZADA = [
  ["dien-may", "điện máy", "Lazada ads điện máy"],
  ["thoi-trang-nam", "thời trang nam", "Lazada ads fashion nam"],
  ["my-pham", "mỹ phẩm", "Lazada ads mỹ phẩm"],
  ["do-gia-dung", "đồ gia dụng", "Lazada ads gia dụng"],
  ["laptop", "laptop", "Lazada ads máy tính"],
  ["noi-that", "nội thất", "Lazada ads nội thất"],
  ["thuc-pham", "thực phẩm", "Lazada ads FMCG"],
  ["do-choi-tre-em", "đồ chơi trẻ em", "Lazada ads đồ chơi"],
  ["giay-dep", "giày dép", "Lazada ads giày"],
  ["phu-kien", "phụ kiện", "Lazada ads phụ kiện"],
  ["do-cong-nghe", "đồ công nghệ", "Lazada ads tech"],
  ["thiet-bi-nha-bep", "thiết bị nhà bếp", "Lazada ads bếp"],
  ["do-be", "đồ bé", "Lazada ads mẹ bé"],
].map(([s, k, a]) => lazadaAdsInd(s, k, a));

/** E — 30: technical SEO */
const E_TECH_SEO = [
  techSeo("audit-core-web-vitals", "audit core web vitals", "Audit Core Web Vitals Website — LCP INP CLS", "đo CWV và sửa"),
  techSeo("toi-uu-inp-website", "tối ưu INP website", "Tối Ưu INP Website — Giảm Interaction Delay", "INP optimization"),
  techSeo("toi-uu-lcp-website", "tối ưu LCP website", "Tối Ưu LCP Website — Tải Nhanh Hero", "LCP optimization"),
  techSeo("toi-uu-cls-website", "tối ưu CLS website", "Tối Ưu CLS Website — Giảm Layout Shift", "CLS fix"),
  techSeo("crawl-budget-website", "crawl budget website", "Crawl Budget Website — Tối Ưu Bot Google", "crawl budget SEO"),
  techSeo("index-bloat-website", "index bloat website", "Index Bloat Website — Gỡ Trang Mỏng", "index cleanup"),
  techSeo("orphan-page-seo", "orphan page SEO", "Orphan Page SEO — Nối Internal Link", "orphan pages fix"),
  techSeo("pagination-seo-website", "pagination SEO website", "Pagination SEO Website — Trang Danh Mục", "pagination best practice"),
  techSeo("faceted-navigation-seo", "faceted navigation SEO", "Faceted Navigation SEO — Ecommerce Filter", "faceted nav SEO"),
  techSeo("javascript-seo-website", "javascript SEO website", "JavaScript SEO Website — Render & Index", "JS rendering SEO"),
  techSeo("hreflang-website-da-ngon-ngu", "hreflang website đa ngôn ngữ", "Hreflang Website Đa Ngôn Ngữ — Setup Chuẩn", "multilingual hreflang"),
  techSeo("redirect-chain-seo", "redirect chain SEO", "Redirect Chain SEO — Rút Gọn 301", "redirect chain fix"),
  techSeo("soft-404-seo", "soft 404 SEO", "Soft 404 SEO — Sửa Trang Không Nội Dung", "soft 404 fix"),
  techSeo("log-file-analysis-seo", "log file analysis SEO", "Log File Analysis SEO — Đọc Server Log", "log analysis SEO"),
  techSeo("site-migration-seo", "site migration SEO", "Site Migration SEO — Chuyển Domain An Toàn", "migration SEO checklist"),
  techSeo("subdomain-vs-subfolder-seo", "subdomain vs subfolder SEO", "Subdomain Vs Subfolder SEO?", "subdomain SEO"),
  techSeo("trailing-slash-seo", "trailing slash SEO", "Trailing Slash SEO — Chuẩn Hóa URL", "trailing slash canonical"),
  techSeo("www-vs-non-www-seo", "www vs non www SEO", "WWW Vs Non-WWW SEO — Chọn Canonical", "www canonical"),
  techSeo("http-to-https-migration", "http to https migration", "HTTP To HTTPS Migration — Chuyển SSL", "HTTPS migration SEO"),
  techSeo("image-seo-website", "image SEO website", "Image SEO Website — Alt WebP Lazy Load", "image optimization SEO"),
  techSeo("video-seo-website", "video SEO website", "Video SEO Website — Schema VideoObject", "video schema SEO"),
  techSeo("faq-schema-seo", "FAQ schema SEO", "FAQ Schema SEO — Rich Results Câu Hỏi", "FAQ JSON-LD"),
  techSeo("breadcrumb-schema-seo", "breadcrumb schema SEO", "Breadcrumb Schema SEO — Điều Hướng Rich", "breadcrumb JSON-LD"),
  techSeo("local-business-schema", "local business schema", "Local Business Schema — JSON-LD Maps", "LocalBusiness schema"),
  techSeo("product-schema-ecommerce", "product schema ecommerce", "Product Schema Ecommerce — Rich Snippet", "Product JSON-LD"),
  techSeo("review-schema-website", "review schema website", "Review Schema Website — Aggregate Rating", "review schema SEO"),
];

/** F — 25: content marketing */
const F_CONTENT = [
  contentMkt("content-pillar-cluster", "content pillar cluster", "Content Pillar Cluster — Mô Hình SEO", "pillar cluster strategy"),
  contentMkt("editorial-calendar-marketing", "editorial calendar marketing", "Editorial Calendar Marketing 90 Ngày", "content calendar planning"),
  contentMkt("case-study-marketing-b2b", "case study marketing B2B", "Case Study Marketing B2B — Viết Chuẩn", "B2B case study writing"),
  contentMkt("whitepaper-marketing", "whitepaper marketing", "Whitepaper Marketing — Thu Lead B2B", "whitepaper lead gen"),
  contentMkt("ebook-marketing-lead", "ebook marketing lead", "Ebook Marketing Lead Magnet", "ebook lead magnet"),
  contentMkt("infographic-marketing", "infographic marketing", "Infographic Marketing — Viral Content", "infographic design marketing"),
  contentMkt("user-generated-content", "user generated content", "User Generated Content — UGC Marketing", "UGC campaign"),
  contentMkt("storytelling-thuong-hieu", "storytelling thương hiệu", "Storytelling Thương Hiệu — Kể Chuyện Brand", "brand storytelling"),
  contentMkt("thought-leadership-content", "thought leadership content", "Thought Leadership Content B2B", "thought leadership writing"),
  contentMkt("newsletter-marketing", "newsletter marketing", "Newsletter Marketing — Tăng Subscriber", "email newsletter strategy"),
  contentMkt("webinar-marketing", "webinar marketing", "Webinar Marketing — Thu Lead Online", "webinar lead generation"),
  contentMkt("podcast-marketing-doanh-nghiep", "podcast marketing doanh nghiệp", "Podcast Marketing Doanh Nghiệp", "corporate podcast strategy"),
  contentMkt("video-marketing-youtube", "video marketing youtube", "Video Marketing YouTube Cho SME", "YouTube content strategy"),
  contentMkt("short-form-video-marketing", "short form video marketing", "Short Form Video Marketing Reels TikTok", "short video content"),
  contentMkt("livestream-marketing-ban-hang", "livestream marketing bán hàng", "Livestream Marketing Bán Hàng", "live commerce strategy"),
  contentMkt("micro-content-marketing", "micro content marketing", "Micro Content Marketing — Social Snack", "micro content social"),
  contentMkt("repurposing-content", "repurposing content", "Repurposing Content — Tái Sử Dụng Nội Dung", "content repurposing"),
  contentMkt("evergreen-content-seo", "evergreen content SEO", "Evergreen Content SEO — Bài Viết Bền Vững", "evergreen content strategy"),
  contentMkt("seasonal-content-marketing", "seasonal content marketing", "Seasonal Content Marketing — Mùa Vụ", "seasonal campaign content"),
  contentMkt("local-content-marketing", "local content marketing", "Local Content Marketing — SEO Địa Phương", "local content strategy"),
];

/** G — 30: Maps ngành × thành phố batch 4 */
const G_MAPS = [
  ["thuy-san", "phan-thiet", "thủy sản", "Phan Thiết", "Maps nhà máy thủy sản Phan Thiết"],
  ["dong-phuc", "quy-nhon", "đồng phục", "Quy Nhon", "Maps may đồng phục Quy Nhơn"],
  ["ho-hap", "vinh", "hô hấp", "Vinh", "Maps phòng khám hô hấp Vinh"],
  ["phu-san", "ha-long", "phụ sản", "Hạ Long", "Maps phụ sản Hạ Long"],
  ["solar", "cao-bang", "solar", "Cao Bằng", "Maps lắp pin Cao Bằng"],
  ["nong-nghiep", "lang-son", "nông nghiệp", "Lạng Sơn", "Maps thiết bị nông nghiệp Lạng Sơn"],
  ["gach", "bac-lieu", "gạch", "Bạc Liêu", "Maps nhà máy gạch Bạc Liêu"],
  ["spa", "phan-thiet", "spa", "Phan Thiết", "Maps spa Phan Thiết"],
  ["nha-hang", "quy-nhon", "nhà hàng", "Quy Nhon", "Maps nhà hàng Quy Nhơn"],
  ["khach-san", "vinh", "khách sạn", "Vinh", "Maps khách sạn Vinh"],
  ["nha-khoa", "ha-long", "nha khoa", "Hạ Long", "Maps nha khoa Hạ Long"],
  ["gym", "tra-vinh", "gym", "Trà Vinh", "Maps gym Trà Vinh"],
  ["tham-my", "binh-thuan", "thẩm mỹ", "Bình Thuận", "Maps thẩm mỹ Bình Thuận"],
  ["bat-dong-san", "dak-lak", "bất động sản", "Đắk Lắk", "Maps BĐS Đắk Lắk"],
  ["noi-that", "phan-thiet", "nội thất", "Phan Thiết", "Maps nội thất Phan Thiết"],
  ["xay-dung", "quy-nhon", "xây dựng", "Quy Nhon", "Maps nhà thầu Quy Nhơn"],
  ["phong-kham", "vinh", "phòng khám", "Vinh", "Maps phòng khám Vinh"],
  ["du-lich", "ha-long", "du lịch", "Hạ Long", "Maps tour Hạ Long"],
  ["my-pham", "cao-bang", "mỹ phẩm", "Cao Bằng", "Maps shop mỹ phẩm Cao Bằng"],
  ["dien-may", "lang-son", "điện máy", "Lạng Sơn", "Maps điện máy Lạng Sơn"],
  ["o-to", "bac-lieu", "ô tô", "Bạc Liêu", "Maps đại lý xe Bạc Liêu"],
  ["luat-su", "tra-vinh", "luật sư", "Trà Vinh", "Maps văn phòng luật Trà Vinh"],
  ["ke-toan", "binh-thuan", "kế toán", "Bình Thuận", "Maps kế toán Bình Thuận"],
  ["logistics", "dak-lak", "logistics", "Đắk Lắk", "Maps logistics Đắk Lắk"],
  ["anh-ngu", "phan-thiet", "anh ngữ", "Phan Thiết", "Maps anh ngữ Phan Thiết"],
  ["mam-non", "quy-nhon", "mầm non", "Quy Nhon", "Maps mầm non Quy Nhơn"],
  ["quan-cafe", "vinh", "quán cafe", "Vinh", "Maps cafe Vinh"],
  ["tiem-nail", "ha-long", "tiệm nail", "Hạ Long", "Maps nail Hạ Long"],
  ["pet-shop", "cao-bang", "pet shop", "Cao Bằng", "Maps thú cưng Cao Bằng"],
  ["homestay", "dak-lak", "homestay", "Đắk Lắk", "Maps homestay Đắk Lắk"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** H — 30: marketing ngành mới */
const H_MKT = [
  ["nha-may-thuy-san", "nhà máy thủy sản", "marketing xuất khẩu thủy sản"],
  ["xuong-dong-goi", "xưởng đóng gói", "marketing B2B đóng gói"],
  ["cua-hang-dong-phuc", "cửa hàng đồng phục", "marketing đồng phục doanh nghiệp"],
  ["phong-kham-ho-hap", "phòng khám hô hấp", "marketing phòng khám hô hấp"],
  ["dich-vu-lap-dat-solar", "dịch vụ lắp đặt solar", "marketing năng lượng mặt trời"],
  ["xuong-san-xuat-gach", "xưởng sản xuất gạch", "marketing nhà máy gạch B2B"],
  ["trung-tam-day-mc", "trung tâm dạy MC", "marketing học MC"],
  ["cong-ty-dien-luc", "công ty điện lực", "marketing dịch vụ điện"],
  ["trung-tam-ho-tro-nguoi-cao-tuoi", "trung tâm hỗ trợ người cao tuổi", "marketing dưỡng lão"],
  ["phong-kham-than-kinh", "phòng khám thần kinh", "marketing thần kinh"],
  ["cong-ty-phan-phoi-bia", "công ty phân phối bia", "marketing phân phối đồ uống"],
  ["xuong-san-xuat-banh-keo", "xưởng sản xuất bánh kẹo", "marketing FMCG bánh kẹo"],
  ["trung-tam-day-tieng-han", "trung tâm dạy tiếng Hàn", "marketing học tiếng Hàn"],
  ["phong-kham-chinh-nha", "phòng khám chỉnh nha", "marketing chỉnh nha"],
  ["cong-ty-tu-van-dau-gia", "công ty tư vấn đấu giá", "marketing đấu thầu B2G"],
  ["xuong-san-xuat-nhua", "xưởng sản xuất nhựa", "marketing nhựa B2B"],
  ["trung-tam-day-tieng-nhat", "trung tâm dạy tiếng Nhật", "marketing học tiếng Nhật"],
  ["phong-kham-tim-mach", "phòng khám tim mạch", "marketing tim mạch"],
  ["cong-ty-tu-van-fdi", "công ty tư vấn FDI", "marketing tư vấn FDI"],
  ["xuong-san-xuat-giay", "xưởng sản xuất giày", "marketing giày xuất khẩu"],
  ["trung-tam-day-tieng-trung", "trung tâm dạy tiếng Trung", "marketing học tiếng Trung"],
  ["phong-kham-tieu-hoa", "phòng khám tiêu hóa", "marketing tiêu hóa"],
  ["cong-ty-tu-van-esg", "công ty tư vấn ESG", "marketing ESG bền vững"],
  ["xuong-san-xuat-tui-xach", "xưởng sản xuất túi xách", "marketing túi xách OEM"],
  ["trung-tam-day-tieng-phap", "trung tâm dạy tiếng Pháp", "marketing học tiếng Pháp"],
  ["phong-kham-noi-tiet", "phòng khám nội tiết", "marketing nội tiết"],
].map(([s, k, a]) => marketingInd(s, k, a));

/** I — 30: so sánh */
const I_COMPARE = [
  compare("shopee-hay-lazada-ban-hang", "shopee hay lazada bán hàng", "Shopee Hay Lazada Bán Hàng?", "marketplace VN so sánh", "strategy"),
  compare("shopee-ads-hay-facebook-ads", "shopee ads hay facebook ads", "Shopee Ads Hay Facebook Ads?", "ecommerce vs social ads", "strategy"),
  compare("tiktok-shop-hay-lazada", "tiktok shop hay lazada", "TikTok Shop Hay Lazada?", "social commerce vs marketplace", "strategy"),
  compare("woocommerce-hay-magento", "woocommerce hay magento", "WooCommerce Hay Magento?", "ecommerce platform enterprise", "strategy"),
  compare("prestashop-hay-opencart", "prestashop hay opencart", "PrestaShop Hay OpenCart?", "open source ecommerce", "strategy"),
  compare("bigcommerce-hay-shopify", "bigcommerce hay shopify", "BigCommerce Hay Shopify?", "SaaS ecommerce global", "strategy"),
  compare("google-analytics-hay-matomo", "google analytics hay matomo", "Google Analytics Hay Matomo?", "analytics privacy", "analytics"),
  compare("semrush-hay-ahrefs", "semrush hay ahrefs", "Semrush Hay Ahrefs?", "SEO tool so sánh", "seo"),
  compare("surfer-seo-hay-clearscope", "surfer seo hay clearscope", "Surfer SEO Hay Clearscope?", "content optimization tool", "seo"),
  compare("elementor-hay-divi", "elementor hay divi", "Elementor Hay Divi?", "WordPress page builder", "strategy"),
  compare("cloudflare-hay-aws-cdn", "cloudflare hay aws cdn", "Cloudflare Hay AWS CDN?", "CDN performance", "strategy"),
  compare("vercel-hay-netlify", "vercel hay netlify", "Vercel Hay Netlify?", "JAMstack hosting", "strategy"),
  compare("hubspot-hay-salesforce", "hubspot hay salesforce", "HubSpot Hay Salesforce CRM?", "CRM enterprise vs SME", "strategy"),
  compare("activecampaign-hay-mailchimp", "activecampaign hay mailchimp", "ActiveCampaign Hay Mailchimp?", "email automation tool", "strategy"),
  compare("buffer-hay-hootsuite", "buffer hay hootsuite", "Buffer Hay Hootsuite?", "social scheduling tool", "strategy"),
  compare("canva-hay-adobe-express", "canva hay adobe express", "Canva Hay Adobe Express?", "design tool marketing", "strategy"),
  compare("capcut-hay-premiere", "capcut hay premiere", "CapCut Hay Premiere Cho Video Ads?", "video editing tool", "content"),
  compare("google-tag-manager-hay-direct", "google tag manager hay gắn trực tiếp", "GTM Hay Gắn Pixel Trực Tiếp?", "tracking implementation", "analytics"),
  compare("cookie-banner-hay-no-banner", "cookie banner hay không banner", "Cookie Banner Hay Không Banner?", "GDPR consent VN", "strategy"),
  compare("blog-subdomain-hay-subfolder", "blog subdomain hay subfolder", "Blog Subdomain Hay Subfolder?", "blog architecture SEO", "seo"),
  compare("pricing-page-hay-contact-sales", "pricing page hay contact sales", "Pricing Page Hay Contact Sales?", "B2B pricing strategy", "strategy"),
  compare("freemium-hay-trial", "freemium hay trial", "Freemium Hay Free Trial?", "SaaS pricing model", "strategy"),
  compare("in-house-seo-hay-agency-seo", "in-house SEO hay agency SEO", "In-House SEO Hay Agency SEO?", "SEO team structure", "seo"),
  compare("content-writer-hay-ai-writer", "content writer hay AI writer", "Content Writer Hay AI Writer?", "content production", "content"),
];

/** J — 25: pain point */
const J_PAIN = [
  pain("shopee-shop-khong-co-don", "shopee shop không có đơn", "Shopee Shop Không Có Đơn — Tối Ưu Listing", "Shopee conversion fix"),
  pain("lazada-ranking-thap", "lazada ranking thấp", "Lazada Ranking Thấp — Tăng Vị Trí Sản Phẩm", "Lazada SEO fix"),
  pain("website-bi-ddos", "website bị DDoS", "Website Bị DDoS — Phòng Chống Và Khôi Phục", "DDoS protection"),
  pain("google-maps-bi-suspension", "google maps bị suspension", "Google Maps Bị Suspension — Kháng Cáo GBP", "GBP suspension recovery"),
  pain("core-web-vitals-fail", "core web vitals fail", "Core Web Vitals Fail — Sửa LCP INP CLS", "CWV fail fix"),
  pain("sitemap-co-loi-404", "sitemap có lỗi 404", "Sitemap Có Lỗi 404 — Dọn Và Submit Lại", "sitemap 404 cleanup"),
  pain("internal-link-mat", "internal link mất", "Internal Link Mất — Khôi Phục Silo SEO", "broken internal links"),
  pain("duplicate-content-trang-loc", "duplicate content trang lọc", "Duplicate Content Trang Lọc — Canonical", "faceted duplicate fix"),
  pain("google-ads-bi-limited-budget", "google ads bị limited budget", "Google Ads Bị Limited Budget — Mở Rộng", "limited by budget fix"),
  pain("facebook-ads-learning-limited", "facebook ads learning limited", "Facebook Ads Learning Limited — Thoát Phase", "learning limited fix"),
  pain("email-unsubscribe-cao", "email unsubscribe cao", "Email Unsubscribe Cao — Giảm Tỷ Lệ Hủy", "email churn fix"),
  pain("landing-page-load-cham", "landing page load chậm", "Landing Page Load Chậm — Tối Ưu Tốc Độ", "landing speed fix"),
  pain("form-spam-lead", "form spam lead", "Form Spam Lead — Chặn Bot Và Lọc", "form spam protection"),
  pain("website-khong-co-favicon", "website không có favicon", "Website Không Có Favicon — Thêm Brand Icon", "favicon setup"),
  pain("meta-description-trung", "meta description trùng", "Meta Description Trùng — Viết Unique", "duplicate meta desc"),
  pain("h1-trung-nhieu-trang", "H1 trùng nhiều trang", "H1 Trùng Nhiều Trang — Chuẩn Hóa Heading", "duplicate H1 fix"),
  pain("anh-khong-co-webp", "ảnh không có webp", "Ảnh Không Có WebP — Chuyển Định Dạng", "WebP image conversion"),
  pain("blog-khong-co-internal-link", "blog không có internal link", "Blog Không Có Internal Link — Gắn Silo", "blog internal linking"),
  pain("google-search-console-loi", "google search console lỗi", "Google Search Console Lỗi — Sửa Coverage", "GSC error fix"),
  pain("ads-khong-track-conversion", "ads không track conversion", "Ads Không Track Conversion — Setup GTM", "conversion tracking fix"),
  pain("zalo-zns-bi-chan", "zalo ZNS bị chặn", "Zalo ZNS Bị Chặn — Khắc Phục Template", "ZNS template rejection"),
  pain("content-thieu-e-e-a-t", "content thiếu E-E-A-T", "Content Thiếu E-E-A-T — Bổ Sung Chuyên Gia", "E-E-A-T improvement"),
  pain("website-khong-co-404-page", "website không có 404 page", "Website Không Có 404 Page — Thiết Kế", "custom 404 page"),
  pain("mobile-menu-khong-hoat-dong", "mobile menu không hoạt động", "Mobile Menu Không Hoạt Động — Sửa UX", "mobile nav fix"),
  pain("checkout-bi-bo-gio-hang", "checkout bị bỏ giỏ hàng", "Checkout Bị Bỏ Giỏ Hàng — Giảm Cart Abandon", "cart abandonment fix"),
];

/** K — 25: thuật ngữ */
const K_LAGI = [
  laGi("cwv-la-gi", "CWV là gì", "CWV Là Gì? Core Web Vitals SEO", "core web vitals explained"),
  laGi("inp-la-gi", "INP là gì", "INP Là Gì? Interaction To Next Paint", "INP metric explained"),
  laGi("lcp-la-gi", "LCP là gì", "LCP Là Gì? Largest Contentful Paint", "LCP metric explained"),
  laGi("cls-la-gi", "CLS là gì", "CLS Là Gì? Cumulative Layout Shift", "CLS metric explained"),
  laGi("crawl-budget-la-gi", "crawl budget là gì", "Crawl Budget Là Gì?", "Google crawl budget"),
  laGi("index-bloat-la-gi", "index bloat là gì", "Index Bloat Là Gì?", "thin pages index"),
  laGi("orphan-page-la-gi", "orphan page là gì", "Orphan Page Là Gì?", "pages no internal links"),
  laGi("faceted-navigation-la-gi", "faceted navigation là gì", "Faceted Navigation Là Gì?", "filter URL ecommerce"),
  laGi("log-file-analysis-la-gi", "log file analysis là gì", "Log File Analysis Là Gì?", "server log SEO"),
  laGi("site-migration-la-gi", "site migration là gì", "Site Migration Là Gì?", "domain migration SEO"),
  laGi("json-ld-la-gi", "JSON-LD là gì", "JSON-LD Là Gì? Schema Markup", "structured data JSON-LD"),
  laGi("rich-result-la-gi", "rich result là gì", "Rich Result Là Gì? Kết Quả Nổi Bật", "Google rich results"),
  laGi("featured-snippet-la-gi", "featured snippet là gì", "Featured Snippet Là Gì?", "position zero SERP"),
  laGi("people-also-ask-la-gi", "people also ask là gì", "People Also Ask Là Gì?", "PAA box Google"),
  laGi("knowledge-panel-la-gi", "knowledge panel là gì", "Knowledge Panel Là Gì?", "Google knowledge graph"),
  laGi("sitelink-la-gi", "sitelink là gì", "Sitelink Là Gì? Liên Kết Mở Rộng", "Google sitelinks"),
  laGi("breadcrumb-la-gi-seo", "breadcrumb là gì SEO", "Breadcrumb Là Gì Trong SEO?", "breadcrumb navigation SEO"),
  laGi("pagination-la-gi-seo", "pagination là gì SEO", "Pagination Là Gì Trong SEO?", "paginated pages SEO"),
  laGi("soft-404-la-gi", "soft 404 là gì", "Soft 404 Là Gì?", "soft 404 error"),
  laGi("redirect-chain-la-gi", "redirect chain là gì", "Redirect Chain Là Gì?", "301 redirect chain"),
  laGi("ugc-la-gi-marketing", "UGC là gì marketing", "UGC Là Gì Trong Marketing?", "user generated content"),
  laGi("d2c-la-gi", "D2C là gì", "D2C Là Gì? Bán Hàng Trực Tiếp", "direct to consumer"),
  laGi("omnichannel-retail-la-gi", "omnichannel retail là gì", "Omnichannel Retail Là Gì?", "bán lẻ đa kênh"),
];

/** L — 10: agency / dịch vụ */
const L_AGENCY = [
  agency("agency-shopee-ads-viet-nam", "agency shopee ads việt nam", "Agency Shopee Ads Việt Nam Uy Tín", "quản lý Shopee ads"),
  agency("agency-lazada-ads", "agency lazada ads", "Agency Lazada Ads — Tối Ưu Shop", "Lazada ads management"),
  agency("agency-technical-seo", "agency technical SEO", "Agency Technical SEO Chuyên Sâu", "technical SEO services"),
  agency("agency-content-marketing", "agency content marketing", "Agency Content Marketing Trọn Gói", "content marketing agency"),
  agency("dich-vu-audit-core-web-vitals", "dịch vụ audit core web vitals", "Dịch Vụ Audit Core Web Vitals", "CWV audit service"),
  agency("dich-vu-migration-ecommerce", "dịch vụ migration ecommerce", "Dịch Vụ Migration Ecommerce An Toàn", "ecommerce platform migration"),
  agency("dich-vu-setup-shopee-shop", "dịch vụ setup shopee shop", "Dịch Vụ Setup Shopee Shop Chuyên Nghiệp", "Shopee shop setup"),
  agency("dich-vu-quan-ly-marketplace", "dịch vụ quản lý marketplace", "Dịch Vụ Quản Lý Marketplace Đa Sàn", "marketplace management"),
  agency("dich-vu-viet-case-study", "dịch vụ viết case study", "Dịch Vụ Viết Case Study B2B", "case study writing service"),
  agency("dich-vu-tu-van-chien-luoc-content", "dịch vụ tư vấn chiến lược content", "Dịch Vụ Tư Vấn Chiến Lược Content", "content strategy consulting"),
];

export const KEYWORDS_500_BATCH4 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_SHOPEE,
  ...D_LAZADA,
  ...E_TECH_SEO,
  ...F_CONTENT,
  ...G_MAPS,
  ...H_MKT,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
  ...L_AGENCY,
];

export const KEYWORDS_500_BATCH4_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
  ...L_AGENCY.map((e) => e.slug),
  ...E_TECH_SEO.map((e) => e.slug),
  ...F_CONTENT.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH4.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH4 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH4.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH4.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH4.length) {
  const dupes = KEYWORDS_500_BATCH4.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH4 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH4.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH4.length) {
  const dupes = KEYWORDS_500_BATCH4.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH4 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
