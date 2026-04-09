import Link from "next/link"
import { SITE_NAME, CATEGORIES } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-gold" style={{ fontFamily: "var(--font-display)" }}>✦</span>
              <span
                className="text-cream tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-text-dim leading-relaxed">
              毎日の占いで運勢をチェック。<br />
              12星座の今日の運勢を毎朝更新しています。
            </p>
          </div>

          <div>
            <h3
              className="text-xs tracking-[0.2em] text-gold-dim uppercase mb-4"
            >
              カテゴリ
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/horoscope" className="text-sm text-text-secondary hover:text-gold transition-colors">
                  今日の運勢
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-text-secondary hover:text-gold transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] text-gold-dim uppercase mb-4">
              サイト情報
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-gold transition-colors">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-secondary hover:text-gold transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line mt-10 mb-6" />
        <p className="text-center text-xs text-text-dim tracking-wider">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  )
}
