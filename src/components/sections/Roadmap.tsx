/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  ScanSearch, Target, Map, BookOpen, Award
} from "lucide-react"
import { cn } from "@/src/lib/utils"

const STEPS = [
  {
    num:   "01",
    icon:  ScanSearch,
    color: "from-blue-400 to-blue-600",
    ring:  "ring-blue-500/30",
    label: "Diagnostika",
    desc:  "Tezkor test orqali darajangizni aniqlang",
    sub:   "5 daqiqa · Bepul",
  },
  {
    num:   "02",
    icon:  Target,
    color: "from-purple-400 to-purple-600",
    ring:  "ring-purple-500/30",
    label: "Maqsad",
    desc:  "O'rganish maqsadingizni tanlang: o'qish, ish yoki immigratsiya",
    sub:   "Shaxsiy yo'nalish",
  },
  {
    num:   "03",
    icon:  Map,
    color: "from-primary-400 to-primary-600",
    ring:  "ring-primary-500/30",
    label: "Reja",
    desc:  "Tizim siz uchun shaxsiy yo&apos;l xaritasi yaratadi",
    sub:   "Avtomatik",
  },
  {
    num:   "04",
    icon:  BookOpen,
    color: "from-accent-400 to-accent-600",
    ring:  "ring-accent-500/30",
    label: "Amal",
    desc:  "Interaktiv darslar, speaking mashg'ulotlari va avtomatik baholash",
    sub:   "Har kuni",
  },
  {
    num:   "05",
    icon:  Award,
    color: "from-green-400 to-green-600",
    ring:  "ring-green-500/30",
    label: "Sertifikat",
    desc:  "QR kod orqali tasdiqlanadigan natijali sertifikat oling",
    sub:   "Xalqaro format",
  },
]

export default function Roadmap() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="roadmap" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117] via-[#111520] to-[#0F1117]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            Yo&apos;l xaritasi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            5 qadamda{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              natija
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Sodda, tizimli va samarali yo&apos;l — A1 dan sertifikatgacha
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500/40 via-primary-500/60 to-green-500/40"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.55 }}
                className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-5 sm:gap-4 relative"
              >
                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div className="sm:hidden absolute left-10 top-20 bottom-[-2rem] w-px bg-white/8" />
                )}

                {/* Circle */}
                <div className={cn(
                  "relative w-20 h-20 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br ring-4",
                  step.color,
                  step.ring,
                  "shadow-lg z-10"
                )}>
                  <step.icon size={28} className="text-white" />
                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0F1117] border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-black text-gray-300">{step.num}</span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 sm:items-center">
                  <h3 className="text-base font-bold text-white">{step.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed sm:max-w-[160px]">{step.desc}</p>
                  <span className="text-xs font-semibold text-primary-400">{step.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
