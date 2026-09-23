export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  content: string[]
  publishedAt: string
  category: string
}

// No verified news or insight articles were supplied by the customer. This
// array intentionally starts empty; a future backend/CMS integration should
// populate it without any change to the consuming list/detail pages.
export const newsArticles: NewsArticle[] = []

export function getAllNews(): NewsArticle[] {
  return newsArticles
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug)
}
