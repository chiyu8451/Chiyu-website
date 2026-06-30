'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// 數字 count-up：純數字（含 +、%、人 等後綴）會動畫，無法解析則原樣顯示。
export default function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const hasMatch = !!match
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  // 注意：依賴只能放 primitive（hasMatch / target / reduce）。
  // 若把 match 陣列放進依賴，每次 setN 重繪都會產生新參考，effect 會每幀重啟、
  // start 時間不斷重置，導致數字永遠跑不到目標、一直跳動（原本的 bug）。
  useEffect(() => {
    if (!hasMatch || !inView) return
    // 尊重「減少動態」偏好：直接顯示最終數字，不跑動畫。
    if (reduce) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1300
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setN(target) // 收尾：確保最後精準停在目標數字
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, hasMatch, target, reduce])

  return <span ref={ref}>{hasMatch ? `${n}${suffix}` : value}</span>
}
