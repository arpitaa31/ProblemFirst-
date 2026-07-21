import type { Metadata } from "next";
import BackgroundOrbs from "@/components/background-orbs";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProblemFirst — Find your next step", template: "%s — ProblemFirst" },
  description: "Turn everyday problems into calm, practical next steps.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="relative isolate overflow-x-hidden"><BackgroundOrbs /><div className="relative z-10">{children}</div></body>
    </html>
  );
}
