/**
 * Template silo — cấu trúc website logistics 2026
 * Chạy: node scripts/seed-template-website-logistics-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website logistics";

const article = {
  title: "Template Website Logistics 2026 — Cấu Trúc 8 Trang Vận Tải B2B",
  slug: "template-website-logistics-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website vận tải, cấu trúc website logistics, sitemap công ty vận chuyển, layout tra cứu vận đơn",
  metaTitle: "Template Website Logistics 2026 | 8 Trang B2B",
  metaDescription:
    "Template website logistics 2026: 8 trang — tra cứu vận đơn, báo giá cước, mạng lưới tuyến, SEO B2B. Bứt Phá Marketing.",
  description:
    "Mẫu cấu trúc website logistics & vận tải 8 trang — B2B và tra cứu.",
  imageUrl: "/tin-tuc/logistics/logistics-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Logistics 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "bao-gia", label: "Báo giá & tra cứu" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 8 trang B2B: mạng lưới tuyến, đội xe, form báo giá cước, tra cứu vận đơn. <a href="${SITE}/blog/checklist-website-logistics-2026">Checklist</a>.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu</li>
  <li><strong>Dịch vụ</strong> — /dich-vu (đường bộ, kho, giao nhận, hải quan)</li>
  <li><strong>Mạng lưới / Tuyến</strong> — /tuyen-van-chuyen</li>
  <li><strong>Đội xe &amp; năng lực</strong> — /doi-xe</li>
  <li><strong>Tra cứu vận đơn</strong> — /tra-cuu</li>
  <li><strong>Báo giá</strong> — /bao-gia (form)</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Logistics [Tên] — Vận tải &amp; Kho bãi [Tỉnh]”, CTA báo giá.</li>
  <li><strong>Ô tra cứu vận đơn</strong> nổi bật trên hero.</li>
  <li><strong>Dịch vụ card:</strong> Link silo.</li>
  <li><strong>Bản đồ tuyến</strong> Bắc–Nam / khu công nghiệp.</li>
  <li><strong>Logo khách hàng B2B.</strong></li>
  <li><strong>Quy trình vận chuyển 5 bước.</strong></li>
  <li><strong>Hotline điều phối 24/7.</strong></li>
</ol>

<h2 id="bao-gia">Block — Báo giá &amp; tra cứu</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Form báo giá:</strong> Điểm đi/đến, loại hàng, khối lượng, SĐT.</li>
  <li><strong>Tra cứu:</strong> Input mã bill — hoặc link TMS ngoài.</li>
  <li><strong>Bảng cước tham khảo</strong> (nếu công khai).</li>
  <li><strong>FAQ:</strong> Thời gian giao, COD, bảo hiểm hàng.</li>
</ol>

${img(0, "Template cấu trúc website logistics vận tải B2B", "logistics")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-logistics-van-tai">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-logistics-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/logistics">Hub</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Chưa có TMS có làm tra cứu?</h3>
<p>Dùng form “Gửi mã vận đơn — phản hồi 15 phút” hoặc embed iframe đối tác.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/logistics">Hub</a> · <a href="${SITE}/website">Tư vấn</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website logistics 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-logistics-2026");
