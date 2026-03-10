/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Target, Globe, ArrowRight } from "lucide-react"

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}
import { cn } from "@/src/lib/utils"

const FEATURES = [
  {
    icon:     Brain,
    emoji:    "🧠",
    color:    "from-primary-400 to-primary-600",
    glow:     "rgba(245,158,11,0.15)",
    border:   "hover:border-primary-500/40",
    tag:      "Online test",
    title:    "Diagnostika testi",
    subtitle: "Adaptiv imtihon tizimi",
    desc:     "Nemis tilidan onlayn sinov — real imtihon formatida adaptiv savollar va AI tahlili bilan darajangizni aniq biling.",
    bullets:  ["Real Goethe/TestDaF/Telc formati", "5,000+ savol bazasi", "Batafsil natija hisoboti"],
    scrollId: "aitest",
  },
  {
    icon:     Target,
    emoji:    "🎯",
    color:    "from-blue-400 to-blue-600",
    glow:     "rgba(59,130,246,0.15)",
    border:   "hover:border-blue-500/40",
    tag:      "Shaxsiy yo'nalish",
    title:    "Onlayn kurslar",
    subtitle: "A1 dan B2 gacha",
    desc:     "Sun'iy intellekt murabbiyi bilan interaktiv darslar va mashqlar — sizning sur'atingizda, sizning maqsadingiz uchun.",
    bullets:  ["Har darsga AI izohi", "Speaking tahlili", "Grammatika mashqlari"],
    scrollId: "courses",
  },
  {
    icon:     Globe,
    emoji:    "🌍",
    color:    "from-accent-500 to-accent-700",
    glow:     "rgba(220,38,38,0.15)",
    border:   "hover:border-accent-500/40",
    tag:      "Hayot yo'nalishi",
    title:    "Konsalting",
    subtitle: "Shaxsiy maslahat",
    desc:     "Vizalar, o'qish va Germaniyada ish imkoniyatlari bo'yicha shaxsiy maslahatlar — maqsadingizga eng qisqa yol.",
    bullets:  ["Visa va emigratsiya", "Nemis universitetlari", "Mehnat bozori tahlili"],
    scrollId: "contact",
  },
]

export default function Features() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117] via-[#111520] to-[#0F1117]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            Yo&apos;nalishlar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            GermanGo qanday{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              yordam beradi?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nemis tili maqsadlaringizga qarab uchta yo&apos;nalishdan birini tanlang
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
              className={cn(
                "group relative flex flex-col gap-4 sm:gap-5 p-5 sm:p-7 rounded-2xl",
                "bg-[#161820] border border-white/6",
                "hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
                "transition-all duration-300 cursor-pointer",
                f.border
              )}
              style={{ "--glow": f.glow } as React.CSSProperties}
            >
              {/* Glow bg on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 20%, ${f.glow} 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br shadow-lg shrink-0",
                f.color
              )}>
                <f.icon size={24} className="text-white" />
              </div>

              {/* Tag */}
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                {f.tag}
              </span>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">{f.title}</h3>
                <p className="text-sm font-medium text-primary-400">{f.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2 mt-auto">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br",
                      f.color
                    )} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                type="button"
                onClick={() => scrollToSection(f.scrollId)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors mt-2 group/link"
              >
                Batafsil
                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
