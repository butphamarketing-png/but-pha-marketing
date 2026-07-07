import { PHONG_KHAM_ARTICLE_THUMBNAILS, validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { REWRITE_THIET_KE_WEBSITE_PHONG_KHAM_DA_KHOA } from "./seo-rewrite-thiet-ke-website-phong-kham-da-khoa.mjs";

const ARTICLES = [REWRITE_THIET_KE_WEBSITE_PHONG_KHAM_DA_KHOA];
const EXPECTED_IMAGES = 5;
let failed = false;

for (const article of ARTICLES) {
  const images = [...article.content.matchAll(/src="(\/tin-tuc\/phong-kham\/[^"]+)"/g)].map((m) => m[1]);
  const otherTinTuc = [...article.content.matchAll(/src="(\/tin-tuc\/(?!phong-kham)[^"]+)"/g)].map((m) => m[1]);
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
  const thumb = PHONG_KHAM_ARTICLE_THUMBNAILS[article.slug];

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
console.log("All phong-kham articles pass SEO + 5 images check.");
