import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import {
  getAllProducts as getFallbackProducts,
  getProductBySlug as getFallbackProductBySlug,
  type Product,
  productCategories as fallbackCategories,
} from "@/lib/data/products"

type ProductRow = {
  slug: string | null
  name: string | null
  name_en: string | null
  name_i18n: Record<string, string> | null
  description: string | null
  description_en: string | null
  description_i18n: Record<string, string> | null
  overview_i18n: Record<string, unknown> | null
  category_slug: string | null
  image_url: string | null
  specs: unknown
  features: unknown
  applications: unknown
  advantages_i18n?: Record<string, unknown> | null
  extra_data: unknown
}

const PRODUCT_SELECT =
  "slug,name,name_en,name_i18n,description,description_en,description_i18n,overview_i18n,category_slug,image_url,specs,features,applications,advantages_i18n,extra_data"

function textRecordValue(value: Record<string, unknown> | null | undefined, locale = "en") {
  const candidate = value?.[locale] ?? value?.en
  return typeof candidate === "string" ? candidate.trim() : ""
}

function pickText(row: ProductRow, key: "name" | "description") {
  const direct = row[key]
  const directEn = row[`${key}_en`]
  return textRecordValue(row[`${key}_i18n`]) || directEn?.trim() || direct?.trim() || ""
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim())
  if (typeof value === "string" && value.trim()) return value.split(/\n+/).map((item) => item.trim()).filter(Boolean)
  return []
}

function specsArray(value: unknown): { label: string; value: string }[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return []
  return Object.entries(value as Record<string, unknown>)
    .filter(([, item]) => typeof item === "string" && item.trim())
    .map(([label, item]) => ({ label, value: String(item) }))
}

function normalizeCategory(slug: string | null): Product["category"] {
  return slug?.includes("custom") ? "Custom Automation Equipment" : "Standard Automation Equipment"
}

function normalizeGroup(row: ProductRow): Product["group"] {
  const extra = row.extra_data && typeof row.extra_data === "object" ? (row.extra_data as Record<string, unknown>) : {}
  const group = typeof extra.group === "string" ? extra.group : row.category_slug || ""
  if (/assembly.*testing|testing/i.test(group)) return "Assembly and Testing"
  if (/assembly/i.test(group)) return "Assembly"
  return "Vision Inspection"
}

function toProduct(row: ProductRow): Product {
  const extra = row.extra_data && typeof row.extra_data === "object" ? (row.extra_data as Record<string, unknown>) : {}
  const name = pickText(row, "name") || "Untitled equipment"
  const description = pickText(row, "description")
  const overview = stringArray(textRecordValue(row.overview_i18n) || description)
  const relatedSlugs = stringArray(extra.relatedSlugs)
  return {
    slug: row.slug || "",
    name,
    shortName: typeof extra.shortName === "string" ? extra.shortName : name,
    category: normalizeCategory(row.category_slug),
    group: normalizeGroup(row),
    image: row.image_url || "/placeholder.svg",
    summary: textRecordValue(row.overview_i18n) || description.split(/\n/)[0] || name,
    overview: overview.length ? overview : [description].filter(Boolean),
    applications: stringArray(row.applications),
    processFlow: stringArray(row.features),
    specifications: specsArray(row.specs),
    relatedSlugs,
  }
}

async function queryProducts(): Promise<Product[] | null> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return null
  const { data, error } = await db
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  if (error || !data) {
    console.error("[products-db]", error?.message)
    return null
  }
  return (data as ProductRow[]).map(toProduct).filter((product) => product.slug)
}

export async function fetchProductsData(): Promise<Product[]> {
  return (await queryProducts()) ?? getFallbackProducts()
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const dbProducts = await queryProducts()
  if (dbProducts) return dbProducts.find((product) => product.slug === slug) ?? null
  return getFallbackProductBySlug(slug) ?? null
}

export async function fetchRelatedProducts(product: Product): Promise<Product[]> {
  const products = await fetchProductsData()
  return product.relatedSlugs
    .map((slug) => products.find((item) => item.slug === slug))
    .filter((item): item is Product => Boolean(item))
}

export async function fetchProductCategories(): Promise<Product["category"][]> {
  const products = await fetchProductsData()
  const categories = Array.from(new Set(products.map((product) => product.category)))
  return categories.length ? categories : [...fallbackCategories]
}
