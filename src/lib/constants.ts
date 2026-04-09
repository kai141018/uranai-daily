export const SITE_NAME = "占いデイリー"
export const SITE_DESCRIPTION = "毎日の占いで運勢をチェック。12星座の今日の運勢、数秘術、金運占い、パワーストーン情報を毎日更新中。無料鑑定も受付中。"
export const SITE_URL = "https://uranai-daily.jp"
export const SITE_AUTHOR = "占いデイリー編集部" // TODO: リアルな占い師ペルソナ名に差し替え
export const LINE_URL_MONEY = "https://lin.ee/placeholder-money" // TODO: 金運LINE
export const LINE_URL_LOVE = "https://lin.ee/placeholder-love" // TODO: 恋愛LINE（実態は同じファネル）

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
  { slug: "numerology", name: "数秘術", description: "数秘術で読み解くあなたの運命" },
  { slug: "money", name: "金運占い", description: "金運アップの秘訣を占いで解説" },
  { slug: "powerstone", name: "パワーストーン", description: "パワーストーンの効果と選び方" },
  { slug: "birthday", name: "誕生日占い", description: "誕生日から分かるあなたの性格と運勢" },
  { slug: "love", name: "恋愛占い", description: "恋愛運を上げるための占いガイド" },
  { slug: "spiritual", name: "スピリチュアル", description: "波動・宇宙・スピリチュアルの知恵" },
] as const
