"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";

const query = "I feel overwhelmed by everything";
const routes = ["Make space", "Reduce the noise", "Ask for support"];

export default function HowItWorksTimeline() {
  const root = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const target = root.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: 0.24 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { const frame = requestAnimationFrame(() => setTyped(query)); return () => cancelAnimationFrame(frame); }
    let position = 0;
    const timer = window.setInterval(() => { position += 1; setTyped(query.slice(0, position)); if (position >= query.length) window.clearInterval(timer); }, 24);
    return () => window.clearInterval(timer);
  }, [started]);

  useEffect(() => {
    const target = root.current;
    if (!target) return;
    let frame = 0;
    const update = () => {
      const bounds = target.getBoundingClientRect();
      const view = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (view * 0.72 - bounds.top) / Math.max(bounds.height, 1)));
      setActive(Math.min(3, Math.floor(progress * 4)));
      setParallax(Math.round((view * 0.5 - bounds.top) * 0.025));
      frame = 0;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); cancelAnimationFrame(frame); };
  }, []);

  return <section ref={root} id="how-it-works-timeline" aria-labelledby="how-it-works-title" data-ready={started} style={{ "--timeline-parallax": `${parallax}px` } as React.CSSProperties} className="timeline-journey relative overflow-hidden border border-[#d8dfe9] bg-[#fbfcff] px-5 py-8 sm:px-8 sm:py-10">
    <div aria-hidden="true" className="timeline-atmosphere absolute inset-0"><div className="timeline-grid absolute inset-0" /><div className="timeline-mesh absolute inset-0" /><div className="timeline-particle left-[12%] top-[20%]" /><div className="timeline-particle left-[31%] top-[66%] [animation-delay:-2s]" /><div className="timeline-particle left-[53%] top-[16%] [animation-delay:-4s]" /><div className="timeline-particle left-[76%] top-[64%] [animation-delay:-1s]" /><div className="timeline-particle left-[91%] top-[26%] [animation-delay:-3s]" /></div>
    <div className="relative z-10 flex flex-col gap-4 border-b border-[#dfe4ed] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e55b2d]">How ProblemFirst works</p><h2 id="how-it-works-title" className="mt-3 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-.06em] text-[#142033] sm:text-4xl">A clearer path, from the first sentence to the next useful move.</h2></div><p className="max-w-[230px] text-xs leading-5 text-[#68717d]">Four connected moments. You stay in control of the pace.</p></div>
    <div className="relative z-10 mt-9"><div aria-hidden="true" className="timeline-line absolute left-[5%] right-[5%] top-8 hidden h-px bg-[#cdd6e5] lg:block"><span className="block h-full origin-left bg-[#3857e8]" /><i className="timeline-node absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#e55b2d]" /></div><ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">{[0, 1, 2, 3].map((step) => <JourneyStep key={step} step={step} active={active === step} typed={typed} />)}</ol></div>
  </section>;
}

function JourneyStep({ step, active, typed }: { step: number; active: boolean; typed: string }) {
  const content = [
    <><p className="timeline-step-label">01 / Describe</p><StepIcon name="search" /><h3>Put the real problem into words.</h3><div className="timeline-query"><span>{typed || " "}</span><i /></div><p className="timeline-step-note">No templates. No need to translate what life feels like.</p></>,
    <><p className="timeline-step-label">02 / Understand</p><StepIcon name="sparkle" /><h3>See the pattern beneath it.</h3><div className="timeline-tags"><span>Mind &amp; energy</span><span>Workload</span><span>Recovery</span></div><p className="timeline-step-note">Relevant signals arrive one at a time, so the situation stays readable.</p></>,
    <><p className="timeline-step-label">03 / Explore</p><StepIcon name="arrow" /><h3>Consider a few useful paths.</h3><div className="timeline-routes">{routes.map((route, index) => <span key={route}><b>0{index + 1}</b>{route}</span>)}</div><p className="timeline-step-note">Different routes, made specific to the moment you described.</p></>,
    <><p className="timeline-step-label">04 / Move forward</p><StepIcon name="check" /><h3>Leave with one next move.</h3><div className="timeline-success"><span className="timeline-check"><Icon name="check" className="size-4" /></span><p>A next step you can make yours.</p></div><p className="timeline-step-note">The aim is momentum, not a perfect answer.</p></>,
  ][step];
  return <li data-active={active} style={{ "--step-index": step } as React.CSSProperties} className="timeline-step relative px-0 py-0 lg:px-3"><div className="timeline-step-inner relative min-h-[285px] border border-[#dce2eb] bg-white/80 p-5 backdrop-blur-[2px] sm:p-6"><span aria-hidden="true" className="timeline-progress-number">0{step + 1}</span>{content}</div></li>;
}

function StepIcon({ name }: { name: "search" | "sparkle" | "arrow" | "check" }) { return <span className="timeline-icon mt-9 grid size-11 place-items-center border border-[#c9d4f4] bg-[#eef1ff] text-[#3857e8]"><Icon name={name} className="size-5" /></span>; }
