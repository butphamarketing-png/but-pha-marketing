/**
 * Viết lại các URL GSC "Phát hiện – chưa lập chỉ mục".
 * Chạy: node scripts/seed-rewrite-gsc-unindexed.mjs [--dry-run] [--quiet]
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const GSC_SLUGS = [
  "bao-gia-thiet-ke-website-gym",
  "agency-marketing-da-nang",
  "dua-phong-kham-len-google-maps",
  "mau-san-hay-custom-web",
  "dich-vu-quan-tri-website",
  "shopee-hay-website-rieng",
  "backlink-chat-luong-thap",
  "quang-cao-google-ads-da-nang",
  "thiet-ke-website-quan-cafe-binh-duong",
  "thiet-ke-fanpage-logistics",
  "thiet-ke-website-trung-tam-anh-ngu-binh-duong",
  "content-organic-hay-ads",
  "thiet-ke-website-quan-cafe-da-nang",
  "thiet-ke-website-moi-gioi-bat-dong-san",
  "quang-cao-facebook-workshop-cuoi-tuan",
  "marketing-cong-ty-xay-dung",
  "marketing-doanh-nghiep-an-giang",
  "quang-cao-facebook-cloud-kitchen",
  "seo-local-homestay",
  "thiet-ke-website-thuan-an",
  "thiet-ke-website-shop-my-pham-han-quoc",
  "bao-gia-thiet-ke-website-cua-hang-thuc-pham",
  "fanpage-khong-co-website",
  "quang-cao-facebook-shop-thoi-trang",
  "thiet-ke-website-trung-tam-chess",
  "quang-cao-facebook-shop-my-pham",
  "thiet-ke-fanpage-wedding",
  "landing-page-hay-website-da-trang",
  "seo-local-hai-phong",
  "thiet-ke-website-khach-san-binh-duong",
  "seo-local-doanh-nghiep-dong-nai",
  "seo-local-doanh-nghiep-binh-dinh",
  "bao-gia-thiet-ke-website-dich-vu-sua-xe",
  "thiet-ke-fanpage-bat-dong-san",
  "seo-local-tho-dien-nuoc",
  "seo-local-doanh-nghiep-long-an",
  "website-khong-len-google",
  "seo-local-cua-hang-may-tinh",
  "seo-local-yoga-pilates",
  "quang-cao-facebook-qua-tang",
  "seo-local-doanh-nghiep-khanh-hoa",
  "bao-gia-content-fanpage-thang",
  "bao-gia-thiet-ke-website-trung-tam-lai-xe",
  "thiet-ke-website-go-noi-that",
  "marketing-da-kenh-website-facebook-google-maps",
  "thiet-ke-website-dich-vu-seo",
  "hosting-la-gi",
  "cham-soc-website",
  "marketing-cho-doanh-nghiep-nho",
  "seo-local-cho-spa",
  "google-search-hay-display",
  "quang-cao-facebook-cua-hang-balo",
  "bao-gia-thiet-ke-website-dai-ly-vat-lieu",
  "thiet-ke-website-hue",
  "thiet-ke-website-dich-vu-thiet-ke-noi-that",
  "thiet-ke-website-phong-kickboxing",
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const dryRun = args["dry-run"] === true;
const quiet = args.quiet === true;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

console.log(`=== GSC unindexed rewrite (${GSC_SLUGS.length} slugs) ===`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let ok = 0;
let fail = 0;
let warned = 0;
let skipped = 0;

for (let i = 0; i < GSC_SLUGS.length; i++) {
  const slug = GSC_SLUGS[i];
  const { data: row, error } = await supabase
    .from("news")
    .select("slug,title,keywords_main,description,content,hot")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !row) {
    skipped++;
    console.warn(`  skip ${slug}: không có trong DB`);
    continue;
  }

  const before = row.content?.length || 0;
  try {
    const article = upgradeArticle(row, i);
    const after = article.content.length;
    if (dryRun) {
      console.log(`[dry-run] ${slug}: ${before} → ${after}${after >= 12000 ? " ✓" : " SHORT"}`);
      ok++;
      continue;
    }
    const result = await seedRewriteArticle(article, { log: !quiet, revalidate: false });
    if (!quiet && ((i + 1) % 10 === 0 || i === GSC_SLUGS.length - 1)) {
      console.log(`  … ${i + 1}/${GSC_SLUGS.length} ${slug} (${before}→${after})`);
    }
    if (result.seoOk) ok++;
    else {
      warned++;
      if (!quiet) console.warn(`  ⚠ SEO: ${slug}`);
    }
  } catch (err) {
    fail++;
    console.error(`  ✗ ${slug}:`, err.message);
  }
}

if (!dryRun && ok > 0) await revalidateBlogAfterSeed();

console.log(`\nHoàn tất: ${ok} OK, ${warned} cảnh báo, ${fail} lỗi, ${skipped} bỏ qua${dryRun ? " (dry-run)" : ""}.`);
console.log("Hub pages /blog/chu-de/* là trang tĩnh — xem cập nhật template hub.");
