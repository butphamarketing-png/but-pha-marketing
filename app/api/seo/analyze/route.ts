import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, title } = await req.json();
  
  // Mock SEO analysis
  return NextResponse.json({
    score: 68,
    issues: [
      { id: 1, label: "Thiếu từ khóa chính trong H2", status: "critical", fixable: true },
      { id: 2, label: "Độ dài nội dung hơi ngắn (cần 2000+ từ)", status: "warning", fixable: false },
      { id: 3, label: "Thiếu liên kết nội bộ (Internal Link)", status: "critical", fixable: true },
      { id: 4, label: "Heading H3 chưa chứa từ khóa phụ", status: "warning", fixable: true },
    ],
    suggestions: ["quảng cáo facebook", "chiến lược marketing", "tăng doanh thu"]
  });
}
