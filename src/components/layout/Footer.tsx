"use client"

import { motion } from "framer-motion"
import { MessageCircle, Instagram, Youtube, ArrowRight } from "lucide-react"
import { cn } from "@/src/lib/utils"

const FOOTER_LINKS = {
  product: {
    label: "Xizmatlar",
    links: [
      { label: "Kurslar",      href: "#courses"     },
      { label: "Narxlar",      href: "#pricing"     },
      { label: "Sertifikat",   href: "#certificate" },
      { label: "AI Test",      href: "#aitest"      },
      { label: "Yo'l xaritasi", href: "#roadmap"   },
    ],
  },
  company: {
    label: "Kompaniya",
    links: [
      { label: "Haqimizda",   href: "#"         },
      { label: "Blog",        href: "#"         },
      { label: "FAQ",         href: "#faq"      },
      { label: "Bog'lanish",  href: "#contact"  },
      { label: "Hamkorlik",   href: "#"         },
    ],
  },
}

const SOCIALS = [
  { icon: MessageCircle, label: "Telegram",  href: "#", color: "hover:text-blue-400"  },
  { icon: Instagram,     label: "Instagram", href: "#", color: "hover:text-pink-400"  },
  { icon: Youtube,       label: "YouTube",   href: "#", color: "hover:text-red-400"   },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0C12] border-t border-white/6 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-gold">
                <span className="text-secondary-900 font-black">G</span>
              </span>
              <span className="text-white font-bold text-xl tracking-tight">
                German<span className="text-primary-400">Go</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              AI yordamida online nemis tili o&apos;rgatish platformasi — A1 dan B2 gacha.
            </p>

            {/* German flag */}
            <div className="flex gap-1 w-12">
              <div className="h-1 flex-1 rounded-full bg-secondary-700" />
              <div className="h-1 flex-1 rounded-full bg-accent-600" />
              <div className="h-1 flex-1 rounded-full bg-primary-400" />
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    "bg-white/4 border border-white/8 text-gray-500",
                    "transition-all duration-200",
                    s.color
                  )}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>

          </div>

          {/* Col 2 — Product */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {FOOTER_LINKS.product.label}
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.product.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={11}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {FOOTER_LINKS.company.label}
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-primary-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={11}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 GermanGo. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Maxfiylik siyosati</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-400 transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
