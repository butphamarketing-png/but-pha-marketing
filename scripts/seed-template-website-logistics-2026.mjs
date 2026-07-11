/**
 * Template silo — cấu trúc website logistics 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-logistics-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website logistics";

const article = {
  title: "Template Website Logistics 2026 — Cấu Trúc 12 Trang Vận Tải B2B",
  slug: "template-website-logistics-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website vận tải, cấu trúc website logistics, sitemap công ty vận chuyển, layout tra cứu vận đơn, wireframe website logistics",
  metaTitle: "Template Website Logistics 2026 | 12 Trang B2B",
  metaDescription:
    "Template website logistics 2026: 12 trang — tra cứu vận đơn, báo giá cước, mạng lưới tuyến, đội xe, SEO B2B. Wireframe chi tiết từng trang.",
  description:
    "Mẫu cấu trúc website logistics & vận tải 12 trang — wireframe B2B, form báo giá, tra cứu và silo SEO.",
  imageUrl: "/tin-tuc/logistics/logistics-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Logistics 2026 | 12 Trang B2B",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template logistics là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "dich-vu", label: "Trang dịch vụ vận tải" },
  { id: "tuyen", label: "Mạng lưới & tuyến" },
  { id: "doi-xe", label: "Đội xe & năng lực" },
  { id: "tra-cuu", label: "Tra cứu vận đơn" },
  { id: "bao-gia", label: "Báo giá & form lead" },
  { id: "blog-seo", label: "Blog & SEO cluster" },
  { id: "ky-thuat", label: "Technical SEO template" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> là bộ khung <strong>12 trang</strong> cho công ty logistics/vận tải B2B: tra cứu vận đơn, form báo giá cước, mạng lưới tuyến, catalog đội xe và silo SEO commercial. Dùng cùng <a href="${SITE}/blog/checklist-website-logistics-2026">checklist 20 mục</a> và <a href="${SITE}/blog/thiet-ke-website-logistics-van-tai">money page logistics</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Template phù hợp công ty vận tải đường bộ, kho bãi, giao nhận, forwarder nội địa hoặc 3PL phục vụ khu công nghiệp. Khách B2B vào web thường cần: (1) xác minh năng lực vận chuyển, (2) tra bill nhanh, (3) gửi yêu cầu báo giá cước — template ưu tiên 3 intent đó trước khi làm blog hay gallery marketing.</p>

<h2 id="la-gi">Template website logistics là gì?</h2>
<p><strong>Template website logistics</strong> không phải theme WordPress tải về — là sơ đồ cấu trúc URL, menu, section block và luồng chuyển đổi để designer/dev triển khai website công ty vận tải đúng SEO B2B. Khác checklist (kiểm tra sau khi làm), template dùng <em>trước</em> khi thiết kế wireframe.</p>
<p>So với website bán lẻ: logistics cần ít trang sản phẩm hơn nhưng cần form báo giá phức tạp, bản đồ tuyến, catalog đội xe và trust signal (giấy phép, bảo hiểm, logo khách hàng công nghiệp).</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu (pháp nhân, lịch sử, chứng nhận)</li>
  <li><strong>Dịch vụ (hub)</strong> — /dich-vu</li>
  <li><strong>Vận tải đường bộ</strong> — /dich-vu/van-tai-duong-bo</li>
  <li><strong>Kho bãi &amp; fulfillment</strong> — /dich-vu/kho-bai</li>
  <li><strong>Giao nhận &amp; hải quan</strong> — /dich-vu/giao-nhan</li>
  <li><strong>Mạng lưới / Tuyến</strong> — /tuyen-van-chuyen</li>
  <li><strong>Đội xe &amp; năng lực</strong> — /doi-xe</li>
  <li><strong>Tra cứu vận đơn</strong> — /tra-cuu</li>
  <li><strong>Báo giá</strong> — /bao-gia</li>
  <li><strong>Blog / Tin tức</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>
<p>Menu sticky desktop/mobile: <strong>Hotline điều phối</strong> + nút <strong>Báo giá ngay</strong> + link <strong>Tra cứu bill</strong>.</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “[Tên công ty] — Logistics &amp; Vận tải [Tỉnh/KCN]”, subline năng lực (xe tải, kho, tuyến Bắc–Nam).</li>
  <li><strong>Ô tra cứu vận đơn</strong> nổi bật ngay dưới hero — input mã bill + nút Tra cứu.</li>
  <li><strong>CTA kép:</strong> “Báo giá cước” (primary) + “Gọi điều phối 24/7” (secondary).</li>
  <li><strong>4 card dịch vụ:</strong> Đường bộ, kho, giao nhận, cold chain — link silo.</li>
  <li><strong>Số liệu trust:</strong> Số xe, m² kho, tuyến phủ, năm thành lập.</li>
  <li><strong>Bản đồ tuyến</strong> hoặc infographic mạng lưới (SVG nhẹ, lazy load).</li>
  <li><strong>Logo khách hàng B2B</strong> (6–12 logo, grayscale).</li>
  <li><strong>Quy trình vận chuyển 5 bước:</strong> Nhận hàng → kho → vận chuyển → giao → POD/chứng từ.</li>
  <li><strong>Form báo giá rút gọn:</strong> Điểm đi/đến + SĐT — full form ở /bao-gia.</li>
  <li><strong>FAQ ngắn 3 câu</strong> + link FAQ đầy đủ.</li>
  <li><strong>Footer:</strong> MST, địa chỉ kho chính, Maps, link hub <a href="${SITE}/blog/nganh/logistics">logistics</a>.</li>
</ol>

<h2 id="dich-vu">Wireframe — Trang dịch vụ vận tải</h2>
<p>Mỗi trang con /dich-vu/* dùng layout thống nhất:</p>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1 long-tail:</strong> “Vận tải đường bộ [Tỉnh]” / “Dịch vụ kho bãi [KCN]”.</li>
  <li><strong>Mô tả 400–600 từ:</strong> Phạm vi, loại hàng, cam kết SLA.</li>
  <li><strong>Bảng thông số:</strong> Tải trọng, loại xe, thời gian giao tham khảo.</li>
  <li><strong>Quy trình riêng</strong> cho dịch vụ (4–6 bước).</li>
  <li><strong>Gallery ảnh thực tế</strong> xe/kho — alt có keyword ngành.</li>
  <li><strong>FAQ schema ≥5 câu</strong> riêng dịch vụ.</li>
  <li><strong>CTA:</strong> Form báo giá + hotline cuối trang.</li>
  <li><strong>Internal link:</strong> ↔ Hub /dich-vu ↔ Trang chủ ↔ Blog liên quan.</li>
</ol>

<h2 id="tuyen">Wireframe — Mạng lưới &amp; tuyến vận chuyển</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Tuyến vận chuyển &amp; mạng lưới [Tên công ty]”.</li>
  <li><strong>Bản đồ tương tác hoặc bảng tuyến:</strong> HN–HCM, HN–ĐN, tuyến tỉnh lẻ.</li>
  <li><strong>Thời gian giao tham khảo</strong> theo tuyến (không cam kết cứng nếu chưa chính sách).</li>
  <li><strong>Hub kho trung chuyển:</strong> Địa chỉ, diện tích, loại hàng được phép.</li>
  <li><strong>SEO local:</strong> “Vận tải [tỉnh A] đi [tỉnh B]”, “logistics [khu công nghiệp]”.</li>
  <li><strong>CTA báo giá tuyến</strong> pre-fill điểm đi/đến từ URL query.</li>
</ol>

<h2 id="doi-xe">Wireframe — Đội xe &amp; năng lực</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Catalog xe:</strong> Loại xe, tải trọng, số lượng, ảnh thực tế.</li>
  <li><strong>Thiết bị nâng hạ / container</strong> nếu có.</li>
  <li><strong>Chứng nhận:</strong> Giấy phép kinh doanh vận tải, ISO, bảo hiểm hàng hóa.</li>
  <li><strong>Đội ngũ:</strong> Tài xế, điều phối — số lượng, kinh nghiệm (không cần profile cá nhân).</li>
  <li><strong>Download hồ sơ năng lực PDF</strong> — lead B2B lớn hay yêu cầu.</li>
</ol>

${img(0, "Template website logistics — wireframe trang chủ vận tải B2B", "logistics")}

<h2 id="tra-cuu">Wireframe — Tra cứu vận đơn</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Input mã vận đơn/bill</strong> — full width, mobile-first.</li>
  <li><strong>Trạng thái:</strong> Đã nhận / đang vận chuyển / đã giao / POD (nếu có TMS).</li>
  <li><strong>Chưa có TMS:</strong> Form “Gửi mã — phản hồi 15 phút qua Zalo/email”.</li>
  <li><strong>FAQ:</strong> Định dạng mã bill, tra cứu nhiều đơn, liên hệ khi sai mã.</li>
  <li><strong>Link hotline điều phối</strong> sticky khi tra cứu thất bại.</li>
</ol>

<h2 id="bao-gia">Wireframe — Báo giá &amp; form lead B2B</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Form đa bước (optional):</strong> Bước 1 tuyến → Bước 2 loại hàng → Bước 3 liên hệ.</li>
  <li><strong>Trường bắt buộc:</strong> Điểm đi, điểm đến, loại hàng, khối lượng/thể tích, SĐT, email công ty.</li>
  <li><strong>Upload chứng từ</strong> (optional) — packing list, ảnh hàng.</li>
  <li><strong>Bảng cước tham khảo</strong> nếu công ty công khai — tránh cam kết sai.</li>
  <li><strong>Thank-you page:</strong> Mã ticket + SLA phản hồi + hotline.</li>
  <li><strong>Event tracking:</strong> GA4 conversion “submit_bao_gia”.</li>
</ol>

${img(1, "Template website logistics — form báo giá cước và tra cứu vận đơn", "logistics")}

<h2 id="blog-seo">Blog &amp; SEO cluster cho template</h2>
<p>Sau khi triển khai 12 trang core, mở rộng content cluster:</p>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Commercial:</strong> “Báo giá vận chuyển [tuyến]”, “Chi phí logistics [KCN]”.</li>
  <li><strong>Informational:</strong> “Cách chọn đơn vị vận tải”, “Quy trình giao nhận hàng hóa”.</li>
  <li><strong>Local:</strong> “Công ty vận tải [tỉnh]”, “Kho bãi [KCN]”.</li>
  <li><strong>Internal link:</strong> Mỗi bài blog → 1 trang dịch vụ + form báo giá + hub <a href="${SITE}/blog/nganh/logistics">/blog/nganh/logistics</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang template</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th><th class="border border-indigo-100 px-3 py-2 text-left">Intent</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">công ty logistics [tỉnh]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/bao-gia</td><td class="border border-indigo-100 px-3 py-2">báo giá vận chuyển [tuyến]</td><td class="border border-indigo-100 px-3 py-2">Lead</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/tra-cuu</td><td class="border border-indigo-100 px-3 py-2">tra cứu vận đơn</td><td class="border border-indigo-100 px-3 py-2">Utility</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/doi-xe</td><td class="border border-indigo-100 px-3 py-2">đội xe vận tải [tải trọng]</td><td class="border border-indigo-100 px-3 py-2">Trust</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/tuyen-van-chuyen</td><td class="border border-indigo-100 px-3 py-2">vận tải [A] đi [B]</td><td class="border border-indigo-100 px-3 py-2">Local SEO</td></tr>
  </tbody>
</table>
</div>

<h2 id="ky-thuat">Technical SEO khi triển khai template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema Organization + LocalBusiness:</strong> Tên, MST, địa chỉ kho, hotline.</li>
  <li><strong>Schema FAQPage</strong> trên trang dịch vụ và /bao-gia.</li>
  <li><strong>Core Web Vitals:</strong> Form và bản đồ không block LCP — lazy load map iframe.</li>
  <li><strong>Canonical</strong> cho từng URL silo — tránh duplicate filter tuyến.</li>
  <li><strong>Sitemap.xml</strong> gồm 12 trang core + blog cluster.</li>
  <li><strong>robots.txt</strong> không chặn /tra-cuu, /bao-gia.</li>
  <li><strong>HTTPS + redirect www</strong> thống nhất.</li>
  <li><strong>Alt ảnh xe/kho</strong> mô tả thực tế, có keyword ngành tự nhiên.</li>
</ol>

<h2 id="timeline">Timeline triển khai theo template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap 12 trang, thu content (logo KH, ảnh xe, giấy phép).</li>
  <li><strong>Tuần 2:</strong> Wireframe + UI trang chủ, /bao-gia, /tra-cuu.</li>
  <li><strong>Tuần 3:</strong> Dev form báo giá + email/CRM notification.</li>
  <li><strong>Tuần 4:</strong> Silo dịch vụ + trang tuyến + SEO on-page.</li>
  <li><strong>Tuần 5:</strong> QA mobile, schema, GSC submit, go-live.</li>
  <li><strong>Tháng 2–3:</strong> Blog cluster + theo dõi query commercial trên GSC.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Mô hình B2B + SEO local tương tự đã áp dụng cho <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> — <strong>15,4K impressions</strong> và <strong>471 clicks</strong> GSC sau tối ưu cấu trúc web. Logistics cần thêm form báo giá và tra cứu — 2 module conversion quan trọng nhất.</p>
</div>

${img(2, "Template website logistics — sitemap 12 trang và silo SEO B2B", "logistics")}

<h2 id="silo">Liên kết silo Vertical Proof</h2>
<p>Template nằm trong silo 7 URL ngành logistics:</p>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-logistics-van-tai">thiết kế website logistics</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-logistics-2026">checklist 20 mục</a></li>
  <li>Template: <strong>bài này</strong></li>
  <li>Hub: <a href="${SITE}/blog/nganh/logistics">/blog/nganh/logistics</a></li>
  <li>Landing: <a href="${SITE}/website/nganh/logistics">/website/nganh/logistics</a></li>
  <li>Dịch vụ: <a href="${SITE}/website">thiết kế website Bứt Phá</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trang trước khi làm; checklist = 20 mục kiểm tra sau khi làm xong.</p>
<h3>Chưa có TMS có làm trang tra cứu?</h3>
<p>Có — dùng form “Gửi mã vận đơn — phản hồi 15 phút” hoặc embed iframe hệ thống đối tác. Không để trang trống.</p>
<h3>12 trang có quá nhiều cho công ty nhỏ?</h3>
<p>Có thể gộp: /dich-vu hub + 2 silo chính; /doi-xe gộp vào /gioi-thieu. Giữ /bao-gia và /tra-cuu — 2 trang conversion bắt buộc.</p>
<h3>Giá triển khai theo template?</h3>
<p>Website logistics 6–14 triệu tùy form báo giá, tra cứu và số trang silo. Xem <a href="${SITE}/banggia">bảng giá</a> và <a href="${SITE}/blog/thiet-ke-website-logistics-van-tai">hướng dẫn chi tiết</a>.</p>
<h3>Template có hỗ trợ SEO “vận tải + tỉnh”?</h3>
<p>Có — trang /tuyen-van-chuyen và blog cluster được thiết kế cho local/commercial long-tail.</p>
<h3>Bứt Phá có triển khai theo template?</h3>
<p>Có — <a href="${SITE}/lien-he">đăng ký tư vấn</a> kèm số tuyến, loại xe và yêu cầu tra cứu/TMS.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/logistics">Hub logistics</a> · <a href="${SITE}/blog/checklist-website-logistics-2026">Checklist</a> · <a href="${SITE}/blog/thiet-ke-website-logistics-van-tai">Money page</a> · <a href="${SITE}/website">Dịch vụ website</a> · <a href="${SITE}/du-an">Case study</a></p>
${internalLinks({ cluster: "logistics" })}
`,
  }),
};

console.log("=== Seed template website logistics 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-logistics-2026");
