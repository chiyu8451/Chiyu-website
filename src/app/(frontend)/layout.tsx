import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import JsonLd from '../../components/ui/JsonLd'
import LivePreview from '../../components/LivePreview'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://qiyu-edu.com'

export const metadata: Metadata = {
  title: {
    default: '祈聿教育｜台清交師資一對一家教 · 國高中全學科',
    template: '%s — 祈聿教育',
  },
  description:
    '嚴選台清交頂大師資，一對一量身訂製課程，每日追蹤孩子的讀書狀況，讓家長安心掌握每一步進度。提供國中會考、高中學測、分科測驗全科輔導。',
  metadataBase: new URL(BASE),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: '祈聿教育',
    title: '祈聿教育｜台清交師資一對一家教',
    description: '嚴選台清交頂大師資，每日追蹤學習進度，讓家長安心掌握每一步。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '祈聿教育｜台清交師資一對一家教',
    description: '嚴選台清交頂大師資，每日追蹤學習進度，讓家長安心掌握每一步。',
  },
  robots: { index: true, follow: true },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: '祈聿教育',
  url: BASE,
  description: '嚴選台清交頂大師資，提供國高中一對一線上家教，每日追蹤學習進度。',
  areaServed: { '@type': 'Country', name: 'Taiwan' },
  serviceType: '一對一線上家教',
  knowsAbout: ['國中會考', '高中學測', '分科測驗', '數學', '英文', '物理', '化學'],
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        <JsonLd data={orgSchema} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Noto+Serif+TC:wght@500;600;700;900&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        <LivePreview />
        {children}
      </body>
    </html>
  )
}
