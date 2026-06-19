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

const KEYWORD = "thiết kế website hồ sơ năng lực";
const TITLE = "Thiết Kế Website Hồ Sơ Năng Lực Cho Nhà Thầu Và Agency";

export const REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC = {
  title: TITLE,
  slug: "thiet-ke-website-ho-so-nang-luc",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website hồ sơ năng lực, HSNL online, hồ sơ năng lực nhà thầu, website năng lực doanh nghiệp, capability statement website",
  metaTitle: "Thiết Kế Website Hồ Sơ Năng Lực | B2B & SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website hồ sơ năng lực: giấy phép, máy móc, dự án tiêu biểu, PDF tải về và SEO B2B. Quy trình 7 bước, giá 4–12 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website hồ sơ năng lực cho nhà thầu và agency: HSNL trực tuyến thuyết phục khách B2B, tender và procurement.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Hồ Sơ Năng Lực | B2B & SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "hsnl-la-gi", label: "Website HSNL là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần HSNL online?" },
  { id: "doi-tuong", label: "Ai cần website HSNL?" },
  { id: "noi-dung", label: "Nội dung HSNL bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "pdf-vs-web", label: "PDF vs website HSNL" },
  { id: "tender", label: "HSNL & đấu thầu" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "seo", label: "SEO B2B & uy tín" },
  { id: "chon-doi-tac", label: "Chọn đối tác" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website hồ sơ năng lực</strong> (HSNL online) là quy trình xây dựng website chuyên biệt cho nhà thầu, agency, nhà cung cấp B2B — trình bày <em>giấy phép, máy móc, nhân sự, dự án tiêu biểu và chứng chỉ</em> theo chuẩn procurement, thay file PDF 80 trang khó cập nhật. Khác website giới thiệu chung chung, <strong>${KEYWORD}</strong> trả lời câu hỏi của chủ đầu tư và bộ phận mua hàng: “Công ty này có đủ năng lực thực hiện hợp đồng không?”`,
    `Bài viết dành cho giám đốc nhà thầu, trưởng phòng kinh doanh B2B và agency đang cần <strong>${KEYWORD}</strong>: checklist nội dung HSNL theo chuẩn tender, cấu trúc trang, kết hợp PDF tải về, quy trình triển khai, giá 2026 và chiến lược SEO “nhà thầu / agency + ngành + khu vực”.`,
  ],
})}

${wpKeyTakeaways([
  "HSNL web = năng lực minh bạch 24/7 — procurement xem trước khi mời chào giá.",
  "Bắt buộc: giấy phép, ISO/chứng chỉ, máy móc, nhân sự chủ chốt, dự án tham chiếu.",
  "PDF tải về vẫn cần — web là bản live luôn cập nhật, PDF là bản gửi tender.",
  "B2B cần depth: số liệu, timeline dự án, quy mô hợp đồng — không chỉ ảnh đẹp.",
  "Bứt Phá: gói HSNL 4–12 triệu; tích hợp form RFQ và khu vực tài liệu tải về.",
])}

${wpImg(7, "Thiết kế website hồ sơ năng lực cho nhà thầu và agency B2B")}

<h2 id="hsnl-la-gi">Website hồ sơ năng lực (HSNL) là gì?</h2>

<p><strong>Hồ sơ năng lực</strong> (Company Profile / Capability Statement) là tài liệu chứng minh doanh nghiệp có đủ năng lực pháp lý, tài chính, kỹ thuật và kinh nghiệm để thực hiện hợp đồng. <strong>Website hồ sơ năng lực</strong> chuyển nội dung đó lên web — có cấu trúc, tìm kiếm nội bộ, cập nhật realtime và link gửi cho khách trong một dòng.</p>

<p><strong>Thiết kế website hồ sơ năng lực</strong> thường gồm các module:</p>

<ul>
  <li><strong>Thông tin pháp lý:</strong> ĐKKD, MST, vốn điều lệ, người đại diện</li>
  <li><strong>Giấy phép ngành:</strong> Xây dựng hạng I/II/III, ISO, an toàn lao động…</li>
  <li><strong>Năng lực kỹ thuật:</strong> Máy móc, thiết bị, nhà xưởng, công suất</li>
  <li><strong>Nhân sự chủ chốt:</strong> Kỹ sư trưởng, PM, chứng chỉ hành nghề</li>
  <li><strong>Dự án tiêu biểu:</strong> Quy mô, giá trị, thời gian, chủ đầu tư (có phép)</li>
  <li><strong>Tài liệu tải về:</strong> PDF HSNL, catalog, bảng giá tham khảo</li>
</ul>

<h2 id="vi-sao-can">Vì sao nhà thầu &amp; agency cần HSNL online?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tình huống B2B</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Lợi ích website HSNL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chủ đầu tư shortlist nhà thầu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Link HSNL — procurement đánh giá nhanh trước mời chào giá</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đấu thầu / mời thầu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">PDF cập nhật từ web — luôn đúng giấy phép mới nhất</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Agency pitch khách hàng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Case study + team — thuyết phục hơn slide PowerPoint cũ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nhà cung cấp vào chuỗi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Minh bạch ISO, capacity — điều kiện vendor qualification</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO khách chủ động tìm</strong></td>
      <td class="border border-indigo-100 px-3 py-2">“Nhà thầu [hạng mục] [tỉnh]” — lead chất lượng</td>
    </tr>
  </tbody>
</table>

<p><strong>${KEYWORD}</strong> giảm vòng email “gửi em file HSNL” lặp đi lặp lại — sales gửi một URL, khách tự xem đúng phần cần.</p>

<h2 id="doi-tuong">Ai nên đầu tư website hồ sơ năng lực?</h2>

<ul>
  <li><strong>Nhà thầu xây dựng, M&amp;E, nội thất:</strong> Giấy phép hạng, công trình tham chiếu — xem thêm <a href="${SITE}/blog/thiet-ke-website-cong-ty-xay-dung">website công ty xây dựng</a></li>
  <li><strong>Agency marketing, IT, thiết kế:</strong> Portfolio + quy trình + team — pitch B2B</li>
  <li><strong>Nhà cung cấp cơ khí, logistics, vật tư:</strong> Catalog kỹ thuật + ISO + capacity</li>
  <li><strong>Tư vấn pháp lý, kiểm toán, đào tạo:</strong> Chứng chỉ hành nghề + case ngành</li>
  <li><strong>Đơn vị thi công điện, PCCC, an ninh:</strong> Giấy phép chuyên ngành bắt buộc</li>
</ul>

<p>SME vẫn cần HSNL web dù chưa đấu thầu lớn — khách B2B luôn so sánh 3–5 đơn vị trước khi ký.</p>

<h2 id="noi-dung">Nội dung hồ sơ năng lực bắt buộc trên website</h2>

<h3>1. Thông tin doanh nghiệp &amp; pháp lý</h3>
<ul>
  <li>Tên công ty đầy đủ, MST, địa chỉ trụ sở (khớp ĐKKD)</li>
  <li>Người đại diện pháp luật, vốn điều lệ (nếu tender yêu cầu)</li>
  <li>Chi nhánh, văn phòng đại diện — bản đồ embed</li>
</ul>

<h3>2. Giấy phép &amp; chứng nhận</h3>
<ul>
  <li>Giấy phép kinh doanh ngành có điều kiện</li>
  <li>ISO 9001, 14001, 45001 — ảnh scan + ngày hết hạn</li>
  <li>Chứng chỉ hành nghề kỹ sư, kiến trúc sư (nếu có)</li>
  <li>Giải thưởng, bằng khen — có nguồn xác minh</li>
</ul>

<h3>3. Năng lực kỹ thuật &amp; máy móc</h3>
<ul>
  <li>Danh sách thiết bị: tên, model, số lượng, năm sản xuất</li>
  <li>Nhà xưởng, diện tích, công suất sản xuất/thi công</li>
  <li>Quy trình QA/QC — sơ đồ hoặc mô tả ngắn</li>
</ul>

<h3>4. Nhân sự chủ chốt</h3>
<ul>
  <li>Org chart — sơ đồ tổ chức</li>
  <li>Profile PM, kỹ sư trưởng: học vấn, kinh nghiệm, dự án đã làm</li>
  <li>Số lao động theo chuyên môn (kỹ sư, công nhân lành nghề…)</li>
</ul>

<h3>5. Dự án / hợp đồng tiêu biểu</h3>
<p>Format chuẩn procurement:</p>
<ul>
  <li>Tên dự án + chủ đầu tư (hoặc mã ẩn danh nếu NDA)</li>
  <li>Quy mô: diện tích, giá trị hợp đồng, thời gian thực hiện</li>
  <li>Vai trò: tổng thầu, phụ, tư vấn thiết kế…</li>
  <li>Ảnh hiện trường, biên bản nghiệm thu (có phép)</li>
</ul>

${wpImg(8, "Nội dung website hồ sơ năng lực — dự án tiêu biểu và chứng chỉ")}

<h2 id="cau-truc">Cấu trúc trang website HSNL chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Tóm tắt năng lực + số liệu (X dự án, Y năm kinh nghiệm) + CTA tải HSNL PDF.</li>
  <li><strong>Giới thiệu công ty:</strong> Lịch sử, tầm nhìn, org chart.</li>
  <li><strong>Giấy phép &amp; chứng nhận:</strong> Gallery scan + ngày hiệu lực.</li>
  <li><strong>Năng lực kỹ thuật:</strong> Máy móc, nhà xưởng, quy trình.</li>
  <li><strong>Đội ngũ:</strong> Profile nhân sự chủ chốt.</li>
  <li><strong>Dự án tiêu biểu:</strong> Filter theo loại hình / năm / quy mô.</li>
  <li><strong>Tài liệu:</strong> PDF HSNL, catalog, bảng giá — download có form (tùy chọn).</li>
  <li><strong>Liên hệ / RFQ:</strong> Form yêu cầu báo giá — thu thông tin dự án.</li>
</ol>

<p>Website HSNL B2B thường <strong>10–20 trang</strong> — nhiều hơn web giới thiệu SME vì depth of content.</p>

<h2 id="pdf-vs-web">PDF HSNL vs website — dùng song song thế nào?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">PDF HSNL</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website HSNL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Gửi kèm hồ sơ thầu, email chính thức</td>
      <td class="border border-indigo-100 px-3 py-2">Link xem nhanh — cập nhật không cần in lại</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Offline, in ấn họp</td>
      <td class="border border-indigo-100 px-3 py-2">SEO Google, analytics ai đã xem</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Dễ lỗi thời (giấy phép hết hạn)</td>
      <td class="border border-indigo-100 px-3 py-2">Sửa online → export PDF mới</td>
    </tr>
  </tbody>
</table>

<p>Mô hình tốt: <strong>Website = master data</strong> → nút “Tải HSNL PDF” generate từ nội dung web hoặc upload bản mới nhất.</p>

<h2 id="tender">Website HSNL &amp; quy trình đấu thầu</h2>

<p>Khi tham gia tender, bộ phận mua hàng thường đánh giá:</p>
<ol>
  <li>Đủ điều kiện pháp lý (giấy phép, không vi phạm)</li>
  <li>Kinh nghiệm dự án tương tự (reference project)</li>
  <li>Năng lực kỹ thuật &amp; nhân sự</li>
  <li>Tài chính (báo cáo, bảo lãnh — thường gửi riêng)</li>
</ol>

<p><strong>${KEYWORD}</strong> hỗ trợ bước 1–3 công khai — giảm email hỏi đáp. Một số công ty thêm <em>khu vực thành viên</em> (password) cho tài liệu nhạy cảm: báo cáo tài chính, hợp đồng mẫu.</p>

<p>Agency pitch: trang HSNL web thay slide 40 trang — khách xem trước meeting, meeting tập trung Q&amp;A.</p>

<h2 id="quy-trinh">Quy trình thiết kế website hồ sơ năng lực — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Chuẩn HSNL ngành (xây dựng, agency, cơ khí…), tài liệu có sẵn, đối tượng khách B2B.</li>
  <li><strong>Sitemap:</strong> Chốt module — giấy phép, máy móc, dự án, download.</li>
  <li><strong>Wireframe:</strong> Bố cục bảng dự án, timeline chứng chỉ — duyệt trước design.</li>
  <li><strong>UI design:</strong> Corporate B2B — rõ ràng, ít animation, dễ in/export.</li>
  <li><strong>Lập trình:</strong> CMS quản lý dự án + chứng chỉ; form RFQ; PDF download.</li>
  <li><strong>Nhập liệu:</strong> Scan giấy phép, profile nhân sự, 10–20 dự án tiêu biểu.</li>
  <li><strong>SEO &amp; go-live:</strong> Schema Organization, internal link, đào tạo cập nhật dự án mới.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần — phụ thuộc khối lượng dự án và scan tài liệu.</p>

<h2 id="bang-gia">Bảng giá thiết kế website hồ sơ năng lực 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>HSNL cơ bản</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">8–10 trang, PDF tải về, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>HSNL chuẩn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">15 trang, filter dự án, CMS cập nhật, SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>HSNL Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa ngôn ngữ, RFQ form, khu vực tài liệu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>HSNL Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Portal khách hàng, phân quyền, tích hợp ERP</td>
    </tr>
  </tbody>
</table>

<p>So sánh: <a href="${SITE}/blog/thiet-ke-website-gioi-thieu-cong-ty">website giới thiệu công ty</a> (brochure) vs HSNL (năng lực tender) — HSNL sâu hơn về pháp lý, máy móc, dự án.</p>

<h2 id="seo">SEO B2B &amp; uy tín cho website HSNL</h2>

<ul>
  <li><strong>Từ khóa:</strong> “nhà thầu [hạng mục] [tỉnh]”, “agency [dịch vụ] uy tín”, “công ty [ngành] có ISO”.</li>
  <li><strong>Trang dự án riêng:</strong> Mỗi công trình một URL — long-tail SEO.</li>
  <li><strong>Schema:</strong> Organization, ProfessionalService — rich snippet.</li>
  <li><strong>E-E-A-T:</strong> Profile nhân sự thật, chứng chỉ có ngày, dự án có số liệu.</li>
  <li><strong>Internal link:</strong> HSNL ↔ dịch vụ ↔ blog kỹ thuật.</li>
</ul>

<h2 id="chon-doi-tac">Chọn đối tác thiết kế website HSNL</h2>

<ul>
  <li>Kinh nghiệm web B2B / nhà thầu — hiểu cấu trúc HSNL ngành bạn</li>
  <li>CMS dễ thêm dự án mới sau mỗi hợp đồng — không phụ thuộc agency mãi</li>
  <li>Hỗ trợ nhập liệu scan giấy phép — bottleneck thường gặp</li>
  <li>Bảo mật khu vực tài liệu nhạy cảm (nếu cần)</li>
  <li>Export PDF đồng bộ với web</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website hồ sơ năng lực</h2>

<ul>
  <li>Chỉ upload PDF 100 trang — không SEO, mobile khó đọc.</li>
  <li>Giấy phép hết hạn vẫn hiển thị — mất uy tín tender.</li>
  <li>Dự án tiêu biểu không có số liệu — chỉ ảnh chung chung.</li>
  <li>Thiếu MST, địa chỉ — procurement nghi ngờ ngay.</li>
  <li>Web đẹp nhưng không có form RFQ — khách xem xong không liên hệ.</li>
  <li>Copy HSNL đối thủ — rủi ro pháp lý và SEO duplicate.</li>
  <li>Không cập nhật 2–3 năm — dự án cũ, nhân sự đã nghỉ.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-gioi-thieu-cong-ty`,
    label: "Website giới thiệu công ty",
    desc: "Brochure online cho SME.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty-xay-dung`,
    label: "Website công ty xây dựng",
    desc: "Portfolio + HSNL nhà thầu.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-co-khi`,
    label: "Website cơ khí B2B",
    desc: "Catalog kỹ thuật + RFQ.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký tư vấn HSNL",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website hồ sơ năng lực giá bao nhiêu?",
      a: "Tại Bứt Phá từ 4.000.000đ (HSNL cơ bản) đến 12.000.000đ+ (enterprise). Phụ thuộc số trang, số dự án và tính năng đa ngôn ngữ/portal.",
    },
    {
      q: "Website HSNL khác website giới thiệu công ty thế nào?",
      a: "Giới thiệu = brochure thương hiệu. HSNL = năng lực pháp lý, kỹ thuật, dự án tham chiếu — phục vụ procurement và tender. HSNL sâu và chi tiết hơn.",
    },
    {
      q: "Có cần giữ PDF HSNL song song không?",
      a: "Nên có — PDF gửi tender chính thức; web cập nhật live và SEO. Ideal: web là nguồn, PDF export từ web.",
    },
    {
      q: "Website HSNL cần bao nhiêu trang?",
      a: "Thường 10–20 trang: pháp lý, giấy phép, máy móc, nhân sự, dự án, tài liệu, liên hệ. Nhiều dự án = nhiều trang con.",
    },
    {
      q: "Agency marketing có cần HSNL web không?",
      a: "Có — pitch B2B cần case study, team, quy trình minh bạch. HSNL web chuyên nghiệp hơn gửi deck PowerPoint.",
    },
    {
      q: "Có thể khóa tài liệu nhạy cảm không?",
      a: "Có — khu vực thành viên/password cho báo cáo tài chính, hợp đồng mẫu. Phần công khai vẫn đủ cho shortlist.",
    },
    {
      q: "Bao lâu hoàn thành website HSNL?",
      a: "Thường 4–8 tuần. Phụ thuộc khối lượng scan giấy phép và nhập dự án tiêu biểu.",
    },
    {
      q: "Bứt Phá có làm website hồ sơ năng lực không?",
      a: "Có — nhà thầu, agency, nhà cung cấp B2B. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website hồ sơ năng lực</strong> biến file PDF tĩnh thành năng lực số luôn cập nhật — giúp nhà thầu, agency và nhà cung cấp B2B vượt vòng shortlist procurement, pitch thuyết phục và được Google index đúng ngành. Ưu tiên: giấy phép còn hiệu lực, dự án có số liệu, nhân sự chủ chốt rõ ràng và PDF tải về đồng bộ.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo khối lượng dự án và chuẩn HSNL ngành của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website hồ sơ năng lực",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
