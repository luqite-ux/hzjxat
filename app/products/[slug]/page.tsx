import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { fetchProductBySlug, fetchProductsData, fetchRelatedProducts } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60
export const dynamicParams = true

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await fetchProductsData()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.summary,
      url: `https://${siteConfig.domain}/products/${product.slug}`,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
      type: "website",
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await fetchRelatedProducts(product)
  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
