export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import {
  CUSTOMER_RECORDS_KEY,
  shouldSendRenewalReminder,
  type CustomerRecord,
} from "@/lib/customer-records";
import { sendZaloRenewalReminder } from "@/lib/zalo-reminder";

type StoredPayload = { entries: CustomerRecord[] };

function isAuthorized(request: Request) {
  const expectedSecret = (process.env.CUSTOMER_RENEWAL_CRON_SECRET || process.env.SEO_AUTOMATION_SECRET || "").trim();
  const authHeader = request.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  if (request.headers.get("x-vercel-cron") === "1") return true;
  if (expectedSecret && bearerToken === expectedSecret) return true;
  return false;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", CUSTOMER_RECORDS_KEY)
      .maybeSingle();

    if (error) throw error;

    const entries = Array.isArray((data?.value as StoredPayload | null)?.entries)
      ? (data!.value as StoredPayload).entries
      : [];

    const now = new Date().toISOString();
    const results: Array<{ id: string; fullName: string; sent: boolean; channel: string }> = [];

    for (let i = 0; i < entries.length; i++) {
      const customer = entries[i];
      if (!shouldSendRenewalReminder(customer)) continue;

      const outcome = await sendZaloRenewalReminder(customer);
      if (outcome.sent) {
        entries[i] = {
          ...customer,
          lastRenewalReminderAt: now,
          updatedAt: now,
        };
      }
      results.push({
        id: customer.id,
        fullName: customer.fullName,
        sent: outcome.sent,
        channel: outcome.channel,
      });
    }

    const savedCount = results.filter((item) => item.sent).length;
    if (savedCount > 0) {
      const { error: saveError } = await supabase
        .from("site_settings")
        .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
      if (saveError) throw saveError;
    }

    return NextResponse.json({ ok: true, reminded: results.length, results });
  } catch (error) {
    console.error("[cron/customer-renewals] failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Cron failed" },
      { status: 500 },
    );
  }
}
