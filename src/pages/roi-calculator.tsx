import { useState, useEffect } from "react"
import { motion, animate } from "motion/react"
import { Calculator, ArrowRight, ShieldCheck, Zap, Sparkles, DollarSign, Percent, Users } from "lucide-react"
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

/* ─── Animated Number Counter Component ─────────────────── */
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    })
    return () => controls.stop()
  }, [value])

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export function RoiCalculatorPage() {
  // Inputs states
  const [traffic, setTraffic] = useState(50000)
  const [aov, setAov] = useState(50)
  const [conversionRate, setConversionRate] = useState(2.0)

  // Calculations details
  // 1. Current state metrics
  const currentOrders = Math.round(traffic * (conversionRate / 100))
  const currentRevenue = currentOrders * aov

  // 2. Klenzo setup metrics
  // Swatches boost conversion by average 15%
  const newConversionRate = conversionRate * 1.15
  const newOrders = Math.round(traffic * (newConversionRate / 100))
  // Bundles boost AOV by average 20%
  const newAov = aov * 1.20
  const newRevenue = Math.round(newOrders * newAov)

  // 3. Difference ROI metrics
  const monthlyBoost = Math.max(0, newRevenue - currentRevenue)
  const annualBoost = monthlyBoost * 12

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CursorFollower />
      <Header1 />

      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <GlowingOrb size={600} color="bg-zinc-900" x="70%" y="-10%" delay={0} />
        <GlowingOrb size={500} color="bg-zinc-900" x="-10%" y="25%" delay={2} />
        <GlowingOrb size={400} color="bg-zinc-900" x="40%" y="60%" delay={4} />
      </div>

      <main className="relative z-10 container mx-auto max-w-6xl px-6 md:px-8 pt-36 pb-32">
        {/* Intro section */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-850 bg-zinc-900/60 backdrop-blur text-zinc-400 text-xs uppercase tracking-widest font-bold mb-6">
              <Calculator className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
              Growth Telemetry
            </span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-6">
              ROI & Revenue{" "}
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Calculate your store's growth potential. Drag the sliders to see how AI Section Hub quantity bundles and Klenzo variant swatches boost conversions and order values.
            </p>
          </FadeUp>
        </div>

        {/* Layout: Input Panel & Results Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inputs Section (Left Column) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <FadeUp delay={0.25}>
              <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur flex flex-col gap-8">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-800/80 pb-3 block">
                  Store Parameters
                </span>

                {/* Slider 1: Traffic */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Users className="w-4 h-4 text-zinc-400" /> Monthly Traffic
                    </span>
                    <span className="text-white text-base">
                      {traffic.toLocaleString()} visitors
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase mt-1">
                    <span>5,000</span>
                    <span>250,000</span>
                    <span>500,000</span>
                  </div>
                </div>

                {/* Slider 2: AOV */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-zinc-400" /> Average Order Value
                    </span>
                    <span className="text-white text-base">
                      ${aov}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase mt-1">
                    <span>$10</span>
                    <span>$150</span>
                    <span>$300</span>
                  </div>
                </div>

                {/* Slider 3: Conversion Rate */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Percent className="w-4 h-4 text-zinc-400" /> Conversion Rate
                    </span>
                    <span className="text-white text-base">
                      {conversionRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase mt-1">
                    <span>0.5%</span>
                    <span>5.0%</span>
                    <span>10.0%</span>
                  </div>
                </div>

              </div>
            </FadeUp>

            {/* Metrics Breakdown */}
            <FadeUp delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Current orders</span>
                  <span className="text-xl font-black text-zinc-300 block mt-1.5">
                    {currentOrders.toLocaleString()} orders/mo
                  </span>
                </div>
                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Current revenue</span>
                  <span className="text-xl font-black text-zinc-300 block mt-1.5">
                    ${currentRevenue.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Results dashboard (Right Column) */}
          <div className="lg:col-span-6 flex flex-col gap-6 sticky top-28">
            <FadeUp delay={0.35}>
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
                
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/10 blur-[50px] pointer-events-none rounded-full" />
                
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-350 text-[10px] uppercase tracking-wider font-extrabold mb-6">
                    <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Predicted Growth
                  </span>

                  <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
                    Estimated Annual Revenue Increase
                  </h3>
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8">
                    <AnimatedCounter value={annualBoost} prefix="$" />
                  </div>

                  {/* Comparisons meters */}
                  <div className="flex flex-col gap-4 border-t border-zinc-800/85 pt-6 mb-8">
                    {/* Meter 1: Conversion Boost */}
                    <div className="flex justify-between items-center bg-zinc-950/60 p-4 rounded-xl border border-zinc-850">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Conversion rate boost (+15%)</span>
                        <span className="text-white text-sm font-bold mt-1 block">
                          {conversionRate.toFixed(1)}% <ArrowRight className="w-3 h-3 inline mx-1.5 text-zinc-600" /> {newConversionRate.toFixed(2)}%
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                        AI Swatches
                      </span>
                    </div>

                    {/* Meter 2: AOV Boost */}
                    <div className="flex justify-between items-center bg-zinc-950/60 p-4 rounded-xl border border-zinc-850">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">Average Order Value boost (+20%)</span>
                        <span className="text-white text-sm font-bold mt-1 block">
                          ${aov} <ArrowRight className="w-3 h-3 inline mx-1.5 text-zinc-600" /> ${newAov.toFixed(0)}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                        Volume Bundles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom summaries & CTA */}
                <div className="flex flex-col gap-4 border-t border-zinc-800/85 pt-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <span>Monthly Increase</span>
                    <span className="text-white font-extrabold text-base">
                      <AnimatedCounter value={monthlyBoost} prefix="+$" />
                    </span>
                  </div>

                  <a
                    href="https://apps.shopify.com/sectionly?st_source=autocomplete&surface_detail=autocomplete_apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-wider font-extrabold transition-all duration-300 hover:scale-102 mt-4 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-current" /> Install on Shopify
                  </a>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-550 font-bold uppercase mx-auto mt-2">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" /> 7-day free trial on all apps
                  </div>
                </div>

              </div>
            </FadeUp>
          </div>

        </div>

      </main>

      <MinimalFooter />
    </div>
  )
}
