'use client'
import { useScroll, motion } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--gold)',
        zIndex: 9999,
        boxShadow: '0 0 8px rgba(201,168,76,.6)',
      }}
    />
  )
}
