import { useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'motion/react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import wordmark from '../../assets/huble-wordmark.svg'
import github from '../../assets/integrations/github.svg'
import slack from '../../assets/integrations/slack.svg'
import clickup from '../../assets/integrations/clickup.svg'
import jira from '../../assets/integrations/jira.svg'
import asana from '../../assets/integrations/asana.svg'
import stripe from '../../assets/integrations/stripe.svg'
import { signupUrl } from './SiteHeader'
import './integrations.css'

// Logos and integration names are sourced from the live Huble homepage.
const integrations = [
  { name: 'GitHub', logo: github, category: 'Development', x: 15, y: 19, path: 'M90 86 H184 Q204 86 204 106 V197 Q204 217 224 217 H300' },
  { name: 'Slack', logo: slack, category: 'Communication', x: 85, y: 19, path: 'M510 86 H416 Q396 86 396 106 V197 Q396 217 376 217 H300' },
  { name: 'ClickUp', logo: clickup, category: 'Project management', x: 12, y: 50, path: 'M72 225 H300' },
  { name: 'Jira', logo: jira, category: 'Issue tracking', x: 88, y: 50, path: 'M528 225 H300' },
  { name: 'Asana', logo: asana, category: 'Team projects', x: 19, y: 81, path: 'M114 365 H184 Q204 365 204 345 V253 Q204 233 224 233 H300' },
  { name: 'Stripe', logo: stripe, category: 'Payments', x: 81, y: 81, path: 'M486 365 H416 Q396 365 396 345 V253 Q396 233 376 233 H300' },
]

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: .15 })
  const [selected, setSelected] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const active = hovered ?? focused ?? selected
  const current = active === null ? null : integrations[active]

  return <section ref={sectionRef} className={`integrations-section${inView ? ' is-in-view' : ''}`} aria-labelledby="integrations-title" id="integrations">
    <div className="integrations-shell">
      <div className="integrations-copy">
        <span className="integrations-eyebrow"><span /> RIGHT AT HOME IN YOUR WORKFLOW</span>
        <h2 id="integrations-title">Keep your tools.<br /><em>Find your flow.</em></h2>
        <p>Bring Huble into the tools your team already loves. Your time, projects, and people stay connected.</p>
        <a className="button integrations-cta" href={signupUrl}>Get started free <ArrowUpRight size={19} aria-hidden="true" /></a>
        <span className="integrations-trial">30-day free trial <span aria-hidden="true">·</span> No credit card required</span>
      </div>

      <div className="integration-system">
        <div className="integration-system-top"><span>THE HUBLE ECOSYSTEM</span><span className="integration-system-mark" aria-hidden="true"><i /><i /><i /></span></div>
        <div className={`integration-map${active !== null ? ' has-active' : ''}`}>
          <div className="integration-orbit integration-orbit-outer" aria-hidden="true" /><div className="integration-orbit integration-orbit-inner" aria-hidden="true" />
          <svg className="integration-wires" viewBox="0 0 600 450" fill="none" aria-hidden="true">
            {integrations.map(({ name, path }, index) => <g key={name} className={active === index ? 'is-active' : ''}>
              <path d={path} className="integration-wire" />
              <path d={path} pathLength="100" className="integration-signal" style={{ '--signal-delay': `${index * -.75}s` } as CSSProperties} />
            </g>)}
          </svg>
          <div className="integration-hub"><span className="integration-hub-edge" aria-hidden="true" /><img src={wordmark} alt="Huble" /><span>ALL TOGETHER</span></div>
          <ul className="integration-nodes" aria-label="Tools that integrate with Huble">
            {integrations.map(({ name, logo, x, y }, index) => <li key={name} style={{ '--node-x': `${x}%`, '--node-y': `${y}%` } as CSSProperties}>
              <button type="button" className={`integration-node${active === index ? ' is-active' : ''}`} aria-label={`Highlight ${name} integration`} aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)} onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(index) }} onPointerLeave={() => setHovered(null)} onFocus={() => { setHovered(null); setFocused(index) }} onBlur={() => setFocused(null)}>
                <span className="integration-logo"><img src={logo} alt="" /></span><span>{name}</span>
              </button>
            </li>)}
          </ul>
        </div>
        <div className="integration-system-bottom">
          <div className="integration-caption" aria-live="polite" aria-atomic="true"><span className="integration-caption-dot" aria-hidden="true" /><span>{current ? <><strong>{current.name}</strong><ArrowRight size={13} aria-hidden="true" />Huble</> : <><strong>Different tools.</strong> Shared momentum.</>}</span></div>
          <span className="integration-category">{current?.category ?? 'Better, together'}</span>
        </div>
      </div>
    </div>
  </section>
}
