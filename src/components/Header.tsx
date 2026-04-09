"use client"

import Link from "next/link"
import { useState } from "react"
import { SITE_NAME, CATEGORIES } from "@/lib/constants"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            <span className="text-lg font-bold text-primary">{SITE_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/horoscope" className="text-text hover:text-primary transition-colors font-medium">
              今日の運勢
            </Link>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-text-light hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text"
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-3 border-t border-border">
            <Link
              href="/horoscope"
              className="block py-2 text-text font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              今日の運勢
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-2 text-text-light hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
