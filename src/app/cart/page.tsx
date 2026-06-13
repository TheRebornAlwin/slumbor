"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, PROTECTION_PLAN } from "@/contexts/cart-context";
import { createCheckout } from "@/lib/shopify";
import MagneticButton from "@/components/ui/magnetic-button";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    protectionPlan,
    setProtectionPlan,
  } = useCart();

  const handleCheckout = () => {
    window.location.href = createCheckout(items, protectionPlan);
  };

  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h1 className="text-3xl font-bold font-heading text-heading tracking-tight mb-8">
            Your Cart
          </h1>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-foreground mb-6">Your cart is empty</p>
              <MagneticButton variant="primary" href="/shop/">
                Continue Shopping
              </MagneticButton>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-4 flex gap-4 items-center"
                >
                  <div className="w-20 h-20 rounded-xl bg-surface-raised overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.id}/`}
                      className="font-semibold text-heading hover:text-gold transition-colors text-sm"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gold font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-foreground hover:border-gold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-foreground hover:border-gold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-muted hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <label className="glass-card rounded-2xl p-4 flex items-start gap-3 mb-4 cursor-pointer border border-gold/20">
              <input
                type="checkbox"
                checked={protectionPlan}
                onChange={(e) => setProtectionPlan(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  protectionPlan ? "border-gold bg-gold" : "border-muted"
                }`}
              >
                {protectionPlan && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0E1626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                )}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-heading">
                    {PROTECTION_PLAN.title}
                  </span>
                  <span className="text-sm font-bold text-gold flex-shrink-0">
                    +${PROTECTION_PLAN.price.toFixed(2)}
                  </span>
                </span>
                <span className="block text-xs text-slate leading-snug mt-1">
                  Covers accidental damage for 3 years. One free replacement, no questions.
                </span>
              </span>
            </label>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-foreground">
                  Subtotal
                </span>
                <span className="text-2xl font-bold text-heading">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted mb-4">
                Shipping calculated at checkout
              </p>
              <MagneticButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </MagneticButton>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
