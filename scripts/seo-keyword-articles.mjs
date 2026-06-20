import {
  wrapArticle,
  img,
  toc,
  internalLinks,
  externalLinks,
  NEWS_THUMBNAIL,
  NEWS_CONTENT_IMAGE_COUNT,
  altFromKeyword,
  validateSeoKeywordPlacement,
  detectNewsTopic,
  newsThumbnailForArticle,
  newsContentImageCountForTopic,
} from "./seo-article-helpers.mjs";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";

const BASE_SLUGS = new Set([
  "thiet-ke-website-doanh-nghiep",
  "thiet-ke-website-chuan-seo",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-theo-yeu-cau",
  "bao-gia-thiet-ke-website",
  "thiet-ke-website-cong-ty",
  "thiet-ke-website-wordpress",
  "thiet-ke-website-responsive",
  "thiet-ke-website-thuong-mai-dien-tu",
  "thiet-ke-website-tron-goi",
  ...INDUSTRY_ENTRIES.map((e) => e.slug),
]);

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

function checklist(items) {
  const lis = items.map((item) => `<li>${item}</li>`).join("\n");
  return `<ul class="list-disc space-y-2 pl-5">${lis}</ul>`;
}

function buildKeywordContent(entry, imgOffset, topic) {
  const kw = entry.keywordsMain;
  const alt = altFromKeyword(kw);
  return `
${toc([
  { id: "tong-quan", label: "Tổng quan" },
  { id: "tai-sao", label: "Vì sao quan trọng" },
  { id: "tieu-chi", label: "Tiêu chí và checklist" },
  { id: "loi-ich", label: "Lợi ích thực tế" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p>Khi tìm hiểu về <strong>${kw}</strong>, doanh nghiệp cần hiểu rõ không chỉ là “làm web đẹp” mà là xây dựng nền tảng số phục vụ mục tiêu kinh doanh cụ thể. Bài viết này tập trung vào ${entry.angle} — giúp bạn đánh giá và triển khai đúng hướng.</p>
<p>Trong bối cảnh cạnh tranh online ngày càng gay gắt, <strong>${kw}</strong> trở thành yếu tố then chốt giúp doanh nghiệp Việt tạo lợi thế: thu hút đúng khách, chuyển đổi hiệu quả và đo lường ROI rõ ràng thay vì đầu tư mù quáng.</p>
${img(imgOffset, alt, topic)}
<h2 id="tong-quan">${entry.h1.split("?")[0] || entry.h1} — Tổng quan</h2>
<p><strong>${kw}</strong> là hướng tiếp cận website xoay quanh ${entry.angle}. Khác với website chỉ để “có mặt trên mạng”, giải pháp này đặt mục tiêu đo lường được ngay từ giai đoạn khảo sát: traffic, lead, doanh số hoặc nhận diện thương hiệu.</p>
<p>Doanh nghiệp nên xác định KPI trước khi brief thiết kế — từ đó chọn layout, tính năng và nội dung phù hợp thay vì copy template không liên quan ngành hay mục tiêu.</p>
<h2 id="tai-sao">Vì sao ${kw} quan trọng?</h2>
<p>Khách hàng ngày nay tra cứu thông tin trên Google trước khi liên hệ. Website không đáp ứng ${entry.angle} sẽ khiến tỷ lệ rời trang cao, chi phí quảng cáo tăng vì landing kém chất lượng, và mất cơ hội so với đối thủ đầu tư bài bản hơn.</p>
<p>Ngược lại, khi triển khai <strong>${kw}</strong> đúng chuẩn, bạn tạo hành trình mạch lạc từ lần click đầu tiên đến hành động cuối — gọi điện, để form, chat Zalo hoặc thanh toán online.</p>
${img(imgOffset + 1, alt, topic)}
<h2 id="tieu-chi">Tiêu chí và checklist triển khai</h2>
<p>Dưới đây là các tiêu chí cốt lõi khi triển khai <strong>${kw}</strong>. Bạn có thể dùng như checklist nội bộ hoặc tiêu chí đánh giá đối tác thiết kế:</p>
${checklist(entry.checklist)}
<p>Mỗi tiêu chí nên có người chịu trách nhiệm và deadline rõ ràng trong timeline dự án — tránh “launch xong rồi mới phát hiện thiếu sót”.</p>
<h2 id="loi-ich">Lợi ích thực tế cho doanh nghiệp</h2>
<p>Đầu tư <strong>${kw}</strong> mang lại giá trị dài hạn: giảm phụ thuộc một kênh duy nhất (Fanpage, sàn TMĐT), sở hữu dữ liệu khách hàng, tích hợp marketing automation và scale chiến dịch ads hiệu quả hơn.</p>
<p>Đặc biệt, website được thiết kế đúng trọng tâm (${entry.angle}) giúp đội sales và marketing phối hợp nhịp nhàng — marketing mang lead chất lượng, sales chốt nhanh hơn nhờ thông tin và UX rõ ràng.</p>
${img(imgOffset + 2, alt, topic)}
<p>Nếu bạn đang cần tư vấn triển khai <strong>${kw}</strong>, hãy chọn đối tác có kinh nghiệm thực chiến, minh bạch quy trình và cam kết bảo hành kỹ thuật sau bàn giao.</p>
${internalLinks()}
${externalLinks()}
${faq(entry.faq)}
`;
}

function buildKeywordArticle(entry, index) {
  const topic = detectNewsTopic({
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    title: entry.h1,
  });
  const imgOffset = index % newsContentImageCountForTopic(topic);
  const metaDescription = `${entry.h1.replace(/\?$/, "")} — Hướng dẫn ${entry.keywordsMain}: tiêu chí, checklist và FAQ. Tư vấn miễn phí tại Bứt Phá Marketing.`;
  const description = `Tìm hiểu ${entry.keywordsMain}: ${entry.angle}. Checklist triển khai và câu hỏi thường gặp.`;

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle: entry.h1.replace(/\?$/, ""),
    metaDescription,
    description,
    imageUrl: newsThumbnailForArticle({
      slug: entry.slug,
      keywordsMain: entry.keywordsMain,
      keywordsSecondary: entry.keywordsSecondary,
      title: entry.h1,
    }),
    content: wrapArticle({
      metaTitle: entry.h1.replace(/\?$/, ""),
      html: buildKeywordContent(entry, imgOffset, topic),
    }),
  };
}

function assertKeywordArticle(article) {
  const alt = altFromKeyword(article.keywordsMain);
  const check = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    imageAlts: [alt, alt, alt],
  });
  if (!check.ok) {
    console.warn(`[SEO] ${article.slug}: thiếu từ khóa "${article.keywordsMain}" ở ${check.missing.join(", ")}`);
  }
}

const filtered = KEYWORD_ENTRIES.filter((e) => !BASE_SLUGS.has(e.slug));

export const KEYWORD_ARTICLES = filtered.map((entry, index) => {
  const article = buildKeywordArticle(entry, index);
  assertKeywordArticle(article);
  return article;
});

export const SKIPPED_KEYWORD_SLUGS = KEYWORD_ENTRIES.filter((e) => BASE_SLUGS.has(e.slug)).map(
  (e) => e.slug,
);
