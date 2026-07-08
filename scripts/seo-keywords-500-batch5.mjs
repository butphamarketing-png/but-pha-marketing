/**
 * 500 từ khóa long-tail batch 5 — Facebook/Google Ads ngành, fanpage, local SEO, địa phương Tây Bắc/ĐBSCL.
 * Export: KEYWORDS_500_BATCH5
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

function facebookAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-facebook-${slug}`,
    keywordsMain: `quảng cáo facebook ${kw}`,
    h1: `Quảng Cáo Facebook ${cap(kw)} — Tối Ưu Ads`,
    angle,
    niche: "facebook-ads",
  };
}

function googleAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-google-${slug}`,
    keywordsMain: `quảng cáo google ${kw}`,
    h1: `Quảng Cáo Google ${cap(kw)} — Thu Khách Hiệu Quả`,
    angle,
    niche: "google-ads",
  };
}

function fanpageInd(slug, kw, angle) {
  return {
    slug: `thiet-ke-fanpage-${slug}`,
    keywordsMain: `thiết kế fanpage ${kw}`,
    h1: `Thiết Kế Fanpage ${cap(kw)} Chuyên Nghiệp`,
    angle,
    niche: "facebook-ads",
  };
}

function seoLocalInd(slug, kw, angle) {
  return {
    slug: `seo-local-${slug}`,
    keywordsMain: `seo local ${kw}`,
    h1: `SEO Local ${cap(kw)} — Lên Google Maps`,
    angle,
    niche: "seo",
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

/** A — 200: ngành × 10 thành phố Tây Bắc / ĐBSCL */
const INDUSTRIES_B5 = [
  ["cong-ty-bao-tro", "công ty bảo trì", "website dịch vụ bảo trì thiết bị"],
  ["xuong-in-decal", "xưởng in decal", "website xưởng in decal dán"],
  ["cua-hang-khoa", "cửa hàng khóa", "website dịch vụ khóa cửa"],
  ["dich-vu-thong-cong", "dịch vụ thông cống", "website thông tắc cống"],
  ["phan-mem-ke-toan", "phần mềm kế toán", "website phần mềm kế toán SME"],
  ["tro-giup-nguoi-khuyet-tat", "trợ giúp người khuyết tật", "website trung tâm hỗ trợ NKT"],
  ["phong-kham-rang-su", "phòng khám răng sứ", "website nha khoa thẩm mỹ"],
  ["cho-thue-may-anh", "cho thuê máy ảnh", "website thuê máy ảnh sự kiện"],
  ["phan-phoi-thiet-bi-y-te", "phân phối thiết bị y tế", "website phân phối y tế B2B"],
  ["xuong-che-bien-thit", "xưởng chế biến thịt", "website nhà máy chế biến thịt"],
  ["cho-thue-do-cuoi", "cho thuê đồ cưới", "website thuê váy cưới"],
  ["trung-tam-hoc-boi", "trung tâm học bơi", "website học bơi trẻ em"],
  ["phuc-hoi-chuc-nang", "phục hồi chức năng", "website phòng PHCN"],
  ["lap-dat-thang-may", "lắp đặt thang máy", "website công ty thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "website bán thiết bị PCCC"],
  ["xuong-nhua-go", "xưởng nhựa gỗ", "website xưởng nhựa composite"],
  ["tu-van-marketing", "tư vấn marketing", "website agency tư vấn marketing"],
  ["day-au-trac", "dạy ấu trĩ", "website trường mầm non tư thục"],
  ["thiet-ke-nhan-hieu", "thiết kế nhãn hiệu", "website thiết kế brand identity"],
  ["dich-vu-giao-duc-tai-nha", "dịch vụ giáo dục tại nhà", "website gia sư tại nhà"],
];

const CITIES_B5 = [
  ["soc-trang", "Sóc Trăng"],
  ["ben-tre", "Bến Tre"],
  ["hau-giang", "Hậu Giang"],
  ["dak-nong", "Đắk Nông"],
  ["kon-tum", "Kon Tum"],
  ["quang-tri", "Quảng Trị"],
  ["quang-binh", "Quảng Bình"],
  ["ninh-binh", "Ninh Bình"],
  ["yen-bai", "Yên Bái"],
  ["lao-cai", "Lào Cai"],
];

const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES_B5) {
  for (const [citySlug, city] of CITIES_B5) {
    A_WEB_CITY.push(webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`));
  }
}

/** B — 50: website ngành mới */
const B_EXTRA_WEB = [
  ["cong-ty-ve-sinh-cong-trinh", "công ty vệ sinh công trình", "website vệ sinh sau xây dựng"],
  ["xuong-in-flexo", "xưởng in flexo", "website xưởng in flexo bao bì"],
  ["cua-hang-thiet-bi-han", "cửa hàng thiết bị hàn", "website bán máy hàn công nghiệp"],
  ["dich-vu-sua-chua-dien", "dịch vụ sửa chữa điện", "website thợ điện dân dụng"],
  ["phan-mem-quan-ly-kho", "phần mềm quản lý kho", "website WMS inventory"],
  ["trung-tam-tro-giup-phu-nu", "trung tâm trợ giúp phụ nữ", "website hỗ trợ phụ nữ"],
  ["phong-kham-phuc-hoi-sau-sinh", "phòng khám phục hồi sau sinh", "website chăm sóc sau sinh"],
  ["cho-thue-trang-phuc", "cho thuê trang phục", "website thuê trang phục biểu diễn"],
  ["phan-phoi-thuc-pham-chuc-nang", "phân phối thực phẩm chức năng", "website phân phối TPCN"],
  ["xuong-che-bien-rau-cu", "xưởng chế biến rau củ", "website đóng gói rau củ sạch"],
  ["cho-thue-phong-hop", "cho thuê phòng họp", "website thuê phòng họp theo giờ"],
  ["trung-tam-day-boi-nguoi-lon", "trung tâm dạy bơi người lớn", "website học bơi người lớn"],
  ["phong-kham-phuc-hoi-the-thao", "phòng khám phục hồi thể thao", "website sports medicine"],
  ["lap-dat-he-thong-loc-nuoc", "lắp đặt hệ thống lọc nước", "website lọc nước RO"],
  ["thiet-bi-an-ninh-bien", "thiết bị an ninh biển", "website camera biển báo"],
  ["xuong-san-xuat-nhom", "xưởng sản xuất nhôm", "website xưởng nhôm kính"],
  ["tu-van-thuong-hieu", "tư vấn thương hiệu", "website branding consultancy"],
  ["day-tieng-anh-giao-tiep", "dạy tiếng Anh giao tiếp", "website học tiếng Anh giao tiếp"],
  ["thiet-ke-bao-bi-san-pham", "thiết kế bao bì sản phẩm", "website packaging design"],
  ["dich-vu-gia-han-visa", "dịch vụ gia hạn visa", "website gia hạn visa du lịch"],
  ["cong-ty-ve-sinh-may-moc", "công ty vệ sinh máy móc", "website vệ sinh công nghiệp"],
  ["xuong-in-tem-nhan", "xưởng in tem nhãn", "website in tem nhãn sản phẩm"],
  ["cua-hang-thiet-bi-dien-tu", "cửa hàng thiết bị điện tử", "website linh kiện điện tử"],
  ["dich-vu-sua-chua-tu-lanh", "dịch vụ sửa chữa tủ lạnh", "website sửa tủ lạnh tại nhà"],
  ["phan-mem-nhan-su", "phần mềm nhân sự", "website HRM phần mềm"],
  ["trung-tam-ho-tro-tam-than", "trung tâm hỗ trợ tâm thần", "website tư vấn tâm thần"],
  ["phong-kham-phuc-hoi-cham-soc", "phòng khám phục hồi chăm sóc", "website PHCN tại nhà"],
  ["cho-thue-am-thanh", "cho thuê âm thanh", "website thuê loa sự kiện"],
  ["phan-phoi-nguyen-lieu", "phân phối nguyên liệu", "website phân phối nguyên liệu F&B"],
  ["xuong-che-bien-tra", "xưởng chế biến trà", "website nhà máy trà OEM"],
  ["cho-thue-khong-gian-lam-viec", "cho thuê không gian làm việc", "website coworking space"],
  ["trung-tam-day-boi-tre-em", "trung tâm dạy bơi trẻ em", "website học bơi trẻ em"],
  ["phong-kham-laser-da", "phòng khám laser da", "website laser trị liệu da"],
  ["lap-dat-he-thong-may-lanh", "lắp đặt hệ thống máy lạnh", "website lắp đặt điều hòa"],
  ["thiet-bi-chua-chay", "thiết bị chữa cháy", "website bán bình chữa cháy"],
  ["xuong-san-xuat-inox", "xưởng sản xuất inox", "website gia công inox"],
  ["tu-van-franchise", "tư vấn franchise", "website tư vấn nhượng quyền"],
  ["day-tieng-anh-thieu-nhi", "dạy tiếng Anh thiếu nhi", "website tiếng Anh trẻ em"],
  ["thiet-ke-profile-cong-ty", "thiết kế profile công ty", "website company profile PDF"],
  ["dich-vu-lam-visa-du-hoc", "dịch vụ làm visa du học", "website visa du học"],
  ["cong-ty-ve-sinh-giay", "công ty vệ sinh giày", "website dịch vụ vệ sinh giày"],
  ["xuong-in-catalogue", "xưởng in catalogue", "website in catalogue sản phẩm"],
].map(([s, k, a]) => webIndustry(s, k, a));

/** C — 40: báo giá */
const C_PRICING = [
  ["bao-tri", "bảo trì", "giá website dịch vụ bảo trì"],
  ["in-decal", "in decal", "giá website xưởng in decal"],
  ["khoa-cua", "khóa cửa", "giá website dịch vụ khóa"],
  ["thong-cong", "thông cống", "giá website thông cống"],
  ["phan-mem-ke-toan", "phần mềm kế toán", "giá website phần mềm kế toán"],
  ["tro-giup-nkt", "trợ giúp NKT", "giá website hỗ trợ người khuyết tật"],
  ["rang-su", "răng sứ", "giá website nha khoa răng sứ"],
  ["thue-may-anh", "thuê máy ảnh", "giá website thuê máy ảnh"],
  ["phan-phoi-y-te", "phân phối y tế", "giá website phân phối thiết bị y tế"],
  ["che-bien-thit", "chế biến thịt", "giá website chế biến thịt"],
  ["thue-do-cuoi", "thuê đồ cưới", "giá website thuê váy cưới"],
  ["hoc-boi", "học bơi", "giá website trung tâm bơi"],
  ["phcn", "PHCN", "giá website phục hồi chức năng"],
  ["thang-may", "thang máy", "giá website lắp thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "giá website thiết bị PCCC"],
  ["nhu-go", "nhựa gỗ", "giá website xưởng nhựa gỗ"],
  ["tu-van-marketing", "tư vấn marketing", "giá website tư vấn marketing"],
  ["mam-non-tu-thuc", "mầm non tư thục", "giá website trường mầm non"],
  ["thiet-ke-brand", "thiết kế brand", "giá website thiết kế nhãn hiệu"],
  ["gia-su-tai-nha", "gia sư tại nhà", "giá website gia sư tại nhà"],
  ["ve-sinh-cong-trinh", "vệ sinh công trình", "giá website vệ sinh công trình"],
  ["in-flexo", "in flexo", "giá website in flexo"],
  ["thiet-bi-han", "thiết bị hàn", "giá website bán máy hàn"],
  ["sua-dien", "sửa điện", "giá website thợ điện"],
  ["phan-mem-kho", "phần mềm kho", "giá website WMS"],
  ["tro-giup-phu-nu", "trợ giúp phụ nữ", "giá website hỗ trợ phụ nữ"],
  ["phuc-hoi-sau-sinh", "phục hồi sau sinh", "giá website chăm sóc sau sinh"],
  ["thue-trang-phuc", "thuê trang phục", "giá website thuê trang phục"],
  ["phan-phoi-tpcn", "phân phối TPCN", "giá website phân phối TPCN"],
  ["che-bien-rau-cu", "chế biến rau củ", "giá website chế biến rau củ"],
  ["thue-phong-hop", "thuê phòng họp", "giá website thuê phòng họp"],
  ["bơi-nguoi-lon", "bơi người lớn", "giá website học bơi người lớn"],
  ["phcn-the-thao", "PHCN thể thao", "giá website phục hồi thể thao"],
  ["loc-nuoc-ro", "lọc nước RO", "giá website lắp lọc nước"],
  ["camera-bien-bao", "camera biển báo", "giá website camera an ninh"],
].map(([s, k, a]) => webPricing(s, k, a));

/** D — 35: Facebook Ads ngành */
const D_FB = [
  ["nha-khoa-rang-su", "nha khoa răng sứ", "ads Facebook nha khoa thẩm mỹ"],
  ["phong-kham-laser", "phòng khám laser", "ads Facebook laser trị liệu"],
  ["trung-tam-hoc-boi", "trung tâm học bơi", "ads Facebook học bơi"],
  ["cho-thue-do-cuoi", "cho thuê đồ cưới", "ads Facebook thuê váy cưới"],
  ["xuong-che-bien-thit", "xưởng chế biến thịt", "ads Facebook thực phẩm B2B"],
  ["lap-dat-thang-may", "lắp đặt thang máy", "ads Facebook thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "ads Facebook PCCC"],
  ["tu-van-marketing", "tư vấn marketing", "ads Facebook agency marketing"],
  ["mam-non-tu-thuc", "mầm non tư thục", "ads Facebook trường mầm non"],
  ["gia-su-tai-nha", "gia sư tại nhà", "ads Facebook gia sư"],
  ["ve-sinh-cong-trinh", "vệ sinh công trình", "ads Facebook vệ sinh"],
  ["in-decal-sticker", "in decal sticker", "ads Facebook in decal"],
  ["sua-dien-tai-nha", "sửa điện tại nhà", "ads Facebook thợ điện"],
  ["phan-mem-ke-toan", "phần mềm kế toán", "ads Facebook SaaS kế toán"],
  ["tro-giup-phu-nu", "trợ giúp phụ nữ", "ads Facebook dịch vụ xã hội"],
  ["phuc-hoi-sau-sinh", "phục hồi sau sinh", "ads Facebook chăm sóc mẹ bé"],
  ["thue-trang-phuc", "thuê trang phục", "ads Facebook thuê đồ"],
  ["phan-phoi-tpcn", "phân phối TPCN", "ads Facebook thực phẩm chức năng"],
  ["coworking-space", "coworking space", "ads Facebook không gian làm việc"],
  ["hoc-boi-tre-em", "học bơi trẻ em", "ads Facebook bơi trẻ em"],
  ["tri-nam-tan-nhang", "trị nám tàn nhang", "ads Facebook thẩm mỹ da"],
  ["lap-dat-dieu-hoa", "lắp đặt điều hòa", "ads Facebook điện lạnh"],
  ["binh-chua-chay", "bình chữa cháy", "ads Facebook PCCC"],
  ["gia-cong-inox", "gia công inox", "ads Facebook inox B2B"],
  ["tu-van-franchise", "tư vấn franchise", "ads Facebook nhượng quyền"],
  ["tieng-anh-thieu-nhi", "tiếng Anh thiếu nhi", "ads Facebook tiếng Anh trẻ"],
  ["visa-du-hoc", "visa du học", "ads Facebook du học"],
  ["ve-sinh-giay-dep", "vệ sinh giày dép", "ads Facebook vệ sinh giày"],
  ["in-catalogue", "in catalogue", "ads Facebook in ấn"],
  ["sua-may-giat", "sửa máy giặt", "ads Facebook điện lạnh"],
  ["phan-mem-ban-hang", "phần mềm bán hàng", "ads Facebook POS"],
  ["tro-giup-hoc-duong", "trợ giúp học đường", "ads Facebook tư vấn học đường"],
  ["thue-ban-ghe-event", "thuê bàn ghế event", "ads Facebook sự kiện"],
  ["phan-phoi-dau-nhot", "phân phối dầu nhớt", "ads Facebook dầu nhớt B2B"],
  ["xuong-bao-bi", "xưởng bao bì", "ads Facebook bao bì B2B"],
].map(([s, k, a]) => facebookAdsInd(s, k, a));

/** E — 30: Google Ads ngành */
const E_GADS = [
  ["nha-khoa-rang-su", "nha khoa răng sứ", "Google Ads nha khoa thẩm mỹ"],
  ["phong-kham-laser", "phòng khám laser", "Google Ads laser da"],
  ["trung-tam-hoc-boi", "trung tâm học bơi", "Google Ads học bơi"],
  ["lap-dat-thang-may", "lắp đặt thang máy", "Google Ads thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "Google Ads PCCC"],
  ["tu-van-marketing", "tư vấn marketing", "Google Ads agency"],
  ["mam-non", "mầm non", "Google Ads trường mầm non"],
  ["gia-su", "gia sư", "Google Ads gia sư tại nhà"],
  ["ve-sinh-cong-nghiep", "vệ sinh công nghiệp", "Google Ads vệ sinh"],
  ["in-an-bao-bi", "in ấn bao bì", "Google Ads in ấn"],
  ["sua-dien", "sửa điện", "Google Ads thợ điện"],
  ["phan-mem-ke-toan", "phần mềm kế toán", "Google Ads SaaS kế toán"],
  ["phuc-hoi-sau-sinh", "phục hồi sau sinh", "Google Ads chăm sóc mẹ"],
  ["thue-do-cuoi", "thuê đồ cưới", "Google Ads thuê váy cưới"],
  ["phan-phoi-tpcn", "phân phối TPCN", "Google Ads TPCN"],
  ["coworking", "coworking", "Google Ads coworking"],
  ["tri-nam", "trị nám", "Google Ads thẩm mỹ da"],
  ["lap-dieu-hoa", "lắp điều hòa", "Google Ads điện lạnh"],
  ["chua-chay", "chữa cháy", "Google Ads PCCC"],
  ["gia-cong-inox", "gia công inox", "Google Ads inox B2B"],
  ["franchise", "franchise", "Google Ads nhượng quyền"],
  ["tieng-anh-tre-em", "tiếng Anh trẻ em", "Google Ads tiếng Anh"],
  ["visa-du-hoc", "visa du học", "Google Ads du học"],
  ["sua-may-giat", "sửa máy giặt", "Google Ads sửa máy giặt"],
  ["phan-mem-pos", "phần mềm POS", "Google Ads POS"],
  ["tu-van-hoc-duong", "tư vấn học đường", "Google Ads học đường"],
  ["thue-ban-ghe", "thuê bàn ghế", "Google Ads sự kiện"],
  ["dau-nhot", "dầu nhớt", "Google Ads dầu nhớt"],
  ["xuong-bao-bi", "xưởng bao bì", "Google Ads bao bì"],
  ["thong-cong", "thông cống", "Google Ads thông cống"],
].map(([s, k, a]) => googleAdsInd(s, k, a));

/** F — 25: fanpage ngành */
const F_FANPAGE = [
  ["nha-khoa-rang-su", "nha khoa răng sứ", "fanpage nha khoa thẩm mỹ"],
  ["phong-kham-laser", "phòng khám laser", "fanpage laser trị liệu"],
  ["trung-tam-hoc-boi", "trung tâm học bơi", "fanpage học bơi"],
  ["cho-thue-do-cuoi", "cho thuê đồ cưới", "fanpage thuê váy cưới"],
  ["lap-dat-thang-may", "lắp đặt thang máy", "fanpage thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "fanpage PCCC"],
  ["tu-van-marketing", "tư vấn marketing", "fanpage agency marketing"],
  ["mam-non", "mầm non", "fanpage trường mầm non"],
  ["gia-su", "gia sư", "fanpage gia sư"],
  ["ve-sinh-cong-nghiep", "vệ sinh công nghiệp", "fanpage vệ sinh"],
  ["in-an", "in ấn", "fanpage công ty in"],
  ["sua-dien", "sửa điện", "fanpage thợ điện"],
  ["phan-mem-b2b", "phần mềm B2B", "fanpage công ty phần mềm doanh nghiệp"],
  ["phuc-hoi-sau-sinh", "phục hồi sau sinh", "fanpage chăm sóc mẹ"],
  ["coworking", "coworking", "fanpage coworking"],
  ["tri-nam", "trị nám", "fanpage thẩm mỹ da"],
  ["lap-dieu-hoa", "lắp điều hòa", "fanpage điện lạnh"],
  ["franchise", "franchise", "fanpage nhượng quyền"],
  ["tieng-anh", "tiếng Anh", "fanpage trung tâm anh ngữ"],
  ["visa-du-hoc", "visa du học", "fanpage du học"],
  ["sua-may-giat", "sửa máy giặt", "fanpage điện lạnh"],
  ["tu-van-hoc-duong", "tư vấn học đường", "fanpage học đường"],
  ["thue-ban-ghe", "thuê bàn ghế", "fanpage sự kiện"],
  ["xuong-bao-bi", "xưởng bao bì", "fanpage bao bì B2B"],
  ["thong-cong", "thông cống", "fanpage thông cống"],
].map(([s, k, a]) => fanpageInd(s, k, a));

/** G — 30: SEO local ngành */
const G_SEO_LOCAL = [
  ["nha-khoa-rang-su", "nha khoa răng sứ", "SEO local nha khoa thẩm mỹ"],
  ["phong-kham-laser", "phòng khám laser", "SEO local laser da"],
  ["trung-tam-hoc-boi", "trung tâm học bơi", "SEO local học bơi"],
  ["cho-thue-do-cuoi", "cho thuê đồ cưới", "SEO local thuê váy cưới"],
  ["lap-dat-thang-may", "lắp đặt thang máy", "SEO local thang máy"],
  ["thiet-bi-pccc", "thiết bị PCCC", "SEO local PCCC"],
  ["tu-van-marketing", "tư vấn marketing", "SEO local agency"],
  ["mam-non-tu-thuc", "mầm non tư thục", "SEO local mầm non"],
  ["gia-su-tai-nha", "gia sư tại nhà", "SEO local gia sư"],
  ["ve-sinh-cong-trinh", "vệ sinh công trình", "SEO local vệ sinh"],
  ["in-decal", "in decal", "SEO local in decal"],
  ["sua-dien-tai-nha", "sửa điện tại nhà", "SEO local thợ điện"],
  ["phan-mem-ke-toan", "phần mềm kế toán", "SEO local SaaS kế toán"],
  ["phuc-hoi-sau-sinh", "phục hồi sau sinh", "SEO local chăm sóc mẹ"],
  ["coworking-space", "coworking space", "SEO local coworking"],
  ["tri-nam", "trị nám", "SEO local thẩm mỹ da"],
  ["lap-dieu-hoa", "lắp điều hòa", "SEO local điện lạnh"],
  ["gia-cong-inox", "gia công inox", "SEO local inox B2B"],
  ["tu-van-franchise", "tư vấn franchise", "SEO local franchise"],
  ["tieng-anh-thieu-nhi", "tiếng Anh thiếu nhi", "SEO local tiếng Anh trẻ"],
  ["visa-du-hoc", "visa du học", "SEO local du học"],
  ["ve-sinh-giay", "vệ sinh giày", "SEO local vệ sinh giày"],
  ["in-catalogue", "in catalogue", "SEO local in catalogue"],
  ["sua-may-giat", "sửa máy giặt", "SEO local sửa máy giặt"],
  ["phan-mem-pos", "phần mềm POS", "SEO local POS"],
  ["tu-van-hoc-duong", "tư vấn học đường", "SEO local học đường"],
  ["thue-ban-ghe-event", "thuê bàn ghế event", "SEO local sự kiện"],
  ["phan-phoi-dau-nhot", "phân phối dầu nhớt", "SEO local dầu nhớt"],
  ["xuong-bao-bi", "xưởng bao bì", "SEO local bao bì"],
  ["thong-cong", "thông cống", "SEO local thông cống"],
].map(([s, k, a]) => seoLocalInd(s, k, a));

/** H — 25: Maps ngành × thành phố */
const H_MAPS = [
  ["nha-khoa", "soc-trang", "nha khoa", "Sóc Trăng", "Maps nha khoa Sóc Trăng"],
  ["spa", "ben-tre", "spa", "Bến Tre", "Maps spa Bến Tre"],
  ["nha-hang", "hau-giang", "nhà hàng", "Hậu Giang", "Maps nhà hàng Hậu Giang"],
  ["gym", "dak-nong", "gym", "Đắk Nông", "Maps gym Đắk Nông"],
  ["tham-my", "kon-tum", "thẩm mỹ", "Kon Tum", "Maps thẩm mỹ Kon Tum"],
  ["bat-dong-san", "quang-tri", "bất động sản", "Quảng Trị", "Maps BĐS Quảng Trị"],
  ["noi-that", "quang-binh", "nội thất", "Quảng Bình", "Maps nội thất Quảng Bình"],
  ["xay-dung", "ninh-binh", "xây dựng", "Ninh Bình", "Maps nhà thầu Ninh Bình"],
  ["phong-kham", "yen-bai", "phòng khám", "Yên Bái", "Maps phòng khám Yên Bái"],
  ["du-lich", "lao-cai", "du lịch", "Lào Cai", "Maps tour Lào Cai"],
  ["my-pham", "soc-trang", "mỹ phẩm", "Sóc Trăng", "Maps mỹ phẩm Sóc Trăng"],
  ["dien-may", "ben-tre", "điện máy", "Bến Tre", "Maps điện máy Bến Tre"],
  ["o-to", "hau-giang", "ô tô", "Hậu Giang", "Maps đại lý xe Hậu Giang"],
  ["luat-su", "dak-nong", "luật sư", "Đắk Nông", "Maps văn phòng luật Đắk Nông"],
  ["ke-toan", "kon-tum", "kế toán", "Kon Tum", "Maps kế toán Kon Tum"],
  ["logistics", "quang-tri", "logistics", "Quảng Trị", "Maps logistics Quảng Trị"],
  ["anh-ngu", "quang-binh", "anh ngữ", "Quảng Bình", "Maps anh ngữ Quảng Bình"],
  ["mam-non", "ninh-binh", "mầm non", "Ninh Bình", "Maps mầm non Ninh Bình"],
  ["quan-cafe", "yen-bai", "quán cafe", "Yên Bái", "Maps cafe Yên Bái"],
  ["tiem-nail", "lao-cai", "tiệm nail", "Lào Cai", "Maps nail Lào Cai"],
  ["pet-shop", "soc-trang", "pet shop", "Sóc Trăng", "Maps thú cưng Sóc Trăng"],
  ["homestay", "ben-tre", "homestay", "Bến Tre", "Maps homestay Bến Tre"],
  ["thang-may", "hau-giang", "thang máy", "Hậu Giang", "Maps thang máy Hậu Giang"],
  ["pccc", "dak-nong", "PCCC", "Đắk Nông", "Maps công ty PCCC Đắk Nông"],
  ["hoc-boi", "kon-tum", "học bơi", "Kon Tum", "Maps học bơi Kon Tum"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** I — 25: so sánh */
const I_COMPARE = [
  compare("facebook-lead-ads-hay-instant-form", "facebook lead ads hay instant form", "Facebook Lead Ads Hay Instant Form?", "Meta lead form", "facebook-ads"),
  compare("google-pmax-hay-search-ads", "google pmax hay search ads", "Google PMax Hay Search Ads?", "Performance Max vs Search", "google-ads"),
  compare("google-ads-hay-bing-ads", "google ads hay bing ads", "Google Ads Hay Bing Ads?", "search ads platform", "google-ads"),
  compare("meta-ads-hay-google-ads-local", "meta ads hay google ads local", "Meta Ads Hay Google Ads Local?", "local paid media", "strategy"),
  compare("organic-seo-hay-google-ads", "organic SEO hay google ads", "Organic SEO Hay Google Ads?", "paid vs organic", "seo"),
  compare("fanpage-hay-group-facebook", "fanpage hay group facebook", "Fanpage Hay Group Facebook?", "Facebook presence", "facebook-ads"),
  compare("reels-hay-stories-facebook", "reels hay stories facebook", "Reels Hay Stories Facebook?", "Facebook content format", "facebook-ads"),
  compare("messenger-ads-hay-lead-ads", "messenger ads hay lead ads", "Messenger Ads Hay Lead Ads?", "Meta conversion objective", "facebook-ads"),
  compare("catalog-ads-hay-dynamic-ads", "catalog ads hay dynamic ads", "Catalog Ads Hay Dynamic Ads?", "Meta product ads", "facebook-ads"),
  compare("google-shopping-hay-search", "google shopping hay search", "Google Shopping Hay Search?", "ecommerce Google Ads", "google-ads"),
  compare("local-service-ads-hay-maps", "local service ads hay maps", "Local Service Ads Hay Maps?", "Google local ads", "google-ads"),
  compare("youtube-ads-hay-google-display", "youtube ads hay google display", "YouTube Ads Hay Google Display?", "Google video vs display", "google-ads"),
  compare("remarketing-hay-prospecting", "remarketing hay prospecting", "Remarketing Hay Prospecting?", "ads funnel strategy", "strategy"),
  compare("broad-match-hay-exact-match", "broad match hay exact match", "Broad Match Hay Exact Match?", "Google keyword match", "google-ads"),
  compare("manual-bid-hay-smart-bid", "manual bid hay smart bid", "Manual Bid Hay Smart Bid?", "Google bidding strategy", "google-ads"),
  compare("landing-page-hay-website-trang-chu", "landing page hay website trang chủ", "Landing Page Hay Website Trang Chủ?", "ads destination", "strategy"),
  compare("form-ngan-hay-form-dai", "form ngắn hay form dài", "Form Ngắn Hay Form Dài?", "lead form optimization", "strategy"),
  compare("chat-zalo-hay-messenger", "chat zalo hay messenger", "Chat Zalo Hay Messenger?", "customer chat channel", "strategy"),
  compare("review-google-hay-facebook-review", "review google hay facebook review", "Review Google Hay Facebook Review?", "social proof platform", "seo"),
  compare("seo-local-hay-ads-local-service", "seo local hay ads local service", "SEO Local Hay Ads Local Service?", "local visibility", "seo"),
  compare("content-seo-hay-ads-funnel", "content SEO hay ads funnel", "Content SEO Hay Ads Funnel?", "acquisition strategy", "strategy"),
  compare("agency-local-hay-agency-tphcm", "agency local hay agency tphcm", "Agency Local Hay Agency TPHCM?", "chọn agency địa phương", "strategy"),
];

/** J — 25: pain point */
const J_PAIN = [
  pain("facebook-ads-spend-cao-khong-co-don", "facebook ads spend cao không có đơn", "Facebook Ads Spend Cao Không Có Đơn — Tối Ưu", "high spend no conversion"),
  pain("google-ads-quality-score-1-2", "google ads quality score 1 2", "Google Ads Quality Score 1-2 — Tăng Điểm", "low quality score fix"),
  pain("fanpage-khong-tang-follower", "fanpage không tăng follower", "Fanpage Không Tăng Follower — Chiến Lược Organic", "follower growth stall"),
  pain("gbp-khong-hien-thi-maps", "GBP không hiển thị maps", "GBP Không Hiển Thị Trên Maps — Khắc Phục", "GBP not showing"),
  pain("ads-bi-tu-choi-quang-cao", "ads bị từ chối quảng cáo", "Ads Bị Từ Chối Quảng Cáo — Kháng Cáo Meta", "ad disapproval fix"),
  pain("landing-khong-convert-tren-mobile", "landing không convert trên mobile", "Landing Không Convert Trên Mobile — Sửa UX", "mobile conversion fix"),
  pain("crm-lead-bi-trung", "CRM lead bị trùng", "CRM Lead Bị Trùng — Deduplicate Pipeline", "duplicate lead CRM"),
  pain("email-bounce-rate-cao", "email bounce rate cao", "Email Bounce Rate Cao — Làm Sạch List", "email bounce fix"),
  pain("website-khong-co-cta-ro", "website không có CTA rõ", "Website Không Có CTA Rõ — Tăng Chuyển Đổi", "CTA visibility fix"),
  pain("blog-khong-rank-tu-khoa", "blog không rank từ khóa", "Blog Không Rank Từ Khóa — Audit On-Page", "blog ranking stagnation"),
  pain("google-ads-click-gia", "google ads click giả", "Google Ads Click Giả — Chặn Invalid Click", "click fraud protection"),
  pain("facebook-pixel-trung-event", "facebook pixel trùng event", "Facebook Pixel Trùng Event — Sửa Tracking", "duplicate pixel events"),
  pain("zalo-oa-khong-co-message", "zalo OA không có message", "Zalo OA Không Có Message — Kích Hoạt Chat", "Zalo OA engagement"),
  pain("content-khong-co-backlink", "content không có backlink", "Content Không Có Backlink — Xây Off-Page", "content no backlinks"),
  pain("sitemap-khong-duoc-crawl", "sitemap không được crawl", "Sitemap Không Được Crawl — Submit GSC", "sitemap crawl issue"),
  pain("website-khong-co-trust-signal", "website không có trust signal", "Website Không Có Trust Signal — Bổ Sung Uy Tín", "trust signals missing"),
  pain("ads-audience-qua-hep", "ads audience quá hẹp", "Ads Audience Quá Hẹp — Mở Rộng Targeting", "narrow audience fix"),
  pain("ads-audience-qua-rong", "ads audience quá rộng", "Ads Audience Quá Rộng — Thu Hẹp Targeting", "broad audience fix"),
  pain("google-maps-thieu-category", "google maps thiếu category", "Google Maps Thiếu Category — Tối Ưu GBP", "GBP category fix"),
  pain("fanpage-khong-co-cover-video", "fanpage không có cover video", "Fanpage Không Có Cover Video — Thiết Kế", "Facebook cover video"),
  pain("website-khong-co-live-chat", "website không có live chat", "Website Không Có Live Chat — Mất Lead", "live chat integration"),
  pain("checkout-khong-co-cod", "checkout không có COD", "Checkout Không Có COD — Thêm Thanh Toán", "COD payment missing"),
  pain("product-page-khong-co-review", "product page không có review", "Product Page Không Có Review — Social Proof", "product review missing"),
  pain("category-page-thin-content", "category page thin content", "Category Page Thin Content — Viết Mô Tả", "thin category page"),
  pain("local-seo-khong-co-citation", "local SEO không có citation", "Local SEO Không Có Citation — Xây NAP", "local citation missing"),
];

/** K — 20: thuật ngữ */
const K_LAGI = [
  laGi("performance-max-la-gi", "performance max là gì", "Performance Max Là Gì? Google PMax", "Google Performance Max"),
  laGi("local-service-ads-la-gi", "local service ads là gì", "Local Service Ads Là Gì?", "Google LSA"),
  laGi("lead-ads-la-gi", "lead ads là gì", "Lead Ads Là Gì? Facebook Lead Form", "Meta lead ads"),
  laGi("catalog-ads-la-gi", "catalog ads là gì", "Catalog Ads Là Gì? Dynamic Product", "Meta catalog ads"),
  laGi("advantage-plus-la-gi", "advantage plus là gì", "Advantage+ Là Gì? Meta Automation", "Meta Advantage+"),
  laGi("smart-bidding-la-gi", "smart bidding là gì", "Smart Bidding Là Gì? Google Ads", "Google automated bidding"),
  laGi("broad-match-modifier-la-gi", "broad match modifier là gì", "Broad Match Modifier Là Gì?", "keyword match type"),
  laGi("negative-keyword-la-gi", "negative keyword là gì", "Negative Keyword Là Gì?", "Google negative keywords"),
  laGi("quality-score-la-gi", "quality score là gì", "Quality Score Là Gì? Google Ads", "Google quality score"),
  laGi("ad-rank-la-gi", "ad rank là gì", "Ad Rank Là Gì? Thứ Hạng Quảng Cáo", "Google ad rank"),
  laGi("impression-share-la-gi", "impression share là gì", "Impression Share Là Gì?", "Google impression share"),
  laGi("gbp-la-gi", "GBP là gì", "GBP Là Gì? Google Business Profile", "Google Business Profile"),
  laGi("nap-la-gi-seo", "NAP là gì SEO", "NAP Là Gì Trong SEO Local?", "name address phone"),
  laGi("citation-la-gi-seo", "citation là gì SEO", "Citation Là Gì Trong SEO Local?", "local citation SEO"),
  laGi("local-pack-la-gi-maps", "local pack là gì maps", "Local Pack Là Gì? 3 Kết Quả Maps", "Google local 3-pack"),
  laGi("review-signal-la-gi", "review signal là gì", "Review Signal Là Gì? SEO Local", "review ranking factor"),
  laGi("geo-tag-anh-la-gi", "geo tag ảnh là gì", "Geo Tag Ảnh Là Gì? SEO Địa Phương", "geotag images SEO"),
];

/** L — 15: agency */
const L_AGENCY = [
  agency("agency-facebook-ads-viet-nam", "agency facebook ads việt nam", "Agency Facebook Ads Việt Nam Uy Tín", "quản lý Meta ads"),
  agency("agency-google-ads-viet-nam", "agency google ads việt nam", "Agency Google Ads Việt Nam Chuyên Nghiệp", "quản lý Google Ads"),
  agency("agency-seo-local", "agency SEO local", "Agency SEO Local — Tối Ưu Google Maps", "local SEO agency"),
  agency("agency-thiet-ke-fanpage", "agency thiết kế fanpage", "Agency Thiết Kế Fanpage Chuyên Nghiệp", "fanpage design agency"),
  agency("dich-vu-quan-ly-google-business", "dịch vụ quản lý google business", "Dịch Vụ Quản Lý Google Business Profile", "GBP management"),
  agency("dich-vu-setup-facebook-pixel", "dịch vụ setup facebook pixel", "Dịch Vụ Setup Facebook Pixel & CAPI", "Meta pixel setup"),
  agency("dich-vu-setup-google-ads", "dịch vụ setup google ads", "Dịch Vụ Setup Google Ads Tài Khoản Mới", "Google Ads account setup"),
  agency("dich-vu-audit-facebook-ads", "dịch vụ audit facebook ads", "Dịch Vụ Audit Facebook Ads Toàn Diện", "Meta ads audit"),
  agency("dich-vu-audit-google-ads", "dịch vụ audit google ads", "Dịch Vụ Audit Google Ads Hiệu Quả", "Google Ads audit"),
  agency("dich-vu-viet-content-fanpage", "dịch vụ viết content fanpage", "Dịch Vụ Viết Content Fanpage 30 Ngày", "fanpage content writing"),
  agency("dich-vu-quan-ly-reputation", "dịch vụ quản lý reputation", "Dịch Vụ Quản Lý Reputation Online", "online reputation management"),
  agency("dich-vu-xay-dung-local-citation", "dịch vụ xây dựng local citation", "Dịch Vụ Xây Dựng Local Citation", "local citation building"),
  agency("dich-vu-tu-van-chien-luoc-ads", "dịch vụ tư vấn chiến lược ads", "Dịch Vụ Tư Vấn Chiến Lược Ads Đa Kênh", "paid media strategy"),
  agency("dich-vu-thiet-ke-landing-ads", "dịch vụ thiết kế landing ads", "Dịch Vụ Thiết Kế Landing Page Chạy Ads", "ads landing page design"),
];

export const KEYWORDS_500_BATCH5 = [
  ...A_WEB_CITY,
  ...B_EXTRA_WEB,
  ...C_PRICING,
  ...D_FB,
  ...E_GADS,
  ...F_FANPAGE,
  ...G_SEO_LOCAL,
  ...H_MAPS,
  ...I_COMPARE,
  ...J_PAIN,
  ...K_LAGI,
  ...L_AGENCY,
];

export const KEYWORDS_500_BATCH5_MARKETING_ONLY = new Set([
  ...I_COMPARE.map((e) => e.slug),
  ...J_PAIN.map((e) => e.slug),
  ...K_LAGI.map((e) => e.slug),
  ...L_AGENCY.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500_BATCH5.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500_BATCH5 expected ${EXPECTED} entries, got ${KEYWORDS_500_BATCH5.length}`);
}

const slugSet = new Set(KEYWORDS_500_BATCH5.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500_BATCH5.length) {
  const dupes = KEYWORDS_500_BATCH5.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH5 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500_BATCH5.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500_BATCH5.length) {
  const dupes = KEYWORDS_500_BATCH5.map((e) => e.keywordsMain.toLowerCase()).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500_BATCH5 duplicate keywords: ${[...new Set(dupes)].join(", ")}`);
}
