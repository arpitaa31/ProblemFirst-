type IconName = "arrow" | "sparkle" | "search" | "google" | "chevron" | "close" | "leaf" | "building" | "check" | "shield" | "menu";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  sparkle: <><path d="m12 2 1.75 6.25L20 10l-6.25 1.75L12 18l-1.75-6.25L4 10l6.25-1.75L12 2Z" /><path d="m19 16 .65 2.35L22 19l-2.35.65L19 22l-.65-2.35L16 19l2.35-.65L19 16Z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  google: <path fill="currentColor" stroke="none" d="M21.35 12.25c0-.71-.06-1.23-.2-1.78H12v3.5h5.37a4.62 4.62 0 0 1-1.98 3.03v2.27h3.18c1.86-1.72 2.78-4.25 2.78-7.02ZM12 21.75c2.62 0 4.82-.87 6.43-2.36l-3.18-2.27c-.88.59-2.01.94-3.25.94-2.53 0-4.68-1.7-5.45-4.01H3.27v2.34A9.75 9.75 0 0 0 12 21.75Zm-5.45-7.7A5.86 5.86 0 0 1 6.25 12c0-.71.12-1.4.3-2.05V7.61H3.27a9.75 9.75 0 0 0 0 8.78l3.28-2.34ZM12 5.94c1.37 0 2.6.47 3.57 1.38l2.67-2.67C16.81 3.33 14.61 2.25 12 2.25a9.75 9.75 0 0 0-8.73 5.36l3.28 2.34c.77-2.31 2.92-4.01 5.45-4.01Z" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  leaf: <><path d="M20.5 3.5C12 3.7 5.8 7.1 5.8 13.1c0 3.7 2.8 6.2 6.1 6.2 5.7 0 8.3-5.9 8.6-15.8Z" /><path d="M3.5 21c3.5-4 7-6.4 12-9" /></>,
  building: <><path d="M4 21V4h12v17M2 21h20M8 8h1m3 0h1M8 12h1m3 0h1M8 16h1m3 0h1M16 21v-7h4v7" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  shield: <><path d="M12 21s8-3.8 8-10V5l-8-3-8 3v6c0 6.2 8 10 8 10Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>;
}
