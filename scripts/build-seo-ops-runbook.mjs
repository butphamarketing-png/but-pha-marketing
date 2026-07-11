/**
 * Tổng hợp runbook vận hành SEO sau P0–P3.
 * Chạy: node scripts/build-seo-ops-runbook.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "seo-ops-runbook.md");

function readJson(p) {
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const health = readJson(path.join(outDir, "seo-health-scorecard.json"));
const autopilot = fs.existsSync(path.join(outDir, "seo-autopilot-summary.md"))
  ? fs.readFileSync(path.join(outDir, "seo-autopilot-summary.md"), "utf8")
  : "";
const statusMatch = autopilot.match(/System status: \*\*(\w+)\*\*/);
const status = statusMatch?.[1] || "?";

const lines = [];
lines.push("# SEO Ops Runbook — ButPhaMarketing");
lines.push("");
lines.push(`- Generated at: ${new Date().toISOString()}`);
lines.push(`- Health score: **${health?.score ?? "?"} (${health?.grade ?? "?"})**`);
lines.push(`- Autopilot: **${status}**`);
lines.push("");
lines.push("## On-page (automated — done)");
lines.push("- P0 intent/proof/silo · P1 templates/case studies/hubs · P2 local redirects + thin content");
lines.push("- 35/35 programmatic landings **index** · silo inject **14 slugs**");
lines.push("- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`");
lines.push("");
lines.push("## Tuần này (manual + semi-auto)");
lines.push("1. **GSC indexing** — `tmp-programmatic/gsc-copy-paste.md` (30 URL copy-paste)");
lines.push("2. **Outreach tuần 1** — `tmp-programmatic/outreach-week-1-playbook.md`");
lines.push("3. **Backlink log** — `npm run build:backlink-weekly-tracker -- --log=\"...\"`");
lines.push("4. **IndexNow** — `npm run ping:indexnow` (đã ping · chạy lại sau deploy mới)");
lines.push("5. **Mockup HD** — `npm run generate:mockup-hd` · verify **0/13 needs**");
lines.push("");
lines.push("## Scripts hữu ích");
lines.push("| Lệnh | Mục đích |");
lines.push("|---|---|");
lines.push("| `npm run seed:fix-checklist-silo` | Sửa silo checklist/template/case study |");
lines.push("| `npm run audit:silo-coverage` | Audit silo 14+ slug P2 |");
lines.push("| `npm run build:mockup-hd-gap` | Báo cáo mockup cần HD |");
lines.push("| `npm run generate:mockup-hd` | Upscale PNG → WebP 1920px (sharp) |");
lines.push("| `npm run scaffold:mockup-hd-dirs` | Tạo thư mục hd/ |");
lines.push("| `npm run build:gsc-indexing-checklist` | Regen checklist GSC |");
lines.push("| `npm run build:gsc-copy-paste` | GSC copy-paste 30 URL |");
lines.push("| `npm run build:outreach-week-playbook` | Playbook outreach tuần 1 |");
lines.push("| `npm run build:backlink-weekly-tracker` | Log placement backlink |");
lines.push("| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |");
lines.push("| `npm run sync:industry-landings` | Sync catalog → programmatic |");
lines.push("");
lines.push("## Artifacts");
lines.push("- `seo-health-scorecard.md` · `seo-autopilot-summary.md`");
lines.push("- `mockup-hd-gap-report.md` · `backlink-weekly-tracker.md`");
lines.push("- `programmatic-promotions-changelog.md`");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("=== SEO ops runbook ===");
console.log(`Report: ${outPath}`);
