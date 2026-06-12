import { createServerClient } from "@/lib/supabase";
import { CUSTOMER_RECORDS_KEY, type CustomerRecord } from "@/lib/customer-records";
import {
  GOOGLEMAPS_DESIGN_ASSETS_KEY,
  sanitizeGoogleMapsDesignAsset,
  type GoogleMapsDesignAsset,
} from "@/lib/googlemaps-design-assets";

type Payload = { entries: GoogleMapsDesignAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadGoogleMapsDesignAssets(): Promise<{
  assets: GoogleMapsDesignAsset[];
  serverOk: boolean;
}> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", GOOGLEMAPS_DESIGN_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as Payload | null)?.entries)) {
      entries = (data?.value as Payload).entries as unknown[];
    } else if (error) {
      console.error("Google Maps design assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Google Maps design assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map((row, index) => sanitizeGoogleMapsDesignAsset(row, index)), serverOk };
}

export async function saveGoogleMapsDesignAssets(assets: GoogleMapsDesignAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: GOOGLEMAPS_DESIGN_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerLinkFromGoogleMapsDesign(asset: GoogleMapsDesignAsset) {
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

  entries[index] = {
    ...entries[index],
    platformLink: asset.designLink || entries[index].platformLink,
    updatedAt: new Date().toISOString(),
  };

  const { error: saveError } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (saveError) throw saveError;
}
