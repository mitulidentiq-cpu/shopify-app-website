"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpRight } from "lucide-react";

interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      number: "01",
      question: "Will this app slow down my Shopify store?",
      answer: "No. The app uses optimized, asynchronous JavaScript loading that does not block rendering. It has a negligible impact of under 4kb on your page weight, maintaining your Google Lighthouse speed score.",
    },
    {
      number: "02",
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day fully-featured free trial. You can test all layout customizers, AI upsell triggers, and analytics tools without any upfront commitments.",
    },
    {
      number: "03",
      question: "Does it support Shopify Markets and multi-currency?",
      answer: "Absolutely. All bundles, progressive quantity discounts, and custom pricing triggers automatically convert to your customers' local checkout currency using active Shopify exchange rates.",
    },
    {
      number: "04",
      question: "How is the layout customized to match my theme?",
      answer: "We provide an intuitive visual editor inside the Shopify admin panel. You can easily adjust borders, text colors, font styles, and padding to match your theme perfectly without touching code.",
    },
    {
      number: "05",
      question: "How can I install Bundlify on my store?",
      answer: "Simply click 'Install on Shopify Store' on this page, log in to your Shopify account, and follow the 1-click installer. Our auto-install script sets everything up in under 2 minutes.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-8 border-t border-zinc-950 bg-black text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Heading Context */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="inline-flex w-fit px-3 py-1 text-xs uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full font-medium">
              Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              We're here to answer all your questions
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
              Quick answers to common questions about Bundlify. Can't find what you are looking for? Learn more in our full documentation.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white font-bold text-sm border-b border-white pb-1 w-fit hover:text-zinc-300 hover:border-zinc-300 transition-colors group mt-2"
            >
              Read full documentation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Column - Accordion Items */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-xl transition-all duration-300 ${
                    isOpen
                      ? "border-white/20 bg-zinc-950/80 shadow-md"
                      : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 group focus:outline-none"
                  >
                    <div className="flex gap-4 items-center">
                      <span className="font-mono text-zinc-500 text-sm font-semibold">{faq.number}.</span>
                      <span className="text-white font-bold text-base md:text-lg leading-tight transition-colors group-hover:text-zinc-200">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 bg-black text-zinc-400 transition-all duration-300 ${
                        isOpen ? "rotate-180 border-white/20 text-white" : "group-hover:text-white group-hover:border-zinc-700"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-14 text-zinc-400 text-sm md:text-base leading-relaxed border-t border-zinc-900/50 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
