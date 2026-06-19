import { NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";
import {
  buildWpSeoArticle,
  wpToc,
  wpIntro,
  wpKeyTakeaways,
  wpFaq,
  wpRelatedLinks,
  wpConclusion,
  wpExternalCta,
  wpImg,
  SITE,
} from "./seo-wp-structure.mjs";

const KEYWORD = "thiết kế website blog tin tức";
const TITLE = "Thiết Kế Website Blog Tin Tức Chuẩn SEO Content";

export const REWRITE_THIET_KE_WEBSITE_BLOG_TIN_TUC = {
  title: TITLE,
  slug: "thiet-ke-website-blog-tin-tuc",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website blog tin tức, thiết kế web blog seo, content hub, website báo điện tử, blog doanh nghiệp",
  metaTitle: "Thiết Kế Website Blog Tin Tức | SEO Content 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website blog tin tức: category, author, RSS, schema Article và content hub SEO. Quy trình 7 bước, giá 4–10 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website blog tin tức chuẩn SEO: content hub, cấu trúc category, E-E-A-T và vận hành xuất bản bền vững.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Blog Tin Tức | SEO Content 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "blog-la-gi", label: "Website blog tin tức là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần content hub?" },
  { id: "khac-corporate", label: "Blog vs web giới thiệu" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc & taxonomy" },
  { id: "seo-content", label: "SEO & E-E-A-T" },
  { id: "toc-do", label: "Tốc độ & scale nhiều bài" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "van-hanh", label: "Vận hành & lịch xuất bản" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website blog tin tức</strong> là quy trình xây dựng website (hoặc mục content hub) tập trung <em>xuất bản bài viết</em> — tin tức, phân tích, hướng dẫn — với cấu trúc category, author, RSS và SEO on-page chuẩn để thu traffic organic lâu dài. Khác Fanpage đăng bài rời rạc, <strong>${KEYWORD}</strong> giúp bạn sở hữu nền tảng content, internal link có hệ thống và đo lường từng bài qua Search Console.`,
    `Bài viết dành cho chủ media nhỏ, marketer doanh nghiệp và đội content đang cần <strong>${KEYWORD}</strong>: phân biệt blog tin tức vs web corporate, checklist tính năng CMS, taxonomy SEO, E-E-A-T, tốc độ khi scale hàng trăm bài, quy trình triển khai và mức giá 2026 — thực chiến tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Blog web = content hub — category rõ, URL sạch, schema Article.",
  "WordPress phổ biến nhất cho blog VN — dễ đăng bài, plugin SEO.",
  "E-E-A-T: author box, ngày cập nhật, nguồn trích dẫn — Google tin cậy.",
  "1–4 bài chất/tháng > 100 bài AI mỏng — tránh penalty.",
  "Bứt Phá: gói blog 4–10 triệu; kết hợp trang dịch vụ nếu cần lead.",
])}

${wpImg(10, "Thiết kế website blog tin tức chuẩn SEO content hub")}

<h2 id="blog-la-gi">Website blog tin tức là gì?</h2>

<p><strong>Website blog tin tức</strong> (news blog / content hub) là trang web — hoặc phần lớn của website — dùng để <em>publish và lưu trữ bài viết</em> theo thời gian: tin ngành, tutorial, review, opinion. <strong>Thiết kế website blog tin tức</strong> ưu tiên:</p>

<ul>
  <li><strong>Trang listing:</strong> Danh sách bài mới nhất, theo category</li>
  <li><strong>Trang chi tiết bài (single post):</strong> Title, meta, TOC, nội dung, author</li>
  <li><strong>Category / tag:</strong> Phân loại chủ đề — SEO silo</li>
  <li><strong>Author archive:</strong> Trang tác giả — E-E-A-T</li>
  <li><strong>RSS / newsletter:</strong> Phân phối subscriber</li>
  <li><strong>Search nội bộ:</strong> Tìm bài cũ — UX + engagement</li>
</ul>

<h2 id="vi-sao-can">Vì sao doanh nghiệp &amp; media cần blog tin tức riêng?</h2>

<ul>
  <li><strong>SEO organic:</strong> Mỗi bài = 1 cơ hội ranking long-tail — traffic miễn phí dài hạn.</li>
  <li><strong>Thought leadership:</strong> Chứng minh chuyên môn — B2B tin tưởng trước khi mua.</li>
  <li><strong>Nuôi lead:</strong> Bài giáo dục → CTA tải tài liệu / liên hệ / dịch vụ.</li>
  <li><strong>Sở hữu nội dung:</strong> Không phụ thuộc thuật toán Facebook/TikTok.</li>
  <li><strong>PR &amp; backlink:</strong> Bài chất lượng được trích dẫn — tăng authority domain.</li>
  <li><strong>Quảng cáo:</strong> Landing blog message-match chiến dịch content ads.</li>
</ul>

<h2 id="khac-corporate">Blog tin tức vs website giới thiệu có vài bài</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Web corporate + tin tức lẻ</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Blog / content hub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mục tiêu chính</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu công ty</td>
      <td class="border border-indigo-100 px-3 py-2">Traffic content, SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tần suất</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Vài bài/năm</td>
      <td class="border border-indigo-100 px-3 py-2">Hàng tuần hoặc hàng tháng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Cấu trúc URL</strong></td>
      <td class="border border-indigo-100 px-3 py-2">/tin-tuc/bai-1</td>
      <td class="border border-indigo-100 px-3 py-2">/blog/category/slug — silo rõ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CMS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Đăng bài khó — hay bỏ quên</td>
      <td class="border border-indigo-100 px-3 py-2">Workflow editor tối ưu</td>
    </tr>
  </tbody>
</table>

<p>Có thể <strong>kết hợp</strong>: website doanh nghiệp + mục /blog mạnh — xem <a href="${SITE}/blog/thiet-ke-website-doanh-nghiep">thiết kế website doanh nghiệp</a>.</p>

<h2 id="tinh-nang">Tính năng website blog tin tức bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CMS đăng bài</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Editor WYSIWYG/block — preview mobile</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Category &amp; tag</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Taxonomy SEO — không lạm dụng tag</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO plugin</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Rank Math / Yoast — meta, schema, sitemap</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Author profile</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ảnh, bio, link — E-E-A-T</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Featured image</strong></td>
      <td class="border border-indigo-100 px-3 py-2">WebP, alt text, OG share social</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>TOC (mục lục)</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bài dài — UX + jump link</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Related posts</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Internal link — giảm bounce</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>RSS + newsletter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Subscriber — traffic quay lại</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc URL &amp; taxonomy chuẩn SEO</h2>

<p>Ví dụ cấu trúc <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><code>/blog/</code> — Trang listing tất cả bài</li>
  <li><code>/blog/marketing/ten-bai-viet/</code> — Single post trong category</li>
  <li><code>/blog/marketing/</code> — Archive category</li>
  <li><code>/blog/tac-gia/ten-author/</code> — Author archive</li>
</ul>

<p>Nguyên tắc:</p>
<ul>
  <li>Slug bài: ngắn, có từ khóa, không date trong URL (tránh lỗi thời)</li>
  <li>Category: 5–12 chủ đề — không tạo category trống</li>
  <li>Tag: hạn chế — tránh duplicate với category</li>
  <li>Breadcrumb + schema BreadcrumbList</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-blog-seo">thiết kế website blog SEO</a> và <a href="${SITE}/blog/thiet-ke-website-cau-truc-silo">cấu trúc silo SEO</a>.</p>

${wpImg(0, "Cấu trúc website blog tin tức — category và trang bài viết chuẩn SEO")}

<h2 id="seo-content">SEO content &amp; E-E-A-T cho blog tin tức</h2>

<ul>
  <li><strong>1 focus keyword / bài:</strong> Title, H1, meta description chứa intent rõ</li>
  <li><strong>Độ dài:</strong> Trả lời đủ câu hỏi — tin tức ngắn 600–1.000 từ; pillar 2.000–4.000 từ</li>
  <li><strong>Schema Article / NewsArticle:</strong> datePublished, dateModified, author</li>
  <li><strong>Author thật:</strong> Bio, ảnh, expertise — không “Admin”</li>
  <li><strong>Nguồn trích dẫn:</strong> Link outbound uy tín — tin tức cần đặc biệt</li>
  <li><strong>Cập nhật bài cũ:</strong> Ghi “Cập nhật [tháng/năm]” — freshness signal</li>
  <li><strong>Internal link:</strong> Bài mới → pillar → trang dịch vụ</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a> và <a href="${SITE}/blog/thiet-ke-website-noi-dung-eat">nội dung E-E-A-T</a>.</p>

<h2 id="toc-do">Tốc độ tải khi scale hàng trăm bài</h2>

<ul>
  <li><strong>Cache:</strong> LiteSpeed / WP Rocket — TTFB thấp</li>
  <li><strong>CDN:</strong> Ảnh featured qua CDN</li>
  <li><strong>Lazy load:</strong> Ảnh trong bài — Core Web Vitals xanh</li>
  <li><strong>Database:</strong> Hosting đủ RAM khi 500+ posts</li>
  <li><strong>Pagination:</strong> Archive category phân trang — không load 100 bài một trang</li>
  <li><strong>Search:</strong> Algolia hoặc native — nhanh hơn duyệt archive</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website blog tin tức — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Chủ đề blog, tần suất xuất bản, đội content, monetization (ads/lead).</li>
  <li><strong>Sitemap:</strong> Category, trang tĩnh, luồng đọc → chuyển đổi.</li>
  <li><strong>UI design:</strong> Listing card, single post typography — đọc lâu không mỏi mắt.</li>
  <li><strong>Lập trình WordPress/custom:</strong> Theme blog, plugin SEO, GA4, Search Console.</li>
  <li><strong>Migrate / seed:</strong> Import bài cũ (nếu có) — redirect 301 URL cũ.</li>
  <li><strong>SEO kỹ thuật:</strong> Sitemap.xml, robots, schema, canonical.</li>
  <li><strong>Đào tạo editor:</strong> Checklist đăng bài — meta, alt, internal link.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần cho blog hub + 5–10 trang tĩnh kèm theo.</p>

<h2 id="bang-gia">Bảng giá thiết kế website blog tin tức 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Blog Starter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">WordPress blog, 5 category, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Blog Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">TOC, author, related, newsletter, silo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Content Hub</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Blog + trang dịch vụ, search, đa author</td>
    </tr>
  </tbody>
</table>

<p>Gói viết bài SEO hàng tháng — báo giá riêng. Chi tiết: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="van-hanh">Vận hành blog sau khi ra mắt</h2>

<ul>
  <li><strong>Lịch editorial:</strong> 2–4 bài/tháng — chủ đề theo keyword research</li>
  <li><strong>Brief chuẩn:</strong> Keyword, outline, CTA, internal link bắt buộc</li>
  <li><strong>Review:</strong> Fact-check tin tức — tránh fake news / penalty</li>
  <li><strong>Repurpose:</strong> Blog → social snippet → newsletter</li>
  <li><strong>Đo lường:</strong> GSC: click, impression, position — tối ưu bài có impression cao, CTR thấp</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website blog tin tức</h2>

<ul>
  <li>100 bài AI copy mỏng — Google Helpful Content penalty.</li>
  <li>Category quá nhiều — mỗi category 1–2 bài.</li>
  <li>Không author — mất E-E-A-T.</li>
  <li>Ảnh featured nặng — archive blog chậm.</li>
  <li>Blog tách domain riêng yếu — nên subdirectory trên domain chính (link juice).</li>
  <li>Đăng bài không internal link — silo gãy, PageRank không chảy.</li>
  <li>Bỏ quên cập nhật bài cũ — thông tin lỗi thời gây mất trust.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-wordpress`,
    label: "Website WordPress",
    desc: "Nền tảng blog phổ biến.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Website chuẩn SEO",
    desc: "Kỹ thuật SEO on-page.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Kết hợp blog + corporate.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn blog",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website blog tin tức giá bao nhiêu?",
      a: "Tại Bứt Phá từ 4.000.000đ (blog WordPress cơ bản) đến 10.000.000đ (content hub + trang dịch vụ). Chưa gồm hosting và viết bài hàng tháng.",
    },
    {
      q: "Nên dùng WordPress cho blog không?",
      a: "Rất phổ biến — CMS mạnh, plugin SEO, dễ đăng bài. Headless (Next.js + CMS) khi cần tốc độ cực cao và dev team.",
    },
    {
      q: "Blog nên đặt subdomain hay subdirectory?",
      a: "Subdirectory (domain.com/blog) thường tốt hơn cho SEO — link juice về domain chính. Subdomain (blog.domain.com) tách authority.",
    },
    {
      q: "Bao nhiêu bài trước khi có traffic SEO?",
      a: "Thường 20–40 bài chất lượng + 3–6 tháng. Pillar + cluster hiệu quả hơn spam số lượng.",
    },
    {
      q: "Blog tin tức có cần giấy phép không?",
      a: "Báo điện tử chính thống cần GP MXH-BTTTT. Blog doanh nghiệp giới thiệu ngành thường không — tuân thủ luật quảng cáo và bản quyền.",
    },
    {
      q: "Có tích hợp newsletter không?",
      a: "Có — Mailchimp, ConvertKit embed form. RSS-to-email automation nuôi subscriber.",
    },
    {
      q: "Bao lâu hoàn thành website blog?",
      a: "Thường 3–6 tuần. Phụ thuộc thiết kế custom và migrate bài cũ.",
    },
    {
      q: "Bứt Phá có làm website blog tin tức không?",
      a: "Có — blog doanh nghiệp, content hub, tin ngành. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website blog tin tức</strong> chuẩn SEO là nền tảng content marketing bền vững — category rõ, author tin cậy, kỹ thuật nhanh và lịch xuất bản đều đặn. Đầu tư đúng từ cấu trúc URL và CMS giúp mỗi bài mới gia tăng authority domain thay vì “một cục” bài rời rạc.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo quy mô content hub và tích hợp trang dịch vụ của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website blog tin tức",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
