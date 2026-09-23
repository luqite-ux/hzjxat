import type { Metadata } from "next"
import Link from "next/link"
import { SectionReveal } from "@/components/section-reveal"
import { NewsEmptyState } from "@/components/news-empty-state"
import { getPublishedArticles } from "@/lib/articles-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Insights",
  description: "Engineering notes and project insights from Hangzhou Jianxin Automation Technology Co., Ltd.",
}

export default async function NewsPage() {
  const articles = await getPublishedArticles()

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SectionReveal>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Insights</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">News & Insights</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Engineering notes and project insights from our automation team.
        </p>
      </SectionReveal>

      <div className="mt-10">
        {articles.length === 0 ? (
          <NewsEmptyState />
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.slug} className="rounded-sm border border-border bg-card p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{article.category}</p>
                <Link href={`/news/${article.slug}`} className="mt-1.5 block">
                  <h2 className="text-lg font-semibold text-foreground hover:underline">{article.title}</h2>
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
