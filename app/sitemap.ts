import type { MetadataRoute } from "next"
import { getPublishedArticles } from "@/lib/articles-db"
import { fetchProductsData } from "@/lib/products-db"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${siteConfig.domain}`
  const now = new Date()
  const products = await fetchProductsData()
  const articles = await getPublishedArticles()

  return [
    "",
    "/products",
    "/applications",
    "/capabilities",
    "/about",
    "/news",
    "/contact",
    ...products.map((product) => `/products/${product.slug}`),
    ...articles.map((article) => `/news/${article.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/products/") || path.startsWith("/news/") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products/") ? 0.8 : 0.7,
  }))
}
