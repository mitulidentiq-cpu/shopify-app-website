import { Header1 } from "@/components/ui/header"
import { Hero } from "@/components/ui/hero-1"

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Header component integration */}
      <Header1 />
      
      {/* Main Landing Page content */}
      <main className="pt-20">
        <Hero
          title="Build smarter tools for modern teams"
          subtitle="Streamline your workflow and boost productivity with intuitive solutions. Security, speed, and simplicity—all in one platform."
          eyebrow="Next-Gen Productivity"
          ctaLabel="Get Started"
          ctaHref="#"
        />
      </main>
    </div>
  )
}

export default App
