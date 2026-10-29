import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Activity, Check, Clock3, Search, Moon, RotateCcw } from 'lucide-react'
import './tracking-benefit-preview.css'

function duration(seconds: number) {
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(n => String(n).padStart(2, '0')).join(':')
}
function useTimer(active: boolean, initial: number) {
  const [seconds, setSeconds] = useState(initial)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (!active || reducedMotion) return
    const timer = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [active, reducedMotion])
  return duration(seconds)
}
function SearchRow() {
  return <div className="benefit-preview-search"><Search size={15} />Search tasks…<kbd>⌘K</kbd></div>
}
function Tracker({ active }: { active: boolean }) {
  const [running, setRunning] = useState(true)
  const time = useTimer(active && running, 26)
  return <>
    <div className="benefit-preview-current"><div><strong>Build authentication system</strong><span>Huble Web App</span></div><div className="benefit-timer-control"><button className="benefit-preview-switch" role="switch" aria-checked={running} aria-label="Run demo timer" onClick={() => setRunning(!running)}><i /></button><span className="benefit-time">{time}</span></div></div>
    <div className="benefit-preview-stats">
      <div><Activity size={20} /><div><span>Today's Activity</span><strong>71<small>%</small></strong></div><div className="benefit-activity-track"><i /></div></div>
      <div><Clock3 size={20} /><div><span>Today's Time</span><strong>6:42<small> hrs</small></strong></div></div>
    </div>
    <SearchRow /><div className="benefit-preview-day">Today <span className="benefit-status"><i />{running ? 'Tracking' : 'Stopped'}</span></div>
  </>
}
function IdleReview() {
  const [keep, setKeep] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  return <div className="benefit-preview-idle">
    <div className="benefit-preview-idle-icon"><Moon size={22} /></div><h4>{result ? 'Time reviewed' : 'You went idle'}</h4>
    <p role={result ? 'status' : undefined}>{result || <>We detected <strong>12 min</strong> of inactivity on <strong>Huble Web App</strong>.<small>10:02 AM to 10:14 AM</small></>}</p>
    {result ? <button className="benefit-reset" onClick={() => setResult(null)}><RotateCcw size={14} /> Try again</button> : <>
      <fieldset className="benefit-idle-options"><legend className="sr-only">Handle idle time</legend>{[true, false].map(value => <label className={`benefit-preview-choice${keep === value ? ' is-selected' : ''}`} key={String(value)}><input type="radio" name="demo-idle-choice" checked={keep === value} onChange={() => setKeep(value)} /><span><strong>{value ? 'Keep idle time' : 'Discard idle time'}</strong><small>{value ? 'Count the time away as idle.' : 'Remove it from this session.'}</small></span></label>)}</fieldset>
      <div className="benefit-preview-actions"><button onClick={() => setResult(`12 minutes ${keep ? 'kept' : 'discarded'}. Timer stopped.`)}>Stop</button><button onClick={() => setResult(`12 minutes ${keep ? 'kept' : 'discarded'}. Timer resumed.`)}>Resume</button></div>
    </>}
  </div>
}
function TaskSessions({ active }: { active: boolean }) {
  const current = useTimer(active, 25 * 60 + 24)
  const total = useTimer(active, 2 * 3600 + 3 * 60 + 24)
  return <><SearchRow /><div className="benefit-preview-day">Today</div><div className="benefit-session-timeline"><i /><i /><i /><i /></div><div className="benefit-timeline-labels"><span>8:15 AM</span><span>11:28 AM</span></div>
    <div className="benefit-preview-task"><strong>Build authentication system</strong><span>Huble Web App · 3 sessions</span><b>{total}</b><div className="benefit-session-rows">{[['11:03 AM',current],['9:48 – 10:39 AM','00:51:00'],['8:15 – 9:02 AM','00:47:00']].map(([time, amount]) => <p key={time}><i /><span>{time}</span><strong>{amount}</strong></p>)}</div></div>
    <div className="benefit-preview-task is-compact"><strong>Ticket-1418</strong><span>Huble Web App · 1 session</span><b>00:15:00</b></div>
  </>
}
function BillableSettings() {
  const [billable, setBillable] = useState(true)
  const [rate, setRate] = useState('95.00')
  return <div className="benefit-preview-project"><div className="benefit-preview-project-heading"><strong>Huble Web App</strong>{billable && <span className="benefit-billable-tag"><Check size={12} /> Billable</span>}</div><p>Delivery project for Acme Corp</p>
    <label htmlFor="benefit-bill-rate">Bill Rate</label><div className="benefit-preview-rate"><span>$</span><input id="benefit-bill-rate" type="number" min="0" step="0.01" value={rate} onChange={event => setRate(event.target.value)} /><small>/ hr</small></div>
    <div className="benefit-preview-billable"><div><strong>Billable</strong><span>Mark this project as billable.</span></div><button className="benefit-preview-switch" role="switch" aria-label="Billable project" aria-checked={billable} onClick={() => setBillable(!billable)}><i /></button></div>
    <div className="benefit-billing-note">{billable ? 'Billable time, ready to report.' : 'This project is non-billable.'}</div>
  </div>
}
const views = [Tracker, IdleReview, TaskSessions, BillableSettings]
export function TrackingBenefitPreview({ index, active }: { index: number; active: boolean }) {
  const View = views[index]
  return <div className={`benefit-preview benefit-preview-${index}${active ? ' is-active' : ''}`}><View active={active} /></div>
}
