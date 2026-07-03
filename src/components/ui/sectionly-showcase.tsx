"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Star, Layers } from "lucide-react";

import sec1 from "@/images/section-1.png";
import sec2 from "@/images/section-2.png";
import sec3 from "@/images/section-3.png";
import sec4 from "@/images/section-4.png";
import sec5 from "@/images/section-5.png";
import sec6 from "@/images/section-6.png";

const features = [
  "700+ ready-made premium Shopify sections",
  "FAQ accordions, sliders & shoppable reels",
  "Volume discount widgets built-in",
  "Native Shopify Theme Editor — zero code",
  "Fully responsive on mobile, tablet & desktop",
];

// Row 1 scrolls right→left, Row 2 scrolls left→right
const row1 = [sec1, sec2, sec3, sec4, sec5, sec6];
const row2 = [sec4, sec5, sec6, sec1, sec2, sec3];

function MarqueeRow({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  const doubled = [...images, ...images]; // duplicate for seamless loop

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-3"
        animate={{
          x: direction === "left"
            ? ["0%", "-50%"]
            : ["-50%", "0%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-52 h-36 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900"
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
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                AI Section Hub
              </h3>
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

            {/* CTA link */}
            <a
              href="https://apps.shopify.com/sectionly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 font-bold text-sm text-white border-b border-white pb-0.5 w-fit hover:text-zinc-400 hover:border-zinc-400 transition-colors group"
            >
              View on Shopify App Store
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* RIGHT — Dual Marquee Rows */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
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
