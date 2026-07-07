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
const outJson = path.join(outDir, "priority-intent-coverage-audit.json");
const outMd = path.join(outDir, "priority-intent-coverage-audit.md");

const SERVICE_PAGE_SOURCE_MAP = {
  "/website": [
    "app/website/page.tsx",
    "app/website/layout.tsx",
    "app/website/WebsiteSchema.tsx",
  ],
  "/seo-website": "app/seo-website/page.tsx",
  "/seo-website/dia-phuong/ho-chi-minh": "app/seo-website/dia-phuong/[location]/page.tsx",
  "/marketing-automation": "app/marketing-automation/page.tsx",
  "/ai-marketing": "app/ai-marketing/page.tsx",
};

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

function hasAny(content, words) {
  const lower = content.toLowerCase();
  return words.some((w) => lower.includes(w));
}

function slugFromUrl(url) {
  const seg = url.split("/").filter(Boolean);
  if (seg[0] === "blog" && seg[1]) return seg[1];
  return null;
}

function intentChecklist(intent) {
  if (intent === "pillar") {
    return [
      { key: "pillar_guide", words: ["quy trình", "checklist", "bảng giá"] },
      { key: "cluster_links", words: ["/website", "/blog/bao-gia"] },
      { key: "proof", words: ["/du-an/", "impression", "click"] },
      { key: "faq", words: ["faq", "câu hỏi thường gặp"] },
      { key: "cta", words: ["/lien-he", "/website"] },
    ];
  }
  if (intent === "money") {
    return [
      { key: "pricing", words: ["báo giá", "chi phí", "giá"] },
      { key: "comparison", words: ["so sánh", "vs", "khác nhau"] },
      { key: "proof", words: ["/du-an/", "impression", "click"] },
      { key: "faq", words: ["faq", "câu hỏi thường gặp"] },
      { key: "cta", words: ["/lien-he", "/website"] },
    ];
  }
  if (intent === "comparison") {
    return [
      { key: "comparison", words: ["so sánh", "vs", "khác nhau"] },
      { key: "pros_cons", words: ["ưu điểm", "nhược điểm"] },
      { key: "proof", words: ["/du-an/", "impression", "click"] },
      { key: "cta", words: ["/lien-he", "/website"] },
    ];
  }
  if (intent === "industry") {
    return [
      { key: "industry_hub", words: ["/blog/nganh/"] },
      { key: "proof", words: ["/du-an/", "case"] },
      { key: "checklist_or_template", words: ["checklist", "template"] },
      { key: "cta", words: ["/lien-he", "/website"] },
    ];
  }
  if (intent === "checklist" || intent === "template") {
    return [
      { key: "step_or_structure", words: ["checklist", "template", "quy trình", "cấu trúc"] },
      { key: "related_money_page", words: ["/blog/thiet-ke-website", "/blog/thiet-ke-website-"] },
      { key: "proof", words: ["/du-an/", "impression", "click"] },
      { key: "cta", words: ["/lien-he", "/website"] },
    ];
  }
  return [
    { key: "proof", words: ["/du-an/", "impression", "click"] },
    { key: "faq", words: ["faq", "câu hỏi thường gặp"] },
    { key: "cta", words: ["/lien-he"] },
  ];
}

async function main() {
  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`);
    process.exit(1);
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env for intent audit.");
    process.exit(1);
  }

  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const items = (cfg.items || []).slice(0, 20);
  const slugs = items.map((x) => slugFromUrl(x.url)).filter(Boolean);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from("news").select("slug,content").in("slug", slugs);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  const blogMap = new Map((data || []).map((r) => [r.slug, r.content || ""]));

  const rows = items.map((item) => {
    const slug = slugFromUrl(item.url);
    let content = "";
    if (slug) {
      content = blogMap.get(slug) || "";
    } else {
      if (serviceSourceFromUrl(item.url)) content = readServiceContent(item.url);
    }
    const checks = intentChecklist(item.intent).map((c) => ({
      key: c.key,
      pass: hasAny(content, c.words),
    }));
    const passCount = checks.filter((c) => c.pass).length;
    const score = Math.round((passCount / checks.length) * 100);
    return {
      ...item,
      intentCoverageScore: score,
      checks,
      missing: checks.filter((c) => !c.pass).map((c) => c.key),
      status: score >= 75 ? "pass" : "fail",
    };
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(rows, null, 2), "utf8");

  const lines = [];
  lines.push("# Priority Intent Coverage Audit");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- URLs audited: ${rows.length}`);
  lines.push("");
  lines.push("| Slug | URL | Intent | Score | Status | Missing |");
  lines.push("|---|---|---|---:|---|---|");
  rows.forEach((r) => {
    lines.push(`| ${r.slug} | ${r.url} | ${r.intent} | ${r.intentCoverageScore} | ${r.status} | ${r.missing.join(", ") || "-"} |`);
  });
  lines.push("");
  fs.writeFileSync(outMd, lines.join("\n"), "utf8");

  const fail = rows.filter((r) => r.status === "fail").length;
  console.log("=== Priority intent coverage audit ===");
  console.log(`Total: ${rows.length}`);
  console.log(`Fail: ${fail}`);
  console.log(`Report: ${outMd}`);
}

main();
