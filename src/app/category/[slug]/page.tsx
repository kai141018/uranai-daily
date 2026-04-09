import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CATEGORIES, SITE_URL, CATEGORY_CTA_MAP } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) return {}

  return {
    title: `${category.name}の記事一覧`,
    description: category.description,
    alternates: {
      canonical: `${SITE_URL}/category/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  // TODO: Supabaseからカテゴリ別記事を取得
  const articles: { slug: string; title: string; description: string; publishedAt: string }[] = []

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Breadcrumb
        items={[{ name: category.name, href: `/category/${slug}` }]}
      />

      <section className="py-4">
        <h1 className="text-2xl font-black text-text-dark mb-1">{category.name}</h1>
        <p className="text-sm text-text-light mb-6">{category.description}</p>

        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <p className="text-text-light text-sm">まだ記事がありません。近日公開予定です。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`/article/${article.slug}`}
                className="block bg-white rounded-xl border border-border p-5 hover:border-primary-light hover:shadow-md transition-all group"
              >
                <time className="text-xs text-text-light">{article.publishedAt}</time>
                <h3 className="font-bold text-text-dark group-hover:text-primary transition-colors leading-snug mt-1 mb-2 text-sm">
                  {article.title}
                </h3>
                <p className="text-xs text-text-light leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </a>
            ))}
          </div>
        )}

        <CTABanner context={CATEGORY_CTA_MAP[slug] || "general"} />
      </section>
    </div>
  )
}
