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

const KEYWORD = "thiết kế website responsive";
const TITLE = "Thiết Kế Website Responsive Cho Mọi Thiết Bị";

export const REWRITE_THIET_KE_WEBSITE_RESPONSIVE = {
  title: TITLE,
  slug: "thiet-ke-website-responsive",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "web responsive, mobile friendly, website responsive chuẩn, thiết kế web đa thiết bị, mobile first",
  metaTitle: "Thiết Kế Website Responsive 2026 | Mobile-First & SEO | Bứt Phá",
  metaDescription:
    "Hướng dẫn thiết kế website responsive: nguyên tắc mobile-first, breakpoint, Core Web Vitals, checklist kiểm tra và tác động SEO. Báo giá web responsive 3–12 triệu.",
  description:
    "Thiết kế website responsive cho mọi thiết bị: khái niệm, mobile-first, ảnh hưởng SEO/chuyển đổi, công cụ test và checklist triển khai chuẩn.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Responsive 2026 | Mobile-First & SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "responsive-la-gi", label: "Website responsive là gì?" },
  { id: "vi-sao-bat-buoc", label: "Vì sao responsive bắt buộc?" },
  { id: "so-sanh", label: "Responsive vs adaptive vs app" },
  { id: "nguyen-tac", label: "Nguyên tắc thiết kế responsive" },
  { id: "mobile-first", label: "Chiến lược mobile-first" },
  { id: "breakpoint", label: "Breakpoint & layout" },
  { id: "anh-typography", label: "Ảnh, font & nút bấm" },
  { id: "seo-cwv", label: "Responsive và SEO / Core Web Vitals" },
  { id: "chuyen-doi", label: "Ảnh hưởng chuyển đổi" },
  { id: "cong-cu", label: "Công cụ kiểm tra" },
  { id: "checklist", label: "Checklist trước go-live" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "goi-buc-pha", label: "Web responsive tại Bứt Phá" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là cách xây dựng website một lần, hiển thị tối ưu trên mọi kích thước màn hình — điện thoại, máy tính bảng, laptop và desktop — nhờ layout linh hoạt (fluid grid), ảnh co giãn, menu thích ứng và typography scale. Người dùng không cần zoom hay cuộn ngang; mọi thành phần tự sắp xếp lại theo viewport.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: giải thích vì sao responsive là tiêu chuẩn bắt buộc tại Việt Nam (mobile-first indexing, &gt;70% traffic mobile), so sánh với adaptive/app riêng, nguyên tắc mobile-first, tác động SEO/Core Web Vitals, checklist kiểm tra và cách triển khai chuyên nghiệp.`,
  ],
})}

${wpKeyTakeaways([
  "Responsive = một codebase, mọi thiết bị — khác adaptive (nhiều bản layout cố định).",
  "Google mobile-first indexing: bản mobile quyết định xếp hạng.",
  "Mobile-first: thiết kế màn nhỏ trước, mở rộng lên desktop.",
  "CLS = 0 cần width/height ảnh; LCP cần ảnh nén + lazy-load.",
  "Bứt Phá: mọi gói web 3–12 triệu đều responsive chuẩn.",
])}

${wpImg(4, "Thiết kế website responsive cho mọi thiết bị di động và desktop")}

<h2 id="responsive-la-gi">Thiết kế website responsive là gì?</h2>

<p><strong>Website responsive</strong> (thiết kế đáp ứng) dùng CSS media query, flexbox/grid và đơn vị tương đối (% , rem, vw) để giao diện <em>tự điều chỉnh</em> theo chiều rộng màn hình. Cùng một URL, cùng một HTML — khác với phiên bản mobile riêng (m.example.com) hay app native.</p>

<p>Thành phần điển hình của <strong>${KEYWORD}</strong> chuẩn:</p>
<ul>
  <li>Menu hamburger hoặc bottom nav trên mobile; menu ngang trên desktop</li>
  <li>Cột nhiều → một cột khi màn hình hẹp</li>
  <li>Ảnh <code>max-width: 100%</code> hoặc <code>srcset</code> gửi file nhỏ cho mobile</li>
  <li>Nút CTA, form đủ lớn để chạm (≥48×48px)</li>
  <li>Font body ≥16px — tránh zoom tự động trên iOS</li>
</ul>

<h2 id="vi-sao-bat-buoc">Vì sao thiết kế website responsive là bắt buộc?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Lý do</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Tác động</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Traffic mobile VN</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ước tính 65–75% lượt truy cập từ điện thoại</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mobile-first indexing</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Google đánh giá &amp; xếp hạng chủ yếu bản mobile</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Core Web Vitals</strong></td>
      <td class="border border-indigo-100 px-3 py-2">LCP, CLS trên mobile ảnh hưởng ranking</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chuyển đổi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Web không responsive → bounce cao, mất lead</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Uy tín thương hiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Site “vỡ layout” trên điện thoại = thiếu chuyên nghiệp</td>
    </tr>
  </tbody>
</table>

<p>Bỏ qua <strong>${KEYWORD}</strong> đồng nghĩa đánh mất đa số khách hàng tiềm năng và tín hiệu SEO tiêu cực.</p>

<h2 id="so-sanh">Responsive vs adaptive vs ứng dụng mobile riêng</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Phương án</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mô tả</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Khi nào dùng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Responsive</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Một code, layout co giãn</td>
      <td class="border border-indigo-100 px-3 py-2">Đa số website doanh nghiệp — <strong>khuyến nghị</strong></td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Adaptive</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Vài bản layout cố định (320, 768, 1024px)</td>
      <td class="border border-indigo-100 px-3 py-2">Legacy, ít linh hoạt hơn responsive</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mobile site riêng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">URL/subdomain khác cho mobile</td>
      <td class="border border-indigo-100 px-3 py-2">Không khuyến nghị — duplicate, SEO split</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>App native</strong></td>
      <td class="border border-indigo-100 px-3 py-2">iOS/Android app</td>
      <td class="border border-indigo-100 px-3 py-2">Push native, offline phức tạp — bổ sung, không thay web</td>
    </tr>
  </tbody>
</table>

<h2 id="nguyen-tac">Nguyên tắc thiết kế website responsive</h2>

<ol>
  <li><strong>Fluid layout:</strong> Container % hoặc max-width, không width cố định px trên mobile</li>
  <li><strong>Flexible images:</strong> <code>img { max-width: 100%; height: auto; }</code> + srcset</li>
  <li><strong>Media queries:</strong> Breakpoint theo nội dung, không chỉ theo thiết bị cụ thể</li>
  <li><strong>Touch-friendly:</strong> Khoảng cách giữa link/nút ≥8px; tap target ≥48px</li>
  <li><strong>Readable type:</strong> 16–18px body, line-height 1.5–1.7</li>
  <li><strong>Progressive enhancement:</strong> Nội dung cốt lõi hiển thị cả khi CSS/JS chậm</li>
</ol>

${wpImg(0, "Nguyên tắc thiết kế website responsive chuẩn SEO")}

<h2 id="mobile-first">Chiến lược mobile-first trong thiết kế website responsive</h2>

<p><strong>Mobile-first</strong> nghĩa là thiết kế &amp; code cho màn hình nhỏ trước, sau đó thêm media query <code>min-width</code> để mở rộng lên tablet/desktop — ngược với desktop-first (thu nhỏ, dễ vỡ).</p>

<p>Lợi ích:</p>
<ul>
  <li>Ưu tiên nội dung quan trọng above the fold trên mobile</li>
  <li>CSS gọn hơn — chỉ thêm rule khi màn hình rộng</li>
  <li>Khớp cách Google crawl (mobile-first indexing)</li>
  <li>Performance mobile tốt hơn — không tải CSS desktop nặng lên điện thoại</li>
</ul>

<p>Trong <strong>${KEYWORD}</strong> chuyên nghiệp, wireframe mobile được duyệt trước khi mở rộng desktop.</p>

<h2 id="breakpoint">Breakpoint và layout phổ biến</h2>

<p>Breakpoint tham chiếu (Tailwind/Bootstrap tương đương):</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Breakpoint</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Thiết bị</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Layout gợi ý</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">&lt; 640px</td>
      <td class="border border-indigo-100 px-3 py-2">Mobile</td>
      <td class="border border-indigo-100 px-3 py-2">1 cột, menu hamburger, CTA sticky</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">640 – 1024px</td>
      <td class="border border-indigo-100 px-3 py-2">Tablet</td>
      <td class="border border-indigo-100 px-3 py-2">2 cột, sidebar có thể collapse</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">&gt; 1024px</td>
      <td class="border border-indigo-100 px-3 py-2">Desktop</td>
      <td class="border border-indigo-100 px-3 py-2">3 cột, menu ngang, hero rộng</td>
    </tr>
  </tbody>
</table>

<h3>Thành phần cần thích ứng</h3>
<ul>
  <li>Navigation &amp; footer</li>
  <li>Bảng giá — scroll ngang hoặc chuyển card trên mobile</li>
  <li>Form — label trên input, không 2 cột chật</li>
  <li>Gallery / slider — swipe trên touch</li>
</ul>

<h2 id="anh-typography">Ảnh, typography và nút bấm trên mobile</h2>

<p><strong>Ảnh:</strong> Dùng <code>srcset</code> + <code>sizes</code> hoặc <code>next/image</code> gửi file 400w cho mobile, 1200w cho desktop. Lazy-load ảnh dưới fold. Luôn khai báo <code>width</code> và <code>height</code> — tránh CLS.</p>

<p><strong>Typography:</strong> Body 16px minimum; heading scale nhỏ hơn trên mobile (h1 28–32px thay vì 48px). Không dùng font &lt;14px cho nội dung chính.</p>

<p><strong>Nút &amp; link:</strong> Chiều cao nút ≥44–48px; số điện thoại dùng <code>tel:</code> click-to-call; Zalo/Messenger nút nổi góc màn hình.</p>

${wpImg(1, "Tối ưu ảnh và typography trong thiết kế website responsive")}

<h2 id="seo-cwv">Thiết kế website responsive và SEO / Core Web Vitals</h2>

<p>Google xếp hạng dựa trên trải nghiệm mobile. Ba chỉ số Core Web Vitals liên quan trực tiếp <strong>${KEYWORD}</strong>:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Chỉ số</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Liên hệ responsive</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>LCP</strong> (Largest Contentful Paint)</td>
      <td class="border border-indigo-100 px-3 py-2">Ảnh hero mobile phải nhẹ; tránh ảnh desktop full size trên 3G</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>CLS</strong> (Cumulative Layout Shift)</td>
      <td class="border border-indigo-100 px-3 py-2">Không inject banner/pop-up đẩy nội dung; reserve space cho ảnh/embed</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>INP</strong> (tương tác)</td>
      <td class="border border-indigo-100 px-3 py-2">JS menu, slider nhẹ; tránh popup chặn ngay khi vào trang</td>
    </tr>
  </tbody>
</table>

<p>Bài pillar <a href="${SITE}/blog/thiet-ke-website">thiết kế website</a> đạt CLS = 0 và Performance 93 trên PageSpeed mobile — mục tiêu tương tự cho mọi trang responsive.</p>

<p>Xem thêm: <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>.</p>

<h2 id="chuyen-doi">Ảnh hưởng responsive đến chuyển đổi (CRO)</h2>

<ul>
  <li>Form 1 cột, ít field trên mobile — tăng tỷ lệ điền form</li>
  <li>CTA “Gọi ngay” / “Chat Zalo” luôn thấy được (sticky)</li>
  <li>Checkout e-commerce: guest checkout, autofill, ví điện tử</li>
  <li>Tránh pop-up full màn hình che nội dung trên mobile</li>
  <li>Tốc độ tải &lt;3s trên 4G — mỗi giây chậm giảm ~7% conversion</li>
</ul>

<p><strong>${KEYWORD}</strong> tốt giảm bounce rate 20–40% so với site desktop-only thu nhỏ.</p>

${wpImg(2, "Website responsive tối ưu chuyển đổi trên điện thoại")}

<h2 id="cong-cu">Công cụ kiểm tra website responsive</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Công cụ</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Kiểm tra gì</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chrome DevTools (Device Mode)</td>
      <td class="border border-indigo-100 px-3 py-2">Breakpoint, touch, network throttle</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">PageSpeed Insights</td>
      <td class="border border-indigo-100 px-3 py-2">CWV mobile + desktop, đề xuất tối ưu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Google Search Console</td>
      <td class="border border-indigo-100 px-3 py-2">Lỗi mobile usability, CWV thực tế</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">BrowserStack / thiết bị thật</td>
      <td class="border border-indigo-100 px-3 py-2">iOS Safari, Android Chrome — hay khác emulator</td>
    </tr>
  </tbody>
</table>

<p>Test cả <strong>portrait &amp; landscape</strong>, mạng 3G/4G chậm, và font scaling 200% (accessibility).</p>

<h2 id="checklist">Checklist thiết kế website responsive trước go-live</h2>

<ul>
  <li>☐ Không cuộn ngang trên 320px width</li>
  <li>☐ Menu hoạt động trên touch (không hover-only)</li>
  <li>☐ Font body ≥16px, contrast đủ (WCAG AA)</li>
  <li>☐ Ảnh có alt, width/height, file &lt;200KB hero mobile</li>
  <li>☐ Form và nút CTA dễ chạm</li>
  <li>☐ Số điện thoại click-to-call</li>
  <li>☐ Bảng responsive (scroll hoặc card)</li>
  <li>☐ PageSpeed mobile ≥80 (mục tiêu ≥90)</li>
  <li>☐ CLS &lt; 0,1; LCP &lt; 2,5s (mục tiêu)</li>
  <li>☐ Test iPhone Safari + Android Chrome thật</li>
</ul>

<h2 id="sai-lam">7 sai lầm phổ biến khi làm web “responsive”</h2>

<ol>
  <li>Chỉ thu nhỏ desktop — chữ quá nhỏ, nút không bấm được</li>
  <li>Ẩn nội dung quan trọng trên mobile (Google vẫn đọc DOM)</li>
  <li>Pop-up che toàn màn hình ngay khi vào</li>
  <li>Ảnh PNG nặng không srcset — LCP chậm</li>
  <li>Plugin/page builder tạo HTML lồng nhau — chậm mobile</li>
  <li>Không test form thanh toán trên mobile</li>
  <li>Giả định “khách dùng WiFi” — VN nhiều 4G/3G</li>
</ol>

${wpImg(6, "Tránh sai lầm khi thiết kế website responsive cho doanh nghiệp")}

<h2 id="goi-buc-pha">Thiết kế website responsive tại Bứt Phá Marketing</h2>

<p>Mọi gói web Bứt Phá đều <strong>responsive + mobile-first</strong> mặc định — không phát sinh “phí mobile”:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Responsive</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu</td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Mobile + desktop, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">+ UI chuyên nghiệp, tốc độ, CWV</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Kinh doanh</td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">+ Shop mobile, CRO, chatbot</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hệ thống</td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">+ Tích hợp, đa tính năng mobile</td>
    </tr>
  </tbody>
</table>

<p>Đăng ký tại <a href="${SITE}/website">trang dịch vụ website</a> hoặc xem <a href="${SITE}/blog/thiet-ke-website-tron-goi">gói trọn gói</a>.</p>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan, quy trình 7 bước và bảng giá.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Thiết kế website chuẩn SEO",
    desc: "SEO kỹ thuật kết hợp responsive.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-wordpress`,
    label: "Thiết kế website WordPress",
    desc: "CMS responsive phổ biến.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký thiết kế web",
    desc: "Tư vấn web responsive theo ngành.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website responsive là gì?",
      a: "Website hiển thị tối ưu trên mọi kích thước màn hình nhờ layout linh hoạt, ảnh co giãn và menu thích ứng — một URL cho tất cả thiết bị.",
    },
    {
      q: "Responsive khác adaptive thế nào?",
      a: "Responsive dùng một codebase co giãn liên tục. Adaptive có vài bản layout cố định cho từng nhóm màn hình — ít linh hoạt hơn.",
    },
    {
      q: "Có bắt buộc responsive để lên Google không?",
      a: "Google mobile-first indexing ưu tiên bản mobile. Web không responsive thường xếp hạng kém và bounce cao — coi như bắt buộc thực tế.",
    },
    {
      q: "Mobile-first nghĩa là gì?",
      a: "Thiết kế và code cho màn hình nhỏ trước, mở rộng lên desktop — khớp cách Google đánh giá và tối ưu performance mobile.",
    },
    {
      q: "Responsive có cần app riêng không?",
      a: "Không. App native chỉ cần khi push notification phức tạp, offline sâu hoặc tính năng dùng camera/GPS đặc thù.",
    },
    {
      q: "AMP còn cần cho responsive?",
      a: "Ít doanh nghiệp VN dùng AMP năm 2026. Ưu tiên responsive chuẩn + Core Web Vitals thay vì AMP riêng.",
    },
    {
      q: "Chi phí thêm responsive bao nhiêu?",
      a: "Tại Bứt Phá responsive là tiêu chuẩn trong gói 3–12 triệu — không tính phí mobile riêng như một số agency.",
    },
    {
      q: "Kiểm tra responsive bằng gì?",
      a: "Chrome DevTools, PageSpeed Insights (mobile), Search Console (mobile usability) và test trên iPhone/Android thật.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} không còn là tính năng “cộng thêm” — đó là nền tảng để website doanh nghiệp tiếp cận khách trên điện thoại, đạt chuẩn Google mobile-first và chuyển đổi hiệu quả. Triển khai đúng: mobile-first, ảnh tối ưu, touch-friendly, CLS thấp.`,
    `Nếu website hiện tại vỡ layout trên mobile hoặc PageSpeed đỏ — đó là tín hiệu cần redesign responsive. Liên hệ Bứt Phá để audit miễn phí và báo giá web chuẩn đa thiết bị.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website responsive",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
