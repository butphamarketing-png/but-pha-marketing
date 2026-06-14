"use client";

import { useReducedMotion } from "framer-motion";

type SectionWaveDividerProps = {
  from: string;
  to: string;
  className?: string;
};

export function SectionWaveDivider({ from, to, className = "" }: SectionWaveDividerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className={`relative -mt-px h-8 w-full bg-gradient-to-b ${className}`}
        style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`relative -mt-px h-8 w-full overflow-hidden leading-[0] md:h-10 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-full w-full">
        <rect width="1440" height="40" fill={from} />
        <path
          fill={to}
          d="M0,24 C360,36 720,12 1080,24 C1260,30 1350,18 1440,24 L1440,40 L0,40 Z"
        />
      </svg>
    </div>
  );
}
