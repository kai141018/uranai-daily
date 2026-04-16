import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    const { subscription, zodiacSign } = await req.json()

    if (!subscription?.endpoint || !zodiacSign) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const { error } = await supabase.from("push_subscriptions").upsert(
      {
        endpoint: subscription.endpoint,
        keys_p256dh: subscription.keys.p256dh,
        keys_auth: subscription.keys.auth,
        zodiac_sign: zodiacSign,
      },
      { onConflict: "endpoint" }
    )

    if (error) {
      console.error("Supabase upsert error:", error)
      return NextResponse.json({ error: "DB error" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Subscribe error:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
