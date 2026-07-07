import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = path.join(root, "tmp-programmatic", "priority-proof-audit.json");
const outPath = path.join(root, "tmp-programmatic", "priority-proof-fix-checklist.md");

function tasksFromGaps(item) {
  const tasks = [];
  for (const gap of item.gaps || []) {
    if (gap === "missing-case-study-link") {
      tasks.push("Chèn ít nhất 1 link case study `/du-an/...` liên quan ngành ngay phần thân bài.");
    } else if (gap === "missing-numeric-proof") {
      tasks.push("Bổ sung block số liệu thực (impression/click/lead/CTR/CPA) có mốc thời gian.");
    } else if (gap === "missing-faq-block") {
      tasks.push("Thêm mục FAQ 3-5 câu hỏi theo intent mua hàng + triển khai.");
    } else if (gap === "missing-process-checklist") {
      tasks.push("Thêm section quy trình hoặc checklist triển khai từng bước.");
    } else if (gap === "non-blog-url") {
      tasks.push("Trang dịch vụ: thêm proof module (số liệu + case + FAQ) trong UI section chính.");
    } else {
      tasks.push(`Review và xử lý gap: ${gap}`);
    }
  }
  return tasks;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Missing audit input: ${inputPath}`);
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const weak = (rows || []).filter((r) => (r.proofScore || 0) < 70);

  const lines = [];
  lines.push("# Priority Proof Fix Checklist");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Weak URLs: ${weak.length}`);
  lines.push("");

  if (weak.length === 0) {
    lines.push("Không có URL nào cần fix proof ở lần audit này.");
  } else {
    for (const item of weak) {
      lines.push(`## ${item.slug}`);
      lines.push(`- URL: ${item.url}`);
      lines.push(`- Proof score: ${item.proofScore}`);
      lines.push(`- Gaps: ${(item.gaps || []).join(", ") || "-"}`);
      lines.push("- Tasks:");
      const tasks = tasksFromGaps(item);
      tasks.forEach((t) => lines.push(`  - [ ] ${t}`));
      lines.push("- Owner: [ ] Content");
      lines.push("- ETA: [ ] This week");
      lines.push("");
    }
  }

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("=== Proof fix checklist generated ===");
  console.log(`Weak URLs: ${weak.length}`);
  console.log(`Report: ${outPath}`);
}

main();
