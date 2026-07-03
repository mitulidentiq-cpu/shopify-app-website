"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import appMockup from "@/images/klenzo-app-mockup.png";

const features = [
  "Replace native Shopify variant dropdowns with stunning swatches",
  "Supports color, image, button & custom swatch styles",
  "AI-powered — auto-detects variants for smart display",
  "Works with most Shopify themes — zero coding needed",
  "Fully responsive: desktop, tablet & mobile ready",
];

export function AppShowcase() {
  return (
    <section id="app-showcase" className="w-full bg-black py-20 md:py-28 border-t border-zinc-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="inline-flex px-4 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs uppercase tracking-widest font-semibold">
            App Feature
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
            Meet{" "}
            <span className="text-zinc-400">
              Klenzo: AI Variants
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed">
            Replace boring Shopify dropdowns with AI-powered color & image swatches.
            Improve product pages, boost conversions, and support most themes.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Klenzo: AI Variants
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                Visual swatch selectors powered by AI that auto-detect your product variants and display them beautifully — no code needed.
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-white text-sm font-semibold ml-1">5.0</span>
              <span className="text-zinc-500 text-sm">(New App — Be First!)</span>
            </div>

            {/* Feature bullets */}
            <ul className="flex flex-col gap-3">
              {features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-zinc-400"
                >
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold shrink-0">
                    ✓
                  </span>
                  {feat}
                </motion.li>
              ))}
            </ul>

            {/* CTA link */}
            <a
              href="https://apps.shopify.com/variantify-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 font-bold text-sm text-white border-b border-white pb-0.5 w-fit hover:text-zinc-400 hover:border-zinc-400 transition-colors group"
            >
              View on Shopify App Store
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* RIGHT — App Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_0_60px_10px_rgba(255,255,255,0.06)] border border-zinc-800">
              <img
                src={appMockup}
                alt="Klenzo AI Variants — Shopify swatch app mockup"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
