import type { Metadata } from "next";
import "@fontsource/dm-serif-display/latin-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import { AuthProvider } from "@/components/auth-provider";
import InitialLoader from "@/components/initial-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProblemFirst — Find your solution!", template: "%s — ProblemFirst" },
  description: "Turn everyday problems into calm, practical next steps.",
  icons: { icon: "/problemfirst-icon-v2.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AuthProvider><InitialLoader>{children}</InitialLoader></AuthProvider></body></html>;
}
