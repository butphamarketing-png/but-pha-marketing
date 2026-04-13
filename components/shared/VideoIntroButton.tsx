"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useAdmin } from "@/lib/AdminContext";

function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "");
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&mute=0&rel=0`;
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&rel=0`;
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return `${parsed.origin}${parsed.pathname}?autoplay=1&mute=0&rel=0`;
      }
    }
  } catch {
    return url;
  }
  return url;
}

export function VideoIntroButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useAdmin();
  const videoUrl = settings.media.home?.videoUrl?.trim();
  const iframeSrc = videoUrl ? getYoutubeEmbedUrl(videoUrl) : "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Đóng video giới thiệu"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              >
                <X size={20} />
              </button>

              <div className="aspect-video w-full bg-black">
                <iframe
                  title="Video giới thiệu Bứt Phá Marketing"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="space-y-2 p-5 text-white">
                <h2 className="text-xl font-bold">Video giới thiệu Bứt Phá Marketing</h2>
                <p className="text-sm text-gray-300">
                  Xem ngay để hiểu rõ hơn về giải pháp tăng trưởng doanh thu và chiến lược marketing của chúng tôi.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-2xl shadow-purple-500/30 ring-1 ring-white/10"
      >
        <Play size={24} className="drop-shadow-lg" />
      </motion.button>
    </>
  );
}
