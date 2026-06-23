/**
 * 500 từ khóa long-tail batch 2 — ngành×địa phương, báo giá, marketing, ads, maps, pain, so sánh.
 * Export: KEYWORDS_500
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function webIndustryCity(indSlug, citySlug, industry, city, angle) {
  const slug = `thiet-ke-website-${indSlug}-${citySlug}`;
  const kw = `thiết kế website ${industry} ${city}`;
  return {
    slug,
    keywordsMain: kw,
    h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
    angle,
    niche: "strategy",
  };
}

function webPricing(indSlug, industry, angle) {
  const slug = `bao-gia-thiet-ke-website-${indSlug}`;
  const kw = `báo giá thiết kế website ${industry}`;
  return {
    slug,
    keywordsMain: kw,
    h1: `Báo Giá Thiết Kế Website ${cap(industry)} 2026`,
    angle,
    niche: "strategy",
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

function marketingCity(citySlug, city, angle) {
  return {
    slug: `marketing-doanh-nghiep-${citySlug}`,
    keywordsMain: `marketing doanh nghiệp ${city}`,
    h1: `Marketing Doanh Nghiệp ${city} — Gói Phù Hợp SME`,
    angle,
    niche: "strategy",
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

function facebookAdsInd(slug, kw, angle) {
  return {
    slug: `quang-cao-facebook-${slug}`,
    keywordsMain: `quảng cáo facebook ${kw}`,
    h1: `Quảng Cáo Facebook ${cap(kw)} — Tối Ưu Ads`,
    angle,
    niche: "facebook-ads",
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

function seoLocalCity(citySlug, city, angle) {
  return {
    slug: `seo-local-doanh-nghiep-${citySlug}`,
    keywordsMain: `seo local ${city}`,
    h1: `SEO Local ${city} — Tối Ưu Địa Phương`,
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

function webFeature(indSlug, featSlug, industry, feature, angle) {
  return {
    slug: `thiet-ke-website-${featSlug}-${indSlug}`,
    keywordsMain: `thiết kế website ${feature} ${industry}`,
    h1: `Thiết Kế Website ${cap(feature)} ${cap(industry)}`,
    angle,
    niche: "strategy",
  };
}

function agency(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function googleAdsCity(citySlug, city, angle) {
  return {
    slug: `quang-cao-google-ads-${citySlug}`,
    keywordsMain: `quảng cáo google ads ${city}`,
    h1: `Quảng Cáo Google Ads ${city} Cho Doanh Nghiệp`,
    angle,
    niche: "google-ads",
  };
}

const INDUSTRIES = [
  ["spa", "spa", "website spa đặt lịch và SEO local"],
  ["nha-hang", "nhà hàng", "website F&B menu đặt bàn"],
  ["bat-dong-san", "bất động sản", "listing dự án và form lead BĐS"],
  ["nha-khoa", "nha khoa", "đặt lịch khám và giới thiệu dịch vụ"],
  ["tham-my-vien", "thẩm mỹ viện", "gallery dịch vụ và before-after"],
  ["khach-san", "khách sạn", "booking phòng và upsell dịch vụ"],
  ["gym-yoga", "gym yoga", "lịch lớp học và gói membership"],
  ["noi-that", "nội thất", "showcase dự án và catalog"],
  ["xay-dung", "xây dựng", "portfolio nhà thầu và HSNL"],
  ["trung-tam-anh-ngu", "trung tâm anh ngữ", "đăng ký khóa học online"],
  ["shop-my-pham", "shop mỹ phẩm", "ecommerce mỹ phẩm và review"],
  ["quan-cafe", "quán cafe", "menu cafe và đặt bàn"],
  ["phong-kham", "phòng khám", "đặt khám và chuyên khoa"],
  ["logistics", "logistics", "dịch vụ vận tải B2B"],
  ["du-lich", "du lịch", "package tour và booking"],
];

const CITIES = [
  ["tphcm", "TPHCM"],
  ["ha-noi", "Hà Nội"],
  ["da-nang", "Đà Nẵng"],
  ["can-tho", "Cần Thơ"],
  ["binh-duong", "Bình Dương"],
];

/** A — 75: ngành × 5 thành phố */
const A_WEB_CITY = [];
for (const [indSlug, industry, baseAngle] of INDUSTRIES) {
  for (const [citySlug, city] of CITIES) {
    A_WEB_CITY.push(
      webIndustryCity(indSlug, citySlug, industry, city, `${baseAngle} tại ${city}`),
    );
  }
}

/** B — 40: báo giá × ngành (mở rộng) */
const B_PRICING_IND = [
  ["gym", "gym", "giá website gym đăng ký lớp"],
  ["yoga", "yoga", "giá web yoga studio"],
  ["phong-kham-da-lieu", "phòng khám da liễu", "giá website da liễu"],
  ["nha-thuoc", "nhà thuốc", "giá web nhà thuốc GPP"],
  ["trung-tam-dau-tu", "trung tâm đầu tư", "giá web tư vấn tài chính"],
  ["cong-ty-tai-chinh", "công ty tài chính", "giá website fintech"],
  ["dich-vu-ve-sinh", "dịch vụ vệ sinh", "giá web công ty vệ sinh"],
  ["sua-chua-dien-lanh", "sửa chữa điện lạnh", "giá web dịch vụ điện lạnh"],
  ["cua-hang-tap-hoa", "cửa hàng tạp hóa", "giá web siêu thị mini"],
  ["cua-hang-thuc-pham", "cửa hàng thực phẩm", "giá web thực phẩm sạch"],
  ["dai-ly-vat-lieu", "đại lý vật liệu", "giá web vật liệu xây dựng"],
  ["showroom-noi-that", "showroom nội thất", "giá web showroom"],
  ["studio-tattoo", "studio tattoo", "giá web xăm nghệ thuật"],
  ["tiem-barber", "tiệm barber", "giá web barbershop"],
  ["trung-tam-massage", "trung tâm massage", "giá web massage body"],
  ["phong-tap-pickleball", "phòng tập pickleball", "giá web sân pickleball"],
  ["trai-cay-sach", "trái cây sạch", "giá web shop trái cây"],
  ["cua-hang-hoa", "cửa hàng hoa", "giá web shop hoa tươi"],
  ["dich-vu-sua-xe", "dịch vụ sửa xe", "giá web garage"],
  ["cua-hang-phu-kien-xe", "cửa hàng phụ kiện xe", "giá web phụ kiện ô tô"],
  ["trung-tam-lai-xe", "trung tâm lái xe", "giá web trường lái"],
  ["truong-dau-bep", "trường đầu bếp", "giá web trường nghề ẩm thực"],
  ["co-so-san-xuat", "cơ sở sản xuất", "giá web nhà máy"],
  ["xuong-in", "xưởng in", "giá web xưởng in ấn"],
  ["cong-ty-bao-ve", "công ty bảo vệ", "giá web dịch vụ bảo vệ"],
  ["dich-vu-chuyen-nha", "dịch vụ chuyển nhà", "giá web chuyển nhà"],
  ["thiet-bi-y-te", "thiết bị y tế", "giá web bán thiết bị y tế"],
  ["cua-hang-may-tinh", "cửa hàng máy tính", "giá web shop laptop"],
  ["dien-may", "điện máy", "giá web điện máy gia dụng"],
  ["cua-hang-giay-dep", "cửa hàng giày dép", "giá web shop giày"],
  ["thoi-trang-tre-em", "thời trang trẻ em", "giá web shop quần áo trẻ"],
  ["do-choi-tre-em", "đồ chơi trẻ em", "giá web shop đồ chơi"],
  ["cua-hang-sach", "cửa hàng sách", "giá web nhà sách online"],
  ["van-phong-pham", "văn phòng phẩm", "giá web VPP B2B"],
  ["dich-vu-in-an", "dịch vụ in ấn", "giá web công ty in"],
  ["studio-podcast", "studio podcast", "giá web studio thu âm"],
  ["trung-tam-robotics", "trung tâm robotics", "giá web STEM robotics"],
  ["khoa-hoc-lap-trinh", "khóa học lập trình", "giá web bootcamp code"],
  ["trung-tam-am-nhac", "trung tâm âm nhạc", "giá web trường nhạc"],
  ["phong-trao-the-thao", "phong trào thể thao", "giá web CLB thể thao"],
].map(([s, k, a]) => webPricing(s, k, a));

/** C — 45: marketing × ngành */
const C_MKT = [
  ["quan-cafe", "quán cafe", "marketing cafe tăng khách quen"],
  ["phong-kham-nhi", "phòng khám nhi", "marketing nhi khoa uy tín"],
  ["phong-kham-san", "phòng khám sản", "marketing sản phụ khoa"],
  ["nha-thuoc", "nhà thuốc", "marketing nhà thuốc local"],
  ["cua-hang-tien-loi", "cửa hàng tiện lợi", "marketing chuỗi tiện lợi"],
  ["sieu-thi-mini", "siêu thị mini", "marketing siêu thị khu dân cư"],
  ["cho-online", "chợ online", "marketing sàn chợ điện tử"],
  ["dich-vu-giao-nhanh", "dịch vụ giao nhanh", "marketing ship nội thành"],
  ["kho-bai", "kho bãi", "marketing kho vận B2B"],
  ["xuong-go", "xưởng gỗ", "marketing xưởng mộc"],
  ["xuong-in-3d", "xưởng in 3D", "marketing in 3D prototype"],
  ["cong-ty-sukien", "công ty sự kiện", "marketing event agency"],
  ["wedding-planner", "wedding planner", "marketing cưới hỏi"],
  ["studio-makeup", "studio makeup", "marketing makeup cô dâu"],
  ["trung-tam-dan", "trung tâm dần", "marketing học nhạc cụ"],
  ["trung-tam-hoi-hoa", "trung tâm hội họa", "marketing mỹ thuật"],
  ["trai-he-quoc-te", "trại hè quốc tế", "marketing trại hè du học"],
  ["trung-tam-steam", "trung tâm STEAM", "marketing giáo dục STEAM"],
  ["hoc-vien-bong-da", "học viện bóng đá", "marketing học viện thể thao"],
  ["phong-cach-song", "phong cách sống", "marketing lifestyle brand"],
  ["cong-ty-cleaning", "công ty cleaning", "marketing vệ sinh văn phòng"],
  ["dich-vu-cay-xanh", "dịch vụ cây xanh", "marketing cảnh quan"],
  ["thiet-bi-cong-nghiep", "thiết bị công nghiệp", "marketing máy móc B2B"],
  ["phan-phoi-thuc-pham", "phân phối thực phẩm", "marketing FMCG"],
  ["chuoi-nha-hang", "chuỗi nhà hàng", "marketing F&B multi-branch"],
  ["chuoi-spa", "chuỗi spa", "marketing spa franchise"],
  ["thuong-hieu-dien-tu", "thương hiệu điện tử", "marketing gadget brand"],
  ["thuong-hieu-thoi-trang", "thương hiệu thời trang", "marketing fashion brand"],
  ["thuong-hieu-my-pham", "thương hiệu mỹ phẩm", "marketing skincare brand"],
  ["app-mobile", "app mobile", "marketing app tải và retention"],
  ["game-mobile", "game mobile", "marketing game UA"],
  ["khoa-hoc-online", "khóa học online", "marketing elearning"],
  ["podcast-brand", "podcast brand", "marketing podcast sponsor"],
  ["youtube-channel", "kênh youtube", "marketing YouTube creator"],
  ["kols-koc", "KOLs KOC", "marketing influencer Việt Nam"],
  ["affiliate-marketing", "affiliate marketing", "marketing tiếp thị liên kết"],
  ["email-marketing", "email marketing", "marketing automation email"],
  ["sms-marketing", "SMS marketing", "marketing ZNS SMS"],
  ["loyalty-program", "loyalty program", "marketing khách hàng thân thiết"],
  ["referral-marketing", "referral marketing", "marketing giới thiệu bạn bè"],
  ["community-marketing", "community marketing", "marketing cộng đồng"],
  ["b2b-saas", "B2B SaaS", "marketing phần mềm doanh nghiệp"],
  ["b2b-manufacturing", "B2B sản xuất", "marketing nhà máy xuất khẩu"],
  ["export-company", "công ty xuất khẩu", "marketing xuất khẩu B2B"],
  ["import-company", "công ty nhập khẩu", "marketing nhập khẩu phân phối"],
].map(([s, k, a]) => marketingInd(s, k, a));

/** D — 20: marketing × thành phố */
const D_MKT_CITY = [
  ["hai-phong", "Hải Phòng", "marketing SME Hải Phòng"],
  ["quang-ninh", "Quảng Ninh", "marketing du lịch Quảng Ninh"],
  ["nha-trang", "Nha Trang", "marketing du lịch Nha Trang"],
  ["vung-tau", "Vũng Tàu", "marketing dịch vụ Vũng Tàu"],
  ["hue", "Huế", "marketing cố đô Huế"],
  ["dong-nai", "Đồng Nai", "marketing KCN Đồng Nai"],
  ["long-an", "Long An", "marketing Long An"],
  ["bac-ninh", "Bắc Ninh", "marketing KCN Bắc Ninh"],
  ["thanh-hoa", "Thanh Hóa", "marketing Thanh Hóa"],
  ["nghe-an", "Nghệ An", "marketing Vinh Nghệ An"],
  ["khanh-hoa", "Khánh Hòa", "marketing Khánh Hòa"],
  ["lam-dong", "Lâm Đồng", "marketing Đà Lạt Lâm Đồng"],
  ["quang-nam", "Quảng Nam", "marketing Hội An Quảng Nam"],
  ["binh-dinh", "Bình Định", "marketing Quy Nhơn"],
  ["an-giang", "An Giang", "marketing ĐBSCL An Giang"],
  ["tien-giang", "Tiền Giang", "marketing Tiền Giang"],
  ["dong-thap", "Đồng Tháp", "marketing Đồng Tháp"],
  ["ca-mau", "Cà Mau", "marketing Cà Mau"],
  ["soc-trang", "Sóc Trăng", "marketing Sóc Trăng"],
  ["gia-lai", "Gia Lai", "marketing Pleiku Gia Lai"],
].map(([s, c, a]) => marketingCity(s, c, a));

/** E — 30: Google Ads × ngành */
const E_GADS = [
  ["spa", "spa", "Google Ads spa đặt lịch"],
  ["nha-hang", "nhà hàng", "Google Ads nhà hàng đặt bàn"],
  ["khach-san", "khách sạn", "Google Ads khách sạn booking"],
  ["nha-khoa", "nha khoa", "Google Ads nha khoa implant"],
  ["bat-dong-san", "bất động sản", "Google Ads BĐS lead"],
  ["noi-that", "nội thất", "Google Ads nội thất"],
  ["xay-dung", "xây dựng", "Google Ads nhà thầu"],
  ["luat-su", "luật sư", "Google Ads văn phòng luật"],
  ["ke-toan", "kế toán", "Google Ads dịch vụ kế toán"],
  ["gym", "gym", "Google Ads phòng gym"],
  ["tham-my", "thẩm mỹ", "Google Ads thẩm mỹ viện"],
  ["du-hoc", "du học", "Google Ads trung tâm du học"],
  ["trung-tam-anh-ngu", "trung tâm anh ngữ", "Google Ads khóa tiếng Anh"],
  ["shop-thoi-trang", "shop thời trang", "Google Ads ecommerce fashion"],
  ["shop-my-pham", "shop mỹ phẩm", "Google Ads mỹ phẩm"],
  ["dien-may", "điện máy", "Google Ads điện máy"],
  ["o-to", "ô tô", "Google Ads đại lý xe"],
  ["sua-chua-nha", "sửa chữa nhà", "Google Ads thợ sửa nhà"],
  ["dien-lanh", "điện lạnh", "Google Ads sửa điện lạnh"],
  ["ve-sinh", "vệ sinh", "Google Ads dịch vụ vệ sinh"],
  ["chuyen-nha", "chuyển nhà", "Google Ads chuyển nhà"],
  ["giao-hang", "giao hàng", "Google Ads ship hàng"],
  ["khoa-hoc-online", "khóa học online", "Google Ads elearning"],
  ["phong-kham", "phòng khám", "Google Ads phòng khám"],
  ["nong-san", "nông sản", "Google Ads nông sản sạch"],
  ["thuc-pham", "thực phẩm", "Google Ads thực phẩm"],
  ["noi-that-van-phong", "nội thất văn phòng", "Google Ads nội thất VP"],
  ["in-an", "in ấn", "Google Ads công ty in"],
  ["logistics", "logistics", "Google Ads logistics B2B"],
  ["phan-mem", "phần mềm", "Google Ads SaaS B2B"],
].map(([s, k, a]) => googleAdsInd(s, k, a));

/** F — 35: Facebook Ads × ngành */
const F_FB = [
  ["quan-an-viet", "quán ăn việt", "ads Facebook quán ăn"],
  ["quan-com", "quán cơm", "ads Facebook quán cơm"],
  ["banh-mi", "bánh mì", "ads Facebook tiệm bánh mì"],
  ["tra-sua", "trà sữa", "ads Facebook trà sữa"],
  ["banh-ngot", "bánh ngọt", "ads Facebook tiệm bánh"],
  ["dich-vu-sua-xe", "dịch vụ sửa xe", "ads Facebook garage"],
  ["rua-xe", "rửa xe", "ads Facebook rửa xe"],
  ["tiem-toc-nam", "tiệm tóc nam", "ads Facebook barbershop"],
  ["tiem-toc-nu", "tiệm tóc nữ", "ads Facebook salon tóc"],
  ["nail-art", "nail art", "ads Facebook tiệm nail"],
  ["massage-body", "massage body", "ads Facebook massage"],
  ["phong-kham-thu-cung", "phòng khám thú cưng", "ads Facebook thú y"],
  ["pet-shop", "pet shop", "ads Facebook shop thú cưng"],
  ["cua-hang-hoa-tuoi", "cửa hàng hoa tươi", "ads Facebook shop hoa"],
  ["qua-tang", "quà tặng", "ads Facebook shop quà"],
  ["do-luu-niem", "đồ lưu niệm", "ads Facebook quà lưu niệm"],
  ["thiet-bi-the-thao", "thiết bị thể thao", "ads Facebook đồ thể thao"],
  ["cua-hang-balo", "cửa hàng balo", "ads Facebook balo túi xách"],
  ["kinh-mat-thoi-trang", "kính mắt thời trang", "ads Facebook kính mắt"],
  ["dong-ho", "đồng hồ", "ads Facebook shop đồng hồ"],
  ["trang-suc", "trang sức", "ads Facebook trang sức"],
  ["vang-bac", "vàng bạc", "ads Facebook tiệm vàng"],
  ["cua-hang-tra", "cửa hàng trà", "ads Facebook trà specialty"],
  ["ca-phe-rang-xay", "cà phê rang xay", "ads Facebook cà phê specialty"],
  ["ruou-thu-cong", "rượu thủ công", "ads Facebook craft beer"],
  ["nha-hang-chay", "nhà hàng chay", "ads Facebook nhà hàng chay"],
  ["thuc-pham-chay", "thực phẩm chay", "ads Facebook đồ chay"],
  ["thuc-pham-huu-co", "thực phẩm hữu cơ", "ads Facebook organic food"],
  ["hang-handmade", "hàng handmade", "ads Facebook đồ handmade"],
  ["shop-vintage", "shop vintage", "ads Facebook đồ vintage"],
  ["do-choi-giao-duc", "đồ chơi giáo dục", "ads Facebook đồ chơi STEM"],
  ["sach-ebook", "sách ebook", "ads Facebook bán ebook"],
  ["khoa-hoc-ngan", "khóa học ngắn", "ads Facebook mini course"],
  ["workshop-cuoi-tuan", "workshop cuối tuần", "ads Facebook workshop"],
  ["co-working", "co-working", "ads Facebook không gian làm việc"],
].map(([s, k, a]) => facebookAdsInd(s, k, a));

/** G — 25: fanpage × ngành */
const G_FANPAGE = [
  ["spa", "spa", "fanpage spa chuyên nghiệp"],
  ["nha-hang", "nhà hàng", "fanpage nhà hàng F&B"],
  ["khach-san", "khách sạn", "fanpage khách sạn resort"],
  ["nha-khoa", "nha khoa", "fanpage nha khoa uy tín"],
  ["tham-my", "thẩm mỹ", "fanpage thẩm mỹ viện"],
  ["gym", "gym", "fanpage phòng gym"],
  ["bat-dong-san", "bất động sản", "fanpage BĐS dự án"],
  ["noi-that", "nội thất", "fanpage nội thất"],
  ["xay-dung", "xây dựng", "fanpage nhà thầu"],
  ["shop-thoi-trang", "shop thời trang", "fanpage fashion"],
  ["shop-my-pham", "shop mỹ phẩm", "fanpage mỹ phẩm"],
  ["trung-tam-anh-ngu", "trung tâm anh ngữ", "fanpage trung tâm ngoại ngữ"],
  ["truong-mam-non", "trường mầm non", "fanpage mầm non"],
  ["phong-kham", "phòng khám", "fanpage phòng khám"],
  ["du-lich", "du lịch", "fanpage công ty du lịch"],
  ["event", "sự kiện", "fanpage tổ chức sự kiện"],
  ["wedding", "cưới hỏi", "fanpage wedding"],
  ["nong-san", "nông sản", "fanpage nông sản sạch"],
  ["cua-hang-tien-loi", "cửa hàng tiện lợi", "fanpage tiện lợi"],
  ["dien-may", "điện máy", "fanpage điện máy"],
  ["o-to", "ô tô", "fanpage đại lý xe"],
  ["luat-su", "luật sư", "fanpage văn phòng luật"],
  ["ke-toan", "kế toán", "fanpage dịch vụ kế toán"],
  ["logistics", "logistics", "fanpage logistics"],
  ["phan-mem", "phần mềm", "fanpage công ty phần mềm"],
].map(([s, k, a]) => fanpageInd(s, k, a));

/** H — 30: SEO local × ngành */
const H_SEO_IND = [
  ["quan-cafe", "quán cafe", "SEO local quán cafe"],
  ["tiem-nail", "tiệm nail", "SEO local tiệm nail"],
  ["barbershop", "barbershop", "SEO local cắt tóc nam"],
  ["phong-gym", "phòng gym", "SEO local phòng gym"],
  ["yoga-pilates", "yoga pilates", "SEO local yoga studio"],
  ["phong-kham-nhi", "phòng khám nhi", "SEO local nhi khoa"],
  ["phong-kham-san", "phòng khám sản", "SEO local sản phụ"],
  ["nha-thuoc", "nhà thuốc", "SEO local nhà thuốc"],
  ["cua-hang-thuc-pham", "cửa hàng thực phẩm", "SEO local thực phẩm"],
  ["cua-hang-hoa", "cửa hàng hoa", "SEO local shop hoa"],
  ["pet-shop", "pet shop", "SEO local thú cưng"],
  ["phong-kham-thu-y", "phòng khám thú y", "SEO local thú y"],
  ["cua-hang-dien-thoai", "cửa hàng điện thoại", "SEO local điện thoại"],
  ["cua-hang-may-tinh", "cửa hàng máy tính", "SEO local máy tính"],
  ["sua-chua-dien-thoai", "sửa chữa điện thoại", "SEO local sửa điện thoại"],
  ["cua-hang-giay", "cửa hàng giày", "SEO local shop giày"],
  ["cua-hang-quan-ao", "cửa hàng quần áo", "SEO local shop quần áo"],
  ["studio-anh-cuoi", "studio ảnh cưới", "SEO local studio cưới"],
  ["wedding-planner", "wedding planner", "SEO local wedding"],
  ["dich-vu-sua-nha", "dịch vụ sửa nhà", "SEO local sửa nhà"],
  ["tho-dien-nuoc", "thợ điện nước", "SEO local điện nước"],
  ["dich-vu-ve-sinh", "dịch vụ vệ sinh", "SEO local vệ sinh"],
  ["giao-hang-nhanh", "giao hàng nhanh", "SEO local ship hàng"],
  ["kho-bai", "kho bãi", "SEO local kho vận"],
  ["cong-ty-in", "công ty in", "SEO local in ấn"],
  ["xuong-may", "xưởng may", "SEO local xưởng may"],
  ["xuong-go", "xưởng gỗ", "SEO local xưởng mộc"],
  ["dai-ly-bao-hiem", "đại lý bảo hiểm", "SEO local bảo hiểm"],
  ["cong-ty-tu-van", "công ty tư vấn", "SEO local tư vấn"],
  ["trung-tam-hoc-them", "trung tâm học thêm", "SEO local học thêm"],
].map(([s, k, a]) => seoLocalInd(s, k, a));

/** I — 20: SEO local × thành phố */
const I_SEO_CITY = [
  ["hai-phong", "Hải Phòng", "SEO local doanh nghiệp Hải Phòng"],
  ["quang-ninh", "Quảng Ninh", "SEO local Quảng Ninh"],
  ["nha-trang", "Nha Trang", "SEO local Nha Trang"],
  ["vung-tau", "Vũng Tàu", "SEO local Vũng Tàu"],
  ["hue", "Huế", "SEO local Huế"],
  ["dong-nai", "Đồng Nai", "SEO local Đồng Nai"],
  ["long-an", "Long An", "SEO local Long An"],
  ["bac-ninh", "Bắc Ninh", "SEO local Bắc Ninh"],
  ["thanh-hoa", "Thanh Hóa", "SEO local Thanh Hóa"],
  ["nghe-an", "Nghệ An", "SEO local Nghệ An"],
  ["khanh-hoa", "Khánh Hòa", "SEO local Khánh Hòa"],
  ["lam-dong", "Lâm Đồng", "SEO local Lâm Đồng"],
  ["quang-nam", "Quảng Nam", "SEO local Quảng Nam"],
  ["binh-dinh", "Bình Định", "SEO local Bình Định"],
  ["an-giang", "An Giang", "SEO local An Giang"],
  ["tien-giang", "Tiền Giang", "SEO local Tiền Giang"],
  ["dong-thap", "Đồng Tháp", "SEO local Đồng Tháp"],
  ["ca-mau", "Cà Mau", "SEO local Cà Mau"],
  ["soc-trang", "Sóc Trăng", "SEO local Sóc Trăng"],
  ["gia-lai", "Gia Lai", "SEO local Gia Lai"],
].map(([s, c, a]) => seoLocalCity(s, c, a));

/** J — 15: Maps × ngành × thành phố */
const J_MAPS = [
  ["spa", "tphcm", "spa", "TPHCM", "SEO Maps spa Sài Gòn"],
  ["nha-hang", "ha-noi", "nhà hàng", "Hà Nội", "Maps nhà hàng Hà Nội"],
  ["nha-khoa", "tphcm", "nha khoa", "TPHCM", "Maps nha khoa TPHCM"],
  ["tham-my", "ha-noi", "thẩm mỹ", "Hà Nội", "Maps thẩm mỹ Hà Nội"],
  ["gym", "da-nang", "gym", "Đà Nẵng", "Maps gym Đà Nẵng"],
  ["khach-san", "da-nang", "khách sạn", "Đà Nẵng", "Maps khách sạn Đà Nẵng"],
  ["bat-dong-san", "tphcm", "bất động sản", "TPHCM", "Maps BĐS TPHCM"],
  ["quan-cafe", "tphcm", "quán cafe", "TPHCM", "Maps cafe TPHCM"],
  ["tiem-nail", "ha-noi", "tiệm nail", "Hà Nội", "Maps nail Hà Nội"],
  ["phong-kham", "can-tho", "phòng khám", "Cần Thơ", "Maps phòng khám Cần Thơ"],
  ["noi-that", "binh-duong", "nội thất", "Bình Dương", "Maps nội thất Bình Dương"],
  ["xay-dung", "tphcm", "xây dựng", "TPHCM", "Maps nhà thầu TPHCM"],
  ["shop-my-pham", "ha-noi", "shop mỹ phẩm", "Hà Nội", "Maps mỹ phẩm HN"],
  ["trung-tam-anh-ngu", "tphcm", "trung tâm anh ngữ", "TPHCM", "Maps anh ngữ TPHCM"],
  ["du-lich", "da-nang", "du lịch", "Đà Nẵng", "Maps tour Đà Nẵng"],
].map(([is, cs, i, c, a]) => mapsIndCity(is, cs, i, c, a));

/** K — 30: so sánh */
const K_COMPARE = [
  compare("instagram-hay-facebook-ads", "instagram hay facebook ads", "Instagram Hay Facebook Ads?", "so sánh Meta ads", "facebook-ads"),
  compare("youtube-ads-hay-facebook-ads", "youtube ads hay facebook ads", "YouTube Ads Hay Facebook Ads?", "video ads so sánh", "google-ads"),
  compare("google-search-hay-display", "google search hay display", "Google Search Hay Display Ads?", "chọn loại campaign", "google-ads"),
  compare("seo-local-hay-ads-local", "seo local hay ads local", "SEO Local Hay Ads Local?", "organic vs paid local", "seo"),
  compare("website-hay-landing-ads", "website hay landing ads", "Website Hay Landing Chạy Ads?", "điểm đến quảng cáo", "strategy"),
  compare("blog-hay-video-marketing", "blog hay video marketing", "Blog Hay Video Marketing?", "content format", "content"),
  compare("email-hay-zalo-marketing", "email hay zalo marketing", "Email Hay Zalo Marketing?", "kênh nurture Việt Nam", "strategy"),
  compare("influencer-hay-ads", "influencer hay ads", "Influencer Hay Ads Trả Phí?", "KOL vs performance", "strategy"),
  compare("marketplace-hay-website-rieng", "marketplace hay website riêng", "Marketplace Hay Website Riêng?", "bán hàng đa kênh", "strategy"),
  compare("woocommerce-hay-haravan", "woocommerce hay haravan", "WooCommerce Hay Haravan?", "nền tảng ecommerce VN", "strategy"),
  compare("haravan-hay-shopify", "haravan hay shopify", "Haravan Hay Shopify?", "SaaS shop Việt Nam", "strategy"),
  compare("sapo-hay-kiotviet", "sapo hay kiotviet", "Sapo Hay KiotViet?", "POS và web bán hàng", "strategy"),
  compare("tu-lam-seo-hay-thue-seo", "tự làm seo hay thuê seo", "Tự Làm SEO Hay Thuê SEO?", "khi nào cần agency", "seo"),
  compare("content-dai-hay-ngan", "content dài hay ngắn", "Content Dài Hay Ngắn Cho SEO?", "độ dài bài viết", "content"),
  compare("nhieu-trang-hay-it-trang", "nhiều trang hay ít trang website", "Nhiều Trang Hay Ít Trang Website?", "cấu trúc site", "strategy"),
  compare("mau-san-hay-custom-web", "mẫu sẵn hay custom web", "Mẫu Sẵn Hay Custom Web?", "template vs custom", "strategy"),
  compare("hosting-vn-hay-nuoc-ngoai", "hosting VN hay nước ngoài", "Hosting VN Hay Nước Ngoài?", "tốc độ và SEO", "strategy"),
  compare("tu-van-hay-agency-marketing", "tư vấn hay agency marketing", "Tư Vấn Hay Agency Marketing?", "gói dịch vụ", "strategy"),
  compare("ads-branding-hay-performance", "ads branding hay performance", "Ads Branding Hay Performance?", "mục tiêu campaign", "strategy"),
  compare("retargeting-hay-lookalike", "retargeting hay lookalike", "Retargeting Hay Lookalike?", "audience Facebook", "facebook-ads"),
  compare("lead-ads-hay-traffic-ads", "lead ads hay traffic ads", "Lead Ads Hay Traffic Ads?", "mục tiêu Facebook", "facebook-ads"),
  compare("google-maps-hay-facebook-local", "google maps hay facebook local", "Google Maps Hay Facebook Local?", "local marketing", "seo"),
  compare("review-google-hay-facebook", "review google hay facebook", "Review Google Hay Facebook?", "social proof", "strategy"),
  compare("chatbot-hay-nhan-vien", "chatbot hay nhân viên", "Chatbot Hay Nhân Viên Tư Vấn?", "chăm sóc khách", "strategy"),
  compare("organic-social-hay-paid-social", "organic social hay paid social", "Organic Social Hay Paid Social?", "chiến lược social", "strategy"),
  compare("web-app-hay-mobile-app", "web app hay mobile app", "Web App Hay Mobile App?", "chọn nền tảng", "strategy"),
  compare("pwa-hay-native-app", "PWA hay native app", "PWA Hay Native App?", "ứng dụng di động", "strategy"),
  compare("crm-hay-spreadsheet", "CRM hay spreadsheet", "CRM Hay Spreadsheet Quản Lý Lead?", "quản lý khách hàng", "strategy"),
  compare("ga4-hay-ua", "GA4 hay Universal Analytics", "GA4 Hay Universal Analytics?", "đo lường website", "analytics"),
  compare("pixel-hay-capi", "pixel hay CAPI facebook", "Pixel Hay CAPI Facebook?", "tracking Meta", "facebook-ads"),
];

/** L — 30: pain point */
const L_PAIN = [
  pain("website-bi-404-nhieu", "website bị lỗi 404 nhiều", "Website Bị Lỗi 404 Nhiều — Sửa Và Redirect", "audit broken links"),
  pain("website-khong-index", "website không index", "Website Không Index Trên Google — Khắc Phục", "Search Console index"),
  pain("google-ads-bi-khoa-tai-khoan", "google ads bị khóa tài khoản", "Google Ads Bị Khóa Tài Khoản — Kháng Cáo", "policy Google Ads"),
  pain("fanpage-mat-tuong-tac", "fanpage mất tương tác", "Fanpage Mất Tương Tác — Cách Hồi Phục", "thuật toán Facebook organic"),
  pain("ads-lead-ao", "ads ra lead ảo", "Ads Ra Lead Ảo — Lọc Và Tối Ưu Form", "chất lượng lead ads"),
  pain("crm-khong-dong-bo", "CRM không đồng bộ lead", "CRM Không Đồng Bộ Lead — Tích Hợp Form", "automation lead"),
  pain("email-marketing-vao-spam", "email marketing vào spam", "Email Marketing Vào Spam — Cách Tránh", "deliverability email"),
  pain("website-khong-co-ssl", "website không có SSL", "Website Không Có SSL — Rủi Ro Và Cài HTTPS", "bảo mật website"),
  pain("meta-title-trung-lap", "meta title trùng lặp", "Meta Title Trùng Lặp — Sửa SEO On-Page", "duplicate title audit"),
  pain("noi-dung-ai-bi-phat", "nội dung AI bị phạt", "Nội Dung AI Bị Phạt Google — Viết Lại Chuẩn", "content quality E-E-A-T"),
  pain("backlink-chat-luong-thap", "backlink chất lượng thấp", "Backlink Chất Lượng Thấp — Disavow Và Xây Mới", "off-page SEO"),
  pain("google-maps-bi-hack", "google maps bị hack", "Google Maps Bị Hack — Khôi Phục GBP", "bảo mật Google Business"),
  pain("review-gia-google-maps", "review giả google maps", "Review Giả Google Maps — Xử Lý", "reputation management"),
  pain("ads-ngan-sach-nho-khong-hieu-qua", "ads ngân sách nhỏ không hiệu quả", "Ads Ngân Sách Nhỏ Không Hiệu Quả", "tối ưu budget nhỏ"),
  pain("khach-hang-khong-de-lai-sdt", "khách hàng không để lại SĐT", "Khách Không Để Lại SĐT — Tối Ưu Form", "form conversion"),
  pain("website-khong-co-zalo", "website không có zalo", "Website Không Có Zalo — Mất Lead Việt Nam", "tích hợp Zalo OA"),
  pain("fanpage-khong-co-website", "fanpage không có website", "Fanpage Không Có Website — Mất Uy Tín", "owned media"),
  pain("marketing-roi-am", "marketing ROI âm", "Marketing ROI Âm — Audit Chiến Lược", "đo ROI marketing"),
  pain("seo-tu-khoa-bi-rut", "seo từ khóa bị rớt hạng", "SEO Từ Khóa Bị Rớt Hạng — Phục Hồi", "rank drop recovery"),
  pain("content-khong-ai-doc", "content không ai đọc", "Content Không Ai Đọc — Cải Thiện Engagement", "content strategy"),
  pain("landing-khong-khop-ads", "landing không khớp ads", "Landing Không Khớp Ads — Message Match", "CRO ads landing"),
  pain("pixel-khong-track-duoc", "pixel không track được", "Pixel Không Track Được — Debug", "Meta pixel CAPI"),
  pain("google-analytics-sai-so", "google analytics sai số", "Google Analytics Sai Số — Kiểm Tra GA4", "tracking audit"),
  pain("website-khong-co-sitemap", "website không có sitemap", "Website Không Có Sitemap — Tạo Và Submit", "technical SEO"),
  pain("hinh-anh-website-nang", "hình ảnh website nặng", "Hình Ảnh Website Nặng — Nén Và WebP", "tối ưu ảnh"),
  pain("menu-website-roi", "menu website rối", "Menu Website Rối — Cải Thiện UX", "navigation UX"),
  pain("cta-khong-ro-rang", "CTA không rõ ràng", "CTA Không Rõ Ràng — Tăng Click", "call to action"),
  pain("blog-khong-co-luot-xem", "blog không có lượt xem", "Blog Không Có Lượt Xem — Phân Phối Content", "content distribution"),
  pain("maps-khong-co-anh", "google maps không có ảnh", "Google Maps Không Có Ảnh — Tối Ưu GBP", "ảnh Google Business"),
  pain("khach-khong-tim-thay-dia-chi", "khách không tìm thấy địa chỉ", "Khách Không Tìm Thấy Địa Chỉ — NAP Consistency", "NAP local SEO"),
];

/** M — 25: là gì / thuật ngữ */
const M_LAGI = [
  laGi("core-web-vitals-la-gi", "core web vitals là gì", "Core Web Vitals Là Gì? Ảnh Hưởng SEO Ra Sao?", "LCP INP CLS"),
  laGi("schema-markup-la-gi", "schema markup là gì", "Schema Markup Là Gì? Hướng Dẫn JSON-LD", "structured data"),
  laGi("conversion-rate-la-gi", "conversion rate là gì", "Conversion Rate Là Gì? Cách Tính CRO", "tỷ lệ chuyển đổi"),
  laGi("lookalike-audience-la-gi", "lookalike audience là gì", "Lookalike Audience Là Gì?", "audience Facebook"),
  laGi("retargeting-la-gi", "retargeting là gì", "Retargeting Là Gì? Remarketing Hiệu Quả", "quảng cáo tái tiếp cận"),
  laGi("local-pack-la-gi", "local pack là gì", "Local Pack Là Gì? 3 Kết Quả Maps", "Google local pack"),
  laGi("nap-consistency-la-gi", "NAP consistency là gì", "NAP Consistency Là Gì?", "tên địa chỉ phone local"),
  laGi("content-marketing-la-gi", "content marketing là gì", "Content Marketing Là Gì?", "chiến lược nội dung"),
  laGi("inbound-marketing-la-gi", "inbound marketing là gì", "Inbound Marketing Là Gì?", "thu hút khách organic"),
  laGi("cac-la-gi", "CAC là gì", "CAC Là Gì? Chi Phí Thu Khách", "customer acquisition cost"),
  laGi("ltv-la-gi", "LTV là gì", "LTV Là Gì? Giá Trị Trọn Đời Khách Hàng", "lifetime value"),
  laGi("roas-la-gi", "ROAS là gì", "ROAS Là Gì? Đo Hiệu Quả Ads", "return on ad spend"),
  laGi("ctr-la-gi", "CTR là gì", "CTR Là Gì? Tỷ Lệ Click Quảng Cáo", "click through rate"),
  laGi("cpc-la-gi", "CPC là gì", "CPC Là Gì? Chi Phí Mỗi Click", "cost per click"),
  laGi("cpm-la-gi", "CPM là gì", "CPM Là Gì? Chi Phí Mỗi Nghìn Hiển Thị", "cost per mille"),
  laGi("funnel-marketing-la-gi", "funnel marketing là gì", "Funnel Marketing Là Gì?", "phễu chuyển đổi"),
  laGi("lead-magnet-la-gi", "lead magnet là gì", "Lead Magnet Là Gì?", "thu lead miễn phí"),
  laGi("landing-page-la-gi", "landing page là gì", "Landing Page Là Gì? Trang Đích Chuyển Đổi", "trang đích ads"),
  laGi("heat-map-la-gi", "heat map là gì", "Heat Map Là Gì? Phân Tích Hành Vi", "CRO heatmap"),
  laGi("a-b-testing-la-gi", "A/B testing là gì", "A/B Testing Là Gì? Thử Nghiệm Chuyển Đổi", "split test"),
  laGi("chatbot-la-gi", "chatbot là gì", "Chatbot Là Gì? Tự Động Hóa Tư Vấn", "chatbot website"),
  laGi("crm-la-gi", "CRM là gì", "CRM Là Gì? Quản Lý Quan Hệ Khách Hàng", "customer relationship"),
  laGi("marketing-automation-la-gi", "marketing automation là gì", "Marketing Automation Là Gì?", "tự động hóa marketing"),
  laGi("omnichannel-la-gi", "omnichannel là gì", "Omnichannel Là Gì? Bán Hàng Đa Kênh", "đa kênh thống nhất"),
  laGi("brand-awareness-la-gi", "brand awareness là gì", "Brand Awareness Là Gì?", "nhận diện thương hiệu"),
];

/** N — 25: tính năng × ngành */
const N_FEATURE = [
  ["spa", "dat-lich", "spa", "đặt lịch", "website spa booking online"],
  ["nha-hang", "dat-ban", "nhà hàng", "đặt bàn", "website nhà hàng đặt bàn"],
  ["khach-san", "dat-phong", "khách sạn", "đặt phòng", "website khách sạn booking"],
  ["nha-khoa", "dat-kham", "nha khoa", "đặt khám", "website nha khoa đặt khám"],
  ["bat-dong-san", "form-lead", "bất động sản", "form lead", "website BĐS thu lead"],
  ["shop-my-pham", "thanh-toan", "shop mỹ phẩm", "thanh toán online", "web mỹ phẩm checkout"],
  ["thoi-trang", "lookbook", "thời trang", "lookbook", "website fashion lookbook"],
  ["gym", "dang-ky-lop", "gym", "đăng ký lớp", "website gym đăng ký lớp"],
  ["du-lich", "dat-tour", "du lịch", "đặt tour", "website du lịch đặt tour"],
  ["noi-that", "catalog-3d", "nội thất", "catalog 3D", "website nội thất catalog"],
  ["xay-dung", "gallery-du-an", "xây dựng", "gallery dự án", "website nhà thầu gallery"],
  ["phong-kham", "ho-so-benh-an", "phòng khám", "hồ sơ bệnh án", "website phòng khám bảo mật"],
  ["truong-hoc", "dang-ky-hoc", "trường học", "đăng ký học", "website trường tuyển sinh"],
  ["nong-san", "dat-hang", "nông sản", "đặt hàng", "website nông sản đặt hàng"],
  ["logistics", "tracking-don", "logistics", "tracking đơn", "website logistics tracking"],
  ["luat-su", "tu-van-online", "luật sư", "tư vấn online", "website luật form tư vấn"],
  ["ke-toan", "bao-gia-dich-vu", "kế toán", "báo giá dịch vụ", "website kế toán báo giá"],
  ["event", "dang-ky-su-kien", "sự kiện", "đăng ký sự kiện", "website event ticket"],
  ["elearning", "ban-khoa-hoc", "elearning", "bán khóa học", "website bán khóa học"],
  ["ban-hang", "gio-hang", "bán hàng", "giỏ hàng", "website ecommerce giỏ hàng"],
  ["spa", "tich-hop-zalo", "spa", "tích hợp Zalo", "website spa chat Zalo"],
  ["nha-hang", "menu-qr", "nhà hàng", "menu QR", "website nhà hàng menu QR"],
  ["khach-san", "upsell-dich-vu", "khách sạn", "upsell dịch vụ", "website khách sạn upsell"],
  ["my-pham", "review-san-pham", "mỹ phẩm", "review sản phẩm", "website mỹ phẩm review"],
  ["o-to", "inventory-xe", "ô tô", "inventory xe", "website đại lý xe listing"],
].map(([is, fs, i, f, a]) => webFeature(is, fs, i, f, a));

/** O — 20: agency / dịch vụ */
const O_AGENCY = [
  agency("agency-marketing-ha-noi", "agency marketing hà nội", "Agency Marketing Hà Nội Uy Tín", "chọn agency HN"),
  agency("agency-marketing-da-nang", "agency marketing đà nẵng", "Agency Marketing Đà Nẵng", "agency Đà Nẵng"),
  agency("agency-quang-cao-facebook-tphcm", "agency quảng cáo facebook tphcm", "Agency Quảng Cáo Facebook TPHCM", "quản lý ads Meta"),
  agency("agency-seo-website", "agency SEO website", "Agency SEO Website Chuyên Nghiệp", "dịch vụ SEO trọn gói"),
  agency("agency-thiet-ke-website", "agency thiết kế website", "Agency Thiết Kế Website Uy Tín", "chọn đối tác web"),
  agency("dich-vu-viet-content-seo", "dịch vụ viết content SEO", "Dịch Vụ Viết Content SEO", "content thuê ngoài"),
  agency("dich-vu-quan-tri-website", "dịch vụ quản trị website", "Dịch Vụ Quản Trị Website", "maintain website"),
  agency("dich-vu-chay-ads-google", "dịch vụ chạy ads google", "Dịch Vụ Chạy Ads Google", "quản lý Google Ads"),
  agency("dich-vu-chay-ads-facebook", "dịch vụ chạy ads facebook", "Dịch Vụ Chạy Ads Facebook", "quản lý Meta ads"),
  agency("dich-vu-seo-local-maps", "dịch vụ SEO local maps", "Dịch Vụ SEO Local Google Maps", "tối ưu GBP"),
  agency("dich-vu-thiet-ke-landing-page", "dịch vụ thiết kế landing page", "Dịch Vụ Thiết Kế Landing Page", "landing chạy ads"),
  agency("dich-vu-tich-hop-crm", "dịch vụ tích hợp CRM", "Dịch Vụ Tích Hợp CRM Website", "CRM HubSpot Zoho"),
  agency("dich-vu-email-marketing", "dịch vụ email marketing", "Dịch Vụ Email Marketing", "automation email"),
  agency("dich-vu-quan-ly-fanpage", "dịch vụ quản lý fanpage", "Dịch Vụ Quản Lý Fanpage", "community management"),
  agency("dich-vu-quay-video-quang-cao", "dịch vụ quay video quảng cáo", "Dịch Vụ Quay Video Quảng Cáo", "video ads content"),
  agency("dich-vu-chup-anh-san-pham", "dịch vụ chụp ảnh sản phẩm", "Dịch Vụ Chụp Ảnh Sản Phẩm", "ecommerce photography"),
  agency("dich-vu-audit-marketing", "dịch vụ audit marketing", "Dịch Vụ Audit Marketing Toàn Diện", "đánh giá chiến lược"),
  agency("dich-vu-xay-dung-thuong-hieu", "dịch vụ xây dựng thương hiệu", "Dịch Vụ Xây Dựng Thương Hiệu", "branding SME"),
  agency("dich-vu-tu-van-chuyen-doi-so", "dịch vụ tư vấn chuyển đổi số", "Dịch Vụ Tư Vấn Chuyển Đổi Số", "digital transformation"),
  agency("dich-vu-dao-tao-marketing", "dịch vụ đào tạo marketing", "Dịch Vụ Đào Tạo Marketing", "training in-house team"),
];

/** P — 15: Google Ads × thành phố */
const P_GADS_CITY = [
  ["tphcm", "TPHCM", "Google Ads doanh nghiệp TPHCM"],
  ["ha-noi", "Hà Nội", "Google Ads doanh nghiệp Hà Nội"],
  ["da-nang", "Đà Nẵng", "Google Ads Đà Nẵng"],
  ["can-tho", "Cần Thơ", "Google Ads Cần Thơ"],
  ["binh-duong", "Bình Dương", "Google Ads Bình Dương"],
  ["hai-phong", "Hải Phòng", "Google Ads Hải Phòng"],
  ["dong-nai", "Đồng Nai", "Google Ads Đồng Nai"],
  ["vung-tau", "Vũng Tàu", "Google Ads Vũng Tàu"],
  ["nha-trang", "Nha Trang", "Google Ads Nha Trang"],
  ["hue", "Huế", "Google Ads Huế"],
  ["bac-ninh", "Bắc Ninh", "Google Ads Bắc Ninh"],
  ["long-an", "Long An", "Google Ads Long An"],
  ["quang-ninh", "Quảng Ninh", "Google Ads Quảng Ninh"],
  ["lam-dong", "Lâm Đồng", "Google Ads Lâm Đồng"],
  ["khanh-hoa", "Khánh Hòa", "Google Ads Khánh Hòa"],
].map(([s, c, a]) => googleAdsCity(s, c, a));

/** Q — 20: website ngành mới (bổ sung đủ 500) */
const Q_EXTRA_WEB = [
  ["dich-vu-cuu-ho-xe", "dịch vụ cứu hộ xe", "website cứu hộ ô tô 24/7"],
  ["tram-sac-xe-dien", "trạm sạc xe điện", "website trạm sạc EV"],
  ["cua-hang-pin", "cửa hàng pin", "website bán pin và ắc quy"],
  ["dich-vu-hut-be-phot", "dịch vụ hút bể phốt", "website thông cống"],
  ["tho-sua-khoa", "thợ sửa khóa", "website dịch vụ khóa cửa"],
  ["dich-vu-nuoi-cong-trung", "dịch vụ nuôi công trùng", "website kiểm soát côn trùng"],
  ["cua-hang-sim-so-dep", "cửa hàng sim số đẹp", "website sim điện thoại"],
  ["dich-vu-cap-mang", "dịch vụ cấp mạng", "website đại lý internet"],
  ["trung-tam-boi-loi", "trung tâm bơi lội", "website học bơi trẻ em"],
  ["phong-kickboxing", "phòng kickboxing", "website võ thuật fitness"],
  ["studio-nhay", "studio nhảy", "website lớp nhảy"],
  ["trung-tam-chess", "trung tâm cờ", "website học cờ online"],
  ["cua-hang-do-gom", "cửa hàng đồ gốm", "website gốm sứ thủ công"],
  ["xuong-gom-su", "xưởng gốm sứ", "website xưởng gốm B2B"],
  ["cua-hang-tranh", "cửa hàng tranh", "website gallery tranh nghệ thuật"],
  ["dich-vu-thiet-ke-noi-that", "dịch vụ thiết kế nội thất", "website studio thiết kế"],
  ["cua-hang-rem-cua", "cửa hàng rèm cửa", "website rèm và màn cửa"],
  ["dich-vu-lap-dat-camera", "dịch vụ lắp đặt camera", "website camera an ninh"],
  ["cua-hang-may-loc-khong-khi", "cửa hàng máy lọc không khí", "website thiết bị lọc không khí"],
  ["dich-vu-ve-sinh-may-lanh", "dịch vụ vệ sinh máy lạnh", "website vệ sinh máy lạnh"],
].map(([s, k, a]) => ({
  slug: `thiet-ke-website-${s}`,
  keywordsMain: `thiết kế website ${k}`,
  h1: `Thiết Kế Website ${cap(k)} Chuẩn SEO`,
  angle: a,
  niche: "strategy",
}));

export const KEYWORDS_500 = [
  ...A_WEB_CITY,
  ...B_PRICING_IND,
  ...C_MKT,
  ...D_MKT_CITY,
  ...E_GADS,
  ...F_FB,
  ...G_FANPAGE,
  ...H_SEO_IND,
  ...I_SEO_CITY,
  ...J_MAPS,
  ...K_COMPARE,
  ...L_PAIN,
  ...M_LAGI,
  ...N_FEATURE,
  ...O_AGENCY,
  ...P_GADS_CITY,
  ...Q_EXTRA_WEB,
];

export const KEYWORDS_500_MARKETING_ONLY = new Set([
  ...K_COMPARE.map((e) => e.slug),
  ...L_PAIN.map((e) => e.slug),
  ...M_LAGI.map((e) => e.slug),
  ...O_AGENCY.map((e) => e.slug),
]);

const EXPECTED = 500;
if (KEYWORDS_500.length !== EXPECTED) {
  throw new Error(`KEYWORDS_500 expected ${EXPECTED} entries, got ${KEYWORDS_500.length}`);
}

const slugSet = new Set(KEYWORDS_500.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_500.length) {
  const dupes = KEYWORDS_500.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_500 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}

const kwSet = new Set(KEYWORDS_500.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== KEYWORDS_500.length) {
  const dupes = KEYWORDS_500.map((e) => e.keywordsMain).filter((k, i, a) => a.indexOf(k) !== i);
  throw new Error(`KEYWORDS_500 duplicate keywordsMain: ${[...new Set(dupes)].slice(0, 5).join(", ")}`);
}
