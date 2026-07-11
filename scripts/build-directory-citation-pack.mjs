/**
 * Directory citation pack VN — danh sách + NAP copy-paste + checklist tuần 1.
 * Chạy: npm run build:directory-citation-pack
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "directory-citation-pack-vn.md");
const outJson = path.join(outDir, "directory-citation-pack-vn.json");

const SITE = "https://www.butphamarketing.com";
const NAP = {
  name: "Bứt Phá Marketing",
  nameEn: "But Pha Marketing",
  category: "Dịch vụ marketing / Thiết kế website",
  categoryEn: "Marketing agency / Web design",
  phone: "0937417982",
  email: "butphamarketing@gmail.com",
  address: "Tổ 8 ấp 6 Bình Mỹ Hồ Chí Minh",
  city: "Hồ Chí Minh",
  country: "Việt Nam",
  website: SITE,
  linkTarget: `${SITE}/website`,
  description:
    "Bứt Phá Marketing — agency thiết kế website, SEO và Facebook Marketing cho SME Việt Nam. Gói 3–12 triệu, có case study GSC thật.",
  descriptionShort: "Thiết kế website & SEO cho doanh nghiệp Việt Nam.",
  hours: "Thứ 2–Thứ 7, 8:00–18:00",
  zalo: "https://zalo.me/0937417982",
};

/** Tier P0 = làm tuần 1 · P1 = tuần 2 · P2 = khi rảnh */
const DIRECTORIES = [
  {
    tier: "P0",
    name: "Google Business Profile",
    url: "https://business.google.com/",
    submit: "https://business.google.com/create",
    linkType: "nofollow / brand",
    linkTarget: SITE,
    notes: "Quan trọng nhất — NAP phải khớp 100% với website schema",
    week1: true,
  },
  {
    tier: "P0",
    name: "Bing Places for Business",
    url: "https://www.bingplaces.com/",
    submit: "https://www.bingplaces.com/Dashboard/Home",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Import từ Google nếu có — verify bằng phone/email",
    week1: true,
  },
  {
    tier: "P0",
    name: "Facebook Business Page",
    url: "https://www.facebook.com/",
    submit: "Tạo/cập nhật Page → About → Contact",
    linkType: "nofollow",
    linkTarget: `${SITE}/website`,
    notes: "Điền website, phone, email, địa chỉ — đồng bộ NAP",
    week1: true,
  },
  {
    tier: "P0",
    name: "LinkedIn Company Page",
    url: "https://www.linkedin.com/company/",
    submit: "Company admin → Edit page → Website",
    linkType: "nofollow",
    linkTarget: `${SITE}/website`,
    notes: "Thêm website + mô tả dịch vụ thiết kế website",
    week1: true,
  },
  {
    tier: "P1",
    name: "Hotfrog Vietnam",
    url: "https://www.hotfrog.vn/",
    submit: "https://www.hotfrog.vn/add-your-business",
    linkType: "dofollow possible",
    linkTarget: `${SITE}/website`,
    notes: "Free listing · chọn category Marketing/Web design",
    week1: true,
  },
  {
    tier: "P1",
    name: "Cylex Vietnam",
    url: "https://www.cylex.vn/",
    submit: "https://www.cylex.vn/signin/register",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Đăng ký free · upload logo nếu có",
    week1: false,
  },
  {
    tier: "P1",
    name: "Yellow Pages Vietnam",
    url: "https://www.yellowpages.vn/",
    submit: "https://www.yellowpages.vn/dang-ky",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Form đăng ký doanh nghiệp VN",
    week1: false,
  },
  {
    tier: "P1",
    name: "Foursquare / Swarm",
    url: "https://foursquare.com/",
    submit: "https://foursquare.com/add-place",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Claim business · category Professional Services",
    week1: false,
  },
  {
    tier: "P2",
    name: "Diadiem.vn",
    url: "https://www.diadiem.vn/",
    submit: "https://www.diadiem.vn/them-dia-diem",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Local directory VN · pin TP.HCM",
    week1: false,
  },
  {
    tier: "P2",
    name: "Cybo Vietnam",
    url: "https://www.cybo.com/VN/",
    submit: "https://www.cybo.com/add-business",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "International directory · chọn Vietnam",
    week1: false,
  },
  {
    tier: "P2",
    name: "Tuugo Vietnam",
    url: "https://www.tuugo.vn/",
    submit: "https://www.tuugo.vn/AddYourBusiness",
    linkType: "nofollow",
    linkTarget: SITE,
    notes: "Free business listing",
    week1: false,
  },
  {
    tier: "P2",
    name: "Brownbook.net",
    url: "https://www.brownbook.net/",
    submit: "https://www.brownbook.net/business/add/",
    linkType: "dofollow possible",
    linkTarget: `${SITE}/website`,
    notes: "Global directory · category Web design",
    week1: false,
  },
];

const week1List = DIRECTORIES.filter((d) => d.week1);

const lines = [];
lines.push("# Directory Citation Pack — Việt Nam");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push(`- Mục tiêu tuần 1: **${week1List.length} citation** (P0 trước)`);
lines.push("- Quy tắc: **NAP giống hệt** trên mọi directory (tên, SĐT, email, địa chỉ)");
lines.push("");
lines.push("## NAP chuẩn — copy toàn block");
lines.push("```");
lines.push(`Tên doanh nghiệp: ${NAP.name}`);
lines.push(`Tên (EN): ${NAP.nameEn}`);
lines.push(`Website: ${NAP.website}`);
lines.push(`URL money (nếu form cho chọn): ${NAP.linkTarget}`);
lines.push(`Email: ${NAP.email}`);
lines.push(`Hotline: ${NAP.phone}`);
lines.push(`Zalo: ${NAP.zalo}`);
lines.push(`Địa chỉ: ${NAP.address}`);
lines.push(`Thành phố: ${NAP.city}, ${NAP.country}`);
lines.push(`Ngành: ${NAP.category}`);
lines.push(`Giờ mở cửa: ${NAP.hours}`);
lines.push("");
lines.push(`Mô tả ngắn: ${NAP.descriptionShort}`);
lines.push("");
lines.push(`Mô tả đầy đủ: ${NAP.description}`);
lines.push("```");
lines.push("");
lines.push("## Tuần 1 — làm ngay (checklist)");
lines.push("");
for (const d of week1List) {
  lines.push(`- [ ] **${d.name}** (${d.tier})`);
  lines.push(`  - Submit: ${d.submit}`);
  lines.push(`  - Link target: ${d.linkTarget}`);
  lines.push(`  - Ghi chú: ${d.notes}`);
}
lines.push("");
lines.push("Sau mỗi citation xong, log:");
lines.push("```bash");
lines.push('npm run build:backlink-weekly-tracker -- --log="Directory citation NAP → [Tên directory] → /website"');
lines.push("```");
lines.push("");
lines.push("## Full directory matrix");
lines.push("| Tier | Directory | Submit URL | Link | Tuần 1 |");
lines.push("|---|---|---|---|---|");
for (const d of DIRECTORIES) {
  lines.push(`| ${d.tier} | ${d.name} | ${d.submit} | ${d.linkTarget} | ${d.week1 ? "✓" : ""} |`);
}
lines.push("");
lines.push("## Lưu ý NAP consistency");
lines.push("- **Tên:** luôn \"Bứt Phá Marketing\" — không viết ButPha / But Pha trên directory");
lines.push("- **Phone:** `0937417982` — không thêm +84 khác format tùy site");
lines.push("- **Email:** `butphamarketing@gmail.com`");
lines.push("- **Địa chỉ:** khớp schema website (`Tổ 8 ấp 6 Bình Mỹ Hồ Chí Minh`)");
lines.push("- **Website:** ưu tiên homepage `https://www.butphamarketing.com` · money page trong mô tả nếu được");
lines.push("");
lines.push("## Theo dõi");
lines.push("- GSC → Links → Top linking sites (2–4 tuần sau)");
lines.push("- Search `\"Bứt Phá Marketing\" + địa chỉ` — kiểm tra duplicate listing");
lines.push("- Sửa listing sai NAP ngay khi phát hiện");

const report = {
  generatedAt: new Date().toISOString(),
  nap: NAP,
  directories: DIRECTORIES,
  week1Count: week1List.length,
  week1Names: week1List.map((d) => d.name),
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8");
console.log("=== Directory citation pack VN ===");
console.log(`Week 1 targets: ${week1List.length}`);
console.log(`MD: ${outPath}`);
console.log(`JSON: ${outJson}`);
