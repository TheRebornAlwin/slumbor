"use client";

import Link from "next/link";
import BrandName from "@/components/ui/brand-name";

const shopLinks = [
  { href: "/shop/", label: "All Products" },
  { href: "/products/dreamwave-mask/", label: "DreamWave Mask" },
  { href: "/cart/", label: "Cart" },
];

const supportLinks = [
  { href: "/contact/", label: "Contact Us" },
  { href: "/faq/", label: "FAQ" },
  { href: "/shipping/", label: "Shipping Info" },
  { href: "/track-order/", label: "Track Order" },
];

const legalLinks = [
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms-of-service/", label: "Terms of Service" },
  { href: "/refund-policy/", label: "Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 min-w-0">
          <div className="col-span-2 md:col-span-1">
            <Link href="/home/" className="flex items-center gap-2 mb-4">
              <span className="text-lg text-gold"><BrandName /></span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Fall asleep faster. Wake up rested.
            </p>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} <BrandName />. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
