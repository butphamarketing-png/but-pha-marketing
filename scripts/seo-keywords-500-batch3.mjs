/**
 * 500 từ khóa long-tail batch 3 — ngành mới, địa phương mở rộng, TikTok/Zalo, AI marketing, automation.
 * Export: KEYWORDS_500_BATCH3
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

function tiktokAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-tiktok-${slug}`,
    keywordsMain: `quảng cáo tiktok ${kw}`,
    h1: `Quảng Cáo TikTok ${cap(kw)} — Thu Khách Gen Z`,
    angle,
    niche: "strategy",
  };
}

function zaloAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-zalo-${slug}`,
    keywordsMain: `quảng cáo zalo ${kw}`,
    h1: `Quảng Cáo Zalo ${cap(kw)} — Tiếp Cận Khách Việt`,
    angle,
    niche: "strategy",
  };
}

function aiMkt(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "ai-marketing" };
}

function automation(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
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

/** A — 200: ngành chuyên sâu × 10 thành phố mới */
const INDUSTRIES_B3 = [
  ["pccc", "PCCC", "website công ty phòng cháy chữa cháy"],
  ["co-khi", "cơ khí", "website xưởng cơ khí CNC"],
  ["bao-bi", "bao bì", "website công ty in bao bì"],
  ["thang-may", "thang máy", "website lắp đặt thang máy"],
  ["tu-dong-hoa", "tự động hóa", "website công ty tự động hóa"],
  ["kiem-toan", "kiểm toán", "website công ty kiểm toán"],
  ["dich-vu-visa", "dịch vụ visa", "website tư vấn visa du lịch"],
  ["tri-lieu-tam-ly", "trị liệu tâm lý", "website trung tâm tâm lý"],
  ["phong-kham-chuyen-khoa", "phòng khám chuyên khoa", "website phòng khám chuyên khoa"],
  ["dien-mat-troi", "điện mặt trời", "website lắp đặt năng lượng mặt trời"],
  ["sua-may-tinh", "sửa máy tính", "website dịch vụ IT onsite"],
  ["lam-dep-nam", "làm đẹp nam", "website barber grooming nam"],
  ["studio-pilates", "studio pilates", "website pilates reformer"],
  ["trai-cay-nhap-khau", "trái cây nhập khẩu", "website shop trái cây cao cấp"],
  ["thuc-pham-sach", "thực phẩm sạch", "website thực phẩm organic"],
  ["che-bien-thuc-pham", "chế biến thực phẩm", "website nhà máy thực phẩm"],
  ["phan-bon", "phân bón", "website công ty phân bón nông nghiệp"],
  ["vat-tu-nong-nghiep", "vật tư nông nghiệp", "website đại lý nông nghiệp"],
  ["trung-tam-hoc-tap", "trung tâm học tập", "website trung tâm gia sư"],
  ["in-billboard", "in billboard", "website công ty quảng cáo ngoài trời"],
];

const CITIES_B3 = [
  ["bien-hoa", "Biên Hòa"],
  ["thuan-an", "Thuận An"],
  ["di-an", "Dĩ An"],
  ["hai-duong", "Hải Dương"],
  ["nam-dinh", "Nam Định"],
  ["thai-nguyen", "Thái Nguyên"],
  ["vinh-phuc", "Vĩnh Phúc"],
  ["tay-ninh", "Tây Ninh"],
  ["kien-giang", "Kiên Giang"],
  ["buon-ma-thuot", "Buôn Ma Thuột"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B3) {
  for (const [citySlug, city] of CITIES_B3) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50: website ngành mới */
const B_EXTRA_WEB = [
  ["cong-ty-kiem-dinh", "công ty kiểm định", "website kiểm định chất lượng B2B"],
  ["xuong-go-noi-that", "xưởng gỗ nội thất", "website xưởng mộc nội thất"],
  ["van-phong-luat", "văn phòng luật", "website luật sư chuyên nghiệp"],
  ["cua-hang-camera", "cửa hàng camera", "website bán camera an ninh"],
  ["dich-vu-cua-cuon", "dịch vụ cửa cuốn", "website lắp cửa cuốn"],
  ["trung-tam-luyen-thi", "trung tâm luyện thi", "website luyện thi đại học"],
  ["studio-chup-couple", "studio chụp couple", "website studio ảnh couple"],
  ["quan-com-tiep-vien", "quán cơm tiệp viên", "website quán cơm văn phòng"],
  ["cua-hang-do-dung-be", "cửa hàng đồ dùng bé", "website shop mẹ và bé"],
  ["trung-tam-robot", "trung tâm robot", "website học robotics STEM"],
  ["phong-kham-da-lieu", "phòng khám da liễu", "website da liễu đặt lịch"],
  ["cua-hang-den-led", "cửa hàng đèn LED", "website bán đèn chiếu sáng"],
  ["dich-vu-thiet-ke-logo", "dịch vụ thiết kế logo", "website studio branding"],
  ["cua-hang-van-phong-pham", "cửa hàng văn phòng phẩm", "website VPP B2B"],
  ["xuong-may-cong-ty", "xưởng may công ty", "website xưởng may đồng phục"],
  ["cong-ty-ve-sinh-cong-nghiep", "công ty vệ sinh công nghiệp", "website vệ sinh nhà máy"],
  ["dich-vu-cho-thue-may-photocopy", "dịch vụ cho thuê máy photocopy", "website thuê máy in"],
  ["cua-hang-thiet-bi-bep", "cửa hàng thiết bị bếp", "website bán thiết bị bếp"],
  ["trung-tam-huong-nghiep", "trung tâm hướng nghiệp", "website tư vấn hướng nghiệp"],
  ["phong-kham-tai-mui-hong", "phòng khám tai mũi họng", "website TMH đặt khám"],
  ["cua-hang-do-cu", "cửa hàng đồ cũ", "website mua bán đồ cũ"],
  ["dich-vu-thu-mua-phe-lieu", "dịch vụ thu mua phế liệu", "website thu mua phế liệu"],
  ["xuong-in-offset", "xưởng in offset", "website xưởng in offset B2B"],
  ["cong-ty-tu-van-dau-tu", "công ty tư vấn đầu tư", "website tư vấn tài chính"],
  ["cua-hang-thiet-bi-spa", "cửa hàng thiết bị spa", "website bán thiết bị spa"],
  ["dich-vu-cho-thue-xe", "dịch vụ cho thuê xe", "website thuê xe tự lái"],
  ["trung-tam-day-dan", "trung tâm dạy đàn", "website học nhạc cụ"],
  ["phong-kham-nha-khoa-tre-em", "phòng khám nha khoa trẻ em", "website nha khoa trẻ em"],
  ["cua-hang-do-the-thao", "cửa hàng đồ thể thao", "website shop đồ thể thao"],
  ["dich-vu-lap-dat-mang-lan", "dịch vụ lắp đặt mạng LAN", "website IT mạng doanh nghiệp"],
  ["cong-ty-thiet-ke-kien-truc", "công ty thiết kế kiến trúc", "website kiến trúc sư portfolio"],
  ["xuong-san-xuat-noi-that", "xưởng sản xuất nội thất", "website xưởng nội thất B2B"],
  ["cua-hang-thiet-bi-ve-sinh", "cửa hàng thiết bị vệ sinh", "website bán thiết bị vệ sinh"],
  ["dich-vu-ve-sinh-may-giat", "dịch vụ vệ sinh máy giặt", "website vệ sinh máy giặt"],
  ["trung-tam-day-lap-trinh", "trung tâm dạy lập trình", "website bootcamp lập trình"],
  ["phong-kham-vat-ly-tri-lieu", "phòng khám vật lý trị liệu", "website VLTL phục hồi chức năng"],
  ["cua-hang-do-handmade", "cửa hàng đồ handmade", "website shop thủ công"],
  ["dich-vu-thiet-ke-catalog", "dịch vụ thiết kế catalog", "website catalog sản phẩm PDF"],
  ["xuong-che-tao-co-khi", "xưởng chế tạo cơ khí", "website gia công cơ khí chính xác"],
  ["cong-ty-tu-van-moi-truong", "công ty tư vấn môi trường", "website tư vấn môi trường"],
  ["cua-hang-thiet-bi-an-ninh", "cửa hàng thiết bị an ninh", "website bán thiết bị an ninh"],
  ["dich-vu-cho-thue-van-phong", "dịch vụ cho thuê văn phòng", "website cho thuê VP ảo"],
  ["trung-tam-day-hat", "trung tâm dạy hát", "website học thanh nhạc"],
  ["phong-kham-nam-khoa", "phòng khám nam khoa", "website nam khoa bảo mật"],
  ["cua-hang-do-nu", "cửa hàng đồ nữ", "website fashion nữ online"],
  ["dich-vu-thiet-ke-bao-bi", "dịch vụ thiết kế bao bì", "website thiết kế packaging"],
  ["xuong-san-xuat-go", "xưởng sản xuất gỗ", "website xưởng gỗ xuất khẩu"],
  ["cong-ty-tu-van-thue", "công ty tư vấn thuế", "website tư vấn thuế doanh nghiệp"],
  ["cua-hang-thiet-bi-nha-bep", "cửa hàng thiết bị nhà bếp", "website bán đồ gia dụng"],
  ["dich-vu-cho-thue-may-chieu", "dịch vụ cho thuê máy chiếu", "website thuê máy chiếu sự kiện"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40: báo giá ngành mới */
const C_PRICING = [
  ["pccc", "PCCC", "giá website công ty PCCC"],
  ["co-khi", "cơ khí", "giá website xưởng cơ khí"],
  ["bao-bi", "bao bì", "giá website in bao bì"],
  ["thang-may", "thang máy", "giá website thang máy"],
  ["tu-dong-hoa", "tự động hóa", "giá website tự động hóa"],
  ["kiem-toan", "kiểm toán", "giá website kiểm toán"],
  ["visa", "visa", "giá website tư vấn visa"],
  ["tam-ly", "tâm lý", "giá website trị liệu tâm lý"],
  ["dien-mat-troi", "điện mặt trời", "giá website năng lượng mặt trời"],
  ["sua-may-tinh", "sửa máy tính", "giá website dịch vụ IT"],
  ["pilates", "pilates", "giá website studio pilates"],
  ["trai-cay", "trái cây", "giá website shop trái cây"],
  ["thuc-pham-sach", "thực phẩm sạch", "giá website thực phẩm organic"],
  ["phan-bon", "phân bón", "giá website phân bón"],
  ["gia-su", "gia sư", "giá website trung tâm gia sư"],
  ["billboard", "billboard", "giá website quảng cáo ngoài trời"],
  ["kiem-dinh", "kiểm định", "giá website kiểm định"],
  ["camera", "camera", "giá website bán camera"],
  ["cua-cuon", "cửa cuốn", "giá website cửa cuốn"],
  ["luyen-thi", "luyện thi", "giá website luyện thi"],
  ["me-va-be", "mẹ và bé", "giá website shop mẹ bé"],
  ["robotics", "robotics", "giá website học robot"],
  ["da-lieu", "da liễu", "giá website phòng khám da liễu"],
  ["den-led", "đèn LED", "giá website bán đèn LED"],
  ["logo", "logo", "giá website thiết kế logo"],
  ["dong-phuc", "đồng phục", "giá website xưởng may đồng phục"],
  ["ve-sinh-cn", "vệ sinh công nghiệp", "giá website vệ sinh nhà máy"],
  ["thiet-bi-bep", "thiết bị bếp", "giá website thiết bị bếp"],
  ["huong-nghiep", "hướng nghiệp", "giá website tư vấn hướng nghiệp"],
  ["tai-mui-hong", "tai mũi họng", "giá website phòng khám TMH"],
  ["phe-lieu", "phế liệu", "giá website thu mua phế liệu"],
  ["in-offset", "in offset", "giá website xưởng in offset"],
  ["tu-van-dau-tu", "tư vấn đầu tư", "giá website tư vấn tài chính"],
  ["thiet-bi-spa", "thiết bị spa", "giá website bán thiết bị spa"],
  ["cho-thue-xe", "cho thuê xe", "giá website thuê xe"],
  ["day-dan", "dạy đàn", "giá website trường nhạc"],
  ["nha-khoa-tre-em", "nha khoa trẻ em", "giá website nha khoa trẻ"],
  ["lap-trinh", "lập trình", "giá website bootcamp code"],
  ["vat-ly-tri-lieu", "vật lý trị liệu", "giá website VLTL"],
  ["tu-van-thue", "tư vấn thuế", "giá website tư vấn thuế"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: TikTok + Zalo ads */
const D_TIKTOK = [
  ["shop-thoi-trang", "shop thời trang", "TikTok ads fashion ecommerce"],
  ["my-pham", "mỹ phẩm", "TikTok ads skincare"],
  ["fnb", "F&B", "TikTok ads nhà hàng quán ăn"],
  ["spa", "spa", "TikTok ads spa làm đẹp"],
  ["gym", "gym", "TikTok ads phòng gym"],
  ["khoa-hoc-online", "khóa học online", "TikTok ads elearning"],
  ["du-lich", "du lịch", "TikTok ads tour du lịch"],
  ["bat-dong-san", "bất động sản", "TikTok ads BĐS lead"],
  ["dien-thoai", "điện thoại", "TikTok ads shop điện thoại"],
  ["do-choi-tre-em", "đồ chơi trẻ em", "TikTok ads đồ chơi"],
  ["noi-that", "nội thất", "TikTok ads nội thất"],
  ["thuc-pham", "thực phẩm", "TikTok ads thực phẩm"],
  ["thoi-trang-nam", "thời trang nam", "TikTok ads fashion nam"],
  ["phu-kien", "phụ kiện", "TikTok ads phụ kiện thời trang"],
  ["nong-san", "nông sản", "TikTok ads nông sản sạch"],
  ["dich-vu-sua-chua", "dịch vụ sửa chữa", "TikTok ads dịch vụ local"],
  ["game-mobile", "game mobile", "TikTok ads game UA"],
  ["app-fitness", "app fitness", "TikTok ads app sức khỏe"],
].map(([s, k, a]) => tiktokAdsInd(s, k, a));

const D_ZALO = [
  ["spa", "spa", "Zalo ads spa đặt lịch"],
  ["nha-hang", "nhà hàng", "Zalo ads nhà hàng"],
  ["bat-dong-san", "bất động sản", "Zalo ads BĐS"],
  ["giao-duc", "giáo dục", "Zalo ads trung tâm học"],
  ["y-te", "y tế", "Zalo ads phòng khám"],
  ["noi-that", "nội thất", "Zalo ads nội thất"],
  ["xay-dung", "xây dựng", "Zalo ads nhà thầu"],
  ["my-pham", "mỹ phẩm", "Zalo ads mỹ phẩm"],
  ["dien-may", "điện máy", "Zalo ads điện máy"],
  ["o-to", "ô tô", "Zalo ads đại lý xe"],
  ["bao-hiem", "bảo hiểm", "Zalo ads bảo hiểm"],
  ["luat-su", "luật sư", "Zalo ads văn phòng luật"],
  ["ke-toan", "kế toán", "Zalo ads dịch vụ kế toán"],
  ["logistics", "logistics", "Zalo ads logistics B2B"],
  ["phan-mem", "phần mềm", "Zalo ads SaaS B2B"],
  ["khoa-hoc", "khóa học", "Zalo ads khóa học online"],
  ["du-lich", "du lịch", "Zalo ads tour du lịch"],
].map(([s, k, a]) => zaloAdsInd(s, k, a));

/** E — 30: AI marketing */
const E_AI = [
  aiMkt("ai-viet-content-seo", "AI viết content SEO", "AI Viết Content SEO — Quy Trình Chuẩn E-E-A-T", "content AI có kiểm duyệt"),
  aiMkt("ai-tao-anh-quang-cao", "AI tạo ảnh quảng cáo", "AI Tạo Ảnh Quảng Cáo Cho Doanh Nghiệp", "creative AI ads"),
  aiMkt("ai-chatbot-tu-van", "AI chatbot tư vấn", "AI Chatbot Tư Vấn Khách Hàng 24/7", "chatbot website Zalo"),
  aiMkt("ai-phan-tich-khach-hang", "AI phân tích khách hàng", "AI Phân Tích Khách Hàng — CDP & Insight", "customer analytics AI"),
  aiMkt("ai-email-marketing", "AI email marketing", "AI Email Marketing — Cá Nhân Hóa Tự Động", "email automation AI"),
  aiMkt("ai-seo-keyword-research", "AI SEO keyword research", "AI SEO Keyword Research — Tìm Từ Khóa", "keyword research AI"),
  aiMkt("ai-viet-meta-description", "AI viết meta description", "AI Viết Meta Description Chuẩn SEO", "on-page AI assist"),
  aiMkt("ai-tao-landing-page", "AI tạo landing page", "AI Tạo Landing Page Chuyển Đổi", "landing builder AI"),
  aiMkt("ai-quan-ly-fanpage", "AI quản lý fanpage", "AI Quản Lý Fanpage — Lên Lịch Content", "social automation AI"),
  aiMkt("ai-phan-hoi-khach-hang", "AI phản hồi khách hàng", "AI Phản Hồi Khách Hàng Tự Động", "customer service AI"),
  aiMkt("ai-tao-video-ngan", "AI tạo video ngắn", "AI Tạo Video Ngắn Cho TikTok Reels", "short video AI"),
  aiMkt("ai-dich-noi-dung-da-ngon-ngu", "AI dịch nội dung đa ngôn ngữ", "AI Dịch Nội Dung Đa Ngôn Ngữ Website", "localization AI"),
  aiMkt("ai-audit-website-seo", "AI audit website SEO", "AI Audit Website SEO — Báo Cáo Tự Động", "SEO audit AI"),
  aiMkt("ai-tao-schema-markup", "AI tạo schema markup", "AI Tạo Schema Markup JSON-LD", "structured data AI"),
  aiMkt("ai-phan-tich-doi-thu", "AI phân tích đối thủ", "AI Phân Tích Đối Thủ Marketing", "competitive intel AI"),
  aiMkt("ai-toi-uu-quang-cao", "AI tối ưu quảng cáo", "AI Tối Ưu Quảng Cáo Google Facebook", "ads optimization AI"),
  aiMkt("ai-tao-kich-ban-video", "AI tạo kịch bản video", "AI Tạo Kịch Bản Video Quảng Cáo", "script writing AI"),
  aiMkt("ai-personalization-website", "AI personalization website", "AI Personalization Website — Gợi Ý Sản Phẩm", "ecommerce personalization"),
  aiMkt("ai-lead-scoring", "AI lead scoring", "AI Lead Scoring — Chấm Điểm Khách Tiềm Năng", "sales AI scoring"),
  aiMkt("ai-tao-bai-dang-social", "AI tạo bài đăng social", "AI Tạo Bài Đăng Social Media", "social content AI"),
  aiMkt("ai-phan-tich-sentiment", "AI phân tích sentiment", "AI Phân Tích Sentiment Review Khách", "reputation AI"),
  aiMkt("ai-tao-faq-website", "AI tạo FAQ website", "AI Tạo FAQ Website Chuẩn SEO", "FAQ schema AI"),
  aiMkt("ai-toi-uu-gia-san-pham", "AI tối ưu giá sản phẩm", "AI Tối Ưu Giá Sản Phẩm Ecommerce", "pricing AI"),
  aiMkt("ai-tao-bao-cao-marketing", "AI tạo báo cáo marketing", "AI Tạo Báo Cáo Marketing Tự Động", "reporting AI"),
  aiMkt("ai-tu-dong-hoa-workflow", "AI tự động hóa workflow", "AI Tự Động Hóa Workflow Marketing", "workflow automation AI"),
  aiMkt("ai-tao-persona-khach-hang", "AI tạo persona khách hàng", "AI Tạo Persona Khách Hàng Chính Xác", "buyer persona AI"),
  aiMkt("ai-toi-uu-google-maps", "AI tối ưu google maps", "AI Tối Ưu Google Maps Profile", "GBP optimization AI"),
  aiMkt("ai-viet-blog-chuan-seo", "AI viết blog chuẩn SEO", "AI Viết Blog Chuẩn SEO Có Kiểm Duyệt", "blog writing AI"),
  aiMkt("ai-tao-chien-luoc-content", "AI tạo chiến lược content", "AI Tạo Chiến Lược Content 90 Ngày", "content strategy AI"),
  aiMkt("ai-marketing-automation", "AI marketing automation", "AI Marketing Automation Cho SME", "full funnel AI automation"),
];

/** F — 25: automation / CRM */
const F_AUTO = [
  automation("marketing-automation-cho-sme", "marketing automation cho SME", "Marketing Automation Cho SME Việt Nam", "automation funnel SME"),
  automation("crm-tich-hop-website", "CRM tích hợp website", "CRM Tích Hợp Website — HubSpot Zoho", "form to CRM sync"),
  automation("zapier-marketing-workflow", "zapier marketing workflow", "Zapier Marketing Workflow Tự Động", "no-code automation"),
  automation("email-drip-campaign", "email drip campaign", "Email Drip Campaign — Nuôi Lead Tự Động", "nurture email sequence"),
  automation("lead-nurturing-automation", "lead nurturing automation", "Lead Nurturing Automation Hiệu Quả", "nurture workflow"),
  automation("sms-zns-automation", "SMS ZNS automation", "SMS ZNS Automation Cho Doanh Nghiệp", "Zalo ZNS SMS auto"),
  automation("chatbot-zalo-oa", "chatbot zalo OA", "Chatbot Zalo OA Tự Động Tư Vấn", "Zalo chatbot"),
  automation("form-to-crm-pipeline", "form to CRM pipeline", "Form To CRM Pipeline Tự Động", "lead pipeline auto"),
  automation("abandoned-cart-email", "abandoned cart email", "Abandoned Cart Email Tự Động", "ecommerce cart recovery"),
  automation("onboarding-email-sequence", "onboarding email sequence", "Onboarding Email Sequence Cho SaaS", "SaaS onboarding"),
  automation("review-request-automation", "review request automation", "Review Request Automation Google Maps", "auto ask review"),
  automation("social-scheduling-tool", "social scheduling tool", "Social Scheduling Tool Lên Lịch Bài", "social media scheduler"),
  automation("utm-tracking-automation", "UTM tracking automation", "UTM Tracking Automation Đo Campaign", "campaign tracking auto"),
  automation("lead-scoring-automation", "lead scoring automation", "Lead Scoring Automation B2B", "score lead auto"),
  automation("webhook-marketing-integration", "webhook marketing integration", "Webhook Marketing Integration API", "API webhook marketing"),
  automation("crm-facebook-lead-ads", "CRM facebook lead ads", "CRM Facebook Lead Ads Tự Động", "Meta lead to CRM"),
  automation("google-ads-conversion-tracking", "google ads conversion tracking", "Google Ads Conversion Tracking Setup", "GTM conversion tracking"),
  automation("remarketing-audience-automation", "remarketing audience automation", "Remarketing Audience Automation", "retargeting lists auto"),
  automation("content-calendar-automation", "content calendar automation", "Content Calendar Automation 30 Ngày", "editorial calendar auto"),
  automation("seo-rank-tracking-automation", "SEO rank tracking automation", "SEO Rank Tracking Automation", "rank monitor auto"),
  automation("invoice-payment-automation", "invoice payment automation", "Invoice Payment Automation Online", "payment workflow auto"),
  automation("appointment-booking-automation", "appointment booking automation", "Appointment Booking Automation Spa Clinic", "booking reminder auto"),
  automation("loyalty-program-automation", "loyalty program automation", "Loyalty Program Automation Tích Điểm", "loyalty points auto"),
  automation("referral-program-automation", "referral program automation", "Referral Program Automation Giới Thiệu", "referral tracking auto"),
  automation("marketing-dashboard-automation", "marketing dashboard automation", "Marketing Dashboard Automation Báo Cáo", "dashboard auto report"),
];

/** G — 30: Maps ngành × thành phố mới */
const G_MAPS = [
  ["pccc", "bien-hoa", "PCCC", "Biên Hòa", "Maps công ty PCCC Biên Hòa"],
  ["co-khi", "thuan-an", "cơ khí", "Thuận An", "Maps xưởng cơ khí Thuận An"],
  ["bao-bi", "di-an", "bao bì", "Dĩ An", "Maps in bao bì Dĩ An"],
  ["thang-may", "hai-duong", "thang máy", "Hải Dương", "Maps thang máy Hải Dương"],
  ["tu-dong-hoa", "nam-dinh", "tự động hóa", "Nam Định", "Maps tự động hóa Nam Định"],
  ["kiem-toan", "thai-nguyen", "kiểm toán", "Thái Nguyên", "Maps kiểm toán Thái Nguyên"],
  ["visa", "vinh-phuc", "visa", "Vĩnh Phúc", "Maps tư vấn visa Vĩnh Phúc"],
  ["tam-ly", "tay-ninh", "tâm lý", "Tây Ninh", "Maps trị liệu tâm lý Tây Ninh"],
  ["dien-mat-troi", "kien-giang", "điện mặt trời", "Kiên Giang", "Maps điện mặt trời Kiên Giang"],
  ["pilates", "buon-ma-thuot", "pilates", "Buôn Ma Thuột", "Maps studio pilates BMT"],
  ["nha-khoa", "bien-hoa", "nha khoa", "Biên Hòa", "Maps nha khoa Biên Hòa"],
  ["spa", "thuan-an", "spa", "Thuận An", "Maps spa Thuận An"],
  ["nha-hang", "di-an", "nhà hàng", "Dĩ An", "Maps nhà hàng Dĩ An"],
  ["gym", "hai-duong", "gym", "Hải Dương", "Maps gym Hải Dương"],
  ["tham-my", "nam-dinh", "thẩm mỹ", "Nam Định", "Maps thẩm mỹ Nam Định"],
  ["bat-dong-san", "thai-nguyen", "bất động sản", "Thái Nguyên", "Maps BĐS Thái Nguyên"],
  ["noi-that", "vinh-phuc", "nội thất", "Vĩnh Phúc", "Maps nội thất Vĩnh Phúc"],
  ["xay-dung", "tay-ninh", "xây dựng", "Tây Ninh", "Maps nhà thầu Tây Ninh"],
  ["phong-kham", "kien-giang", "phòng khám", "Kiên Giang", "Maps phòng khám Kiên Giang"],
  ["du-lich", "buon-ma-thuot", "du lịch", "Buôn Ma Thuột", "Maps tour Buôn Ma Thuột"],
  ["my-pham", "bien-hoa", "mỹ phẩm", "Biên Hòa", "Maps shop mỹ phẩm Biên Hòa"],
  ["dien-may", "thuan-an", "điện máy", "Thuận An", "Maps điện máy Thuận An"],
  ["o-to", "di-an", "ô tô", "Dĩ An", "Maps đại lý xe Dĩ An"],
  ["luat-su", "hai-duong", "luật sư", "Hải Dương", "Maps văn phòng luật Hải Dương"],
  ["ke-toan", "nam-dinh", "kế toán", "Nam Định", "Maps dịch vụ kế toán Nam Định"],
  ["logistics", "thai-nguyen", "logistics", "Thái Nguyên", "Maps logistics Thái Nguyên"],
  ["anh-ngu", "vinh-phuc", "anh ngữ", "Vĩnh Phúc", "Maps trung tâm anh ngữ VP"],
  ["mam-non", "tay-ninh", "mầm non", "Tây Ninh", "Maps trường mầm non Tây Ninh"],
  ["quan-cafe", "kien-giang", "quán cafe", "Kiên Giang", "Maps cafe Kiên Giang"],
  ["tiem-nail", "buon-ma-thuot", "tiệm nail", "Buôn Ma Thuột", "Maps nail Buôn Ma Thuột"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** H — 30: so sánh mới */
const H_COMPARE = [
  compare("tiktok-ads-hay-youtube-shorts", "tiktok ads hay youtube shorts", "TikTok Ads Hay YouTube Shorts?", "short video ads so sánh", "strategy"),
  compare("zalo-hay-facebook-ads", "zalo hay facebook ads", "Zalo Hay Facebook Ads?", "kênh ads Việt Nam", "strategy"),
  compare("ai-content-hay-viet-tay", "AI content hay viết tay", "AI Content Hay Viết Tay?", "chất lượng content AI", "ai-marketing"),
  compare("chatgpt-hay-claude-marketing", "chatgpt hay claude marketing", "ChatGPT Hay Claude Cho Marketing?", "AI tool so sánh", "ai-marketing"),
  compare("hubspot-hay-zoho-crm", "hubspot hay zoho crm", "HubSpot Hay Zoho CRM?", "chọn CRM SME", "strategy"),
  compare("mailchimp-hay-getresponse", "mailchimp hay getresponse", "Mailchimp Hay GetResponse?", "email marketing tool", "strategy"),
  compare("google-ads-hay-tiktok-ads", "google ads hay tiktok ads", "Google Ads Hay TikTok Ads?", "search vs social ads", "google-ads"),
  compare("seo-hay-geo-ai-search", "seo hay GEO AI search", "SEO Hay GEO AI Search?", "tối ưu AI search", "seo"),
  compare("website-nextjs-hay-wordpress", "website nextjs hay wordpress", "Website Next.js Hay WordPress?", "chọn nền tảng web", "strategy"),
  compare("headless-cms-hay-wordpress", "headless CMS hay wordpress", "Headless CMS Hay WordPress?", "kiến trúc website", "strategy"),
  compare("tu-lam-marketing-hay-thue-agency", "tự làm marketing hay thuê agency", "Tự Làm Marketing Hay Thuê Agency?", "in-house vs outsource", "strategy"),
  compare("influencer-micro-hay-macro", "influencer micro hay macro", "Influencer Micro Hay Macro?", "chọn KOL size", "strategy"),
  compare("video-ngan-hay-video-dai", "video ngắn hay video dài", "Video Ngắn Hay Video Dài?", "content video format", "content"),
  compare("podcast-hay-youtube", "podcast hay youtube", "Podcast Hay YouTube?", "audio vs video content", "content"),
  compare("google-analytics-hay-plausible", "google analytics hay plausible", "Google Analytics Hay Plausible?", "web analytics tool", "analytics"),
  compare("hotjar-hay-microsoft-clarity", "hotjar hay microsoft clarity", "Hotjar Hay Microsoft Clarity?", "heatmap tool", "analytics"),
  compare("canva-hay-figma-marketing", "canva hay figma marketing", "Canva Hay Figma Cho Marketing?", "design tool", "strategy"),
  compare("notion-hay-trello-marketing", "notion hay trello marketing", "Notion Hay Trello Cho Marketing?", "project management", "strategy"),
  compare("zapier-hay-make-automation", "zapier hay make automation", "Zapier Hay Make Automation?", "no-code automation", "strategy"),
  compare("shopee-hay-lazada-ban-hang", "shopee hay lazada bán hàng", "Shopee Hay Lazada Bán Hàng?", "marketplace VN", "strategy"),
  compare("tiktok-shop-hay-shopee", "tiktok shop hay shopee", "TikTok Shop Hay Shopee?", "social commerce", "strategy"),
  compare("google-business-hay-facebook-page", "google business hay facebook page", "Google Business Hay Facebook Page?", "local presence", "seo"),
  compare("blog-hay-landing-seo", "blog hay landing SEO", "Blog Hay Landing SEO?", "content architecture", "seo"),
  compare("noi-dung-video-hay-bai-viet", "nội dung video hay bài viết", "Nội Dung Video Hay Bài Viết?", "content mix", "content"),
  compare("ads-tai-viet-nam-hay-quoc-te", "ads tại việt nam hay quốc tế", "Ads Tại Việt Nam Hay Quốc Tế?", "targeting geo", "strategy"),
  compare("freelancer-hay-agency-web", "freelancer hay agency web", "Freelancer Hay Agency Thiết Kế Web?", "chọn đối tác web", "strategy"),
  compare("mau-website-hay-code-tu-dau", "mẫu website hay code từ đầu", "Mẫu Website Hay Code Từ Đầu?", "template vs custom dev", "strategy"),
  compare("seo-onpage-hay-offpage", "seo onpage hay offpage", "SEO Onpage Hay Offpage Trước?", "thứ tự ưu tiên SEO", "seo"),
  compare("content-ai-hay-content-nguoi", "content AI hay content người", "Content AI Hay Content Người Viết?", "E-E-A-T content", "ai-marketing"),
  compare("marketing-b2b-hay-b2c", "marketing B2B hay B2C", "Marketing B2B Hay B2C?", "chiến lược khác biệt", "strategy"),
];

/** I — 25: pain point mới */
const I_PAIN = [
  pain("website-bi-hack-malware", "website bị hack malware", "Website Bị Hack Malware — Khôi Phục Và Bảo Mật", "security malware cleanup"),
  pain("google-ads-chi-phi-cao", "google ads chi phí cao", "Google Ads Chi Phí Cao — Giảm CPC Hiệu Quả", "giảm chi phí ads"),
  pain("tiktok-ads-khong-co-don", "tiktok ads không có đơn", "TikTok Ads Không Có Đơn — Tối Ưu Creative", "TikTok conversion fix"),
  pain("zalo-oa-khong-co-khach", "zalo OA không có khách", "Zalo OA Không Có Khách — Tăng Follower", "Zalo OA growth"),
  pain("ai-content-bi-trung-lap", "AI content bị trùng lặp", "AI Content Bị Trùng Lặp — Viết Lại Unique", "duplicate AI content"),
  pain("crm-data-bi-ro-ri", "CRM data bị rò rỉ", "CRM Data Bị Rò Rỉ — Bảo Mật Dữ Liệu", "data privacy CRM"),
  pain("email-open-rate-thap", "email open rate thấp", "Email Open Rate Thấp — Cải Thiện Subject", "email deliverability"),
  pain("website-toc-do-cham-mobile", "website tốc độ chậm mobile", "Website Tốc Độ Chậm Mobile — Tối Ưu", "mobile page speed"),
  pain("google-maps-bi-anh-huong-xau", "google maps bị ảnh hưởng xấu", "Google Maps Bị Ảnh Hưởng Xấu — Xử Lý", "negative GBP impact"),
  pain("fanpage-bi-report-spam", "fanpage bị report spam", "Fanpage Bị Report Spam — Khôi Phục", "Facebook page recovery"),
  pain("ads-bi-gioi-han-tai-khoan", "ads bị giới hạn tài khoản", "Ads Bị Giới Hạn Tài Khoản — Khắc Phục", "ad account restriction"),
  pain("website-khong-responsive", "website không responsive", "Website Không Responsive — Sửa Mobile UX", "responsive design fix"),
  pain("schema-markup-loi", "schema markup lỗi", "Schema Markup Lỗi — Sửa Rich Results", "JSON-LD error fix"),
  pain("canonical-tag-sai", "canonical tag sai", "Canonical Tag Sai — Sửa Trùng Lặp", "canonical URL fix"),
  pain("robots-txt-chan-google", "robots txt chặn google", "Robots.txt Chặn Google — Kiểm Tra", "robots.txt audit"),
  pain("hreflang-sai-da-ngon-ngu", "hreflang sai đa ngôn ngữ", "Hreflang Sai Đa Ngôn Ngữ — Sửa SEO", "multilingual SEO fix"),
  pain("landing-page-bounce-cao", "landing page bounce cao", "Landing Page Bounce Cao — Giảm Tỷ Lệ Thoát", "reduce bounce rate"),
  pain("form-dang-ky-it-nguoi-dien", "form đăng ký ít người điền", "Form Đăng Ký Ít Người Điền — Tối Ưu UX", "form UX optimization"),
  pain("chatbot-tra-loi-sai", "chatbot trả lời sai", "Chatbot Trả Lời Sai — Cải Thiện AI Bot", "chatbot accuracy fix"),
  pain("marketing-khong-do-duoc-roi", "marketing không đo được ROI", "Marketing Không Đo Được ROI — Setup Tracking", "ROI measurement setup"),
  pain("content-khong-len-top-3-thang", "content không lên top 3 tháng", "Content Không Lên Top 3 Tháng — Audit", "content ranking stagnation"),
  pain("backlink-bi-google-penalty", "backlink bị google penalty", "Backlink Bị Google Penalty — Khôi Phục", "link penalty recovery"),
  pain("website-khong-co-https", "website không có https", "Website Không Có HTTPS — Cài SSL Ngay", "SSL certificate setup"),
  pain("google-ads-quality-score-thap", "google ads quality score thấp", "Google Ads Quality Score Thấp — Tăng Điểm", "improve quality score"),
  pain("social-media-khong-co-lead", "social media không có lead", "Social Media Không Có Lead — Chuyển Đổi", "social to lead conversion"),
];

/** J — 25: thuật ngữ mới */
const J_LAGI = [
  laGi("geo-la-gi", "GEO là gì", "GEO Là Gì? Tối Ưu AI Search Generative Engine", "generative engine optimization"),
  laGi("aeo-la-gi", "AEO là gì", "AEO Là Gì? Answer Engine Optimization", "answer engine optimization"),
  laGi("llmo-la-gi", "LLMO là gì", "LLMO Là Gì? Large Language Model Optimization", "LLM optimization"),
  laGi("zero-click-search-la-gi", "zero click search là gì", "Zero Click Search Là Gì?", "SERP zero click"),
  laGi("entity-seo-la-gi", "entity SEO là gì", "Entity SEO Là Gì? Tối Ưu Thực Thể", "entity based SEO"),
  laGi("topical-authority-la-gi", "topical authority là gì", "Topical Authority Là Gì?", "topical cluster SEO"),
  laGi("content-hub-la-gi", "content hub là gì", "Content Hub Là Gì? Mô Hình Pillar Cluster", "content hub model"),
  laGi("programmatic-seo-la-gi", "programmatic SEO là gì", "Programmatic SEO Là Gì?", "programmatic pages"),
  laGi("capi-la-gi-facebook", "CAPI là gì facebook", "CAPI Là Gì? Conversions API Facebook", "Meta CAPI tracking"),
  laGi("server-side-tracking-la-gi", "server side tracking là gì", "Server Side Tracking Là Gì?", "server GTM tracking"),
  laGi("first-party-data-la-gi", "first party data là gì", "First Party Data Là Gì?", "dữ liệu first party"),
  laGi("cookieless-marketing-la-gi", "cookieless marketing là gì", "Cookieless Marketing Là Gì?", "marketing không cookie"),
  laGi("cdp-la-gi", "CDP là gì", "CDP Là Gì? Customer Data Platform", "customer data platform"),
  laGi("dmp-la-gi", "DMP là gì", "DMP Là Gì? Data Management Platform", "data management platform"),
  laGi("mql-la-gi", "MQL là gì", "MQL Là Gì? Marketing Qualified Lead", "marketing qualified lead"),
  laGi("sql-la-gi-marketing", "SQL là gì marketing", "SQL Là Gì? Sales Qualified Lead", "sales qualified lead"),
  laGi("nurture-sequence-la-gi", "nurture sequence là gì", "Nurture Sequence Là Gì?", "email nurture flow"),
  laGi("attribution-model-la-gi", "attribution model là gì", "Attribution Model Là Gì?", "mô hình gán conversion"),
  laGi("incrementality-la-gi", "incrementality là gì", "Incrementality Là Gì? Đo Tăng Trưởng Thực", "incrementality testing"),
  laGi("brand-safety-la-gi", "brand safety là gì", "Brand Safety Là Gì? Bảo Vệ Thương Hiệu Ads", "brand safety ads"),
  laGi("viewability-la-gi", "viewability là gì", "Viewability Là Gì? Tỷ Lệ Hiển Thị Quảng Cáo", "ad viewability"),
  laGi("frequency-cap-la-gi", "frequency cap là gì", "Frequency Cap Là Gì? Giới Hạn Hiển Thị Ads", "ad frequency cap"),
  laGi("dayparting-la-gi", "dayparting là gì", "Dayparting Là Gì? Chạy Ads Theo Khung Giờ", "ad scheduling"),
  laGi("skan-la-gi", "SKAN là gì", "SKAN Là Gì? Apple SKAdNetwork Tracking", "iOS attribution SKAN"),
  laGi("privacy-sandbox-la-gi", "privacy sandbox là gì", "Privacy Sandbox Là Gì? Cookie Thay Thế", "Google privacy sandbox"),
];

/** K — 10: agency / dịch vụ mới */
const K_AGENCY = [
  agency("agency-tiktok-ads-viet-nam", "agency tiktok ads việt nam", "Agency TikTok Ads Việt Nam Uy Tín", "quản lý TikTok ads"),
  agency("agency-zalo-ads", "agency zalo ads", "Agency Zalo Ads — Quảng Cáo Zalo OA", "Zalo ads management"),
  agency("agency-ai-marketing", "agency AI marketing", "Agency AI Marketing Cho Doanh Nghiệp", "AI marketing services"),
  agency("agency-marketing-automation", "agency marketing automation", "Agency Marketing Automation Trọn Gói", "automation setup"),
  agency("dich-vu-geo-ai-search", "dịch vụ GEO AI search", "Dịch Vụ GEO AI Search Optimization", "tối ưu AI search"),
  agency("dich-vu-audit-website-technical", "dịch vụ audit website technical", "Dịch Vụ Audit Website Technical SEO", "technical audit"),
  agency("dich-vu-migration-wordpress-nextjs", "dịch vụ migration wordpress nextjs", "Dịch Vụ Migration WordPress Sang Next.js", "website migration"),
  agency("dich-vu-tich-hop-payment-gateway", "dịch vụ tích hợp payment gateway", "Dịch Vụ Tích Hợp Payment Gateway", "cổng thanh toán web"),
  agency("dich-vu-setup-google-tag-manager", "dịch vụ setup google tag manager", "Dịch Vụ Setup Google Tag Manager", "GTM implementation"),
  agency("dich-vu-tu-van-chien-luoc-digital", "dịch vụ tư vấn chiến lược digital", "Dịch Vụ Tư Vấn Chiến Lược Digital Marketing", "digital strategy consulting"),
];

export const KEYWORDS_500_BATCH3 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_TIKTOK,
  ...D_ZALO,
  ...E_AI,
  ...F_AUTO,
  ...G_MAPS,
  ...H_COMPARE,
  ...I_PAIN,
  ...J_LAGI,
  ...K_AGENCY,
];

export const KEYWORDS_500_BATCH3_MARKETING_ONLY = new Set([
  ...H_COMPARE.map((e) => e.slug),
  ...I_PAIN.map((e) => e.slug),
  ...J_LAGI.map((e) => e.slug),
  ...K_AGENCY.map((e) => e.slug),
  ...E_AI.map((e) => e.slug),
  ...F_AUTO.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH3.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH3 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH3.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH3.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH3.length) {
  const dupes = KEYWORDS_500_BATCH3.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH3 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH3.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH3.length) {
  const dupes = KEYWORDS_500_BATCH3.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH3 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
