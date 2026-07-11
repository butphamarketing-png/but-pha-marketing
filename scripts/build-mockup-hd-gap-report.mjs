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

/** Slug catalog → thư mục pool (mirror website-industry-images) */
const INDUSTRY_POOLS = {
  "nha-khoa": ["/tin-tuc/nha-khoa/nha-khoa-1.png"],
  "tham-my": ["/tin-tuc/tham-my/tham-my-1.png"],
  "phong-kham": ["/tin-tuc/phong-kham/phong-kham-1.png"],
  "my-pham": ["/tin-tuc/my-pham/my-pham-1.png"],
  pccc: ["/tin-tuc/pccc/pccc-1.png"],
  logistics: ["/tin-tuc/logistics/logistics-1.png"],
  "co-khi": ["/tin-tuc/co-khi/co-khi-1.png"],
  "nha-hang": ["/tin-tuc/nha-hang/thiet-ke-website-nha-hang.png"],
  "khach-san": ["/tin-tuc/khach-san/khach-san-1.png"],
  "bat-dong-san": ["/tin-tuc/bat-dong-san/thiet-ke-website-bat-dong-san.png"],
  "mam-non": ["/tin-tuc/mam-non/thiet-ke-website-truong-mam-non.png"],
  "kien-truc": ["/tin-tuc/kien-truc/kien-truc-1.png"],
  "thiet-bi-ve-sinh": ["/tin-tuc/thiet-bi-ve-sinh/thiet-ke-website-thiet-bi-ve-sinh.png"],
};

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

for (const [slug, files] of Object.entries(INDUSTRY_POOLS)) {
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
  industryPoolsChecked: Object.keys(INDUSTRY_POOLS).length,
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
lines.push(`- Ngành cần nâng: **${report.needsHd}/${report.industryPoolsChecked}**`);
lines.push(`- HD ready: **${report.hdReady}/${report.industryPoolsChecked}**`);
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
