import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import {
  WEBSITE_CARE_ASSETS_KEY,
  sanitizeWebsiteCareAsset,
  type WebsiteCareAsset,
} from "@/lib/website-care-assets";

type Payload = { entries: WebsiteCareAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadWebsiteCareAssets(): Promise<{ assets: WebsiteCareAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", WEBSITE_CARE_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as Payload | null)?.entries)) {
      entries = (data?.value as Payload).entries as unknown[];
    } else if (error) {
      console.error("Website care assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Website care assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map(sanitizeWebsiteCareAsset), serverOk };
}

export async function saveWebsiteCareAssets(assets: WebsiteCareAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: WEBSITE_CARE_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromWebsiteCare(asset: WebsiteCareAsset) {
  if (!asset.customerRecordId) return;
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();
  if (error) throw error;

  const entries = Array.isArray((data?.value as CustomerPayload | null)?.entries)
    ? ([...(data!.value as CustomerPayload).entries] as CustomerRecord[])
    : [];
  const index = entries.findIndex((row) => row.id === asset.customerRecordId);
  if (index < 0) return;

  const now = new Date().toISOString();
  entries[index] = {
    ...entries[index],
    registeredAt: asset.registerDate,
    expiresAt: asset.expireDate,
    platformLink: asset.siteUrl || entries[index].platformLink,
    updatedAt: now,
  };

  const { error: saveError } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (saveError) throw saveError;
}
