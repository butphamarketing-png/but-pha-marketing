import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const configPath = path.join(root, "scripts", "seo-priority-backlog.config.json");
const outDir = path.join(root, "tmp-programmatic");
const reportPath = path.join(outDir, "seo-priority-backlog.md");

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

function main() {
  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const items = (raw.items || []).sort((a, b) => b.priority - a.priority).slice(0, 20);

  const lines = [];
  lines.push("# SEO Priority Backlog (Top 20)");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push("- Rule: each URL must link to pillar + cluster hub + conversion page");
  lines.push("");

  items.forEach((item, idx) => {
    lines.push(`## ${idx + 1}. ${item.slug}`);
    lines.push(`- URL: ${item.url}`);
    lines.push(`- Intent: ${item.intent}`);
    lines.push(`- Cluster: ${item.cluster}`);
    lines.push(`- Priority: ${item.priority}`);
    lines.push(`- Required internal links: ${requiredLinks(item).join(" | ")}`);
    lines.push("");
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

  console.log("=== SEO priority backlog generated ===");
  console.log(`Items: ${items.length}`);
  console.log(`Report: ${reportPath}`);
}

main();
