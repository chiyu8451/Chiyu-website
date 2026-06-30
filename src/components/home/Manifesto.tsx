'use client'
import { motion } from 'framer-motion'
import Counter from './Counter'
import { fadeUp, stagger, viewportOnce } from './anim'

export default function Manifesto({
  eyebrow,
  line1,
  line2,
  subtext,
  statNumber,
  statLabel,
}: {
  eyebrow?: string | null
  line1?: string | null
  line2?: string | null
  subtext?: string | null
  statNumber?: string | null
  statLabel?: string | null
}) {
  return (
    <section className="manifesto-sec">
      <div className="manifesto-glow" />
      <div className="wrap">
        <motion.div className="manifesto-grid"
          initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger}>
          <div className="manifesto-main">
            {eyebrow && <motion.p className="manifesto-eyebrow" variants={fadeUp}>{eyebrow}</motion.p>}
            <motion.h2 className="manifesto-h" variants={fadeUp}>
              {line1}
              <br />
              <span className="manifesto-gold">{line2}</span>
            </motion.h2>
            {subtext && <motion.p className="manifesto-sub" variants={fadeUp}>{subtext}</motion.p>}
          </div>

          {statNumber && (
            <motion.div className="manifesto-stat" variants={fadeUp}>
              <div className="manifesto-stat-num">
                <Counter value={statNumber} />
              </div>
              {statLabel && <div className="manifesto-stat-lbl">{statLabel}</div>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
