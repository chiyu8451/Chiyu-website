'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../home/anim'

const values = [
  {
    icon: 'ti-certificate',
    title: '師資品質第一',
    desc: '嚴格的篩選流程確保每位老師不只學科夠強，更懂得如何教。我們寧可少幾位老師，也不要讓品質打折扣。',
  },
  {
    icon: 'ti-eye',
    title: '家長透明掌握',
    desc: '家長不應該只是付費後祈禱效果。我們透過每日進度追蹤，讓家長隨時了解孩子的學習狀況。',
  },
  {
    icon: 'ti-heart',
    title: '長期陪伴關係',
    desc: '我們不做一次性媒合。我們追求老師與學生建立長期信任關係，這才是真正能改變學習的力量。',
  },
]

export default function ValuesGrid() {
  return (
    <section className="values-sec">
      <div className="wrap">
        <motion.div className="section-header"
          initial="hidden" whileInView="show" variants={stagger} viewport={viewportOnce}>
          <motion.p className="eyebrow" variants={fadeUp}>核心價值</motion.p>
          <motion.h2 className="section-h2" variants={fadeUp}>我們相信的三件事</motion.h2>
        </motion.div>

        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div key={v.title} className="value-card glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <div className="value-icon">
                <i className={`ti ${v.icon}`} />
              </div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
