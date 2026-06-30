'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

export default function FounderTeaser() {
  return (
    <section className="founder-teaser-sec">
      <div className="wrap">
        <div className="founder-teaser-grid">
          <motion.div className="founder-teaser-img"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <img
              src="https://picsum.photos/seed/founders/500/600?grayscale"
              alt="祈聿教育創辦人"
            />
            <div className="founder-img-overlay" />
          </motion.div>

          <motion.div className="founder-teaser-body"
            initial="hidden" whileInView="show" variants={stagger} viewport={viewportOnce}>
            <motion.p className="eyebrow" variants={fadeUp}>關於我們</motion.p>
            <motion.h2 className="section-h2" variants={fadeUp}>
              從學生走向老師，<br />
              <span className="gold">我們懂那條路有多難走</span>
            </motion.h2>
            <motion.p className="founder-teaser-text" variants={fadeUp}>
              祈聿教育由王祈與施威聿共同創辦。我們都曾是那個在深夜對著教科書發愁的高中生，
              也都找到了對的方法突破瓶頸——這段經歷讓我們相信，
              每個孩子都值得一位真正理解他的老師。
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/about" className="btn-fill">
                了解我們的故事 →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
