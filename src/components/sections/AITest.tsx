"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Map, Timer, Sparkles, CheckCircle2, ChevronRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"

const BENEFITS = [
  "Darajangizni aniq aniqlash (A1–C2)",
  "Zaifliklarga moslashgan dars reja",
  "PDF hisobot — 5 daqiqada tayyor",
]

interface AITestProps {
  onStartTest?: () => void
}

export default function AITest({ onStartTest }: AITestProps) {
  const ref      = useRef<HTMLElement>(null)
  const inView   = useInView(ref, { once: true, margin: "-80px" })
  const [answer, setAnswer] = useState("")
  const [done,   setDone]   = useState(false)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={ref} id="aitest" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111520]" />
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-500/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -24 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium">
              <Zap size={13} />
              5 daqiqalik diagnostika
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Darajangizni{" "}
              <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                AI bilan aniqlang
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Adaptiv algoritmimiz 5 daqiqa ichida sizning nemis tili darajangizni aniq belgilaydi
              va shaxsiy yo&apos;l xaritasi tayyorlaydi.
            </p>

            <ul className="flex flex-col gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 size={16} className="text-primary-400 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" leftIcon={<Zap size={16} />} onClick={onStartTest} fullWidth>
                  Testni boshlash
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" leftIcon={<Map size={16} />} onClick={() => scrollToSection("roadmap")} fullWidth>
                  Yo&apos;l xaritasini ko&apos;rish
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Demo card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 24 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden bg-[#161820] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <Sparkles size={14} className="text-secondary-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI Diagnostika Testi</p>
                    <p className="text-xs text-gray-500">Savol 1 / 12</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary-400">
                  <Timer size={15} />
                  <span className="text-sm font-mono font-bold">00:05:00</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/5">
                <div className="h-full w-[8%] bg-gradient-to-r from-primary-400 to-primary-500 rounded-r-full transition-all" />
              </div>

              {/* Question */}
              <div className="px-5 py-5 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Savol</p>
                  <p className="text-lg font-semibold text-white">
                    &quot;Wie heißt du?&quot; — bu savolga to&apos;g&apos;ri javob bering.
                  </p>
                </div>

                {/* Answer input */}
                <div className="relative">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Javobingizni nemischa yozing…"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm",
                      "bg-white/4 border border-white/10",
                      "text-white placeholder-gray-600",
                      "focus:outline-none focus:border-primary-500/50 focus:bg-white/6",
                      "transition-colors"
                    )}
                  />
                  {answer.length > 0 && (
                    <button
                      onClick={() => setDone(true)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center"
                    >
                      <ChevronRight size={14} className="text-secondary-900" />
                    </button>
                  )}
                </div>

                {/* AI feedback */}
                <motion.div
                  initial={false}
                  animate={{ opacity: done ? 1 : 0.6, y: done ? 0 : 4 }}
                  className={cn(
                    "p-4 rounded-xl border",
                    done
                      ? "bg-primary-500/10 border-primary-500/30"
                      : "bg-white/3 border-white/6"
                  )}
                >
                  <p className="text-xs font-semibold text-primary-400 mb-1.5">
                    🤖 AI Feedback
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {done && answer
                      ? `"${answer}" — yaxshi urinish! "Ich heiße [ism]" yoki "Mein Name ist [ism]" to'liq javob bo'ladi.`
                      : "Javobingizni yozib, AI tahlilini ko'ring…"}
                  </p>
                </motion.div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Adaptiv murakkablik", "Real imtihon formati"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/8 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
