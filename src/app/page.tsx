import Link from "next/link"
import Image from "next/image"
import { ZODIAC_SIGNS, CATEGORIES, IMAGES } from "@/lib/constants"
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
    image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=600&h=400&fit=crop",
  },
  {
    slug: "money-luck-powerstone",
    title: "金運アップに効くパワーストーン7選｜選び方と浄化方法",
    description: "金運を上げたい方におすすめのパワーストーンを厳選。正しい選び方と浄化方法を紹介。",
    category: "パワーストーン",
    categorySlug: "powerstone",
    publishedAt: "2026-04-09",
    image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&h=400&fit=crop",
  },
  {
    slug: "birthday-fortune-april",
    title: "4月生まれの性格と運勢｜誕生日占いで分かるあなたの本質",
    description: "4月生まれに共通する性格と2026年の運勢を誕生日占いの観点から解説します。",
    category: "誕生日占い",
    categorySlug: "birthday",
    publishedAt: "2026-04-09",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=400&fit=crop",
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
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <p className="text-text-dim text-xs tracking-[0.3em] uppercase mb-4 animate-fade-up">
            {today}
          </p>
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
                className="bg-navy-light border border-border-subtle rounded-lg overflow-hidden card-glow group"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] tracking-wider text-gold-dim border border-gold/20 bg-navy/70 backdrop-blur-sm px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <time className="text-[10px] text-text-dim">{article.publishedAt}</time>
                    <h3
                      className="text-cream group-hover:text-gold transition-colors leading-snug mt-1 text-sm"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs text-text-dim leading-relaxed line-clamp-2 mt-2">
                      {article.description}
                    </p>
                  </div>
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
                className="relative rounded-lg overflow-hidden card-glow group h-32"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors" />
                <div className="absolute inset-0 border border-border-subtle rounded-lg group-hover:border-gold/30 transition-colors" />
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <h3
                    className="text-cream group-hover:text-gold transition-colors text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
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
