import { LINE_URL } from "@/lib/constants"

export default function CTABanner({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-primary to-primary-dark text-white text-center py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        <span className="text-sm font-bold">無料鑑定を受けてみる →</span>
      </a>
    )
  }

  return (
    <section className="bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white rounded-2xl p-6 md:p-8 my-8">
      <div className="text-center">
        <p className="text-accent-light text-sm font-medium mb-2">LINE登録で</p>
        <h3 className="text-xl md:text-2xl font-bold mb-3">
          あなただけの無料鑑定をプレゼント
        </h3>
        <p className="text-purple-200 text-sm mb-5 leading-relaxed">
          生年月日から導き出す、あなたの本質と今後の運勢を<br className="hidden md:block" />
          宇宙巫女さくらが無料でお届けします
        </p>
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors text-sm"
        >
          LINEで無料鑑定を受ける
        </a>
        <p className="text-purple-300 text-xs mt-3">※ 30秒で登録完了。いつでもブロックOK</p>
      </div>
    </section>
  )
}
