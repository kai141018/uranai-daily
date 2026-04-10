export const SITE_NAME = "占いデイリー"
export const SITE_DESCRIPTION = "毎日の占いで運勢をチェック。12星座の今日の運勢、数秘術、金運占い、パワーストーン情報を毎日更新中。無料鑑定も受付中。"
export const SITE_URL = "https://uranai-daily.jp"
export const SITE_AUTHOR = "占いデイリー編集部" // TODO: リアルな占い師ペルソナ名に差し替え
export const LINE_URL_MONEY = "https://utage-system.com/line/open/QA6cLS4pg4wd?mtid=cuAM9q3pShS7"
export const LINE_URL_LOVE = "https://utage-system.com/line/open/QA6cLS4pg4wd?mtid=cuAM9q3pShS7"
export const LINE_URL_GENERAL = "https://utage-system.com/line/open/QA6cLS4pg4wd?mtid=cuAM9q3pShS7"

// カテゴリ → CTAタイプの自動マッピング
export type CTAType = "money" | "love" | "general"
export const CATEGORY_CTA_MAP: Record<string, CTAType> = {
  numerology: "money",
  money: "money",
  powerstone: "money",
  birthday: "general",
  love: "love",
  spiritual: "general",
}

export const CTA_CONFIG: Record<CTAType, { url: string; label: string; compactLabel: string; gradient: string }> = {
  money: {
    url: LINE_URL_MONEY,
    label: "金運のプロに無料で見てもらう",
    compactLabel: "金運のプロに無料相談 →",
    gradient: "from-gold to-yellow-500",
  },
  love: {
    url: LINE_URL_LOVE,
    label: "恋愛のプロに無料で見てもらう",
    compactLabel: "恋愛のプロに無料相談 →",
    gradient: "from-pink-500 to-rose-500",
  },
  general: {
    url: LINE_URL_GENERAL,
    label: "プロの鑑定士に無料で見てもらう",
    compactLabel: "プロに無料鑑定してもらう →",
    gradient: "from-primary to-primary-dark",
  },
}

export const ZODIAC_SIGNS = [
  { id: "aries", name: "おひつじ座", emoji: "♈", period: "3/21〜4/19" },
  { id: "taurus", name: "おうし座", emoji: "♉", period: "4/20〜5/20" },
  { id: "gemini", name: "ふたご座", emoji: "♊", period: "5/21〜6/21" },
  { id: "cancer", name: "かに座", emoji: "♋", period: "6/22〜7/22" },
  { id: "leo", name: "しし座", emoji: "♌", period: "7/23〜8/22" },
  { id: "virgo", name: "おとめ座", emoji: "♍", period: "8/23〜9/22" },
  { id: "libra", name: "てんびん座", emoji: "♎", period: "9/23〜10/23" },
  { id: "scorpio", name: "さそり座", emoji: "♏", period: "10/24〜11/22" },
  { id: "sagittarius", name: "いて座", emoji: "♐", period: "11/23〜12/21" },
  { id: "capricorn", name: "やぎ座", emoji: "♑", period: "12/22〜1/19" },
  { id: "aquarius", name: "みずがめ座", emoji: "♒", period: "1/20〜2/18" },
  { id: "pisces", name: "うお座", emoji: "♓", period: "2/19〜3/20" },
] as const

export type ZodiacId = (typeof ZODIAC_SIGNS)[number]["id"]

export const CATEGORIES = [
  { slug: "numerology", name: "数秘術", description: "数秘術で読み解くあなたの運命", image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=600&h=400&fit=crop" },
  { slug: "money", name: "金運占い", description: "金運アップの秘訣を占いで解説", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=400&fit=crop" },
  { slug: "powerstone", name: "パワーストーン", description: "パワーストーンの効果と選び方", image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&h=400&fit=crop" },
  { slug: "birthday", name: "誕生日占い", description: "誕生日から分かるあなたの性格と運勢", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=400&fit=crop" },
  { slug: "love", name: "恋愛占い", description: "恋愛運を上げるための占いガイド", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop" },
  { slug: "spiritual", name: "スピリチュアル", description: "波動・宇宙・スピリチュアルの知恵", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop" },
] as const

// ヒーロー・雰囲気画像
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop", // 星空・山脈
  tarot: "https://images.unsplash.com/photo-1633283767392-28d4f34b50cd?w=800&h=600&fit=crop", // タロットカード
  crystal: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=800&h=600&fit=crop", // クリスタル
  candles: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=800&h=600&fit=crop", // キャンドル
  stars: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop", // 星空山
}
