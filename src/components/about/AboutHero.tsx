'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../home/anim'

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-bg" />
      <div className="wrap">
        <motion.div className="about-hero-body"
          initial="hidden" animate="show" variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>關於祈聿教育</motion.p>
          <motion.h1 className="about-hero-h1" variants={fadeUp}>
            為什麼我們<br />
            <span className="gold">創辦祈聿</span>
          </motion.h1>
          <motion.p className="about-hero-sub" variants={fadeUp}>
            每個學生都值得一位真正懂他的老師
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
