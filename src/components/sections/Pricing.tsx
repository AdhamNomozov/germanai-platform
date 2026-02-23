"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, Zap } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"
import type { PlanData } from "@/src/components/modals/PricingModal"

/* ─── Data ───────────────────────────────────────────────── */
const PLANS: PlanData[] = [
  {
    name:     "Starter",
    price:    "199,000",
    period:   "oyiga",
    popular:  false,
    features: [
      "Cheklanmagan AI testlar",
      "O'zlashtirish bo'yicha avtomatik hisobot",
      "Telegram ogohlantirishlari",
      "A1 darajasi uchun bepul darslar",
      "7 kunlik bepul sinov",
    ],
  },
  {
    name:     "Standard",
    price:    "399,000",
    period:   "oyiga",
    popular:  true,
    features: [
      "A1-B2 video + AI mashqlar",
      "Speaking analiz va transkript",
      "Oylik progress konsultatsiyasi",
      "Mock imtihon (cheksiz urinish)",
      "PDF sertifikat",
      "Priority qo'llab-quvvatlash",
    ],
  },
  {
    name:     "Premium",
    price:    "699,000",
    period:   "oyiga",
    popular:  false,
    features: [
      "1:1 mentorlik seanslari (oyda 4)",
      "Nemis universitetlari uchun paket",
      "Rasmiy hamkor sertifikati",
      "Visa hujjat tayyorlash yordam",
      "Unlimited mock imtihonlar",
      "Dedicated personal tutor",
      "Hayotiy obuna yangilanishlari",
    ],
  },
]

/* ─── Props ──────────────────────────────────────────────── */
interface PricingProps {
  onSelectPlan?: (plan: PlanData) => void
}

/* ─── Component ──────────────────────────────────────────── */
export default function Pricing({ onSelectPlan }: PricingProps) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111520]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            Narxlar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Mos obuna{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              rejasini tanlang
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Har qanday byudjet va maqsad uchun moslashuvchan tariflar
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
              className={cn(
                "relative flex flex-col p-5 sm:p-7 rounded-2xl border",
                "bg-[#161820]",
                plan.popular
                  ? "border-primary-500/50 shadow-[0_0_40px_rgba(245,158,11,0.12)] order-first md:order-none"
                  : "border-white/8",
                "transition-all duration-300 hover:-translate-y-1"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-900 shadow-glow-gold whitespace-nowrap">
                    🔥 Eng ommabop
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <span className="text-lg font-bold text-white">{plan.name}</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-2 mb-6 pb-6 border-b border-white/6">
                <span className="text-3xl font-extrabold text-primary-400 tabular-nums">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2
                      size={15}
                      className={cn(
                        "shrink-0 mt-0.5",
                        plan.popular ? "text-primary-400" : "text-gray-500"
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "primary" : "outline"}
                size="lg"
                fullWidth
                leftIcon={plan.popular ? <Zap size={15} /> : undefined}
                onClick={() => onSelectPlan?.(plan)}
              >
                Rejani tanlash
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          Barcha rejalar 7 kunlik bepul sinov davri bilan. Karta talab qilinmaydi.
        </motion.p>
      </div>
    </section>
  )
}
