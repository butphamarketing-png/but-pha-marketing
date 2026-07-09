/**
 * Sync programmatic-landings.config.json websiteIndustry từ lib/website-industry-catalog.ts
 * Run: npx tsx scripts/sync-industry-landings-config.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toProgrammaticConfigRows } from "../lib/website-industry-catalog.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "scripts", "programmatic-landings.config.json");

const existing = JSON.parse(fs.readFileSync(configPath, "utf8"));
const websiteIndustry = toProgrammaticConfigRows();

fs.writeFileSync(
  configPath,
  JSON.stringify({ ...existing, websiteIndustry }, null, 2) + "\n",
  "utf8",
);

console.log(`Updated websiteIndustry: ${websiteIndustry.length} entries in ${configPath}`);
