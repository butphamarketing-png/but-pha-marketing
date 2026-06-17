import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const BASE = "https://www.butphamarketing.com";
const SLUGS = ["thiet-ke-website", "thiet-ke-website-wordpress"];

async function checkBlog(slug) {
  const res = await fetch(`${BASE}/blog/${slug}`);
  const html = await res.text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  const types = blocks.flatMap((b) => b["@graph"]?.map((x) => x["@type"]) || [b["@type"]]).filter(Boolean);
  return {
    slug,
    status: res.status,
    cache: res.headers.get("x-vercel-cache") || "-",
    breadcrumbUi: html.includes('aria-label="Breadcrumb"'),
    schemaTypes: types,
    title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1]?.slice(0, 70),
  };
}

const sm = await fetch(`${BASE}/sitemap.xml`);
const smText = await sm.text();

const secret = process.env.REVALIDATE_SECRET || "";
let revalidate = { status: "skip", body: "no secret" };
if (secret) {
  const rev = await fetch(
    `${BASE}/api/revalidate/blog?secret=${encodeURIComponent(secret)}&slug=thiet-ke-website`,
    { method: "POST" },
  );
  revalidate = { status: rev.status, body: (await rev.text()).slice(0, 100) };
}

console.log("=== BLOG ===");
for (const slug of SLUGS) {
  console.log(JSON.stringify(await checkBlog(slug), null, 2));
}
console.log("=== SITEMAP ===", JSON.stringify({ status: sm.status, blogCount: (smText.match(/\/blog\//g) || []).length }));
console.log("=== REVALIDATE ===", JSON.stringify(revalidate));
