import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const priorityPath = path.join(root, "scripts", "seo-priority-backlog.config.json");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "backlink-brand-signals-plan.md");

const CHANNELS = [
  { type: "PR", target: "Báo ngành marketing/doanh nghiệp", goal: "Brand mention + homepage link" },
  { type: "Guest Post", target: "Blog agency/marketing cộng đồng", goal: "Contextual link về URL money" },
  { type: "Case Study Syndication", target: "Cộng đồng ngành (nha khoa, xây dựng, spa)", goal: "Proof signal + referral" },
  { type: "Profile/Citation", target: "Directory doanh nghiệp chất lượng", goal: "NAP consistency + entity trust" },
  { type: "Social Distribution", target: "Fanpage, LinkedIn, YouTube short", goal: "Brand query uplift + discovery" },
];

function pickAnchor(item) {
  if (item.intent === "money") return [item.slug.replace(/-/g, " "), "dịch vụ thiết kế website", "báo giá website"];
  if (item.intent === "industry") return [item.slug.replace(/-/g, " "), "website theo ngành", "thiết kế web chuyên ngành"];
  if (item.intent === "checklist") return ["checklist triển khai website", item.slug.replace(/-/g, " ")];
  if (item.intent === "template") return ["template website", item.slug.replace(/-/g, " ")];
  return [item.slug.replace(/-/g, " "), "marketing solutions"];
}

function main() {
  if (!fs.existsSync(priorityPath)) {
    console.error(`Missing: ${priorityPath}`);
    process.exit(1);
  }
  const cfg = JSON.parse(fs.readFileSync(priorityPath, "utf8"));
  const top = (cfg.items || []).sort((a, b) => b.priority - a.priority).slice(0, 12);

  const lines = [];
  lines.push("# Backlink & Brand Signals Plan");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push("- Focus: Top 12 priority URLs");
  lines.push("");
  lines.push("## Weekly Channels");
  CHANNELS.forEach((c) => lines.push(`- ${c.type}: ${c.target} -> ${c.goal}`));
  lines.push("");
  lines.push("## URL Outreach Matrix");
  lines.push("");
  lines.push("| URL | Intent | Priority | Suggested Anchors | Weekly Target |");
  lines.push("|---|---|---:|---|---|");
  top.forEach((item) => {
    const anchors = pickAnchor(item).join(" ; ");
    const weeklyTarget = item.priority >= 95 ? "3 placements/week" : item.priority >= 85 ? "2 placements/week" : "1 placement/week";
    lines.push(`| ${item.url} | ${item.intent} | ${item.priority} | ${anchors} | ${weeklyTarget} |`);
  });
  lines.push("");
  lines.push("## Execution Checklist");
  lines.push("- Publish 1 proof content/week (case data, screenshots, metric deltas).");
  lines.push("- Build 8-15 branded mentions/week across PR, social, directory.");
  lines.push("- Build 4-8 contextual links/week to top 5 money URLs.");
  lines.push("- Track brand query + referring domains + assisted conversions weekly.");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("=== Backlink & brand signals plan generated ===");
  console.log(`Report: ${outPath}`);
}

main();
