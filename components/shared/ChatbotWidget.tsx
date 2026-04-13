import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const QUICK_REPLIES = [
  "Dịch vụ Facebook Marketing",
  "Dịch vụ TikTok Marketing",
  "Xem bảng giá",
  "Liên hệ tư vấn",
  "Quy trình làm việc",
  "Chính sách bảo hành",
];

const BOT_RESPONSES: { pattern: RegExp; reply: string }[] = [
  { pattern: /facebook|fanpage/i, reply: "Dịch vụ Facebook Marketing của chúng tôi bao gồm: Xây dựng Fanpage chuyên nghiệp từ 2.000.000đ/tháng, Chăm sóc nội dung từ 3.500.000đ/tháng, và Quảng cáo Facebook Ads từ 5.000.000đ/tháng. Bạn muốn tư vấn gói nào?" },
  { pattern: /tiktok/i, reply: "Dịch vụ TikTok Marketing gồm: Xây dựng kênh từ 3.000.000đ/tháng, Sản xuất content TikTok từ 5.000.000đ/tháng, TikTok Ads từ 7.000.000đ/tháng. TikTok đang là kênh viral mạnh nhất 2024!" },
  { pattern: /instagram/i, reply: "Instagram Marketing: Xây dựng profile từ 2.500.000đ, Chăm sóc content từ 4.000.000đ/tháng, Ads từ 6.000.000đ/tháng. Phù hợp cho thương hiệu thời trang, làm đẹp, F&B!" },
  { pattern: /zalo/i, reply: "Zalo Marketing: Xây dựng OA từ 1.500.000đ, Quản lý chăm sóc từ 2.500.000đ/tháng, Zalo Ads từ 4.000.000đ/tháng. Zalo có 75 triệu người dùng tại Việt Nam!" },
  { pattern: /google|maps|local|seo/i, reply: "Google Maps/Local SEO: Tạo & tối ưu Google Business từ 2.000.000đ, SEO Local từ 4.000.000đ/tháng. Giúp doanh nghiệp xuất hiện đầu tiên khi khách tìm kiếm!" },
  { pattern: /website|web/i, reply: "Dịch vụ Website: Thiết kế Landing Page từ 3.500.000đ, Website doanh nghiệp từ 7.000.000đ, E-commerce từ 15.000.000đ. SEO website từ 3.000.000đ/tháng!" },
  { pattern: /giá|bảng giá|chi phí|bao nhiêu|phí/i, reply: "Bảng giá dịch vụ dao động từ 1.500.000đ - 20.000.000đ/tháng tùy nền tảng và gói. Đăng ký từ 3 tháng trở lên giảm 5-20%. Bạn muốn tư vấn cụ thể gói nào?" },
  { pattern: /liên hệ|gọi|phone|hotline|tư vấn/i, reply: "Bạn có thể liên hệ trực tiếp: ☎️ Hotline: 0937 417 982 | Zalo cùng số | Email: butphamarketing@gmail.com. Hoặc điền form tư vấn trên trang, đội ngũ sẽ gọi lại trong 30 phút!" },
  { pattern: /quy trình|làm việc|process/i, reply: "Quy trình làm việc: 1️⃣ Tư vấn miễn phí → 2️⃣ Phân tích & lên chiến lược → 3️⃣ Ký hợp đồng → 4️⃣ Triển khai → 5️⃣ Báo cáo hàng tuần → 6️⃣ Tối ưu liên tục. Chúng tôi cam kết minh bạch 100%!" },
  { pattern: /bảo hành|cam kết|guarantee/i, reply: "Chúng tôi cam kết: ✅ Báo cáo kết quả hàng tuần ✅ Hoàn tiền nếu không đạt KPI trong 30 ngày đầu ✅ Không tính phí ẩn ✅ Hỗ trợ 24/7 qua Zalo/Phone. Yên tâm đặt hàng!" },
  { pattern: /xin chào|hello|hi|chào/i, reply: "Xin chào! Tôi là trợ lý AI của Bứt Phá Marketing. Tôi có thể giúp bạn tìm hiểu về các dịch vụ marketing, bảng giá và quy trình làm việc. Bạn cần hỗ trợ gì?" },
  { pattern: /cảm ơn|thank/i, reply: "Cảm ơn bạn đã quan tâm đến Bứt Phá Marketing! Nếu cần tư vấn thêm, đừng ngại nhắn tin nhé. Chúc bạn kinh doanh thuận lợi! 🚀" },
];

const DEFAULT_REPLY = "Cảm ơn bạn đã nhắn tin! Câu hỏi của bạn sẽ được chuyển đến chuyên gia tư vấn. Hoặc liên hệ ngay hotline 0937 417 982 để được hỗ trợ nhanh nhất! 🙏";

function getBotReply(msg: string): string {
  for (const { pattern, reply } of BOT_RESPONSES) {
    if (pattern.test(msg)) return reply;
  }
  return DEFAULT_REPLY;
}

let msgId = 0;

export function ChatbotWidget({ color }: { color: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: msgId++, role: "bot", text: "Xin chào! Tôi là trợ lý AI của Bứt Phá Marketing 🤖\nTôi có thể tư vấn về dịch vụ, bảng giá và hỗ trợ bạn 24/7. Bạn cần hỗ trợ gì?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open, messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: msgId++, role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(m => [...m, { id: msgId++, role: "bot", text: reply }]);
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }, 900 + Math.random() * 500);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 z-[80] flex w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
            style={{ maxHeight: "500px" }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: color }}>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Bứt Phá AI</p>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-300" />
                    <p className="text-xs text-white/80">Đang hoạt động</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 p-4" style={{ maxHeight: "300px" }}>
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "bot" && (
                    <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${color}30` }}>
                      <Bot size={12} style={{ color }} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${m.role === "user" ? "text-white" : "border border-white/10 bg-white/5 text-gray-200"}`}
                    style={m.role === "user" ? { backgroundColor: color } : {}}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {QUICK_REPLIES.slice(0, 3).map(q => (
                  <button key={q} onClick={() => sendMessage(q)} className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-gray-400 hover:border-white/30 hover:text-white transition-colors">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-white/30"
                />
                <button type="submit" className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-white transition-transform hover:scale-110" style={{ backgroundColor: color }}>
                  <Send size={13} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 z-[81] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
        style={{ backgroundColor: color }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {unread > 0 && !open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </motion.button>
    </>
  );
}

