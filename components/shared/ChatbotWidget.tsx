"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Bot, Phone } from "lucide-react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const ZALO_NUMBER = "0937417982";
const ZALO_URL = `https://zalo.me/${ZALO_NUMBER}`;

const QUICK_REPLIES = [
  "Dịch vụ Facebook Marketing",
  "Thiết kế Website",
  "Google Maps Marketing",
  "Xem bảng giá",
  "Quy trình làm việc",
];

// Đếm số tin nhắn để biết khi nào nên gợi ý để lại SĐT
let msgId = 0;

const BOT_RESPONSES: { pattern: RegExp; reply: string }[] = [
  { pattern: /facebook|fanpage/i, reply: "Dịch vụ Facebook Marketing của chúng tôi:\n• Xây dựng Fanpage: từ 500.000đ\n• Chăm sóc nội dung: 10 bài 1.500.000đ · 20 bài 2.500.000đ · 30 bài 3.500.000đ/tháng\n• Quảng cáo Facebook Ads: từ 1.000.000đ/tháng\n\nBạn muốn tư vấn gói nào?" },
  { pattern: /google|maps|local|seo/i, reply: "Google Maps/Local SEO:\n• Tạo & tối ưu Google Business: từ 2.000.000đ\n• SEO Local: từ 4.000.000đ/tháng\n\nGiúp doanh nghiệp xuất hiện đầu tiên khi khách tìm kiếm!" },
  { pattern: /website|web/i, reply: "Dịch vụ Website:\n• Landing Page: từ 3.500.000đ\n• Website doanh nghiệp: từ 7.000.000đ\n• E-commerce: từ 15.000.000đ\n• SEO website: từ 3.000.000đ/tháng" },
  { pattern: /giá|bảng giá|chi phí|bao nhiêu|phí/i, reply: "Bảng giá dao động từ 2.000.000đ - 20.000.000đ/tháng tùy nền tảng và gói. Đăng ký từ 3 tháng giảm 5-20%.\n\nĐể báo giá chính xác, bạn cho mình biết nhu cầu cụ thể nhé?" },
  { pattern: /quy trình|làm việc|process/i, reply: "Quy trình làm việc:\n1️⃣ Tư vấn miễn phí\n2️⃣ Phân tích & lên chiến lược\n3️⃣ Ký hợp đồng\n4️⃣ Triển khai\n5️⃣ Báo cáo hàng tuần\n6️⃣ Tối ưu liên tục\n\nCam kết minh bạch 100%!" },
  { pattern: /xin chào|hello|hi|chào/i, reply: "Xin chào! Tôi là trợ lý AI của Bứt Phá Marketing 🤖\nTôi có thể tư vấn về dịch vụ, bảng giá và hỗ trợ bạn 24/7. Bạn cần hỗ trợ gì?" },
  { pattern: /cảm ơn|thank/i, reply: "Cảm ơn bạn đã quan tâm đến Bứt Phá Marketing! Chúc bạn kinh doanh thuận lợi! 🚀" },
  { pattern: /(\d{9,11})/i, reply: "Cảm ơn bạn đã để lại số điện thoại! Đội ngũ tư vấn sẽ liên hệ lại trong vòng 30 phút (giờ hành chính). Bạn có thể nhắn thêm nhu cầu cụ thể để được tư vấn nhanh hơn nhé!" },
];

const DEFAULT_REPLY = "Cảm ơn bạn đã nhắn tin! Để được tư vấn chi tiết và nhanh nhất, bạn có thể để lại số điện thoại hoặc kết bạn Zalo với mình nhé 😊";

function getBotReply(msg: string): string {
  for (const { pattern, reply } of BOT_RESPONSES) {
    if (pattern.test(msg)) return reply;
  }
  return DEFAULT_REPLY;
}

// Lưu conversation vào leads API
async function saveConversation(messages: Message[], phone?: string) {
  try {
    const conversation = messages
      .map(m => `[${m.role === "bot" ? "Bot" : "Khách"}]: ${m.text}`)
      .join("\n");
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chatbot",
        name: "Khách chat",
        phone: phone || "Chưa để lại",
        service: "Chatbot tư vấn",
        note: conversation,
        platform: "chatbot",
      }),
    });
  } catch (_) {}
}

export function ChatbotWidget({ color }: { color: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: msgId++, role: "bot", text: "Xin chào! Tôi là trợ lý AI của Bứt Phá Marketing 🤖\nTôi có thể tư vấn về dịch vụ, bảng giá và hỗ trợ bạn 24/7. Bạn cần hỗ trợ gì?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [userPhone, setUserPhone] = useState<string | undefined>();
  const [ctaShown, setCtaShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userMsgCountRef = useRef(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open, messages]);

  // Auto-save conversation sau 30s không hoạt động
  const scheduleSave = (msgs: Message[], phone?: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveConversation(msgs, phone), 30000);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Detect phone number
    const phoneMatch = text.match(/(\d{9,11})/);
    if (phoneMatch) setUserPhone(phoneMatch[1]);

    const userMsg: Message = { id: msgId++, role: "user", text };
    userMsgCountRef.current += 1;
    const newMessages = (prev: Message[]) => [...prev, userMsg];

    setMessages(prev => {
      const updated = [...prev, userMsg];
      scheduleSave(updated, phoneMatch?.[1] || userPhone);
      return updated;
    });
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(text);
      let extraCta = "";

      // Sau 3 tin nhắn user, gợi ý 1 lần để lại SĐT hoặc Zalo (không spam)
      if (userMsgCountRef.current === 3 && !ctaShown && !userPhone) {
        extraCta = `\n\n💬 Để được tư vấn chi tiết hơn, bạn có thể:\n• Để lại số điện thoại ngay tại đây\n• Hoặc kết bạn Zalo: ${ZALO_NUMBER}`;
        setCtaShown(true);
      }

      const botMsg: Message = { id: msgId++, role: "bot", text: reply + extraCta };
      setMessages(prev => {
        const updated = [...prev, botMsg];
        scheduleSave(updated, userPhone);
        return updated;
      });
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }, 800 + Math.random() * 400);
  };

  const handleClose = () => {
    setOpen(false);
    // Lưu ngay khi đóng nếu có tin nhắn
    if (messages.length > 1) saveConversation(messages, userPhone);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
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
            className="fixed bottom-20 right-4 z-[80] flex w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
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
              <div className="flex items-center gap-2">
                <a href={ZALO_URL} target="_blank" rel="noreferrer" title="Chat Zalo ngay"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="h-4 w-4" />
                </a>
                <a href={`tel:${ZALO_NUMBER}`} title="Gọi ngay"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
                  <Phone size={13} className="text-white" />
                </a>
                <button onClick={handleClose} className="text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
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

            {/* Zalo CTA banner - chỉ hiện sau khi ctaShown */}
            {ctaShown && !userPhone && (
              <div className="mx-3 mb-2 flex items-center gap-2 rounded-xl bg-[#0068FF]/20 border border-[#0068FF]/30 px-3 py-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="h-5 w-5 flex-shrink-0" />
                <a href={ZALO_URL} target="_blank" rel="noreferrer" className="text-[11px] text-blue-300 hover:text-blue-200 font-semibold">
                  Kết bạn Zalo {ZALO_NUMBER} để tư vấn nhanh hơn →
                </a>
              </div>
            )}

            {/* Input */}
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
                  placeholder="Nhập câu hỏi hoặc số điện thoại..."
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
        className="fixed bottom-4 right-4 z-[81] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl"
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
