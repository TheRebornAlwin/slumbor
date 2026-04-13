"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/contexts/cart-context";
import LoadingScreen from "@/components/layout/loading-screen";

import ParticleField from "@/components/ui/particle-field";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/layout/cart-drawer";

function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <MetaPixelPageView />
      <LoadingScreen />

      <ParticleField />
      <div className="relative z-10">
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen pt-[calc(36px+64px)]">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
    </CartProvider>
  );
}
