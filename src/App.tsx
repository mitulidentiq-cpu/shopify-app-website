import { useState } from "react"
import { Header1 } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero-1"
import logo1 from "@/app logo/logo1.png"
import { DollarSign, Check, ShoppingBag, ShieldCheck, Zap, Globe, ArrowRight, HelpCircle } from "lucide-react"

function App() {
  // ROI Calculator States
  const [revenue, setRevenue] = useState(50000)
  const [aov, setAov] = useState(60)

  // FAQ Accordion States
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Calculations for ROI Calculator
  const newAov = aov * 1.24 // Average 24% AOV increase
  const extraRevenue = revenue * 0.144 // Average 14.4% overall store revenue lift

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const formatCurrency = (val: number) => {
    return "$" + Math.round(val).toLocaleString("en-US")
  }

  const faqs = [
    {
      q: "Will this app slow down my Shopify store?",
      a: "No. The app uses optimized, asynchronous JavaScript loading that does not block rendering. It has a negligible impact of under 4kb on your page weight."
    },
    {
      q: "Can I customize the look of the bundles to match my theme?",
      a: "Yes. We offer a full visual layout editor in the admin panel where you can match your exact store typography, border radius, and spacing without touching code."
    },
    {
      q: "Does it support Shopify Markets and multi-currency?",
      a: "Yes. Discounts, pricing, and buy buttons automatically convert to your customers' local checkout currency using active Shopify exchange rates."
    },
    {
      q: "How are refunds handled for bundle items?",
      a: "Refunds are prorated automatically across the bundled items in Shopify's native order checkout system, ensuring accurate payouts."
    }
  ]

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Header Navigation */}
      <Header1 />
      
      {/* Main Container */}
      <main className="pt-20">
        
        {/* 1. Hero Section */}
        <Hero
          title="Boost Shopify Sales with AI-Powered Bundles"
          subtitle="Increase your Average Order Value (AOV) instantly. Create stunning volume discounts, product bundles, and smart quantity breaks. No coding required."
          eyebrow="Boost Average Order Value"
          ctaLabel="Install on Shopify Store"
          ctaHref="https://apps.shopify.com"
        />

        {/* 2. Stats Section */}
        <section className="border-y border-zinc-800 bg-zinc-950 py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-extrabold tracking-tighter text-white">+24%</span>
                <span className="text-sm uppercase tracking-widest text-zinc-400 font-medium">Average AOV Increase</span>
              </div>
              <div className="flex flex-col gap-2 border-y md:border-y-0 md:border-x border-zinc-800 py-8 md:py-0">
                <span className="text-5xl font-extrabold tracking-tighter text-white">2.5M+</span>
                <span className="text-sm uppercase tracking-widest text-zinc-400 font-medium">Bundles Created</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-extrabold tracking-tighter text-white">10K+</span>
                <span className="text-sm uppercase tracking-widest text-zinc-400 font-medium">Shopify Merchants Trust Us</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section id="features" className="py-24 px-6 md:px-8 border-b border-zinc-800">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Features</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                High-Converting Features Built to Sell
              </h2>
              <p className="text-zinc-400 text-lg">
                Autopilot your store's upsells in minutes. Design layouts that fit your catalog and theme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Quantity Breaks</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Offer progressive volume discounts (e.g. Buy 2 Get 10% Off). Motivate merchants to order more units per transaction.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Mix & Match Packs</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Allow customers to build customized sets. Let them pick multiple colors, sizes, or match items to secure package pricing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">AI Recommendations</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Automatically match client intent. Serve recommendations trained on purchase histories directly on product page.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Multi-Currency Ready</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Auto-convert language, local rules and regional tax items. Works on any global or custom Shopify store setups.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Zero Speed Footprint</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Asynchronous lightweight modules. We load without blocking rendering pipelines, keeping page audits at 100%.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-8 border border-zinc-800 bg-zinc-950 rounded-xl flex flex-col gap-4 hover:border-zinc-700 transition-all">
                <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-black flex items-center justify-center text-white">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">1-Click Integration</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  No coding dependencies. Auto-syncs with standard Shopify AJAX carts, drawers, and storefront parameters in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ROI Calculator Section */}
        <section id="calculator" className="py-24 px-6 md:px-8 bg-zinc-950 border-b border-zinc-800">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">ROI Calculator</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                See Your Extra Monthly Earnings
              </h2>
              <p className="text-zinc-400 text-lg">
                Input your current sales metrics to estimate the additional revenue possible using AI bundles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Inputs */}
              <div className="p-8 border border-zinc-800 bg-black rounded-xl flex flex-col gap-8">
                {/* Revenue Input */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-zinc-300">Monthly Store Revenue</span>
                    <span className="font-bold text-white text-lg">{formatCurrency(revenue)}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>$5k</span>
                    <span>$250k</span>
                    <span>$500k+</span>
                  </div>
                </div>

                {/* AOV Input */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-zinc-300">Average Order Value (AOV)</span>
                    <span className="font-bold text-white text-lg">${aov}</span>
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
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>$10</span>
                    <span>$150</span>
                    <span>$300</span>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="flex flex-col gap-6">
                <div className="p-8 border border-zinc-800 bg-black rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">New Estimated AOV</span>
                  <span className="text-4xl font-extrabold tracking-tight">${newAov.toFixed(2)}</span>
                  <span className="text-xs text-zinc-400 mt-2 border border-zinc-800 px-3 py-1 rounded-full w-fit">
                    +24% Average Rise
                  </span>
                </div>

                <div className="p-8 border border-white/20 bg-zinc-900 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Additional Monthly Revenue</span>
                  <span className="text-4xl font-extrabold tracking-tight text-white">{formatCurrency(extraRevenue)}</span>
                  <span className="text-xs text-zinc-300 mt-2 border border-white/10 bg-white/5 px-3 py-1 rounded-full w-fit">
                    14.4% Overall Lift
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ Accordion Section */}
        <section id="faq" className="py-24 px-6 md:px-8 border-b border-zinc-800">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">FAQ</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((item, index) => {
                const isOpen = activeFaq === index
                return (
                  <div key={index} className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex justify-between items-center font-bold text-white hover:bg-zinc-900/50 transition-all"
                    >
                      <span>{item.q}</span>
                      <HelpCircle className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? "rotate-180 text-white" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-900/60 pt-4">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. Bottom Call to Action Section */}
        <section className="py-24 px-6 md:px-8 bg-zinc-950 text-center">
          <div className="container mx-auto max-w-3xl p-12 border border-zinc-800 bg-black rounded-2xl flex flex-col items-center gap-8 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Maximize Your Store Revenue?
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl">
              Install Bundlify today. Join thousands of stores increasing average order baskets automatically.
            </p>
            <a
              href="https://apps.shopify.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">
              2-minute setup • Cancel anytime • 24/7 dedicated support
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6 md:px-8 bg-black">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={logo1} alt="Klenzo Logo" className="h-6 w-auto object-contain invert" />
            <span className="text-zinc-500 text-sm font-semibold">| Shopify Partner</span>
          </div>
          <p className="text-zinc-500 text-xs text-center md:text-right">
            &copy; 2026 Klenzo Inc. All rights reserved. Shopify is a registered trademark of Shopify Inc.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
