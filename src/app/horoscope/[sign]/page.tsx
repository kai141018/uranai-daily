import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ZODIAC_SIGNS, SITE_URL, IMAGES } from "@/lib/constants"
import { getSignFortune } from "@/lib/supabase"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ sign: string }> }

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

  const fortune = await getSignFortune(signId)
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Breadcrumb items={[{ name: "今日の運勢", href: "/horoscope" }, { name: sign.name, href: `/horoscope/${sign.id}` }]} />

      <article className="py-4">
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
              <h1 className="text-2xl text-cream" style={{ fontFamily: "var(--font-display)" }}>
                {sign.name}の今日の運勢
              </h1>
              <p className="text-xs text-text-dim mt-1">{sign.period}｜{today}</p>
            </div>
          </div>
          <div className="gold-line" />
        </header>

        {fortune ? (
          <>
            <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
              <h2 className="text-sm text-cream mb-2" style={{ fontFamily: "var(--font-display)" }}>運勢スコア</h2>
              <StarBar count={fortune.overall_score} label="総合運" />
              <StarBar count={fortune.money_score} label="金運" />
              <StarBar count={fortune.love_score} label="恋愛運" />
              <StarBar count={fortune.work_score} label="仕事運" />
              <StarBar count={fortune.health_score} label="健康運" />
            </section>

            <section className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "ラッキーカラー", value: fortune.lucky_color },
                { label: "ラッキーナンバー", value: fortune.lucky_number },
                { label: "ラッキーアイテム", value: fortune.lucky_item },
              ].map((item) => (
                <div key={item.label} className="bg-navy-light border border-border-subtle rounded-lg p-4 text-center">
                  <p className="text-[10px] text-text-dim mb-1 tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-gold-light">{item.value}</p>
                </div>
              ))}
            </section>

            <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
              <h2 className="text-sm text-cream mb-3" style={{ fontFamily: "var(--font-display)" }}>今日のアドバイス</h2>
              <p className="text-sm text-text-primary leading-[1.9]">{fortune.advice}</p>
            </section>

            {fortune.detail && (
              <section className="bg-navy-light border border-border-subtle rounded-lg p-5 mb-6">
                <h2 className="text-sm text-cream mb-3" style={{ fontFamily: "var(--font-display)" }}>詳しい運勢</h2>
                <p className="text-sm text-text-primary leading-[1.9]">{fortune.detail}</p>
              </section>
            )}
          </>
        ) : (
          <div className="bg-navy-light border border-border-subtle rounded-lg p-10 text-center mb-6">
            <p className="text-text-dim text-sm">本日の運勢はまだ更新されていません。毎朝5時に更新されます。</p>
          </div>
        )}

        <CTABanner />

        <section className="py-8">
          <h2 className="text-sm text-cream mb-4" style={{ fontFamily: "var(--font-display)" }}>他の星座の運勢</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ZODIAC_SIGNS.filter((s) => s.id !== sign.id).map((s) => (
              <a key={s.id} href={`/horoscope/${s.id}`} className="text-center py-3 px-1 rounded-lg border border-border-subtle hover:border-gold/30 hover:bg-navy-surface transition-all">
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
