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

// TODO: Supabaseから今日の運勢データを取得
function getTodayFortune() {
  // ダミーデータ（ヨルノズクが毎朝更新するデータに差し替え）
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
        <h1 className="text-2xl font-black text-text-dark mb-1">今日の運勢ランキング</h1>
        <p className="text-sm text-text-light mb-6">{today}の12星座運勢ランキング</p>

        {/* TOP3 */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gold mb-3">本日のTOP3</h2>
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
