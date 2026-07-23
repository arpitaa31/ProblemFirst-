import type { Metadata } from "next";
import Link from "next/link";
import Background from "@/components/background";
import { Icon } from "@/components/icon";
import { CountUp, MotionReveal } from "@/components/motion-reveal";
import ProblemMarquee from "@/components/problem-marquee";
import SiteHeader from "@/components/site-header";
import { problems } from "@/lib/problem-library";

export const metadata: Metadata = { title: "Signals" };

export default function TrendingPage() {
  return <main className="page-enter min-h-screen"><Background mode="trending" /><SiteHeader /><section className="mx-auto max-w-[1180px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
    <div className="grid gap-10 border-b-2 border-[#142033] pb-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#3857e8]">ProblemFirst signals</p><h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.94] tracking-[-.075em] text-[#142033] sm:text-6xl">The things people are trying to work through.</h1><p className="mt-6 max-w-xl text-[15px] leading-7 text-[#68717d]">A view of common starting points—not a scorecard for anyone’s life. Use the patterns to find a question that feels close to your own.</p></div><div className="border border-[#cfd5df] bg-white p-6 shadow-[8px_8px_0_#dce3ff]"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#75809b]">This week’s most common area</p><div className="mt-8 flex items-end justify-between"><div><p className="text-3xl font-bold tracking-[-.06em]">Mind &amp; energy</p><p className="mt-2 text-sm text-[#68717d]">Rest, focus, and overwhelm</p></div><span className="border border-[#b7c3f6] bg-[#eef1ff] px-2 py-1 text-[11px] font-bold text-[#3857e8]">01</span></div><div className="mt-8 flex h-10 items-end gap-1.5" aria-label="Interest increased over the week">{[30, 45, 38, 60, 52, 76, 92].map((height, index) => <span key={index} style={{ height: `${height}%` }} className="flex-1 origin-bottom bg-[#3857e8] transition-transform duration-500 hover:scale-y-110" />)}</div><p className="mt-3 text-[11px] font-semibold text-[#75809b]"><CountUp value={68} suffix="%" /> of current prompts touch mind and energy</p></div></div>
    <MotionReveal className="mt-12"><div className="flex items-end justify-between border-b border-[#dfe2e6] pb-5"><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#e55b2d]">Common starting points</p><h2 className="mt-3 text-3xl font-bold tracking-[-.055em] text-[#142033]">Where people begin.</h2></div><Link href="/categories" className="link-sweep hidden text-sm font-bold text-[#3857e8] sm:block">Browse library →</Link></div><ProblemMarquee problems={problems} /></MotionReveal>
    <MotionReveal className="mt-16" variant="fade"><div className="flex flex-col gap-4 border-t-2 border-[#142033] pt-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-2xl font-bold tracking-[-.05em]">Your question does not need to be trending to matter.</p><p className="mt-2 text-sm text-[#68717d]">Start with the version that is true for you.</p></div><Link href="/" className="pressable inline-flex w-fit items-center gap-2 bg-[#142033] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#3857e8]">Ask your question <Icon name="arrow" className="size-4" /></Link></div></MotionReveal>
  </section></main>;
}
