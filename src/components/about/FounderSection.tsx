'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../home/anim'

const founders = [
  {
    name: '王祈 Samuel',
    role: '共同創辦人',
    school: '國立政治大學',
    photo: 'https://picsum.photos/seed/samuel/400/500?grayscale',
    bio: `從高中開始就熱衷於幫助同學突破學習瓶頸。就讀政大期間開始正式接家教，
    輔導過超過 15 位學生。在接觸越來越多學生的過程中，發現台灣的家教媒合市場
    缺乏透明度與品質保障，這成為創辦祈聿的最初動力。`,
  },
  {
    name: '施威聿 阿威',
    role: '共同創辦人',
    school: '國立台灣大學',
    photo: 'https://picsum.photos/seed/wei/400/500?grayscale',
    bio: `台大就讀期間擔任數學、物理家教超過 4 年，輔導學生從 50 分到滿分的經歷
    讓他深信：學不好不是學生的問題，而是找不到對的老師。施威聿負責平台的師資
    培訓體系，確保每位老師都能複製他的教學成效。`,
  },
]

export default function FounderSection() {
  return (
    <section className="founder-sec">
      <div className="wrap">
        <motion.div className="section-header"
          initial="hidden" whileInView="show" variants={stagger} viewport={viewportOnce}>
          <motion.p className="eyebrow" variants={fadeUp}>創辦團隊</motion.p>
          <motion.h2 className="section-h2" variants={fadeUp}>兩個都當過學生的老師</motion.h2>
        </motion.div>

        <div className="founders-grid">
          {founders.map((f, i) => (
            <motion.div key={f.name} className="founder-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <div className="founder-photo">
                <img src={f.photo} alt={f.name} />
                <div className="founder-photo-overlay" />
              </div>
              <div className="founder-info">
                <p className="eyebrow">{f.role}</p>
                <h3 className="founder-name">{f.name}</h3>
                <p className="founder-school">{f.school}</p>
                <p className="founder-bio">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
