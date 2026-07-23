"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Icon } from "@/components/icon";

export default function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { user, signOutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";
  const close = () => setOpen(false);
  const navLink = `nav-link text-[13px] font-semibold transition ${dark ? "text-white/65 hover:text-white" : "text-[#596473] hover:text-[#142033]"}`;
  return <header className={`relative z-40 border-b backdrop-blur-xl ${dark ? "border-white/10 bg-[#122033]/80" : "border-neutral-200 bg-white/70"}`}>
    <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
      <Link href="/" className="flex items-center" aria-label="ProblemFirst home"><Image src={dark ? "/problemfirst-logo-dark-v2.png" : "/problemfirst-logo-light-v2.png"} alt="ProblemFirst" width={1645} height={371} priority className="hidden w-[155px] sm:block" /><Image src="/problemfirst-icon-v2.png" alt="ProblemFirst" width={563} height={702} priority className="h-9 w-auto sm:hidden" /></Link>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex" aria-label="Main navigation"><Link className={navLink} href="/categories">Explore</Link><Link className={navLink} href="/trending">Signals</Link><Link className={navLink} href="/#how-it-works">How it works</Link></nav>
      <div className="flex items-center gap-3">{user ? <button onClick={() => void signOutUser()} className={`hidden text-[12px] font-semibold sm:block ${dark ? "text-white/65 hover:text-white" : "text-[#596473] hover:text-[#142033]"}`}>{user.displayName?.split(" ")[0] || "Account"} · Sign out</button> : <Link href="/auth" className={`hidden text-[12px] font-semibold sm:block ${dark ? "text-white/65 hover:text-white" : "text-[#596473] hover:text-[#142033]"}`}>Sign in</Link>}<Link href="/for-business" className={`pressable hidden px-3.5 py-2 text-[12px] font-bold sm:block ${dark ? "bg-white text-[#142033] hover:bg-[#eef1ff]" : "bg-[#142033] text-white hover:bg-[#3857e8]"}`}>For teams</Link><button onClick={() => setOpen(!open)} className={`grid size-9 place-items-center border lg:hidden ${dark ? "border-white/15 text-white" : "border-[#dfe2e6] text-[#142033]"}`} aria-label="Toggle navigation" aria-expanded={open}><Icon name={open ? "close" : "menu"} className="size-4" /></button></div>
    </div>
    {open && <nav className={`nav-drawer absolute inset-x-0 top-[68px] border-b px-5 py-4 shadow-lg lg:hidden ${dark ? "border-white/10 bg-[#122033]" : "border-[#dfe2e6] bg-[#f7f7f4]"}`}><div className="mx-auto flex max-w-[1180px] flex-col gap-1">{[["/categories", "Explore problems"], ["/trending", "Signals"], ["/#how-it-works", "How it works"], ["/for-business", "For teams"]].map(([href, label]) => <Link key={href} onClick={close} className={`px-2 py-3 text-sm font-semibold ${dark ? "text-white/75" : "text-[#344154]"}`} href={href}>{label}</Link>)}{!user && <Link onClick={close} className={`px-2 py-3 text-sm font-semibold ${dark ? "text-white/75" : "text-[#344154]"}`} href="/auth">Sign in</Link>}</div></nav>}
  </header>;
}
