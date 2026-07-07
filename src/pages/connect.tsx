import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { SocialConnect } from "@/components/ui/connect-with-us"

export function ConnectPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header1 />
      <main className="pt-24 md:pt-32">
        <SocialConnect />
      </main>
      <MinimalFooter />
    </div>
  )
}
