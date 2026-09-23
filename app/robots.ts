import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${siteConfig.domain}`

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*", "/api", "/api/", "/api/*", "/service-expired"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
