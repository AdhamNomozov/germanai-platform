"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Zap, ArrowRight, CheckCircle2, Star,
  MessageSquare, TrendingUp, Users, Brain
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"

/* ─── Data ───────────────────────────────────────────────── */
const STATS = [
  { value: "5,000+",  label: "AI savollar",        icon: Brain    },
  { value: "92%",     label: "Muvaffaqiyat darajasi", icon: TrendingUp },
  { value: "24/7",    label: "AI yordam",           icon: MessageSquare },
  { value: "1,400+",  label: "O'quvchilar",         icon: Users    },
]

const FEATURES = [
  "Mock imtihoni hisoboti",
  "Shaxsiy AI mentor",
  "Grammatika tahlili",
]

const AI_CHAT = [
  {
    role: "user" as const,
    text: "\"Ich habe\" va \"Ich bin\" farqi nima?",
    delay: 0,
  },
  {
    role: "ai" as const,
    text: "\"Haben\" egalik bildiradi (Ich habe ein Buch). \"Sein\" holat yoki harakatni bildiradi (Ich bin müde). Harakatda: \"Ich bin gegangen\" ✓",
    delay: 1.2,
  },
]

const PROGRESS_ITEMS = [
  { label: "Grammatika",    pct: 95, color: "from-primary-400 to-primary-500" },
  { label: "So'z boyligi",  pct: 88, color: "from-accent-500  to-accent-600"  },
  { label: "Tinglash",      pct: 76, color: "from-blue-400    to-blue-500"    },
]

const FLOATING_WORDS = [
  { word: "Guten Morgen!", x: "8%",  y: "18%", delay: 0    },
  { word: "Danke schön",   x: "80%", y: "12%", delay: 0.8  },
  { word: "Ich lerne",     x: "5%",  y: "78%", delay: 1.6  },
  { word: "Ausgezeichnet", x: "75%", y: "82%", delay: 0.4  },
  { word: "Hallo Welt!",   x: "55%", y: "6%",  delay: 2.0  },
]

/* ─── Sub-components ─────────────────────────────────────── */
function StatBadge({
  value, label, icon: Icon, index,
}: {
  value: string; label: string; icon: React.ElementType; index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center sm:items-start gap-0.5"
    >
      <div className="flex items-center gap-1.5">
        <Icon size={14} className="text-primary-400 shrink-0" />
        <span className="text-xl font-extrabold text-white tabular-nums">{value}</span>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{label}</span>
    </motion.div>
  )
}

function AITutorCard() {
  const [visibleMsgs, setVisibleMsgs] = useState(0)
  const [typing,      setTyping]      = useState(false)

  useEffect(() => {
    // Show first message quickly
    const t0 = setTimeout(() => setVisibleMsgs(1), 600)
    // Show typing indicator
    const t1 = setTimeout(() => setTyping(true),  1800)
    // Show AI response
    const t2 = setTimeout(() => {
      setTyping(false)
      setVisibleMsgs(2)
    }, 3200)
    return () => [t0, t1, t2].forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[#161820] border border-white/8",
        "shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      )}
    >
      {/* Card glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-600/10  blur-3xl pointer-events-none" />

      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow-gold">
            <Brain size={14} className="text-secondary-900" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">AI Tutor</p>
            <p className="text-xs text-green-400 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-accent-500/60" />
          <span className="w-3 h-3 rounded-full bg-primary-400/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Chat area */}
      <div className="px-4 py-4 space-y-3 min-h-[160px]">
        <AnimatePresence>
          {AI_CHAT.slice(0, visibleMsgs).map((msg) => (
            <motion.div
              key={msg.role}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1   }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                  <Brain size={10} className="text-secondary-900" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary-500/20 text-primary-100 rounded-br-md border border-primary-500/20"
                    : "bg-white/6 text-gray-200 rounded-bl-md border border-white/8"
                )}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
                <Brain size={10} className="text-secondary-900" />
              </div>
              <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-md px-4 py-2.5 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bars */}
      <div className="px-4 pb-5 pt-1 border-t border-white/6 space-y-2.5">
        <p className="text-xs font-medium text-gray-500 mb-3">Sizning progress</p>
        {PROGRESS_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-400 w-24 shrink-0">{item.label}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full bg-gradient-to-r", item.color)}
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-semibold text-white w-8 text-right">
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Hero ───────────────────────────────────────────────── */
interface HeroProps {
  onStartTest?: () => void
}

export default function Hero({ onStartTest }: HeroProps) {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-600/6  blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/5 blur-[120px] pointer-events-none" />

      {/* Floating German words */}
      {FLOATING_WORDS.map((fw) => (
        <motion.span
          key={fw.word}
          className="absolute hidden lg:block text-xs font-medium text-white/8 select-none pointer-events-none"
          style={{ left: fw.x, top: fw.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: fw.delay + 1, duration: 0.8 },
            y: { delay: fw.delay + 1, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {fw.word}
        </motion.span>
      ))}

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left column */}
          <div className="flex flex-col gap-5 sm:gap-6 items-center lg:items-start text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ duration: 0.5 }}
              className="flex"
            >
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
                "bg-primary-500/10 border border-primary-500/25",
                "text-primary-300 text-sm font-medium"
              )}>
                <span>🇩🇪</span>
                <span>#1 AI German Platform</span>
                <Star size={12} className="text-primary-400 fill-primary-400" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex flex-col gap-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                <span className="text-white">Nemis tili</span>
                <br />
                <span className="text-white">imtihonlariga</span>
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 bg-clip-text text-transparent">
                  AI bilan
                </span>
                <br />
                <span className="text-white">tayyorlaning</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg"
            >
              Mock imtihonlar, shaxsiy AI kurslar va 24/7 aqlli mentor —
              barchasi bir joyda. <span className="text-primary-400 font-medium">A1 dan B2 gacha</span> barcha darajalar uchun.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 size={16} className="text-primary-400 shrink-0" />
                  {f}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Zap size={16} />}
                  className="shadow-glow-gold w-full sm:w-auto"
                  onClick={onStartTest}
                >
                  5 daqiqada AI test
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link href="/platform" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon={<ArrowRight size={16} />}
                    fullWidth
                  >
                    Platformaga o&apos;tish
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 pt-4 border-t border-white/6 w-full"
            >
              {STATS.map((stat, i) => (
                <StatBadge key={stat.label} {...stat} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Right column — AI Tutor Card */}
          <div className="relative hidden lg:flex flex-col gap-4 lg:pl-8">

            {/* Floating review badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0,   scale: 1   }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className={cn(
                "absolute -top-4 -left-2 lg:-left-6 z-10",
                "flex items-center gap-2.5 px-3.5 py-2 rounded-xl",
                "bg-[#1E2130] border border-white/10",
                "shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              )}
            >
              <div className="flex -space-x-1.5">
                {["🧑‍🎓", "👩‍💼", "🧑‍💻"].map((e, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full bg-secondary-700 flex items-center justify-center text-xs border border-white/10"
                  >{e}</span>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-primary-400 fill-primary-400" />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">8,400+ o&apos;quvchi</p>
              </div>
            </motion.div>

            {/* Main AI card */}
            <AITutorCard />

            {/* Bottom badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className={cn(
                "self-end flex items-center gap-2 px-3.5 py-2 rounded-xl",
                "bg-green-500/10 border border-green-500/20",
                "text-green-400 text-xs font-medium"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Hozir 142 o&apos;quvchi online
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0F1117] to-transparent pointer-events-none" />
    </section>
  )
}
