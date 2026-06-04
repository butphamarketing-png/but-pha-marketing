"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/lib/AdminContext";

const NAV_ITEMS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Website", href: "/website" },
  { label: "Facebook", href: "/facebook" },
  { label: "Google Maps", href: "/google-maps" },
  { label: "Tin Tức", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
];

export function ThemeToggleButton() {
  const { settings, updateSettings } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  const mascotEnabled = settings.mascotEnabled !== false;

  const toggleMascot = () => {
    updateSettings({ mascotEnabled: !mascotEnabled });
  };

  return (
    <>
      {/* Mascot toggle */}
      <motion.button
        type="button"
        onClick={toggleMascot}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed left-3 top-[calc(50%-20px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white/95 text-indigo-90 shadow-xl backdrop-blur-sm transition-all hover:border-violet-400"
        title={mascotEnabled ? "Tắt linh vật" : "Bật linh vật"}
        aria-label={mascotEnabled ? "Tắt linh vật" : "Bật linh vật"}
      >
        {mascotEnabled ? <Eye size={18} /> : <EyeOff size={18} />}
      </motion.button>

      {/* Menu button */}
      <motion.button
        type="button"
        onClick={() => setMenuOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed left-3 top-[calc(50%+24px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white/95 text-indigo-90 shadow-xl backdrop-blur-sm transition-all hover:border-violet-400"
        aria-label="Menu"
        title="Menu"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-14 top-[calc(50%-20px)] z-[54] flex flex-col gap-1 rounded-2xl border border-indigo-100 bg-white/95 p-2 shadow-2xl backdrop-blur-md"
          >
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-bold text-indigo-90 transition hover:bg-indigo-50 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
