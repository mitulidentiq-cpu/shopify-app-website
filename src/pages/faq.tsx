import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Search, Sparkles, HelpCircle, Layers, Zap, CreditCard, MessageSquare, ArrowRight } from "lucide-react"
import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { CursorFollower } from "@/components/ui/cursor-follower"

/* ─── Glowing Ambient Orb ───────────────────────────────── */
function GlowingOrb({ size, color, x, y, delay = 0 }: { size: number; color: string; x: string; y: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] opacity-15 pointer-events-none ${color}`}
      style={{ width: size, height: size, left: x, top: y }}
      animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

/* ─── Scroll-Triggered Fade-In ─────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FaqItem {
  id: string
  category: "General" | "AI Section Hub" | "AI Variants" | "Billing & Trial"
  question: string
  answer: string
}

export function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const categories = ["All", "General", "AI Section Hub", "AI Variants", "Billing & Trial"]

  const faqs: FaqItem[] = [
    {
      id: "speed-impact",
      category: "General",
      question: "Will Klenzo applications slow down my Shopify store's speed?",
      answer: "No. Both AI Section Hub and Variantify are built to compile configurations directly into your theme's native Liquid and CSS code files. Since they do not rely on heavy external render-blocking JavaScript files or CDN scripts during page initialization, your Google PageSpeed scores (99+ / A+) will remain fast and unaffected."
    },
    {
      id: "theme-support",
      category: "General",
      question: "What Shopify themes are compatible with Klenzo widgets?",
      answer: "All Online Store 2.0 themes (such as Dawn, Sense, Refresh, Craft, etc.) are 100% supported natively. Additionally, custom headers and headless Shopify store templates are fully supported by our backend integration handlers. If you use a legacy custom design, our support team can migrate the codes manually for you."
    },
    {
      id: "code-skills",
      category: "General",
      question: "Do I need developer skills or coding knowledge to configure sections?",
      answer: "Absolutely not. Our application interface provides an intuitive customizer simulator block. You can toggle elements, adjust spacing, modify color palettes, adjust padding, and update visual elements directly within the Shopify dashboard editor. It's completely visual and drag-and-drop."
    },
    {
      id: "reels-feed",
      category: "AI Section Hub",
      question: "How does the Instagram Reels and Video Feed section work?",
      answer: "The Reels section allows you to sync your Instagram account or upload videos manually. You can display these in grids or slider carousels, and tag specific products inside each video. When buyers tap on a reel, it opens a shoppable detail lightbox card right on your product or home page, letting customers buy in 1-click."
    },
    {
      id: "quantity-discounts",
      category: "AI Section Hub",
      question: "How do quantity bundles boost my store's Average Order Value (AOV)?",
      answer: "Quantity break widgets encourage buyers to purchase multiple units of the same item in exchange for tiered discounts (e.g., Buy 2 get 10% off, Buy 3 get 20% off). Displaying these visually above the Add-To-Cart trigger motivates shoppers to increase their cart sizes, instantly boosting your AOV."
    },
    {
      id: "ai-detection",
      category: "AI Variants",
      question: "How does Variantify's AI-powered swatch detection work?",
      answer: "Variantify scans your product configuration metadata. Once activated, our AI logic automatically identifies name labels (such as 'Color', 'Size', 'Material') and links them to corresponding visual pills, color swatches, or variant images. You don't have to manually configure mapping tables."
    },
    {
      id: "swatch-types",
      category: "AI Variants",
      question: "Can I use custom image files for color swatches instead of solid colors?",
      answer: "Yes, you can upload custom swatch images, use actual product variant image thumbnails, or specify HEX codes. This is perfect for patterns, fabrics, multicolors, or unique product designs that solid colors can't represent."
    },
    {
      id: "trial-billing",
      category: "Billing & Trial",
      question: "How does the free trial billing schedule work?",
      answer: "We offer fully unlocked 7-day trials. You can configure and test all customizers, sections, and swatches. You won't be charged if you uninstall the application before the 7th day finishes. All billing structures and cycles are handled securely by Shopify's platform API billing."
    },
    {
      id: "uninstallation-junk",
      category: "Billing & Trial",
      question: "What happens to the code if I choose to uninstall the apps?",
      answer: "When you uninstall, Klenzo triggers automatic cleanup webhooks. Our script core deletes the theme variables and sections layout links safely from your active theme code. There will be zero orphaned scripts left behind to clutter or slow down your shop storefront."
    }
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CursorFollower />
      <Header1 />

      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <GlowingOrb size={600} color="bg-violet-600" x="70%" y="-10%" delay={0} />
        <GlowingOrb size={500} color="bg-pink-600" x="-10%" y="25%" delay={2} />
        <GlowingOrb size={400} color="bg-sky-600" x="40%" y="60%" delay={4} />
      </div>

      <main className="relative z-10 container mx-auto max-w-4xl px-6 md:px-8 pt-36 pb-32">
        
        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur text-zinc-400 text-xs uppercase tracking-widest font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              Information Desk
            </span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
              Everything you need to know about Klenzo apps, store performance, custom swatches, and installation setups.
            </p>
          </FadeUp>
        </div>

        {/* Search & Category Filter Section */}
        <FadeUp delay={0.25} className="mb-12 flex flex-col gap-6">
          {/* Search Box */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-10 focus-within:opacity-15 transition-opacity duration-300 pointer-events-none blur-sm" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 z-20">
              <Search className="w-5 h-5 group-focus-within:text-violet-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. speed, swatches, pricing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-violet-500/60 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-all duration-300 relative z-10"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-800/80 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                  selectedCategory === cat
                    ? "bg-zinc-850 text-white border border-zinc-700/65 shadow-md"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat === "General" && <HelpCircle className="w-3.5 h-3.5" />}
                  {cat === "AI Section Hub" && <Layers className="w-3.5 h-3.5" />}
                  {cat === "AI Variants" && <Zap className="w-3.5 h-3.5" />}
                  {cat === "Billing & Trial" && <CreditCard className="w-3.5 h-3.5" />}
                  {cat}
                </span>
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="faqActiveTab"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-850 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* FAQs list accordion */}
        <FadeUp delay={0.3} className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openIndex === faq.id
                  return (
                    <div
                      key={faq.id}
                      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "border-violet-500/30 bg-zinc-950/80 shadow-[0_0_30px_rgba(139,92,246,0.05)]"
                          : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full text-left p-6 flex justify-between items-center gap-4 group focus:outline-none cursor-pointer"
                      >
                        <div className="flex gap-4 items-center">
                          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                            {faq.category}
                          </span>
                          <span className="text-white font-bold text-base md:text-lg leading-tight transition-colors group-hover:text-violet-400">
                            {faq.question}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full border border-zinc-800 bg-black text-zinc-400 transition-all duration-300 shrink-0 ${
                            isOpen ? "rotate-180 border-violet-500/30 text-violet-400 bg-violet-500/5" : "group-hover:text-white group-hover:border-zinc-700"
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
                            <div className="px-6 pb-6 pt-3 text-zinc-400 text-sm md:text-base leading-relaxed border-t border-zinc-900/50">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="text-center py-16 bg-zinc-950/30 border border-zinc-800/80 rounded-3xl"
              >
                <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-1">No FAQs Found</h3>
                <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try using different terms or check categories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeUp>

        {/* Call to Action Support Card */}
        <FadeUp delay={0.35} className="mt-20">
          <div className="relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 md:p-10 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-violet-500/25 transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/5 blur-[60px] pointer-events-none rounded-full" />
            
            <div className="flex gap-4 items-start text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <MessageSquare className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl">Still have questions?</h3>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                  Can't find what you are looking for? Send us a direct support message and the founder will help you personally.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors shadow-lg active:scale-97 shrink-0"
            >
              Contact Support
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </FadeUp>

      </main>

      <MinimalFooter />
    </div>
  )
}
