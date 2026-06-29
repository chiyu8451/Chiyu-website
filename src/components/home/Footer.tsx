export default function Footer({
  logoText,
  footerText,
}: {
  logoText?: string | null
  footerText?: string | null
}) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <div className="foot-logo">{logoText || '祈聿教育'}</div>
          <div className="foot-r">{footerText}</div>
        </div>
      </div>
    </footer>
  )
}
