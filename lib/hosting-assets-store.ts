import { createServerClient } from "@/lib/supabase";
import {
  CUSTOMER_RECORDS_KEY,
  type CustomerRecord,
} from "@/lib/customer-records";
import {
  HOSTING_ASSETS_KEY,
  sanitizeHostingAsset,
  type HostingAsset,
} from "@/lib/hosting-assets";

type HostingPayload = { entries: HostingAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadHostingAssets(): Promise<{ assets: HostingAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", HOSTING_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as HostingPayload | null)?.entries)) {
      entries = (data?.value as HostingPayload).entries as unknown[];
    } else if (error) {
      console.error("Hosting assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Hosting assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map(sanitizeHostingAsset), serverOk };
}

export async function saveHostingAssets(assets: HostingAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: HOSTING_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

async function loadCustomerEntries(): Promise<CustomerRecord[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", CUSTOMER_RECORDS_KEY)
    .maybeSingle();
  if (error) throw error;
  const entries = Array.isArray((data?.value as CustomerPayload | null)?.entries)
    ? (data!.value as CustomerPayload).entries
    : [];
  return entries as CustomerRecord[];
}

async function saveCustomerEntries(entries: CustomerRecord[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromHosting(asset: HostingAsset) {
  if (!asset.customerRecordId) return;
  const entries = await loadCustomerEntries();
  const index = entries.findIndex((row) => row.id === asset.customerRecordId);
  if (index < 0) return;

  const now = new Date().toISOString();
  entries[index] = {
    ...entries[index],
    registeredAt: asset.registerDate,
    expiresAt: asset.expireDate,
    platformLink: asset.hostingName || entries[index].platformLink,
    updatedAt: now,
  };
  await saveCustomerEntries(entries);
}
