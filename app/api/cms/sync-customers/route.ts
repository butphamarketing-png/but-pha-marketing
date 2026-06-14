import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import { autoSyncCustomersToCms } from "@/lib/cms-customer-auto-sync";
import { canUseCmsDatabase } from "@/lib/cms-express-bridge";

type StoredPayload = { entries: CustomerRecord[] };

export async function POST(request: Request) {
  if (!isAuthorizedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canUseCmsDatabase()) {
    return NextResponse.json(
      { error: "CMS database not configured. Set SUPABASE_DATABASE_URL or DATABASE_URL." },
      { status: 503 },
    );
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", CUSTOMER_RECORDS_KEY)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const payload = (data?.value ?? { entries: [] }) as StoredPayload;
    const records = Array.isArray(payload.entries) ? payload.entries : [];

    if (records.length === 0) {
      return NextResponse.json({ error: "No customer records to sync" }, { status: 400 });
    }

    const outcome = await autoSyncCustomersToCms(records);
    if (outcome.status === "error") {
      return NextResponse.json({ error: outcome.error }, { status: 500 });
    }
    if (outcome.status === "skipped") {
      return NextResponse.json(
        { error: "CMS database not configured. Set SUPABASE_DATABASE_URL or DATABASE_URL." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, synced: records.length, ...outcome.result });
  } catch (error) {
    console.error("POST /api/cms/sync-customers failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 },
    );
  }
}
