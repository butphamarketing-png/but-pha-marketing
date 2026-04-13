import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function getGreeting(): { text: string; emoji: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return {
    text: "Chào buổi sáng! Bắt đầu ngày mới với chiến lược marketing đột phá nhé!",
    emoji: "☀️",
  };
  if (h >= 11 && h < 13) return {
    text: "Giờ nghỉ trưa rồi! Tranh thủ tìm hiểu gói dịch vụ phù hợp cho doanh nghiệp bạn.",
    emoji: "🌤️",
  };
  if (h >= 13 && h < 17) return {
    text: "Buổi chiều năng suất! Hãy để Bứt Phá Marketing giúp bạn tăng trưởng doanh số hôm nay.",
    emoji: "💼",
  };
  if (h >= 17 && h < 21) return {
    text: "Buổi tối rảnh rỗi? Xem ngay báo giá dịch vụ — đặt lịch tư vấn miễn phí chỉ mất 2 phút!",
    emoji: "🌙",
  };
  return {
    text: "Đang thức khuya tìm kiếm giải pháp marketing? Chúng tôi trực 24/7 để hỗ trợ bạn!",
    emoji: "🌟",
  };
}

function getDayMessage(): string | null {
  const day = new Date().getDay();
  const msgs: Record<number, string> = {
    1: "Đầu tuần mới, hãy khởi động chiến dịch mới!",
    5: "Cuối tuần rồi — booking tư vấn để chuẩn bị cho tuần tới!",
    6: "Thứ 7 vẫn làm việc — đội ngũ chúng tôi sẵn sàng hỗ trợ bạn!",
    0: "Chủ nhật vẫn có thể liên hệ tư vấn — chúng tôi không nghỉ!",
  };
  return msgs[day] || null;
}

export function DynamicGreeting({ color }: { color: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const { text, emoji } = getGreeting();
  const dayMsg = getDayMessage();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const displayText = dayMsg ? dayMsg : text;

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
          style={{ background: `linear-gradient(90deg, ${color}dd, ${color}aa)` }}
        >
          <span className="flex items-center gap-2">
            <span className="text-base">{emoji}</span>
            <span>{displayText}</span>
          </span>
          <button onClick={() => setDismissed(true)} className="flex-shrink-0 opacity-70 hover:opacity-100">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

