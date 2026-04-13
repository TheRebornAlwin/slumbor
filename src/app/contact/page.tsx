"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import MagneticButton from "@/components/ui/magnetic-button";

const contactInfo = [
  {
    title: "Email",
    detail: "shopslumbor@gmail.com",
    icon: "✉",
  },
  {
    title: "Hours",
    detail: "Mon-Fri 9am-5pm EST",
    icon: "🕐",
  },
  {
    title: "Response Time",
    detail: "Within 24 hours",
    icon: "⚡",
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Contact
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              Get in <TextGradient variant="gold">touch</TextGradient>
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              Have a question about your order or our products? We&apos;re here
              to help.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <GlassmorphismCard className="text-center">
                <div className="text-2xl mb-3">{info.icon}</div>
                <h3 className="font-bold font-heading text-heading mb-1">{info.title}</h3>
                <p className="text-sm text-foreground">{info.detail}</p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <GlassmorphismCard className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold font-heading text-heading mb-6">
              Send us a message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-heading mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-surface focus:border-gold focus:outline-none transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-surface focus:border-gold focus:outline-none transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-white/8 bg-surface focus:border-gold focus:outline-none transition-colors text-sm resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <MagneticButton variant="primary" type="submit" className="w-full">
                Send Message
              </MagneticButton>
            </form>
          </GlassmorphismCard>
        </ScrollReveal>
      </div>
    </div>
  );
}
