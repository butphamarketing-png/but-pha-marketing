/**
 * Template silo — cấu trúc website phòng khám 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-phong-kham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website phòng khám";

const article = {
  title: "Template Website Phòng Khám 2026 — Cấu Trúc 12 Trang Đa Khoa",
  slug: "template-website-phong-kham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website phòng khám, cấu trúc website y tế, sitemap phòng khám đa khoa, layout đặt khám online, wireframe website phòng khám",
  metaTitle: "Template Website Phòng Khám 2026 | 12 Trang Đa Khoa",
  metaDescription:
    "Template website phòng khám 2026: 12 trang — chuyên khoa, bác sĩ, đặt lịch, bảng giá, SEO local y tế. Wireframe chi tiết từng trang.",
  description:
    "Mẫu cấu trúc website phòng khám đa khoa 12 trang — wireframe y tế, form đặt lịch, silo chuyên khoa và SEO local.",
  imageUrl: "/tin-tuc/phong-kham/phong-kham-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Phòng Khám 2026 | 12 Trang Đa Khoa",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template phòng khám là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "chuyen-khoa", label: "Trang chuyên khoa" },
  { id: "bac-si", label: "Đội ngũ bác sĩ" },
  { id: "bang-gia", label: "Bảng giá & gói khám" },
  { id: "dat-lich", label: "Đặt lịch online" },
  { id: "blog-seo", label: "Blog & SEO cluster" },
  { id: "ky-thuat", label: "Technical SEO template" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> là bộ khung <strong>12 trang</strong> cho phòng khám đa khoa: silo chuyên khoa, profile bác sĩ, đặt lịch online, bảng giá minh bạch và SEO local “phòng khám + quận”. Dùng cùng <a href="${SITE}/blog/checklist-website-phong-kham-2026">checklist 20 mục</a> và <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">money page phòng khám</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Template phù hợp phòng khám đa khoa, phòng khám chuyên khoa (nội, nhi, da liễu, tai mũi họng), phòng khám tư nhân có BHYT hoặc không BHYT. Bệnh nhân vào web thường cần: (1) xác minh uy tín bác sĩ và cơ sở, (2) xem giá khám tham khảo, (3) đặt lịch nhanh qua Zalo/form — template ưu tiên 3 intent đó trước blog hay gallery marketing.</p>
<p>Khác nha khoa (chuyên sâu răng): phòng khám đa khoa cần silo nhiều chuyên khoa và quy trình khám tổng quát. Nếu chỉ chuyên răng, xem <a href="${SITE}/blog/template-website-nha-khoa-2026">template nha khoa</a>.</p>

<h2 id="la-gi">Template website phòng khám là gì?</h2>
<p><strong>Template website phòng khám</strong> không phải theme WordPress tải về — là sơ đồ cấu trúc URL, menu, section block và luồng chuyển đổi để designer/dev triển khai website y tế đúng SEO local và quy định quảng cáo ngành. Khác checklist (kiểm tra sau khi làm), template dùng <em>trước</em> khi thiết kế wireframe.</p>
<p>So với website thương mại: phòng khám cần trust signal mạnh (bác sĩ, giấy phép hành nghề), form đặt lịch theo chuyên khoa, bảng giá tham khảo và nội dung sức khỏe informational — không nhấn “mua ngay” như shop.</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu (pháp nhân, giấy phép, lịch sử)</li>
  <li><strong>Chuyên khoa (hub)</strong> — /chuyen-khoa</li>
  <li><strong>Nội khoa</strong> — /chuyen-khoa/noi-khoa</li>
  <li><strong>Nhi khoa</strong> — /chuyen-khoa/nhi-khoa</li>
  <li><strong>Đội ngũ bác sĩ</strong> — /bac-si</li>
  <li><strong>Bảng giá / Gói khám</strong> — /bang-gia</li>
  <li><strong>Đặt lịch</strong> — /dat-lich</li>
  <li><strong>Cơ sở vật chất</strong> — /co-so</li>
  <li><strong>BHYT &amp; thanh toán</strong> — /bao-hiem</li>
  <li><strong>Blog / Tin sức khỏe</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>
<p>Menu sticky desktop/mobile: <strong>Hotline đặt khám</strong> + nút <strong>Đặt lịch ngay</strong> + link <strong>Bảng giá</strong>.</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Phòng khám [Tên] — Đa khoa [Quận/TP]”, subline năng lực (số bác sĩ, năm thành lập, giờ khám).</li>
  <li><strong>CTA kép:</strong> “Đặt lịch khám” (primary) + “Gọi hotline” (secondary).</li>
  <li><strong>Chuyên khoa icon grid:</strong> 6–8 khoa phổ biến — link silo /chuyen-khoa/*.</li>
  <li><strong>Bác sĩ nổi bật:</strong> 2–3 profile ngắn (ảnh, chuyên môn, kinh nghiệm).</li>
  <li><strong>Số liệu trust:</strong> Số bệnh nhân/năm, năm thành lập, số chuyên khoa.</li>
  <li><strong>Quy trình khám 4–5 bước:</strong> Đặt lịch → tiếp đón → khám → xét nghiệm (nếu có) → tái khám.</li>
  <li><strong>Bảng giá tóm tắt:</strong> Gói khám tổng quát “Từ …đ” — link /bang-gia.</li>
  <li><strong>Gallery cơ sở vật chất:</strong> 4–6 ảnh phòng khám, máy móc — alt có keyword ngành.</li>
  <li><strong>Maps + giờ làm việc</strong> + nút chỉ đường Google Maps.</li>
  <li><strong>FAQ ngắn 3 câu</strong> + link FAQ đầy đủ.</li>
  <li><strong>Footer:</strong> Giấy phép hoạt động, địa chỉ, link hub <a href="${SITE}/blog/nganh/phong-kham">phòng khám</a>.</li>
</ol>

<h2 id="chuyen-khoa">Wireframe — Trang chuyên khoa</h2>
<p>Mỗi trang con /chuyen-khoa/* dùng layout thống nhất:</p>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1 long-tail:</strong> “Khám Nội tổng quát tại [Quận]” / “Khám Nhi [TP]”.</li>
  <li><strong>Mô tả 400–600 từ:</strong> Phạm vi khám, đối tượng bệnh nhân, cam kết quy trình.</li>
  <li><strong>Bác sĩ phụ trách:</strong> Profile + link /bac-si.</li>
  <li><strong>Triệu chứng thường gặp</strong> — SEO informational, không tự chẩn đoán.</li>
  <li><strong>Bảng giá khám tham khảo</strong> theo chuyên khoa.</li>
  <li><strong>FAQ schema ≥5 câu</strong> riêng chuyên khoa.</li>
  <li><strong>CTA đặt lịch</strong> pre-fill chuyên khoa từ URL.</li>
  <li><strong>Internal link:</strong> ↔ Hub /chuyen-khoa ↔ Trang chủ ↔ Blog liên quan.</li>
</ol>

<h2 id="bac-si">Wireframe — Đội ngũ bác sĩ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Grid bác sĩ:</strong> Ảnh chân dung, học vị, chuyên khoa, kinh nghiệm.</li>
  <li><strong>Trang chi tiết bác sĩ (optional):</strong> /bac-si/[slug] — lịch khám, chứng chỉ.</li>
  <li><strong>Schema Physician</strong> hoặc Person gắn MedicalClinic.</li>
  <li><strong>CTA:</strong> “Đặt lịch với BS [Tên]” — chọn bác sĩ trong form.</li>
  <li><strong>Trust:</strong> Số giấy phép hành nghề (không công khai CMND).</li>
</ol>

${img(0, "Template website phòng khám — wireframe trang chủ đa khoa", "phong-kham")}

<h2 id="bang-gia">Wireframe — Bảng giá &amp; gói khám</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Bảng giá theo chuyên khoa:</strong> Khám lần đầu, tái khám, gói tổng quát.</li>
  <li><strong>Ghi chú BHYT:</strong> Mức hưởng, thủ tục nếu có — link /bao-hiem.</li>
  <li><strong>Disclaimer:</strong> Giá tham khảo, có thể thay đổi — tránh cam kết sai quy định y tế.</li>
  <li><strong>CTA:</strong> Đặt lịch + hotline tư vấn giá.</li>
  <li><strong>FAQ:</strong> Thanh toán, hóa đơn, trả góp (nếu có).</li>
</ol>

<h2 id="dat-lich">Wireframe — Đặt lịch online</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Form đặt lịch:</strong> Chọn chuyên khoa → ngày/giờ → thông tin BN → xác nhận.</li>
  <li><strong>Trường bắt buộc:</strong> Họ tên, SĐT, chuyên khoa, triệu chứng ngắn (optional).</li>
  <li><strong>Tích hợp Zalo OA / SMS</strong> xác nhận lịch — giảm no-show.</li>
  <li><strong>Chưa có phần mềm HIS:</strong> Form “Gửi yêu cầu — phản hồi 15 phút”.</li>
  <li><strong>Thank-you page:</strong> Mã đặt lịch + hướng dẫn chuẩn bị khám.</li>
  <li><strong>Event tracking:</strong> GA4 conversion “submit_dat_lich”.</li>
</ol>

${img(1, "Template website phòng khám — form đặt lịch và bảng giá gói khám", "phong-kham")}

<h2 id="blog-seo">Blog &amp; SEO cluster cho template</h2>
<p>Sau khi triển khai 12 trang core, mở rộng content cluster:</p>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Commercial:</strong> “Phòng khám [quận]”, “Khám nội [quận]”, “Bảng giá khám [TP]”.</li>
  <li><strong>Informational:</strong> “Triệu chứng cần khám nội”, “Quy trình khám tổng quát”.</li>
  <li><strong>Local:</strong> “Phòng khám đa khoa [quận]”, “Bác sĩ [chuyên khoa] [TP]”.</li>
  <li><strong>Internal link:</strong> Mỗi bài blog → 1 trang chuyên khoa + form đặt lịch + hub <a href="${SITE}/blog/nganh/phong-kham">/blog/nganh/phong-kham</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang template</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th><th class="border border-indigo-100 px-3 py-2 text-left">Intent</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">phòng khám [quận]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/dat-lich</td><td class="border border-indigo-100 px-3 py-2">đặt lịch khám online [quận]</td><td class="border border-indigo-100 px-3 py-2">Lead</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/bang-gia</td><td class="border border-indigo-100 px-3 py-2">bảng giá khám [chuyên khoa]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/bac-si</td><td class="border border-indigo-100 px-3 py-2">bác sĩ [chuyên khoa] [TP]</td><td class="border border-indigo-100 px-3 py-2">Trust</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/chuyen-khoa/noi-khoa</td><td class="border border-indigo-100 px-3 py-2">khám nội [quận]</td><td class="border border-indigo-100 px-3 py-2">Local SEO</td></tr>
  </tbody>
</table>
</div>

<h2 id="ky-thuat">Technical SEO khi triển khai template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema MedicalClinic + Physician:</strong> Tên, địa chỉ, giờ mở cửa, hotline.</li>
  <li><strong>Schema FAQPage</strong> trên trang chuyên khoa và /dat-lich.</li>
  <li><strong>Core Web Vitals:</strong> Form đặt lịch không block LCP — lazy load gallery.</li>
  <li><strong>Canonical</strong> cho từng URL silo — tránh duplicate filter chuyên khoa.</li>
  <li><strong>Sitemap.xml</strong> gồm 12 trang core + blog cluster.</li>
  <li><strong>robots.txt</strong> không chặn /dat-lich, /bang-gia.</li>
  <li><strong>HTTPS + redirect www</strong> thống nhất.</li>
  <li><strong>Alt ảnh phòng khám/bác sĩ</strong> mô tả thực tế, có keyword ngành tự nhiên.</li>
  <li><strong>Tuân thủ quảng cáo y tế:</strong> Không cam kết chữa khỏi, không so sánh sai.</li>
</ol>

<h2 id="timeline">Timeline triển khai theo template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap 12 trang, thu content (ảnh PK, profile BS, bảng giá).</li>
  <li><strong>Tuần 2:</strong> Wireframe + UI trang chủ, /dat-lich, /bang-gia.</li>
  <li><strong>Tuần 3:</strong> Dev form đặt lịch + Zalo/email notification.</li>
  <li><strong>Tuần 4:</strong> Silo chuyên khoa + trang bác sĩ + SEO on-page.</li>
  <li><strong>Tuần 5:</strong> QA mobile, schema, GSC submit, go-live.</li>
  <li><strong>Tháng 2–3:</strong> Blog cluster + theo dõi query “phòng khám + quận” trên GSC.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Mô hình đặt lịch + SEO local tương tự đã áp dụng cho <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> — <strong>15,4K impressions</strong> và <strong>471 clicks</strong> GSC sau tối ưu cấu trúc web. Phòng khám đa khoa cần thêm silo chuyên khoa và bảng giá — 2 module conversion quan trọng nhất.</p>
</div>

${img(2, "Template website phòng khám — sitemap 12 trang và silo SEO y tế", "phong-kham")}

<h2 id="silo">Liên kết silo Vertical Proof</h2>
<p>Template nằm trong silo 7 URL ngành phòng khám:</p>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">thiết kế website phòng khám đa khoa</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-phong-kham-2026">checklist 20 mục</a></li>
  <li>Template: <strong>bài này</strong></li>
  <li>Hub: <a href="${SITE}/blog/nganh/phong-kham">/blog/nganh/phong-kham</a></li>
  <li>Landing: <a href="${SITE}/website/nganh/phong-kham">/website/nganh/phong-kham</a></li>
  <li>Dịch vụ: <a href="${SITE}/website">thiết kế website Bứt Phá</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trang trước khi làm; checklist = 20 mục kiểm tra sau khi làm xong.</p>
<h3>Phòng khám đa khoa khác nha khoa?</h3>
<p>Đa khoa có nhiều chuyên khoa; nha khoa chuyên sâu răng — cùng cần đặt lịch và SEO local. Xem <a href="${SITE}/blog/template-website-nha-khoa-2026">template nha khoa</a> nếu chuyên khoa răng.</p>
<h3>12 trang có quá nhiều cho phòng khám nhỏ?</h3>
<p>Có thể gộp: /chuyen-khoa hub + 2 silo chính; /co-so gộp vào /gioi-thieu. Giữ /dat-lich và /bang-gia — 2 trang conversion bắt buộc.</p>
<h3>Chưa có phần mềm HIS có làm đặt lịch online?</h3>
<p>Có — dùng form “Gửi yêu cầu đặt lịch — phản hồi 15 phút” hoặc embed lịch Zalo/Google Calendar. Không để trang trống.</p>
<h3>Giá triển khai theo template?</h3>
<p>Website phòng khám 6–12 triệu tùy form đặt lịch, số bác sĩ và trang silo. Xem <a href="${SITE}/banggia">bảng giá</a> và <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">hướng dẫn chi tiết</a>.</p>
<h3>Template có hỗ trợ SEO “phòng khám + quận”?</h3>
<p>Có — trang chuyên khoa và blog cluster được thiết kế cho local/commercial long-tail.</p>
<h3>Bứt Phá có triển khai theo template?</h3>
<p>Có — <a href="${SITE}/lien-he">đăng ký tư vấn</a> kèm số chuyên khoa, bác sĩ và yêu cầu đặt lịch/HIS.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/phong-kham">Hub phòng khám</a> · <a href="${SITE}/blog/checklist-website-phong-kham-2026">Checklist</a> · <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">Money page</a> · <a href="${SITE}/website">Dịch vụ website</a> · <a href="${SITE}/du-an">Case study</a></p>
${internalLinks({ cluster: "phong-kham", caseStudyPath: "/du-an/nha-khoa-dang-khoa" })}
`,
  }),
};

console.log("=== Seed template website phòng khám 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-phong-kham-2026");
