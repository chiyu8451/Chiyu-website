'use client'
import { motion } from 'framer-motion'
import Counter from './Counter'
import { fadeUp, stagger } from './anim'

type Stat = { number?: string | null; label?: string | null }

export default function Hero({
  badgeText,
  headingLine1,
  headingLine2,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  image,
  stats,
  formUrl,
}: {
  badgeText?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  subtitle?: string | null
  primaryCtaLabel?: string | null
  secondaryCtaLabel?: string | null
  image: string
  stats?: Stat[] | null
  formUrl: string
}) {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div className="hero-grid">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            {badgeText && (
              <motion.div className="hero-badge glass" variants={fadeUp}>
                <i className="ti ti-sparkles" />
                {badgeText}
              </motion.div>
            )}
            <motion.h1 className="hero-h1" variants={fadeUp}>
              {headingLine1}
              <br />
              <span className="gold">{headingLine2}</span>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>
              {subtitle}
            </motion.p>
            <motion.div className="hero-btns" variants={fadeUp}>
              <a href={formUrl} className="btn-fill">
                {primaryCtaLabel}
                <i className="ti ti-arrow-right" />
              </a>
              <a href="#why" className="btn-ghost">
                {secondaryCtaLabel}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-media"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-img">
              <img src={image} alt="祈聿教育課堂情境" />
            </div>
            {(stats || []).length > 0 && (
              <div className="hero-stats glass">
                {(stats || []).map((s, i) => (
                  <div className="stat" key={i}>
                    <div className="stat-num">
                      <Counter value={s.number || ''} />
                    </div>
                    <div className="stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
