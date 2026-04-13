"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function RefundPolicyPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h1 className="text-3xl font-bold font-heading text-heading tracking-tight mb-8">
            Refund Policy
          </h1>
          <div className="space-y-6 text-sm text-foreground leading-relaxed">
            <p>
              We want you to be completely satisfied with your purchase. If
              you&apos;re not happy with your DreamWave Mask, we offer a
              30-day money-back guarantee.
            </p>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              30-Day Money-Back Guarantee
            </h2>
            <p>
              You have 30 days from the date of delivery to request a return
              and full refund. To be eligible, the item must be in its original
              condition and packaging.
            </p>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              How to Request a Refund
            </h2>
            <p>
              Email us at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline"
              >
                shopslumbor@gmail.com
              </a>{" "}
              with your order number and reason for the return. Our team will
              provide you with return instructions within 24 hours.
            </p>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              Conditions
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Item must be returned within 30 days of delivery</li>
              <li>Item must be in original condition and packaging</li>
              <li>Return shipping costs are the responsibility of the buyer</li>
              <li>
                Damaged or defective items qualify for free return shipping
              </li>
            </ul>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              Refund Processing
            </h2>
            <p>
              Once we receive and inspect your return, we will process your
              refund within 5-7 business days. The refund will be issued to your
              original payment method. Please allow an additional 3-5 business
              days for the refund to appear on your statement, depending on your
              bank.
            </p>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              Damaged or Defective Items
            </h2>
            <p>
              If your item arrives damaged or defective, contact us immediately
              with photos. We will send a free replacement or issue a full
              refund at no cost to you.
            </p>

            <p className="text-xs text-muted mt-8">
              Last updated: March 2026
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
