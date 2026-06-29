'use client'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { fadeUp, stagger, viewportOnce } from './anim'

type Item = {
  label?: string | null
  icon?: string | null
  title?: string | null
  description?: string | null
}

export default function WhyUs({
  introHeading,
  introText,
  items,
}: {
  introHeading?: string | null
  introText?: string | null
  items?: Item[] | null
}) {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">為什麼選祈聿</span>
          <h2>{introHeading}</h2>
          <p>{introText}</p>
        </Reveal>

        <motion.div
          className="why-list"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {(items || []).map((item, i) => (
            <motion.div className="why-card glass" key={i} variants={fadeUp}>
              <div className="why-num">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="why-ico">
                  <i className={`ti ti-${item.icon || 'star'}`} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
