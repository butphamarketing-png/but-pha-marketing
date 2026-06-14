"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion-presets";

type SectionWaveDividerProps = {
  from: string;
  to: string;
  className?: string;
};

export function SectionWaveDivider({ from, to, className = "" }: SectionWaveDividerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className={`relative -mt-px h-10 w-full overflow-hidden leading-[0] md:h-14 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
        <rect width="1440" height="56" fill={from} />
        <path
          fill={to}
          d="M0,32 C180,8 360,48 540,28 C720,8 900,48 1080,28 C1260,8 1350,40 1440,32 L1440,56 L0,56 Z"
        />
      </svg>
    </motion.div>
  );
}
