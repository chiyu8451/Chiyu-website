'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

type Testimonial = {
  id: string
  parentName?: string | null
  studentGrade?: string | null
  subject?: string | null
  content?: string | null
  beforeScore?: number | null
  afterScore?: number | null
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  if (!items || items.length === 0) return null

  return (
    <section className="testimonials-sec" id="testimonials">
      <div className="wrap">
        <motion.div className="section-header" ref={ref}
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>家長怎麼說</motion.p>
          <motion.h2 className="section-h2" variants={fadeUp}>
            真實回饋，讓數字說話
          </motion.h2>
        </motion.div>

        <motion.div
          className="testimonials-track"
          drag="x"
          dragConstraints={ref}
          whileTap={{ cursor: 'grabbing' }}
          style={{ cursor: 'grab' }}
        >
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              className="tcard glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="tcard-stars">{'★'.repeat(5)}</div>
              <p className="tcard-content">「{t.content}」</p>

              {t.beforeScore != null && t.afterScore != null && (
                <div className="tcard-score">
                  <span className="score-before">{t.beforeScore}</span>
                  <span className="score-arrow">→</span>
                  <span className="score-after">{t.afterScore}</span>
                  <span className="score-label">分</span>
                </div>
              )}

              <div className="tcard-meta">
                <span className="tcard-name">{t.parentName}</span>
                {(t.studentGrade || t.subject) && (
                  <span className="tcard-info">
                    {[t.studentGrade, t.subject].filter(Boolean).join(' · ')}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
