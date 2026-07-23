export default function BackgroundOrbs() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="background-orb background-orb--peach absolute -left-52 top-[10%] size-[31rem] rounded-full" />
    <div className="background-orb background-orb--aqua absolute -right-56 top-[28%] size-[34rem] rounded-full" />
    <div className="background-orb background-orb--gold absolute -bottom-64 left-[18%] size-[29rem] rounded-full" />
  </div>;
}
