import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const scriptsDir = path.join(root, "scripts");
const REWRITE_SLUGS = new Set(["thiet-ke-website"]);
for (const f of fs.readdirSync(scriptsDir)) {
  if (!f.startsWith("seo-rewrite-") || !f.endsWith(".mjs")) continue;
  const text = fs.readFileSync(path.join(scriptsDir, f), "utf8");
  const m = text.match(/slug:\s*["']([^"']+)["']/);
  if (m) REWRITE_SLUGS.add(m[1]);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase.from("news").select("slug,content,keywords_main").order("slug");
const pending = (data || []).filter((r) => !REWRITE_SLUGS.has(r.slug));
pending.sort((a, b) => (a.content?.length || 0) - (b.content?.length || 0));
const website = pending.filter((r) => r.slug.startsWith("thiet-ke-website"));
console.log("Pending:", pending.length);
console.log("Website pending:", website.length);
console.log("Website under 12k:", website.filter((r) => (r.content?.length || 0) < 12000).length);
console.log("\nThinnest website 10:");
for (const r of website.filter((r) => (r.content?.length || 0) < 12000).slice(0, 10)) {
  console.log(`  ${(r.content?.length || 0).toString().padStart(5)}  ${r.slug}`);
}
const nonPillar = pending.filter((r) => !PILLAR_SLUG_SET.has(r.slug) && (r.content?.length || 0) < 12000);
console.log("\nNon-pillar under 12k:", nonPillar.length);
for (const r of nonPillar.slice(0, 10)) {
  console.log(`  ${(r.content?.length || 0).toString().padStart(5)}  ${r.slug}`);
}
