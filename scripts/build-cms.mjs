import { cp, mkdir, rm } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cmsRoot = path.join(
  root,
  "Asset-Tracker-extracted",
  "Asset-Tracker (1)",
  "Asset-Tracker",
);

if (!fs.existsSync(cmsRoot)) {
  console.warn("CMS source not found — skip build:cms (Vercel/CI). Use committed public/cms.");
  process.exit(0);
}
const erpDir = path.join(cmsRoot, "artifacts", "erp");
const publicCms = path.join(root, "public", "cms");
const distDir = path.join(erpDir, "dist");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...options.env },
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (process.env.SKIP_CMS_INSTALL !== "true") {
  console.log("Installing CMS dependencies...");
  run("pnpm", ["install", "--no-frozen-lockfile"], {
    cwd: cmsRoot,
    env: { CI: "true" },
  });
}

console.log("Building CMS ERP at /cms...");
run("pnpm", ["run", "build"], {
  cwd: erpDir,
  env: {
    BASE_PATH: "/cms/",
    NODE_ENV: "production",
    // Avoid picking up the parent Next.js PostCSS/Tailwind v3 config.
    INIT_CWD: erpDir,
  },
});

console.log("Copying CMS build to public/cms...");
await rm(publicCms, { recursive: true, force: true });
await mkdir(publicCms, { recursive: true });
await cp(distDir, publicCms, { recursive: true });

console.log("Applying CMS menu/report patches...");
run("node", ["scripts/patch-cms-menu-reports.mjs"]);
run("node", ["scripts/patch-cms-phases-123.mjs"]);
run("node", ["scripts/patch-cms-sync-ux.mjs"]);
run("node", ["scripts/patch-cms-improvements.mjs"]);

console.log("CMS build complete: public/cms");
