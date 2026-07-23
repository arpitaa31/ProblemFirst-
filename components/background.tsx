import BackgroundOrbs from "@/components/background-orbs";

export default function Background({ mode = "light" }: { mode?: "light" | "explore" | "trending" | "business" }) {
  const color = mode === "business" ? "bg-[#122033]" : mode === "trending" ? "bg-[#f2f5ff]" : "bg-[#f7f7f4]";
  return <><div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 ${color}`} /><BackgroundOrbs /></>;
}
