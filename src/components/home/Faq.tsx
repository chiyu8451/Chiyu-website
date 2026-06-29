'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'

type Item = { question?: string | null; answer?: string | null }

export default function Faq({
  heading,
  intro,
  items,
}: {
  heading?: string | null
  intro?: string | null
  items?: Item[] | null
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <Reveal className="faq-sticky">
            <span className="eyebrow">常見問題</span>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </Reveal>

          <div>
            {(items || []).map((item, i) => {
              const isOpen = open === i
              return (
                <div className="faq-item" key={i}>
                  <button
                    className={`faq-q${isOpen ? ' on' : ''}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    {item.question}
                    <i className="ti ti-plus" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="faq-a-in">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
