import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import {
  GOOGLEMAPS_ADS_ASSETS_KEY,
  sanitizeGoogleMapsAdsAsset,
  type GoogleMapsAdsAsset,
} from "@/lib/googlemaps-ads-assets";

type Payload = { entries: GoogleMapsAdsAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadGoogleMapsAdsAssets(): Promise<{ assets: GoogleMapsAdsAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", GOOGLEMAPS_ADS_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as Payload | null)?.entries)) {
      entries = (data?.value as Payload).entries as unknown[];
    } else if (error) {
      console.error("Google Maps ads assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Google Maps ads assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map(sanitizeGoogleMapsAdsAsset), serverOk };
}

export async function saveGoogleMapsAdsAssets(assets: GoogleMapsAdsAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: GOOGLEMAPS_ADS_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromGoogleMapsAds(asset: GoogleMapsAdsAsset) {
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
