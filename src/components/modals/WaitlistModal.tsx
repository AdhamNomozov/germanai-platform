"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Modal from "@/src/components/ui/Modal"
import PhoneInput from "@/src/components/ui/PhoneInput"
import { Button } from "@/src/components/ui/Button"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  source: string
  title?: string
  subtitle?: string
}

export default function WaitlistModal({
  isOpen,
  onClose,
  source,
  title = "Ro'yxatdan o'tish",
  subtitle = "Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi",
}: WaitlistModalProps) {
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
    if (!isValid) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    console.log({ name, phone, source })
    setLoading(false)
    setSent(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm text-gray-400 -mt-2 mb-1">{subtitle}</p>

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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={!isValid || loading}
          >
            Ro&apos;yxatdan o&apos;tish
          </Button>
        </form>
      )}
    </Modal>
  )
}
