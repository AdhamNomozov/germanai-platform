"use client"

import { useState } from "react"
import { Navbar, Footer } from "@/src/components/layout"
import {
  Hero, Features, AITest, Courses,
  Certificate, Roadmap, Pricing, FAQ, Contact,
} from "@/src/components/sections"
import { WaitlistModal, CourseModal, PricingModal } from "@/src/components/modals"
import type { CourseData } from "@/src/components/modals/CourseModal"
import type { PlanData }   from "@/src/components/modals/PricingModal"

export default function Home() {
  /* ─── Waitlist modal ───────────────────────────────────── */
  const [waitlist, setWaitlist] = useState<{
    isOpen: boolean
    source: string
    title?: string
    subtitle?: string
  }>({ isOpen: false, source: "" })

  const openWaitlist = (source: string, title?: string, subtitle?: string) =>
    setWaitlist({ isOpen: true, source, title, subtitle })

  const closeWaitlist = () =>
    setWaitlist((s) => ({ ...s, isOpen: false }))

  /* ─── Course modal ─────────────────────────────────────── */
  const [courseModal, setCourseModal] = useState<{
    isOpen: boolean
    course: CourseData | null
  }>({ isOpen: false, course: null })

  const openCourseModal = (course: CourseData) =>
    setCourseModal({ isOpen: true, course })

  const closeCourseModal = () =>
    setCourseModal((s) => ({ ...s, isOpen: false }))

  /* ─── Pricing modal ────────────────────────────────────── */
  const [pricingModal, setPricingModal] = useState<{
    isOpen: boolean
    plan: PlanData | null
  }>({ isOpen: false, plan: null })

  const openPricingModal = (plan: PlanData) =>
    setPricingModal({ isOpen: true, plan })

  const closePricingModal = () =>
    setPricingModal((s) => ({ ...s, isOpen: false }))

  /* ─── Render ───────────────────────────────────────────── */
  return (
    <main className="bg-[#0F1117] min-h-screen">
      <Navbar onQuickTest={() => openWaitlist("navbar-quick-test", "AI Test sinab ko'ring")} />
      <Hero    onStartTest={() => openWaitlist("hero-start-test", "AI Test sinab ko'ring")} />
      <Features />
      <AITest  onStartTest={() => openWaitlist("aitest-start", "AI Test sinab ko'ring")} />
      <Courses onSelectCourse={openCourseModal} />
      <Certificate />
      <Roadmap />
      <Pricing onSelectPlan={openPricingModal} />
      <FAQ />
      <Contact />
      <Footer />

      {/* ─── Modals ────────────────────────────────────────── */}
      <WaitlistModal
        isOpen={waitlist.isOpen}
        onClose={closeWaitlist}
        source={waitlist.source}
        title={waitlist.title}
        subtitle={waitlist.subtitle}
      />
      <CourseModal
        isOpen={courseModal.isOpen}
        onClose={closeCourseModal}
        course={courseModal.course}
      />
      <PricingModal
        isOpen={pricingModal.isOpen}
        onClose={closePricingModal}
        plan={pricingModal.plan}
      />
    </main>
  )
}
