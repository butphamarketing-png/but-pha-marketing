/**
 * Xóa + tạo lại thumbnail trùng (byte-identical) và bài DB còn image_url generic/dùng chung.
 * Overlay theo keywords_main / title.
 *
 *   node scripts/force-regenerate-dup-thumbs.mjs
 *   node scripts/force-regenerate-dup-thumbs.mjs --slugs=a,b,c
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const OUT_DIR = path.join(root, "public/tin-tuc/articles");
const MAP_JSON = path.join(root, "lib/news-article-thumbs.generated.json");
const MAP_TS = path.join(root, "lib/news-article-thumbs.generated.ts");
const W = 960;
const H = 540;

const TOPIC_BASES = {
  zalo: ["public/tin-tuc/zalo/zns-la-gi.png", "public/tin-tuc/zalo/zalo-oa-la-gi.png"],
  seo: ["public/tin-tuc/seo/zero-click-search.png"],
  automation: ["public/tin-tuc/automation/zapier-zap.png"],
  // Không dùng ảnh có robot / cánh tay robot làm base
  crm: ["public/tin-tuc/crm/zoho-crm-hay-pipedrive.png"],
  facebook: ["public/tin-tuc/facebook-marketing.png", "public/tin-tuc/facebook-marketing-1.png"],
  // Không dùng bản có robot
  maps: ["public/tin-tuc/google-maps-marketing.png", "public/tin-tuc/google-maps-marketing-1.png"],
  website: ["public/tin-tuc/thiet-ke-website.png"],
  pricing: ["public/tin-tuc/thiet-ke-website.png", "public/tin-tuc/facebook-marketing.png"],
  default: ["public/about/about-city-bg-deep.png", "public/tin-tuc/tin-tuc-marketing.png"],
};

function resolveBases() {
  const out = {};
  for (const [k, list] of Object.entries(TOPIC_BASES)) {
    out[k] = list.map((p) => path.join(root, p)).filter((p) => fs.existsSync(p));
  }
  return out;
}
const BASES = resolveBases();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function detectTopic(slug, label) {
  const t = `${slug || ""} ${label || ""}`.toLowerCase();
  if (/báo giá|bao-gia|chi phí|chi-phi|giá bao nhiêu|gia-bao-nhieu/.test(t)) return "pricing";
  if (/\bzalo\b|zns|official account|\boa\b/.test(t)) return "zalo";
  if (/\bseo\b|search|google ranking|backlink|chuẩn seo|chuan-seo/.test(t)) return "seo";
  if (/automation|zapier|make\.com|n8n|workflow|tự động hóa|tu-dong/.test(t)) return "automation";
  if (/\bcrm\b|hubspot|pipedrive|salesforce/.test(t)) return "crm";
  if (/facebook|fanpage|meta ads|instagram/.test(t)) return "facebook";
  if (/google maps|gmb|gbp|maps marketing|gmap/.test(t)) return "maps";
  if (/website|thiết kế web|thiet-ke-website|landing/.test(t)) return "website";
  return "default";
}

function pickBase(slug, label) {
  const topic = detectTopic(slug, label);
  const list = BASES[topic]?.length ? BASES[topic] : BASES.default;
  return list[hash(slug + label) % list.length] || BASES.default[0];
}

function displayLabel(kw, title, slug) {
  const k = (kw || "").trim();
  const genericKw = !k || /^thiết kế website$/i.test(k);
  const raw = genericKw ? (title || slug || "").trim() : k;
  return raw.replace(/\s+/g, " ").slice(0, 72);
}

function titleLines(text) {
  const t = (text || "").trim().toUpperCase();
  if (t.length <= 26) return [t, ""];
  const words = t.split(/\s+/);
  let a = "";
  let b = "";
  for (const w of words) {
    if ((a + " " + w).trim().length <= 28) a = (a + " " + w).trim();
    else if ((b + " " + w).trim().length <= 30) b = (b + " " + w).trim();
    else break;
  }
  if (!a) a = t.slice(0, 28);
  if (b.length > 30) b = b.slice(0, 29) + "…";
  return [a, b];
}

const ACCENTS = ["#C4955A", "#8B7CF6", "#A78BFA", "#E8C99A", "#7C6AF0", "#D4A574", "#38BDF8", "#F472B6"];
const TOPIC_TAG = {
  zalo: "ZALO OA",
  seo: "SEO",
  automation: "AUTOMATION",
  crm: "CRM",
  facebook: "FACEBOOK",
  maps: "GOOGLE MAPS",
  website: "WEBSITE",
  pricing: "BÁO GIÁ",
  default: "TIN TỨC",
};

function overlaySvg(line1, line2, accent, topicTag) {
  const barH = Math.round(H * 0.34);
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="35%" stop-color="#0a0c14" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#06070c" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8B7CF6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#C4955A" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect x="0" y="${H - barH - 28}" width="${W}" height="${barH + 28}" fill="url(#g)"/>
  <text x="36" y="${H - barH + 8}" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="${accent}">${escapeXml(topicTag)}</text>
  <text x="36" y="${H - barH + 56}" font-family="Arial Black, Arial, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF">${escapeXml(line1)}</text>
  ${line2 ? `<text x="36" y="${H - barH + 98}" font-family="Arial Black, Arial, sans-serif" font-size="36" font-weight="900" fill="${accent}">${escapeXml(line2)}</text>` : ""}
  <rect x="36" y="${H - 22}" width="96" height="5" rx="2.5" fill="${accent}"/>
</svg>`);
}

async function makeThumbForced(slug, label) {
  const out = path.join(OUT_DIR, `${slug}.webp`);
  for (const ext of ["webp", "png"]) {
    const p = path.join(OUT_DIR, `${slug}.${ext}`);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  const base = pickBase(slug, label);
  if (!base) throw new Error(`No base image for ${slug}`);
  const topic = detectTopic(slug, label);
  const accent = ACCENTS[hash(slug + label) % ACCENTS.length];
  const [l1, l2] = titleLines(label);
  const overlay = overlaySvg(l1, l2, accent, TOPIC_TAG[topic] || "TIN TỨC");
  // Unique look: hue + brightness + slight contrast per slug
  const hue = hash(slug) % 360;
  const brightness = 0.62 + (hash(slug + "b") % 20) / 100;
  const saturation = 1.05 + (hash(slug + "s") % 25) / 100;

  await sharp(base)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness, saturation, hue })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 80 })
    .toFile(out);

  return `/tin-tuc/articles/${slug}.webp`;
}

function loadMap() {
  if (!fs.existsSync(MAP_JSON)) return {};
  return JSON.parse(fs.readFileSync(MAP_JSON, "utf8"));
}

function writeMap(entries) {
  const merged = { ...loadMap(), ...entries };
  fs.writeFileSync(MAP_JSON, JSON.stringify(merged), "utf8");
  const src = `/** Auto-generated — do not edit. Source: news-article-thumbs.generated.json */
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
`;
  fs.writeFileSync(MAP_TS, src, "utf8");
}

function collectByteDupSlugs() {
  const files = fs.readdirSync(OUT_DIR).filter((f) => /\.(webp|png)$/i.test(f));
  const byHash = new Map();
  for (const f of files) {
    const fp = path.join(OUT_DIR, f);
    if (fs.statSync(fp).size < 800) continue;
    const h = crypto.createHash("sha1").update(fs.readFileSync(fp)).digest("hex");
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h).push(f.replace(/\.(webp|png)$/i, ""));
  }
  const slugs = [];
  for (const [, arr] of byHash) {
    if (arr.length < 2) continue;
    // regenerate ALL in group so each becomes unique
    slugs.push(...arr);
  }
  return [...new Set(slugs)];
}

async function collectDbSharedSlugs() {
  const urlToSlugs = new Map();
  let from = 0;
  const page = 1000;
  for (;;) {
    const { data, error } = await supabase
      .from("news")
      .select("slug,image_url")
      .eq("published", true)
      .range(from, from + page - 1);
    if (error) throw error;
    if (!data?.length) break;
    for (const row of data) {
      let u = row.image_url || "";
      try {
        if (u.startsWith("http")) u = new URL(u).pathname;
      } catch {
        /* ignore */
      }
      if (!u || u.includes("/tin-tuc/articles/")) continue;
      if (!urlToSlugs.has(u)) urlToSlugs.set(u, []);
      urlToSlugs.get(u).push(row.slug);
    }
    if (data.length < page) break;
    from += page;
  }
  const out = [];
  for (const [, slugs] of urlToSlugs) {
    if (slugs.length > 1) out.push(...slugs);
  }
  return [...new Set(out)];
}

async function fetchRows(slugs) {
  const rows = [];
  for (let i = 0; i < slugs.length; i += 80) {
    const chunk = slugs.slice(i, i + 80);
    const { data, error } = await supabase
      .from("news")
      .select("id,slug,title,keywords_main,image_url")
      .in("slug", chunk);
    if (error) throw error;
    if (data) rows.push(...data);
  }
  return rows;
}

const onlyArg = process.argv.find((a) => a.startsWith("--slugs="));
const only = onlyArg
  ? onlyArg
      .slice("--slugs=".length)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  : null;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let slugs = only;
  if (!slugs) {
    const byteDupes = collectByteDupSlugs();
    const dbShared = await collectDbSharedSlugs();
    slugs = [...new Set([...byteDupes, ...dbShared])];
    console.log(`Byte-dup slugs: ${byteDupes.length}`);
    console.log(`DB-shared (non-article) slugs: ${dbShared.length}`);
  }
  console.log(`Force regenerate: ${slugs.length}`);

  const rows = await fetchRows(slugs);
  const bySlug = Object.fromEntries(rows.map((r) => [r.slug, r]));
  const newEntries = {};
  let ok = 0;
  let fail = 0;

  for (const slug of slugs) {
    const row = bySlug[slug];
    if (!row) {
      console.warn(`skip missing DB: ${slug}`);
      fail++;
      continue;
    }
    const kw = (row.keywords_main || "").trim();
    // Overlay ưu tiên từ khóa; nếu title dài hơn và khác kw → dùng title để khớp tiêu đề bài
    const fromKw = displayLabel(kw, row.title, slug);
    const fromTitle = (row.title || "").replace(/\s+/g, " ").trim().slice(0, 72);
    const label =
      fromTitle &&
      fromTitle.toLowerCase() !== fromKw.toLowerCase() &&
      fromTitle.length >= fromKw.length
        ? fromTitle
        : fromKw;
    const kwOut = (kw || fromKw).charAt(0).toLowerCase() + (kw || fromKw).slice(1);

    try {
      const imagePath = await makeThumbForced(slug, label);
      newEntries[slug] = { file: `${slug}.webp`, keywordsMain: kwOut };
      const { error } = await supabase
        .from("news")
        .update({
          image_url: imagePath,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      if (error) throw new Error(error.message);
      ok++;
      if (ok % 20 === 0) console.log(`… ${ok}/${slugs.length}`);
    } catch (e) {
      console.error(`fail ${slug}:`, e.message || e);
      fail++;
    }
  }

  writeMap(newEntries);
  try {
    await revalidateBlogAfterSeed(slugs[0]);
  } catch (e) {
    console.warn("revalidate", e.message || e);
  }
  console.log(`Done ok=${ok} fail=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
