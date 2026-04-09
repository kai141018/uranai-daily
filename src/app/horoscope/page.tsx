import type { Metadata } from "next"
import { ZODIAC_SIGNS } from "@/lib/constants"
import { getTodayFortunes } from "@/lib/supabase"
import ZodiacCard from "@/components/ZodiacCard"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "今日の運勢ランキング｜12星座の運勢を毎日更新",
  description: "12星座の今日の運勢ランキングを毎朝更新。総合運・金運・恋愛運・仕事運をチェック。",
}

export default async function HoroscopePage() {
  const fortunes = await getTodayFortunes()

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  })

  // DBに運勢がある場合はDBから、なければ星座リストだけ表示
  const zodiacWithFortune = ZODIAC_SIGNS.map((sign) => {
    const fortune = fortunes?.find((f: { sign: string }) => f.sign === sign.id)
    return {
      ...sign,
      rank: fortune?.ranking,
      stars: fortune?.overall_score,
      summary: fortune?.advice,
    }
  })

  // ランキング順にソート（DB運勢がある場合）
  const sorted = fortunes
    ? [...zodiacWithFortune].sort((a, b) => (a.rank || 99) - (b.rank || 99))
    : zodiacWithFortune

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Breadcrumb items={[{ name: "今日の運勢", href: "/horoscope" }]} />

      <section className="py-4">
        <h1 className="text-2xl text-cream mb-1" style={{ fontFamily: "var(--font-display)" }}>
          今日の運勢ランキング
        </h1>
        <p className="text-xs text-text-dim mb-8 tracking-wide">{today}</p>

        {fortunes && (
          <div className="mb-8">
            <h2 className="text-xs tracking-[0.2em] text-gold-dim uppercase mb-4">本日のTOP3</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sorted.slice(0, 3).map((s) => (
                <ZodiacCard key={s.id} id={s.id} name={s.name} emoji={s.emoji} period={s.period} rank={s.rank} stars={s.stars} summary={s.summary} />
              ))}
            </div>
          </div>
        )}

        <div className="gold-line mb-8" />

        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(fortunes ? sorted.slice(3) : sorted).map((s) => (
              <ZodiacCard key={s.id} id={s.id} name={s.name} emoji={s.emoji} period={s.period} rank={s.rank} stars={s.stars} summary={s.summary} />
            ))}
          </div>
        </div>

        <CTABanner />
      </section>
    </div>
  )
}
