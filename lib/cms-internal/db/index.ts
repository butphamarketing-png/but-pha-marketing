import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

type CmsDatabase = NodePgDatabase<typeof schema>;

let pool: pg.Pool | null = null;
let database: CmsDatabase | null = null;

function getConnectionString(): string {
  const url = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing SUPABASE_DATABASE_URL or DATABASE_URL for CMS database.");
  }
  return url;
}

export function getCmsDb(): CmsDatabase {
  if (!database) {
    const url = getConnectionString();
    pool = new Pool({
      connectionString: url,
      ssl: url.includes("supabase.com") ? { rejectUnauthorized: false } : undefined,
      max: process.env.VERCEL ? 1 : 5,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 20_000,
    });
    database = drizzle(pool, { schema });
  }
  return database;
}

export const db = new Proxy({} as CmsDatabase, {
  get(_target, prop) {
    const real = getCmsDb();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});

export * from "./schema";
