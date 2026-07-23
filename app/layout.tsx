import type { Metadata } from "next";
import "@fontsource/dm-serif-display/latin-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProblemFirst — Find your next step", template: "%s — ProblemFirst" },
  description: "Turn everyday problems into calm, practical next steps.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
