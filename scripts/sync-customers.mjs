import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const CUSTOMER_RECORDS_KEY = "customer_records";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!databaseUrl) {
  console.error("Thiếu SUPABASE_DATABASE_URL hoặc DATABASE_URL.");
  process.exit(1);
}
if (!supabaseUrl || !serviceKey) {
  console.error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const { data, error } = await supabase
  .from("site_settings")
  .select("value")
  .eq("key", CUSTOMER_RECORDS_KEY)
  .maybeSingle();

if (error) {
  console.error("Không đọc được customer_records:", error.message);
  process.exit(1);
}

const records = Array.isArray(data?.value?.entries) ? data.value.entries : [];
if (records.length === 0) {
  console.log("Không có khách hàng để đồng bộ.");
  process.exit(0);
}

const { autoSyncCustomersToCms } = await import("../lib/cms-customer-auto-sync.ts");
const outcome = await autoSyncCustomersToCms(records);

console.log(JSON.stringify(outcome, null, 2));
if (outcome.status === "error") process.exit(1);
