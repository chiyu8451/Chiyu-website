'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../home/anim'
import PostCard from './PostCard'

type Post = {
  id: string; title?: string | null; slug?: string | null; excerpt?: string | null
  category?: string | null; author?: string | null; publishedAt?: string | null
  coverImage?: { url?: string | null } | null
}

const CATS = ['全部', '升學策略', '學習方法', '師資介紹', '品牌故事', '學科攻略']

export default function PostGrid({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState('全部')

  const filtered = cat === '全部' ? posts : posts.filter(p => p.category === cat)

  return (
    <>
      <section className="blog-hero-sec">
        <div className="wrap">
          <motion.div className="section-header"
            initial="hidden" animate="show" variants={stagger}>
            <motion.p className="eyebrow" variants={fadeUp}>文章專區</motion.p>
            <motion.h1 className="section-h2" variants={fadeUp}>
              升學策略 · 學習方法 · <span className="gold">教育觀點</span>
            </motion.h1>
            <motion.p className="section-sub" variants={fadeUp}>
              由創辦人整理自第一線教學與輔導的實戰知識
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="blog-list-sec">
        <div className="wrap">
          <div className="blog-cats">
            {CATS.map(c => (
              <button key={c}
                className={`filter-pill${cat === c ? ' active' : ''}`}
                onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          {posts.length === 0 ? (
            <motion.div className="blog-empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>文章籌備中，敬請期待。</p>
              <p style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.9rem' }}>
                創辦人的 Threads、IG、FB 文章即將陸續移入這裡。
              </p>
            </motion.div>
          ) : (
            <div className="posts-grid">
              {filtered.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  <PostCard post={p} />
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.6 }}>
                  此分類目前沒有文章
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
