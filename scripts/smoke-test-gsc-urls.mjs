/**
 * Smoke test 30 URL GSC — kiểm tra HTTP 200 trên production.
 * Chạy: npm run smoke:gsc-urls
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const urlsPath = path.join(root, "tmp-programmatic", "gsc-indexing-urls.txt");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "gsc-smoke-test-report.md");

function loadUrls() {
  if (!fs.existsSync(urlsPath)) {
    throw new Error(`Missing ${urlsPath}. Run: npm run export:gsc-urls`);
  }
  return fs
    .readFileSync(urlsPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

async function checkUrl(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { url, status: res.status, ok: res.ok, ms: Date.now() - start };
  } catch (err) {
    return { url, status: 0, ok: false, ms: Date.now() - start, error: err.message };
  }
}

async function main() {
  const urls = loadUrls();
  const results = [];

  for (const url of urls) {
    const r = await checkUrl(url);
    results.push(r);
    const icon = r.ok ? "✓" : "✗";
    console.log(`${icon} ${r.status || "ERR"} ${url} (${r.ms}ms)`);
  }

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;

  const lines = [];
  lines.push("# GSC URL Smoke Test");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Passed: **${passed}/${results.length}**`);
  lines.push(`- Failed: **${failed}**`);
  lines.push("");
  lines.push("| Status | URL | ms |");
  lines.push("|---|---|---:|");
  for (const r of results) {
    const status = r.error ? `ERR (${r.error})` : String(r.status);
    lines.push(`| ${status} | ${r.url} | ${r.ms} |`);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`\nReport: ${outPath}`);

  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
