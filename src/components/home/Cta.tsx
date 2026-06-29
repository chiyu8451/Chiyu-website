'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

type Benefit = { text?: string | null }

export default function Cta({
  heading,
  text,
  primaryCtaLabel,
  secondaryCtaLabel,
  benefits,
  formUrl,
  lineUrl,
}: {
  heading?: string | null
  text?: string | null
  primaryCtaLabel?: string | null
  secondaryCtaLabel?: string | null
  benefits?: Benefit[] | null
  formUrl: string
  lineUrl: string
}) {
  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <motion.div
          className="cta-in"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2 variants={fadeUp}>{heading}</motion.h2>
          <motion.p variants={fadeUp}>{text}</motion.p>
          <motion.div className="cta-btns" variants={fadeUp}>
            <a href={formUrl} className="btn-fill">
              {primaryCtaLabel}
              <i className="ti ti-arrow-right" />
            </a>
            <a href={lineUrl} className="btn-ghost">
              <i className="ti ti-brand-line" />
              {secondaryCtaLabel}
            </a>
          </motion.div>
          <motion.div className="cta-benefits" variants={fadeUp}>
            {(benefits || []).map((b, i) => (
              <div className="cta-benefit glass" key={i}>
                <i className="ti ti-check" />
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
