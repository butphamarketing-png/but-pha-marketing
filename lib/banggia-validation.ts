/** Kiểm tra form gate /banggia */

export function isValidBanggiaName(value: string): boolean {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return words.length >= 2;
}

/** 10 số, bắt đầu 03 / 05 / 07 / 08 / 09 */
export function isValidBanggiaPhone(value: string): boolean {
  return /^0(3|5|7|8|9)\d{8}$/.test(normalizeBanggiaPhone(value));
}

/**
 * Chuẩn hóa SĐT VN:
 * - Bỏ khoảng trắng, dấu "-"
 * - +84xxxxxxxxx → 0xxxxxxxxx
 * - 84xxxxxxxxx → 0xxxxxxxxx
 * - Chỉ giữ số, tối đa 10 ký tự
 */
export function normalizeBanggiaPhone(value: string): string {
  let digits = value.trim().replace(/[\s-]/g, "");

  if (digits.startsWith("+84")) {
    digits = `0${digits.slice(3)}`;
  } else if (digits.startsWith("84") && digits.length > 2) {
    digits = `0${digits.slice(2)}`;
  }

  return digits.replace(/\D/g, "").slice(0, 10);
}

/** Dùng khi người dùng đang gõ — cho phép tạm thời có "+" hoặc "84" đầu */
export function sanitizeBanggiaPhoneInput(value: string): string {
  const hasPlusPrefix = value.trim().startsWith("+");
  const normalized = normalizeBanggiaPhone(value);

  if (hasPlusPrefix && normalized.length < 10) {
    const raw = value.trim().replace(/[\s-]/g, "");
    if (raw.startsWith("+84")) {
      const tail = raw.slice(3).replace(/\D/g, "").slice(0, 9);
      return tail ? `0${tail}` : "+84";
    }
    if (raw.startsWith("+") && !raw.startsWith("+84")) {
      return raw.replace(/[^\d+]/g, "").slice(0, 12);
    }
  }

  return normalized;
}
