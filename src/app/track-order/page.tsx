"use client";

import { products } from "@/lib/data";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import MagneticButton from "@/components/ui/magnetic-button";
import ProductCard from "@/components/product/product-card";

export default function TrackOrderPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Track Order
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              Track your <TextGradient variant="gold">order</TextGradient>
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              Enter your order details below to check the status of your
              shipment.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <GlassmorphismCard className="mb-12">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-heading mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-surface focus:border-gold focus:outline-none transition-colors text-sm"
                  placeholder="#1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-surface focus:border-gold focus:outline-none transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <MagneticButton variant="primary" type="submit" className="w-full">
                Track Order
              </MagneticButton>
            </form>
            <p className="text-xs text-muted text-center mt-4">
              You can also track your order using the link in your shipping
              confirmation email.
            </p>
          </GlassmorphismCard>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold font-heading text-heading">
              Recommended for you
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
