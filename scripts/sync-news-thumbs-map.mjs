import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const MAP_JSON = path.join(root, "lib/news-article-thumbs.generated.json");
const MAP_TS = path.join(root, "lib/news-article-thumbs.generated.ts");
const dir = path.join(root, "public/tin-tuc/articles");
const files = fs.readdirSync(dir).filter((f) => /\.(webp|png)$/i.test(f));
const map = fs.existsSync(MAP_JSON) ? JSON.parse(fs.readFileSync(MAP_JSON, "utf8")) : {};
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const fileBySlug = Object.fromEntries(
  files.map((f) => [f.replace(/\.(webp|png)$/i, ""), f]),
);
const slugs = Object.keys(fileBySlug);
let added = 0;
for (let i = 0; i < slugs.length; i += 100) {
  const chunk = slugs.slice(i, i + 100);
  const missing = chunk.filter((s) => !map[s]);
  if (!missing.length) continue;
  const { data } = await sb.from("news").select("slug,keywords_main,title").in("slug", missing);
  const by = Object.fromEntries((data || []).map((r) => [r.slug, r]));
  for (const s of missing) {
    const row = by[s];
    const kw = (row?.keywords_main || row?.title || s.replace(/-/g, " ")).toLowerCase();
    map[s] = { file: fileBySlug[s], keywordsMain: kw };
    added++;
  }
}
fs.writeFileSync(MAP_JSON, JSON.stringify(map));
fs.writeFileSync(
  MAP_TS,
  `/** Auto-generated — do not edit. Source: news-article-thumbs.generated.json */
import data from "./news-article-thumbs.generated.json";

type ThumbEntry = { file: string; keywordsMain: string };
export const GENERATED_ARTICLE_THUMBNAILS = data as Record<string, ThumbEntry>;

export function getGeneratedArticleThumbnailPath(slug?: string): string | null {
  const entry = slug ? GENERATED_ARTICLE_THUMBNAILS[slug] : undefined;
  return entry ? \`/tin-tuc/articles/\${entry.file}\` : null;
}

export function getGeneratedArticleThumbnailAlt(slug?: string): string | null {
  const entry = slug ? GENERATED_ARTICLE_THUMBNAILS[slug] : undefined;
  if (!entry?.keywordsMain) return null;
  const k = entry.keywordsMain.trim();
  return k ? k.charAt(0).toUpperCase() + k.slice(1) : null;
}
`,
);
console.log(JSON.stringify({ files: files.length, map: Object.keys(map).length, added }, null, 2));
