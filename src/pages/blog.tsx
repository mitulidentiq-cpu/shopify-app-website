import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { BookOpen, Clock, ArrowRight } from "lucide-react"
import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { CursorFollower } from "@/components/ui/cursor-follower"

/* ─── Type Definitions ──────────────────────────────────── */
interface BlogPost {
  id: string
  title: string
  category: "Shopify Tips" | "App Updates" | "Design Guide"
  date: string
  readTime: string
  thumbnail: string
  author: {
    name: string
    avatar: string
  }
  summary: string
  content: string[]
}

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

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const categories = ["All", "Shopify Tips", "App Updates", "Design Guide"]

  const blogPosts: BlogPost[] = [
    {
      id: "liquid-vs-blocks",
      title: "Why Liquid Sections Are Better Than App Blocks for Shopify Speed",
      category: "Shopify Tips",
      date: "July 05, 2026",
      readTime: "4 min read",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80",
      author: {
        name: "Mitul Zalavadiya",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
      },
      summary: "Explore why native Liquid templates compiled directly inside theme settings load significantly faster than heavy external JavaScript blocks.",
      content: [
        "In the modern e-commerce world, store loading speed is directly tied to conversions. A delay of just 1 second can drop conversions by up to 20%. While Shopify App Blocks offer convenience, they often introduce performance bottlenecks.",
        "App Blocks load scripts dynamically via Shopify's public CDN after the initial DOM page loads. This causes visible layout shifts (CLS) and triggers resource blockages. Klenzo's AI Section Hub resolves this by compiling styles directly into native Liquid blocks.",
        "By injecting clean Liquid scripts into theme files, sections load instantly with zero render blocking JS. Tests show stores using Liquid sections achieve PageSpeed scores over 95, compared to 70 when using dynamic external blocks."
      ]
    },
    {
      id: "ai-color-swatches",
      title: "How to Increase Conversion Rates Using AI-Powered Color Swatches",
      category: "Design Guide",
      date: "June 28, 2026",
      readTime: "3 min read",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
      author: {
        name: "Mitul Zalavadiya",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
      },
      summary: "Ditch standard select dropdowns. Learn how visual image and color pills improve mobile checkout experiences and conversion rates.",
      content: [
        "Product variant select dropdowns are the biggest point of friction on mobile pages. Buyers want to see color styles immediately without tapping multiple dropdown links.",
        "Visual swatches give buyers immediate visual confirmation. Klenzo AI Swatches dynamically tag variant names and replace dropdowns with clean custom layout pills.",
        "Stores utilizing image swatches reported a 15% increase in Add-To-Cart rates, with mobile bounce rates dropping by up to 8%."
      ]
    },
    {
      id: "reduce-layout-shifts",
      title: "Reducing Store Layout Shifts: Theme Customization Best Practices",
      category: "Shopify Tips",
      date: "June 14, 2026",
      readTime: "5 min read",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
      author: {
        name: "Klenzo Engineering",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
      },
      summary: "Understand Cumulative Layout Shift (CLS) and discover key styling practices to guarantee clean, flicker-free rendering.",
      content: [
        "Layout shifts happen when elements suddenly shift positions after text loads, creating a bad layout experience and causing users to misclick.",
        "To avoid layout shifts, declare explicit width and height aspects on images, and cache theme variables globally. This allows browsers to reserve blank spaces in advance.",
        "By utilizing Klenzo App Embed configuration blocks, layout properties are parsed directly inside theme customizer headers, ensuring zero visual layout flickering."
      ]
    },
    {
      id: "app-hub-v2",
      title: "AI Section Hub v2.0: Dynamic Grid Carousels & Reels Setup",
      category: "App Updates",
      date: "May 29, 2026",
      readTime: "2 min read",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&auto=format&fit=crop&q=80",
      author: {
        name: "Product Team",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
      },
      summary: "Introducing our new shoppable social media video feeds and layout cards builder built directly into the templates catalog.",
      content: [
        "We are thrilled to launch AI Section Hub version 2.0. This release includes high-demand sections like shoppable Instagram Reels, FAQ dropdowns, and bundles.",
        "With our new layout editor, you can customize video feeds, tag product detail pages inside video lightboxes, and configure volume steps inside 5 minutes.",
        "Update the application directly from your Shopify dashboard to sync these sections instantly."
      ]
    },
    {
      id: "quantity-bundles-aov",
      title: "The Ultimate Guide to Tiered Quantity Discount Bundles",
      category: "Design Guide",
      date: "May 10, 2026",
      readTime: "4 min read",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80",
      author: {
        name: "Mitul Zalavadiya",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
      },
      summary: "Learn step-by-step how to construct volume thresholds and buy-more-save-more widgets to double your store order values.",
      content: [
        "Tiered quantity bundles encourage buyers to purchase multiple units of the same variant in exchange for discounts, boosting your store AOV.",
        "Successful setups present discount steps visually right above the main Add-To-Cart button. Clear tags like 'Popular' or 'Best Value' help direct buyer choices.",
        "Klenzo bundles compile directly into Shopify's cart system, guaranteeing discounts match checkout values without checkout latency."
      ]
    }
  ]

  const featuredPost = blogPosts[0]
  const remainingPosts = blogPosts.slice(1)

  const filteredPosts = remainingPosts.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  )

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

      <main className="relative z-10 container mx-auto max-w-6xl px-6 md:px-8 pt-36 pb-32">
        {/* Intro Header Section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur text-zinc-400 text-xs uppercase tracking-widest font-bold mb-6">
              <BookOpen className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              Resource Center
            </span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-6">
              Klenzo{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Guides, updates, and design tips to help you build a lightning-fast, high-converting Shopify storefront.
            </p>
          </FadeUp>
        </div>

        {/* Featured Post Card (Top Highlight) */}
        <FadeUp delay={0.25} className="mb-20">
          <div
            onClick={() => setSelectedPost(featuredPost)}
            className="group relative bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-zinc-700/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 cursor-pointer overflow-hidden shadow-2xl"
          >
            {/* Image block */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-video bg-zinc-950 border border-zinc-850">
              <img
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
            </div>

            {/* Info block */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                  <span className="px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4 group-hover:text-violet-400 transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                  {featuredPost.summary}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="flex items-center justify-between border-t border-zinc-800/85 pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full border border-zinc-800"
                  />
                  <div>
                    <span className="text-xs text-white font-bold block">{featuredPost.author.name}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">{featuredPost.date}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-violet-400 group-hover:text-white transition-colors duration-300 shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Category Filters Feed */}
        <FadeUp delay={0.3} className="flex flex-wrap items-center gap-3 mb-10 border-b border-zinc-800/80 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                selectedCategory === cat
                  ? "bg-zinc-850 text-white border border-zinc-700/65 shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeUp>

        {/* Blog Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-5 backdrop-blur hover:border-zinc-700/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850 mb-5">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 text-[9px] uppercase tracking-wider font-extrabold">
                      {post.category}
                    </span>
                  </div>

                  {/* Title & summary */}
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-violet-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-3 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>

                {/* Footer details */}
                <div className="border-t border-zinc-800/85 pt-4 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full border border-zinc-850"
                    />
                    <div>
                      <span className="text-[10px] text-zinc-300 font-bold block">{post.author.name}</span>
                      <span className="text-[9px] text-zinc-500 font-semibold">{post.date}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Blog Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl my-8 bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-black/80 hover:bg-black border border-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-xs font-bold"
              >
                ✕
              </button>

              {/* Cover Banner */}
              <div className="aspect-[21/9] w-full bg-zinc-950 border-b border-zinc-900 relative">
                <img
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5">
                  <span className="px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                    {selectedPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6 leading-tight">
                  {selectedPost.title}
                </h2>

                {/* Author Info banner */}
                <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl mb-8">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-10 h-10 rounded-full border border-zinc-800"
                  />
                  <div>
                    <span className="text-xs text-white font-bold block">{selectedPost.author.name}</span>
                    <span className="text-[10px] text-zinc-500 font-semibold">Published on {selectedPost.date}</span>
                  </div>
                </div>

                {/* Text Body */}
                <div className="flex flex-col gap-5 text-zinc-300 text-sm md:text-base leading-relaxed">
                  {selectedPost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MinimalFooter />
    </div>
  )
}
