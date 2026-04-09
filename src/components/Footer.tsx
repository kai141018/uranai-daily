import Link from "next/link"
import { SITE_NAME, CATEGORIES } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-12">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔮</span>
              <span className="font-bold text-primary">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-text-light leading-relaxed">
              毎日の占いで運勢をチェック。12星座の今日の運勢を毎朝更新しています。
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-text-dark mb-3">カテゴリ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/horoscope" className="text-sm text-text-light hover:text-primary transition-colors">
                  今日の運勢
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-text-light hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-text-dark mb-3">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-text-light hover:text-primary transition-colors">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-light hover:text-primary transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-light">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
