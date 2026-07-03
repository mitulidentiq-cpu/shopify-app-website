"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <div className="relative z-20 -translate-y-1/2 mx-auto max-w-4xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white text-black rounded-3xl py-10 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-zinc-200"
      >
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-500 font-bold font-mono">
            Elevate Average Order Value
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none text-black">
            It's time to go beyond words.
          </h2>
        </div>

        <motion.a
          href="https://apps.shopify.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-lg w-full md:w-auto text-center shrink-0 z-30"
        >
          Start free
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  );
}
