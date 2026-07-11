/**
 * Template silo — cấu trúc website cơ khí 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-co-khi-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website cơ khí";

const article = {
  title: "Template Website Cơ Khí 2026 — Cấu Trúc 12 Trang Gia Công B2B",
  slug: "template-website-co-khi-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website xưởng cơ khí, cấu trúc website gia công cnc, sitemap catalog máy móc, layout báo giá gia công, wireframe website cơ khí",
  metaTitle: "Template Website Cơ Khí 2026 | 12 Trang",
  metaDescription:
    "Template website cơ khí 2026: 12 trang — catalog máy CNC, gallery sản phẩm, form RFQ upload bản vẽ, SEO B2B. Wireframe chi tiết.",
  description:
    "Mẫu cấu trúc website xưởng cơ khí & gia công CNC 12 trang — catalog B2B và form RFQ.",
  imageUrl: "/tin-tuc/co-khi/co-khi-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Cơ Khí 2026 | 12 Trang",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template cơ khí là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "dich-vu", label: "Dịch vụ gia công" },
  { id: "catalog", label: "Catalog máy CNC" },
  { id: "gallery", label: "Gallery sản phẩm" },
  { id: "rfq", label: "Form RFQ / báo giá" },
  { id: "blog-seo", label: "Blog & SEO B2B" },
  { id: "ky-thuat", label: "Technical SEO" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — bộ khung <strong>12 trang</strong> xưởng cơ khí/gia công CNC: catalog máy, gallery chi tiết, form upload bản vẽ RFQ và SEO B2B “gia công [vật liệu]”. Kết hợp <a href="${SITE}/blog/checklist-website-co-khi-2026">checklist</a>, <a href="${SITE}/blog/thiet-ke-website-co-khi">money page</a> và <a href="${SITE}/blog/thiet-ke-website-gia-cong-cnc">bài CNC</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Xưởng cơ khí, gia công CNC, cơ khí chính xác, gia công khuôn mẫu — khách B2B cần xem năng lực máy, vật liệu gia công và gửi bản vẽ báo giá nhanh. Template ưu tiên catalog + RFQ trước blog marketing.</p>

<h2 id="la-gi">Template website cơ khí là gì?</h2>
<p><strong>Template website cơ khí</strong> là sơ đồ URL, menu, section block và luồng RFQ để triển khai web xưởng gia công đúng SEO commercial B2B. Khác checklist (nghiệm thu), template dùng trước wireframe.</p>
<p>So với web bán lẻ: cơ khí cần bảng thông số máy (hành trình, độ chính xác), gallery sản phẩm thực tế, form upload DWG/PDF/STEP và trust (ISO, khách hàng công nghiệp).</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu xưởng</strong> — /gioi-thieu</li>
  <li><strong>Dịch vụ (hub)</strong> — /dich-vu</li>
  <li><strong>Gia công CNC</strong> — /dich-vu/gia-cong-cnc</li>
  <li><strong>Gia công cơ khí chính xác</strong> — /dich-vu/co-khi-chinh-xac</li>
  <li><strong>Hàn &amp; lắp ráp</strong> — /dich-vu/han-lap-rap</li>
  <li><strong>Khuôn mẫu</strong> — /dich-vu/khuon-mau (nếu có)</li>
  <li><strong>Catalog máy móc</strong> — /may-moc</li>
  <li><strong>Gallery sản phẩm</strong> — /san-pham</li>
  <li><strong>Vật liệu gia công</strong> — /vat-lieu</li>
  <li><strong>Báo giá / Gửi bản vẽ</strong> — /bao-gia</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>
<p>Menu sticky: <strong>Gửi bản vẽ</strong> + <strong>Hotline kỹ thuật</strong>.</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Xưởng cơ khí [Tên] — Gia công CNC [Tỉnh/KCN]”, CTA “Gửi bản vẽ báo giá”.</li>
  <li><strong>Số liệu:</strong> Số máy CNC, diện tích xưởng, độ chính xác, năm thành lập.</li>
  <li><strong>4 card dịch vụ</strong> — link silo /dich-vu/*.</li>
  <li><strong>Catalog máy nổi bật:</strong> 4–6 máy + thông số tóm tắt.</li>
  <li><strong>Gallery 6–9 ảnh</strong> sản phẩm đã gia công — alt mô tả vật liệu/kích thước.</li>
  <li><strong>Quy trình QC 5 bước:</strong> Nhận bản vẽ → DFM → gia công → kiểm tra → giao hàng.</li>
  <li><strong>Logo khách hàng</strong> công nghiệp (6–10 logo).</li>
  <li><strong>Form RFQ rút gọn</strong> — upload + SĐT, full form ở /bao-gia.</li>
  <li><strong>Chứng nhận ISO / IATF</strong> nếu có.</li>
  <li><strong>Footer:</strong> Địa chỉ xưởng, Maps, link <a href="${SITE}/blog/nganh/co-khi">hub cơ khí</a>.</li>
</ol>

<h2 id="dich-vu">Wireframe — Trang dịch vụ gia công</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Gia công CNC [vật liệu] tại [Tỉnh]” / “Gia công cơ khí chính xác”.</li>
  <li><strong>Mô tả 400–600 từ:</strong> Phạm vi, tolerance, lot size MOQ.</li>
  <li><strong>Bảng thông số:</strong> Vật liệu (SUS, nhôm, thép…), kích thước max, độ nhám.</li>
  <li><strong>Máy phục vụ</strong> — internal link /may-moc/[slug].</li>
  <li><strong>Gallery filter</strong> theo dịch vụ.</li>
  <li><strong>FAQ ≥5 câu</strong> — thời gian gia công, MOQ, bản vẽ 2D/3D.</li>
  <li><strong>CTA RFQ</strong> cuối trang.</li>
</ol>

<h2 id="catalog">Wireframe — Catalog máy CNC</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hub /may-moc:</strong> Bảng tất cả máy — tên, hãng, hành trình X/Y/Z.</li>
  <li><strong>Trang chi tiết máy:</strong> Ảnh máy, thông số đầy đủ, vật liệu phù hợp.</li>
  <li><strong>SEO:</strong> “Máy CNC [hành trình]”, “Gia công [vật liệu] CNC”.</li>
  <li><strong>Download PDF catalog</strong> — lead B2B lớn.</li>
  <li><strong>Internal link</strong> ↔ dịch vụ ↔ RFQ.</li>
</ol>

${img(0, "Template website cơ khí — catalog máy CNC và trang chủ xưởng gia công", "co-khi")}

<h2 id="gallery">Wireframe — Gallery sản phẩm</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Grid ảnh</strong> — filter theo vật liệu, ngành ( ô tô, y tế, máy móc…).</li>
  <li><strong>Trang chi tiết sản phẩm (optional):</strong> Ảnh multi-angle, mô tả gia công, không tiết lộ bản vẽ KH.</li>
  <li><strong>Alt text:</strong> “Gia công CNC [vật liệu] [loại chi tiết]” — keyword tự nhiên.</li>
  <li><strong>CTA:</strong> “Gia công tương tự — gửi bản vẽ”.</li>
</ol>

<h2 id="rfq">Wireframe — Form RFQ &amp; báo giá</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Trang /bao-gia:</strong> Form upload file DWG, PDF, STEP, IGES (max size rõ).</li>
  <li><strong>Trường:</strong> Vật liệu, số lượng, tolerance, deadline, SĐT, email công ty.</li>
  <li><strong>Mô tả vụ việc</strong> textarea — yêu cầu đặc biệt.</li>
  <li><strong>Thank-you:</strong> Mã RFQ + SLA báo giá (24–72h).</li>
  <li><strong>Email kỹ thuật</strong> notification + lưu file secure.</li>
  <li><strong>Bảng giá tham khảo</strong> theo giờ máy/kg (nếu công khai).</li>
  <li><strong>GA4 event</strong> submit_rfq.</li>
</ol>

${img(1, "Template website cơ khí — form RFQ upload bản vẽ gia công CNC", "co-khi")}

<h2 id="blog-seo">Blog &amp; SEO cluster B2B</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Commercial:</strong> “Gia công CNC [vật liệu]”, “Xưởng cơ khí [KCN]”.</li>
  <li><strong>Informational:</strong> “Quy trình gia công CNC”, “Chọn xưởng gia công”.</li>
  <li><strong>Long-tail:</strong> “Gia công chi tiết nhôm 6061”, “Gia công INOX 304”.</li>
  <li>Internal link mỗi bài → /dich-vu/* + /bao-gia + <a href="${SITE}/blog/nganh/co-khi">hub</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">xưởng gia công cnc [tỉnh]</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/may-moc</td><td class="border border-indigo-100 px-3 py-2">máy cnc [hành trình]</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/bao-gia</td><td class="border border-indigo-100 px-3 py-2">báo giá gia công cnc</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/vat-lieu</td><td class="border border-indigo-100 px-3 py-2">gia công nhôm / inox / thép</td></tr>
  </tbody>
</table>
</div>

<h2 id="ky-thuat">Technical SEO template cơ khí</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema Organization + LocalBusiness</strong> — địa chỉ xưởng.</li>
  <li><strong>FAQPage</strong> trên trang dịch vụ.</li>
  <li><strong>Upload form:</strong> Giới hạn file size, virus scan, HTTPS.</li>
  <li><strong>Image optimization:</strong> WebP gallery, lazy load.</li>
  <li><strong>Sitemap</strong> gồm catalog máy + gallery.</li>
  <li><strong>Core Web Vitals</strong> — tránh PDF embed nặng trên trang chủ.</li>
</ol>

<h2 id="timeline">Timeline triển khai</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap, thu ảnh máy/sản phẩm, bảng thông số máy.</li>
  <li><strong>Tuần 2:</strong> Wireframe trang chủ + /may-moc + /bao-gia.</li>
  <li><strong>Tuần 3:</strong> Dev form upload RFQ + email notification.</li>
  <li><strong>Tuần 4:</strong> Silo dịch vụ + gallery + SEO on-page.</li>
  <li><strong>Tuần 5:</strong> Blog seed + GSC + go-live.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Vertical B2B cần form lead + catalog — mô hình silo tương tự <a href="${SITE}/du-an/kien-truc-sao-khue">Kiến Trúc Sao Khuê</a> (Fanpage <strong>83.374 lượt xem</strong>/90 ngày) về trust và multi-channel.</p>
</div>

${img(2, "Template website cơ khí — sitemap 12 trang gia công B2B", "co-khi")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-co-khi">thiết kế website cơ khí</a></li>
  <li>CNC: <a href="${SITE}/blog/thiet-ke-website-gia-cong-cnc">gia công CNC</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-co-khi-2026">checklist</a></li>
  <li>Hub: <a href="${SITE}/blog/nganh/co-khi">/blog/nganh/co-khi</a></li>
  <li>Landing: <a href="${SITE}/website/nganh/co-khi">/website/nganh/co-khi</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Xưởng nhỏ cần bao nhiêu trang?</h3>
<p>Tối thiểu 6: chủ, giới thiệu, dịch vụ, gallery, báo giá, liên hệ. Mở rộng catalog khi có ≥4 máy CNC.</p>
<h3>Form upload bản vẽ có bắt buộc?</h3>
<p>Rất nên có — RFQ là conversion chính của web cơ khí B2B. Nếu chưa dev upload, dùng email + link Drive tạm.</p>
<h3>Template khác checklist?</h3>
<p>Template = cấu trúc trước; checklist = 20 mục nghiệm thu sau.</p>
<h3>Giá website cơ khí?</h3>
<p>6–14 triệu tùy catalog máy, gallery và form RFQ. <a href="${SITE}/banggia">Bảng giá</a>.</p>
<h3>Bứt Phá có triển khai?</h3>
<p>Có — <a href="${SITE}/lien-he">tư vấn</a> kèm số máy, vật liệu và yêu cầu RFQ.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/co-khi">Hub</a> · <a href="${SITE}/blog/checklist-website-co-khi-2026">Checklist</a> · <a href="${SITE}/blog/thiet-ke-website-co-khi">Money page</a> · <a href="${SITE}/website">Dịch vụ</a></p>
${internalLinks({ cluster: "co-khi" })}
`,
  }),
};

console.log("=== Seed template website cơ khí 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-co-khi-2026");
