import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { siteInfo } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteInfo.name} — Refugee-Led Organisation, Nairobi`,
    template: `%s — ${siteInfo.name}`,
  },
  description: siteInfo.tagline,
  openGraph: {
    type: "website",
    siteName: siteInfo.name,
    title: `${siteInfo.name} — Refugee-Led Organisation, Nairobi`,
    description: siteInfo.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
