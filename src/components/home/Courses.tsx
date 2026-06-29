'use client'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { fadeUp, stagger, viewportOnce } from './anim'

type Tag = { text?: string | null }
type Card = {
  label?: string | null
  title?: string | null
  description?: string | null
  featured?: boolean | null
  image: string
  tags?: Tag[] | null
}

export default function Courses({
  heading,
  subtitle,
  cards,
}: {
  heading?: string | null
  subtitle?: string | null
  cards?: Card[] | null
}) {
  return (
    <section className="section" id="courses">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">課程類型</span>
          <h2>{heading}</h2>
          <p>{subtitle}</p>
        </Reveal>

        <motion.div
          className="courses-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {(cards || []).map((card, i) => (
            <motion.div className={`course${card.featured ? ' feat' : ''}`} key={i} variants={fadeUp}>
              <div className="course-img">
                <span className="course-tag">{card.label}</span>
                <img src={card.image} alt={card.title || ''} />
              </div>
              <div className="course-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="tags">
                  {(card.tags || []).map((t, j) => (
                    <span className="tag" key={j}>
                      {t.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
