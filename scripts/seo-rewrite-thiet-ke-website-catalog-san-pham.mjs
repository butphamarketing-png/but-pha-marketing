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

const KEYWORD = "thiết kế website catalog sản phẩm";
const TITLE = "Thiết Kế Website Catalog Sản Phẩm Không Cần Giỏ Hàng";

export const REWRITE_THIET_KE_WEBSITE_CATALOG_SAN_PHAM = {
  title: TITLE,
  slug: "thiet-ke-website-catalog-san-pham",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website catalog sản phẩm, catalog online, thiết kế web catalog, brochure online, catalog B2B",
  metaTitle: "Thiết Kế Website Catalog Sản Phẩm | SEO 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website catalog sản phẩm: filter, tìm kiếm, PDF tải về, form báo giá — không cần giỏ hàng. Quy trình 7 bước, giá 4–10 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website catalog sản phẩm thay brochure PDF: showcase B2B, filter thông số, RFQ và SEO từng dòng sản phẩm.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Catalog Sản Phẩm | SEO 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "catalog-la-gi", label: "Website catalog là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần catalog online?" },
  { id: "khac-tmdt", label: "Catalog vs TMĐT vs PDF" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "filter-seo", label: "Filter & SEO sản phẩm" },
  { id: "rfq-lead", label: "Form báo giá & thu lead" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "nganh", label: "Ngành phù hợp" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website catalog sản phẩm</strong> là quy trình xây dựng website showcase — trưng bày danh mục sản phẩm/dịch vụ với ảnh, thông số, filter và form liên hệ/báo giá, <em>không bắt buộc có giỏ hàng hay thanh toán online</em>. Phù hợp nhà máy, đại lý, showroom và B2B — thay catalogue PDF in ấn hoặc file Excel gửi email. <strong>${KEYWORD}</strong> giúp khách tự tra cứu SKU trên Google, tải PDF cập nhật và gửi yêu cầu báo giá (RFQ) trực tiếp.`,
    `Bài viết dành cho chủ xưởng sản xuất, sales B2B và marketer đang cần <strong>${KEYWORD}</strong>: phân biệt catalog vs shop TMĐT, checklist tính năng filter/search, cấu trúc trang, SEO long-tail từng sản phẩm, quy trình triển khai và mức giá 2026 — thực chiến tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Catalog web ≠ shop online — không cần giỏ hàng nếu bán B2B/báo giá từng đơn.",
  "Filter + search: SKU nhiều — khách tự lọc theo size, màu, thông số kỹ thuật.",
  "PDF catalogue tải về — bản live cập nhật, export từ web.",
  "CTA: “Yêu cầu báo giá”, Zalo, hotline — trên mọi trang sản phẩm.",
  "Bứt Phá: gói catalog 4–10 triệu; nâng cấp WooCommerce sau nếu cần bán lẻ.",
])}

${wpImg(6, "Thiết kế website catalog sản phẩm với filter và form báo giá B2B")}

<h2 id="catalog-la-gi">Website catalog sản phẩm là gì?</h2>

<p><strong>Website catalog</strong> (brochure online / product catalog site) là trang web tập trung <em>giới thiệu và phân loại sản phẩm</em> — khách xem ảnh, đọc thông số, so sánh dòng sản phẩm và liên hệ đặt hàng/báo giá. <strong>Thiết kế website catalog sản phẩm</strong> thường gồm:</p>

<ul>
  <li><strong>Danh mục phân cấp:</strong> Category → subcategory → sản phẩm</li>
  <li><strong>Trang chi tiết sản phẩm (PDP):</strong> Ảnh, spec, datasheet, video</li>
  <li><strong>Filter &amp; search:</strong> Lọc theo thuộc tính kỹ thuật</li>
  <li><strong>Tải catalogue PDF:</strong> Toàn bộ hoặc theo dòng sản phẩm</li>
  <li><strong>Form RFQ / liên hệ:</strong> “Yêu cầu báo giá” — không checkout online</li>
  <li><strong>Đa ngôn ngữ (tùy chọn):</strong> EN/VI cho xuất khẩu</li>
</ul>

<p>Không có giỏ hàng — phù hợp mô hình: báo giá theo số lượng, đơn hàng qua sales, MOQ cao, sản phẩm custom.</p>

<h2 id="vi-sao-can">Vì sao nên làm catalog online thay PDF?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Catalog PDF / in ấn</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website catalog</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Cập nhật giá/SKU</strong></td>
      <td class="border border-indigo-100 px-3 py-2">In lại tốn kém, dễ lỗi thời</td>
      <td class="border border-indigo-100 px-3 py-2">Sửa CMS — realtime</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tìm kiếm Google</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Không index</td>
      <td class="border border-indigo-100 px-3 py-2">SEO từng sản phẩm — long-tail</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tra cứu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lật PDF — chậm trên mobile</td>
      <td class="border border-indigo-100 px-3 py-2">Filter, search — vài giây</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lead</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Khách gọi/email thủ công</td>
      <td class="border border-indigo-100 px-3 py-2">Form RFQ gắn từng SKU</td>
    </tr>
  </tbody>
</table>

<h2 id="khac-tmdt">Catalog vs website bán hàng (TMĐT) vs brochure giới thiệu</h2>

<ul>
  <li><strong>vs TMĐT:</strong> Shop cần giỏ, thanh toán, tồn kho — catalog chỉ showcase + lead. Xem <a href="${SITE}/blog/thiet-ke-website-ban-hang">thiết kế website bán hàng</a> nếu cần checkout.</li>
  <li><strong>vs Brochure giới thiệu:</strong> Web corporate ngắn — catalog sâu về SKU, spec, filter. Xem <a href="${SITE}/blog/thiet-ke-website-gioi-thieu-cong-ty">website giới thiệu công ty</a>.</li>
  <li><strong>Hybrid:</strong> Catalog trước — sau nâng cấp WooCommerce cho SKU bán lẻ, giữ B2B RFQ cho SKU custom.</li>
</ul>

<h2 id="tinh-nang">Tính năng website catalog bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phân cấp danh mục</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Category tree — UX + SEO silo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Filter đa thuộc tính</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Size, màu, công suất, vật liệu…</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Site search</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tìm mã SP, tên, từ khóa kỹ thuật</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang PDP chuẩn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Gallery ảnh, bảng spec, datasheet PDF</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Form RFQ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Số lượng, ghi chú — pre-fill tên SP</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Download PDF</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Catalogue tổng hoặc từng dòng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Schema Product</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Rich snippet Google (không cần giá nếu B2B)</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc trang website catalog chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Dòng sản phẩm nổi bật, CTA tải catalogue, form nhanh.</li>
  <li><strong>Danh mục (hub):</strong> Grid category — ảnh đại diện từng nhóm.</li>
  <li><strong>Listing:</strong> Grid/list sản phẩm + filter sidebar.</li>
  <li><strong>Chi tiết sản phẩm:</strong> Ảnh zoom, spec table, RFQ, SP liên quan.</li>
  <li><strong>Tải tài liệu:</strong> Trang download centre — PDF, CAD (tùy ngành).</li>
  <li><strong>Về chúng tôi / Năng lực:</strong> Nhà máy, chứng chỉ — trust B2B.</li>
  <li><strong>Liên hệ / Đại lý:</strong> Form, bản đồ đại lý (nếu có).</li>
</ol>

<p>Số trang = số SKU ÷ sản phẩm/trang listing + trang category. Shop 200 SKU thường <strong>15–30 URL</strong> có index.</p>

${wpImg(7, "Cấu trúc website catalog — danh mục sản phẩm và trang chi tiết")}

<h2 id="filter-seo">Filter, search &amp; SEO catalog</h2>

<p><strong>${KEYWORD}</strong> mạnh khi mỗi sản phẩm có URL riêng và meta unique:</p>

<ul>
  <li><strong>Title PDP:</strong> “[Tên SP] — [Mã] | [Thương hiệu]”</li>
  <li><strong>Mô tả:</strong> 150–300 từ — ứng dụng, thông số nổi bật, không copy trùng</li>
  <li><strong>Alt ảnh:</strong> Mô tả sản phẩm — không “IMG_001”</li>
  <li><strong>Internal link:</strong> Category → SP → SP liên quan → RFQ</li>
  <li><strong>Filter URL:</strong> Cân nhắc canonical — tránh duplicate hàng nghìn URL filter</li>
  <li><strong>Blog hỗ trợ:</strong> “Cách chọn [sản phẩm]” — link về catalog</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/thiet-ke-website-co-khi">thiết kế website cơ khí</a> cho catalog kỹ thuật B2B.</p>

<h2 id="rfq-lead">Form báo giá (RFQ) &amp; thu lead B2B</h2>

<p>Luồng chuyển đổi catalog không qua giỏ hàng:</p>

<ol>
  <li>Khách xem SP → click <strong>“Yêu cầu báo giá”</strong></li>
  <li>Form pre-fill tên/mã SP — nhập số lượng, địa chỉ giao, ghi chú</li>
  <li>Gửi về email sales + CRM (HubSpot, Zoho, sheet)</li>
  <li>Sales gọi/Zalo trong 24h — chốt báo giá offline</li>
</ol>

<p>Nút <strong>Zalo + gọi sticky</strong> trên mobile — B2B VN vẫn thích chat trước form dài.</p>

<h2 id="quy-trinh">Quy trình thiết kế website catalog — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Số SKU, thuộc tính filter, có PDF cũ không, B2B vs B2C sau này.</li>
  <li><strong>Sitemap:</strong> Cấu trúc category — duyệt trước khi design.</li>
  <li><strong>Wireframe listing + PDP:</strong> Filter, spec table, CTA RFQ.</li>
  <li><strong>UI design:</strong> Grid sản phẩm, ảnh nền trắng thống nhất (B2B).</li>
  <li><strong>Lập trình:</strong> CMS nhập SP hàng loạt (CSV import), search, PDF download.</li>
  <li><strong>Nhập liệu:</strong> Upload SKU — ảnh, spec; kiểm tra filter hoạt động.</li>
  <li><strong>SEO &amp; go-live:</strong> Meta từng SP, sitemap, đào tạo thêm SP mới.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần tùy số SKU (50 vs 500) và mức filter phức tạp.</p>

<h2 id="bang-gia">Bảng giá thiết kế website catalog 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Catalog Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">≤50 SP, 2 cấp category, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Catalog Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">≤200 SP, filter, search, PDF, RFQ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Catalog B2B</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">500+ SP, import CSV, đa ngôn ngữ, CRM</td>
    </tr>
  </tbody>
</table>

<p>Nâng cấp thêm giỏ hàng (WooCommerce) — báo giá riêng. Chi tiết: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="nganh">Ngành phù hợp website catalog</h2>

<ul>
  <li><strong>Cơ khí, gia công CNC:</strong> Spec kỹ thuật, RFQ — <a href="${SITE}/blog/thiet-ke-website-co-khi">website cơ khí</a></li>
  <li><strong>Vật liệu xây dựng, sơn, ống:</strong> Bảng màu, size, đại lý</li>
  <li><strong>Thiết bị điện, PCCC, công nghiệp:</strong> Datasheet, chứng nhận</li>
  <li><strong>Nội thất, showroom:</strong> Visual catalog — <a href="${SITE}/blog/thiet-ke-website-noi-that-showroom">website nội thất showroom</a></li>
  <li><strong>In ấn, bao bì:</strong> Mẫu sản phẩm, form đặt in</li>
  <li><strong>Phân phối B2B:</strong> MOQ, bảng giá sỉ (ẩn hoặc sau login)</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website catalog</h2>

<ul>
  <li>Ép làm TMĐT khi khách chỉ cần báo giá — tốn chi phí giỏ/thanh toán không dùng.</li>
  <li>Chỉ upload PDF — mất SEO và filter mobile.</li>
  <li>500 SP không filter — khách bỏ đi.</li>
  <li>Ảnh không thống nhất — catalog trông “rác”.</li>
  <li>Không có CTA RFQ trên PDP — khách xem xong không liên hệ.</li>
  <li>Copy spec đối thủ — duplicate content SEO.</li>
  <li>Filter tạo hàng nghìn URL trùng — cần canonical/noindex thông minh.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ban-hang`,
    label: "Website bán hàng",
    desc: "Khi cần thêm giỏ hàng.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-co-khi`,
    label: "Website cơ khí",
    desc: "Catalog kỹ thuật B2B.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn catalog",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website catalog sản phẩm giá bao nhiêu?",
      a: "Tại Bứt Phá từ 4.000.000đ (≤50 SP) đến 10.000.000đ (catalog B2B lớn). Phụ thuộc số SKU, filter và đa ngôn ngữ.",
    },
    {
      q: "Catalog web có cần giỏ hàng không?",
      a: "Không bắt buộc. B2B báo giá qua RFQ — không cần checkout. Có thể nâng cấp WooCommerce sau nếu bán lẻ.",
    },
    {
      q: "Bao nhiêu sản phẩm thì nên làm catalog web?",
      a: "Từ ~20 SP trở lên — filter/search bắt đầu có giá trị. Dưới 20 SP có thể dùng web giới thiệu + vài trang SP.",
    },
    {
      q: "Có import sản phẩm từ Excel không?",
      a: "Có — gói Pro/B2B hỗ trợ import CSV. Tiết kiệm nhập tay hàng trăm SKU.",
    },
    {
      q: "Catalog có SEO được không?",
      a: "Có — mỗi SP một URL, meta riêng, schema Product. Long-tail “[tên SP] + [ứng dụng]” mang traffic B2B.",
    },
    {
      q: "Có tải catalogue PDF trên web không?",
      a: "Nên có — khách B2B vẫn cần PDF gửi nội bộ. Web là master, PDF export hoặc upload bản mới.",
    },
    {
      q: "Bao lâu hoàn thành website catalog?",
      a: "Thường 4–8 tuần. Phụ thuộc số SKU, ảnh và cấu trúc filter.",
    },
    {
      q: "Bứt Phá có làm website catalog không?",
      a: "Có — cơ khí, vật liệu, thiết bị, nội thất… Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website catalog sản phẩm</strong> là giải pháp showcase B2B thông minh — thay PDF tĩnh bằng danh mục có filter, SEO và form báo giá, không ép doanh nghiệp làm shop online khi mô hình vẫn chốt qua sales. Ưu tiên: cấu trúc category rõ, PDP có spec đầy đủ, RFQ trên mọi trang SP và PDF tải về đồng bộ.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo số SKU và ngành của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website catalog sản phẩm",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
