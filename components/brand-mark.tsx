export default function BrandMark({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path fill="#3857e8" d="M3 3h15.5C25 3 29 7.4 29 13.1c0 5.8-4 10.1-10.5 10.1H11v5.8H3V3Zm8 7.1v6.1h7.1c1.9 0 3-1.1 3-3.1 0-1.9-1.1-3-3-3H11Z" />
    <path fill="#e55b2d" d="m24.7 22.1 4.2 7-7.1-4.1 3-2.9Z" />
  </svg>;
}
