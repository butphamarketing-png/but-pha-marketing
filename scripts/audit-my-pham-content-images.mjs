import { MY_PHAM_ARTICLE_THUMBNAILS, validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP } from "./seo-rewrite-thiet-ke-website-my-pham-lam-dep.mjs";
import { REWRITE_THIET_KE_WEBSITE_MY_PHAM } from "./seo-rewrite-thiet-ke-website-my-pham.mjs";

const ARTICLES = [REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP, REWRITE_THIET_KE_WEBSITE_MY_PHAM];
const EXPECTED_IMAGES = 5;
let failed = false;

for (const article of ARTICLES) {
  const myPhamImages = [...article.content.matchAll(/src="(\/tin-tuc\/my-pham\/[^"]+)"/g)].map((m) => m[1]);
  const otherTinTuc = [...article.content.matchAll(/src="(\/tin-tuc\/(?!my-pham)[^"]+)"/g)].map((m) => m[1]);
  const imgOk = myPhamImages.length === EXPECTED_IMAGES && otherTinTuc.length === 0;

  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });

  const lenOk = article.content.length >= 12000;
  const thumb = MY_PHAM_ARTICLE_THUMBNAILS[article.slug];

  console.log(
    `${imgOk && seo.ok && lenOk ? "OK" : "FAIL"} ${article.slug}:`,
    `images ${myPhamImages.length}/${EXPECTED_IMAGES},`,
    `seo ${seo.ok ? "OK" : seo.missing.join(",")},`,
    `length ${article.content.length}${lenOk ? "" : " (<12k)"},`,
    `kw "${article.keywordsMain}"`,
  );

  if (!imgOk || !seo.ok || !lenOk || !thumb) failed = true;
}

if (failed) process.exit(1);
console.log("All my-pham articles pass SEO + 5 images check.");
