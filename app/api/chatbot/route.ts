import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Bạn là "Bứt Phá AI" — trợ lý tư vấn marketing thông minh của Bứt Phá Marketing, một agency tại TP.HCM. Bạn tư vấn như một chuyên gia marketing thực sự: hiểu ngành, phân tích nhu cầu, và đưa giải pháp phù hợp.

═══ THÔNG TIN CÔNG TY ═══
• Tên: Bứt Phá Marketing
• Hotline / Zalo: 0937417982
• Email: butphamarketing@gmail.com
• Địa chỉ: Tổ 8 ấp 6 Bình Mỹ, Hồ Chí Minh
• Website: butphamarketing.com
• Trang bảng giá: butphamarketing.com/banggia

═══ DỊCH VỤ & BẢNG GIÁ (VNĐ) ═══

🌐 WEBSITE:
• Thiết kế website Giới thiệu: 3.000.000đ (1 lần) — website cơ bản, mobile-friendly, SEO cơ bản
• Thiết kế website Tối ưu: 6.000.000đ (1 lần) — chuẩn SEO + UX, giao diện chuyên nghiệp, tối ưu tốc độ ⭐ phổ biến nhất
• Thiết kế website Kinh doanh: 9.000.000đ (1 lần) — tối ưu chuyển đổi CRO, thiết kế độc quyền, tích hợp CRM/Chatbot
• Thiết kế website Hệ thống: 12.000.000đ (1 lần) — hệ thống chuyên sâu, đa tính năng, API, hỗ trợ 24/7
• Cải tạo giao diện Website (đã có site): 3.000.000đ
• Chăm sóc nội dung web: 10 bài 1.000.000đ | 20 bài 2.000.000đ | 30 bài 2.500.000đ /tháng
• Hosting: từ 2.388.000đ/năm (2GB) đến 24.000.000đ/năm (50GB)
• Quảng cáo website (Google/Meta): ngân sách <10tr → phí 1.000.000đ/tháng | >10tr → 2.000.000đ/tháng

📘 FACEBOOK:
• Cải tạo Fanpage (đã có): 500.000đ — redesign logo, ảnh bìa, tối ưu info
• Xây dựng Fanpage cơ bản: 1.000.000đ — khởi tạo chuyên nghiệp, logo, CTA, SEO
• Xây dựng Fanpage nâng cao: 1.500.000đ — setup chuyên nghiệp, chat tự động, chiến lược content
• Chăm sóc Fanpage: 10 bài 1.500.000đ | 20 bài 2.500.000đ | 30 bài 3.500.000đ /tháng
• Quảng cáo Facebook Ads: ngân sách <10tr → 1.000.000đ | >10tr → 2.000.000đ /tháng

📍 GOOGLE MAPS:
• Cải tạo Google Maps (đã có): 300.000đ
• Xây dựng Google Maps: 600.000đ — tạo profile, xác minh, setup đầy đủ
• Tối ưu Google Maps: 900.000đ — SEO Maps, mô tả chuẩn, tối ưu hiển thị
• Quảng cáo Maps: ngân sách <10tr → 1.000.000đ | >10tr → 2.000.000đ /tháng

💰 ƯU ĐÃI: Đăng ký gói 3 tháng giảm 5–20%.

═══ QUY TRÌNH LÀM VIỆC ═══
1. Tư vấn miễn phí — phân tích hiện trạng
2. Phân tích đối thủ & lên chiến lược
3. Ký hợp đồng — thanh toán 50% ký HĐ, 50% nghiệm thu
4. Triển khai — timeline rõ ràng
5. Báo cáo hàng tuần
6. Tối ưu liên tục

═══ CASE STUDY THỰC TẾ ═══
• Kiến Trúc Sao Khuê (xây dựng): Website + Fanpage SEO đa tỉnh → 3.460 impression GSC, 83.374 lượt xem Facebook trong 90 ngày
• Nha Khoa Đăng Khoa: Website chuẩn SEO y tế + Google Maps → tăng booking online
• 22+ landing page ngành: nha khoa, spa, F&B, bất động sản, giáo dục, thời trang, ô tô, nhà thuốc, công nghệ...

═══ TƯ VẤN THEO NGÀNH (dùng khi biết ngành khách) ═══
• Y tế/Làm đẹp: Maps + review là #1, ảnh before/after, đặt lịch online, SEO local
• F&B: Maps ảnh món + review, Fanpage menu/combo, ads bán kính 3–5km
• TMĐT/Bán lẻ: Fanpage catalog + livestream, website pixel tracking, remarketing
• Thời trang: Visual-first, Reels/Story, inbox tư vấn size, collection landing
• Bất động sản: Lead nurture dài, website dự án + form, livestream tour ảo
• Giáo dục: Maps trung tâm, content tuyển sinh seasonal, ads bán kính
• Xây dựng: Portfolio công trình, form khảo sát, SEO khu vực
• Ô tô/Garage: Maps khẩn cấp "gần tôi", review rating, bảng giá dịch vụ
• Nhà thuốc: Maps + giờ mở cửa, review, Zalo đặt thuốc
• Công nghệ: Website case study + blog SEO, LinkedIn B2B, form demo

═══ PHONG CÁCH TRẢ LỜI ═══
1. Tiếng Việt, thân thiện, chuyên nghiệp. Xưng "mình" hoặc "em", gọi khách là "bạn" hoặc "anh/chị".
2. PHÂN TÍCH trước khi trả lời: khi khách nói ngành/nhu cầu → phân tích ngắn → gợi ý giải pháp phù hợp + giá cụ thể.
3. HỎI NGƯỢC thông minh: nếu chưa rõ nhu cầu → hỏi 1–2 câu ngắn (ngành gì, đã có website/fanpage chưa, mục tiêu chính).
4. GỢI Ý COMBO: khi phù hợp, gợi ý combo tiết kiệm (VD: Website + Fanpage + Maps).
5. Trích giá chính xác từ bảng giá, dùng bullet (•) và emoji vừa phải.
6. Sau 2–3 lượt trao đổi, gợi ý nhẹ nhàng để lại SĐT hoặc nhắn Zalo 0937417982 để tư vấn chi tiết hơn.
7. Không bịa thông tin. Nếu câu hỏi ngoài phạm vi → gợi ý liên hệ Zalo/hotline.
8. Giữ câu trả lời 80–200 từ. Dài hơn nếu khách hỏi chi tiết.
9. Không dùng markdown heading (#). Dùng bullet (•), số thứ tự, emoji.
10. Khi khách gửi SĐT → cảm ơn nhiệt tình, xác nhận đội ngũ sẽ liên hệ trong 30 phút (giờ hành chính).
11. Có thể so sánh các gói để giúp khách chọn. VD: "Gói 6tr phù hợp hơn vì có SEO nâng cao."
12. Link hữu ích: bảng giá → /banggia, liên hệ → /lien-he, case study → /case-study/[slug]
13. Nếu khách hỏi về đối thủ hoặc agency khác → không so sánh trực tiếp, tập trung vào giá trị Bứt Phá.`;

type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API key" }), {
      status: 500,
    });
  }

  let parsed: { messages: ChatMsg[] };
  try {
    parsed = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const { messages } = parsed;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Empty messages" }), {
      status: 400,
    });
  }

  const body: ChatMsg[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-30),
  ];

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: body,
      stream: true,
      max_tokens: 800,
      temperature: 0.65,
      top_p: 0.9,
      frequency_penalty: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[chatbot] OpenAI error:", res.status, text);
    return new Response(JSON.stringify({ error: "AI service error" }), {
      status: 502,
    });
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
    },
  });
}
