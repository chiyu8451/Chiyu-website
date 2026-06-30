import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Nav from '../../components/home/Nav'
import Hero from '../../components/home/Hero'
import WhyUs from '../../components/home/WhyUs'
import Process from '../../components/home/Process'
import Courses from '../../components/home/Courses'
import Teachers from '../../components/home/Teachers'
import Manifesto from '../../components/home/Manifesto'
import Testimonials from '../../components/home/Testimonials'
import FounderTeaser from '../../components/home/FounderTeaser'
import FeaturedPosts from '../../components/home/FeaturedPosts'
import Faq from '../../components/home/Faq'
import Cta from '../../components/home/Cta'
import Footer from '../../components/home/Footer'
import { NAV_LINKS } from '../../config/nav'

export const dynamic = 'force-dynamic'

function imgUrl(media: unknown, seed: string, w = 900, h = 1100): string {
  if (media && typeof media === 'object' && 'url' in media && (media as { url?: string }).url) {
    return (media as { url: string }).url
  }
  return `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [site, hero, manifesto, why, process, courses, teachers, faq, cta] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'hero', depth: 1 }),
    payload.findGlobal({ slug: 'manifesto', depth: 1 }),
    payload.findGlobal({ slug: 'why-us', depth: 1 }),
    payload.findGlobal({ slug: 'process', depth: 1 }),
    payload.findGlobal({ slug: 'courses', depth: 1 }),
    payload.findGlobal({ slug: 'teacher-screening', depth: 1 }),
    payload.findGlobal({ slug: 'faq', depth: 1 }),
    payload.findGlobal({ slug: 'cta', depth: 1 }),
  ])

  const [{ docs: featuredTestimonials }, { docs: recentPosts }] = await Promise.all([
    payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, sort: 'order', limit: 6 }),
    payload.find({ collection: 'posts', sort: '-publishedAt', limit: 3, depth: 1 }),
  ])

  const formUrl = site.googleFormUrl || '#'
  const lineUrl = site.lineUrl || '#'

  const courseCards = (courses.cards || []).map((c: any, i: number) => ({
    ...c,
    image: imgUrl(c.image, `qiyu-course-${i}`, 800, 500),
  }))

  return (
    <>
      <Nav logoText={site.logoText} navLinks={NAV_LINKS} navCtaLabel={site.navCtaLabel} formUrl={formUrl} />

      <Hero
        badgeText={hero.badgeText}
        headingLine1={hero.headingLine1}
        headingLine2={hero.headingLine2}
        subtitle={hero.subtitle}
        primaryCtaLabel={hero.primaryCtaLabel}
        secondaryCtaLabel={hero.secondaryCtaLabel}
        image={imgUrl(hero.image, 'qiyu-hero-study')}
        stats={hero.stats}
        formUrl={formUrl}
      />

      <WhyUs introHeading={why.introHeading} introText={why.introText} items={why.items} />

      <Process heading={process.heading} subtitle={process.subtitle} steps={process.steps} />

      <Courses heading={courses.heading} subtitle={courses.subtitle} cards={courseCards} />

      <Manifesto
        eyebrow={manifesto.eyebrow}
        line1={manifesto.line1}
        line2={manifesto.line2}
        subtext={manifesto.subtext}
        statNumber={manifesto.statNumber}
        statLabel={manifesto.statLabel}
      />

      <Teachers heading={teachers.heading} intro={teachers.intro} steps={teachers.steps} />

      <Testimonials items={featuredTestimonials as any[]} />

      <FounderTeaser />

      <FeaturedPosts posts={recentPosts as any[]} />

      <Faq heading={faq.heading} intro={faq.intro} items={faq.items} />

      <Cta
        heading={cta.heading}
        text={cta.text}
        primaryCtaLabel={cta.primaryCtaLabel}
        secondaryCtaLabel={cta.secondaryCtaLabel}
        benefits={cta.benefits}
        formUrl={formUrl}
        lineUrl={lineUrl}
      />

      <Footer logoText={site.logoText} footerText={site.footerText} />
    </>
  )
}
