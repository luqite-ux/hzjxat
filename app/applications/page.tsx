import type { Metadata } from "next"
import { ApplicationGrid } from "@/components/application-grid"
import { SectionReveal } from "@/components/section-reveal"
import { industries } from "@/lib/data/industries"

export const metadata: Metadata = {
  title: "Industry Applications",
  description:
    "Automation equipment applications across automotive, medical devices, electronics, new energy, hardware, adhesive, rubber and machining industries.",
}

export default function ApplicationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionReveal className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Applications</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Industry Applications</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Our equipment is engineered for a range of production environments where consistent process control
          matters. Each application below links to representative equipment built for that industry.
        </p>
      </SectionReveal>

      <div className="mt-10">
        <ApplicationGrid industryList={industries} />
      </div>
    </div>
  )
}
