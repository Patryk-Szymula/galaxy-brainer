import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased
        bg-black text-white min-h-screen flex items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}