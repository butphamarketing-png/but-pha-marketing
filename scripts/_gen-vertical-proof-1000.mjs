/**
 * Generator: 1000 từ khóa vertical proof (batch 11 + 12).
 * Plan: seo-vertical-proof-90d — 6 vertical ưu tiên, commercial intent theo ngành.
 * Run: node scripts/_gen-vertical-proof-1000.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRIORITY_VERTICALS,
  VERTICAL_CITIES,
  VERTICAL_SUB_NICHES,
  B11_PAIN,
  B11_COMPARE,
  B12_ZALO,
  B12_CHECKLIST,
  B12_TEMPLATE,
  B12_CASE,
  B12_PAIN,
} from "./_gen-vertical-proof-1000-data.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));

function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

function validate(name, entries) {
  if (entries.length !== 500) throw new Error(`${name}: expected 500, got ${entries.length}`);
  const slugs = entries.map((e) => e.slug);
  const dups = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dups.length) throw new Error(`${name} duplicate slugs: ${[...new Set(dups)].join(", ")}`);
  const kws = entries.map((e) => e.keywordsMain.toLowerCase());
  const kdup = kws.filter((s, i) => kws.indexOf(s) !== i);
  if (kdup.length) throw new Error(`${name} duplicate keywords: ${[...new Set(kdup)].join(", ")}`);
}

function webCityBlock() {
  const out = [];
  for (const [vSlug, industry, baseAngle] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `thiet-ke-website-${vSlug}-${citySlug}`,
        keywordsMain: `thiết kế website ${industry} ${city}`,
        h1: `Thiết Kế Website ${cap(industry)} ${city} Chuẩn SEO`,
        angle: `${baseAngle} tại ${city}`,
        niche: "strategy",
      });
    }
  }
  return out;
}

function mapsCityBlock() {
  const out = [];
  for (const [vSlug, industry, baseAngle] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `seo-google-maps-${vSlug}-${citySlug}`,
        keywordsMain: `seo google maps ${industry} ${city}`,
        h1: `SEO Google Maps ${cap(industry)} ${city}`,
        angle: `tối ưu Maps ${industry} thu khách local tại ${city}`,
        niche: "seo",
      });
    }
  }
  return out;
}

function marketingCityBlock() {
  const out = [];
  for (const [vSlug, industry, baseAngle] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `marketing-${vSlug}-${citySlug}`,
        keywordsMain: `marketing ${industry} ${city}`,
        h1: `Marketing ${cap(industry)} ${city} — Đa Kênh Có Proof`,
        angle: `marketing ${industry} website + Maps + ads tại ${city}`,
        niche: "strategy",
      });
    }
  }
  return out;
}

function fbCityBlock() {
  const out = [];
  for (const [vSlug, industry] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `quang-cao-facebook-${vSlug}-${citySlug}`,
        keywordsMain: `quảng cáo facebook ${industry} ${city}`,
        h1: `Quảng Cáo Facebook ${cap(industry)} ${city}`,
        angle: `Facebook Ads ${industry} thu lead tại ${city}`,
        niche: "facebook-ads",
      });
    }
  }
  return out;
}

function googleAdsCityBlock() {
  const out = [];
  for (const [vSlug, industry] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `quang-cao-google-${vSlug}-${citySlug}`,
        keywordsMain: `quảng cáo google ${industry} ${city}`,
        h1: `Quảng Cáo Google ${cap(industry)} ${city}`,
        angle: `Google Ads Search ${industry} tại ${city}`,
        niche: "google-ads",
      });
    }
  }
  return out;
}

function localSeoCityBlock() {
  const out = [];
  for (const [vSlug, industry] of PRIORITY_VERTICALS) {
    for (const [citySlug, city] of VERTICAL_CITIES) {
      out.push({
        slug: `local-seo-${vSlug}-${citySlug}`,
        keywordsMain: `local seo ${industry} ${city}`,
        h1: `Local SEO ${cap(industry)} ${city}`,
        angle: `SEO địa phương ${industry} trên Google Maps tại ${city}`,
        niche: "seo",
      });
    }
  }
  return out;
}

function subNicheWebBlock() {
  const out = [];
  for (const [vSlug] of PRIORITY_VERTICALS) {
    const subs = VERTICAL_SUB_NICHES[vSlug] || [];
    for (const [subSlug, subKw, angle] of subs) {
      out.push({
        slug: `thiet-ke-website-${vSlug}-${subSlug}`,
        keywordsMain: `thiết kế website ${subKw}`,
        h1: `Thiết Kế Website ${cap(subKw)} Chuyên Nghiệp Chuẩn SEO`,
        angle,
        niche: "strategy",
      });
    }
  }
  return out;
}

function subNichePricingBlock() {
  const out = [];
  for (const [vSlug] of PRIORITY_VERTICALS) {
    const subs = VERTICAL_SUB_NICHES[vSlug] || [];
    for (const [subSlug, subKw, angle] of subs) {
      out.push({
        slug: `bao-gia-thiet-ke-website-${vSlug}-${subSlug}`,
        keywordsMain: `báo giá thiết kế website ${subKw}`,
        h1: `Báo Giá Thiết Kế Website ${cap(subKw)} 2026`,
        angle: `báo giá minh bạch — ${angle}`,
        niche: "strategy",
      });
    }
  }
  return out;
}

function painBlock(rows) {
  return rows.map(([slug, kw, h1, angle]) => ({
    slug,
    keywordsMain: kw,
    h1,
    angle,
    niche: "strategy",
  }));
}

function compareBlock(rows) {
  return rows.map(([slug, kw, h1, angle]) => ({
    slug,
    keywordsMain: kw,
    h1,
    angle,
    niche: "strategy",
  }));
}

function zaloBlock(rows) {
  return rows.map(([slug, kw, angle]) => ({
    slug: `zalo-oa-${slug}`,
    keywordsMain: `zalo official account ${kw}`,
    h1: `Zalo OA ${cap(kw)} — Vận Hành Chuẩn`,
    angle,
    niche: "strategy",
  }));
}

function checklistBlock(rows) {
  return rows.map(([slug, kw, h1, angle]) => ({
    slug: `checklist-${slug}`,
    keywordsMain: kw,
    h1,
    angle,
    niche: "seo",
  }));
}

function templateBlock(rows) {
  return rows.map(([slug, kw, h1, angle]) => ({
    slug: `template-${slug}`,
    keywordsMain: kw,
    h1,
    angle,
    niche: "strategy",
  }));
}

function caseBlock(rows) {
  return rows.map(([slug, kw, h1, angle]) => ({
    slug: `case-study-${slug}`,
    keywordsMain: kw,
    h1,
    angle,
    niche: "strategy",
  }));
}

function emitBatch(batchNum, header, helpers, sections, exportName) {
  const parts = sections.flatMap((s) => s.entries);
  validate(exportName, parts);
  const body = `/**
 * ${header}
 * Export: ${exportName}
 * Vertical proof engine — plan seo-vertical-proof-90d
 */

${helpers}

${sections.map((s) => `/** ${s.label} */\nconst ${s.name} = ${JSON.stringify(s.entries, null, 2)};`).join("\n\n")}

export const ${exportName} = [
${sections.map((s) => `  ...${s.name},`).join("\n")}
];

export const ${exportName}_MARKETING_ONLY = new Set([
${sections.filter((s) => s.marketing).map((s) => `  ...${s.name}.map((e) => e.slug),`).join("\n")}
]);

const EXPECTED = 500;
if (${exportName}.length !== EXPECTED) {
  throw new Error(\`${exportName} expected \${EXPECTED} entries, got \${${exportName}.length}\`);
}

const slugSet = new Set(${exportName}.map((e) => e.slug));
if (slugSet.size !== ${exportName}.length) {
  const dupes = ${exportName}.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(\`${exportName} duplicate slugs: \${[...new Set(dupes)].join(", ")}\`);
}

const kwSet = new Set(${exportName}.map((e) => e.keywordsMain.toLowerCase()));
if (kwSet.size !== ${exportName}.length) {
  const dupes = ${exportName}
    .map((e) => e.keywordsMain.toLowerCase())
    .filter((s, i, a) => a.indexOf(s) !== i);
  throw new Error(\`${exportName} duplicate keywords: \${[...new Set(dupes)].join(", ")}\`);
}
`;
  const out = path.join(root, `seo-keywords-500-batch${batchNum}.mjs`);
  fs.writeFileSync(out, body, "utf8");
  console.log(`Wrote ${out} (${parts.length} entries)`);
}

const HELPERS = `function cap(kw) {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}`;

// Batch 11: 378 matrix (web+maps+marketing) + 35 sub web + 35 pricing + 25 pain + 27 compare = 500
const b11WebCity = webCityBlock();
const b11Maps = mapsCityBlock();
const b11Mkt = marketingCityBlock();
const b11SubWeb = subNicheWebBlock();
const b11SubPrice = subNichePricingBlock();
const b11Pain = painBlock(B11_PAIN);
const b11Compare = compareBlock(B11_COMPARE);

emitBatch(
  11,
  "500 từ khóa batch 11 — Vertical Proof: website + Maps + marketing × 7 ngành × 18 thành phố.",
  HELPERS,
  [
    { name: "A_WEB_CITY", label: "A — 126 web×city", entries: b11WebCity },
    { name: "B_MAPS_CITY", label: "B — 126 maps×city", entries: b11Maps },
    { name: "C_MKT_CITY", label: "C — 126 marketing×city", entries: b11Mkt },
    { name: "D_SUB_WEB", label: "D — 35 sub-niche web", entries: b11SubWeb },
    { name: "E_SUB_PRICE", label: "E — 35 báo giá sub", entries: b11SubPrice },
    { name: "F_PAIN", label: "F — 25 pain vertical", marketing: true, entries: b11Pain },
    { name: "G_COMPARE", label: "G — 27 compare vertical", marketing: true, entries: b11Compare },
  ],
  "KEYWORDS_500_BATCH11",
);

// Batch 12: 378 (fb+google+local) + 35 zalo + 30 checklist + 25 template + 20 case + 12 pain = 500
const b12Fb = fbCityBlock();
const b12Google = googleAdsCityBlock();
const b12Local = localSeoCityBlock();
const b12Zalo = zaloBlock(B12_ZALO);
const b12Checklist = checklistBlock(B12_CHECKLIST);
const b12Template = templateBlock(B12_TEMPLATE);
const b12Case = caseBlock(B12_CASE);
const b12Pain = painBlock(B12_PAIN);

emitBatch(
  12,
  "500 từ khóa batch 12 — Vertical Proof: Facebook/Google/Local SEO × ngành + Zalo/checklist/template/case.",
  HELPERS,
  [
    { name: "A_FB_CITY", label: "A — 126 facebook×city", entries: b12Fb },
    { name: "B_GOOGLE_CITY", label: "B — 126 google ads×city", entries: b12Google },
    { name: "C_LOCAL_CITY", label: "C — 126 local seo×city", entries: b12Local },
    { name: "D_ZALO", label: "D — 35 zalo OA vertical", entries: b12Zalo },
    { name: "E_CHECKLIST", label: "E — 30 checklist vertical", entries: b12Checklist },
    { name: "F_TEMPLATE", label: "F — 25 template vertical", entries: b12Template },
    { name: "G_CASE", label: "G — 20 case study vertical", entries: b12Case },
    { name: "H_PAIN", label: "H — 12 pain silo", marketing: true, entries: b12Pain.slice(0, 12) },
  ],
  "KEYWORDS_500_BATCH12",
);

console.log("Done — 1000 vertical proof keywords generated.");
