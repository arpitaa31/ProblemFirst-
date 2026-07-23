"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = { children: React.ReactNode; className?: string; delay?: number; variant?: "rise" | "fade" | "slide" };

export function MotionReveal({ children, className = "", delay = 0, variant = "rise" }: RevealProps) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = element.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} data-motion-state={visible ? "visible" : "hidden"} data-motion-variant={variant} style={{ transitionDelay: `${delay}ms` }} className={`motion-reveal ${className}`}>{children}</div>;
}

export function CountUp({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const target = useRef<HTMLSpanElement>(null); const [current, setCurrent] = useState(0);
  useEffect(() => {
    const element = target.current;
    if (!element) return;
    let frame = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { frame = requestAnimationFrame(() => setCurrent(value)); return () => cancelAnimationFrame(frame); }
    let started = 0;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; observer.disconnect(); const tick = (time: number) => { if (!started) started = time; const progress = Math.min((time - started) / 800, 1); setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); }, { threshold: 0.7 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={target} className={className}>{current}{suffix}</span>;
}
