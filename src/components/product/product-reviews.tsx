"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviewsData } from "@/lib/data";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";

const REVIEWS_PER_PAGE = 12;
const MAX_DISPLAY = 36;

function ReviewAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-gold/10 text-gold"
    >
      {initial}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#c9a84c" : "#2a2a3e"}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviews() {
  const [shown, setShown] = useState(REVIEWS_PER_PAGE);
  const reviews = reviewsData;
  const totalReviews = 5860;
  const avgRating = 4.9;

  const ratingDist = [
    { stars: 5, count: 4738 },
    { stars: 4, count: 916 },
    { stars: 3, count: 196 },
    { stars: 2, count: 8 },
    { stars: 1, count: 2 },
  ];
  const totalRatings = ratingDist.reduce((sum, r) => sum + r.count, 0);

  const displayedReviews = reviews.slice(0, Math.min(shown, MAX_DISPLAY));
  const remaining = totalReviews - MAX_DISPLAY;
  const canShowMore = shown < reviews.length && shown < MAX_DISPLAY;
  const atMax = shown >= MAX_DISPLAY || shown >= reviews.length;

  return (
    <section className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight mb-2">
              Customer <TextGradient variant="gold">Reviews</TextGradient>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center flex-shrink-0">
                <div className="text-5xl sm:text-6xl font-bold text-heading leading-none">
                  {avgRating}
                </div>
                <div className="flex justify-center mt-2 mb-1">
                  <StarRating rating={5} />
                </div>
                <p className="text-sm text-muted">
                  {totalReviews.toLocaleString()} reviews
                </p>
              </div>
              <div className="flex-1 w-full space-y-2.5">
                {ratingDist.map((r) => {
                  const pct = Math.round((r.count / totalRatings) * 100);
                  return (
                    <div key={r.stars} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-heading w-6 text-right">
                        {r.stars}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#c9a84c"
                        stroke="none"
                        className="flex-shrink-0"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full bg-gold rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted w-12 text-right">
                        {r.count.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % REVIEWS_PER_PAGE) * 0.05 }}
                className="min-w-0"
              >
                <div className="bg-surface-raised border border-white/8 rounded-2xl p-5 h-full transition-all duration-300 hover:border-white/15 hover:shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <ReviewAvatar name={review.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-heading text-sm">
                          {review.name}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={review.rating} />
                        <span className="text-[11px] text-muted">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {canShowMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShown((prev) => prev + REVIEWS_PER_PAGE)}
              className="px-8 py-3.5 rounded-full border-2 border-gold text-gold font-semibold text-sm hover:bg-gold hover:text-navy transition-all duration-300 cursor-pointer hover:shadow-[0_4px_24px_rgba(201,168,76,0.25)]"
            >
              Show More Reviews
            </button>
          </div>
        )}

        {atMax && remaining > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-sm font-semibold text-gold"
          >
            + {remaining.toLocaleString()} more reviews
          </motion.p>
        )}
      </div>
    </section>
  );
}
