import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { fetchProductBySlug, fetchProductsData, fetchRelatedProducts } from "@/lib/products-db"

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
