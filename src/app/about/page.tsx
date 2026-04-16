import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SITE_NAME, SITE_URL, LINE_URL_GENERAL } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "運営者情報 | 占い師 長門",
  description:
    "数秘術を専門とする占い師・長門のプロフィール。鑑定歴15年、3,000人以上の運命を視てきた経験をもとに、12星座の今日の運勢を毎日お届けしています。",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "運営者情報 | 占い師 長門",
    description:
      "数秘術専門の占い師・長門。鑑定歴15年、3,000人以上の鑑定実績。甘い言葉は言わない。視えたものをそのまま伝える。",
    type: "profile",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "長門",
  alternateName: "Nagato",
  jobTitle: "占い師・数秘術専門家",
  description:
    "数秘術を専門とする占い師。鑑定歴15年、3,000人以上の運命を鑑定。金運・恋愛・仕事・健康を包括的に視る。",
  knowsAbout: ["数秘術", "占い", "金運鑑定", "恋愛占い", "運勢鑑定"],
  url: `${SITE_URL}/about`,
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
}

const SNS_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nagato_uranai?igsh=c3dtZ2p6aWUxbmti&utm_source=qr",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@nagato_uranai?igshid=NTc4MTIwNjQ2YQ==",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.083.717 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.29 3.276-1.06 1.318-2.634 2.04-4.55 2.09-1.43.037-2.764-.345-3.756-1.074-1.08-.794-1.687-1.936-1.687-3.22 0-2.53 2.09-4.254 5.2-4.29 1.1-.013 2.105.107 2.996.36-.04-.753-.217-1.34-.536-1.772-.477-.648-1.31-.977-2.474-.977h-.053c-.876.01-1.598.266-2.146.762l-1.37-1.543c.88-.781 2.05-1.196 3.476-1.234h.072c1.753 0 3.112.545 3.94 1.578.7.876 1.06 2.044 1.076 3.464.523.262.99.583 1.395.96 1.014.946 1.666 2.252 1.666 3.754 0 .387-.034.78-.104 1.176-.537 3.053-2.742 5.07-6.312 5.762-.717.138-1.484.21-2.285.215zm-1.39-8.506c-1.834.026-3.087.856-3.087 2.17 0 .592.282 1.09.795 1.468.608.447 1.476.663 2.437.637 1.347-.036 2.414-.502 3.163-1.382.458-.538.788-1.264.964-2.152-.95-.378-2.088-.578-3.335-.578-.314 0-.63.012-.937.037z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#youtube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
        <path fill="#0B1120" d="M9.545 15.568V8.432L15.818 12z" />
      </svg>
    ),
  },
]

const EXPERTISE = [
  { label: "数秘術", desc: "生年月日から運命を読み解く", primary: true },
  { label: "金運鑑定", desc: "財運の流れと転機" },
  { label: "恋愛・相性", desc: "二人の運命の交差点" },
  { label: "仕事・転職", desc: "適職とタイミング" },
]

const STATS = [
  { num: "3,000+", label: "鑑定実績" },
  { num: "15年", label: "鑑定歴" },
  { num: "数秘術", label: "専門" },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ name: "運営者情報", href: "/about" }]} />

        {/* プロフィールヘッダー */}
        <div className="text-center mt-6 mb-12 animate-fade-up">
          <div className="w-28 h-28 mx-auto mb-5 rounded-full border-2 border-gold/20 overflow-hidden">
            <Image
              src="/nagato.png"
              alt="占い師 長門"
              width={112}
              height={112}
              className="w-full h-full object-cover object-[53%_30%]"
              priority
            />
          </div>
          <h1
            className="text-3xl text-cream mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            長門
          </h1>
          <p className="text-sm text-gold-dim tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
            運命を視る男
          </p>
          <div className="gold-line w-20 mx-auto mt-5" />
        </div>

        {/* プロフィール文 */}
        <section className="mb-12 animate-fade-up animate-delay-1">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            プロフィール
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              数秘術を専門とする占い師。
              これまでに3,000人以上の運命を鑑定してきました。
            </p>
            <p>
              幼い頃から人の運命の流れが視える体質でした。
              最初はその力が怖かった。
              10代で大切な人を失い、「視えるのに、なぜ救えなかったのか」と自分を責めた時期もあります。
            </p>
            <p>
              20代で占い師として生きることを決めました。
              痛みを知ったからこそ、人の痛みが正確に視えるようになった。
              それが私の原点です。
            </p>
            <p>
              甘い言葉で人を安心させるだけの占いはしません。
              視えたものを、そのまま伝える。
              変えられる運命と、変えられない運命。その見極めが私の仕事です。
            </p>
          </div>
        </section>

        {/* 得意分野 */}
        <section className="mb-12 animate-fade-up animate-delay-2">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            得意分野
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {EXPERTISE.map((item) => (
              <div
                key={item.label}
                className={`py-4 px-4 rounded-lg border ${
                  item.primary
                    ? "border-gold/20 bg-gradient-to-b from-gold/5 to-transparent"
                    : "border-border-subtle bg-navy-light"
                }`}
              >
                <span
                  className={`text-sm font-medium block mb-1 ${
                    item.primary ? "text-gold" : "text-cream"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </span>
                <span className="text-xs text-text-dim">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 実績 */}
        <section className="mb-12 animate-fade-up animate-delay-2">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            実績
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {STATS.map((item) => (
              <div
                key={item.label}
                className="text-center py-5 rounded-lg border border-border-subtle bg-navy-light"
              >
                <span
                  className="text-lg font-semibold text-cream block"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.num}
                </span>
                <span className="text-xs text-text-dim mt-1 block">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* このサイトについて */}
        <section className="mb-12 animate-fade-up animate-delay-3">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            このサイトについて
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              {SITE_NAME}は、数秘術をベースに12星座の今日の運勢を毎日お届けする占いサイトです。
            </p>
            <p>
              世の中には、当たり障りのない占いが溢れています。
              このサイトでは、あなたの運命に対して正直に向き合います。
              良いことも、厳しいことも、そのままお伝えします。
            </p>
            <p>
              毎朝の運勢チェックが、あなたの一日をより良い方向へ導く。
              そのきっかけになれば幸いです。
            </p>
          </div>
        </section>

        {/* 信念 */}
        <section className="mb-12 animate-fade-up animate-delay-3">
          <div className="rounded-xl border border-gold/10 bg-gradient-to-b from-navy-light to-navy py-10 px-8 text-center">
            <p
              className="text-base text-cream leading-loose"
              style={{ fontFamily: "var(--font-display)" }}
            >
              「痛みを知らない人間に、<br />本当の運命は視えない」
            </p>
            <div className="gold-line w-12 mx-auto mt-5 mb-3" />
            <p className="text-xs text-text-dim">長門</p>
          </div>
        </section>

        {/* SNS */}
        <section className="mb-12 animate-fade-up animate-delay-4">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SNS・メディア
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {SNS_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 py-4 rounded-lg border border-border-subtle bg-navy-light text-text-dim hover:text-gold hover:border-gold/30 transition-all"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* LINE + メルマガ */}
        <section className="mb-12 animate-fade-up animate-delay-4">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            お問い合わせ
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-3">
            <a
              href={LINE_URL_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 px-5 rounded-lg bg-[#06C755] hover:bg-[#05b34c] transition-colors"
            >
              <span className="text-sm font-bold text-white">LINE公式アカウント</span>
              <span className="text-xs text-white/60">鑑定・お問い合わせはこちら</span>
            </a>
            <a
              href="#mail-magazine"
              className="flex items-center gap-3 py-4 px-5 rounded-lg border border-border-subtle bg-navy-light hover:border-gold/30 transition-colors"
            >
              <svg className="w-4 h-4 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <span className="text-sm text-text-primary block">週間メルマガ</span>
                <span className="text-xs text-text-dim">週間占いをメールでお届け</span>
              </div>
            </a>
          </div>
        </section>

        {/* 免責事項 */}
        <section className="animate-fade-up animate-delay-4">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            免責事項
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            当サイトに掲載されている占い結果やアドバイスは、あくまでエンターテインメントとしてお楽しみください。
            占いの結果に基づく行動や判断は、ご自身の責任においてお願いいたします。
            当サイトの情報によって生じたいかなる損害についても、当サイトは責任を負いかねます。
          </p>
        </section>
      </div>
    </>
  )
}
