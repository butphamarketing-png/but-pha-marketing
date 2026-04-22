"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  strength: number;
};

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = {
      x: 0,
      y: 0,
      active: false,
      ripple: 0,
    };

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: NodePoint[] = [];

    const createNodes = () => {
      const spacing = 88;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      nodes = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const jitterX = (Math.random() - 0.5) * 14;
          const jitterY = (Math.random() - 0.5) * 14;
          const x = col * spacing + jitterX;
          const y = row * spacing + jitterY;

          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            strength: 0.6 + Math.random() * 0.8,
          });
        }
      }
    };

    const resize = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(nextWidth * DPR);
      canvas.height = Math.round(nextHeight * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      createNodes();

      if (!mouse.active) {
        mouse.x = width * 0.68;
        mouse.y = height * 0.34;
      }
    };

    const drawGrid = (time: number) => {
      const waveCenterY = mouse.active ? mouse.y : height * 0.35;
      const waveStrength = mouse.active ? 10 : 5;
      const horizontalGap = 44;
      const verticalGap = 44;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.06)";

      for (let y = 0; y <= height + horizontalGap; y += horizontalGap) {
        const distance = y - waveCenterY;
        const wave = Math.exp(-(distance * distance) / 60000) * waveStrength;
        const offset = Math.sin(time * 0.0018 + y * 0.016) * wave;

        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y - offset * 0.35);
        ctx.stroke();
      }

      for (let x = 0; x <= width + verticalGap; x += verticalGap) {
        const distance = x - (mouse.active ? mouse.x : width * 0.52);
        const wave = Math.exp(-(distance * distance) / 70000) * (mouse.active ? 7 : 3);
        const offset = Math.sin(time * 0.0015 + x * 0.015) * wave;

        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - offset * 0.35, height);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawLines = () => {
      ctx.save();
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 120) continue;

          const midpointX = (a.x + b.x) / 2;
          const midpointY = (a.y + b.y) / 2;
          const mouseDist = Math.hypot(midpointX - mouse.x, midpointY - mouse.y);
          const lineBoost = mouse.active ? Math.max(0, 1 - mouseDist / 180) : 0;
          const alpha = 0.04 + (1 - dist / 120) * 0.08 + lineBoost * 0.24;

          ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawNodes = () => {
      for (const node of nodes) {
        const mouseDx = mouse.x - node.baseX;
        const mouseDy = mouse.y - node.baseY;
        const mouseDist = Math.hypot(mouseDx, mouseDy) || 1;
        const attractionRadius = 170;
        const attraction = mouse.active ? Math.max(0, 1 - mouseDist / attractionRadius) : 0;

        const floatX = Math.sin(node.phase) * 4 * node.strength;
        const floatY = Math.cos(node.phase * 0.9) * 4 * node.strength;

        node.x += ((node.baseX + floatX + (mouseDx / mouseDist) * attraction * 14) - node.x) * 0.085;
        node.y += ((node.baseY + floatY + (mouseDy / mouseDist) * attraction * 14) - node.y) * 0.085;

        const glow = 0.22 + attraction * 0.78;
        const radius = 1.1 + attraction * 1.7;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${0.03 + glow * 0.08})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = attraction > 0.2 ? "rgba(125, 211, 252, 0.95)" : "rgba(196, 181, 253, 0.7)";
        ctx.fill();
      }
    };

    const drawRipple = () => {
      if (!mouse.active) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 46 + mouse.ripple * 28, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(125, 211, 252, ${0.08 - mouse.ripple * 0.05})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 92 + mouse.ripple * 48, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.06 - mouse.ripple * 0.035})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const tick = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      gradient.addColorStop(0, "rgba(125, 211, 252, 0.08)");
      gradient.addColorStop(0.45, "rgba(168, 85, 247, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      drawGrid(time);
      drawLines();
      drawNodes();
      drawRipple();

      mouse.ripple += (mouse.active ? 1 : 0.25) * 0.02;
      if (mouse.ripple > 1) mouse.ripple = 0;

      for (const node of nodes) {
        node.phase += 0.012;
      }

      raf = window.requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
      mouse.ripple = 0;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />;
}
