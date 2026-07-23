import Link from "next/link";
import { Icon } from "@/components/icon";
import type { ProblemCard } from "@/lib/problem-library";

export default function ProblemMarquee({ problems }: { problems: ProblemCard[] }) {
  const midpoint = Math.ceil(problems.length / 2);
  return <div className="mt-8 space-y-4" aria-label="Common problem starting points">
    <MarqueeRow items={problems.slice(0, midpoint)} direction="left" />
    <MarqueeRow items={problems.slice(midpoint)} direction="right" />
  </div>;
}

function MarqueeRow({ items, direction }: { items: ProblemCard[]; direction: "left" | "right" }) {
  return <div className="problem-marquee-row"><div className={`problem-marquee-track problem-marquee-track--${direction}`}>
    <CardGroup items={items} />
    <CardGroup items={items} duplicate />
  </div></div>;
}

function CardGroup({ items, duplicate = false }: { items: ProblemCard[]; duplicate?: boolean }) {
  return <div className="problem-marquee-group" aria-hidden={duplicate || undefined}>{items.map((problem, index) => <Link href={`/?query=${encodeURIComponent(problem.prompt)}`} className="problem-marquee-card card-lift group" key={`${duplicate ? "duplicate" : "original"}-${problem.title}`} tabIndex={duplicate ? -1 : undefined}><div className="flex items-start justify-between"><span className="grid size-9 place-items-center border border-[#d0d6df] bg-white text-base">{problem.icon}</span><span className="text-xs font-bold text-[#87909b]">0{index + 1}</span></div><p className="mt-9 text-[10px] font-bold uppercase tracking-[.14em] text-[#7b8490]">{problem.category}</p><h3 className="mt-2 text-xl font-bold tracking-[-.045em] text-[#142033]">{problem.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#68717d]">{problem.description}</p><p className="mt-6 flex items-center gap-1 text-sm font-bold text-[#3857e8]">Start here <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-1" /></p></Link>)}</div>;
}
