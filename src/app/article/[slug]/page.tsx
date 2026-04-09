import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SITE_URL, SITE_AUTHOR, CATEGORY_CTA_MAP } from "@/lib/constants"
import { articleJsonLd, faqJsonLd } from "@/lib/jsonld"
import Breadcrumb from "@/components/Breadcrumb"
import CTABanner from "@/components/CTABanner"

type Props = {
  params: Promise<{ slug: string }>
}

// TODO: Supabaseから記事を取得する関数に差し替え
async function getArticle(slug: string) {
  // ダミーデータ
  const articles: Record<string, {
    title: string
    description: string
    category: string
    categorySlug: string
    publishedAt: string
    updatedAt: string
    content: string
    faqs: { question: string; answer: string }[]
    relatedArticles: { slug: string; title: string }[]
  }> = {
    "numerology-guide-2026": {
      title: "数秘術とは？初心者でもわかる完全ガイド【2026年最新】",
      description: "数秘術の基本的な考え方から計算方法、ライフパスナンバーの意味まで初心者向けに解説します。",
      category: "数秘術",
      categorySlug: "numerology",
      publishedAt: "2026-04-09T05:00:00+09:00",
      updatedAt: "2026-04-09T05:00:00+09:00",
      content: `<h2 id="what-is-numerology">数秘術ってなに？</h2>
<p>数秘術（すうひじゅつ）は、数字に秘められた意味を読み解くことで、あなたの性格や運命を知る占いの一つです。生年月日や名前から導き出される「運命数」をもとに、あなたの人生の傾向や才能、課題を明らかにします。</p>
<p>古代ギリシャの数学者ピタゴラスが「万物は数なり」と説いたことが起源とされ、数千年の歴史を持つ占術です。</p>

<h2 id="how-to-calculate">ライフパスナンバーの計算方法</h2>
<p>ライフパスナンバーは、生年月日の数字を全て足して一桁にしたものです。例えば、1990年5月15日生まれの場合：</p>
<p>1+9+9+0+5+1+5 = 30 → 3+0 = <strong>3</strong></p>
<p>この「3」があなたのライフパスナンバーです。ただし、11、22、33はマスターナンバーと呼ばれる特別な数字なので、そのままにします。</p>

<h2 id="life-path-meanings">各ライフパスナンバーの意味</h2>
<p>それぞれのナンバーには固有の意味があります。あなたの数字が持つ特徴を見ていきましょう。</p>

<h2 id="numerology-and-compatibility">数秘術で相性を見る方法</h2>
<p>数秘術では、お互いのライフパスナンバーを比較することで相性を判断できます。相性の良い組み合わせと注意が必要な組み合わせがあります。</p>

<h2 id="money-luck">数秘術で金運を上げるコツ</h2>
<p>ライフパスナンバーごとに、金運を上げるための行動パターンが異なります。自分のナンバーに合った方法を実践することで、より効果的に金運を引き寄せることができます。</p>

<h2 id="summary">まとめ</h2>
<p>数秘術は、生年月日という身近な数字から深い自己理解を得られる占術です。まずは自分のライフパスナンバーを計算してみてください。きっと新しい発見があるはずです。</p>`,
      faqs: [
        {
          question: "数秘術は当たるんですか？",
          answer: "数秘術は統計学的な要素を持つ占術で、多くの人が「自分に当てはまる」と感じています。科学的な証明はありませんが、自己理解のツールとして活用する方が増えています。",
        },
        {
          question: "ライフパスナンバーとソウルナンバーの違いは？",
          answer: "ライフパスナンバーは生年月日から算出し、人生の傾向を表します。ソウルナンバーは名前の母音から算出し、内面の欲求を表します。",
        },
        {
          question: "マスターナンバーとは何ですか？",
          answer: "11、22、33のことをマスターナンバーと呼びます。通常は一桁に還元しますが、これらの数字は特別な使命やポテンシャルを持つとされ、そのまま解釈します。",
        },
      ],
      relatedArticles: [
        { slug: "money-luck-powerstone", title: "金運アップに効くパワーストーン7選" },
        { slug: "birthday-fortune-april", title: "4月生まれの性格と運勢" },
      ],
    },
  }

  return articles[slug] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `${SITE_URL}/article/${slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [SITE_AUTHOR],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const ctaContext = CATEGORY_CTA_MAP[article.categorySlug] || "general"

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Breadcrumb
        items={[
          { name: article.category, href: `/category/${article.categorySlug}` },
          { name: article.title, href: `/article/${slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: article.title,
              description: article.description,
              url: `${SITE_URL}/article/${slug}`,
              publishedAt: article.publishedAt,
              updatedAt: article.updatedAt,
            })
          ),
        }}
      />

      {article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(article.faqs)),
          }}
        />
      )}

      <article className="py-4">
        {/* ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <a
              href={`/category/${article.categorySlug}`}
              className="text-xs font-medium text-primary bg-surface px-3 py-1 rounded-full"
            >
              {article.category}
            </a>
            <time className="text-xs text-text-light" dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
            </time>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-text-dark leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-light">著者：</span>
            <span className="text-sm font-medium text-text-dark">{SITE_AUTHOR}</span>
          </div>
        </header>

        {/* 目次 */}
        <nav className="bg-surface rounded-xl p-5 mb-8">
          <h2 className="text-sm font-bold text-text-dark mb-3">この記事の目次</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#what-is-numerology" className="text-primary hover:underline">数秘術ってなに？</a></li>
            <li><a href="#how-to-calculate" className="text-primary hover:underline">ライフパスナンバーの計算方法</a></li>
            <li><a href="#life-path-meanings" className="text-primary hover:underline">各ライフパスナンバーの意味</a></li>
            <li><a href="#numerology-and-compatibility" className="text-primary hover:underline">数秘術で相性を見る方法</a></li>
            <li><a href="#money-luck" className="text-primary hover:underline">数秘術で金運を上げるコツ</a></li>
            <li><a href="#summary" className="text-primary hover:underline">まとめ</a></li>
          </ol>
        </nav>

        {/* 本文 */}
        <div
          className="prose prose-sm max-w-none mb-8
            [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-text-dark [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border
            [&_p]:text-text [&_p]:leading-relaxed [&_p]:mb-4
            [&_strong]:text-text-dark
            [&_a]:text-primary [&_a]:underline
          "
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* 中間CTA */}
        <CTABanner variant="compact" context={ctaContext} />

        {/* FAQ */}
        {article.faqs.length > 0 && (
          <section className="my-8">
            <h2 className="text-lg font-bold text-text-dark mb-4 pb-2 border-b border-border">
              よくある質問
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-border p-5">
                  <h3 className="text-sm font-bold text-text-dark mb-2">
                    Q. {faq.question}
                  </h3>
                  <p className="text-sm text-text leading-relaxed">
                    A. {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* メインCTA */}
        <CTABanner context={ctaContext} />

        {/* 関連記事 */}
        {article.relatedArticles.length > 0 && (
          <section className="py-8">
            <h2 className="text-sm font-bold text-text-dark mb-3">関連記事</h2>
            <div className="space-y-2">
              {article.relatedArticles.map((related) => (
                <a
                  key={related.slug}
                  href={`/article/${related.slug}`}
                  className="block bg-white rounded-lg border border-border p-4 hover:border-primary-light transition-colors"
                >
                  <span className="text-sm font-medium text-text-dark hover:text-primary">
                    {related.title}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
