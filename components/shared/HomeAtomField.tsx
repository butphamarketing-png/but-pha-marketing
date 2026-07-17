"use client";

import { useEffect, useRef } from "react";

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseA: number;
  phase: number;
  blink: number;
  hue: number;
};

/** Soft night-sky twinkles — gentle glow, no hard blink. */
export function HomeAtomField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let specks: Speck[] = [];

    const spawn = () => {
      const count = width < 768 ? 50 : 95;
      specks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: 0.55 + Math.random() * 1.6,
        baseA: 0.28 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        // Slow, soft pulse like distant stars
        blink: 0.35 + Math.random() * 0.85,
        hue: Math.random() > 0.45 ? 265 : 250,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const tick = (time: number) => {
      const sec = time * 0.001;
      ctx.clearRect(0, 0, width, height);

      for (const p of specks) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle sine: stay mostly visible, breathe softly
        const wave = 0.5 + 0.5 * Math.sin(sec * p.blink + p.phase);
        const spark = 0.55 + wave * 0.45; // never near-off
        const alpha = p.baseA * spark;
        const core = p.r * (0.85 + wave * 0.25);
        const halo = p.r * (2.4 + wave * 1.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 78%, ${alpha * 0.16})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, core, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 92%, ${alpha * 0.85})`;
        ctx.fill();
      }

      raf = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-75"
      aria-hidden
    />
  );
}
