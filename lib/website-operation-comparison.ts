/** Ma trận so sánh gói vận hành — đồng bộ thứ tự WEBSITE_OPERATION_PACKAGES */
export const WEBSITE_OPERATION_COMPARE_PACKAGES = [
  "Siêu Nhỏ",
  "Cơ Bản",
  "Tiêu Chuẩn",
  "Nâng Cao",
  "Chuyên Nghiệp",
  "Bứt Phá",
  "Phát Triển",
  "Mở Rộng",
  "Toàn Diện",
] as const;

export type WebsiteOperationCompareCell = "yes" | "no" | string;

export type WebsiteOperationCompareRow = {
  label: string;
  hint?: string;
  values: WebsiteOperationCompareCell[];
};

export const WEBSITE_OPERATION_COMPARE_ROWS: WebsiteOperationCompareRow[] = [
  {
    label: "SSL",
    values: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Sao lưu dữ liệu",
    hint: "Tần suất sao lưu",
    values: ["Tháng", "Tuần", "3 ngày", "Ngày", "Ngày", "Ngày", "Ngày", "12h", "6h"],
  },
  {
    label: "Tốc độ tải",
    hint: "Mức tối ưu theo gói",
    values: ["⭐", "⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
  },
  {
    label: "Bảo mật",
    values: ["⭐", "⭐", "⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
  },
  {
    label: "Giám sát hệ thống",
    values: ["no", "no", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Hỗ trợ kỹ thuật",
    values: ["Cơ bản", "Cơ bản", "Ưu tiên", "Ưu tiên", "Cao", "Cao", "VIP", "VIP", "VIP 24/7"],
  },
  {
    label: "SEO kỹ thuật",
    hint: "Sitemap, meta, GSC — không gồm viết bài",
    values: ["no", "no", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Pixel & Analytics",
    values: ["no", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Thời gian xử lý sự cố",
    hint: "Phản hồi & xử lý ban đầu",
    values: ["72h", "48h", "24h", "24h", "12h", "12h", "6h", "4h", "2h"],
  },
  {
    label: "Phù hợp",
    values: [
      "Landing Page",
      "Website giới thiệu",
      "SEO cơ bản",
      "Chạy Ads",
      "SEO + Ads",
      "Marketing mạnh",
      "Doanh nghiệp tăng trưởng",
      "Doanh nghiệp lớn",
      "Hệ thống trọng điểm",
    ],
  },
];

/** Các tiêu chí hiển thị trên card gói (kiểu Vina Software) */
export const WEBSITE_OPERATION_CARD_ROW_LABELS = [
  "SSL",
  "Sao lưu dữ liệu",
  "Hỗ trợ kỹ thuật",
  "Thời gian xử lý sự cố",
  "Phù hợp",
] as const;

export function formatCompareCell(value: WebsiteOperationCompareCell): string {
  if (value === "yes") return "Có";
  if (value === "no") return "Không";
  return value;
}

export function getCompareFeaturesForPackage(packageIndex: number) {
  return WEBSITE_OPERATION_CARD_ROW_LABELS.map((label) => {
    const row = WEBSITE_OPERATION_COMPARE_ROWS.find((r) => r.label === label);
    const raw = row?.values[packageIndex] ?? "—";
    return { label, value: formatCompareCell(raw) };
  });
}

export function getPackageCompareIndex(packageName: string) {
  return WEBSITE_OPERATION_COMPARE_PACKAGES.findIndex((n) => n === packageName);
}
