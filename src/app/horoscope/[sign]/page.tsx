import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ZODIAC_SIGNS, SITE_URL } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

type Props = {
  params: Promise<{ sign: string }>
}

export async function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({ sign: sign.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sign: signId } = await params
  const sign = ZODIAC_SIGNS.find((s) => s.id === signId)
  if (!sign) return {}

  const title = `${sign.name}の今日の運勢｜${sign.period}`
  const description = `${sign.name}（${sign.period}）の今日の運勢を毎日更新。総合運・金運・恋愛運・仕事運・健康運をチェック。ラッキーカラーやラッキーアイテムも。`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/horoscope/${signId}`,
    },
  }
}

// TODO: Supabaseから取得
function getSignFortune(signId: string) {
  return {
    overall: 4,
    money: 5,
    love: 3,
    work: 4,
    health: 4,
    luckyColor: "パープル",
    luckyNumber: 7,
    luckyItem: "アメジスト",
    advice:
      "今日は直感が冴えわたる一日です。ふと思いついたアイデアを大切にしてください。午後からは金運も上昇傾向にあるので、気になっていた投資の情報をチェックしてみるのも良いでしょう。",
    detail:
      "朝のうちに重要な決断をすると良い結果に繋がりやすい日です。人間関係では、普段あまり話さない人との会話から思わぬ発見があるかもしれません。夕方以降はゆっくりと自分の時間を過ごすことで、明日へのエネルギーを充電できます。パワーストーンのアメジストを身につけると、直感力がさらにアップします。",
  }
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm font-medium text-text-dark">{label}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < count ? "text-gold" : "text-gray-200"}`}>
            ★
          </span>
        ))}
      </div>
    </div>
  )
}

export default async function SignPage({ params }: Props) {
  const { sign: signId } = await params
  const sign = ZODIAC_SIGNS.find((s) => s.id === signId)
  if (!sign) notFound()

  const fortune = getSignFortune(signId)
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Breadcrumb
        items={[
          { name: "今日の運勢", href: "/horoscope" },
          { name: sign.name, href: `/horoscope/${sign.id}` },
        ]}
      />

      <article className="py-4">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{sign.emoji}</span>
            <div>
              <h1 className="text-2xl font-black text-text-dark">
                {sign.name}の今日の運勢
              </h1>
              <p className="text-sm text-text-light">
                {sign.period}｜{today}
              </p>
            </div>
          </div>
        </header>

        {/* 運勢スコア */}
        <section className="bg-white rounded-xl border border-border p-5 mb-6">
          <h2 className="text-sm font-bold text-text-dark mb-2">運勢スコア</h2>
          <Stars count={fortune.overall} label="総合運" />
          <Stars count={fortune.money} label="金運" />
          <Stars count={fortune.love} label="恋愛運" />
          <Stars count={fortune.work} label="仕事運" />
          <Stars count={fortune.health} label="健康運" />
        </section>

        {/* ラッキーアイテム */}
        <section className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-xs text-text-light mb-1">ラッキーカラー</p>
            <p className="font-bold text-sm text-text-dark">{fortune.luckyColor}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-xs text-text-light mb-1">ラッキーナンバー</p>
            <p className="font-bold text-sm text-text-dark">{fortune.luckyNumber}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-xs text-text-light mb-1">ラッキーアイテム</p>
            <p className="font-bold text-sm text-text-dark">{fortune.luckyItem}</p>
          </div>
        </section>

        {/* 今日のアドバイス */}
        <section className="bg-white rounded-xl border border-border p-5 mb-6">
          <h2 className="text-sm font-bold text-text-dark mb-3">今日のアドバイス</h2>
          <p className="text-sm text-text leading-relaxed">{fortune.advice}</p>
        </section>

        {/* 詳細 */}
        <section className="bg-white rounded-xl border border-border p-5 mb-6">
          <h2 className="text-sm font-bold text-text-dark mb-3">詳しい運勢</h2>
          <p className="text-sm text-text leading-relaxed">{fortune.detail}</p>
        </section>

        <CTABanner />

        {/* 他の星座 */}
        <section className="py-8">
          <h2 className="text-sm font-bold text-text-dark mb-3">他の星座の運勢</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {ZODIAC_SIGNS.filter((s) => s.id !== sign.id).map((s) => (
              <a
                key={s.id}
                href={`/horoscope/${s.id}`}
                className="text-center py-2 px-1 rounded-lg border border-border hover:border-primary-light hover:bg-surface transition-all text-xs"
              >
                <span className="text-lg block">{s.emoji}</span>
                <span className="text-text-light">{s.name}</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
