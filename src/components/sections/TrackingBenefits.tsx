import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Clock3, FolderKanban, ChartNoAxesColumn, ReceiptText } from 'lucide-react'
import { signupUrl } from './SiteHeader'
import { TrackingBenefitPreview } from './TrackingBenefitPreview'
import './tracking-benefits.css'

const benefits = [
  { title: 'Start in one click', description: 'Track time right from the task at hand.', icon: Clock3, label: 'running timer' },
  { title: 'Keep hours honest', description: 'Review idle time before it affects the total.', icon: FolderKanban, label: 'idle review' },
  { title: 'Track the right work', description: 'Every session stays linked to its task.', icon: ChartNoAxesColumn, label: 'Today task list' },
  { title: 'Flag billable live', description: 'Capture billable work as it happens.', icon: ReceiptText, label: 'billable project settings' },
]

export function TrackingBenefits() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section className="tracking-benefits" aria-labelledby="tracking-benefits-title">
      <header className="tracking-benefits-heading">
        <span className="tracking-benefits-eyebrow">A BETTER WAY TO WORK</span>
        <h2 id="tracking-benefits-title">Make every hour count.</h2>
        <p>Less admin. More clarity. Work you can trust.</p>
        <a className="button button-primary tracking-benefits-cta" href={signupUrl}>
          Get started free <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <div className="tracking-benefits-grid">
        {benefits.map(({ title, description, icon: Icon, label }, index) => {
          const isFlipped = flipped === index
          return (
            <article className={`tracking-benefit-card${isFlipped ? ' is-flipped' : ''}`} key={title}>
              <div className="tracking-benefit-flipper">
                <div className="tracking-benefit-face tracking-benefit-front">
                  <Icon className="tracking-benefit-icon" size={21} strokeWidth={1.8} aria-hidden="true" />
                  <div className="tracking-benefit-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <button
                    className="tracking-benefit-toggle"
                    type="button"
                    aria-label={`Show Huble ${label} preview`}
                    aria-pressed={isFlipped}
                    onClick={() => setFlipped(isFlipped ? null : index)}
                  >
                    See it in Huble <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
                <div className="tracking-benefit-face tracking-benefit-back" aria-label={`Huble ${label} app preview`}>
                  <TrackingBenefitPreview index={index} />
                  <button
                    className="tracking-benefit-back-button"
                    type="button"
                    aria-label={`Back to ${title}`}
                    onClick={() => setFlipped(null)}
                  >
                    <ArrowLeft size={14} aria-hidden="true" /> Back
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}