import Link from "next/link"
import {
  ArrowUpRight,
  Cpu,
  Droplets,
  Gauge,
  HeartPulse,
  Leaf,
  PackageCheck,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import type { Industry } from "@/lib/data/industries"
import { StaggerGroup } from "@/components/section-reveal"

interface ApplicationGridProps {
  industryList: Industry[]
}

const industryIcons: Record<string, LucideIcon> = {
  automotive: Gauge,
  "medical-devices": HeartPulse,
  electronics: Cpu,
  "new-energy": Leaf,
  hardware: Wrench,
  "adhesive-rubber": Settings,
  machining: Settings,
  "water-meter-appliance": Droplets,
}

export function ApplicationGrid({ industryList }: ApplicationGridProps) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
      {industryList.map((industry, index) => {
        const Icon = industryIcons[industry.slug] ?? PackageCheck

        return (
          <div
            key={industry.slug}
            className="group relative flex h-full min-h-[18rem] overflow-hidden rounded-sm border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" />

            <div className="relative flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-primary/80">
                      Application {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-foreground">{industry.name}</h3>
                  </div>
                </div>
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-primary/70 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5 sm:flex">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{industry.summary}</p>
              <ul className="mt-5 space-y-2">
                {industry.examples.map((example) => (
                  <li key={example} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 transition-transform duration-300 group-hover:scale-125" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?application=${industry.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Discuss My Application
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )
      })}
    </StaggerGroup>
  )
}
