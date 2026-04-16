import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import webpush from "web-push"

let initialized = false

function init() {
  if (initialized) return
  webpush.setVapidDetails(
    "mailto:uranai-daily@example.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  )
  initialized = true
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const ZODIAC_NAMES: Record<string, string> = {
  aries: "おひつじ座", taurus: "おうし座", gemini: "ふたご座",
  cancer: "かに座", leo: "しし座", virgo: "おとめ座",
  libra: "てんびん座", scorpio: "さそり座", sagittarius: "いて座",
  capricorn: "やぎ座", aquarius: "みずがめ座", pisces: "うお座",
}

export async function GET(req: NextRequest) {
  // Vercel Cron認証
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    init()
    const supabase = getSupabase()
    const today = new Date().toISOString().split("T")[0]

    // 今日の運勢を取得
    const { data: fortunes } = await supabase
      .from("seo_daily_fortune")
      .select("sign, ranking, advice")
      .eq("date", today)

    if (!fortunes || fortunes.length === 0) {
      return NextResponse.json({ error: "No fortunes today" }, { status: 404 })
    }

    const fortuneMap = new Map(fortunes.map((f) => [f.sign, f]))

    // 全購読者を取得
    const { data: subs } = await supabase
      .from("push_subscriptions")
      .select("*")

    if (!subs || subs.length === 0) {
      return NextResponse.json({ sent: 0, message: "No subscribers" })
    }

    let sent = 0
    let failed = 0
    const expiredEndpoints: string[] = []

    for (const sub of subs) {
      const fortune = fortuneMap.get(sub.zodiac_sign)
      if (!fortune) continue

      const signName = ZODIAC_NAMES[sub.zodiac_sign] || sub.zodiac_sign
      const rank = fortune.ranking
      const advice = fortune.advice || ""
      const summary = advice.length > 60 ? advice.slice(0, 60) + "..." : advice

      const payload = JSON.stringify({
        title: `${signName} 今日の運勢 ${rank}位`,
        body: summary,
        url: `/horoscope/${sub.zodiac_sign}`,
      })

      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.keys_p256dh, auth: sub.keys_auth },
          },
          payload
        )
        sent++
      } catch (err: unknown) {
        failed++
        const statusCode = (err as { statusCode?: number })?.statusCode
        if (statusCode === 410 || statusCode === 404) {
          expiredEndpoints.push(sub.endpoint)
        }
      }
    }

    // 期限切れの購読を削除
    if (expiredEndpoints.length > 0) {
      await supabase
        .from("push_subscriptions")
        .delete()
        .in("endpoint", expiredEndpoints)
    }

    return NextResponse.json({
      sent,
      failed,
      expired_cleaned: expiredEndpoints.length,
    })
  } catch (e) {
    console.error("Push send error:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
