'use client'
import { motion } from 'framer-motion'
import { viewportOnce } from '../home/anim'

export default function MissionStatement() {
  return (
    <section className="mission-sec">
      <div className="mission-bg" />
      <div className="wrap">
        <motion.blockquote className="mission-quote"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className="mission-mark gold">"</span>
          <p className="mission-text">
            學習從來不是一個人的事。<br />
            我們的使命，是讓每個孩子<br />
            <em>都有機會遇到改變他人生的那位老師。</em>
          </p>
          <span className="mission-mark gold right">"</span>
        </motion.blockquote>
      </div>
    </section>
  )
}
