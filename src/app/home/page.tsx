"use client";

import HeroSection from "@/components/sections/hero-section";
import SectionDivider from "@/components/ui/section-divider";
import WhySlumbor from "@/components/sections/why-luxen";
import ProductShowcase from "@/components/sections/product-showcase";
import Testimonials from "@/components/sections/testimonials";
import BrandStory from "@/components/sections/brand-story";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="aurora" />
      <WhySlumbor />
      <SectionDivider variant="ray" />
      <ProductShowcase />
      <SectionDivider variant="ray" />
      <Testimonials />
      <SectionDivider variant="aurora" />
      <BrandStory />
    </>
  );
}
