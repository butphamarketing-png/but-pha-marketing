/**
 * Cập nhật image_url trong Supabase cho các slug đã có thumbnail riêng.
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const UPDATES = [
  { slug: "hubspot-hay-zoho-crm", image: "/tin-tuc/crm/hubspot-hay-zoho-crm.png", kw: "hubspot hay zoho crm" },
  { slug: "zalo-zns-la-gi-b17", image: "/tin-tuc/zalo/zalo-zns-la-gi-b17.png", kw: "zalo zns là gì" },
  { slug: "zalo-zns-hay-sms-marketing-b17", image: "/tin-tuc/zalo/zalo-zns-hay-sms-b17.png", kw: "zalo zns hay sms marketing" },
  { slug: "zalo-zns-template-bi-tu-choi", image: "/tin-tuc/zalo/zalo-zns-template-bi-tu-choi.png", kw: "zalo zns template bị từ chối" },
  { slug: "zalo-zns-bi-tu-choi-b17", image: "/tin-tuc/zalo/zalo-zns-bi-tu-choi-b17.png", kw: "zalo zns bị từ chối" },
  { slug: "zalo-zns-bi-chan", image: "/tin-tuc/zalo/zalo-zns-bi-chan.png", kw: "zalo zns bị chặn" },
  { slug: "thiet-ke-website-van-tai", image: "/tin-tuc/logistics/logistics-2.png", kw: "thiết kế website vận tải" },
  { slug: "zero-click-search-la-gi", image: "/tin-tuc/seo/zero-click-search.png", kw: "zero click search là gì" },
  { slug: "zapier-zap-la-gi", image: "/tin-tuc/automation/zapier-zap.png", kw: "zapier zap là gì" },
  { slug: "zapier-marketing-workflow", image: "/tin-tuc/automation/zapier-marketing-workflow.png", kw: "zapier marketing workflow" },
  { slug: "zapier-hay-make-automation", image: "/tin-tuc/automation/zapier-hay-make.png", kw: "zapier hay make automation" },
  { slug: "zalo-rich-menu-la-gi-b17", image: "/tin-tuc/zalo/zalo-rich-menu.png", kw: "zalo rich menu là gì" },
  { slug: "zalo-pay-hay-momo-b17", image: "/tin-tuc/zalo/zalopay-hay-momo.png", kw: "zalopay hay momo" },
  { slug: "zalo-official-account-la-gi", image: "/tin-tuc/zalo/zalo-official-account.png", kw: "zalo official account là gì" },
  { slug: "zalo-oa-zns-template", image: "/tin-tuc/zalo/zalo-oa-zns-template.png", kw: "zalo oa zns template" },
  { slug: "zalo-oa-zalo-shop", image: "/tin-tuc/zalo/zalo-oa-zalo-shop.png", kw: "zalo oa zalo shop" },
  { slug: "zalo-oa-zalo-pay-tich-hop", image: "/tin-tuc/zalo/zalo-oa-zalopay.png", kw: "zalo oa zalopay tích hợp" },
  { slug: "zalo-oa-zalo-nurture", image: "/tin-tuc/zalo/zalo-oa-nurture.png", kw: "zalo oa nurture" },
];

for (const row of UPDATES) {
  const { data: existing, error: findError } = await supabase
    .from("news")
    .select("id, slug, keywords_main")
    .eq("slug", row.slug)
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (!existing) {
    console.log(`Skip (not in DB): ${row.slug}`);
    continue;
  }

  const payload = {
    image_url: row.image,
    updated_at: new Date().toISOString(),
  };
  const kw = (existing.keywords_main || "").trim().toLowerCase();
  if (!kw || kw === "thiết kế website") {
    payload.keywords_main = row.kw;
  }

  const { error } = await supabase.from("news").update(payload).eq("id", existing.id);
  if (error) throw new Error(`${row.slug}: ${error.message}`);
  console.log(`Updated: ${row.slug} → ${row.image}`);
  await revalidateBlogAfterSeed(row.slug);
}

console.log("Done — DB image_url + revalidate.");
