import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { SectionReveal } from "@/components/section-reveal"
import { fetchProductCategories, fetchProductsData } from "@/lib/products-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Automation Equipment Products",
  description:
    "Browse custom automation equipment and standard automation machines from Hangzhou Jianxin Automation Technology, including vision inspection, assembly and testing systems.",
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams
  const [allProducts, productCategories] = await Promise.all([fetchProductsData(), fetchProductCategories()])
  const filtered = category ? allProducts.filter((product) => product.category === category) : allProducts

  return (
    <div>
      <div className="border-b border-border bg-[linear-gradient(135deg,#f7f5f0_0%,#eef3f4_58%,#f7f1e8_100%)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
          <SectionReveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Products</p>
            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Automation Equipment</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Custom, non-standard automation systems and standard vision/assembly machines engineered for automotive,
              medical, electronics and general industrial production. This is a representative catalog; additional
              equipment records are added as projects are engineered.
            </p>
          </SectionReveal>
          <SectionReveal className="hidden rounded-sm border border-border/70 bg-background/70 p-5 shadow-sm lg:block">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Catalog Scope</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">{allProducts.length}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">verified equipment records</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{productCategories.length}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">equipment families</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <SectionReveal className="flex flex-wrap gap-2">
          <Button asChild variant={!category ? "default" : "outline"} size="sm" className="rounded-sm">
            <Link href="/products">All Equipment</Link>
          </Button>
          {productCategories.map((cat) => (
            <Button
              key={cat}
              asChild
              variant={category === cat ? "default" : "outline"}
              size="sm"
              className="rounded-sm"
            >
              <Link href={`/products?category=${encodeURIComponent(cat)}`}>{cat}</Link>
            </Button>
          ))}
        </SectionReveal>

        <div className="mt-8">
          <ProductGrid productList={filtered} />
        </div>
      </div>
    </div>
  )
}
