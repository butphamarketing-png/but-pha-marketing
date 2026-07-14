/**
 * 1000 từ khóa khách hàng hay tìm (intent thực tế — không phải list ngành thuần).
 * Chạy: node scripts/_gen-tu-khoa-khach-1000.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outMd = path.join(root, "tmp-programmatic", "tu-khoa-khach-hang-1000.md");
const outJson = path.join(root, "tmp-programmatic", "tu-khoa-khach-hang-1000.json");

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const rows = [];
const seen = new Set();

function add(kw, group, intent = "commercial") {
  const key = kw.toLowerCase().trim().replace(/\s+/g, " ");
  if (!key || seen.has(key)) return false;
  seen.add(key);
  rows.push({
    n: 0,
    kw: key,
    slug: slugify(key),
    group,
    intent,
  });
  return true;
}

function addMany(list, group, intent) {
  for (const kw of list) add(kw, group, intent);
}

// ——— 1. Money head + biến thể gần giống khách gõ ———
addMany(
  [
    "thiết kế website",
    "làm website",
    "làm web",
    "tạo website",
    "thiết kế web",
    "thiết kế trang web",
    "dịch vụ thiết kế website",
    "công ty thiết kế website",
    "đơn vị thiết kế website",
    "agency thiết kế website",
    "thuê thiết kế website",
    "đặt làm website",
    "làm website trọn gói",
    "thiết kế website trọn gói",
    "làm website chuyên nghiệp",
    "thiết kế website chuyên nghiệp",
    "thiết kế website uy tín",
    "làm website uy tín",
    "thiết kế website chuẩn seo",
    "làm website chuẩn seo",
    "thiết kế website doanh nghiệp",
    "làm website công ty",
    "website giới thiệu công ty",
    "website corporate",
    "thiết kế website bán hàng",
    "làm website bán hàng online",
    "thiết kế web bán hàng",
    "website thương mại điện tử",
    "làm web bán hàng",
    "thiết kế landing page",
    "làm landing page",
    "thiết kế trang đích",
    "làm trang landing quảng cáo",
    "thiết kế website wordpress",
    "làm website wordpress",
    "thiết kế website theo yêu cầu",
    "làm web theo mẫu",
    "thiết kế giao diện website",
    "redesign website",
    "làm lại website",
    "nâng cấp website cũ",
    "sửa website",
    "bảo trì website",
    "quản trị website",
    "hosting website",
    "mua hosting",
    "đăng ký tên miền",
    "mua domain .vn",
    "thiết kế app",
    "làm app đặt lịch",
  ],
  "money-head",
  "commercial",
);

// ——— 2. Báo giá / chi phí (intent mua cực mạnh) ———
addMany(
  [
    "báo giá thiết kế website",
    "báo giá làm website",
    "báo giá làm web",
    "giá thiết kế website",
    "giá làm website",
    "giá làm web",
    "thiết kế website giá bao nhiêu",
    "làm website giá bao nhiêu",
    "chi phí thiết kế website",
    "chi phí làm website",
    "chi phí làm web 2026",
    "thiết kế website bao nhiêu tiền",
    "làm website hết bao nhiêu",
    "bảng giá thiết kế website",
    "bảng giá làm web",
    "thiết kế website giá rẻ",
    "làm website giá rẻ",
    "thiết kế website giá tốt",
    "làm web giá mềm",
    "thiết kế website bình dân",
    "gói thiết kế website",
    "gói làm website cơ bản",
    "gói website doanh nghiệp",
    "gói website bán hàng",
    "website 3 triệu",
    "website 5 triệu",
    "website 10 triệu",
    "thiết kế website dưới 5 triệu",
    "làm landing page giá bao nhiêu",
    "báo giá landing page",
    "báo giá redesign website",
    "chi phí bảo trì website hàng tháng",
    "giá quản trị website",
    "thuê viết content website giá",
    "báo giá seo website",
    "giá chạy google ads",
    "giá chạy facebook ads",
    "ngân sách marketing website",
    "chi phí làm fanpage",
  ],
  "bao-gia",
  "transactional",
);

// ——— 3. Local — nơi khách thường search ———
const CITIES = [
  "tp hcm",
  "hồ chí minh",
  "sài gòn",
  "hà nội",
  "đà nẵng",
  "hải phòng",
  "cần thơ",
  "biên hòa",
  "bình dương",
  "đồng nai",
  "nha trang",
  "huế",
  "vũng tàu",
  "đà lạt",
  "quy nhơn",
  "buôn ma thuột",
  "long xuyên",
  "mỹ tho",
  "rạch giá",
  "cà mau",
];
const QUAN_HCM = [
  "quận 1",
  "quận 3",
  "quận 7",
  "quận 10",
  "quận bình thạnh",
  "quận Tân Bình",
  "quận Phú Nhuận",
  "quận Gò Vấp",
  "quận Thủ Đức",
  "huyện Bình Chánh",
  "quận Tân Phú",
];
const QUAN_HN = ["cầu giấy", "đống đa", "hoàn kiếm", "thanh xuân", "hai bà trưng", "nam từ liêm", "bắc từ liêm", "hà đông"];

for (const c of CITIES) {
  add(`thiết kế website ${c}`, "local", "local");
  add(`làm website ${c}`, "local", "local");
  add(`công ty thiết kế website ${c}`, "local", "local");
  add(`báo giá thiết kế website ${c}`, "local", "local");
}
for (const q of QUAN_HCM) {
  add(`thiết kế website ${q}`, "local-hcm", "local");
  add(`làm web ${q} hcm`, "local-hcm", "local");
}
for (const q of QUAN_HN) {
  add(`thiết kế website ${q}`, "local-hn", "local");
  add(`làm website ${q} hà nội`, "local-hn", "local");
}

addMany(
  [
    "thiết kế website gần đây",
    "công ty làm web gần đây",
    "làm website tại nhà",
    "thiết kế website online",
    "đơn vị thiết kế web miền nam",
    "đơn vị thiết kế web miền bắc",
    "agency digital marketing hcm",
    "agency digital marketing hà nội",
  ],
  "local",
  "local",
);

// ——— 4. Ngành khách HAY search (hot verticals, không list 500 ngành) ———
const HOT_INDUSTRIES = [
  "spa",
  "nha khoa",
  "phòng khám",
  "thẩm mỹ viện",
  "nhà hàng",
  "quán cafe",
  "khách sạn",
  "homestay",
  "bất động sản",
  "môi giới nhà đất",
  "luật sư",
  "văn phòng luật",
  "kế toán",
  "bảo hiểm",
  "gym",
  "yoga",
  "trung tâm anh ngữ",
  "trường mầm non",
  "salon tóc",
  "nail",
  "ô tô",
  "gara",
  "xe máy",
  "xây dựng",
  "nội thất",
  "kiến trúc",
  "điện lạnh",
  "máy lạnh",
  "nông sản",
  "thực phẩm sạch",
  "shop thời trang",
  "mỹ phẩm",
  "nhà thuốc",
  "pet shop",
  "thú y",
  "du học",
  "tour",
  "resort",
  "in ấn",
  "quảng cáo",
  "event",
  "cưới hỏi",
  "studio ảnh",
  "logistic",
  "vận tải",
  "xuất nhập khẩu",
  "công ty xây dựng",
  "sàn gỗ",
  "nội thất văn phòng",
  "smart home",
  "năng lượng mặt trời",
  "PCCC",
  "camera giám sát",
];
for (const ind of HOT_INDUSTRIES) {
  add(`thiết kế website ${ind}`, "nganh-hot", "commercial");
  add(`làm website ${ind}`, "nganh-hot", "commercial");
  add(`báo giá website ${ind}`, "nganh-hot", "transactional");
}

// ——— 5. SEO / Maps / Ads — khách hay hỏi kèm ———
addMany(
  [
    "seo website",
    "dịch vụ seo",
    "seo tổng thể",
    "seo từ khóa",
    "seo giá rẻ",
    "báo giá seo",
    "seo lên top google",
    "đẩy top google",
    "đưa website lên google",
    "website không lên google",
    "index google",
    "google search console",
    "seo local",
    "seo maps",
    "google maps doanh nghiệp",
    "tạo google business profile",
    "tối ưu google maps",
    "đưa cửa hàng lên maps",
    "review google maps",
    "sửa google business",
    "seo onpage",
    "seo kỹ thuật",
    "tốc độ website",
    "website load chậm",
    "tối ưu tốc độ website",
    "core web vitals",
    "chạy google ads",
    "dịch vụ google ads",
    "thuê chạy google ads",
    "báo giá google ads",
    "google ads giá bao nhiêu",
    "chạy quảng cáo tìm kiếm",
    "chạy facebook ads",
    "dịch vụ facebook ads",
    "thuê chạy ads facebook",
    "báo giá facebook ads",
    "quảng cáo facebook hiệu quả",
    "chạy tiktok ads",
    "quảng cáo tiktok shop",
    "seo youtube",
    "content marketing",
    "viết bài seo",
    "thuê viết content",
    "lập kế hoạch marketing",
    "digital marketing cho sme",
    "marketing online cho cửa hàng",
    "marketing cho spa",
    "marketing cho nha khoa",
    "marketing bất động sản",
  ],
  "seo-ads",
  "commercial",
);

// ——— 6. Câu hỏi / so sánh / “nên…” (informational → commercial) ———
addMany(
  [
    "thiết kế website ở đâu tốt",
    "nên thuê công ty nào làm website",
    "công ty thiết kế website uy tín",
    "top công ty thiết kế website",
    "đơn vị làm web tốt nhất",
    "làm website nên chọn wordpress hay code",
    "website tĩnh hay động",
    "có nên làm website không",
    "doanh nghiệp nhỏ có cần website không",
    "website hay fanpage cái nào tốt hơn",
    "khác nhau giữa website và landing page",
    "làm website mất bao lâu",
    "thiết kế website bao lâu xong",
    "website cần những trang gì",
    "checklist làm website",
    "quy trình thiết kế website",
    "cách chọn công ty thiết kế website",
    "dấu hiệu agency làm web kém",
    "thiết kế website có bảo hành không",
    "sau khi làm web còn phí gì không",
    "website có kèm hosting không",
    "tự làm website hay thuê",
    "học làm website",
    "cách làm website miễn phí",
    "wix hay wordpress",
    "shopify việt nam",
    "haravan hay sapo",
    "nên dùng domain gì",
    "website doanh nghiệp cần gì",
    "ui ux website bán hàng",
    "tỷ lệ chuyển đổi website",
    "form liên hệ website",
    "nút zalo trên website",
    "chatbot website",
    "tích hợp thanh toán website",
    "website đa ngôn ngữ",
    "website mobile friendly",
    "thiết kế web responsive",
    "website bị hack xử lý sao",
    "backup website",
    "chứng chỉ ssl",
    "bảo mật website",
  ],
  "cau-hoi",
  "informational",
);

// ——— 7. Fanpage / social (khách hay bundle) ———
addMany(
  [
    "làm fanpage",
    "thiết kế fanpage",
    "setup fanpage bán hàng",
    "chạy ads fanpage",
    "tăng like fanpage",
    "quản trị fanpage",
    "viết content fanpage",
    "làm zalo oa",
    "setup zalo OA",
    "chăm sóc zalo oa",
    "làm tiktok doanh nghiệp",
    "làm youtube doanh nghiệp",
    "quản lý mạng xã hội",
    "social media marketing",
    "booking kol",
    "review sản phẩm",
  ],
  "social",
  "commercial",
);

// ——— 8. Pain points khách hay gõ ———
addMany(
  [
    "website không có khách",
    "website ít người vào",
    "website không ra đơn",
    "quảng cáo tốn tiền không có lead",
    "lead ảo facebook",
    "form website không ai gửi",
    "đối thủ lên top mình không",
    "website đẹp nhưng không bán được",
    "đổi giao diện website mới",
    "website lỗi mobile",
    "website không hiện trên điện thoại",
    "tên miền hết hạn",
    "hosting bị khóa",
    "email doanh nghiệp",
    "tạo email theo domain",
    "google workspace cho công ty",
  ],
  "pain",
  "problem",
);

// ——— 9. Gói dịch vụ / trọn gói marketing ———
addMany(
  [
    "marketing trọn gói",
    "dịch vụ marketing online",
    "agency marketing",
    "công ty digital marketing",
    "thuê marketing",
    "outsourcing marketing",
    "gói marketing tháng",
    "báo giá digital marketing",
    "website + seo + ads",
    "gói tăng lead",
    "gói tăng doanh số",
    "tư vấn marketing miễn phí",
    "audit website miễn phí",
    "kiểm tra seo website",
    "chấm điểm website",
  ],
  "goi-mkt",
  "commercial",
);

// ——— 10. Long-tail báo giá × ngành hot × địa phương ———
const TL_INDUSTRY = ["spa", "nha khoa", "nhà hàng", "bất động sản", "gym", "luật sư", "xây dựng", "nội thất", "khách sạn", "trung tâm anh ngữ"];
const TL_CITY = ["hcm", "hà nội", "đà nẵng", "bình dương", "cần thơ"];
for (const ind of TL_INDUSTRY) {
  for (const city of TL_CITY) {
    add(`thiết kế website ${ind} ${city}`, "longtail-local", "local");
    add(`báo giá website ${ind} ${city}`, "longtail-local", "transactional");
  }
}

// ——— 11. Biến thể “gần đúng” khách gõ (typo-ish / spoken) ———
addMany(
  [
    "thiet ke website",
    "lam website",
    "lam web gia re",
    "thiet ke web chuan seo",
    "cong ty thiet ke web",
    "bao gia web",
    "gia thiet ke web",
    "web doanh nghiep",
    "web ban hang",
    "seo web",
    "chay quang cao facebook",
    "chay google adwords",
    "toi uu google map",
    "lam web spa",
    "lam web nha khoa",
    "website spa dep",
    "website nha khoa dep",
    "mau website doanh nghiep",
    "mau landing page",
    "thiet ke logo va website",
  ],
  "bien-the",
  "commercial",
);

// ——— 12. Bổ sung đủ 1000 — combo dịch vụ khách hay hỏi ———
const MODS = ["uy tín", "chuyên nghiệp", "giá rẻ", "trọn gói", "nhanh", "chuẩn seo 2026", "cho startups", "cho sme", "cho shop nhỏ", "cho phòng khám"];
const BASES = [
  "thiết kế website",
  "làm website",
  "làm landing page",
  "dịch vụ seo",
  "chạy facebook ads",
  "chạy google ads",
  "làm fanpage",
  "thiết kế giao diện web",
];
for (const b of BASES) {
  for (const m of MODS) add(`${b} ${m}`, "modifier", "commercial");
}

const MORE = [
  "thiết kế website đặt lịch online",
  "website có form báo giá",
  "website tích hợp zalo",
  "website tích hợp messenger",
  "website đặt bàn nhà hàng",
  "website đặt lịch spa",
  "website đặt lịch nha khoa",
  "website bán course online",
  "website khóa học",
  "website thành viên",
  "website tuyển dụng",
  "website hồ sơ năng lực",
  "website portfolio",
  "website kiến trúc sư",
  "website nhiếp ảnh gia",
  "website freelancer",
  "mini website",
  "one page website",
  "microsite sự kiện",
  "website sự kiện",
  "website hội thảo",
  "website từ thiện",
  "website trường học",
  "website bệnh viện",
  "website phòng khám đa khoa",
  "website catalogue sản phẩm",
  "website bảng giá",
  "website menu nhà hàng",
  "digital menu",
  "website qr order",
  "thiết kế website ai",
  "làm website bằng ai",
  "website tạo bằng chatgpt",
  "có nên dùng ai làm website",
  "thiết kế website figma",
  "cut html từ figma",
  "website nextjs",
  "website react",
  "website laravel",
  "gia công website",
  "outsource thiết kế web",
  "white label website",
  "partner thiết kế website",
  "cộng tác viên marketing",
  "tuyển chuyên viên seo",
  "học seo thực chiến",
  "khóa học thiết kế website",
  "freelance thiết kế web",
  "thuê freelancer làm web",
  "upwork thiết kế website việt nam",
  "ngân sách website startup",
  "mvp website",
  "prototype website",
  "wireframe website",
  "user research website",
  "a/b testing landing page",
  "cro website",
  "tối ưu chuyển đổi website",
  "heatmap website",
  "google analytics 4",
  "cài đặt ga4",
  "facebook pixel",
  "tiktok pixel",
  "conversion tracking",
  "utm tracking",
];
addMany(MORE, "dich-vu-mo-rong", "commercial");

// pad with high-intent remaining combos if needed
const EXTRA_INDUSTRY = [
  "nhà thuốc",
  "phòng gym",
  "salon tóc nữ",
  "tiệm nail",
  "cửa hàng mẹ bé",
  "shop giày",
  "cửa hàng điện thoại",
  "cửa hàng nội thất",
  "công ty du lịch",
  "đại lý xe",
  "trung tâm ngoại ngữ",
  "trường quốc tế",
  "công ty logistics",
  "kho vận",
  "công ty phần mềm",
  "startup công nghệ",
  "công ty bảo hiểm",
  "phòng khám nhi",
  "phòng khám sản",
  "thẩm mỹ răng sứ",
];
for (const ind of EXTRA_INDUSTRY) {
  add(`thiết kế website ${ind} giá rẻ`, "extra", "transactional");
  add(`làm website ${ind} chuẩn seo`, "extra", "commercial");
  add(`công ty làm website ${ind}`, "extra", "commercial");
}

// ——— pad: câu hỏi mua hàng + so sánh dịch vụ ———
addMany(
  [
    "thiết kế website trả góp",
    "làm website nhận ủy thác",
    "đặt cọc làm website",
    "hợp đồng thiết kế website mẫu",
    "cam kết tiến độ làm web",
    "bảo hành website bao lâu",
    "sửa lỗi website miễn phí",
    "hướng dẫn quản trị website sau bàn giao",
    "training sử dụng website",
    "bàn giao source code website",
    "website có sở hữu source không",
    "hosting dùng chung hay riêng",
    "vps hay shared hosting",
    "cloudflare cho website",
    "cdn việt nam",
    "email theo tên miền giá",
    "google workspace giá",
    "microsoft 365 cho sme",
    "chữ ký số cho website",
    "hóa đơn điện tử gắn website",
    "tích hợp crm vào website",
    "hubspot việt nam",
    "website sync shopee",
    "website bán trên lazada",
    "omnichannel website",
    "website đa chi nhánh",
    "website chuỗi spa",
    "website chuỗi nha khoa",
    "website nhượng quyền",
    "website franchise",
    "landing page tuyển dụng",
    "landing page pre-order",
    "landing page webinar",
    "landing page khóa học",
    "landing page app download",
    "trang cảm ơn sau form",
    "thank you page tối ưu",
    "popup thu lead",
    "exit intent popup",
    "chat live website",
    "tawk.to website",
    "crmis zalo",
    "website gọi ngay click to call",
    "nút gọi điện trên web mobile",
    "schema localbusiness",
    "schema faqpage",
    "rich snippet website",
    "sitemap xml",
    "robots txt",
    "canonical url",
    "redirect 301 website cũ",
    "chuyển domain website",
    "đổi host giữ seo",
    "migrate wordpress",
    "chuyển từ wix sang wordpress",
    "website bị spam index",
    "disavow backlink",
    "penalty google",
    "traffic website giảm đột ngột",
    "tăng traffic website organic",
    "tăng lead từ website",
    "cải thiện bounce rate",
    "giảm tỷ lệ thoát trang",
    "tối ưu trang chủ website",
    "viết slogan website",
    "viết giới thiệu công ty",
    "chụp ảnh cho website",
    "video giới thiệu công ty",
    "drone quay nhà xưởng",
    "360 virtual tour website",
    "3d tour bất động sản website",
    "website bilingual anh việt",
    "website tiếng anh doanh nghiệp",
    "dịch website sang tiếng anh",
    "làm hồ sơ năng lực pdf",
    "company profile online",
    "one pager doanh nghiệp",
    "pitch deck kèm website",
    "website gọi vốn startup",
    "website trình bày sản phẩm saas",
    "pricing page saas",
    "docs sản phẩm trên web",
    "blog chuẩn seo cho doanh nghiệp",
    "lịch đăng bài blog",
    "chiến lược content silo",
    "từ khóa seed website",
    "nghiên cứu từ khóa đối thủ",
    "phân tích đối thủ seo",
    "spy facebook ads đối thủ",
    "thư viện quảng cáo meta",
    "creative ads bán được",
    "landing page tỷ lệ chuyển đổi cao",
    "a b test nút cta",
    "cta website hiệu quả",
    "màu nút mua hàng",
    "form ngắn hay dài",
    "lead magnet",
    "tặng ebook đổi số điện thoại",
    "checklist seo onpage 2026",
    "kiểm tra backlink miễn phí",
    "công cụ seo miễn phí",
    "ahrefs thay thế miễn phí",
    "google keyword planner",
    "tìm từ khóa không cạnh tranh",
    "từ khóa dài đuôi",
    "từ khóa địa phương",
    "gói seo 3 tháng",
    "gói seo 6 tháng",
    "cam kết top google có nên tin",
    "seo mũ đen rủi ro",
    "content spamming",
    "mua backlink có nên",
    "guest post việt nam",
    "báo chí trả phí pr",
    "pr doanh nghiệp startup",
    "branding website",
    "thiết kế nhận diện thương hiệu",
    "logo banner website",
    "favicon website",
    "open graph facebook",
    "thumbnail youtube đồng bộ brand",
    "thiết kế website dark mode",
    "website tối giản minimal",
    "website sang trọng luxury",
    "website dễ thương pastel",
    "website công nghệ xanh",
    "website nhà máy sản xuất",
    "website khu công nghiệp",
    "website xuất khẩu",
    "website b2b lead gen",
    "website thu mua nguyên liệu",
    "website đại lý phân phối",
    "portal đại lý",
    "website đặt hàng nội bộ",
    "website thành viên hội",
    "website câu lạc bộ",
    "website tổ chức phi lợi nhuận",
    "website quỹ từ thiện",
    "website sự kiện chạy bộ",
    "website giải chạy",
    "website festival âm nhạc",
    "microsite ra mắt sản phẩm",
    "prelanding teaser",
    "coming soon page",
    "bảo trì website theo tháng",
    "gói chăm sóc website",
    "update plugin wordpress định kỳ",
    "vá lỗ hổng bảo mật website",
    "quét malware website",
    "cloudflare turnstile",
    "chống bot spam form",
    "recaptcha website",
    "rate limit api website",
    "uptime monitoring",
    "cảnh báo website die",
    "backup hàng ngày website",
    "disaster recovery website",
    "thiết kế website thương hiệu cá nhân",
    "website personal branding",
    "làm website giáo viên",
    "website coach online",
    "website tư vấn tài chính",
    "website môi giới bảo hiểm",
    "đặt lịch tư vấn trên website",
    "calendar booking website",
    "tích hợp calendly",
    "website đa tiền tệ",
    "website xuất hóa đơn tự động",
    "website loyalty thành viên",
    "website tích điểm khách hàng",
    "app member gắn website",
  ],
  "pad-intent",
  "commercial",
);

if (rows.length < 1000) {
  console.error(`Only ${rows.length} — need more`);
  process.exit(1);
}

const final = rows.slice(0, 1000).map((r, i) => ({ ...r, n: i + 1 }));

const byGroup = {};
for (const r of final) byGroup[r.group] = (byGroup[r.group] || 0) + 1;

const lines = [
  "# 1000 từ khóa khách hàng hay tìm kiếm",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Tổng: **${final.length}**`,
  "- Tiêu chí: intent thực tế (giá, địa phương, giải pháp, ngành hot) — không list ngành thuần",
  "",
  "## Phân bổ nhóm",
  "",
];
for (const [g, c] of Object.entries(byGroup).sort((a, b) => b[1] - a[1])) {
  lines.push(`- ${g}: ${c}`);
}
lines.push("");

let last = "";
for (const r of final) {
  if (r.group !== last) {
    lines.push(`## ${r.group}`);
    lines.push("");
    last = r.group;
  }
  lines.push(`${r.n}. **${r.kw}** — \`${r.slug}\` · _${r.intent}_`);
}
lines.push("");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");
fs.writeFileSync(
  outJson,
  JSON.stringify({ generatedAt: new Date().toISOString(), total: final.length, byGroup, keywords: final }, null, 2),
  "utf8",
);

console.log(`Written ${final.length}`);
console.log(byGroup);
console.log(outMd);
