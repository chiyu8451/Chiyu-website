'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

type Step = { icon?: string | null; title?: string | null; description?: string | null }

export default function Teachers({
  heading,
  intro,
  steps,
}: {
  heading?: string | null
  intro?: string | null
  steps?: Step[] | null
}) {
  return (
    <section className="section alt" id="teachers">
      <div className="wrap">
        <motion.div
          className="teach-head"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2>{heading}</h2>
          <p>{intro}</p>
        </motion.div>

        <motion.div
          className="tgrid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {(steps || []).map((step, i) => (
            <motion.div className="tcard glass" key={i} variants={fadeUp}>
              <div className="tcard-ico">
                <i className={`ti ti-${step.icon || 'check'}`} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
