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
const outJson = path.join(outDir, "priority-proof-audit.json");
const outMd = path.join(outDir, "priority-proof-audit.md");
const SERVICE_PAGE_SOURCE_MAP = {
  "/website": [
    "app/website/page.tsx",
    "app/website/layout.tsx",
    "app/website/WebsiteSchema.tsx",
  ],
  "/facebook": "app/facebook/page.tsx",
  "/google-maps": "app/google-maps/page.tsx",
  "/banggia": ["app/banggia/page.tsx", "components/pricing/BanggiaPageClient.tsx"],
  "/gioi-thieu": ["app/gioi-thieu/page.tsx", "app/gioi-thieu/AboutPageClient.tsx"],
  "/kien-thuc": "app/kien-thuc/page.tsx",
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

function scoreProof(content = "") {
  const lower = content.toLowerCase();
  const hasCaseStudyLink = lower.includes("/du-an/");
  const hasNumberEvidence = /(\d{2,}|\d+,\d+|\d+\.\d+)\s*(click|impression|%|lead|khách|đơn)/i.test(content);
  const hasFaq = lower.includes("<h2 id=\"faq\"") || lower.includes("câu hỏi thường gặp") || lower.includes("faqpage");
  const hasMethodology = lower.includes("quy trình") || lower.includes("checklist");
  const score =
    (hasCaseStudyLink ? 30 : 0) +
    (hasNumberEvidence ? 30 : 0) +
    (hasFaq ? 20 : 0) +
    (hasMethodology ? 20 : 0);
  return { score, hasCaseStudyLink, hasNumberEvidence, hasFaq, hasMethodology };
}

function slugFromUrl(url) {
  const seg = url.split("/").filter(Boolean);
  if (seg[0] === "blog" && seg[1]) return seg[1];
  return null;
}

function serviceSourceFromUrl(url) {
  return SERVICE_PAGE_SOURCE_MAP[url] ? true : null;
}

function toMdRow(item) {
  return `| ${item.slug} | ${item.url} | ${item.proofScore} | ${item.gaps.join(", ") || "-"} |`;
}

async function main() {
  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`);
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env for proof audit.");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const items = (config.items || []).slice(0, 20);
  const blogSlugs = items.map((x) => slugFromUrl(x.url)).filter(Boolean);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from("news").select("slug,content").in("slug", blogSlugs);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  const map = new Map((data || []).map((r) => [r.slug, r.content || ""]));
  const result = items.map((item) => {
    const slug = slugFromUrl(item.url);
    if (!slug) {
      if (!serviceSourceFromUrl(item.url)) {
        return { ...item, proofScore: 0, gaps: ["non-blog-url"], nextAction: "manual review service page proof" };
      }
      const source = readServiceContent(item.url);
      const check = scoreProof(source);
      const gaps = [];
      if (!check.hasCaseStudyLink) gaps.push("missing-case-study-link");
      if (!check.hasNumberEvidence) gaps.push("missing-numeric-proof");
      if (!check.hasFaq) gaps.push("missing-faq-block");
      if (!check.hasMethodology) gaps.push("missing-process-checklist");
      return {
        ...item,
        proofScore: check.score,
        gaps,
        nextAction: check.score >= 70 ? "keep-refresh" : "manual review service page proof",
      };
    }
    const content = map.get(slug) || "";
    const check = scoreProof(content);
    const gaps = [];
    if (!check.hasCaseStudyLink) gaps.push("missing-case-study-link");
    if (!check.hasNumberEvidence) gaps.push("missing-numeric-proof");
    if (!check.hasFaq) gaps.push("missing-faq-block");
    if (!check.hasMethodology) gaps.push("missing-process-checklist");
    return {
      ...item,
      proofScore: check.score,
      gaps,
      nextAction: check.score >= 70 ? "keep-refresh" : "add-proof-section-and-internal-links",
    };
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(result, null, 2), "utf8");

  const lines = [];
  lines.push("# Priority URL Proof Audit");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- URLs audited: ${result.length}`);
  lines.push("");
  lines.push("| Slug | URL | Proof Score | Gaps |");
  lines.push("|---|---|---:|---|");
  result.forEach((r) => lines.push(toMdRow(r)));
  lines.push("");
  fs.writeFileSync(outMd, lines.join("\n"), "utf8");

  const weak = result.filter((r) => r.proofScore < 70).length;
  console.log("=== Priority proof audit ===");
  console.log(`Total: ${result.length}`);
  console.log(`Need proof push (<70): ${weak}`);
  console.log(`Report: ${outMd}`);
}

main();
