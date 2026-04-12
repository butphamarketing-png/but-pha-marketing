import { useState, useEffect, useRef } from "react";

function parseNum(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  const num = parseFloat(match[1].replace(/,/g, ""));
  return { num: isNaN(num) ? 0 : num, suffix: match[2] || "" };
}

export function CountUp({ value, color }: { value: string; color: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { num, suffix } = parseNum(value);

  useEffect(() => {
    if (num === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num, started]);

  useEffect(() => {
    if (!started || num === 0) return;
    const duration = 1800;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + increment, num);
      setCount(current);
      if (current >= num) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, num]);

  const display = num % 1 === 0 ? Math.round(count).toLocaleString("vi-VN") : count.toFixed(1);

  return (
    <span ref={ref} className="text-3xl font-black" style={{ color }}>
      {started ? display : 0}{suffix}
    </span>
  );
}
