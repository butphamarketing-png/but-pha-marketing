/**
 * 200 từ khóa long-tail — ngành, địa phương, báo giá, pain point, so sánh.
 * Export: KEYWORDS_200
 */

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
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

function webCity(slug, city, angle) {
  return {
    slug: `thiet-ke-website-${slug}`,
    keywordsMain: `thiết kế website ${city}`,
    h1: `Thiết Kế Website ${city} Chuẩn SEO Cho Doanh Nghiệp`,
    angle,
    niche: "strategy",
  };
}

function marketingIndustry(slug, kw, angle) {
  return {
    slug: `marketing-${slug}`,
    keywordsMain: `marketing ${kw}`,
    h1: `Marketing ${cap(kw)} — Chiến Lược Đa Kênh Hiệu Quả`,
    angle,
    niche: "strategy",
  };
}

function facebookIndustry(slug, kw, angle) {
  return {
    slug: `quang-cao-facebook-${slug}`,
    keywordsMain: `quảng cáo facebook ${kw}`,
    h1: `Quảng Cáo Facebook ${cap(kw)} — Thu Khách Và Tối Ưu Ads`,
    angle,
    niche: "facebook-ads",
  };
}

function seoLocal(slug, kw, angle) {
  return {
    slug,
    keywordsMain: kw,
    h1: `${cap(kw)} — Hướng Dẫn SEO Google Maps`,
    angle,
    niche: "seo",
  };
}

function pricing(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

function pain(slug, kw, h1, angle) {
  return { slug, keywordsMain: kw, h1, angle, niche: "strategy" };
}

function compare(slug, kw, h1, angle, niche = "strategy") {
  return { slug, keywordsMain: kw, h1, angle, niche };
}

const A_WEB = [
  ["tiem-nail", "tiệm nail", "website tiệm nail đặt lịch và showcase dịch vụ"],
  ["studio-nhiep-anh", "studio nhiếp ảnh", "portfolio ảnh và gói chụp cho studio"],
  ["trung-tam-ngoai-ngu", "trung tâm ngoại ngữ", "đăng ký khóa học và SEO local"],
  ["truong-lai-xe", "trường lái xe", "form đăng ký học lái và thông tin khóa"],
  ["garage-sua-xe-dien", "garage sửa xe điện", "dịch vụ EV và đặt lịch bảo dưỡng"],
  ["cua-hang-dien-thoai", "cửa hàng điện thoại", "catalog sản phẩm và bảo hành online"],
  ["shop-my-pham-han-quoc", "shop mỹ phẩm Hàn Quốc", "bán hàng online và review sản phẩm"],
  ["cua-hang-vat-lieu-xay-dung", "cửa hàng vật liệu xây dựng", "catalog vật liệu và báo giá nhanh"],
  ["cong-ty-kien-truc", "công ty kiến trúc", "showcase dự án và thu lead thiết kế"],
  ["homestay", "homestay", "đặt phòng homestay và gallery trải nghiệm"],
  ["villa-nghi-duong", "villa nghỉ dưỡng", "booking villa cao cấp và SEO du lịch"],
  ["tour-du-lich-inbound", "tour du lịch inbound", "package tour cho khách quốc tế"],
  ["cong-ty-du-lich", "công ty du lịch", "tour nội địa và outbound trên website"],
  ["dai-ly-ve-may-bay", "đại lý vé máy bay", "form tư vấn vé và combo du lịch"],
  ["phong-tro-cho-thue", "phòng trọ cho thuê", "danh sách phòng và liên hệ thuê"],
  ["san-bat-dong-san-thu-cap", "sàn bất động sản thứ cấp", "listing BĐS và lead môi giới"],
  ["moi-gioi-bat-dong-san", "môi giới bất động sản", "hồ sơ căn hộ và form liên hệ"],
  ["khu-cong-nghiep", "khu công nghiệp", "giới thiệu KCN và thu hút doanh nghiệp"],
  ["nha-may-san-xuat", "nhà máy sản xuất", "năng lực sản xuất và chứng chỉ chất lượng"],
  ["xuong-may", "xưởng may", "đặt hàng may mặc và portfolio xưởng"],
  ["shop-thu-cung", "shop thú cưng", "bán phụ kiện pet và dịch vụ grooming"],
  ["phong-kham-thu-y", "phòng khám thú y", "đặt lịch khám thú cưng online"],
  ["trung-tam-day-lai", "trung tâm dạy lái", "khóa học lái và đăng ký online"],
  ["trung-tam-ky-nang-song", "trung tâm kỹ năng sống", "workshop và khóa học mềm"],
  ["truong-day-nghe", "trường dạy nghề", "ngành nghề đào tạo và tuyển sinh"],
  ["cua-hang-ruou-vang", "cửa hàng rượu vang", "catalog rượu và tư vấn pairing"],
  ["nha-hang-buffet", "nhà hàng buffet", "menu buffet và đặt bàn online"],
  ["quan-lau", "quán lẩu", "menu lẩu và đặt bàn qua website"],
  ["quan-tra-sua", "quán trà sữa", "menu đồ uống và đặt hàng takeaway"],
  ["cloud-kitchen", "cloud kitchen", "đặt món delivery từ bếp trung tâm"],
  ["ban-do-handmade", "bán đồ handmade", "shop đồ thủ công và đặt hàng custom"],
  ["shop-do-co", "shop đồ cổ", "vintage catalog và storytelling thương hiệu"],
  ["cua-hang-do-choi-tre-em", "cửa hàng đồ chơi trẻ em", "ecommerce đồ chơi an toàn"],
  ["trung-tam-tri-lieu-tam-ly", "trung tâm trị liệu tâm lý", "đặt lịch tư vấn và bảo mật thông tin"],
  ["phong-kham-da-khoa", "phòng khám đa khoa", "đa khoa đặt khám và giới thiệu dịch vụ"],
  ["vien-tham-my", "viện thẩm mỹ", "dịch vụ thẩm mỹ và before-after gallery"],
  ["trung-tam-ivf", "trung tâm IVF", "thông tin IVF và form tư vấn bảo mật"],
  ["phong-kham-mat", "phòng khám mắt", "khám mắt đặt lịch và dịch vụ chuyên khoa"],
  ["cua-hang-kinh-mat", "cửa hàng kính mắt", "catalog kính và đo thị lực online"],
  ["dai-ly-bao-hiem", "đại lý bảo hiểm", "tư vấn gói bảo hiểm và form báo giá"],
].map(([s, k, a]) => webIndustry(s, k, a));

const B_CITY = [
  ["vung-tau", "Vũng Tàu", "website doanh nghiệp du lịch biển Vũng Tàu"],
  ["hue", "Huế", "website dịch vụ và du lịch cố đô Huế"],
  ["dong-nai", "Đồng Nai", "website KCN và SME tại Đồng Nai"],
  ["long-an", "Long An", "website doanh nghiệp vùng Long An"],
  ["bac-ninh", "Bắc Ninh", "website khu công nghiệp Bắc Ninh"],
  ["quang-ninh", "Quảng Ninh", "website du lịch và logistics Quảng Ninh"],
  ["thanh-hoa", "Thanh Hóa", "website doanh nghiệp Thanh Hóa"],
  ["vinh-nghe-an", "Vinh Nghệ An", "website SME tại Vinh"],
  ["buon-ma-thuot", "Buôn Ma Thuột", "website nông sản và du lịch Tây Nguyên"],
  ["pleiku", "Pleiku", "website dịch vụ tại Pleiku Gia Lai"],
  ["quy-nhon", "Quy Nhon", "website du lịch biển Quy Nhơn"],
  ["phan-thiet", "Phan Thiết", "website resort và du lịch Phan Thiết"],
  ["bien-hoa", "Biên Hòa", "website doanh nghiệp Biên Hòa"],
  ["thuan-an", "Thuận An", "website SME Thuận An Bình Dương"],
  ["di-an", "Dĩ An", "website dịch vụ Dĩ An"],
  ["can-gio", "Cần Giờ", "website du lịch sinh thái Cần Giờ"],
  ["hai-duong", "Hải Dương", "website doanh nghiệp Hải Dương"],
  ["nam-dinh", "Nam Định", "website SME Nam Định"],
  ["thai-nguyen", "Thái Nguyên", "website doanh nghiệp Thái Nguyên"],
  ["vinh-phuc", "Vĩnh Phúc", "website KCN Vĩnh Phúc"],
  ["binh-dinh", "Bình Định", "website du lịch và dịch vụ Bình Định"],
  ["an-giang", "An Giang", "website nông sản và du lịch An Giang"],
  ["kien-giang", "Kiên Giang", "website du lịch và thủy sản Kiên Giang"],
  ["da-lat-lam-dong", "Đà Lạt Lâm Đồng", "website homestay và du lịch Đà Lạt"],
  ["tay-ninh", "Tây Ninh", "website doanh nghiệp Tây Ninh"],
].map(([s, c, a]) => webCity(s, c, a));

const C_MKT = [
  ["tiem-nail", "tiệm nail", "marketing tiệm nail tăng lịch hẹn"],
  ["studio-nhiep-anh", "studio nhiếp ảnh", "marketing studio ảnh cưới và event"],
  ["homestay", "homestay", "marketing homestay đa kênh"],
  ["homestay-da-lat", "homestay Đà Lạt", "marketing homestay Đà Lạt mùa cao điểm"],
  ["khach-san-3-sao", "khách sạn 3 sao", "marketing khách sạn tầm trung"],
  ["resort-bien", "resort biển", "marketing resort nghỉ dưỡng"],
  ["tour-du-lich", "tour du lịch", "marketing tour và combo du lịch"],
  ["truong-mam-non", "trường mầm non", "marketing tuyển sinh mầm non"],
  ["trung-tam-anh-ngu", "trung tâm anh ngữ", "marketing trung tâm ngoại ngữ"],
  ["trung-tam-luyen-thi", "trung tâm luyện thi", "marketing luyện thi IELTS/SAT"],
  ["phong-kham-da-khoa", "phòng khám đa khoa", "marketing phòng khám đa khoa"],
  ["phong-kham-mat", "phòng khám mắt", "marketing chuyên khoa mắt"],
  ["nha-khoa-implant", "nha khoa implant", "marketing implant và thẩm mỹ răng"],
  ["vien-tham-my", "viện thẩm mỹ", "marketing thẩm mỹ viện uy tín"],
  ["shop-thoi-trang-online", "shop thời trang online", "marketing fashion ecommerce"],
  ["shop-my-pham", "shop mỹ phẩm", "marketing mỹ phẩm online"],
  ["cua-hang-dien-thoai", "cửa hàng điện thoại", "marketing điện thoại và phụ kiện"],
  ["dai-ly-o-to", "đại lý ô tô", "marketing showroom ô tô"],
  ["garage-o-to", "garage ô tô", "marketing garage sửa chữa xe"],
  ["cong-ty-xay-dung", "công ty xây dựng", "marketing nhà thầu xây dựng"],
  ["kien-truc-noi-that", "kiến trúc nội thất", "marketing studio thiết kế nội thất"],
  ["nong-san-sach", "nông sản sạch", "marketing nông sản organic"],
  ["thuc-pham-chuc-nang", "thực phẩm chức năng", "marketing TPCN tuân thủ quảng cáo"],
  ["logistics", "logistics", "marketing công ty logistics B2B"],
  ["kho-van", "kho vận", "marketing dịch vụ kho bãi vận tải"],
  ["cong-ty-luat", "công ty luật", "marketing văn phòng luật"],
  ["ke-toan-thue", "kế toán thuế", "marketing dịch vụ kế toán"],
  ["phan-mem-b2b", "phần mềm B2B", "marketing SaaS B2B lead generation"],
  ["saas", "SaaS", "marketing phần mềm subscription"],
  ["startup-cong-nghe", "startup công nghệ", "marketing startup giai đoạn early"],
].map(([s, k, a]) => marketingIndustry(s, k, a));

const D_FB = [
  ["tiem-nail", "tiệm nail", "ads Facebook tiệm nail đặt lịch"],
  ["homestay", "homestay", "ads Facebook homestay booking"],
  ["tour-du-lich", "tour du lịch", "ads Facebook tour và combo"],
  ["truong-mam-non", "trường mầm non", "ads Facebook tuyển sinh mầm non"],
  ["trung-tam-anh-ngu", "trung tâm anh ngữ", "ads Facebook khóa học ngoại ngữ"],
  ["phong-kham-da-khoa", "phòng khám đa khoa", "ads Facebook phòng khám"],
  ["nha-khoa-implant", "nha khoa implant", "ads Facebook nha khoa implant"],
  ["shop-thoi-trang", "shop thời trang", "ads Facebook bán thời trang"],
  ["shop-my-pham", "shop mỹ phẩm", "ads Facebook mỹ phẩm"],
  ["ban-do-an-online", "bán đồ ăn online", "ads Facebook F&B delivery"],
  ["cloud-kitchen", "cloud kitchen", "ads Facebook cloud kitchen"],
  ["dai-ly-o-to", "đại lý ô tô", "ads Facebook showroom xe"],
  ["bat-dong-san-du-an", "bất động sản dự án", "ads Facebook BĐS dự án"],
  ["moi-gioi-bat-dong-san", "môi giới bất động sản", "ads Facebook môi giới BĐS"],
  ["noi-that", "nội thất", "ads Facebook thiết kế nội thất"],
  ["xay-dung", "xây dựng", "ads Facebook nhà thầu"],
  ["su-kien-cuoi", "sự kiện cưới", "ads Facebook wedding planner"],
  ["studio-anh-cuoi", "studio ảnh cưới", "ads Facebook studio cưới"],
  ["trung-tam-yoga", "trung tâm yoga", "ads Facebook yoga lớp học"],
  ["pilates", "pilates", "ads Facebook pilates studio"],
  ["boxing-fitness", "boxing fitness", "ads Facebook gym boxing"],
  ["ve-sinh-cong-nghiep", "vệ sinh công nghiệp", "ads Facebook dịch vụ vệ sinh"],
  ["dien-lanh", "điện lạnh", "ads Facebook sửa điện lạnh"],
  ["sua-chua-dien-nuoc", "sửa chữa điện nước", "ads Facebook thợ điện nước"],
  ["dich-vu-giao-hang", "dịch vụ giao hàng", "ads Facebook giao hàng nội thành"],
].map(([s, k, a]) => facebookIndustry(s, k, a));

const E_SEO = [
  seoLocal("seo-local-tiem-nail", "seo local tiệm nail", "tối ưu Maps cho tiệm nail"),
  seoLocal("seo-local-quan-tra-sua", "seo local quán trà sữa", "Local SEO quán trà sữa"),
  seoLocal("seo-local-homestay", "seo local homestay", "Maps homestay và booking"),
  seoLocal("seo-local-phong-kham-da-khoa", "seo local phòng khám đa khoa", "SEO local y tế"),
  seoLocal("seo-local-nha-khoa-implant", "seo local nha khoa implant", "Maps nha khoa implant"),
  seoLocal("seo-local-garage-o-to", "seo local garage ô tô", "Local SEO garage"),
  seoLocal("seo-local-cua-hang-dien-thoai", "seo local cửa hàng điện thoại", "Maps shop điện thoại"),
  seoLocal("seo-local-shop-my-pham", "seo local shop mỹ phẩm", "SEO local mỹ phẩm"),
  seoLocal("seo-local-dong-nai", "seo local Đồng Nai", "Local Pack Đồng Nai"),
  seoLocal("seo-local-vung-tau", "seo local Vũng Tàu", "SEO Maps Vũng Tàu"),
  seoLocal("seo-local-hue", "seo local Huế", "SEO địa phương Huế"),
  seoLocal("seo-local-da-lat", "seo local Đà Lạt", "Local SEO Đà Lạt"),
  seoLocal("seo-local-quy-nhon", "seo local Quy Nhon", "Maps Quy Nhơn"),
  seoLocal("seo-local-bac-ninh", "seo local Bắc Ninh", "SEO local Bắc Ninh"),
  seoLocal("seo-local-long-an", "seo local Long An", "Maps Long An"),
  seoLocal("seo-local-thuan-an", "seo local Thuận An", "Local SEO Thuận An"),
  seoLocal("seo-google-maps-tiem-nail", "seo google maps tiệm nail", "tối ưu GBP tiệm nail"),
  seoLocal("seo-google-maps-quan-ca-phe", "seo google maps quán cà phê", "Maps quán cafe"),
  seoLocal("seo-google-maps-phong-gym", "seo google maps phòng gym", "Local Pack gym"),
  seoLocal("seo-google-maps-trung-tam-anh-ngu", "seo google maps trung tâm anh ngữ", "Maps trung tâm ngoại ngữ"),
  seoLocal("toi-uu-google-maps-tiem-lam-dep", "tối ưu google maps tiệm làm đẹp", "GBP salon làm đẹp"),
  seoLocal("toi-uu-google-maps-cua-hang-thoi-trang", "tối ưu google maps cửa hàng thời trang", "Maps shop thời trang"),
  seoLocal("dua-spa-len-google-maps", "đưa spa lên google maps", "hướng dẫn đăng ký spa Maps"),
  seoLocal("dua-nha-hang-len-google-maps", "đưa nhà hàng lên google maps", "đăng ký nhà hàng GBP"),
  seoLocal("dua-phong-kham-len-google-maps", "đưa phòng khám lên google maps", "xác minh phòng khám Maps"),
];

const F_PRICE = [
  pricing("bao-gia-thiet-ke-website-spa", "báo giá thiết kế website spa", "Báo Giá Thiết Kế Website Spa 2026", "giá website spa đặt lịch và SEO"),
  pricing("bao-gia-thiet-ke-website-nha-hang", "báo giá thiết kế website nhà hàng", "Báo Giá Thiết Kế Website Nhà Hàng", "chi phí website F&B menu đặt bàn"),
  pricing("bao-gia-thiet-ke-website-ban-hang", "báo giá thiết kế website bán hàng", "Báo Giá Thiết Kế Website Bán Hàng", "giá web ecommerce SME"),
  pricing("bao-gia-landing-page-chay-ads", "báo giá landing page chạy ads", "Báo Giá Landing Page Chạy Ads", "landing page message-match ads"),
  pricing("bao-gia-website-wordpress", "báo giá website wordpress", "Báo Giá Website WordPress 2026", "chi phí WordPress custom"),
  pricing("bao-gia-website-nextjs", "báo giá website nextjs", "Báo Giá Website Nextjs", "giá web Next.js SSR"),
  pricing("bao-gia-cham-soc-website-thang", "báo giá chăm sóc website tháng", "Báo Giá Chăm Sóc Website Tháng", "gói maintain website"),
  pricing("bao-gia-seo-website-6-thang", "báo giá SEO website 6 tháng", "Báo Giá SEO Website 6 Tháng", "gói SEO on-page và content"),
  pricing("bao-gia-seo-local-thang", "báo giá SEO local hàng tháng", "Báo Giá SEO Local Hàng Tháng", "tối ưu Maps theo tháng"),
  pricing("bao-gia-quang-cao-facebook-thang", "báo giá quảng cáo facebook tháng", "Báo Giá Quảng Cáo Facebook Tháng", "phí agency + ngân sách ads"),
  pricing("bao-gia-chay-ads-facebook-shop", "báo giá chạy ads facebook cho shop", "Báo Giá Chạy Ads Facebook Cho Shop", "quản lý ads shop online"),
  pricing("bao-gia-google-ads-thang", "báo giá google ads tháng", "Báo Giá Google Ads Tháng", "phí quản lý Google Ads"),
  pricing("bao-gia-marketing-tron-goi-sme", "báo giá marketing trọn gói SME", "Báo Giá Marketing Trọn Gói SME", "gói website + ads + content"),
  pricing("bao-gia-thiet-ke-fanpage", "báo giá thiết kế fanpage", "Báo Giá Thiết Kế Fanpage Facebook", "cover avatar và setup fanpage"),
  pricing("bao-gia-content-fanpage-thang", "báo giá content fanpage tháng", "Báo Giá Content Fanpage Tháng", "viết bài và đăng fanpage"),
  pricing("chi-phi-lam-website-chuan-seo", "chi phí làm website chuẩn SEO", "Chi Phí Làm Website Chuẩn SEO", "yếu tố ảnh hưởng giá website"),
  pricing("chi-phi-seo-len-top-google", "chi phí SEO lên top google", "Chi Phí SEO Lên Top Google", "timeline và ngân sách SEO"),
  pricing("chi-phi-quang-cao-google-maps", "chi phí quảng cáo google maps", "Chi Phí Quảng Cáo Google Maps", "Local Ads và ngân sách"),
  pricing("chi-phi-agency-marketing-thang", "chi phí agency marketing tháng", "Chi Phí Agency Marketing Tháng", "so sánh gói agency"),
  pricing("website-gia-bao-nhieu-2026", "website giá bao nhiêu 2026", "Website Giá Bao Nhiêu 2026?", "bảng giá tham khảo website"),
];

const G_PAIN = [
  pain("website-khong-len-google", "website không lên google", "Website Không Lên Google — Nguyên Nhân Và Cách Khắc Phục", "audit SEO và index website"),
  pain("website-bi-hack", "website bị hack", "Website Bị Hack — Xử Lý Khẩn Cấp Và Phòng Ngừa", "khôi phục website sau tấn công"),
  pain("website-cham-anh-huong-seo", "website chậm ảnh hưởng seo", "Website Chậm Ảnh Hưởng SEO Như Thế Nào?", "tốc độ và Core Web Vitals"),
  pain("fanpage-bi-khoa-quang-cao", "fanpage bị khóa quảng cáo", "Fanpage Bị Khóa Quảng Cáo — Cách Kháng Và Phòng Tránh", "policy Meta và kháng cáo ads"),
  pain("ads-facebook-bi-tu-choi", "ads facebook bị từ chối", "Ads Facebook Bị Từ Chối — Lý Do Và Cách Sửa", "duyệt creative và landing page"),
  pain("ads-facebook-khong-ra-don", "ads facebook không ra đơn", "Ads Facebook Không Ra Đơn — Checklist Tối Ưu", "funnel ads đến chốt đơn"),
  pain("google-ads-ton-tien-khong-co-khach", "google ads tốn tiền không có khách", "Google Ads Tốn Tiền Không Có Khách — Sửa Ngay", "tracking và negative keyword"),
  pain("google-maps-khong-hien-thi", "google maps không hiển thị", "Google Maps Không Hiển Thị — Cách Khắc Phục", "xác minh và index GBP"),
  pain("google-maps-bi-danh-gia-xau", "google maps bị đánh giá xấu", "Google Maps Bị Đánh Giá Xấu — Xử Lý Reputation", "quản lý review Google"),
  pain("seo-lam-mai-khong-len-top", "seo làm mãi không lên top", "SEO Làm Mãi Không Lên Top — Audit Và Hướng Đi", "đánh giá chiến lược SEO sai"),
  pain("content-website-bi-copy", "content website bị copy", "Content Website Bị Copy — Bảo Vệ Bản Quyền", "DMCA và canonical trùng lặp"),
  pain("website-khong-co-lead", "website không có lead", "Website Không Có Lead — 10 Điểm Cần Sửa", "CTA form và landing conversion"),
  pain("zalo-khong-co-khach-tu-quang-cao", "zalo không có khách từ quảng cáo", "Zalo Không Có Khách Từ Quảng Cáo — Tối Ưu Zalo OA", "ZNS và chatbot Zalo"),
  pain("shopee-khong-co-don", "shopee không có đơn", "Shopee Không Có Đơn — Tối Ưu Gian Hàng Và Ads", "SEO Shopee và flash sale"),
  pain("marketing-online-khong-hieu-qua", "marketing online không hiệu quả", "Marketing Online Không Hiệu Quả — Audit Toàn Diện", "đo KPI và sửa chiến lược"),
  pain("doi-thu-chay-ads-minh-khong-co-khach", "đối thủ chạy ads mình không có khách", "Đối Thủ Chạy Ads Mình Không Có Khách — Phản Ứng", "competitive analysis và differentiation"),
  pain("fanpage-co-like-khong-co-inbox", "fanpage có like không có inbox", "Fanpage Có Like Không Có Inbox — Cách Sửa", "content và CTA inbox"),
  pain("website-mobile-kho-dung", "website mobile khó dùng", "Website Mobile Khó Dùng Mất Khách — UX Fix", "responsive và mobile CTA"),
  pain("landing-page-ty-le-chuyen-doi-thap", "landing page tỷ lệ chuyển đổi thấp", "Landing Page Tỷ Lệ Chuyển Đổi Thấp — CRO", "A/B test landing page"),
  pain("khong-biet-do-roi-marketing", "không biết đo ROI marketing", "Không Biết Đo ROI Marketing — Dashboard KPI", "GA4 CRM và attribution"),
];

const H_COMPARE = [
  compare("tiktok-hay-facebook-ads", "tiktok hay facebook ads", "TikTok Hay Facebook Ads — Chọn Kênh Phù Hợp", "so sánh ads short video vs Meta", "facebook-ads"),
  compare("shopee-hay-website-rieng", "shopee hay website riêng", "Shopee Hay Website Riêng — Nên Bán Ở Đâu?", "omnichannel vs owned media", "strategy"),
  compare("lazada-hay-tu-website", "lazada hay tự website", "Lazada Hay Tự Website — Chiến Lược Bán Hàng", "marketplace vs brand website", "strategy"),
  compare("tiktok-shop-hay-fanpage", "tiktok shop hay fanpage", "TikTok Shop Hay Fanpage — Kênh Social Commerce", "so sánh TikTok và Facebook", "social"),
  compare("zalo-oa-hay-fanpage", "zalo OA hay fanpage", "Zalo OA Hay Fanpage — Chăm Sóc Khách Việt", "kênh chat Việt Nam", "social"),
  compare("marketing-in-house-hay-agency", "marketing in-house hay agency", "Marketing In-House Hay Agency?", "khi nào thuê ngoài", "strategy"),
  compare("freelancer-hay-cong-ty-marketing", "freelancer hay công ty marketing", "Freelancer Hay Công Ty Marketing — So Sánh", "rủi ro và chất lượng", "strategy"),
  compare("website-wordpress-hay-tu-code", "website wordpress hay tự code", "Website WordPress Hay Tự Code?", "chọn stack phù hợp", "strategy"),
  compare("landing-page-hay-website-da-trang", "landing page hay website đa trang", "Landing Page Hay Website Đa Trang?", "khi nào dùng landing", "strategy"),
  compare("seo-hay-chay-ads-truoc", "seo hay chạy ads trước", "SEO Hay Chạy Ads Trước — Lộ Trình Marketing", "organic vs paid ưu tiên", "seo"),
  compare("facebook-ads-hay-tiktok-ads", "facebook ads hay tiktok ads", "Facebook Ads Hay TikTok Ads?", "so sánh CPA theo ngành", "facebook-ads"),
  compare("google-maps-hay-website-truoc", "google maps hay website trước", "Google Maps Hay Website Trước?", "local presence vs owned site", "seo"),
  compare("content-organic-hay-ads", "content organic hay ads", "Content Organic Hay Ads — Phối Hợp Funnel", "content marketing vs paid", "content"),
  compare("thue-seo-hay-tu-lam", "thuê SEO hay tự làm", "Thuê SEO Hay Tự Làm — Khi Nào Cần Agency", "ROI thuê SEO", "seo"),
  compare("marketing-online-hay-truyen-thong", "marketing online hay truyền thống", "Marketing Online Hay Truyền Thống?", "đa kênh digital vs offline", "strategy"),
];

export const KEYWORDS_200 = [
  ...A_WEB,
  ...B_CITY,
  ...C_MKT,
  ...D_FB,
  ...E_SEO,
  ...F_PRICE,
  ...G_PAIN,
  ...H_COMPARE,
];

export const KEYWORDS_200_MARKETING_ONLY = new Set([
  ...H_COMPARE.map((e) => e.slug),
  ...G_PAIN.map((e) => e.slug),
]);

if (KEYWORDS_200.length !== 200) {
  throw new Error(`KEYWORDS_200 expected 200 entries, got ${KEYWORDS_200.length}`);
}

const slugSet = new Set(KEYWORDS_200.map((e) => e.slug));
if (slugSet.size !== KEYWORDS_200.length) {
  const dupes = KEYWORDS_200.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(`KEYWORDS_200 duplicate slugs: ${[...new Set(dupes)].join(", ")}`);
}
