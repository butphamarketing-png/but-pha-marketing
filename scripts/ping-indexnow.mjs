/**
 * Ping IndexNow (Bing/Yandex) cho URL ưu tiên GSC.
 * Chạy: npm run ping:indexnow
 * Dry-run: npm run ping:indexnow -- --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const urlsPath = path.join(root, "tmp-programmatic", "gsc-indexing-urls.txt");
const outDir = path.join(root, "tmp-programmatic");
const outPath = path.join(outDir, "indexnow-ping-report.md");

const HOST = "www.butphamarketing.com";
const KEY = "butpha-indexnow-202607";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 100;

const dryRun = process.argv.includes("--dry-run");

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

async function pingBatch(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return { status: res.status, ok: res.ok, text: await res.text().catch(() => "") };
}

async function main() {
  const urls = loadUrls();
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  const lines = [];
  lines.push("# IndexNow Ping Report");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- Host: \`${HOST}\``);
  lines.push(`- Key location: \`${KEY_LOCATION}\``);
  lines.push(`- Total URLs: **${urls.length}**`);
  lines.push(`- Mode: **${dryRun ? "dry-run" : "live"}**`);
  lines.push("");

  if (dryRun) {
    lines.push("## URLs (dry-run — no ping sent)");
    for (const u of urls) lines.push(`- ${u}`);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, lines.join("\n"), "utf8");
    console.log(`Dry-run: ${urls.length} URLs ready → ${outPath}`);
    return;
  }

  const results = [];
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const result = await pingBatch(batch);
    results.push({ batch: i + 1, count: batch.length, ...result });
    console.log(`Batch ${i + 1}/${batches.length}: HTTP ${result.status} (${batch.length} URLs)`);
  }

  lines.push("## Results");
  for (const r of results) {
    const label = r.ok ? "OK" : "FAIL";
    lines.push(`- **${label}** batch ${r.batch}: HTTP ${r.status} — ${r.count} URLs`);
    if (r.text) lines.push(`  - Response: \`${r.text.slice(0, 200)}\``);
  }

  const allOk = results.every((r) => r.ok || r.status === 202);
  lines.push("");
  lines.push(allOk ? "✅ IndexNow accepted all batches." : "⚠️ Một số batch thất bại — kiểm tra key file đã deploy chưa.");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Report: ${outPath}`);

  if (!allOk) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
