import BackgroundOrbs from "@/components/background-orbs";

export default function Background({ mode = "light" }: { mode?: "light" | "explore" | "trending" | "business" }) {
  const color = mode === "business" ? "bg-[#17142b]" : mode === "trending" ? "bg-[#fff0f5]" : "bg-[#fff9ec]";
  return <><div aria-hidden="true" className={`pointer-events-none fixed inset-0 -z-10 ${color}`} /><BackgroundOrbs /></>;
}
