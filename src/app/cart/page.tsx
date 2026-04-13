"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { createCheckout } from "@/lib/shopify";
import MagneticButton from "@/components/ui/magnetic-button";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const handleCheckout = async () => {
    try {
      const url = await createCheckout(items);
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
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

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-foreground">
                  Subtotal
                </span>
                <span className="text-2xl font-bold text-heading">
                  ${subtotal.toFixed(2)}
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
