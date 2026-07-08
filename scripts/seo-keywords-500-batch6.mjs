/**
 * 500 từ khóa long-tail batch 6 — YouTube/email marketing, web feature, địa phương biên giới/Tây Bắc.
 * Export: KEYWORDS_500_BATCH6
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

function youtubeAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-youtube-${slug}`,
    keywordsMain: `quảng cáo youtube ${kw}`,
    h1: `Quảng Cáo YouTube ${cap(kw)} — Video Ads Hiệu Quả`,
    angle,
    niche: "google-ads",
  };
}

function emailMktInd(slug, kw, angle) {
  return {
    slug: `email-marketing-${slug}`,
    keywordsMain: `email marketing ${kw}`,
    h1: `Email Marketing ${cap(kw)} — Nuôi Lead Tự Động`,
    angle,
    niche: "strategy",
  };
}

function webFeature(indSlug, featSlug, industry, feature, angle) {
  return {
    slug: `thiet-ke-website-${featSlug}-${indSlug}`,
    keywordsMain: `thiết kế website ${feature} ${industry}`,
    h1: `Thiết Kế Website ${cap(feature)} ${cap(industry)}`,
    angle,
    niche: "strategy",
  };
}

function marketingCity(citySlug, city, angle) {
  return {
    slug: `marketing-doanh-nghiep-${citySlug}`,
    keywordsMain: `marketing doanh nghiệp ${city}`,
    h1: `Marketing Doanh Nghiệp ${city} — Gói Phù Hợp SME`,
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
const INDUSTRIES_B6 = [
  ["xuong-keo", "xưởng kẹo", "website nhà máy sản xuất kẹo"],
  ["phan-phoi-gao", "phân phối gạo", "website phân phối gạo B2B"],
  ["thiet-bi-mo", "thiết bị mỏ", "website thiết bị khai thác mỏ"],
  ["thiet-ke-can-ho", "thiết kế căn hộ", "website studio thiết kế căn hộ"],
  ["day-xam", "dạy xăm", "website học xăm nghệ thuật"],
  ["phong-phau-thuat", "phòng phẫu thuật", "website phẫu thuật thẩm mỹ"],
  ["cua-hang-piano", "cửa hàng piano", "website bán đàn piano"],
  ["thue-vay-dam", "thuê váy dạ hội", "website thuê váy dạ hội"],
  ["phan-phoi-sua", "phân phối sữa", "website phân phối sữa B2B"],
  ["xuong-san-xuat-bia", "xưởng sản xuất bia", "website nhà máy bia craft"],
  ["showroom-nha-tam", "showroom nhà tắm", "website showroom thiết bị vệ sinh"],
  ["thiet-ke-shophouse", "thiết kế shophouse", "website thiết kế shophouse"],
  ["day-lat", "dạy lặt", "website học nghề thủ công"],
  ["ho-tro-sinh-san", "hỗ trợ sinh sản", "website IVF hỗ trợ sinh sản"],
  ["lap-may-nuoc-nong", "lắp máy nước nóng", "website lắp bình nóng lạnh"],
  ["showroom-bep", "showroom bếp", "website showroom bếp cao cấp"],
  ["tu-van-chung-khoan", "tư vấn chứng khoán", "website tư vấn đầu tư chứng khoán"],
  ["day-nhay", "dạy nhảy", "website học nhảy hip-hop"],
  ["tri-mun", "trị mụn", "website phòng khám trị mụn"],
  ["showroom-oto", "showroom ô tô", "website đại lý ô tô showroom"],
];

const CITIES_B6 = [
  ["mong-cai", "Móng Cái"],
  ["ha-giang", "Hà Giang"],
  ["son-la", "Sơn La"],
  ["dien-bien", "Điện Biên"],
  ["lai-chau", "Lai Châu"],
  ["tuyen-quang", "Tuyên Quang"],
  ["bac-kan", "Bắc Kạn"],
  ["phu-tho", "Phú Thọ"],
  ["hung-yen", "Hưng Yên"],
  ["ha-nam", "Hà Nam"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B6) {
  for (const [citySlug, city] of CITIES_B6) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50 */
const B_EXTRA_WEB = [
  ["xuong-san-xuat-mut-xop", "xưởng sản xuất mút xốp", "website nhà máy mút xốp đóng gói"],
  ["cong-ty-xu-ly-rac", "công ty xử lý rác", "website xử lý rác thải công nghiệp"],
  ["cua-hang-ho-boi-mini", "cửa hàng hồ bơi mini", "website bán bể bơi mini"],
  ["dich-vu-thiet-ke-quan-bar", "dịch vụ thiết kế quán bar", "website thiết kế bar lounge"],
  ["trung-tam-day-dj", "trung tâm dạy DJ", "website học DJ sản xuất nhạc"],
  ["phong-kham-tri-seo", "phòng khám trị sẹo", "website trị sẹo thẩm mỹ"],
  ["cho-thue-vay-cuoi", "cho thuê váy cưới", "website thuê váy cưới cao cấp"],
  ["phan-phoi-nuoc-giai-khat", "phân phối nước giải khát", "website phân phối nước ngọt"],
  ["xuong-san-xuat-giay-dep", "xưởng sản xuất giày dép", "website xưởng giày OEM"],
  ["showroom-cua-kinh", "showroom cửa kính", "website cửa nhôm kính"],
  ["thiet-ke-nha-pho", "thiết kế nhà phố", "website kiến trúc nhà phố"],
  ["day-lam-banh", "dạy làm bánh", "website học làm bánh pastry"],
  ["ho-tro-hien-mau", "hỗ trợ hiến máu", "website trung tâm hiến máu"],
  ["lap-dat-may-loc-nuoc", "lắp đặt máy lọc nước", "website lọc nước gia đình"],
  ["showroom-den-trang-tri", "showroom đèn trang trí", "website đèn trang trí nội thất"],
  ["tu-van-bat-dong-san", "tư vấn bất động sản", "website môi giới BĐS tư vấn"],
  ["day-vo-thuat", "dạy võ thuật", "website võ đường truyền thống"],
  ["tri-nam-nam", "trị nám nam", "website spa trị nám nam giới"],
  ["showroom-xe-may", "showroom xe máy", "website đại lý xe máy"],
  ["xuong-san-xuat-goi-carton", "xưởng sản xuất gói carton", "website xưởng carton đóng gói"],
  ["cong-ty-thu-gom-chat-thai", "công ty thu gom chất thải", "website thu gom rác thải"],
  ["cua-hang-sauna", "cửa hàng sauna", "website lắp phòng xông hơi"],
  ["dich-vu-thiet-ke-quan-pub", "dịch vụ thiết kế quán pub", "website thiết kế pub club"],
  ["trung-tam-day-makeup", "trung tâm dạy makeup", "website học makeup chuyên nghiệp"],
  ["phong-kham-tri-lieu-laser", "phòng khám trị liệu laser", "website laser điều trị da"],
  ["cho-thue-trang-phuc-dao-tau", "cho thuê trang phục dạo tàu", "website thuê áo dài"],
  ["phan-phoi-banh-keo", "phân phối bánh kẹo", "website phân phối snack FMCG"],
  ["xuong-san-xuat-noi-that", "xưởng sản xuất nội thất", "website xưởng nội thất gỗ công nghiệp"],
  ["showroom-rem-cua", "showroom rèm cửa", "website rèm cửa cao cấp"],
  ["thiet-ke-biet-thu", "thiết kế biệt thự", "website kiến trúc biệt thự"],
  ["day-pha-che", "dạy pha chế", "website học pha chế barista"],
  ["ho-tro-nguoi-khuyet-tat", "hỗ trợ người khuyết tật", "website dịch vụ xã hội NKT"],
  ["lap-dat-he-thong-bao-trom", "lắp đặt hệ thống báo trộm", "website camera báo trộm"],
  ["showroom-gach-op-lat", "showroom gạch ốp lát", "website gạch men cao cấp"],
  ["tu-van-dau-tu-bat-dong-san", "tư vấn đầu tư bất động sản", "website tư vấn đầu tư BĐS"],
  ["day-boxing", "dạy boxing", "website phòng boxing fitness"],
  ["tri-rung-toc", "trị rụng tóc", "website phòng khám rụng tóc"],
  ["showroom-noi-that-van-phong", "showroom nội thất văn phòng", "website nội thất VP"],
  ["xuong-san-xuat-tui-vai", "xưởng sản xuất túi vải", "website túi vải in logo"],
  ["cong-ty-tu-van-moi-truong-song", "công ty tư vấn môi trường sống", "website tư vấn không gian xanh"],
  ["cua-hang-thiet-bi-camp", "cửa hàng thiết bị camp", "website đồ cắm trại outdoor"],
  ["dich-vu-thiet-ke-nha-hang-fine-dining", "dịch vụ thiết kế nhà hàng fine dining", "website thiết kế nhà hàng cao cấp"],
  ["trung-tam-day-nail", "trung tâm dạy nail", "website học nail chuyên nghiệp"],
  ["phong-kham-tri-lieu-mun", "phòng khám trị liệu mụn", "website trị mụn chuyên sâu"],
  ["cho-thue-thiet-bi-wedding", "cho thuê thiết bị wedding", "website thuê thiết bị cưới"],
  ["phan-phoi-do-uong-healthy", "phân phối đồ uống healthy", "website phân phối nước detox"],
  ["xuong-san-xuat-cua-go", "xưởng sản xuất cửa gỗ", "website xưởng cửa gỗ tự nhiên"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40 */
const C_PRICING = [
  ["xuong-keo", "xưởng kẹo", "giá website nhà máy kẹo"],
  ["phan-phoi-gao", "phân phối gạo", "giá website phân phối gạo"],
  ["thiet-bi-mo", "thiết bị mỏ", "giá website thiết bị mỏ"],
  ["thiet-ke-can-ho", "thiết kế căn hộ", "giá website thiết kế căn hộ"],
  ["day-xam", "dạy xăm", "giá website học xăm"],
  ["phau-thuat", "phẫu thuật", "giá website phòng phẫu thuật"],
  ["piano", "piano", "giá website cửa hàng piano"],
  ["thue-vay-dam", "thuê váy dạ hội", "giá website thuê váy dạ"],
  ["phan-phoi-sua", "phân phối sữa", "giá website phân phối sữa"],
  ["san-xuat-bia", "sản xuất bia", "giá website nhà máy bia"],
  ["showroom-nha-tam", "showroom nhà tắm", "giá website showroom vệ sinh"],
  ["shophouse", "shophouse", "giá website thiết kế shophouse"],
  ["day-lat", "dạy lặt", "giá website học nghề thủ công"],
  ["ho-tro-sinh-san", "hỗ trợ sinh sản", "giá website IVF"],
  ["may-nuoc-nong", "máy nước nóng", "giá website lắp bình nóng lạnh"],
  ["showroom-bep", "showroom bếp", "giá website showroom bếp"],
  ["chung-khoan", "chứng khoán", "giá website tư vấn chứng khoán"],
  ["day-nhay", "dạy nhảy", "giá website học nhảy"],
  ["tri-mun", "trị mụn", "giá website phòng trị mụn"],
  ["showroom-oto", "showroom ô tô", "giá website đại lý ô tô"],
  ["mut-xop", "mút xốp", "giá website xưởng mút xốp"],
  ["xu-ly-rac", "xử lý rác", "giá website xử lý rác thải"],
  ["ho-boi-mini", "hồ bơi mini", "giá website bể bơi mini"],
  ["thiet-ke-bar", "thiết kế bar", "giá website thiết kế bar"],
  ["day-dj", "dạy DJ", "giá website học DJ"],
  ["tri-seo", "trị sẹo", "giá website trị sẹo"],
  ["thue-vay-cuoi", "thuê váy cưới", "giá website thuê váy cưới"],
  ["phan-phoi-nuoc", "phân phối nước", "giá website phân phối nước giải khát"],
  ["xuong-giay", "xưởng giày", "giá website xưởng giày OEM"],
  ["cua-kinh", "cửa kính", "giá website cửa nhôm kính"],
  ["nha-pho", "nhà phố", "giá website thiết kế nhà phố"],
  ["day-banh", "dạy làm bánh", "giá website học làm bánh"],
  ["hien-mau", "hiến máu", "giá website trung tâm hiến máu"],
  ["loc-nuoc", "lọc nước", "giá website lắp lọc nước"],
  ["den-trang-tri", "đèn trang trí", "giá website showroom đèn"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: YouTube Ads */
const D_YT = [
  ["my-pham", "mỹ phẩm", "YouTube ads skincare brand"],
  ["thoi-trang", "thời trang", "YouTube ads fashion"],
  ["dien-thoai", "điện thoại", "YouTube ads điện thoại gadget"],
  ["noi-that", "nội thất", "YouTube ads nội thất"],
  ["khoa-hoc-online", "khóa học online", "YouTube ads elearning"],
  ["du-lich", "du lịch", "YouTube ads tour du lịch"],
  ["bat-dong-san", "bất động sản", "YouTube ads BĐS"],
  ["o-to", "ô tô", "YouTube ads đại lý xe"],
  ["gym", "gym", "YouTube ads phòng gym"],
  ["spa", "spa", "YouTube ads spa làm đẹp"],
  ["nha-hang", "nhà hàng", "YouTube ads F&B"],
  ["phan-mem", "phần mềm", "YouTube ads SaaS B2B"],
  ["do-choi", "đồ chơi", "YouTube ads đồ chơi trẻ em"],
  ["thuc-pham", "thực phẩm", "YouTube ads thực phẩm"],
  ["dien-may", "điện máy", "YouTube ads điện máy"],
  ["game", "game", "YouTube ads game mobile"],
  ["app-mobile", "app mobile", "YouTube ads app tải"],
  ["khoa-hoc-ngan", "khóa học ngắn", "YouTube ads mini course"],
  ["thiet-bi-y-te", "thiết bị y tế", "YouTube ads y tế"],
  ["noi-that-van-phong", "nội thất văn phòng", "YouTube ads nội thất VP"],
  ["my-pham-nam", "mỹ phẩm nam", "YouTube ads grooming nam"],
  ["do-cong-nghe", "đồ công nghệ", "YouTube ads tech gadget"],
  ["nong-san", "nông sản", "YouTube ads nông sản sạch"],
  ["xe-dien", "xe điện", "YouTube ads xe điện EV"],
  ["tham-my", "thẩm mỹ", "YouTube ads thẩm mỹ viện"],
  ["nha-khoa", "nha khoa", "YouTube ads nha khoa"],
  ["luat-su", "luật sư", "YouTube ads văn phòng luật"],
  ["ke-toan", "kế toán", "YouTube ads dịch vụ kế toán"],
  ["logistics", "logistics", "YouTube ads logistics B2B"],
  ["xay-dung", "xây dựng", "YouTube ads nhà thầu"],
  ["in-an", "in ấn", "YouTube ads công ty in"],
  ["event", "sự kiện", "YouTube ads tổ chức sự kiện"],
  ["wedding", "cưới hỏi", "YouTube ads wedding planner"],
  ["smart-home", "smart home", "YouTube ads nhà thông minh"],
  ["elearning-b2b", "elearning B2B", "YouTube ads đào tạo doanh nghiệp"],
].map(([s, k, a]) => youtubeAdsInd(s, k, a));

/** E — 30: email marketing */
const E_EMAIL = [
  ["spa", "spa", "email marketing spa nuôi khách"],
  ["nha-hang", "nhà hàng", "email marketing nhà hàng"],
  ["khach-san", "khách sạn", "email marketing khách sạn"],
  ["ecommerce", "ecommerce", "email marketing shop online"],
  ["khoa-hoc", "khóa học", "email marketing khóa học"],
  ["bat-dong-san", "bất động sản", "email marketing BĐS lead"],
  ["nha-khoa", "nha khoa", "email marketing nha khoa"],
  ["gym", "gym", "email marketing phòng gym"],
  ["tham-my", "thẩm mỹ", "email marketing thẩm mỹ"],
  ["phan-mem-saas", "phần mềm SaaS", "email marketing SaaS B2B"],
  ["du-lich", "du lịch", "email marketing tour du lịch"],
  ["noi-that", "nội thất", "email marketing nội thất"],
  ["xay-dung", "xây dựng", "email marketing nhà thầu"],
  ["luat-su", "luật sư", "email marketing văn phòng luật"],
  ["ke-toan", "kế toán", "email marketing dịch vụ kế toán"],
  ["logistics", "logistics", "email marketing logistics"],
  ["fnb-chain", "chuỗi F&B", "email marketing chuỗi nhà hàng"],
  ["my-pham", "mỹ phẩm", "email marketing mỹ phẩm"],
  ["thoi-trang", "thời trang", "email marketing fashion"],
  ["event", "sự kiện", "email marketing event ticket"],
  ["wedding", "cưới hỏi", "email marketing wedding"],
  ["nong-san", "nông sản", "email marketing nông sản"],
  ["dien-may", "điện máy", "email marketing điện máy"],
  ["o-to", "ô tô", "email marketing đại lý xe"],
  ["phong-kham", "phòng khám", "email marketing phòng khám"],
  ["anh-ngu", "anh ngữ", "email marketing trung tâm anh ngữ"],
  ["mam-non", "mầm non", "email marketing trường mầm non"],
  ["coworking", "coworking", "email marketing coworking"],
  ["franchise", "franchise", "email marketing nhượng quyền"],
].map(([s, k, a]) => emailMktInd(s, k, a));

/** F — 25: tính năng × ngành */
const F_FEATURE = [
  ["spa", "dat-lich-online", "spa", "đặt lịch online", "website spa booking 24/7"],
  ["nha-hang", "menu-digital", "nhà hàng", "menu digital", "website nhà hàng menu số"],
  ["khach-san", "booking-engine", "khách sạn", "booking engine", "website khách sạn engine đặt phòng"],
  ["nha-khoa", "tu-van-online", "nha khoa", "tư vấn online", "website nha khoa chat tư vấn"],
  ["bat-dong-san", "virtual-tour", "bất động sản", "virtual tour", "website BĐS tour 360"],
  ["shop-online", "wishlist", "shop online", "wishlist", "website ecommerce wishlist"],
  ["gym", "check-in-qr", "gym", "check-in QR", "website gym check-in QR"],
  ["du-lich", "combo-tour", "du lịch", "combo tour", "website du lịch combo linh hoạt"],
  ["noi-that", "ar-preview", "nội thất", "AR preview", "website nội thất xem AR"],
  ["xay-dung", "bao-gia-online", "xây dựng", "báo giá online", "website nhà thầu báo giá nhanh"],
  ["phong-kham", "lich-kham-online", "phòng khám", "lịch khám online", "website phòng khám đặt lịch"],
  ["truong-hoc", "portal-phu-huynh", "trường học", "portal phụ huynh", "website trường portal PH"],
  ["nong-san", "traceability", "nông sản", "traceability", "website nông sản truy xuất nguồn gốc"],
  ["logistics", "api-tracking", "logistics", "API tracking", "website logistics API tracking"],
  ["luat-su", "hop-dong-dien-tu", "luật sư", "hợp đồng điện tử", "website luật e-contract"],
  ["ke-toan", "portal-khach-hang", "kế toán", "portal khách hàng", "website kế toán client portal"],
  ["event", "ban-ve-online", "sự kiện", "bán vé online", "website event ticketing"],
  ["elearning", "lms-tich-hop", "elearning", "LMS tích hợp", "website elearning LMS"],
  ["ban-hang", "upsell-cross-sell", "bán hàng", "upsell cross-sell", "website ecommerce upsell"],
  ["spa", "membership-card", "spa", "membership card", "website spa thẻ thành viên"],
  ["nha-hang", "loyalty-point", "nhà hàng", "loyalty point", "website nhà hàng tích điểm"],
  ["khach-san", "review-widget", "khách sạn", "review widget", "website khách sạn review"],
  ["my-pham", "shade-finder", "mỹ phẩm", "shade finder", "website mỹ phẩm chọn màu"],
  ["thoi-trang", "size-guide", "thời trang", "size guide", "website fashion size guide"],
  ["o-to", "book-lai-thu", "ô tô", "book lái thử", "website đại lý xe đặt lái thử"],
].map(([is, fs, i, f, a]) => webFeature(is, fs, i, f, a));

/** G — 30: marketing × thành phố */
const G_MKT_CITY = [
  ["mong-cai", "Móng Cái", "marketing SME biên giới Móng Cái"],
  ["ha-giang", "Hà Giang", "marketing du lịch Hà Giang"],
  ["son-la", "Sơn La", "marketing nông sản Sơn La"],
  ["dien-bien", "Điện Biên", "marketing Điện Biên"],
  ["lai-chau", "Lai Châu", "marketing Lai Châu"],
  ["tuyen-quang", "Tuyên Quang", "marketing Tuyên Quang"],
  ["bac-kan", "Bắc Kạn", "marketing Bắc Kạn"],
  ["phu-tho", "Phú Thọ", "marketing Phú Thọ"],
  ["hung-yen", "Hưng Yên", "marketing Hưng Yên"],
  ["ha-nam", "Hà Nam", "marketing Hà Nam"],
  ["mong-cai-du-lich", "Móng Cái du lịch", "marketing du lịch biên Móng Cái"],
  ["ha-giang-homestay", "Hà Giang homestay", "marketing homestay Hà Giang"],
  ["son-la-che", "Sơn La chè", "marketing chè Sơn La"],
  ["dien-bien-lua", "Điện Biên lúa", "marketing nông sản Điện Biên"],
  ["lai-chau-thuy-dien", "Lai Châu thủy điện", "marketing Lai Châu"],
  ["tuyen-quang-du-lich", "Tuyên Quang du lịch", "marketing du lịch Tuyên Quang"],
  ["bac-kan-du-lich", "Bắc Kạn du lịch", "marketing du lịch Bắc Kạn"],
  ["phu-tho-den-hung", "Phú Thọ Đền Hùng", "marketing du lịch Phú Thọ"],
  ["hung-yen-nhan", "Hưng Yên nhãn", "marketing nông sản Hưng Yên"],
  ["ha-nam-det", "Hà Nam dệt", "marketing làng nghề Hà Nam"],
].map(([s, c, a]) => marketingCity(s, c, a));

/** H — 25: Maps */
const H_MAPS = [
  ["spa", "mong-cai", "spa", "Móng Cái", "Maps spa Móng Cái"],
  ["nha-hang", "ha-giang", "nhà hàng", "Hà Giang", "Maps nhà hàng Hà Giang"],
  ["khach-san", "son-la", "khách sạn", "Sơn La", "Maps khách sạn Sơn La"],
  ["nha-khoa", "dien-bien", "nha khoa", "Điện Biên", "Maps nha khoa Điện Biên"],
  ["gym", "lai-chau", "gym", "Lai Châu", "Maps gym Lai Châu"],
  ["tham-my", "tuyen-quang", "thẩm mỹ", "Tuyên Quang", "Maps thẩm mỹ Tuyên Quang"],
  ["bat-dong-san", "bac-kan", "bất động sản", "Bắc Kạn", "Maps BĐS Bắc Kạn"],
  ["noi-that", "phu-tho", "nội thất", "Phú Thọ", "Maps nội thất Phú Thọ"],
  ["xay-dung", "hung-yen", "xây dựng", "Hưng Yên", "Maps nhà thầu Hưng Yên"],
  ["phong-kham", "ha-nam", "phòng khám", "Hà Nam", "Maps phòng khám Hà Nam"],
  ["du-lich", "mong-cai", "du lịch", "Móng Cái", "Maps tour Móng Cái"],
  ["my-pham", "ha-giang", "mỹ phẩm", "Hà Giang", "Maps mỹ phẩm Hà Giang"],
  ["dien-may", "son-la", "điện máy", "Sơn La", "Maps điện máy Sơn La"],
  ["o-to", "dien-bien", "ô tô", "Điện Biên", "Maps đại lý xe Điện Biên"],
  ["luat-su", "lai-chau", "luật sư", "Lai Châu", "Maps văn phòng luật Lai Châu"],
  ["ke-toan", "tuyen-quang", "kế toán", "Tuyên Quang", "Maps kế toán Tuyên Quang"],
  ["logistics", "bac-kan", "logistics", "Bắc Kạn", "Maps logistics Bắc Kạn"],
  ["anh-ngu", "phu-tho", "anh ngữ", "Phú Thọ", "Maps anh ngữ Phú Thọ"],
  ["mam-non", "hung-yen", "mầm non", "Hưng Yên", "Maps mầm non Hưng Yên"],
  ["quan-cafe", "ha-nam", "quán cafe", "Hà Nam", "Maps cafe Hà Nam"],
  ["tiem-nail", "mong-cai", "tiệm nail", "Móng Cái", "Maps nail Móng Cái"],
  ["homestay", "ha-giang", "homestay", "Hà Giang", "Maps homestay Hà Giang"],
  ["showroom-oto", "son-la", "showroom ô tô", "Sơn La", "Maps showroom ô tô Sơn La"],
  ["tri-mun", "dien-bien", "trị mụn", "Điện Biên", "Maps trị mụn Điện Biên"],
  ["smart-home", "lai-chau", "smart home", "Lai Châu", "Maps smart home Lai Châu"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** I — 25: so sánh */
const I_COMPARE = [
  compare("youtube-ads-hay-tiktok-ads-video", "youtube ads hay tiktok ads video", "YouTube Ads Hay TikTok Ads Video?", "video ads platform", "google-ads"),
  compare("youtube-shorts-hay-tiktok", "youtube shorts hay tiktok", "YouTube Shorts Hay TikTok?", "short video organic", "content"),
  compare("email-marketing-hay-sms-marketing", "email marketing hay SMS marketing", "Email Marketing Hay SMS Marketing?", "owned channel VN", "strategy"),
  compare("klaviyo-hay-mailchimp", "klaviyo hay mailchimp", "Klaviyo Hay Mailchimp?", "email tool ecommerce", "strategy"),
  compare("brevo-hay-getresponse", "brevo hay getresponse", "Brevo Hay GetResponse?", "email automation SME", "strategy"),
  compare("youtube-trueview-hay-bumper", "youtube trueview hay bumper", "YouTube TrueView Hay Bumper Ads?", "YouTube ad format", "google-ads"),
  compare("skippable-hay-non-skippable-youtube", "skippable hay non skippable youtube", "Skippable Hay Non-Skippable YouTube?", "YouTube video ads", "google-ads"),
  compare("demand-gen-hay-video-action", "demand gen hay video action", "Demand Gen Hay Video Action Campaign?", "Google video campaign", "google-ads"),
  compare("newsletter-hay-blog-seo", "newsletter hay blog SEO", "Newsletter Hay Blog SEO?", "content distribution", "content"),
  compare("drip-email-hay-broadcast", "drip email hay broadcast", "Drip Email Hay Broadcast?", "email sequence type", "strategy"),
  compare("segment-email-hay-blast", "segment email hay blast", "Segment Email Hay Blast?", "email targeting", "strategy"),
  compare("double-opt-in-hay-single", "double opt in hay single", "Double Opt-In Hay Single Opt-In?", "email list quality", "strategy"),
  compare("popup-hay-lead-magnet", "popup hay lead magnet", "Popup Hay Lead Magnet?", "email capture method", "strategy"),
  compare("welcome-series-hay-abandoned-cart", "welcome series hay abandoned cart", "Welcome Series Hay Abandoned Cart?", "email automation priority", "strategy"),
  compare("transactional-email-hay-promotional", "transactional email hay promotional", "Transactional Hay Promotional Email?", "email type strategy", "strategy"),
  compare("webinar-funnel-hay-email-nurture", "webinar funnel hay email nurture", "Webinar Funnel Hay Email Nurture?", "B2B lead nurture", "strategy"),
  compare("hub-page-hay-landing-page", "hub page hay landing page", "Hub Page Hay Landing Page?", "content architecture", "seo"),
  compare("mega-menu-hay-mega-footer", "mega menu hay mega footer", "Mega Menu Hay Mega Footer?", "site navigation SEO", "seo"),
  compare("sticky-cta-hay-exit-intent", "sticky CTA hay exit intent", "Sticky CTA Hay Exit Intent Popup?", "conversion widget", "strategy"),
  compare("chat-widget-hay-form-static", "chat widget hay form static", "Chat Widget Hay Form Tĩnh?", "lead capture UX", "strategy"),
  compare("multi-step-form-hay-one-step", "multi step form hay one step", "Multi-Step Form Hay One-Step?", "form conversion", "strategy"),
  compare("video-hero-hay-image-hero", "video hero hay image hero", "Video Hero Hay Image Hero?", "homepage design", "strategy"),
];

/** J — 25: pain */
const J_PAIN = [
  pain("youtube-ads-view-cao-khong-convert", "youtube ads view cao không convert", "YouTube Ads View Cao Không Convert — Tối Ưu", "YouTube view no conversion"),
  pain("email-open-rate-duoi-10", "email open rate dưới 10", "Email Open Rate Dưới 10% — Cải Thiện", "low email open rate"),
  pain("email-click-rate-thap", "email click rate thấp", "Email Click Rate Thấp — Tối Ưu CTA", "low email CTR"),
  pain("email-list-khong-tang", "email list không tăng", "Email List Không Tăng — Thu Subscriber", "email list growth stall"),
  pain("welcome-email-khong-mo", "welcome email không mở", "Welcome Email Không Mở — Viết Lại", "welcome email fix"),
  pain("cart-abandon-email-khong-hieu-qua", "cart abandon email không hiệu quả", "Cart Abandon Email Không Hiệu Quả", "cart recovery email fix"),
  pain("website-khong-co-newsletter", "website không có newsletter", "Website Không Có Newsletter — Mất Owned Audience", "newsletter missing"),
  pain("blog-khong-co-email-capture", "blog không có email capture", "Blog Không Có Email Capture — Thu Lead", "blog email capture missing"),
  pain("landing-khong-co-social-proof", "landing không có social proof", "Landing Không Có Social Proof — Bổ Sung", "social proof missing"),
  pain("homepage-khong-ro-uu-tien", "homepage không rõ ưu tiên", "Homepage Không Rõ Ưu Tiên — Sắp Xếp Lại", "homepage priority unclear"),
  pain("menu-qua-sau-3-click", "menu quá sâu 3 click", "Menu Quá Sâu 3 Click — Flatten Navigation", "deep navigation fix"),
  pain("trang-dich-khong-co-noi-dung", "trang dịch vụ không có nội dung", "Trang Dịch Vụ Không Có Nội Dung — Viết Lại", "thin service page"),
  pain("case-study-khong-co-so-lieu", "case study không có số liệu", "Case Study Không Có Số Liệu — Bổ Sung Proof", "case study no metrics"),
  pain("faq-khong-co-schema", "FAQ không có schema", "FAQ Không Có Schema — Thêm JSON-LD", "FAQ schema missing"),
  pain("testimonial-khong-co-anh", "testimonial không có ảnh", "Testimonial Không Có Ảnh — Tăng Uy Tín", "testimonial no photo"),
  pain("pricing-khong-ro-goi", "pricing không rõ gói", "Pricing Không Rõ Gói — Cải Thiện UX", "pricing page unclear"),
  pain("contact-form-khong-co-thank-you", "contact form không có thank you", "Contact Form Không Có Thank You Page", "thank you page missing"),
  pain("website-khong-co-live-demo", "website không có live demo", "Website Không Có Live Demo — Bổ Sung", "product demo missing"),
  pain("mobile-cta-bi-che", "mobile CTA bị che", "Mobile CTA Bị Che — Sửa Sticky Bar", "mobile CTA hidden"),
  pain("video-hero-load-cham", "video hero load chậm", "Video Hero Load Chậm — Tối Ưu LCP", "video hero LCP fix"),
  pain("popup-qua-nhieu-lan", "popup quá nhiều lần", "Popup Quá Nhiều Lần — Giảm Phiền", "popup frequency fix"),
  pain("cookie-consent-chan-tracking", "cookie consent chặn tracking", "Cookie Consent Chặn Tracking — Setup Chuẩn", "consent mode tracking"),
  pain("hreflang-thieu-trang-dich", "hreflang thiếu trang đích", "Hreflang Thiếu Trang Đích — Sửa Đa Ngôn Ngữ", "hreflang broken"),
  pain("blog-khong-co-author-bio", "blog không có author bio", "Blog Không Có Author Bio — E-E-A-T", "author bio missing"),
];

/** K — 20: thuật ngữ */
const K_LAGI = [
  laGi("trueview-la-gi", "TrueView là gì", "TrueView Là Gì? YouTube Ads Skippable", "YouTube TrueView ads"),
  laGi("bumper-ads-la-gi", "bumper ads là gì", "Bumper Ads Là Gì? YouTube 6 Giây", "YouTube bumper ads"),
  laGi("demand-gen-la-gi", "demand gen là gì", "Demand Gen Là Gì? Google Ads", "Google Demand Gen"),
  laGi("video-action-campaign-la-gi", "video action campaign là gì", "Video Action Campaign Là Gì?", "YouTube video action"),
  laGi("drip-campaign-la-gi", "drip campaign là gì", "Drip Campaign Là Gì? Email Tự Động", "email drip campaign"),
  laGi("broadcast-email-la-gi", "broadcast email là gì", "Broadcast Email Là Gì?", "email broadcast"),
  laGi("double-opt-in-la-gi", "double opt in là gì", "Double Opt-In Là Gì? Email Marketing", "email double opt-in"),
  laGi("spf-dkim-la-gi", "SPF DKIM là gì", "SPF DKIM Là Gì? Xác Thực Email", "email authentication"),
  laGi("dmarc-la-gi", "DMARC là gì", "DMARC Là Gì? Bảo Mật Email Domain", "DMARC email security"),
  laGi("list-hygiene-la-gi", "list hygiene là gì", "List Hygiene Là Gì? Làm Sạch Email", "email list hygiene"),
  laGi("sunset-policy-la-gi", "sunset policy là gì", "Sunset Policy Là Gì? Email Inactive", "email sunset policy"),
  laGi("lead-magnet-la-gi-email", "lead magnet là gì email", "Lead Magnet Là Gì Cho Email?", "email lead magnet"),
  laGi("welcome-series-la-gi", "welcome series là gì", "Welcome Series Là Gì? Email Onboarding", "email welcome series"),
  laGi("cart-abandonment-la-gi", "cart abandonment là gì", "Cart Abandonment Là Gì? Email Giỏ Hàng", "cart abandonment email"),
  laGi("win-back-email-la-gi", "win back email là gì", "Win-Back Email Là Gì?", "win-back email campaign"),
  laGi("re-engagement-la-gi", "re-engagement là gì", "Re-Engagement Là Gì? Email Kích Hoạt Lại", "email re-engagement"),
  laGi("transactional-email-la-gi", "transactional email là gì", "Transactional Email Là Gì?", "transactional vs promotional"),
  laGi("newsletter-la-gi-marketing", "newsletter là gì marketing", "Newsletter Là Gì Trong Marketing?", "email newsletter"),
  laGi("owned-media-la-gi", "owned media là gì", "Owned Media Là Gì? Kênh Sở Hữu", "owned earned paid media"),
];

/** L — 20: agency */
const L_AGENCY = [
  agency("agency-youtube-ads-viet-nam", "agency youtube ads việt nam", "Agency YouTube Ads Việt Nam Uy Tín", "YouTube ads management"),
  agency("agency-email-marketing", "agency email marketing", "Agency Email Marketing Trọn Gói", "email marketing agency"),
  agency("dich-vu-setup-email-automation", "dịch vụ setup email automation", "Dịch Vụ Setup Email Automation", "email automation setup"),
  agency("dich-vu-viet-newsletter", "dịch vụ viết newsletter", "Dịch Vụ Viết Newsletter Hàng Tháng", "newsletter writing service"),
  agency("dich-vu-quay-video-youtube-ads", "dịch vụ quay video youtube ads", "Dịch Vụ Quay Video YouTube Ads", "YouTube ad video production"),
  agency("dich-vu-thiet-ke-kich-ban-youtube", "dịch vụ thiết kế kịch bản youtube", "Dịch Vụ Thiết Kế Kịch Bản YouTube Ads", "YouTube script writing"),
  agency("dich-vu-audit-email-marketing", "dịch vụ audit email marketing", "Dịch Vụ Audit Email Marketing", "email marketing audit"),
  agency("dich-vu-migration-email-platform", "dịch vụ migration email platform", "Dịch Vụ Migration Email Platform", "email platform migration"),
  agency("dich-vu-setup-klaviyo", "dịch vụ setup klaviyo", "Dịch Vụ Setup Klaviyo Ecommerce", "Klaviyo implementation"),
  agency("dich-vu-setup-mailchimp", "dịch vụ setup mailchimp", "Dịch Vụ Setup Mailchimp Automation", "Mailchimp setup"),
  agency("dich-vu-thiet-ke-email-template", "dịch vụ thiết kế email template", "Dịch Vụ Thiết Kế Email Template", "email template design"),
  agency("dich-vu-list-building-email", "dịch vụ list building email", "Dịch Vụ List Building Email", "email list building"),
  agency("dich-vu-chay-youtube-ads", "dịch vụ chạy youtube ads", "Dịch Vụ Chạy YouTube Ads", "YouTube ads campaign management"),
  agency("dich-vu-tu-van-chien-luoc-email", "dịch vụ tư vấn chiến lược email", "Dịch Vụ Tư Vấn Chiến Lược Email", "email strategy consulting"),
  agency("dich-vu-thiet-ke-landing-email", "dịch vụ thiết kế landing email", "Dịch Vụ Thiết Kế Landing Thu Email", "email capture landing design"),
  agency("dich-vu-dao-tao-email-marketing", "dịch vụ đào tạo email marketing", "Dịch Vụ Đào Tạo Email Marketing", "email marketing training"),
  agency("dich-vu-welcome-series-setup", "dịch vụ welcome series setup", "Dịch Vụ Setup Welcome Series Email", "welcome email sequence"),
  agency("dich-vu-cart-abandonment-setup", "dịch vụ cart abandonment setup", "Dịch Vụ Setup Cart Abandonment Email", "cart recovery email setup"),
  agency("dich-vu-deliverability-email", "dịch vụ deliverability email", "Dịch Vụ Tối Ưu Email Deliverability", "email deliverability service"),
];

export const KEYWORDS_500_BATCH6 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_YT,
  ...E_EMAIL,
  ...F_FEATURE,
  ...G_MKT_CITY,
  ...H_MAPS,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
  ...L_AGENCY,
];

export const KEYWORDS_500_BATCH6_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
  ...L_AGENCY.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH6.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH6 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH6.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH6.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH6.length) {
  const dupes = KEYWORDS_500_BATCH6.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH6 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH6.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH6.length) {
  const dupes = KEYWORDS_500_BATCH6.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH6 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
