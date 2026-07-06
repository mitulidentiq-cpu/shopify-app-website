"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import logo2 from "@/app logo/logo2.png";
import logo3 from "@/app logo/logo3.png";

export function AppsOverview() {
  const apps = [
    {
      title: "AI Section Hub",
      logo: logo2,
      description: "Transform your store design with 700+ native premium sections. Install FAQ pages, reels, sliders, and bundles instantly without any code.",
      href: "https://apps.shopify.com/sectionly?search_id=51ad5287-4c05-4dd7-a428-e2f8353694e1&surface_detail=ai9+section+hub&surface_inter_position=1&surface_intra_position=5&surface_type=search",
      badge: "Design & Conversion"
    },
    {
      title: "Variantify",
      logo: logo3,
      description: "Replace standard Shopify variant dropdowns with beautiful, AI-powered color swatches and image buttons to boost conversions.",
      href: "https://apps.shopify.com/variantify-1?search_id=2bf64c58-8f42-4490-94cc-ea44d5bab45f&surface_detail=klenzo&surface_inter_position=1&surface_intra_position=1&surface_type=search",
      badge: "Product Swatches"
    }
  ];

  return (
    <section id="our-apps" className="w-full py-20 bg-zinc-50 border-t border-b border-zinc-200">
      <div className="container mx-auto max-w-5xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full">
            Klenzo Product Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
            Choose Your Store Booster
          </h2>
          <p className="text-zinc-500 max-w-lg text-sm md:text-base">
            Click on either app to visit its Shopify App Store page and start your 14-day free trial.
          </p>
        </div>

        {/* 2-Column App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {apps.map((app, index) => (
            <motion.a
              key={index}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col bg-white border border-zinc-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-zinc-300 transition-all duration-300 group"
            >
              {/* Top Badge & Arrow */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {app.badge}
                </span>
                <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-zinc-100 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Logo Area */}
              <div className="h-28 w-full flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100 p-4">
                <img
                  src={app.logo}
                  alt={`${app.title} logo`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* App Meta */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-black transition-colors">
                  {app.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
