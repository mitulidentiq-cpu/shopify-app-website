import { Header1 } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero-1"
import { MinimalFooter } from "@/components/ui/minimal-footer"

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Header component integration */}
      <Header1 />
      
      {/* Main Landing Page content */}
      <main className="pt-20">
        <Hero
          title="Boost Shopify Sales with AI-Powered Bundles"
          subtitle="Increase your Average Order Value (AOV) instantly. Create stunning volume discounts, product bundles, and smart quantity breaks. No coding required."
          eyebrow="Boost Average Order Value"
          ctaLabel="Install on Shopify Store"
          ctaHref="https://apps.shopify.com"
        />
      </main>
      
      {/* Footer component */}
      <MinimalFooter />
    </div>
  )
}

export default App
