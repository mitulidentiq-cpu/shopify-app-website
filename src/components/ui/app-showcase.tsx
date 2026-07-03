"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import shoeBlack from "@/images/shoe-black.png";
import shoeWhite from "@/images/shoe-white.png";
import shoeGreen from "@/images/shoe-green.png";

const features = [
  "Replace native Shopify variant dropdowns with stunning swatches",
  "Supports color, image, button & custom swatch styles",
  "AI-powered — auto-detects variants for smart display",
  "Works with most Shopify themes — zero coding needed",
  "Fully responsive: desktop, tablet & mobile ready",
];

const variants = [
  { label: "Black",      bg: "bg-zinc-900",    ring: "ring-zinc-400",    image: shoeBlack,  glow: "rgba(100,100,100,0.3)" },
  { label: "White",      bg: "bg-white",       ring: "ring-white",       image: shoeWhite,  glow: "rgba(255,255,255,0.2)" },
  { label: "Olive",      bg: "bg-[#6b7c3f]",   ring: "ring-[#6b7c3f]",   image: shoeGreen,  glow: "rgba(107,124,63,0.3)" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

function AnimatedProductCard() {
  const [selected, setSelected] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [added, setAdded] = useState(false);

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-sm mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-[0_0_60px_8px_rgba(255,255,255,0.05)] overflow-hidden"
    >
      {/* AI Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-black px-2 py-0.5 rounded-full">
          AI Powered
        </span>
      </div>

      {/* Product Image Area */}
      <div className="relative h-56 bg-white flex items-center justify-center overflow-hidden rounded-t-2xl">
        {/* Dynamic color glow — subtle on white bg */}
        <motion.div
          className="absolute w-40 h-40 rounded-full blur-3xl"
          animate={{ 
            background: variants[selected].glow,
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Shoe image — animated crossfade on selection change */}
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={variants[selected].image}
            alt={`${variants[selected].label} sneaker`}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 h-44 w-auto object-contain drop-shadow-xl"
          />
        </AnimatePresence>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-0.5">Shopify Product</p>
            <h4 className="text-white font-bold text-base leading-tight">AeroStride Prime</h4>
          </div>
          <div className="text-right">
            <p className="text-white font-extrabold text-lg">$140</p>
            <p className="text-zinc-500 text-xs line-through">$180</p>
          </div>
        </div>

        {/* Color Swatches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Color</p>
            <AnimatePresence mode="wait">
              <motion.span
                key={variants[selected].label}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-zinc-300 font-mono"
              >
                {variants[selected].label}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex gap-3">
            {variants.map((v, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title={v.label}
                className={`w-8 h-8 rounded-full ${v.bg} border-2 transition-all duration-200 ${
                  selected === i
                    ? `border-white ring-2 ring-offset-2 ring-offset-zinc-900 ${v.ring}`
                    : "border-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Size Swatches */}
        <div>
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Size</p>
          <div className="flex gap-2">
            {sizes.map((size, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedSize(i)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-all duration-200 ${
                  selectedSize === i
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <motion.button
          onClick={handleCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            added ? "bg-emerald-500 text-black" : "bg-white text-black hover:bg-zinc-200"
          }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2"
              >
                ✓ Added to Cart!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

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
            <span className="text-zinc-400">Klenzo: AI Variants</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed">
            Replace boring Shopify dropdowns with AI-powered color & image swatches.
            Improve product pages, boost conversions, and support most themes.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Animated Dark Product Card */}
          <AnimatedProductCard />

          {/* RIGHT — Text Content */}
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

        </div>
      </div>
    </section>
  );
}
