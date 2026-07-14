/**
 * Phase 1 SEO: inject silo money-funnel vào blog ngành catalog + pillar/báo giá.
 * Chạy: node scripts/seed-phase1-hot-silo.mjs
 *       node scripts/seed-phase1-hot-silo.mjs --dry-run
 */
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";
import { injectSiloLinks } from "./seo-silo-inject.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");
const SITE = "https://www.butphamarketing.com";

/** Parse catalog TS for industry money slugs */
const catalogSrc = fs.readFileSync(path.join(root, "lib", "website-industry-catalog.ts"), "utf8");
const industries = [];
const itemBlocks = [...catalogSrc.matchAll(/item\(\{([\s\S]*?)\}\),/g)];
for (const m of itemBlocks) {
  const block = m[1];
  const slug = block.match(/^\s*slug:\s*"([^"]+)"/m)?.[1];
  const blogMoneySlug = block.match(/blogMoneySlug:\s*"([^"]+)"/)?.[1];
  const hubSlug = block.match(/hubSlug:\s*"([^"]+)"/)?.[1];
  const caseStudySlug = block.match(/caseStudySlug:\s*"([^"]+)"/)?.[1];
  if (slug && blogMoneySlug) {
    industries.push({
      slug: blogMoneySlug,
      hub: `/blog/nganh/${hubSlug || slug}`,
      money: `/blog/${blogMoneySlug}`,
      landing: `/website/nganh/${slug}`,
      caseStudy: caseStudySlug ? `/du-an/${caseStudySlug}` : null,
      kind: "industry",
    });
  }
}

const MONEY_FUNNEL_BLOCK = `
<section id="money-funnel" class="my-8 rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
<h2 class="text-lg font-bold text-indigo-950">Bước tiếp theo — nhận báo giá</h2>
<p class="mt-2 text-sm text-slate-600">Từ khóa money: thiết kế website · báo giá thiết kế website. Chọn đúng trang đích để so sánh gói và đặt lịch tư vấn.</p>
<ul class="mt-3 space-y-2 text-sm">
  <li><a href="${SITE}/website"><strong>Dịch vụ thiết kế website</strong></a> — money page chính</li>
  <li><a href="${SITE}/blog/thiet-ke-website"><strong>Pillar thiết kế website</strong></a> — hướng dẫn A–Z</li>
  <li><a href="${SITE}/banggia"><strong>Báo giá thiết kế website</strong></a> — bảng giá tham khảo</li>
  <li><a href="${SITE}/blog/bao-gia-thiet-ke-website"><strong>Cách đọc báo giá</strong></a> — checklist hạng mục</li>
  <li><a href="${SITE}/du-an"><strong>Case study</strong></a> — proof có số liệu</li>
  <li><a href="${SITE}/lien-he"><strong>Liên hệ tư vấn</strong></a> — form / Zalo</li>
</ul>
</section>`;

function injectMoneyFunnel(content) {
  if (content.includes('id="money-funnel"')) {
    return content.replace(/<section id="money-funnel"[\s\S]*?<\/section>/, MONEY_FUNNEL_BLOCK.trim());
  }
  if (content.includes("</article>")) {
    return content.replace("</article>", `${MONEY_FUNNEL_BLOCK}\n</article>`);
  }
  return `${content}\n${MONEY_FUNNEL_BLOCK}`;
}

const PILLAR_CLUSTER = `
<section id="hot-industry-cluster" class="my-8 rounded-2xl border border-indigo-100 bg-white p-5">
<h2 class="text-lg font-bold text-indigo-950">Thiết kế website theo ngành nổi bật</h2>
<p class="mt-2 text-sm text-slate-600">Nhánh silo từ pillar — ưu tiên ngành khách hay tìm và đã có landing + proof.</p>
<ul class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
${industries
  .slice(0, 16)
  .map(
    (i) =>
      `  <li><a href="${SITE}${i.money}">${i.money.replace("/blog/", "").replace(/-/g, " ")}</a></li>`,
  )
  .join("\n")}
</ul>
<p class="mt-4 text-sm"><a href="${SITE}/banggia"><strong>Xem báo giá thiết kế website →</strong></a> · <a href="${SITE}/website">Dịch vụ website</a></p>
</section>`;

function injectPillarCluster(content) {
  if (content.includes('id="hot-industry-cluster"')) {
    return content.replace(
      /<section id="hot-industry-cluster"[\s\S]*?<\/section>/,
      PILLAR_CLUSTER.trim(),
    );
  }
  if (content.includes("</article>")) {
    return content.replace("</article>", `${PILLAR_CLUSTER}\n</article>`);
  }
  return `${content}\n${PILLAR_CLUSTER}`;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}
const supabase = createClient(url, key);

const targets = [
  ...industries,
  {
    slug: "thiet-ke-website",
    mode: "pillar",
  },
  {
    slug: "bao-gia-thiet-ke-website",
    mode: "funnel",
  },
];

console.log(`=== Phase 1 hot silo ===`);
console.log(`Industries: ${industries.length} | dry-run: ${dryRun ? "YES" : "NO"}`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const t of targets) {
  const slug = t.slug;
  try {
    const { data: row, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,keywords_secondary,description,content")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    if (!row) {
      console.warn(`  skip missing: ${slug}`);
      skip++;
      continue;
    }

    let content = row.content || "";
    const before = content.length;

    if (t.mode === "pillar") {
      content = injectPillarCluster(content);
      content = injectMoneyFunnel(content);
    } else if (t.mode === "funnel") {
      content = injectMoneyFunnel(content);
    } else {
      content = injectSiloLinks(content, t);
      content = injectMoneyFunnel(content);
    }

    if (content === row.content) {
      console.log(`  · ${slug}: unchanged`);
      ok++;
      continue;
    }

    if (dryRun) {
      console.log(`  [dry] ${slug}: ${before} → ${content.length}`);
      ok++;
      continue;
    }

    await seedRewriteArticle(
      {
        slug: row.slug,
        title: row.title,
        keywordsMain: row.keywords_main || row.title,
        keywordsSecondary: row.keywords_secondary || "",
        description: row.description || "",
        metaTitle: row.title,
        metaDescription: row.description || row.title,
        content,
      },
      { log: false, revalidate: false },
    );
    console.log(`  ✓ ${slug}: ${before} → ${content.length}`);
    ok++;
  } catch (e) {
    fail++;
    console.error(`  ✗ ${slug}:`, e.message || e);
  }
}

// Also refresh older SILO_FIXES checklist/template
const { SILO_FIXES } = await import("./seo-silo-inject.mjs");
for (const cfg of SILO_FIXES) {
  if (targets.some((t) => t.slug === cfg.slug)) continue;
  try {
    const { data: row, error } = await supabase
      .from("news")
      .select("slug,title,keywords_main,keywords_secondary,description,content")
      .eq("slug", cfg.slug)
      .maybeSingle();
    if (error || !row) continue;
    const content = injectMoneyFunnel(injectSiloLinks(row.content || "", cfg));
    if (content === row.content) continue;
    if (dryRun) {
      console.log(`  [dry] silo-fix ${cfg.slug}`);
      ok++;
      continue;
    }
    await seedRewriteArticle(
      {
        slug: row.slug,
        title: row.title,
        keywordsMain: row.keywords_main || row.title,
        keywordsSecondary: row.keywords_secondary || "",
        description: row.description || "",
        metaTitle: row.title,
        metaDescription: row.description || row.title,
        content,
      },
      { log: false, revalidate: false },
    );
    console.log(`  ✓ silo-fix ${cfg.slug}`);
    ok++;
  } catch (e) {
    fail++;
    console.error(`  ✗ ${cfg.slug}:`, e.message || e);
  }
}

if (!dryRun && ok > 0) {
  try {
    await revalidateBlogAfterSeed();
  } catch (e) {
    console.warn("Revalidate warn:", e.message || e);
  }
}

console.log(`\nDone ok=${ok} skip=${skip} fail=${fail}`);
