import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download, Menu, X } from 'lucide-react'
import icon from '../../assets/huble-icon.png'
import wordmark from '../../assets/huble-wordmark.svg'

const products = [
  ['Time tracking', 'time-tracking'],
  ['Activity & insights', 'activity-and-insights'],
  ['Projects', 'projects'],
  ['Timesheets', 'timesheets'],
  ['Reports', 'reports'],
  ['Finances', 'finances'],
  ['People', 'people'],
]
const downloads = [
  ['macOS · Apple Silicon', 'macos-silicon'],
  ['macOS · Intel', 'macos-intel'],
  ['Windows', 'windows'],
]
export const signupUrl = 'https://app.gethuble.com/auth?authType=signup'

export function SiteHeader() {
  const [open, setOpen] = useState<'product' | 'download' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        header.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus()
        setOpen(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [])

  const productLinks = products.map(([name, path]) => (
    <a key={path} href={`https://gethuble.com/features/${path}`}>{name}</a>
  ))
  const downloadLinks = downloads.map(([name, path]) => (
    <a key={path} href={`https://api.gethuble.com/desktop-downloads/${path}`}>{name}</a>
  ))

  return (
    <header className="site-header" ref={header}>
      <div className="nav-shell">
        <a className="brand" href="/" aria-label="Huble home">
          <span className="brand-icon"><img src={icon} alt="" /></span>
          <img className="brand-wordmark" src={wordmark} alt="Huble" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="dropdown">
            <button className="nav-link product-trigger" aria-expanded={open === 'product'} aria-controls="product-links" onClick={() => setOpen(open === 'product' ? null : 'product')}>
              Product <ChevronDown size={11} strokeWidth={3} />
            </button>
            {open === 'product' && <div className="dropdown-panel" id="product-links">{productLinks}</div>}
          </div>
          <a className="nav-link" href="#pricing">Pricing</a>
        </nav>
        <div className="nav-actions">
          <div className="dropdown">
            <button className="button button-download" aria-expanded={open === 'download'} aria-controls="download-links" onClick={() => setOpen(open === 'download' ? null : 'download')}>
              <Download size={14} strokeWidth={2.4} /> Download
            </button>
            {open === 'download' && <div className="dropdown-panel download-panel" id="download-links">{downloadLinks}</div>}
          </div>
          <span className="nav-divider" aria-hidden="true" />
          <a className="nav-link sign-in" href="https://app.gethuble.com/auth?authType=signin">Sign in</a>
          <a className="button button-primary nav-cta" href={signupUrl}>Start free</a>
        </div>
        <button className="mobile-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          <details><summary>Product <ChevronDown size={14} /></summary><div>{productLinks}</div></details>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <details><summary>Download <Download size={14} /></summary><div>{downloadLinks}</div></details>
          <a href="https://app.gethuble.com/auth?authType=signin">Sign in</a>
          <a className="button button-primary" href={signupUrl}>Start free</a>
        </nav>
      )}
    </header>
  )
}
