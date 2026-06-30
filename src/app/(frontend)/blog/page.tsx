import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Nav from '../../../components/home/Nav'
import Footer from '../../../components/home/Footer'
import PostGrid from '../../../components/blog/PostGrid'
import { NAV_LINKS } from '../../../config/nav'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '文章專區 — 祈聿教育',
  description: '升學策略、學習方法、師資介紹——由創辦人整理的第一手教育知識，幫助家長和學生做出更好的學習決策。',
  openGraph: {
    title: '文章專區 — 祈聿教育',
    description: '升學策略、學習方法、師資介紹，第一手教育知識。',
    type: 'website',
  },
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 30,
    depth: 1,
  })

  return (
    <>
      <Nav logoText="祈聿教育" navLinks={NAV_LINKS} navCtaLabel="立即諮詢" />
      <main>
        <PostGrid posts={posts as any[]} />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
