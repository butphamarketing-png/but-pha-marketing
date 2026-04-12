import { useState, useEffect, useRef } from "react";

export function CursorEffect({ color }: { color: string }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef({ x: -200, y: -200 });
  const animRef = useRef<number>(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window;
    if (isTouchDevice.current) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      setHidden(false);
    };
    const onClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 250);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const tick = () => {
      trailRef.current.x += (posRef.current.x - trailRef.current.x) * 0.12;
      trailRef.current.y += (posRef.current.y - trailRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = trailRef.current.x + "px";
        ringRef.current.style.top = trailRef.current.y + "px";
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: clicked ? "16px" : "10px",
          height: clicked ? "16px" : "10px",
          backgroundColor: color,
          opacity: hidden ? 0 : 1,
          transition: "width 0.15s, height 0.15s, opacity 0.2s",
          left: "-200px",
          top: "-200px",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "36px",
          height: "36px",
          borderColor: color,
          opacity: hidden ? 0 : 0.45,
          transition: "opacity 0.3s",
          left: "-200px",
          top: "-200px",
        }}
      />
    </>
  );
}
