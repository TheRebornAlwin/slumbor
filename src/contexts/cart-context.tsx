"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SLEEPWAVE_PRO_ID, bundleDiscount } from "@/lib/data";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

// Tiny, auto-selected order bump shown on the cart. Pure margin, the shopper can
// uncheck it. Backed by a real Shopify variant when the store is wired up.
export const PROTECTION_PLAN = {
  id: "protection-plan-3yr",
  title: "3-Year Protection Plan",
  price: 2.99,
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  protectionPlan: boolean;
  setProtectionPlan: (value: boolean) => void;
  total: number;
  // Live unit price for a line (applies the bundle discount to the mask by qty).
  unitPrice: (item: CartItem) => number;
  // Discount percent currently applied to a line (0 when none).
  lineDiscount: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [protectionPlan, setProtectionPlan] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("slumbor-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem("slumbor-cart");
      }
    }
    const savedPlan = localStorage.getItem("slumbor-protection-plan");
    if (savedPlan === "0") setProtectionPlan(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("slumbor-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("slumbor-protection-plan", protectionPlan ? "1" : "0");
    }
  }, [protectionPlan, mounted]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity, price: item.price }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);

      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "AddToCart", {
          content_name: item.title,
          content_ids: ["sleepwave-pro"],
          content_type: "product",
          value: item.price,
          currency: "USD",
        });
      }
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // The stored item.price is the full (base) price. The mask's effective price
  // is recomputed from its current quantity so the cart always stays accurate.
  const lineDiscount = useCallback(
    (item: CartItem) =>
      item.id === SLEEPWAVE_PRO_ID ? bundleDiscount(item.quantity) : 0,
    []
  );
  const unitPrice = useCallback(
    (item: CartItem) =>
      Math.round(item.price * (1 - lineDiscount(item) / 100) * 100) / 100,
    [lineDiscount]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + unitPrice(item) * item.quantity,
    0
  );
  const planSelected = protectionPlan && items.length > 0;
  const total = subtotal + (planSelected ? PROTECTION_PLAN.price : 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        protectionPlan,
        setProtectionPlan,
        total,
        unitPrice,
        lineDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
