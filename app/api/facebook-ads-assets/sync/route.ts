import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createEmptyCustomer, type CustomerPlatform, type CustomerRecord } from "@/lib/customer-records";
import {
  mergeFacebookAdsFromCustomer,
  sanitizeFacebookAdsAsset,
  facebookAdsAssetFromCustomer,
} from "@/lib/facebook-ads-assets";
import { loadFacebookAdsAssets, saveFacebookAdsAssets } from "@/lib/facebook-ads-assets-store";

function parsePlatform(raw: unknown): CustomerPlatform | null {
  if (raw === "facebook" || raw === "website" || raw === "googlemaps") return raw;
  return null;
}

function sanitizeCustomer(raw: unknown): CustomerRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  if (typeof item.id !== "string" || !item.id.trim()) return null;
  const platform = parsePlatform(item.platform);
  if (!platform) return null;
  const base = createEmptyCustomer();
  return {
    ...base,
    id: item.id,
    contractBase: typeof item.contractBase === "string" ? item.contractBase : base.contractBase,
    contractCode: typeof item.contractCode === "string" ? item.contractCode : base.contractCode,
    fullName: typeof item.fullName === "string" ? item.fullName : "",
    establishmentName: typeof item.establishmentName === "string" ? item.establishmentName : "",
    email: typeof item.email === "string" ? item.email : "",
    platform,
    service: typeof item.service === "string" ? item.service : "",
    subscriptionPackage: typeof item.subscriptionPackage === "string" ? item.subscriptionPackage : "",
    registeredAt:
      typeof item.registeredAt === "string" && item.registeredAt.trim() ? item.registeredAt.slice(0, 10) : null,
    expiresAt:
      typeof item.expiresAt === "string" && item.expiresAt.trim() ? item.expiresAt.slice(0, 10) : null,
    platformLink: typeof item.platformLink === "string" ? item.platformLink : "",
  };
}

export async function POST(request: Request) {
  try {
    if (!isAuthorizedAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const customer = sanitizeCustomer(body?.customer);
    if (!customer) {
      return NextResponse.json({ ok: false, error: "Thiếu dữ liệu khách hàng." }, { status: 400 });
    }
    if (customer.platform !== "facebook" || customer.service !== "quang-cao") {
      return NextResponse.json(
        { ok: false, error: "Chỉ đồng bộ được dịch vụ Facebook → Quảng Cáo." },
        { status: 400 },
      );
    }

    const { assets } = await loadFacebookAdsAssets();
    const index = assets.findIndex((row) => row.customerRecordId === customer.id);
    const asset =
      index >= 0
        ? mergeFacebookAdsFromCustomer(assets[index], customer)
        : facebookAdsAssetFromCustomer(customer);

    const next = [...assets];
    if (index >= 0) next[index] = sanitizeFacebookAdsAsset(asset, index);
    else next.unshift(sanitizeFacebookAdsAsset(asset, next.length));

    await saveFacebookAdsAssets(next);
    const saved = next.find((row) => row.customerRecordId === customer.id) ?? asset;
    return NextResponse.json({ ok: true, asset: saved });
  } catch (error) {
    console.error("POST /api/facebook-ads-assets/sync failed", error);
    return NextResponse.json({ ok: false, error: "Không thể đồng bộ quảng cáo Facebook." }, { status: 500 });
  }
}
