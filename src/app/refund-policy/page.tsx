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
              We want you to sleep better, not feel stuck with a purchase. If the
              SleepWave Pro isn&apos;t working for you, we offer a 180-night
              money-back guarantee.
            </p>

            <h2 className="text-lg font-bold font-heading text-heading mt-8 mb-3">
              180-Night Money-Back Guarantee
            </h2>
            <p>
              You have 180 days from the date of delivery to request a return and
              full refund. Sleep better within 14 nights or we make it right, and
              you keep the bonus 7-Minute Wind-Down audio guide either way.
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
              <li>Item must be returned within 180 days of delivery</li>
              <li>No restocking fee, and no questions about why</li>
              <li>Keep the bonus 7-Minute Wind-Down audio guide either way</li>
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
