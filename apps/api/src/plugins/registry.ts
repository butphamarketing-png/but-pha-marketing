export interface PluginDef {
  key: string;
  name: string;
  description: string;
  category: "AI" | "SEO" | "SYSTEM";
  isCore?: boolean;
  dependencies: string[];
}

export const PLUGIN_REGISTRY: PluginDef[] = [
  {
    key: "ai_content",
    name: "AI Content Writer",
    description: "Tự động tạo nội dung nháp, gợi ý ý tưởng bài viết và tối ưu giọng văn theo thương hiệu.",
    category: "AI",
    isCore: true,
    dependencies: [],
  },
  {
    key: "seo_analyzer",
    name: "SEO Analyzer",
    description: "Đánh giá SEO realtime, gợi ý tối ưu hóa từ khóa, cấu trúc bài viết.",
    category: "SEO",
    dependencies: [],
  },
  {
    key: "internal_link",
    name: "Internal Linking",
    description: "Tự động gợi ý liên kết nội bộ thông minh để tăng thứ hạng.",
    category: "SEO",
    dependencies: [],
  },
  {
    key: "ai_refresh",
    name: "AI Refresh",
    description: "Phân tích SERP, làm mới bài viết tụt hạng.",
    category: "AI",
    dependencies: ["seo_analyzer"],
  },
  {
    key: "rank_tracker",
    name: "Rank Tracker",
    description: "Theo dõi thứ hạng từ khóa tự động hàng ngày.",
    category: "SEO",
    dependencies: [],
  },
  {
    key: "content_pro",
    name: "Content Opportunity PRO",
    description: "Khám phá từ khóa tiềm năng, phân tích đối thủ và phát hiện khoảng trống nội dung.",
    category: "SEO",
    dependencies: ["ai_content"],
  }
];
