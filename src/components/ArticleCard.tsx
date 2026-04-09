import Link from "next/link"

type Props = {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  publishedAt: string
}

export default function ArticleCard({ slug, title, description, category, categorySlug, publishedAt }: Props) {
  return (
    <article className="bg-white rounded-xl border border-border p-5 hover:border-primary-light hover:shadow-md transition-all group">
      <Link href={`/article/${slug}`} className="block">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/category/${categorySlug}`}
            className="text-xs font-medium text-primary bg-surface px-2 py-0.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {category}
          </Link>
          <time className="text-xs text-text-light" dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
        <h3 className="font-bold text-text-dark group-hover:text-primary transition-colors leading-snug mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-light leading-relaxed line-clamp-2">
          {description}
        </p>
      </Link>
    </article>
  )
}
