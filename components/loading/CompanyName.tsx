"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  COMPANY_NAME_TIMING,
  COMPANY_NAME_TIMING_REDUCED,
  easeOutCubic,
  sceneProgress,
} from "@/lib/loading-experience/timeline";
import { ensureTypeClickAudio, playTypeClickSound } from "@/lib/type-click-sound";

type CompanyNameProps = {
  elapsed: number;
  scene: {
    companyNameStart: number;
  };
};

const LINE1 = "BỨT PHÁ";
const LINE2 = "MARKETING";

function TypeLine({
  text,
  progress,
  className,
  letterSpacing,
}: {
  text: string;
  progress: number;
  className: string;
  letterSpacing: string;
}) {
  const chars = Array.from(text);
  return (
    <p className={className} style={{ letterSpacing }} aria-label={text}>
      {chars.map((ch, i) => {
        const t = chars.length <= 1 ? progress : progress * chars.length - i;
        const p = easeOutCubic(Math.max(0, Math.min(1, t)));
        return (
          <span
            key={`${ch}-${i}`}
            className="inline-block"
            style={{
              opacity: p,
              transform: `translateY(${(1 - p) * 10}px)`,
              willChange: "transform, opacity",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </p>
  );
}

export function CompanyName({ elapsed, scene }: CompanyNameProps) {
  const reducedMotion = useReducedMotion();
  const timing = reducedMotion ? COMPANY_NAME_TIMING_REDUCED : COMPANY_NAME_TIMING;
  const soundedRef = useRef(-1);

  const line1Start = scene.companyNameStart;
  const line2Start = scene.companyNameStart + timing.line2Delay;

  const line1P = sceneProgress(elapsed, line1Start, line1Start + timing.line1Duration);
  const line2P = sceneProgress(elapsed, line2Start, line2Start + timing.line2Duration);

  useEffect(() => {
    ensureTypeClickAudio();
  }, []);

  // Gõ nhanh theo từng chữ khi loading hiện tên
  useEffect(() => {
    if (elapsed < line1Start) {
      soundedRef.current = -1;
      return;
    }

    const line1Chars = Array.from(LINE1).filter((c) => c.trim());
    const line2Chars = Array.from(LINE2).filter((c) => c.trim());
    const step1 = timing.line1Duration / Math.max(line1Chars.length, 1);
    const step2 = timing.line2Duration / Math.max(line2Chars.length, 1);

    let target = -1;
    if (elapsed >= line1Start) {
      const i1 = Math.min(
        line1Chars.length - 1,
        Math.floor((elapsed - line1Start) / step1),
      );
      if (i1 >= 0) target = i1;
    }
    if (elapsed >= line2Start) {
      const i2 = Math.min(
        line2Chars.length - 1,
        Math.floor((elapsed - line2Start) / step2),
      );
      if (i2 >= 0) target = line1Chars.length + i2;
    }

    if (target > soundedRef.current) {
      // Chỉ phát 1 click/frame — tránh burst khi tab bị throttle
      playTypeClickSound(0.065);
      soundedRef.current = target;
    }
  }, [elapsed, line1Start, line2Start, timing.line1Duration, timing.line2Duration]);

  if (elapsed < line1Start - 20) return null;

  return (
    <div className="relative z-[3] mt-5 flex flex-col items-center gap-1 sm:mt-6">
      <TypeLine
        text={LINE1}
        progress={line1P}
        className="text-lg font-bold text-white sm:text-xl md:text-2xl"
        letterSpacing="0.28em"
      />
      <TypeLine
        text={LINE2}
        progress={line2P}
        className="text-sm font-semibold text-violet-200/90 sm:text-base md:text-lg"
        letterSpacing="0.42em"
      />
    </div>
  );
}
