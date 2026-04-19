"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return {
      text: "Chào buổi sáng. Bắt đầu ngày mới với chiến lược marketing đột phá nhé!",
      emoji: "☀️",
    };
  }

  if (hour >= 11 && hour < 13) {
    return {
      text: "Giờ nghỉ trưa rồi. Tranh thủ xem nhanh gói dịch vụ phù hợp cho doanh nghiệp của bạn.",
      emoji: "🌤️",
    };
  }

  if (hour >= 13 && hour < 17) {
    return {
      text: "Buổi chiều năng suất. Hãy để Bứt Phá Marketing giúp bạn tăng trưởng doanh số hôm nay.",
      emoji: "💼",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      text: "Buổi tối rảnh rỗi? Xem báo giá dịch vụ và đặt lịch tư vấn miễn phí chỉ mất 2 phút.",
      emoji: "🌙",
    };
  }

  return {
    text: "Đang thức khuya tìm giải pháp marketing? Chúng tôi vẫn trực để hỗ trợ bạn.",
    emoji: "🌟",
  };
}

function getDayMessage(): string | null {
  const day = new Date().getDay();

  const messages: Record<number, string> = {
    1: "Đầu tuần mới, hãy khởi động chiến dịch mới!",
    5: "Cuối tuần rồi, booking tư vấn để chuẩn bị cho tuần tới nhé!",
    6: "Thứ 7 vẫn làm việc, đội ngũ chúng tôi sẵn sàng hỗ trợ bạn!",
    0: "Chủ nhật vẫn có thể liên hệ tư vấn, chúng tôi không nghỉ!",
  };

  return messages[day] || null;
}

export function DynamicGreeting({ color }: { color: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { text, emoji } = getGreeting();
  const dayMessage = getDayMessage();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const displayText = dayMessage || text;
  const tickerText = useMemo(() => `${emoji} ${displayText}     ${emoji} ${displayText}     `, [displayText, emoji]);

  return (
    <AnimatePresence>
      {show && !dismissed ? (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-[35] h-11 overflow-hidden border-b border-white/10 text-white shadow-lg"
          style={{ background: `linear-gradient(90deg, ${color}f0, ${color}cc)` }}
        >
          <div className="relative flex h-full items-center overflow-hidden pr-14">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-20 bg-gradient-to-r from-black/10 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-20 bg-gradient-to-l from-black/10 to-transparent" />

            <motion.div
              initial={{ x: "-35%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              className="whitespace-nowrap pl-4 text-sm font-semibold"
            >
              {tickerText}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Đóng thông báo"
            className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-1.5 opacity-80 transition hover:bg-white/15 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
