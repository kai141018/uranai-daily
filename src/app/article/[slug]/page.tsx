import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SITE_URL, SITE_AUTHOR, CATEGORY_CTA_MAP, CATEGORIES } from "@/lib/constants"
import { getArticleBySlug, getRelatedArticles } from "@/lib/supabase"
import { articleJsonLd } from "@/lib/jsonld"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

export const revalidate = 3600 // 1時間キャッシュ

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.meta_description,
    alternates: { canonical: `${SITE_URL}/article/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.meta_description,
      publishedTime: article.published_at,
      authors: [SITE_AUTHOR],
      ...(article.featured_image && { images: [{ url: article.featured_image, width: 800, height: 450 }] }),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const ctaContext = CATEGORY_CTA_MAP[article.category] || "general"
  const categoryName = CATEGORIES.find((c) => c.slug === article.category)?.name || article.category || "記事"
  const relatedArticles = article.cluster
    ? await getRelatedArticles(article.cluster, slug)
    : []
  const faqs = article.faq || []

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Breadcrumb items={[
        { name: categoryName, href: `/category/${article.category}` },
        { name: article.title, href: `/article/${slug}` },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            title: article.title,
            description: article.meta_description,
            url: `${SITE_URL}/article/${slug}`,
            publishedAt: article.published_at,
            updatedAt: article.updated_at || article.published_at,
          })),
        }}
      />

      <article className="py-4">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-wider text-gold-dim border border-gold/20 px-2 py-0.5 rounded">
              {categoryName}
            </span>
            <time className="text-[10px] text-text-dim" dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString("ja-JP")}
            </time>
          </div>
          <h1 className="text-2xl md:text-3xl text-cream leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-text-dim">著者：</span>
            <span className="text-xs text-text-secondary">{SITE_AUTHOR}</span>
          </div>
          <div className="gold-line" />
        </header>

        {article.featured_image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* 本文 */}
        <div
          className="article-prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* compact CTA削除済み。CTAはcontent内のcta-box + 記事末尾のdefault CTABannerのみ */}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="my-8">
            <h2 className="text-lg text-cream mb-4 pb-3 border-b border-border-subtle" style={{ fontFamily: "var(--font-display)" }}>
              よくある質問
            </h2>
            <div className="space-y-3">
              {faqs.map((faq: { question: string; answer: string }, i: number) => (
                <div key={i} className="bg-navy-light border border-border-subtle rounded-lg p-5">
                  <h3 className="text-sm font-medium text-cream mb-2">Q. {faq.question}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <CTABanner context={ctaContext} />

        {/* 関連記事 */}
        {relatedArticles.length > 0 && (
          <section className="py-8">
            <h2 className="text-sm text-cream mb-4" style={{ fontFamily: "var(--font-display)" }}>関連記事</h2>
            <div className="space-y-2">
              {relatedArticles.map((related: { slug: string; title: string }) => (
                <a key={related.slug} href={`/article/${related.slug}`} className="block bg-navy-light border border-border-subtle rounded-lg p-4 card-glow">
                  <span className="text-sm text-text-secondary hover:text-gold transition-colors">{related.title}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
