import type { Metadata } from 'next'
import AboutHero from '../../../components/about/AboutHero'
import FounderSection from '../../../components/about/FounderSection'
import MissionStatement from '../../../components/about/MissionStatement'
import ValuesGrid from '../../../components/about/ValuesGrid'
import AboutCta from '../../../components/about/AboutCta'
import Nav from '../../../components/home/Nav'
import Footer from '../../../components/home/Footer'

export const metadata: Metadata = {
  title: '關於我們 — 祈聿教育',
  description: '祈聿教育由王祈與施威聿共同創辦，嚴選台清交師資，幫助每個學生找到對的老師。了解我們的故事與教育理念。',
  openGraph: {
    title: '關於我們 — 祈聿教育',
    description: '從學生走向老師，我們懂那條路有多難走。了解祈聿教育的創辦故事。',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <Nav logoText="祈聿教育" navLinks={[
        { label: '首頁', anchor: '/' },
        { label: '師資陣容', anchor: '/teachers' },
        { label: '文章', anchor: '/blog' },
        { label: 'FAQ', anchor: '/faq' },
      ]} navCtaLabel="立即諮詢" />
      <main>
        <AboutHero />
        <FounderSection />
        <MissionStatement />
        <ValuesGrid />
        <AboutCta />
      </main>
      <Footer logoText="祈聿教育" footerText="© 2025 祈聿教育 · 嚴選頂大師資 · 讓每個孩子找到對的老師" />
    </>
  )
}
