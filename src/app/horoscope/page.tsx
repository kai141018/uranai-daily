import type { Metadata } from "next"
import { ZODIAC_SIGNS } from "@/lib/constants"
import ZodiacCard from "@/components/ZodiacCard"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

export const metadata: Metadata = {
  title: "今日の運勢ランキング｜12星座の運勢を毎日更新",
  description:
    "12星座の今日の運勢ランキングを毎朝更新。総合運・金運・恋愛運・仕事運をチェックして、今日一日を最高の一日にしましょう。",
}

function getTodayFortune() {
  return ZODIAC_SIGNS.map((sign, i) => ({
    ...sign,
    rank: i + 1,
    stars: 5 - Math.floor(i / 3),
    summary: "今日は新しいことに挑戦するのに最適な日です。直感を信じて行動しましょう。",
  }))
}

export default function HoroscopePage() {
  const fortunes = getTodayFortune()
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  })

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Breadcrumb items={[{ name: "今日の運勢", href: "/horoscope" }]} />

      <section className="py-4">
        <h1
          className="text-2xl text-cream mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          今日の運勢ランキング
        </h1>
        <p className="text-xs text-text-dim mb-8 tracking-wide">{today}</p>

        {/* TOP3 */}
        <div className="mb-8">
          <h2 className="text-xs tracking-[0.2em] text-gold-dim uppercase mb-4">本日のTOP3</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {fortunes.slice(0, 3).map((fortune) => (
              <ZodiacCard
                key={fortune.id}
                id={fortune.id}
                name={fortune.name}
                emoji={fortune.emoji}
                period={fortune.period}
                rank={fortune.rank}
                stars={fortune.stars}
                summary={fortune.summary}
              />
            ))}
          </div>
        </div>

        <div className="gold-line mb-8" />

        {/* 4位以降 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fortunes.slice(3).map((fortune) => (
              <ZodiacCard
                key={fortune.id}
                id={fortune.id}
                name={fortune.name}
                emoji={fortune.emoji}
                period={fortune.period}
                rank={fortune.rank}
                stars={fortune.stars}
                summary={fortune.summary}
              />
            ))}
          </div>
        </div>

        <CTABanner />
      </section>
    </div>
  )
}
