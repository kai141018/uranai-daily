import type { MetadataRoute } from "next"
import { SITE_URL, ZODIAC_SIGNS, CATEGORIES } from "@/lib/constants"
import { getPublishedArticles } from "@/lib/supabase"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/horoscope`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about/hisho`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  const zodiacPages: MetadataRoute.Sitemap = ZODIAC_SIGNS.map((sign) => ({
    url: `${SITE_URL}/horoscope/${sign.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const articles = await getPublishedArticles(500)
  const articlePages: MetadataRoute.Sitemap = articles.map((a: { slug: string; published_at: string }) => ({
    url: `${SITE_URL}/article/${a.slug}`,
    lastModified: a.published_at,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...zodiacPages, ...categoryPages, ...articlePages]
}
