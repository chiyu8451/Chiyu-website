'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../home/anim'
import TeacherCard from './TeacherCard'

type Teacher = {
  id: string
  name?: string | null
  slug?: string | null
  school?: string | null
  subjects?: string[] | null
  levels?: string[] | null
  experience?: string | null
  featuredStat?: string | null
  rating?: number | null
  reviewCount?: number | null
  photo?: { url?: string | null } | null
}

const ALL = '全部'
const SUBJECT_FILTERS = [ALL, '數學', '英文', '物理', '化學', '生物', '國文']
const LEVEL_FILTERS = [ALL, '國中', '高中']

export default function TeacherGrid({ teachers }: { teachers: Teacher[] }) {
  const [subjectFilter, setSubjectFilter] = useState(ALL)
  const [levelFilter, setLevelFilter] = useState(ALL)

  const filtered = teachers.filter(t => {
    const subjOk = subjectFilter === ALL || (t.subjects || []).includes(subjectFilter)
    const levelOk = levelFilter === ALL || (t.levels || []).includes(levelFilter)
    return subjOk && levelOk
  })

  const isEmpty = teachers.length === 0

  return (
    <>
      <section className="teachers-hero-sec">
        <div className="wrap">
          <motion.div className="section-header"
            initial="hidden" animate="show" variants={stagger}>
            <motion.p className="eyebrow" variants={fadeUp}>師資陣容</motion.p>
            <motion.h1 className="section-h2" variants={fadeUp}>
              每位老師，都是<span className="gold">嚴選的結果</span>
            </motion.h1>
            <motion.p className="section-sub" variants={fadeUp}>
              通過學科測驗、教學面試與完整培訓，才能成為祈聿的老師
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="teachers-list-sec">
        <div className="wrap">
          {/* Filters */}
          <div className="teachers-filters">
            <div className="filter-group">
              <span className="filter-label">科目</span>
              <div className="filter-pills">
                {SUBJECT_FILTERS.map(f => (
                  <button key={f}
                    className={`filter-pill${subjectFilter === f ? ' active' : ''}`}
                    onClick={() => setSubjectFilter(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <span className="filter-label">年級</span>
              <div className="filter-pills">
                {LEVEL_FILTERS.map(f => (
                  <button key={f}
                    className={`filter-pill${levelFilter === f ? ' active' : ''}`}
                    onClick={() => setLevelFilter(f)}>{f}</button>
                ))}
              </div>
            </div>
          </div>

          {isEmpty ? (
            <motion.div className="teachers-empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>師資陣容建置中，請先透過諮詢了解我們的老師。</p>
            </motion.div>
          ) : (
            <div className="teachers-grid">
              {filtered.map((t, i) => (
                <motion.div key={t.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  <TeacherCard teacher={t} />
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p className="teachers-no-match">目前沒有符合條件的老師，試試其他篩選條件。</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
