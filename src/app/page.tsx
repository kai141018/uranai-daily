import Link from "next/link"
import Image from "next/image"
import { ZODIAC_SIGNS, CATEGORIES, IMAGES } from "@/lib/constants"
import { getTodayFortunes, getPublishedArticles } from "@/lib/supabase"
import ZodiacCard from "@/components/ZodiacCard"
import CTABanner from "@/components/CTABanner"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [fortunes, articles] = await Promise.all([
    getTodayFortunes(),
    getPublishedArticles(6),
  ])

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  })

  return (
    <>
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <p className="text-text-dim text-xs tracking-[0.3em] uppercase mb-4 animate-fade-up">{today}</p>
          <h1
            className="text-3xl md:text-5xl text-cream mb-5 leading-tight animate-fade-up animate-delay-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            今日の運勢をチェック
          </h1>
          <div className="gold-line max-w-[80px] mx-auto mb-5 animate-fade-up animate-delay-2" />
          <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed animate-fade-up animate-delay-3">
            12星座の今日の運勢を毎朝更新。<br />
            あなたの星座をタップして、今日一日のヒントを受け取りましょう。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* 12星座一覧 */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-cream" style={{ fontFamily: "var(--font-display)" }}>
              12星座の今日の運勢
            </h2>
            <Link href="/horoscope" className="text-xs text-gold-dim hover:text-gold transition-colors tracking-wide">
              ランキングを見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ZODIAC_SIGNS.map((sign) => {
              const fortune = fortunes?.find((f: { sign: string }) => f.sign === sign.id)
              return (
                <ZodiacCard
                  key={sign.id}
                  id={sign.id}
                  name={sign.name}
                  emoji={sign.emoji}
                  period={sign.period}
                  rank={fortune?.ranking}
                  stars={fortune?.overall_score}
                  summary={fortune?.advice}
                />
              )
            })}
          </div>
        </section>

        <div className="gold-line" />
        <CTABanner />
        <div className="gold-line" />

        {/* 最新記事 */}
        {articles.length > 0 && (
          <section className="py-10">
            <h2 className="text-lg text-cream mb-6" style={{ fontFamily: "var(--font-display)" }}>
              最新の占い記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articles.slice(0, 3).map((article: { slug: string; title: string; meta_description: string; category: string; featured_image?: string; published_at: string }) => (
                <article
                  key={article.slug}
                  className="bg-navy-light border border-border-subtle rounded-lg overflow-hidden card-glow group"
                >
                  <Link href={`/article/${article.slug}`} className="block">
                    {article.featured_image && (
                      <div className="relative w-full aspect-video">
                        <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] tracking-wider text-gold-dim border border-gold/20 px-2 py-0.5 rounded">
                          {article.category || "占い"}
                        </span>
                        <time className="text-[10px] text-text-dim">
                          {new Date(article.published_at).toLocaleDateString("ja-JP")}
                        </time>
                      </div>
                      <h3
                        className="text-cream group-hover:text-gold transition-colors leading-snug text-sm"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-xs text-text-dim leading-relaxed line-clamp-2 mt-2">
                        {article.meta_description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="gold-line" />

        {/* カテゴリ一覧 */}
        <section className="py-10">
          <h2 className="text-lg text-cream mb-6" style={{ fontFamily: "var(--font-display)" }}>
            カテゴリから探す
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="relative rounded-lg overflow-hidden card-glow group h-32"
              >
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors" />
                <div className="absolute inset-0 border border-border-subtle rounded-lg group-hover:border-gold/30 transition-colors" />
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-cream group-hover:text-gold transition-colors text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-text-dim mt-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
