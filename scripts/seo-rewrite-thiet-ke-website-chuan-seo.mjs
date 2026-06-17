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

const KEYWORD = "thiết kế website chuẩn seo";
const TITLE = "Thiết Kế Website Chuẩn SEO Giúp Tăng Thứ Hạng Google";

export const REWRITE_THIET_KE_WEBSITE_CHUAN_SEO = {
  title: TITLE,
  slug: "thiet-ke-website-chuan-seo",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website chuẩn seo, seo on-page, tối ưu google, technical seo website, core web vitals, seo khi làm web",
  metaTitle: "Thiết Kế Website Chuẩn SEO | Tăng Thứ Hạng Google | Bứt Phá",
  metaDescription:
    "Hướng dẫn thiết kế website chuẩn SEO: technical, on-page, Core Web Vitals, schema, nội dung và checklist bàn giao. Giúp website index và xếp hạng bền trên Google.",
  description:
    "Phân tích toàn diện thiết kế website chuẩn SEO — tích hợp tối ưu Google ngay từ kiến trúc, không SEO vá sau khi web đã lên.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Chuẩn SEO | Tăng Thứ Hạng Google | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "chuan-seo-la-gi", label: "Website chuẩn SEO là gì?" },
  { id: "seo-tu-luc-dau", label: "Vì sao SEO ngay khi thiết kế?" },
  { id: "technical-seo", label: "Technical SEO khi làm web" },
  { id: "on-page-seo", label: "On-page SEO từng trang" },
  { id: "core-web-vitals", label: "Core Web Vitals & tốc độ" },
  { id: "schema-markup", label: "Schema & rich snippet" },
  { id: "noi-dung-eeat", label: "Nội dung & E-E-A-T" },
  { id: "seo-dia-phuong", label: "SEO địa phương trên website" },
  { id: "checklist-ban-giao", label: "Checklist SEO bàn giao" },
  { id: "do-luong", label: "Đo lường & tối ưu liên tục" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} nghĩa là xây dựng website với tối ưu công cụ tìm kiếm được tích hợp từ đầu — URL, cấu trúc heading, tốc độ tải, schema, internal link và khung nội dung — thay vì làm web đẹp xong mới “vá SEO” sau vài tháng. Google không chỉ đọc từ khóa; thuật toán đánh giá trải nghiệm người dùng, khả năng crawl và mức độ phù hợp nội dung với ý định tìm kiếm.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: giải thích website chuẩn SEO khác website thường ở điểm nào, kỹ thuật cần có khi triển khai, checklist nghiệm thu trước khi go-live và cách đo lường để cải thiện thứ hạng trong 3–12 tháng. Phù hợp chủ doanh nghiệp, marketer và người brief dự án web lần đầu.`,
  ],
})}

${wpKeyTakeaways([
  "SEO hiệu quả nhất khi gắn vào kiến trúc web từ giai đoạn wireframe — sửa sau tốn gấp 3–5 lần.",
  "Technical SEO: HTTPS, mobile-first, sitemap, robots, canonical, URL sạch, không chặn CSS/JS.",
  "On-page: 1 H1/trang, title 50–60 ký tự, meta 140–160 ký tự, alt ảnh, internal link có chủ đích.",
  "Core Web Vitals (LCP, INP, CLS) ảnh hưởng trải nghiệm và khả năng cạnh tranh trên SERP.",
  "Thứ hạng Google thường cần 3–6 tháng nội dung + kỹ thuật ổn — tránh cam kết top 7 ngày.",
])}

${wpImg(1, "Thiết kế website chuẩn SEO giúp tăng thứ hạng Google")}

<h2 id="chuan-seo-la-gi">Website chuẩn SEO là gì?</h2>

<p><strong>Website chuẩn SEO</strong> là website đáp ứng đồng thời hai mục tiêu: (1) người dùng dễ đọc, dễ mua, dễ liên hệ; (2) bot Google crawl, hiểu và index nội dung chính xác. Hai mục tiêu này không trái ngược — Google ưu tiên trang mang giá trị thật cho người tìm kiếm.</p>

<p>Khi nói đến <strong>${KEYWORD}</strong>, nhiều người chỉ nghĩ đến “nhồi từ khóa”. Thực tế, chuẩn SEO gồm ba lớp:</p>

<ul>
  <li><strong>Technical SEO:</strong> Hạ tầng giúp Google truy cập và lập chỉ mục trang (index).</li>
  <li><strong>On-page SEO:</strong> Tối ưu từng URL — title, heading, nội dung, ảnh, link nội bộ.</li>
  <li><strong>Content &amp; authority:</strong> Nội dung trả lời đúng câu hỏi, cập nhật, có độ tin cậy (E-E-A-T).</li>
</ul>

<h3>Website chuẩn SEO khác website “chỉ đẹp” thế nào?</h3>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website thường</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website chuẩn SEO</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">URL</td>
      <td class="border border-indigo-100 px-3 py-2">?id=123, tham số dài</td>
      <td class="border border-indigo-100 px-3 py-2">/dich-vu/thiet-ke-website (slug có nghĩa)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Heading</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều H1, bố cục lộn xộn</td>
      <td class="border border-indigo-100 px-3 py-2">1 H1, H2/H3 phân cấp logic</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tốc độ</td>
      <td class="border border-indigo-100 px-3 py-2">Ảnh nặng, plugin thừa</td>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu LCP, lazy-load, cache</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Index</td>
      <td class="border border-indigo-100 px-3 py-2">Không có sitemap, chặn robots nhầm</td>
      <td class="border border-indigo-100 px-3 py-2">sitemap.xml, GSC, canonical rõ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Nội dung</td>
      <td class="border border-indigo-100 px-3 py-2">Vài dòng mô tả chung chung</td>
      <td class="border border-indigo-100 px-3 py-2">800–2.000 từ/trang dịch vụ, intent rõ</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-tu-luc-dau">Vì sao phải thiết kế website chuẩn SEO ngay từ đầu?</h2>

<p>Lỗi phổ biến: làm web 3 tháng → mới thuê SEO → phát hiện URL không sửa được, theme chậm, không có blog, duplicate trang www/non-www. Chi phí refactor lớn hơn nhiều so với <strong>${KEYWORD}</strong> đúng ngay từ brief.</p>

<h3>Lợi ích khi tích hợp SEO vào giai đoạn thiết kế</h3>

<ol>
  <li><strong>Sitemap logic:</strong> Cấu trúc trang dịch vụ / blog / liên hệ được vẽ trước — mỗi URL một mục tiêu từ khóa.</li>
  <li><strong>Tránh duplicate:</strong> Quyết định canonical, redirect 301, www hay non-www trước khi index.</li>
  <li><strong>Performance by design:</strong> Chọn stack nhẹ (hoặc theme tối ưu), không phụ thuộc 40 plugin WordPress.</li>
  <li><strong>Content brief sớm:</strong> Biết cần viết gì cho từng trang trước khi dev — tránh launch với trang trống.</li>
</ol>

<blockquote><p><strong>Ghi nhớ:</strong> SEO là marathon. <strong>${KEYWORD}</strong> không đảm bảo top 1 tuần sau launch — nhưng tạo nền để traffic organic tích lũy trong 6–12 tháng, giảm phụ thuộc ads.</p></blockquote>

${wpImg(0, "Tích hợp SEO ngay từ giai đoạn thiết kế website")}

<h2 id="technical-seo">Technical SEO khi thiết kế website</h2>

<p>Technical SEO là “đường vào nhà” cho Googlebot. Dù nội dung hay, bot không vào được thì không index.</p>

<h3>HTTPS &amp; bảo mật</h3>
<p>SSL (HTTPS) là tiêu chuẩn tối thiểu. Trình duyệt cảnh báo “Không bảo mật” làm khách rời ngay. Chứng chỉ thường miễn phí qua Let’s Encrypt hoặc hosting.</p>

<h3>Cấu trúc URL</h3>
<ul>
  <li>Slug ngắn, tiếng Việt không dấu: <code>thiet-ke-website-chuan-seo</code></li>
  <li>Tránh: <code>page.php?cat=5&amp;id=99</code></li>
  <li>URL ổn định — đổi slug sau khi index cần redirect 301</li>
</ul>

<h3>Sitemap &amp; robots.txt</h3>
<p><strong>sitemap.xml</strong> liệt kê URL muốn index; gửi lên Google Search Console. <strong>robots.txt</strong> chỉ chặn khu vực admin, không chặn nhầm CSS/JS (Google cần render trang). Kiểm tra không có <code>noindex</code> trên trang production.</p>

<h3>Canonical &amp; redirect</h3>
<p>Một nội dung — một URL chuẩn. Trang trùng (http/https, www/non-www, trailing slash) cần 301 về bản canonical. Tránh nội dung copy giữa nhiều URL.</p>

<h3>Mobile-first &amp; responsive</h3>
<p>Google index chủ yếu bản mobile. Menu, font, nút bấm phải dùng được trên màn hình nhỏ. Không ẩn nội dung quan trọng chỉ trên desktop.</p>

<h3>Khả năng crawl JavaScript</h3>
<p>Site React/Next.js cần SSR hoặc SSG cho trang quan trọng — không chỉ render phía client khiến bot thấy trang trống. Đây là điểm <strong>${KEYWORD}</strong> với stack hiện đại cần lưu ý.</p>

${wpImg(2, "Technical SEO — sitemap, HTTPS và cấu trúc URL")}

<h2 id="on-page-seo">On-page SEO cho từng trang</h2>

<p>On-page là tối ưu trực tiếp trên từng URL. Checklist Yoast-style cho mỗi trang dịch vụ / bài blog:</p>

<ul>
  <li><strong>Title tag:</strong> 50–60 ký tự, chứa từ khóa chính, hấp dẫn click (CTR).</li>
  <li><strong>Meta description:</strong> 140–160 ký tự, tóm tắt lợi ích + CTA ngầm.</li>
  <li><strong>H1:</strong> Duy nhất, khớp chủ đề trang (có thể khác title một chút).</li>
  <li><strong>H2/H3:</strong> Chia nhỏ nội dung, chứa biến thể từ khóa tự nhiên.</li>
  <li><strong>Đoạn mở đầu:</strong> Từ khóa trong 100 từ đầu — không nhồi.</li>
  <li><strong>Alt ảnh:</strong> Mô tả thật, có từ khóa khi phù hợp.</li>
  <li><strong>Internal link:</strong> 2–5 link tới trang liên quan (dịch vụ ↔ blog ↔ liên hệ).</li>
</ul>

<h3>Tránh nhồi từ khóa (keyword stuffing)</h3>
<p>Lặp “thiết kế website chuẩn seo” 30 lần/500 từ làm Google penalize chất lượng. Dùng từ đồng nghĩa: <em>tối ưu google</em>, <em>seo on-page</em>, <em>website thân thiện công cụ tìm kiếm</em>.</p>

<h2 id="core-web-vitals">Core Web Vitals và tốc độ tải</h2>

<p>Core Web Vitals là bộ chỉ số trải nghiệm Google quan tâm:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Chỉ số</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ý nghĩa</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục tiêu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>LCP</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Thời gian hiển thị nội dung chính</td>
      <td class="border border-indigo-100 px-3 py-2">&lt; 2,5 giây</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>INP</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Độ phản hồi khi tương tác</td>
      <td class="border border-indigo-100 px-3 py-2">&lt; 200ms</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CLS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Layout nhảy khi tải</td>
      <td class="border border-indigo-100 px-3 py-2">&lt; 0,1</td>
    </tr>
  </tbody>
</table>

<p>Cách tối ưu khi <strong>${KEYWORD}</strong>:</p>
<ul>
  <li>Ảnh WebP/AVIF, kích thước đúng viewport, lazy-load below fold</li>
  <li>Font subset, preload font quan trọng</li>
  <li>Hosting gần người dùng (VN hoặc CDN châu Á)</li>
  <li>Giảm plugin/script thừa — mỗi script là điểm trừ tốc độ</li>
  <li>Test bằng PageSpeed Insights trước bàn giao</li>
</ul>

${wpImg(3, "Core Web Vitals khi thiết kế website chuẩn SEO")}

<h2 id="schema-markup">Schema markup và rich snippet</h2>

<p>Schema (JSON-LD) giúp Google hiểu loại nội dung — đôi khi hiển thị rich result (FAQ, breadcrumb, article date).</p>

<ul>
  <li><strong>Organization / LocalBusiness:</strong> Tên, logo, địa chỉ, hotline — quan trọng doanh nghiệp địa phương.</li>
  <li><strong>WebSite + SearchAction:</strong> Site name, URL chính.</li>
  <li><strong>Article:</strong> Blog — headline, datePublished, author.</li>
  <li><strong>FAQPage:</strong> Cặp câu hỏi–trả lời trong bài (như mục FAQ cuối bài).</li>
  <li><strong>BreadcrumbList:</strong> Đường dẫn Trang chủ → Blog → Bài viết.</li>
</ul>

<p>Lưu ý: Schema phải khớp nội dung hiển thị trên trang. Đánh dấu review/sao giả vi phạm chính sách Google.</p>

<h2 id="noi-dung-eeat">Chiến lược nội dung và E-E-A-T</h2>

<p>Google đánh giá <strong>Experience, Expertise, Authoritativeness, Trustworthiness</strong>. Website chuẩn SEO cần nội dung chứng minh bạn biết việc:</p>

<ul>
  <li>Trang dịch vụ: quy trình, bảng giá, case study, FAQ — không chỉ 200 từ chung chung</li>
  <li>Blog: bài pillar dày (như hướng dẫn thiết kế website), bài ngách theo ngành</li>
  <li>Trang Giới thiệu: đội ngũ, kinh nghiệm, chứng chỉ</li>
  <li>Thông tin liên hệ, MST, chính sách bảo mật — tín hiệu trust</li>
</ul>

<h3>Internal linking có chiến lược</h3>
<p>Mô hình hub-spoke: Bài pillar <a href="${SITE}/blog/thiet-ke-website">thiết kế website</a> liên kết tới bài con (doanh nghiệp, chuẩn SEO, báo giá…). Bài con link ngược về pillar. Giúp Google hiểu trang nào quan trọng nhất.</p>

<h2 id="seo-dia-phuong">SEO địa phương trên website</h2>

<p>Doanh nghiệp phục vụ theo khu vực (TP.HCM, Hà Nội…) nên tích hợp local SEO trên web:</p>
<ul>
  <li>Nhắc địa danh tự nhiên trong title/H2 (vd: “thiết kế website TP.HCM”)</li>
  <li>Nhúng Google Maps, NAP nhất quán (Name, Address, Phone) với Google Business Profile</li>
  <li>Schema LocalBusiness với geo coordinates</li>
  <li>Trang landing theo quận/huyện chỉ khi có nội dung unique — tránh 20 trang copy</li>
</ul>

${wpImg(4, "Nội dung và SEO địa phương trên website")}

<h2 id="checklist-ban-giao">Checklist SEO khi nghiệm thu website</h2>

<p>Trước khi chấp nhận bàn giao <strong>${KEYWORD}</strong>, kiểm tra:</p>

<ol>
  <li>☐ HTTPS hoạt động, redirect http → https</li>
  <li>☐ Một phiên bản www hoặc non-www (301 phiên bản còn lại)</li>
  <li>☐ sitemap.xml truy cập được, đã submit Search Console</li>
  <li>☐ robots.txt không chặn trang chính</li>
  <li>☐ Mỗi trang có title, meta, H1 unique</li>
  <li>☐ Ảnh có alt, không upload file 5MB full resolution</li>
  <li>☐ PageSpeed mobile ≥ 70 (hoặc CWV pass)</li>
  <li>☐ GA4 + Search Console đã gắn, quyền owner</li>
  <li>☐ Form liên hệ gửi được, có thank-you page hoặc event tracking</li>
  <li>☐ Không có lỗi 404 hàng loạt, link nội bộ hỏng</li>
</ol>

<h2 id="do-luong">Đo lường và tối ưu liên tục sau launch</h2>

<p>SEO không kết thúc khi web live. Theo dõi hàng tháng:</p>

<ul>
  <li><strong>Google Search Console:</strong> Impression, click, CTR, từ khóa, lỗi index, CWV</li>
  <li><strong>Google Analytics 4:</strong> Organic traffic, landing page, conversion</li>
  <li><strong>Thứ hạng từ khóa:</strong> 5–10 từ khóa mục tiêu (Ahrefs, GSC, hoặc công cụ miễn phí)</li>
</ul>

<p>Hành động tối ưu: cập nhật bài cũ (refresh content), bổ sung internal link, sửa trang thin content, xây thêm 2–4 bài blog chất lượng/tháng. Cập nhật bài thường hiệu quả hơn spam 100 bài template.</p>

<h3>Timeline thực tế lên Google</h3>
<ul>
  <li><strong>Tuần 1–2:</strong> Index trang chủ và vài URL chính</li>
  <li><strong>Tháng 1–3:</strong> Impression tăng, long-tail xuất hiện</li>
  <li><strong>Tháng 3–6:</strong> Cạnh tranh từ khóa trung bình nếu nội dung + link đủ</li>
  <li><strong>Tháng 6–12:</strong> Tích lũy authority, mở rộng cluster nội dung</li>
</ul>

${wpImg(5, "Đo lường SEO website qua Search Console và GA4")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — bài pillar",
    desc: "Hướng dẫn tổng quan, bảng giá và quy trình làm website.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Thiết kế website doanh nghiệp",
    desc: "Cấu trúc website corporate chuẩn chuyển đổi.",
  },
  {
    href: `${SITE}/blog/bao-gia-thiet-ke-website`,
    label: "Báo giá thiết kế website",
    desc: "Chi phí và hạng mục khi triển khai web.",
  },
  {
    href: `${SITE}/website`,
    label: "Dịch vụ website Bứt Phá Marketing",
    desc: "Gói thiết kế tích hợp SEO on-page từ đầu.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website chuẩn SEO khác SEO sau khi làm web thế nào?",
      a: "Chuẩn SEO tích hợp URL, cấu trúc, tốc độ và schema lúc thiết kế. SEO sau chỉ vá được một phần — đổi URL hoặc theme chậm rất tốn kém.",
    },
    {
      q: "Bao lâu thì website chuẩn SEO lên top Google?",
      a: "Thường 3–6 tháng cho từ khóa trung bình, 6–12 tháng cho từ khóa cạnh tranh. Phụ thuộc nội dung, backlink và độ khó từ khóa.",
    },
    {
      q: "WordPress có chuẩn SEO không?",
      a: "Có, nếu dùng theme nhẹ, plugin SEO (Rank Math/Yoast) đúng cách và không cài plugin thừa. Cần tối ưu tốc độ và bảo mật định kỳ.",
    },
    {
      q: "Core Web Vitals có bắt buộc không?",
      a: "Không phải ranking factor duy nhất nhưng ảnh hưởng trải nghiệm và CTR. Điểm kém làm khách thoát sớm, gián tiếp hại SEO.",
    },
    {
      q: "Có cần blog khi mới làm web chuẩn SEO?",
      a: "Nên có kế hoạch trong 3 tháng đầu. Bắt đầu 2–4 bài chất lượng/tháng tốt hơn 50 bài copy. Blog hỗ trợ long-tail và internal link.",
    },
    {
      q: "Schema có giúp lên top không?",
      a: "Schema giúp Google hiểu nội dung và có thể tăng CTR qua rich snippet. Không thay thế nội dung chất lượng và technical SEO.",
    },
    {
      q: "Gói thiết kế website nào có SEO tại Bứt Phá?",
      a: "Gói Giới thiệu (3 triệu) gồm SEO cơ bản. Gói Tối ưu (6 triệu) trở lên có SEO on-page nâng cao, tốc độ và tích hợp marketing.",
    },
    {
      q: "Làm sao kiểm tra web đã chuẩn SEO chưa?",
      a: "Dùng checklist bàn giao trong bài, PageSpeed Insights, Search Console (lỗi index, CWV) và rà từng trang: title, H1, nội dung unique.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là đầu tư dài hạn: kết hợp technical vững, on-page từng trang, nội dung có giá trị và đo lường liên tục. Website đẹp mà Google không index hoặc tải chậm trên mobile sẽ khó mang về khách organic dù bạn chạy ads bù.`,
    `Nếu đang brief dự án web, hãy đưa checklist SEO vào hợp đồng ngay từ đầu — và chọn đối tác minh bạch về sitemap, tốc độ, Search Console sau bàn giao.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website chuẩn SEO miễn phí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
