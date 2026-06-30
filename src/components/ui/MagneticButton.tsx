'use client'
import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 0.4,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { damping: 15, stiffness: 150 })
  const y = useSpring(0, { damping: 15, stiffness: 150 })
  const [active, setActive] = useState(false)

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
    setActive(true)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    setActive(false)
  }

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ scale: active ? 1.04 : 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {href ? (
        <a href={href} className={className}>{children}</a>
      ) : (
        <button type="button" className={className} onClick={onClick}>{children}</button>
      )}
    </motion.div>
  )

  return inner
}
