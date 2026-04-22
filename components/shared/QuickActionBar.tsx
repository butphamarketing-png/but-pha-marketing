"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/AdminContext";

const DISMISS_KEY = "quick-action-dismissed";

export function QuickActionBar() {
  const { settings } = useAdmin();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) {
        setIsVisible(false);
        return;
      }

      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const hotline = settings.hotline || "0937417982";
  const zalo = settings.zalo || hotline;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-around border-t border-white/10 bg-black/80 p-3 backdrop-blur-lg md:hidden"
        >
          <a
            href={`tel:${hotline.replace(/\s/g, "")}`}
            className="flex flex-col items-center gap-1 text-white"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Phone size={22} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Gọi điện</span>
          </a>

          <a
            href={`https://zalo.me/${zalo.replace(/\s/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-white"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg shadow-blue-500/20">
              <MessageCircle size={22} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Zalo</span>
          </a>

          <button
            onClick={() => {
              setIsVisible(false);
              setDismissed(true);
              window.sessionStorage.setItem(DISMISS_KEY, "1");
            }}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <X size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Đóng</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
