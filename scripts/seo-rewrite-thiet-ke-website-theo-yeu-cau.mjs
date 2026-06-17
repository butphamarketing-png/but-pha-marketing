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

const KEYWORD = "thiết kế website theo yêu cầu";
const TITLE = "Thiết Kế Website Theo Yêu Cầu Cho Từng Mô Hình Kinh Doanh";

export const REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU = {
  title: TITLE,
  slug: "thiet-ke-website-theo-yeu-cau",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website tùy chỉnh, web theo mô hình kinh doanh, làm website custom, thiết kế web riêng",
  metaTitle: "Thiết Kế Website Theo Yêu Cầu | Từng Mô Hình Kinh Doanh | Bứt Phá",
  metaDescription:
    "Thiết kế website theo yêu cầu: phân tích mô hình kinh doanh, tính năng custom, quy trình workshop, bảng giá và so sánh template. Tư vấn miễn phí TP.HCM.",
  description:
    "Hướng dẫn thiết kế website theo yêu cầu cho từng mô hình kinh doanh — dịch vụ, sản xuất, giáo dục, B2B — thay vì template một kiểu cho mọi ngành.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Theo Yêu Cầu | Từng Mô Hình Kinh Doanh | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "theo-yeu-cau-la-gi", label: "Website theo yêu cầu là gì?" },
  { id: "khac-template", label: "Khác gì template & theme có sẵn?" },
  { id: "ai-nen-dung", label: "Ai nên chọn web theo yêu cầu?" },
  { id: "mo-hinh-dich-vu", label: "Mô hình dịch vụ & B2B" },
  { id: "mo-hinh-san-xuat", label: "Mô hình sản xuất & phân phối" },
  { id: "mo-hinh-giao-duc", label: "Giáo dục, y tế, pháp lý" },
  { id: "tinh-nang-tuy-chinh", label: "Tính năng tùy chỉnh phổ biến" },
  { id: "quy-trinh", label: "Quy trình triển khai 6 giai đoạn" },
  { id: "bang-gia", label: "Chi phí website theo yêu cầu" },
  { id: "checklist-brief", label: "Checklist brief dự án" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là cách xây dựng website “may đo” — giao diện, cấu trúc trang, luồng chức năng và tích hợp hệ thống — bám sát mô hình kinh doanh cụ thể của bạn, thay vì ép doanh nghiệp vào một theme WordPress giống hàng trăm đối thủ. Spa cần đặt lịch, nhà thầu cần gallery dự án + form báo giá, trường học cần đăng ký khóa — mỗi ngành một hành trình khách khác nhau.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: giải thích khi nào nên custom thay vì gói template, website cần gì cho từng mô hình (dịch vụ, sản xuất, giáo dục, y tế–pháp lý), quy trình làm việc minh bạch và mức chi phí thực tế. Phù hợp chủ doanh nghiệp có quy trình riêng, nhiều chi nhánh hoặc cần tích hợp CRM/ERP.`,
  ],
})}

${wpKeyTakeaways([
  "Website theo yêu cầu = UI + tính năng + tích hợp khớp workflow nội bộ, không chỉ đổi màu theme.",
  "Nên chọn khi: B2B báo giá động, booking, portal khách, đa chi nhánh, API phần mềm sẵn có.",
  "Template phù hợp MVP ngân sách thấp; custom tiết kiệm chi phí sửa khi scale 12–24 tháng.",
  "Quy trình chuẩn: Workshop → Wireframe → UI → Dev → UAT → Bàn giao (4–10 tuần).",
  "Gói Hệ thống (12 triệu) Bứt Phá là điểm khởi đầu cho web tùy chỉnh nhiều tính năng.",
])}

${wpImg(3, "Thiết kế website theo yêu cầu cho từng mô hình kinh doanh")}

<h2 id="theo-yeu-cau-la-gi">Thiết kế website theo yêu cầu là gì?</h2>

<p><strong>Website theo yêu cầu</strong> (custom web design &amp; development) bắt đầu từ câu hỏi: <em>Doanh nghiệp bạn bán gì, cho ai, khách cần làm gì trên web?</em> — rồi mới thiết kế sitemap, wireframe và code. Không phải chọn theme đẹp rồi nhét logo vào.</p>

<p>Một dự án <strong>${KEYWORD}</strong> thường gồm:</p>
<ul>
  <li><strong>Khảo sát &amp; phân tích:</strong> Mô hình kinh doanh, đối thủ, KPI (lead, đơn, booking).</li>
  <li><strong>UX/UI riêng:</strong> Bố cục, màu sắc, component theo brand guideline.</li>
  <li><strong>Phát triển tính năng:</strong> Form đặc thù, calculator báo giá, đặt lịch, đăng nhập khách hàng.</li>
  <li><strong>Tích hợp:</strong> CRM, Zalo OA, email marketing, kế toán, cổng thanh toán.</li>
  <li><strong>SEO &amp; bàn giao:</strong> On-page, tài liệu vận hành, đào tạo admin.</li>
</ul>

<h2 id="khac-template">Khác gì template và theme có sẵn?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Template / theme</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website theo yêu cầu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Thời gian</td>
      <td class="border border-indigo-100 px-3 py-2">1–3 tuần</td>
      <td class="border border-indigo-100 px-3 py-2">4–10 tuần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chi phí ban đầu</td>
      <td class="border border-indigo-100 px-3 py-2">Thấp hơn</td>
      <td class="border border-indigo-100 px-3 py-2">Cao hơn 1,5–3 lần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Giao diện</td>
      <td class="border border-indigo-100 px-3 py-2">Trùng đối thủ dùng cùng theme</td>
      <td class="border border-indigo-100 px-3 py-2">Độc quyền theo thương hiệu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tính năng</td>
      <td class="border border-indigo-100 px-3 py-2">Giới hạn plugin</td>
      <td class="border border-indigo-100 px-3 py-2">Code theo spec</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Mở rộng dài hạn</td>
      <td class="border border-indigo-100 px-3 py-2">Dễ “vỡ” khi plugin conflict</td>
      <td class="border border-indigo-100 px-3 py-2">Kiến trúc chủ đích</td>
    </tr>
  </tbody>
</table>

<p>Template không xấu — nhưng khi quy trình kinh doanh đã phức tạp, <strong>${KEYWORD}</strong> thường rẻ hơn về tổng chi phí sở hữu (TCO) trong 2–3 năm vì ít phải làm lại.</p>

<h2 id="ai-nen-dung">Ai nên đầu tư website theo yêu cầu?</h2>

<p>Phù hợp khi bạn thuộc một hoặc nhiều nhóm sau:</p>
<ul>
  <li>Doanh nghiệp B2B: báo giá theo thông số, hồ sơ năng lực, nhiều dòng sản phẩm</li>
  <li>Chuỗi spa, clinic, nha khoa: đặt lịch, chọn chi nhánh, nhắc lịch</li>
  <li>Startup cần MVP: validate ý tưởng nhưng vẫn chuẩn SEO và scale được</li>
  <li>Công ty có phần mềm nội bộ: cần API đồng bộ lead, đơn hàng, tồn kho</li>
  <li>Thương hiệu cao cấp: trải nghiệm web là phần của brand, không chấp nhận “giống template”</li>
</ul>

<p>Chưa cần custom nếu: shop nhỏ, catalog đơn giản, ngân sách giai đoạn đầu rất hạn chế — có thể bắt đầu gói <a href="${SITE}/blog/thiet-ke-website-doanh-nghiep">website doanh nghiệp</a> rồi nâng cấp sau.</p>

${wpImg(0, "So sánh website template và thiết kế theo yêu cầu")}

<h2 id="mo-hinh-dich-vu">Thiết kế website theo yêu cầu — mô hình dịch vụ &amp; B2B</h2>

<p>Ngành dịch vụ (marketing, xây dựng, logistics, tư vấn…) bán <em>niềm tin và quy trình</em>. Website cần:</p>

<h3>Trang &amp; tính năng đặc thù</h3>
<ul>
  <li><strong>Case study / dự án:</strong> Filter theo ngành, quy mô, kết quả KPI</li>
  <li><strong>Form báo giá động:</strong> Khách chọn gói, số lượng → ước tính sơ bộ hoặc gửi brief</li>
  <li><strong>Hồ sơ năng lực:</strong> Tải PDF, video giới thiệu, chứng chỉ ISO</li>
  <li><strong>Booking tư vấn:</strong> Chọn khung giờ, tích hợp Google Calendar</li>
  <li><strong>Multi-step form:</strong> Thu thập thông tin B2B mà không làm form một cục dài</li>
</ul>

<h3>KPI đo lường</h3>
<p>Số lead chất lượng, cost per lead từ organic/ads, tỷ lệ form hoàn thành. <strong>${KEYWORD}</strong> cho B2B ưu tiên lead qualification hơn giỏ hàng.</p>

<h2 id="mo-hinh-san-xuat">Mô hình sản xuất, phân phối &amp; TMĐT</h2>

<p>Nhà máy, đại lý, thương hiệu FMCG cần web khác dịch vụ thuần:</p>
<ul>
  <li><strong>Catalog sản phẩm:</strong> SKU nhiều, filter thông số kỹ thuật, tải catalogue PDF</li>
  <li><strong>Tuyển đại lý / đối tác:</strong> Form đăng ký, khu vực tải tài liệu bán hàng</li>
  <li><strong>B2B order:</strong> Đăng nhập đại lý, giá theo cấp, đơn số lượng lớn</li>
  <li><strong>TMĐT D2C:</strong> Kết hợp bài <a href="${SITE}/blog/thiet-ke-website-ban-hang">thiết kế website bán hàng</a> — giỏ, checkout, đồng bộ tồn kho</li>
</ul>

<p>Tích hợp ERP/Misa/KiotViet thường nằm trong phạm vi <strong>${KEYWORD}</strong> gói Hệ thống.</p>

${wpImg(2, "Website theo yêu cầu cho mô hình sản xuất và B2B")}

<h2 id="mo-hinh-giao-duc">Giáo dục, y tế, pháp lý — yêu cầu đặc biệt</h2>

<h3>Giáo dục &amp; đào tạo</h3>
<ul>
  <li>Trang khóa học, lịch khai giảng, đăng ký online</li>
  <li>LMS nhẹ: video, quiz, cấp chứng chỉ (tùy quy mô)</li>
  <li>SEO theo từ khóa “khóa học + chủ đề”</li>
</ul>

<h3>Y tế, spa, thẩm mỹ</h3>
<ul>
  <li>Đặt lịch theo bác sĩ / chi nhánh / dịch vụ</li>
  <li>Nội dung tuân thủ quảng cáo ngành y (tránh claim sai)</li>
  <li>Form bảo mật thông tin bệnh nhân</li>
</ul>

<h3>Pháp lý, tài chính</h3>
<ul>
  <li>Tone trang trang trọng, thông tin pháp lý rõ</li>
  <li>Form tư vấn có disclaimer, mã hóa SSL bắt buộc</li>
  <li>Case study dạng “lĩnh vực xử lý” không tiết lộ danh tính khách</li>
</ul>

<blockquote><p>Mỗi ngành có <em>compliance</em> riêng — đó là lý do <strong>${KEYWORD}</strong> cần workshop kỹ trước khi vẽ wireframe, không copy web ngành khác.</p></blockquote>

<h2 id="tinh-nang-tuy-chinh">Tính năng tùy chỉnh phổ biến khi thiết kế theo yêu cầu</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Use case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Đặt lịch / booking</td>
      <td class="border border-indigo-100 px-3 py-2">Spa, nha khoa, tư vấn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Calculator báo giá</td>
      <td class="border border-indigo-100 px-3 py-2">In ấn, xây dựng, logistics</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Portal khách hàng</td>
      <td class="border border-indigo-100 px-3 py-2">Theo dõi đơn, tài liệu, ticket</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Đa ngôn ngữ</td>
      <td class="border border-indigo-100 px-3 py-2">Xuất khẩu, du học, khách nước ngoài</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">API / webhook</td>
      <td class="border border-indigo-100 px-3 py-2">CRM, ERP, automation n8n/Zapier</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Phân quyền admin</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều chi nhánh, nhiều editor</td>
    </tr>
  </tbody>
</table>

${wpImg(1, "Tính năng tùy chỉnh trong thiết kế website theo yêu cầu")}

<h2 id="quy-trinh">Quy trình triển khai website theo yêu cầu (6 giai đoạn)</h2>

<ol>
  <li><strong>Workshop &amp; brief:</strong> 1–2 buổi làm rõ mô hình, user story, KPI, tích hợp cần có.</li>
  <li><strong>Sitemap &amp; wireframe:</strong> Phác thảo từng trang và luồng — duyệt trước khi design màu.</li>
  <li><strong>UI design:</strong> Mockup desktop + mobile theo brand; 2–3 vòng chỉnh sửa.</li>
  <li><strong>Development:</strong> Frontend + backend + tích hợp API; sprint ngắn, demo định kỳ.</li>
  <li><strong>UAT (User Acceptance Test):</strong> Khách test trên staging — checklist tính năng.</li>
  <li><strong>Go-live &amp; handover:</strong> Deploy, SSL, SEO on-page, tài liệu + đào tạo admin.</li>
</ol>

<p>Minh bạch milestone giúp tránh “làm xong không giống ý”. Hợp đồng nên ghi rõ phạm vi tính năng (scope) — thêm tính năng ngoài scope tính phí change request.</p>

<h2 id="bang-gia">Chi phí thiết kế website theo yêu cầu</h2>

<p>Giá <strong>${KEYWORD}</strong> phụ thuộc số tính năng custom, không chỉ số trang:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mức tùy chỉnh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">UI chuyên nghiệp, ít tính năng đặc biệt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Kinh doanh</td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế độc quyền, CRM, chatbot, CRO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">API, automation, đa tính năng — <em>theo yêu cầu</em></td>
    </tr>
  </tbody>
</table>

<p>Dự án phức tạp (LMS, portal B2B, đa ngôn ngữ) báo giá riêng sau khảo sát. Xem khung tại <a href="${SITE}/website">dịch vụ website</a> hoặc bài <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="checklist-brief">Checklist brief trước khi bắt đầu dự án custom</h2>

<ol>
  <li>☐ Mô tả mô hình kinh doanh &amp; đối tượng khách trong 1 trang</li>
  <li>☐ Liệt kê tính năng bắt buộc vs “nice to have”</li>
  <li>☐ Phần mềm cần tích hợp (CRM, kế toán, chat…)</li>
  <li>☐ 3–5 website đối thủ thích / không thích và lý do</li>
  <li>☐ Brand assets: logo vector, màu, font, ảnh sản phẩm/dự án</li>
  <li>☐ KPI sau 6 tháng: lead, đơn, booking?</li>
  <li>☐ Ngân sách &amp; deadline launch (sự kiện, mùa cao điểm)</li>
  <li>☐ Ai duyệt nội dung &amp; design phía công ty bạn?</li>
</ol>

<p>Brief càng rõ, <strong>${KEYWORD}</strong> càng ít phát sinh và đúng deadline.</p>

${wpImg(4, "Quy trình và brief thiết kế website theo yêu cầu")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan, giá và quy trình làm web.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Corporate web trước khi nâng cấp custom.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Yếu tố ảnh hưởng chi phí custom.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn dự án custom",
    desc: "Workshop miễn phí — Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website theo yêu cầu mất bao lâu?",
      a: "4–10 tuần tùy số tính năng và vòng duyệt. MVP đơn giản có thể 4 tuần; portal B2B + API có thể 8–12 tuần.",
    },
    {
      q: "Chi phí cao hơn template bao nhiêu?",
      a: "Thường gấp 1,5–3 lần gói template tương đương. Đổi lại ít phải làm lại khi scale và không trùng giao diện đối thủ.",
    },
    {
      q: "Có thể nâng cấp từ website cũ lên custom?",
      a: "Có. Cần audit kỹ thuật trước — đôi khi refactor từng phần; đôi khi rebuild sạch hiệu quả hơn giữ code cũ.",
    },
    {
      q: "WordPress có làm được web theo yêu cầu không?",
      a: "Có — custom theme + plugin hoặc headless WordPress. Dự án phức tạp có thể chọn Next.js/React để tốc độ và linh hoạt hơn.",
    },
    {
      q: "Tôi có sở hữu source code không?",
      a: "Cần ghi trong hợp đồng. Thông thường khách sở hữu code sau thanh toán đủ — tránh lock-in nhà cung cấp.",
    },
    {
      q: "Làm sao tránh phát sinh chi phí khi làm custom?",
      a: "Brief rõ scope, hợp đồng liệt kê tính năng, giới hạn vòng sửa design. Mọi thay đổi ngoài scope = change request có báo giá.",
    },
    {
      q: "Web theo yêu cầu có chuẩn SEO không?",
      a: "Có — nên tích hợp SEO on-page từ đầu. Xem thêm bài thiết kế website chuẩn SEO cho checklist kỹ thuật.",
    },
    {
      q: "Bứt Phá có làm web theo yêu cầu cho ngành tôi không?",
      a: "Có — spa, xây dựng, logistics, giáo dục, TMĐT… Khảo sát miễn phí qua Zalo/hotline để chốt phạm vi và báo giá.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là lựa chọn đúng khi mô hình kinh doanh không vừa khung template — bạn cần tính năng, tích hợp và trải nghiệm khớp cách vận hành thật. Đầu tư workshop và brief kỹ từ đầu giúp web ra đúng ý, đúng hạn và dễ scale khi doanh nghiệp lớn thêm.`,
    `Bước tiếp theo: chuẩn bị checklist brief trong bài, liệt kê tính năng bắt buộc và book buổi tư vấn — đừng bắt đầu bằng chọn màu khi chưa rõ khách cần làm gì trên website.`,
  ],
  ctaLabel: "→ Đặt lịch workshop thiết kế website theo yêu cầu",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
