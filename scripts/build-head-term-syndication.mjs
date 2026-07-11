/**
 * Snippet syndication cho cụm «thiết kế website» — copy/paste lên PR, guest post, social.
 * Chạy: node scripts/build-head-term-syndication.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "head-term-syndication-snippets.md");

const SITE = "https://www.butphamarketing.com";

const snippets = [
  {
    channel: "LinkedIn / Facebook",
    anchor: "thiết kế website",
    url: `${SITE}/website`,
    text: `Doanh nghiệp đang tìm đơn vị ${"`"}thiết kế website${"`"} chuẩn SEO? Bứt Phá Marketing triển khai website 3–12 triệu, có case study GSC thật (Nha Khoa Đăng Khoa: 15,4K impressions). Xem dịch vụ: ${SITE}/website`,
  },
  {
    channel: "Guest post intro",
    anchor: "thiết kế website",
    url: `${SITE}/blog/thiet-ke-website`,
    text: `Bài viết này bổ sung cho hướng dẫn pillar về thiết kế website tại ${SITE}/blog/thiet-ke-website — quy trình 7 bước, bảng giá và checklist trước khi triển khai.`,
  },
  {
    channel: "Case study syndication — Nha khoa",
    anchor: "case study thiết kế website nha khoa",
    url: `${SITE}/du-an/nha-khoa-dang-khoa`,
    text: `Proof thực chiến: sau triển khai thiết kế website + SEO, Nha Khoa Đăng Khoa đạt 15,4K impressions và 471 clicks từ Google Search. Chi tiết case study: ${SITE}/du-an/nha-khoa-dang-khoa · Dịch vụ: ${SITE}/website`,
  },
  {
    channel: "Case study syndication — Logistics",
    anchor: "case study thiết kế website logistics",
    url: `${SITE}/du-an/van-toc-express-logistics`,
    text: `Website logistics B2B: form báo giá cước, tra cứu vận đơn và silo SEO 7/7 URL proof. Case Vận Tốc Express: ${SITE}/du-an/van-toc-express-logistics · Landing: ${SITE}/website/nganh/logistics`,
  },
  {
    channel: "Case study syndication — Mỹ phẩm",
    anchor: "case study thiết kế website mỹ phẩm",
    url: `${SITE}/du-an/glow-dew-cosmetics`,
    text: `Skincare D2C cần website mỹ phẩm: INCI, review, COD/MoMo và SEO brand. Case Glow Dew Beauty: ${SITE}/du-an/glow-dew-cosmetics · Landing: ${SITE}/website/nganh/my-pham`,
  },
  {
    channel: "Directory / citation",
    anchor: "dịch vụ thiết kế website",
    url: `${SITE}/website`,
    text: `Bứt Phá Marketing — dịch vụ thiết kế website, SEO và Facebook Marketing cho SME Việt Nam. Website: ${SITE}/website · Liên hệ: ${SITE}/lien-he`,
  },
  {
    channel: "Zalo / inbox template",
    anchor: "báo giá thiết kế website",
    url: `${SITE}/blog/bao-gia-thiet-ke-website`,
    text: `Chào anh/chị! Bảng giá thiết kế website Bứt Phá: 3 / 6 / 9 / 12 triệu tùy gói. Chi tiết yếu tố ảnh hưởng giá: ${SITE}/blog/bao-gia-thiet-ke-website · Đặt lịch tư vấn: ${SITE}/lien-he`,
  },
];

const lines = [];
lines.push("# Head-Term Syndication Snippets — «thiết kế website»");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push("- Mục tiêu: 3–5 placement/tuần về `/website`, 2 placement/tuần về pillar");
lines.push("");
lines.push("## Snippets sẵn dùng");
lines.push("");

snippets.forEach((s, i) => {
  lines.push(`### ${i + 1}. ${s.channel}`);
  lines.push(`- Anchor: **${s.anchor}**`);
  lines.push(`- URL: ${s.url}`);
  lines.push("");
  lines.push("```");
  lines.push(s.text);
  lines.push("```");
  lines.push("");
});

lines.push("## Checklist tuần");
lines.push("- [ ] 1 guest post / PR mention → `/website`");
lines.push("- [ ] 1 case study share (GSC screenshot) → `/du-an/nha-khoa-dang-khoa`");
lines.push("- [ ] 1 case study logistics → `/du-an/van-toc-express-logistics`");
lines.push("- [ ] 1 case study mỹ phẩm → `/du-an/glow-dew-cosmetics`");
lines.push("- [ ] 2 social post → pillar `/blog/thiet-ke-website`");
lines.push("- [ ] 1 directory citation NAP đồng bộ");
lines.push("- [ ] Request indexing GSC: `/website`, `/blog/thiet-ke-website`, 2 landing ngành vừa outreach");
lines.push("");
lines.push("## Vertical outreach");
lines.push("- Xem thêm: `tmp-programmatic/vertical-syndication-snippets.md` (7 ngành ưu tiên)");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`=== Head-term syndication snippets ===`);
console.log(`Report: ${outPath}`);
