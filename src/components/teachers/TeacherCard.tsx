'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

export default function TeacherCard({ teacher: t }: { teacher: Teacher }) {
  const imgUrl = t.photo?.url || `https://picsum.photos/seed/teacher-${t.id}/400/480?grayscale`
  const rating = t.rating ?? 5
  const stars = Math.round(rating)

  return (
    <motion.article className="teacher-card glass"
      whileHover={{ y: -6, transition: { duration: 0.2 } }}>
      <div className="teacher-card-img">
        <img src={imgUrl} alt={t.name || ''} />
        <div className="teacher-card-img-overlay" />
      </div>
      <div className="teacher-card-body">
        <div className="teacher-card-top">
          <div>
            <h3 className="teacher-card-name">{t.name}</h3>
            <p className="teacher-card-school">{t.school}</p>
          </div>
          <div className="teacher-card-rating">
            <span className="rating-stars">{'★'.repeat(stars)}</span>
            <span className="rating-count">({t.reviewCount ?? 0})</span>
          </div>
        </div>

        {(t.subjects || []).length > 0 && (
          <div className="teacher-card-tags">
            {(t.subjects || []).slice(0, 4).map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        )}

        {t.experience && (
          <p className="teacher-card-exp">{t.experience}</p>
        )}

        {t.featuredStat && (
          <p className="teacher-card-stat gold">{t.featuredStat}</p>
        )}

        <Link href={`/teachers/${t.slug}`} className="btn-ghost teacher-card-btn">
          查看詳細資料 →
        </Link>
      </div>
    </motion.article>
  )
}
