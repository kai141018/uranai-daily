import Link from "next/link"

type Props = {
  id: string
  name: string
  emoji: string
  period: string
  rank?: number
  stars?: number
  summary?: string
}

export default function ZodiacCard({ id, name, emoji, period, rank, stars, summary }: Props) {
  return (
    <Link
      href={`/horoscope/${id}`}
      className="block bg-navy-light border border-border-subtle rounded-lg p-4 card-glow group relative overflow-hidden"
    >
      {/* Subtle corner decoration */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gold" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gold" />
      </div>

      <div className="flex items-center gap-3">
        {rank && (
          <span
            className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full border ${
              rank === 1
                ? "border-gold text-gold bg-gold/10"
                : rank === 2
                  ? "border-cream-dark/30 text-cream-dark bg-cream-dark/5"
                  : rank === 3
                    ? "border-rose/30 text-rose bg-rose/5"
                    : "border-border-subtle text-text-dim"
            }`}
          >
            {rank}
          </span>
        )}
        <span className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span
              className="font-medium text-cream group-hover:text-gold transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </span>
            <span className="text-xs text-text-dim">{period}</span>
          </div>
          {stars !== undefined && (
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-[10px] ${i < stars ? "text-gold" : "text-border-subtle"}`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
          {summary && (
            <p className="text-xs text-text-dim mt-1.5 truncate leading-relaxed">{summary}</p>
          )}
        </div>
        <svg
          className="w-4 h-4 text-text-dim group-hover:text-gold transition-colors flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
