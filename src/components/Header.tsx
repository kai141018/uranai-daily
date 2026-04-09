"use client"

import Link from "next/link"
import { useState } from "react"
import { SITE_NAME, CATEGORIES } from "@/lib/constants"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border-subtle bg-navy/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-gold text-xl" style={{ fontFamily: "var(--font-display)" }}>✦</span>
            <span
              className="text-lg tracking-wide text-cream group-hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="/horoscope"
              className="text-text-primary hover:text-gold transition-colors font-medium tracking-wide"
            >
              今日の運勢
            </Link>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-text-secondary hover:text-gold transition-colors tracking-wide"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-gold transition-colors"
            aria-label="メニュー"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border-subtle">
            <Link
              href="/horoscope"
              className="block py-3 text-text-primary font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              今日の運勢
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-3 text-text-secondary hover:text-gold transition-colors"
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
