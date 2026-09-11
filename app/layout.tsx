import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: {
    default: "DSA × AI — mid-level track",
    template: "%s · Retro",
  },
  description:
    "Mid-level DSA × AI roadmap and Algos problem pack. Pattern recognition plus orchestration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${plexMono.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <div className="mx-auto min-h-screen w-full max-w-[1080px] px-4 pb-20 pt-8 sm:px-6">
          <Header />
          <main className="mt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
