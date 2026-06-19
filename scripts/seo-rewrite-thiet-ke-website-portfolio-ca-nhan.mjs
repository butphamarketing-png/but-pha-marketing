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

const KEYWORD = "thiết kế website portfolio";
const TITLE = "Thiết Kế Website Portfolio Cá Nhân Chuyên Nghiệp Chuẩn SEO";

export const REWRITE_THIET_KE_WEBSITE_PORTFOLIO_CA_NHAN = {
  title: TITLE,
  slug: "thiet-ke-website-portfolio-ca-nhan",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website portfolio cá nhân, portfolio designer, website photographer, thiết kế web freelancer, personal brand website",
  metaTitle: "Thiết Kế Website Portfolio | SEO & Báo Giá 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website portfolio: gallery dự án, case study, form brief và SEO personal brand. Quy trình 7 bước, giá 3–10 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website portfolio cá nhân: showcase dự án cho designer, photographer và freelancer — UX visual, SEO personal brand và form nhận brief.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Portfolio | SEO & Báo Giá 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "portfolio-la-gi", label: "Website portfolio là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần website portfolio?" },
  { id: "doi-tuong", label: "Ai nên làm portfolio web?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "gallery", label: "Gallery & case study" },
  { id: "ux-mobile", label: "UX mobile & tốc độ ảnh" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "seo", label: "SEO personal brand" },
  { id: "chon-doi-tac", label: "Chọn đối tác thiết kế" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website portfolio</strong> là quy trình xây dựng website cá nhân chuyên biệt — tập trung <em>showcase dự án</em> cho designer, photographer, videographer, UI/UX và freelancer sáng tạo. Khác Behance/Dribbble chỉ là “sân chơi”, <strong>${KEYWORD}</strong> trên domain riêng giúp bạn sở hữu thương hiệu, SEO personal brand trên Google và form nhận brief trực tiếp — không phụ thuộc thuật toán mạng xã hội.`,
    `Bài viết dành cho creative freelancer, photographer studio nhỏ và designer đang tìm <strong>${KEYWORD}</strong>: checklist tính năng gallery, cấu trúc case study, quy trình triển khai, mức giá 2026 và cách kết hợp portfolio web với LinkedIn, Instagram — thực chiến cho thị trường Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Portfolio web = thương hiệu cá nhân sở hữu 100% — không bị mất reach khi đổi nền tảng.",
  "Ảnh là nhân vật chính: layout tối giản, whitespace, lazy load WebP.",
  "Case study > chỉ đăng ảnh đẹp: brief → quy trình → kết quả → testimonial.",
  "CTA rõ: form brief, Zalo, Calendly — trên mọi trang dự án.",
  "Bứt Phá: gói portfolio 3–10 triệu; tối ưu SEO tên + dịch vụ + thành phố.",
])}

${wpImg(3, "Thiết kế website portfolio cá nhân chuyên nghiệp với gallery dự án")}

<h2 id="portfolio-la-gi">Thiết kế website portfolio là gì?</h2>

<p><strong>Website portfolio</strong> là trang web cá nhân hoặc studio nhỏ dùng để trưng bày tác phẩm, dự án đã làm và năng lực chuyên môn — thay cho PDF gửi qua email hay chỉ dựa vào profile mạng xã hội. <strong>Thiết kế website portfolio</strong> ưu tiên:</p>

<ul>
  <li><strong>Visual-first:</strong> Gallery full-width, typography sang, ít chữ — ảnh/video nói thay lời</li>
  <li><strong>Case study:</strong> Mỗi dự án có trang riêng — bối cảnh, vai trò, deliverable, kết quả</li>
  <li><strong>Filter / category:</strong> Branding, UI, photography, motion… — khách lọc đúng năng lực</li>
  <li><strong>About &amp; trust:</strong> Câu chuyện cá nhân, client đã làm, giải thưởng/chứng chỉ</li>
  <li><strong>Form brief:</strong> Thu lead dự án — ngân sách, timeline, mô tả ngắn</li>
</ul>

<p><strong>${KEYWORD}</strong> khác website corporate hay TMĐT: không cần giỏ hàng phức tạp — cần <em>tốc độ tải ảnh</em>, trải nghiệm xem mượt và CTA liên hệ rõ ràng.</p>

<h2 id="vi-sao-can">Vì sao designer &amp; freelancer cần website portfolio?</h2>

<ul>
  <li><strong>Sở hữu thương hiệu:</strong> Behance/Instagram thay đổi thuật toán — domain riêng là tài sản lâu dài.</li>
  <li><strong>Google tìm thấy bạn:</strong> Khách search “photographer wedding Hà Nội”, “designer logo TP.HCM” — portfolio SEO mang lead B2B/B2C.</li>
  <li><strong>Chuyên nghiệp hơn PDF:</strong> Link một dòng trong email proposal — ấn tượng ngay từ giây đầu.</li>
  <li><strong>Thu brief có lọc:</strong> Form hỏi ngân sách, deadline — lọc khách không phù hợp, tiết kiệm thời gian.</li>
  <li><strong>Quốc tế hóa:</strong> Portfolio tiếng Anh + case study — mở khách freelance remote/overseas.</li>
  <li><strong>Chạy ads:</strong> Landing từng dịch vụ (chụp sản phẩm, thiết kế menu…) — message match quảng cáo.</li>
</ul>

<h2 id="doi-tuong">Ai nên đầu tư thiết kế website portfolio cá nhân?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nghề / vai trò</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nội dung portfolio nên có</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Graphic / Brand designer</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Logo, identity, packaging — mockup + brand guideline excerpt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>UI/UX designer</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Wireframe → UI, prototype link, metric cải thiện UX</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Photographer / Videographer</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Gallery theo thể loại: wedding, product, corporate event</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Illustrator / Motion</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Reel embed, process sketch, client industry tag</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Developer / No-code</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Live demo link, stack badge, GitHub (nếu open)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Consultant / Coach</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Case study kết quả, testimonial, booking Calendly</td>
    </tr>
  </tbody>
</table>

<h2 id="tinh-nang">Tính năng website portfolio bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Gallery / grid</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Masonry hoặc uniform grid — hover title, click vào case study</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Filter category</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lọc theo loại dự án — UX nhanh, không scroll vô tận</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang case study</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Challenge → approach → outcome — E-E-A-T cho Google</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lazy load + WebP</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Portfolio nhiều ảnh — Core Web Vitals xanh bắt buộc</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Form brief / liên hệ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tên, email, loại dự án, ngân sách, file đính kèm (tùy chọn)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Social &amp; resume</strong></td>
      <td class="border border-indigo-100 px-3 py-2">LinkedIn, Behance, Instagram — nút download CV PDF</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Dark / light mode</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Creative thích dark UI — tùy positioning thương hiệu</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc trang website portfolio chuẩn (5–7 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero 1–3 dự án nổi bật, tagline, CTA “Xem dự án” / “Gửi brief”.</li>
  <li><strong>Work / Projects:</strong> Grid toàn bộ portfolio + filter category.</li>
  <li><strong>Case study (template):</strong> Mỗi dự án một URL — SEO long-tail “thiết kế logo [ngành]”.</li>
  <li><strong>About:</strong> Ảnh cá nhân, hành trình, giá trị, client logo strip.</li>
  <li><strong>Services (tùy chọn):</strong> Gói dịch vụ + giá “từ …” — giảm hỏi giá lặp.</li>
  <li><strong>Contact:</strong> Form brief, email, Zalo, Calendly booking 15 phút.</li>
  <li><strong>Blog (nếu SEO):</strong> Bài chia sẻ quy trình — hỗ trợ organic “tips design”.</li>
</ol>

${wpImg(4, "Cấu trúc website portfolio — grid dự án và trang case study")}

<h2 id="gallery">Gallery &amp; case study — showcase đúng cách</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, chất lượng trình bày quyết định tỷ lệ chuyển đổi brief:</p>

<ul>
  <li><strong>Ảnh gốc chất lượng:</strong> Export WebP 1600–2000px chiều rộng — đủ nét retina, không upload file 10MB.</li>
  <li><strong>Consistency:</strong> Mockup cùng style (device frame, nền neutral) — portfolio nhìn “có hệ thống”.</li>
  <li><strong>Case study 4 phần:</strong> Client &amp; brief → Quy trình → Deliverable → Kết quả (số liệu nếu có).</li>
  <li><strong>Video reel:</strong> Photographer/motion — hero 15–30s, autoplay muted, poster image.</li>
  <li><strong>NDA project:</strong> Blur logo hoặc “Confidential — F&amp;B client” — vẫn show năng lực.</li>
  <li><strong>Next / prev project:</strong> Giữ khách xem thêm — giảm bounce rate.</li>
</ul>

<p>Tham khảo layout visual tương tự <a href="${SITE}/blog/thiet-ke-website-kien-truc-noi-that">thiết kế website kiến trúc nội thất</a> — cùng nguyên tắc “ảnh là hero”.</p>

<h2 id="ux-mobile">UX mobile &amp; tốc độ tải ảnh portfolio</h2>

<p>Recruiter và khách thuê freelancer thường xem portfolio trên điện thoại giữa cuộc họp. <strong>${KEYWORD}</strong> bắt buộc:</p>

<ul>
  <li>Grid 1 cột mobile — ảnh full width, tap mở case study</li>
  <li>Lazy load below fold — LCP &lt; 2,5s với hero tối ưu</li>
  <li>Lightbox pinch-zoom — photographer cần xem chi tiết</li>
  <li>Nút <strong>“Gửi brief”</strong> sticky — Zalo + form trên mobile</li>
  <li>Font sans tối giản — không che nội dung visual</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website portfolio — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Ngành creative, client mục tiêu (B2B agency hay khách lẻ), số dự án showcase.</li>
  <li><strong>Wireframe:</strong> Duyệt sitemap, luồng Work → Case study → Contact.</li>
  <li><strong>UI design:</strong> Moodboard minimal/editorial — duyệt mockup mobile trước desktop.</li>
  <li><strong>Lập trình:</strong> CMS thêm project, filter tag, form brief, GA4.</li>
  <li><strong>Nhập portfolio:</strong> 6–12 dự án tiêu biểu — copy case study do bạn hoặc Bứt Phá hỗ trợ.</li>
  <li><strong>SEO on-page:</strong> Title “Tên + dịch vụ + thành phố”, schema Person/CreativeWork.</li>
  <li><strong>Go-live &amp; đào tạo:</strong> Hướng dẫn thêm dự án mới sau mỗi job.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần tùy số case study và mức animation (scroll reveal, page transition).</p>

<h2 id="bang-gia">Bảng giá thiết kế website portfolio 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Starter</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">One-page scroll, 6 dự án, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Creative</strong></td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">5–7 trang, filter, case study template, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Blog, đa ngôn ngữ, animation, Calendly</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Studio</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Team page, CMS multi-author, client portal</td>
    </tr>
  </tbody>
</table>

<p>Hosting + domain ~500.000–1.500.000đ/năm riêng. Xem thêm <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="seo">SEO personal brand cho website portfolio</h2>

<ul>
  <li><strong>Từ khóa:</strong> “[tên] designer”, “photographer [thành phố]”, “thiết kế logo [ngành]” — gắn vào case study.</li>
  <li><strong>Meta từng project:</strong> Title unique — tránh trùng “Project 1, Project 2”.</li>
  <li><strong>Alt ảnh:</strong> Mô tả dự án — không để “IMG_1234.jpg”.</li>
  <li><strong>Schema Person + CreativeWork:</strong> Giúp Google hiểu portfolio structured.</li>
  <li><strong>Internal link:</strong> Blog → case study → contact — silo chủ đề dịch vụ.</li>
  <li><strong>Backlink:</strong> LinkedIn, Behance, signature email trỏ về domain — tăng authority.</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a> và <a href="${SITE}/blog/thiet-ke-website-freelancer-remote">thiết kế website freelancer</a>.</p>

<h2 id="chon-doi-tac">Chọn đối tác thiết kế website portfolio</h2>

<ul>
  <li>Portfolio agency có <strong>creative/visual</strong> thật — không chỉ web corporate xanh trắng</li>
  <li>Demo tốc độ tải gallery 20+ ảnh trên 4G</li>
  <li>CMS thêm project đơn giản — bạn tự update sau mỗi job mới</li>
  <li>Bảo hành sửa layout khi thêm category mới</li>
  <li>Hiểu NDA — không public tên client khi chưa được phép</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website portfolio</h2>

<ul>
  <li>Chỉ dùng Behance — mất SEO và không có form brief riêng.</li>
  <li>Quá nhiều dự án cũ kém chất lượng — “càng nhiều càng tốt” là sai.</li>
  <li>Ảnh nặng không nén — bounce cao, Google PageSpeed đỏ.</li>
  <li>Không có CTA — khách xem xong không biết cách thuê bạn.</li>
  <li>Template trùng hàng nghìn designer — mất cá tính thương hiệu.</li>
  <li>Case study chỉ ảnh — thiếu context, Google không hiểu expertise.</li>
  <li>Quên mobile — art director hay duyệt portfolio trên iPhone.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình và giá tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-kien-truc-noi-that`,
    label: "Website kiến trúc nội thất",
    desc: "Portfolio visual ngành design không gian.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-freelancer-remote`,
    label: "Website freelancer",
    desc: "Personal brand và booking remote.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm portfolio",
    desc: "Tư vấn Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website portfolio giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ (one-page) đến 10.000.000đ+ (studio, đa ngôn ngữ). Báo giá chính xác sau số dự án và mức animation.",
    },
    {
      q: "Portfolio web cần bao nhiêu dự án?",
      a: "Chất lượng > số lượng. 6–12 dự án tiêu biểu đủ thuyết phục. Có thể ẩn dự án cũ khi portfolio nâng cấp.",
    },
    {
      q: "Có thể tự thêm dự án mới sau này không?",
      a: "Có — Bứt Phá bàn giao CMS (WordPress hoặc custom) và đào tạo thêm project trong 1 buổi.",
    },
    {
      q: "Behance/Dribbble có thay thế website portfolio không?",
      a: "Không hoàn toàn — nền tảng third-party không SEO tên bạn và không có form brief tùy chỉnh. Nên dùng song song, web là hub chính.",
    },
    {
      q: "Website portfolio có cần blog không?",
      a: "Không bắt buộc — nhưng blog process/tips giúp SEO long-tail và chứng minh expertise (E-E-A-T).",
    },
    {
      q: "Làm portfolio tiếng Anh có cần không?",
      a: "Nên có nếu nhắm khách quốc tế hoặc remote. Có thể song ngữ hoặc subdomain en.domain.com.",
    },
    {
      q: "Bao lâu hoàn thành website portfolio?",
      a: "Thường 3–6 tuần. Phụ thuộc số case study, copywriting và tốc độ duyệt thiết kế.",
    },
    {
      q: "Bứt Phá có làm website portfolio không?",
      a: "Có — tư vấn theo ngành creative của bạn. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website portfolio</strong> cá nhân là đầu tư thương hiệu lâu dài — giúp designer, photographer và freelancer được tìm thấy trên Google, gửi link chuyên nghiệp và thu brief có chọn lọc. Ưu tiên: ảnh nén chuẩn, case study có chiều sâu, mobile mượt và CTA rõ trên mọi trang dự án.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá minh bạch theo số dự án và gói tính năng bạn cần.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website portfolio",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
