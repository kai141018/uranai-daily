import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "このサイトについて",
  description: `${SITE_NAME}は、12星座の今日の運勢・数秘術・金運占い・パワーストーン情報を毎日更新する無料占いメディアです。`,
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "このサイトについて", href: "/about" }]} />

      <h1
        className="text-2xl md:text-3xl text-cream mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        このサイトについて
      </h1>

      <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
        <p>
          {SITE_NAME}は、毎日の運勢や占いの知識をお届けする無料の占い情報メディアです。
          12星座の今日の運勢を毎朝更新しているほか、数秘術・金運占い・パワーストーン・恋愛占いなど、
          幅広いジャンルの占い記事を掲載しています。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          運営について
        </h2>
        <p>
          運営: 占いデイリー編集部<br />
          お問い合わせ: サイト内のLINEからお気軽にご連絡ください。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          免責事項
        </h2>
        <p>
          当サイトに掲載されている占い結果やアドバイスは、あくまでエンターテインメントとしてお楽しみください。
          占いの結果に基づく行動や判断は、ご自身の責任においてお願いいたします。
          当サイトの情報によって生じたいかなる損害についても、当サイトは責任を負いかねます。
        </p>
      </div>
    </div>
  )
}
