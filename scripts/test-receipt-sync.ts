/**
 * Kiểm tra xóa phiếu thu + đồng bộ khách hàng (chạy: npx tsx --tsconfig tsconfig.json scripts/test-receipt-sync.ts)
 */
import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { db, receiptsTable } from "@/lib/cms-internal/db";
import { eq } from "drizzle-orm";
import { deleteReceiptById } from "@/lib/cms-receipt-delete";
import { syncCustomerRecordsToCms } from "@/lib/cms-customer-sync";
import { sanitizeCustomerRecord } from "@/lib/customer-record-sanitize";
import type { CustomerRecord } from "@/lib/customer-records";

const CUSTOMER_RECORDS_KEY = "customer_records";

async function loadMarketingCustomers(): Promise<CustomerRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();
  if (error) throw error;
  const entries = Array.isArray((data?.value as { entries?: unknown[] })?.entries)
    ? (data!.value as { entries: unknown[] }).entries
    : [];
  return entries.map((entry, index) => sanitizeCustomerRecord(entry, index));
}

async function main() {
  console.log("=== Test receipt delete + customer sync ===\n");

  const receipts = await db.select().from(receiptsTable).orderBy(receiptsTable.id);
  console.log(`Receipts in DB: ${receipts.length}`);
  for (const r of receipts) {
    console.log(`  ${r.code} id=${r.id} amount=${r.amount} customer=${r.customerId}`);
  }

  const total = receipts.reduce((s, r) => s + parseFloat(r.amount ?? "0"), 0);
  console.log(`Total receipts: ${total.toLocaleString("vi-VN")}`);

  console.log("\n--- Sync all marketing customers ---");
  const customers = await loadMarketingCustomers();
  console.log(`Marketing customers: ${customers.length}`);
  for (const c of customers) {
    console.log(`  ${c.fullName}: Đã TT ${c.amountPaid.toLocaleString("vi-VN")}`);
  }

  const sync = await syncCustomerRecordsToCms(customers);
  console.log("Sync result:", JSON.stringify(sync, null, 2));

  const after = await db.select().from(receiptsTable).orderBy(receiptsTable.id);
  console.log(`\nReceipts after sync: ${after.length}`);
  for (const r of after) {
    console.log(`  ${r.code} amount=${r.amount} notes=${r.notes?.slice(0, 40)}`);
  }
  const totalAfter = after.reduce((s, r) => s + parseFloat(r.amount ?? "0"), 0);
  console.log(`Total after sync: ${totalAfter.toLocaleString("vi-VN")}`);

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
