import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";

const MESSAGES = [
  "Anh Minh vừa đăng ký dịch vụ Facebook Ads cách đây 5 phút",
  "Chị Lan vừa đăng ký gói Website Pro cách đây 12 phút",
  "Anh Hùng vừa đăng ký TikTok Ads cách đây 2 phút",
  "Chị Mai vừa nhận báo giá gói Zalo OA cách đây 8 phút",
  "Anh Tuấn vừa chốt hợp đồng SEO Local cách đây 15 phút",
  "Chị Hương vừa đăng ký khóa học Content cách đây 20 phút",
  "Anh Khang vừa đăng ký gói Fanpage Premium cách đây 1 phút"
];

export function SocialProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const showToast = () => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    const interval = setInterval(showToast, 180000); // 3 minutes
    // Initial delay
    const initialDelay = setTimeout(showToast, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-6 left-6 z-50 flex max-w-sm items-center gap-3 rounded-lg border border-white/10 bg-black/60 p-4 text-sm shadow-xl backdrop-blur-md"
        >
          <Avatar className="h-10 w-10 border border-purple-500/30">
            <AvatarFallback className="bg-purple-900/50 text-purple-200">
              {message.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <p className="flex-1 text-gray-200">{message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

