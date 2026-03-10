/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Phone, Mail, MapPin, Send,
  MessageCircle, Instagram,
} from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"

const CONTACT_ITEMS = [
  {
    icon:  Phone,
    label: "Telefon",
    value: "+998 99 746-22-00",
    href:  "tel:+998997462200",
  },
  {
    icon:  Mail,
    label: "Email",
    value: "info@germango.uz",
    href:  "mailto:info@germango.uz",
  },
  {
    icon:  MapPin,
    label: "Manzil",
    value: "Termiz shahri",
    href:  "#",
  },
]

const SOCIALS = [
  {
    icon:  MessageCircle,
    label: "Telegram",
    href:  "#",
    color: "hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-400",
  },
  {
    icon:  Instagram,
    label: "Instagram",
    href:  "#",
    color: "hover:bg-pink-500/20 hover:border-pink-500/30 hover:text-pink-400",
  },
]

export default function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [form, setForm] = useState({ name: "", phone: "", goal: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/leads", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name: form.name, phone: form.phone, source: "Bog'lanish formasi: " + form.goal })
    })
    setSent(true)
  }

  return (
    <section ref={ref} id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111520]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-300 text-sm font-medium mb-4">
            <Send size={13} />
            Bog&apos;lanish
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            GermanGo bilan{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              bog&apos;laning
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Savollaringiz bormi? Biz siz bilan muloqotga tayyormiz
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -24 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -16 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0 group-hover:bg-primary-500/15 transition-colors">
                    <item.icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Ijtimoiy tarmoqlar
              </p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                      "bg-white/4 border border-white/8 text-gray-400",
                      "text-sm font-medium transition-all duration-200",
                      s.color
                    )}
                  >
                    <s.icon size={15} />
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick response badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/8 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="text-sm text-green-300">
                O&apos;rtacha javob vaqti: <span className="font-semibold">60 daqiqa</span>
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 24 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-7 rounded-2xl bg-[#161820] border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <Send size={28} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Xabar yuborildi!</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Tez orada siz bilan bog&apos;lanamiz. O&apos;rtacha javob vaqti 15 daqiqa.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", phone: "", goal: "" }) }}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Yana yuborish
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <p className="text-base font-semibold text-white mb-1">
                    Murojaat shakli
                  </p>

                  {/* Name + Phone row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">Ism *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ismingiz"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">Telefon *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+998 90 000-00-00"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">Maqsad va savolingiz *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Qaysi daraja? Qanday maqsad (o'qish, ish, visa)? Savolingiz nima?"
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      className={cn(inputCls, "resize-none")}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={<Send size={15} />}
                  >
                    Yuborish
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const inputCls =
  "w-full px-4 py-3.5 rounded-xl text-base bg-white/4 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/6 transition-colors"
