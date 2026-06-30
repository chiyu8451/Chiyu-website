'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedText({
  text,
  className,
  delay = 0,
  tag: Tag = 'span',
}: {
  text: string
  className?: string
  delay?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  const chars = text.split('')

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}
      style={{ display: 'inline-block', overflow: 'hidden' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}
