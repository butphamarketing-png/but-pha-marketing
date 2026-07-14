/**
 * Phase 1: đo trùng lặp token giữa các money blog ngành hot.
 * Chạy: node scripts/audit-phase1-jaccard.mjs
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const catalogSrc = fs.readFileSync(path.join(root, "lib", "website-industry-catalog.ts"), "utf8");
const slugs = [...catalogSrc.matchAll(/blogMoneySlug:\s*"([^"]+)"/g)].map((m) => m[1]);

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function tokens(html) {
  const t = (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .toLowerCase();
  return new Set(t.split(/\s+/).filter((w) => w.length > 3));
}

function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

const { data, error } = await supabase.from("news").select("slug,content").in("slug", slugs);
if (error) throw error;

const bySlug = Object.fromEntries((data || []).map((r) => [r.slug, tokens(r.content)]));
const pairs = [];
for (let i = 0; i < slugs.length; i++) {
  for (let j = i + 1; j < slugs.length; j++) {
    const a = bySlug[slugs[i]];
    const b = bySlug[slugs[j]];
    if (!a || !b) continue;
    const score = jaccard(a, b);
    pairs.push({ a: slugs[i], b: slugs[j], score });
  }
}
pairs.sort((x, y) => y.score - x.score);
const top = pairs.slice(0, 30);
const out = path.join(root, "tmp-programmatic", "phase1-jaccard-hot.md");
const lines = [
  "# Phase 1 — Jaccard soft-duplicate (hot industry money blogs)",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Pairs scored: ${pairs.length}`,
  `- Threshold quan tâm: ≥ 0.35`,
  "",
  "| # | A | B | Jaccard |",
  "|---|---|---|---|",
  ...top.map((p, i) => `| ${i + 1} | \`${p.a}\` | \`${p.b}\` | ${p.score.toFixed(3)} |`),
  "",
];
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote top ${top.length} → ${out}`);
console.log(`Pairs ≥0.35: ${pairs.filter((p) => p.score >= 0.35).length}`);
top.slice(0, 8).forEach((p) => console.log(`  ${p.score.toFixed(3)}  ${p.a} ↔ ${p.b}`));
