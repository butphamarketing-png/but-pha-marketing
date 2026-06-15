import { db, receiptsTable } from "@/lib/cms-internal/db";
import { sql } from "drizzle-orm";

/** Mã PT tiếp theo — dùng max số hiện có, không dùng count (tránh trùng sau khi xóa). */
export async function generateReceiptCode(): Promise<string> {
  const [row] = await db
    .select({
      maxNum: sql<number>`COALESCE(MAX(CAST(SUBSTRING(${receiptsTable.code} FROM 3) AS integer)), 0)`,
    })
    .from(receiptsTable)
    .where(sql`${receiptsTable.code} ~ '^PT[0-9]+$'`);

  const next = (row?.maxNum ?? 0) + 1;
  return `PT${String(next).padStart(4, "0")}`;
}
