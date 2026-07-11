/**
 * LinkedIn outreach pack — connection note, InMail, post copy-paste.
 * Chạy: npm run build:linkedin-outreach-pack
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "linkedin-outreach-pack.md");

const SITE = "https://www.butphamarketing.com";
const ZALO = "https://zalo.me/0937417982";

const CONNECTION_NOTES = [
  {
    persona: "Chủ SME / founder",
    note: `Chào anh/chị, mình làm thiết kế website + SEO cho SME VN. Thấy profile anh/chị fit — muốn kết nối chia sẻ case thực chiến (GSC). Không spam bán hàng ạ!`,
    log: "LinkedIn connect → SME founder",
  },
  {
    persona: "Marketing manager / CMO",
    note: `Chào anh/chị! Mình từ Bứt Phá Marketing — chuyên website chuẩn SEO cho doanh nghiệp VN. Muốn kết nối trao đổi insight marketing digital, happy to share case study data.`,
    log: "LinkedIn connect → marketing manager",
  },
  {
    persona: "Chủ phòng khám / nha khoa",
    note: `Chào bác sĩ/chủ phòng khám! Mình triển khai website clinic + SEO local. Có case 15,4K impressions GSC — muốn kết nối chia sẻ checklist triển khai cho ngành y tế.`,
    log: "LinkedIn connect → clinic owner",
  },
  {
    persona: "Logistics / vận tải B2B",
    note: `Chào anh/chị, mình làm website B2B logistics (báo giá cước, tra vận đơn). Muốn kết nối trao đổi digital cho ngành vận tải — có case Vận Tốc Express.`,
    log: "LinkedIn connect → logistics owner",
  },
  {
    persona: "Agency / freelancer đối tác",
    note: `Chào anh/chị! Mình từ Bứt Phá Marketing — làm website + SEO white-label friendly. Muốn kết nối mạng lưới agency VN, có thể refer khách phù hợp.`,
    log: "LinkedIn connect → agency partner",
  },
];

const INMAIL_AFTER_CONNECT = `Chào anh/chị [Tên],

Cảm ơn đã kết nối! Mình share nhanh 1 resource có thể hữu ích nếu anh/chị đang cân nhắc website:

📋 Pillar thiết kế website (quy trình 7 bước): ${SITE}/blog/thiet-ke-website
📊 Case GSC thật — Nha Khoa Đăng Khoa: ${SITE}/du-an/nha-khoa-dang-khoa

Không phải pitch — nếu cần tư vấn thêm, inbox mình hoặc Zalo: ${ZALO}

Chúc anh/chị tuần hiệu quả!
[Tên bạn]`;

const POSTS = [
  {
    title: "Head term — thiết kế website",
    target: "/website",
    body: `Doanh nghiệp đang tìm đơn vị thiết kế website chuẩn SEO?

3 điều SME Việt thường bỏ sót trước khi ký hợp đồng:
→ Module conversion (form, Zalo, báo giá)
→ Silo nội dung theo dịch vụ — không chỉ 5 trang tĩnh
→ Proof & case study có số liệu, không chỉ mockup

Bứt Phá Marketing triển khai gói 3–12 triệu, có case GSC thật (15,4K impressions).

🔗 Dịch vụ: ${SITE}/website
📋 Checklist: ${SITE}/blog/thiet-ke-website

#thiếtkếwebsite #SEO #marketingVN #SME`,
    log: "LinkedIn post → /website — head term",
  },
  {
    title: "Case study — Nha khoa GSC",
    target: "/du-an/nha-khoa-dang-khoa",
    body: `Case thực chiến — không phải screenshot Photoshop.

Sau triển khai website + SEO cho Nha Khoa Đăng Khoa:
📈 15,4K impressions Google Search
👆 471 clicks organic

Website clinic cần: đặt lịch, bảng giá dịch vụ, before/after, SEO local — không chỉ gallery đẹp.

Chi tiết case: ${SITE}/du-an/nha-khoa-dang-khoa
Landing ngành: ${SITE}/website/nganh/nha-khoa

Ai đang làm website phòng khám — comment "CHECKLIST" mình gửi outline module bắt buộc.

#nhakhoa #SEOlocal #casestudy #marketing`,
    log: "LinkedIn post case study → /du-an/nha-khoa-dang-khoa",
  },
  {
    title: "Vertical — Logistics B2B",
    target: "/website/nganh/logistics",
    body: `Website logistics ≠ website bán hàng.

Doanh nghiệp vận tải B2B cần:
✅ Form báo giá cước theo tuyến
✅ Tra cứu vận đơn
✅ Hồ sơ năng lực + chứng chỉ
✅ Silo SEO theo dịch vụ (road/air/sea)

Case Vận Tốc Express: ${SITE}/du-an/van-toc-express-logistics
Dịch vụ: ${SITE}/website/nganh/logistics

#logistics #B2B #website #vậntải`,
    log: "LinkedIn post vertical → /website/nganh/logistics",
  },
  {
    title: "Vertical — Mỹ phẩm D2C",
    target: "/website/nganh/my-pham",
    body: `Brand skincare D2C — website cần gì ngoài đẹp?

→ INCI / thành phần chuẩn
→ Review + UGC
→ Checkout mobile (COD/MoMo)
→ SEO brand + long-tail sản phẩm

Case Glow Dew Beauty: ${SITE}/du-an/glow-dew-cosmetics
Landing: ${SITE}/website/nganh/my-pham

#mypham #D2C #ecommerce #skincare`,
    log: "LinkedIn post vertical → /website/nganh/my-pham",
  },
  {
    title: "Báo giá — money post",
    target: "/blog/bao-gia-thiet-ke-website",
    body: `"Thiết kế website bao nhiêu tiền?" — câu hỏi mình nhận nhiều nhất.

Tóm tắt gói Bứt Phá Marketing:
• 3 triệu — landing + form liên hệ
• 6 triệu — website doanh nghiệp 8–12 trang
• 9–12 triệu — silo SEO + module nâng cao

Yếu tố làm giá tăng: copywriting, SEO on-page, tích hợp CRM/Zalo, mockup custom.

Chi tiết: ${SITE}/blog/bao-gia-thiet-ke-website
Tư vấn: ${SITE}/lien-he

#báogiá #website #SME`,
    log: "LinkedIn post → /blog/bao-gia-thiet-ke-website",
  },
];

const COMMENT_REPLIES = [
  {
    trigger: "Hỏi giá / bao nhiêu",
    reply: `Chào anh/chị! Gói website Bứt Phá từ 3–12 triệu tùy module. Bảng giá chi tiết: ${SITE}/blog/bao-gia-thiet-ke-website — hoặc inbox/Zalo ${ZALO} để tư vấn sát nhu cầu ạ.`,
  },
  {
    trigger: "Hỏi case / proof",
    reply: `Case GSC thật — Nha Khoa Đăng Khoa (15,4K impressions): ${SITE}/du-an/nha-khoa-dang-khoa · Logistics: ${SITE}/du-an/van-toc-express-logistics · Mỹ phẩm: ${SITE}/du-an/glow-dew-cosmetics`,
  },
  {
    trigger: "Hỏi checklist / tài liệu",
    reply: `Pillar checklist 7 bước: ${SITE}/blog/thiet-ke-website — anh/chị cần checklist theo ngành (nha khoa, logistics...) inbox mình gửi thêm ạ.`,
  },
];

const lines = [];
lines.push("# LinkedIn Outreach Pack — ButPhaMarketing");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push("- Mục tiêu tuần 1: **10 connect** · **2 post** · **5 InMail/DM**");
lines.push("- Giới hạn connection note: ~300 ký tự (LinkedIn cắt nếu dài)");
lines.push("");
lines.push("## Quy trình tuần 1");
lines.push("1. **T2–T3:** Gửi 10 connection note (persona mix)");
lines.push("2. **T3–T4:** Post case study nha khoa + head term");
lines.push("3. **T5:** InMail cho người đã accept connect");
lines.push("4. **T6:** Reply comment theo template");
lines.push("5. Log mỗi action → `npm run build:backlink-weekly-tracker`");
lines.push("");
lines.push("## Connection request notes");
for (const c of CONNECTION_NOTES) {
  lines.push(`### ${c.persona}`);
  lines.push("```");
  lines.push(c.note);
  lines.push("```");
  lines.push(`Log: \`npm run build:backlink-weekly-tracker -- --log="${c.log}"\``);
  lines.push("");
}
lines.push("## InMail / DM sau khi connect");
lines.push("```");
lines.push(INMAIL_AFTER_CONNECT);
lines.push("```");
lines.push("");
lines.push("## LinkedIn posts (copy-paste)");
for (const p of POSTS) {
  lines.push(`### ${p.title}`);
  lines.push(`Target: \`${p.target}\``);
  lines.push("```");
  lines.push(p.body);
  lines.push("```");
  lines.push(`Log: \`npm run build:backlink-weekly-tracker -- --log="${p.log}"\``);
  lines.push("");
}
lines.push("## Comment reply templates");
for (const r of COMMENT_REPLIES) {
  lines.push(`**Khi:** ${r.trigger}`);
  lines.push("```");
  lines.push(r.reply);
  lines.push("```");
  lines.push("");
}
lines.push("## Checklist tuần");
lines.push("- [ ] 10 connection sent");
lines.push("- [ ] 2 posts published (case + head term hoặc vertical)");
lines.push("- [ ] 5 InMail/DM follow-up");
lines.push("- [ ] Reply ≥3 comment trên post");
lines.push("- [ ] Company page repost 1 bài cá nhân");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== LinkedIn outreach pack ===");
console.log(`Report: ${outPath}`);
