/**
 * Tạo lib/masothue-industries.data.json từ data/masothue-nganh-nghe.txt
 * Nguồn: https://masothue.net/nganh-nghe (Hệ thống ngành kinh tế VN)
 *
 * Chạy: node scripts/generate-masothue-industries.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcPath = path.join(root, "data", "masothue-nganh-nghe.txt");
const outPath = path.join(root, "lib", "masothue-industries.data.json");

function profileId(code) {
  const n = parseInt(code.slice(0, 2), 10);
  if (n <= 3) return "agriculture";
  if (n <= 9) return "construction";
  if (n <= 12) return "agriculture";
  if (n <= 15) return "fashion-retail";
  if (n <= 18) return "ecommerce";
  if (n <= 21) return "pharmacy";
  if (n <= 23) return "ecommerce";
  if (n <= 33) return "construction";
  if (n === 35) return "construction";
  if (n <= 39) return "professional-services";
  if (n <= 43) return "construction";
  if (n === 45) return "automotive";
  if (n <= 47) return "ecommerce";
  if (n <= 53) return "logistics";
  if (n === 55) return "hotel";
  if (n === 56) return "fnb";
  if (n <= 63) return "tech";
  if (n <= 66) return "professional-services";
  if (n === 68) return "realestate";
  if (n <= 71) return "professional-services";
  if (n === 72) return "tech";
  if (n === 73) return "tech";
  if (n <= 74) return "professional-services";
  if (n === 75) return "health-beauty";
  if (n <= 82) return "professional-services";
  if (n === 85) return "education";
  if (n <= 88) return "health-beauty";
  if (n <= 93) return "events";
  return "professional-services";
}

function sectorGroup(code) {
  const n = parseInt(code.slice(0, 2), 10);
  const map = [
    [1, 3, "Nông nghiệp & Thủy sản"],
    [5, 9, "Khai khoáng"],
    [10, 33, "Công nghiệp chế biến"],
    [35, 35, "Điện & năng lượng"],
    [36, 39, "Cấp nước & xử lý môi trường"],
    [41, 43, "Xây dựng & lắp đặt"],
    [45, 47, "Thương mại & bán lẻ"],
    [49, 53, "Vận tải & kho bãi"],
    [55, 56, "Lưu trú & ăn uống"],
    [58, 63, "CNTT & truyền thông"],
    [64, 66, "Tài chính & bảo hiểm"],
    [68, 68, "Bất động sản"],
    [69, 75, "Khoa học & kỹ thuật"],
    [77, 82, "Cho thuê & dịch vụ DN"],
    [85, 85, "Giáo dục"],
    [86, 88, "Y tế & an sinh"],
    [90, 96, "Văn hóa, thể thao & dịch vụ"],
    [97, 99, "Hoạt động hộ gia đình"],
  ];
  for (const [a, b, g] of map) if (n >= a && n <= b) return g;
  return "Khác";
}

const extras = [
  { code: "43290", name: "Lắp đặt thang máy", profileId: "construction", group: "Xây dựng & lắp đặt", keywords: ["thang may", "elevator", "thang cuon", "escalator"] },
  { code: "43290", name: "Bảo trì thang máy", profileId: "construction", group: "Xây dựng & lắp đặt", keywords: ["bao tri thang may", "sua thang may"] },
  { code: "43222", name: "Lắp đặt điều hòa", profileId: "construction", group: "Xây dựng & lắp đặt", keywords: ["dieu hoa", "may lanh", "hvac"] },
  { code: "43210", name: "Lắp đặt điện dân dụng", profileId: "construction", group: "Xây dựng & lắp đặt", keywords: ["dien dan dung", "dien nhe"] },
  { code: "43300", name: "Sơn nhà / Hoàn thiện nội thất", profileId: "construction", group: "Xây dựng & lắp đặt", keywords: ["son nha", "hoan thien"] },
  { code: "43290", name: "Lắp đặt camera an ninh", profileId: "professional-services", group: "Dịch vụ & B2B", keywords: ["lap dat camera", "camera an ninh", "cctv"] },
  { code: "80100", name: "Dịch vụ bảo vệ", profileId: "professional-services", group: "Dịch vụ & B2B", keywords: ["bao ve", "security guard"] },
  { code: "81290", name: "Diệt côn trùng / Vệ sinh công nghiệp", profileId: "professional-services", group: "Dịch vụ & B2B", keywords: ["diet con trung", "pest control", "ve sinh cong nghiep"] },
  { code: "96020", name: "Xăm / Phun xăm thẩm mỹ", profileId: "health-beauty", group: "Y tế & Sức khỏe", keywords: ["xam hinh", "phun xam", "tattoo", "pmu"] },
  { code: "73100", name: "Quảng cáo / SEO / Marketing", profileId: "tech", group: "CNTT & truyền thông", keywords: ["quang cao", "seo", "marketing", "google ads", "facebook ads"] },
  { code: "47910", name: "TikTok Shop / Livestream bán hàng", profileId: "ecommerce", group: "Bán hàng & TMĐT", keywords: ["tiktok shop", "tiktok", "livestream", "dropship", "dropshipping"] },
  { code: "47910", name: "Bán hàng online / Shopee / Lazada", profileId: "ecommerce", group: "Bán hàng & TMĐT", keywords: ["shopee", "lazada", "ban hang online", "affiliate"] },
  { code: "14100", name: "Xưởng may / Sản xuất thời trang", profileId: "fashion-retail", group: "Công nghiệp chế biến", keywords: ["xuong may", "san xuat quan ao"] },
  { code: "25920", name: "Gia công cơ khí", profileId: "construction", group: "Công nghiệp chế biến", keywords: ["co khi", "gia cong co khi", "che tao co khi"] },
  { code: "18110", name: "In offset / In ấn", profileId: "professional-services", group: "Công nghiệp chế biến", keywords: ["in offset", "in an", "in catalogue"] },
  { code: "5210", name: "Kho bãi / Lưu giữ hàng hóa", profileId: "logistics", group: "Vận tải & kho bãi", keywords: ["kho bai", "kho hang", "warehouse"] },
  { code: "77101", name: "Cho thuê xe ô tô", profileId: "automotive", group: "Cho thuê & dịch vụ DN", keywords: ["cho thue xe", "thue xe tu lai", "car rental"] },
  { code: "64920", name: "Cầm đồ / Tín dụng", profileId: "professional-services", group: "Tài chính & bảo hiểm", keywords: ["cam do", "cam co", "tai chinh"] },
  { code: "82200", name: "Call center / Telesale", profileId: "professional-services", group: "Dịch vụ & B2B", keywords: ["call center", "telesale", "tong dai"] },
  { code: "73100", name: "Content creator / KOL / Influencer", profileId: "tech", group: "CNTT & truyền thông", keywords: ["content creator", "kol", "influencer", "creator"] },
  { code: "82300", name: "Tổ chức sự kiện / Team building", profileId: "events", group: "Văn hóa, thể thao & dịch vụ", keywords: ["team building", "su kien", "event"] },
  { code: "93110", name: "Sân golf / Billiards / Thể thao", profileId: "fitness", group: "Văn hóa, thể thao & dịch vụ", keywords: ["golf", "billiards", "bi a", "the thao"] },
  { code: "96200", name: "Giặt là công nghiệp", profileId: "professional-services", group: "Văn hóa, thể thao & dịch vụ", keywords: ["giat la cong nghiep", "may giat cong nghiệp"] },
  { code: "65110", name: "Bảo hiểm nhân thọ", profileId: "professional-services", group: "Tài chính & bảo hiểm", keywords: ["bao hiem nhan tho", "bao hiem"] },
  { code: "65121", name: "Bảo hiểm y tế / Sức khỏe", profileId: "professional-services", group: "Tài chính & bảo hiểm", keywords: ["bao hiem y te", "bao hiem suc khoe"] },
  { code: "68201", name: "Cho thuê văn phòng / Mặt bằng", profileId: "realestate", group: "Bất động sản", keywords: ["cho thue van phong", "mat bang", "phong tro"] },
  { code: "56200", name: "Catering / Suất ăn công nghiệp", profileId: "fnb", group: "Ăn uống & Lưu trú", keywords: ["catering", "suat an cong nghiep", "giao an"] },
  { code: "47741", name: "Điện thoại cũ / Sim / Phụ kiện", profileId: "ecommerce", group: "Bán hàng & TMĐT", keywords: ["dien thoai cu", "sim", "may cu"] },
  { code: "38210", name: "Thu mua phế liệu / Tái chế", profileId: "professional-services", group: "Cấp nước & xử lý môi trường", keywords: ["phe lieu", "thu mua phe lieu", "tai che"] },
  { code: "77210", name: "Cho thuê thiết bị sự kiện", profileId: "events", group: "Cho thuê & dịch vụ DN", keywords: ["cho thue am thanh", "cho thue thiet bi su kien"] },
];

const src = fs.readFileSync(srcPath, "utf8");
const lines = src.split(/\r?\n/).filter((l) => l.startsWith("- "));
const items = [];
const seen = new Set();

for (const line of lines) {
  const m = line.match(/^- (\d+)(.+)$/);
  if (!m) continue;
  const code = m[1];
  const name = m[2].trim();
  if (name.includes("(Mã ngành cũ)")) continue;
  if (/^[A-ZÀ-ỸĐ][A-ZÀ-ỸĐ\s,]+$/.test(name) && code.length <= 2) continue;
  if (code.length < 3) continue;
  const key = `${code}|${name}`;
  if (seen.has(key)) continue;
  seen.add(key);
  items.push({ code, name, profileId: profileId(code), group: sectorGroup(code) });
}

for (const e of extras) items.push(e);

fs.writeFileSync(outPath, JSON.stringify(items));
console.log(`Generated ${items.length} industries → ${outPath}`);
