import { Header1 } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero-1"
import { AppShowcase } from "@/components/ui/app-showcase"
import { AnimatedCarousel } from "@/components/ui/logo-carousel"
import { FaqSection } from "@/components/ui/faq-section"
import { CtaBanner } from "@/components/ui/cta-banner"
import { MinimalFooter } from "@/components/ui/minimal-footer"

function App() {
  const partnerLogos = [
    "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    "https://cdn.worldvectorlogo.com/logos/next-js.svg",
    "https://cdn.worldvectorlogo.com/logos/vercel.svg",
    "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
    "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    "https://cdn.worldvectorlogo.com/logos/notion-2.svg",
    "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
    "https://cdn.worldvectorlogo.com/logos/figma-icon-one-color.svg",
    "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
    "https://cdn.worldvectorlogo.com/logos/storybook-1.svg",
    "https://cdn.worldvectorlogo.com/logos/sanity.svg",
  ]

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Header component integration */}
      <Header1 />
      
      {/* Main Landing Page content */}
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <Hero
          title="Boost Shopify Sales with AI-Powered Bundles"
          subtitle="Increase your Average Order Value (AOV) instantly. Create stunning volume discounts, product bundles, and smart quantity breaks. No coding required."
          eyebrow="Boost Average Order Value"
          ctaLabel="Install on Shopify Store"
          ctaHref="https://apps.shopify.com"
        />

        {/* App Feature Showcase Section */}
        <AppShowcase />

        {/* Brand/Partner Logo Carousel Section */}
        <AnimatedCarousel
          title="Trusted by Modern Shopify Teams"
          logos={partnerLogos}
          autoPlay={true}
          autoPlayInterval={3000}
          itemsPerViewMobile={3}
          itemsPerViewDesktop={5}
          logoContainerWidth="w-40"
          logoContainerHeight="h-20"
          logoImageWidth="w-auto"
          logoImageHeight="h-8"
          padding="py-12 lg:py-16"
        />

        {/* Animated FAQ Accordion Section */}
        <FaqSection />
      </main>

      {/* CTA Banner block between FAQ and Footer */}
      <CtaBanner />

      {/* Footer component */}
      <MinimalFooter />
    </div>
  )
}

export default App
