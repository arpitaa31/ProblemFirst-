"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BrandMark from "@/components/brand-mark";

const ease = [0.16, 1, 0.3, 1] as const;
type IntroPhase = "intro" | "move" | "reveal" | "converge" | "mark" | "exit" | "complete";

function AmbientField({ reduced }: { reduced: boolean | null }) {
  const pointerX = useMotionValue(0); const pointerY = useMotionValue(0);
  const farX = useSpring(useTransform(pointerX, (value) => value * .3), { stiffness: 40, damping: 22 }); const farY = useSpring(useTransform(pointerY, (value) => value * .3), { stiffness: 40, damping: 22 });
  const midX = useSpring(useTransform(pointerX, (value) => value * .65), { stiffness: 40, damping: 22 }); const midY = useSpring(useTransform(pointerY, (value) => value * .65), { stiffness: 40, damping: 22 });
  const nearX = useSpring(pointerX, { stiffness: 40, damping: 22 }); const nearY = useSpring(pointerY, { stiffness: 40, damping: 22 });
  const particles = ["left-[4%] top-[15%]", "left-[11%] top-[27%]", "left-[6%] top-[42%]", "left-[14%] bottom-[24%]", "left-[5%] bottom-[11%]", "left-[21%] top-[10%]", "left-[2%] bottom-[34%]", "left-[24%] bottom-[8%]", "right-[4%] top-[15%]", "right-[11%] top-[27%]", "right-[6%] top-[42%]", "right-[14%] bottom-[24%]", "right-[5%] bottom-[11%]", "right-[21%] top-[10%]", "right-[2%] bottom-[34%]", "right-[24%] bottom-[8%]"];
  const shapes = ["left-[8%] top-[9%] size-4", "left-[18%] top-[20%] size-5 rounded-full", "left-[9%] top-[59%] size-3", "left-[18%] bottom-[16%] size-5 rotate-45", "left-[3%] bottom-[27%] size-4 rounded-full", "left-[26%] bottom-[7%] size-3", "right-[8%] top-[9%] size-5 rotate-45", "right-[18%] top-[20%] size-4 rounded-full", "right-[9%] top-[59%] size-3", "right-[18%] bottom-[16%] size-5", "right-[3%] bottom-[27%] size-4 rounded-full", "right-[26%] bottom-[7%] size-3"];

  useEffect(() => {
    if (reduced) return;
    const move = (event: PointerEvent) => { pointerX.set((event.clientX / window.innerWidth - .5) * 12); pointerY.set((event.clientY / window.innerHeight - .5) * 12); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [pointerX, pointerY, reduced]);

  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <motion.div style={{ x: farX, y: farY }} className="absolute inset-0">
      <motion.div animate={reduced ? { x: 0, y: 0 } : { x: [0, 20, -10, 0], y: [0, -14, 10, 0] }} transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }} className="absolute -left-44 -top-28 size-[33rem] rounded-full bg-[radial-gradient(circle,rgba(56,87,232,.20),transparent_67%)]" />
      <motion.div animate={reduced ? { x: 0, y: 0 } : { x: [0, -18, 11, 0], y: [0, 15, -12, 0] }} transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }} className="absolute -right-44 -bottom-36 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(229,91,45,.16),transparent_68%)]" />
      <div className="absolute left-5 top-5 size-44 border border-[#3857e8]/25 bg-[linear-gradient(rgba(56,87,232,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(56,87,232,.13)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(135deg,#000,transparent_77%)]" />
      <div className="absolute bottom-5 right-5 size-44 border border-[#e55b2d]/20 bg-[linear-gradient(rgba(229,91,45,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(229,91,45,.12)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(315deg,#000,transparent_77%)]" />
    </motion.div>

    <motion.div style={{ x: midX, y: midY }} className="absolute inset-0">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
        {["M0 126h90l45 38h102l58 46h96", "M0 284h74l54-42h115l42 34h96", "M0 676h86l54-48h109l52 42h91", "M0 794h114l45-38h96", "M1440 126h-90l-45 38h-102l-58 46h-96", "M1440 284h-74l-54-42h-115l-42 34h-96", "M1440 676h-86l-54-48h-109l-52 42h-91", "M1440 794h-114l-45-38h-96"].map((path, index) => <motion.path key={path} d={path} stroke={index % 3 === 0 ? "#e55b2d" : "#3857e8"} strokeWidth="1" animate={reduced ? { opacity: .2 } : { opacity: [.13, .32, .16] }} transition={{ duration: 5.5 + index * .7, delay: index * .35, repeat: Infinity, ease: "easeInOut" }} />)}
        {[ [135, 164], [285, 276], [140, 628], [301, 670], [1305, 164], [1155, 276], [1300, 628], [1139, 670] ].map(([cx, cy], index) => <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 2 ? 2.5 : 3.5} fill={index % 3 === 0 ? "#e55b2d" : "#3857e8"} animate={reduced ? { opacity: .35 } : { opacity: [.25, .85, .25], scale: [1, 1.4, 1] }} transition={{ duration: 3.4 + index * .22, delay: index * .3, repeat: Infinity }} />)}
      </svg>
      {particles.map((position, index) => <motion.span key={position} animate={reduced ? { x: 0, y: 0, opacity: .4 } : { x: [0, index % 2 ? -12 : 13, index % 3 ? 5 : -7, 0], y: [0, index % 2 ? 9 : -10, index % 3 ? -7 : 6, 0], opacity: [.25, .95, .35, .25] }} transition={{ duration: 7.5 + index * .42, delay: index * .31, ease: "easeInOut", repeat: Infinity }} className={`absolute size-1.5 rounded-full shadow-[0_0_12px_currentColor] ${index % 3 === 0 ? "bg-[#e55b2d] text-[#e55b2d]" : "bg-[#3857e8] text-[#3857e8]"} ${position}`} />)}
    </motion.div>

    <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
      {shapes.map((position, index) => <motion.span key={position} animate={reduced ? { x: 0, y: 0, rotate: 0 } : { x: [0, index % 2 ? -10 : 11, 0], y: [0, index % 3 ? 8 : -9, 0], rotate: index % 3 === 0 ? [0, index % 2 ? -25 : 25, 0] : 0 }} transition={{ duration: 12 + index * .7, delay: index * .45, ease: "easeInOut", repeat: Infinity }} className={`absolute border border-[#3857e8]/45 opacity-60 ${position} ${index % 4 === 2 ? "before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-[#e55b2d] after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-[#e55b2d] border-0" : index % 4 === 1 ? "border-[#e55b2d]/45" : ""}`} />)}
      {["left-[5.9%] top-[18.3%]", "left-[4.8%] bottom-[20.3%]", "right-[5.9%] top-[18.3%]", "right-[4.8%] bottom-[20.3%]"].map((position, index) => <motion.span key={position} animate={reduced ? { x: 0, opacity: 0 } : { x: index < 2 ? [0, 135, 232] : [0, -135, -232], opacity: [0, 1, 0] }} transition={{ duration: 5.2 + index * .4, delay: index * 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 + index }} className={`absolute size-1.5 rounded-full bg-[#f7f7f4] opacity-0 shadow-[0_0_13px_3px_rgba(103,127,255,.85)] ${position}`} />)}
      <motion.div animate={reduced ? { rotate: 0 } : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute left-[2%] top-[36%] size-16 border border-[#3857e8]/35 opacity-60 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
      <motion.div animate={reduced ? { rotate: 0 } : { rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute right-[2%] top-[38%] size-20 border border-[#e55b2d]/30 opacity-60 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
    </motion.div>
  </div>;
}

export default function InitialLoader({ children }: Readonly<{ children: React.ReactNode }>) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("intro");
  const shouldPlay = true;
  const secondRef = useRef<HTMLSpanElement>(null);
  const [firstOffset, setFirstOffset] = useState(76);

  useLayoutEffect(() => {
    const updateOffset = () => { if (secondRef.current) setFirstOffset((secondRef.current.getBoundingClientRect().width + 18) / 2); };
    updateOffset(); window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const timings = reduceMotion ? [["exit", 120], ["complete", 220]] as const : [["move", 930], ["reveal", 1450], ["converge", 2210], ["mark", 2660], ["exit", 3200], ["complete", 3760]] as const;
    const timers = timings.map(([next, delay]) => window.setTimeout(() => setPhase(next), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  const leaving = phase === "exit" || phase === "complete";
  const titleComplete = phase === "reveal" || phase === "converge" || phase === "mark" || leaving;
  const collapsing = phase === "converge" || phase === "mark" || leaving;
  const showMark = phase === "mark" || leaving;

  return <>
    <motion.div initial={false} animate={shouldPlay && !leaving ? { opacity: .84, scale: .986 } : { opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? .01 : .62, ease }}>{children}</motion.div>
    <AnimatePresence>{shouldPlay && phase !== "complete" && <motion.div aria-label="Loading ProblemFirst" aria-live="polite" role="status" initial={false} animate={leaving ? { opacity: 0, filter: "blur(12px)", scale: 1.018 } : { opacity: 1, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? .01 : .56, ease }} className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#f7f7f4] text-[#142033]">
      <AmbientField reduced={reduceMotion} />
      <div className="relative isolate grid place-items-center" aria-hidden="true">
        <motion.div animate={collapsing ? { opacity: 0, scale: .58, filter: "blur(5px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? .01 : .42, ease }} className="col-start-1 row-start-1 flex items-center text-[clamp(2.8rem,8vw,6.25rem)] font-semibold leading-none tracking-[-.085em]">
          <motion.span initial={{ opacity: 0, y: 16, x: firstOffset }} animate={phase === "intro" ? { opacity: 1, y: 0, x: firstOffset } : collapsing ? { opacity: 1, y: 0, x: 42 } : { opacity: 1, y: 0, x: 0 }} transition={{ duration: reduceMotion ? .01 : phase === "intro" ? .58 : .5, ease }} className="relative z-10 inline-block will-change-transform">Problem</motion.span>
          <span className="relative inline-block overflow-hidden pb-[.08em] pr-[.02em]"><motion.span ref={secondRef} initial={{ x: 34, opacity: 0, clipPath: "inset(0 100% 0 0)" }} animate={titleComplete ? { x: collapsing ? -46 : 0, opacity: 1, clipPath: "inset(0 0% 0 0)" } : { x: 34, opacity: 0, clipPath: "inset(0 100% 0 0)" }} transition={{ duration: reduceMotion ? .01 : .56, ease }} className="inline-block pl-[.18em] will-change-transform">First</motion.span></span>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .62, y: 4 }} animate={showMark ? { opacity: 1, scale: 1.08, y: 0 } : { opacity: 0, scale: .62, y: 4 }} transition={{ duration: reduceMotion ? .01 : .42, ease }} className="relative col-start-1 row-start-1 grid size-24 place-items-center sm:size-28">
          <motion.span initial={false} animate={showMark ? { opacity: .32, scale: 1.2 } : { opacity: 0, scale: .72 }} transition={{ duration: reduceMotion ? .01 : .62, ease }} className="absolute inset-0 rounded-full bg-[#3857e8] blur-2xl" />
          <BrandMark className="relative z-10 size-[72%]" />
        </motion.div>
      </div>
      <span className="sr-only">Loading</span>
    </motion.div>}</AnimatePresence>
  </>;
}
