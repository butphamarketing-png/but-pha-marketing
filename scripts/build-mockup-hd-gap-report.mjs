/**
 * Báo cáo mockup ngành cần nâng HD (≥1920px) — ảnh pool đang <800px wide.
 * Chạy: node scripts/build-mockup-hd-gap-report.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dimsPath = path.join(root, "lib", "industry-mockup-dimensions.generated.ts");
const outDir = path.join(root, "tmp-programmatic");
const outJson = path.join(outDir, "mockup-hd-gap-report.json");
const outMd = path.join(outDir, "mockup-hd-gap-report.md");

const HD_TARGET = 1920;
const MIN_OK_WIDTH = 800;

/** Slug catalog → thư mục pool (mirror website-industry-images) — quét mọi PNG trong thư mục */
const INDUSTRY_DIRS = [
  "nha-khoa",
  "tham-my",
  "phong-kham",
  "my-pham",
  "pccc",
  "logistics",
  "co-khi",
  "nha-hang",
  "khach-san",
  "bat-dong-san",
  "mam-non",
  "kien-truc",
  "thiet-bi-ve-sinh",
  "bao-bi",
  "luat",
  "thang-may",
  "tu-dong-hoa",
];

function poolFilesForSlug(slug, dims) {
  const prefix = `/tin-tuc/${slug}/`;
  return Object.keys(dims)
    .filter((src) => src.startsWith(prefix) && !src.includes("/hd/") && /\.(png|jpe?g)$/i.test(src))
    .sort();
}

function loadDimensions() {
  if (!fs.existsSync(dimsPath)) {
    console.error("Missing dimension map. Run: npm run audit:industry-mockup-dimensions");
    process.exit(1);
  }
  const src = fs.readFileSync(dimsPath, "utf8");
  const map = {};
  for (const m of src.matchAll(/"(\/tin-tuc[^"]+)":\s*\{\s*width:\s*(\d+),\s*height:\s*(\d+)/g)) {
    map[m[1]] = { width: Number(m[2]), height: Number(m[3]) };
  }
  return map;
}

function hdPath(src) {
  const base = path.basename(src);
  const dir = path.dirname(src);
  return `${dir}/hd/${base.replace(/\.(png|jpe?g)$/i, "")}-1920.webp`;
}

const dims = loadDimensions();
const gaps = [];

for (const slug of INDUSTRY_DIRS) {
  const files = poolFilesForSlug(slug, dims);
  for (const src of files) {
    const d = dims[src];
    const suggestedHd = hdPath(src);
    const hd = dims[suggestedHd];

    if (!d) {
      gaps.push({ slug, src, width: null, height: null, status: "missing-dim", suggestedHd });
      continue;
    }

    if (d.width >= MIN_OK_WIDTH) {
      gaps.push({ slug, src, width: d.width, height: d.height, status: "ok-native", suggestedHd });
      continue;
    }

    if (hd && hd.width >= HD_TARGET) {
      gaps.push({
        slug,
        src,
        width: d.width,
        height: d.height,
        hdWidth: hd.width,
        hdHeight: hd.height,
        status: "hd-ready",
        suggestedHd,
      });
      continue;
    }

    gaps.push({
      slug,
      src,
      width: d.width,
      height: d.height,
      status: "needs-hd",
      suggestedHd,
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  hdTarget: HD_TARGET,
  minOkWidth: MIN_OK_WIDTH,
  industryPoolsChecked: INDUSTRY_DIRS.length,
  filesChecked: gaps.length,
  needsHd: gaps.filter((g) => g.status === "needs-hd").length,
  hdReady: gaps.filter((g) => g.status === "hd-ready").length,
  gaps,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(report, null, 2), "utf8");

const lines = [];
lines.push("# Mockup HD Gap Report");
lines.push("");
lines.push(`- Generated at: ${report.generatedAt}`);
lines.push(`- HD target: **${HD_TARGET}px** wide (WebP khuyên dùng)`);
lines.push(`- File cần nâng HD: **${report.needsHd}/${report.filesChecked}**`);
lines.push(`- HD ready: **${report.hdReady}/${report.filesChecked}**`);
lines.push(`- Ngành quét: **${report.industryPoolsChecked}**`);
lines.push("");
lines.push("## Hướng dẫn");
lines.push("1. Export mockup mới **1920px** rộng — hoặc chạy `npm run generate:mockup-hd` (sharp upscale)");
lines.push("2. Lưu vào path `suggestedHd` bên dưới (thư mục `hd/` cạnh file gốc)");
lines.push("3. Chạy `npm run audit:industry-mockup-dimensions`");
lines.push("4. Deploy — hero landing tự chọn ảnh rộng nhất");
lines.push("");
lines.push("| Ngành | Status | File | Kích thước | HD path |");
lines.push("|---|---|---|---|---|");
for (const g of gaps) {
  const size = g.width ? `${g.width}×${g.height}` : "—";
  const hdSize = g.hdWidth ? `${g.hdWidth}×${g.hdHeight}` : "—";
  lines.push(`| ${g.slug} | ${g.status} | \`${g.src}\` | ${size} | \`${g.suggestedHd}\` ${hdSize !== "—" ? `(${hdSize})` : ""} |`);
}
lines.push("");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");
console.log("=== Mockup HD gap report ===");
console.log(`Needs HD: ${report.needsHd}/${report.industryPoolsChecked}`);
console.log(`HD ready: ${report.hdReady}/${report.industryPoolsChecked}`);
console.log(`JSON: ${outJson}`);
console.log(`MD: ${outMd}`);
