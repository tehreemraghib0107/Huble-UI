import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { signupUrl } from './SiteHeader'
import { HubBackground } from './HubBackground'
import { AppShowcase } from './AppShowcase'
import appPreview from '../../assets/huble-app-preview.png'

export function HeroSection() {
  const [motionPaused, setMotionPaused] = useState(false)
  return (
    <section className={`hero${motionPaused ? ' hero-motion-paused' : ''}`} aria-labelledby="hero-title">
      <HubBackground />
      <div className="hero-content">
        <h1 id="hero-title">
          <span className="hero-title-line">
            <span className="hero-highlight"><em>Time tracking</em></span> that keeps
          </span>{' '}
          <span className="hero-title-line">your team moving forward.</span>
        </h1>
        <p className="hero-description">
          Track time, manage projects, and turn billable hours into invoices.
          Clear timesheets and helpful reports keep everyone on the same page.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={signupUrl}>Start free trial</a>
          <a className="button button-secondary" href="https://gethuble.com/">Book a demo</a>
        </div>
        <ul className="trial-benefits" aria-label="Free trial details">
          <li>30-day free trial</li>
          <li><span className="trial-separator" aria-hidden="true">·</span>No credit card required</li>
          <li><span className="trial-separator" aria-hidden="true">·</span>Cancel anytime</li>
        </ul>
      </div>
      <div className="showcase-wrap">
        <AppShowcase screenshotSrc={appPreview} screenshotAlt="Huble workspace with navigation, weekly time metrics, project statistics, and a work-time breakdown" />
        <button
          className="hero-motion-toggle"
          aria-label={motionPaused ? 'Play background animation' : 'Pause background animation'}
          onClick={() => setMotionPaused(!motionPaused)}
        >
          {motionPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
          <span>{motionPaused ? 'Play motion' : 'Pause motion'}</span>
        </button>
      </div>
    </section>
  )
}
