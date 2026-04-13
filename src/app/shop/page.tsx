"use client";

import { products } from "@/lib/data";
import ProductCard from "@/components/product/product-card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";

export default function ShopPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Shop
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              Our <TextGradient variant="gold">Collection</TextGradient>
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              Premium heated vibrating eye mask technology designed for deeper,
              better sleep.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
