import Link from "next/link"
import { ZODIAC_SIGNS, CATEGORIES } from "@/lib/constants"
import ZodiacCard from "@/components/ZodiacCard"
import CTABanner from "@/components/CTABanner"

// TODO: Supabaseから取得するように変更
const SAMPLE_ARTICLES = [
  {
    slug: "numerology-guide-2026",
    title: "数秘術とは？初心者でもわかる完全ガイド【2026年最新】",
    description: "数秘術の基本的な考え方から計算方法、ライフパスナンバーの意味まで初心者向けに解説します。",
    category: "数秘術",
    categorySlug: "numerology",
    publishedAt: "2026-04-09",
  },
  {
    slug: "money-luck-powerstone",
    title: "金運アップに効くパワーストーン7選｜選び方と浄化方法",
    description: "金運を上げたい方におすすめのパワーストーンを厳選。正しい選び方と浄化方法を紹介します。",
    category: "パワーストーン",
    categorySlug: "powerstone",
    publishedAt: "2026-04-09",
  },
  {
    slug: "birthday-fortune-april",
    title: "4月生まれの性格と運勢｜誕生日占いで分かるあなたの本質",
    description: "4月生まれの人に共通する性格の特徴と2026年の運勢を誕生日占いの観点から解説します。",
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
      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 text-center">
          <p className="text-purple-200 text-sm mb-2">{today}</p>
          <h1 className="text-3xl md:text-4xl font-black mb-4">今日の運勢をチェック</h1>
          <p className="text-purple-200 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            12星座の今日の運勢を毎朝更新。あなたの星座をタップして、今日一日のヒントを受け取りましょう。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* 12星座一覧 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-dark">12星座の今日の運勢</h2>
            <Link href="/horoscope" className="text-sm text-primary hover:underline">
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

        {/* CTA */}
        <CTABanner />

        {/* 最新記事 */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-dark">最新の占い記事</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-xl border border-border p-5 hover:border-primary-light hover:shadow-md transition-all group"
              >
                <Link href={`/article/${article.slug}`} className="block">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-surface px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <time className="text-xs text-text-light">{article.publishedAt}</time>
                  </div>
                  <h3 className="font-bold text-text-dark group-hover:text-primary transition-colors leading-snug mb-2 text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs text-text-light leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* カテゴリ一覧 */}
        <section className="py-8">
          <h2 className="text-lg font-bold text-text-dark mb-4">カテゴリから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white rounded-xl border border-border p-4 hover:border-primary-light hover:shadow-md transition-all text-center group"
              >
                <h3 className="font-bold text-text-dark group-hover:text-primary transition-colors text-sm">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-light mt-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
