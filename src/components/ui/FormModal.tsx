'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import MultiStepForm from './MultiStepForm'

export default function FormModal({
  open,
  onClose,
  formUrl,
}: {
  open: boolean
  onClose: () => void
  formUrl: string
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-overlay" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}>
          <motion.div className="modal-box glass" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <button className="modal-close" onClick={onClose} aria-label="關閉">✕</button>
            <h2 className="modal-title">免費諮詢 · 媒合師資</h2>
            <MultiStepForm formUrl={formUrl} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
