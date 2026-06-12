import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import {
  WEBSITE_ADS_ASSETS_KEY,
  sanitizeWebsiteAdsAsset,
  type WebsiteAdsAsset,
} from "@/lib/website-ads-assets";

type Payload = { entries: WebsiteAdsAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadWebsiteAdsAssets(): Promise<{ assets: WebsiteAdsAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", WEBSITE_ADS_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as Payload | null)?.entries)) {
      entries = (data?.value as Payload).entries as unknown[];
    } else if (error) {
      console.error("Website ads assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Website ads assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map(sanitizeWebsiteAdsAsset), serverOk };
}

export async function saveWebsiteAdsAssets(assets: WebsiteAdsAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: WEBSITE_ADS_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromWebsiteAds(asset: WebsiteAdsAsset) {
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
    platformLink: asset.campaignLink || entries[index].platformLink,
    updatedAt: now,
  };

  const { error: saveError } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (saveError) throw saveError;
}
