/**
 * Tạo thumbnail tin tức theo từng bài (Sharp) — khớp tiêu đề/từ khóa + alt (keywords_main).
 * 1) Quét bài published còn ảnh generic
 * 2) Sinh WebP 16:9 + overlay từ khóa (base theo chủ đề)
 * 3) Cập nhật image_url + keywords_main trên Supabase
 * 4) Ghi map JSON (alt/path) — không phình file TS
 *
 * Usage: node scripts/gen-news-thumbs-batch.mjs [limit=100]
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const LIMIT = Math.max(1, Math.min(500, Number(process.argv[2] || 100)));
const OUT_DIR = path.join(root, "public/tin-tuc/articles");
const MAP_JSON = path.join(root, "lib/news-article-thumbs.generated.json");
const MAP_TS = path.join(root, "lib/news-article-thumbs.generated.ts");
const W = 960;
const H = 540;

const TOPIC_BASES = {
  zalo: [
    "public/tin-tuc/zalo/zns-la-gi.png",
    "public/tin-tuc/zalo/zalo-oa-la-gi.png",
  ],
  seo: ["public/tin-tuc/seo/zero-click-search.png"],
  automation: ["public/tin-tuc/automation/zapier-zap.png"],
  // Không dùng ảnh có robot / cánh tay robot làm base thumbnail
  crm: ["public/tin-tuc/crm/zoho-crm-hay-pipedrive.png"],
  facebook: ["public/tin-tuc/facebook-marketing.png"],
  maps: ["public/tin-tuc/google-maps-marketing.png"],
  website: ["public/tin-tuc/thiet-ke-website.png"],
  default: [
    "public/about/about-city-bg-deep.png",
    "public/tin-tuc/tin-tuc-marketing.png",
  ],
};

function resolveBases() {
  /** @type {Record<string, string[]>} */
  const out = {};
  for (const [k, list] of Object.entries(TOPIC_BASES)) {
    out[k] = list.map((p) => path.join(root, p)).filter((p) => fs.existsSync(p));
  }
  if (!out.default.length) {
    console.error("No base images found");
    process.exit(1);
  }
  return out;
}

const BASES = resolveBases();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const GENERIC_FILES = new Set([
  "tin-tuc-marketing.png",
  "thiet-ke-website.png",
  "facebook-marketing.png",
  "google-maps-marketing.png",
]);

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
  if (/\bzalo\b|zns|official account|\boa\b/.test(t)) return "zalo";
  if (/\bseo\b|search|google ranking|backlink/.test(t)) return "seo";
  if (/automation|zapier|make\.com|n8n|workflow|tự động hóa|tu-dong/.test(t)) return "automation";
  if (/\bcrm\b|hubspot|pipedrive|salesforce/.test(t)) return "crm";
  if (/facebook|fanpage|meta ads|instagram/.test(t)) return "facebook";
  if (/google maps|gmb|gbp|maps marketing/.test(t)) return "maps";
  if (/website|thiết kế web|thiet-ke-website|landing/.test(t)) return "website";
  return "default";
}

function pickBase(slug, label) {
  const topic = detectTopic(slug, label);
  const list = BASES[topic]?.length ? BASES[topic] : BASES.default;
  return list[hash(slug) % list.length];
}

/** Rút nhãn hiển thị từ keywords / title — ưu tiên từ khóa. */
function displayLabel(kw, title, slug) {
  const k = (kw || "").trim();
  const genericKw = !k || /^thiết kế website$/i.test(k);
  const raw = genericKw ? (title || slug || "").trim() : k;
  return raw.replace(/\s+/g, " ").slice(0, 72);
}

/** Alt = keywords (câu thường), không uppercase. */
function altText(kw, title, slug) {
  const label = displayLabel(kw, title, slug).toLowerCase();
  return label.charAt(0).toUpperCase() + label.slice(1);
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

function overlaySvg(line1, line2, accent, topicTag) {
  const barH = Math.round(H * 0.34);
  const fs1 = 34;
  const fs2 = 36;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="35%" stop-color="#0a0c14" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#06070c" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8B7CF6" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#C4955A" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
  <rect x="0" y="${H - barH - 28}" width="${W}" height="${barH + 28}" fill="url(#g)"/>
  <text x="36" y="${H - barH + 8}" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="${accent}">${escapeXml(topicTag)}</text>
  <text x="36" y="${H - barH + fs1 + 22}" font-family="Arial Black, Arial, sans-serif" font-size="${fs1}" font-weight="900" fill="#FFFFFF">${escapeXml(line1)}</text>
  ${line2 ? `<text x="36" y="${H - barH + fs1 + fs2 + 30}" font-family="Arial Black, Arial, sans-serif" font-size="${fs2}" font-weight="900" fill="${accent}">${escapeXml(line2)}</text>` : ""}
  <rect x="36" y="${H - 22}" width="96" height="5" rx="2.5" fill="${accent}"/>
</svg>`);
}

const ACCENTS = ["#C4955A", "#8B7CF6", "#A78BFA", "#E8C99A", "#7C6AF0", "#D4A574"];
const TOPIC_TAG = {
  zalo: "ZALO OA",
  seo: "SEO",
  automation: "AUTOMATION",
  crm: "CRM",
  facebook: "FACEBOOK",
  maps: "GOOGLE MAPS",
  website: "WEBSITE",
  default: "TIN TỨC",
};

async function makeThumb(slug, label) {
  const out = path.join(OUT_DIR, `${slug}.webp`);
  const legacyPng = path.join(OUT_DIR, `${slug}.png`);
  if (fs.existsSync(out) && fs.statSync(out).size > 12_000) {
    return `/tin-tuc/articles/${slug}.webp`;
  }
  if (fs.existsSync(legacyPng) && fs.statSync(legacyPng).size > 40_000) {
    return `/tin-tuc/articles/${slug}.png`;
  }

  const base = pickBase(slug, label);
  const topic = detectTopic(slug, label);
  const accent = ACCENTS[hash(slug + label) % ACCENTS.length];
  const [l1, l2] = titleLines(label);
  const overlay = overlaySvg(l1, l2, accent, TOPIC_TAG[topic] || "TIN TỨC");
  const hue = hash(slug) % 40;

  await sharp(base)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.72, saturation: 1.12, hue })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 78 })
    .toFile(out);

  return `/tin-tuc/articles/${slug}.webp`;
}

function loadMap() {
  if (fs.existsSync(MAP_JSON)) {
    try {
      return JSON.parse(fs.readFileSync(MAP_JSON, "utf8"));
    } catch {
      /* fallthrough */
    }
  }
  return {};
}

function writeMap(entries) {
  const merged = { ...loadMap(), ...entries };
  fs.writeFileSync(MAP_JSON, JSON.stringify(merged), "utf8");

  // TS bridge: load JSON at runtime via import — keep helpers stable
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
  console.log(`Wrote map (${Object.keys(merged).length} entries)`);
}

const INCLUDE_SHARED =
  process.argv.includes("--include-shared") || process.argv.includes("--all");

function needsUniqueThumb(imageUrl) {
  const img = (imageUrl || "").split("?")[0];
  if (!img) return true;
  if (img.includes("/tin-tuc/articles/")) return false;
  const file = img.split("/").pop() || "";
  if (GENERIC_FILES.has(file)) return true;
  // Pool ngành / niche chia sẻ nhiều bài → làm lại thành 1 ảnh/bài
  if (
    INCLUDE_SHARED &&
    /\/tin-tuc\/[^/]+\//.test(img) &&
    !img.includes("/nganh-thumbs/")
  ) {
    return true;
  }
  return false;
}

async function fetchCandidates(limit) {
  /** @type {any[]} */
  const found = [];
  let from = 0;
  const page = 500;
  while (found.length < limit) {
    const { data, error } = await supabase
      .from("news")
      .select("id, slug, title, keywords_main, image_url, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .range(from, from + page - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    for (const row of data) {
      if (!row.slug) continue;
      if (!needsUniqueThumb(row.image_url)) continue;
      found.push(row);
      if (found.length >= limit) break;
    }
    from += page;
    if (data.length < page) break;
  }
  return found;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const candidates = await fetchCandidates(LIMIT);
console.log(`Generating ${candidates.length} thumbs…`);

/** @type {Record<string, { file: string; keywordsMain: string }>} */
const newEntries = {};
let ok = 0;
let fail = 0;

for (const row of candidates) {
  const slug = row.slug;
  const kw = (row.keywords_main || "").trim();
  const label = displayLabel(kw, row.title, slug);
  const alt = altText(kw, row.title, slug);

  try {
    const imagePath = await makeThumb(slug, label);
    const file = imagePath.split("/").pop();
    newEntries[slug] = {
      file,
      keywordsMain: alt.charAt(0).toLowerCase() + alt.slice(1),
    };

    const payload = {
      image_url: imagePath,
      keywords_main: newEntries[slug].keywordsMain,
      updated_at: new Date().toISOString(),
    };
    const { error: upErr } = await supabase.from("news").update(payload).eq("id", row.id);
    if (upErr) {
      console.error(`DB fail ${slug}:`, upErr.message);
      fail++;
    } else {
      ok++;
      if (ok % 25 === 0) console.log(`… ${ok}/${candidates.length}`);
    }
  } catch (e) {
    console.error(`Thumb fail ${slug}:`, e.message || e);
    fail++;
  }
}

writeMap(newEntries);

// Revalidate blog list once (not per article — quá chậm)
try {
  await revalidateBlogAfterSeed(candidates[0]?.slug);
} catch (e) {
  console.warn("revalidate skip", e.message || e);
}

console.log(`Done. ok=${ok} fail=${fail}`);
