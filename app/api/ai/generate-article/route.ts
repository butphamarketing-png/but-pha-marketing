import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { outline } = await req.json();
  
  // Mock AI delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  const content = outline.map((item: any) => {
    return `<h${item.level}>${item.text}</h${item.level}><p>Đây là nội dung chi tiết được tạo tự động bởi AI cho phần "${item.text}". Nội dung này được tối ưu hóa SEO với các từ khóa mục tiêu và cung cấp giá trị thực tiễn cho người đọc. Chúng tôi cam kết mang lại giải pháp marketing tốt nhất cho doanh nghiệp của bạn.</p>`;
  }).join("");

  return NextResponse.json({
    content,
    wordCount: 1850,
    estimatedTime: "5 phút đọc"
  });
}
