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

const KEYWORD = "thiết kế website cơ khí";
const TITLE = "Thiết Kế Website Cơ Khí Chuẩn SEO Google";

export const REWRITE_THIET_KE_WEBSITE_CO_KHI = {
  title: TITLE,
  slug: "thiet-ke-website-co-khi",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website cơ khí, website sản xuất, catalog máy móc, website B2B cơ khí, thiết kế web nhà máy",
  metaTitle: "Thiết Kế Website Cơ Khí | B2B & SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website cơ khí: catalog sản phẩm, RFQ báo giá B2B, ISO, đa ngôn ngữ xuất khẩu. Schema Product, SEO ngành sản xuất. Giá 5–15 triệu. Bứt Phá.",
  description:
    "Hướng dẫn thiết kế website cơ khí chuẩn SEO: catalog kỹ thuật, form RFQ, năng lực sản xuất và tối ưu cho khách B2B/xuất khẩu.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Cơ Khí | B2B & SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "co-khi-la-gi", label: "Website cơ khí là gì?" },
  { id: "vi-sao-can", label: "Vì sao xưởng cơ khí cần web?" },
  { id: "b2b-dac-thu", label: "Đặc thù website B2B" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "catalog", label: "Catalog sản phẩm & thông số" },
  { id: "rfq-bao-gia", label: "Form RFQ & báo giá B2B" },
  { id: "nang-luc-iso", label: "Năng lực sản xuất & ISO" },
  { id: "da-ngon-ngu", label: "Đa ngôn ngữ xuất khẩu" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website cơ khí" },
  { id: "seo-san-xuat", label: "SEO ngành sản xuất" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website cơ khí</strong> là quy trình xây dựng website chuyên biệt cho xưởng cơ khí, nhà máy sản xuất và nhà cung cấp linh kiện — tập trung <em>catalog kỹ thuật</em>, form RFQ/báo giá B2B, hồ sơ năng lực ISO và đa ngôn ngữ phục vụ xuất khẩu. Khác website bán lẻ, <strong>${KEYWORD}</strong> cần thông số máy móc rõ ràng, file catalogue PDF tải về và luồng lead cho đội sales B2B.`,
    `Bài viết dành cho giám đốc nhà máy, trưởng phòng kinh doanh và marketer công nghiệp đang cần <strong>${KEYWORD}</strong>: checklist tính năng B2B, cấu trúc catalog, quy trình triển khai, giá 2026 và chiến lược SEO sản phẩm + ứng dụng ngành.`,
  ],
})}

${wpKeyTakeaways([
  "B2B cần thông số kỹ thuật, RFQ form — không chỉ ảnh đẹp.",
  "Catalog: máy móc, linh kiện, phụ tùng — filter theo ngành ứng dụng.",
  "PDF catalogue + ISO — khách xuất khẩu cần tài liệu tải về.",
  "Đa ngôn ngữ EN (tối thiểu) cho thị trường quốc tế.",
  "Bứt Phá: 5–15 triệu; tích hợp CRM/Sheet cho sales follow-up.",
])}

${wpImg(3, "Thiết kế website cơ khí với catalog sản phẩm và form báo giá B2B")}

<h2 id="co-khi-la-gi">Thiết kế website cơ khí là gì?</h2>

<p><strong>Website cơ khí</strong> là trang web thiết kế riêng cho doanh nghiệp sản xuất, gia công cơ khí — giới thiệu năng lực nhà máy, catalog sản phẩm và kênh nhận yêu cầu báo giá. <strong>Thiết kế website cơ khí</strong> thường gồm:</p>

<ul>
  <li>Catalog: máy móc, linh kiện, phụ tùng, thiết bị công nghiệp</li>
  <li>Thông số kỹ thuật chi tiết từng sản phẩm</li>
  <li>Form RFQ (Request for Quotation) / báo giá B2B</li>
  <li>Trang năng lực: dây chuyền, chứng nhận ISO, QC</li>
  <li>Catalogue PDF tải về</li>
  <li>Blog kỹ thuật — ứng dụng ngành, case study</li>
  <li>Phiên bản tiếng Anh cho xuất khẩu</li>
</ul>

<h2 id="vi-sao-can">Vì sao xưởng cơ khí cần website chuyên nghiệp?</h2>

<ul>
  <li><strong>Uy tín B2B:</strong> Khách hàng doanh nghiệp đánh giá nhà cung cấp qua web trước khi vào danh sách shortlist.</li>
  <li><strong>Xuất khẩu:</strong> Đối tác nước ngoài tìm “mechanical parts manufacturer Vietnam” — cần web EN chuẩn.</li>
  <li><strong>SEO sản phẩm:</strong> “Gia công cơ khí [tỉnh]”, “linh kiện [ngành]” — traffic organic B2B.</li>
  <li><strong>Giảm email rời rạc:</strong> Form RFQ có spec — sales báo giá nhanh hơn.</li>
  <li><strong>Tài liệu số:</strong> Catalogue PDF luôn cập nhật — không in ấn tốn kém.</li>
</ul>

<h2 id="b2b-dac-thu">Website cơ khí B2B — khác gì B2C?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">B2B cơ khí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">B2C / TMĐT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mục tiêu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">RFQ, hợp đồng dài hạn</td>
      <td class="border border-indigo-100 px-3 py-2">Mua lẻ, giỏ hàng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nội dung</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Thông số kỹ thuật, ISO, năng lực</td>
      <td class="border border-indigo-100 px-3 py-2">Giá, khuyến mãi, review</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CTA</strong></td>
      <td class="border border-indigo-100 px-3 py-2">“Yêu cầu báo giá”, tải catalogue</td>
      <td class="border border-indigo-100 px-3 py-2">“Mua ngay”, “Thêm giỏ”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Schema</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Product, Organization</td>
      <td class="border border-indigo-100 px-3 py-2">Product + Offer, review</td>
    </tr>
  </tbody>
</table>

<h2 id="tinh-nang">Tính năng website cơ khí bắt buộc</h2>

<ul>
  <li><strong>Catalog phân cấp:</strong> Danh mục → sản phẩm → thông số</li>
  <li><strong>RFQ form:</strong> Sản phẩm quan tâm, số lượng, file bản vẽ (upload)</li>
  <li><strong>PDF catalogue:</strong> Tải về theo dòng sản phẩm</li>
  <li><strong>Năng lực:</strong> Máy móc, công suất, QC, ISO 9001</li>
  <li><strong>Liên hệ sales:</strong> Phụ trách kinh doanh theo khu vực/sản phẩm</li>
  <li><strong>EN version:</strong> /en/ cho khách quốc tế</li>
  <li><strong>CRM hook:</strong> Form → Google Sheet, HubSpot, Zoho</li>
</ul>

<h2 id="catalog">Catalog sản phẩm &amp; thông số kỹ thuật</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, mỗi sản phẩm/dòng máy nên có trang riêng:</p>

<ul>
  <li>Ảnh sản phẩm, diagram kỹ thuật</li>
  <li>Bảng thông số: kích thước, vật liệu, công suất, tiêu chuẩn</li>
  <li>Ứng dụng ngành: ô tô, điện tử, nông nghiệp…</li>
  <li>CTA: “Yêu cầu báo giá sản phẩm này”</li>
  <li>Schema Product — hỗ trợ rich snippet (không hiển thị giá nếu B2B quote)</li>
</ul>

${wpImg(7, "Catalog máy móc cơ khí — thông số kỹ thuật trên website B2B")}

<h2 id="rfq-bao-gia">Form RFQ &amp; báo giá B2B</h2>

<p>Form nên thu đủ thông tin để sales báo giá sơ bộ:</p>

<ul>
  <li>Công ty, người liên hệ, email, SĐT</li>
  <li>Sản phẩm / dòng máy quan tâm</li>
  <li>Số lượng, thời hạn giao hàng</li>
  <li>Upload bản vẽ CAD/PDF (tuỳ chọn)</li>
  <li>Ghi chú kỹ thuật đặc biệt</li>
</ul>

<p>Tham khảo <a href="${SITE}/blog/thiet-ke-website-doanh-nghiep">thiết kế website doanh nghiệp</a> cho cấu trúc corporate B2B tổng quát.</p>

<h2 id="nang-luc-iso">Trang năng lực sản xuất &amp; chứng nhận ISO</h2>

<ul>
  <li>Diện tích nhà xưởng, số lao động, ca sản xuất</li>
  <li>Danh sách máy móc chính (CNC, laser, ép…)</li>
  <li>ISO 9001, ISO 14001, chứng nhận ngành</li>
  <li>Quy trình QC: IQC → IPQC → OQC</li>
  <li>Đối tác / khách hàng tiêu biểu (logo, nếu được phép)</li>
</ul>

<h2 id="da-ngon-ngu">Đa ngôn ngữ cho xuất khẩu</h2>

<ul>
  <li><strong>Tiếng Anh:</strong> Bắt buộc nếu xuất khẩu — /en/ + hreflang</li>
  <li>Dịch thuật kỹ thuật chuẩn — không dùng Google Translate thô</li>
  <li>Catalogue EN PDF đồng bộ với web</li>
  <li>Đơn vị đo lường: mm, inch — ghi rõ tiêu chuẩn</li>
</ul>

<h2 id="cau-truc">Cấu trúc website cơ khí (12–18 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> USP nhà máy, sản phẩm chủ lực, CTA RFQ.</li>
  <li><strong>Giới thiệu:</strong> Lịch sử, tầm nhìn, nhà máy.</li>
  <li><strong>Sản phẩm:</strong> Hub catalog + trang từng dòng.</li>
  <li><strong>Năng lực sản xuất:</strong> Máy móc, QC, ISO.</li>
  <li><strong>Ứng dụng ngành:</strong> Ô tô, điện tử, thực phẩm…</li>
  <li><strong>Báo giá / RFQ:</strong> Form lead chính.</li>
  <li><strong>Tải catalogue:</strong> PDF theo danh mục.</li>
  <li><strong>Blog kỹ thuật:</strong> SEO + authority.</li>
  <li><strong>Tuyển dụng:</strong> (tuỳ chọn)</li>
  <li><strong>Liên hệ:</strong> Văn phòng, nhà máy, Maps.</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website cơ khí — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Dòng sản phẩm, thị trường (nội địa/xuất khẩu), đối thủ.</li>
  <li><strong>Sitemap catalog:</strong> Phân cấp danh mục kỹ thuật.</li>
  <li><strong>UI design:</strong> Tone công nghiệp, chuyên nghiệp — dễ đọc spec.</li>
  <li><strong>Lập trình:</strong> Catalog, RFQ upload, PDF, đa ngôn ngữ.</li>
  <li><strong>Nội dung:</strong> Spec từng sản phẩm — có thể hỗ trợ nhập liệu.</li>
  <li><strong>SEO:</strong> Từ khóa sản phẩm + ứng dụng, schema Product.</li>
  <li><strong>Go-live:</strong> Kết nối CRM, đào tạo sales nhận lead.</li>
</ol>

<p><strong>Thời gian:</strong> 6–10 tuần tùy số SKU catalog và đa ngôn ngữ.</p>

<h2 id="bang-gia">Bảng giá thiết kế website cơ khí 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Xưởng nhỏ, 8–10 trang, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Catalog</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Catalog 30+ SP, RFQ, PDF tải về</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>B2B Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">EN, ISO page, blog kỹ thuật, CRM</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Đa nhà máy, đa ngôn ngữ, ERP hook (báo giá thêm)</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-san-xuat">SEO cho ngành sản xuất &amp; cơ khí</h2>

<ul>
  <li><strong>Từ khóa:</strong> “gia công cơ khí [tỉnh]”, “linh kiện [sản phẩm]”, “nhà máy [ngành]”</li>
  <li><strong>Trang danh mục unique:</strong> Mô tả riêng — không duplicate template</li>
  <li><strong>Schema Product:</strong> name, description, image, brand</li>
  <li><strong>Blog:</strong> “Ứng dụng [linh kiện] trong ngành [X]” — long-tail</li>
  <li><strong>Case study:</strong> Dự án B2B có tên khách (nếu được phép)</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-cong-ty-xay-dung">thiết kế website công ty xây dựng</a> cho mô hình portfolio B2B tương tự.</p>

<h2 id="sai-lam">Sai lầm khi làm website cơ khí</h2>

<ul>
  <li>Catalog chỉ có ảnh — thiếu thông số kỹ thuật</li>
  <li>Không có form RFQ — khách phải email, mất lead</li>
  <li>Web chỉ tiếng Việt — mất khách xuất khẩu</li>
  <li>PDF catalogue cũ — không khớp sản phẩm trên web</li>
  <li>Copy sản phẩm giống đối thủ — SEO duplicate, không rank</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "B2B corporate tổng quát.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty`,
    label: "Website công ty",
    desc: "Giới thiệu & thương hiệu.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty-xay-dung`,
    label: "Website xây dựng",
    desc: "Portfolio công trình B2B.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình tổng quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website cơ khí",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website cơ khí giá bao nhiêu?",
      a: "Tại Bứt Phá từ 5.000.000đ (giới thiệu) đến 15.000.000đ+ (enterprise). Catalog lớn báo giá thêm.",
    },
    {
      q: "Website cơ khí B2B cần gì đặc biệt?",
      a: "Thông số kỹ thuật rõ, file tải về, form RFQ và liên hệ phụ trách kinh doanh.",
    },
    {
      q: "SEO cho ngành sản xuất thế nào?",
      a: "Từ khóa sản phẩm + ứng dụng, schema Product và trang danh mục nội dung unique.",
    },
    {
      q: "Có tích hợp CRM không?",
      a: "Có — form kết nối HubSpot, Zoho hoặc Google Sheet để sales follow-up nhanh.",
    },
    {
      q: "Xưởng nhỏ 20 người có cần web không?",
      a: "Nên có — catalog + RFQ giúp chuyên nghiệp hơn khi chào khách B2B.",
    },
    {
      q: "Có cần tiếng Anh không?",
      a: "Bắt buộc nếu xuất khẩu — đối tác nước ngoài tìm supplier qua Google EN.",
    },
    {
      q: "Làm web cơ khí mất bao lâu?",
      a: "6–10 tuần tùy số sản phẩm catalog và đa ngôn ngữ.",
    },
    {
      q: "Bứt Phá có làm website cơ khí không?",
      a: "Có — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website cơ khí</strong> là đầu tư kênh B2B và xuất khẩu — với catalog kỹ thuật chuẩn, form RFQ thông minh và SEO sản phẩm theo ngành ứng dụng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — từ xưởng gia công đến nhà máy đa dây chuyền.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website cơ khí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
