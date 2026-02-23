"use client"

import { forwardRef, ButtonHTMLAttributes } from "react"
import { cn } from "@/src/lib/utils"

/* ─── Variant & Size Maps ────────────────────────────────── */
const variantStyles = {
  primary: [
    "bg-gradient-to-r from-primary-500 to-primary-400",
    "text-secondary-900 font-semibold",
    "border border-primary-400",
    "shadow-glow-gold",
    "hover:from-primary-400 hover:to-primary-300",
    "hover:shadow-glow-gold-lg",
    "active:from-primary-600 active:to-primary-500",
  ],
  secondary: [
    "bg-secondary-800",
    "text-white font-semibold",
    "border border-white/10",
    "hover:bg-secondary-700",
    "hover:border-white/20",
    "active:bg-secondary-900",
  ],
  outline: [
    "bg-transparent",
    "text-primary font-semibold",
    "border border-primary-500/60",
    "hover:bg-primary-500/10",
    "hover:border-primary-400",
    "active:bg-primary-500/20",
  ],
  ghost: [
    "bg-transparent",
    "text-gray-300 font-medium",
    "border border-transparent",
    "hover:bg-white/5",
    "hover:text-white",
    "active:bg-white/10",
  ],
  danger: [
    "bg-accent-600",
    "text-white font-semibold",
    "border border-accent-500",
    "shadow-glow-red",
    "hover:bg-accent-500",
    "active:bg-accent-700",
  ],
} as const

const sizeStyles = {
  sm:  "h-9  min-h-[36px] px-3  text-sm   gap-1.5 rounded-lg",
  md:  "h-11 min-h-[44px] px-5  text-sm   gap-2   rounded-xl",
  lg:  "h-12 min-h-[44px] px-7  text-base gap-2.5 rounded-xl",
  xl:  "h-14 min-h-[44px] px-9  text-lg   gap-3   rounded-2xl",
} as const

/* ─── Types ──────────────────────────────────────────────── */
export type ButtonVariant = keyof typeof variantStyles
export type ButtonSize    = keyof typeof sizeStyles

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

/* ─── Component ──────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "primary",
      size      = "md",
      loading   = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center",
          "font-sans tracking-wide",
          "transition-all duration-200 ease-out",
          "select-none cursor-pointer",
          "active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-surface-300",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          // Disabled
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin shrink-0"
            width={size === "sm" ? 14 : size === "xl" ? 20 : 16}
            height={size === "sm" ? 14 : size === "xl" ? 20 : 16}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        )}

        {/* Label */}
        {children && <span>{children}</span>}

        {/* Right icon */}
        {rightIcon && (
          <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
