import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles-db"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 60
export const dynamicParams = true

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://${siteConfig.domain}/news/${article.slug}`,
      type: "article",
    },
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Insights
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-primary">{article.category}</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{article.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{article.publishedAt}</p>
      <div className="mt-8 space-y-4">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
