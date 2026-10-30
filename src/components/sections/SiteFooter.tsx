import { useRef, type KeyboardEvent } from 'react'
import { ArrowUpRight, Download, X } from 'lucide-react'
import wordmark from '../../assets/huble-wordmark.svg'
import './site-footer.css'

const copyrightYear = new Date().getFullYear()

const productLinks = [
  ['Time tracking', 'https://gethuble.com/features/time-tracking'],
  ['Activity & insights', 'https://gethuble.com/features/activity-and-insights'],
  ['Project management', 'https://gethuble.com/features/projects'],
  ['Timesheets', 'https://gethuble.com/features/timesheets'],
  ['Reports', 'https://gethuble.com/features/reports'],
  ['Finances', 'https://gethuble.com/features/finances'],
  ['People', 'https://gethuble.com/features/people'],
  ['Pricing', '#pricing'],
]
const downloads = [
  ['macOS', 'Apple Silicon', 'macos-silicon'],
  ['macOS', 'Intel', 'macos-intel'],
  ['Windows', 'Desktop app', 'windows'],
]
const legalLinks = [
  ['Privacy', 'https://gethuble.com/legal/privacy'],
  ['Terms', 'https://gethuble.com/legal/terms'],
  ['Refunds', 'https://gethuble.com/legal/refunds'],
  ['Sub-processors', 'https://gethuble.com/legal/sub-processors'],
  ['Status', 'https://status.gethuble.com/'],
]

export function SiteFooter() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cookieButtonRef = useRef<HTMLButtonElement>(null)

  function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return <footer className="site-footer">
    <div className="footer-shell">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="/" className="footer-home" aria-label="Huble home"><img src={wordmark} alt="Huble" /></a>
          <p>Honest time tracking<br />your team will actually use.</p>
          <a className="footer-status" href="https://status.gethuble.com/"><span aria-hidden="true" />System status<ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>

        <nav className="footer-column" aria-labelledby="footer-product-title"><h2 id="footer-product-title">Product</h2><ul>{productLinks.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></nav>
        <nav className="footer-column" aria-labelledby="footer-company-title"><h2 id="footer-company-title">Company</h2><ul><li><a href="https://gethuble.com/blog">Blog</a></li><li><a href="https://help.gethuble.com/">Help Center <ArrowUpRight size={13} aria-hidden="true" /></a></li></ul></nav>
        <nav className="footer-column footer-downloads" aria-labelledby="footer-download-title"><h2 id="footer-download-title">Take Huble with you</h2><ul>{downloads.map(([platform, description, path]) => <li key={path}><a href={`https://api.gethuble.com/desktop-downloads/${path}`} aria-label={`Download Huble for ${platform}${platform === 'macOS' ? ` ${description}` : ''}`}><div><span>{platform}</span><small>{description}</small></div><Download size={17} aria-hidden="true" /></a></li>)}</ul></nav>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal-row"><p>© {copyrightYear} Devntech LLC</p><nav aria-label="Legal and privacy"><ul>{legalLinks.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}<li><button ref={cookieButtonRef} type="button" onClick={() => dialogRef.current?.showModal()}>Cookie preferences</button></li></ul></nav></div>
        <div className="footer-compliance" aria-label="Compliance initiatives in progress"><span>SOC 2 <small>In progress</small></span><span>GDPR <small>In progress</small></span></div>
      </div>
    </div>

    <dialog ref={dialogRef} className="footer-cookie-dialog" aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description" onKeyDown={keepDialogFocus} onClose={() => cookieButtonRef.current?.focus()}>
      <button type="button" className="cookie-dialog-close" aria-label="Close cookie preferences" onClick={() => dialogRef.current?.close()}><X size={20} aria-hidden="true" /></button>
      <h2 id="cookie-dialog-title">Cookie preferences</h2>
      <p id="cookie-dialog-description">No optional cookies are active on this website.</p>
      <div className="cookie-category"><div><strong>Essential site functions</strong><p>Keep the website working as expected.</p></div><span>Always active</span></div>
      <div className="cookie-category"><div><strong>Analytics & advertising</strong><p>No optional tracking is installed.</p></div><span>Not used</span></div>
      <a className="cookie-policy" href="https://gethuble.com/legal/privacy">Read Huble’s privacy policy <ArrowUpRight size={15} aria-hidden="true" /></a>
      <button type="button" className="button button-primary cookie-dialog-done" onClick={() => dialogRef.current?.close()}>Done</button>
    </dialog>
  </footer>
}
