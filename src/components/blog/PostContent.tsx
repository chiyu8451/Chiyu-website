'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { viewportOnce } from '../home/anim'
import ReadingProgress from '../ui/ReadingProgress'
import PostCard from './PostCard'

// Safe Lexical node renderer — no dangerouslySetInnerHTML, text is always escaped by React.
function LexicalNode({ node }: { node: any }): React.ReactNode {
  if (!node) return null
  switch (node.type) {
    case 'paragraph':
      return <p>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</p>
    case 'heading':
      return React.createElement(
        node.tag || 'h2',
        {},
        (node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />),
      )
    case 'list':
      return node.listType === 'number'
        ? <ol>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</ol>
        : <ul>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</ul>
    case 'listitem':
      return <li>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</li>
    case 'quote':
      return <blockquote>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</blockquote>
    case 'link':
      return (
        <a href={node.url || '#'} target={node.newTab ? '_blank' : undefined} rel="noopener noreferrer">
          {(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}
        </a>
      )
    case 'text': {
      let el: React.ReactNode = node.text || ''
      if (node.format & 1) el = <strong>{el}</strong>
      if (node.format & 2) el = <em>{el}</em>
      if (node.format & 8) el = <u>{el}</u>
      if (node.format & 16) el = <code>{el}</code>
      return el
    }
    case 'linebreak':
      return <br />
    default:
      if (node.children?.length)
        return <>{(node.children || []).map((c: any, i: number) => <LexicalNode key={i} node={c} />)}</>
      return null
  }
}

function LexicalContent({ nodes }: { nodes: any[] }) {
  return <>{(nodes || []).map((n, i) => <LexicalNode key={i} node={n} />)}</>
}

import React from 'react'

type Post = {
  id: string; title?: string | null; slug?: string | null; excerpt?: string | null
  content?: any; category?: string | null; author?: string | null
  publishedAt?: string | null; coverImage?: { url?: string | null } | null
}

function copyLink() {
  navigator.clipboard?.writeText(window.location.href)
    .catch(() => {})
}

export default function PostContent({
  post: p,
  related,
}: {
  post: Post
  related: Post[]
}) {
  const imgUrl = (p.coverImage as any)?.url
    || `https://picsum.photos/seed/post-${p.id}/1200/600?grayscale`

  return (
    <>
      <ReadingProgress />

      {/* Cover */}
      <motion.div className="post-cover"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <img src={imgUrl} alt={p.title || ''} />
        <div className="post-cover-overlay" />
      </motion.div>

      <div className="wrap post-wrap">
        {/* Breadcrumb */}
        <nav className="post-breadcrumb">
          <Link href="/">首頁</Link>
          <span>/</span>
          <Link href="/blog">文章</Link>
          <span>/</span>
          <span>{p.title}</span>
        </nav>

        <div className="post-layout">
          <article className="post-article">
            <motion.header className="post-header"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              {p.category && <span className="post-cat">{p.category}</span>}
              <h1 className="post-title">{p.title}</h1>
              <div className="post-header-meta">
                <span className="post-author">{p.author}</span>
                {p.publishedAt && (
                  <span className="post-date">
                    {new Date(p.publishedAt).toLocaleDateString('zh-TW', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </motion.header>

            <motion.div className="post-body"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}>
              {p.content
                ? <LexicalContent nodes={(p.content as any)?.root?.children ?? []} />
                : <p style={{ opacity: 0.6 }}>文章內容即將更新。</p>
              }
            </motion.div>

            {/* Share */}
            <div className="post-share">
              <span className="post-share-label">分享這篇文章</span>
              <div className="post-share-btns">
                <a
                  href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="share-btn share-line">
                  <i className="ti ti-brand-line" /> LINE
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="share-btn share-fb">
                  <i className="ti ti-brand-facebook" /> Facebook
                </a>
                <button className="share-btn share-copy" onClick={copyLink}>
                  <i className="ti ti-link" /> 複製連結
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="post-sidebar">
            <div className="post-sidebar-author glass">
              <p className="sidebar-label">關於作者</p>
              <h3 className="sidebar-author-name">{p.author}</h3>
              <p className="sidebar-author-desc">
                祈聿教育共同創辦人，致力於提升台灣家教品質。
              </p>
              <Link href="/about" className="btn-ghost" style={{ fontSize: '0.85rem' }}>
                了解更多 →
              </Link>
            </div>

            <div className="post-sidebar-cta glass">
              <p className="sidebar-label">需要一對一輔導？</p>
              <p>讓我們幫您媒合最合適的頂大老師。</p>
              <Link href="/#cta" className="btn-fill" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                免費諮詢 →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="post-related">
            <h2 className="section-h2" style={{ marginBottom: '2rem' }}>相關文章</h2>
            <div className="posts-grid">
              {related.map((r, i) => (
                <motion.div key={r.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <PostCard post={r} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
