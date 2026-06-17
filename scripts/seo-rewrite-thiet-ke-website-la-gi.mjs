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

const KEYWORD = "thiết kế website là gì";
const TITLE = "Thiết Kế Website Là Gì? Quy Trình Và Tiêu Chí Chọn Đối Tác";

export const REWRITE_THIET_KE_WEBSITE_LA_GI = {
  title: TITLE,
  slug: "thiet-ke-website-la-gi",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "làm website, xây dựng website, dịch vụ thiết kế web, quy trình thiết kế website, website là gì",
  metaTitle: "Thiết Kế Website Là Gì? Quy Trình & Chọn Đối Tác 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website là gì? Giải thích quy trình A-Z: khảo sát, UI/UX, lập trình, SEO, bàn giao. Tiêu chí chọn đối tác uy tín và báo giá 3–12 triệu tại Việt Nam.",
  description:
    "Giải thích thiết kế website là gì: định nghĩa, quy trình 7 bước, loại website phổ biến, tiêu chí chọn đối tác và sai lầm cần tránh khi làm web lần đầu.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Là Gì? Quy Trình & Chọn Đối Tác 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "dinh-nghia", label: "Thiết kế website là gì?" },
  { id: "khac-biet", label: "Website khác gì Fanpage, Landing?" },
  { id: "loai-website", label: "Các loại website phổ biến" },
  { id: "thanh-phan", label: "Thành phần trong quy trình" },
  { id: "quy-trinh-7-buoc", label: "Quy trình 7 bước A-Z" },
  { id: "vai-tro-kinh-doanh", label: "Vai trò trong kinh doanh" },
  { id: "tieu-chi-doi-tac", label: "Tiêu chí chọn đối tác" },
  { id: "bao-gia", label: "Chi phí tham khảo 2026" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website</strong> là quy trình xây dựng một trang web hoàn chỉnh — từ khảo sát mục tiêu kinh doanh, thiết kế giao diện (UI/UX), lập trình, tối ưu SEO, triển khai hosting đến bàn giao cho chủ doanh nghiệp vận hành. Không chỉ là “làm cho đẹp”, <strong>${KEYWORD}</strong> còn bao gồm cấu trúc nội dung, tốc độ tải, bảo mật và khả năng chuyển đổi khách truy cập thành lead hoặc đơn hàng.`,
    `Bài viết trả lời đúng tiêu đề <em>${TITLE}</em>: định nghĩa dễ hiểu cho người mới, phân biệt website với kênh khác, mô tả quy trình 7 bước thực tế tại agency Việt Nam, tiêu chí chọn đối tác và mức giá tham chiếu — giúp bạn ra quyết định đầu tư đúng ngay từ lần đầu.`,
  ],
})}

${wpKeyTakeaways([
  "Thiết kế website = khảo sát + UI/UX + code + SEO + hosting + bàn giao — không chỉ giao diện.",
  "Website là tài sản số bạn sở hữu; Fanpage phụ thuộc nền tảng, Landing tập trung một chiến dịch.",
  "Quy trình chuẩn: Brief → Wireframe → Design → Dev → SEO → Test → Go-live.",
  "Chọn đối tác: portfolio thật, hợp đồng rõ scope, bảo hành, không cam kết “top Google 7 ngày”.",
  "Ngân sách SME Việt Nam: 3–12 triệu website giới thiệu/doanh nghiệp; TMĐT cao hơn.",
])}

${wpImg(5, "Thiết kế website là gì — quy trình và tiêu chí chọn đối tác")}

<h2 id="dinh-nghia">Thiết kế website là gì?</h2>

<p><strong>Thiết kế website</strong> (web design &amp; development) là hoạt động tạo ra một <em>website hoàn chỉnh</em> phục vụ mục tiêu cụ thể: giới thiệu công ty, thu lead, bán hàng online, đặt lịch, tuyển dụng… Quy trình gồm nhiều chuyên môn phối hợp — không ai chỉ “vẽ giao diện” hay chỉ “code” là xong.</p>

<p>Khi tìm hiểu <strong>${KEYWORD}</strong>, bạn cần nắm ba lớp:</p>

<ul>
  <li><strong>UI (User Interface):</strong> Giao diện trực quan — màu sắc, typography, layout, hình ảnh theo nhận diện thương hiệu.</li>
  <li><strong>UX (User Experience):</strong> Trải nghiệm — khách tìm thông tin, gọi điện, điền form có dễ không; menu có rõ không.</li>
  <li><strong>Development &amp; SEO:</strong> Lập trình CMS hoặc custom code, responsive mobile, tốc độ, HTTPS, meta title, schema, sitemap.</li>
</ul>

<p>Kết quả cuối: URL truy cập được (vd: <code>congty.com</code>), nội dung cập nhật được qua admin, form liên hệ hoạt động, Google có thể index — đó mới là <strong>thiết kế website</strong> hoàn chỉnh.</p>

<h2 id="khac-biet">Website khác gì Fanpage, Landing Page?</h2>

<p>Nhiều chủ shop chỉ có Fanpage Zalo/Facebook và hỏi có cần website không. Hiểu <strong>${KEYWORD}</strong> cũng là hiểu khi nào cần từng kênh:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Fanpage</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Landing Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Sở hữu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bạn sở hữu tên miền &amp; dữ liệu</td>
      <td class="border border-indigo-100 px-3 py-2">Phụ thuộc Meta/Zalo</td>
      <td class="border border-indigo-100 px-3 py-2">Thường 1 trang, 1 chiến dịch</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO Google</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Mạnh — index lâu dài</td>
      <td class="border border-indigo-100 px-3 py-2">Hạn chế</td>
      <td class="border border-indigo-100 px-3 py-2">Chủ yếu ads, ít SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phạm vi nội dung</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều trang, blog, catalog</td>
      <td class="border border-indigo-100 px-3 py-2">Feed, bài đăng</td>
      <td class="border border-indigo-100 px-3 py-2">Một offer, một CTA</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phù hợp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nền tảng trung tâm thương hiệu</td>
      <td class="border border-indigo-100 px-3 py-2">Tương tác, community</td>
      <td class="border border-indigo-100 px-3 py-2">Chạy quảng cáo chuyển đổi</td>
    </tr>
  </tbody>
</table>

<p>Chiến lược phổ biến: <strong>website làm hub</strong>, Fanpage kéo traffic &amp; chăm sóc, Landing dùng cho từng campaign ads. <strong>Thiết kế website</strong> là bước đầu khi muốn xây dựng uy tín B2B hoặc SEO organic bền vững.</p>

${wpImg(6, "Thiết kế website là gì — so sánh website và Fanpage")}

<h2 id="loai-website">Các loại website phổ biến khi thiết kế</h2>

<p>Sau khi hiểu <strong>${KEYWORD}</strong>, bước tiếp là xác định <em>loại web</em> cần làm — ảnh hưởng trực tiếp đến thời gian và chi phí:</p>

<ul>
  <li><strong>Website giới thiệu / corporate:</strong> 5–15 trang — About, dịch vụ, liên hệ. Phổ biến với SME, nhà thầu, dịch vụ chuyên môn.</li>
  <li><strong>Landing Page:</strong> 1 trang tập trung chuyển đổi — phù hợp chạy ads, sản phẩm đơn lẻ.</li>
  <li><strong>Website bán hàng / TMĐT:</strong> Catalog, giỏ hàng, thanh toán VNPay/MoMo/COD — phức tạp hơn, cần vận hành logistics.</li>
  <li><strong>Blog / tin tức:</strong> Content hub phục vụ SEO — category, tag, RSS.</li>
  <li><strong>Website đặt lịch / booking:</strong> Spa, clinic, tư vấn — calendar, nhắc lịch.</li>
  <li><strong>Custom theo yêu cầu:</strong> Tích hợp ERP, API, portal B2B — báo giá riêng sau khảo sát.</li>
</ul>

<p>Bứt Phá Marketing tư vấn chọn loại phù hợp ngân sách trước khi bắt đầu <strong>thiết kế website</strong> — tránh làm TMĐT khi mới cần trang giới thiệu 5 trang.</p>

<h2 id="thanh-phan">Thành phần cốt lõi trong quy trình thiết kế website</h2>

<p>Một dự án <strong>thiết kế website</strong> chuyên nghiệp thường gồm các hạng mục sau. Đây là checklist khi đọc báo giá:</p>

<ol>
  <li><strong>Khảo sát &amp; brief:</strong> Mục tiêu KPI (lead, gọi điện, đơn hàng), đối tượng, đối thủ, từ khóa SEO.</li>
  <li><strong>Sitemap &amp; wireframe:</strong> Sơ đồ trang và bố cục khối nội dung trước khi vẽ màu.</li>
  <li><strong>UI design:</strong> Mockup desktop + mobile theo brand guideline.</li>
  <li><strong>Front-end / back-end:</strong> HTML/CSS/JS hoặc WordPress, Next.js… Form, chat Zalo, tích hợp thanh toán.</li>
  <li><strong>Responsive:</strong> Hiển thị tốt trên điện thoại — Google mobile-first indexing.</li>
  <li><strong>SEO on-page:</strong> Title, meta, H1–H3, alt ảnh, internal link, sitemap.xml.</li>
  <li><strong>Hạ tầng:</strong> Tên miền, hosting, SSL HTTPS.</li>
  <li><strong>Analytics:</strong> Google Analytics 4, Search Console, pixel (nếu chạy ads).</li>
  <li><strong>Bàn giao:</strong> Tài khoản admin, hướng dẫn sử dụng, bảo hành lỗi kỹ thuật.</li>
</ol>

<p>Thiếu bất kỳ mục nào, website có thể “đẹp” nhưng không mang lại khách hàng — đó là lý do cần hiểu đầy đủ <strong>${KEYWORD}</strong> trước khi ký hợp đồng.</p>

<h2 id="quy-trinh-7-buoc">Quy trình thiết kế website 7 bước (A-Z)</h2>

<p>Quy trình <strong>thiết kế website</strong> tại agency uy tín tại Việt Nam thường diễn ra như sau:</p>

<h3>Bước 1 — Khảo sát &amp; đề xuất giải pháp (3–5 ngày)</h3>
<p>Trao đổi mục tiêu, ngân sách, tham khảo website đối thủ. Agency đề xuất loại web, sitemap sơ bộ, timeline.</p>

<h3>Bước 2 — Wireframe &amp; duyệt cấu trúc (3–7 ngày)</h3>
<p>Bố cục từng trang: hero, dịch vụ, testimonial, CTA, footer. Khách duyệt trước khi thiết kế màu — tiết kiệm sửa đổi tốn kém.</p>

<h3>Bước 3 — Thiết kế UI (5–10 ngày)</h3>
<p>Visual design theo logo, màu thương hiệu. Thường 2 vòng chỉnh sửa trong hợp đồng chuẩn.</p>

<h3>Bước 4 — Lập trình &amp; tích hợp (1–3 tuần)</h3>
<p>Code hoặc dựng CMS, nhập nội dung khách cung cấp, form gửi email/Zalo, responsive.</p>

<h3>Bước 5 — SEO on-page &amp; tốc độ (3–5 ngày)</h3>
<p>Meta từng trang, nén ảnh, lazy-load, Core Web Vitals cơ bản, schema Organization.</p>

<h3>Bước 6 — Kiểm thử (2–3 ngày)</h3>
<p>Test Chrome/Safari mobile, form, link hỏng, PageSpeed Insights. Sửa lỗi trước go-live.</p>

<h3>Bước 7 — Go-live &amp; bàn giao</h3>
<p>Trỏ DNS tên miền, bật SSL, đào tạo admin 1 buổi, bàn giao tài khoản. Hỗ trợ bảo hành theo hợp đồng.</p>

<p><strong>Thời gian tổng:</strong> Landing 1–2 tuần; website doanh nghiệp 3–6 tuần; TMĐT 6–12 tuần. Hiểu quy trình giúp bạn theo dõi tiến độ và không bị “kẹt” vì thiếu nội dung từ phía khách.</p>

${wpImg(7, "Quy trình thiết kế website 7 bước từ khảo sát đến bàn giao")}

<h2 id="vai-tro-kinh-doanh">Vai trò của website trong kinh doanh</h2>

<p><strong>Thiết kế website</strong> không phải chi phí trang trí — khi làm đúng, website đảm nhận:</p>

<ul>
  <li><strong>Uy tín 24/7:</strong> Khách tra cứu lúc nửa đêm vẫn thấy thông tin công ty, MST, địa chỉ, case study.</li>
  <li><strong>Kênh lead organic:</strong> SEO đưa khách có nhu cầu thật — chi phí dài hạn thấp hơn ads thuần.</li>
  <li><strong>Hỗ trợ sales:</strong> Sales gửi link trang dịch vụ thay vì giải thích dài qua chat.</li>
  <li><strong>Đo lường:</strong> Biết trang nào tạo form, cuộc gọi — tối ưu CRO liên tục.</li>
  <li><strong>Sở hữu dữ liệu:</strong> Email, hành vi — không phụ thuộc thuật toán mạng xã hội.</li>
</ul>

<p>Doanh nghiệp B2B (xây dựng, pháp lý, logistics) đặc biệt cần website chuyên nghiệp — khách thường shortlist 3–5 đơn vị qua Google trước khi gọi điện.</p>

<h2 id="tieu-chi-doi-tac">Tiêu chí chọn đối tác thiết kế website</h2>

<p>Phần quan trọng của <strong>${KEYWORD}</strong> cho người sắp thuê dịch vụ — <em>chọn đối tác nào</em>:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nên có</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Cảnh báo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Portfolio</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Dự án cùng ngành, link live</td>
      <td class="border border-indigo-100 px-3 py-2">Chỉ ảnh mockup, không URL thật</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Báo giá</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bảng scope từng hạng mục</td>
      <td class="border border-indigo-100 px-3 py-2">“Trọn gói 1 triệu full SEO”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hợp đồng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">MST, đợt thanh toán, bảo hành</td>
      <td class="border border-indigo-100 px-3 py-2">Chỉ chuyển khoản cá nhân, không HĐ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO</strong></td>
      <td class="border border-indigo-100 px-3 py-2">On-page kỹ thuật, index GSC</td>
      <td class="border border-indigo-100 px-3 py-2">Cam kết top 1 trong 1 tuần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bàn giao</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Source/admin, đào tạo</td>
      <td class="border border-indigo-100 px-3 py-2">Không giao quyền, phí “mở khóa”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hỗ trợ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Hotline/Zalo sau go-live</td>
      <td class="border border-indigo-100 px-3 py-2">Mất liên lạc sau nhận tiền</td>
    </tr>
  </tbody>
</table>

<p>Nên so sánh <strong>3 báo giá</strong> cùng scope — không chỉ so giá thấp nhất. Đọc thêm hướng dẫn chọn đối tác trong bài <a href="${SITE}/blog/thiet-ke-website-tron-goi">thiết kế website trọn gói</a> và <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="bao-gia">Chi phí thiết kế website tham khảo 2026</h2>

<p>Sau khi hiểu <strong>${KEYWORD}</strong>, câu hỏi tiếp theo là <em>giá bao nhiêu</em>. Tham chiếu thị trường Việt Nam:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói (Bứt Phá)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Website cơ bản, mobile, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">SEO + UX nâng cao, tốc độ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">CRO, tích hợp marketing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều tính năng, quy mô lớn hơn</td>
    </tr>
  </tbody>
</table>

<p>Chưa gồm tên miền (~350.000đ/.com), hosting (từ ~3,3 triệu/năm tùy dung lượng) — chi tiết tại bài <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="sai-lam">Sai lầm thường gặp khi làm website lần đầu</h2>

<ul>
  <li><strong>Chỉ nhìn giá rẻ:</strong> Template 500k thiếu SEO, chậm, không sửa được — mất tiền làm lại.</li>
  <li><strong>Không chuẩn bị nội dung:</strong> Trì hoãn dự án vì chờ copy/ảnh từ khách.</li>
  <li><strong>Bỏ qua mobile:</strong> 70%+ traffic VN từ điện thoại.</li>
  <li><strong>Không gắn Analytics:</strong> Không biết trang nào hiệu quả để cải thiện.</li>
  <li><strong>Tự làm hết không có chiến lược:</strong> Website đẹp nhưng không có từ khóa, không CTA.</li>
  <li><strong>Tin cam kết SEO ảo:</strong> Top Google cần thời gian, content và authority — không phải “bật nút”.</li>
</ul>

${wpImg(8, "Sai lầm cần tránh khi thiết kế website lần đầu")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Hướng dẫn tổng hợp từ A-Z và bảng giá chi tiết.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Yếu tố ảnh hưởng giá và phí ẩn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Cấu trúc web corporate sau khi hiểu khái niệm.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm website",
    desc: "Xem gói dịch vụ và tư vấn miễn phí.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website là gì — nói ngắn gọn?",
      a: "Là quy trình tạo website hoàn chỉnh: khảo sát, thiết kế giao diện, lập trình, SEO, hosting và bàn giao để doanh nghiệp vận hành và tiếp cận khách online.",
    },
    {
      q: "Thiết kế website mất bao lâu?",
      a: "Landing Page: 1–2 tuần. Website doanh nghiệp: 3–6 tuần. TMĐT hoặc tính năng phức tạp: 2–3 tháng trở lên.",
    },
    {
      q: "Thiết kế website giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ (Giới thiệu) đến 12.000.000đ (Hệ thống). TMĐT và custom báo giá riêng sau khảo sát.",
    },
    {
      q: "WordPress hay code riêng?",
      a: "WordPress phù hợp cập nhật blog/tin thường xuyên. Code riêng (Next.js, Laravel…) tối ưu hiệu năng và tính năng đặc thù. Xem bài WordPress vs custom.",
    },
    {
      q: "Có cần website khi đã có Fanpage?",
      a: "Nên có — website sở hữu được, SEO Google tốt hơn, phù hợp uy tín B2B. Fanpage bổ trợ tương tác.",
    },
    {
      q: "Tự thiết kế website được không?",
      a: "Có thể dùng Wix/Webflow cho MVP — nhưng SEO kỹ thuật, tốc độ và tích hợp chuyên sâu thường cần đơn vị có kinh nghiệm.",
    },
    {
      q: "Thiết kế website có bao gồm viết nội dung?",
      a: "Tùy gói — thường khách cung cấp text/ảnh; một số gói cao hơn hoặc gói chăm sóc web có hỗ trợ viết SEO.",
    },
    {
      q: "Làm sao biết đối tác uy tín?",
      a: "Portfolio live, hợp đồng công ty MST, báo giá scope rõ, review thật, không cam kết top Google phi thực tế.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website là gì</strong> — câu trả lời đầy đủ là hành trình xây dựng tài sản số phục vụ kinh doanh: không dừng ở “giao diện đẹp” mà gồm UX, code, SEO, hosting và đo lường. Nắm quy trình 7 bước và tiêu chí chọn đối tác giúp bạn tránh làm lại, tiết kiệm thời gian và ngân sách.`,
    `Bước tiếp theo: xác định loại website (giới thiệu, bán hàng, booking…), so sánh 3 báo giá cùng scope và bắt đầu từ gói phù hợp (3–6 triệu cho SME). Liên hệ Bứt Phá Marketing để được tư vấn miễn phí sau khi bạn đã hiểu rõ <strong>${KEYWORD}</strong>.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website miễn phí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
