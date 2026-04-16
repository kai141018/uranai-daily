"use client"

import { useState, useEffect } from "react"

const ZODIAC_SIGNS = [
  { id: "aries", name: "おひつじ座", emoji: "♈" },
  { id: "taurus", name: "おうし座", emoji: "♉" },
  { id: "gemini", name: "ふたご座", emoji: "♊" },
  { id: "cancer", name: "かに座", emoji: "♋" },
  { id: "leo", name: "しし座", emoji: "♌" },
  { id: "virgo", name: "おとめ座", emoji: "♍" },
  { id: "libra", name: "てんびん座", emoji: "♎" },
  { id: "scorpio", name: "さそり座", emoji: "♏" },
  { id: "sagittarius", name: "いて座", emoji: "♐" },
  { id: "capricorn", name: "やぎ座", emoji: "♑" },
  { id: "aquarius", name: "みずがめ座", emoji: "♒" },
  { id: "pisces", name: "うお座", emoji: "♓" },
]

function getDevice(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop"
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return "ios"
  if (/Android/.test(ua)) return "android"
  return "desktop"
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true)
  )
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushNotification() {
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [selectedSign, setSelectedSign] = useState<string | null>(null)
  const [showGuide, setShowGuide] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState<"ios" | "android" | "desktop">("desktop")
  const [pwaInstalled, setPwaInstalled] = useState(false)
  const [guideStep, setGuideStep] = useState(1)

  useEffect(() => {
    const dev = getDevice()
    setDevice(dev)
    const isPwa = isStandalone()
    setPwaInstalled(isPwa)

    if ("serviceWorker" in navigator && "PushManager" in window) {
      setSupported(true)
    }
    const saved = localStorage.getItem("push_zodiac")
    if (saved) {
      setSubscribed(true)
      setSelectedSign(saved)
    }
    const visits = parseInt(localStorage.getItem("visit_count") || "0", 10) + 1
    localStorage.setItem("visit_count", String(visits))
    if (!localStorage.getItem("push_guide_seen") && !saved && (isPwa || visits >= 3)) {
      setShowGuide(true)
    }
    setReady(true)
  }, [])

  function dismissGuide() {
    // 「あとで」→次回また出す（フラグ立てない）
    setShowGuide(false)
  }

  function dismissGuideForever() {
    localStorage.setItem("push_guide_seen", "1")
    setShowGuide(false)
  }

  function guideToSignup() {
    localStorage.setItem("push_guide_seen", "1")
    setShowGuide(false)
    setShowPicker(true)
    setTimeout(() => {
      document.getElementById("push-picker")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 100)
  }

  async function subscribe(signId: string) {
    setLoading(true)
    try {
      // iOSのSafariブラウザではNotification APIが存在しない（PWA限定）
      if (typeof Notification === "undefined") {
        alert("通知を受け取るには、このサイトをホーム画面に追加してから開いてください。\n\n画面下の共有ボタン → 「ホーム画面に追加」")
        setLoading(false)
        return
      }

      const reg = await navigator.serviceWorker.register("/sw.js")
      await navigator.serviceWorker.ready

      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        alert("通知が許可されていません。\n設定アプリ → 占いデイリー → 通知 で許可してください。")
        setLoading(false)
        return
      }

      // Step 3: Push購読
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) {
        alert("設定エラー: VAPID鍵が見つかりません")
        setLoading(false)
        return
      }

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey) as BufferSource,
      })

      // Step 4: サーバーに保存
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          zodiacSign: signId,
        }),
      })

      if (res.ok) {
        localStorage.setItem("push_zodiac", signId)
        setSubscribed(true)
        setSelectedSign(signId)
        setShowPicker(false)
      } else {
        alert("登録に失敗しました。もう一度お試しください。")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error("Push subscribe error:", err)
      alert("エラーが発生しました:\n" + msg)
    }
    setLoading(false)
  }

  // iOS Safari でPush非対応（PWA未インストール時）
  // Android Chrome はPWAなくてもPush可能
  // デスクトップもPWAなくてもPush可能
  const needsPwaFirst = device === "ios" && !pwaInstalled

  // useEffect完了まで待つ（ハイドレーションずれ防止）
  if (!ready) return null

  // デスクトップ/AndroidでPush非対応の場合のみ非表示
  if (!supported && !needsPwaFirst && device !== "ios") return null

  // ====== 初回ガイドモーダル ======
  if (showGuide) {
    const iosInstallSteps = [
      {
        num: "1",
        title: "共有ボタンを押す",
        desc: "画面の下にあるこのボタンをタップしてください。",
        icon: "\u{1F4F2}",
        image: "/guide-share-ios.png",
      },
      {
        num: "2",
        title: "「ホーム画面に追加」を押す",
        desc: "メニューが出たら、下にスクロールして「ホーム画面に追加」をタップしてください。",
        icon: "\u{2795}",
        image: null,
      },
      {
        num: "3",
        title: "追加したアイコンから開く",
        desc: "ホーム画面に「占いデイリー」のアイコンが追加されます。次からはそこから開いてください。",
        icon: "\u{2B50}",
        image: null,
      },
      {
        num: "4",
        title: "星座を選ぶ",
        desc: "アプリを開いたら、あなたの星座をタップするだけ。",
        icon: "\u{2648}",
        image: null,
      },
      {
        num: "5",
        title: "「許可」を押す",
        desc: "「通知を送信します」と表示されたら「許可」を押してください。",
        icon: "\u{1F514}",
        image: null,
      },
      {
        num: "6",
        title: "毎朝届く",
        desc: "毎朝6時半に、あなたの星座の今日の運勢がスマホに届きます。無料です。",
        icon: "\u{2600}",
        image: null,
      },
    ]

    const androidSteps = [
      {
        num: "1",
        title: "ホーム画面に追加する（おすすめ）",
        desc: "画面上のメニュー（点3つ）をタップ →「ホーム画面に追加」を選んでください。毎朝すぐ開けます。",
        icon: "\u{1F4F2}",
      },
      {
        num: "2",
        title: "星座を選ぶ",
        desc: "あなたの星座をタップするだけ。生年月日がわからなくても大丈夫です。",
        icon: "\u{2648}",
      },
      {
        num: "3",
        title: "「許可」を押す",
        desc: "「通知を許可しますか？」と表示されたら「許可」を押してください。これで準備完了です。",
        icon: "\u{1F514}",
      },
      {
        num: "4",
        title: "毎朝届く",
        desc: "毎朝6時半に、あなたの星座の今日の運勢がスマホに届きます。無料です。",
        icon: "\u{2600}",
      },
    ]

    const desktopSteps = [
      {
        num: "1",
        title: "星座を選ぶ",
        desc: "あなたの星座をクリックするだけ。",
        icon: "\u{2648}",
      },
      {
        num: "2",
        title: "「許可」を押す",
        desc: "「通知を許可しますか？」と表示されたら「許可」を押してください。",
        icon: "\u{1F514}",
      },
      {
        num: "3",
        title: "毎朝届く",
        desc: "毎朝6時半に、あなたの星座の今日の運勢が届きます。無料です。",
        icon: "\u{2600}",
      },
    ]

    const steps = device === "ios" ? iosInstallSteps
      : device === "android" ? androidSteps
      : desktopSteps

    const totalSteps = steps.length
    const canGoNext = guideStep < totalSteps
    const isLastStep = guideStep === totalSteps
    // iOSでPWA未インストールの場合、ステップ2まではアプリ追加の案内
    const showSignupButton = device === "ios" ? (pwaInstalled || guideStep > 2) : isLastStep

    return (
      <>
        <div className="fixed inset-0 bg-black/90 z-40" onClick={dismissGuide} />
        <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto rounded-2xl p-6 shadow-2xl border border-gold/30" style={{ backgroundColor: "#0f1729" }}>
          <h2 className="text-cream text-lg font-bold text-center mb-1" style={{ fontFamily: "var(--font-display)" }}>
            毎朝の運勢を受け取る方法
          </h2>
          <p className="text-text-dim text-xs text-center mb-5">
            かんたん{totalSteps}ステップ
          </p>

          {/* 全ステップ表示 */}
          <div className="space-y-3 mb-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`flex items-start gap-3 transition-all duration-300 ${
                  guideStep === i + 1
                    ? "opacity-100 scale-100"
                    : guideStep > i + 1
                    ? "opacity-40 scale-95"
                    : "opacity-30 scale-95"
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  guideStep > i + 1
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : guideStep === i + 1
                    ? "bg-primary/20 border border-gold/30 text-gold"
                    : "bg-surface border border-border-subtle text-text-dim"
                }`}>
                  {guideStep > i + 1 ? "\u{2713}" : s.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.icon}</span>
                    <span className="text-cream text-sm font-medium">{s.title}</span>
                  </div>
                  {guideStep === i + 1 && (
                    <>
                      <p className="text-text-dim text-xs leading-relaxed mt-1">{s.desc}</p>
                      {"image" in s && typeof s.image === "string" && (
                        <div className="mt-2">
                          {s.image.includes("share") ? (
                            <div className="flex items-center gap-2">
                              <img src={s.image} alt="共有ボタン" className="w-10 h-10 rounded-lg border border-gold/20" />
                              <span className="text-text-dim text-xs">← このマークです</span>
                            </div>
                          ) : (
                            <img src={s.image} alt="手順" className="w-full max-w-[240px] rounded-xl border border-gold/20 shadow-lg" />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ボタン */}
          <div className="space-y-2">
            {canGoNext && (
              <button
                onClick={() => setGuideStep(guideStep + 1)}
                className="w-full bg-surface border border-gold/30 text-cream rounded-lg px-4 py-3 text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                次へ
              </button>
            )}
            {(isLastStep || (device !== "ios")) && (
              <button
                onClick={guideToSignup}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                星座を選んで受け取る
              </button>
            )}
            {device === "ios" && !pwaInstalled && guideStep <= 3 && (
              <p className="text-center text-xs text-gold/70 py-1">
                まずホーム画面への追加をお試しください
              </p>
            )}
            <button
              onClick={dismissGuide}
              className="w-full text-xs text-text-dim hover:text-cream text-center py-2"
            >
              あとで設定する
            </button>
            <button
              onClick={dismissGuideForever}
              className="w-full text-[10px] text-text-dim/50 hover:text-text-dim text-center py-1"
            >
              この案内を今後表示しない
            </button>
          </div>
        </div>
      </>
    )
  }

  // ====== 登録済み表示 ======
  if (subscribed && selectedSign) {
    const sign = ZODIAC_SIGNS.find((s) => s.id === selectedSign)
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-r from-navy-mid to-navy-surface px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{sign?.emoji}</span>
            <span className="text-sm text-cream">{sign?.name}の運勢を毎朝お届け中</span>
          </div>
          <button
            onClick={() => {
              setSubscribed(false)
              setShowPicker(true)
            }}
            className="text-xs text-gold/60 hover:text-gold underline"
          >
            変更
          </button>
        </div>
      </div>
    )
  }

  // ====== iOSでPWA未インストール → インストール誘導 ======
  if (needsPwaFirst && !showPicker) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-navy-mid via-navy-surface to-navy-mid p-5 text-center">
        <p className="text-gold text-xs tracking-widest mb-1">DAILY FORTUNE</p>
        <p className="text-cream text-base font-medium mb-2" style={{ fontFamily: "var(--font-display)" }}>
          毎朝、あなたの運勢が届く
        </p>
        <p className="text-text-dim text-xs leading-relaxed mb-4">
          ホーム画面に追加すると<br />毎朝6:30に今日の運勢をお届けします
        </p>
        <button
          onClick={() => {
            setShowGuide(true)
            setGuideStep(1)
          }}
          className="inline-block bg-gradient-to-r from-gold/80 to-gold text-navy font-medium text-xs rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity"
        >
          受け取り方を見る
        </button>
      </div>
    )
  }

  // ====== 未登録バナー ======
  if (!showPicker) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className="w-full relative overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-navy-mid via-navy-surface to-navy-mid p-5 text-center hover:border-gold/40 transition-colors"
      >
        <p className="text-gold text-xs tracking-widest mb-1">DAILY FORTUNE</p>
        <p className="text-cream text-base font-medium mb-1" style={{ fontFamily: "var(--font-display)" }}>
          毎朝、あなたの運勢が届く
        </p>
        <p className="text-text-dim text-xs">
          星座をタップするだけ。毎朝6:30にお届け
        </p>
      </button>
    )
  }

  // ====== 星座選択 ======
  return (
    <div id="push-picker" className="relative overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-navy-mid via-navy-surface to-navy-mid p-5">
      <p className="text-gold text-xs tracking-widest text-center mb-1">DAILY FORTUNE</p>
      <p className="text-cream text-base font-medium text-center mb-1" style={{ fontFamily: "var(--font-display)" }}>
        あなたの星座は？
      </p>
      <p className="text-text-dim text-xs text-center mb-4">
        選んだ星座の運勢が毎朝届きます
      </p>
      <div className="grid grid-cols-4 gap-2">
        {ZODIAC_SIGNS.map((sign) => (
          <button
            key={sign.id}
            onClick={() => subscribe(sign.id)}
            disabled={loading}
            className="flex flex-col items-center gap-0.5 py-2.5 rounded-xl bg-navy/60 hover:bg-gold/10 border border-transparent hover:border-gold/30 transition-all disabled:opacity-50"
          >
            <span className="text-2xl">{sign.emoji}</span>
            <span className="text-[10px] text-text-dim">{sign.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setShowPicker(false)}
        className="mt-3 w-full text-xs text-text-dim hover:text-cream text-center"
      >
        あとで
      </button>
    </div>
  )
}
