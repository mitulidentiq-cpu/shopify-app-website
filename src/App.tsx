import { Routes, Route } from 'react-router-dom'
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
import { AboutPage } from "@/pages/about"
import { ConnectPage } from "@/pages/connect"
import { ContactPage } from "@/pages/contact"
import { PrivacyPage } from "@/pages/privacy"

function HomePage() {
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
      <CursorFollower />
      <Header1 />
      <main className="pt-16 md:pt-20">
        <Hero
          title="Boost Shopify Sales with AI-Powered Bundles"
          subtitle="Increase your Average Order Value (AOV) instantly. Create stunning volume discounts, product bundles, and smart quantity breaks. No coding required."
          eyebrow="Boost Average Order Value"
          ctaLabel="Install on Shopify Store"
          ctaHref="https://apps.shopify.com/sectionly?st_source=autocomplete&surface_detail=autocomplete_apps"
        />
        <SectionlyShowcase />
        <AppShowcase />
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
        <HeroScrollDemo />
        <FaqSection />
      </main>
      <CtaBanner />
      <MinimalFooter />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  )
}

export default App
