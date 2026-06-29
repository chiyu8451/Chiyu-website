'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// 數字 count-up：純數字（含 +、%、人 等後綴）會動畫，無法解析則原樣顯示。
export default function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match || !inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1300
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      setN(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, match, target])

  return <span ref={ref}>{match ? `${n}${suffix}` : value}</span>
}
