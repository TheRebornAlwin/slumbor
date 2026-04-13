"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { createCheckout } from "@/lib/shopify";
import MagneticButton from "@/components/ui/magnetic-button";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } =
    useCart();

  const handleCheckout = async () => {
    try {
      const url = await createCheckout(items);
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-surface shadow-2xl z-50 flex flex-col border-l border-white/5"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-lg font-heading font-bold text-heading">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-muted mb-4">Your cart is empty</p>
                  <MagneticButton
                    variant="secondary"
                    size="sm"
                    href="/shop/"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </MagneticButton>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-surface-raised flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-heading truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gold font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-muted hover:text-red-400 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-muted">Subtotal</span>
                  <span className="text-lg font-bold text-heading">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </MagneticButton>
                <p className="text-xs text-muted text-center mt-3">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
