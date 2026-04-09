import { CTA_CONFIG, type CTAType } from "@/lib/constants"

type Props = {
  variant?: "default" | "compact"
  context?: CTAType
}

export default function CTABanner({ variant = "default", context = "general" }: Props) {
  const cta = CTA_CONFIG[context]

  if (variant === "compact") {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block bg-gradient-to-r ${cta.gradient} text-white text-center py-3 px-4 rounded-lg hover:opacity-90 transition-opacity my-4`}
      >
        <span className="text-sm font-bold">{cta.compactLabel}</span>
      </a>
    )
  }

  const descriptions: Record<CTAType, { sub: string; heading: string; body: string }> = {
    money: {
      sub: "金運専門の鑑定士に直接相談",
      heading: "あなたの金運、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの金運鑑定を\n金運専門の鑑定士が無料でお届けします",
    },
    love: {
      sub: "恋愛専門の鑑定士に直接相談",
      heading: "あなたの恋愛運、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの恋愛鑑定を\n恋愛専門の鑑定士が無料でお届けします",
    },
    general: {
      sub: "プロの占い師に直接相談",
      heading: "あなたの運勢、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの鑑定結果を\n経験豊富な専門鑑定士が無料でお届けします",
    },
  }

  const desc = descriptions[context]

  return (
    <section className="bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white rounded-2xl p-6 md:p-8 my-8">
      <div className="text-center">
        <p className="text-accent-light text-sm font-medium mb-2">{desc.sub}</p>
        <h3 className="text-xl md:text-2xl font-bold mb-3">{desc.heading}</h3>
        <p className="text-purple-200 text-sm mb-6 leading-relaxed whitespace-pre-line">{desc.body}</p>
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block bg-gradient-to-r ${cta.gradient} hover:opacity-90 text-white font-bold py-3 px-8 rounded-full transition-opacity text-sm`}
        >
          {cta.label}
        </a>
        <p className="text-purple-300 text-xs mt-4">※ 30秒で登録完了。いつでもブロックOK</p>
      </div>
    </section>
  )
}
