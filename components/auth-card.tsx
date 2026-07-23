"use client";

import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import BrandMark from "@/components/brand-mark";
import { Icon } from "@/components/icon";

function returnDestination() {
  const value = new URLSearchParams(window.location.search).get("returnTo");
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default function AuthCard() {
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function continueWithGoogle() { setError(""); if (!auth || !isFirebaseConfigured) { setError("Google sign-in is almost ready. Add the Firebase values from .env.example to .env.local first."); return; } setLoading(true); try { await signInWithPopup(auth, googleProvider); window.location.assign(returnDestination()); } catch { setError("Google sign-in could not open. Please try again."); } finally { setLoading(false); } }
  return <main className="page-enter grid min-h-screen bg-[#f7f7f4] lg:grid-cols-[.9fr_1.1fr]"><section className="hidden bg-[#142033] p-12 text-white lg:flex lg:flex-col lg:justify-between"><Link href="/" className="flex items-center gap-2.5"><BrandMark className="h-6 w-5 object-contain" /><span className="text-[15px] font-bold tracking-[-.05em]">ProblemFirst</span></Link><div className="max-w-md"><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#b6c2ef]">Keep the useful parts close</p><h1 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-.07em]">A little continuity can go a long way.</h1><p className="mt-7 text-[15px] leading-7 text-white/65">Sign in to keep your next steps close when you want to return to them.</p></div><p className="text-xs text-white/45">ProblemFirst is here for a clearer start.</p></section><section className="flex items-center justify-center px-5 py-10"><div className="w-full max-w-[410px]"><Link href="/" className="flex items-center gap-2.5 lg:hidden"><BrandMark className="h-6 w-5 object-contain" /><span className="text-[15px] font-bold tracking-[-.05em] text-[#142033]">ProblemFirst</span></Link><p className="mt-16 text-[11px] font-bold uppercase tracking-[.16em] text-[#3857e8] lg:mt-0">Sign in</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.065em] text-[#142033]">Pick up where you left off.</h2><p className="mt-5 text-sm leading-6 text-[#68717d]">Use your Google account to sign in securely.</p><button onClick={continueWithGoogle} disabled={loading} className="pressable mt-9 flex h-13 w-full items-center justify-center gap-3 border border-[#cdd3dc] bg-white px-5 text-sm font-bold text-[#142033] hover:border-[#3857e8] disabled:cursor-not-allowed disabled:opacity-70"><Icon name="google" className="size-[18px] text-[#3857e8]" />{loading ? "Opening Google…" : "Continue with Google"}</button>{error && <p role="alert" className="mt-4 border-l-2 border-[#e55b2d] bg-[#fff5ef] px-3 py-2 text-xs leading-5 text-[#a24226]">{error}</p>}<p className="mt-8 text-xs leading-5 text-[#87909b]">By continuing, you agree to use ProblemFirst responsibly. Your sign-in is kept private and simple.</p></div></section></main>;
}
