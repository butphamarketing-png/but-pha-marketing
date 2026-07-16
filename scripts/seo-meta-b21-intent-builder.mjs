/**
 * Intent-aware builders for Meta Ads batch21 marketing stubs.
 * lagi = định nghĩa | compare = A hay B | problem = lỗi / tối ưu
 */
import { NEWS_THUMBNAIL, ensureTitleHasKeyword, keywordInText } from "./seo-article-helpers.mjs";
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
import { META_B21_INTENT_BY_SLUG } from "./seo-meta-b21-intent-data.mjs";

const SERVICE_HREF = `${SITE}/facebook/quang-cao-fanpage`;

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ul(items) {
  return `<ul class="list-disc space-y-2 pl-5">${items.map((i) => `<li>${i}</li>`).join("\n")}</ul>`;
}

function ol(items) {
  return `<ol class="list-decimal space-y-2 pl-5">${items.map((i) => `<li>${i}</li>`).join("\n")}</ol>`;
}

function relatedCluster(entry) {
  const links = [
    {
      href: `${SITE}/blog/meta-ads-la-gi-b21`,
      label: "Meta Ads là gì?",
      desc: "Định nghĩa hệ thống quảng cáo Meta.",
    },
    {
      href: `${SITE}/blog/facebook-ads-la-gi-b21`,
      label: "Facebook Ads là gì?",
      desc: "Quảng cáo Facebook trong hệ Meta.",
    },
    {
      href: `${SITE}/blog/meta-pixel-la-gi-b21`,
      label: "Meta Pixel là gì?",
      desc: "Theo dõi chuyển đổi website.",
    },
    {
      href: SERVICE_HREF,
      label: "Dịch vụ quảng cáo Facebook",
      desc: "Triển khai Meta Ads theo KPI.",
    },
  ].filter((l) => !l.href.endsWith(`/${entry.slug}`));
  return wpRelatedLinks(links.slice(0, 4));
}

function buildLaGiHtml(entry, imgIdx) {
  const kw = entry.keywordsMain;
  const h1 = entry.h1;
  return `
${wpToc([
  { id: "dinh-nghia", label: `${entry.term} là gì?` },
  { id: "thanh-phan", label: "Thành phần / cách hoạt động" },
  { id: "vi-sao", label: "Vì sao cần hiểu rõ" },
  { id: "cach-lam", label: "Cách bắt đầu thực tế" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    entry.definition,
    `Bài viết trả lời đúng tiêu đề <em>${esc(h1)}</em>: định nghĩa rõ ràng, cách ${esc(entry.term)} hoạt động trong Meta Ads, checklist áp dụng và FAQ — không lan man sang SEO hay kênh khác không liên quan.`,
  ],
})}

${wpKeyTakeaways(entry.takeaways)}

${wpImg(imgIdx, `${kw} — định nghĩa ${entry.term}`)}

<h2 id="dinh-nghia">${esc(entry.term)} là gì?</h2>
<p>${entry.definition}</p>
<p>Khi search <strong>${esc(kw)}</strong>, bạn đang cần một định nghĩa vận hành được — không phải checklist marketing chung. Phần dưới đi vào thành phần và cách dùng ${esc(entry.term)} trong Ads Manager / hệ Meta.</p>

<h2 id="thanh-phan">Thành phần và cách ${esc(entry.term)} hoạt động</h2>
${ul(entry.components)}

${wpImg(imgIdx + 1, `${kw} — thành phần ${entry.term}`)}

<h2 id="vi-sao">Vì sao doanh nghiệp cần hiểu ${esc(kw)}?</h2>
${ul(entry.whyMatters)}

<h2 id="cach-lam">Cách bắt đầu với ${esc(entry.term)}</h2>
${ol(entry.steps)}

${wpImg(imgIdx + 2, `${kw} — checklist triển khai`)}

<h2 id="sai-lam">Sai lầm thường gặp về ${esc(entry.term)}</h2>
${ul(entry.mistakes)}

${relatedCluster(entry)}

${wpFaq({ keyword: kw, items: entry.faq })}

${wpConclusion({
  keyword: kw,
  paragraphs: [
    `Tóm lại, <strong>${esc(kw)}</strong>: ${entry.definition}`,
    `Nắm đúng khái niệm rồi mới tối ưu ngân sách Meta Ads. Liên hệ Bứt Phá Marketing nếu cần triển khai có đo CPA/ROAS.`,
  ],
  ctaLabel: "→ Xem dịch vụ quảng cáo Facebook / Meta Ads",
  ctaHref: SERVICE_HREF,
})}

${wpExternalCta()}
`;
}

function buildCompareHtml(entry, imgIdx) {
  const kw = entry.keywordsMain;
  const a = entry.optionA;
  const b = entry.optionB;
  return `
${wpToc([
  { id: "tra-loi-ngan", label: "Trả lời ngắn" },
  { id: "so-sanh", label: "So sánh chi tiết" },
  { id: "chon-a", label: `Khi nào chọn ${a.name}` },
  { id: "chon-b", label: `Khi nào chọn ${b.name}` },
  { id: "ket-luan-chon", label: "Nên chọn gì?" },
  { id: "sai-lam", label: "Sai lầm thường gặp" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    entry.definition,
    `Bài viết bám đúng câu hỏi <em>${esc(entry.h1)}</em>: so sánh ${esc(a.name)} và ${esc(b.name)}, ưu/nhược điểm, khi nào chọn bên nào — dành cho marketer và chủ SME đang chạy Meta Ads.`,
  ],
})}

${wpKeyTakeaways(entry.takeaways)}

${wpImg(imgIdx, `${kw} — so sánh nhanh`)}

<h2 id="tra-loi-ngan">${esc(kw)} — trả lời ngắn</h2>
<p>${entry.definition}</p>
<p>${entry.verdict || ""}</p>

<h2 id="so-sanh">Bảng so sánh ${esc(a.name)} và ${esc(b.name)}</h2>
<table class="w-full border-collapse text-sm my-6">
  <thead><tr class="bg-indigo-50">
    <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">${esc(a.name)}</th>
    <th class="border border-indigo-100 px-3 py-2 text-left">${esc(b.name)}</th>
  </tr></thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ưu điểm</strong></td>
      <td class="border border-indigo-100 px-3 py-2">${a.pros.join("; ")}</td>
      <td class="border border-indigo-100 px-3 py-2">${b.pros.join("; ")}</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nhược điểm</strong></td>
      <td class="border border-indigo-100 px-3 py-2">${a.cons.join("; ")}</td>
      <td class="border border-indigo-100 px-3 py-2">${b.cons.join("; ")}</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phù hợp khi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">${a.when}</td>
      <td class="border border-indigo-100 px-3 py-2">${b.when}</td>
    </tr>
  </tbody>
</table>

${wpImg(imgIdx + 1, `${kw} — bảng so sánh`)}

<h2 id="chon-a">Khi nào nên chọn ${esc(a.name)}?</h2>
<p>${a.when}</p>
${ul(a.pros.map((p) => `<strong>Ưu:</strong> ${p}`))}

<h2 id="chon-b">Khi nào nên chọn ${esc(b.name)}?</h2>
<p>${b.when}</p>
${ul(b.pros.map((p) => `<strong>Ưu:</strong> ${p}`))}

<h2 id="ket-luan-chon">Vậy ${esc(kw)} — nên chọn gì?</h2>
<p>${entry.verdict || entry.definition}</p>
${ul(entry.whyMatters)}

<h2 id="cach-lam">Cách quyết định và triển khai</h2>
${ol(entry.steps)}

${wpImg(imgIdx + 2, `${kw} — quy trình chọn`)}

<h2 id="sai-lam">Sai lầm khi chọn giữa ${esc(a.name)} và ${esc(b.name)}</h2>
${ul(entry.mistakes)}

${relatedCluster(entry)}

${wpFaq({ keyword: kw, items: entry.faq })}

${wpConclusion({
  keyword: kw,
  paragraphs: [
    `Với câu hỏi <strong>${esc(kw)}</strong>: ${entry.verdict || entry.definition}`,
    `Cần hỗ trợ setup chiến dịch Meta đúng lựa chọn, liên hệ Bứt Phá Marketing.`,
  ],
  ctaLabel: "→ Tư vấn Meta Ads miễn phí",
  ctaHref: SERVICE_HREF,
})}

${wpExternalCta()}
`;
}

function buildProblemHtml(entry, imgIdx) {
  const kw = entry.keywordsMain;
  return `
${wpToc([
  { id: "van-de", label: "Vấn đề là gì?" },
  { id: "trieu-chung", label: "Triệu chứng nhận biết" },
  { id: "nguyen-nhan", label: "Nguyên nhân thường gặp" },
  { id: "cach-sua", label: "Cách xử lý từng bước" },
  { id: "phong-ngua", label: "Phòng ngừa" },
  { id: "sai-lam", label: "Sai lầm khi xử lý" },
  { id: "faq", label: "FAQ" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: kw,
  paragraphs: [
    entry.definition,
    `Bài viết đúng với tiêu đề <em>${esc(entry.h1)}</em>: nhận diện triệu chứng, nguyên nhân và checklist sửa — tập trung Meta Ads, không lan man sang chiến lược digital chung.`,
  ],
})}

${wpKeyTakeaways(entry.takeaways)}

${wpImg(imgIdx, `${kw} — nhận diện vấn đề`)}

<h2 id="van-de">${esc(kw)} — vấn đề là gì?</h2>
<p>${entry.definition}</p>
${ul(entry.whyMatters)}

<h2 id="trieu-chung">Triệu chứng nhận biết</h2>
${ul(entry.symptoms || entry.components)}

${wpImg(imgIdx + 1, `${kw} — triệu chứng`)}

<h2 id="nguyen-nhan">Nguyên nhân thường gặp</h2>
${ul(entry.causes || entry.components)}

<h2 id="cach-sua">Cách xử lý ${esc(kw)} từng bước</h2>
${ol(entry.steps)}

${wpImg(imgIdx + 2, `${kw} — checklist sửa`)}

<h2 id="phong-ngua">Phòng ngừa tái diễn</h2>
${ul(entry.whyMatters)}

<h2 id="sai-lam">Sai lầm khi xử lý ${esc(kw)}</h2>
${ul(entry.mistakes)}

${relatedCluster(entry)}

${wpFaq({ keyword: kw, items: entry.faq })}

${wpConclusion({
  keyword: kw,
  paragraphs: [
    `Khi gặp <strong>${esc(kw)}</strong>: ${entry.definition}`,
    `Cần audit tài khoản Meta Ads và sửa tracking/creative/landing, liên hệ Bứt Phá Marketing.`,
  ],
  ctaLabel: "→ Nhận hỗ trợ tối ưu Meta Ads",
  ctaHref: SERVICE_HREF,
})}

${wpExternalCta()}
`;
}

export function buildMetaB21IntentArticle(entry, index = 0) {
  if (!entry?.slug || !entry?.keywordsMain || !entry?.intent) {
    throw new Error("Invalid META_B21 intent entry");
  }
  const imgIdx = (index * 3) % 8;
  const html =
    entry.intent === "lagi"
      ? buildLaGiHtml(entry, imgIdx)
      : entry.intent === "compare"
        ? buildCompareHtml(entry, imgIdx)
        : buildProblemHtml(entry, imgIdx);

  const title = ensureTitleHasKeyword(entry.h1, entry.keywordsMain);
  let metaTitle = ensureTitleHasKeyword(
    entry.h1.replace(/\?.*$/, "").trim() || entry.keywordsMain,
    entry.keywordsMain,
  );
  if (metaTitle.length > 65) metaTitle = metaTitle.slice(0, 62).replace(/\s+\S*$/, "").trim();

  let metaDescription = String(entry.metaDescription || "").trim();
  if (!keywordInText(metaDescription, entry.keywordsMain)) {
    metaDescription = `${entry.keywordsMain} — ${metaDescription}`.slice(0, 155);
  }
  metaDescription = metaDescription.slice(0, 160);

  return {
    title,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle,
    metaDescription,
    description: metaDescription,
    imageUrl: NEWS_THUMBNAIL,
    content: buildWpSeoArticle({
      metaTitle,
      keyword: entry.keywordsMain,
      html,
    }),
  };
}

export function buildMetaB21IntentArticleBySlug(slug, index = 0) {
  const entry = META_B21_INTENT_BY_SLUG[slug];
  if (!entry) return null;
  return buildMetaB21IntentArticle(entry, index);
}

export function hasMetaB21Intent(slug) {
  return Boolean(META_B21_INTENT_BY_SLUG[slug]);
}
