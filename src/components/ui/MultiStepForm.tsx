'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SUBJECTS = ['數學', '英文', '物理', '化學', '生物', '國文', '其他']
const LEVELS = ['國中', '高中']
const GOALS = ['基礎補強', '會考衝刺', '學測衝刺', '分科測驗', '進階資優']

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

type FormData = {
  subjects: string[]
  level: string
  goal: string
  name: string
  contact: string
  note: string
}

export default function MultiStepForm({
  formUrl,
  onClose,
}: {
  formUrl: string
  onClose?: () => void
}) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState<FormData>({
    subjects: [], level: '', goal: '', name: '', contact: '', note: '',
  })

  const STEPS = 3

  function go(n: number) {
    setDir(n > step ? 1 : -1)
    setStep(n)
  }

  function toggleSubject(s: string) {
    setData(d => ({
      ...d,
      subjects: d.subjects.includes(s)
        ? d.subjects.filter(x => x !== s)
        : [...d.subjects, s],
    }))
  }

  async function submit() {
    setSubmitting(true)
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (_) {
      // silent — still show thank you
    }
    setSubmitting(false)
    setDone(true)
  }

  if (done) {
    return (
      <motion.div
        className="msf-done"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="msf-done-icon">🎉</div>
        <h3>感謝您的諮詢！</h3>
        <p>我們會在 24 小時內主動聯繫您，幫您媒合最合適的老師。</p>
        {onClose && (
          <button className="btn-fill" onClick={onClose} style={{ marginTop: '1.5rem' }}>
            關閉
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <div className="msf">
      {/* Progress */}
      <div className="msf-progress">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className={`msf-dot${step >= i ? ' active' : ''}`} />
        ))}
        <div className="msf-bar">
          <motion.div
            className="msf-bar-fill"
            animate={{ width: `${((step + 1) / STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <span className="msf-step-label">{step + 1} / {STEPS}</span>
      </div>

      <div className="msf-body" style={{ overflow: 'hidden', position: 'relative', minHeight: 220 }}>
        <AnimatePresence custom={dir} mode="wait">
          {step === 0 && (
            <motion.div key="s0" custom={dir} variants={slide}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', width: '100%' }}>
              <p className="msf-q">想加強哪個科目？<span className="msf-hint">（可複選）</span></p>
              <div className="msf-pills">
                {SUBJECTS.map(s => (
                  <button key={s}
                    className={`msf-pill${data.subjects.includes(s) ? ' selected' : ''}`}
                    onClick={() => toggleSubject(s)}>{s}</button>
                ))}
              </div>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="s1" custom={dir} variants={slide}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', width: '100%' }}>
              <p className="msf-q">目前就讀？</p>
              <div className="msf-pills">
                {LEVELS.map(l => (
                  <button key={l}
                    className={`msf-pill${data.level === l ? ' selected' : ''}`}
                    onClick={() => setData(d => ({ ...d, level: l }))}>{l}</button>
                ))}
              </div>
              <p className="msf-q" style={{ marginTop: '1.25rem' }}>主要目標？</p>
              <div className="msf-pills">
                {GOALS.map(g => (
                  <button key={g}
                    className={`msf-pill${data.goal === g ? ' selected' : ''}`}
                    onClick={() => setData(d => ({ ...d, goal: g }))}>{g}</button>
                ))}
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" custom={dir} variants={slide}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', width: '100%' }}>
              <p className="msf-q">最後一步！留下聯絡方式</p>
              <input className="msf-input" placeholder="您的姓名" value={data.name}
                onChange={e => setData(d => ({ ...d, name: e.target.value }))} />
              <input className="msf-input" placeholder="LINE ID 或手機號碼" value={data.contact}
                onChange={e => setData(d => ({ ...d, contact: e.target.value }))} />
              <textarea className="msf-input msf-textarea" placeholder="備注（選填）"
                value={data.note}
                onChange={e => setData(d => ({ ...d, note: e.target.value }))} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="msf-nav">
        {step > 0 && (
          <button className="btn-ghost msf-back" onClick={() => go(step - 1)}>
            ← 上一步
          </button>
        )}
        {step < STEPS - 1 && (
          <button className="btn-fill msf-next"
            disabled={step === 0 && data.subjects.length === 0}
            onClick={() => go(step + 1)}>
            下一步 →
          </button>
        )}
        {step === STEPS - 1 && (
          <button className="btn-fill msf-submit"
            disabled={!data.name || !data.contact || submitting}
            onClick={submit}>
            {submitting ? '送出中…' : '幫我媒合最適合的老師 →'}
          </button>
        )}
      </div>
    </div>
  )
}
