"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose() },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKey])

  const maxWMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "relative w-full z-10",
              "sm:rounded-2xl rounded-t-2xl",
              "bg-[#161820] border border-white/10",
              "shadow-[0_24px_80px_rgba(0,0,0,0.7)]",
              "max-h-[92vh] overflow-y-auto",
              maxWMap[maxWidth]
            )}
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-white/6">
                <h3 className="text-base font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Close btn without title */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/8 transition-all z-10"
              >
                <X size={16} />
              </button>
            )}

            {/* Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
