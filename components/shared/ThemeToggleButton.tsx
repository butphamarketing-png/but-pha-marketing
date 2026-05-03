"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

const THEME_KEY = "preferred-theme";

const NAV_ITEMS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Giới Thiệu", href: "/gioi-thieu" },
  { label: "Website", href: "/website" },
  { label: "Facebook", href: "/facebook" },
  { label: "Google Maps", href: "/google-maps" },
  { label: "Tin Tức", href: "/blog" },
  { label: "Liên Hệ", href: "/lien-he" },
  { label: "Lộ Trình Dự Án", href: "/lo-trinh-du-an" },
];

export function ThemeToggleButton() {
  const [isLight, setIsLight] = useState(false);
  const [ready, setReady] = useState(false);
  const [shake, setShake] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const initialLight = savedTheme === "light";
    setIsLight(initialLight);
    document.documentElement.classList.toggle("light", initialLight);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("light", isLight);
    localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
  }, [isLight, ready]);

  useEffect(() => {
    let intervalId: number | undefined;
    const timeout = window.setTimeout(() => {
      setShake(true);
      intervalId = window.setInterval(() => setShake(true), 8000);
    }, 30000);
    return () => {
      window.clearTimeout(timeout);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!shake) return;
    const t = window.setTimeout(() => setShake(false), 700);
    return () => window.clearTimeout(t);
  }, [shake]);

  return (
    <>
      {/* Theme toggle */}
      <motion.button
        type="button"
        onClick={() => { setIsLight(prev => !prev); setShake(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={shake ? { rotate: [0, -8, 8, -6, 6, 0] } : { rotate: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed left-3 top-[calc(50%-20px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-xl backdrop-blur-sm transition-all"
        title={isLight ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
        aria-label={isLight ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
      >
        {isLight ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>

      {/* Menu button */}
      <motion.button
        type="button"
        onClick={() => setMenuOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed left-3 top-[calc(50%+24px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-xl backdrop-blur-sm transition-all"
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
            className="fixed left-14 top-[calc(50%-20px)] z-[54] flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur-md"
          >
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 whitespace-nowrap"
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
