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
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  metadataBase: new URL("https://germango.uz"),
  title: {
    default: "GermanGo — Nemis tili kurslari | Onlayn o'rganish Uzbekistonda",
    template: "%s | GermanGo",
  },
  description: "Nemis tilini onlayn o'rganing — tajribali o'qituvchilar va sun'iy intellekt yordamida. Goethe, telc, TestDaF imtihonlariga tayyorgarlik. A1 dan B2 gacha. Uzbekiston bo'yicha #1 nemis tili platformasi.",
  keywords: [
    "nemis tili kurslari", "nemis tili o'rganish", "german tili kursi uzbekiston",
    "deutsch kurs toshkent", "nemis tili onlayn", "goethe imtihon tayyorgarlik",
    "telc imtihon", "testdaf tayyorgarlik", "nemis tili surxondaryo", "termiz nemis tili",
    "germaniyada o'qish", "germaniyada ishlash", "nemis tili sertifikati",
    "A1 nemis tili", "B1 nemis tili", "B2 nemis tili",
    "немецкий язык узбекистан", "немецкий онлайн курс", "german language uzbekistan",
    "GermanGo", "germango.uz",
  ],
  authors: [{ name: "GermanGo", url: "https://germango.uz" }],
  creator: "GermanGo",
  publisher: "GermanGo",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "GermanGo — Nemis tili kurslari | Onlayn o'rganish",
    description: "Tajribali o'qituvchilar va sun'iy intellekt bilan nemis tilini o'rganing. Goethe, telc, TestDaF imtihonlariga tayyorgarlik. A1 dan B2 gacha.",
    url: "https://germango.uz",
    siteName: "GermanGo",
    type: "website",
    locale: "uz_UZ",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GermanGo — Nemis tili kurslari" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GermanGo — Nemis tili kurslari",
    description: "Onlayn nemis tili kurslari. Goethe, telc imtihonlariga tayyorgarlik.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://germango.uz",
  },
  verification: {
    google: "google-site-verification-token",
    yandex: "yandex-verification-token",
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
