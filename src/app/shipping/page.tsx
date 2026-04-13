"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";

const cards = [
  {
    title: "Processing Time",
    description: "All orders are processed within 1-3 business days after payment confirmation.",
    icon: "📦",
  },
  {
    title: "Delivery Time",
    description: "Standard shipping takes 7-15 business days worldwide. Delivery times vary by location.",
    icon: "🚚",
  },
  {
    title: "Free Shipping",
    description: "All orders ship free with tracking. No minimum purchase required.",
    icon: "✨",
  },
  {
    title: "Shipping Issues",
    description: "If your package is lost or delayed beyond 30 days, contact us for a full refund or replacement.",
    icon: "🛡",
  },
];

export default function ShippingPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Shipping
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              Shipping <TextGradient variant="gold">Information</TextGradient>
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              We ship worldwide with full tracking on every order.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <GlassmorphismCard className="h-full">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-bold font-heading text-heading mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {card.description}
                </p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <p className="text-sm text-foreground">
              Questions about shipping? Email us at{" "}
              <a href="mailto:shopslumbor@gmail.com" className="text-gold hover:underline">
                shopslumbor@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
