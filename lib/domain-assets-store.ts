import { createServerClient } from "@/lib/supabase";
import {
  CUSTOMER_RECORDS_KEY,
  type CustomerRecord,
} from "@/lib/customer-records";
import {
  DOMAIN_ASSETS_KEY,
  sanitizeDomainAsset,
  type DomainAsset,
} from "@/lib/domain-assets";

type DomainPayload = { entries: DomainAsset[] };
type CustomerPayload = { entries: CustomerRecord[] };

export async function loadDomainAssets(): Promise<{ assets: DomainAsset[]; serverOk: boolean }> {
  const supabase = createServerClient();
  let entries: unknown[] = [];
  let serverOk = true;

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", DOMAIN_ASSETS_KEY)
      .maybeSingle();

    if (!error && Array.isArray((data?.value as DomainPayload | null)?.entries)) {
      entries = (data?.value as DomainPayload).entries as unknown[];
    } else if (error) {
      console.error("Domain assets load failed:", error);
      serverOk = false;
    }
  } catch (error) {
    console.error("Domain assets load error:", error);
    serverOk = false;
  }

  return { assets: entries.map(sanitizeDomainAsset), serverOk };
}

export async function saveDomainAssets(assets: DomainAsset[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: DOMAIN_ASSETS_KEY, value: { entries: assets } }, { onConflict: "key" });
  if (error) throw error;
}

export async function loadCustomerEntries(): Promise<CustomerRecord[]> {
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

export async function saveCustomerEntries(entries: CustomerRecord[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: CUSTOMER_RECORDS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

export async function syncCustomerDatesFromDomain(asset: DomainAsset) {
  if (!asset.customerRecordId) return;
  const entries = await loadCustomerEntries();
  const index = entries.findIndex((row) => row.id === asset.customerRecordId);
  if (index < 0) return;

  const now = new Date().toISOString();
  entries[index] = {
    ...entries[index],
    registeredAt: asset.registerDate,
    expiresAt: asset.expireDate,
    platformLink: asset.domainName || entries[index].platformLink,
    updatedAt: now,
  };
  await saveCustomerEntries(entries);
}
