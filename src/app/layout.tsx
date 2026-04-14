import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a14",
};

export const metadata: Metadata = {
  title: "Slumbor | Fall Asleep Faster. Wake Up Rested.",
  description:
    "The DreamWave Mask combines gentle heat therapy and micro-vibration massage to help you fall asleep in minutes, reduce puffiness, and wake up feeling truly rested.",
  icons: {
    icon: "",
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
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
