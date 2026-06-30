import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../../components/home/Nav'
import Footer from '../../../../components/home/Footer'
import PostContent from '../../../../components/blog/PostContent'
import JsonLd from '../../../../components/ui/JsonLd'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'posts', where: { slug: { equals: slug } }, limit: 1,
  })
  const p = docs[0]
  if (!p) return {}
  const seo = p.seo as any
  return {
    title: seo?.title || `${p.title} — 祈聿教育`,
    description: seo?.description || (p.excerpt as string),
    openGraph: {
      title: p.title as string,
      description: p.excerpt as string,
      type: 'article',
      publishedTime: p.publishedAt as string,
      images: (p.coverImage as any)?.url ? [(p.coverImage as any).url] : [],
    },
  }
}

const NAV_LINKS = [
  { label: '首頁', anchor: '/' },
  { label: '師資陣容', anchor: '/teachers' },
  { label: '文章', anchor: '/blog' },
  { label: 'FAQ', anchor: '/faq' },
]

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const post = docs[0]
  if (!post) notFound()

  const { docs: related } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { category: { equals: post.category } },
        { slug: { not_equals: slug } },
      ],
    },
    limit: 3,
    sort: '-publishedAt',
  })

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: '祈聿教育',
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'https://qiyu-edu.com',
    },
    datePublished: post.publishedAt,
    image: (post.coverImage as any)?.url,
  }

  return (
    <>
      <JsonLd data={schemaData} />
      <Nav logoText="祈聿教育" navLinks={NAV_LINKS} navCtaLabel="立即諮詢" />
      <main>
        <PostContent post={post as any} related={related as any[]} />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
