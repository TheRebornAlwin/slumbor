"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { useCart } from "@/contexts/cart-context";
import ProductTabs from "@/components/product/product-tabs";
import VolumeDiscounts from "@/components/product/volume-discounts";
import HowItWorks from "@/components/product/how-it-works";
import EMSComparison from "@/components/product/ems-comparison";
import ComparisonTable from "@/components/product/comparison-table";
import ScienceSection from "@/components/product/science-section";
import ProductReviews from "@/components/product/product-reviews";
import TestimonialCarousel from "@/components/product/testimonial-carousel";
import PurchaseNotification from "@/components/product/purchase-notification";
import CostCallout from "@/components/product/cost-callout";
import BenefitsHero from "@/components/product/benefits-hero";
import ReliefIntro from "@/components/product/relief-intro";
import DiscoverSection from "@/components/product/discover-section";
import PerfectFor from "@/components/product/perfect-for";
import FeaturesLove from "@/components/product/features-love";
import ProductFAQ from "@/components/product/product-faq";
import SpecialOffer from "@/components/product/special-offer";
import RiskFreeGuarantee from "@/components/product/risk-free-guarantee";
import BrandName from "@/components/ui/brand-name";

export default function ProductPageClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [mobileActiveImage, setMobileActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTier, setSelectedTier] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stickyAddedToCart, setStickyAddedToCart] = useState(false);

  useEffect(() => {
    product.images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
    const cartImg = new window.Image();
    cartImg.src = "";
  }, [product.images]);

  const tierDiscounts = [0, 10, 20];
  const tierQuantities = [1, 2, 3];
  const discount = tierDiscounts[selectedTier];
  const effectivePrice = product.price * (1 - discount / 100);
  const effectiveQty = tierQuantities[selectedTier];

  const handleTierSelect = (tier: number) => {
    setSelectedTier(tier);
    setQuantity(tierQuantities[tier]);
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        title: product.title,
        price: effectivePrice,
        image: "",
      },
      quantity * effectiveQty
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = useCallback(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const index = Math.round(scrollLeft / width);
    setMobileActiveImage(index);
  }, []);

  const handleStickyAddToCart = () => {
    addItem(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: "",
      },
      1
    );
    setStickyAddedToCart(true);
    setTimeout(() => setStickyAddedToCart(false), 2000);
  };

  const discountPct = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <>
      <div className="py-6 md:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Mobile Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:hidden min-w-0 -mx-6"
            >
              <div className="relative">
                {discountPct > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 px-4 py-1.5 bg-gold text-navy text-sm font-bold rounded-full z-10 shadow-lg shadow-gold/20"
                  >
                    -{discountPct}% OFF
                  </motion.span>
                )}
                <div
                  ref={mobileScrollRef}
                  onScroll={handleMobileScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
                >
                  {product.images.map((img, i) => (
                    <div key={i} className="min-w-full snap-center">
                      <div className="relative aspect-square bg-gradient-to-br from-gold-light via-surface to-gold-light overflow-hidden">
                        <Image
                          src={img}
                          alt={`${product.title} - Image ${i + 1}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-3 pb-1">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        mobileScrollRef.current?.scrollTo({ left: i * (mobileScrollRef.current?.clientWidth ?? 0), behavior: "smooth" });
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        mobileActiveImage === i
                          ? "bg-gold w-4"
                          : "bg-white/20"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Desktop Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block space-y-4 min-w-0"
            >
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-gold-light via-surface to-gold-light border border-white/8 overflow-hidden shadow-lg">
                {discountPct > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-5 right-5 px-4 py-1.5 bg-gold text-navy text-sm font-bold rounded-full z-10 shadow-lg shadow-gold/20"
                  >
                    -{discountPct}% OFF
                  </motion.span>
                )}
                <Image
                  src={product.images[selectedImage]}
                  alt={`${product.title} - Image ${selectedImage + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              <div className="flex gap-3 overflow-x-auto max-w-full pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-[72px] h-[72px] rounded-2xl flex-shrink-0 border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                      selectedImage === i
                        ? "border-gold shadow-md shadow-gold/10"
                        : "border-transparent hover:border-gold/30 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${i + 1}`}
                      width={72}
                      height={72}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center md:text-left min-w-0"
            >
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-heading font-bold text-heading tracking-tight leading-tight mb-3">
                <BrandName tm /> {product.title}
              </h1>

              <p className="text-slate italic text-base mb-3">
                {product.tagline}
              </p>

              <div className="flex items-center gap-2 mb-5 justify-center md:justify-start">
                <div className="flex text-gold text-sm">{"★★★★★"}</div>
                <span className="text-sm text-slate">4.9 (5,860 reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-5 justify-center md:justify-start flex-wrap">
                <span className="text-3xl md:text-4xl font-bold text-gold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl text-muted line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-light text-gold text-xs font-bold">
                  SAVE {discountPct}%
                </span>
              </div>

              {/* Benefit Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                {[
                  {
                    label: "Fall Asleep",
                    sublabel: "Faster",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    ),
                  },
                  {
                    label: "Reduce",
                    sublabel: "Puffiness",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    ),
                  },
                  {
                    label: "Wake Up",
                    sublabel: "Rested",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    ),
                  },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="text-center py-4 rounded-2xl bg-gold/5 border border-gold/10"
                  >
                    <div className="flex justify-center mb-2">{badge.icon}</div>
                    <p className="text-xs font-bold text-heading leading-tight">
                      {badge.label}
                    </p>
                    <p className="text-[10px] text-gold font-semibold">{badge.sublabel}</p>
                  </div>
                ))}
              </div>

              {/* Core Benefits */}
              <div className="flex flex-col items-center md:items-start space-y-2 mb-6">
                {[
                  "Fall asleep in minutes instead of lying awake for hours",
                  "Wake up with visibly less puffiness and dark circles",
                  "Release eye strain from long days at screens",
                  "Use it every night — no supplements, no side effects",
                ].map((benefit, i) => (
                  <div key={i} className="inline-flex items-start gap-2.5 max-w-[90%] md:max-w-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Struggling callout */}
              <div className="border-t border-white/8 pt-6 mb-6">
                <h3 className="text-lg font-heading font-bold text-heading mb-3 max-w-lg mx-auto md:mx-0">
                  Struggling to Fall Asleep, Stay Asleep, or Wake Up Rested?
                </h3>
                <p className="text-[15px] text-slate leading-relaxed mb-4 max-w-lg mx-auto md:mx-0">
                  The <span className="font-bold text-heading"><BrandName tm /> DreamWave Mask</span> combines gentle heat therapy with micro-vibration massage to relax the muscles around your eyes, signal your brain it&apos;s time to sleep, and help you drift off naturally. It works with your body&apos;s wind-down response for real, lasting results.
                </p>
                <p className="text-[15px] text-slate leading-relaxed max-w-lg mx-auto md:mx-0">
                  <span className="font-bold text-heading">Try it for 30 nights</span> and if you don&apos;t love it, return it for your money back. <span className="font-bold text-heading">No questions asked.</span>
                </p>
              </div>

              <div className="mb-8">
                <VolumeDiscounts
                  basePrice={product.price}
                  selectedTier={selectedTier}
                  onSelect={handleTierSelect}
                />
              </div>

              {/* Quantity + ATC */}
              <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                <div className="flex items-center border-2 border-white/10 rounded-full bg-surface-raised">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-lg text-muted hover:text-gold transition-colors cursor-pointer font-medium"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-heading">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-lg text-muted hover:text-gold transition-colors cursor-pointer font-medium"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 rounded-full font-semibold text-base transition-all duration-300 cursor-pointer bg-gold text-navy hover:bg-gold-dark hover:shadow-[0_4px_24px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  {addedToCart ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Added!
                    </motion.span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
                {[
                  {
                    label: "Free Shipping",
                    sublabel: "Worldwide",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    ),
                  },
                  {
                    label: "30-Day",
                    sublabel: "Guarantee",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    ),
                  },
                  {
                    label: "Secure",
                    sublabel: "Checkout",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    ),
                  },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="text-center py-4 rounded-2xl bg-white/3 border border-white/8"
                  >
                    <div className="flex justify-center mb-2">{badge.icon}</div>
                    <p className="text-xs font-bold text-heading leading-tight">
                      {badge.label}
                    </p>
                    <p className="text-[10px] text-muted">{badge.sublabel}</p>
                  </div>
                ))}
              </div>

              <ProductTabs product={product} />
            </motion.div>
          </div>
        </div>
      </div>

      <BenefitsHero />
      <ReliefIntro />
      <DiscoverSection />
      <ScienceSection />
      <PerfectFor />
      <FeaturesLove />
      <HowItWorks />
      <EMSComparison />
      <ComparisonTable />
      <CostCallout />
      <SpecialOffer />
      <TestimonialCarousel />
      <ProductFAQ />
      <RiskFreeGuarantee />
      <ProductReviews />

      <PurchaseNotification />

      {/* Sticky mobile ATC bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface border-t border-white/8 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-heading truncate">{product.title}</p>
            <p className="text-sm font-bold text-gold">${product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleStickyAddToCart}
            className="flex-shrink-0 px-6 h-10 rounded-full font-semibold text-sm bg-gold text-navy hover:bg-gold-dark transition-all duration-200 cursor-pointer"
          >
            {stickyAddedToCart ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="h-16 md:hidden" />
    </>
  );
}
