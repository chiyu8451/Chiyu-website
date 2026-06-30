import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://qiyu-edu.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/teachers`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date(), priority: 0.8 },
  ]

  try {
    const payload = await getPayload({ config: configPromise })
    const [{ docs: posts }, { docs: teachers }] = await Promise.all([
      payload.find({ collection: 'posts', limit: 200, select: { slug: true, publishedAt: true } }),
      payload.find({ collection: 'teachers', limit: 100, select: { slug: true } }),
    ])

    const postUrls: MetadataRoute.Sitemap = posts.map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt as string) : new Date(),
      priority: 0.7,
    }))
    const teacherUrls: MetadataRoute.Sitemap = teachers.map(t => ({
      url: `${BASE}/teachers/${t.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }))

    return [...static_, ...postUrls, ...teacherUrls]
  } catch {
    // DB not yet initialised (fresh deploy) — return static routes only
    return static_
  }
}
