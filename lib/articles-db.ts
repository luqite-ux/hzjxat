import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import type { NewsArticle } from "@/lib/data/news"

type ArticleRow = {
  slug: string | null
  title: string | null
  title_en: string | null
  title_i18n: Record<string, string> | null
  excerpt: string | null
  excerpt_en: string | null
  excerpt_i18n: Record<string, string> | null
  content?: string | null
  content_en?: string | null
  content_i18n?: Record<string, string> | null
  published_at: string | null
  featured_image: string | null
}

function pick(row: ArticleRow, key: "title" | "excerpt" | "content") {
  return row[`${key}_i18n`]?.en || row[`${key}_en`] || row[key] || ""
}

function mapArticle(row: ArticleRow): NewsArticle {
  const title = pick(row, "title") || "Untitled insight"
  return {
    slug: row.slug || "",
    title,
    excerpt: pick(row, "excerpt"),
    content: pick(row, "content").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean),
    publishedAt: row.published_at ? new Date(row.published_at).toLocaleDateString("en", { dateStyle: "medium" }) : "",
    category: "Insight",
  }
}

export async function getPublishedArticles(): Promise<NewsArticle[]> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return []
  const { data, error } = await db
    .from("articles")
    .select("slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,published_at,featured_image")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  if (error || !data) {
    console.error("[articles-db]", error?.message)
    return []
  }
  return (data as ArticleRow[]).map(mapArticle).filter((article) => article.slug)
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const db = getSupabaseClient()
  const tenantId = getTenantId()
  if (!db || !tenantId) return null
  const { data, error } = await db
    .from("articles")
    .select("slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,content,content_en,content_i18n,published_at,featured_image")
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()
  if (error || !data) return null
  return mapArticle(data as ArticleRow)
}
