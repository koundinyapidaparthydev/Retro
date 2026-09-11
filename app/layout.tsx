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
    default: "RETRO — mid-level track",
    template: "%s · RETRO",
  },
  description:
    "Mid-level DSA × AI roadmap and Algos problem pack. Pattern recognition plus orchestration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${garamond.variable}`}>
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-screen max-w-3xl px-4 pb-16 pt-5 sm:px-6">
          <Header />
          <main className="mt-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
