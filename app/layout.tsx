import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StarBackground } from "@/components/ui/StarBackground";

// Inter font for general text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Orbitron font for headings
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Galaxy Brainer",
  description: "Your inteligence doesn't have limits!",
  metadataBase: new URL('https://galaxybrainer.com'),
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased
        bg-black text-white h-full flex flex-col relative overflow-hidden`}
      >
        {/* Space for background stars effect  */}
        <Header />
        {/* Main content area */}
        <StarBackground />
        <main className="flex-1 w-full flex flex-col items-center overflow-y-auto z-10">
          <div className="flex-1 flex flex-col w-full max-w-7xl px-4">
            {children}
          </div>
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}