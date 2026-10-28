import { Activity, Check, Clock3, Search, X } from 'lucide-react'
import './tracking-benefit-preview.css'

const sessions = [
  ['11:03 AM', '00:25:17'],
  ['9:48 AM – 10:39 AM', '00:51:00'],
  ['8:15 AM – 9:02 AM', '00:47:00'],
]

function Tracker() {
  return <>
    <div className="benefit-preview-current">
      <div><strong>Build authentication system</strong><span>Huble Web App</span></div>
      <span className="benefit-preview-switch" aria-hidden="true"><i /></span>
    </div>
    <div className="benefit-preview-stats">
      <div><Activity size={15} /><span>Today's Activity</span><strong>71<small>%</small></strong><i><b /></i></div>
      <div><Clock3 size={15} /><span>Today's Time</span><strong>6:42<small> hrs</small></strong></div>
    </div>
    <div className="benefit-preview-search"><Search size={13} />Search tasks...<kbd>⌘K</kbd></div>
    <div className="benefit-preview-day">Today <span>8:15 AM <i /> 11:28 AM</span></div>
  </>
}

function IdleReview() {
  return <div className="benefit-preview-idle">
    <div className="benefit-preview-idle-icon"><Clock3 size={18} /></div>
    <h4>You went idle</h4>
    <p>We detected <strong>12 min</strong> of inactivity on <strong>Huble Web App</strong>.</p>
    <div className="benefit-preview-choice is-selected"><span><Check size={12} /></span><div><strong>Keep idle time</strong><small>Counts the time away as idle.</small></div></div>
    <div className="benefit-preview-choice"><span /><div><strong>Discard idle time</strong><small>Removes the time away.</small></div></div>
    <div className="benefit-preview-actions"><button type="button">Stop</button><button type="button">Resume</button></div>
  </div>
}

function TaskSessions() {
  return <>
    <div className="benefit-preview-search"><Search size={13} />Search tasks...<kbd>⌘K</kbd></div>
    <div className="benefit-preview-day">Today <span>8:15 AM <i /> 11:28 AM</span></div>
    <div className="benefit-preview-task">
      <div><strong>Build authentication system</strong><span>Huble Web App · 3 sessions</span><b>02:03:17</b></div>
      {sessions.map(([time, duration]) => <p key={time}><span>{time}</span><strong>{duration}</strong></p>)}
    </div>
    <div className="benefit-preview-task is-compact"><div><strong>Ticket-1418</strong><span>Huble Web App · 10:45 AM to 11:00 AM</span><b>00:15:00</b></div></div>
  </>
}

function BillableSettings() {
  return <div className="benefit-preview-project">
    <div className="benefit-preview-project-heading"><span>Huble Web App</span><small>Project settings</small></div>
    <p>Delivery project for Acme Corp</p>
    <label htmlFor="benefit-bill-rate">Bill Rate</label>
    <div className="benefit-preview-rate"><span>$</span><strong id="benefit-bill-rate">95.00</strong><small>USD / hr</small></div>
    <div className="benefit-preview-billable"><div><strong>Billable</strong><span>Include this project in billable time.</span></div><i aria-hidden="true"><b /></i></div>
  </div>
}

const views = [Tracker, IdleReview, TaskSessions, BillableSettings]

export function TrackingBenefitPreview({ index }: { index: number }) {
  const View = views[index]
  return <div className={`benefit-preview benefit-preview-${index}`} aria-hidden="true">
    <div className="benefit-preview-topbar"><span><i /><i /><i /></span><strong>Huble</strong><X size={12} /></div>
    <View />
  </div>
}