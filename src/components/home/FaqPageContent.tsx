'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from './anim'
import Link from 'next/link'

type FaqItem = { id?: string | null; question?: string | null; answer?: string | null; category?: string | null }

const CATS = ['全部', '費用', '師資', '流程', '課後服務']

export default function FaqPageContent({
  heading, intro, items,
}: {
  heading?: string | null
  intro?: string | null
  items?: FaqItem[] | null
}) {
  const [open, setOpen] = useState<string | null>(null)
  const [cat, setCat] = useState('全部')

  const allItems = items || []
  const filtered = cat === '全部' ? allItems : allItems.filter(i => i.category === cat)

  return (
    <>
      <section className="faq-hero-sec">
        <div className="wrap">
          <motion.div className="section-header"
            initial="hidden" animate="show" variants={stagger}>
            <motion.p className="eyebrow" variants={fadeUp}>FAQ</motion.p>
            <motion.h1 className="section-h2" variants={fadeUp}>
              {heading || '常見問題'}
            </motion.h1>
            {intro && (
              <motion.p className="section-sub" variants={fadeUp}>{intro}</motion.p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="faq-page-sec">
        <div className="wrap">
          <div className="faq-page-layout">
            <div className="faq-page-list">
              {/* Category filter */}
              <div className="blog-cats" style={{ marginBottom: '2rem' }}>
                {CATS.map(c => (
                  <button key={c}
                    className={`filter-pill${cat === c ? ' active' : ''}`}
                    onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>

              {filtered.map((item, i) => {
                const key = item.id || String(i)
                const isOpen = open === key
                return (
                  <motion.div key={key} className="faq-item glass"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}>
                    <button
                      className={`faq-q${isOpen ? ' open' : ''}`}
                      onClick={() => setOpen(isOpen ? null : key)}>
                      <span>{item.question}</span>
                      <motion.i
                        className="ti ti-chevron-down"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div className="faq-a"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                          <p>{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            <aside className="faq-page-aside">
              <div className="faq-aside-box glass">
                <i className="ti ti-message-circle faq-aside-icon" />
                <h3>還有問題嗎？</h3>
                <p>直接聯繫我們，我們會在 24 小時內回覆。</p>
                <Link href="/#cta" className="btn-fill" style={{ marginTop: '1rem' }}>
                  LINE 聯繫我們
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
