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

const KEYWORD = "thiết kế website hà nội";
const TITLE = "Thiết Kế Website Hà Nội Chuyên Nghiệp Trọn Gói";
/** Slug cũ trên DB trước khi chuẩn hóa */
export const LEGACY_SLUG_HA_NOI = "thiet-ke-website-ha-noi-chuyen-nghiep";

export const REWRITE_THIET_KE_WEBSITE_HA_NOI = {
  title: TITLE,
  slug: "thiet-ke-website-ha-noi",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "làm website hà nội, thiết kế web hà nội, dịch vụ website hà nội, agency web hà nội, website trọn gói hà nội",
  metaTitle: "Thiết Kế Website Hà Nội | Báo Giá 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website Hà Nội trọn gói: quy trình 7 bước, bảng giá 3–12 triệu, SEO local & B2B. Hỗ trợ khách HN gặp trực tiếp hoặc online — Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website Hà Nội chuyên nghiệp: đặc thù thị trường B2B thủ đô, quy trình trọn gói, giá, SEO địa phương và cách chọn đối tác uy tín.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Hà Nội | Báo Giá 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "ha-noi-la-gi", label: "Thiết kế website Hà Nội là gì?" },
  { id: "vi-sao-ha-noi", label: "Vì sao doanh nghiệp HN cần website?" },
  { id: "thi-truong-b2b", label: "Đặc thù thị trường B2B Hà Nội" },
  { id: "tron-goi-gom-gi", label: "Gói trọn gói gồm những gì?" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website Hà Nội" },
  { id: "seo-local", label: "SEO local thủ đô" },
  { id: "chon-doi-tac", label: "Chọn đối tác Hà Nội uy tín" },
  { id: "so-sanh", label: "Trọn gói vs làm rời" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website Hà Nội</strong> là dịch vụ xây dựng website trọn gói cho doanh nghiệp, tổ chức và hộ kinh doanh đang hoạt động hoặc nhắm khách tại thủ đô — từ các quận nội thành Cầu Giấy, Đống Đa, Hai Bà Trưng đến khu vực phía Tây Hà Nội. Khác với làm web giá rẻ copy template, <strong>${KEYWORD}</strong> chuyên nghiệp bao gồm khảo sát, thiết kế UI/UX, lập trình, SEO on-page, hosting và bàn giao — phù hợp đặc thù thị trường B2B và dịch vụ tại HN.`,
    `Bài viết dành cho giám đốc, trưởng phòng marketing và chủ doanh nghiệp đang tìm <strong>${KEYWORD}</strong> trọn gói: giải thích gói dịch vụ gồm gì, quy trình 7 bước, mức giá 2026, cách tối ưu SEO local thủ đô và tiêu chí chọn agency — giúp bạn ký hợp đồng đúng, tránh phát sinh ẩn.`,
  ],
})}

${wpKeyTakeaways([
  "Hà Nội: khách B2B tra website + hồ sơ năng lực trước khi mời thầu / ký hợp đồng.",
  "Trọn gói = khảo sát + design + code + SEO cơ bản + bàn giao admin.",
  "Bứt Phá: 3–12 triệu tùy phạm vi; hỗ trợ khách HN online hoặc gặp trực tiếp.",
  "Ưu tiên: uy tín (MST, địa chỉ), case study B2B, tốc độ mobile.",
  "Sau go-live: GSC, GA4, đồng bộ Google Business Profile Hà Nội.",
])}

${wpImg(3, "Thiết kế website Hà Nội chuyên nghiệp trọn gói cho doanh nghiệp thủ đô")}

<h2 id="ha-noi-la-gi">Thiết kế website Hà Nội là gì?</h2>

<p><strong>Thiết kế website Hà Nội</strong> là quy trình tạo website hoàn chỉnh cho khách hàng tại hoặc nhắm thị trường Hà Nội — từ website giới thiệu công ty, hồ sơ năng lực nhà thầu, đến landing dịch vụ và shop online. “Hà Nội” ở đây thể hiện ở:</p>

<ul>
  <li>Nội dung và từ khóa SEO local (“dịch vụ + Hà Nội”, “quận Cầu Giấy”…)</li>
  <li>Trang liên hệ có địa chỉ, bản đồ văn phòng tại thủ đô</li>
  <li>Hiểu hành vi khách B2B — cần thông tin pháp lý, case study, quy trình rõ</li>
  <li>Hỗ trợ gặp trực tiếp khi khách ở HN cần duyệt mockup, ký hợp đồng</li>
</ul>

<p><strong>${KEYWORD}</strong> không chỉ là “đặt server ở Hà Nội” — mà là website được thiết kế để <em>cạnh tranh và chuyển đổi</em> trên thị trường thủ đô.</p>

<h2 id="vi-sao-ha-noi">Vì sao doanh nghiệp tại Hà Nội cần website chuyên nghiệp?</h2>

<p>Thủ đô tập trung cơ quan, tập đoàn, viện nghiên cứu và SME dịch vụ — hành vi mua B2B khác vùng miền khác:</p>

<ul>
  <li><strong>Thẩm định kỹ:</strong> Đối tác đọc website, kiểm tra MST, dự án tiêu biểu trước khi gọi.</li>
  <li><strong>Hồ sơ điện tử:</strong> Website thay brochure PDF — luôn cập nhật dự án mới.</li>
  <li><strong>SEO từ khóa + địa danh:</strong> “thiết kế nội thất hà nội”, “luật sư hà nội” — có web mới xuất hiện.</li>
  <li><strong>Uy tín dài hạn:</strong> Fanpage thay đổi thuật toán; website là tài sản sở hữu.</li>
</ul>

<p>Theo xu hướng chung tại Việt Nam, đa số người dùng truy cập web bằng điện thoại — <strong>thiết kế website Hà Nội</strong> bắt buộc responsive và tải nhanh.</p>

<h2 id="thi-truong-b2b">Đặc thù thị trường website tại Hà Nội (B2B &amp; dịch vụ)</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Đặc điểm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ảnh hưởng thiết kế web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>B2B chiếm tỷ trọng lớn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trang Dự án, HSNL, chứng chỉ, đối tác</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Khách so sánh nhiều vendor</strong></td>
      <td class="border border-indigo-100 px-3 py-2">USP rõ, báo giá minh bạch, form ngắn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ngành mạnh: pháp lý, công nghệ, giáo dục, xây dựng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tone chuyên nghiệp, ít màu lòe loẹt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Local SEO</strong></td>
      <td class="border border-indigo-100 px-3 py-2">NAP, Maps, schema Organization</td>
    </tr>
  </tbody>
</table>

<p>Doanh nghiệp ở <strong>Cầu Giấy, Nam Từ Liêm, Long Biên</strong> thường nhắm khách toàn quốc nhưng trụ sở HN — nên thể hiện rõ trụ sở thủ đô trên web để tăng trust với khách phía Bắc.</p>

${wpImg(4, "Website doanh nghiệp B2B tại Hà Nội — cấu trúc trang chuẩn")}

<h2 id="tron-goi-gom-gi">Thiết kế website Hà Nội trọn gói gồm những gì?</h2>

<p>Khi thuê <strong>${KEYWORD}</strong> trọn gói, đối chiếu các hạng mục sau trong hợp đồng:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Chi tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Khảo sát &amp; brief</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Mục tiêu, sitemap, từ khóa Hà Nội</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>UI/UX</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Mockup desktop + mobile theo brand</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lập trình</strong></td>
      <td class="border border-indigo-100 px-3 py-2">CMS/code, form, Zalo, responsive</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO on-page</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Title, meta, H1–H3, sitemap, GSC</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hạ tầng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tên miền, hosting, SSL (tùy gói)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bàn giao</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Admin, đào tạo, bảo hành lỗi kỹ thuật</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết khái niệm trọn gói xem thêm bài <a href="${SITE}/blog/thiet-ke-website-tron-goi">thiết kế website trọn gói</a>.</p>

<h2 id="quy-trinh">Quy trình thiết kế website Hà Nội — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Online hoặc gặp tại HN — mục tiêu lead/B2B, đối thủ, ngân sách.</li>
  <li><strong>Wireframe:</strong> Duyệt cấu trúc trang (Giới thiệu, Dịch vụ, Dự án, Liên hệ…).</li>
  <li><strong>Thiết kế UI:</strong> Visual theo nhận diện — 2 vòng chỉnh chuẩn.</li>
  <li><strong>Lập trình:</strong> Code, nhập nội dung, tích hợp form &amp; analytics.</li>
  <li><strong>SEO on-page:</strong> Meta từng trang, internal link, schema.</li>
  <li><strong>Kiểm thử:</strong> Mobile, form, PageSpeed, SSL.</li>
  <li><strong>Go-live:</strong> Trỏ domain, đào tạo admin, bảo hành.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần cho website doanh nghiệp trọn gói — tùy số trang và tốc độ khách duyệt nội dung.</p>

<h2 id="bang-gia">Bảng giá thiết kế website Hà Nội 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Cá nhân, hộ kinh doanh HN</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Công ty dịch vụ cần SEO &amp; UX</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">B2B, CRO, marketing tích hợp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều trang, tính năng mở rộng</td>
    </tr>
  </tbody>
</table>

<p>Chưa gồm tên miền và hosting — xem <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a> để biết phí duy trì năm.</p>

<h2 id="seo-local">SEO local cho doanh nghiệp Hà Nội</h2>

<ul>
  <li><strong>NAP:</strong> Tên, địa chỉ, SĐT thống nhất web — Maps — Mã số thuế.</li>
  <li><strong>Trang Liên hệ:</strong> Embed bản đồ, hướng dẫn đến văn phòng (Cầu Giấy, Ba Đình…).</li>
  <li><strong>Từ khóa:</strong> “dịch vụ + hà nội”, “quận …” trong title/H2 tự nhiên.</li>
  <li><strong>Content B2B:</strong> Case study, tin tức ngành — E-E-A-T cho Google.</li>
  <li><strong>Google Business Profile:</strong> Đồng bộ với website sau go-live.</li>
</ul>

<p>Kết hợp <a href="${SITE}/google-maps">dịch vụ Google Maps</a> nếu cần tối ưu pack địa phương tại thủ đô.</p>

${wpImg(0, "SEO local Hà Nội — website và Google Maps đồng bộ")}

<h2 id="chon-doi-tac">Cách chọn đơn vị thiết kế website Hà Nội uy tín</h2>

<ul>
  <li>Portfolio có URL thật — ưu tiên dự án B2B, cùng ngành bạn</li>
  <li>Hợp đồng công ty, MST, địa chỉ liên hệ rõ</li>
  <li>Báo giá trọn gói liệt kê từng hạng mục — không “full 1 triệu”</li>
  <li>Cam kết realistic — không “top Google 1 tuần”</li>
  <li>Bảo hành &amp; hỗ trợ sau bàn giao qua Zalo/hotline</li>
</ul>

<p>So sánh 3 báo giá cùng scope trước khi ký — giá thấp nhất thường thiếu SEO và source code.</p>

<h2 id="so-sanh">Website trọn gói Hà Nội vs thuê rời từng phần</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Trọn gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Thuê rời</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đầu mối</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Một agency</td>
      <td class="border border-indigo-100 px-3 py-2">Designer + dev + SEO riêng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Timeline</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Rõ, một lịch</td>
      <td class="border border-indigo-100 px-3 py-2">Dễ trễ do phối hợp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giá</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Báo trước 3–12 triệu</td>
      <td class="border border-indigo-100 px-3 py-2">Phát sinh khó đoán</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website tại Hà Nội</h2>

<ul>
  <li>Website chỉ có tiếng Việt nhưng nhắm khách quốc tế — thiếu trang EN.</li>
  <li>Không có trang Dự án / Case study — B2B HN cần bằng chứng năng lực.</li>
  <li>Copy nội dung đối thủ — Google phạt duplicate, mất trust.</li>
  <li>Bỏ qua tốc độ mobile — mất lead từ giám đốc duyệt web trên điện thoại.</li>
  <li>Không gắn GSC — không biết từ khóa Hà Nội nào có impression.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan quy trình toàn quốc.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tphcm`,
    label: "Thiết kế website TPHCM",
    desc: "So sánh thị trường Nam — Bắc.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tron-goi`,
    label: "Website trọn gói",
    desc: "Chi tiết hạng mục trong gói.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm website Hà Nội",
    desc: "Tư vấn và báo giá Bứt Phá.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website Hà Nội giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ đến 12.000.000đ tùy gói. TMĐT và custom báo giá sau khảo sát. Chưa gồm domain/hosting.",
    },
    {
      q: "Làm website Hà Nội mất bao lâu?",
      a: "Website doanh nghiệp trọn gói thường 3–6 tuần. Landing 1–2 tuần. Phụ thuộc số trang và tốc độ duyệt nội dung.",
    },
    {
      q: "Trọn gói có viết nội dung không?",
      a: "Gói cơ bản thường khách cung cấp text/ảnh. Có thể mua thêm gói chăm sóc web viết bài SEO.",
    },
    {
      q: "Có cần gặp trực tiếp tại Hà Nội không?",
      a: "Không bắt buộc — triển khai online hiệu quả. Gặp mặt hữu ích khi brief phức tạp hoặc ký hợp đồng lớn.",
    },
    {
      q: "Website Hà Nội khác TPHCM thế nào?",
      a: "Kỹ thuật giống nhau; HN thiên B2B, cần case study và tone chuyên nghiệp hơn; TPHCM đa dạng TMĐT và dịch vụ nhanh.",
    },
    {
      q: "Có cam kết top Google Hà Nội không?",
      a: "Uy tín chỉ cam kết SEO on-page kỹ thuật. Top ranking cần thời gian, content và authority.",
    },
    {
      q: "Làm web xong tự sửa được không?",
      a: "Có — bàn giao admin và hướng dẫn cập nhật tin, ảnh.",
    },
    {
      q: "Bứt Phá có nhận khách Hà Nội không?",
      a: "Có — hỗ trợ toàn quốc, tư vấn Zalo 0937417982 hoặc form tại /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website Hà Nội</strong> trọn gói là lựa chọn phù hợp doanh nghiệp thủ đô cần uy tín B2B, quy trình rõ và một đầu mối triển khai. Chọn gói 3–12 triệu theo phạm vi, tối ưu SEO local và đồng bộ Google Maps ngay từ ngày go-live.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá cụ thể theo ngành của bạn.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website Hà Nội",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
