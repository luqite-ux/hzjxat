import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { CompassIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Empty className="w-full border border-dashed border-border bg-secondary/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CompassIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Explore our products or get in
            touch with our engineering team.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-sm">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
