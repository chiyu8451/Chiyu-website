import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Nav from '../../../components/home/Nav'
import Footer from '../../../components/home/Footer'
import FaqPageContent from '../../../components/home/FaqPageContent'
import JsonLd from '../../../components/ui/JsonLd'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FAQ 常見問題 — 祈聿教育',
  description: '費用多少？老師哪裡來？試教不滿意怎麼辦？課後有什麼服務？祈聿教育常見問題一次解答。',
  openGraph: {
    title: '常見問題 — 祈聿教育',
    description: '家長最常問的問題，這裡都有解答。',
  },
}

const NAV_LINKS = [
  { label: '首頁', anchor: '/' },
  { label: '師資陣容', anchor: '/teachers' },
  { label: '文章', anchor: '/blog' },
  { label: 'FAQ', anchor: '/faq' },
]

export default async function FaqPage() {
  const payload = await getPayload({ config: configPromise })
  const faq = await payload.findGlobal({ slug: 'faq', depth: 1 })

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faq.items || []).map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <JsonLd data={schemaData} />
      <Nav logoText="祈聿教育" navLinks={NAV_LINKS} navCtaLabel="立即諮詢" />
      <main>
        <FaqPageContent heading={faq.heading} intro={faq.intro} items={faq.items} />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
