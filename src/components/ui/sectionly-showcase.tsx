"use client";

import { motion } from "motion/react";
import { Star, Layers, ArrowUpRight } from "lucide-react";

import img1 from "@/images/images1.jpg";
import img2 from "@/images/images2.jpg";
import img3 from "@/images/images3.jpg";
import img4 from "@/images/images4.jpg";
import img5 from "@/images/images5.jpg";
import img6 from "@/images/images6.jpg";
import img7 from "@/images/images7.jpg";
import img8 from "@/images/images8.jpg";
import img9 from "@/images/images9.jpg";
import img10 from "@/images/images10.jpg";
import aiSectionHubLogo from "@/images/ai sction hub logo.png";

const features = [
  "700+ ready-made premium Shopify sections",
  "FAQ accordions, sliders & shoppable reels",
  "Volume discount widgets built-in",
  "Native Shopify Theme Editor — zero code",
  "Fully responsive on mobile, tablet & desktop",
];

// Row 1 scrolls right→left, Row 2 scrolls left→right
const row1 = [img1, img2, img3, img4, img5];
const row2 = [img6, img7, img8, img9, img10];

function MarqueeRow({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  const doubled = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-4 items-center"
        animate={{
          x: direction === "left"
            ? ["0%", "-50%"]
            : ["-50%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="shrink-0 h-44 w-72 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center"
          >
            <img
              src={src}
              alt={`Section preview ${(i % images.length) + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SectionlyShowcase() {
  return (
    <section id="sectionly-showcase" className="w-full bg-black py-20 md:py-28 border-t border-zinc-900">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="inline-flex px-4 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 text-xs uppercase tracking-widest font-semibold">
            App Feature
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
            Meet{" "}
            <span className="text-zinc-400">AI Section Hub</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed">
            Add beautiful, ready-to-use sections to your Shopify store instantly — no developer, no code.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 w-fit bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              Trusted by 2,300+ Shopify stores
            </div>

            <div className="flex flex-col gap-1">
              <a
                href="https://apps.shopify.com/sectionly?st_source=autocomplete&surface_detail=autocomplete_apps"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:opacity-80 transition-opacity w-fit"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight flex items-center gap-3">
                  <img
                    src={aiSectionHubLogo}
                    alt="AI Section Hub Logo"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
                  />
                  <span>AI Section Hub</span>
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </h3>
              </a>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                Premium native theme sections, FAQ accordions, shoppable video reels, and volume discount widgets — all without touching a single line of code.
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-white text-sm font-semibold ml-1">4.9</span>
              <span className="text-zinc-500 text-sm">(2,300+ reviews)</span>
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

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <motion.a
                href="https://apps.shopify.com/sectionly"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-black text-white font-bold text-sm rounded-full border border-zinc-700 hover:bg-zinc-900 transition-colors shadow-md"
              >
                Install Free on Shopify
                {/* Shopify bag icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 57" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M43.8 10.8c0 0-0.4-0.1-1-0.1-0.5 0-1.3 0.1-2.2 0.4C39.3 7.5 37 3 32.8 3c-0.1 0-0.3 0-0.4 0C31.2 1.7 29.9 1 28.8 1 20.7 1 16.8 11 15.6 16.1c-3 0.9-5.1 1.6-5.4 1.7C8.3 18.4 8.3 18.5 8.1 20.3 8 21.7 3 62 3 62l37.5 6.4L50 65.3c0 0-5.7-53.5-6.2-54.5zM32.6 5.1c2.8 0 4.7 3.5 5.7 7C36.1 12.6 33.7 13.4 31 14.2 31.9 10.3 33.1 5.1 32.6 5.1zM28.5 3c0.5 0 1 0.3 1.5 0.8-2 0.9-4.1 4.6-5 9.8L19.8 15C21.1 9.7 24.4 3 28.5 3z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://sectionly.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-bold text-sm rounded-full border border-zinc-600 hover:border-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Browse Sections
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT — Dual Marquee Rows with edge fade */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative flex flex-col gap-4 overflow-hidden"
          >
            {/* Left fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-56 z-10 bg-gradient-to-r from-black to-transparent" />
            {/* Right fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-56 z-10 bg-gradient-to-l from-black to-transparent" />

            {/* Row 1: scrolls right → left */}
            <MarqueeRow images={row1} direction="left" />
            {/* Row 2: scrolls left → right */}
            <MarqueeRow images={row2} direction="right" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
