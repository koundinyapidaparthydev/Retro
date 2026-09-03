import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "RETRO — knowledge archive",
    template: "%s · RETRO",
  },
  description:
    "Interview knowledge archive for DSA, high-level design, and low-level design. Theory, when to use it, and how to extend it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        <div className="scanlines" />
        <div className="vignette" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
          <Header />
          <main className="flex-1 pt-8">{children}</main>
          <footer className="mt-16 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            RETRO v0.1 · improve on the fly · local progress only
          </footer>
        </div>
      </body>
    </html>
  );
}
