import {
  wrapArticle,
  img,
  toc,
  internalLinks,
  externalLinks,
  NEWS_CONTENT_IMAGE_COUNT,
  altFromKeyword,
  validateSeoKeywordPlacement,
  newsThumbnailForArticle,
  newsContentImageCountForTopic,
  buildSeoMetaTitle,
  buildSeoMetaDescription,
} from "./seo-article-helpers.mjs";
import { LOCAL_SEO_ENTRIES } from "./seo-local-data.mjs";

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

function buildLocalContent(entry, imgOffset) {
  const topic = "google-maps";
  const kw = entry.keywordsMain;
  const alt = altFromKeyword(kw);
  const kwTitle = altFromKeyword(kw);

  return `
${toc([
  { id: "tong-quan", label: `${kwTitle} — Tổng quan` },
  { id: "vai-tro", label: "Vai trò với Google Maps" },
  { id: "yeu-to", label: "Yếu tố ranking quan trọng" },
  { id: "trien-khai", label: "Hướng dẫn triển khai" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p>Doanh nghiệp có cửa hàng, văn phòng hoặc phục vụ theo khu vực không thể bỏ qua <strong>${kw}</strong>. Khách tìm "gần tôi", mở Google Maps và gọi điện ngay — nếu bạn không xuất hiện, đối thủ sẽ nhận lead thay bạn.</p>
<p>Bài viết giải thích <strong>${kw}</strong> từ cơ bản đến thực hành: định nghĩa, yếu tố xếp hạng Maps, checklist triển khai và FAQ — phù hợp chủ shop, marketing và agency local SEO.</p>
${img(imgOffset, alt, topic)}
<h2 id="tong-quan">${kwTitle} — Tổng quan và định nghĩa</h2>
<p><strong>${kw}</strong> là: ${entry.definition}</p>
<p>Chủ đề liên quan: ${entry.keywordsSecondary}. Hiểu đúng <strong>${kw}</strong> giúp phối hợp Google Business Profile, website local và review — thay vì chỉ "có mặt trên Maps" mà không ra khách.</p>
<h2 id="vai-tro">Vai trò của ${kw} trong marketing địa phương</h2>
<p>${entry.role}</p>
<p><strong>${kw}</strong> bổ sung cho SEO website: Maps/Local Pack bắt intent "gần tôi" và gọi ngay; website nuôi trust và chuyển đổi sâu. Làm cả hai mới tối ưu lead địa phương.</p>
${img(imgOffset + 1, alt, topic)}
<h2 id="yeu-to">Các yếu tố cốt lõi của ${kw}</h2>
<p>Google đánh giá hồ sơ và website local dựa trên:</p>
${bulletList(entry.components)}
<p>Thiếu một yếu tố — NAP sai, ít review, không có ảnh — có thể khiến bạn tụt hạng dù website đã SEO tốt.</p>
<h2 id="trien-khai">Cách triển khai ${kw} từng bước</h2>
<p>Lộ trình thực chiến cho <strong>${kw}</strong>:</p>
${numberedList(entry.applySteps)}
<p>Sau 4–8 tuần triển khai đều đặn, theo dõi impression/call trên GBP Insights và điều chỉnh — đó là vòng lặp cải thiện <strong>${kw}</strong> bền vững.</p>
${img(imgOffset + 2, alt, topic)}
<p>Bứt Phá Marketing hỗ trợ <strong>${kw}</strong> kết hợp thiết kế website chuẩn SEO local, tối ưu Google Business Profile và nội dung theo khu vực. Liên hệ tư vấn miễn phí.</p>
${internalLinks()}
${externalLinks()}
${faq(entry.faq)}
`;
}

function buildLocalArticle(entry, index) {
  const imgOffset = (index + 11) % newsContentImageCountForTopic("google-maps");
  const metaTitle = buildSeoMetaTitle(entry.keywordsMain);
  const metaDescription = buildSeoMetaDescription(entry.keywordsMain, entry.definition);
  const description = `${entry.keywordsMain} — ${entry.role.slice(0, 100)}… ${entry.keywordsSecondary}.`;

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle,
    metaDescription,
    description,
    imageUrl: newsThumbnailForArticle({
      slug: entry.slug,
      keywordsMain: entry.keywordsMain,
      keywordsSecondary: entry.keywordsSecondary,
      title: entry.h1,
    }),
    content: wrapArticle({
      metaTitle,
      html: buildLocalContent(entry, imgOffset),
    }),
  };
}

function assertLocalArticle(article) {
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
    console.warn(`[SEO local] ${article.slug}: thiếu từ khóa "${article.keywordsMain}" ở ${check.missing.join(", ")}`);
  }
}

export const LOCAL_SEO_ARTICLES = LOCAL_SEO_ENTRIES.map((entry, index) => {
  const article = buildLocalArticle(entry, index);
  assertLocalArticle(article);
  return article;
});
