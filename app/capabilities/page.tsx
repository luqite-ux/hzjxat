import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Cpu, Eye, Layers, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"
import { CapabilitiesTimeline } from "@/components/capabilities-timeline"
import { capabilities, processSteps } from "@/lib/data/capabilities"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Engineering Capabilities & Manufacturing",
  description:
    "Custom automation engineering capabilities from Hangzhou Jianxin Automation Technology: machine vision, robotics, software, assembly and testing, plus in-house manufacturing.",
}

const capabilityIcons = [Layers, Eye, Cpu, ShieldCheck, Cpu]

export default function CapabilitiesPage() {
  return (
    <div>
      <div className="border-b border-border bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Capabilities</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Engineering Capabilities & Manufacturing
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Custom equipment design, machine vision, robotics, software and in-house manufacturing under a single
              engineering team.
            </p>
          </SectionReveal>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length]
            const imageFirst = index % 2 === 1
            return (
              <SectionReveal key={capability.title}>
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                    imageFirst ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">{capability.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                    <ul className="mt-4 space-y-2">
                      {capability.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={capability.image || "/placeholder.svg"}
                      alt={capability.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">In-House Manufacturing</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Workshop and equipment</h2>
          </SectionReveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SectionReveal className="rounded-sm border border-border bg-card p-5">
              <p className="text-xl font-bold text-foreground">{siteConfig.workshop.area}</p>
              <p className="mt-1 text-xs text-muted-foreground">workshop floor area</p>
            </SectionReveal>
            <SectionReveal delay={60} className="rounded-sm border border-border bg-card p-5">
              <p className="text-xl font-bold text-foreground">{siteConfig.workshop.layout}</p>
              <p className="mt-1 text-xs text-muted-foreground">facility layout</p>
            </SectionReveal>
            <SectionReveal delay={120} className="rounded-sm border border-border bg-card p-5">
              <p className="text-xl font-bold text-foreground">{siteConfig.workshop.capacity}</p>
              <p className="mt-1 text-xs text-muted-foreground">production capacity</p>
            </SectionReveal>
            <SectionReveal delay={180} className="rounded-sm border border-border bg-card p-5">
              <p className="text-xl font-bold text-foreground">{siteConfig.qualifications.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">confirmed qualifications</p>
            </SectionReveal>
          </div>
          <SectionReveal className="mt-6 rounded-sm border border-border bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">In-house equipment</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {siteConfig.workshop.equipment.join(" · ")}
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Our Process</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
            From requirement to commissioning
          </h2>
        </SectionReveal>
        <div className="mt-10">
          <CapabilitiesTimeline steps={processSteps} />
        </div>
      </section>

      <section className="bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Have a process that needs custom automation?
            </h2>
            <Button asChild size="lg" variant="secondary" className="mt-6 rounded-sm">
              <Link href="/contact">Discuss Custom Project</Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
