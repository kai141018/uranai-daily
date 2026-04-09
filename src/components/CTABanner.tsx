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
        className="block bg-navy-surface border border-gold/20 text-center py-3.5 px-5 rounded-lg hover:border-gold/40 hover:bg-gold/5 transition-all my-6 group"
      >
        <span className="text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
          {cta.compactLabel}
        </span>
      </a>
    )
  }

  const descriptions: Record<CTAType, { sub: string; heading: string; body: string }> = {
    money: {
      sub: "金運専門の鑑定士",
      heading: "あなたの金運、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの金運鑑定を\n金運専門の鑑定士が無料でお届けします",
    },
    love: {
      sub: "恋愛専門の鑑定士",
      heading: "あなたの恋愛運、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの恋愛鑑定を\n恋愛専門の鑑定士が無料でお届けします",
    },
    general: {
      sub: "プロの鑑定士",
      heading: "あなたの運勢、無料で鑑定します",
      body: "生年月日から導き出す、あなただけの鑑定結果を\n経験豊富な専門鑑定士が無料でお届けします",
    },
  }

  const desc = descriptions[context]

  return (
    <section className="relative my-10 rounded-xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-mid via-navy-surface to-navy-mid" />
      <div className="absolute inset-0 bg-stars opacity-60" />
      <div className="absolute inset-0 border border-gold/15 rounded-xl" />

      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/30" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/30" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold/30" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/30" />

      <div className="relative px-6 py-10 md:py-12 text-center">
        <p className="text-xs tracking-[0.3em] text-gold-dim uppercase mb-3">{desc.sub}</p>
        <h3
          className="text-xl md:text-2xl text-cream mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {desc.heading}
        </h3>
        <div className="gold-line max-w-[120px] mx-auto mb-4" />
        <p className="text-text-secondary text-sm mb-7 leading-relaxed whitespace-pre-line">
          {desc.body}
        </p>
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-gold text-gold hover:bg-gold hover:text-navy font-medium py-3 px-10 rounded transition-all text-sm tracking-wide"
        >
          {cta.label}
        </a>
        <p className="text-text-dim text-xs mt-4">※ 30秒で登録完了。いつでもブロックOK</p>
      </div>
    </section>
  )
}
