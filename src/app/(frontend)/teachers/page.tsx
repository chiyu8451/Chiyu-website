import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Nav from '../../../components/home/Nav'
import Footer from '../../../components/home/Footer'
import TeacherGrid from '../../../components/teachers/TeacherGrid'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '師資陣容 — 祈聿教育',
  description: '所有老師來自台清交等頂尖大學，通過學科測驗、教學面試與 10 小時培訓。查看所有師資，找到最適合孩子的老師。',
  openGraph: {
    title: '師資陣容 — 祈聿教育｜台清交頂大嚴選',
    description: '查看所有師資，每位老師均通過嚴格篩選。',
    type: 'website',
  },
}

export default async function TeachersPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: teachers } = await payload.find({
    collection: 'teachers',
    sort: 'order',
    limit: 50,
  })

  return (
    <>
      <Nav logoText="祈聿教育" navLinks={[
        { label: '首頁', anchor: '/' },
        { label: '師資陣容', anchor: '/teachers' },
        { label: '文章', anchor: '/blog' },
        { label: 'FAQ', anchor: '/faq' },
      ]} navCtaLabel="立即諮詢" />
      <main>
        <TeacherGrid teachers={teachers as any[]} />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
