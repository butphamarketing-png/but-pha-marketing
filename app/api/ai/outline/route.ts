import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();
  
  // Mock AI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return NextResponse.json({
    h1: title,
    structure: [
      { level: 2, text: "Giới thiệu về " + title },
      { level: 2, text: "Tại sao nên chọn dịch vụ của chúng tôi" },
      { level: 3, text: "Kinh nghiệm thực chiến" },
      { level: 3, text: "Đội ngũ chuyên gia" },
      { level: 2, text: "Quy trình triển khai " + title },
      { level: 2, text: "Bảng giá tham khảo" },
      { level: 2, text: "Kết luận" },
    ],
    keywords: ["marketing thực chiến", "tối ưu chuyển đổi", "chi phí thấp", "hiệu quả cao"]
  });
}
