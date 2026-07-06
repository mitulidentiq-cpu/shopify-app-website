import { Header1 } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero-1"
import { CursorFollower } from "@/components/ui/cursor-follower"
import { AppShowcase } from "@/components/ui/app-showcase"
import { SectionlyShowcase } from "@/components/ui/sectionly-showcase"
import { AnimatedCarousel } from "@/components/ui/logo-carousel"
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo"
import { FaqSection } from "@/components/ui/faq-section"
import { CtaBanner } from "@/components/ui/cta-banner"
import { MinimalFooter } from "@/components/ui/minimal-footer"

function App() {
  const partnerLogos = [
    "https://cdn.simpleicons.org/react/000000",
    "https://cdn.simpleicons.org/nextdotjs/000000",
    "https://cdn.simpleicons.org/vercel/000000",
    "https://cdn.simpleicons.org/typescript/000000",
    "https://cdn.simpleicons.org/tailwindcss/000000",
    "https://cdn.simpleicons.org/stripe/000000",
    "https://cdn.simpleicons.org/notion/000000",
    "https://cdn.simpleicons.org/github/000000",
    "https://cdn.simpleicons.org/figma/000000",
    "https://cdn.simpleicons.org/framer/000000",
    "https://cdn.simpleicons.org/storybook/000000",
    "https://cdn.simpleicons.org/sanity/000000",
  ]

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Custom premium cursor follower */}
      <CursorFollower />

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

        {/* Sectionly App Showcase — Meet AI Section Hub */}
        <SectionlyShowcase />

        {/* App Feature Showcase — Meet Klenzo: AI Variants */}
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
          padding="pt-12 lg:pt-16 pb-0"
        />

        {/* Scroll Reveal Mockup Section */}
        <HeroScrollDemo />

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
