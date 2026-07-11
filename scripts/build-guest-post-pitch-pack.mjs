/**
 * Guest post pitch pack — email copy-paste + outline mẫu.
 * Chạy: npm run build:guest-post-pitch-pack
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "guest-post-pitch-pack.md");

const SITE = "https://www.butphamarketing.com";
const SENDER = {
  name: "Bứt Phá Marketing",
  email: "butphamarketing@gmail.com",
  phone: "0937417982",
  website: SITE,
};

const TARGET_SITES = [
  { tier: "P0", name: "Blog marketing / agency VN", examples: "Brands Vietnam, The Leader, blog agency đối tác", angle: "pillar" },
  { tier: "P0", name: "Cộng đồng startup / SME", examples: "Startup Vietnam, nhóm FB founder", angle: "money" },
  { tier: "P1", name: "Blog ngành y tế / nha khoa", examples: "Tạp chí nha khoa, group clinic owner", angle: "nha-khoa" },
  { tier: "P1", name: "Blog logistics / vận tải", examples: "VLA, group logistics VN", angle: "logistics" },
  { tier: "P2", name: "Blog làm đẹp / mỹ phẩm", examples: "Beauty community, D2C brand groups", angle: "my-pham" },
];

const PITCHES = {
  pillar: {
    subject: "Đề xuất guest post: Checklist thiết kế website cho SME (có case GSC thật)",
    body: `Chào anh/chị [Tên biên tập],

Mình là [Tên bạn] từ ${SENDER.name} — agency thiết kế website + SEO tại TP.HCM.

Mình muốn đóng góp 1 bài practical cho độc giả [Tên site], không viết quảng cáo thuần túy:

**Đề xuất tiêu đề:** "7 bước triển khai website SME Việt Nam — checklist trước khi ký hợp đồng"
**Góc khác biệt:** Kèm case study có số liệu Google Search Console (15,4K impressions, 471 clicks) thay vì checklist chung chung.
**Link tham khảo (pillar):** ${SITE}/blog/thiet-ke-website
**Case study proof:** ${SITE}/du-an/nha-khoa-dang-khoa

Bài dự kiến ~900–1.200 từ, 1 contextual link về pillar + 1 link case study (nếu editorial cho phép).

Nếu phù hợp line của [Tên site], mình gửi outline chi tiết trong 48h. Cảm ơn anh/chị đã xem qua!

Trân trọng,
[Tên bạn]
${SENDER.name} · ${SENDER.phone} · ${SENDER.email}`,
    log: 'Guest post pitch pillar → /blog/thiet-ke-website — [Tên site]',
  },
  money: {
    subject: "Guest post: Báo giá thiết kế website 2026 — yếu tố nào làm giá tăng/giảm?",
    body: `Chào anh/chị [Tên biên tập],

Mình gửi lời đề xuất guest post cho [Tên site] — chủ đề nhiều SME search nhất: **báo giá thiết kế website**.

**Tiêu đề gợi ý:** "Bảng giá website 3–12 triệu: phân tích chi phí thật SME cần biết trước khi triển khai"
**Nội dung:** So sánh gói, timeline, ẩn phí (hosting, bảo trì, SEO), checklist RFP ngắn.
**Link money page:** ${SITE}/blog/bao-gia-thiet-ke-website
**Dịch vụ:** ${SITE}/website

Mình cam kết nội dung actionable, có bảng so sánh — không spam anchor.

Anh/chị cho mình biết editorial guideline (word count, số link, ảnh minh họa) để mình gửi outline phù hợp ạ.

Cảm ơn!
[Tên bạn] · ${SENDER.email}`,
    log: 'Guest post pitch báo giá → /blog/bao-gia-thiet-ke-website — [Tên site]',
  },
  "nha-khoa": {
    subject: "Guest post ngành nha khoa: Website clinic + SEO local — case 15,4K impressions",
    body: `Chào anh/chị [Tên biên tập],

Mình muốn chia sẻ bài thực chiến cho độc giả ngành y tế/nha khoa của [Tên site]:

**Tiêu đề:** "Website nha khoa 2026: module bắt buộc + SEO local sau triển khai"
**Proof:** Case Nha Khoa Đăng Khoa — 15,4K impressions, 471 clicks (GSC).
**Link case:** ${SITE}/du-an/nha-khoa-dang-khoa
**Landing ngành:** ${SITE}/website/nganh/nha-khoa
**Blog pillar ngành:** ${SITE}/blog/thiet-ke-website-nha-khoa

Bài tập trung checklist triển khai (đặt lịch, bảng giá dịch vụ, before/after) — phù hợp chủ phòng khám đang tìm vendor.

Mình gửi outline trong tuần nếu anh/chị quan tâm ạ.

[Tên bạn] · ${SENDER.name}`,
    log: 'Guest post pitch nha khoa → /du-an/nha-khoa-dang-khoa — [Tên site]',
  },
  logistics: {
    subject: "Guest post B2B logistics: Website báo giá cước + tra cứu vận đơn",
    body: `Chào anh/chị [Tên biên tập],

Độc giả logistics/SME vận tải thường cần website **B2B lead gen**, không phải e-commerce. Mình đề xuất bài:

**Tiêu đề:** "Thiết kế website logistics: 5 module bắt buộc trước khi chạy quảng cáo"
**Case:** Vận Tốc Express — form báo giá cước, tra cứu vận đơn, silo SEO ngành.
**Link case:** ${SITE}/du-an/van-toc-express-logistics
**Landing:** ${SITE}/website/nganh/logistics

Nếu [Tên site] có mục doanh nghiệp vận tải, mình sẵn sàng viết bài 800–1.000 từ + infographic checklist.

[Tên bạn] · ${SENDER.email}`,
    log: 'Guest post pitch logistics → /website/nganh/logistics — [Tên site]',
  },
  "my-pham": {
    subject: "Guest post D2C mỹ phẩm: Website brand + SEO skincare",
    body: `Chào anh/chị [Tên biên tập],

Chủ đề phù hợp cộng đồng beauty/D2C:

**Tiêu đề:** "Website mỹ phẩm D2C: INCI, review, checkout mobile — checklist 2026"
**Case:** Glow Dew Beauty — skincare brand, COD/MoMo, SEO brand.
**Link case:** ${SITE}/du-an/glow-dew-cosmetics
**Landing:** ${SITE}/website/nganh/my-pham

Mình có thể đóng góp bài practical, 1 link contextual về case + 1 về landing ngành.

Cảm ơn anh/chị!
[Tên bạn] · ${SENDER.name}`,
    log: 'Guest post pitch mỹ phẩm → /du-an/glow-dew-cosmetics — [Tên site]',
  },
  followup: {
    subject: "Re: Guest post — gửi outline [Tiêu đề bài]",
    body: `Chào anh/chị [Tên biên tập],

Follow-up lịch sự về đề xuất guest post tuần trước. Mình đính kèm outline ngắn:

1. Vấn đề SME gặp phải (2–3 bullet)
2. Framework / checklist (phần chính)
3. Case minh họa + số liệu
4. CTA mềm → link pillar/case

Anh/chị cần chỉnh góc bài hoặc giảm số link, mình adjust trong 24h. Cảm ơn!

[Tên bạn]`,
    log: 'Guest post follow-up → [Tên site]',
  },
};

const OUTLINE_TEMPLATE = `# Outline guest post — [Tiêu đề bài]

## Meta
- Target URL chính: [URL]
- Word count: 900–1.200
- Số link tối đa: 2 contextual

## H2. Vấn đề / pain point (150 từ)
- SME Việt triển khai website nhưng không có lead
- Hay: clinic/logistics/D2C thiếu module conversion

## H2. Framework / checklist (400 từ)
- Bullet actionable, không lý thuyết chung
- Bảng so sánh nếu có

## H2. Case study minh họa (250 từ)
- Before/after + metric GSC
- Link: ${SITE}/du-an/nha-khoa-dang-khoa (hoặc case phù hợp ngành)

## H2. Bước tiếp theo (100 từ)
- CTA mềm → pillar hoặc /lien-he
- Link: ${SITE}/blog/thiet-ke-website

## Bio author (50 từ)
${SENDER.name} — thiết kế website & SEO cho SME Việt Nam. ${SITE}/website · ${SENDER.email}`;

const lines = [];
lines.push("# Guest Post Pitch Pack — ButPhaMarketing");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push(`- Gửi từ: ${SENDER.email}`);
lines.push("- Mục tiêu tuần 1: **3 pitch gửi** · **1 follow-up** · **1 bài được duyệt outline**");
lines.push("");
lines.push("## Target sites (gợi ý)");
lines.push("| Tier | Loại site | Ví dụ | Angle |");
lines.push("|---|---|---|---|");
for (const t of TARGET_SITES) {
  lines.push(`| ${t.tier} | ${t.name} | ${t.examples} | ${t.angle} |`);
}
lines.push("");
lines.push("## Quy trình gửi");
lines.push("1. Chọn 3 site tier P0/P1");
lines.push("2. Copy email phù hợp angle → thay `[Tên biên tập]`, `[Tên site]`, `[Tên bạn]`");
lines.push("3. Gửi email / LinkedIn InMail / form liên hệ site");
lines.push("4. Log ngay:");
lines.push("```bash");
lines.push('npm run build:backlink-weekly-tracker -- --log="Guest post pitch pillar → /blog/thiet-ke-website — [Tên site]"');
lines.push("```");
lines.push("5. Sau 5–7 ngày không reply → gửi follow-up");
lines.push("");

for (const [key, pitch] of Object.entries(PITCHES)) {
  lines.push(`## Email — ${key}`);
  lines.push(`**Subject:** ${pitch.subject}`);
  lines.push("");
  lines.push("```");
  lines.push(pitch.body);
  lines.push("```");
  lines.push("");
  lines.push("Log sau khi gửi:");
  lines.push("```bash");
  lines.push(`npm run build:backlink-weekly-tracker -- --log="${pitch.log}"`);
  lines.push("```");
  lines.push("");
}

lines.push("## Outline mẫu (khi được duyệt)");
lines.push("```markdown");
lines.push(OUTLINE_TEMPLATE);
lines.push("```");
lines.push("");
lines.push("## Checklist tuần");
lines.push("- [ ] Pitch P0 #1 — pillar");
lines.push("- [ ] Pitch P0 #2 — báo giá / money");
lines.push("- [ ] Pitch P1 — nha khoa hoặc logistics");
lines.push("- [ ] Follow-up 1 site chưa reply");
lines.push("- [ ] Outline gửi trong 48h nếu được OK");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== Guest post pitch pack ===");
console.log(`Report: ${outPath}`);
