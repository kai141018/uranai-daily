import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================================
// 今日の運勢
// ============================================================
function getJstToday() {
  // JST（Asia/Tokyo）基準の今日の日付 YYYY-MM-DD を返す
  // UTC基準だとJST早朝（00:00-09:00）に前日が返るため必ずJSTで取得する
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date())
}

export async function getTodayFortunes() {
  const today = getJstToday()
  const { data, error } = await supabase
    .from("seo_daily_fortune")
    .select("*")
    .eq("date", today)
    .order("ranking", { ascending: true })

  if (error || !data || data.length === 0) return null
  return data
}

export async function getSignFortune(signId: string) {
  const today = getJstToday()
  const { data, error } = await supabase
    .from("seo_daily_fortune")
    .select("*")
    .eq("date", today)
    .eq("sign", signId)
    .single()

  if (error || !data) return null
  return data
}

// ============================================================
// SEO記事
// ============================================================
export async function getPublishedArticles(limit = 10) {
  const { data, error } = await supabase
    .from("seo_articles")
    .select("id, slug, title, meta_description, main_keyword, category, cluster, featured_image, published_at")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) return []
  return data || []
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("seo_articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !data) return null
  return data
}

export async function getArticlesByCategory(category: string, limit = 20) {
  const { data, error } = await supabase
    .from("seo_articles")
    .select("id, slug, title, meta_description, category, featured_image, published_at")
    .eq("category", category)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) return []
  return data || []
}

export async function getRelatedArticles(cluster: string, excludeSlug: string, limit = 5) {
  const { data, error } = await supabase
    .from("seo_articles")
    .select("slug, title")
    .eq("cluster", cluster)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) return []
  return data || []
}
