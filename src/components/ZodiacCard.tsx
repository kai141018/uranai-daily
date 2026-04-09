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
      className="block bg-white rounded-xl border border-border p-4 hover:border-primary-light hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-3">
        {rank && (
          <span
            className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
              rank === 1
                ? "bg-gold-light text-gold"
                : rank === 2
                  ? "bg-gray-200 text-gray-500"
                  : rank === 3
                    ? "bg-orange-100 text-orange-500"
                    : "bg-gray-100 text-text-light"
            }`}
          >
            {rank}
          </span>
        )}
        <span className="text-2xl">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-text-dark group-hover:text-primary transition-colors">
              {name}
            </span>
            <span className="text-xs text-text-light">{period}</span>
          </div>
          {stars !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xs ${i < stars ? "text-gold" : "text-gray-200"}`}>
                  ★
                </span>
              ))}
            </div>
          )}
          {summary && (
            <p className="text-xs text-text-light mt-1 truncate">{summary}</p>
          )}
        </div>
        <svg
          className="w-4 h-4 text-text-light group-hover:text-primary transition-colors flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
