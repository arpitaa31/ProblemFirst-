"use client";

import Link from "next/link";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import BrandMark from "@/components/brand-mark";
import { Icon } from "@/components/icon";

export default function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, setUser); }, []);

  const close = () => setOpen(false);
  const navLink = "nav-link text-[13px] font-semibold text-[#596473] transition hover:text-[#142033]";
  return <header className="relative z-40 border-b border-[#dfe2e6] bg-[#f7f7f4]/95">
    <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
      <Link href="/" className="flex items-center gap-2.5" aria-label="ProblemFirst home"><BrandMark className="size-7" /><span className="text-[15px] font-bold tracking-[-.05em] text-[#142033]">ProblemFirst</span></Link>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex" aria-label="Main navigation">
        <Link className={navLink} href="/categories">Explore</Link><Link className={navLink} href="/trending">Signals</Link><Link className={navLink} href="/#how-it-works">How it works</Link>
      </nav>
      <div className="flex items-center gap-3">
        {user ? <button onClick={() => auth && signOut(auth)} className="hidden text-[12px] font-semibold text-[#596473] hover:text-[#142033] sm:block">{user.displayName?.split(" ")[0] || "Account"} · Sign out</button> : <Link href="/auth" className="hidden text-[12px] font-semibold text-[#596473] hover:text-[#142033] sm:block">Sign in</Link>}
        <Link href="/for-business" className="pressable hidden bg-[#142033] px-3.5 py-2 text-[12px] font-bold text-white hover:bg-[#3857e8] sm:block">For teams</Link>
        <button onClick={() => setOpen(!open)} className="grid size-9 place-items-center border border-[#dfe2e6] text-[#142033] lg:hidden" aria-label="Toggle navigation" aria-expanded={open}><Icon name={open ? "close" : "menu"} className="size-4" /></button>
      </div>
    </div>
    {open && <nav className="nav-drawer absolute inset-x-0 top-[68px] border-b border-[#dfe2e6] bg-[#f7f7f4] px-5 py-4 shadow-lg lg:hidden"><div className="mx-auto flex max-w-[1180px] flex-col gap-1"><Link onClick={close} className="px-2 py-3 text-sm font-semibold text-[#344154]" href="/categories">Explore problems</Link><Link onClick={close} className="px-2 py-3 text-sm font-semibold text-[#344154]" href="/trending">Signals</Link><Link onClick={close} className="px-2 py-3 text-sm font-semibold text-[#344154]" href="/#how-it-works">How it works</Link><Link onClick={close} className="px-2 py-3 text-sm font-semibold text-[#344154]" href="/for-business">For teams</Link>{!user && <Link onClick={close} className="px-2 py-3 text-sm font-semibold text-[#344154]" href="/auth">Sign in</Link>}</div></nav>}
  </header>;
}
