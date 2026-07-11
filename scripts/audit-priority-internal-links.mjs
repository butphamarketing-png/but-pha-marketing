import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const configPath = path.join(root, "scripts", "seo-priority-backlog.config.json");
const outDir = path.join(root, "tmp-programmatic");
const outJson = path.join(outDir, "priority-internal-links-audit.json");
const outMd = path.join(outDir, "priority-internal-links-audit.md");

const SERVICE_PAGE_SOURCE_MAP = {
  "/website": [
    "app/website/page.tsx",
    "app/website/layout.tsx",
    "app/website/WebsiteSchema.tsx",
    "components/website/WebsiteProofSection.tsx",
  ],
  "/seo-website": "app/seo-website/page.tsx",
  "/seo-website/dia-phuong/ho-chi-minh": "app/seo-website/dia-phuong/[location]/page.tsx",
  "/marketing-automation": "app/marketing-automation/page.tsx",
  "/ai-marketing": "app/ai-marketing/page.tsx",
};

function requiredLinks(item) {
  const links = [];
  if (item.cluster === "website") {
    links.push("/seo-website", "/blog/chu-de/website", "/lien-he");
  } else if (item.intent === "industry" || item.intent === "checklist" || item.intent === "template") {
    links.push(`/blog/nganh/${item.cluster}`, "/website", "/du-an");
  } else if (item.cluster === "seo-website") {
    links.push("/seo-website", "/kien-thuc/seo-website", "/lien-he");
  } else if (item.cluster === "automation") {
    links.push("/marketing-automation", "/kien-thuc/marketing-automation", "/lien-he");
  } else if (item.cluster === "ai") {
    links.push("/ai-marketing", "/kien-thuc/ai-marketing", "/lien-he");
  } else {
    links.push("/blog", "/lien-he");
  }
  return links;
}

function slugFromUrl(url) {
  const seg = url.split("/").filter(Boolean);
  if (seg[0] === "blog" && seg[1]) return seg[1];
  return null;
}

function readServiceContent(url) {
  const rel = SERVICE_PAGE_SOURCE_MAP[url];
  if (!rel) return "";
  const files = Array.isArray(rel) ? rel : [rel];
  return files
    .map((f) => path.join(root, f))
    .filter((p) => fs.existsSync(p))
    .map((p) => fs.readFileSync(p, "utf8"))
    .join("\n");
}

function serviceSourceFromUrl(url) {
  return SERVICE_PAGE_SOURCE_MAP[url] ? true : null;
}

function findMissingLinks(content, mustLinks) {
  const missing = [];
  for (const link of mustLinks) {
    if (!content.includes(link)) missing.push(link);
  }
  return missing;
}

async function main() {
  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`);
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env for internal-link audit.");
    process.exit(1);
  }

  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const items = (cfg.items || []).slice(0, 20);
  const blogSlugs = items.map((x) => slugFromUrl(x.url)).filter(Boolean);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from("news").select("slug,content").in("slug", blogSlugs);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  const blogMap = new Map((data || []).map((r) => [r.slug, r.content || ""]));

  const result = items.map((item) => {
    const must = requiredLinks(item);
    const slug = slugFromUrl(item.url);
    let content = "";
    let source = "none";

    if (slug) {
      content = blogMap.get(slug) || "";
      source = "blog-db";
    } else {
      if (serviceSourceFromUrl(item.url)) {
        content = readServiceContent(item.url);
        source = "service-file";
      }
    }

    const missing = findMissingLinks(content, must);
    const pass = missing.length === 0;
    return {
      ...item,
      source,
      requiredLinks: must,
      missingLinks: missing,
      complianceScore: Math.round(((must.length - missing.length) / must.length) * 100),
      status: pass ? "pass" : "fail",
    };
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(result, null, 2), "utf8");

  const lines = [];
  lines.push("# Priority Internal Links Audit");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- URLs audited: ${result.length}`);
  lines.push("");
  lines.push("| Slug | URL | Score | Status | Missing Links |");
  lines.push("|---|---|---:|---|---|");
  result.forEach((r) => {
    lines.push(`| ${r.slug} | ${r.url} | ${r.complianceScore} | ${r.status} | ${r.missingLinks.join(", ") || "-"} |`);
  });
  lines.push("");
  fs.writeFileSync(outMd, lines.join("\n"), "utf8");

  const fail = result.filter((r) => r.status === "fail").length;
  console.log("=== Priority internal-links audit ===");
  console.log(`Total: ${result.length}`);
  console.log(`Fail: ${fail}`);
  console.log(`Report: ${outMd}`);
}

main();
