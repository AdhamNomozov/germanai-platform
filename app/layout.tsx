import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

/* ─── Font ───────────────────────────────────────────────── */
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
})

/* ─── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "GermanAI — Nemis tili imtihonlariga AI bilan tayyorlaning",
  description:
    "AI mock imtihonlar, shaxsiy kurslar va 24/7 aqlli mentor bilan nemis tilini o'rganing. A1 dan C2 gacha barcha darajalar uchun.",
  keywords: [
    "nemis tili", "german tili", "deutsch lernen", "ai tutor",
    "mock imtihon", "TestDaF", "Goethe", "A1", "B2", "C1",
  ],
  authors: [{ name: "GermanAI" }],
  openGraph: {
    title:       "GermanAI — Nemis tili imtihonlariga AI bilan tayyorlaning",
    description: "AI mock imtihonlar, shaxsiy kurslar va 24/7 aqlli mentor.",
    type:        "website",
    locale:      "uz_UZ",
  },
}

export const viewport: Viewport = {
  themeColor:   "#0F1117",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
}

/* ─── Root Layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-[#0F1117] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
