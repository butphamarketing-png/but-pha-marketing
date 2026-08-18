"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Bot, Phone, Square, RotateCcw, Sparkles } from "lucide-react";
import { DEFAULT_HOTLINE, getZaloUrl } from "@/lib/site-contact";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  streaming?: boolean;
}

const ZALO_NUMBER = DEFAULT_HOTLINE;
const ZALO_URL = getZaloUrl();

const GREETING =
  "Xin chào! Mình là Bứt Phá AI — trợ lý tư vấn marketing của Bứt Phá Marketing.\n\nBạn đang kinh doanh ngành gì? Mình sẽ phân tích và gợi ý giải pháp phù hợp nhất cho bạn.";

const QUICK_REPLIES = [
  "Báo giá thiết kế website",
  "Facebook Marketing",
  "Google Maps",
  "Tôi muốn tư vấn theo ngành",
];

let idCounter = 0;
function nextId() {
  return `msg-${++idCounter}-${Date.now()}`;
}

async function saveConversation(messages: Message[], phone?: string) {
  try {
    const conversation = messages
      .map((m) => `[${m.role === "bot" ? "AI" : "Khách"}]: ${m.text}`)
      .join("\n");
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chatbot",
        name: "Khách chat AI",
        phone: phone || "Chưa để lại",
        service: "AI Chatbot tư vấn",
        note: conversation.slice(0, 4000),
        platform: "chatbot",
      }),
    });
  } catch {}
}

export function ChatbotWidget({
  color,
  position = "left",
  launcherLabel,
}: {
  color: string;
  position?: "left" | "right";
  launcherLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread] = useState(1);
  const [userPhone, setUserPhone] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userMsgCount = useRef(0);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() =>
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    );
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const scheduleSave = useCallback((msgs: Message[], phone?: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveConversation(msgs, phone), 25000);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const phoneMatch = trimmed.match(/(\d{9,11})/);
      if (phoneMatch) setUserPhone(phoneMatch[1]);

      userMsgCount.current += 1;

      const userMsg: Message = { id: nextId(), role: "user", text: trimmed };
      const botId = nextId();
      const botMsg: Message = { id: botId, role: "bot", text: "", streaming: true };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setInput("");
      setStreaming(true);

      const history = messages
        .filter((m) => !m.streaming && m.text)
        .map((m) => ({
          role: m.role === "bot" ? ("assistant" as const) : ("user" as const),
          content: m.text,
        }));
      history.push({ role: "user", content: trimmed });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) throw new Error("API error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          const snapshot = accumulated;
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, text: snapshot } : m)),
          );
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, streaming: false } : m)),
        );
      } catch (err: unknown) {
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? {
                  ...m,
                  text: isAbort
                    ? m.text
                    : "Xin lỗi, đã có lỗi xảy ra. Bạn có thể liên hệ Zalo 0937417982 để được hỗ trợ nhanh nhất nhé!",
                  streaming: false,
                }
              : m,
          ),
        );
      } finally {
        abortRef.current = null;
        setStreaming(false);
        setMessages((prev) => {
          scheduleSave(prev, phoneMatch?.[1] || userPhone);
          return prev;
        });
        if (!open) setUnread((u) => u + 1);
      }
    },
    [messages, streaming, open, userPhone, scheduleSave],
  );

  const resetChat = useCallback(() => {
    stopStreaming();
    idCounter = 0;
    userMsgCount.current = 0;
    setMessages([{ id: nextId(), role: "bot", text: GREETING }]);
    setUserPhone(undefined);
  }, [stopStreaming]);

  const handleClose = () => {
    setOpen(false);
    stopStreaming();
    if (messages.length > 1) saveConversation(messages, userPhone);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
  };

  const showQuickReplies = userMsgCount.current < 3;

  const isRight = position === "right";
  const panelPositionClass = isRight ? "right-4 sm:right-5" : "left-4";
  const launcherPositionClass = isRight ? "right-4 sm:right-5" : "left-4";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-24 z-[110] flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl sm:w-[400px] ${panelPositionClass}`}
            style={{
              maxHeight: "min(560px, calc(100dvh - 100px))",
              background: "linear-gradient(180deg, #0c0d14 0%, #0a0b10 100%)",
            }}
          >
            {/* Header */}
            <div
              className="relative flex items-center justify-between px-4 py-3"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">Bứt Phá AI</p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <p className="text-[11px] text-white/70">Tư vấn thông minh · 24/7</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Chat Zalo"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt="Zalo"
                    className="h-3.5 w-3.5"
                  />
                </a>
                <a
                  href={`tel:${ZALO_NUMBER}`}
                  title="Gọi ngay"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
                >
                  <Phone size={12} className="text-white" />
                </a>
                <button
                  onClick={resetChat}
                  title="Cuộc hội thoại mới"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
                >
                  <RotateCcw size={12} className="text-white" />
                </button>
                <button
                  onClick={handleClose}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin"
              style={{ maxHeight: "360px" }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && (
                    <div
                      className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}25` }}
                    >
                      <Bot size={12} style={{ color }} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.65] whitespace-pre-line ${
                      m.role === "user"
                        ? "text-white rounded-br-md"
                        : "border border-white/[0.06] bg-white/[0.03] text-gray-200 rounded-bl-md"
                    }`}
                    style={m.role === "user" ? { backgroundColor: color } : {}}
                  >
                    {m.text || (m.streaming ? "" : "...")}
                    {m.streaming && (
                      <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse rounded-full bg-violet-400/80" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies — auto-hide after 3 user messages */}
            {showQuickReplies && (
              <div className="flex flex-wrap gap-1.5 border-t border-white/[0.05] px-3 pt-2.5 pb-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={streaming}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400 transition hover:border-violet-400/30 hover:text-violet-200 disabled:opacity-40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/[0.05] p-3 pt-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={streaming ? "Đang trả lời..." : "Hỏi bất kỳ điều gì..."}
                  disabled={streaming}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/30 disabled:opacity-40"
                />
                {streaming ? (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/70 text-white transition hover:bg-red-500/90"
                    title="Dừng"
                  >
                    <Square size={13} fill="white" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white transition hover:brightness-110 disabled:opacity-30"
                    style={{ backgroundColor: color }}
                  >
                    <Send size={14} />
                  </button>
                )}
              </form>
              <p className="mt-1.5 text-center text-[10px] text-white/20">
                Powered by GPT · Bứt Phá Marketing
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-4 z-[111] flex items-center justify-center rounded-full shadow-[0_4px_24px_rgba(107,33,168,0.4)] ${launcherLabel ? "gap-2 px-4 h-14" : "h-14 w-14"} ${launcherPositionClass}`}
        style={{ backgroundColor: color }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && launcherLabel ? (
          <span className="text-sm font-semibold text-white whitespace-nowrap">
            {launcherLabel}
          </span>
        ) : null}
        {unread > 0 && !open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
            {unread}
          </span>
        )}
      </motion.button>
    </>
  );
}
