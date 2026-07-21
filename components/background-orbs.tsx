export default function BackgroundOrbs() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="background-orb background-orb-peach absolute -left-44 -top-32 size-[520px] rounded-full bg-[#f29a74] opacity-35 blur-[130px]" />
    <div className="background-orb background-orb-gold absolute -bottom-56 left-[4%] size-[460px] rounded-full bg-[#e9bd55] opacity-30 blur-[130px]" />
    <div className="background-orb background-orb-mint absolute bottom-[8%] right-[-170px] size-[540px] rounded-full bg-[#83ceb0] opacity-30 blur-[145px]" />
    <div className="background-orb background-orb-teal absolute right-[16%] top-[8%] size-[390px] rounded-full bg-[#68c8bc] opacity-25 blur-[125px]" />
    <div className="background-orb background-orb-coral absolute left-[38%] top-[52%] size-[340px] rounded-full bg-[#ee8676] opacity-24 blur-[120px]" />
    <div className="background-orb background-orb-sand absolute right-[35%] -bottom-44 size-[440px] rounded-full bg-[#d6c27c] opacity-25 blur-[135px]" />
  </div>;
}
