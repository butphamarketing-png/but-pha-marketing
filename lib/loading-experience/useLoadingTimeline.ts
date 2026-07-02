"use client";

import { useEffect, useState } from "react";
import {
  LOADING_DURATION_MS,
  LOADING_REDUCED_DURATION_MS,
  clamp01,
} from "@/lib/loading-experience/timeline";

export function useLoadingTimeline(reducedMotion: boolean, active = true) {
  const duration = reducedMotion ? LOADING_REDUCED_DURATION_MS : LOADING_DURATION_MS;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    setElapsed(0);
    const startedAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const next = now - startedAt;
      setElapsed(next);

      if (next >= duration) return;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reducedMotion, active]);

  return {
    elapsed,
    duration,
    progress: clamp01(elapsed / duration),
  };
}
