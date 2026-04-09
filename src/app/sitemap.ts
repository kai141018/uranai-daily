import type { MetadataRoute } from "next"
import { SITE_URL, ZODIAC_SIGNS, CATEGORIES } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
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

  // TODO: 記事ページはSupabaseから動的に取得してここに追加
  return [...staticPages, ...zodiacPages, ...categoryPages]
}
