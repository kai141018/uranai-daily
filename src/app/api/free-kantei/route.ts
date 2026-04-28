import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const VALID_CATEGORIES = ["money", "love", "work", "health", "general"] as const
type WorryCategory = typeof VALID_CATEGORIES[number]

// 運命数計算（生年月日 → 1〜9 / 11 / 22 / 33）
function calcUnmeisuu(birthdate: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) return null
  const digits = birthdate.replace(/-/g, "").split("").map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0)
  }
  return sum
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, birthdate, worry_category, worry_detail, line_display_name } = body

    if (!name || !line_display_name || !birthdate || !worry_category || !worry_detail) {
      return NextResponse.json({ error: "必須項目が未入力だ（LINE登録名も必須）" }, { status: 400 })
    }
    if (!VALID_CATEGORIES.includes(worry_category as WorryCategory)) {
      return NextResponse.json({ error: "カテゴリが不正だ" }, { status: 400 })
    }
    if (typeof worry_detail !== "string" || worry_detail.trim().length < 10) {
      return NextResponse.json({ error: "悩みの詳細を10字以上で書いてくれ" }, { status: 400 })
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
      return NextResponse.json({ error: "生年月日の形式が不正だ" }, { status: 400 })
    }

    const unmeisuu = calcUnmeisuu(birthdate)

    const { data, error } = await supabase
      .from("free_kantei_requests")
      .insert({
        division: "spiri",
        name: String(name).slice(0, 50),
        birthdate,
        worry_category,
        worry_detail: String(worry_detail).slice(0, 2000),
        line_display_name: String(line_display_name).slice(0, 50),
        unmeisuu,
        status: "pending",
      })
      .select("id")
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "データベースエラー" }, { status: 500 })
    }

    // Discord通知（事務局向け）
    const webhookUrl = process.env.DISCORD_WEBHOOK_FREE_KANTEI || process.env.DISCORD_WEBHOOK_FORTUNE
    if (webhookUrl) {
      const categoryLabels: Record<string, string> = {
        money: "金運・お金",
        love: "恋愛・人間関係",
        work: "仕事・キャリア",
        health: "健康・体調",
        general: "その他",
      }
      const msg = [
        `🌙 **新規・無料鑑定リクエスト（長門 / uranai-daily.jp）**`,
        `┃ 呼び名: ${name}`,
        `┃ LINE登録名: ${line_display_name || "（未記入）"}`,
        `┃ 生年月日: ${birthdate}`,
        `┃ 運命数: ${unmeisuu ?? "計算不可"}`,
        `┃ カテゴリ: ${categoryLabels[worry_category] || worry_category}`,
        `┃ 悩み: ${worry_detail.slice(0, 200)}${worry_detail.length > 200 ? "…" : ""}`,
        ``,
        `→ 溜まったらまとめて生成、harness で配信`,
      ].join("\n")

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg }),
      }).catch(e => console.error("Discord webhook error:", e))
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (e) {
    console.error("Free kantei API error:", e)
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 })
  }
}
