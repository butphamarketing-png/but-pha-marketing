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

const KEYWORD = "thiết kế website elearning";
const TITLE = "Thiết Kế Website Elearning Và Khóa Học Online";

export const REWRITE_THIET_KE_WEBSITE_ELEARNING = {
  title: TITLE,
  slug: "thiet-ke-website-elearning",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website khóa học online, LMS việt nam, bán khóa học online, nền tảng elearning",
  metaTitle: "Thiết Kế Website Elearning | LMS & Khóa Học 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website elearning: LMS nhẹ, video khóa học, quiz, chứng chỉ và bán online MoMo/VNPay. Quy trình 7 bước, giá 12–28 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website elearning và khóa học online: LMS, video lesson, drip content, thanh toán và vận hành tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Elearning | LMS & Khóa Học 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "elearning-la-gi", label: "Website elearning là gì?" },
  { id: "loai-khoa-hoc", label: "Loại khóa học online" },
  { id: "lms-la-gi", label: "LMS & tính năng cốt lõi" },
  { id: "cau-truc", label: "Cấu trúc website elearning" },
  { id: "video-lesson", label: "Video, quiz & progress" },
  { id: "ban-khoa-hoc", label: "Bán khóa học online" },
  { id: "membership", label: "Elearning vs membership" },
  { id: "nen-tang", label: "LearnDash, Moodle hay custom?" },
  { id: "marketing", label: "Marketing khóa học" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website elearning</strong> là xây dựng nền tảng web (Learning Management System — LMS) cho phép giảng viên, trainer và doanh nghiệp đào tạo <em>đăng tải khóa học online</em>, học viên xem video/bài giảng, làm quiz, theo dõi tiến độ và nhận chứng chỉ — đồng thời bán khóa học qua MoMo, VNPay hoặc chuyển khoản tại Việt Nam.`,
    `Bài viết dành cho coach, trung tâm đào tạo, doanh nghiệp HR và creator đang cần <strong>${KEYWORD}</strong>: chọn LMS phù hợp quy mô, cấu trúc course UX, drip content, chống leak video, marketing khóa học và mức giá triển khai 2026 — thực chiến thị trường Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Elearning web = sales page + LMS học tập — hai trải nghiệm, một nền tảng.",
  "Video host: Vimeo/Wistia/private — không embed YouTube public dễ leak.",
  "Drip module theo tuần tăng completion — tránh overwhelm học viên.",
  "Mobile học được: 70%+ xem bài trên điện thoại giờ nghỉ.",
  "Bứt Phá: website elearning 12–28 triệu tùy LMS, số khóa và payment.",
])}

${wpImg(1, "Thiết kế website elearning LMS khóa học online chuyên nghiệp")}

<h2 id="elearning-la-gi">Website elearning là gì?</h2>

<p><strong>Website elearning</strong> (nền tảng khóa học online) là site có:</p>
<ul>
  <li><strong>Trang bán khóa học</strong> — mô tả, curriculum, giá, review</li>
  <li><strong>Hệ thống đăng nhập học viên</strong> — sau mua hoặc được cấp quyền</li>
  <li><strong>LMS dashboard</strong> — danh sách khóa, bài học, progress bar</li>
  <li><strong>Delivery nội dung</strong> — video, PDF, audio, slide, assignment</li>
  <li><strong>Đánh giá</strong> — quiz, bài tập, chứng chỉ hoàn thành</li>
  <li><strong>Admin giảng viên</strong> — upload bài, xem analytics học viên</li>
</ul>

<p><strong>Thiết kế website elearning</strong> khác website giới thiệu trung tâm — focus vào <em>trải nghiệm học</em> và <em>monetization khóa học</em>, không chỉ brochure PDF.</p>

<h2 id="loai-khoa-hoc">Loại khóa học online phổ biến</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đặc thù LMS</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Recorded course</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Video on-demand, drip, quiz</td>
      <td class="border border-indigo-100 px-3 py-2">Marketing, Excel, ngoại ngữ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Live cohort</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Zoom link theo lịch, cohort forum</td>
      <td class="border border-indigo-100 px-3 py-2">Bootcamp, mastermind 8 tuần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Corporate training</strong></td>
      <td class="border border-indigo-100 px-3 py-2">SSO, báo cáo HR, bắt buộc hoàn thành</td>
      <td class="border border-indigo-100 px-3 py-2">Onboarding, compliance, sales training</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Micro-learning</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bài 5–10 phút, mobile-first</td>
      <td class="border border-indigo-100 px-3 py-2">Kỹ năng mềm, SOP nội bộ</td>
    </tr>
  </tbody>
</table>

<h2 id="lms-la-gi">LMS là gì? Tính năng cốt lõi</h2>

<p><strong>LMS (Learning Management System)</strong> là phần mềm quản lý học tập trong <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Course builder:</strong> Module → Lesson → Video/Text/Quiz</li>
  <li><strong>Enrollment:</strong> Gán khóa sau thanh toán hoặc admin add</li>
  <li><strong>Progress tracking:</strong> % hoàn thành, resume video</li>
  <li><strong>Drip schedule:</strong> Mở bài theo ngày đăng ký</li>
  <li><strong>Quiz &amp; grade:</strong> Trắc nghiệm, pass score 70%</li>
  <li><strong>Certificate:</strong> PDF tự sinh khi hoàn thành</li>
  <li><strong>Discussion (tùy chọn):</strong> Comment từng bài, Q&amp;A</li>
  <li><strong>Reporting:</strong> Học viên active, drop-off lesson nào</li>
</ul>

<h2 id="cau-truc">Cấu trúc website elearning chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Value prop, khóa nổi bật, testimonial, CTA</li>
  <li><strong>Catalog khóa học:</strong> Filter category, level, giá</li>
  <li><strong>Trang chi tiết khóa:</strong> Curriculum expand, instructor, FAQ, nút Mua</li>
  <li><strong>Checkout:</strong> MoMo/VNPay/chuyển khoản — trả một lần hoặc trả góp</li>
  <li><strong>Student dashboard:</strong> “Khóa của tôi”, tiếp tục bài dang dở</li>
  <li><strong>Lesson player:</strong> Video + sidebar curriculum + mark complete</li>
  <li><strong>Tài khoản:</strong> Hóa đơn, đổi mật khẩu, hỗ trợ</li>
  <li><strong>Blog (tùy chọn):</strong> SEO top-of-funnel — “Học Excel miễn phí”</li>
</ol>

${wpImg(2, "Cấu trúc LMS website elearning — curriculum video và progress học viên")}

<h2 id="video-lesson">Video lesson, quiz &amp; chống leak nội dung</h2>

<h3>Host video an toàn</h3>
<ul>
  <li><strong>Vimeo Pro / Wistia / Bunny Stream:</strong> Domain restriction — chỉ embed trên web bạn</li>
  <li><strong>Không YouTube unlisted public</strong> — dễ share link lộ</li>
  <li><strong>HLS encrypted</strong> — custom platform scale lớn</li>
  <li><strong>Watermark email</strong> — overlay SĐT/email học viên trên video (tùy chọn)</li>
</ul>

<h3>Quiz &amp; engagement</h3>
<ul>
  <li>Quiz cuối module — bắt buộc pass mới mở module sau</li>
  <li>Assignment upload — chấm thủ công hoặc peer review</li>
  <li>Gamification nhẹ — badge, streak — tăng motivation</li>
</ul>

<h3>Mobile learning</h3>
<ul>
  <li>Responsive player — fullscreen video mobile</li>
  <li>PDF tải về offline — watermark</li>
  <li>PWA (tùy chọn) — “Add to home screen”</li>
</ul>

<h2 id="ban-khoa-hoc">Bán khóa học online tại Việt Nam</h2>

<ul>
  <li><strong>One-time purchase:</strong> Mua một lần — truy cập 6–12 tháng hoặc lifetime</li>
  <li><strong>Bundle:</strong> 3 khóa giá combo — tăng AOV</li>
  <li><strong>Trả góp:</strong> 3–6 kỳ — phổ biến khóa 3–10 triệu</li>
  <li><strong>B2B license:</strong> Công ty mua X seat — invoice VAT</li>
  <li><strong>Coupon / affiliate:</strong> Mã KOL — tracking hoa hồng</li>
</ul>

<p>Thanh toán: MoMo, VNPay, chuyển khoản + admin kích hoạt — tương tự <a href="${SITE}/blog/thiet-ke-website-tich-hop-thanh-toan">tích hợp thanh toán</a>.</p>

<h2 id="membership">Elearning vs website membership</h2>

<ul>
  <li><strong>Elearning:</strong> Focus course structure — module, quiz, certificate</li>
  <li><strong>Membership:</strong> Focus subscription — thư viện content liên tục</li>
  <li><strong>Kết hợp:</strong> Member trả tháng — access all courses + community</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-membership">website membership</a> nếu mô hình subscription nặng hơn LMS thuần.</p>

<h2 id="nen-tang">LearnDash, Tutor LMS, Moodle hay custom?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nền tảng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạn chế</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>WordPress + LearnDash</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trainer, trung tâm &lt;10k học viên</td>
      <td class="border border-indigo-100 px-3 py-2">Plugin stack, cần bảo trì</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tutor LMS / LifterLMS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Budget thấp hơn LearnDash</td>
      <td class="border border-indigo-100 px-3 py-2">Ít enterprise feature</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Moodle</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trường học, corporate lớn</td>
      <td class="border border-indigo-100 px-3 py-2">UX cũ, cần customize nhiều</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Teachable / Thinkific (SaaS)</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Go-live nhanh, creator quốc tế</td>
      <td class="border border-indigo-100 px-3 py-2">Phí USD, SEO hạn chế, payment VN</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Next.js + Supabase custom</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Brand lớn, logic riêng</td>
      <td class="border border-indigo-100 px-3 py-2">Chi phí dev cao, timeline dài</td>
    </tr>
  </tbody>
</table>

<p><strong>${KEYWORD}</strong> cho SME VN: WordPress + LearnDash/Tutor thường optimal — balance cost, SEO và LMS feature.</p>

<h2 id="marketing">Marketing khóa học elearning</h2>

<ul>
  <li><strong>Free mini-course / webinar:</strong> Lead magnet → upsell khóa full</li>
  <li><strong>SEO blog:</strong> “Cách học Excel online” → link khóa</li>
  <li><strong>Facebook/TikTok Ads:</strong> Video clip bài mẫu → sales page</li>
  <li><strong>Testimonial video:</strong> Học viên kết quả thực — trust cao</li>
  <li><strong>Email nurture:</strong> 5 email sau lead — case study, FAQ, offer</li>
  <li><strong>Cohort launch:</strong> Mở đợt có deadline — urgency có ethics</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website elearning — 7 bước</h2>

<ol>
  <li><strong>Định vị khóa học:</strong> Audience, outcome, pricing, recorded vs live.</li>
  <li><strong>Curriculum map:</strong> Module/lesson outline — ít nhất 1 khóa pilot.</li>
  <li><strong>Wireframe UX:</strong> Sales page + lesson player mobile.</li>
  <li><strong>UI design:</strong> Educational, clean — không distract khỏi video.</li>
  <li><strong>Dev LMS + payment:</strong> Upload pilot, enrollment, MoMo/VNPay.</li>
  <li><strong>Upload nội dung:</strong> Video host, quiz, certificate template.</li>
  <li><strong>Beta launch:</strong> 10–20 học viên pilot → fix UX → public launch.</li>
</ol>

<p><strong>Thời gian:</strong> 6–10 tuần (1 khóa + LMS WP); 3–5 tháng custom platform.</p>

<h2 id="bang-gia">Bảng giá thiết kế website elearning 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Bao gồm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Elearning Starter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 khóa, LMS WP, sales page, MoMo/VNPay</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Elearning Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">20.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">3 khóa, drip, quiz, certificate, student dashboard</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Elearning Academy</strong></td>
      <td class="border border-indigo-100 px-3 py-2">28.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Unlimited course, affiliate, báo cáo, video host setup</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì LMS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Update plugin, backup, hỗ trợ học viên login</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website elearning</h2>

<ul>
  <li>Launch khóa trống — chỉ có trailer, học viên refund.</li>
  <li>Video YouTube public — leak toàn bộ khóa.</li>
  <li>Lesson quá dài 60 phút — completion thấp, chia 8–15 phút.</li>
  <li>UX mobile kém — không xem được trên điện thoại.</li>
  <li>Không có support channel — học viên stuck, review xấu.</li>
  <li>Quên onboarding email — học viên mua xong không biết bắt đầu đâu.</li>
  <li>Cam kết kết quả quá đà — khiếu nại, ads violation.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-membership`,
    label: "Website membership",
    desc: "Subscription + community.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-su-kien-event`,
    label: "Website sự kiện",
    desc: "Webinar & workshop live.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tre-em-mam-non`,
    label: "Website mầm non",
    desc: "Ed-tech phụ huynh.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn elearning",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website elearning giá bao nhiêu?",
      a: "Tại Bứt Phá từ 12.000.000đ (1 khóa + LMS) đến 28.000.000đ (academy đầy đủ). Báo giá theo số khóa, quiz và tích hợp video host.",
    },
    {
      q: "Cần quay video trước hay làm web trước?",
      a: "Nên có curriculum + ít nhất module 1 quay sẵn trước launch. Web và nội dung song song — beta với 1 khóa pilot.",
    },
    {
      q: "LearnDash có phù hợp Việt Nam không?",
      a: "Có — tích hợp WooCommerce payment VN qua plugin. Phổ biến trainer và trung tâm SME.",
    },
    {
      q: "Học viên xem offline được không?",
      a: "Recorded course thường streaming — PDF/audio có thể tải. App native offline cần custom dev.",
    },
    {
      q: "Có cấp chứng chỉ tự động không?",
      a: "Có — PDF certificate khi hoàn thành 100% + pass quiz. Template branded công ty/trainer.",
    },
    {
      q: "Elearning có cần app riêng không?",
      a: "Không bắt buộc — responsive web + PWA đủ đa số. App khi scale lớn hoặc corporate yêu cầu.",
    },
    {
      q: "Bao lâu go-live website elearning?",
      a: "6–10 tuần với WordPress LMS và 1 khóa sẵn nội dung. Custom platform 3–5 tháng.",
    },
    {
      q: "Bứt Phá có thiết kế website elearning không?",
      a: "Có — trainer, trung tâm, corporate training. LMS + sales + payment VN. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website elearning</strong> thành công = curriculum rõ outcome + LMS UX mượt mobile + video bảo mật + payment VN thuận tiện — không chỉ sales page hào nhoáng. Beta với nhóm nhỏ, đo completion rate trước khi scale ads.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — chọn LMS, số khóa và báo giá theo lộ trình nội dung bạn đang có.`,
  ],
  ctaLabel: "→ Tư vấn website elearning",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
