/**
 * Snippet outreach theo vertical ưu tiên — copy/paste PR, guest post, cộng đồng ngành.
 * Chạy: node scripts/build-vertical-syndication-snippets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "vertical-syndication-snippets.md");

const SITE = "https://www.butphamarketing.com";

const VERTICALS = [
  {
    industry: "Nha khoa",
    keyword: "thiết kế website nha khoa",
    landing: `${SITE}/website/nganh/nha-khoa`,
    money: `${SITE}/blog/thiet-ke-website-nha-khoa`,
    caseStudy: `${SITE}/du-an/nha-khoa-dang-khoa`,
    proof: "15,4K impressions · 471 clicks GSC",
    social: `Clinic đang tìm đơn vị thiết kế website nha khoa chuẩn SEO? Case Nha Khoa Đăng Khoa: ${"15,4K impressions, 471 clicks"} sau triển khai. Landing: ${SITE}/website/nganh/nha-khoa · Case: ${SITE}/du-an/nha-khoa-dang-khoa`,
  },
  {
    industry: "Logistics",
    keyword: "thiết kế website logistics",
    landing: `${SITE}/website/nganh/logistics`,
    money: `${SITE}/blog/thiet-ke-website-logistics-van-tai`,
    caseStudy: `${SITE}/du-an/van-toc-express-logistics`,
    proof: "Silo proof 7/7 URL · form báo giá + tra cứu vận đơn",
    social: `Website logistics B2B cần form báo giá cước + tra cứu vận đơn — không phải shop. Case Vận Tốc Express: ${SITE}/du-an/van-toc-express-logistics · Dịch vụ: ${SITE}/website/nganh/logistics`,
  },
  {
    industry: "Mỹ phẩm",
    keyword: "thiết kế website mỹ phẩm",
    landing: `${SITE}/website/nganh/my-pham`,
    money: `${SITE}/blog/thiet-ke-website-my-pham-lam-dep`,
    caseStudy: `${SITE}/du-an/glow-dew-cosmetics`,
    proof: "Skincare D2C · INCI · COD/MoMo · SEO brand",
    social: `Brand skincare D2C cần website mỹ phẩm: INCI, review, checkout mobile. Case Glow Dew Beauty: ${SITE}/du-an/glow-dew-cosmetics · Landing: ${SITE}/website/nganh/my-pham`,
  },
  {
    industry: "Thẩm mỹ viện",
    keyword: "thiết kế website thẩm mỹ viện",
    landing: `${SITE}/website/nganh/tham-my`,
    money: `${SITE}/blog/thiet-ke-website-tham-my-vien`,
    caseStudy: `${SITE}/du-an/thien-hoang-kim`,
    proof: "Showcase filler/botox · đặt lịch · SEO local",
    social: `Thẩm mỹ viện cần website showcase dịch vụ + đặt lịch Zalo. Case Thiên Hoàng Kim: ${SITE}/du-an/thien-hoang-kim · ${SITE}/website/nganh/tham-my`,
  },
  {
    industry: "Xây dựng",
    keyword: "thiết kế website xây dựng",
    landing: `${SITE}/website/nganh/xay-dung`,
    money: `${SITE}/blog/thiet-ke-website-xay-dung-nha-thau`,
    caseStudy: `${SITE}/du-an/sao-khue-kien-truc`,
    proof: "Hồ sơ năng lực · dự án tiêu biểu · SEO B2B",
    social: `Nhà thầu cần website xây dựng: hồ sơ năng lực PDF + dự án tiêu biểu. Case Kiến Trúc Sao Khuê: ${SITE}/du-an/sao-khue-kien-truc · ${SITE}/website/nganh/xay-dung`,
  },
  {
    industry: "PCCC",
    keyword: "thiết kế website pccc",
    landing: `${SITE}/website/nganh/pccc`,
    money: `${SITE}/blog/thiet-ke-website-pccc`,
    caseStudy: `${SITE}/du-an/pccc-bao-an-fire`,
    proof: "Catalog thiết bị · chứng chỉ · form khảo sát hiện trường",
    social: `Công ty PCCC cần website chứng minh năng lực thi công — không chỉ catalog. Case: ${SITE}/du-an/pccc-bao-an-fire · ${SITE}/website/nganh/pccc`,
  },
  {
    industry: "Spa",
    keyword: "thiết kế website spa",
    landing: `${SITE}/website/nganh/spa`,
    money: `${SITE}/blog/thiet-ke-website-spa`,
    caseStudy: `${SITE}/du-an/phuoc-lai-luxury`,
    proof: "Gallery liệu trình · đặt lịch · SEO local",
    social: `Spa cần website đặt lịch liệu trình + gallery dịch vụ. Case Phước Lai Luxury: ${SITE}/du-an/phuoc-lai-luxury · ${SITE}/website/nganh/spa`,
  },
];

const lines = [];
lines.push("# Vertical Syndication Snippets — Outreach theo ngành");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push("- Mục tiêu: 2 placement/tuần/vertical (guest post, cộng đồng ngành, LinkedIn)");
lines.push("");
lines.push("## Ma trận vertical");
lines.push("");
lines.push("| Ngành | Landing | Case study | Proof |");
lines.push("|---|---|---|---|");
for (const v of VERTICALS) {
  lines.push(`| ${v.industry} | ${v.landing.replace(SITE, "")} | ${v.caseStudy.replace(SITE, "")} | ${v.proof} |`);
}
lines.push("");

for (const v of VERTICALS) {
  lines.push(`## ${v.industry}`);
  lines.push("");
  lines.push(`**Từ khóa:** ${v.keyword}`);
  lines.push("");
  lines.push("### Social / Zalo");
  lines.push("```");
  lines.push(v.social);
  lines.push("```");
  lines.push("");
  lines.push("### Guest post / cộng đồng ngành");
  lines.push("```");
  lines.push(
    `Bài viết bổ sung hướng dẫn ${v.keyword} tại ${v.money} — kèm checklist, template và case study thực chiến: ${v.caseStudy}. Triển khai dịch vụ: ${v.landing}`,
  );
  lines.push("```");
  lines.push("");
  lines.push("### Directory / citation");
  lines.push("```");
  lines.push(
    `Bứt Phá Marketing — ${v.keyword} cho doanh nghiệp Việt Nam. ${v.landing} · Case: ${v.caseStudy} · Liên hệ: ${SITE}/lien-he`,
  );
  lines.push("```");
  lines.push("");
}

lines.push("## Checklist tuần (7 vertical)");
lines.push("- [ ] 2 social post vertical (rotate ngành)");
lines.push("- [ ] 1 guest post / PR → landing ngành");
lines.push("- [ ] 1 case study share kèm screenshot");
lines.push("- [ ] 1 directory citation NAP");
lines.push("- [ ] Request indexing GSC: landing vừa outreach");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== Vertical syndication snippets ===");
console.log(`Verticals: ${VERTICALS.length}`);
console.log(`Report: ${outPath}`);
