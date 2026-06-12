import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import {
  FACEBOOK_CARE_ASSETS_KEY,
  sanitizeFacebookCareAsset,
  type FacebookCareAsset,
} from "@/lib/facebook-care-assets";

type Payload = { entries: FacebookCareAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadFacebookCareAssets(): Promise<{ assets: FacebookCareAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", FACEBOOK_CARE_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as Payload | null)?.entries)) {
      entries = (data?.value as Payload).entries as unknown[];
    } else if (error) {
      console.error("Facebook care assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Facebook care assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map((row, index) => sanitizeFacebookCareAsset(row, index)), serverOk };
}

export async function saveFacebookCareAssets(assets: FacebookCareAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: FACEBOOK_CARE_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromFacebookCare(asset: FacebookCareAsset) {
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
    platformLink: asset.careLink || entries[index].platformLink,
    updatedAt: now,
  };

  const { error: saveError } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (saveError) throw saveError;
}
