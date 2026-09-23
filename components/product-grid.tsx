import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { StaggerGroup } from "@/components/section-reveal"
import { resolveDisplayImage } from "@/lib/media"

interface ProductGridProps {
  productList: Product[]
}

export function ProductGrid({ productList }: ProductGridProps) {
  if (productList.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-border bg-secondary/30 p-8 text-center text-sm text-muted-foreground">
        No equipment matches the selected filters yet.
      </p>
    )
  }

  return (
    <StaggerGroup
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      itemClassName="h-full"
      staggerMs={70}
    >
      {productList.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[linear-gradient(135deg,#f8f7f2_0%,#ece9df_100%)]">
            <Image
              src={resolveDisplayImage(product.image)}
              alt={`${product.name} industrial automation equipment`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
            <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              {product.category === "Custom Automation Equipment" ? "Custom" : "Standard"}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.group}</p>
              <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">{product.name}</h3>
            </div>
            <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              View details
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </StaggerGroup>
  )
}
