import {
  syncCustomerContract,
  createEmptyCustomer,
  type CustomerRecord,
  type CustomerPlatform,
  type CustomerStatus,
  type CustomerType,
} from "@/lib/customer-records";
import { normalizeCustomerPaymentMethod } from "@/lib/customer-payment";

export function inferCustomerType(record: Partial<CustomerRecord>): CustomerType {
  if (record.customerType === "company" || record.customerType === "individual") {
    return record.customerType;
  }
  if (record.taxId?.trim() || record.establishmentName?.trim()) {
    return "company";
  }
  return "individual";
}

export function applyCustomerTypeRules(record: CustomerRecord): CustomerRecord {
  const customerType = inferCustomerType(record);

  if (customerType === "individual") {
    return {
      ...record,
      customerType: "individual",
      establishmentName: "",
      taxId: "",
      invoiceAddress: "",
      needsVatInvoice: false,
      contactPerson: record.contactPerson?.trim() || record.fullName.trim(),
    };
  }

  return {
    ...record,
    customerType: "company",
    contactPerson: record.contactPerson?.trim() || record.fullName.trim(),
    needsVatInvoice: record.needsVatInvoice ?? Boolean(record.taxId?.trim()),
  };
}

export function sanitizeCustomerRecord(raw: unknown, index = 0): CustomerRecord {
  const base = createEmptyCustomer(index);
  const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const now = new Date().toISOString();

  const legacyAmount = typeof item.amount === "number" ? item.amount : Number(item.amount) || 0;
  const amountPaid =
    typeof item.amountPaid === "number" ? item.amountPaid : Number(item.amountPaid) || legacyAmount;
  const amountUnpaid =
    typeof item.amountUnpaid === "number" ? item.amountUnpaid : Number(item.amountUnpaid) || 0;

  const platformRaw = typeof item.platform === "string" ? item.platform : base.platform;
  const platform: CustomerPlatform =
    platformRaw === "website" || platformRaw === "googlemaps" || platformRaw === "facebook"
      ? platformRaw
      : "facebook";
  const service = typeof item.service === "string" ? item.service : base.service;

  const contractBaseRaw =
    typeof item.contractBase === "string"
      ? item.contractBase
      : typeof item.contractCode === "string"
        ? item.contractCode
        : "";
  const contractCodeRaw = typeof item.contractCode === "string" ? item.contractCode : "";
  const { contractBase, contractCode } = syncCustomerContract(
    { contractBase: contractBaseRaw, contractCode: contractCodeRaw, platform, service },
    index,
  );

  const statusRaw = typeof item.customerStatus === "string" ? item.customerStatus : base.customerStatus;
  const customerStatus: CustomerStatus =
    statusRaw === "paused" || statusRaw === "stopped" ? statusRaw : "active";

  const customerTypeRaw = typeof item.customerType === "string" ? item.customerType : undefined;

  const draft: CustomerRecord = {
    id: typeof item.id === "string" && item.id.trim() ? item.id : `${Date.now()}-${index}`,
    contractBase,
    contractCode,
    customerType:
      customerTypeRaw === "company" || customerTypeRaw === "individual" ? customerTypeRaw : "individual",
    fullName: typeof item.fullName === "string" ? item.fullName : "",
    contactPerson: typeof item.contactPerson === "string" ? item.contactPerson : "",
    establishmentName: typeof item.establishmentName === "string" ? item.establishmentName : "",
    taxId: typeof item.taxId === "string" ? item.taxId : "",
    invoiceAddress: typeof item.invoiceAddress === "string" ? item.invoiceAddress : "",
    needsVatInvoice: item.needsVatInvoice === true,
    customerStatus,
    internalNotes: typeof item.internalNotes === "string" ? item.internalNotes : "",
    industry: typeof item.industry === "string" ? item.industry : "",
    phone: typeof item.phone === "string" ? item.phone : "",
    email: typeof item.email === "string" ? item.email : "",
    platform,
    service,
    subscriptionPackage: typeof item.subscriptionPackage === "string" ? item.subscriptionPackage : "",
    registeredAt:
      typeof item.registeredAt === "string" && item.registeredAt.trim() ? item.registeredAt.slice(0, 10) : null,
    expiresAt: typeof item.expiresAt === "string" && item.expiresAt.trim() ? item.expiresAt.slice(0, 10) : null,
    platformLink: typeof item.platformLink === "string" ? item.platformLink : "",
    amountPaid,
    amountUnpaid,
    paymentMethod: normalizeCustomerPaymentMethod(item.paymentMethod),
    renewalReminderEnabled: item.renewalReminderEnabled !== false,
    lastRenewalReminderAt:
      typeof item.lastRenewalReminderAt === "string" && item.lastRenewalReminderAt.trim()
        ? item.lastRenewalReminderAt
        : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : now,
    updatedAt: now,
  };

  return applyCustomerTypeRules(draft);
}
