"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type CopyRippleButtonProps = {
  text: string;
  className?: string;
  iconClassName?: string;
  onCopied?: () => void;
};

export function CopyRippleButton({
  text,
  className = "",
  iconClassName = "h-4 w-4",
  onCopied,
}: CopyRippleButtonProps) {
  const [copied, setCopied] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setRippleKey((key) => key + 1);
      onCopied?.();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`relative overflow-hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-violet-600 ${className}`}
      aria-label="Sao chép giá"
      title={copied ? "Đã sao chép" : "Sao chép giá"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className={`${iconClassName} text-emerald-500`} />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
            <Copy className={iconClassName} />
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        key={rippleKey}
        className="pointer-events-none absolute inset-0 rounded-lg bg-emerald-400/25"
        initial={{ scale: 0.4, opacity: 0.45 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
    </button>
  );
}
