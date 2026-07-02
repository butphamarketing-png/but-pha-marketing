"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  COMPANY_NAME_TIMING,
  COMPANY_NAME_TIMING_REDUCED,
  easeOutCubic,
  sceneProgress,
} from "@/lib/loading-experience/timeline";

type CompanyNameProps = {
  elapsed: number;
  scene: {
    companyNameStart: number;
  };
};

export function CompanyName({ elapsed, scene }: CompanyNameProps) {
  const reducedMotion = useReducedMotion();
  const timing = reducedMotion ? COMPANY_NAME_TIMING_REDUCED : COMPANY_NAME_TIMING;

  const line1Start = scene.companyNameStart;
  const line2Start = scene.companyNameStart + timing.line2Delay;

  const line1P = sceneProgress(elapsed, line1Start, line1Start + timing.line1Duration);
  const line2P = sceneProgress(elapsed, line2Start, line2Start + timing.line2Duration);

  if (elapsed < line1Start - 20) return null;

  return (
    <div className="relative z-[3] mt-5 flex flex-col items-center gap-1 sm:mt-6">
      <motion.p
        className="text-lg font-bold tracking-[0.28em] text-white sm:text-xl md:text-2xl"
        style={{
          opacity: easeOutCubic(line1P),
          transform: `translateY(${(1 - easeOutCubic(line1P)) * 14}px)`,
          willChange: "transform, opacity",
        }}
      >
        BỨT PHÁ
      </motion.p>
      <motion.p
        className="text-sm font-semibold tracking-[0.42em] text-violet-200/90 sm:text-base md:text-lg"
        style={{
          opacity: easeOutCubic(line2P),
          transform: `translateY(${(1 - easeOutCubic(line2P)) * 12}px)`,
          willChange: "transform, opacity",
        }}
      >
        MARKETING
      </motion.p>
    </div>
  );
}
