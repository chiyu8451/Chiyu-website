type NavLink = { label?: string | null; anchor?: string | null }

export default function Nav({
  logoText,
  navLinks,
  navCtaLabel,
}: {
  logoText?: string | null
  navLinks?: NavLink[] | null
  navCtaLabel?: string | null
}) {
  return (
    <nav className="nav">
      <div className="wrap">
        <div className="nav-pill glass">
          <div className="nav-l">
            <div className="logo">{logoText || '祈聿教育'}</div>
            <ul className="nav-links">
              {(navLinks || []).map((l, i) => (
                <li key={i}>
                  <a href={l.anchor || '#'}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <a href="#cta" className="nav-cta">
            {navCtaLabel || '立即諮詢'}
          </a>
        </div>
      </div>
    </nav>
  )
}
