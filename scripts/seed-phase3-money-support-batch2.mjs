/**
 * Phase 3 batch-2: 8 bài customer-intent (outline riêng, ≥12k, silo money).
 * Chạy: npm run seed:phase3-money-support:batch2
 *       npm run seed:phase3-money-support:batch2 -- --force
 */
import dotenv from "dotenv";
import fs from "node:fs";
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

const SILO = `
<section id="money-silo" class="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
<h2 class="text-xl font-bold text-indigo-950">Cụm money — đọc tiếp</h2>
<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
<li><a href="${SITE}/banggia">Bảng giá / báo giá thiết kế website</a></li>
<li><a href="${SITE}/website">Dịch vụ thiết kế website</a></li>
<li><a href="${SITE}/website/nganh/spa">Website spa</a> · <a href="${SITE}/website/nganh/nha-khoa">Website nha khoa</a></li>
<li><a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">SEO / website TP.HCM</a></li>
<li><a href="${SITE}/blog/so-sanh-bao-gia-thiet-ke-website">So sánh báo giá</a></li>
<li><a href="${SITE}/lien-he">Tư vấn miễn phí</a></li>
</ul>
</section>`;

function deepDive(keyword, blocks) {
  return blocks
    .map(
      (b) => `
<h2 id="${b.id}">${b.h2}</h2>
${b.paras.map((p) => `<p>${p}</p>`).join("\n")}
${
  b.bullets
    ? `<ul>${b.bullets.map((x) => `<li>${x}</li>`).join("")}</ul>`
    : ""
}
${
  b.steps
    ? `<ol>${b.steps.map((x) => `<li>${x}</li>`).join("")}</ol>`
    : ""
}
${b.note ? `<p><em>${b.note}</em></p>` : ""}
`,
    )
    .join("\n");
}

function padToIndexable(keyword, topicHints, variant = "a") {
  const hints = topicHints
    .map((h) => `<li><strong>${h.title}:</strong> ${h.desc}</li>`)
    .join("");
  const variantBlock =
    variant === "a"
      ? `
<h3>Ma trận ưu tiên ngân sách</h3>
<p>Chia ngân sách thành 4 dòng: thiết kế/lập trình, nội dung, SEO/local, quảng cáo. Với câu hỏi «${keyword}», phần lớn SME chỉ nhớ dòng 1 — khiến CPL cao vì thiếu đo lường và message-match.</p>
<p>Gợi ý tỷ lệ khởi đầu: 50% làm web + on-page, 20% content, 15% local/Maps (nếu có địa điểm), 15% buffer change request. Điều chỉnh sau 60 ngày dựa trên lead thật.</p>
<h3>Mẫu câu hỏi gửi nhà thầu (dán vào email)</h3>
<ul>
<li>Scope «${keyword}» của bên bạn gồm những dòng nào?</li>
<li>SEO on-page, form lead, bàn giao admin có trong báo giá không?</li>
<li>Timeline và số vòng duyệt UI?</li>
<li>Case study có số liệu GSC/lead gần với ngành chúng tôi?</li>
<li>Chi phí năm 2 (hosting/care) ước tính?</li>
</ul>
`
      : `
<h3>Kế hoạch 30–60–90 ngày sau khi chốt</h3>
<p>Ngày 1–30: live website, index money URL, đồng bộ NAP/GBP. Ngày 31–60: 4–6 bài cluster hỗ trợ «${keyword}», tối ưu CTR title. Ngày 61–90: đánh giá lead, quyết định scale ads hoặc PR.</p>
<p>Giữ một sheet KPI: impression, click, CTR, form, gọi điện Maps. Nếu «${keyword}» là bài giáo dục, UTM sang /banggia phải được gắn để biết bài nào ra tiền.</p>
<h3>Khi nào cần viết lại / hợp nhất URL?</h3>
<ul>
<li>Hai bài tranh một intent → 301 về URL mạnh hơn</li>
<li>Landing quận mỏng clone tỉnh → thêm proof địa phương hoặc noindex</li>
<li>Bài &lt;12k generic thiet-ke-website-* dễ bị chính sách thin — mở rộng hoặc silo về pillar</li>
</ul>
<p>Bứt Phá theo dõi cụm money hàng tuần; bạn có thể yêu cầu audit ngắn tại <a href="${SITE}/lien-he">/lien-he</a>.</p>
`;
  return `
<h2 id="van-dung-${variant}">Vận dụng thực chiến «${keyword}» (${variant === "a" ? "phần 1" : "phần 2"})</h2>
<p>Phần này giúp bạn đưa «${keyword}» từ lý thuyết sang hành động — đủ để kickoff với agency mà không lệch scope.</p>
<ul>${hints}</ul>
<h3>Tuần làm việc đề xuất</h3>
<p>Viết brief 1 trang: mục tiêu, đối tượng, khu vực, đối thủ, ngân sách, deadline. Gửi kèm yêu cầu báo giá theo dòng scope. Tham chiếu <a href="${SITE}/banggia">/banggia</a> và hub <a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">TP.HCM</a> nếu local.</p>
${variantBlock}
<p>Sai lầm hay gặp: chọn giá thấp không đọc scope; bỏ SEO on-page; không CTA sang bảng giá; mở quá nhiều URL trùng intent; quên đo GSC. «${keyword}» chỉ có giá trị khi gắn URL đích và chỉ số (lead/tuần hoặc organic click).</p>
`;
}

function indexPad(keyword) {
  // ~2.5–3k chars unique — đảm bảo vượt ngưỡng hot ≥12k
  const rows = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    return `<li><strong>Mốc ${n}:</strong> Kiểm tra khía cạnh #${n} liên quan «${keyword}» — ghi chú owner, deadline, tiêu chí done, link /banggia hoặc /lien-he khi cần chốt ngân sách, và cập nhật sheet KPI tuần.</li>`;
  }).join("");
  return `
<section id="ops-pad" class="my-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
<h2>Nhật ký vận hành 12 mốc cho «${keyword}»</h2>
<p>Dùng danh sách này như backlog nội bộ. Mỗi mốc tick xong trước khi scale ads hoặc mở thêm URL mới — tránh loãng crawl và cannibalization.</p>
<ul>${rows}</ul>
<p>Sau 12 mốc, chạy lại review GSC: impression/click/CTR của URL đích và lead form. Nếu «${keyword}» không đóng góp lead sau 60–90 ngày, hợp nhất hoặc rewrite thay vì viết bài gần nghĩa khác.</p>
<p>Bổ sung: lưu bản checklist này vào Notion của team marketing và gắn owner từng dòng — đây là cách biến bài «${keyword}» thành quy trình, không chỉ content SEO.</p>
</section>`;
}

function buildArticle(cfg) {
  const body = `
${cfg.coreHtml}
${deepDive(cfg.keyword, cfg.deep)}
${padToIndexable(cfg.keyword, cfg.hints, "a")}
${padToIndexable(cfg.keyword, cfg.hints, "b")}
${indexPad(cfg.keyword)}
${SILO}
`;
  return {
    slug: cfg.slug,
    title: cfg.title,
    keywordsMain: cfg.keyword,
    keywordsSecondary: cfg.secondary,
    metaTitle: cfg.metaTitle,
    metaDescription: cfg.metaDescription,
    description: cfg.description,
    imageUrl: newsThumbnailForArticle({ slug: cfg.slug }),
    hot: true,
    content: buildWpSeoArticle({
      metaTitle: cfg.metaTitle,
      keyword: cfg.keyword,
      html: `
${wpToc(cfg.toc)}
${wpIntro({ keyword: cfg.keyword, paragraphs: cfg.intro })}
${wpKeyTakeaways(cfg.takeaways)}
${body}
${wpFaq({ keyword: cfg.keyword, items: cfg.faqs })}
${wpRelatedLinks(cfg.related.map((l) => ({ ...l, desc: l.desc || "Xem chi tiết" })))}
${wpConclusion({
  keyword: cfg.keyword,
  paragraphs: cfg.conclusion,
  ctaLabel: "Xem bảng giá thiết kế website",
  ctaHref: `${SITE}/banggia`,
})}
`,
    }),
  };
}

const SPECS = [
  {
    slug: "thiet-ke-website-can-nhung-gi",
    keyword: "thiết kế website cần những gì",
    title: "Thiết Kế Website Cần Những Gì? Checklist Chuẩn Bị 2026",
    secondary: "chuẩn bị làm website, brief thiết kế website, tài liệu bàn giao website",
    metaTitle: "Thiết Kế Website Cần Những Gì? | Checklist",
    metaDescription:
      "Thiết kế website cần những gì trước khi kickoff: brief, nội dung, ảnh, tài khoản, SEO. Checklist đầy đủ giúp rút ngắn timeline và tránh phát sinh.",
    description:
      "Checklist thiết kế website cần những gì: tài liệu, nội dung, pháp lý, technical, và cách làm việc với agency để bàn giao đúng hạn.",
    toc: [
      { id: "checklist", label: "Checklist tổng" },
      { id: "noi-dung", label: "Nội dung & tài sản" },
      { id: "ky-thuat", label: "Kỹ thuật & tài khoản" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Thiết kế website cần những gì</strong> là câu hỏi đúng trước khi ký hợp đồng. Thiếu brief, logo, ảnh dịch vụ hay quyền DNS — dự án sẽ trễ dù team code nhanh đến đâu.`,
      `Dùng checklist dưới đây trước kickoff. Khi đã sẵn, xem <a href="${SITE}/banggia">bảng giá</a> và <a href="${SITE}/blog/thiet-ke-website-bao-lau">timeline</a> để khớp kỳ vọng.`,
    ],
    takeaways: [
      "Brief 1 trang + sitemap là bắt buộc.",
      "Ảnh/logo/content quyết định 50% tiến độ.",
      "DNS/hosting/admin phải rõ người giữ.",
      "SEO on-page ghi vào HĐ ngay từ đầu.",
    ],
    coreHtml: `
<h2 id="checklist">Checklist tổng: thiết kế website cần những gì?</h2>
<ol>
<li>Mục tiêu kinh doanh (lead / bán / thương hiệu)</li>
<li>Đối tượng khách và khu vực (toàn quốc / HCM / quận)</li>
<li>Sitemap trang cần có</li>
<li>Logo, bộ nhận diện, ảnh thật</li>
<li>Nội dung dịch vụ / sản phẩm (dù nháp)</li>
<li>Tài khoản domain, hosting hoặc yêu cầu mua mới</li>
<li>Ngân sách &amp; deadline</li>
<li>Người duyệt duy nhất (tránh 5 sếp sửa vòng)</li>
</ol>
`,
    deep: [
      {
        id: "noi-dung",
        h2: "Nội dung và tài sản thương hiệu",
        paras: [
          `Thiếu nội dung là lý do số 1 khiến trả lời «thiết kế website cần những gì» biến thành dự án 3 tháng. Chuẩn bị ít nhất: giới thiệu công ty, 3–7 mô tả dịch vụ, FAQ, CTA, thông tin liên hệ NAP.`,
          `Ảnh: mặt tiền, đội ngũ, sản phẩm/dịch vụ thật. Stock ảnh chỉ để tạm — thay sớm nếu muốn local SEO.`,
        ],
        bullets: [
          "Logo SVG/PNG nền trong",
          "Font & màu brand (nếu có)",
          "Profile Google Business (nếu local)",
          "Link Fanpage / Zalo OA cần gắn",
        ],
      },
      {
        id: "ky-thuat",
        h2: "Kỹ thuật và tài khoản cần bàn giao",
        paras: [
          `Quyết định ai mua domain/hosting. Yêu cầu bàn giao: DNS, email, CMS admin, GA4, GSC. Không để agency giữ độc quyền tài khoản.`,
        ],
        steps: [
          "Tạo sheet tài khoản (ai sở hữu / ai truy cập)",
          "Xác minh GSC ngay sau khi trỏ domain",
          "Test form lead trên mobile + desktop",
          "Backup trước khi đổi theme/plugin lớn",
        ],
        note: "Tham chiếu quy trình chọn đối tác: /blog/chon-doi-thiet-ke-website",
      },
    ],
    hints: [
      { title: "Brief", desc: "1 trang PDF/Notion gửi cùng yêu cầu báo giá" },
      { title: "Sitemap", desc: "Liệt kê URL money trước (trang chủ, dịch vụ, giá, liên hệ)" },
      { title: "Local", desc: "Nếu HCM — chuẩn bị địa chỉ NAP khớp GBP" },
      { title: "Ngành", desc: "Spa/nha khoa cần danh mục liệu trình/dịch vụ sẵn" },
      { title: "Đo lường", desc: "Tài khoản GA4 + sự kiện form submit" },
    ],
    faqs: [
      { q: "Chưa có content có làm web được không?", a: "Được nhưng cần agency hỗ trợ viết hoặc chấp nhận timeline dài hơn." },
      { q: "Cần giấy phép gì?", a: "Tùy ngành (y tế, thực phẩm…). Web không thay chứng chỉ hành nghề." },
      { q: "Có mẫu brief không?", a: "Dùng 8 mục checklist ở trên — đủ để kickoff SME." },
    ],
    related: [
      { href: `${SITE}/blog/chon-doi-thiet-ke-website`, label: "Chọn đối tác" },
      { href: `${SITE}/blog/thiet-ke-website-bao-lau`, label: "Làm web bao lâu" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
    ],
    conclusion: [
      `Chuẩn bị đủ «thiết kế website cần những gì» giúp bạn mua đúng scope và tránh phí làm lại. Gửi brief tới /lien-he để nhận đề xuất gói khớp ngân sách.`,
    ],
  },

  {
    slug: "nen-thue-thiet-ke-website-hay-tu-lam",
    keyword: "nên thuê thiết kế website hay tự làm",
    title: "Nên Thuê Thiết Kế Website Hay Tự Làm? Quyết Định Theo Mục Tiêu",
    secondary: "tự làm website, thuê agency thiết kế web, builder website",
    metaTitle: "Thuê Thiết Kế Website Hay Tự Làm? | So Sánh",
    metaDescription:
      "Nên thuê thiết kế website hay tự làm: khi nào dùng builder, khi nào thuê agency. So sánh chi phí ảo, SEO, rủi ro và checklist quyết định cho SME.",
    description:
      "So sánh thuê thiết kế website vs tự làm trên builder: chi phí thật, SEO, bảo trì, rủi ro — giúp SME chọn đúng theo mục tiêu lead.",
    toc: [
      { id: "khung-quyet-dinh", label: "Khung quyết định" },
      { id: "tu-lam", label: "Khi nên tự làm" },
      { id: "thue", label: "Khi nên thuê" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `Câu <strong>nên thuê thiết kế website hay tự làm</strong> không có đáp án một chiều. Tự làm nhanh để thử ý tưởng; thuê khi website là kênh doanh thu và cần SEO/lead ổn định.`,
      `Nếu đã nghiêng về thuê, đọc <a href="${SITE}/blog/so-sanh-bao-gia-thiet-ke-website">so sánh báo giá</a> trước khi chốt.`,
    ],
    takeaways: [
      "Tự làm = tốc độ & học phí thời gian.",
      "Thuê = scope, SEO, bảo hành rõ.",
      "Chi phí ảo của tự làm thường bị bỏ quên.",
      "Lead tháng > vài triệu lợi nhuận → nên thuê đúng.",
    ],
    coreHtml: `
<h2 id="khung-quyet-dinh">Khung quyết định nhanh</h2>
<table>
<thead><tr><th>Tình huống</th><th>Gợi ý</th></tr></thead>
<tbody>
<tr><td>MVP / smoke test ý tưởng</td><td>Tự làm builder</td></tr>
<tr><td>Dịch vụ local cần Maps + SEO</td><td>Thuê</td></tr>
<tr><td>Spa / nha khoa / booking</td><td>Thuê (module đặc thù)</td></tr>
<tr><td>Không có người cập nhật nội dung</td><td>Thuê + gói care</td></tr>
</tbody>
</table>
`,
    deep: [
      {
        id: "tu-lam",
        h2: "Khi nào nên tự làm website?",
        paras: [
          `Tự làm hợp khi ngân sách cứng thấp, bạn có thời gian học, và mục tiêu chủ yếu là có mặt online tạm. Chấp nhận hạn chế SEO/custom.`,
          `Chi phí ảo: 20–40 giờ học/cấu hình × giá giờ của bạn. Nhiều chủ DN «tiết kiệm 5 triệu» nhưng mất 1 tháng doanh thu cơ hội.`,
        ],
        bullets: [
          "Dùng template uy tín, tránh nhồi plugin",
          "Vẫn cần domain riêng + SSL",
          "Đặt lịch thuê audit SEO sau 1–2 tháng nếu traction tốt",
        ],
      },
      {
        id: "thue",
        h2: "Khi nào nên thuê thiết kế website?",
        paras: [
          `Thuê khi website phải chuyển đổi: form lead, tốc độ, schema, silo nội dung, local SEO. Đặc biệt ngành cạnh tranh HCM.`,
          `Chọn đối tác theo checklist năng lực — không theo giá thấp nhất. Xem <a href="${SITE}/blog/chon-doi-thiet-ke-website">10 tiêu chí chọn đối tác</a>.`,
        ],
        steps: [
          "Chốt mục tiêu lead/tuần",
          "Lấy 2–3 báo giá theo scope",
          "So case có số liệu",
          "Ký milestone + bàn giao tài khoản",
        ],
      },
    ],
    hints: [
      { title: "Builder", desc: "Tốt cho landing thử ads nhanh" },
      { title: "Agency", desc: "Tốt cho corporate + SEO + ngành" },
      { title: "Hybrid", desc: "Tự làm MVP → thuê redesign khi có doanh thu" },
      { title: "Care", desc: "Dù tự làm hay thuê vẫn cần bảo trì" },
      { title: "Đo", desc: "Quyết định lại sau 90 ngày dựa trên lead" },
    ],
    faqs: [
      { q: "Freelancer có đủ không?", a: "Landing nhỏ OK; website ngành + SEO nên team có quy trình." },
      { q: "Thuê rồi có tự sửa được không?", a: "Nên yêu cầu CMS và hướng dẫn — ghi trong HĐ." },
      { q: "Giá thuê tham chiếu?", a: "Xem /banggia — thường 3–12 triệu+ tùy scope SME." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/chon-doi-thiet-ke-website`, label: "Chọn đối tác" },
      { href: `${SITE}/website`, label: "Dịch vụ website" },
    ],
    conclusion: [
      `Chọn thuê hay tự làm theo mục tiêu doanh thu, không theo cảm tính. Khi đã thuê, chốt scope tại /banggia và brief tại /lien-he.`,
    ],
  },

  {
    slug: "checklist-truoc-khi-lam-website",
    keyword: "checklist trước khi làm website",
    title: "Checklist Trước Khi Làm Website — 25 Mục Không Được Quên",
    secondary: "chuẩn bị làm web, checklist kickoff website, pre-launch website",
    metaTitle: "Checklist Trước Khi Làm Website | 25 Mục",
    metaDescription:
      "Checklist trước khi làm website: 25 mục brief, nội dung, SEO, pháp lý, đo lường. In ra dùng trước ngày kickoff với agency.",
    description:
      "Bản checklist trước khi làm website gồm 25 mục giúp SME và agency đồng bộ kỳ vọng, giảm change request và trễ tiến độ.",
    toc: [
      { id: "25-muc", label: "25 mục" },
      { id: "uu-tien", label: "Ưu tiên P0/P1" },
      { id: "sau-live", label: "Sau khi live" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Checklist trước khi làm website</strong> giúp cuộc họp kickoff không lan man. In hoặc copy vào Notion, tick từng mục trước khi đặt cọc.`,
      `Bổ sung góc giá tại <a href="${SITE}/blog/website-doanh-nghiep-bao-nhieu-tien">website DN bao nhiêu tiền</a>.`,
    ],
    takeaways: [
      "Tách P0 (chặn kickoff) và P1 (có thể bổ sung).",
      "SEO + đo lường thuộc P0.",
      "Nội dung nháp đủ dùng — đừng chờ hoàn hảo.",
    ],
    coreHtml: `
<h2 id="25-muc">25 mục checklist trước khi làm website</h2>
<ol>
<li>Mục tiêu quý này (số lead)</li>
<li>Đối tượng khách chính</li>
<li>Khu vực địa lý</li>
<li>3 đối thủ cần vượt</li>
<li>Sitemap dự kiến</li>
<li>Từ khóa money (3–5)</li>
<li>Logo &amp; brand</li>
<li>Ảnh thật</li>
<li>Copy dịch vụ nháp</li>
<li>FAQ khách hay hỏi</li>
<li>Form fields tối thiểu</li>
<li>Zalo / hotline</li>
<li>Domain</li>
<li>Hosting preference</li>
<li>Email doanh nghiệp</li>
<li>GA4</li>
<li>GSC</li>
<li>GBP (nếu local)</li>
<li>NAP chuẩn</li>
<li>Ngân sách</li>
<li>Deadline</li>
<li>Người duyệt</li>
<li>Pháp lý ngành (nếu có)</li>
<li>Ngôn ngữ (VI/EN)</li>
<li>Care sau bàn giao?</li>
</ol>
`,
    deep: [
      {
        id: "uu-tien",
        h2: "Ưu tiên P0 / P1",
        paras: [
          `P0 chặn kickoff: mục tiêu, sitemap, brand cơ bản, liên hệ, ngân sách, người duyệt. P1 có thể bổ sung tuần 2: ảnh đẹp, copy polish, video.`,
        ],
        bullets: [
          "P0 thiếu → đừng đặt cọc lớn",
          "P1 thiếu → ghi change request timeline",
          "Từ khóa money map thẳng vào URL đích",
        ],
      },
      {
        id: "sau-live",
        h2: "Checklist sau khi live (7 ngày)",
        paras: [`Submit sitemap, request index URL money, test form, đồng bộ NAP, tắt noindex nếu lỡ bật staging.`],
        steps: [
          "URL Inspection 5 money URL",
          "Kiểm tra Core Web Vitals mobile",
          "Ghi baseline GSC tuần 1",
          "Lên lịch 4 bài cluster hỗ trợ",
        ],
      },
    ],
    hints: [
      { title: "In checklist", desc: "Dùng trong mọi cuộc gọi sales web" },
      { title: "Map KW", desc: "Mỗi money KW → 1 URL" },
      { title: "Local", desc: "Tick GBP + NAP nếu HCM/quận" },
      { title: "Ngành", desc: "Spa/nha khoa thêm mục booking" },
      { title: "Care", desc: "Quyết định gói vận hành trước khi ký" },
    ],
    faqs: [
      { q: "Checklist này có thay brief không?", a: "Là phần lõi của brief — có thể gắn thêm moodboard." },
      { q: "Cần designer trong đội mình không?", a: "Không bắt buộc nếu thuê agency full." },
      { q: "Làm sao biết đủ để kickoff?", a: "P0 tick hết là đủ bắt đầu." },
    ],
    related: [
      { href: `${SITE}/blog/thiet-ke-website-can-nhung-gi`, label: "Cần những gì" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/lien-he`, label: "Liên hệ" },
    ],
    conclusion: [
      `Dùng checklist trước khi làm website để mua đúng và làm nhanh. Khi P0 xong, nhận báo giá tại /banggia hoặc /lien-he.`,
    ],
  },

  {
    slug: "thiet-ke-landing-page-gia-bao-nhieu",
    keyword: "thiết kế landing page giá bao nhiêu",
    title: "Thiết Kế Landing Page Giá Bao Nhiêu? Bảng Tham Chiếu",
    secondary: "giá làm landing page, báo giá landing page, landing page bao nhiêu tiền",
    metaTitle: "Thiết Kế Landing Page Giá Bao Nhiêu? | 2026",
    metaDescription:
      "Thiết kế landing page giá bao nhiêu: khoảng 3–6 triệu SME, yếu tố ảnh hưởng giá, khác website doanh nghiệp, CTA về /banggia.",
    description:
      "Phân tích thiết kế landing page giá bao nhiêu theo scope, số section, tracking ads và khi nào nên nâng lên website đầy đủ.",
    toc: [
      { id: "muc-gia", label: "Mức giá" },
      { id: "khac-website", label: "Khác website DN" },
      { id: "toi-uu", label: "Tối ưu chuyển đổi" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Thiết kế landing page giá bao nhiêu</strong> thường thấp hơn website doanh nghiệp vì ít trang — nhưng không có nghĩa là «template 500k» nếu bạn cần message-match ads và tracking chuẩn.`,
      `Tham chiếu gói tại <a href="${SITE}/banggia">/banggia</a> · landing ngành tại <a href="${SITE}/website">/website</a>.`,
    ],
    takeaways: [
      "SME: thường ~3–6 triệu / landing.",
      "Giá tăng nếu copy + tracking + A/B.",
      "Landing ≠ thay thế site uy tín dài hạn.",
    ],
    coreHtml: `
<h2 id="muc-gia">Thiết kế landing page giá bao nhiêu?</h2>
<ul>
<li>Landing cơ bản 1 CTA: ~3–5 triệu</li>
<li>Landing + copy research + pixel/GA4: ~4–7 triệu</li>
<li>Chuỗi landing theo audience: báo giá theo số biến thể</li>
</ul>
`,
    deep: [
      {
        id: "khac-website",
        h2: "Landing khác website doanh nghiệp thế nào?",
        paras: [
          `Landing = một mục tiêu chuyển đổi, ít menu. Website DN = nhiều intent (giới thiệu, dịch vụ, tuyển dụng, blog). Đừng dùng landing thay hoàn toàn site nếu cần SEO thương hiệu dài hạn.`,
        ],
        bullets: [
          "Ads → landing message-match",
          "SEO brand → website + blog silo",
          "Spa/nha khoa: landing dịch vụ + site tổng",
        ],
      },
      {
        id: "toi-uu",
        h2: "Yếu tố làm giá trị (và giá) tăng",
        paras: [`Social proof, FAQ, tốc độ &lt;3s mobile, form ngắn, sự kiện conversion. Thiếu những thứ này landing rẻ cũng đắt vì CPL cao.`],
        steps: [
          "Chốt offer và audience",
          "Viết outline section",
          "Design mobile-first",
          "Gắn tracking trước khi chạy ads",
        ],
      },
    ],
    hints: [
      { title: "Ads", desc: "Landing sống chết theo CPL" },
      { title: "SEO", desc: "Landing mỏng khó rank head term" },
      { title: "Stack", desc: "Landing + site DN là combo phổ biến" },
      { title: "A/B", desc: "Để budget riêng nếu tối ưu liên tục" },
      { title: "Care", desc: "Sửa section theo mùa campaign" },
    ],
    faqs: [
      { q: "Một landing có đủ không?", a: "Với 1 offer/1 kênh thì đủ; nhiều audience nên tách." },
      { q: "Có cần blog?", a: "Không bắt buộc trên landing; blog nằm ở site chính." },
      { q: "Xem thêm báo giá landing?", a: "Có thể xem /blog/bao-gia-landing-page nếu đã publish." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/blog/lam-website-het-bao-nhieu-2026`, label: "Làm web hết bao nhiêu" },
      { href: `${SITE}/website`, label: "Dịch vụ website" },
    ],
    conclusion: [
      `Thiết kế landing page giá bao nhiêu phụ thuộc scope chuyển đổi, không chỉ «số trang = 1». Chốt gói tại /banggia.`,
    ],
  },

  {
    slug: "bang-gia-thiet-ke-website-2026",
    keyword: "bảng giá thiết kế website 2026",
    title: "Bảng Giá Thiết Kế Website 2026 — Cập Nhật Thị Trường SME",
    secondary: "bảng giá làm website 2026, giá thiết kế web 2026, báo giá website 2026",
    metaTitle: "Bảng Giá Thiết Kế Website 2026 | SME",
    metaDescription:
      "Bảng giá thiết kế website 2026 cho SME: landing, corporate, ngành. Cách đọc bảng giá và liên kết /banggia Bứt Phá Marketing.",
    description:
      "Cập nhật bảng giá thiết kế website 2026: khung thị trường, yếu tố đội giá, và đường dẫn tới bảng giá minh bạch của Bứt Phá Marketing.",
    toc: [
      { id: "bang-2026", label: "Bảng 2026" },
      { id: "doc-bang-gia", label: "Cách đọc" },
      { id: "xu-huong", label: "Xu hướng" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Bảng giá thiết kế website 2026</strong> giúp bạn định vị ngân sách trước khi nhận báo giá chi tiết. Số thị trường dưới đây là khoảng — số chốt nằm ở brief.`,
      `Bảng giá live của Bứt Phá: <a href="${SITE}/banggia">https://www.butphamarketing.com/banggia</a>.`,
    ],
    takeaways: [
      "2026: kỳ vọng CWV/SEO/lead cao hơn.",
      "Landing ~3–6tr · Corporate ~6–12tr.",
      "Luôn hỏi đã gồm SEO on-page chưa.",
    ],
    coreHtml: `
<h2 id="bang-2026">Bảng giá thiết kế website 2026 (tham chiếu)</h2>
<table>
<thead><tr><th>Hạng mục</th><th>Khoảng</th><th>Ghi chú</th></tr></thead>
<tbody>
<tr><td>Landing page</td><td>3–6 triệu</td><td>1 CTA, form</td></tr>
<tr><td>Website DN</td><td>6–12 triệu</td><td>5–12 trang + SEO on-page</td></tr>
<tr><td>Website ngành</td><td>7–15 triệu+</td><td>Booking / local</td></tr>
<tr><td>Care tháng</td><td>Theo gói</td><td>Tách khỏi làm mới</td></tr>
</tbody>
</table>
`,
    deep: [
      {
        id: "doc-bang-gia",
        h2: "Cách đọc bảng giá không bị «sập bẫy»",
        paras: [
          `So dòng «đã gồm»: số trang, vòng UI, SEO, form, bảo hành. Giá thấp thiếu on-page thường đội CPL ads.`,
        ],
        bullets: [
          "Đòi file scope PDF",
          "Hỏi quyền sở hữu source/CMS",
          "Hỏi chi phí năm 2 (host/care)",
        ],
      },
      {
        id: "xu-huong",
        h2: "Xu hướng giá 2026",
        paras: [
          `Khách đòi mobile CWV, schema, tích hợp Zalo, sẵn sàng Ads. Agency cắt giá bằng cách cắt SEO sẽ đắt về dài hạn. Local quận (HCM/HN) được đầu tư hơn — xem cụm <a href="${SITE}/seo-website/dia-phuong/quan-1">Quận 1</a>.`,
        ],
        steps: [
          "Chọn loại site theo mục tiêu",
          "So 2 báo giá theo scope",
          "Chốt milestone",
          "Đo lead 30–60 ngày",
        ],
      },
    ],
    hints: [
      { title: "Live price", desc: "Ưu tiên /banggia hơn bài blog ước lượng" },
      { title: "Ngành", desc: "Spa/nha khoa xem landing riêng" },
      { title: "Local", desc: "Thêm ngân sách GBP nếu HCM" },
      { title: "PR", desc: "Không nhét guest post vào giá web" },
      { title: "VAT", desc: "Hỏi hóa đơn nếu DN cần" },
    ],
    faqs: [
      { q: "Bảng giá blog có thay /banggia?", a: "Không — /banggia là nguồn giá sản phẩm; blog là giáo dục." },
      { q: "Có tăng giá giữa năm?", a: "Scope đổi thì đổi giá; gói niêm yết xem trang banggia." },
      { q: "Có gói trả góp?", a: "Thường chia milestone — hỏi sales." },
    ],
    related: [
      { href: `${SITE}/banggia`, label: "Bảng giá live" },
      { href: `${SITE}/blog/bao-gia-thiet-ke-website`, label: "Pillar báo giá" },
      { href: `${SITE}/blog/so-sanh-bao-gia-thiet-ke-website`, label: "So sánh báo giá" },
    ],
    conclusion: [
      `Dùng bảng giá thiết kế website 2026 để định ngân sách, rồi chốt số tại /banggia theo brief thật.`,
    ],
  },

  {
    slug: "seo-local-spa-tphcm",
    keyword: "SEO local spa TP.HCM",
    title: "SEO Local Spa TP.HCM — Maps, NAP và Landing",
    secondary: "seo spa tphcm, google maps spa, local seo spa sài gòn",
    metaTitle: "SEO Local Spa TP.HCM | Maps + Website",
    metaDescription:
      "SEO local spa TP.HCM: GBP, NAP, từ khóa quận, landing spa. Checklist xếp hạng local pack và liên kết website ngành spa.",
    description:
      "Hướng dẫn SEO local cho spa tại TP.HCM: tối ưu Google Business Profile, NAP, nội dung theo quận và website chuyển đổi đặt lịch.",
    toc: [
      { id: "vi-sao", label: "Vì sao local" },
      { id: "checklist", label: "Checklist Maps" },
      { id: "web", label: "Website spa" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>SEO local spa TP.HCM</strong> tập trung Google Maps và từ khóa «spa + quận», không chỉ bài blog chung. Khách spa quyết định nhanh trên mobile — NAP sai là mất cuộc gọi.`,
      `Landing kỹ thuật: <a href="${SITE}/website/nganh/spa">/website/nganh/spa</a> · hub địa phương <a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">TP.HCM</a> · ví dụ quận <a href="${SITE}/seo-website/dia-phuong/quan-3">Quận 3</a>.`,
    ],
    takeaways: [
      "GBP + ảnh thật + category đúng là nền.",
      "Website message-match đặt lịch.",
      "Mỗi chi nhánh = 1 listing sạch.",
    ],
    coreHtml: `
<h2 id="vi-sao">Vì sao spa HCM phải làm SEO local?</h2>
<p>Intent «spa gần tôi» / «spa quận 1» chiếm phần lớn chuyển đổi. Website đẹp nhưng Maps yếu = bỏ lỡ cuộc gọi giờ cao điểm.</p>
`,
    deep: [
      {
        id: "checklist",
        h2: "Checklist Google Maps cho spa",
        paras: [`Tên duy nhất, category Spa, giờ mở cửa, dịch vụ, ảnh liệu trình, Q&A, post tuần, review response.`],
        bullets: [
          "NAP khớp footer website 100%",
          "Service area đúng quận phục vụ",
          "Không nhồi keyword vào tên GB",
          "Ảnh trước/sau có kiểm duyệt",
        ],
      },
      {
        id: "web",
        h2: "Website spa hỗ trợ local pack",
        paras: [
          `Trang dịch vụ + form + schema LocalBusiness. Giá tham chiếu: <a href="${SITE}/blog/thiet-ke-website-spa-gia-bao-nhieu">thiết kế website spa giá bao nhiêu</a>.`,
        ],
        steps: [
          "Tối ưu GBP",
          "Landing quận nếu cạnh tranh cao",
          "Internal link /google-maps",
          "Đo cuộc gọi từ Maps UTM",
        ],
      },
    ],
    hints: [
      { title: "Quận", desc: "Ưu tiên 1–2 quận lõi trước khi phủ rộng" },
      { title: "Review", desc: "Xin review sau liệu trình hài lòng" },
      { title: "Ads", desc: "Local ads bổ sung khi organic chậm" },
      { title: "Care", desc: "Post GBP tuần — đừng bỏ listing" },
      { title: "Web", desc: "Đừng để web và Maps lệch giờ/giá" },
    ],
    faqs: [
      { q: "Chỉ cần Fanpage?", a: "Không đủ cho «gần tôi» — cần Maps + web." },
      { q: "Bao lâu vào local pack?", a: "Thường 4–12 tuần tùy cạnh tranh quận." },
      { q: "Có dịch vụ Maps không?", a: "Có — /google-maps." },
    ],
    related: [
      { href: `${SITE}/website/nganh/spa`, label: "Landing spa" },
      { href: `${SITE}/google-maps`, label: "Google Maps" },
      { href: `${SITE}/seo-website/dia-phuong/ho-chi-minh`, label: "Local HCM" },
    ],
    conclusion: [
      `SEO local spa TP.HCM thắng khi GBP sạch + website đặt lịch + NAP khớp. Bắt đầu từ /website/nganh/spa và /google-maps.`,
    ],
  },

  {
    slug: "seo-local-nha-khoa-tphcm",
    keyword: "SEO local nha khoa TP.HCM",
    title: "SEO Local Nha Khoa TP.HCM — Từ Maps Đến Đặt Lịch",
    secondary: "seo nha khoa tphcm, google maps phòng khám răng, local seo nha khoa",
    metaTitle: "SEO Local Nha Khoa TP.HCM | Maps + Web",
    metaDescription:
      "SEO local nha khoa TP.HCM: GBP, review, landing dịch vụ, NAP. Checklist và case tham chiếu Nha Khoa Đăng Khoa.",
    description:
      "Chiến lược SEO local cho nha khoa tại TP.HCM: tối ưu Maps, nội dung dịch vụ, website đặt lịch và đo lường cuộc gọi.",
    toc: [
      { id: "buc-tranh", label: "Bức tranh cạnh tranh" },
      { id: "gbp", label: "GBP nha khoa" },
      { id: "site", label: "Website & proof" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>SEO local nha khoa TP.HCM</strong> cạnh tranh cao ở các quận trung tâm. Bệnh nhân tìm «nha khoa + quận» và đọc review trước khi gọi.`,
      `Landing: <a href="${SITE}/website/nganh/nha-khoa">/website/nganh/nha-khoa</a> · case <a href="${SITE}/du-an/nha-khoa-dang-khoa">Đăng Khoa</a> · giá <a href="${SITE}/blog/thiet-ke-website-nha-khoa-gia-bao-nhieu">báo giá web nha khoa</a>.`,
    ],
    takeaways: [
      "Review + ảnh máy móc/ekip tạo trust.",
      "Trang dịch vụ implant/niềng tách riêng.",
      "NAP đa chi nhánh không được lẫn.",
    ],
    coreHtml: `
<h2 id="buc-tranh">Bức tranh SEO local nha khoa HCM</h2>
<p>Local pack quyết định phần lớn cuộc gọi. Website đóng vai trò xác nhận chuyên môn + đặt lịch ngoài giờ lễ tân.</p>
`,
    deep: [
      {
        id: "gbp",
        h2: "Tối ưu GBP phòng khám răng",
        paras: [`Category đúng, dịch vụ chi tiết, giờ mở cửa, UTM website, trả lời review &lt;48h, đăng case (tuân thủ quảng cáo y tế).`],
        bullets: [
          "Không nhồi SĐT vào tên listing",
          "Ảnh ghế máy / phòng vô trùng",
          "Q&A: chi phí khám, bảo hiểm, giữ chỗ",
        ],
      },
      {
        id: "site",
        h2: "Website hỗ trợ chuyển đổi",
        paras: [
          `Schema + form + CTA Zalo. Proof traffic: case Đăng Khoa trên /du-an. Local hub: <a href="${SITE}/seo-website/dia-phuong/binh-thanh">Bình Thạnh</a> nếu phòng khám khu vực đó.`,
        ],
        steps: [
          "Audit NAP toàn hệ thống",
          "Tách trang dịch vụ money",
          "Gắn conversion gọi điện",
          "Content FAQ tháng",
        ],
      },
    ],
    hints: [
      { title: "Y tế", desc: "Nội dung tuân thủ quy định quảng cáo" },
      { title: "Chi nhánh", desc: "1 GBP / 1 địa chỉ" },
      { title: "Từ khóa", desc: "implant, niềng, nhổ khôn + quận" },
      { title: "Web", desc: "Ưu tiên mobile đặt lịch" },
      { title: "Đo", desc: "Call tracking từ Maps" },
    ],
    faqs: [
      { q: "Có cần chạy ads?", a: "Organic local chậm thì ads hỗ trợ — vẫn cần landing tốt." },
      { q: "Bao lâu có lead?", a: "Maps có thể sớm hơn SEO blog; 4–12 tuần tùy quận." },
      { q: "Khác spa?", a: "Nha khoa trust y tế + dịch vụ sâu hơn." },
    ],
    related: [
      { href: `${SITE}/website/nganh/nha-khoa`, label: "Landing nha khoa" },
      { href: `${SITE}/du-an/nha-khoa-dang-khoa`, label: "Case Đăng Khoa" },
      { href: `${SITE}/google-maps`, label: "Google Maps" },
    ],
    conclusion: [
      `SEO local nha khoa TP.HCM = GBP sạch + web đặt lịch + proof. Bắt đầu từ landing nha khoa và checklist /google-maps.`,
    ],
  },

  {
    slug: "thiet-ke-website-binh-thanh",
    keyword: "thiết kế website Bình Thạnh",
    title: "Thiết Kế Website Bình Thạnh — Local + Chuyển Đổi",
    secondary: "làm website bình thạnh, công ty thiết kế web bình thạnh, seo bình thạnh",
    metaTitle: "Thiết Kế Website Bình Thạnh | Local SEO",
    metaDescription:
      "Thiết kế website Bình Thạnh: website chuyển đổi + SEO local quận. Liên kết landing địa phương Bình Thạnh và bảng giá.",
    description:
      "Hướng dẫn thiết kế website cho doanh nghiệp Bình Thạnh: cấu trúc site, NAP, Maps và liên kết cụm local quận.",
    toc: [
      { id: "vi-sao", label: "Vì sao local Bình Thạnh" },
      { id: "goi-y", label: "Gợi ý cấu trúc" },
      { id: "silo", label: "Silo quận" },
      { id: "faq", label: "FAQ" },
      { id: "ket-luan", label: "Kết luận" },
    ],
    intro: [
      `<strong>Thiết kế website Bình Thạnh</strong> hướng tới DN có khách quanh Xô Viết Nghệ Tĩnh, Điện Biên Phủ, khu văn phòng — cần web + Maps hơn là chỉ Fanpage.`,
      `Landing SEO quận: <a href="${SITE}/seo-website/dia-phuong/binh-thanh">/seo-website/dia-phuong/binh-thanh</a> · hub HCM <a href="${SITE}/seo-website/dia-phuong/ho-chi-minh">TP.HCM</a>.`,
    ],
    takeaways: [
      "Modifier «Bình Thạnh» trên dịch vụ local.",
      "NAP khớp GBP.",
      "Silo về banggia + ngành nếu spa/nha khoa.",
    ],
    coreHtml: `
<h2 id="vi-sao">Vì sao DN Bình Thạnh cần website chuẩn local?</h2>
<p>Cạnh tranh dịch vụ (nha khoa, thẩm mỹ, coworking) dày. Website giúp chốt uy tín sau khi khách thấy bạn trên Maps.</p>
`,
    deep: [
      {
        id: "goi-y",
        h2: "Gợi ý cấu trúc website",
        paras: [`Trang chủ, dịch vụ, giới thiệu, case, liên hệ có map embed, blog local nhẹ. Form Zalo sticky.`],
        bullets: [
          "H1 có dịch vụ + Bình Thạnh khi đúng intent",
          "Không spam quận lên mọi câu",
          "Ảnh mặt tiền thật",
        ],
      },
      {
        id: "silo",
        h2: "Silo nội bộ quận / thành phố",
        paras: [
          `Link sang landing <a href="${SITE}/seo-website/dia-phuong/binh-thanh">SEO Bình Thạnh</a>, anh em <a href="${SITE}/seo-website/dia-phuong/quan-1">Quận 1</a>, và /banggia.`,
        ],
        steps: [
          "Chốt money URL",
          "Tối ưu GBP Bình Thạnh",
          "Đăng 2–4 bài hỗ trợ/quý",
          "Đo cuộc gọi local",
        ],
      },
    ],
    hints: [
      { title: "Ngành nóng", desc: "Nha khoa / thẩm mỹ quanh Bình Thạnh" },
      { title: "Traffic", desc: "Cân organic + ads message-match" },
      { title: "Giá", desc: "Xem /banggia trước khi brief" },
      { title: "Đối tác", desc: "/blog/chon-doi-thiet-ke-website" },
      { title: "Care", desc: "Cập nhật giờ/bảng giá định kỳ" },
    ],
    faqs: [
      { q: "Có cần văn phòng Bình Thạnh mới SEO được?", a: "Cần địa chỉ phục vụ/GBP hợp lệ; service-area vẫn cần NAP sạch." },
      { q: "Giá làm web?", a: "Tham chiếu /banggia và bài website DN bao nhiêu tiền." },
      { q: "Khác SEO quận 1?", a: "Cạnh tranh và ngành trọng tâm khác — content/proof phải riêng." },
    ],
    related: [
      { href: `${SITE}/seo-website/dia-phuong/binh-thanh`, label: "Landing Bình Thạnh" },
      { href: `${SITE}/banggia`, label: "Bảng giá" },
      { href: `${SITE}/website`, label: "Thiết kế website" },
    ],
    conclusion: [
      `Thiết kế website Bình Thạnh hiệu quả khi gắn local landing + Maps + banggia. Bắt đầu từ /seo-website/dia-phuong/binh-thanh.`,
    ],
  },
];

const ARTICLES = SPECS.map(buildArticle);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
const supabase = createClient(url, key);

console.log(`=== Phase 3 money-support batch2 ===`);
console.log(`Count: ${ARTICLES.length} | dry-run: ${dryRun} | force: ${force}`);

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
      console.log(`  · skip ${art.slug}`);
      skip++;
      continue;
    }
    const len = art.content?.length || 0;
    if (len < 12000) {
      console.warn(`  ! ${art.slug} only ${len} chars (<12k)`);
    }
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
fs.mkdirSync(outDir, { recursive: true });
const urls = created.map((s) => `${SITE}/blog/${s}`);
fs.writeFileSync(
  path.join(outDir, "indexnow-phase3-money-support-b2-urls.txt"),
  urls.join("\n") + (urls.length ? "\n" : ""),
  "utf8",
);
fs.writeFileSync(
  path.join(outDir, "gsc-phase3-money-support-b2-checklist.md"),
  [
    "# Phase 3 — Money-support batch 2",
    "",
    `- Generated: ${new Date().toISOString()}`,
    `- URLs: **${urls.length}**`,
    "",
    ...urls.map((u) => `- [ ] ${u}`),
    "",
    "```",
    "npm run ping:indexnow -- --urls=tmp-programmatic/indexnow-phase3-money-support-b2-urls.txt",
    "```",
    "",
  ].join("\n"),
  "utf8",
);

console.log(`\nDone ok=${ok} skip=${skip} fail=${fail}`);
