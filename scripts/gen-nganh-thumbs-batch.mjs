/**
 * Thumbnail riêng cho bài /website/nganh + /blog/nganh.
 * Mỗi bài 1 WebP + keywords_main (alt). Base = mockup ngành khi có.
 *
 * Usage:
 *   node scripts/gen-nganh-thumbs-batch.mjs --audit
 *   node scripts/gen-nganh-thumbs-batch.mjs
 *   node scripts/gen-nganh-thumbs-batch.mjs --force
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

const AUDIT = process.argv.includes("--audit");
const FORCE = process.argv.includes("--force");

const OUT_DIR = path.join(root, "public/tin-tuc/articles");
const MAP_JSON = path.join(root, "lib/news-article-thumbs.generated.json");
const MAP_TS = path.join(root, "lib/news-article-thumbs.generated.ts");
const W = 960;
const H = 540;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const GENERIC = new Set([
  "tin-tuc-marketing.png",
  "thiet-ke-website.png",
  "facebook-marketing.png",
  "google-maps-marketing.png",
]);

/** slug ngành catalog → thư mục mockup / card thumb */
const INDUSTRY_BASE = {
  "nha-khoa": ["public/tin-tuc/nganh-thumbs/nha-khoa.png", "public/tin-tuc/nha-khoa/nha-khoa-1.png"],
  spa: ["public/tin-tuc/nganh-thumbs/spa.png", "public/tin-tuc/tham-my/tham-my-2.png"],
  "tham-my": ["public/tin-tuc/nganh-thumbs/tham-my.png", "public/tin-tuc/tham-my/tham-my-1.png"],
  "phong-kham": ["public/tin-tuc/nganh-thumbs/phong-kham.png", "public/tin-tuc/phong-kham/phong-kham-1.png"],
  "xay-dung": ["public/tin-tuc/nganh-thumbs/xay-dung.png", "public/tin-tuc/kien-truc/kien-truc-2.png"],
  "my-pham": ["public/tin-tuc/nganh-thumbs/my-pham.png", "public/tin-tuc/my-pham/my-pham-1.png"],
  pccc: ["public/tin-tuc/nganh-thumbs/pccc.png", "public/tin-tuc/pccc/pccc-1.png"],
  logistics: ["public/tin-tuc/nganh-thumbs/logistics.png", "public/tin-tuc/logistics/logistics-1.png"],
  "co-khi": ["public/tin-tuc/nganh-thumbs/co-khi.png", "public/tin-tuc/co-khi/co-khi-1.png"],
  "bao-bi": ["public/tin-tuc/nganh-thumbs/bao-bi.png", "public/tin-tuc/bao-bi/bao-bi-1.png"],
  luat: ["public/tin-tuc/nganh-thumbs/luat.png", "public/tin-tuc/luat/luat-1.png"],
  "thang-may": ["public/tin-tuc/nganh-thumbs/thang-may.png", "public/tin-tuc/thang-may/thang-may-1.png"],
  "tu-dong-hoa": ["public/tin-tuc/nganh-thumbs/tu-dong-hoa.png", "public/tin-tuc/tu-dong-hoa/tu-dong-hoa-1.png"],
  "nha-hang": ["public/tin-tuc/nganh-thumbs/nha-hang.png", "public/tin-tuc/nha-hang/thiet-ke-website-nha-hang.png"],
  "bat-dong-san": [
    "public/tin-tuc/nganh-thumbs/bat-dong-san.png",
    "public/tin-tuc/bat-dong-san/thiet-ke-website-bat-dong-san.png",
  ],
  "mam-non": ["public/tin-tuc/nganh-thumbs/mam-non.png", "public/tin-tuc/mam-non/thiet-ke-website-truong-mam-non.png"],
  "khach-san": ["public/tin-tuc/nganh-thumbs/khach-san.png", "public/tin-tuc/khach-san/thiet-ke-website-khach-san.png"],
  "noi-that": ["public/tin-tuc/nganh-thumbs/noi-that.png", "public/tin-tuc/kien-truc/kien-truc-7.png"],
  "o-to": ["public/tin-tuc/nganh-thumbs/o-to.png"],
  "thiet-bi-ve-sinh": [
    "public/tin-tuc/nganh-thumbs/thiet-bi-ve-sinh.png",
    "public/tin-tuc/thiet-bi-ve-sinh/thiet-ke-website-thiet-bi-ve-sinh.png",
  ],
  "in-an": ["public/tin-tuc/nganh-thumbs/in-an.png", "public/tin-tuc/bao-bi/bao-bi-1.png"],
  "landing-page": ["public/tin-tuc/nganh-thumbs/landing-page.png"],
  "anh-ngu": ["public/tin-tuc/nganh-thumbs/anh-ngu.png"],
};

const FALLBACK_BASE = [
  "public/tin-tuc/thiet-ke-website.png",
  "public/about/about-city-bg-deep.png",
].map((p) => path.join(root, p)).filter((p) => fs.existsSync(p));

function extractSlugs() {
  const catalog = fs.readFileSync(path.join(root, "lib/website-industry-catalog.ts"), "utf8");
  const money = [...catalog.matchAll(/blogMoneySlug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const industryByMoney = {};
  const kwByMoney = {};
  for (const block of catalog.split(/item\(\{/)) {
    const slug = block.match(/^\s*slug:\s*"([^"]+)"/)?.[1];
    const moneySlug = block.match(/blogMoneySlug:\s*"([^"]+)"/)?.[1];
    const pk = block.match(/primaryKeyword:\s*"([^"]+)"/)?.[1];
    if (slug && moneySlug) {
      industryByMoney[moneySlug] = slug;
      if (pk) kwByMoney[moneySlug] = pk;
    }
  }

  const hub = fs.readFileSync(path.join(root, "lib/industry-hub.ts"), "utf8");
  const hubBlogs = [];
  const hubIndustry = {};
  for (const m of hub.matchAll(
    /(?:\"([^\"]+)\"|([A-Za-z][\w-]*)):\s*\{[\s\S]*?blogSlugs:\s*\[([\s\S]*?)\]/g,
  )) {
    const industry = m[1] || m[2];
    for (const s of m[3].matchAll(/"([^"]+)"/g)) {
      hubBlogs.push(s[1]);
      if (!hubIndustry[s[1]]) hubIndustry[s[1]] = industry;
    }
  }

  const all = [...new Set([...money, ...hubBlogs])];
  return { all, money, industryByMoney, kwByMoney, hubIndustry };
}

function classify(imageUrl) {
  const img = (imageUrl || "").split("?")[0];
  if (!img) return "empty";
  if (img.includes("/tin-tuc/articles/")) return "unique";
  const file = img.split("/").pop() || "";
  if (GENERIC.has(file)) return "generic";
  if (/\/tin-tuc\/[^/]+\//.test(img) && !img.includes("/articles/") && !img.includes("/nganh-thumbs/")) {
    return "shared-pool";
  }
  return "other";
}

function inferFromSlug(slug) {
  const s = slug.toLowerCase();
  for (const key of Object.keys(INDUSTRY_BASE)) {
    if (s.includes(key)) return key;
  }
  if (/nieng-rang|implant|nha-khoa/.test(s)) return "nha-khoa";
  if (/spa|nail|halee|phuoc-lai/.test(s)) return "spa";
  if (/tham-my|thien-hoang/.test(s)) return "tham-my";
  if (/xay-dung|kien-truc|nha-thau|ho-so-nang-luc|sao-khue/.test(s)) return "xay-dung";
  if (/noi-that/.test(s)) return "noi-that";
  if (/pccc|bao-chay|bao-an/.test(s)) return "pccc";
  if (/my-pham|glow/.test(s)) return "my-pham";
  if (/luat|phap-ly/.test(s)) return "luat";
  if (/logistics|van-tai|van-toc/.test(s)) return "logistics";
  if (/co-khi|cnc|gia-cong/.test(s)) return "co-khi";
  if (/bao-bi|in-an/.test(s)) return "bao-bi";
  if (/thang-may/.test(s)) return "thang-may";
  if (/tu-dong-hoa/.test(s)) return "tu-dong-hoa";
  if (/phong-kham|da-khoa/.test(s)) return "phong-kham";
  if (/khach-san|resort|dat-phong/.test(s)) return "khach-san";
  if (/nha-hang|menu/.test(s)) return "nha-hang";
  if (/mam-non|tre-em/.test(s)) return "mam-non";
  if (/bat-dong-san|bds/.test(s)) return "bat-dong-san";
  if (/gara|o-to|oto/.test(s)) return "o-to";
  if (/catalog-san-pham/.test(s)) return "landing-page";
  if (/ve-sinh/.test(s)) return "thiet-bi-ve-sinh";
  if (/landing/.test(s)) return "landing-page";
  return null;
}

function guessIndustry(slug, industryByMoney, hubIndustry) {
  if (industryByMoney[slug]) return industryByMoney[slug];
  const fromSlug = inferFromSlug(slug);
  // Ưu tiên suy luận từ slug khi rõ ràng (tránh hub overlap gán sai)
  if (fromSlug && /resort|nieng-rang|cnc|catalog|gara|implant/.test(slug)) return fromSlug;
  if (hubIndustry[slug]) return hubIndustry[slug];
  return fromSlug;
}

function pickBase(industry, slug) {
  const list = (INDUSTRY_BASE[industry] || [])
    .map((p) => path.join(root, p))
    .filter((p) => fs.existsSync(p));
  const pool = list.length ? list : FALLBACK_BASE;
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return pool[Math.abs(h) % pool.length];
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayLabel(kw, title, slug, catalogKw) {
  const k = (kw || "").trim();
  if (k && !/^thiết kế website$/i.test(k) && k.length < 90) return k;
  if (catalogKw) return catalogKw;
  return (title || slug || "").trim().replace(/\s+/g, " ").slice(0, 72);
}

function altText(label) {
  const t = label.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
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

function overlaySvg(line1, line2, accent, tag) {
  const barH = Math.round(H * 0.34);
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="35%" stop-color="#0a0c14" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#06070c" stop-opacity="0.93"/>
    </linearGradient>
  </defs>
  <rect x="0" y="${H - barH - 24}" width="${W}" height="${barH + 24}" fill="url(#g)"/>
  <text x="36" y="${H - barH + 6}" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2.5" fill="${accent}">${escapeXml(tag)}</text>
  <text x="36" y="${H - barH + 44}" font-family="Arial Black, Arial, sans-serif" font-size="32" font-weight="900" fill="#FFFFFF">${escapeXml(line1)}</text>
  ${line2 ? `<text x="36" y="${H - barH + 84}" font-family="Arial Black, Arial, sans-serif" font-size="34" font-weight="900" fill="${accent}">${escapeXml(line2)}</text>` : ""}
  <rect x="36" y="${H - 20}" width="88" height="5" rx="2.5" fill="${accent}"/>
</svg>`);
}

const ACCENTS = ["#C4955A", "#8B7CF6", "#A78BFA", "#E8C99A", "#7C6AF0", "#D4A574"];

async function makeThumb(slug, label, industry) {
  const out = path.join(OUT_DIR, `${slug}.webp`);
  const base = pickBase(industry, slug);
  const accent = ACCENTS[Math.abs(slug.length * 17 + label.length) % ACCENTS.length];
  const [l1, l2] = titleLines(label);
  const tag = (industry || "NGÀNH").replace(/-/g, " ").toUpperCase();
  const overlay = overlaySvg(l1, l2, accent, tag);

  await sharp(base)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.78, saturation: 1.08 })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 80 })
    .toFile(out);

  return `/tin-tuc/articles/${slug}.webp`;
}

function loadMap() {
  if (!fs.existsSync(MAP_JSON)) return {};
  try {
    return JSON.parse(fs.readFileSync(MAP_JSON, "utf8"));
  } catch {
    return {};
  }
}

function writeMap(entries) {
  const merged = { ...loadMap(), ...entries };
  fs.writeFileSync(MAP_JSON, JSON.stringify(merged), "utf8");
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
    "utf8",
  );
  console.log(`Wrote map (${Object.keys(merged).length} entries)`);
}

async function fetchRows(slugs) {
  const rows = [];
  for (let i = 0; i < slugs.length; i += 50) {
    const chunk = slugs.slice(i, i + 50);
    const { data, error } = await supabase
      .from("news")
      .select("id, slug, title, keywords_main, image_url, published")
      .in("slug", chunk);
    if (error) throw new Error(error.message);
    rows.push(...(data || []));
  }
  return rows;
}

const { all, money, industryByMoney, kwByMoney, hubIndustry } = extractSlugs();
const rows = await fetchRows(all);
const bySlug = Object.fromEntries(rows.map((r) => [r.slug, r]));

const report = all.map((slug) => {
  const row = bySlug[slug];
  if (!row) return { slug, status: "missing" };
  return {
    slug,
    status: classify(row.image_url),
    img: row.image_url,
    kw: row.keywords_main,
    title: row.title,
    isMoney: money.includes(slug),
    industry: guessIndustry(slug, industryByMoney, hubIndustry),
  };
});

const summary = report.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] || 0) + 1;
  return acc;
}, {});

console.log("Nganh-related posts:", all.length);
console.log("Summary:", summary);

if (AUDIT) {
  console.log(JSON.stringify(report.filter((r) => r.status !== "unique"), null, 2));
  process.exit(0);
}

const candidates = report.filter((r) => {
  if (r.status === "missing") return false;
  if (FORCE) return true;
  return r.status === "generic" || r.status === "shared-pool" || r.status === "empty";
});

console.log(`Generating ${candidates.length} nganh thumbs…`);
fs.mkdirSync(OUT_DIR, { recursive: true });

/** @type {Record<string, { file: string; keywordsMain: string }>} */
const newEntries = {};
let ok = 0;

for (const c of candidates) {
  const row = bySlug[c.slug];
  if (!row) continue;
  const catalogKw = kwByMoney[c.slug] || "";
  const label = displayLabel(row.keywords_main, row.title, c.slug, catalogKw);
  const alt = altText(label);
  try {
    // recreate even if file exists when remaking shared/generic
    const outPath = path.join(OUT_DIR, `${c.slug}.webp`);
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    const imagePath = await makeThumb(c.slug, label, c.industry);
    newEntries[c.slug] = { file: `${c.slug}.webp`, keywordsMain: alt.charAt(0).toLowerCase() + alt.slice(1) };
    const { error } = await supabase
      .from("news")
      .update({
        image_url: imagePath,
        keywords_main: newEntries[c.slug].keywordsMain,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    if (error) console.error(`DB fail ${c.slug}:`, error.message);
    else {
      ok++;
      console.log(`OK ${c.slug} [${c.industry || "?"}] → ${imagePath}`);
    }
  } catch (e) {
    console.error(`Fail ${c.slug}:`, e.message || e);
  }
}

writeMap(newEntries);
try {
  await revalidateBlogAfterSeed(candidates[0]?.slug);
} catch (e) {
  console.warn("revalidate skip", e.message || e);
}
console.log(`Done. ok=${ok}/${candidates.length}`);
