/**
 * Playbook outreach tuần 1 — copy-paste sẵn + lệnh log tracker.
 * Chạy: npm run build:outreach-week-playbook
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "outreach-week-1-playbook.md");

const SITE = "https://www.butphamarketing.com";
const NAP = {
  name: "Bứt Phá Marketing",
  phone: "0937417982",
  email: "butphamarketing@gmail.com",
  address: "Tổ 8 ấp 6 Bình Mỹ Hồ Chí Minh",
  website: SITE,
};

const WEEK_TASKS = [
  {
    day: "Thứ 2",
    title: "GSC indexing — batch core (7 URL)",
    channel: "GSC",
    target: "7 URL money + case study",
    copy: null,
    log: null,
    urls: [
      "/website",
      "/blog/thiet-ke-website",
      "/blog/bao-gia-thiet-ke-website",
      "/seo-website",
      "/du-an/nha-khoa-dang-khoa",
      "/du-an/van-toc-express-logistics",
      "/du-an/glow-dew-cosmetics",
    ],
  },
  {
    day: "Thứ 3",
    title: "LinkedIn / Facebook — head term",
    channel: "Social",
    target: "/website",
    copy: `Doanh nghiệp đang tìm đơn vị thiết kế website chuẩn SEO? Bứt Phá Marketing triển khai website 3–12 triệu, có case study GSC thật (Nha Khoa Đăng Khoa: 15,4K impressions). Xem dịch vụ: ${SITE}/website`,
    log: 'Social LinkedIn/Facebook → /website — head term thiết kế website',
  },
  {
    day: "Thứ 3",
    title: "Case study share — Nha khoa",
    channel: "Social",
    target: "/du-an/nha-khoa-dang-khoa",
    copy: `Proof thực chiến: sau triển khai thiết kế website + SEO, Nha Khoa Đăng Khoa đạt 15,4K impressions và 471 clicks từ Google Search. Chi tiết: ${SITE}/du-an/nha-khoa-dang-khoa · Dịch vụ: ${SITE}/website`,
    log: 'Social case study share → /du-an/nha-khoa-dang-khoa',
  },
  {
    day: "Thứ 4",
    title: "Guest post pitch — pillar",
    channel: "Guest post",
    target: "/blog/thiet-ke-website",
    copy: `Chào [Tên biên tập],

Mình muốn đóng góp bài bổ sung cho độc giả của [Tên site] về chủ đề thiết kế website cho SME Việt Nam. Bài sẽ liên kết về hướng dẫn pillar (quy trình 7 bước + checklist): ${SITE}/blog/thiet-ke-website

Điểm khác biệt: kèm case study có số liệu GSC thật (15,4K impressions) thay vì lý thuyết chung chung.

Nếu phù hợp editorial, mình gửi outline 800 từ trong 48h. Cảm ơn anh/chị!`,
    log: 'Guest post pitch → /blog/thiet-ke-website — pillar thiết kế website',
  },
  {
    day: "Thứ 5",
    title: "Vertical outreach — Logistics",
    channel: "Vertical",
    target: "/website/nganh/logistics",
    copy: `Website logistics B2B cần form báo giá cước + tra cứu vận đơn — không phải shop. Case Vận Tốc Express: ${SITE}/du-an/van-toc-express-logistics · Dịch vụ: ${SITE}/website/nganh/logistics`,
    log: 'Vertical ngành logistics → /website/nganh/logistics',
  },
  {
    day: "Thứ 5",
    title: "Vertical outreach — Mỹ phẩm",
    channel: "Vertical",
    target: "/website/nganh/my-pham",
    copy: `Brand skincare D2C cần website mỹ phẩm: INCI, review, checkout mobile. Case Glow Dew Beauty: ${SITE}/du-an/glow-dew-cosmetics · Landing: ${SITE}/website/nganh/my-pham`,
    log: 'Vertical ngành mỹ phẩm → /website/nganh/my-pham',
  },
  {
    day: "Thứ 6",
    title: "Directory citation — NAP đồng bộ",
    channel: "Directory",
    target: "/website",
    copy: `${NAP.name} — dịch vụ thiết kế website, SEO và Facebook Marketing cho SME Việt Nam.

Website: ${NAP.website}/website
Email: ${NAP.email}
Hotline: ${NAP.phone}
Địa chỉ: ${NAP.address}
Liên hệ: ${NAP.website}/lien-he`,
    log: 'Directory citation NAP → /website',
  },
  {
    day: "Thứ 6",
    title: "Zalo inbox — báo giá",
    channel: "Zalo",
    target: "/blog/bao-gia-thiet-ke-website",
    copy: `Chào anh/chị! Bảng giá thiết kế website Bứt Phá: 3 / 6 / 9 / 12 triệu tùy gói. Chi tiết yếu tố ảnh hưởng giá: ${SITE}/blog/bao-gia-thiet-ke-website · Đặt lịch tư vấn: ${SITE}/lien-he · Zalo: https://zalo.me/${NAP.phone}`,
    log: 'Zalo inbox template → /blog/bao-gia-thiet-ke-website',
  },
];

const GSC_LANDING_BATCH = [
  "/website/nganh/nha-khoa",
  "/website/nganh/spa",
  "/website/nganh/tham-my",
  "/website/nganh/phong-kham",
  "/website/nganh/xay-dung",
  "/website/nganh/my-pham",
  "/website/nganh/pccc",
  "/website/nganh/logistics",
  "/website/nganh/co-khi",
  "/website/nganh/bao-bi",
  "/website/nganh/luat",
  "/website/nganh/thang-may",
  "/website/nganh/tu-dong-hoa",
  "/website/nganh/nha-hang",
  "/website/nganh/bat-dong-san",
  "/website/nganh/anh-ngu",
  "/website/nganh/mam-non",
  "/website/nganh/khach-san",
  "/website/nganh/noi-that",
  "/website/nganh/o-to",
  "/website/nganh/thiet-bi-ve-sinh",
  "/website/nganh/in-an",
  "/website/nganh/landing-page",
];

const lines = [];
lines.push("# Outreach Week 1 Playbook — ButPhaMarketing");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push(`- Mục tiêu tuần: **6 placements** (1 guest · 1 case · 2 social · 1 vertical · 1 directory)`);
lines.push(`- IndexNow: đã ping 30 URL · GSC request indexing vẫn cần làm thủ công`);
lines.push("");
lines.push("## KPI tuần");
lines.push("- [ ] 6/6 placement logged");
lines.push("- [ ] 30/30 URL request indexing GSC");
lines.push("- [ ] Brand query impressions tăng (GSC → Performance → Search type: Web)");
lines.push("- [ ] ≥1 referring domain mới (GSC Links hoặc Ahrefs free)");
lines.push("");
lines.push("## Lịch thực thi");
lines.push("");

for (const task of WEEK_TASKS) {
  lines.push(`### ${task.day} — ${task.title}`);
  lines.push(`- Channel: **${task.channel}**`);
  lines.push(`- Target: \`${task.target}\``);
  if (task.urls?.length) {
    lines.push("- URLs (paste vào GSC → URL Inspection → Request indexing):");
    for (const u of task.urls) lines.push(`  - ${SITE}${u}`);
  }
  if (task.copy) {
    lines.push("- Copy-paste:");
    lines.push("```");
    lines.push(task.copy);
    lines.push("```");
  }
  if (task.log) {
    lines.push("- Sau khi gửi, log:");
    lines.push("```bash");
    lines.push(`npm run build:backlink-weekly-tracker -- --log="${task.log}"`);
    lines.push("```");
  }
  lines.push("");
}

lines.push("## Thứ 7 — GSC batch landings (23 URL)");
lines.push("");
lines.push("Paste từng URL vào GSC → **URL Inspection** → **Request indexing**:");
lines.push("");
for (const u of GSC_LANDING_BATCH) {
  lines.push(`${SITE}${u}`);
}
lines.push("");
lines.push("Hoặc copy cả block từ `tmp-programmatic/gsc-indexing-urls.txt`.");
lines.push("");
lines.push("## NAP block (directory / citation)");
lines.push("```");
lines.push(`Tên: ${NAP.name}`);
lines.push(`Website: ${NAP.website}`);
lines.push(`Email: ${NAP.email}`);
lines.push(`Hotline: ${NAP.phone}`);
lines.push(`Địa chỉ: ${NAP.address}`);
lines.push("```");
lines.push("");
lines.push("## Kênh gợi ý (tuần 1)");
lines.push("| Kênh | Loại | Ghi chú |");
lines.push("|---|---|---|");
lines.push("| LinkedIn cá nhân + Fanpage | Social | Head term + case study |");
lines.push("| Zalo OA / nhóm agency | Social / Vertical | Logistics + mỹ phẩm snippet |");
lines.push("| Blog marketing VN (guest post) | Guest | Pitch pillar link |");
lines.push("| Hotfrog / Cylex / Yelp VN | Directory | NAP block ở trên |");
lines.push("| Cộng đồng ngành (FB group logistics, beauty) | Vertical | Case study link |");
lines.push("");
lines.push("## Snippet bổ sung");
lines.push("- Head term: `tmp-programmatic/head-term-syndication-snippets.md`");
lines.push("- Vertical 7 ngành: `tmp-programmatic/vertical-syndication-snippets.md`");
lines.push("- Tracker: `npm run build:backlink-weekly-tracker`");
lines.push("- GSC paste: `tmp-programmatic/gsc-copy-paste.md`");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== Outreach week 1 playbook ===");
console.log(`Report: ${outPath}`);
