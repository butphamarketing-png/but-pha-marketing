import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn AI của Bứt Phá Marketing — một agency marketing tại TP.HCM.

THÔNG TIN LIÊN HỆ:
- Hotline / Zalo: 0937417982
- Email: butphamarketing@gmail.com
- Địa chỉ: Tổ 8 ấp 6 Bình Mỹ, Hồ Chí Minh

BẢNG GIÁ DỊCH VỤ (VNĐ):

🌐 WEBSITE:
• Thiết kế website Giới thiệu: 3.000.000đ (1 lần)
• Thiết kế website Tối ưu: 6.000.000đ (1 lần) — phổ biến
• Thiết kế website Kinh doanh: 9.000.000đ (1 lần)
• Thiết kế website Hệ thống: 12.000.000đ (1 lần)
• Cải tạo giao diện Website: 3.000.000đ (1 lần)
• Chăm sóc nội dung web: 10 bài 1.000.000đ | 20 bài 2.000.000đ | 30 bài 2.500.000đ /tháng
• Hosting: từ 2.388.000đ/năm (2GB) đến 24.000.000đ/năm (50GB)
• Quảng cáo website: ngân sách <10tr → phí 1.000.000đ/tháng | >10tr → 2.000.000đ/tháng

📘 FACEBOOK:
• Cải tạo Fanpage: 500.000đ
• Xây dựng Fanpage cơ bản: 1.000.000đ
• Xây dựng Fanpage nâng cao: 1.500.000đ
• Chăm sóc Fanpage: 10 bài 1.500.000đ | 20 bài 2.500.000đ | 30 bài 3.500.000đ /tháng
• Quảng cáo Facebook: ngân sách <10tr → 1.000.000đ | >10tr → 2.000.000đ /tháng

📍 GOOGLE MAPS:
• Cải tạo Google Maps: 300.000đ
• Xây dựng Google Maps: 600.000đ
• Tối ưu Google Maps: 900.000đ
• Quảng cáo Maps: ngân sách <10tr → 1.000.000đ | >10tr → 2.000.000đ /tháng

QUY TRÌNH LÀM VIỆC:
1. Tư vấn miễn phí
2. Phân tích & lên chiến lược
3. Ký hợp đồng — thanh toán 50% ký HĐ, 50% nghiệm thu
4. Triển khai
5. Báo cáo hàng tuần
6. Tối ưu liên tục

HƯỚNG DẪN TRẢ LỜI:
- Trả lời bằng tiếng Việt, thân thiện, ngắn gọn, chuyên nghiệp.
- Khi khách hỏi giá → trích dẫn chính xác từ bảng giá trên, dùng bullet list ngắn.
- Khuyến khích khách để lại SĐT hoặc liên hệ Zalo 0937417982 để được tư vấn chi tiết.
- Không bịa thông tin ngoài bảng giá. Nếu không biết → gợi ý liên hệ Zalo/hotline.
- Giữ câu trả lời dưới 150 từ trừ khi khách hỏi chi tiết.
- Không dùng markdown heading (#). Dùng bullet (•), emoji vừa phải.`;

type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
  }

  const { messages } = (await req.json()) as { messages: ChatMsg[] };

  const body: ChatMsg[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-20),
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: body,
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return new Response(JSON.stringify({ error: text }), { status: res.status });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {}
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
