"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, BookOpen, Check, CheckCircle2 } from "lucide-react"
import Modal from "@/src/components/ui/Modal"
import PhoneInput from "@/src/components/ui/PhoneInput"
import { Button } from "@/src/components/ui/Button"

export interface CourseData {
  level: string
  title: string
  duration: string
  hours: string
  features: string[]
}

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  course: CourseData | null
}

const levelStyles: Record<string, { badge: string; check: string; bg: string; border: string }> = {
  A1: {
    badge:  "from-green-400 to-green-600",
    check:  "text-green-400",
    bg:     "bg-green-500/8",
    border: "border-green-500/20",
  },
  A2: {
    badge:  "from-blue-400 to-blue-600",
    check:  "text-blue-400",
    bg:     "bg-blue-500/8",
    border: "border-blue-500/20",
  },
  B1: {
    badge:  "from-orange-400 to-orange-600",
    check:  "text-orange-400",
    bg:     "bg-orange-500/8",
    border: "border-orange-500/20",
  },
  B2: {
    badge:  "from-red-400 to-red-600",
    check:  "text-red-400",
    bg:     "bg-red-500/8",
    border: "border-red-500/20",
  },
}

const fallbackStyle = {
  badge:  "from-gray-400 to-gray-600",
  check:  "text-gray-400",
  bg:     "bg-white/5",
  border: "border-white/10",
}

export default function CourseModal({ isOpen, onClose, course }: CourseModalProps) {
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
    if (!isValid || !course) return
    setLoading(true)
    await fetch("/api/leads", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name, phone: "+998"+phone, source: "Kurs: " + (course?.title || "") }) })
    console.log({ name, phone, course: course.level })
    setLoading(false)
    setSent(true)
  }

  if (!course) return null

  const style = levelStyles[course.level] ?? fallbackStyle

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="lg">
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
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            
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
          {/* Course info */}
          <div className={`p-4 rounded-xl border ${style.bg} ${style.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-black bg-gradient-to-r text-white ${style.badge}`}>
                {course.level}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mb-3">{course.title}</h4>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className={style.check} />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} className={style.check} />
                {course.hours}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Mavzular</p>
            <div className="flex flex-col gap-1.5">
              {course.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <Check size={13} className={`shrink-0 ${style.check}`} />
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
            Kursga yozilish
          </Button>
        </form>
      )}
    </Modal>
  )
}
