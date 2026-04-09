import Link from "next/link"
import { ZODIAC_SIGNS, CATEGORIES } from "@/lib/constants"
import ZodiacCard from "@/components/ZodiacCard"
import CTABanner from "@/components/CTABanner"

const SAMPLE_ARTICLES = [
  {
    slug: "numerology-guide-2026",
    title: "数秘術とは？初心者でもわかる完全ガイド【2026年最新】",
    description: "数秘術の基本から計算方法、ライフパスナンバーの意味まで初心者向けに解説します。",
    category: "数秘術",
    categorySlug: "numerology",
    publishedAt: "2026-04-09",
  },
  {
    slug: "money-luck-powerstone",
    title: "金運アップに効くパワーストーン7選｜選び方と浄化方法",
    description: "金運を上げたい方におすすめのパワーストーンを厳選。正しい選び方と浄化方法を紹介。",
    category: "パワーストーン",
    categorySlug: "powerstone",
    publishedAt: "2026-04-09",
  },
  {
    slug: "birthday-fortune-april",
    title: "4月生まれの性格と運勢｜誕生日占いで分かるあなたの本質",
    description: "4月生まれに共通する性格と2026年の運勢を誕生日占いの観点から解説します。",
    category: "誕生日占い",
    categorySlug: "birthday",
    publishedAt: "2026-04-09",
  },
]

export default function Home() {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 bg-stars" />

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-text-dim text-xs tracking-[0.3em] uppercase mb-4 animate-fade-up">
            {today}
          </p>
          <h1
            className="text-3xl md:text-5xl text-cream mb-5 leading-tight animate-fade-up animate-delay-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            今日の運勢を<br className="md:hidden" />チェック
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
            <h2
              className="text-lg text-cream"
              style={{ fontFamily: "var(--font-display)" }}
            >
              12星座の今日の運勢
            </h2>
            <Link href="/horoscope" className="text-xs text-gold-dim hover:text-gold transition-colors tracking-wide">
              ランキングを見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ZODIAC_SIGNS.map((sign) => (
              <ZodiacCard
                key={sign.id}
                id={sign.id}
                name={sign.name}
                emoji={sign.emoji}
                period={sign.period}
              />
            ))}
          </div>
        </section>

        <div className="gold-line" />

        {/* CTA */}
        <CTABanner />

        <div className="gold-line" />

        {/* 最新記事 */}
        <section className="py-10">
          <h2
            className="text-lg text-cream mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            最新の占い記事
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="bg-navy-light border border-border-subtle rounded-lg p-5 card-glow group"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] tracking-wider text-gold-dim border border-gold/20 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <time className="text-[10px] text-text-dim">{article.publishedAt}</time>
                  </div>
                  <h3
                    className="text-cream group-hover:text-gold transition-colors leading-snug mb-2 text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-text-dim leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <div className="gold-line" />

        {/* カテゴリ一覧 */}
        <section className="py-10">
          <h2
            className="text-lg text-cream mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            カテゴリから探す
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-navy-light border border-border-subtle rounded-lg p-5 card-glow text-center group"
              >
                <h3
                  className="text-cream group-hover:text-gold transition-colors text-sm mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cat.name}
                </h3>
                <p className="text-[11px] text-text-dim">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
