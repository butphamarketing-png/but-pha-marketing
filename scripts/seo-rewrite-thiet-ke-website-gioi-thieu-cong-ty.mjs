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

const KEYWORD = "thiết kế website giới thiệu công ty";
const TITLE = "Thiết Kế Website Giới Thiệu Công Ty Chuẩn SEO Và Uy Tín";

export const REWRITE_THIET_KE_WEBSITE_GIOI_THIEU_CONG_TY = {
  title: TITLE,
  slug: "thiet-ke-website-gioi-thieu-cong-ty",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website giới thiệu công ty, web corporate giới thiệu, website brochure doanh nghiệp, thiết kế web giới thiệu thương hiệu",
  metaTitle: "Thiết Kế Website Giới Thiệu Công Ty | SEO 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website giới thiệu công ty: thay profile PDF, cấu trúc trang, MST, case study và SEO thương hiệu. Giá 3–9 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website giới thiệu công ty chuẩn SEO: brochure online thuyết phục khách B2B, cấu trúc trang và quy trình triển khai cho SME.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Giới Thiệu Công Ty | SEO 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "gioi-thieu-la-gi", label: "Website giới thiệu là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần thay PDF?" },
  { id: "khac-gi", label: "Khác web bán hàng thế nào?" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "noi-dung", label: "Nội dung thuyết phục" },
  { id: "trust", label: "Tín hiệu uy tín" },
  { id: "ux-mobile", label: "UX mobile & CTA" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "seo", label: "SEO thương hiệu" },
  { id: "chon-doi-tac", label: "Chọn đối tác" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website giới thiệu công ty</strong> là quy trình xây dựng website corporate dạng <em>brochure online</em> — tập trung kể câu chuyện thương hiệu, giới thiệu dịch vụ/sản phẩm và thu lead liên hệ, thay cho profile PDF gửi qua email hoặc chỉ dựa vào Fanpage. Khác website TMĐT hay portal phức tạp, <strong>${KEYWORD}</strong> ưu tiên ấn tượng đầu tiên, thông tin pháp lý minh bạch và CTA rõ — phù hợp công ty TNHH, cổ phần SME và chi nhánh mới thành lập.`,
    `Bài viết dành cho giám đốc, trưởng phòng marketing và chủ doanh nghiệp đang cần <strong>${KEYWORD}</strong>: phân biệt web giới thiệu vs web bán hàng, checklist trang bắt buộc, nội dung About thuyết phục, quy trình triển khai, mức giá 2026 và cách kết hợp với Google Maps, Zalo OA — thực chiến tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Web giới thiệu = brochure 24/7 — khách xem trước khi họp, không cần gửi file PDF nặng.",
  "Tối thiểu 5–8 trang: Trang chủ, Giới thiệu, Dịch vụ, Dự án, Liên hệ + MST footer.",
  "Không cần giỏ hàng — cần form ngắn, Zalo sticky và case study thật.",
  "SEO: “công ty + dịch vụ + tỉnh/thành” — mỗi dịch vụ một trang riêng.",
  "Bứt Phá: gói Giới thiệu 3 triệu → Tối ưu 6 triệu cho SME cần uy tín.",
])}

${wpImg(5, "Thiết kế website giới thiệu công ty chuẩn SEO và uy tín thương hiệu")}

<h2 id="gioi-thieu-la-gi">Website giới thiệu công ty là gì?</h2>

<p><strong>Website giới thiệu công ty</strong> (corporate brochure website) là loại website tập trung <em>trình bày doanh nghiệp</em> — ai bạn là, làm gì, khác biệt thế nào, liên hệ ra sao — thay vì bán hàng trực tuyến hay vận hành hệ thống phức tạp. <strong>Thiết kế website giới thiệu công ty</strong> thường gồm:</p>

<ul>
  <li><strong>Trang chủ:</strong> Headline value proposition + dịch vụ nổi bật + social proof</li>
  <li><strong>Giới thiệu:</strong> Lịch sử, tầm nhìn, đội ngũ, chứng chỉ</li>
  <li><strong>Dịch vụ / sản phẩm:</strong> Mô tả từng mảng — không nhất thiết có giá online</li>
  <li><strong>Dự án / khách hàng:</strong> Logo strip, case study ngắn</li>
  <li><strong>Liên hệ:</strong> Form, bản đồ, hotline, Zalo, MST</li>
</ul>

<p><strong>${KEYWORD}</strong> phù hợp công ty dịch vụ B2B (tư vấn, xây dựng, logistics, sản xuất, agency…) — nơi khách cần <em>tin tưởng</em> trước khi hỏi báo giá.</p>

<h2 id="vi-sao-can">Vì sao nên làm website giới thiệu thay profile PDF?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Profile PDF / in ấn</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website giới thiệu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Cập nhật</strong></td>
      <td class="border border-indigo-100 px-3 py-2">In lại mỗi lần đổi — tốn kém, dễ lỗi thời</td>
      <td class="border border-indigo-100 px-3 py-2">Sửa online trong vài phút qua CMS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO Google</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Không index — khách không tìm thấy chủ động</td>
      <td class="border border-indigo-100 px-3 py-2">Xuất hiện khi search “công ty + dịch vụ”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chia sẻ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">File nặng, khó mở trên mobile</td>
      <td class="border border-indigo-100 px-3 py-2">Link một dòng — mở mọi thiết bị</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đo lường</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Không biết ai đã xem</td>
      <td class="border border-indigo-100 px-3 py-2">GA4: trang xem, nguồn traffic, form submit</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CTA</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Khách phải tự gọi/email</td>
      <td class="border border-indigo-100 px-3 py-2">Form, Zalo, click-to-call ngay trên trang</td>
    </tr>
  </tbody>
</table>

<p>PDF vẫn hữu ích khi gửi kèm hồ sơ thầu — nhưng <strong>${KEYWORD}</strong> nên là “nguồn sự thật” (single source of truth), PDF chỉ là bản export tóm tắt.</p>

<h2 id="khac-gi">Website giới thiệu khác web bán hàng &amp; landing thế nào?</h2>

<ul>
  <li><strong>vs TMĐT:</strong> Không cần giỏ hàng, thanh toán, quản lý tồn kho — tập trung trust và lead.</li>
  <li><strong>vs Landing page:</strong> Landing phục vụ 1 chiến dịch ads; web giới thiệu là hub đa trang — khách tìm hiểu sâu trước khi ký hợp đồng.</li>
  <li><strong>vs Fanpage:</strong> Fanpage tốt cho tương tác; web giới thiệu bạn sở hữu domain, SEO và layout chuyên nghiệp hơn.</li>
  <li><strong>vs Catalog PDF:</strong> Catalog web có filter, search, cập nhật giá — xem thêm <a href="${SITE}/blog/thiet-ke-website-catalog-san-pham">thiết kế website catalog sản phẩm</a>.</li>
</ul>

<blockquote><p>Mô hình phổ biến: <strong>Website giới thiệu (hub)</strong> ← Fanpage/Ads/L Maps ← Form/Zalo → Sales chốt hợp đồng.</p></blockquote>

<h2 id="cau-truc">Cấu trúc trang website giới thiệu công ty chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> 5 giây đầu — bạn là ai + lợi ích khách + CTA “Liên hệ tư vấn”.</li>
  <li><strong>Về chúng tôi:</strong> Câu chuyện, số liệu (năm thành lập, nhân sự, dự án), video giới thiệu 60–90s.</li>
  <li><strong>Dịch vụ:</strong> Mỗi dịch vụ một trang — long-tail SEO + sales gửi link riêng.</li>
  <li><strong>Dự án / đối tác:</strong> Logo khách hàng, 3–6 case study chi tiết.</li>
  <li><strong>Tin tức (tùy chọn):</strong> 2–4 bài/tháng — chứng minh công ty còn hoạt động.</li>
  <li><strong>Tuyển dụng (tùy chọn):</strong> Văn hóa, vị trí mở — hỗ trợ HR.</li>
  <li><strong>Liên hệ:</strong> Form, Maps embed, MST, giờ làm việc, nhiều chi nhánh (nếu có).</li>
</ol>

<p>SME thường đủ <strong>6–10 trang</strong>. Công ty đa ngành có thể 15+ trang — gom theo silo dịch vụ.</p>

${wpImg(6, "Cấu trúc trang website giới thiệu công ty cho doanh nghiệp SME")}

<h2 id="noi-dung">Nội dung trang Giới thiệu — viết sao cho thuyết phục?</h2>

<p>Trang About là trái tim của <strong>${KEYWORD}</strong>. Tránh đoạn “Chúng tôi là công ty hàng đầu…” — thay bằng cấu trúc:</p>

<h3>1. Hook — 1 đoạn mở đầu</h3>
<p>Ai bạn phục vụ + vấn đề bạn giải quyết. Ví dụ: “Từ 2018, [Tên công ty] đồng hành 200+ doanh nghiệp SME tại miền Nam trong tối ưu logistics nội địa — giảm 15% chi phí vận chuyển trung bình.”</p>

<h3>2. Lịch sử &amp; cột mốc</h3>
<p>Timeline năm thành lập, mở rộng chi nhánh, chứng chỉ, giải thưởng — số liệu cụ thể tăng trust.</p>

<h3>3. Tầm nhìn — sứ mệnh — giá trị</h3>
<p>Ngắn gọn, không copy Wikipedia. 3 giá trị cốt lõi + 1 câu giải thích mỗi giá trị.</p>

<h3>4. Đội ngũ lãnh đạo</h3>
<p>Ảnh thật, học vấn, kinh nghiệm ngành — B2B mua “con người” nhiều hơn B2C.</p>

<h3>5. Chứng nhận &amp; đối tác</h3>
<p>ISO, thành viên hiệp hội, logo khách hàng (có phép) — strip logo cuối trang About.</p>

<h2 id="trust">Tín hiệu uy tín bắt buộc trên web giới thiệu</h2>

<ul>
  <li><strong>HTTPS + tốc độ:</strong> Web chậm hoặc “Not secure” = mất niềm tin ngay lập tức.</li>
  <li><strong>MST &amp; địa chỉ:</strong> Footer mọi trang + trang Liên hệ — khớp đăng ký kinh doanh.</li>
  <li><strong>Ảnh thật:</strong> Văn phòng, team, sự kiện — tránh stock ảnh lạc lõng.</li>
  <li><strong>Review Google:</strong> Nhúng hoặc link Maps — đồng bộ NAP (Name, Address, Phone).</li>
  <li><strong>Chính sách bảo mật:</strong> Bắt buộc khi có form thu dữ liệu cá nhân.</li>
  <li><strong>Email @tenmien.com:</strong> contact@congty.com chuyên nghiệp hơn @gmail.com.</li>
</ul>

<p>Schema <strong>Organization</strong> hoặc <strong>LocalBusiness</strong> giúp Google hiểu thự thể doanh nghiệp — kết hợp <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>.</p>

<h2 id="ux-mobile">UX mobile &amp; CTA trên website giới thiệu</h2>

<p>Giám đốc và procurement hay xem web công ty trên điện thoại giữa cuộc họp. <strong>${KEYWORD}</strong> cần:</p>

<ul>
  <li>Nút <strong>Gọi ngay</strong> + <strong>Zalo</strong> sticky trên mobile</li>
  <li>Form liên hệ tối đa 4–5 trường: tên, SĐT, công ty, nhu cầu</li>
  <li>Menu hamburger gọn — không bury “Liên hệ” sâu 3 cấp</li>
  <li>Font đủ lớn, contrast tốt — đối tượng 35–55 tuổi B2B</li>
  <li>Tải trang &lt; 3 giây trên 4G — ảnh hero nén WebP</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website giới thiệu công ty — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Mục tiêu (lead, thương hiệu, tuyển dụng), đối thủ, tài liệu có sẵn (logo, profile cũ).</li>
  <li><strong>Sitemap:</strong> Chốt danh sách trang — tránh scope creep giữa chừng.</li>
  <li><strong>UI design:</strong> Mockup theo brand guideline — duyệt mobile trước.</li>
  <li><strong>Lập trình:</strong> WordPress hoặc custom — form, GA4, Search Console.</li>
  <li><strong>Nội dung:</strong> Copywriting About + trang dịch vụ — khách cung cấp hoặc Bứt Phá hỗ trợ.</li>
  <li><strong>SEO on-page:</strong> Title, meta, heading, internal link, sitemap.xml.</li>
  <li><strong>Go-live &amp; đào tạo:</strong> Hướng dẫn sửa text, thêm tin tức, backup.</li>
</ol>

<p><strong>Thời gian:</strong> Web giới thiệu 6–10 trang thường <strong>2–4 tuần</strong> — phụ thuộc tốc độ duyệt nội dung.</p>

<h2 id="bang-gia">Bảng giá thiết kế website giới thiệu công ty 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2">Công ty mới, 5–7 trang, form liên hệ cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">SME cần giao diện đẹp + SEO + case study</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Thiết kế độc quyền, blog, đa ngôn ngữ, CRO</td>
    </tr>
  </tbody>
</table>

<p>Hosting + domain ~500.000–1.500.000đ/năm riêng. Chi tiết: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="seo">SEO cho website giới thiệu công ty</h2>

<ul>
  <li><strong>Từ khóa chính:</strong> “công ty [dịch vụ] [tỉnh/thành]”, “[dịch vụ] uy tín [khu vực]”.</li>
  <li><strong>Mỗi dịch vụ = 1 URL:</strong> Không gom tất cả vào một trang dài — mất long-tail SEO.</li>
  <li><strong>Meta unique:</strong> Mỗi trang title/description riêng — tránh duplicate.</li>
  <li><strong>Internal link:</strong> Trang chủ → dịch vụ → case study → liên hệ.</li>
  <li><strong>Google Business Profile:</strong> Đồng bộ NAP với website — tăng local pack.</li>
  <li><strong>Blog (giai đoạn 2):</strong> 1–2 bài chất/tháng — hỗ trợ E-E-A-T.</li>
</ul>

<p>Phân biệt thêm: <a href="${SITE}/blog/thiet-ke-website-cong-ty">thiết kế website công ty</a> (nhấn thương hiệu tổng thể) vs <a href="${SITE}/blog/thiet-ke-website-doanh-nghiep">website doanh nghiệp</a> (cấu trúc corporate rộng hơn).</p>

<h2 id="chon-doi-tac">Chọn đối tác thiết kế website giới thiệu</h2>

<ul>
  <li>Portfolio có web corporate/B2B thật — không chỉ landing bán khóa học</li>
  <li>Báo giá ghi rõ số trang, vòng sửa, timeline, quyền sở hữu source</li>
  <li>Cam kết mobile + SSL + tốc độ trước bàn giao</li>
  <li>Hỗ trợ nhập nội dung About — nhiều khách kẹt ở bước copywriting</li>
  <li>Bảo hành sửa lỗi 30–90 ngày sau go-live</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website giới thiệu công ty</h2>

<ul>
  <li>Copy nguyên profile PDF cũ 10 trang — wall of text, không ai đọc trên mobile.</li>
  <li>Chỉ có Fanpage — mất SEO và không chuyên nghiệp trước đối tác B2B.</li>
  <li>Thiếu MST/địa chỉ — khách nghi ngờ “công ty ảo”.</li>
  <li>Slider ảnh nặng trang chủ — chậm, bounce cao.</li>
  <li>Không có CTA — khách đọc xong không biết bước tiếp theo.</li>
  <li>Làm xong 3 năm không cập nhật — tin tức cũ, nhân sự lỗi thời.</li>
  <li>Dùng template trùng đối thủ — mất khác biệt thương hiệu.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Hướng dẫn tổng quan A-Z.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty`,
    label: "Website công ty",
    desc: "Uy tín thương hiệu và pháp lý.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ho-so-nang-luc`,
    label: "Website hồ sơ năng lực",
    desc: "HSNL online cho nhà thầu B2B.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký tư vấn",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website giới thiệu công ty giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ (5–7 trang) đến 9.000.000đ (thiết kế độc quyền, blog, đa ngôn ngữ). Báo giá chính xác sau khảo sát số trang.",
    },
    {
      q: "Website giới thiệu cần bao nhiêu trang?",
      a: "Tối thiểu 5 trang: Trang chủ, Giới thiệu, Dịch vụ, Liên hệ + ít nhất 1 trang phụ (Dự án hoặc Tin tức). SME phổ biến 6–10 trang.",
    },
    {
      q: "Có thể chỉ làm one-page giới thiệu không?",
      a: "Có — phù hợp công ty mới ngân sách thấp. Tuy nhiên đa trang tốt hơn cho SEO long-tail từng dịch vụ.",
    },
    {
      q: "Website giới thiệu khác website công ty thế nào?",
      a: "Gần như cùng loại corporate. “Giới thiệu” nhấn brochure online thay PDF; “công ty” nhấn thương hiệu và uy tín tổng thể. Thực tế triển khai tương tự.",
    },
    {
      q: "Có cần blog trên web giới thiệu không?",
      a: "Không bắt buộc ngày đầu — nên có kế hoạch 3–6 tháng sau launch. 1–2 bài chất/tháng hỗ trợ SEO và chứng minh hoạt động.",
    },
    {
      q: "Bao lâu hoàn thành website giới thiệu?",
      a: "Thường 2–4 tuần cho 6–10 trang. Phụ thuộc tốc độ cung cấp nội dung About và duyệt thiết kế.",
    },
    {
      q: "WordPress hay code tay cho web giới thiệu?",
      a: "WordPress phù hợp cần tự sửa tin tức nhiều. Next.js/custom phù hợp cần tốc độ cao và bảo mật. SME thường chọn WordPress vì dễ vận hành.",
    },
    {
      q: "Bứt Phá có làm website giới thiệu công ty không?",
      a: "Có — tư vấn theo quy mô và ngành của bạn. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website giới thiệu công ty</strong> là bước chuyển profile giấy/PDF sang brochure online 24/7 — giúp khách tìm thấy bạn trên Google, xem năng lực trước cuộc họp và liên hệ qua form/Zalo ngay trên mobile. Ưu tiên: nội dung About thật, MST minh bạch, case study cụ thể và CTA rõ trên mọi trang dịch vụ.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá minh bạch theo số trang và gói tính năng SME của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website giới thiệu công ty",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
