import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const CHECKS = [
  {
    label: "SEO Website pillar",
    file: "app/seo-website/page.tsx",
    requiredSnippets: ["WebPage", "FAQPage", "Service", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Marketing Automation pillar",
    file: "app/marketing-automation/page.tsx",
    requiredSnippets: ["WebPage", "FAQPage", 'aria-label="Breadcrumb"'],
  },
  {
    label: "AI Marketing pillar",
    file: "app/ai-marketing/page.tsx",
    requiredSnippets: ["WebPage", "FAQPage", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Knowledge center",
    file: "app/kien-thuc/page.tsx",
    requiredSnippets: ["WebPage", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Programmatic industry page",
    file: "app/website/nganh/[industry]/page.tsx",
    requiredSnippets: ["BreadcrumbList", "ItemList", "Service", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Programmatic local SEO page",
    file: "app/seo-website/dia-phuong/[location]/page.tsx",
    requiredSnippets: ["BreadcrumbList", "ItemList", "Service", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Topic hub page",
    file: "app/blog/chu-de/[topic]/page.tsx",
    requiredSnippets: ["CollectionPage", 'aria-label="Breadcrumb"'],
  },
  {
    label: "Industry hub page",
    file: "app/blog/nganh/[industry]/page.tsx",
    requiredSnippets: ["CollectionPage", 'aria-label="Breadcrumb"'],
  },
];

function hasAllSnippets(content, snippets) {
  const missing = snippets.filter((snippet) => !content.includes(snippet));
  return {
    ok: missing.length === 0,
    missing,
  };
}

function main() {
  const results = CHECKS.map((check) => {
    const abs = path.join(root, check.file);
    if (!fs.existsSync(abs)) {
      return { label: check.label, file: check.file, ok: false, missing: ["FILE_NOT_FOUND"] };
    }
    const content = fs.readFileSync(abs, "utf8");
    const match = hasAllSnippets(content, check.requiredSnippets);
    return {
      label: check.label,
      file: check.file,
      ok: match.ok,
      missing: match.missing,
    };
  });

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;

  console.log("=== Schema Coverage Audit ===");
  console.log(`Total checks: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  for (const r of results) {
    if (r.ok) {
      console.log(`✓ ${r.label} (${r.file})`);
    } else {
      console.log(`✗ ${r.label} (${r.file}) -> missing: ${r.missing.join(", ")}`);
    }
  }

  if (failed > 0) process.exit(1);
}

main();
