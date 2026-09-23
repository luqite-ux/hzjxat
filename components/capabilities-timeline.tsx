import { CheckCircle2 } from "lucide-react"
import type { ProcessStep } from "@/lib/data/capabilities"
import { SectionReveal } from "@/components/section-reveal"

interface CapabilitiesTimelineProps {
  steps: ProcessStep[]
}

export function CapabilitiesTimeline({ steps }: CapabilitiesTimelineProps) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
      {steps.map((step, index) => (
        <li key={step.step} className="relative">
          <SectionReveal delay={index * 60}>
            <span className="absolute -left-[calc(2rem+1px)] flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground sm:-left-[calc(2.5rem+1px)]">
              {step.step}
            </span>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </SectionReveal>
        </li>
      ))}
    </ol>
  )
}
