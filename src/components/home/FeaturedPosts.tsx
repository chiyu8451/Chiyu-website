'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'

type Post = {
  id: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  author?: string | null
  publishedAt?: string | null
  coverImage?: { url?: string | null } | null
}

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="featured-posts-sec" id="blog">
      <div className="wrap">
        <motion.div className="section-header"
          initial="hidden" whileInView="show" variants={stagger} viewport={viewportOnce}>
          <motion.p className="eyebrow" variants={fadeUp}>文章專區</motion.p>
          <motion.h2 className="section-h2" variants={fadeUp}>
            升學策略 · 學習方法 · 教育觀點
          </motion.h2>
          <motion.p className="section-sub" variants={fadeUp}>
            由創辦人整理自多年教學與升學輔導的第一手知識
          </motion.p>
        </motion.div>

        <div className="posts-grid">
          {posts.map((p, i) => (
            <motion.article key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={`/blog/${p.slug}`} className="post-card glass">
                <div className="post-card-img">
                  <img
                    src={p.coverImage?.url || `https://picsum.photos/seed/post-${p.id}/800/450?grayscale`}
                    alt={p.title || ''}
                  />
                  {p.category && <span className="post-cat">{p.category}</span>}
                </div>
                <div className="post-card-body">
                  <h3 className="post-card-title">{p.title}</h3>
                  {p.excerpt && <p className="post-card-excerpt">{p.excerpt}</p>}
                  <div className="post-card-meta">
                    <span>{p.author}</span>
                    {p.publishedAt && (
                      <span>{new Date(p.publishedAt).toLocaleDateString('zh-TW')}</span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div className="section-cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <Link href="/blog" className="btn-ghost">
            前往文章專區 →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
