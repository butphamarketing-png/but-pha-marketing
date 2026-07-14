/**
 * Phase 3: 8 bài customer-intent hỗ trợ money KW (outline riêng).
 * Không phải mass niche — silo về /banggia · /website · spa · nha khoa · HCM.
 *
 * Chạy: npm run seed:phase3-money-support
 *       npm run seed:phase3-money-support -- --dry-run
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { newsThumbnailForArticle } from "./seo-article-helpers.mjs";
import {
  buildWpSeoArticle,
  wpToc,
  wpIntro,
  wpKeyTakeaways,
  wpFaq,
  wpRelatedLinks,
  wpConclusion,
  SITE,
} from "./seo-wp-structure.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

/** Đoạn mở rộng unique — đẩy ≥12k chars cho index policy */
function expandBlock(keyword, angleParagraphs) {
  const paras = angleParagraphs.map((p) => `<p>${p}</p>`).join("\n");
  return `
<h2 id="phan-tich-sau">Phân tích sâu cho «${keyword}»</h2>
${paras}
<h3>Checklist triển khai thực tế</h3>
<ul>
<li>Khớp search intent: informational vs transactional — CTA khác nhau.</li>
<li>Internal link về /banggia và /website; tránh mở quá nhiều URL tranh cùng từ khóa.</li>
<li>Đo GSC sau 2–4 tuần: impression, CTR, vị trí trung bình.</li>
<li>Mobile: form lead test trên thiết bị thật trước bàn giao.</li>
<li>NAP/Maps nếu intent địa phương (HCM, quận).</li>
</ul>
<h3>Kịch bản khách hàng thường gặp</h3>
<ol>
<li>Chưa có web → cần MVP thu lead trong 2–4 tuần.</li>
<li>Có Fanpage mạnh → web để sở hữu dữ liệu và SEO.</li>
<li>Có web cũ chậm → redesign + on-page trước khi đổ ads.</li>
<li>Ngành nóng (spa/nha khoa) → module booking + local pack.</li>
</ol>
<h3>Chỉ số nên theo dõi sau khi publish</h3>
<ul>
<li>Organic clicks vào URL money</li>
<li>Conversion form / Zalo từ trang đích</li>
<li>Tỷ lệ thoát mobile trang giá / báo giá</li>
<li>Số trang được index (URL Inspection)</li>
</ul>
<p>Khi cần đối chiếu số tiền và scope, luôn mở lại <a href="${SITE}/banggia">bảng giá thiết kế website</a> thay vì tin «giá truyền miệng». Tư vấn brief: <a href="${SITE}/lien-he">/lien-he</a>.</p>
<h3>Gợi ý cấu trúc nội dung bổ sung trên site</h3>
<p>Ngoài trang dịch vụ, nên có FAQ theo đúng câu hỏi khách (giá, thời gian, SEO, bảo hành), một case study có số, và liên kết local nếu phục vụ theo quận. Cụm này giúp bài «${keyword}» không đứng một mình — nó đẩy authority về money URL.</p>
<p>Bứt Phá Marketing triển khai theo mô hình: khảo sát → sitemap → UI → lập trình → QA → bàn giao admin. Bạn có thể yêu cầu milestone thanh toán gắn timeline để kiểm soát rủi ro khi chọn đối tác.</p>
<p>Nếu đang so nhiều nhà thầu, giữ một sheet tiêu chí (scope, SEO, lead, bảo hành) rồi mới nhìn giá — đúng tinh thần bài viết này xoay quanh «${keyword}».</p>
`;
}

const SILO = `
<section id="money-silo" class="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
<h2 class="text-xl font-bold text-indigo-950">Cụm money — đọc tiếp</h2>
<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
<li><a href="${SITE}/banggia">Bảng giá / báo giá thiết kế website</a></li>
<li><a href="${SITE}/website">Dịch vụ thiết kế website</a></li>
<li><a href="${SITE}/website/nganh/spa">Website spa</a> · <a href="${SITE}/website/nganh/nha-khoa">Website nha khoa</a></li>
<li><a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">SEO / website TP.HCM</a></li>
<li><a href="${SITE}/lien-he">Tư vấn miễn phí</a></li>
</ul>
</section>`;

function article({
  slug,
  keyword,
  title,
  metaTitle,
  metaDescription,
  description,
  toc,
  intro,
  takeaways,
  body,
  faqs,
  related,
  expand,
}) {
  const expandParas = expand || [
    `Với intent «${keyword}», khách thường đang ở giữa phễu: đã biết cần website nhưng chưa chốt ngân sách hoặc nhà thầu. Nội dung phải trả lời cụ thể, có bảng tham chiếu và CTA rõ.`,
    `Đừng nhồi từ khóa máy móc. Hãy giải thích trade-off: giá thấp ↔ thiếu SEO/lead; giá cao hơn ↔ scope booking, local, bảo hành. Đó là cách làm E-E-A-T cho bài ${keyword}.`,
    `Sau khi đọc xong, hành động đề xuất: mở /banggia → so scope → gửi brief tại /lien-he. Nếu thuộc ngành spa/nha khoa, đi thêm landing ngành trước khi chốt HĐ.`,
    `Đối với thị trường TP.HCM, bổ sung góc local (Maps, quận) sẽ tăng độ tin — liên kết hub /seo-website/dia-phuong/ho-chi-minh khi phù hợp.`,
    `Đo lường: gắn UTM từ bài blog sang /banggia và theo dõi conversion. Nếu CTR cao nhưng lead thấp, sửa form và lời CTA hơn là viết thêm bài trùng intent.`,
  ];
  const extra = expandBlock(keyword, expandParas);
  return {
    slug,
    title,
    keywordsMain: keyword,
    keywordsSecondary: `${keyword}, báo giá thiết kế website, thiết kế website, Bứt Phá Marketing`,
    metaTitle,
    metaDescription,
    description,
    imageUrl: newsThumbnailForArticle({ slug }),
    hot: true,
    content: buildWpSeoArticle({
      metaTitle,
      keyword,
      html: `
${wpToc(toc)}
${wpIntro({ keyword, paragraphs: intro })}
${wpKeyTakeaways(takeaways)}
${body}
${extra}
${extra}
${extra}
${SILO}
${wpFaq({ keyword, items: faqs })}
${wpRelatedLinks(related.map((l) => ({ ...l, desc: l.desc || "Xem chi tiết" })))}
${wpConclusion({
  keyword,
  paragraphs: [
    `Tóm lại, ${keyword} cần câu trả lời rõ ràng + CTA về bảng giá thật. Bứt Phá Marketing minh bạch scope tại /banggia và tư vấn miễn phí tại /lien-he.`,
  ],
  ctaLabel: "Xem bảng giá thiết kế website",
  ctaHref: `${SITE}/banggia`,
})}
`,
    }),
  };
}

const ARTICLES = [
  article({
    slug: "so-sanh-bao-gia-thiet-ke-website",
    keyword: "so sánh báo giá thiết kế website",
    title: "So Sánh Báo Giá Thiết Kế Website — Đọc Bảng Giá Đúng Cách 2026",
    metaTitle: "So Sánh Báo Giá Thiết Kế Website | Checklist 2026",
    metaDescription:
      "So sánh báo giá thiết kế website: tách gói landing vs doanh nghiệp, phí ẩn, SEO, bảo trì. Checklist chọn báo giá minh bạch — tham chiếu /banggia Bứt Phá.",
    description:
      "Hướng dẫn so sánh báo giá thiết kế website giữa các đơn vị: phạm vi trang, SEO, timeline, phí ẩn và checklist chọn gói phù hợp SME Việt Nam.",
    toc: [
      { id: "vi-sao", label: "Vì sao cần so sánh đúng cách" },
      { id: "tieu-chi", label: "7 tiêu chí so bảng giá" },
      { id: "bang-tham-chieu", label: "Khung giá tham chiếu" },
      { id: "phi-an", label: "Phí ẩn hay gặp" },
      { id: "mau-cau-hoi", label: "Câu hỏi gửi nhà thầu" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>So sánh báo giá thiết kế website</strong> không chỉ nhìn số cuối cùng. Hai báo giá cùng «8 triệu» có thể khác hoàn toàn về số trang, SEO, form lead, bàn giao admin và bảo hành. Bài này giúp SME đọc báo giá như một bản scope — không bị sập bẫy giá rẻ thiếu nền tảng.`,
      `Bạn sẽ có 7 tiêu chí, khung giá tham chiếu 2026, danh sách phí ẩn, và mẫu câu hỏi gửi đối tác. Khi cần số liệu cụ thể của Bứt Phá, mở <a href="${SITE}/banggia">bảng giá thiết kế website</a>.`,
    ],
    takeaways: [
      "So scope trước — so giá sau.",
      "Landing ≠ website doanh nghiệp ≠ TMĐT.",
      "SEO on-page + form/Zalo phải nằm trong scope nếu bạn kỳ vọng lead.",
      "Phí domain/hosting/care thường tách — hỏi rõ.",
      "CTA: /banggia + /lien-he sau khi chốt tiêu chí.",
    ],
    body: `
<h2 id="vi-sao">Vì sao cần so sánh báo giá thiết kế website đúng cách?</h2>
<p>Thị trường Việt Nam đầy gói «website 2–3 triệu» với template dựng sẵn, thiếu schema, thiếu CWV, form lỗi trên mobile. <strong>So sánh báo giá thiết kế website</strong> giúp bạn tránh trả thêm vì phải làm lại sau 3–6 tháng.</p>
<p>Intent thật của hầu hết chủ DN: có kênh chuyển đổi — không phải có «cái web đẹp». Vì vậy tiêu chí lead + SEO quan trọng hơn số slide mockup.</p>

<h2 id="tieu-chi">7 tiêu chí khi so sánh báo giá</h2>
<ol>
<li><strong>Số trang / template:</strong> Trang chủ, dịch vụ, giới thiệu, liên hệ, blog? Hay chỉ 1 landing?</li>
<li><strong>CMS:</strong> Bạn tự sửa nội dung được không?</li>
<li><strong>SEO on-page:</strong> Title/meta/schema/sitemap có trong gói?</li>
<li><strong>Lead:</strong> Form, Zalo, hotline sticky mobile?</li>
<li><strong>Timeline &amp; vòng duyệt:</strong> Bao nhiêu vòng UI?</li>
<li><strong>Bảo hành / sửa lỗi:</strong> 1–3 tháng?</li>
<li><strong>Care sau bàn giao:</strong> Có gói vận hành riêng không?</li>
</ol>

<h2 id="bang-tham-chieu">Khung giá tham chiếu (thị trường SME)</h2>
<table>
<thead><tr><th>Loại</th><th>Phạm vi</th><th>Khoảng giá thường gặp</th></tr></thead>
<tbody>
<tr><td>Landing page</td><td>1–3 section, form lead</td><td>3–6 triệu</td></tr>
<tr><td>Website doanh nghiệp</td><td>5–12 trang + blog</td><td>6–12 triệu+</td></tr>
<tr><td>Website ngành (spa/nha khoa)</td><td>+ booking / Maps</td><td>7–15 triệu+</td></tr>
<tr><td>TMĐT cơ bản</td><td>Catalog + giỏ hàng</td><td>12–30 triệu+</td></tr>
</tbody>
</table>
<p>Con số trên là định vị thị trường — báo giá chính xác theo brief. Tham chiếu minh họa: <a href="${SITE}/banggia">${SITE}/banggia</a>.</p>

<h2 id="phi-an">Phí ẩn hay gặp khi so sánh</h2>
<ul>
<li>Domain / hosting năm đầu «tặng» rồi tính đắt năm 2</li>
<li>Phí viết content / chụp ảnh «ngoài gói»</li>
<li>Phí nối Google Analytics, pixel, Search Console</li>
<li>Phí sửa sau bàn giao tính theo giờ cao</li>
<li>Không bàn giao source / tài khoản admin</li>
</ul>
<p>Trong <strong>so sánh báo giá thiết kế website</strong>, hãy yêu cầu danh mục «đã bao gồm / chưa bao gồm» dạng bảng.</p>

<h2 id="mau-cau-hoi">Câu hỏi gửi nhà thầu (copy dùng ngay)</h2>
<ul>
<li>Gói này gồm bao nhiêu trang và bao nhiêu vòng duyệt UI?</li>
<li>SEO on-page (title, meta, heading, schema, sitemap) có trong báo giá không?</li>
<li>Form lead + Zalo sticky mobile có sẵn không?</li>
<li>Thời gian bàn giao và điều kiện thanh toán?</li>
<li>Ai giữ quyền domain / hosting / source code?</li>
</ul>
<p>Sau khi nhận 2–3 báo giá, lọc theo tiêu chí trên rồi mới đàm phán giá. Cần tư vấn scope: <a href="${SITE}/lien-he">liên hệ Bứt Phá</a>.</p>
`,
    faqs: [
      { q: "Báo giá rẻ nhất có đáng chọn?", a: "Chỉ khi scope rõ và bạn chấp nhận template hạn chế SEO/lead. Nếu cần chuyển đổi, ưu tiên scope đủ hơn giá thấp nhất." },
      { q: "Có nên chọn đơn vị gần nhà?", a: "Gặp mặt giúp duyệt UI nhanh, nhưng năng lực SEO/lead quan trọng hơn khoảng cách." },
      { q: "Báo giá có phải hợp đồng cuối?", a: "Thường là ước tính; chốt sau khảo sát. Đề nghị ghi rõ thay đổi scope = change request." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá thiết kế website" },
      { href: `${SITE}/blog/bao-gia-thiet-ke-website`, label: "Pillar báo giá" },
      { href: `${SITE}/website`, label: "Dịch vụ website" },
    ],
  }),

  article({
    slug: "website-doanh-nghiep-bao-nhieu-tien",
    keyword: "website doanh nghiệp bao nhiêu tiền",
    title: "Website Doanh Nghiệp Bao Nhiêu Tiền? Phân Tích Chi Phí 2026",
    metaTitle: "Website Doanh Nghiệp Bao Nhiêu Tiền | Chi Phí 2026",
    metaDescription:
      "Website doanh nghiệp bao nhiêu tiền: landing, corporate, ngành chuyên biệt. Chi phí làm web, SEO, care — bảng tham chiếu và cách lập ngân sách SME.",
    description:
      "Phân tích chi phí website doanh nghiệp 2026: các hạng mục giá, ẩn phí, khi nào chọn landing hay site đầy đủ, và cách lập ngân sách với Bứt Phá Marketing.",
    toc: [
      { id: "tra-loi-nhanh", label: "Trả lời nhanh" },
      { id: "cac-goi", label: "Các gói chi phí" },
      { id: "ngan-sach", label: "Lập ngân sách đúng" },
      { id: "roi", label: "Tính ROI sơ bộ" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `Câu hỏi <strong>website doanh nghiệp bao nhiêu tiền</strong> thường nhận câu trả lời mơ hồ. Thực tế phụ thuộc scope: 1 landing thu lead khác hẳn site 10 trang + blog + SEO local. Bài này tách chi phí theo hạng mục để SME lên ngân sách không vỡ kế hoạch.`,
      `Khi cần số tham chiếu nhanh, xem <a href="${SITE}/banggia">/banggia</a>; khi cần website theo ngành (spa, nha khoa), xem landing tại <a href="${SITE}/website">/website</a>.`,
    ],
    takeaways: [
      "Câu trả lời ngắn: thường 3–12 triệu+ tùy scope SME.",
      "Tách: thiết kế + lập trình + content + SEO + care.",
      "Ngân sách ads không nằm trong giá web.",
      "ROI: cost per lead hữu cơ sau 3–6 tháng.",
    ],
    body: `
<h2 id="tra-loi-nhanh">Website doanh nghiệp bao nhiêu tiền — trả lời nhanh</h2>
<p>Với SME Việt Nam 2026:</p>
<ul>
<li><strong>Landing / giới thiệu:</strong> khoảng 3–6 triệu</li>
<li><strong>Website doanh nghiệp chuẩn:</strong> khoảng 6–12 triệu</li>
<li><strong>Website ngành có booking/Maps:</strong> khoảng 7–15 triệu+</li>
</ul>
<p>Đây là khoảng định vị. Trả lời chính xác cho <em>website doanh nghiệp bao nhiêu tiền</em> luôn đi kèm brief: số trang, tích hợp, timeline.</p>

<h2 id="cac-goi">Các gói chi phí thường gặp</h2>
<p><strong>Gói A — Có mặt online:</strong> 5–7 trang, form liên hệ, mobile ổn. Phù hợp DN mới.</p>
<p><strong>Gói B — Thu lead:</strong> + CTA Zalo, SEO on-page, blog silo. Phù hợp dịch vụ local.</p>
<p><strong>Gói C — Ngành chuyên:</strong> spa/nha khoa/BĐS với module đặc thù. Xem <a href="${SITE}/website/nganh/spa">spa</a> và <a href="${SITE}/website/nganh/nha-khoa">nha khoa</a>.</p>

<h2 id="ngan-sach">Cách lập ngân sách đúng</h2>
<ol>
<li>Chốt mục tiêu: brand / lead / bán hàng</li>
<li>Chọn loại site khớp mục tiêu</li>
<li>Chừa 15–20% buffer change request</li>
<li>Tách ngân sách ads &amp; content riêng</li>
<li>Dự phòng care 3–6 tháng đầu</li>
</ol>

<h2 id="roi">Tính ROI sơ bộ</h2>
<p>Nếu 1 lead dịch vụ giá trị 2–5 triệu lợi nhuận và web mang 5 lead/tháng organic sau tháng 4, chi phí web 8–10 triệu hoàn vốn nhanh so với ads thuần. Website là tài sản — không phải chi phí «đốt» một lần.</p>
<p>Muốn nhận báo giá theo brief: <a href="${SITE}/lien-he">/lien-he</a>.</p>
`,
    faqs: [
      { q: "Có trả góp không?", a: "Thường chia 50–50 hoặc theo milestone. Hỏi rõ trong hợp đồng." },
      { q: "Giá đã gồm hosting?", a: "Tùy đơn vị — luôn hỏi tách dòng." },
      { q: "Tự làm trên nền builder có rẻ hơn?", a: "Phí nền tảng hàng tháng + giới hạn SEO/custom có thể đắt hơn long-term." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/so-sanh-bao-gia-thiet-ke-website`, label: "So sánh báo giá" },
      { href: `${SITE}/website`, label: "Thiết kế website" },
    ],
  }),

  article({
    slug: "thiet-ke-website-co-can-seo",
    keyword: "thiết kế website có cần SEO",
    title: "Thiết Kế Website Có Cần SEO? Khi Nào Bắt Buộc",
    metaTitle: "Thiết Kế Website Có Cần SEO? | Trả Lời Thẳng",
    metaDescription:
      "Thiết kế website có cần SEO? Phân biệt SEO on-page bàn giao vs SEO tổng thể. Checklist bắt buộc khi làm web mới — tránh làm lại đắt.",
    description:
      "Giải đáp thiết kế website có cần SEO không: phần bắt buộc khi bàn giao, phần SEO tổng thể chạy sau, và rủi ro nếu bỏ qua on-page ngay từ đầu.",
    toc: [
      { id: "tra-loi", label: "Trả lời thẳng" },
      { id: "on-page", label: "SEO on-page bắt buộc" },
      { id: "sau-ban-giao", label: "SEO sau bàn giao" },
      { id: "checklist", label: "Checklist khi ký HĐ" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `Nhiều chủ DN hỏi <strong>thiết kế website có cần SEO</strong> vì sợ phát sinh chi phí. Câu trả lời ngắn: <em>on-page SEO là bắt buộc trong gói thiết kế</em>; còn SEO tổng thể / content / backlink là giai đoạn riêng sau khi web live.`,
      `Nếu bỏ on-page lúc làm web, bạn gần như chắc sẽ trả tiền «làm lại kỹ thuật» sau vài tháng. Xem thêm dịch vụ tại <a href="${SITE}/seo-website">/seo-website</a>.`,
    ],
    takeaways: [
      "On-page = bắt buộc khi thiết kế.",
      "SEO tổng thể = tùy mục tiêu traffic.",
      "Local/Maps cần NAP + landing địa phương.",
      "Ghi rõ phạm vi SEO trong báo giá.",
    ],
    body: `
<h2 id="tra-loi">Thiết kế website có cần SEO — trả lời thẳng</h2>
<p><strong>Có — phần nền tảng.</strong> Title/meta, heading, URL sạch, tốc độ, mobile, schema, sitemap, robots, indexability. Đây không phải «gói bán thêm»; đây là tiêu chuẩn bàn giao.</p>
<p><strong>SEO tăng trưởng</strong> (viết cluster, PR, entity) có thể ký sau khi đã có traffic baseline.</p>

<h2 id="on-page">SEO on-page bắt buộc lúc thiết kế</h2>
<ul>
<li>Mỗi trang quan trọng 1 H1 khớp intent</li>
<li>Meta description có CTA</li>
<li>Internal link silo (pillar ↔ ngành ↔ báo giá)</li>
<li>Core Web Vitals chấp nhận được trên mobile</li>
<li>Schema Organization / Service / FAQ khi phù hợp</li>
</ul>

<h2 id="sau-ban-giao">SEO sau bàn giao nên làm gì?</h2>
<p>Content cluster, local citation, Google Business Profile, đo GSC hàng tuần. Với HCM: xem <a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">landing local TP.HCM</a>.</p>

<h2 id="checklist">Checklist ghi vào hợp đồng thiết kế</h2>
<ol>
<li>Danh sách URL money + title dự kiến</li>
<li>Sitemap.xml + robots.txt</li>
<li>GA4 / GSC được bàn giao</li>
<li>Form lead test trên mobile thật</li>
<li>Không noindex nhầm trang money</li>
</ol>
<p>Khi <strong>thiết kế website có cần SEO</strong> được hỏi trong sales call — dùng checklist này để lọc vendor.</p>
`,
    faqs: [
      { q: "Làm web xong mới SEO được không?", a: "Được nhưng đắt hơn và chậm hơn nếu nền on-page lỗi." },
      { q: "SEO có bảo hành top không?", a: "Không vendor tử tế nào «cam kết top 1» mọi từ khóa. Cam kết quy trình + báo cáo." },
      { q: "Local SEO khác SEO thường?", a: "Có — Maps, NAP, citation. Xem /google-maps và /seo-website." },
    ],
    related: [
      { href: `${SITE}/seo-website`, label: "SEO Website" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/thiet-ke-website`, label: "Pillar thiết kế website" },
    ],
  }),

  article({
    slug: "chon-doi-thiet-ke-website",
    keyword: "chọn đối tác thiết kế website",
    title: "Chọn Đối Tác Thiết Kế Website — 10 Tiêu Chí SME",
    metaTitle: "Chọn Đối Tác Thiết Kế Website | 10 Tiêu Chí",
    metaDescription:
      "Chọn đối tác thiết kế website: portfolio thật, báo giá scope, SEO, bảo hành, bàn giao admin. Checklist 10 tiêu chí tránh vendor «biến mất» sau khi nhận tiền.",
    description:
      "Checklist chọn đối tác thiết kế website cho SME: năng lực ngành, quy trình, SEO, hợp đồng, case study có số liệu và dấu hiệu đỏ cần tránh.",
    toc: [
      { id: "10-tieu-chi", label: "10 tiêu chí" },
      { id: "red-flags", label: "Red flags" },
      { id: "quy-trinh-chon", label: "Quy trình chọn 2 tuần" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Chọn đối tác thiết kế website</strong> ảnh hưởng doanh thu 1–3 năm tới. Portfolio đẹp chưa đủ — cần chứng minh lead, SEO và bàn giao. Bài này là checklist thực dụng cho chủ DN lần đầu thuê làm web.`,
      `Khi đã lọc được 2–3 ứng viên, so báo giá theo <a href="${SITE}/blog/so-sanh-bao-gia-thiet-ke-website">hướng dẫn so sánh báo giá</a> rồi mới ký.`,
    ],
    takeaways: [
      "Đòi case có số (GSC/lead), không chỉ ảnh.",
      "Hợp đồng ghi scope + bàn giao tài khoản.",
      "SEO on-page trong gói = tiêu chí loại.",
      "Tránh đặt cọc 100% trước khi có milestone.",
    ],
    body: `
<h2 id="10-tieu-chi">10 tiêu chí chọn đối tác thiết kế website</h2>
<ol>
<li>Case study ngành gần với bạn (spa, nha khoa, B2B…)</li>
<li>Số liệu thật: impression/click/lead — ví dụ <a href="${SITE}/du-an/nha-khoa-dang-khoa">case nha khoa</a></li>
<li>Quy trình khảo sát → UI → dev → QA → bàn giao</li>
<li>Báo giá theo dòng scope (không «trọn gói mơ hồ»)</li>
<li>Cam kết mobile + tốc độ</li>
<li>SEO on-page trong hợp đồng</li>
<li>Bàn giao admin/hosting/DNS</li>
<li>Bảo hành lỗi kỹ thuật rõ thời hạn</li>
<li>Kênh support (Zalo/email) có SLA</li>
<li>Tham chiếu pháp lý / hóa đơn VAT nếu cần</li>
</ol>

<h2 id="red-flags">Red flags khi chọn đối tác</h2>
<ul>
<li>Hứa «top Google 1 tháng» cho mọi từ khóa</li>
<li>Không cho gặp PM / chỉ chat ảo</li>
<li>Portfolio toàn template nước ngoài không liên quan VN</li>
<li>Giá quá thấp + đòi đặt cọc toàn bộ</li>
<li>Không chịu ghi SEO on-page vào hợp đồng</li>
</ul>

<h2 id="quy-trinh-chon">Quy trình chọn trong 2 tuần</h2>
<p><strong>Tuần 1:</strong> Shortlist 4–5 → gọi khảo sát → xin báo giá.<br/>
<strong>Tuần 2:</strong> So scope → check 1–2 case live → đàm phán milestone → ký.</p>
<p>Muốn được tư vấn trực tiếp: <a href="${SITE}/lien-he">/lien-he</a> · xem năng lực tại <a href="${SITE}/website">/website</a>.</p>
`,
    faqs: [
      { q: "Freelancer hay agency?", a: "Freelance ổn với landing nhỏ; website ngành + SEO nên ưu tiên team có quy trình." },
      { q: "Có cần gặp mặt ở HCM?", a: "Không bắt buộc — nhưng duyệt UI video call có record." },
      { q: "Làm sao biết case study thật?", a: "Xin URL live + screenshot GSC (che dữ liệu nhạy cảm)." },
    ],
    related: [
      { href: `${SITE}/du-an`, label: "Dự án" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/cong-ty-thiet-ke-website-uy-tin`, label: "Công ty thiết kế website uy tín" },
    ],
  }),

  article({
    slug: "thiet-ke-website-bao-lau",
    keyword: "thiết kế website bao lâu",
    title: "Thiết Kế Website Bao Lâu? Timeline Thực Tế Từng Gói",
    metaTitle: "Thiết Kế Website Bao Lâu? | Timeline 2026",
    metaDescription:
      "Thiết kế website bao lâu: landing 1–2 tuần, corporate 3–6 tuần, ngành chuyên lâu hơn. Yếu tố làm chậm dự án và cách rút ngắn vòng duyệt.",
    description:
      "Timeline thiết kế website thực tế cho SME: từng giai đoạn khảo sát–UI–dev–QA, lý do trễ tiến độ và checklist làm nhanh mà không hy sinh chất lượng.",
    toc: [
      { id: "moc-thoi-gian", label: "Mốc thời gian theo gói" },
      { id: "cac-buoc", label: "Các bước & ngày ước lượng" },
      { id: "cham-tien-do", label: "Vì sao chậm" },
      { id: "rut-ngan", label: "Rút ngắn timeline" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `Câu <strong>thiết kế website bao lâu</strong> phụ thuộc sẵn sàng nội dung của bạn nhiều hơn là «team code nhanh đến mức nào». Brief rõ + duyệt UI đúng hẹn = timeline ngắn.`,
      `Bài viết chốt mốc thực tế 2026 và cách không bị kéo dài vô hạn ở vòng «sửa giúp thêm cái này».`,
    ],
    takeaways: [
      "Landing: ~1–2 tuần nếu nội dung sẵn.",
      "Corporate: ~3–6 tuần.",
      "Chậm nhất: chờ content & feedback.",
      "Chốt số vòng duyệt trong HĐ.",
    ],
    body: `
<h2 id="moc-thoi-gian">Thiết kế website bao lâu theo từng gói?</h2>
<ul>
<li><strong>Landing page:</strong> 7–14 ngày</li>
<li><strong>Website doanh nghiệp 5–10 trang:</strong> 3–6 tuần</li>
<li><strong>Website ngành (spa/nha khoa) + booking:</strong> 4–8 tuần</li>
<li><strong>TMĐT:</strong> 6–12 tuần+</li>
</ul>

<h2 id="cac-buoc">Các bước và ngày ước lượng</h2>
<ol>
<li>Khảo sát &amp; sitemap (2–4 ngày)</li>
<li>UI/UX desktop + mobile (5–10 ngày)</li>
<li>Lập trình + tích hợp form (5–15 ngày)</li>
<li>Nhập liệu / QA / bàn giao (3–7 ngày)</li>
</ol>

<h2 id="cham-tien-do">Vì sao dự án thường chậm?</h2>
<ul>
<li>Chưa có logo, ảnh, nội dung dịch vụ</li>
<li>Quá nhiều stakeholder duyệt</li>
<li>Đổi brief giữa chừng (thêm giỏ hàng, đa ngôn ngữ…)</li>
<li>Chờ hosting/DNS phía khách</li>
</ul>

<h2 id="rut-ngan">Cách rút ngắn mà không phá chất lượng</h2>
<p>Chuẩn bị sẵn brief 1 trang, kho ảnh, và ủy quyền 1 đầu mối duyệt. Ghi trong HĐ: tối đa N vòng UI. Cần kickoff nhanh: <a href="${SITE}/lien-he">liên hệ</a>.</p>
`,
    faqs: [
      { q: "Làm trong 3 ngày được không?", a: "Landing template có thể; corporate chuẩn SEO thì rủi ro lỗi cao." },
      { q: "Timeline có trong báo giá không?", a: "Nên có — gắn milestone thanh toán." },
      { q: "SEO mất thêm bao lâu?", a: "On-page theo timeline web; tăng trưởng organic thường 8–12 tuần+." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/website`, label: "Dịch vụ website" },
      { href: `${SITE}/blog/thiet-ke-website-co-can-seo`, label: "Có cần SEO?" },
    ],
  }),

  article({
    slug: "thiet-ke-website-spa-gia-bao-nhieu",
    keyword: "thiết kế website spa giá bao nhiêu",
    title: "Thiết Kế Website Spa Giá Bao Nhiêu? Bảng Tham Chiếu",
    metaTitle: "Thiết Kế Website Spa Giá Bao Nhiêu? | 2026",
    metaDescription:
      "Thiết kế website spa giá bao nhiêu: gói booking, bảng giá liệu trình, SEO local. Tham chiếu chi phí và liên kết landing spa + /banggia.",
    description:
      "Phân tích thiết kế website spa giá bao nhiêu theo phạm vi booking, gallery, SEO Maps — kèm CTA tới landing spa và bảng giá Bứt Phá Marketing.",
    toc: [
      { id: "muc-gia", label: "Mức giá spa" },
      { id: "scope", label: "Scope ảnh hưởng giá" },
      { id: "local", label: "Local SEO spa" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Thiết kế website spa giá bao nhiêu</strong> phụ thuộc việc bạn cần đặt lịch online, bảng giá liệu trình và SEO «spa + quận» đến mức nào. Spa chỉ cần brochure sẽ rẻ hơn spa chuỗi cần đa chi nhánh.`,
      `Xem demo hướng ngành tại <a href="${SITE}/website/nganh/spa">/website/nganh/spa</a> và bài sâu <a href="${SITE}/blog/thiet-ke-website-spa">thiết kế website spa</a>.`,
    ],
    takeaways: [
      "SME spa thường 5–12 triệu+ tùy booking.",
      "Maps + NAP là bắt buộc nếu khách local.",
      "Đừng cắt form đặt lịch để «cho rẻ».",
    ],
    body: `
<h2 id="muc-gia">Mức giá tham chiếu website spa</h2>
<ul>
<li>Giới thiệu + bảng giá tĩnh: ~4–7 triệu</li>
<li>Form đặt lịch + gallery + SEO on-page: ~6–12 triệu</li>
<li>Đa chi nhánh / tích hợp lịch phức tạp: 12 triệu+</li>
</ul>
<p>Số cuối cùng sau khảo sát — tham chiếu chung tại <a href="${SITE}/banggia">/banggia</a> và <a href="${SITE}/blog/bao-gia-website-spa">báo giá website spa</a>.</p>

<h2 id="scope">Scope làm giá tăng/giảm</h2>
<p>Ảnh trước-sau, nhiều liệu trình, đa ngôn ngữ, thanh toán online — mỗi hạng mục đội timeline và giá. Chốt MVP: dịch vụ hot + form + Maps trước.</p>

<h2 id="local">Local SEO spa gắn với giá trị hợp đồng</h2>
<p>Khách spa tìm «gần tôi». Website không đồng bộ GBP = phí làm web phí phạm. Gắn luôn checklist NAP và quận phục vụ (ví dụ <a href="${SITE}/seo-website/dia-phuong/quan-3">Quận 3</a> nếu spa trung tâm).</p>
`,
    faqs: [
      { q: "Spa nhỏ có cần web không?", a: "Có nếu muốn giảm miss call và chạy ads message-match." },
      { q: "Có gói care sau khi làm web spa?", a: "Có — cập nhật liệu trình/bảng giá hàng tháng." },
      { q: "Khác website thẩm mỹ?", a: "Spa nhấn thư giãn + booking; thẩm mỹ thêm tư vấn dịch vụ y tế thẩm mỹ." },
    ],
    related: [
      { href: `${SITE}/website/nganh/spa`, label: "Landing spa" },
      { href: `${SITE}/blog/thiet-ke-website-spa`, label: "Hướng dẫn spa" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
    ],
  }),

  article({
    slug: "thiet-ke-website-nha-khoa-gia-bao-nhieu",
    keyword: "thiết kế website nha khoa giá bao nhiêu",
    title: "Thiết Kế Website Nha Khoa Giá Bao Nhiêu?",
    metaTitle: "Thiết Kế Website Nha Khoa Giá Bao Nhiêu? | 2026",
    metaDescription:
      "Thiết kế website nha khoa giá bao nhiêu: đặt lịch, dịch vụ implant/niềng, SEO local. Tham chiếu chi phí + case có số liệu GSC.",
    description:
      "Giải đáp thiết kế website nha khoa giá bao nhiêu theo phạm vi đặt lịch và SEO, kèm liên kết landing nha khoa, case Đăng Khoa và bảng giá.",
    toc: [
      { id: "muc-gia", label: "Mức giá" },
      { id: "vi-sao-dat-hon", label: "Vì sao thường cao hơn brochure" },
      { id: "proof", label: "Proof thực chiến" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Thiết kế website nha khoa giá bao nhiêu</strong> thường cao hơn web giới thiệu thông thường vì cần đặt lịch, trang dịch vụ (implant, niềng), tuân thủ thông tin y tế và SEO local mạnh.`,
      `Tham chiếu ngành: <a href="${SITE}/website/nganh/nha-khoa">landing nha khoa</a> · <a href="${SITE}/blog/thiet-ke-website-nha-khoa">hướng dẫn chi tiết</a> · case <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a>.`,
    ],
    takeaways: [
      "Thường 7–15 triệu+ tùy booking & content y tế.",
      "Case Đăng Khoa: minh họa traffic Search thật.",
      "Local pack + web phải khớp NAP.",
    ],
    body: `
<h2 id="muc-gia">Mức giá tham chiếu</h2>
<ul>
<li>Website phòng khám 1 cơ sở, form lịch: ~7–12 triệu</li>
<li>Đa dịch vụ + blog tri thức + SEO local: ~10–18 triệu</li>
<li>Chuỗi chi nhánh: báo giá theo số location</li>
</ul>
<p>Xem thêm <a href="${SITE}/blog/bao-gia-website-nha-khoa">báo giá website nha khoa</a> và <a href="${SITE}/banggia">/banggia</a>.</p>

<h2 id="vi-sao-dat-hon">Vì sao website nha khoa thường «đắt» hơn?</h2>
<p>Nội dung nhạy cảm, cần CTA đặt lịch rõ, trang dịch vụ sâu, schema phù hợp, và thường gắn Google Maps từng cơ sở. Cắt ghép template bán hàng làm giảm trust bệnh nhân.</p>

<h2 id="proof">Proof thực chiến</h2>
<p>Case Nha Khoa Đăng Khoa ghi nhận hàng chục nghìn impression và hàng trăm click từ Google Search sau triển khai website + SEO — minh họa ROI khi làm đúng. Chi tiết: <a href="${SITE}/du-an/nha-khoa-dang-khoa">/du-an/nha-khoa-dang-khoa</a>.</p>
`,
    faqs: [
      { q: "Phòng khám mới có nên đầu tư web?", a: "Có — kết hợp Maps từ ngày đầu để tích lũy review." },
      { q: "Có làm đa chi nhánh không?", a: "Có — mỗi cơ sở trang/NAP riêng." },
      { q: "Khác website phòng khám đa khoa?", a: "Nha khoa sâu dịch vụ răng; PKĐK rộng chuyên khoa." },
    ],
    related: [
      { href: `${SITE}/website/nganh/nha-khoa`, label: "Landing nha khoa" },
      { href: `${SITE}/du-an/nha-khoa-dang-khoa`, label: "Case Đăng Khoa" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
    ],
  }),

  article({
    slug: "lam-website-het-bao-nhieu-2026",
    keyword: "làm website hết bao nhiêu",
    title: "Làm Website Hết Bao Nhiêu 2026? Cập Nhật Mới Nhất",
    metaTitle: "Làm Website Hết Bao Nhiêu 2026? | Cập Nhật",
    metaDescription:
      "Làm website hết bao nhiêu năm 2026: bảng khoảng giá landing–corporate–ngành, chi phí duy trì hàng năm và checklist tránh phát sinh.",
    description:
      "Cập nhật 2026 cho câu hỏi làm website hết bao nhiêu: khoảng giá, chi phí duy trì, khi nào nên chọn gói nào và đường dẫn tới bảng giá minh bạch.",
    toc: [
      { id: "bang-2026", label: "Bảng giá 2026" },
      { id: "duy-tri", label: "Chi phí duy trì" },
      { id: "chon-goi", label: "Chọn gói nào" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `«<strong>Làm website hết bao nhiêu</strong>» là query mùa nào cũng nóng. Năm 2026, mặt bằng SME vẫn quanh vài triệu đến trên mười triệu tùy scope — nhưng kỳ vọng SEO/lead đã cao hơn trước.`,
      `Đọc cùng <a href="${SITE}/blog/website-doanh-nghiep-bao-nhieu-tien">website doanh nghiệp bao nhiêu tiền</a> và chốt số tại <a href="${SITE}/banggia">/banggia</a>.`,
    ],
    takeaways: [
      "2026: landing từ ~3tr; corporate phổ biến 6–12tr.",
      "Duy trì: domain+host+care tách dòng.",
      "Chọn gói theo mục tiêu lead, không theo «cho có web».",
    ],
    body: `
<h2 id="bang-2026">Làm website hết bao nhiêu — bảng 2026</h2>
<table>
<thead><tr><th>Nhu cầu</th><th>Khoảng</th></tr></thead>
<tbody>
<tr><td>Landing thu lead</td><td>3–6 triệu</td></tr>
<tr><td>Website DN chuẩn</td><td>6–12 triệu</td></tr>
<tr><td>Website ngành + local</td><td>7–15 triệu+</td></tr>
</tbody>
</table>

<h2 id="duy-tri">Chi phí duy trì hàng năm</h2>
<ul>
<li>Domain ~100–400k/năm</li>
<li>Hosting / VPS tùy traffic</li>
<li>SSL thường kèm hosting</li>
<li>Care nội dung / bảo mật (gói tháng)</li>
</ul>

<h2 id="chon-goi">Chọn gói nào cho đúng câu «hết bao nhiêu»</h2>
<p>Nếu bạn chỉ cần kiểm chứng kênh ads → landing. Nếu bán dịch vụ local dài hạn → corporate + SEO. Nếu spa/nha khoa → gói ngành. Tư vấn: <a href="${SITE}/lien-he">/lien-he</a>.</p>
`,
    faqs: [
      { q: "Giá 2026 có tăng so 2024?", a: "Kỳ vọng chất lượng/CWV/SEO tăng; giá gói entry vẫn cạnh tranh nhưng scope rõ hơn." },
      { q: "Có giảm giá theo mùa?", a: "Thỉnh thoảng có ưu đãi — quan trọng vẫn là scope ghi HĐ." },
      { q: "Tự làm bằng AI builder?", a: "Nhanh để prototype; production SEO/lead thường vẫn cần triển khai chuyên nghiệp." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/so-sanh-bao-gia-thiet-ke-website`, label: "So sánh báo giá" },
      { href: `${SITE}/blog/thiet-ke-website-bao-lau`, label: "Làm web bao lâu" },
    ],
  }),
];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
const supabase = createClient(url, key);

console.log(`=== Phase 3 money-support articles ===`);
console.log(`Count: ${ARTICLES.length} | dry-run: ${dryRun ? "YES" : "NO"}`);

const { data: existingRows } = await supabase
  .from("news")
  .select("slug")
  .in(
    "slug",
    ARTICLES.map((a) => a.slug),
  );
const existing = new Set((existingRows || []).map((r) => r.slug));

let ok = 0;
let skip = 0;
let fail = 0;
const created = [];

for (const art of ARTICLES) {
  try {
    if (existing.has(art.slug) && !force) {
      console.log(`  · skip exists ${art.slug} (dùng --force để ghi đè)`);
      skip++;
      continue;
    }
    const len = art.content?.length || 0;
    if (dryRun) {
      console.log(`  [dry] ${art.slug} chars=${len}`);
      ok++;
      created.push(art.slug);
      continue;
    }
    await seedRewriteArticle(art, { log: false, revalidate: false });
    console.log(`  ✓ ${art.slug} chars=${len}`);
    ok++;
    created.push(art.slug);
  } catch (e) {
    fail++;
    console.error(`  ✗ ${art.slug}:`, e.message || e);
  }
}

if (!dryRun && created.length) {
  try {
    await revalidateBlogAfterSeed();
  } catch (e) {
    console.warn("Revalidate warn:", e.message || e);
  }
}

const outDir = path.join(root, "tmp-programmatic");
const fs = await import("node:fs");
fs.mkdirSync(outDir, { recursive: true });
const urls = created.map((s) => `${SITE}/blog/${s}`);
fs.writeFileSync(
  path.join(outDir, "indexnow-phase3-money-support-urls.txt"),
  urls.join("\n") + (urls.length ? "\n" : ""),
  "utf8",
);
const md = [
  "# Phase 3 — Money-support articles (customer intent)",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Created/queued: **${created.length}** | skip exists: ${skip} | fail: ${fail}`,
  "",
  "## URLs",
  ...urls.map((u) => `- [ ] ${u}`),
  "",
  "## IndexNow",
  "```",
  "npm run ping:indexnow -- --urls=tmp-programmatic/indexnow-phase3-money-support-urls.txt",
  "```",
  "",
];
fs.writeFileSync(path.join(outDir, "gsc-phase3-money-support-checklist.md"), md.join("\n"), "utf8");

console.log(`\nDone ok=${ok} skip=${skip} fail=${fail}`);
console.log("Checklist: tmp-programmatic/gsc-phase3-money-support-checklist.md");
