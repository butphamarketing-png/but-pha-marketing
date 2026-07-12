/**
 * P4 — Batch inject proof band + silo ngành cho blog hot.
 * Chạy: npm run seed:blog-p4-proof-silo -- --dry-run --limit=50
 *       npm run seed:blog-p4-proof-silo -- --limit=500
 *       npm run seed:blog-p4-proof-silo -- --all-hot
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { injectSiloLinks } from "./seo-silo-inject.mjs";
import { resolveIndustrySilo, isWebsiteTopic } from "./seo-industry-silo-resolver.mjs";
import {
  wpProofGscBand,
  wpProofFanpageBand,
  wpProofSpaBand,
  wpProofLogisticsBand,
  wpProofMyPhamBand,
} from "./seo-proof-blocks.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const dryRun = process.argv.includes("--dry-run");
const allHot = process.argv.includes("--all-hot");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : allHot ? 99999 : 500;
const offsetArg = process.argv.find((a) => a.startsWith("--offset="));
const offset = offsetArg ? Number(offsetArg.split("=")[1]) : 0;

const PAGE = 50;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function pickProofBand(proofKey) {
  switch (proofKey) {
    case "spa":
      return wpProofSpaBand;
    case "fanpage":
      return wpProofFanpageBand;
    case "logistics":
      return wpProofLogisticsBand;
    case "mypham":
      return wpProofMyPhamBand;
    default:
      return wpProofGscBand;
  }
}

function hasProof(content) {
  return content.includes("/du-an/") || content.includes("Proof thực chiến") || content.includes("Proof ngành");
}

function injectProof(content, proofKey) {
  if (hasProof(content)) return content;
  const band = pickProofBand(proofKey)();
  const marker = 'class="rounded-2xl border border-emerald-200';
  if (content.includes(marker)) return content;
  const h2 = content.search(/<h2[\s>]/i);
  if (h2 > 0) return `${content.slice(0, h2)}${band}\n${content.slice(h2)}`;
  if (content.includes("</article>")) {
    return content.replace("</article>", `${band}\n</article>`);
  }
  return `${content}\n${band}`;
}

function enhanceContent(row) {
  let content = row.content || "";
  const industry = resolveIndustrySilo({ slug: row.slug, keywordsMain: row.keywords_main });
  const website = isWebsiteTopic({ slug: row.slug, keywordsMain: row.keywords_main });

  if (website) {
    const proofKey = industry?.proof || "gsc";
    content = injectProof(content, proofKey);
  }

  if (website && industry) {
    content = injectSiloLinks(content, industry);
  }

  return { content, changed: content !== row.content, industry: industry?.industryId || null };
}

let processed = 0;
let updated = 0;
let skipped = 0;
let from = offset;

while (processed < limit) {
  const take = Math.min(PAGE, limit - processed);
  const { data, error } = await sb
    .from("news")
    .select("slug,title,keywords_main,keywords_secondary,description,content,hot")
    .eq("category", "blog")
    .eq("published", true)
    .eq("hot", true)
    .order("slug")
    .range(from, from + take - 1);
  if (error) throw error;
  if (!data?.length) break;

  for (const row of data) {
    processed++;
    const { content, changed, industry } = enhanceContent(row);
    if (!changed) {
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`DRY ${row.slug} (+proof/silo${industry ? ` ${industry}` : ""})`);
      updated++;
      continue;
    }

    await seedRewriteArticle(
      {
        slug: row.slug,
        title: row.title,
        keywordsMain: row.keywords_main || row.title,
        keywordsSecondary: row.keywords_secondary || "",
        description: row.description || "",
        metaTitle: row.title,
        metaDescription: row.description || row.title,
        content,
        hot: row.hot,
      },
      { log: false, revalidate: false },
    );
    updated++;
    if (updated % 25 === 0) console.log(`  ... updated ${updated}`);
  }

  if (data.length < take) break;
  from += take;
}

if (!dryRun && updated > 0) {
  await revalidateBlogAfterSeed();
}

console.log("\n=== P4 proof+silo batch ===");
console.log(`Processed: ${processed}`);
console.log(`Updated: ${updated}`);
console.log(`Skipped (already OK): ${skipped}`);
console.log(`Mode: ${dryRun ? "dry-run" : "live"}`);
if (processed >= limit && !allHot) {
  console.log(`\nNext chunk: npm run seed:blog-p4-proof-silo -- --offset=${from} --limit=${limit}`);
}
