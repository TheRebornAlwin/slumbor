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
        {/* Meta Pixel (Dataset ID 2807075906310846). Fires the initial PageView;
            subsequent client-side navigations are tracked in client-layout. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2807075906310846');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=2807075906310846&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Microsoft Clarity session recording + heatmaps */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xa22ol5ny9");`,
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
