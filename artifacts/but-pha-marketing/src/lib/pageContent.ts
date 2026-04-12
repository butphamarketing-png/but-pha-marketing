export interface PackageOverride {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  allFeatures: string[];
  audioText: string;
}

export interface TabOverride {
  label: string;
  packages: PackageOverride[];
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface ProcessTab {
  label: string;
  steps: ProcessStep[];
}

export interface ContentOverride {
  vision?: string;
  mission?: string;
  responsibility?: string;
  tabs?: TabOverride[];
  stats?: { label: string; value: string }[];
  processTabs?: ProcessTab[];
  faqs?: { q: string; a: string }[];
  beforeAfterBefore?: string;
  beforeAfterAfter?: string;
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: "Tư vấn & Phân tích", desc: "Lắng nghe nhu cầu, phân tích thị trường và đề xuất giải pháp phù hợp nhất." },
  { step: 2, title: "Lên kế hoạch chiến lược", desc: "Xây dựng kế hoạch nội dung chi tiết, chiến lược target và lịch triển khai cụ thể." },
  { step: 3, title: "Triển khai thực hiện", desc: "Thực hiện đúng kế hoạch, quản lý và tương tác với cộng đồng hàng ngày." },
  { step: 4, title: "Theo dõi & Tối ưu", desc: "Theo dõi số liệu thực tế, điều chỉnh chiến lược và tối ưu liên tục." },
  { step: 5, title: "Báo cáo & Tăng trưởng", desc: "Báo cáo minh bạch định kỳ, đề xuất hướng phát triển và mở rộng quy mô." },
];

export function buildDefaultProcessTabs(tabLabels: string[]): ProcessTab[] {
  return tabLabels.map(label => ({
    label,
    steps: DEFAULT_PROCESS_STEPS.map(s => ({ ...s })),
  }));
}

export function getContent(platform: string): ContentOverride | null {
  try {
    const stored = localStorage.getItem(`bpm_content_${platform}`);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

export function saveContent(platform: string, content: ContentOverride) {
  localStorage.setItem(`bpm_content_${platform}`, JSON.stringify(content));
}

export function mergeContent<T extends object>(defaults: T, overrides: Partial<T>): T {
  const result = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      result[key] = overrides[key] as T[typeof key];
    }
  }
  return result;
}
