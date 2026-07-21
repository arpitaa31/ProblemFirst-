export default function Background({ mode = "light" }: { mode?: "light" | "explore" | "trending" | "business" }) {
  const dark = mode === "trending" || mode === "business";
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {dark && <div className="grid-fade absolute inset-0 opacity-55 [mask-image:radial-gradient(ellipse_at_center,black,transparent_74%)]" />}
    {mode === "explore" && <div className="noise-layer absolute inset-0 opacity-[.13]" />}
    <div className={`absolute inset-0 ${dark ? "bg-[linear-gradient(120deg,rgba(8,14,19,.55),rgba(17,20,24,.3),rgba(13,23,22,.55))]" : "bg-[linear-gradient(120deg,rgba(255,253,248,.42),rgba(255,250,241,.2),rgba(240,248,243,.35))]"}`} />
  </div>;
}
