import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL is not set. Database connection will fail if queried.");
}

export const pool = new Pool({ 
  connectionString: connectionString || "" 
});
export const db = drizzle(pool, { schema });

export * from "./schema";

