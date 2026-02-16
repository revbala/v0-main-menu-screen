import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";

import "./globals.css";

const _pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const _vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ASHES OF IRON",
  description:
    "A 32-bit pixel art industrial adventure. Forge your destiny in a world of rust and fire.",
};

export const viewport: Viewport = {
  themeColor: "#1a120a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${_pressStart.variable} ${_vt323.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
