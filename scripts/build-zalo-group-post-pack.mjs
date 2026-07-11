/**
 * Zalo group post pack — template theo vertical + quy tắc nhóm.
 * Chạy: npm run build:zalo-group-post-pack
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "zalo-group-post-pack.md");

const SITE = "https://www.butphamarketing.com";
const ZALO = "https://zalo.me/0937417982";
const PHONE = "0937417982";

const GROUP_RULES = [
  "Đọc quy định nhóm trước — nhiều group cấm link trực tiếp",
  "Ưu tiên chia sẻ **giá trị** (checklist, case số liệu) — không spam 3 link liên tiếp",
  "Nếu group cấm link: post insight ngắn + 'inbox mình gửi checklist'",
  "Trả lời comment trong 2h — tăng trust",
  "Không tag @ hàng loạt — dễ bị report spam",
  "Rotate vertical — không post cùng ngành 2 ngày liên tiếp cùng 1 group",
];

const VERTICALS = [
  {
    slug: "nha-khoa",
    keyword: "thiết kế website nha khoa",
    groups: "Nhóm chủ phòng khám, nha khoa, clinic owner VN",
    landing: `${SITE}/website/nganh/nha-khoa`,
    caseUrl: `${SITE}/du-an/nha-khoa-dang-khoa`,
    proof: "15,4K impressions · 471 clicks GSC",
    post: `Chia sẻ cho ae chủ phòng khám/nha khoa đang cân website mới 👇

Checklist 5 module website clinic hay thiếu:
1. Đặt lịch + Zalo OA
2. Bảng giá dịch vụ (tẩy trắng, implant...)
3. Before/after có consent
4. SEO local (Google Maps + schema)
5. Form tư vấn mobile-first

Case triển khai thật — Nha Khoa Đăng Khoa: 15,4K impressions, 471 clicks sau SEO.
Case: ${SITE}/du-an/nha-khoa-dang-khoa
Landing tham khảo: ${SITE}/website/nganh/nha-khoa

Ai cần checklist PDF inbox mình hoặc Zalo ${PHONE} nhé — không charge consult đầu.`,
    postNoLink: `Chia sẻ checklist website phòng khám/nha khoa 👇

5 module hay bị thiếu: đặt lịch, bảng giá dịch vụ, before/after, SEO local, form mobile.

Mình có case triển khai thật (15,4K impressions GSC). Ai cần link case + checklist inbox hoặc Zalo ${PHONE} — mình gửi free.`,
    commentReply: `Checklist + link case mình gửi inbox nhé! Zalo ${PHONE} cũng được ạ.`,
    log: "Zalo group nha khoa → /website/nganh/nha-khoa",
  },
  {
    slug: "logistics",
    keyword: "thiết kế website logistics",
    groups: "Nhóm logistics, vận tải, freight forwarder VN",
    landing: `${SITE}/website/nganh/logistics`,
    caseUrl: `${SITE}/du-an/van-toc-express-logistics`,
    proof: "Form báo giá cước + tra vận đơn",
    post: `Ae logistics — website B2B khác web bán hàng hoàn toàn.

Module nên có trước khi chạy ads:
✅ Báo giá cước theo tuyến (form lead)
✅ Tra cứu vận đơn
✅ Hồ sơ năng lực + chứng chỉ
✅ Silo dịch vụ (đường bộ/biển/hàng không)

Case Vận Tốc Express mình triển khai: ${SITE}/du-an/van-toc-express-logistics
Dịch vụ: ${SITE}/website/nganh/logistics

Comment "LOGISTICS" nếu cần wireframe mẫu — mình share.`,
    postNoLink: `Website logistics B2B — đừng làm giống shop online.

4 module bắt buộc: báo giá cước, tra vận đơn, HSNL, silo dịch vụ.

Mình có case triển khai thật cho công ty vận tải. Inbox hoặc Zalo ${PHONE} — mình gửi link case + wireframe mẫu.`,
    commentReply: `Wireframe + case link mình gửi inbox ae nhé!`,
    log: "Zalo group logistics → /website/nganh/logistics",
  },
  {
    slug: "my-pham",
    keyword: "thiết kế website mỹ phẩm",
    groups: "Nhóm skincare D2C, beauty brand, chủ shop mỹ phẩm",
    landing: `${SITE}/website/nganh/my-pham`,
    caseUrl: `${SITE}/du-an/glow-dew-cosmetics`,
    proof: "INCI · COD/MoMo · SEO brand",
    post: `Brand mỹ phẩm D2C — website cần gì ngoài giao diện đẹp?

→ Trang thành phần INCI chuẩn
→ Review + UGC
→ Checkout mobile (COD/MoMo)
→ SEO brand + long-tail sản phẩm

Case Glow Dew Beauty: ${SITE}/du-an/glow-dew-cosmetics
Landing: ${SITE}/website/nganh/my-pham

Ai build brand skincare inbox mình checklist module nhé.`,
    postNoLink: `Skincare D2C — 4 module website hay thiếu: INCI, review, checkout mobile, SEO brand.

Mình có case brand mỹ phẩm triển khai thật. Inbox/Zalo ${PHONE} gửi checklist + link case.`,
    commentReply: `Checklist D2C mình gửi inbox nhé ae!`,
    log: "Zalo group mỹ phẩm → /website/nganh/my-pham",
  },
  {
    slug: "tham-my",
    keyword: "thiết kế website thẩm mỹ viện",
    groups: "Nhóm spa thẩm mỹ, clinic làm đẹp, chủ TMV",
    landing: `${SITE}/website/nganh/tham-my`,
    caseUrl: `${SITE}/du-an/thien-hoang-kim`,
    proof: "Showcase filler/botox · đặt lịch",
    post: `Thẩm mỹ viện cần website showcase dịch vụ — không chỉ album ảnh.

Module conversion hay thiếu:
• Menu dịch vụ filler/botox/laser có giá tham khảo
• Đặt lịch Zalo
• Before/after có consent
• SEO local + review Google

Case Thiên Hoàng Kim: ${SITE}/du-an/thien-hoang-kim
Landing: ${SITE}/website/nganh/tham-my`,
    postNoLink: `TMV/spa — website cần menu dịch vụ + đặt lịch + SEO local, không chỉ gallery.

Case triển khai thật — inbox/Zalo ${PHONE} mình gửi link.`,
    commentReply: `Link case + checklist TMV mình gửi inbox ạ!`,
    log: "Zalo group thẩm mỹ → /website/nganh/tham-my",
  },
  {
    slug: "xay-dung",
    keyword: "thiết kế website xây dựng",
    groups: "Nhóm nhà thầu, xây dựng, kiến trúc VN",
    landing: `${SITE}/website/nganh/xay-dung`,
    caseUrl: `${SITE}/du-an/sao-khue-kien-truc`,
    proof: "HSNL PDF · dự án tiêu biểu",
    post: `Nhà thầu/xây dựng — website B2B cần HSNL + dự án tiêu biểu trước khi chạy lead ads.

Checklist:
→ Hồ sơ năng lực PDF download
→ Gallery dự án theo hạng mục
→ Form báo giá khảo sát
→ SEO từ khóa địa phương

Case Kiến Trúc Sao Khuê: ${SITE}/du-an/sao-khue-kien-truc
Landing: ${SITE}/website/nganh/xay-dung`,
    postNoLink: `Website nhà thầu B2B — HSNL + dự án tiêu biểu quan trọng hơn slider đẹp.

Case kiến trúc/xây dựng mình triển khai — inbox Zalo ${PHONE} gửi link.`,
    commentReply: `Link case xây dựng mình gửi inbox nhé!`,
    log: "Zalo group xây dựng → /website/nganh/xay-dung",
  },
  {
    slug: "pccc",
    keyword: "thiết kế website pccc",
    groups: "Nhóm PCCC, an toàn PCCC, thi công hệ thống",
    landing: `${SITE}/website/nganh/pccc`,
    caseUrl: `${SITE}/du-an/pccc-bao-an-fire`,
    proof: "Catalog thiết bị · chứng chỉ · khảo sát hiện trường",
    post: `Công ty PCCC — website cần chứng minh năng lực thi công, không chỉ catalog sản phẩm.

Module B2B:
• Catalog thiết bị + chứng chỉ
• Form khảo sát hiện trường
• Dự án tiêu biểu theo hạng mục
• SEO từ khóa "thi công PCCC [tỉnh]"

Case: ${SITE}/du-an/pccc-bao-an-fire
Landing: ${SITE}/website/nganh/pccc`,
    postNoLink: `Website PCCC B2B — catalog + chứng chỉ + form khảo sát hiện trường.

Case triển khai thật — Zalo ${PHONE} mình gửi link.`,
    commentReply: `Link case PCCC inbox mình gửi nhé!`,
    log: "Zalo group PCCC → /website/nganh/pccc",
  },
  {
    slug: "spa",
    keyword: "thiết kế website spa",
    groups: "Nhóm spa, wellness, beauty salon VN",
    landing: `${SITE}/website/nganh/spa`,
    caseUrl: `${SITE}/du-an/phuoc-lai-luxury`,
    proof: "Gallery liệu trình · đặt lịch",
    post: `Spa/wellness — website cần gallery liệu trình + đặt lịch, không chỉ ảnh decor.

Case Phước Lai Luxury Spa: ${SITE}/du-an/phuoc-lai-luxury
Landing: ${SITE}/website/nganh/spa

Ai mở spa mới comment "SPA" — mình gửi checklist module.`,
    postNoLink: `Spa mới — checklist module website: gallery liệu trình, đặt lịch, bảng giá combo, SEO local.

Case spa triển khai thật — inbox Zalo ${PHONE}.`,
    commentReply: `Checklist spa mình gửi inbox nhé!`,
    log: "Zalo group spa → /website/nganh/spa",
  },
];

const GENERAL_POST = {
  title: "Nhóm SME / marketing chung",
  post: `Chia sẻ cho ae SME đang cân website mới năm 2026 👇

3 lỗi hay gặp khi thuê thiết kế website:
1. Không có module conversion (form/Zalo)
2. Không silo nội dung theo dịch vụ → SEO yếu
3. Không có proof/case → khách không tin

Checklist 7 bước (free): ${SITE}/blog/thiet-ke-website
Bảng giá tham khảo: ${SITE}/blog/bao-gia-thiet-ke-website
Tư vấn: ${ZALO}`,
  postNoLink: `3 lỗi SME hay gặp khi làm website: thiếu form conversion, thiếu silo SEO, thiếu case proof.

Mình có checklist 7 bước + bảng giá tham khảo — inbox/Zalo ${PHONE} gửi free.`,
  log: "Zalo group SME → /blog/thiet-ke-website",
};

const PRICE_REPLY = `Gói website Bứt Phá từ 3–12 triệu tùy module (form, SEO, silo ngành). Bảng giá chi tiết inbox mình hoặc xem ${SITE}/blog/bao-gia-thiet-ke-website · Zalo ${PHONE}`;

const lines = [];
lines.push("# Zalo Group Post Pack — ButPhaMarketing");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push("- Mục tiêu tuần 1: **3 group post** (2 vertical + 1 SME) · **reply comment same day**");
lines.push("");
lines.push("## Quy tắc nhóm (đọc trước khi post)");
for (const r of GROUP_RULES) lines.push(`- ${r}`);
lines.push("");
lines.push("## Lịch gợi ý tuần 1");
lines.push("| Ngày | Vertical | Group type |");
lines.push("|---|---|---|");
lines.push("| T3 | Logistics | Nhóm vận tải/freight |");
lines.push("| T4 | Nha khoa | Nhóm clinic owner |");
lines.push("| T5 | Mỹ phẩm | Nhóm D2C/beauty |");
lines.push("| T6 | SME chung | Nhóm founder/marketing |");
lines.push("");
lines.push("## Post chung — nhóm SME/marketing");
lines.push(`### ${GENERAL_POST.title}`);
lines.push("**Có link (nếu group cho phép):**");
lines.push("```");
lines.push(GENERAL_POST.post);
lines.push("```");
lines.push("**Không link (group cấm):**");
lines.push("```");
lines.push(GENERAL_POST.postNoLink);
lines.push("```");
lines.push(`Log: \`npm run build:backlink-weekly-tracker -- --log="${GENERAL_POST.log}"\``);
lines.push("");

for (const v of VERTICALS) {
  lines.push(`## ${v.slug} — ${v.keyword}`);
  lines.push(`- Groups: ${v.groups}`);
  lines.push(`- Proof: ${v.proof}`);
  lines.push(`- Landing: ${v.landing}`);
  lines.push(`- Case: ${v.caseUrl}`);
  lines.push("");
  lines.push("**Post có link:**");
  lines.push("```");
  lines.push(v.post);
  lines.push("```");
  lines.push("**Post không link:**");
  lines.push("```");
  lines.push(v.postNoLink);
  lines.push("```");
  lines.push("**Reply comment:**");
  lines.push("```");
  lines.push(v.commentReply);
  lines.push("```");
  lines.push(`Log: \`npm run build:backlink-weekly-tracker -- --log="${v.log}"\``);
  lines.push("");
}

lines.push("## Reply khi hỏi giá (mọi group)");
lines.push("```");
lines.push(PRICE_REPLY);
lines.push("```");
lines.push("");
lines.push("## Checklist tuần");
lines.push("- [ ] 3 post (2 vertical + 1 SME)");
lines.push("- [ ] Dùng bản **no-link** nếu group cấm");
lines.push("- [ ] Reply comment trong ngày");
lines.push("- [ ] Log mỗi post vào tracker");
lines.push("- [ ] Không post cùng group 2 lần/tuần");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== Zalo group post pack ===");
console.log(`Verticals: ${VERTICALS.length}`);
console.log(`Report: ${outPath}`);
