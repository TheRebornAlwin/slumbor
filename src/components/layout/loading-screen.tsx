"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandName from "@/components/ui/brand-name";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("slumbor-loaded");
      if (!seen) {
        setShow(true);
        const timer = setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("slumbor-loaded", "1");
        }, 2800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
        >
          <div className="relative mb-8">
            <div
              className="absolute inset-0 w-24 h-24 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
                animation: "pulse-ring 2s ease-in-out infinite",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="relative flex items-center justify-center w-16 h-16"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C24 4 20 14 20 24C20 34 24 44 24 44C24 44 28 34 28 24C28 14 24 4 24 4Z" fill="rgba(201,168,76,0.6)" />
                <circle cx="24" cy="24" r="6" fill="#c9a84c" opacity="0.8" />
                <circle cx="24" cy="24" r="12" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl text-gold tracking-tight mb-8"
          >
            <BrandName />
          </motion.div>

          <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full"
              style={{
                animation: "loading-bar 2.4s ease-out forwards",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
