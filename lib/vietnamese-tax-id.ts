export type TaxIdValidation = {
  valid: boolean;
  normalized: string;
  error?: string;
  type?: "enterprise" | "personal" | "branch";
};

export function normalizeTaxId(raw: string): string {
  return raw.replace(/\D/g, "");
}

function validateEnterpriseChecksum(mst10: string): boolean {
  if (mst10.length !== 10 || !/^\d{10}$/.test(mst10)) return false;
  const weights = [31, 29, 23, 19, 17, 13, 7, 5, 3];
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += Number(mst10[i]) * weights[i];
  }
  const remainder = sum % 11;
  const check = remainder < 2 ? remainder : 11 - remainder;
  return check === Number(mst10[9]);
}

export function validateVietnameseTaxId(raw: string | null | undefined): TaxIdValidation {
  const normalized = normalizeTaxId(raw ?? "");
  if (!normalized) {
    return { valid: false, normalized, error: "MST trống" };
  }

  if (normalized.length === 12) {
    return { valid: true, normalized, type: "personal" };
  }

  if (normalized.length === 13) {
    const base = normalized.slice(0, 10);
    if (!validateEnterpriseChecksum(base)) {
      return { valid: false, normalized, error: "MST chi nhánh không hợp lệ (checksum)" };
    }
    return { valid: true, normalized, type: "branch" };
  }

  if (normalized.length === 10) {
    if (!validateEnterpriseChecksum(normalized)) {
      return { valid: false, normalized, error: "MST doanh nghiệp không hợp lệ (checksum)" };
    }
    return { valid: true, normalized, type: "enterprise" };
  }

  return {
    valid: false,
    normalized,
    error: "MST phải có 10, 12 hoặc 13 chữ số",
  };
}

export function requiresTaxIdForInvoice(vatRate: number, taxId?: string | null): boolean {
  if (vatRate <= 0) return false;
  return Boolean(taxId?.trim()) || vatRate > 0;
}

export function assertInvoiceTaxId(
  vatRate: number,
  taxId: string | null | undefined,
  buyerName: string,
): TaxIdValidation | null {
  if (vatRate <= 0) return null;

  const validation = validateVietnameseTaxId(taxId);
  if (!validation.valid) {
    return validation;
  }

  if (!buyerName.trim()) {
    return { valid: false, normalized: validation.normalized, error: "Tên đơn vị mua hàng trống" };
  }

  return validation;
}
