"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import PhoneInput from "@/src/components/ui/PhoneInput"
import { Button } from "@/src/components/ui/Button"

/* ─── Password strength ──────────────────────────────────── */
function getStrength(pw: string): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (pw.length === 0) return { level: 0, label: "", color: "" }
  const hasUpper   = /[A-Z]/.test(pw)
  const hasNumber  = /\d/.test(pw)
  const hasSpecial = /[^A-Za-z0-9]/.test(pw)
  const score = (pw.length >= 8 ? 1 : 0) + (hasUpper || hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0)
  if (score <= 1) return { level: 1, label: "Zaif",    color: "bg-red-500" }
  if (score === 2) return { level: 2, label: "O'rtacha", color: "bg-orange-400" }
  return             { level: 3, label: "Kuchli",   color: "bg-green-400" }
}

/* ─── Shared input classes ───────────────────────────────── */
const inputCls =
  "w-full px-4 py-3.5 rounded-xl text-base bg-white/4 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/6 transition-colors"

/* ─── Logo ───────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-[0_0_18px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-shadow">
        <span className="text-secondary-900 font-black text-base">G</span>
      </span>
      <span className="text-white font-bold text-xl tracking-tight">
        German<span className="text-primary-400">AI</span>
      </span>
    </Link>
  )
}

/* ─── Password field ─────────────────────────────────────── */
function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder = "Parolingiz",
  showStrength = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  placeholder?: string
  showStrength?: boolean
}) {
  const strength = getStrength(value)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      <div className="relative">
        <input
          required
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} pr-11`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {showStrength && value.length > 0 && (
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex gap-1 flex-1">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  strength.level >= n ? strength.color : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-medium ${
            strength.level === 1 ? "text-red-400" :
            strength.level === 2 ? "text-orange-400" : "text-green-400"
          }`}>
            {strength.label}
          </span>
        </div>
      )}
    </div>
  )
}

/* ─── Login tab ──────────────────────────────────────────── */
function LoginTab() {
  const [phone,    setPhone]    = useState("")
  const [password, setPassword] = useState("")
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)

  const isValid =
    phone.replace(/\D/g, "").length === 9 && password.length >= 4

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    console.log({ phone, password, action: "login" })
    setLoading(false)
    alert("Login tizimi tez kunda ishga tushadi")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400">Telefon *</label>
        <PhoneInput value={phone} onChange={setPhone} required />
      </div>

      <PasswordField
        label="Parol *"
        value={password}
        onChange={setPassword}
        show={showPw}
        onToggle={() => setShowPw((v) => !v)}
      />

      <div className="text-right -mt-1">
        <button
          type="button"
          onClick={() => alert("Tez kunda!")}
          className="text-xs text-gray-500 hover:text-primary-400 transition-colors"
        >
          Parolni unutdingiz?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
        disabled={!isValid || loading}
      >
        Kirish
      </Button>
    </form>
  )
}

/* ─── Register tab ───────────────────────────────────────── */
function RegisterTab() {
  const [name,     setName]     = useState("")
  const [phone,    setPhone]    = useState("")
  const [password, setPassword] = useState("")
  const [confirm,  setConfirm]  = useState("")
  const [showPw,   setShowPw]   = useState(false)
  const [showCf,   setShowCf]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const [error,    setError]    = useState("")

  const phoneDigits = phone.replace(/\D/g, "")
  const isValid =
    name.trim().length >= 2 &&
    phoneDigits.length === 9 &&
    password.length >= 4 &&
    confirm.length >= 4

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!isValid) return
    if (password !== confirm) {
      setError("Parollar mos kelmaydi")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    console.log({ name, phone, password, action: "register" })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-4 text-center"
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
          <h4 className="text-lg font-bold text-white mb-2">
            Ro&apos;yxatdan o&apos;tdingiz!
          </h4>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Platformaga kirish tez kunda faollashadi. SMS orqali xabar beramiz.
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
        >
          Bosh sahifaga qaytish →
        </Link>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400">Ism *</label>
        <input
          required
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400">Telefon *</label>
        <PhoneInput value={phone} onChange={setPhone} required />
      </div>

      <PasswordField
        label="Parol *"
        value={password}
        onChange={setPassword}
        show={showPw}
        onToggle={() => setShowPw((v) => !v)}
        showStrength
      />

      <PasswordField
        label="Parolni tasdiqlash *"
        value={confirm}
        onChange={(v) => { setConfirm(v); setError("") }}
        show={showCf}
        onToggle={() => setShowCf((v) => !v)}
        placeholder="Parolni qaytaring"
      />

      {error && (
        <p className="text-xs text-red-400 -mt-1">{error}</p>
      )}

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
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function PlatformPage() {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <main className="min-h-screen bg-[#0F1117] flex flex-col items-center justify-center px-4 py-12">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary-500/6 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500/4 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-4 sm:mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Logo />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative rounded-2xl bg-[#161820] border border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

          <div className="p-6 sm:p-7">
            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/4 border border-white/6 mb-6">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold transition-all duration-200 ${
                    tab === t
                      ? "bg-primary-500 text-secondary-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {t === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "login" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tab === "login" ? 12 : -12 }}
                transition={{ duration: 0.22 }}
              >
                {tab === "login" ? <LoginTab /> : <RegisterTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-gray-600 mt-5"
        >
          <Link href="/" className="hover:text-gray-400 transition-colors">
            ← Bosh sahifaga qaytish
          </Link>
        </motion.p>
      </div>
    </main>
  )
}
