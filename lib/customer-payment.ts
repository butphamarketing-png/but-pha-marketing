export type CustomerPaymentMethod = "cash" | "bank_company" | "bank_personal";

export const CUSTOMER_PAYMENT_METHODS: {
  value: CustomerPaymentMethod;
  label: string;
  receiptMethod: "cash" | "transfer";
}[] = [
  { value: "bank_company", label: "Chuyển khoản TK công ty", receiptMethod: "transfer" },
  { value: "cash", label: "Tiền mặt", receiptMethod: "cash" },
  { value: "bank_personal", label: "CK cá nhân / ví chủ", receiptMethod: "transfer" },
];

export function normalizeCustomerPaymentMethod(raw: unknown): CustomerPaymentMethod {
  if (raw === "cash" || raw === "bank_company" || raw === "bank_personal") return raw;
  return "bank_company";
}

/** ERP phiếu thu chỉ có cash | transfer — map từ form KH. */
export function receiptPaymentMethodFromCustomer(method: CustomerPaymentMethod): "cash" | "transfer" {
  const row = CUSTOMER_PAYMENT_METHODS.find((m) => m.value === method);
  return row?.receiptMethod ?? "transfer";
}

export function paymentMethodLabel(method: CustomerPaymentMethod): string {
  return CUSTOMER_PAYMENT_METHODS.find((m) => m.value === method)?.label ?? method;
}
