import type { Metadata } from "next";
import { EB_Garamond, Geist } from "next/font/google";
import { Header } from "@/components/Header";
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
    default: "RETRO — learn DSA, HLD, LLD",
    template: "%s · RETRO",
  },
  description:
    "Easy definitions, animated flows, and tiny examples for interview DSA, high-level design, and low-level design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${garamond.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-5 sm:px-6">
          <Header />
          <main className="flex-1 pt-10">{children}</main>
          <footer className="mt-20 border-t border-line pt-6 text-sm text-slate">
            RETRO · easy first · deepen later
          </footer>
        </div>
      </body>
    </html>
  );
}
