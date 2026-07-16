import { REWRITE_META_ADS_LA_GI_B21 } from "./seo-rewrite-meta-ads-la-gi-b21.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const article = REWRITE_META_ADS_LA_GI_B21;

try {
  await seedRewriteArticle(article);
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
