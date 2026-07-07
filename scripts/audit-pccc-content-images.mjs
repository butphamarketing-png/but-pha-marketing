import { PCCC_ARTICLE_THUMBNAILS, validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { REWRITE_THIET_KE_WEBSITE_PCCC } from "./seo-rewrite-thiet-ke-website-pccc.mjs";
import { REWRITE_THIET_KE_WEBSITE_THIET_BI_PCCC } from "./seo-rewrite-thiet-ke-website-thiet-bi-pccc.mjs";

const ARTICLES = [REWRITE_THIET_KE_WEBSITE_PCCC, REWRITE_THIET_KE_WEBSITE_THIET_BI_PCCC];
const EXPECTED_IMAGES = 5;
let failed = false;

for (const article of ARTICLES) {
  const pcccImages = [...article.content.matchAll(/src="(\/tin-tuc\/pccc\/[^"]+)"/g)].map((m) => m[1]);
  const otherTinTuc = [...article.content.matchAll(/src="(\/tin-tuc\/(?!pccc)[^"]+)"/g)].map((m) => m[1]);
  const imgOk = pcccImages.length === EXPECTED_IMAGES && otherTinTuc.length === 0;

  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });

  const lenOk = article.content.length >= 12000;
  const thumb = PCCC_ARTICLE_THUMBNAILS[article.slug];

  console.log(
    `${imgOk && seo.ok && lenOk ? "OK" : "FAIL"} ${article.slug}:`,
    `images ${pcccImages.length}/${EXPECTED_IMAGES},`,
    `seo ${seo.ok ? "OK" : seo.missing.join(",")},`,
    `length ${article.content.length}${lenOk ? "" : " (<12k)"},`,
    `kw "${article.keywordsMain}"`,
  );

  if (!imgOk || !seo.ok || !lenOk || !thumb) failed = true;
}

if (failed) process.exit(1);
console.log("All PCCC articles pass SEO + 5 images check.");
