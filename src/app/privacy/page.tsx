import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシーについて。個人情報の取り扱いやCookieの使用について説明しています。`,
  alternates: { canonical: `${SITE_URL}/privacy` },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "プライバシーポリシー", href: "/privacy" }]} />

      <h1
        className="text-2xl md:text-3xl text-cream mb-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        プライバシーポリシー
      </h1>

      <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
        <p>
          {SITE_NAME}（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          個人情報の収集について
        </h2>
        <p>
          当サイトでは、お問い合わせやLINE登録の際に、お名前・メールアドレス等の個人情報をご提供いただく場合があります。
          収集した個人情報は、お問い合わせへの回答やサービスの提供のためにのみ使用し、それ以外の目的では使用いたしません。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          アクセス解析ツールについて
        </h2>
        <p>
          当サイトでは、Googleアナリティクスを利用してアクセス情報を収集しています。
          この際、データ収集のためにCookieが使用されます。
          アクセス情報は匿名で収集されており、個人を特定するものではありません。
          Cookieの使用を望まない場合は、ブラウザの設定から無効にすることが可能です。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          第三者への開示について
        </h2>
        <p>
          収集した個人情報は、法令に基づく場合を除き、第三者に開示・提供することはありません。
        </p>

        <h2 className="text-lg text-cream pt-4" style={{ fontFamily: "var(--font-display)" }}>
          ポリシーの変更について
        </h2>
        <p>
          当サイトは、必要に応じて本ポリシーを変更することがあります。
          変更後のポリシーは、当ページに掲載した時点から効力を生じるものとします。
        </p>

        <p className="text-text-dim pt-4">
          制定日: 2026年4月10日
        </p>
      </div>
    </div>
  )
}
