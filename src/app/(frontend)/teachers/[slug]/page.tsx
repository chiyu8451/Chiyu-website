import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Nav from '../../../../components/home/Nav'
import Footer from '../../../../components/home/Footer'
import TeacherProfile from '../../../../components/teachers/TeacherProfile'
import { NAV_LINKS } from '../../../../config/nav'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'teachers', where: { slug: { equals: slug } }, limit: 1,
  })
  const t = docs[0]
  if (!t) return {}
  return {
    title: `${t.name} 老師 — 祈聿教育師資`,
    description: `${t.school} ${t.experience || ''}。${t.featuredStat || ''}`,
    openGraph: {
      title: `${t.name} — 祈聿教育`,
      images: (t.photo as any)?.url ? [(t.photo as any).url] : [],
    },
  }
}

export default async function TeacherPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'teachers',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const teacher = docs[0]
  if (!teacher) notFound()

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: { teacher: { equals: teacher.id } },
    limit: 6,
  })

  return (
    <>
      <Nav logoText="祈聿教育" navLinks={NAV_LINKS} navCtaLabel="立即諮詢" />
      <main>
        <TeacherProfile teacher={teacher as any} testimonials={testimonials as any[]} />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
