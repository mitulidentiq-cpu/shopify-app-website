import { useState, useRef, Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Mail, MessageSquare, Send, Sparkles, CheckCircle2, ArrowRight, Globe } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { CursorFollower } from "@/components/ui/cursor-follower"

/* ─── 3D Rotating Connection Globe ───────────────────────── */
function RotatingGlobe() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate particle positions on a sphere surface
  const count = 400
  const tempPositions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = u * 2.0 * Math.PI
    const phi = Math.acos(2.0 * v - 1.0)
    const r = 3.2 // Globe radius
    tempPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    tempPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    tempPositions[i * 3 + 2] = r * Math.cos(phi)
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group>
      {/* Outer particle shell */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[tempPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#8b5cf6"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Inner glowing core mesh */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#d946ef"
          wireframe={true}
          transparent={true}
          opacity={0.06}
        />
      </mesh>
    </group>
  )
}

/* ─── Interactive Floating Label Inputs ────────────────────── */
function FloatingInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const isFilled = value.length > 0

  return (
    <div className="relative w-full group mb-6">
      {/* Background glow when focused */}
      <motion.div
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none blur-sm"
        animate={{ opacity: isFocused ? 0.15 : 0 }}
      />
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-4 text-sm text-white outline-none transition-all duration-300 relative z-10"
      />
      <motion.label
        htmlFor={id}
        initial={{ y: 0 }}
        animate={{
          y: isFocused || isFilled ? -28 : 0,
          scale: isFocused || isFilled ? 0.85 : 1,
          color: isFocused ? "#a78bfa" : "#71717a",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-4 top-4 text-sm font-medium tracking-wide pointer-events-none select-none z-20 origin-left"
      >
        {label} {required && <span className="text-pink-500">*</span>}
      </motion.label>
    </div>
  )
}

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [activeTab, setActiveTab] = useState<"general" | "custom" | "bug">("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" })
    setIsSuccess(false)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CursorFollower />
      <Header1 />

      {/* Background Visual Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Glow orbs */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px] animate-pulse" />
        
        {/* Digital Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      </div>

      <main className="relative z-10 container mx-auto max-w-6xl px-6 md:px-8 pt-36 pb-32">
        {/* Page title and intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 backdrop-blur shadow-[0_0_20px_rgba(139,92,246,0.15)] text-violet-300 text-[11px] md:text-xs uppercase tracking-widest font-black mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin-slow" />
            Merchant Support Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
          >
            Let's Start a{" "}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent relative">
              Conversation
              <motion.span
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-violet-400 to-amber-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mt-6"
          >
            Need technical help? Requesting a custom liquid section? Our average response rate is under 12 hours.
          </motion.p>
        </div>

        {/* Dynamic Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* 3D WebGL Canvas Globe (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* 3D Visual Box */}
            <div className="relative h-[300px] md:h-[380px] bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur flex items-center justify-center shadow-2xl group hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute inset-0 z-0">
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <div className="w-10 h-10 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                  </div>
                }>
                  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={1.5} />
                    <RotatingGlobe />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
                  </Canvas>
                </Suspense>
              </div>

              {/* Status Badge overlay */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-zinc-950/80 border border-zinc-800 px-3.5 py-1.5 rounded-full select-none">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-200 text-xs font-bold uppercase tracking-wider">Founder Active Online</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none select-none">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-violet-400" /> Connection Node
                </p>
                <p className="text-white text-lg font-bold mt-1">Direct developer assistance</p>
              </div>
            </div>

            {/* Support Details Glass Card */}
            <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-950/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur flex flex-col gap-5 hover:border-violet-500/20 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl">Direct Email</h3>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                  Have theme integration inquiries, variant installation requests, or custom store designs?
                </p>
              </div>
              <a
                href="mailto:mitulzalavadiya11@gmail.com"
                className="inline-flex items-center gap-1.5 text-violet-400 group-hover:text-white text-sm font-extrabold transition-colors mt-2"
              >
                mitulzalavadiya11@gmail.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Form & Tab Selector Panel (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Interactive Tab Selector */}
            <div className="grid grid-cols-3 gap-2 bg-zinc-900/65 border border-zinc-800/80 p-1.5 rounded-2xl backdrop-blur relative z-20">
              {(["general", "custom", "bug"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative py-3 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span className="relative z-20 transition-colors duration-300">
                    {tab === "general" ? "General" : tab === "custom" ? "Custom Sections" : "Bug Report"}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700/60 rounded-xl shadow-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Animated Form Card with Border-Beam Neon Glow */}
            <div className="relative bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden flex-1 flex flex-col justify-center group">
              {/* Glowing header line inside card */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

              {/* Pulsing Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[1px]" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-white text-2xl font-black tracking-tight flex items-center gap-2">
                        <MessageSquare className="w-5.5 h-5.5 text-violet-400" />
                        {activeTab === "general"
                          ? "Send a Message"
                          : activeTab === "custom"
                          ? "Request Custom Section"
                          : "Submit Bug Report"}
                      </h2>
                      <p className="text-zinc-500 text-xs mt-1 font-medium">
                        {activeTab === "general"
                          ? "Have a general question about Klenzo? Let's connect."
                          : activeTab === "custom"
                          ? "Describe the Liquid section design you want us to add to AI Section Hub."
                          : "Found a variant conflict or Swatch glitch? Report it here."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                      <FloatingInput
                        id="name"
                        label="Your Name"
                        required
                        value={formData.name}
                        onChange={(val) => setFormData({ ...formData, name: val })}
                      />

                      <FloatingInput
                        id="email"
                        label="Shopify Store Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(val) => setFormData({ ...formData, email: val })}
                      />

                      <div className="relative w-full group mb-8">
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-zinc-950/70 border border-zinc-800 focus:border-violet-500/60 rounded-xl px-4 py-4 text-sm text-white placeholder-zinc-700 outline-none resize-none transition-all duration-300 relative z-10"
                          placeholder="Provide details about your query..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black font-extrabold text-sm rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors shadow-lg active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed group"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  /* Gorgeous success state callback */
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.15 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>

                    <h2 className="text-white text-3xl font-black tracking-tight mb-2">Message Dispatched!</h2>
                    <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-8">
                      Thank you, {formData.name}! Your {activeTab === "bug" ? "bug report" : activeTab === "custom" ? "liquid section suggestion" : "message"} has been sent. We'll get back to you shortly.
                    </p>

                    <motion.button
                      onClick={resetForm}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                    >
                      Send Another Message
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}
