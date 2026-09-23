import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"
import type { Product } from "@/lib/data/products"

interface ProductDetailProps {
  product: Product
  relatedProducts?: Product[]
}

export function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const related = relatedProducts

  return (
    <article>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {product.category} · {product.group}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{product.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-sm">
                <Link href={`/contact?product=${product.slug}`}>Request a Quote for This Equipment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-sm">
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={`${product.name} industrial automation equipment`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-16">
        <div className="space-y-10 lg:col-span-2">
          <SectionReveal>
            <h2 className="text-xl font-semibold text-foreground">Overview</h2>
            <div className="mt-4 space-y-3">
              {product.overview.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <h2 className="text-xl font-semibold text-foreground">Suitable Applications</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {product.applications.map((application) => (
                <li key={application} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {application}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal>
            <h2 className="text-xl font-semibold text-foreground">Process Flow</h2>
            <ol className="mt-4 space-y-3">
              {product.processFlow.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>

        <div className="space-y-8">
          <SectionReveal className="rounded-sm border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Available Specifications</h2>
            <dl className="mt-4 space-y-4">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{spec.label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Final specifications are engineered to your part drawings, tolerances and cycle-time requirements.
            </p>
          </SectionReveal>

          <SectionReveal className="rounded-sm border border-border bg-primary/5 p-6">
            <h2 className="text-lg font-semibold text-foreground">Inquiry Context</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Share your part drawings, target volume and inspection or test criteria so our engineering team can
              scope this equipment for your production line.
            </p>
            <Button asChild className="mt-4 w-full rounded-sm">
              <Link href={`/contact?product=${product.slug}`}>Discuss This Product</Link>
            </Button>
          </SectionReveal>

          {related.length > 0 && (
            <SectionReveal>
              <h2 className="text-lg font-semibold text-foreground">Related Systems</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/products/${item.slug}`}
                      className="flex items-center gap-3 rounded-sm border border-border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.shortName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          )}
        </div>
      </div>
    </article>
  )
}
