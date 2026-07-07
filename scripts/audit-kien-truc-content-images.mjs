import { KIEN_TRUC_ARTICLE_THUMBNAILS } from "./seo-article-helpers.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG } from "./seo-rewrite-thiet-ke-website-cong-ty-xay-dung.mjs";
import { REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT } from "./seo-rewrite-thiet-ke-website-kien-truc-noi-that.mjs";
import { REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU } from "./seo-rewrite-thiet-ke-website-xay-dung-nha-thau.mjs";
import { REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC } from "./seo-rewrite-thiet-ke-website-ho-so-nang-luc.mjs";
import { REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM } from "./seo-rewrite-thiet-ke-website-noi-that-showroom.mjs";
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";

const REWRITES = [
  REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG,
  REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT,
  REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU,
  REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC,
  REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM,
];

const KIEN_TRUC_SLUGS = new Set(Object.keys(KIEN_TRUC_ARTICLE_THUMBNAILS));
const EXPECTED = 5;
let failed = false;

function auditArticle(article) {
  const content = article.content || "";
  const kienTrucImages = [...content.matchAll(/src="(\/tin-tuc\/kien-truc\/[^"]+)"/g)].map((m) => m[1]);
  const otherTinTuc = [...content.matchAll(/src="(\/tin-tuc\/(?!kien-truc)[^"]+)"/g)].map((m) => m[1]);
  const ok = kienTrucImages.length === EXPECTED && otherTinTuc.length === 0;

  console.log(
    `${ok ? "OK" : "FAIL"} ${article.slug}: ${kienTrucImages.length}/${EXPECTED} kien-truc images` +
      (otherTinTuc.length ? ` (other tin-tuc: ${otherTinTuc.length})` : ""),
  );

  if (!ok) {
    failed = true;
    if (kienTrucImages.length) console.log("  ", kienTrucImages.join(", "));
    if (otherTinTuc.length) console.log("  other:", otherTinTuc.join(", "));
  }
}

for (const article of REWRITES) auditArticle(article);

for (const article of INDUSTRY_ARTICLES) {
  if (KIEN_TRUC_SLUGS.has(article.slug)) auditArticle(article);
}

if (failed) process.exit(1);
console.log("All kien-truc articles have exactly 5 content images.");
