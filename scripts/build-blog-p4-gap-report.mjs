/**
 * P4 gap report — audit proof/silo coverage trên blog (hot hoặc all).
 * Chạy: npm run audit:blog-p4-gap
 *       npm run audit:blog-p4-gap -- --all
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { contentHasPillarClusterBlock } from "./pillar-cluster-links.mjs";
import { resolveIndustrySilo, isWebsiteTopic } from "./seo-industry-silo-resolver.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const outDir = path.join(root, "tmp-programmatic");
const outJson = path.join(outDir, "blog-p4-gap-report.json");
const outMd = path.join(outDir, "blog-p4-gap-report.md");

const hotOnly = !process.argv.includes("--all");
const PAGE = 100;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function hasProof(content) {
  return content.includes("/du-an/") || content.includes("Proof thực chiến") || content.includes("Proof ngành");
}

function hasSilo(content) {
  return content.includes('id="silo-nganh"');
}

const stats = {
  scanned: 0,
  websiteTopic: 0,
  missingProof: 0,
  missingSilo: 0,
  missingPillar: 0,
  shortUnder12k: 0,
  industryResolvable: 0,
  samples: { missingProof: [], missingSilo: [] },
};

let from = 0;
while (true) {
  let q = sb
    .from("news")
    .select("slug,keywords_main,content,hot")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug")
    .range(from, from + PAGE - 1);
  if (hotOnly) q = q.eq("hot", true);

  const { data, error } = await q;
  if (error) throw error;
  if (!data?.length) break;

  for (const row of data) {
    stats.scanned++;
    const content = row.content || "";
    const len = content.length;
    const website = isWebsiteTopic({ slug: row.slug, keywordsMain: row.keywords_main });
    const industry = resolveIndustrySilo({ slug: row.slug, keywordsMain: row.keywords_main });

    if (len < 12000) stats.shortUnder12k++;
    if (website) stats.websiteTopic++;
    if (industry) stats.industryResolvable++;

    if (!hasProof(content)) {
      stats.missingProof++;
      if (stats.samples.missingProof.length < 15) stats.samples.missingProof.push(row.slug);
    }
    if (website && industry && !hasSilo(content)) {
      stats.missingSilo++;
      if (stats.samples.missingSilo.length < 15) stats.samples.missingSilo.push(row.slug);
    }
    if (!contentHasPillarClusterBlock(content) && row.slug !== "thiet-ke-website") {
      stats.missingPillar++;
    }
  }

  if (stats.scanned % 500 === 0) console.log(`  ... ${stats.scanned}`);
  if (data.length < PAGE) break;
  from += PAGE;
}

const report = {
  generatedAt: new Date().toISOString(),
  scope: hotOnly ? "hot-only" : "all-published",
  ...stats,
  needsProofPct: stats.scanned ? Math.round((stats.missingProof / stats.scanned) * 100) : 0,
  needsSiloPct: stats.websiteTopic ? Math.round((stats.missingSilo / stats.websiteTopic) * 100) : 0,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8");

const lines = [];
lines.push("# Blog P4 Gap Report");
lines.push("");
lines.push(`- Generated: ${report.generatedAt}`);
lines.push(`- Scope: **${report.scope}**`);
lines.push(`- Scanned: **${stats.scanned}**`);
lines.push(`- Website topic: **${stats.websiteTopic}**`);
lines.push(`- Industry resolvable: **${stats.industryResolvable}**`);
lines.push("");
lines.push("| Metric | Count | % |");
lines.push("|---|---:|---:|");
lines.push(`| Missing proof (\`/du-an/\`) | ${stats.missingProof} | ${report.needsProofPct}% |`);
lines.push(`| Missing silo block | ${stats.missingSilo} | ${report.needsSiloPct}% of website |`);
lines.push(`| Missing pillar cluster | ${stats.missingPillar} | — |`);
lines.push(`| Under 12k chars | ${stats.shortUnder12k} | — |`);
lines.push("");
lines.push("## Sample missing proof");
stats.samples.missingProof.forEach((s) => lines.push(`- \`${s}\``));
lines.push("");
lines.push("## Sample missing silo");
stats.samples.missingSilo.forEach((s) => lines.push(`- \`${s}\``));
lines.push("");
lines.push("## Next");
lines.push("```bash");
lines.push("npm run seed:blog-p4-proof-silo -- --dry-run --limit=50");
lines.push("npm run seed:blog-p4-proof-silo -- --limit=500");
lines.push("```");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");

console.log("=== Blog P4 gap report ===");
console.log(`Scope: ${report.scope}`);
console.log(`Scanned: ${stats.scanned}`);
console.log(`Missing proof: ${stats.missingProof} (${report.needsProofPct}%)`);
console.log(`Missing silo: ${stats.missingSilo}`);
console.log(`MD: ${outMd}`);
