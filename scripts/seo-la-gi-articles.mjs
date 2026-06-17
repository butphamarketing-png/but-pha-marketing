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
} from "./seo-article-helpers.mjs";
import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";

const SKIP_SLUGS = new Set(["thiet-ke-website-la-gi"]);

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

function bulletList(items) {
  const lis = items.map((item) => `<li>${item}</li>`).join("\n");
  return `<ul class="list-disc space-y-2 pl-5">${lis}</ul>`;
}

function numberedList(items) {
  const lis = items.map((item) => `<li>${item}</li>`).join("\n");
  return `<ol class="list-decimal space-y-2 pl-5">${lis}</ol>`;
}

function buildLaGiContent(entry, imgOffset) {
  const kw = entry.keywordsMain;
  const alt = altFromKeyword(kw);
  const kwTitle = altFromKeyword(kw);

  return `
${toc([
  { id: "dinh-nghia", label: `${kwTitle} — Định nghĩa` },
  { id: "vai-tro", label: "Vai trò trong kinh doanh" },
  { id: "thanh-phan", label: "Thành phần cốt lõi" },
  { id: "ung-dung", label: "Cách áp dụng thực tế" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p>Nhiều chủ doanh nghiệp và marketer thường hỏi <strong>${kw}</strong> trước khi đầu tư digital. Bài viết này giải thích khái niệm, vai trò và cách áp dụng — phù hợp người mới bắt đầu lẫn team muốn củng cố nền tảng.</p>
<p>Hiểu rõ <strong>${kw}</strong> giúp bạn ra quyết định đúng: tránh đầu tư mù quáng, chọn công cụ phù hợp và phối hợp website, SEO, quảng cáo hiệu quả hơn.</p>
${img(imgOffset, alt)}
<h2 id="dinh-nghia">${kwTitle} — Định nghĩa và khái niệm cơ bản</h2>
<p><strong>${kw}</strong> được hiểu là: ${entry.definition}</p>
<p>Khái niệm này liên quan trực tiếp đến các chủ đề: ${entry.keywordsSecondary}. Khi tìm hiểu sâu hơn, bạn sẽ thấy <strong>${kw}</strong> không chỉ là thuật ngữ mà là nền tảng cho chiến lược marketing online bền vững.</p>
<h2 id="vai-tro">Vai trò của ${kw} trong kinh doanh hiện đại</h2>
<p>${entry.role}</p>
<p>Trong hệ sinh thái digital, <strong>${kw}</strong> thường đi kèm website chuẩn SEO, đo lường bằng Analytics và tối ưu liên tục theo dữ liệu thực tế — không phải triển khai một lần rồi bỏ quên.</p>
${img(imgOffset + 1, alt)}
<h2 id="thanh-phan">Các thành phần cốt lõi cần nắm</h2>
<p>Để nắm vững <strong>${kw}</strong>, bạn nên hiểu các yếu tố sau:</p>
${bulletList(entry.components)}
<p>Mỗi thành phần đều có thể ảnh hưởng đến kết quả cuối — chi phí marketing, thứ hạng Google và tỷ lệ chuyển đổi khách hàng.</p>
<h2 id="ung-dung">Cách áp dụng ${kw} cho doanh nghiệp</h2>
<p>Dưới đây là lộ trình thực hành khi bắt đầu với <strong>${kw}</strong>:</p>
${numberedList(entry.applySteps)}
<p>Áp dụng từng bước, đo kết quả và điều chỉnh — đó là cách biến lý thuyết <strong>${kw}</strong> thành lợi thế cạnh tranh thực tế.</p>
${img(imgOffset + 2, alt)}
<p>Nếu bạn cần hỗ trợ triển khai sau khi đã hiểu <strong>${kw}</strong>, đội ngũ Bứt Phá Marketing tư vấn miễn phí giải pháp website, SEO và quảng cáo phù hợp mô hình kinh doanh.</p>
${internalLinks()}
${externalLinks()}
${faq(entry.faq)}
`;
}

function buildLaGiArticle(entry, index) {
  const imgOffset = (index + 5) % NEWS_CONTENT_IMAGE_COUNT;
  const metaDescription = `${entry.keywordsMain.charAt(0).toUpperCase() + entry.keywordsMain.slice(1)}? ${entry.definition.slice(0, 120)}… Tìm hiểu chi tiết tại Bứt Phá Marketing.`;
  const description = `Giải thích ${entry.keywordsMain}: định nghĩa, vai trò, thành phần và cách áp dụng. ${entry.keywordsSecondary}.`;

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle: `${entry.h1.replace(/\?.*$/, "").trim()} | Bứt Phá Marketing`,
    metaDescription,
    description,
    imageUrl: NEWS_THUMBNAIL,
    content: wrapArticle({
      metaTitle: `${entry.h1.replace(/\?.*$/, "").trim()} | Bứt Phá Marketing`,
      html: buildLaGiContent(entry, imgOffset),
    }),
  };
}

function assertLaGiArticle(article) {
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
    console.warn(`[SEO la-gi] ${article.slug}: thiếu từ khóa "${article.keywordsMain}" ở ${check.missing.join(", ")}`);
  }
}

export const LA_GI_ARTICLES = LA_GI_ENTRIES.filter((entry) => !SKIP_SLUGS.has(entry.slug)).map((entry, index) => {
  const article = buildLaGiArticle(entry, index);
  assertLaGiArticle(article);
  return article;
});
