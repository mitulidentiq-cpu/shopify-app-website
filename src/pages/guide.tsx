import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, Layers, Zap, BookOpen, Settings, HelpCircle, CheckCircle2, ChevronRight, Monitor, Laptop, Play } from "lucide-react"
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

/* ─── FadeUp Entry Animation ───────────────────────────── */
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

export function GuidePage() {
  const [activeTab, setActiveTab] = useState<"hub" | "variants" | "general">("hub")
  const [activeStep, setActiveStep] = useState(1)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const videos = [
    {
      id: "2M13L18AugI",
      title: "AI Section Hub: Getting Started & Theme Setup",
      duration: "3:40",
      thumbnail: "https://img.youtube.com/vi/2M13L18AugI/hqdefault.jpg",
      description: "Learn how to activate the App Embed code and integrate Klenzo components into your Shopify theme."
    },
    {
      id: "bFgpeJPlMBU",
      title: "How to Configure Custom Theme Sections",
      duration: "5:12",
      thumbnail: "https://img.youtube.com/vi/bFgpeJPlMBU/hqdefault.jpg",
      description: "Detailed walkthrough of customizing layouts, margins, typography, and colors with no-code."
    },
    {
      id: "xtGEvdR5ukY",
      title: "AI Variants Swatches: Dropdowns Replacement",
      duration: "4:05",
      thumbnail: "https://img.youtube.com/vi/xtGEvdR5ukY/hqdefault.jpg",
      description: "Setup AI automatic color matching to replace Shopify's default product variant selector dropdowns."
    },
    {
      id: "RjLKL8BEiWQ",
      title: "Integrating Shoppable Instagram Reels Feed",
      duration: "3:55",
      thumbnail: "https://img.youtube.com/vi/RjLKL8BEiWQ/hqdefault.jpg",
      description: "How to connect your social media feeds and tag product links directly inside shoppable video grids."
    },
    {
      id: "4N3o7UhKauk",
      title: "Quantity Discount Bundles Setup Guide",
      duration: "4:20",
      thumbnail: "https://img.youtube.com/vi/4N3o7UhKauk/hqdefault.jpg",
      description: "Maximize your store's AOV by creating high-converting tiered volume discount sections."
    }
  ]

  const stats = [
    { value: "5 min", label: "Average Setup" },
    { value: "Zero", label: "Code Required" },
    { value: "100%", label: "Theme Safe" },
  ]

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
        {/* Intro Section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur text-zinc-400 text-xs uppercase tracking-widest font-bold mb-6">
              <BookOpen className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              Interactive Playbook
            </span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-6">
              Application{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                User Guide
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="mt-8">
              <a
                href="https://youtube.com/@ai-section-hub?si=p8-m7K8kE8XTQcR_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 text-red-400 text-xs uppercase tracking-wider font-extrabold transition-all duration-200 hover:scale-102 hover:border-red-500/40 cursor-pointer shadow-lg shadow-red-500/5"
              >
                <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Video Tutorials on YouTube
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Dynamic Metric Stats */}
        <FadeUp delay={0.25}>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mb-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur text-center hover:border-zinc-700/50 transition-colors">
                <span className="text-2xl md:text-3xl font-black text-white block">{stat.value}</span>
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Tab Selectors (App categories) */}
        <FadeUp delay={0.3}>
          <div className="flex border-b border-zinc-800 gap-8 mb-12">
            <button
              onClick={() => { setActiveTab("hub"); setActiveStep(1); }}
              className={`pb-4 text-sm font-bold uppercase tracking-wider cursor-pointer relative transition-colors ${
                activeTab === "hub" ? "text-violet-400 font-black" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                AI Section Hub
              </span>
              {activeTab === "hub" && (
                <motion.div layoutId="guideActiveTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-400" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab("variants"); setActiveStep(1); }}
              className={`pb-4 text-sm font-bold uppercase tracking-wider cursor-pointer relative transition-colors ${
                activeTab === "variants" ? "text-pink-400 font-black" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Klenzo: AI Variants
              </span>
              {activeTab === "variants" && (
                <motion.div layoutId="guideActiveTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-400" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab("general"); setActiveStep(1); }}
              className={`pb-4 text-sm font-bold uppercase tracking-wider cursor-pointer relative transition-colors ${
                activeTab === "general" ? "text-sky-400 font-black" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                General Settings
              </span>
              {activeTab === "general" && (
                <motion.div layoutId="guideActiveTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-400" />
              )}
            </button>
          </div>
        </FadeUp>

        {/* Guide Steps Interactive Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Interactive Steps List (Left column) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {activeTab === "hub" && (
                <motion.div
                  key="hub-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-2 px-1">
                    AI Section Hub Walkthrough
                  </span>

                  {[
                    { step: 1, title: "Enable App Embed", desc: "Activate AI Section Hub in Shopify theme customizer settings." },
                    { step: 2, title: "Select Theme Section", desc: "Browse from 700+ premium templates (Reels, FAQ, Volumes)." },
                    { step: 3, title: "Insert & Style", desc: "Drag and drop directly to your template and customize parameters." },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                        activeStep === s.step
                          ? "bg-zinc-900/60 border-violet-500/30 shadow-lg shadow-violet-500/5 text-white"
                          : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          activeStep === s.step ? "bg-violet-400 text-black" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {s.step}
                        </span>
                        <h3 className="font-bold text-sm">{s.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-xs mt-2 pl-9 leading-relaxed">{s.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === "variants" && (
                <motion.div
                  key="variants-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-2 px-1">
                    Klenzo AI Swatches Setup
                  </span>

                  {[
                    { step: 1, title: "Variant Auto-Detection", desc: "Let our AI algorithm scan and categorize variant tags." },
                    { step: 2, title: "Customize Swatch Style", desc: "Choose color swatch circles, size pills, or variant image blocks." },
                    { step: 3, title: "Theme Swatch Activation", desc: "Replace standard dropdowns and publish to product pages." },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                        activeStep === s.step
                          ? "bg-zinc-900/60 border-pink-500/30 shadow-lg shadow-pink-500/5 text-white"
                          : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          activeStep === s.step ? "bg-pink-400 text-black" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {s.step}
                        </span>
                        <h3 className="font-bold text-sm">{s.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-xs mt-2 pl-9 leading-relaxed">{s.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === "general" && (
                <motion.div
                  key="general-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-2 px-1">
                    System Parameters
                  </span>

                  {[
                    { step: 1, title: "Integrate App Embed block", desc: "Essential step to render styles without theme layout shifts." },
                    { step: 2, title: "Theme Migration support", desc: "Sync custom customizer sections securely across theme updates." },
                    { step: 3, title: "Performance Metrics", desc: "Check page speeds. Our templates compile to native Liquid scripts." },
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                        activeStep === s.step
                          ? "bg-zinc-900/60 border-sky-500/30 shadow-lg shadow-sky-500/5 text-white"
                          : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          activeStep === s.step ? "bg-sky-400 text-black" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {s.step}
                        </span>
                        <h3 className="font-bold text-sm">{s.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-xs mt-2 pl-9 leading-relaxed">{s.desc}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Mock Customizer Graphic (Right column) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden min-h-[380px]">
              
              {/* Header bar of customizer mock */}
              <div className="border-b border-zinc-800/80 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800 shrink-0" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800 shrink-0" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800 shrink-0" />
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-3">
                    Shopify Customizer Simulator
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-850 px-3 py-1 rounded-lg text-[9px] uppercase tracking-wider text-zinc-400">
                  <Laptop className="w-3 h-3" /> Live Preview
                </div>
              </div>

              {/* Graphic Display Panel (Changes based on activeTab & activeStep) */}
              <div className="flex-1 flex items-center justify-center p-6 relative">
                <AnimatePresence mode="wait">
                  {/* --- AI SECTION HUB MOCK VISUALS --- */}
                  {activeTab === "hub" && activeStep === 1 && (
                    <motion.div
                      key="hub-step-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">App Embed Block</span>
                        <div className="w-8 h-4 rounded-full bg-violet-600 relative p-0.5 flex justify-end">
                          <div className="w-3 h-3 rounded-full bg-white shadow" />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                        Toggle on <strong>AI Section Hub</strong> inside the App embeds section on the left menu.
                      </p>
                      <div className="bg-violet-500/10 border border-violet-500/20 px-3.5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] text-violet-400 font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Script core active
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "hub" && activeStep === 2 && (
                    <motion.div
                      key="hub-step-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm grid grid-cols-2 gap-3"
                    >
                      {[
                        { title: "FAQ Accordion", icon: HelpCircle, color: "from-violet-500 to-purple-600" },
                        { title: "Instagram Reels", icon: Monitor, color: "from-pink-500 to-rose-600" },
                        { title: "Quantity Bundles", icon: Sparkles, color: "from-amber-500 to-orange-600" },
                        { title: "Image Carousel", icon: Layers, color: "from-sky-500 to-blue-600" },
                      ].map((item, i) => (
                        <div key={i} className="bg-zinc-950/70 border border-zinc-850 p-4 rounded-xl flex flex-col justify-between group hover:border-violet-500/30 transition-colors">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-[10px] font-bold mt-4 uppercase tracking-wider text-zinc-300">{item.title}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "hub" && activeStep === 3 && (
                    <motion.div
                      key="hub-step-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-white border-b border-zinc-800 pb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                        Customizing Parameters
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Gap padding</span>
                          <span className="text-[10px] text-white font-bold bg-zinc-950 px-2 py-1 rounded">24px</span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Accent Color</span>
                          <div className="w-4 h-4 rounded bg-violet-500 border border-white/20" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- KLENZO AI VARIANTS MOCK VISUALS --- */}
                  {activeTab === "variants" && activeStep === 1 && (
                    <motion.div
                      key="variants-step-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/25 flex items-center justify-center mx-auto">
                        <Sparkles className="w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-white block uppercase tracking-wider">Scanning variant values</span>
                        <p className="text-[10px] text-zinc-500 mt-1">AI algorithm matching color, sizes, and templates.</p>
                      </div>
                      <div className="bg-pink-500/10 border border-pink-500/20 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-pink-400">
                        Scan Complete: 12 Swatches Setup
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "variants" && activeStep === 2 && (
                    <motion.div
                      key="variants-step-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm flex flex-col gap-4"
                    >
                      <div className="bg-zinc-950/70 border border-zinc-850 p-5 rounded-2xl flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Color Swatches</span>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#ff0000] border-2 border-white ring-2 ring-violet-500/20" />
                          <div className="w-8 h-8 rounded-full bg-[#00ff00] border-2 border-zinc-800" />
                          <div className="w-8 h-8 rounded-full bg-[#0000ff] border-2 border-zinc-800" />
                          <div className="w-8 h-8 rounded-full bg-[#ffff00] border-2 border-zinc-800" />
                        </div>
                      </div>
                      <div className="bg-zinc-950/70 border border-zinc-850 p-5 rounded-2xl flex flex-col gap-3">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Size Selector</span>
                        <div className="flex gap-2 text-[10px] font-bold">
                          <span className="px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/5 text-pink-400">S</span>
                          <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400">M</span>
                          <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400">L</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "variants" && activeStep === 3 && (
                    <motion.div
                      key="variants-step-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400 font-bold">
                        ✓
                      </div>
                      <div>
                        <span className="text-xs font-black text-white block uppercase tracking-wider">Swatches Published</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Standard dropdowns replaced successfully.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* --- GENERAL SETTINGS MOCK VISUALS --- */}
                  {activeTab === "general" && activeStep === 1 && (
                    <motion.div
                      key="general-step-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Core Integration</span>
                        <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Connected</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        App Embed scripts are cached globally. This resolves rendering flashes during storefront page load transitions.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "general" && activeStep === 2 && (
                    <motion.div
                      key="general-step-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto">
                        <Layers className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-white block uppercase tracking-wider">Sync Themes</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Auto migrating liquid elements to your live theme files.</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "general" && activeStep === 3 && (
                    <motion.div
                      key="general-step-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-sm bg-zinc-950/70 border border-zinc-850 p-6 rounded-2xl flex flex-col gap-4 text-center"
                    >
                      <div className="text-4xl font-black text-emerald-400">99 // A+</div>
                      <div>
                        <span className="text-xs font-black text-white block uppercase tracking-wider">Google PageSpeed Score</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Sections load instantly. Clean native Shopify liquid output.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom bar of customizer mock */}
              <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-between text-zinc-600 text-[10px] font-bold">
                <span>Viewport: Desktop // 1440px</span>
                <span className="text-violet-400 flex items-center gap-1">
                  Step {activeStep} of 3 <ChevronRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Video Tutorials Section */}
        <FadeUp delay={0.4}>
          <div className="mt-28 border-t border-zinc-800/80 pt-20">
            <div className="max-w-3xl mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] uppercase tracking-widest font-bold mb-4">
                <Play className="w-3 h-3 fill-current" />
                Video Library
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                Video Walkthroughs & Tutorials
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Watch detailed walkthroughs of how Klenzo applications can improve your conversion rates and shop setups instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((video, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo(video.id)}
                  className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur hover:border-zinc-700/50 transition-all duration-300 group cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center border border-red-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-zinc-300 border border-zinc-800">
                      {video.duration}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-white font-bold text-sm mt-4 group-hover:text-red-400 transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-2 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

      </main>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-black"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/80 hover:bg-black border border-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors text-xs font-bold"
              >
                ✕
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MinimalFooter />
    </div>
  )
}
