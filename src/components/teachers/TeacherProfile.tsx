'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../home/anim'
import FormModal from '../ui/FormModal'

type Teacher = {
  id: string; name?: string | null; slug?: string | null; school?: string | null
  subjects?: string[] | null; levels?: string[] | null; bio?: any
  experience?: string | null; featuredStat?: string | null; rating?: number | null
  reviewCount?: number | null; photo?: { url?: string | null } | null
}
type Testimonial = {
  id: string; parentName?: string | null; studentGrade?: string | null
  subject?: string | null; content?: string | null
  beforeScore?: number | null; afterScore?: number | null
}

export default function TeacherProfile({
  teacher: t, testimonials,
}: {
  teacher: Teacher; testimonials: Testimonial[]
}) {
  const [open, setOpen] = useState(false)
  const imgUrl = (t.photo as any)?.url || `https://picsum.photos/seed/teacher-${t.id}/600/700?grayscale`
  const rating = t.rating ?? 5

  return (
    <>
      {/* Hero */}
      <section className="teacher-hero">
        <div className="wrap">
          <div className="teacher-hero-grid">
            <motion.div className="teacher-hero-img"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <img src={imgUrl} alt={t.name || ''} />
              <div className="teacher-hero-img-overlay" />
            </motion.div>

            <motion.div className="teacher-hero-body"
              initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="teacher-hero-tags">
                  {(t.subjects || []).map(s => <span key={s} className="tag">{s}</span>)}
                  {(t.levels || []).map(l => <span key={l} className="tag tag-level">{l}</span>)}
                </div>
              </motion.div>
              <motion.h1 className="teacher-hero-name" variants={fadeUp}>{t.name}</motion.h1>
              <motion.p className="teacher-hero-school" variants={fadeUp}>{t.school}</motion.p>

              <motion.div className="teacher-hero-stats" variants={fadeUp}>
                <div className="teacher-stat">
                  <span className="teacher-stat-val gold">{'★'.repeat(Math.round(rating))}</span>
                  <span className="teacher-stat-lbl">{rating.toFixed(1)} ({t.reviewCount ?? 0} 則評價)</span>
                </div>
                {t.experience && (
                  <div className="teacher-stat">
                    <i className="ti ti-clock" />
                    <span className="teacher-stat-lbl">{t.experience}</span>
                  </div>
                )}
                {t.featuredStat && (
                  <div className="teacher-stat">
                    <i className="ti ti-trending-up" />
                    <span className="teacher-stat-lbl gold">{t.featuredStat}</span>
                  </div>
                )}
              </motion.div>

              <motion.button className="btn-fill" variants={fadeUp}
                onClick={() => setOpen(true)}>
                預約這位老師 →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio */}
      {t.bio && (
        <section className="teacher-bio-sec">
          <div className="wrap teacher-bio-wrap">
            <motion.h2 className="section-h2"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce} transition={{ duration: 0.6 }}>
              老師介紹
            </motion.h2>
            <motion.div className="teacher-bio-text"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce} transition={{ duration: 0.6, delay: 0.1 }}>
              <p>{typeof t.bio === 'string' ? t.bio : '詳細介紹即將更新。'}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="teacher-reviews-sec">
          <div className="wrap">
            <motion.h2 className="section-h2"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce} transition={{ duration: 0.6 }}>
              家長評語
            </motion.h2>
            <div className="reviews-grid">
              {testimonials.map((r, i) => (
                <motion.div key={r.id} className="review-card glass"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <p className="review-stars">★★★★★</p>
                  <p className="review-content">「{r.content}」</p>
                  {r.beforeScore != null && r.afterScore != null && (
                    <p className="review-score">
                      <span className="score-before">{r.beforeScore}</span>
                      <span className="score-arrow"> → </span>
                      <span className="score-after gold">{r.afterScore}</span>
                      <span> 分</span>
                    </p>
                  )}
                  <p className="review-meta">
                    {r.parentName}
                    {r.studentGrade && ` · ${r.studentGrade}`}
                    {r.subject && ` · ${r.subject}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FormModal open={open} onClose={() => setOpen(false)} formUrl="#" />
    </>
  )
}
