"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, Award, QrCode, Shield } from "lucide-react"
import { cn } from "@/src/lib/utils"

const BENEFITS = [
  {
    icon:  Award,
    title: "Bilim darajasi tasdiqi",
    desc:  "A1 dan B2 gacha bo'lgan darajangizni aniq ko'rsatuvchi sertifikat",
  },
  {
    icon:  QrCode,
    title: "QR tasdiqlash",
    desc:  "Har bir sertifikatni QR kod orqali bir zumda tekshirish imkoni",
  },
  {
    icon:  Shield,
    title: "Batafsil ko'nikmalar",
    desc:  "To'rtta ko'nikma bo'yicha alohida ball — Hören, Lesen, Schreiben, Sprechen",
  },
]

const SKILLS = [
  { label: "Hören",     score: 88, color: "from-primary-400 to-primary-500" },
  { label: "Lesen",     score: 92, color: "from-blue-400    to-blue-500"    },
  { label: "Schreiben", score: 85, color: "from-purple-400  to-purple-500"  },
  { label: "Sprechen",  score: 90, color: "from-accent-400  to-accent-500"  },
]

export default function Certificate() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="certificate" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111520]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -24 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-7"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
                <Award size={13} />
                Sertifikat
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                O&apos;quv natijalari va{" "}
                <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                  sertifikat
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Kursni muvaffaqiyatli yakunlaganingizdan so&apos;ng o&apos;z yutuqlaringizni
              tasdiqlovchi raqamli sertifikat oling. Ko&apos;nikmalaringiz darajasini ish
              beruvchilar va o&apos;quv markazlariga namoyish eting.
            </p>

            <div className="flex flex-col gap-5">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -16 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                    <b.icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{b.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Certificate card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30, scale: inView ? 1 : 0.96 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            <div className={cn(
              "relative p-8 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-[#1A1D2E] to-[#13151F]",
              "border border-primary-500/20",
              "shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(245,158,11,0.08)]"
            )}>
              {/* Top decorative line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

              {/* German flag stripe accent */}
              <div className="flex gap-1 mb-6">
                <div className="h-1.5 flex-1 rounded-full bg-secondary-900" />
                <div className="h-1.5 flex-1 rounded-full bg-accent-600" />
                <div className="h-1.5 flex-1 rounded-full bg-primary-400" />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-400 mb-1">
                  GermanGo Platform
                </p>
                <h3 className="text-2xl font-black text-white tracking-tight">SERTIFIKAT</h3>
                <p className="text-xs text-gray-500 mt-0.5">Certificate of Achievement</p>
              </div>

              {/* Name */}
              <div className="text-center py-4 border-y border-white/6 mb-6">
                <p className="text-xs text-gray-500 mb-1">Kimga berilgan</p>
                <p className="text-xl font-bold text-white tracking-wide">Alisher Nazarov</p>
                <p className="text-sm text-primary-400 font-medium mt-1">Daraja: B1 · Sana: 2026</p>
              </div>

              {/* Scores */}
              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Ko&apos;nikma ballari</p>
                {SKILLS.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-20 shrink-0">{s.label}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={cn("h-full rounded-full bg-gradient-to-r", s.color)}
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${s.score}%` : "0%" }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white w-7 text-right">{s.score}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/6">
                {/* QR placeholder */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <QrCode size={28} className="text-gray-600" />
                </div>
                {/* Signature */}
                <div className="text-right">
                  <div className="text-primary-400 font-black text-xl italic mb-0.5" style={{ fontFamily: "Georgia, serif" }}>
                    GermanGo
                  </div>
                  <p className="text-xs text-gray-600">Direktorning imzosi</p>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <CheckCircle2 size={11} className="text-green-400" />
                    <span className="text-xs text-green-400">Tasdiqlangan</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
