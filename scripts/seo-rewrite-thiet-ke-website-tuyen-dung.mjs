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

const KEYWORD = "thiết kế website tuyển dụng";
const TITLE = "Thiết Kế Website Tuyển Dụng Thu Hút Ứng Viên";

export const REWRITE_THIET_KE_WEBSITE_TUYEN_DUNG = {
  title: TITLE,
  slug: "thiet-ke-website-tuyen-dung",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "career page, trang tuyển dụng, website hr, ATS đơn giản, employer branding",
  metaTitle: "Thiết Kế Website Tuyển Dụng | Career Page 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website tuyển dụng: career page, JD chuẩn SEO, form ứng tuyển và ATS nhẹ. Employer branding, quy trình 7 bước, giá 8–18 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website tuyển dụng thu hút ứng viên: career page, employer branding, form apply và ATS đơn giản tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Tuyển Dụng | Career Page 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tuyen-dung-la-gi", label: "Website tuyển dụng là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần career page riêng?" },
  { id: "vs-topcv", label: "Career page vs TopCV/LinkedIn" },
  { id: "employer-brand", label: "Employer branding" },
  { id: "cau-truc", label: "Cấu trúc trang tuyển dụng" },
  { id: "jd-seo", label: "JD chuẩn SEO" },
  { id: "form-apply", label: "Form ứng tuyển & ATS" },
  { id: "mobile", label: "Mobile & trải nghiệm ứng viên" },
  { id: "quy-trinh-hr", label: "Quy trình HR trên web" },
  { id: "quy-trinh", label: "Quy trình thiết kế 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website tuyển dụng</strong> (career page / recruitment website) là xây dựng khu vực web chuyên biệt — thường tại <em>tênmiền.com/tuyen-dung</em> hoặc subdomain <em>careers.company.vn</em> — để giới thiệu văn hóa công ty, đăng tin tuyển dụng (JD), nhận hồ sơ ứng viên và quản lý pipeline tuyển dụng thay vì chỉ đăng job lên sàn và mất dữ liệu ứng viên.`,
    `Bài viết dành cho HR manager, founder startup và doanh nghiệp đang cần <strong>${KEYWORD}</strong>: employer branding, cấu trúc career page chuẩn, JD tối ưu SEO Google Jobs, form apply + ATS nhẹ, tích hợp TopCV/LinkedIn và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Career page = employer brand + owned candidate data — không phụ thuộc 100% sàn.",
  "JD chuẩn SEO: title rõ, schema JobPosting — xuất hiện Google Jobs.",
  "Form apply ngắn + upload CV — mobile-first vì ứng viên apply từ điện thoại.",
  "ATS nhẹ: pipeline Applied → Interview → Offer — đủ SME, không cần SAP.",
  "Bứt Phá: career page 8–18 triệu tùy số vị trí, ATS và tích hợp HR.",
])}

${wpImg(1, "Thiết kế website tuyển dụng career page thu hút ứng viên chuyên nghiệp")}

<h2 id="tuyen-dung-la-gi">Website tuyển dụng là gì?</h2>

<p><strong>Website tuyển dụng</strong> là phần web (hoặc site riêng) nơi doanh nghiệp:</p>
<ul>
  <li>Giới thiệu <strong>văn hóa, lợi ích, môi trường làm việc</strong> (employer branding)</li>
  <li>Đăng <strong>danh sách vị trí đang tuyển</strong> (job listings / JD)</li>
  <li>Cho phép ứng viên <strong>nộp hồ sơ online</strong> — form + CV</li>
  <li>HR <strong>quản lý ứng viên</strong> qua dashboard hoặc ATS</li>
</ul>

<p><strong>Thiết kế website tuyển dụng</strong> khác trang “Tuyển dụng” 3 dòng trên web corporate cũ — nó được thiết kế cho <em>conversion ứng viên</em> và <em>SEO job</em>, không chỉ để có cho đủ.</p>

<h2 id="vi-sao-can">Vì sao doanh nghiệp cần career page riêng?</h2>

<ul>
  <li><strong>Employer branding:</strong> Ứng viên gen Z/Millennial research công ty trước apply — web xấu = bỏ qua.</li>
  <li><strong>Owned data:</strong> CV vào database công ty — remarketing vị trí sau, không mất khi hết hạn tin TopCV.</li>
  <li><strong>Chi phí dài hạn:</strong> Đăng sàn tính phí/tin — career page + SEO job giảm phụ thuộc.</li>
  <li><strong>Google Jobs:</strong> JD có schema JobPosting — hiển thị trên Google Search.</li>
  <li><strong>Referral:</strong> Link career page dễ share nội bộ — “giới thiệu bạn bè”.</li>
  <li><strong>Trust:</strong> Startup/ SME chưa nổi tiếng — web tuyển dụng chuyên nghiệp tăng credibility.</li>
</ul>

<h2 id="vs-topcv">Career page vs TopCV, VietnamWorks, LinkedIn</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Kênh</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ưu điểm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạn chế</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Career page riêng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Brand, data sở hữu, SEO, miễn phí apply</td>
      <td class="border border-indigo-100 px-3 py-2">Cần kéo traffic — kết hợp sàn + social</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>TopCV / VietnamWorks</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ứng viên sẵn, filter theo ngành</td>
      <td class="border border-indigo-100 px-3 py-2">Phí đăng tin, ứng viên apply nhiều nơi</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>LinkedIn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Senior, B2B, tech talent</td>
      <td class="border border-indigo-100 px-3 py-2">Chi phí cao, ít blue-collar</td>
    </tr>
  </tbody>
</table>

<p>Chiến lược đúng: <em>đăng sàn + CTA “Apply trên career page”</em> — sàn kéo reach, web giữ brand và pipeline. Xem <a href="${SITE}/blog/thiet-ke-website-gioi-thieu-cong-ty">website giới thiệu công ty</a>.</p>

<h2 id="employer-brand">Employer branding trên career page</h2>

<p>Trước khi đọc JD, ứng viên cần trả lời: <em>“Tôi có muốn làm ở đây không?”</em> Block employer brand trong <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>About us ngắn:</strong> Mission, sản phẩm/dịch vụ, quy mô team</li>
  <li><strong>Culture &amp; values:</strong> 3–5 giá trị — ảnh team thật, không stock generic</li>
  <li><strong>Benefits:</strong> BHXH, thưởng, WFH, training, team building — liệt kê cụ thể</li>
  <li><strong>Office / remote:</strong> Ảnh văn phòng hoặc “100% remote”</li>
  <li><strong>Employee stories:</strong> Quote hoặc video nhân viên — social proof nội bộ</li>
  <li><strong>Diversity &amp; inclusion:</strong> Nếu phù hợp ngành — tăng appeal</li>
</ul>

${wpImg(2, "Employer branding trên website tuyển dụng — văn hóa và phúc lợi công ty")}

<h2 id="cau-truc">Cấu trúc website tuyển dụng chuẩn</h2>

<ol>
  <li><strong>Trang chủ career:</strong> Hero “Join us” + vị trí nổi bật + CTA xem tất cả job</li>
  <li><strong>Life at [Company]:</strong> Văn hóa, benefits, gallery</li>
  <li><strong>Danh sách job:</strong> Filter theo phòng ban, địa điểm, level, hình thức (full-time/part-time/remote)</li>
  <li><strong>Trang chi tiết JD:</strong> Mô tả công việc, yêu cầu, quyền lợi, nút Apply</li>
  <li><strong>Form ứng tuyển:</strong> Inline hoặc popup — upload CV PDF</li>
  <li><strong>FAQ tuyển dụng:</strong> Quy trình phỏng vấn, timeline, contact HR</li>
  <li><strong>Referral program (tùy chọn):</strong> Form giới thiệu ứng viên</li>
</ol>

<h2 id="jd-seo">JD chuẩn SEO &amp; Google Jobs</h2>

<p>Mỗi vị trí nên có URL riêng: <code>/tuyen-dung/marketing-executive-tphcm</code>. Tối ưu:</p>

<ul>
  <li><strong>Title H1:</strong> Tên vị trí + địa điểm — “Marketing Executive — TP.HCM”</li>
  <li><strong>Meta description:</strong> Tóm tắt JD 150 ký tự — có từ khóa nghề</li>
  <li><strong>Nội dung JD:</strong> Mô tả công việc, yêu cầu, quyền lợi — cấu trúc heading H2/H3</li>
  <li><strong>Schema JobPosting (JSON-LD):</strong> title, datePosted, validThrough, employmentType, jobLocation</li>
  <li><strong>Ngày hết hạn:</strong> validThrough — Google ưu tiên tin còn hiệu lực</li>
  <li><strong>Ẩn JD cũ:</strong> 301 hoặc noindex job đã đóng — tránh ứng viên apply nhầm</li>
</ul>

<h2 id="form-apply">Form ứng tuyển &amp; ATS đơn giản</h2>

<h3>Form apply tối thiểu</h3>
<ul>
  <li>Họ tên, Email, SĐT</li>
  <li>Upload CV (PDF/DOC, max 5MB)</li>
  <li>LinkedIn URL (tùy chọn)</li>
  <li>Cover letter ngắn hoặc “Tại sao bạn phù hợp?” (1 textarea)</li>
  <li>Checkbox đồng ý xử lý dữ liệu cá nhân (NĐ 13/2023)</li>
</ul>

<h3>ATS (Applicant Tracking System) nhẹ</h3>
<p>Dashboard HR quản lý:</p>
<ul>
  <li><strong>Pipeline stages:</strong> New → Screening → Interview → Offer → Hired / Rejected</li>
  <li><strong>Ghi chú nội bộ</strong> trên hồ sơ — không hiện ứng viên</li>
  <li><strong>Email template:</strong> Xác nhận nhận CV, mời PV, từ chối lịch sự</li>
  <li><strong>Export CSV</strong> — báo cáo hiring manager</li>
</ul>

<p>Công cụ: plugin WordPress (WP Job Manager, Simple Job Board), custom Next.js + Supabase, hoặc tích hợp Base.vn, 1Office — tùy quy mô.</p>

<h2 id="mobile">Mobile-first — ứng viên apply từ điện thoại</h2>

<ul>
  <li>JD đọc được không cần zoom — font 16px+</li>
  <li>Nút Apply sticky cuối màn hình</li>
  <li>Upload CV từ Google Drive / Files iOS</li>
  <li>Form không quá 8 trường — conversion cao hơn</li>
  <li>Tốc độ tải &lt; 3s — ứng viên bỏ nếu chậm</li>
</ul>

<h2 id="quy-trinh-hr">Quy trình HR vận hành career page</h2>

<ol>
  <li>HR tạo JD trên CMS → publish → schema JobPosting tự sinh</li>
  <li>Đăng link job lên TopCV/LinkedIn/Facebook — CTA apply trên web</li>
  <li>Ứng viên apply → email thông báo HR + auto-reply ứng viên</li>
  <li>HR screening trên ATS → chuyển stage → lịch PV (Calendly/Google Calendar)</li>
  <li>Offer → đóng job trên web — chuyển JD sang “Đã tuyển” hoặc archive</li>
  <li>Ứng viên không pass → lưu talent pool — tag “Marketing 2026” cho vị trí sau</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website tuyển dụng — 7 bước</h2>

<ol>
  <li><strong>Brief employer brand:</strong> Values, benefits, ảnh team, tone of voice.</li>
  <li><strong>Sitemap career:</strong> Trang nào, filter job, có ATS không.</li>
  <li><strong>Wireframe UX:</strong> Job list, JD detail, form apply mobile.</li>
  <li><strong>UI design:</strong> Professional, trẻ trung hoặc corporate — match ngành.</li>
  <li><strong>Dev + CMS job:</strong> Post JD, schema, form, email notification.</li>
  <li><strong>Seed 3–5 JD mẫu:</strong> Test apply end-to-end, HR nhận CV.</li>
  <li><strong>Launch + promote:</strong> Link footer web chính, LinkedIn, sàn tuyển dụng.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần (career page + form); 6–10 tuần nếu ATS custom đầy đủ.</p>

<h2 id="bang-gia">Bảng giá thiết kế website tuyển dụng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Career Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Trang career + list job + form CV email HR</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Career Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">13.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Employer brand pages, filter job, JobPosting schema</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Career ATS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Pipeline HR, ghi chú, email template, talent pool</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tích hợp web corporate</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Gắn vào website công ty hiện có — menu thống nhất</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website tuyển dụng</h2>

<ul>
  <li>JD copy-paste chung chung — ứng viên không hiểu làm gì.</li>
  <li>Tin tuyển cũ 2 năm vẫn public — mất uy tín.</li>
  <li>Form 20 trường + bắt đăng ký account — dropout cao.</li>
  <li>Không auto-reply — ứng viên nghĩ CV không tới.</li>
  <li>Web career tách rời brand — logo/màu khác web chính.</li>
  <li>Bỏ qua schema JobPosting — mất Google Jobs free.</li>
  <li>Không có trang culture — chỉ list job khô khan.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-gioi-thieu-cong-ty`,
    label: "Website giới thiệu công ty",
    desc: "Corporate + career.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-doanh-nghiep`,
    label: "Website doanh nghiệp",
    desc: "Cấu trúc trang HR.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-schema-markup`,
    label: "Schema markup",
    desc: "JobPosting JSON-LD.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn career page",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website tuyển dụng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (career + form) đến 18.000.000đ (ATS pipeline). Báo giá theo số trang employer brand và tính năng HR.",
    },
    {
      q: "Career page có thay được TopCV không?",
      a: "Không hoàn toàn — sàn mang ứng viên sẵn. Career page bổ sung brand và data; nên dùng song song.",
    },
    {
      q: "JD có lên Google Jobs không?",
      a: "Có — nếu có schema JobPosting đúng chuẩn, HTTPS và nội dung JD đầy đủ. Google index trong vài ngày đến vài tuần.",
    },
    {
      q: "Cần ATS riêng hay dùng Excel?",
      a: "Dưới 20 apply/tháng — email + sheet đủ. Trên 50 apply/tháng nên ATS để không miss ứng viên.",
    },
    {
      q: "Form apply có cần đăng nhập không?",
      a: "Không — apply guest conversion cao hơn. Chỉ cần email xác nhận và upload CV.",
    },
    {
      q: "Tích hợp career page vào web cũ được không?",
      a: "Có — thêm section /tuyen-dung hoặc subdomain careers. Bứt Phá hỗ trợ gắn menu và style đồng bộ.",
    },
    {
      q: "Bao lâu hoàn thành website tuyển dụng?",
      a: "Thường 3–6 tuần. ATS custom có thể 8–10 tuần.",
    },
    {
      q: "Bứt Phá có thiết kế website tuyển dụng không?",
      a: "Có — startup, SME, agency. Career page + form + schema JobPosting. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website tuyển dụng</strong> hiệu quả = employer brand thuyết phục + JD rõ ràng SEO + form apply mobile nhanh + HR pipeline không để CV “rơi vào hố đen”. Kết hợp career page với sàn tuyển dụng — owned channel xây dài hạn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — cấu trúc career page, ATS và báo giá theo quy mô tuyển dụng hàng năm của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website tuyển dụng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
