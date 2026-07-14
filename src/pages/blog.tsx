"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { BookOpen, Clock, ArrowRight, X, Tag, ChevronRight, Sparkles } from "lucide-react"
import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { CursorFollower } from "@/components/ui/cursor-follower"

/* ─── Types ─────────────────────────────────────────────── */
interface BlogPost {
  id: string
  title: string
  category: "Shopify Tips" | "App Updates" | "Design Guide"
  date: string
  readTime: string
  thumbnail: string
  author: { name: string; avatar: string }
  summary: string
  content: string[]
}

/* ─── Data ───────────────────────────────────────────────── */
const blogPosts: BlogPost[] = [
  {
    id: "liquid-vs-blocks",
    title: "Why Liquid Sections Are Better Than App Blocks for Shopify Speed",
    category: "Shopify Tips",
    date: "July 05, 2026",
    readTime: "4 min read",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Explore why native Liquid templates compiled directly inside theme settings load significantly faster than heavy external JavaScript blocks.",
    content: [
      "In the modern e-commerce world, store loading speed is directly tied to conversions. A delay of just 1 second can drop conversions by up to 20%. While Shopify App Blocks offer convenience, they often introduce performance bottlenecks.",
      "App Blocks load scripts dynamically via Shopify's public CDN after the initial DOM page loads. This causes visible layout shifts (CLS) and triggers resource blockages. Klenzo's AI Section Hub resolves this by compiling styles directly into native Liquid blocks.",
      "By injecting clean Liquid scripts into theme files, sections load instantly with zero render blocking JS. Tests show stores using Liquid sections achieve PageSpeed scores over 95, compared to 70 when using dynamic external blocks.",
    ],
  },
  {
    id: "ai-color-swatches",
    title: "How to Increase Conversion Rates Using AI-Powered Color Swatches",
    category: "Design Guide",
    date: "June 28, 2026",
    readTime: "3 min read",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Ditch standard select dropdowns. Learn how visual image and color pills improve mobile checkout experiences and conversion rates.",
    content: [
      "Product variant select dropdowns are the biggest point of friction on mobile pages. Buyers want to see color styles immediately without tapping multiple dropdown links.",
      "Visual swatches give buyers immediate visual confirmation. Klenzo AI Swatches dynamically tag variant names and replace dropdowns with clean custom layout pills.",
      "Stores utilizing image swatches reported a 15% increase in Add-To-Cart rates, with mobile bounce rates dropping by up to 8%.",
    ],
  },
  {
    id: "reduce-layout-shifts",
    title: "Reducing Store Layout Shifts: Theme Customization Best Practices",
    category: "Shopify Tips",
    date: "June 14, 2026",
    readTime: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Klenzo Engineering", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" },
    summary: "Understand Cumulative Layout Shift (CLS) and discover key styling practices to guarantee clean, flicker-free rendering.",
    content: [
      "Layout shifts happen when elements suddenly shift positions after text loads, creating a bad layout experience and causing users to misclick.",
      "To avoid layout shifts, declare explicit width and height aspects on images, and cache theme variables globally. This allows browsers to reserve blank spaces in advance.",
      "By utilizing Klenzo App Embed configuration blocks, layout properties are parsed directly inside theme customizer headers, ensuring zero visual layout flickering.",
    ],
  },
  {
    id: "app-hub-v2",
    title: "AI Section Hub v2.0: Dynamic Grid Carousels & Reels Setup",
    category: "App Updates",
    date: "May 29, 2026",
    readTime: "2 min read",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Product Team", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" },
    summary: "Introducing our new shoppable social media video feeds and layout cards builder built directly into the templates catalog.",
    content: [
      "We are thrilled to launch AI Section Hub version 2.0. This release includes high-demand sections like shoppable Instagram Reels, FAQ dropdowns, and bundles.",
      "With our new layout editor, you can customize video feeds, tag product detail pages inside video lightboxes, and configure volume steps inside 5 minutes.",
      "Update the application directly from your Shopify dashboard to sync these sections instantly.",
    ],
  },
  {
    id: "quantity-bundles-aov",
    title: "The Ultimate Guide to Tiered Quantity Discount Bundles",
    category: "Design Guide",
    date: "May 10, 2026",
    readTime: "4 min read",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Learn step-by-step how to construct volume thresholds and buy-more-save-more widgets to double your store order values.",
    content: [
      "Tiered quantity bundles encourage buyers to purchase multiple units of the same variant in exchange for discounts, boosting your store AOV.",
      "Successful setups present discount steps visually right above the main Add-To-Cart button. Clear tags like 'Popular' or 'Best Value' help direct buyer choices.",
      "Klenzo bundles compile directly into Shopify's cart system, guaranteeing discounts match checkout values without checkout latency.",
    ],
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  "Shopify Tips": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "App Updates": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Design Guide": "bg-violet-500/10 text-violet-400 border-violet-500/20",
}

/* ─── Category Badge ─────────────────────────────────────── */
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${CATEGORY_COLORS[category] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
      <Tag className="w-2.5 h-2.5" />
      {category}
    </span>
  )
}

/* ─── Article Modal ──────────────────────────────────────── */
function ArticleModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center overflow-y-auto"
      style={{ padding: "2rem 1rem" }}
    >
      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl mx-auto bg-[#0e0e10] border border-zinc-800/60 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)] flex-shrink-0"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cover */}
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/30 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <CategoryBadge category={post.category} />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 pb-10 pt-6">
          {/* Meta */}
          <div className="flex items-center gap-3 text-zinc-500 text-xs font-semibold mb-4">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>{post.date}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-snug mb-6">
            {post.title}
          </h2>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-800/60">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-zinc-800 object-cover" />
            <div>
              <p className="text-sm text-white font-bold">{post.author.name}</p>
              <p className="text-xs text-zinc-500">Author</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 text-zinc-300 text-sm md:text-[15px] leading-[1.85]">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

/* ─── Main Blog Page ─────────────────────────────────────── */
export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const categories = ["All", "Shopify Tips", "App Updates", "Design Guide"]
  const featuredPost = blogPosts[0]
  const gridPosts = blogPosts.slice(1)
  const filteredPosts = gridPosts.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  )

  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-x-hidden">
      <CursorFollower />
      <Header1 />

      {/* ── Ambient Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-600/4 blur-[130px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <main className="relative z-10 container mx-auto max-w-6xl px-6 md:px-8 pt-36 pb-32">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Resource Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-5">
            Klenzo{" "}
            <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-white/50 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Guides, updates &amp; design tips to help you build a lightning-fast,
            high-converting Shopify storefront.
          </p>
        </motion.div>

        {/* ── Featured Post ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 mb-5">
            <BookOpen className="w-3.5 h-3.5" /> Featured Article
          </div>
          <div
            onClick={() => setSelectedPost(featuredPost)}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl overflow-hidden cursor-pointer hover:border-zinc-700/60 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
          >
            {/* Image */}
            <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden relative">
              <img
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080809] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] to-transparent lg:hidden" />
              {/* Featured pill */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black">
                  ✦ Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 flex flex-col justify-between p-7 md:p-9">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CategoryBadge category={featuredPost.category} />
                  <span className="text-zinc-600 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-zinc-100 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/50 pt-5 mt-6">
                <div className="flex items-center gap-3">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-9 h-9 rounded-full border border-zinc-800 object-cover" />
                  <div>
                    <p className="text-xs text-white font-bold">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-zinc-500 font-semibold">{featuredPost.date}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-zinc-800 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-zinc-700 text-xs font-semibold">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setSelectedPost(post)}
                className="group flex flex-col bg-zinc-900/20 border border-zinc-800/50 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-700/60 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-400"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-zinc-950">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <CategoryBadge category={post.category} />
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-white font-bold text-base leading-snug group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {post.summary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4 mt-1">
                    <div className="flex items-center gap-2.5">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full border border-zinc-800 object-cover" />
                      <div>
                        <p className="text-[10px] text-zinc-300 font-bold">{post.author.name}</p>
                        <p className="text-[9px] text-zinc-600 font-semibold">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-semibold">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>
                </div>

                {/* Read More Bar */}
                <div className="flex items-center gap-1.5 px-5 py-3 bg-white/[0.03] border-t border-zinc-800/50 text-zinc-500 group-hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No articles in this category yet.</p>
          </div>
        )}
      </main>

      {/* ── Article Reader Modal ── */}
      <AnimatePresence>
        {selectedPost && (
          <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>

      <MinimalFooter />
    </div>
  )
}
