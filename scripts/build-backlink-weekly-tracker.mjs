/**
 * Tracker outreach/backlink theo tuần — append vào history JSON.
 * Chạy: node scripts/build-backlink-weekly-tracker.mjs
 *       node scripts/build-backlink-weekly-tracker.mjs --log "Guest post ABC → /website"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const historyPath = path.join(outDir, "backlink-weekly-history.json");
const outMd = path.join(outDir, "backlink-weekly-tracker.md");

const TARGETS = { guestPost: 1, caseStudyShare: 1, socialPillar: 2, directoryCitation: 1, verticalSnippet: 1 };

function weekKey(d = new Date()) {
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

const logArg = process.argv.find((a) => a.startsWith("--log="));
const logText = logArg ? logArg.slice("--log=".length) : null;

const history = fs.existsSync(historyPath)
  ? JSON.parse(fs.readFileSync(historyPath, "utf8"))
  : { weeks: [] };

const key = weekKey();
let week = history.weeks.find((w) => w.week === key);
if (!week) {
  week = { week: key, startedAt: new Date().toISOString(), placements: [], counts: { guestPost: 0, caseStudyShare: 0, socialPillar: 0, directoryCitation: 0, verticalSnippet: 0, other: 0 } };
  history.weeks.push(week);
}

if (logText) {
  week.placements.push({ at: new Date().toISOString(), note: logText });
  const lower = logText.toLowerCase();
  if (lower.includes("guest") || lower.includes("pr")) week.counts.guestPost++;
  else if (lower.includes("case")) week.counts.caseStudyShare++;
  else if (lower.includes("social") || lower.includes("linkedin") || lower.includes("facebook")) week.counts.socialPillar++;
  else if (lower.includes("directory") || lower.includes("citation") || lower.includes("nap")) week.counts.directoryCitation++;
  else if (lower.includes("vertical") || lower.includes("ngành")) week.counts.verticalSnippet++;
  else week.counts.other++;
  week.updatedAt = new Date().toISOString();
}

history.weeks = history.weeks.slice(-52);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf8");

const lines = [];
lines.push("# Backlink Weekly Tracker");
lines.push("");
lines.push(`- Week: **${key}**`);
lines.push(`- Updated: ${new Date().toISOString()}`);
lines.push("");
lines.push("## Targets tuần");
for (const [k, v] of Object.entries(TARGETS)) {
  const done = week.counts[k] || 0;
  lines.push(`- [${done >= v ? "x" : " "}] ${k}: ${done}/${v}`);
}
lines.push("");
lines.push("## Placements tuần này");
if (!week.placements.length) lines.push("- (chưa log — dùng `--log=\"...\"`)");
else week.placements.forEach((p) => lines.push(`- ${p.at.slice(0, 10)}: ${p.note}`));
lines.push("");
lines.push("## Log placement");
lines.push("```bash");
lines.push('node scripts/build-backlink-weekly-tracker.mjs --log="Guest post XYZ → /website"');
lines.push("```");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");
console.log("=== Backlink weekly tracker ===");
console.log(`Week: ${key}`);
console.log(`Report: ${outMd}`);
