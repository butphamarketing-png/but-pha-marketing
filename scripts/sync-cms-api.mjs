import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cmsRoot = path.join(root, "Asset-Tracker-extracted", "Asset-Tracker (1)", "Asset-Tracker");
const outRoot = path.join(root, "lib", "cms-internal");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(src, dest, transform) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      await copyDir(srcPath, destPath, transform);
    } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) {
      let content = await fs.readFile(srcPath, "utf8");
      if (transform) content = transform(content, srcPath);
      await fs.writeFile(destPath, content);
    }
  }
}

function transformSchema(content) {
  if (!content.includes('pgTable("') && !content.includes("erpSchema.table(")) return content;
  let out = content
    .split("\n")
    .filter((line) =>
      !line.includes("createInsertSchema") &&
      !line.includes("drizzle-zod") &&
      !line.match(/^import.*from "zod"/) &&
      !line.match(/insert\w+Schema/) &&
      !line.match(/z\.infer/) &&
      !line.match(/^export type Insert/),
    )
    .join("\n");
  if (!out.includes("pgSchema") && out.includes('pgTable("')) {
    out = out.replace(
      /from "drizzle-orm\/pg-core";/,
      'from "drizzle-orm/pg-core";\nimport { erpSchema } from "./erp-schema";',
    );
    out = out.replace(/pgTable\(/g, "erpSchema.table(");
  }
  return out;
}

function transformRoutes(content) {
  return content
    .replace(/@workspace\/db/g, "@/lib/cms-internal/db")
    .replace(/@workspace\/api-zod/g, "@/lib/cms-internal/api-zod")
    .replace(/req\.log\.error\(err\)/g, "console.error(err)");
}

async function main() {
  if (!(await exists(cmsRoot))) {
    console.error("CMS source not found:", cmsRoot);
    process.exit(1);
  }

  await fs.rm(outRoot, { recursive: true, force: true });
  await fs.mkdir(path.join(outRoot, "db"), { recursive: true });
  await fs.mkdir(path.join(outRoot, "api"), { recursive: true });

  await fs.mkdir(path.join(outRoot, "db", "schema"), { recursive: true });
  await fs.writeFile(
    path.join(outRoot, "db", "schema", "erp-schema.ts"),
    `import { pgSchema } from "drizzle-orm/pg-core";\nexport const erpSchema = pgSchema("erp");\n`,
  );

  await copyDir(
    path.join(cmsRoot, "lib", "db", "src", "schema"),
    path.join(outRoot, "db", "schema"),
    transformSchema,
  );

  await fs.writeFile(
    path.join(outRoot, "db", "index.ts"),
    `import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let database: ReturnType<typeof drizzle> | null = null;

export function getCmsDb() {
  const url = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing SUPABASE_DATABASE_URL or DATABASE_URL for CMS database.");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      ssl: url.includes("supabase.com") ? { rejectUnauthorized: false } : undefined,
      max: 5,
    });
    database = drizzle(pool, { schema });
  }
  return database;
}

export * from "./schema";
`,
  );

  await copyDir(
    path.join(cmsRoot, "lib", "api-zod", "src", "generated"),
    path.join(outRoot, "api-zod", "generated"),
  );

  await fs.writeFile(
    path.join(outRoot, "api-zod", "index.ts"),
    'export * from "./generated/api";\n',
  );

  await copyDir(
    path.join(cmsRoot, "artifacts", "api-server", "src", "routes"),
    path.join(outRoot, "api", "routes"),
    transformRoutes,
  );
  await fs.rm(path.join(outRoot, "api", "routes", "auth.ts"), { force: true });

  await copyDir(
    path.join(cmsRoot, "artifacts", "api-server", "src", "lib"),
    path.join(outRoot, "api", "lib"),
    (content) => content.replace(/@workspace\/db/g, "@/lib/cms-internal/db"),
  );

  const loggerContent = `import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(process.env.NODE_ENV === "production" ? {} : { transport: { target: "pino-pretty" } }),
});
`;
  await fs.writeFile(path.join(outRoot, "api", "lib", "logger.ts"), loggerContent);

  const appContent = `import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
export default app;
`;

  const routesIndex = await fs.readFile(
    path.join(cmsRoot, "artifacts", "api-server", "src", "routes", "index.ts"),
    "utf8",
  );
  await fs.writeFile(path.join(outRoot, "api", "routes", "index.ts"), transformRoutes(routesIndex));

  await fs.writeFile(path.join(outRoot, "api", "app.ts"), appContent);

  console.log("Synced CMS API to lib/cms-internal/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
