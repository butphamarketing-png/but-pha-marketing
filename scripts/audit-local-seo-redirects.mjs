/**
 * Audit redirect blog city → /seo-website/dia-phuong/*
 * Chạy: node scripts/audit-local-seo-redirects.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildLocalSeoNextRedirects,
  getLocalSeoBlogRedirectMap,
  LOCAL_SEO_LOCATION_SLUGS,
} from "../lib/local-seo-redirects.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");

const map = getLocalSeoBlogRedirectMap();
const redirects = buildLocalSeoNextRedirects();
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const localSlugs = new Set((config.localSeo || []).map((x) => x.slug));

const lines = [];
lines.push("# Local SEO Redirect Audit");
lines.push("");
lines.push(`- Blog redirects: **${redirects.length}**`);
lines.push(`- Local landing slugs in config: **${localSlugs.size}**`);
lines.push("");

const missingLanding = [];
for (const location of new Set(Object.values(map))) {
  if (!localSlugs.has(location)) missingLanding.push(location);
}
if (missingLanding.length) {
  lines.push("## ⚠ Missing local landing");
  for (const s of missingLanding) lines.push(`- ${s}`);
  lines.push("");
}

lines.push("## Redirect map");
for (const r of redirects) {
  lines.push(`- \`${r.source}\` → \`${r.destination}\` (301)`);
}

lines.push("");
lines.push("## Locations without website-city blog redirect");
for (const loc of LOCAL_SEO_LOCATION_SLUGS) {
  const hasBlog = Object.values(map).includes(loc);
  if (!hasBlog) lines.push(`- ${loc} (landing only — OK)`);
}

fs.mkdirSync(outDir, { recursive: true });
const mdPath = path.join(outDir, "local-seo-redirect-audit.md");
const jsonPath = path.join(outDir, "local-seo-redirect-audit.json");
fs.writeFileSync(mdPath, lines.join("\n") + "\n", "utf8");
fs.writeFileSync(
  jsonPath,
  JSON.stringify({ redirects, map, missingLanding, total: redirects.length }, null, 2),
  "utf8",
);

console.log(`Wrote ${mdPath}`);
console.log(`Redirects: ${redirects.length}, missing landing: ${missingLanding.length}`);
if (missingLanding.length) process.exit(1);
