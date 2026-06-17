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

const KEYWORD = "thiết kế website công ty";
const TITLE = "Thiết Kế Website Công Ty Giúp Nâng Cao Uy Tín Thương Hiệu";

export const REWRITE_THIET_KE_WEBSITE_CONG_TY = {
  title: TITLE,
  slug: "thiet-ke-website-cong-ty",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website công ty, thương hiệu doanh nghiệp, web giới thiệu công ty, corporate website",
  metaTitle: "Thiết Kế Website Công Ty | Chuẩn SEO 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website công ty: cấu trúc trang, thông tin pháp lý, đồng bộ thương hiệu, tuyển dụng & B2B. Nâng uy tín trước đối tác và khách hàng. Tư vấn miễn phí.",
  description:
    "Hướng dẫn thiết kế website công ty chuyên nghiệp — xây dựng uy tín thương hiệu, nội dung cốt lõi và đồng bộ nhận diện trên mọi kênh số.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Công Ty | Chuẩn SEO 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "vai-tro", label: "Vai trò website công ty" },
  { id: "uy-tin-thuong-hieu", label: "Website & uy tín thương hiệu" },
  { id: "cau-truc-trang", label: "Cấu trúc trang website công ty" },
  { id: "noi-dung-cot-loi", label: "Nội dung cốt lõi cần có" },
  { id: "phap-ly", label: "Thông tin pháp lý & minh bạch" },
  { id: "dong-bo-brand", label: "Đồng bộ thương hiệu đa kênh" },
  { id: "hr-tuyen-dung", label: "Website & tuyển dụng" },
  { id: "b2b-doi-tac", label: "Thuyết phục đối tác B2B" },
  { id: "seo-cong-ty", label: "SEO cho website công ty" },
  { id: "bang-gia", label: "Chi phí thiết kế website công ty" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là bước xây dựng “bộ mặt số” chính thức của doanh nghiệp — nơi đối tác, khách hàng, nhà đầu tư và ứng viên tìm hiểu bạn trước khi gọi điện, ký hợp đồng hoặc nộp hồ sơ. Website công ty không chỉ đẹp: nó phải thể hiện quy mô, năng lực, tính pháp lý và câu chuyện thương hiệu một cách có hệ thống.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: giải thích vì sao website ảnh hưởng trực tiếp đến niềm tin, cần những trang và nội dung gì, cách đồng bộ với fanpage, Google Maps, profile giấy — và mức đầu tư thực tế cho công ty TNHH, cổ phần hay chi nhánh tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Website công ty là điểm chạm đầu tiên khi khách so sánh 3–5 đơn vị trên Google.",
  "Tối thiểu 6–8 trang: Trang chủ, Giới thiệu, Dịch vụ, Dự án, Tin tức, Tuyển dụng, Liên hệ.",
  "MST, địa chỉ, hotline, chính sách bảo mật — bắt buộc cho uy tín và trust SEO.",
  "Đồng bộ logo, màu, font với namecard, slide, Fanpage.",
  "Gói Tối ưu (6 triệu) hoặc Kinh doanh (9 triệu) phù hợp website công ty SME.",
])}

${wpImg(1, "Thiết kế website công ty nâng cao uy tín thương hiệu")}

<h2 id="vai-tro">Vai trò website công ty trong kinh doanh hiện đại</h2>

<p>Trước đây, profile giấy và word-of-mouth đủ thuyết phục. Nay, <strong>90%+ khách B2B</strong> tra Google trước khi họp. <strong>${KEYWORD}</strong> chuyên nghiệp đảm nhiệm:</p>

<ul>
  <li><strong>Truyền thông thương hiệu:</strong> Tầm nhìn, sứ mệnh, giá trị cốt lõi</li>
  <li><strong>Hỗ trợ sales:</strong> Case study, bảng giá/dịch vụ, form liên hệ</li>
  <li><strong>Tuyển dụng:</strong> Văn hóa công ty, vị trí đang tuyển</li>
  <li><strong>Quan hệ đối tác:</strong> Hồ sơ năng lực, chứng chỉ, quy trình hợp tác</li>
  <li><strong>SEO:</strong> Xuất hiện khi khách tìm “công ty + ngành + khu vực”</li>
</ul>

<p>Website yếu (thiếu HTTPS, nội dung cũ 5 năm, không có MST) khiến khách nghi ngờ dù sản phẩm tốt — đặc biệt hợp đồng giá trị cao.</p>

<h2 id="uy-tin-thuong-hieu">Website công ty và uy tín thương hiệu</h2>

<p><strong>Uy tín thương hiệu</strong> (brand credibility) là cảm giác “công ty này đáng tin” — tích lũy từ mọi điểm chạm. Website là điểm chạm bạn <em>kiểm soát hoàn toàn</em>, khác review trên sàn hay comment Facebook.</p>

<h3>Tín hiệu tin cậy trên web công ty</h3>
<ul>
  <li>Giao diện hiện đại, tải nhanh trên mobile</li>
  <li>Thông tin pháp lý đầy đủ, dễ tìm (footer + trang liên hệ)</li>
  <li>Hình ảnh văn phòng, đội ngũ, hoạt động thật — không stock ảnh lạc lõng</li>
  <li>Dự án / khách hàng tiêu biểu (logo hoặc case có phép)</li>
  <li>Chứng nhận ISO, giải thưởng, thành viên hiệp hội ngành</li>
  <li>Blog cập nhật — chứng minh công ty còn hoạt động tích cực</li>
</ul>

<blockquote><p>Khách hàng doanh nghiệp thường hỏi: “Công ty có thật không?” trước khi hỏi “Giá bao nhiêu?”. <strong>${KEYWORD}</strong> giải quyết câu hỏi đầu tiên.</p></blockquote>

${wpImg(0, "Tín hiệu uy tín trên website công ty chuyên nghiệp")}

<h2 id="cau-truc-trang">Cấu trúc trang website công ty chuẩn</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Trang</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang chủ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ấn tượng 5 giây, dịch vụ chính, CTA liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lịch sử, tầm nhìn, đội ngũ lãnh đạo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Dịch vụ / Sản phẩm</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Mỗi mảng một trang — SEO + sales</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Dự án / Khách hàng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Case study, portfolio</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tin tức / Blog</strong></td>
      <td class="border border-indigo-100 px-3 py-2">SEO, thought leadership</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tuyển dụng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Vị trí mở, môi trường làm việc</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Liên hệ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Form, bản đồ, hotline, Zalo</td>
    </tr>
  </tbody>
</table>

<p>Công ty cổ phần lớn có thể thêm: Quan hệ cổ đông, báo cáo phát triển bền vững, truyền thông. SME có thể gộp một số mục để giữ web gọn 8–12 trang.</p>

<h2 id="noi-dung-cot-loi">Nội dung cốt lõi trên website công ty</h2>

<h3>Trang Giới thiệu (About) — không được sơ sài</h3>
<p>Tránh đoạn “Chúng tôi là công ty hàng đầu…” chung chung. Nên có: năm thành lập, số nhân sự, thị trường phục vụ, khác biệt cạnh tranh, hình ảnh thật. Video giới thiệu 1–2 phút tăng engagement đáng kể.</p>

<h3>Dịch vụ / sản phẩm</h3>
<p>Mỗi trang 800–1.500 từ: mô tả, quy trình, đối tượng khách, FAQ, CTA “Nhận tư vấn”. Giúp sales gửi link thay vì giải thích dài qua chat.</p>

<h3>Case study &amp; testimonial</h3>
<p>Format: Bối cảnh → Giải pháp → Kết quả (số liệu nếu có). Video testimonial khách B2B uy tín hơn text 5 sao không tên.</p>

<h3>FAQ &amp; chính sách</h3>
<p>Quy trình hợp tác, thời gian triển khai, bảo hành, thanh toán. Giảm câu hỏi lặp cho team sales.</p>

${wpImg(3, "Nội dung cốt lõi khi thiết kế website công ty")}

<h2 id="phap-ly">Thông tin pháp lý và minh bạch</h2>

<p>Website công ty Việt Nam nên hiển thị rõ (footer + trang liên hệ):</p>
<ul>
  <li>Tên công ty đầy đủ (tiếng Việt / tiếng Anh nếu có)</li>
  <li>Mã số thuế (MST)</li>
  <li>Địa chỉ trụ sở chính (khớp đăng ký kinh doanh)</li>
  <li>Số điện thoại, email, giờ làm việc</li>
  <li>Giấy phép kinh doanh ngành có điều kiện (nếu có)</li>
  <li><strong>Chính sách bảo mật</strong> — bắt buộc khi thu thập form</li>
  <li>Điều khoản sử dụng (tùy ngành)</li>
</ul>

<p>Google LocalBusiness schema + thông tin nhất quán với Google Business Profile tăng trust local SEO.</p>

<h2 id="dong-bo-brand">Đồng bộ thương hiệu trên mọi điểm chạm</h2>

<p><strong>${KEYWORD}</strong> hiệu quả khi là trục trung tâm liên kết:</p>
<ul>
  <li><strong>Logo &amp; màu:</strong> Cùng file logo vector trên web, Fanpage, namecard</li>
  <li><strong>Font &amp; tone:</strong> Formal vs friendly — thống nhất copywriting</li>
  <li><strong>Ảnh:</strong> Cùng style photography (sáng/tối, lifestyle/corporate)</li>
  <li><strong>URL &amp; email:</strong> @congty.com thay vì @gmail.com trong footer</li>
  <li><strong>Google Maps:</strong> Địa chỉ, giờ mở cửa khớp website</li>
</ul>

<p>Khách nhận diện thương hiệu nhất quán → cảm giác quy mô và chuyên nghiệp cao hơn.</p>

<h2 id="hr-tuyen-dung">Website công ty và tuyển dụng</h2>

<p>Ứng viên gen Z tra website trước khi ứng tuyển. Trang <strong>Tuyển dụng</strong> cần:</p>
<ul>
  <li>Mô tả văn hóa, phúc lợi thật (không copy template)</li>
  <li>Danh sách vị trí đang mở + form hoặc link email HR</li>
  <li>Hình ảnh team, hoạt động nội bộ</li>
  <li>Video “một ngày làm việc” nếu có thể</li>
</ul>

<p>Website tốt giảm chi phí tuyển dụng — ứng viên chủ động tìm đến thay vì chỉ đăng tin job board.</p>

${wpImg(2, "Website công ty hỗ trợ tuyển dụng và thương hiệu nhà tuyển dụng")}

<h2 id="b2b-doi-tac">Thuyết phục đối tác và khách B2B</h2>

<p>Khách doanh nghiệp đánh giá:</p>
<ol>
  <li>Website có chuyên nghiệp không? (proxy cho năng lực vận hành)</li>
  <li>Có case cùng ngành / quy mô không?</li>
  <li>Quy trình làm việc rõ không?</li>
  <li>Liên hệ và pháp lý minh bạch không?</li>
</ol>

<p>Trang <strong>Hồ sơ năng lực</strong> (tải PDF) hoặc <strong>Catalog dịch vụ</strong> giúp procurement nội bộ khách duyệt nhanh hơn. <strong>${KEYWORD}</strong> cho B2B nên ưu tiên depth of content hơn hiệu ứng animation.</p>

<h2 id="seo-cong-ty">SEO cho website công ty</h2>

<p>Từ khóa mục tiêu thường dạng:</p>
<ul>
  <li><em>công ty [dịch vụ] [tỉnh/thành]</em></li>
  <li><em>[ngành] uy tín TP.HCM</em></li>
  <li><em>nhà cung cấp [sản phẩm] Việt Nam</em></li>
</ul>

<p>Mỗi trang dịch vụ một intent; blog hỗ trợ long-tail. Kết hợp <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a> từ đầu. Internal link giữa trang chủ ↔ dịch vụ ↔ case study.</p>

<h2 id="bang-gia">Chi phí thiết kế website công ty</h2>

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
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu</td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Công ty mới, web 6–8 trang cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Công ty TNHH cần web đẹp + SEO tốt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế độc quyền, case study, CRO</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết xem <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>. Khác biệt với bài <a href="${SITE}/blog/thiet-ke-website-doanh-nghiep">website doanh nghiệp</a>: bài này nhấn <em>thương hiệu công ty</em> và uy tín; bài kia nhấn cấu trúc corporate tổng quát.</p>

${wpImg(4, "Chi phí thiết kế website công ty tại Bứt Phá Marketing")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Hướng dẫn tổng quan làm website.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Cấu trúc và quy trình corporate web.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Chi phí và phí duy trì chi tiết.",
  },
  {
    href: `${SITE}/website`,
    label: "Dịch vụ website Bứt Phá",
    desc: "Đăng ký tư vấn thiết kế website công ty.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Website công ty cần bao nhiêu trang?",
      a: "Tối thiểu 6–8 trang. Công ty lớn hoặc đa lĩnh vực có thể 15–30 trang + blog.",
    },
    {
      q: "Thiết kế website công ty mất bao lâu?",
      a: "6–12 trang thường 3–5 tuần. Phụ thuộc tốc độ cung cấp nội dung và duyệt thiết kế.",
    },
    {
      q: "Có cần song ngữ Việt–Anh không?",
      a: "Nên có nếu khách quốc tế hoặc xuất khẩu. Dùng hreflang chuẩn SEO, không dịch máy không biên tập.",
    },
    {
      q: "Website công ty khác website doanh nghiệp thế nào?",
      a: "Gần như cùng loại corporate site. “Công ty” nhấn mạnh pháp lý, thương hiệu, đối tác; “doanh nghiệp” rộng hơn (gồm hộ kinh doanh).",
    },
    {
      q: "Bao lâu cập nhật website công ty một lần?",
      a: "Blog/tin tức 2–4 bài/tháng. Thông tin công ty, MST, địa chỉ — rà soát mỗi quý.",
    },
    {
      q: "Chi phí thiết kế website công ty bao nhiêu?",
      a: "Phổ biến 3–9 triệu tại Bứt Phá cho SME. Chưa gồm tên miền, hosting hàng năm.",
    },
    {
      q: "Có cần trang quan hệ cổ đông?",
      a: "Công ty đại chúng / niêm yết — có. SME tư nhân thường không cần.",
    },
    {
      q: "Làm sao tăng uy tín nhanh trên web?",
      a: "Bổ sung case study thật, MST/địa chỉ rõ, ảnh team, HTTPS, review Google Maps đồng bộ, blog chuyên môn.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} chuyên nghiệp là khoản đầu tư vào uy tín — không phải chi phí trang trí. Website thể hiện bạn là đối tác đáng tin trước khi sales kịp gọi điện, đồng thời hỗ trợ tuyển dụng và SEO dài hạn.`,
    `Ưu tiên: thông tin pháp lý đầy đủ, nội dung Giới thiệu và case study thật, đồng bộ thương hiệu đa kênh. Bắt đầu gói 6–9 triệu nếu công ty đã ổn định và cần hình ảnh chuyên nghiệp trước đối tác.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website công ty miễn phí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
