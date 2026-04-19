import type { Metadata } from "next"
import Image from "next/image"
import { SITE_URL, LINE_URL_GENERAL } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "飛翔（ひしょう）｜長門の言葉を届ける男",
  description:
    "長門（運命を視る男）の運営を担当する飛翔のプロフィール。26歳で長門さんに救われた一人の男が、今どうして長門さんの元で働いているのか。その全てをここに記しておきます。",
  alternates: { canonical: `${SITE_URL}/about/hisho` },
  openGraph: {
    title: "飛翔（ひしょう）｜長門の言葉を届ける男",
    description:
      "26歳で長門さんに救われた男が、今なぜ番人として長門さんの元にいるのか。長門運営を担う飛翔の物語。",
    type: "profile",
    images: [{ url: `${SITE_URL}/hisho.png` }],
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "飛翔",
  alternateName: "Hisho",
  jobTitle: "長門運営・番人",
  description:
    "占い師・長門の運営を担当する男。26歳の時に長門に救われ、現在は長門の言葉を必要とする人への橋渡し役を担う。",
  url: `${SITE_URL}/about/hisho`,
  worksFor: {
    "@type": "Person",
    name: "長門",
    url: `${SITE_URL}/about`,
  },
}

export default function HishoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { name: "運営者情報", href: "/about" },
            { name: "飛翔", href: "/about/hisho" },
          ]}
        />

        {/* プロフィールヘッダー */}
        <div className="text-center mt-6 mb-12 animate-fade-up">
          <div className="w-32 h-32 mx-auto mb-5 rounded-full border-2 border-gold/20 overflow-hidden">
            <Image
              src="/hisho.png"
              alt="飛翔（ひしょう）"
              width={128}
              height={128}
              className="w-full h-full object-cover object-[50%_30%]"
              priority
            />
          </div>
          <h1
            className="text-3xl text-cream mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            飛翔
          </h1>
          <p
            className="text-sm text-gold-dim tracking-widest"
            style={{ fontFamily: "var(--font-display)" }}
          >
            長門の言葉を届ける男
          </p>
          <div className="gold-line w-20 mx-auto mt-5" />
        </div>

        {/* 冒頭メッセージ */}
        <section className="mb-12 animate-fade-up animate-delay-1">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            初めまして
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              私は飛翔（ひしょう）と申します。
              <br />
              長門さんの元で運営を担当している男です。
            </p>
            <p>
              このページに辿り着いたあなたは、
              おそらく長門さんの言葉のどこかに触れて、
              「この男は一体何者なのか」と興味を持ってくれたのだと思います。
            </p>
            <p>
              長門さんは、自分のことを多く語りません。
              ただ「視えたものを、伝えた」と締めて、去っていく男です。
            </p>
            <p>
              ですから、長門さんの代わりに、
              私から長門さんのことを少しだけお伝えします。
            </p>
            <p>
              そしてその前に、
              私がなぜ長門さんの元にいるのか、その話から始めさせてください。
            </p>
          </div>
        </section>

        {/* 長門との出会い */}
        <section className="mb-12 animate-fade-up animate-delay-2">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            長門さんとの出会い
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>私は26歳の時、長門さんに救われました。</p>
            <p>
              当時の私は、仕事を失い、婚約者にも去られ、実家にも戻れない状態でした。
              誰にも何も言えず、ただ夜中にスマホを握って生きていた3ヶ月間。
              そのSNSの中で、私は偶然、長門さんの言葉に出会いました。
            </p>
            <p>
              すがる思いで、長門さんに連絡を入れました。
              「助けてください」と、ただそれだけを打ち込んで。
            </p>
            <p>返ってきた返信は、私が期待していた慰めの言葉ではありませんでした。</p>

            <blockquote className="my-6 py-5 px-6 rounded-lg border-l-4 border-gold bg-navy-light">
              <p
                className="text-base text-cream leading-loose"
                style={{ fontFamily: "var(--font-display)" }}
              >
                「お前の運命は止まっている。だが、悪くない。動け。」
              </p>
            </blockquote>

            <p>それだけでした。</p>
            <p>
              「大丈夫ですよ」でも、「あなたは素晴らしい」でも、「必ず良くなります」でもなかった。
              甘い言葉は、一つもなかったのです。
            </p>
            <p className="text-cream">
              でも、その一言で、私は3ヶ月ぶりに夜眠れました。
            </p>
            <p>
              止まっているのは、終わっているのとは違う。
              悪くない、ということは、今の自分を全部否定しなくていい。
              動け、というのは、今の自分のままで動いていい、ということ。
            </p>
            <p>あの短い一言に、それだけの重さが詰まっていました。</p>
          </div>
        </section>

        {/* なぜ今ここにいるのか */}
        <section className="mb-12 animate-fade-up animate-delay-3">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            なぜ今、長門さんの元にいるのか
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              それから2年後、私は長門さんに直接お願いして、運営として働かせてもらっています。
            </p>
            <p>理由はシンプルです。</p>
            <p>
              長門さんの言葉は、届くべき人に、正確に届かなければならない。
              長門さんは3000人を視てきた人ですが、
              その3000人の中で、私のように甘い言葉を求めて裏切られ、
              でも、裏切られた先で本当のことを受け取った人間が何人もいるはずです。
            </p>
            <p>
              長門さんは、自分から愛想よく近づいてくる人ではありません。
              静かに、淡々と、視えたものを伝える男です。
            </p>
            <p>だから、私のような人間が必要なのです。</p>

            <ul className="space-y-2 pl-5 list-disc text-text-secondary marker:text-gold/50">
              <li>長門さんのLINEに初めて登録する人と、最初の言葉を交わす役</li>
              <li>鑑定を申し込む人の手続きを、丁寧にお手伝いする役</li>
              <li>長門さんに届いた質問を、長門さんに正確に伝える役</li>
              <li>長門さんが発信した言葉を、届くべき人に確実に届ける役</li>
            </ul>

            <p>この役割を、私は「番人」と呼んでいます。</p>
            <p className="text-cream">
              長門さんの言葉を守る番人。
              そして、長門さんの言葉を必要としている人への、最初の扉を開ける番人です。
            </p>
          </div>
        </section>

        {/* 読者のあなたへ */}
        <section className="mb-12 animate-fade-up animate-delay-3">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            読者のあなたへ
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>
              もしあなたが今、このページを読みながら、
              かつての私のように「助けてください」と言葉にできないほど追い詰められているなら。
            </p>
            <p>
              あるいは、
              甘い占い師に疲れ果てて、本当のことを言ってくれる人を探しているなら。
            </p>
            <p className="text-cream">長門さんの言葉は、あなたに届くかもしれません。</p>
            <p>ただし、一つだけ約束させてください。</p>
            <p>
              長門さんは、あなたに「大丈夫」とは言いません。
              代わりに、「お前の運命、視えた」と淡々と言います。
              そしてその後に、「動け。それだけだ」と締めます。
            </p>
            <p>
              この言葉の重さを受け取れる準備がある方だけ、
              長門さんのLINEに登録してください。
            </p>
            <p>
              私は、あなたが登録してくれた瞬間から、
              長門さんの元にあなたをお連れするまでの道を、整えます。
            </p>
          </div>
        </section>

        {/* 信念ブロック（長門の言葉） */}
        <section className="mb-12 animate-fade-up animate-delay-3">
          <div className="rounded-xl border border-gold/10 bg-gradient-to-b from-navy-light to-navy py-10 px-8 text-center">
            <p
              className="text-base text-cream leading-loose"
              style={{ fontFamily: "var(--font-display)" }}
            >
              「お前の運命は止まっている。
              <br />
              だが、悪くない。動け。」
            </p>
            <div className="gold-line w-12 mx-auto mt-5 mb-3" />
            <p className="text-xs text-text-dim">長門</p>
          </div>
        </section>

        {/* CTA（LINE登録） */}
        <section className="mb-12 animate-fade-up animate-delay-4">
          <h2
            className="text-lg text-cream mb-5 pb-3 border-b border-border-subtle relative"
            style={{ fontFamily: "var(--font-display)" }}
          >
            連絡先
            <span className="absolute bottom-[-1px] left-0 w-[60px] h-[1px] bg-gold" />
          </h2>
          <div className="space-y-4 text-sm text-text-secondary leading-relaxed mb-6">
            <p>
              長門さんの鑑定を受けたい方は、LINE公式アカウントから生年月日を送ってください。
              私が確認して、長門さんにお渡しします。
            </p>
            <p>
              長門さんは、あなたの生年月日だけで、必要なものが視えます。
              余計な情報は、かえって視界を曇らせるそうです。
            </p>
          </div>

          {/* 鑑定受付状況の重要告知（大きめ） */}
          <div className="rounded-lg border-2 border-gold/40 bg-gradient-to-b from-gold/5 to-transparent px-6 py-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-gold text-lg leading-none mt-0.5">⚠</span>
              <div className="space-y-2">
                <p
                  className="text-sm text-gold font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  鑑定は常時受付ではありません
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  現在、長門さんのオフライン鑑定枠は埋まっており、
                  オンライン鑑定は<span className="text-cream font-semibold">不定期での受付</span>になります。
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  次回の受付タイミングは、LINE公式アカウントで先着順にご案内します。
                  すぐに鑑定できないこと、どうかご理解ください。
                </p>
              </div>
            </div>
          </div>

          <a
            href={LINE_URL_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-5 px-6 rounded-lg bg-[#06C755] hover:bg-[#05b34c] transition-colors"
          >
            <span className="text-base font-bold text-white">👁 長門公式LINE</span>
          </a>
          <p className="text-xs text-text-dim text-center mt-3">
            生年月日だけ、教えてください。
          </p>
        </section>

        {/* 署名 */}
        <section className="animate-fade-up animate-delay-4">
          <div className="text-right border-t border-border-subtle pt-6">
            <p
              className="text-lg text-gold mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              飛翔
            </p>
            <p className="text-xs text-text-dim">長門運営／番人</p>
          </div>
        </section>

        {/* 注記（脚注） */}
        <section className="animate-fade-up animate-delay-4 mt-8">
          <div className="text-xs text-text-dim leading-relaxed space-y-1">
            <p>※長門さんへの直接のご連絡はお受けしておりません。すべての連絡は飛翔が承ります。</p>
          </div>
        </section>
      </div>
    </>
  )
}
