import "dotenv/config";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SLUGS = ["thiet-ke-website", "bao-gia-thiet-ke-website"];

function extractLinks(html) {
  const links = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) links.push(m[1]);
  return [...new Set(links)];
}

for (const slug of SLUGS) {
  const { data, error } = await supabase
    .from("news")
    .select("id,slug,title,keywords_main,content")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.log(slug, error.message);
    continue;
  }
  if (!data) {
    console.log(slug, "NOT FOUND");
    continue;
  }

  const c = data.content || "";
  const uniq = extractLinks(c);
  console.log("\n===", slug, "===");
  console.log("title:", data.title);
  console.log("kw:", data.keywords_main);
  console.log("content_len:", c.length);
  console.log("links:", uniq.slice(0, 50));
  console.log("has_/website:", uniq.some((u) => u.includes("/website")));
  console.log("has_/banggia:", uniq.some((u) => u.includes("/banggia")));
  console.log("has_/lien-he:", uniq.some((u) => u.includes("/lien-he")));
  console.log(
    "facebook_sub:",
    uniq.filter((u) => /\/facebook\//.test(u)),
  );
  console.log(
    "seo-website:",
    uniq.filter((u) => u.includes("/seo-website")),
  );
}
