'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

type Step = { title?: string | null; description?: string | null }

export default function Process({
  heading,
  subtitle,
  steps,
}: {
  heading?: string | null
  subtitle?: string | null
  steps?: Step[] | null
}) {
  return (
    <section className="section alt" id="process">
      <div className="wrap">
        <div className="process-grid">
          <motion.div
            className="process-sticky"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <span className="eyebrow">服務流程</span>
            <h2>{heading}</h2>
            <p>{subtitle}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {(steps || []).map((step, i) => (
              <motion.div className="pstep" key={i} variants={fadeUp}>
                <div className="pstep-n">{i + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
