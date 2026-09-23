import { Newspaper } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export function NewsEmptyState() {
  return (
    <Empty className="rounded-sm border border-dashed border-border bg-secondary/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Newspaper aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>Insights are being prepared</EmptyTitle>
        <EmptyDescription>
          This section is reserved for engineering notes and project insights from Jianxin Automation. Check back
          soon, or contact our team directly with questions about a specific product or application.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="/contact" className="text-sm font-medium text-primary hover:underline">
          Contact Engineering Team
        </a>
      </EmptyContent>
    </Empty>
  )
}
