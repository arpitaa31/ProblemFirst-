"use client";

import Link from "next/link";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { Icon } from "@/components/icon";

export default function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, setUser); }, []);
  const mobileLink = "rounded-xl px-3 py-2.5 text-sm text-[#554f62] transition hover:bg-[#f3effa] hover:text-[#3b314e]";
  return <header className="relative z-40 mx-auto w-full max-w-[1320px] px-4 pt-4 sm:px-6 sm:pt-5"><div className="relative mx-auto flex h-15 max-w-[1180px] items-center justify-between rounded-full border border-white/80 bg-white/65 px-3.5 shadow-[0_12px_42px_rgba(67,54,81,.1),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl sm:px-5">
    <Link href="/" className="group flex items-center gap-2.5 text-[#302b3a]" aria-label="ProblemFirst home"><span className="grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#886ee9,#df83aa)] text-white shadow-[0_0_18px_rgba(139,110,233,.32)] transition group-hover:shadow-[0_0_24px_rgba(139,110,233,.46)]"><Icon name="sparkle" className="size-4" /></span><span className="text-[15px] font-semibold tracking-[-.04em]">ProblemFirst</span></Link>
    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 text-[13px] font-medium text-[#625b6e] lg:flex" aria-label="Main navigation"><Link className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[#4b3b75] hover:shadow-[0_4px_12px_rgba(116,84,181,.12)]" href="/categories">Explore</Link><Link className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[#4b3b75] hover:shadow-[0_4px_12px_rgba(116,84,181,.12)]" href="/trending">Trending now</Link><Link className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[#4b3b75] hover:shadow-[0_4px_12px_rgba(116,84,181,.12)]" href="/#how-it-works">How it works</Link></nav>
    <div className="flex items-center gap-1.5">{user ? <button onClick={() => auth && signOut(auth)} className="hidden rounded-full px-3 py-2 text-xs font-semibold text-[#5b5367] transition hover:bg-white hover:text-[#362b50] sm:block">{user.displayName?.split(" ")[0] || "Account"} · Sign out</button> : <Link href="/auth" className="hidden rounded-full px-3 py-2 text-xs font-semibold text-[#5b5367] transition hover:bg-white hover:text-[#362b50] sm:block">Sign in</Link>}<Link href="/for-business" className="pressable hidden rounded-full bg-[#2d2837] px-3.5 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(42,35,54,.16)] transition hover:bg-[#574477] hover:shadow-[0_7px_18px_rgba(111,77,168,.26)] sm:block">For businesses</Link><button onClick={() => setOpen(!open)} className="grid size-8 place-items-center rounded-full text-[#5d5669] transition hover:bg-white lg:hidden" aria-label="Toggle navigation" aria-expanded={open}><Icon name={open ? "close" : "menu"} className="size-4" /></button></div>
    {open && <nav className="absolute right-0 top-[64px] flex w-52 flex-col rounded-2xl border border-white/90 bg-[#fffcfa]/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"><Link onClick={() => setOpen(false)} className={mobileLink} href="/categories">Explore</Link><Link onClick={() => setOpen(false)} className={mobileLink} href="/trending">Trending now</Link><Link onClick={() => setOpen(false)} className={mobileLink} href="/#how-it-works">How it works</Link><Link onClick={() => setOpen(false)} className={mobileLink} href="/for-business">For businesses</Link>{!user && <Link onClick={() => setOpen(false)} className={mobileLink} href="/auth">Sign in</Link>}</nav>}
  </div></header>;
}
