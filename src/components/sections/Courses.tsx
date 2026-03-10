/* eslint-disable react/no-unescaped-entities */
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, BookOpen, ChevronRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"
import type { CourseData } from "@/src/components/modals/CourseModal"

/* ─── Data ───────────────────────────────────────────────── */
const COURSES: (CourseData & { popular?: boolean })[] = [
  {
    level:    "A1",
    title:    "Boshlang'ich muloqot va kundalik vaziyatlar",
    duration: "2 oy",
    hours:    "6 soat/hafta",
    features: [
      "Asosiy grammatika",
      "Kundalik so'zlashuv",
      "Pronunciation mashqlari",
      "O'qituvchi yordami",
    ],
  },
  {
    level:    "A2",
    title:    "Amaliy til ko'nikmalari va so'z boyligini kengaytirish",
    duration: "2 oy",
    hours:    "7 soat/hafta",
    features: [
      "Kengaytirilgan grammatika",
      "Mavzuviy lug'at",
      "Yozma va og'zaki mashqlar",
      "Real vaziyat simulyatsiyalari",
    ],
  },
  {
    level:    "B1",
    title:    "Goethe, Telc, TestDaF imtihoniga tayyorgarlik",
    duration: "3 oy",
    hours:    "8 soat/hafta",
    features: [
      "Imtihon formati",
      "Mock testlar",
      "Writing feedback",
      "Speaking practice",
    ],
    popular: true,
  },
  {
    level:    "B2",
    title:    "Akademik yozuv va professional muloqot",
    duration: "2,5 oy",
    hours:    "8 soat/hafta",
    features: [
      "Akademik yozuv",
      "Professional nemis tili",
      "Munozara ko'nikmalari",
      "Sertifikat tayyorlash",
    ],
  },
]

/* ─── Level styles ───────────────────────────────────────── */
const LEVEL_STYLE: Record<string, { badge: string; text: string }> = {
  A1: { badge: "from-green-400 to-green-600",     text: "text-green-400"   },
  A2: { badge: "from-blue-400 to-blue-600",       text: "text-blue-400"    },
  B1: { badge: "from-primary-400 to-primary-600", text: "text-primary-400" },
  B2: { badge: "from-purple-400 to-purple-600",   text: "text-purple-400"  },
}
const fallbackStyle = { badge: "from-gray-400 to-gray-600", text: "text-gray-400" }

/* ─── Props ──────────────────────────────────────────────── */
interface CoursesProps {
  onSelectCourse?: (course: CourseData) => void
}

/* ─── Component ──────────────────────────────────────────── */
export default function Courses({ onSelectCourse }: CoursesProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="courses" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117] via-[#111520] to-[#0F1117]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            <BookOpen size={13} />
            Kurslar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            A1 dan B2 gacha{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Online kurslar
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Har bir daraja uchun maxsus ishlab chiqilgan, sun&apos;iy intellekt yordamida moslashtirilgan o&apos;quv dasturlari
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COURSES.map((c, i) => {
            const style = LEVEL_STYLE[c.level] ?? fallbackStyle
            return (
              <motion.div
                key={c.level}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55 }}
                className={cn(
                  "relative flex flex-col gap-4 p-5 sm:p-6 rounded-2xl h-full",
                  "bg-[#161820] border",
                  c.popular
                    ? "border-primary-500/40 shadow-[0_0_30px_rgba(245,158,11,0.12)]"
                    : "border-white/6",
                  "transition-all duration-300 hover:-translate-y-1",
                  "hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                )}
              >
                {/* Popular badge */}
                {c.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-900 shadow-glow-gold whitespace-nowrap">
                      ⭐ Eng ommabop
                    </span>
                  </div>
                )}

                {/* Level badge */}
                <div className={cn(
                  "w-fit px-3 py-1.5 rounded-xl text-xl font-black",
                  "bg-gradient-to-br shadow-lg text-white",
                  style.badge
                )}>
                  {c.level}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white flex-grow">
                  {c.title}
                </h3>

                {/* Meta */}
                <div className="flex gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className={style.text} />
                    {c.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={12} className={style.text} />
                    {c.hours}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-1.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <ChevronRight size={11} className={cn("shrink-0", style.text)} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={c.popular ? "primary" : "outline"}
                  size="md"
                  fullWidth
                  onClick={() => onSelectCourse?.(c)}
                >
                  Kursni tanlash
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
