/**
 * Rewrite + seed all 70 Meta batch21 marketing stubs with intent-aware content.
 * Usage: node scripts/seed-rewrite-meta-b21-intent.mjs
 *        node scripts/seed-rewrite-meta-b21-intent.mjs --dry-run
 *        node scripts/seed-rewrite-meta-b21-intent.mjs --slug=facebook-ads-la-gi-b21
 */
import { META_B21_INTENT_ENTRIES } from "./seo-meta-b21-intent-data.mjs";
import { buildMetaB21IntentArticle } from "./seo-meta-b21-intent-builder.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const onlySlug = args.slug || null;
const limit = args.limit ? Number(args.limit) : Infinity;

const list = META_B21_INTENT_ENTRIES.filter((e) => !onlySlug || e.slug === onlySlug).slice(0, limit);

let ok = 0;
let fail = 0;

for (let i = 0; i < list.length; i++) {
  const entry = list[i];
  try {
    const article = buildMetaB21IntentArticle(entry, i);
    const descOk = (article.metaDescription || "").toLowerCase().includes(entry.keywordsMain.toLowerCase().slice(0, 12));
    if (dryRun) {
      console.log(
        `[dry] ${entry.intent.padEnd(8)} ${entry.slug} | chars=${article.content.length} | descOk=${descOk} | ${article.metaDescription.slice(0, 80)}…`,
      );
      ok++;
      continue;
    }
    await seedRewriteArticle(article, { log: true, revalidate: i === list.length - 1 || i % 10 === 9 });
    ok++;
  } catch (err) {
    fail++;
    console.error(`FAIL ${entry.slug}:`, err.message || err);
  }
}

console.log(`Done. ok=${ok} fail=${fail} total=${list.length}`);
if (fail) process.exit(1);
