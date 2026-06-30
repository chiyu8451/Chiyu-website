'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import FormModal from '../ui/FormModal'

type NavLink = { label?: string | null; anchor?: string | null }

// Full-URL links (starting with /) use Next.js Link for client navigation;
// anchor links (starting with #) stay as <a> for same-page scrolling.
function NavAnchor({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  const cls = active ? 'nav-active' : undefined
  if (href.startsWith('/')) {
    return <Link href={href} className={cls}>{children}</Link>
  }
  return <a href={href} className={cls}>{children}</a>
}

export default function Nav({
  logoText,
  navLinks,
  navCtaLabel,
  formUrl,
}: {
  logoText?: string | null
  navLinks?: NavLink[] | null
  navCtaLabel?: string | null
  formUrl?: string
}) {
  const pathname = usePathname()
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <div className="nav-pill glass">
            <div className="nav-l">
              <Link href="/" className="logo">{logoText || '祈聿教育'}</Link>
              <ul className="nav-links">
                {(navLinks || []).map((l, i) => {
                  const href = l.anchor || '#'
                  const isActive = href.startsWith('/') && pathname === href
                  return (
                    <li key={i}>
                      <NavAnchor href={href} active={isActive}>{l.label}</NavAnchor>
                    </li>
                  )
                })}
              </ul>
            </div>
            <button className="nav-cta" onClick={() => setFormOpen(true)}>
              {navCtaLabel || '立即諮詢'}
            </button>
          </div>
        </div>
      </nav>
      <FormModal open={formOpen} onClose={() => setFormOpen(false)} formUrl={formUrl || '#'} />
    </>
  )
}
