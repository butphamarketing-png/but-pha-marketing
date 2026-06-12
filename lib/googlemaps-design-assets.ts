import {
  getPackageByKey,
  getPackageContractTotal,
  type CustomerRecord,
} from "@/lib/customer-records";

export const GOOGLEMAPS_DESIGN_ASSETS_KEY = "googlemaps_design_assets";

export type GoogleMapsDesignStatus = "unverified" | "in_progress" | "delivered";

export type GoogleMapsDesignAsset = {
  id: string;
  customerRecordId: string;
  contractCode: string;
  customerName: string;
  customerEmail: string;
  designLink: string;
  packageLabel: string;
  sellPrice: number;
  registerDate: string | null;
  expireDate: string | null;
  status: GoogleMapsDesignStatus;
  createdAt: string;
  updatedAt: string;
};

export const GOOGLEMAPS_DESIGN_STATUS_OPTIONS: { key: GoogleMapsDesignStatus; label: string }[] = [
  { key: "unverified", label: "Chưa xác thật" },
  { key: "in_progress", label: "Đang thực hiện" },
  { key: "delivered", label: "Đã bàn giao" },
];

export function googleMapsDesignAssetFromCustomer(customer: CustomerRecord): GoogleMapsDesignAsset {
  const now = new Date().toISOString();
  const sellPrice =
    getPackageContractTotal(customer.platform, customer.service, customer.subscriptionPackage) ?? 0;
  const pkg = getPackageByKey(customer.platform, customer.service, customer.subscriptionPackage);
  let status: GoogleMapsDesignStatus = "unverified";
  if (customer.platformLink.trim()) status = "delivered";
  else if (customer.registeredAt) status = "in_progress";

  return {
    id: `mapsdesign-${customer.id}`,
    customerRecordId: customer.id,
    contractCode: customer.contractCode,
    customerName: customer.fullName || customer.establishmentName,
    customerEmail: customer.email,
    designLink: customer.platformLink.trim(),
    packageLabel: pkg?.label || customer.subscriptionPackage,
    sellPrice,
    registerDate: customer.registeredAt,
    expireDate: null,
    status,
    createdAt: now,
    updatedAt: now,
  };
}

export function mergeGoogleMapsDesignFromCustomer(
  existing: GoogleMapsDesignAsset,
  customer: CustomerRecord,
): GoogleMapsDesignAsset {
  const fromCustomer = googleMapsDesignAssetFromCustomer(customer);
  return {
    ...existing,
    contractCode: fromCustomer.contractCode,
    customerName: fromCustomer.customerName,
    customerEmail: fromCustomer.customerEmail,
    designLink: fromCustomer.designLink || existing.designLink,
    packageLabel: fromCustomer.packageLabel || existing.packageLabel,
    sellPrice: fromCustomer.sellPrice || existing.sellPrice,
    registerDate: fromCustomer.registerDate ?? existing.registerDate,
    updatedAt: new Date().toISOString(),
  };
}

export type GoogleMapsDesignRowTone = "normal";

export function googleMapsDesignRowTone(): GoogleMapsDesignRowTone {
  return "normal";
}

export function sortGoogleMapsDesignAssets(assets: GoogleMapsDesignAsset[]): GoogleMapsDesignAsset[] {
  return [...assets].sort((a, b) => {
    const dateA = a.registerDate || "";
    const dateB = b.registerDate || "";
    return dateB.localeCompare(dateA);
  });
}

export function sanitizeGoogleMapsDesignAsset(raw: unknown, index = 0): GoogleMapsDesignAsset {
  const now = new Date().toISOString();
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const statusRaw = typeof item.status === "string" ? item.status : "unverified";
  const status: GoogleMapsDesignStatus =
    statusRaw === "in_progress" || statusRaw === "delivered" || statusRaw === "unverified"
      ? statusRaw
      : "unverified";

  return {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `mapsdesign-${Date.now()}-${index}`,
    customerRecordId: typeof item.customerRecordId === "string" ? item.customerRecordId : "",
    contractCode: typeof item.contractCode === "string" ? item.contractCode : "",
    customerName: typeof item.customerName === "string" ? item.customerName : "",
    customerEmail: typeof item.customerEmail === "string" ? item.customerEmail : "",
    designLink: typeof item.designLink === "string" ? item.designLink : "",
    packageLabel: typeof item.packageLabel === "string" ? item.packageLabel : "",
    sellPrice: typeof item.sellPrice === "number" ? item.sellPrice : Number(item.sellPrice) || 0,
    registerDate:
      typeof item.registerDate === "string" && item.registerDate.trim()
        ? item.registerDate.slice(0, 10)
        : null,
    expireDate: null,
    status,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: now,
  };
}
