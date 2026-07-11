import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "tmp-programmatic");
const reportPath = path.join(outDir, "seo-weekly-report.md");

const STEPS = [
  { label: "Schema coverage audit", cmd: "npm", args: ["run", "audit:schema-coverage"] },
  { label: "Priority proof audit", cmd: "npm", args: ["run", "audit:priority-proof"] },
  { label: "Priority intent-coverage audit", cmd: "npm", args: ["run", "audit:priority-intent-coverage"] },
  { label: "Priority content freshness audit", cmd: "npm", args: ["run", "audit:priority-content-freshness"] },
  { label: "Build proof fix checklist", cmd: "npm", args: ["run", "build:proof-fix-checklist"] },
  { label: "Priority internal-links audit", cmd: "npm", args: ["run", "audit:priority-internal-links"] },
  { label: "Build internal-link fix checklist", cmd: "npm", args: ["run", "build:internal-link-fix-checklist"] },
  { label: "Programmatic promotion audit", cmd: "npm", args: ["run", "promote:programmatic-index"] },
  { label: "Programmatic apply (dry-run)", cmd: "npm", args: ["run", "promote:programmatic-index:plan"] },
  { label: "Programmatic demotion guard", cmd: "npm", args: ["run", "guard:programmatic-demotion"] },
  { label: "Generate programmatic module", cmd: "npm", args: ["run", "seed:programmatic-landings:write-module"] },
  { label: "Build backlink brand plan", cmd: "npm", args: ["run", "build:backlink-brand-signals"] },
  { label: "Build head-term syndication", cmd: "npm", args: ["run", "build:head-term-syndication"] },
  { label: "Build vertical syndication", cmd: "npm", args: ["run", "build:vertical-syndication"] },
  { label: "Mockup HD gap report", cmd: "npm", args: ["run", "build:mockup-hd-gap"] },
  { label: "GSC indexing checklist", cmd: "npm", args: ["run", "build:gsc-indexing-checklist"] },
  { label: "GSC copy-paste checklist", cmd: "npm", args: ["run", "build:gsc-copy-paste"] },
  { label: "Outreach week 1 playbook", cmd: "npm", args: ["run", "build:outreach-week-playbook"] },
  { label: "Guest post pitch pack", cmd: "npm", args: ["run", "build:guest-post-pitch-pack"] },
  { label: "Directory citation pack VN", cmd: "npm", args: ["run", "build:directory-citation-pack"] },
  { label: "LinkedIn outreach pack", cmd: "npm", args: ["run", "build:linkedin-outreach-pack"] },
  { label: "Zalo group post pack", cmd: "npm", args: ["run", "build:zalo-group-post-pack"] },
  { label: "Backlink weekly tracker", cmd: "npm", args: ["run", "build:backlink-weekly-tracker"] },
  { label: "SEO ops runbook", cmd: "npm", args: ["run", "build:seo-ops-runbook"] },
  { label: "Build SEO health scorecard", cmd: "npm", args: ["run", "build:seo-health-scorecard"] },
  { label: "Build vertical proof KPI", cmd: "npm", args: ["run", "build:vertical-kpi"] },
  { label: "Build SEO execution board", cmd: "npm", args: ["run", "build:seo-execution-board"] },
  { label: "Build SEO ops KPI", cmd: "npm", args: ["run", "build:seo-ops-kpi"] },
  { label: "Build SEO autopilot summary", cmd: "npm", args: ["run", "build:seo-autopilot-summary"] },
];

function runStep(step) {
  const result = spawnSync(step.cmd, step.args, {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe",
    shell: true,
  });
  return {
    label: step.label,
    command: `${step.cmd} ${step.args.join(" ")}`,
    status: result.status ?? 1,
    ok: (result.status ?? 1) === 0,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

function compact(text, max = 1200) {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}...`;
}

function buildReport(results) {
  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;
  const lines = [];
  lines.push("# SEO Weekly Runner Report");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Total steps: ${results.length}`);
  lines.push(`- Passed: ${passed}`);
  lines.push(`- Failed: ${failed}`);
  lines.push("");

  for (const r of results) {
    lines.push(`## ${r.ok ? "PASS" : "FAIL"} - ${r.label}`);
    lines.push(`- Command: \`${r.command}\``);
    lines.push(`- Exit code: ${r.status}`);
    if (r.stdout?.trim()) {
      lines.push("- Stdout snippet:");
      lines.push("```text");
      lines.push(compact(r.stdout));
      lines.push("```");
    }
    if (r.stderr?.trim()) {
      lines.push("- Stderr snippet:");
      lines.push("```text");
      lines.push(compact(r.stderr));
      lines.push("```");
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const results = STEPS.map(runStep);
  const report = buildReport(results);
  fs.writeFileSync(reportPath, report, "utf8");

  const failed = results.filter((r) => !r.ok).length;
  console.log("=== SEO weekly runner ===");
  console.log(`Steps: ${results.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Report: ${reportPath}`);
  if (failed > 0) process.exit(1);
}

main();
