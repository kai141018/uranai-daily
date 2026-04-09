import { LINE_URL_MONEY, LINE_URL_LOVE } from "@/lib/constants"

export default function CTABanner({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-2 my-4">
        <a
          href={LINE_URL_MONEY}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-gold to-yellow-500 text-white text-center py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          <span className="text-sm font-bold">金運のプロに無料相談 →</span>
        </a>
        <a
          href={LINE_URL_LOVE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          <span className="text-sm font-bold">恋愛のプロに無料相談 →</span>
        </a>
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white rounded-2xl p-6 md:p-8 my-8">
      <div className="text-center">
        <p className="text-accent-light text-sm font-medium mb-2">プロの占い師に直接相談</p>
        <h3 className="text-xl md:text-2xl font-bold mb-3">
          あなたの悩み、無料で鑑定します
        </h3>
        <p className="text-purple-200 text-sm mb-6 leading-relaxed">
          生年月日から導き出す、あなただけの鑑定結果を<br className="hidden md:block" />
          経験豊富な専門鑑定士が無料でお届けします
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <a
            href={LINE_URL_MONEY}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-gold to-yellow-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-full transition-opacity text-sm text-center"
          >
            💰 金運を見てもらう
          </a>
          <a
            href={LINE_URL_LOVE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-full transition-opacity text-sm text-center"
          >
            💕 恋愛運を見てもらう
          </a>
        </div>
        <p className="text-purple-300 text-xs mt-4">※ 30秒で登録完了。いつでもブロックOK</p>
      </div>
    </section>
  )
}
