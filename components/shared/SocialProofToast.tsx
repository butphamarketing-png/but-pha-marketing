"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";

type ProofItem = {
  id: number;
  name: string;
  service: string;
  minutesAgo: number;
};

const NAMES = [
  "Anh Minh",
  "Chị Lan",
  "Anh Hùng",
  "Chị Mai",
  "Anh Tuấn",
  "Chị Hương",
  "Anh Khang",
  "Chị Trang",
  "Anh Nam",
];

const SERVICES = [
  "Facebook Ads",
  "TikTok Ads",
  "Gói Website Pro",
  "Google Maps SEO",
  "Gói Chăm Sóc Fanpage",
  "Zalo Marketing",
  "Instagram Marketing",
];

const AUTO_HIDE_MS = 7000;
const INTERVAL_MS = 5 * 60 * 1000;

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function SocialProofToast() {
  const [items, setItems] = useState<ProofItem[]>([]);
  const idRef = useRef(0);
  const timeoutRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const removeItem = (id: number) => {
      setItems(prev => prev.filter(item => item.id !== id));
      const timer = timeoutRef.current[id];
      if (timer) {
        window.clearTimeout(timer);
        delete timeoutRef.current[id];
      }
    };

    const pushBatch = (count: number, isFirst = false) => {
      const created: ProofItem[] = [];
      for (let i = 0; i < count; i += 1) {
        idRef.current += 1;
        created.push({
          id: idRef.current,
          name: randomFrom(NAMES),
          service: randomFrom(SERVICES),
          minutesAgo: isFirst ? 5 : Math.floor(Math.random() * 14) + 2,
        });
      }

      setItems(prev => [...created, ...prev].slice(0, 3));

      created.forEach(item => {
        timeoutRef.current[item.id] = window.setTimeout(() => removeItem(item.id), AUTO_HIDE_MS);
      });
    };

    const initialTimer = window.setTimeout(() => pushBatch(1, true), 1000);
    const intervalTimer = window.setInterval(() => pushBatch(2), INTERVAL_MS);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(intervalTimer);
      Object.values(timeoutRef.current).forEach(timer => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[95] flex w-[340px] flex-col gap-3">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: 10 }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/65 p-4 text-sm shadow-xl backdrop-blur-md"
          >
            <Avatar className="h-10 w-10 border border-purple-500/30">
              <AvatarFallback className="bg-purple-900/50 text-purple-200">
                {item.name.split(" ")[1]?.[0] ?? "K"}
              </AvatarFallback>
            </Avatar>
            <p className="flex-1 text-gray-200">
              {item.name} vừa đăng ký dịch vụ {item.service} cách đây {item.minutesAgo} phút
            </p>
            <button
              onClick={() => setItems(prev => prev.filter(p => p.id !== item.id))}
              className="text-gray-400 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

