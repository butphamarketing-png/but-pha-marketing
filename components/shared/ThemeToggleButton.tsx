"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "preferred-theme";

export function ThemeToggleButton() {
  const [isLight, setIsLight] = useState(false);
  const [ready, setReady] = useState(false);
  const [shake, setShake] = useState(false);

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
    <motion.button
      type="button"
      onClick={() => {
        setIsLight(prev => !prev);
        setShake(false);
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={shake ? { rotate: [0, -8, 8, -6, 6, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-44 right-4 z-[92] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xl backdrop-blur-sm"
      title={isLight ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
      aria-label={isLight ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </motion.button>
  );
}
