"use client";

import { motion } from "framer-motion";

export function AnimatedCheckmark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className} aria-hidden>
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 27l8 8 16-18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
