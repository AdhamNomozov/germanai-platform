/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, ChevronRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/Button"

/* ─── Nav Items ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Yo'nalishlar", id: "features" },
  { label: "Kurslar",      id: "courses"  },
  { label: "Narxlar",      id: "pricing"  },
  { label: "FAQ",          id: "faq"      },
  { label: "Bog'lanish",   id: "contact"  },
]

/* ─── Component ──────────────────────────────────────────── */
interface NavbarProps {
  onQuickTest?: () => void
}

export default function Navbar({ onQuickTest }: NavbarProps) {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeItem,   setActiveItem]   = useState<string | null>(null)

  /* scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* ── Sticky Bar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2 select-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-gold">
                <span className="text-secondary-900 font-black text-sm">G</span>
              </span>
              <span className="text-white font-bold text-lg tracking-tight">
                German
                <span className="text-primary-400">Go</span>
              </span>
              {/* Live dot */}
              <span className="hidden sm:flex items-center gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onHoverStart={() => setActiveItem(item.id)}
                  onHoverEnd={()  => setActiveItem(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    "text-gray-400 hover:text-white"
                  )}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-0 rounded-lg bg-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="/platform"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                whileHover={{ x: 2 }}
              >
                Kirish
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  className="shadow-glow-gold"
                  onClick={() => window.location.href="/register"}
                >
                  Ro&apos;yxatdan o&apos;tish
                </Button>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer Overlay ───────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#161820] border-l border-white/8 flex flex-col lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/8">
                <span className="text-white font-bold text-base">
                  German<span className="text-primary-400">Go</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between w-full px-4 py-4 min-h-[52px] rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium text-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                    <ChevronRight size={14} className="text-gray-600" />
                  </motion.button>
                ))}
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-4 pb-8 flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => { setMenuOpen(false); window.location.href = '/register' }}
                >
                  Ro&apos;yxatdan o&apos;tish
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  fullWidth
                  onClick={() => { setMenuOpen(false); window.location.href = "/platform" }}
                >
                  Kirish
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
