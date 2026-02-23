"use client"

import { useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Plus, Minus, HelpCircle, Send, ArrowRight } from "lucide-react"
import { cn } from "@/src/lib/utils"

const FAQS = [
  {
    q: "GermanAI nima va qanday ishlaydi?",
    a: "GermanAI — sun'iy intellekt asosida qurilgan nemis tili o'qitish platformasi. Tizim sizning darajangizni aniqlab, shaxsiy o'quv reja tuzadi, interaktiv darslar, mock imtihonlar va real-time AI feedback bilan o'rganishni tezlashtiradi.",
  },
  {
    q: "AI test natijalarini qayerda ko'raman?",
    a: "Test yakunlanganidan so'ng natijalar darhol shaxsiy kabinetingizda ko'rsatiladi. Batafsil PDF hisobot ham avtomatik ravishda elektron pochta manzilingizga yuboriladi.",
  },
  {
    q: "Kurslarga qanday yozilaman?",
    a: "\"Kursni tanlash\" tugmasini bosib, to'lov amalga oshirilgach, kursga kirish darhol faollashadi. Barcha materiallar, darslar va AI mashqlar bir zumda mavjud bo'ladi.",
  },
  {
    q: "To'lov usullari qanday?",
    a: "Payme, Click, Uzcard, Visa/MasterCard orqali to'lash mumkin. Oylik va yillik (20% chegirma) obuna rejalari mavjud. Korporativ hisob-varaq ham qabul qilinadi.",
  },
  {
    q: "Sertifikatni qayerda tan olishadi?",
    a: "GermanAI sertifikati Germaniya hamkor tashkilotlari tomonidan tan olinadi. Bundan tashqari, Goethe-Institut va TestDaF kabi rasmiy imtihonlarga tayyorgarlik ko'rsatadi — bu sertifikatlar butun dunyo bo'ylab qabul qilinadi.",
  },
]

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={cn(
        "rounded-xl border overflow-hidden transition-colors duration-200",
        isOpen ? "border-primary-500/30 bg-primary-500/5" : "border-white/6 bg-[#161820]"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 min-h-[52px] text-left"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-sm font-semibold transition-colors",
          isOpen ? "text-white" : "text-gray-200"
        )}>
          {item.q}
        </span>
        <span className={cn(
          "shrink-0 w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center transition-colors",
          isOpen ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-gray-500"
        )}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section ref={ref} id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1117] via-[#111520] to-[#0F1117]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            <HelpCircle size={13} />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Savollaringiz{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              bormi?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Eng ko&apos;p so&apos;raladigan savollarga javoblar
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Telegram CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <div className={cn(
            "relative flex flex-col sm:flex-row items-center justify-between gap-5",
            "p-5 sm:p-7 rounded-2xl overflow-hidden",
            "bg-gradient-to-br from-[#1A1D2E] to-[#13151F]",
            "border border-blue-500/20",
            "shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          )}>
            {/* Background glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-primary-500/6 blur-3xl pointer-events-none" />

            {/* Left — icon + text */}
            <div className="relative flex items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                "bg-gradient-to-br from-blue-400 to-blue-600",
                "shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              )}>
                <Send size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Boshqa savollaringiz bormi?
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  Telegram botimiz 24/7 javob beradi va mutaxassislarimiz
                  siz bilan bog&apos;lanadi.
                </p>
              </div>
            </div>

            {/* Right — button */}
            <motion.button
              type="button"
              onClick={() => window.open("https://t.me/germanai_bot", "_blank")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-xl shrink-0",
                "bg-gradient-to-r from-blue-500 to-blue-400",
                "text-white font-semibold text-sm",
                "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
                "hover:from-blue-400 hover:to-blue-300",
                "hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
                "transition-all duration-200"
              )}
            >
              <Send size={16} />
              Telegram bot
              <ArrowRight size={14} className="ml-0.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
