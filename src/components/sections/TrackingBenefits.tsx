import { useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { ArrowLeft, ArrowUpRight, Clock3, ShieldCheck, Layers3, ReceiptText, Check, Play } from 'lucide-react'
import { signupUrl } from './SiteHeader'
import { TrackingBenefitPreview } from './TrackingBenefitPreview'
import './tracking-benefits.css'

const benefits = [
  { title: 'Start in one click', description: 'Less setup. More time for the work.', icon: Clock3, label: 'running timer', tag: 'A quicker start' },
  { title: 'Keep hours honest', description: 'Keep the work. Review the time away.', icon: ShieldCheck, label: 'idle review', tag: 'Time you can trust' },
  { title: 'Track the right work', description: 'Every session, right where it belongs.', icon: Layers3, label: 'task sessions', tag: 'Already organized' },
  { title: 'Flag billable live', description: 'Know what to bill while the work happens.', icon: ReceiptText, label: 'billable settings', tag: 'Ready to bill' },
]

function BenefitArtwork({ index }: { index: number }) {
  return <div className={`benefit-art benefit-art-${index}`} aria-hidden="true">
    {index === 0 && <><div className="benefit-clock"><span className="benefit-clock-hand" /><Play size={24} fill="currentColor" /></div><span className="benefit-art-chip"><i /> Time well spent</span></>}
    {index === 1 && <><div className="benefit-idle-orbit"><ShieldCheck size={42} /><span>12 <small>min</small></span></div><span className="benefit-art-chip"><Check size={14} /> You stay in control</span></>}
    {index === 2 && <><div className="benefit-session-stack">{['Design exploration', 'Build authentication', 'Review & handoff'].map((task, i) => <div key={task}><span className="benefit-task-dot" /><span>{task}</span><Check size={13} style={{ animationDelay: `${i * .25}s` }} /></div>)}</div><span className="benefit-art-chip">One project. Every session.</span></>}
    {index === 3 && <><div className="benefit-receipt"><span>BILLABLE RATE <ReceiptText size={16} /></span><strong>$95<small>/ hr</small></strong><div /><span className="benefit-receipt-status"><Check size={13} /> Captured as you work</span></div></>}
  </div>
}

function BenefitCard({ index, open, onToggle }: { index: number; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { amount: .2 })
  const { title, description, icon: Icon, label, tag } = benefits[index]
  return <article ref={ref} aria-label={title} className={`tracking-benefit-card${open ? ' is-flipped' : ''}${visible ? ' is-visible' : ''}`}>
    <button className="tracking-benefit-toggle" type="button" aria-label={open ? `Back to ${title}` : `Show Huble ${label} preview`} aria-expanded={open} aria-controls={`benefit-preview-${index}`} onClick={onToggle}>
      {open ? <><ArrowLeft size={16} aria-hidden="true" /> Back to overview</> : <>See it in Huble <ArrowUpRight size={17} aria-hidden="true" /></>}
    </button>
    <div className="tracking-benefit-flipper">
      <div className="tracking-benefit-face tracking-benefit-front" inert={open} aria-hidden={open}>
        <div className="benefit-card-tag"><Icon size={17} aria-hidden="true" />{tag}</div>
        <BenefitArtwork index={index} />
        <div className="tracking-benefit-copy"><h3>{title}</h3><p>{description}</p></div>
      </div>
      <div className="tracking-benefit-face tracking-benefit-back" inert={!open} aria-hidden={!open} id={`benefit-preview-${index}`}>
        <div className="benefit-demo-label"><span /> Try it in Huble <small>Preview</small></div>
        <TrackingBenefitPreview index={index} active={open && visible} />
      </div>
    </div>

  </article>
}

export function TrackingBenefits() {
  const [flipped, setFlipped] = useState<number | null>(null)
  return <section className="tracking-benefits" aria-labelledby="tracking-benefits-title">
    <header className="tracking-benefits-heading">
      <span className="tracking-benefits-eyebrow">A BETTER WAY TO WORK</span>
      <h2 id="tracking-benefits-title">Make every hour <em>count.</em></h2>
      <p>Less admin. More clarity. Work you can trust.</p>
      <a className="button button-primary tracking-benefits-cta" href={signupUrl}>Get started free <ArrowUpRight size={18} aria-hidden="true" /></a>
    </header>
    <div className="tracking-benefits-grid">{benefits.map((benefit, index) => <BenefitCard key={benefit.title} index={index} open={flipped === index} onToggle={() => setFlipped(flipped === index ? null : index)} />)}</div>
  </section>
}
