"use client"

import { cn } from "@/src/lib/utils"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  required?: boolean
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9)
  let out = ""
  if (digits.length > 0) out += digits.slice(0, 2)
  if (digits.length > 2) out += " " + digits.slice(2, 5)
  if (digits.length > 5) out += " " + digits.slice(5, 7)
  if (digits.length > 7) out += " " + digits.slice(7, 9)
  return out
}

export default function PhoneInput({
  value,
  onChange,
  className,
  placeholder = "90 123 45 67",
  required,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    onChange(formatted)
  }

  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/4 overflow-hidden focus-within:border-primary-500/50 focus-within:bg-white/6 transition-colors">
      <span className="px-3 py-3.5 text-base text-gray-400 border-r border-white/10 bg-white/3 shrink-0 select-none">
        +998
      </span>
      <input
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "flex-1 px-3 py-3.5 text-base text-white placeholder-gray-600 bg-transparent focus:outline-none",
          className
        )}
      />
    </div>
  )
}
