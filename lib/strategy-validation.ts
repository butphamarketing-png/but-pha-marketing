import type { StrategyFormSnapshot } from "./marketing-strategy-profiles";

export type ContactFieldKey = "fullName" | "companyName" | "phone" | "email" | "address";

export function normalizeVnPhone(phone: string) {
  return phone.replace(/[\s.\-()]/g, "");
}

export function validateVnPhone(phone: string) {
  const p = normalizeVnPhone(phone);
  if (!p) return "Vui lòng nhập số điện thoại";
  if (!/^(\+84|84|0)\d{8,10}$/.test(p)) {
    return "SĐT không hợp lệ (VD: 0901234567)";
  }
  return null;
}

export function validateEmail(email: string) {
  const e = email.trim();
  if (!e) return "Vui lòng nhập email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return "Email không hợp lệ";
  return null;
}

export function validateAddress(address: string) {
  const a = address.trim();
  if (!a) return "Vui lòng nhập địa chỉ cơ sở";
  if (a.length < 10) return "Địa chỉ quá ngắn — thêm số nhà, phường, quận";
  return null;
}

export function validateFullName(name: string) {
  const n = name.trim();
  if (!n) return "Vui lòng nhập họ tên";
  if (n.length < 2) return "Họ tên quá ngắn";
  return null;
}

export function validateCompanyName(name: string) {
  const n = name.trim();
  if (!n) return "Vui lòng nhập tên công ty";
  if (n.length < 2) return "Tên công ty quá ngắn";
  return null;
}

export function getContactFieldErrors(form: Pick<StrategyFormSnapshot, ContactFieldKey>) {
  return {
    fullName: validateFullName(form.fullName),
    companyName: validateCompanyName(form.companyName),
    phone: validateVnPhone(form.phone),
    email: validateEmail(form.email),
    address: validateAddress(form.address),
  };
}

export function isContactStepValid(form: Pick<StrategyFormSnapshot, ContactFieldKey>) {
  return Object.values(getContactFieldErrors(form)).every((e) => e === null);
}

export function firstContactError(form: Pick<StrategyFormSnapshot, ContactFieldKey>) {
  return Object.values(getContactFieldErrors(form)).find((e) => e !== null) ?? null;
}
