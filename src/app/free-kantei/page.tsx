'use client'

import { useEffect, useState } from 'react'

const concerns = [
  { value: 'money',   label: '金運・お金' },
  { value: 'love',    label: '恋愛・人間関係' },
  { value: 'work',    label: '仕事・キャリア' },
  { value: 'health',  label: '健康・体調' },
  { value: 'general', label: 'その他' },
]

const placeholders: Record<string, string> = {
  money:   '例：独立して半年、資金が枯れかけている。続けるか撤退すべきか視てほしい',
  love:    '例：3年付き合った相手と最近すれ違いが続いている。続ける意味があるかを視てほしい',
  work:    '例：今の会社で評価が頭打ちで転職か残留か迷っている。どちらが筋か視てほしい',
  health:  '例：原因不明の不調が続いている。生活で見直すべきことがあるか視てほしい',
  general: '今、視てほしいことを1つ、背景込みで書いてくれ',
}

const NAGATO_LINE_URL = 'https://utage-system.com/line/open/QA6cLS4pg4wd?mtid=cuAM9q3pShS7'

export default function FreeKanteiForm() {
  const [form, setForm] = useState({
    name: '',
    line_display_name: '',
    birthdate: '',
    worry_category: '',
    worry_detail: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  useEffect(() => {
    if (status === 'done') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setStatus('sending')
    try {
      const res = await fetch('/api/free-kantei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const isValid =
    form.name &&
    form.line_display_name &&
    form.birthdate &&
    form.worry_category &&
    form.worry_detail.trim().length >= 10

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCss }} />

      <div className="wrap">
        <header>
          <h1>長門の無料鑑定</h1>
          <p className="sub">鑑定情報入力フォーム</p>
        </header>

        {status === 'done' ? (
          <div className="thanks">
            <h2>受け取った</h2>
            <p>お前の生年月日と悩みを、しっかり預かった</p>
            <p>視てやる</p>

            <div className="must-line">
              <p className="must-line-head">ただし、鑑定文の納品先は LINE のトーク画面だけだ</p>
              <p className="must-line-list">このサイトの中にも</p>
              <p className="must-line-list">オープンチャット「長門の運命の控え室」の中にも</p>
              <p className="must-line-list">DM・メールにも届かない</p>
              <p className="must-line-warn">公式LINEを追加していない時点で、鑑定の枠に入っていない扱いになる</p>
            </div>

            <p style={{ marginTop: 16 }}>
              <a href={NAGATO_LINE_URL} target="_blank" rel="noopener noreferrer" className="line-link">
                公式LINEを追加する（必須）
              </a>
            </p>
            <p className="note">※ 24時間以内にLINE追加が確認できない申込はキャンセル扱いになります</p>
            <p className="note">※ 鑑定書は最長48時間以内に、LINEのトーク画面で届きます</p>
            <p className="sig-thanks">— 長門</p>
          </div>
        ) : (
          <>
            <div className="intro">
              <p>このフォームに書いてくれた内容をもとに、俺が一人ずつ視ていく</p>
              <p>無料鑑定の枠は月10名、申込書の精度で鑑定の深さが10倍変わる、丁寧に書いてくれ</p>
              <p>送信が終わったら、画面に出る公式LINEを必ず追加してくれ、追加していないと鑑定文は届けられない</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="section">
                <div className="section-title">基本情報</div>
                <div className="section-sub">運命数の算出と本筋を視るのに必要だ</div>
              </div>

              <div className="field">
                <label>呼び名（鑑定文で呼びかける名前）<span className="req">*</span></label>
                <input type="text" required autoComplete="nickname"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="例：ゆうこ" />
              </div>

              <div className="field">
                <label>LINE登録名<span className="req">*</span></label>
                <input type="text" required autoComplete="name"
                  value={form.line_display_name}
                  onChange={e => setForm(f => ({ ...f, line_display_name: e.target.value }))}
                  placeholder="LINEで表示されている名前そのまま" />
                <div className="hint">この名前で誰宛か特定して鑑定文を送る、公式LINE追加時の名前と必ず同じにしてくれ</div>
              </div>

              <div className="field">
                <label>生年月日<span className="req">*</span></label>
                <input type="date" required
                  value={form.birthdate}
                  onChange={e => setForm(f => ({ ...f, birthdate: e.target.value }))} />
                <div className="hint">推測で書くな、分からない部分があれば空欄でいい</div>
              </div>

              <div className="section">
                <div className="section-title">悩み</div>
                <div className="section-sub">一つに絞ってくれ、複数あると地図が描けない</div>
              </div>

              <div className="field">
                <label>悩みのカテゴリ<span className="req">*</span></label>
                <div className="radio-group">
                  {concerns.map(c => (
                    <label key={c.value}>
                      <input type="radio" name="worry_category" value={c.value} required
                        checked={form.worry_category === c.value}
                        onChange={() => setForm(f => ({ ...f, worry_category: c.value, worry_detail: f.worry_category === c.value ? f.worry_detail : '' }))} />
                      {c.label}
                    </label>
                  ))}
                </div>
              </div>

              {form.worry_category && (
                <div className="field">
                  <label>視てほしい悩み<span className="req">*</span></label>
                  <textarea required rows={6}
                    value={form.worry_detail}
                    onChange={e => setForm(f => ({ ...f, worry_detail: e.target.value }))}
                    placeholder={placeholders[form.worry_category] || ''} />
                  <div className="hint">背景を3行で添えてくれた方が深く視れる（10字以上）／ 現在 {form.worry_detail.length}字</div>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={status === 'sending' || !isValid}>
                {status === 'sending' ? '送信中…' : '無料で視てもらう'}
              </button>

              {status === 'error' && (
                <div className="msg error">送信に失敗した、もう一度試してくれ</div>
              )}
            </form>

            <footer>
              — 長門 ／ お問い合わせはLINE公式アカウントまで
            </footer>
          </>
        )}
      </div>
    </>
  )
}

const globalCss = `
:root {
  --bg: #0a0a0a;
  --bg-card: #14110d;
  --text: #ece5d6;
  --gold: #c8a04a;
  --gold-bright: #d9b86a;
  --line: #3a2f1c;
  --red: #c0392b;
  --error: #ff6b6b;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  background: radial-gradient(ellipse at top, #1a140a 0%, #0a0a0a 60%);
  background-attachment: fixed;
  color: var(--text);
  font-family: "Yu Mincho", "游明朝", "YuMincho", "Hiragino Mincho ProN", serif;
  line-height: 1.8;
  min-height: 100vh;
}
body { padding: 40px 16px; }

.wrap { max-width: 720px; margin: 0 auto; }

header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
header h1 {
  font-size: 24px;
  color: var(--gold-bright);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
header .sub { font-size: 13px; color: #a8a08c; }

.intro {
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 20px 24px;
  margin-bottom: 32px;
  border-radius: 4px;
  font-size: 14px;
  color: #d8d2c0;
}
.intro p { margin-bottom: 12px; }
.intro p:last-child { margin-bottom: 0; }

.field { margin-bottom: 28px; }
.field label {
  display: block;
  font-size: 13px;
  color: var(--gold);
  margin-bottom: 6px;
  letter-spacing: 0.05em;
}
.field .req { color: var(--red); font-weight: bold; margin-left: 4px; }
.field .hint {
  font-size: 11px;
  color: #8a8270;
  margin-top: 4px;
}
.field input[type="text"],
.field input[type="email"],
.field input[type="date"],
.field input[type="time"],
.field select,
.field textarea {
  width: 100%;
  background: #0e0c08;
  border: 1px solid var(--line);
  color: var(--text);
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  border-radius: 2px;
  transition: border-color 0.2s;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--gold);
}
.field textarea { resize: vertical; min-height: 100px; }
.field .radio-group { display: flex; gap: 16px; flex-wrap: wrap; }
.field .radio-group label {
  display: flex; align-items: center; gap: 6px; cursor: pointer;
  color: var(--text); margin-bottom: 0; font-size: 14px;
}
.field .radio-group input { margin: 0; }

.section {
  border-top: 1px solid var(--line);
  padding-top: 24px;
  margin-top: 36px;
}
.section-title {
  font-size: 15px;
  color: var(--gold-bright);
  margin-bottom: 4px;
  letter-spacing: 0.1em;
}
.section-sub { font-size: 12px; color: #8a8270; margin-bottom: 20px; }

.submit-btn {
  width: 100%;
  background: linear-gradient(180deg, #d9b86a 0%, #b08230 100%);
  color: #1a1208;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.15em;
  cursor: pointer;
  border-radius: 2px;
  margin-top: 24px;
  font-family: inherit;
  transition: transform 0.1s, box-shadow 0.2s;
}
.submit-btn:hover { box-shadow: 0 0 20px rgba(216, 184, 106, 0.4); }
.submit-btn:active { transform: translateY(1px); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.msg {
  margin-top: 16px;
  padding: 12px;
  border-radius: 2px;
  font-size: 13px;
}
.msg.error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid var(--error);
  color: var(--error);
}

.thanks {
  text-align: center;
  padding: 60px 20px 20px;
}
.thanks h2 {
  color: var(--gold-bright);
  font-size: 22px;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
}
.thanks p {
  color: #d8d2c0;
  font-size: 14px;
  margin-bottom: 12px;
}
.thanks .note {
  margin-top: 12px;
  font-size: 12px;
  color: #8a8270;
}
.thanks .sig-thanks {
  margin-top: 36px;
  font-size: 12px;
  color: #8a8270;
  letter-spacing: 0.2em;
}

.must-line {
  margin-top: 28px;
  margin-bottom: 8px;
  padding: 18px 16px;
  background: rgba(216, 184, 106, 0.06);
  border: 1px solid var(--gold);
  border-radius: 4px;
  text-align: left;
}
.must-line-head {
  color: var(--gold-bright);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px !important;
  line-height: 1.6;
}
.must-line-list {
  color: #d8d2c0;
  font-size: 13px;
  margin-bottom: 4px !important;
  padding-left: 14px;
  line-height: 1.7;
}
.must-line-warn {
  color: var(--gold-bright);
  font-size: 13px;
  margin-top: 12px !important;
  line-height: 1.7;
  font-weight: bold;
}

.line-link {
  display: inline-block;
  background: linear-gradient(180deg, #d9b86a 0%, #b08230 100%);
  color: #1a1208;
  padding: 14px 32px;
  border-radius: 2px;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.1em;
  transition: box-shadow 0.2s;
}
.line-link:hover { box-shadow: 0 0 20px rgba(216, 184, 106, 0.4); }

footer {
  margin-top: 60px;
  text-align: center;
  font-size: 11px;
  color: #5c5648;
  border-top: 1px solid var(--line);
  padding-top: 20px;
}
`
