import type { Metadata } from "next";
import { EB_Garamond, Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { LearnSidebar } from "@/components/LearnSidebar";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: {
    default: "RETRO — one topic at a time",
    template: "%s · RETRO",
  },
  description: "Calm interview notes. One list. One topic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${garamond.variable}`}>
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-5 sm:px-6">
          <Header />
          <div className="mt-8 flex flex-col gap-10 lg:flex-row">
            <LearnSidebar />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
