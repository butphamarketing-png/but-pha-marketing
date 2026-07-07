import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "seo-execution-board.md");

const files = {
  proof: path.join(outDir, "priority-proof-audit.json"),
  links: path.join(outDir, "priority-internal-links-audit.json"),
  freshness: path.join(outDir, "priority-content-freshness-audit.json"),
  promotion: path.join(outDir, "programmatic-promotion-report.json"),
  intent: path.join(outDir, "priority-intent-coverage-audit.json"),
  health: path.join(outDir, "seo-health-scorecard.json"),
};

function readJsonSafe(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function toTask(priority, owner, title, eta, source) {
  return { priority, owner, title, eta, source };
}

function main() {
  const proof = readJsonSafe(files.proof, []);
  const links = readJsonSafe(files.links, []);
  const freshness = readJsonSafe(files.freshness, []);
  const promotion = readJsonSafe(files.promotion, []);
  const intent = readJsonSafe(files.intent, []);
  const health = readJsonSafe(files.health, null);

  const tasks = [];

  const weakProof = proof.filter((x) => (x.proofScore || 0) < 70).slice(0, 5);
  weakProof.forEach((x) => {
    tasks.push(
      toTask(
        100 - (x.proofScore || 0),
        "Content",
        `Nâng proof cho ${x.slug} (${(x.gaps || []).join(", ")})`,
        "Tuần này",
        "priority-proof-audit",
      ),
    );
  });

  const failedLinks = links.filter((x) => x.status === "fail").slice(0, 5);
  failedLinks.forEach((x) => {
    tasks.push(
      toTask(
        95 - (x.complianceScore || 0),
        "SEO",
        `Sửa internal links cho ${x.slug}: ${(x.missingLinks || []).join(" | ")}`,
        "Tuần này",
        "priority-internal-links-audit",
      ),
    );
  });

  const staleUrls = freshness.filter((x) => x.stale).sort((a, b) => (b.refreshPriority || 0) - (a.refreshPriority || 0)).slice(0, 5);
  staleUrls.forEach((x) => {
    tasks.push(
      toTask(
        x.refreshPriority || 80,
        "Content",
        `Refresh nội dung ${x.slug} (age ${x.ageDays} ngày)`,
        "Tuần này",
        "priority-content-freshness-audit",
      ),
    );
  });

  const promotable = promotion.filter((x) => x.promotable).slice(0, 5);
  promotable.forEach((x) => {
    tasks.push(
      toTask(
        85,
        "SEO Tech",
        `Review và promote index: ${x.routePath}`,
        "Trong 3 ngày",
        "programmatic-promotion-report",
      ),
    );
  });

  const intentFail = intent.filter((x) => x.status === "fail").slice(0, 5);
  intentFail.forEach((x) => {
    tasks.push(
      toTask(
        90 - (x.intentCoverageScore || 0),
        "Content SEO",
        `Bổ sung intent blocks cho ${x.slug}: ${(x.missing || []).join(", ")}`,
        "Tuần này",
        "priority-intent-coverage-audit",
      ),
    );
  });

  if (tasks.length === 0) {
    tasks.push(
      toTask(
        70,
        "Growth",
        "Không có blocker lớn. Duy trì nhịp xuất bản + backlink theo plan tuần.",
        "Liên tục",
        "seo-health-scorecard",
      ),
    );
  }

  tasks.sort((a, b) => b.priority - a.priority);

  const lines = [];
  lines.push("# SEO Execution Board");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  if (health?.score) lines.push(`- Health score: **${health.score} (${health.grade || "-"})**`);
  lines.push(`- Total action items: ${tasks.length}`);
  lines.push("");
  lines.push("| Priority | Owner | Task | ETA | Source |");
  lines.push("|---:|---|---|---|---|");
  tasks.forEach((t) => lines.push(`| ${t.priority} | ${t.owner} | ${t.title} | ${t.eta} | ${t.source} |`));
  lines.push("");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");

  console.log("=== SEO execution board generated ===");
  console.log(`Tasks: ${tasks.length}`);
  console.log(`Report: ${outPath}`);
}

main();
