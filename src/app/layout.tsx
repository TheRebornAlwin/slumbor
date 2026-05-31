import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0E1626",
};

export const metadata: Metadata = {
  title: "Slumbor | Fall Asleep Faster. Wake Up Rested.",
  description:
    "The SleepWave Pro combines gentle heat therapy and micro-vibration massage to help you fall asleep in minutes, reduce puffiness, and wake up feeling truly rested.",
  icons: {
    icon: "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrGCzKJv2wQbFMujXdcqsWtxAaEginK1m8SPLG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
