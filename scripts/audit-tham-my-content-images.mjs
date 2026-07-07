import { THAM_MY_ARTICLE_THUMBNAILS, validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { REWRITE_THIET_KE_WEBSITE_SPA } from "./seo-rewrite-thiet-ke-website-spa.mjs";
import { REWRITE_THIET_KE_WEBSITE_THAM_MY_VIEN } from "./seo-rewrite-thiet-ke-website-tham-my-vien.mjs";

const ARTICLES = [REWRITE_THIET_KE_WEBSITE_SPA, REWRITE_THIET_KE_WEBSITE_THAM_MY_VIEN];
const EXPECTED_IMAGES = 5;
let failed = false;

for (const article of ARTICLES) {
  const images = [...article.content.matchAll(/src="(\/tin-tuc\/tham-my\/[^"]+)"/g)].map((m) => m[1]);
  const otherTinTuc = [...article.content.matchAll(/src="(\/tin-tuc\/(?!tham-my)[^"]+)"/g)].map((m) => m[1]);
  const imgOk = images.length === EXPECTED_IMAGES && otherTinTuc.length === 0;

  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });

  const lenOk = article.content.length >= 12000;
  const thumb = THAM_MY_ARTICLE_THUMBNAILS[article.slug];

  console.log(
    `${imgOk && seo.ok && lenOk ? "OK" : "FAIL"} ${article.slug}:`,
    `images ${images.length}/${EXPECTED_IMAGES},`,
    `seo ${seo.ok ? "OK" : seo.missing.join(",")},`,
    `length ${article.content.length}${lenOk ? "" : " (<12k)"},`,
    `kw "${article.keywordsMain}"`,
  );

  if (!imgOk || !seo.ok || !lenOk || !thumb) failed = true;
}

if (failed) process.exit(1);
console.log("All tham-my articles pass SEO + 5 images check.");
