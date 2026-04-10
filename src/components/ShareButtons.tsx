"use client"

type Props = {
  sign: string
  rank?: number
  score: number
  url: string
}

export default function ShareButtons({ sign, rank, score, url }: Props) {
  const stars = "★".repeat(score) + "☆".repeat(5 - score)
  const rankText = rank ? `${rank}位` : ""
  const text = `${sign}の今日の運勢 ${rankText} ${stars}\n占いデイリーでチェック👇`

  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex items-center justify-center gap-3 py-6 mb-2">
      <span className="text-xs text-text-dim mr-2">この結果をシェア</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle hover:border-gold/40 hover:bg-gold/5 transition-all"
        aria-label="Xでシェア"
      >
        <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.threads.net/intent/post?text=${encodedText}%0A${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle hover:border-gold/40 hover:bg-gold/5 transition-all"
        aria-label="Threadsでシェア"
      >
        <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.136 1.37-2.747.848-.54 1.999-.836 3.333-.858.98-.016 1.872.09 2.68.286.046-.607.036-1.182-.033-1.71-.183-1.397-.752-2.1-1.696-2.1-.674 0-1.209.253-1.59.752-.348.458-.556 1.108-.617 1.93l-2.006-.132c.091-1.168.43-2.134 1.009-2.87.73-.93 1.825-1.422 3.164-1.422 1.555 0 2.698.665 3.396 1.977.466.878.66 2.005.575 3.356l.007.124c.012.092.017.186.017.28 0 .084-.005.167-.014.25 1.096.498 1.98 1.287 2.548 2.302.876 1.564.95 4.156-1.098 6.166-1.768 1.736-4.015 2.487-7.085 2.508zM11.295 15.81c-.702.04-1.397.142-1.882.44-.39.24-.574.572-.548.988.04.67.455 1.178 1.174 1.435.566.204 1.22.28 1.862.246 1.11-.06 1.967-.44 2.546-1.128.417-.496.704-1.14.87-1.942-.69-.167-1.44-.264-2.238-.264-.614 0-1.209.06-1.784.225z" />
        </svg>
      </a>
      <a
        href={`https://www.instagram.com/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle hover:border-[#E4405F]/40 hover:bg-[#E4405F]/5 transition-all"
        aria-label="Instagramでシェア"
      >
        <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle hover:border-[#06C755]/40 hover:bg-[#06C755]/5 transition-all"
        aria-label="LINEでシェア"
      >
        <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      </a>
      <button
        onClick={() => {
          const shareText = `${text}\n${url}`
          if (navigator.share) {
            navigator.share({ title: `${sign}の今日の運勢`, text: shareText, url })
          } else {
            navigator.clipboard.writeText(shareText)
            alert("コピーしました！")
          }
        }}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle hover:border-gold/40 hover:bg-gold/5 transition-all"
        aria-label="シェア"
      >
        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </div>
  )
}
