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
const p4Gap = readJson(path.join(outDir, "blog-p4-gap-report.json"));
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
lines.push("- **P4 scale blog:** proof **0%** · silo **0** · meta **0 fail** trên 11.086 bài");
if (p4Gap) {
  lines.push(
    `- P4 gap (${p4Gap.scope}): scanned **${p4Gap.scanned}** · pillar thiếu **${p4Gap.missingPillar}**`,
  );
}
lines.push("- 35/35 programmatic landings **index** · silo inject **14 slugs**");
lines.push("- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`");
lines.push("");
lines.push("## IndexNow (semi-auto)");
lines.push("1. **Core 30 URL** — `npm run ping:indexnow`");
lines.push("2. **Blog hot ~6k** — `npm run export:indexnow-blog-hot` → `npm run ping:indexnow:blog-hot`");
lines.push("3. Báo cáo: `tmp-programmatic/indexnow-ping-report.md`");
lines.push("");
lines.push("## Tuần này (manual + semi-auto)");
lines.push("1. **GSC indexing** — `tmp-programmatic/gsc-copy-paste.md` (30 URL) + `gsc-hot-blog-batch.md` (50 URL)");
lines.push("2. **Bing WMT verify** — `tmp-programmatic/bing-wmt-checklist.md`");
lines.push("3. **Outreach tuần 1** — `tmp-programmatic/outreach-week-1-playbook.md`");
lines.push("4. **Guest post pitch** — `tmp-programmatic/guest-post-pitch-pack.md`");
lines.push("5. **Directory VN** — `tmp-programmatic/directory-citation-pack-vn.md` (5 citation tuần 1)");
lines.push("6. **LinkedIn + Zalo group** — `linkedin-outreach-pack.md` · `zalo-group-post-pack.md`");
lines.push("7. **Backlink log** — `npm run build:backlink-weekly-tracker -- --log=\"...\"`");
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
lines.push("| `npm run build:guest-post-pitch-pack` | Email pitch guest post |");
lines.push("| `npm run build:directory-citation-pack` | Directory citation VN + NAP |");
lines.push("| `npm run build:linkedin-outreach-pack` | LinkedIn connect + post |");
lines.push("| `npm run build:zalo-group-post-pack` | Zalo group post 7 vertical |");
lines.push("| `npm run build:backlink-weekly-tracker` | Log placement backlink |");
lines.push("| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |");
lines.push("| `npm run audit:blog-p4-gap` | Gap proof/silo/pillar blog (hot hoặc `--all`) |");
lines.push("| `npm run seed:blog-p4-proof-silo` | Batch inject proof+silo (`--all-hot` / `--all`) |");
lines.push("| `npm run export:indexnow-blog-hot` | Export URL blog hot cho IndexNow |");
lines.push("| `npm run ping:indexnow:blog-hot` | Ping IndexNow ~6k bài hot |");
lines.push("| `npm run ping:indexnow` | Ping IndexNow 30 URL GSC core |");
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
