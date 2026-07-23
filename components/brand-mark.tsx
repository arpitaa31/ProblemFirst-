import Image from "next/image";

export default function BrandMark({ className = "" }: { className?: string }) {
  return <Image src="/problemfirst-icon-v2.png" alt="ProblemFirst" width={563} height={702} className={`object-contain ${className}`} />;
}
