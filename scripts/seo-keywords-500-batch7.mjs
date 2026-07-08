/**
 * 500 từ khóa long-tail batch 7 — LinkedIn/B2B ads, CRO, CRM, Miền Trung/Nam đô thị mới.
 * Export: KEYWORDS_500_BATCH7
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

function linkedinAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-linkedin-${slug}`,
    keywordsMain: `quảng cáo linkedin ${kw}`,
    h1: `Quảng Cáo LinkedIn ${cap(kw)} — B2B Lead Gen`,
    angle,
    niche: "strategy",
  };
}

function cro(slug, kw, angle) {
  return {
    slug: `toi-uu-chuyen-doi-${slug}`,
    keywordsMain: `tối ưu chuyển đổi ${kw}`,
    h1: `Tối Ưu Chuyển Đổi ${cap(kw)} — CRO Thực Chiến`,
    angle,
    niche: "strategy",
  };
}

function crm(slug, kw, angle) {
  return {
    slug: `crm-${slug}`,
    keywordsMain: `crm ${kw}`,
    h1: `CRM ${cap(kw)} — Quản Lý Khách Hàng Hiệu Quả`,
    angle,
    niche: "strategy",
  };
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

/** A — 200 */
const INDUSTRIES_B7 = [
  ["xuong-goi-carton", "xưởng gói carton", "website xưởng carton đóng gói B2B"],
  ["phan-phoi-gia-vi", "phân phối gia vị", "website phân phối gia vị FMCG"],
  ["thiet-bi-massage", "thiết bị massage", "website bán thiết bị massage spa"],
  ["thiet-ke-branding", "thiết kế branding", "website studio thiết kế nhận diện thương hiệu"],
  ["day-cat-toc", "dạy cắt tóc", "website học nghề cắt tóc barber"],
  ["tri-quang-mat", "trị quầng mắt", "website spa trị quầng mắt thẩm mỹ"],
  ["cho-thue-may-chieu", "cho thuê máy chiếu", "website thuê máy chiếu sự kiện hội thảo"],
  ["phan-phoi-do-uong", "phân phối đồ uống", "website phân phối đồ uống B2B"],
  ["xuong-mut-xop", "xưởng mút xốp", "website nhà máy mút xốp đệm lò xo"],
  ["thiet-bi-nang-luong", "thiết bị năng lượng", "website thiết bị năng lượng mặt trời"],
  ["day-piano", "dạy piano", "website học piano chuyên nghiệp"],
  ["tri-than-tiet-nieu", "trị thận tiết niệu", "website phòng khám tiết niệu nam khoa"],
  ["lap-am-thanh", "lắp âm thanh", "website lắp hệ thống âm thanh hội trường"],
  ["thiet-bi-camping", "thiết bị camping", "website đồ camping outdoor"],
  ["tu-van-dau-tu-bds", "tư vấn đầu tư BĐS", "website tư vấn đầu tư bất động sản"],
  ["day-violin", "dạy violin", "website học violin cổ điển"],
  ["tri-seo-lo", "trị sẹo lõ", "website phòng khám trị sẹo lõ thẩm mỹ"],
  ["showroom-cua-cuon", "showroom cửa cuốn", "website cửa cuốn tự động cao cấp"],
  ["thiet-ke-menu-fb", "thiết kế menu FB", "website thiết kế menu Facebook nhà hàng"],
  ["trung-tam-day-clipper", "trung tâm dạy clipper", "website học cắt tóc clipper nam"],
];

const CITIES_B7 = [
  ["quang-ngai", "Quảng Ngãi"],
  ["phu-yen", "Phú Yên"],
  ["ninh-thuan", "Ninh Thuận"],
  ["thu-dau-mot", "Thủ Dầu Một"],
  ["tan-an", "Tân An"],
  ["my-tho", "Mỹ Tho"],
  ["vinh-long", "Vĩnh Long"],
  ["ninh-kieu", "Ninh Kiều"],
  ["chau-doc", "Châu Đốc"],
  ["long-xuyen", "Long Xuyên"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B7) {
  for (const [citySlug, city] of CITIES_B7) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50 */
const B_EXTRA_WEB = [
  ["xuong-san-xuat-bao-bi", "xưởng sản xuất bao bì", "website xưởng bao bì giấy Kraft"],
  ["cong-ty-phan-phoi-sauce", "công ty phân phối sauce", "website phân phối tương ớt sauce"],
  ["cua-hang-ghe-massage", "cửa hàng ghế massage", "website bán ghế massage cao cấp"],
  ["studio-thiet-ke-logo", "studio thiết kế logo", "website thiết kế logo thương hiệu"],
  ["trung-tam-day-barber", "trung tâm dạy barber", "website học barber chuyên nghiệp"],
  ["phong-kham-tri-tham-mat", "phòng khám trị thâm mắt", "website trị thâm quầng mắt"],
  ["cho-thue-man-chieu", "cho thuê màn chiếu", "website thuê màn chiếu LED sự kiện"],
  ["phan-phoi-tra-sua", "phân phối trà sữa", "website phân phối nguyên liệu trà sữa"],
  ["xuong-san-xuat-goi-xop", "xưởng sản xuất gói xốp", "website xưởng gói xốp bảo vệ hàng"],
  ["cua-hang-pin-mat-troi", "cửa hàng pin mặt trời", "website pin lưu trữ năng lượng"],
  ["trung-tam-am-nhac-piano", "trung tâm âm nhạc piano", "website học piano trẻ em"],
  ["phong-kham-tiet-nieu-nam", "phòng khám tiết niệu nam", "website phòng khám tiết niệu"],
  ["dich-vu-lap-loa-hoi-truong", "dịch vụ lắp loa hội trường", "website lắp loa PA hội trường"],
  ["cua-hang-do-tre-em-camp", "cửa hàng đồ trẻ em camp", "website đồ camping gia đình"],
  ["cong-ty-moi-gioi-dau-tu", "công ty môi giới đầu tư", "website môi giới đầu tư BĐS"],
  ["trung-tam-day-nhac-cu", "trung tâm dạy nhạc cụ", "website học violin và cello"],
  ["phong-kham-tri-seo-ranh", "phòng khám trị sẹo rạch", "website trị sẹo phẫu thuật"],
  ["showroom-cua-nhom", "showroom cửa nhôm", "website cửa nhôm Xingfa cao cấp"],
  ["dich-vu-thiet-ke-menu-online", "dịch vụ thiết kế menu online", "website thiết kế menu QR digital"],
  ["trung-tam-hoc-cat-toc-nu", "trung tâm học cắt tóc nữ", "website học cắt tóc nữ salon"],
  ["xuong-in-offset", "xưởng in offset", "website xưởng in offset catalogue"],
  ["cong-ty-phan-phoi-mam", "công ty phân phối mắm", "website phân phối mắm nêm gia vị"],
  ["cua-hang-may-massage", "cửa hàng máy massage", "website máy massage chân tay"],
  ["agency-thiet-ke-nhan-hang", "agency thiết kế nhãn hàng", "website agency branding FMCG"],
  ["day-noi-toc-chuyen-nghiep", "dạy nối tóc chuyên nghiệp", "website học nối tóc keratin"],
  ["phong-kham-mat-tham-my", "phòng khám mắt thẩm mỹ", "website phẫu thuật mí mắt"],
  ["cho-thue-beam-projector", "cho thuê beam projector", "website thuê máy chiếu văn phòng"],
  ["phan-phoi-sinh-to", "phân phối sinh tố", "website phân phối bột sinh tố mix"],
  ["xuong-san-xuat-goi-bong", "xưởng sản xuất gối bông", "website xưởng gối bông OEM"],
  ["cua-hang-inverter", "cửa hàng inverter", "website inverter hybrid solar"],
  ["trung-tam-piano-classic", "trung tâm piano classic", "website piano cổ điển certificate"],
  ["phong-kham-than-kinh-tiet", "phòng khám thận kinh tiết", "website điều trị bàng quang"],
  ["lap-dat-am-thanh-bar", "lắp đặt âm thanh bar", "website lắp loa bar lounge"],
  ["cua-hang-leu-camp", "cửa hàng lều camp", "website lều cắm trại glamping"],
  ["tu-van-dau-tu-can-ho", "tư vấn đầu tư căn hộ", "website tư vấn cho thuê căn hộ"],
  ["day-dan-violin-tre-em", "dạy đàn violin trẻ em", "website violin trẻ em sớm"],
  ["phong-kham-laser-seo", "phòng khám laser sẹo", "website laser trị sẹo lõ"],
  ["showroom-cua-cuon-tu-dong", "showroom cửa cuốn tự động", "website cửa cuốn Austdoor"],
  ["thiet-ke-menu-grab-shopee", "thiết kế menu Grab Shopee", "website thiết kế menu food delivery"],
  ["trung-tam-day-fade", "trung tâm dạy fade", "website học fade tóc nam"],
  ["xuong-san-xuat-hop-giay", "xưởng sản xuất hộp giấy", "website hộp giấy in offset"],
  ["cong-ty-phan-phoi-nuoc-mam", "công ty phân phối nước mắm", "website phân phối nước mắm Phú Quốc"],
  ["cua-hang-gu-massage", "cửa hàng gụ massage", "website gụ massage Shiatsu"],
  ["studio-branding-startup", "studio branding startup", "website branding startup tech"],
  ["day-uon-toc-chuyen-nghiep", "dạy uốn tóc chuyên nghiệp", "website học uốn tóc salon"],
  ["phong-kham-tri-quang-mat-laser", "phòng khám trị quầng mắt laser", "website laser trị quầng mắt"],
  ["cho-thue-man-led", "cho thuê màn LED", "website thuê màn LED sân khấu"],
  ["phan-phoi-ca-phe-hoa-tan", "phân phối cà phê hòa tan", "website phân phối cà phê B2B"],
  ["xuong-san-xuat-nem-lo-xo", "xưởng sản xuất nệm lò xo", "website xưởng nệm lò xo OEM"],
  ["trung-tam-day-ukulele", "trung tâm dạy ukulele", "website học ukulele trẻ em"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40 */
const C_PRICING = [
  ["xuong-goi-carton", "xưởng gói carton", "giá website xưởng carton"],
  ["phan-phoi-gia-vi", "phân phối gia vị", "giá website phân phối gia vị"],
  ["thiet-bi-massage", "thiết bị massage", "giá website thiết bị massage"],
  ["thiet-ke-branding", "thiết kế branding", "giá website thiết kế branding"],
  ["day-cat-toc", "dạy cắt tóc", "giá website học cắt tóc"],
  ["tri-quang-mat", "trị quầng mắt", "giá website trị quầng mắt"],
  ["cho-thue-may-chieu", "cho thuê máy chiếu", "giá website thuê máy chiếu"],
  ["phan-phoi-do-uong", "phân phối đồ uống", "giá website phân phối đồ uống"],
  ["xuong-mut-xop", "xưởng mút xốp", "giá website xưởng mút xốp"],
  ["thiet-bi-nang-luong", "thiết bị năng lượng", "giá website thiết bị năng lượng"],
  ["day-piano", "dạy piano", "giá website học piano"],
  ["tri-than-tiet-nieu", "trị thận tiết niệu", "giá website phòng tiết niệu"],
  ["lap-am-thanh", "lắp âm thanh", "giá website lắp âm thanh"],
  ["thiet-bi-camping", "thiết bị camping", "giá website đồ camping"],
  ["tu-van-dau-tu-bds", "tư vấn đầu tư BĐS", "giá website tư vấn đầu tư BĐS"],
  ["day-violin", "dạy violin", "giá website học violin"],
  ["tri-seo-lo", "trị sẹo lõ", "giá website trị sẹo lõ"],
  ["showroom-cua-cuon", "showroom cửa cuốn", "giá website cửa cuốn"],
  ["thiet-ke-menu-fb", "thiết kế menu FB", "giá website thiết kế menu FB"],
  ["trung-tam-day-clipper", "trung tâm dạy clipper", "giá website học clipper"],
  ["bao-bi-in-offset", "bao bì in offset", "giá website xưởng bao bì in offset"],
  ["phan-phoi-sauce", "phân phối sauce", "giá website phân phối sauce"],
  ["ghe-massage", "ghế massage", "giá website ghế massage"],
  ["thiet-ke-logo", "thiết kế logo", "giá website thiết kế logo"],
  ["day-barber", "dạy barber", "giá website học barber"],
  ["tri-tham-mat", "trị thâm mắt", "giá website trị thâm mắt"],
  ["man-chieu", "màn chiếu", "giá website thuê màn chiếu"],
  ["phan-phoi-tra-sua", "phân phối trà sữa", "giá website phân phối trà sữa"],
  ["goi-xop", "gói xốp", "giá website xưởng gói xốp"],
  ["pin-mat-troi", "pin mặt trời", "giá website pin mặt trời"],
  ["am-nhac-piano", "âm nhạc piano", "giá website học piano trẻ em"],
  ["tiet-nieu-nam", "tiết niệu nam", "giá website phòng tiết niệu nam"],
  ["loa-hoi-truong", "loa hội trường", "giá website lắp loa hội trường"],
  ["do-camp-tre-em", "đồ camp trẻ em", "giá website đồ camping trẻ em"],
  ["moi-gioi-dau-tu", "môi giới đầu tư", "giá website môi giới đầu tư"],
  ["day-nhac-cu", "dạy nhạc cụ", "giá website học nhạc cụ"],
  ["tri-seo-ranh", "trị sẹo rạch", "giá website trị sẹo rạch"],
  ["cua-nhom", "cửa nhôm", "giá website cửa nhôm"],
  ["menu-online", "menu online", "giá website thiết kế menu online"],
  ["hoc-cat-toc-nu", "học cắt tóc nữ", "giá website học cắt tóc nữ"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: LinkedIn Ads */
const D_LINKEDIN = [
  ["phan-mem-saas", "phần mềm SaaS", "LinkedIn ads SaaS B2B lead gen"],
  ["dich-vu-b2b", "dịch vụ B2B", "LinkedIn ads dịch vụ doanh nghiệp"],
  ["tu-van-quan-tri", "tư vấn quản trị", "LinkedIn ads tư vấn quản trị"],
  ["logistics", "logistics", "LinkedIn ads logistics B2B"],
  ["xay-dung", "xây dựng", "LinkedIn ads nhà thầu B2B"],
  ["bat-dong-san", "bất động sản", "LinkedIn ads BĐS đầu tư"],
  ["ke-toan", "kế toán", "LinkedIn ads dịch vụ kế toán"],
  ["luat-su", "luật sư", "LinkedIn ads văn phòng luật"],
  ["tuyen-dung", "tuyển dụng", "LinkedIn ads employer branding"],
  ["dao-tao-doanh-nghiep", "đào tạo doanh nghiệp", "LinkedIn ads corporate training"],
  ["cong-nghe-ai", "công nghệ AI", "LinkedIn ads AI solution B2B"],
  ["cybersecurity", "cybersecurity", "LinkedIn ads bảo mật doanh nghiệp"],
  ["cloud-computing", "cloud computing", "LinkedIn ads cloud migration"],
  ["erp", "ERP", "LinkedIn ads phần mềm ERP"],
  ["crm-phan-mem", "CRM phần mềm", "LinkedIn ads CRM software"],
  ["marketing-automation", "marketing automation", "LinkedIn ads MarTech B2B"],
  ["hr-tech", "HR tech", "LinkedIn ads HR software"],
  ["fintech", "fintech", "LinkedIn ads fintech B2B"],
  ["insurtech", "insurtech", "LinkedIn ads bảo hiểm doanh nghiệp"],
  ["consulting", "consulting", "LinkedIn ads management consulting"],
  ["export-import", "export import", "LinkedIn ads xuất nhập khẩu"],
  ["san-xuat", "sản xuất", "LinkedIn ads nhà máy B2B"],
  ["nang-luong-xanh", "năng lượng xanh", "LinkedIn ads năng lượng tái tạo"],
  ["thiet-bi-y-te", "thiết bị y tế", "LinkedIn ads thiết bị y tế B2B"],
  ["giao-duc-dai-hoc", "giáo dục đại học", "LinkedIn ads trường đại học"],
  ["khoa-hoc-executive", "khóa học executive", "LinkedIn ads MBA executive"],
  ["event-b2b", "event B2B", "LinkedIn ads hội thảo B2B"],
  ["coworking", "coworking", "LinkedIn ads không gian làm việc"],
  ["kho-bai", "kho bãi", "LinkedIn ads kho logistics"],
  ["noi-that-van-phong", "nội thất văn phòng", "LinkedIn ads nội thất VP B2B"],
  ["in-an-b2b", "in ấn B2B", "LinkedIn ads in offset B2B"],
  ["cleaning-b2b", "cleaning B2B", "LinkedIn ads vệ sinh công nghiệp"],
  ["bao-hiem-doanh-nghiep", "bảo hiểm doanh nghiệp", "LinkedIn ads bảo hiểm B2B"],
  ["thiet-ke-noi-that-b2b", "thiết kế nội thất B2B", "LinkedIn ads thiết kế VP"],
  ["dich-vu-it-outsourcing", "dịch vụ IT outsourcing", "LinkedIn ads IT outsource"],
].map(([s, k, a]) => linkedinAdsInd(s, k, a));

/** E — 30: CRO */
const E_CRO = [
  ["landing-page", "landing page", "CRO landing page chạy ads"],
  ["trang-chu", "trang chủ", "CRO homepage tăng lead"],
  ["form-dang-ky", "form đăng ký", "CRO form thu lead"],
  ["checkout", "checkout", "CRO checkout ecommerce"],
  ["product-page", "product page", "CRO trang sản phẩm"],
  ["pricing-page", "pricing page", "CRO trang bảng giá SaaS"],
  ["thank-you-page", "thank you page", "CRO trang cảm ơn upsell"],
  ["cta-button", "CTA button", "CRO nút kêu gọi hành động"],
  ["mobile-ux", "mobile UX", "CRO trải nghiệm mobile"],
  ["speed-website", "speed website", "CRO tốc độ tải trang"],
  ["ab-testing", "A/B testing", "CRO thử nghiệm A/B"],
  ["heatmap", "heatmap", "CRO phân tích heatmap"],
  ["session-recording", "session recording", "CRO ghi hình hành vi"],
  ["funnel-b2b", "funnel B2B", "CRO funnel B2B lead"],
  ["funnel-ecommerce", "funnel ecommerce", "CRO funnel mua hàng"],
  ["lead-magnet-page", "lead magnet page", "CRO trang thu email"],
  ["webinar-registration", "webinar registration", "CRO đăng ký webinar"],
  ["demo-request", "demo request", "CRO form yêu cầu demo"],
  ["contact-page", "contact page", "CRO trang liên hệ"],
  ["service-page", "service page", "CRO trang dịch vụ"],
  ["blog-cta", "blog CTA", "CRO CTA trong bài blog"],
  ["popup-conversion", "popup conversion", "CRO popup thu lead"],
  ["sticky-bar", "sticky bar", "CRO sticky bar mobile"],
  ["social-proof", "social proof", "CRO bổ sung social proof"],
  ["trust-badge", "trust badge", "CRO badge uy tín checkout"],
  ["video-sales", "video sales", "CRO video bán hàng landing"],
  ["multi-step-form", "multi step form", "CRO form nhiều bước"],
  ["cart-recovery", "cart recovery", "CRO giỏ hàng bỏ dở"],
  ["onboarding-flow", "onboarding flow", "CRO onboarding SaaS"],
  ["exit-intent", "exit intent", "CRO exit intent popup"],
].map(([s, k, a]) => cro(s, k, a));

/** F — 25: CRM */
const F_CRM = [
  ["spa", "spa", "CRM spa quản lý khách hàng"],
  ["nha-hang", "nhà hàng", "CRM nhà hàng loyalty"],
  ["bat-dong-san", "bất động sản", "CRM BĐS pipeline lead"],
  ["xay-dung", "xây dựng", "CRM nhà thầu theo dõi dự án"],
  ["logistics", "logistics", "CRM logistics B2B"],
  ["phan-mem-saas", "phần mềm SaaS", "CRM SaaS customer success"],
  ["luat-su", "luật sư", "CRM văn phòng luật hồ sơ"],
  ["ke-toan", "kế toán", "CRM dịch vụ kế toán client"],
  ["gym", "gym", "CRM phòng gym membership"],
  ["nha-khoa", "nha khoa", "CRM nha khoa lịch tái khám"],
  ["du-lich", "du lịch", "CRM tour du lịch khách hàng"],
  ["ecommerce", "ecommerce", "CRM shop online RFM"],
  ["khoa-hoc", "khóa học", "CRM trung tâm đào tạo"],
  ["noi-that", "nội thất", "CRM nội thất báo giá"],
  ["tham-my", "thẩm mỹ", "CRM thẩm mỹ viện liệu trình"],
  ["o-to", "ô tô", "CRM đại lý xe pipeline"],
  ["event", "sự kiện", "CRM tổ chức sự kiện sponsor"],
  ["coworking", "coworking", "CRM coworking membership"],
  ["franchise", "franchise", "CRM nhượng quyền lead"],
  ["agency-marketing", "agency marketing", "CRM agency quản lý client"],
  ["xnk", "XNK", "CRM xuất nhập khẩu đối tác"],
  ["san-xuat", "sản xuất", "CRM nhà máy đơn hàng B2B"],
  ["phong-kham", "phòng khám", "CRM phòng khám bệnh án"],
  ["anh-ngu", "anh ngữ", "CRM trung tâm anh ngữ học viên"],
  ["b2b-distribution", "B2B distribution", "CRM phân phối đại lý"],
].map(([s, k, a]) => crm(s, k, a));

/** G — 30: Maps */
const G_MAPS = [
  ["spa", "quang-ngai", "spa", "Quảng Ngãi", "Maps spa Quảng Ngãi"],
  ["nha-hang", "phu-yen", "nhà hàng", "Phú Yên", "Maps nhà hàng Phú Yên"],
  ["khach-san", "ninh-thuan", "khách sạn", "Ninh Thuận", "Maps khách sạn Ninh Thuận"],
  ["nha-khoa", "thu-dau-mot", "nha khoa", "Thủ Dầu Một", "Maps nha khoa Thủ Dầu Một"],
  ["gym", "tan-an", "gym", "Tân An", "Maps gym Tân An"],
  ["tham-my", "my-tho", "thẩm mỹ", "Mỹ Tho", "Maps thẩm mỹ Mỹ Tho"],
  ["bat-dong-san", "vinh-long", "bất động sản", "Vĩnh Long", "Maps BĐS Vĩnh Long"],
  ["noi-that", "ninh-kieu", "nội thất", "Ninh Kiều", "Maps nội thất Ninh Kiều"],
  ["xay-dung", "chau-doc", "xây dựng", "Châu Đốc", "Maps nhà thầu Châu Đốc"],
  ["phong-kham", "long-xuyen", "phòng khám", "Long Xuyên", "Maps phòng khám Long Xuyên"],
  ["du-lich", "quang-ngai", "du lịch", "Quảng Ngãi", "Maps tour Quảng Ngãi"],
  ["my-pham", "phu-yen", "mỹ phẩm", "Phú Yên", "Maps mỹ phẩm Phú Yên"],
  ["dien-may", "ninh-thuan", "điện máy", "Ninh Thuận", "Maps điện máy Ninh Thuận"],
  ["o-to", "thu-dau-mot", "ô tô", "Thủ Dầu Một", "Maps đại lý xe Thủ Dầu Một"],
  ["luat-su", "tan-an", "luật sư", "Tân An", "Maps văn phòng luật Tân An"],
  ["ke-toan", "my-tho", "kế toán", "Mỹ Tho", "Maps kế toán Mỹ Tho"],
  ["logistics", "vinh-long", "logistics", "Vĩnh Long", "Maps logistics Vĩnh Long"],
  ["anh-ngu", "ninh-kieu", "anh ngữ", "Ninh Kiều", "Maps anh ngữ Ninh Kiều"],
  ["mam-non", "chau-doc", "mầm non", "Châu Đốc", "Maps mầm non Châu Đốc"],
  ["quan-cafe", "long-xuyen", "quán cafe", "Long Xuyên", "Maps cafe Long Xuyên"],
  ["tiem-nail", "quang-ngai", "tiệm nail", "Quảng Ngãi", "Maps nail Quảng Ngãi"],
  ["barber", "phu-yen", "barber", "Phú Yên", "Maps barber Phú Yên"],
  ["showroom-oto", "ninh-thuan", "showroom ô tô", "Ninh Thuận", "Maps showroom ô tô Ninh Thuận"],
  ["tri-mun", "thu-dau-mot", "trị mụn", "Thủ Dầu Một", "Maps trị mụn Thủ Dầu Một"],
  ["smart-home", "tan-an", "smart home", "Tân An", "Maps smart home Tân An"],
  ["day-piano", "my-tho", "dạy piano", "Mỹ Tho", "Maps học piano Mỹ Tho"],
  ["lap-am-thanh", "vinh-long", "lắp âm thanh", "Vĩnh Long", "Maps lắp âm thanh Vĩnh Long"],
  ["cua-cuon", "ninh-kieu", "cửa cuốn", "Ninh Kiều", "Maps cửa cuốn Ninh Kiều"],
  ["camping", "chau-doc", "camping", "Châu Đốc", "Maps đồ camping Châu Đốc"],
  ["tu-van-bds", "long-xuyen", "tư vấn BĐS", "Long Xuyên", "Maps tư vấn BĐS Long Xuyên"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** H — 25: so sánh */
const I_COMPARE = [
  compare("linkedin-ads-hay-facebook-ads-b2b", "linkedin ads hay facebook ads B2B", "LinkedIn Ads Hay Facebook Ads B2B?", "B2B paid social platform", "strategy"),
  compare("linkedin-lead-gen-hay-conversation", "linkedin lead gen hay conversation", "LinkedIn Lead Gen Hay Conversation Ads?", "LinkedIn ad format B2B", "strategy"),
  compare("linkedin-sponsor-hay-message-ads", "linkedin sponsor hay message ads", "LinkedIn Sponsor Hay Message Ads?", "LinkedIn sponsored content", "strategy"),
  compare("hubspot-hay-salesforce-crm", "hubspot hay salesforce CRM", "HubSpot Hay Salesforce CRM?", "CRM enterprise vs SME", "strategy"),
  compare("zoho-crm-hay-pipedrive", "zoho CRM hay pipedrive", "Zoho CRM Hay Pipedrive?", "CRM pipeline SME", "strategy"),
  compare("hotjar-hay-clarity-session", "hotjar hay clarity session", "Hotjar Hay Clarity Session Recording?", "CRO heatmap tool", "strategy"),
  compare("optimizely-hay-vwo", "optimizely hay VWO", "Optimizely Hay VWO?", "A/B testing platform", "strategy"),
  compare("landing-page-hay-homepage-ads", "landing page hay homepage ads", "Landing Page Hay Homepage Chạy Ads?", "ads destination page", "strategy"),
  compare("multi-step-form-hay-single-step", "multi step form hay single step", "Multi-Step Form Hay Single-Step?", "form CRO conversion", "strategy"),
  compare("sticky-cta-hay-floating-button", "sticky CTA hay floating button", "Sticky CTA Hay Floating Button?", "mobile CTA pattern", "strategy"),
  compare("popup-hay-slide-in", "popup hay slide in", "Popup Hay Slide-In Thu Lead?", "lead capture widget", "strategy"),
  compare("chatbot-hay-live-chat", "chatbot hay live chat", "Chatbot Hay Live Chat?", "website support conversion", "strategy"),
  compare("crm-hay-excel-lead", "CRM hay excel lead", "CRM Hay Excel Quản Lý Lead?", "CRM adoption SME", "strategy"),
  compare("marketing-automation-hay-crm", "marketing automation hay CRM", "Marketing Automation Hay CRM?", "MarTech stack B2B", "strategy"),
  compare("inbound-hay-outbound-b2b", "inbound hay outbound B2B", "Inbound Hay Outbound B2B?", "B2B lead generation strategy", "strategy"),
  compare("mql-hay-sql", "MQL hay SQL", "MQL Hay SQL?", "lead qualification B2B", "strategy"),
  compare("account-based-hay-lead-gen", "account based hay lead gen", "Account-Based Hay Lead Gen?", "B2B targeting strategy", "strategy"),
  compare("demo-request-hay-free-trial", "demo request hay free trial", "Demo Request Hay Free Trial?", "SaaS conversion path", "strategy"),
  compare("case-study-hay-whitepaper", "case study hay whitepaper", "Case Study Hay Whitepaper?", "B2B content conversion", "content"),
  compare("retargeting-hay-lookalike-b2b", "retargeting hay lookalike B2B", "Retargeting Hay Lookalike B2B?", "B2B audience targeting", "strategy"),
  compare("ga4-hay-mixpanel", "GA4 hay mixpanel", "GA4 Hay Mixpanel?", "product analytics CRO", "analytics"),
  compare("unbounce-hay-webflow-landing", "unbounce hay webflow landing", "Unbounce Hay Webflow Landing?", "landing page builder", "strategy"),
  compare("lead-scoring-hay-manual-qualify", "lead scoring hay manual qualify", "Lead Scoring Hay Manual Qualify?", "B2B lead qualification", "strategy"),
  compare("pipeline-hay-kanban-crm", "pipeline hay kanban CRM", "Pipeline Hay Kanban CRM?", "CRM deal management", "strategy"),
  compare("linkedin-organic-hay-paid-b2b", "linkedin organic hay paid B2B", "LinkedIn Organic Hay Paid B2B?", "LinkedIn channel mix", "strategy"),
];

/** I — 25: pain */
const J_PAIN = [
  pain("linkedin-ads-chi-cao-khong-lead", "linkedin ads chi cao không lead", "LinkedIn Ads Chi Cao Không Lead — Tối Ưu", "LinkedIn high CPL fix"),
  pain("linkedin-ctr-thap-b2b", "linkedin CTR thấp B2B", "LinkedIn CTR Thấp B2B — Cải Thiện Creative", "LinkedIn low CTR fix"),
  pain("landing-page-khong-convert", "landing page không convert", "Landing Page Không Convert — Audit CRO", "landing no conversion"),
  pain("form-qua-dai-bo-form", "form quá dài bỏ form", "Form Quá Dài Bỏ Form — Rút Gọn Field", "long form abandonment"),
  pain("mobile-landing-cham", "mobile landing chậm", "Mobile Landing Chậm — Tối Ưu LCP", "mobile landing speed"),
  pain("checkout-bo-gio-hang", "checkout bỏ giỏ hàng", "Checkout Bỏ Giỏ Hàng — Giảm Friction", "checkout abandonment fix"),
  pain("crm-khong-ai-dung", "CRM không ai dùng", "CRM Không Ai Dùng — Adoption Fix", "CRM low adoption"),
  pain("crm-data-trung-lap", "CRM data trùng lặp", "CRM Data Trùng Lặp — Làm Sạch", "CRM duplicate records"),
  pain("lead-roi-khong-follow-up", "lead rơi không follow up", "Lead Rơi Không Follow Up — Quy Trình", "lead follow-up gap"),
  pain("pipeline-khong-ro-stage", "pipeline không rõ stage", "Pipeline Không Rõ Stage — Chuẩn Hóa", "CRM pipeline unclear"),
  pain("website-khong-co-tracking", "website không có tracking", "Website Không Có Tracking — Setup GA4", "analytics tracking missing"),
  pain("ab-test-khong-du-mau", "A/B test không đủ mẫu", "A/B Test Không Đủ Mẫu — Tính Sample", "AB test sample size"),
  pain("cta-khong-noi-bat", "CTA không nổi bật", "CTA Không Nổi Bật — Thiết Kế Lại", "weak CTA design"),
  pain("social-proof-thieu", "social proof thiếu", "Social Proof Thiếu — Bổ Sung Proof", "missing social proof"),
  pain("pricing-khong-ro-gia-tri", "pricing không rõ giá trị", "Pricing Không Rõ Giá Trị — Viết Lại", "pricing value unclear"),
  pain("demo-form-khong-ai-goi", "demo form không ai gọi", "Demo Form Không Ai Gọi — SLA Fix", "demo request no callback"),
  pain("mql-khong-chuyen-sql", "MQL không chuyển SQL", "MQL Không Chuyển SQL — Qualify Lại", "MQL to SQL gap"),
  pain("retargeting-khong-hieu-qua", "retargeting không hiệu quả", "Retargeting Không Hiệu Quả — Segment Lại", "retargeting poor ROI"),
  pain("linkedin-profile-khong-chuyen-doi", "linkedin profile không chuyển đổi", "LinkedIn Profile Không Chuyển Đổi — Tối Ưu", "LinkedIn company page fix"),
  pain("crm-khong-tich-hop-email", "CRM không tích hợp email", "CRM Không Tích Hợp Email — Kết Nối", "CRM email integration missing"),
  pain("heatmap-khong-co-insight", "heatmap không có insight", "Heatmap Không Có Insight — Phân Tích", "heatmap no actionable insight"),
  pain("thank-you-page-lang-phi", "thank you page lãng phí", "Thank You Page Lãng Phí — Upsell", "thank you page missed opportunity"),
  pain("blog-khong-thu-lead", "blog không thu lead", "Blog Không Thu Lead — Thêm CTA", "blog no lead capture"),
  pain("b2b-funnel-roi-le", "B2B funnel rời rạc", "B2B Funnel Rời Rạc — Ghép Kênh", "disconnected B2B funnel"),
  pain("crm-bao-cao-khong-chinh-xac", "CRM báo cáo không chính xác", "CRM Báo Cáo Không Chính Xác — Audit Data", "CRM reporting inaccurate"),
];

/** J — 20: thuật ngữ */
const K_LAGI = [
  laGi("linkedin-lead-gen-la-gi", "LinkedIn Lead Gen là gì", "LinkedIn Lead Gen Là Gì?", "LinkedIn lead gen ads"),
  laGi("conversation-ads-la-gi", "Conversation Ads là gì", "Conversation Ads Là Gì? LinkedIn", "LinkedIn conversation ads"),
  laGi("message-ads-la-gi", "Message Ads là gì", "Message Ads Là Gì? LinkedIn InMail", "LinkedIn message ads"),
  laGi("cro-la-gi", "CRO là gì", "CRO Là Gì? Tối Ưu Chuyển Đổi", "conversion rate optimization"),
  laGi("conversion-rate-website-la-gi", "conversion rate website là gì", "Conversion Rate Website Là Gì?", "website conversion rate"),
  laGi("ab-testing-la-gi", "A/B testing là gì", "A/B Testing Là Gì? Thử Nghiệm CRO", "AB testing CRO"),
  laGi("heatmap-la-gi-cro", "heatmap là gì CRO", "Heatmap Là Gì Trong CRO?", "CRO heatmap analysis"),
  laGi("funnel-la-gi-marketing", "funnel là gì marketing", "Funnel Là Gì Trong Marketing?", "marketing sales funnel"),
  laGi("mql-marketing-la-gi", "MQL marketing là gì", "MQL Marketing Là Gì? Lead Tiềm Năng", "MQL definition B2B"),
  laGi("sql-la-gi-b2b", "SQL là gì B2B", "SQL Là Gì? Sales Qualified Lead", "SQL definition B2B"),
  laGi("lead-scoring-la-gi", "lead scoring là gì", "Lead Scoring Là Gì?", "B2B lead scoring"),
  laGi("pipeline-la-gi-crm", "pipeline là gì CRM", "Pipeline Là Gì Trong CRM?", "CRM sales pipeline"),
  laGi("crm-phan-mem-la-gi", "CRM phần mềm là gì", "CRM Phần Mềm Là Gì? Quản Lý Khách Hàng", "CRM definition"),
  laGi("marketing-automation-huong-dan-la-gi", "marketing automation hướng dẫn là gì", "Marketing Automation Hướng Dẫn Là Gì?", "marketing automation platform"),
  laGi("account-based-marketing-la-gi", "account based marketing là gì", "Account-Based Marketing Là Gì?", "ABM B2B strategy"),
  laGi("touchpoint-la-gi", "touchpoint là gì", "Touchpoint Là Gì? Hành Trình Khách", "customer journey touchpoint"),
  laGi("churn-rate-la-gi", "churn rate là gì", "Churn Rate Là Gì?", "customer churn rate"),
  laGi("customer-lifetime-value-la-gi", "customer lifetime value là gì", "Customer Lifetime Value Là Gì?", "CLV LTV definition"),
  laGi("exit-intent-la-gi", "exit intent là gì", "Exit Intent Là Gì? Popup CRO", "exit intent popup"),
  laGi("social-proof-la-gi-cro", "social proof là gì CRO", "Social Proof Là Gì Trong CRO?", "social proof conversion"),
];

/** K — 20: agency */
const L_AGENCY = [
  agency("agency-linkedin-ads-viet-nam", "agency linkedin ads việt nam", "Agency LinkedIn Ads Việt Nam Uy Tín", "LinkedIn ads management"),
  agency("agency-cro-website", "agency CRO website", "Agency CRO Website Tối Ưu Chuyển Đổi", "CRO agency service"),
  agency("agency-crm-implementation", "agency CRM implementation", "Agency CRM Implementation Trọn Gói", "CRM setup agency"),
  agency("dich-vu-chay-linkedin-ads", "dịch vụ chạy linkedin ads", "Dịch Vụ Chạy LinkedIn Ads B2B", "LinkedIn campaign management"),
  agency("dich-vu-audit-cro", "dịch vụ audit CRO", "Dịch Vụ Audit CRO Website", "CRO audit service"),
  agency("dich-vu-setup-hubspot-crm", "dịch vụ setup hubspot CRM", "Dịch Vụ Setup HubSpot CRM", "HubSpot CRM implementation"),
  agency("dich-vu-setup-zoho-crm", "dịch vụ setup zoho CRM", "Dịch Vụ Setup Zoho CRM", "Zoho CRM setup"),
  agency("dich-vu-thiet-ke-landing-cro", "dịch vụ thiết kế landing CRO", "Dịch Vụ Thiết Kế Landing Page CRO", "CRO landing page design"),
  agency("dich-vu-ab-testing", "dịch vụ A/B testing", "Dịch Vụ A/B Testing Website", "AB testing service"),
  agency("dich-vu-tu-van-funnel-b2b", "dịch vụ tư vấn funnel B2B", "Dịch Vụ Tư Vấn Funnel B2B", "B2B funnel consulting"),
  agency("dich-vu-viet-linkedin-content", "dịch vụ viết linkedin content", "Dịch Vụ Viết LinkedIn Content B2B", "LinkedIn content writing"),
  agency("dich-vu-lead-scoring-setup", "dịch vụ lead scoring setup", "Dịch Vụ Setup Lead Scoring", "lead scoring implementation"),
  agency("dich-vu-crm-migration", "dịch vụ CRM migration", "Dịch Vụ Migration CRM", "CRM data migration"),
  agency("dich-vu-tu-van-mar-tech", "dịch vụ tư vấn MarTech", "Dịch Vụ Tư Vấn MarTech Stack", "MarTech consulting"),
  agency("dich-vu-tu-van-abm", "dịch vụ tư vấn ABM", "Dịch Vụ Tư Vấn Account-Based Marketing", "ABM strategy consulting"),
  agency("dich-vu-heatmap-analysis", "dịch vụ heatmap analysis", "Dịch Vụ Phân Tích Heatmap CRO", "heatmap analysis service"),
  agency("dich-vu-tu-van-pipeline-crm", "dịch vụ tư vấn pipeline CRM", "Dịch Vụ Tư Vấn Pipeline CRM", "CRM pipeline consulting"),
  agency("dich-vu-dao-tao-crm", "dịch vụ đào tạo CRM", "Dịch Vụ Đào Tạo CRM Cho Team Sales", "CRM training service"),
  agency("dich-vu-tu-van-linkedin-ads", "dịch vụ tư vấn linkedin ads", "Dịch Vụ Tư Vấn Chiến Lược LinkedIn Ads", "LinkedIn ads strategy"),
  agency("dich-vu-tich-hop-crm-marketing", "dịch vụ tích hợp CRM marketing", "Dịch Vụ Tích Hợp CRM & Marketing Automation", "CRM marketing integration"),
];

export const KEYWORDS_500_BATCH7 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_LINKEDIN,
  ...E_CRO,
  ...F_CRM,
  ...G_MAPS,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
  ...L_AGENCY,
];

export const KEYWORDS_500_BATCH7_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
  ...L_AGENCY.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH7.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH7 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH7.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH7.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH7.length) {
  const dupes = KEYWORDS_500_BATCH7.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH7 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH7.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH7.length) {
  const dupes = KEYWORDS_500_BATCH7.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH7 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
