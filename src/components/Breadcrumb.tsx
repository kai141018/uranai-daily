import Link from "next/link"
import { breadcrumbJsonLd } from "@/lib/jsonld"
import { SITE_URL } from "@/lib/constants"

type BreadcrumbItem = {
  name: string
  href: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const fullItems = [{ name: "ホーム", href: "/" }, ...items]
  const jsonLdItems = fullItems.map((item) => ({
    name: item.name,
    url: `${SITE_URL}${item.href}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(jsonLdItems)) }}
      />
      <nav aria-label="パンくずリスト" className="text-xs text-text-dim py-4">
        <ol className="flex flex-wrap items-center gap-1.5">
          {fullItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border-subtle">›</span>}
              {i === fullItems.length - 1 ? (
                <span className="text-text-secondary">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-gold transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
