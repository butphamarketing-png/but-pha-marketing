"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { formatPriceVnd } from "@/lib/service-pricing";

export function CountUpPrice({ value, enabled = true }: { value: number; enabled?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(enabled ? 0 : value);

  useEffect(() => {
    if (!enabled || !inView) return;

    const duration = 550;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatPriceVnd(enabled && inView ? display : value)}
    </span>
  );
}
