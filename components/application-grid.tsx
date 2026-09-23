import Link from "next/link"
import { ArrowUpRight, Factory } from "lucide-react"
import type { Industry } from "@/lib/data/industries"
import { StaggerGroup } from "@/components/section-reveal"

interface ApplicationGridProps {
  industryList: Industry[]
}

export function ApplicationGrid({ industryList }: ApplicationGridProps) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerMs={60}>
      {industryList.map((industry) => (
        <div
          key={industry.slug}
          className="flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <Factory className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <h3 className="text-base font-semibold text-foreground">{industry.name}</h3>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{industry.summary}</p>
          <ul className="mt-4 space-y-1.5">
            {industry.examples.map((example) => (
              <li key={example} className="text-xs text-muted-foreground before:mr-1.5 before:text-primary before:content-['—']">
                {example}
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?application=${industry.slug}`}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Discuss My Application
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ))}
    </StaggerGroup>
  )
}
