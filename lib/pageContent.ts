export interface PackageOverride {
  name: string;
  price: string;
  period?: "month" | "lifetime";
  popular?: boolean;
  features: string[];
  allFeatures: string[];
  audioText: string;
}

export interface TabOverride {
  label: string;
  packages: PackageOverride[];
}

export interface ComparisonRowOverride {
  label: string;
  cells: string[];
}

export interface ComparisonTabOverride {
  label: string;
  columns: string[];
  rows: ComparisonRowOverride[];
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
  comparisonTabs?: ComparisonTabOverride[];
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

export function buildDefaultComparisonTabs(tabs: TabOverride[]): ComparisonTabOverride[] {
  return tabs.map(tab => {
    const columns = tab.packages.map(pkg => pkg.name);
    const labels = Array.from(new Set(tab.packages.flatMap(pkg => pkg.allFeatures || pkg.features || [])));
    const rows: ComparisonRowOverride[] = labels.map(label => ({
      label,
      cells: tab.packages.map(pkg => (pkg.features || []).includes(label) ? "✓" : "—"),
    }));
    return { label: tab.label, columns, rows };
  });
}

// Cache for content to reduce API calls
const contentCache = new Map<string, { data: ContentOverride | null; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds cache

export async function getContent(platform: string): Promise<ContentOverride | null> {
  if (typeof window === "undefined") return null;
  
  // Check cache first
  const cached = contentCache.get(platform);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  try {
    const res = await fetch(`/api/content?platform=${encodeURIComponent(platform)}`);
    if (!res.ok) throw new Error("Failed to fetch content");
    
    const data = await res.json();
    const content = data.content as ContentOverride | null;
    
    // Update cache
    contentCache.set(platform, { data: content, timestamp: Date.now() });
    
    return content;
  } catch (error) {
    console.warn("API content fetch failed, falling back to localStorage", error);
    
    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(`bpm_content_${platform}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}

export async function saveContent(platform: string, content: ContentOverride): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, content }),
    });
    
    if (!res.ok) throw new Error("Failed to save content");
    
    // Update cache
    contentCache.set(platform, { data: content, timestamp: Date.now() });
    
    // Also save to localStorage as backup
    localStorage.setItem(`bpm_content_${platform}`, JSON.stringify(content));
    
    return true;
  } catch (error) {
    console.error("API save failed, falling back to localStorage", error);
    
    // Fallback to localStorage
    localStorage.setItem(`bpm_content_${platform}`, JSON.stringify(content));
    return true;
  }
}

export function getContentSync(platform: string): ContentOverride | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`bpm_content_${platform}`);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

export function saveContentSync(platform: string, content: ContentOverride) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`bpm_content_${platform}`, JSON.stringify(content));
  }
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