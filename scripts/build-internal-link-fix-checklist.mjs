import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = path.join(root, "tmp-programmatic", "priority-internal-links-audit.json");
const outPath = path.join(root, "tmp-programmatic", "priority-internal-links-fix-checklist.md");

function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Missing audit input: ${inputPath}`);
    process.exit(1);
  }
  const rows = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const failed = (rows || []).filter((r) => r.status === "fail");

  const lines = [];
  lines.push("# Priority Internal Links Fix Checklist");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Failed URLs: ${failed.length}`);
  lines.push("");

  if (!failed.length) {
    lines.push("All priority URLs pass internal-link compliance.");
  } else {
    for (const item of failed) {
      lines.push(`## ${item.slug}`);
      lines.push(`- URL: ${item.url}`);
      lines.push(`- Compliance score: ${item.complianceScore}`);
      lines.push("- Missing links:");
      (item.missingLinks || []).forEach((link) => lines.push(`  - [ ] Add link to \`${link}\``));
      lines.push("- Owner: [ ] SEO Content");
      lines.push("- ETA: [ ] This week");
      lines.push("");
    }
  }

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("=== Internal-link fix checklist generated ===");
  console.log(`Failed URLs: ${failed.length}`);
  console.log(`Report: ${outPath}`);
}

main();
