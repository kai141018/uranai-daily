import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ZODIAC_SIGNS, SITE_URL, IMAGES } from "@/lib/constants"
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

  return {
    title: `${sign.name}の今日の運勢｜${sign.period}`,
    description: `${sign.name}（${sign.period}）の今日の運勢を毎日更新。総合運・金運・恋愛運・仕事運・健康運をチェック。`,
    alternates: { canonical: `${SITE_URL}/horoscope/${signId}` },
  }
}

function getSignFortune(_signId: string) {
  return {
    overall: 4, money: 5, love: 3, work: 4, health: 4,
    luckyColor: "パープル", luckyNumber: 7, luckyItem: "アメジスト",
    advice: "今日は直感が冴えわたる一日です。ふと思いついたアイデアを大切にしてください。午後からは金運も上昇傾向にあるので、気になっていた投資の情報をチェックしてみるのも良いでしょう。",
    detail: "朝のうちに重要な決断をすると良い結果に繋がりやすい日です。人間関係では、普段あまり話さない人との会話から思わぬ発見があるかもしれません。夕方以降はゆっくりと自分の時間を過ごすことで、明日へのエネルギーを充電できます。パワーストーンのアメジストを身につけると、直感力がさらにアップします。",
  }
}

function StarBar({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-subtle last:border-b-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-xs ${i < count ? "text-gold" : "text-border-subtle"}`}>★</span>
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
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Breadcrumb
        items={[
          { name: "今日の運勢", href: "/horoscope" },
          { name: sign.name, href: `/horoscope/${sign.id}` },
        ]}
      />

      <article className="py-4">
        {/* ヘッダー画像 */}
        <div className="relative h-40 rounded-lg overflow-hidden mb-6">
          <Image src={IMAGES.stars} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-90">{sign.emoji}</span>
          </div>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl opacity-80">{sign.emoji}</span>
            <div>
              <h1
                className="text-2xl text-cream"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {sign.name}の今日の運勢
              </h1>
              <p className="text-xs text-text-dim mt-1">{sign.period}｜{today}</p>
            </div>
          </div>
          <div className="gold-line" />
        </header>

        {/* 運勢スコア */}
        <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
          <h2
            className="text-sm text-cream mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            運勢スコア
          </h2>
          <StarBar count={fortune.overall} label="総合運" />
          <StarBar count={fortune.money} label="金運" />
          <StarBar count={fortune.love} label="恋愛運" />
          <StarBar count={fortune.work} label="仕事運" />
          <StarBar count={fortune.health} label="健康運" />
        </section>

        {/* ラッキーアイテム */}
        <section className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "ラッキーカラー", value: fortune.luckyColor },
            { label: "ラッキーナンバー", value: fortune.luckyNumber },
            { label: "ラッキーアイテム", value: fortune.luckyItem },
          ].map((item) => (
            <div key={item.label} className="bg-navy-light border border-border-subtle rounded-lg p-4 text-center">
              <p className="text-[10px] text-text-dim mb-1 tracking-wider">{item.label}</p>
              <p className="text-sm font-medium text-gold-light">{item.value}</p>
            </div>
          ))}
        </section>

        {/* アドバイス */}
        <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
          <h2
            className="text-sm text-cream mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            今日のアドバイス
          </h2>
          <p className="text-sm text-text-primary leading-[1.9]">{fortune.advice}</p>
        </section>

        {/* 詳細 */}
        <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
          <h2
            className="text-sm text-cream mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            詳しい運勢
          </h2>
          <p className="text-sm text-text-primary leading-[1.9]">{fortune.detail}</p>
        </section>

        <CTABanner />

        {/* 他の星座 */}
        <section className="py-8">
          <h2
            className="text-sm text-cream mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            他の星座の運勢
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ZODIAC_SIGNS.filter((s) => s.id !== sign.id).map((s) => (
              <a
                key={s.id}
                href={`/horoscope/${s.id}`}
                className="text-center py-3 px-1 rounded-lg border border-border-subtle hover:border-gold/30 hover:bg-navy-surface transition-all"
              >
                <span className="text-xl block mb-1 opacity-70">{s.emoji}</span>
                <span className="text-[10px] text-text-dim">{s.name}</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
