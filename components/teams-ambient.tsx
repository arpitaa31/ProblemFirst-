"use client";

import { useEffect, useRef, useState } from "react";

export default function TeamsAmbient({ variant = "page" }: { variant?: "page" | "workflow" }) {
  const layer = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = layer.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => { const bounds = element.getBoundingClientRect(); setOffset(Math.round((window.innerHeight * .5 - bounds.top) * .018)); frame = 0; };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); cancelAnimationFrame(frame); };
  }, []);

  return <div ref={layer} aria-hidden="true" className={`teams-ambient teams-ambient--${variant}`} style={{ "--teams-parallax": `${offset}px` } as React.CSSProperties}>
    <div className="teams-grid" /><div className="teams-mesh" /><div className="teams-blueprint teams-blueprint--top" /><div className="teams-blueprint teams-blueprint--bottom" />
    <svg className="teams-connections" viewBox="0 0 1200 700" preserveAspectRatio="none"><path d="M-20 125H190L270 205H430" /><path d="M785 86h185l72 73h180" /><path d="M-10 535h190l82-75h154" /><path d="M824 590h150l80-72h170" /></svg>
    <span className="teams-node teams-node--one" /><span className="teams-node teams-node--two" /><span className="teams-node teams-node--three" /><span className="teams-node teams-node--four" />
    <span className="teams-flow teams-flow--one" /><span className="teams-flow teams-flow--two" />
    <span className="teams-geometry teams-geometry--square" /><span className="teams-geometry teams-geometry--dot" /><span className="teams-geometry teams-geometry--rectangle" />
    <span className="teams-orbit teams-orbit--one" /><span className="teams-orbit teams-orbit--two" /><span className="teams-ripple" />
  </div>;
}
