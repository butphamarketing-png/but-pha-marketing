"use client";

import { useEffect, useRef } from "react";
import { easeInOutCubic, sceneProgress } from "@/lib/loading-experience/timeline";
import type { ServiceCardLayout } from "./service-card-layouts";
import { layoutOffsetPx } from "./service-card-layouts";

type ParticlesProps = {
  elapsed: number;
  reducedMotion: boolean;
  layouts: ServiceCardLayout[];
  scene: {
    convergenceStart: number;
    convergenceEnd: number;
    logoRevealStart: number;
  };
};

type Particle = {
  ox: number;
  oy: number;
  size: number;
  delay: number;
  hue: number;
};

const PARTICLE_COUNT = 96;

function spawnParticles(layouts: ServiceCardLayout[]): Particle[] {
  const items: Particle[] = [];
  const perCard = Math.floor(PARTICLE_COUNT / Math.max(layouts.length, 1));

  layouts.forEach((layout) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    const h = typeof window !== "undefined" ? window.innerHeight : 720;
    const origin = layoutOffsetPx(layout, w, h);
    const spreadX = Math.abs(origin.x) * 0.35 + 48;
    const spreadY = Math.abs(origin.y) * 0.35 + 40;

    for (let i = 0; i < perCard; i += 1) {
      items.push({
        ox: origin.x + (Math.random() - 0.5) * spreadX * 2,
        oy: origin.y + (Math.random() - 0.5) * spreadY * 2,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 0.32,
        hue: 250 + Math.random() * 40,
      });
    }
  });

  while (items.length < PARTICLE_COUNT) {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    items.push({
      ox: (Math.random() - 0.5) * w * 0.55,
      oy: (Math.random() - 0.5) * (typeof window !== "undefined" ? window.innerHeight : 720) * 0.45,
      size: 1 + Math.random() * 1.6,
      delay: Math.random() * 0.38,
      hue: 262,
    });
  }

  return items;
}

export function Particles({ elapsed, reducedMotion, layouts, scene }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const elapsedRef = useRef(elapsed);
  elapsedRef.current = elapsed;

  useEffect(() => {
    particlesRef.current = spawnParticles(layouts);
  }, [layouts]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const e = elapsedRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;

      const burstStart = scene.convergenceStart + 320;
      const burstP = sceneProgress(e, burstStart, scene.convergenceEnd - 80);
      const fadeP = sceneProgress(e, scene.logoRevealStart - 100, scene.logoRevealStart + 160);
      const alpha = burstP > 0 ? 1 - easeInOutCubic(fadeP) : 0;

      ctx.clearRect(0, 0, w, h);

      if (alpha > 0.01 && burstP > 0) {
        particlesRef.current?.forEach((p) => {
          const local = Math.max(0, Math.min(1, (burstP - p.delay) / Math.max(1 - p.delay, 0.01)));
          const t = easeInOutCubic(local);
          const x = cx + p.ox * (1 - t);
          const y = cy + p.oy * (1 - t);
          const size = p.size * (1 - t * 0.55);

          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 78%, 72%, ${alpha * (0.32 + (1 - t) * 0.52)})`;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, scene]);

  if (reducedMotion) return null;
  if (elapsed < scene.convergenceStart + 280 || elapsed > scene.logoRevealStart + 200) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    />
  );
}
