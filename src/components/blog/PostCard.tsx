'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Post = {
  id: string; title?: string | null; slug?: string | null; excerpt?: string | null
  category?: string | null; author?: string | null; publishedAt?: string | null
  coverImage?: { url?: string | null } | null
}

function readingTime(excerpt?: string | null) {
  const words = (excerpt || '').length
  return Math.max(1, Math.ceil(words / 200))
}

export default function PostCard({ post: p }: { post: Post }) {
  const imgUrl = (p.coverImage as any)?.url
    || `https://picsum.photos/seed/post-${p.id}/800/450?grayscale`

  return (
    <motion.article whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Link href={`/blog/${p.slug}`} className="post-card glass">
        <div className="post-card-img">
          <img src={imgUrl} alt={p.title || ''} />
          {p.category && <span className="post-cat">{p.category}</span>}
        </div>
        <div className="post-card-body">
          <h2 className="post-card-title">{p.title}</h2>
          {p.excerpt && <p className="post-card-excerpt">{p.excerpt}</p>}
          <div className="post-card-meta">
            <span>{p.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {p.publishedAt && (
                <span>{new Date(p.publishedAt).toLocaleDateString('zh-TW')}</span>
              )}
              <span>· {readingTime(p.excerpt)} 分鐘閱讀</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
