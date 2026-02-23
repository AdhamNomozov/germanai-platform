"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CheckCircle2 } from "lucide-react"
import Modal from "@/src/components/ui/Modal"
import PhoneInput from "@/src/components/ui/PhoneInput"
import { Button } from "@/src/components/ui/Button"

export interface PlanData {
  name: string
  price: string
  period: string
  features: string[]
  popular?: boolean
}

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  plan: PlanData | null
}

export default function PricingModal({ isOpen, onClose, plan }: PricingModalProps) {
  const [name, setName]       = useState("")
  const [phone, setPhone]     = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 9

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setName("")
      setPhone("")
      setSent(false)
      setLoading(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || !plan) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    console.log({ name, phone, plan: plan.name })
    setLoading(false)
    setSent(true)
  }

  if (!plan) return null

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="md">
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
          >
            <CheckCircle2 size={32} className="text-green-400" />
          </motion.div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Tabriklaymiz!</h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Ro&apos;yxatdan muvaffaqiyatli o&apos;tdingiz. Tez orada siz bilan bog&apos;lanamiz.
            </p>
          </div>
          <a
            href="https://t.me/germanai_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Savollar uchun: @germanai_bot
          </a>
          <button
            onClick={handleClose}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors mt-1"
          >
            Yopish
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Plan header */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/8">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{plan.name}</span>
                {plan.popular && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-900">
                    Ommabop
                  </span>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-primary-400 tabular-nums">{plan.price}</p>
                <p className="text-xs text-gray-500">{plan.period}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Imkoniyatlar</p>
            <div className="flex flex-col gap-1.5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <Check size={13} className="text-green-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6" />

          {/* Form */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400">Ism *</label>
              <input
                required
                type="text"
                placeholder="Ismingiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-white/4 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/6 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400">Telefon *</label>
              <PhoneInput value={phone} onChange={setPhone} required />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={!isValid || loading}
          >
            Ariza qoldirish
          </Button>

          <p className="text-xs text-gray-600 text-center -mt-1">
            Mutaxassis 24 soat ichida bog&apos;lanadi
          </p>
        </form>
      )}
    </Modal>
  )
}
