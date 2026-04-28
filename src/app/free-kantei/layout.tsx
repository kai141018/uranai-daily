import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "長門の無料鑑定｜占いデイリー",
  description: "3000人を視てきた占い師・長門の無料鑑定。月10名限定。生年月日と悩みを1つ送れば、運命数を視て次の一手を渡す。",
  openGraph: {
    title: "長門の無料鑑定｜占いデイリー",
    description: "3000人を視てきた占い師・長門の無料鑑定。生年月日と悩みを1つ送れば、次の一手を渡す。",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function FreeKanteiLayout({ children }: { children: React.ReactNode }) {
  return children
}
