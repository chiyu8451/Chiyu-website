import type { Variants } from 'framer-motion'

// 進場：淡入 + 上移。所有區段共用，維持一致的節奏感。
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// 容器：讓子元素依序進場（stagger）。
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

// whileInView 共用設定：只觸發一次，提前一點進場。
export const viewportOnce = { once: true, margin: '-80px' } as const
