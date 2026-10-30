import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, CreditCard, Infinity as InfinityIcon, Users } from 'lucide-react'
import { signupUrl } from './SiteHeader'
import './pricing.css'

// Prices and included features checked against gethuble.com/pricing on October 30, 2026.
const plans = {
  annual: { price: 79, billing: '$948 billed annually', period: 'Annual' },
  monthly: { price: 99, billing: '$99 billed monthly', period: 'Monthly' },
}
const included = [
  'Unlimited members', 'Unlimited projects', 'Unlimited clients', 'Unlimited teams and departments',
  'Time tracking', 'Real-time presence', 'Manual time stats', 'Per member overrides',
  'Org-wide tracking controls', 'Productivity insights', 'Optional screenshot capture', 'App and browser activity',
  'Reports', 'Invoicing', 'Integrations', 'Data export', 'Live chat and email support',
]

export function PricingSection() {
  const [billing, setBilling] = useState<keyof typeof plans>('annual')
  const plan = plans[billing]

  return <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
    <header className="pricing-heading">
      <span className="pricing-eyebrow">SIMPLE BY DESIGN</span>
      <h2 id="pricing-title">One plan. <em>Everything included.</em></h2>
      <p>All the tools. Your whole team. One flat price.</p>
    </header>

    <fieldset className="pricing-billing">
      <legend className="sr-only">Billing period</legend>
      {(['monthly', 'annual'] as const).map(period => <label key={period} className={billing === period ? 'is-selected' : ''}>
        <input type="radio" name="huble-billing-period" value={period} checked={billing === period} onChange={() => setBilling(period)} />
        <span>{plans[period].period}</span>{period === 'annual' && <small>Save 20%</small>}
      </label>)}
    </fieldset>

    <motion.div className="pricing-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .45 }}>
      <div className="pricing-offer">
        <div className="pricing-plan-label"><Users size={18} aria-hidden="true" /><span>For your whole team</span></div>
        <div className="pricing-amount" aria-live="polite" aria-atomic="true">
          <div className="pricing-value"><motion.span key={billing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>${plan.price}</motion.span><span className="pricing-period">USD<br />/ month</span></div>
          <p>{plan.billing}</p>
        </div>
        <div className="pricing-unlimited"><InfinityIcon size={24} strokeWidth={1.7} aria-hidden="true" /><div><strong>Unlimited members</strong><span>No per-seat fees.</span></div></div>
        <a className="button pricing-cta" href={signupUrl}>Start free trial <ArrowUpRight size={19} aria-hidden="true" /></a>
        <span className="pricing-offer-note">30 days to make yourself at home.</span>
        <div className="pricing-offer-orbit" aria-hidden="true" />
      </div>

      <div className="pricing-included">
        <div className="pricing-included-heading"><h3>Everything comes standard.</h3><span>FULL ACCESS</span></div>
        <ul>{included.map(feature => <li key={feature}><Check size={16} strokeWidth={2} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
        <div className="pricing-support-note"><span aria-hidden="true" /><span>One workspace. No locked features.</span></div>
      </div>
    </motion.div>

    <ul className="pricing-reassurance" aria-label="Free trial details"><li><Check size={16} aria-hidden="true" />30-day free trial</li><li><CreditCard size={16} aria-hidden="true" />No card required</li><li><Check size={16} aria-hidden="true" />Cancel anytime</li></ul>
  </section>
}
