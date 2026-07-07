import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const configPath = path.join(root, "scripts", "seo-priority-backlog.config.json");
const outDir = path.join(root, "tmp-programmatic");
const outJson = path.join(outDir, "priority-content-freshness-audit.json");
const outMd = path.join(outDir, "priority-content-freshness-audit.md");

const STALE_DAYS = 90;
const VERY_STALE_DAYS = 180;

function slugFromUrl(url) {
  const seg = url.split("/").filter(Boolean);
  if (seg[0] === "blog" && seg[1]) return seg[1];
  return null;
}

function daysSince(dateStr) {
  if (!dateStr) return 9999;
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function refreshPriority(item, ageDays) {
  const base = item.priority || 0;
  const ageBoost = ageDays >= VERY_STALE_DAYS ? 20 : ageDays >= STALE_DAYS ? 10 : 0;
  return Math.min(100, base + ageBoost);
}

function suggestedTasks(item, ageDays) {
  const tasks = [];
  if (ageDays >= STALE_DAYS) tasks.push("Cập nhật số liệu mới nhất + năm hiện tại trong intro và kết luận.");
  if (item.intent === "money") tasks.push("Thêm section so sánh giá trị/chi phí và CTA tư vấn rõ hơn.");
  if (item.intent === "industry") tasks.push("Bổ sung 1 case theo ngành + liên kết hub ngành.");
  if (item.intent === "checklist" || item.intent === "template")
    tasks.push("Cập nhật checklist/template theo phiên bản năm hiện tại.");
  if (item.cluster === "website") tasks.push("Đảm bảo link tới /seo-website, /blog/chu-de/website, /lien-he.");
  return tasks;
}

async function main() {
  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`);
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env for freshness audit.");
    process.exit(1);
  }

  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const items = (cfg.items || []).slice(0, 20);
  const slugs = items.map((x) => slugFromUrl(x.url)).filter(Boolean);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("news")
    .select("slug,title,updated_at,published_at,timestamp")
    .in("slug", slugs);

  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  const rowMap = new Map((data || []).map((r) => [r.slug, r]));

  const result = items.map((item) => {
    const slug = slugFromUrl(item.url);
    if (!slug) {
      return {
        ...item,
        ageDays: 0,
        stale: false,
        refreshPriority: item.priority,
        tasks: ["Trang non-blog: rà soát nội dung thủ công theo quý."],
      };
    }

    const row = rowMap.get(slug);
    const lastUpdated = row?.updated_at || row?.published_at || (row?.timestamp ? new Date(row.timestamp).toISOString() : "");
    const ageDays = daysSince(lastUpdated);
    const stale = ageDays >= STALE_DAYS;
    return {
      ...item,
      title: row?.title || item.slug,
      lastUpdated,
      ageDays,
      stale,
      refreshPriority: refreshPriority(item, ageDays),
      tasks: suggestedTasks(item, ageDays),
    };
  });

  const staleCount = result.filter((r) => r.stale).length;
  const sorted = [...result].sort((a, b) => b.refreshPriority - a.refreshPriority);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(sorted, null, 2), "utf8");

  const lines = [];
  lines.push("# Priority Content Freshness Audit");
  lines.push("");
  lines.push(`- Generated at: ${new Date().toISOString()}`);
  lines.push(`- URLs audited: ${sorted.length}`);
  lines.push(`- Stale URLs (>= ${STALE_DAYS} days): ${staleCount}`);
  lines.push("");
  lines.push("| Slug | URL | Age (days) | Refresh Priority | Status |");
  lines.push("|---|---|---:|---:|---|");
  sorted.forEach((r) => {
    lines.push(`| ${r.slug} | ${r.url} | ${r.ageDays} | ${r.refreshPriority} | ${r.stale ? "stale" : "ok"} |`);
  });
  lines.push("");
  lines.push("## Refresh Tasks (Top 10)");
  lines.push("");
  sorted.slice(0, 10).forEach((r, idx) => {
    lines.push(`### ${idx + 1}. ${r.slug}`);
    lines.push(`- URL: ${r.url}`);
    lines.push(`- Age: ${r.ageDays} days`);
    lines.push(`- Refresh priority: ${r.refreshPriority}`);
    r.tasks.forEach((t) => lines.push(`- [ ] ${t}`));
    lines.push("");
  });

  fs.writeFileSync(outMd, lines.join("\n"), "utf8");
  console.log("=== Priority content freshness audit ===");
  console.log(`Total: ${sorted.length}`);
  console.log(`Stale: ${staleCount}`);
  console.log(`Report: ${outMd}`);
}

main();
