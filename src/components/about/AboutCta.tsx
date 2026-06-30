'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { viewportOnce } from '../home/anim'
import FormModal from '../ui/FormModal'

export default function AboutCta() {
  const [open, setOpen] = useState(false)
  return (
    <section className="about-cta-sec">
      <div className="wrap">
        <motion.div className="about-cta glass"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="about-cta-h">想讓孩子找到對的老師？</h2>
          <p className="about-cta-sub">第一堂試教課免費，不滿意可立即更換老師。</p>
          <button className="btn-fill" onClick={() => setOpen(true)}>
            免費諮詢 · 媒合師資 →
          </button>
        </motion.div>
      </div>
      <FormModal open={open} onClose={() => setOpen(false)} formUrl="#" />
    </section>
  )
}
