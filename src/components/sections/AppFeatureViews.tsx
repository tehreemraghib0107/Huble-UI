import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FolderOpen, MoreHorizontal, Search, Users, Workflow } from 'lucide-react'
import type { CSSProperties } from 'react'
import './app-feature-views.css'

const stagger = (index: number): CSSProperties => ({ '--row': index } as CSSProperties)

function Counter({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: .5 })
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    if (!visible || reduced) {
      node.textContent = String(value)
      return
    }
    const control = animate(0, value, {
      duration: .8, delay, ease: 'easeOut',
      onUpdate: latest => { node.textContent = String(Math.round(latest)) },
      onComplete: () => { node.textContent = String(value) },
    })
    return () => control.stop()
  }, [visible, reduced, value, delay])
  return <span ref={ref} className="app-counter">{value}</span>
}

function Bar({ value, delay = 0, striped = false }: { value: number; delay?: number; striped?: boolean }) {
  return <div className={`app-bar${striped ? ' app-bar-striped' : ''}`}><span style={{ width: `${value}%`, animationDelay: `${delay}ms` }} /></div>
}

function TimesheetView() {
  return <div className="app-timesheet">
    <div className="app-card app-daily-summary">
      <h4>Daily summary</h4><p>Roll-up for 2026-09-08 (America/Toronto).</p>
      <div className="app-time-metrics">{[['Tracked','7:02:53'],['Manual','0:45:00'],['Billable','6:17:53'],['Active','5:03:11'],['Idle','0:31:42']].map(([label,value],i)=><div className="app-reveal" style={stagger(i)} key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="app-activity-bar"><span>Activity <Counter value={64} />%</span><Bar value={64} delay={160} striped /></div>
    </div>
    <div className="app-card app-time-entries">
      <div className="app-member-header"><ChevronDown /><span className="app-avatar">SM</span><div><strong>Sarah Miller</strong><small>4 of 4 entries loaded</small></div><span className="app-pill">Total 7:02:53</span><span className="app-pill">Activity 64%</span></div>
      <table className="app-table app-time-table"><thead><tr><th>Project / task</th><th>Activity</th><th>Tracking session</th></tr></thead><tbody>{[
        ['Huble Web App','Build user dashboard','74%','9:02 AM to 11:41 AM','02:39:12'],
        ['Huble Web App','Ticket-1418','68%','12:15 PM to 2:04 PM','01:49:33'],
        ['Invoice System Revamp','Multi-currency support','71%','2:30 PM to 3:15 PM','00:45:00'],
      ].map(([project,task,activity,session,duration],i)=><tr className="app-reveal" style={stagger(i+5)} key={task}><td><strong>{project}</strong><small>{task}</small></td><td>{activity}</td><td>{session}<small>{duration}</small></td></tr>)}</tbody></table>
    </div>
  </div>
}

function ProjectsView() {
  const metrics = [
    {label:'Projects in motion',value:3,note:'Currently visible in this workspace',icon:FolderOpen},
    {label:'Task load',value:34,note:'Tasks currently linked to these projects',icon:Workflow},
    {label:'Team groups',value:3,note:'Unique teams assigned across the list',icon:Users},
    {label:'Assigned members',value:5,note:'People represented across project delivery',icon:Users},
  ]
  return <div className="app-projects">
    <div className="app-project-metrics">{metrics.map(({label,value,note,icon:Icon},i)=><div className="app-card app-project-metric app-reveal" style={stagger(i)} key={label}><span>{label}</span><span className="app-metric-icon"><Icon /></span><strong><Counter value={value} delay={i*.08} /></strong><p>{note}</p></div>)}</div>
    <div className="app-card"><table className="app-table app-project-table"><thead><tr><th>Projects</th><th>Client</th><th>Tasks</th></tr></thead><tbody>{[
      ['Huble Web App','Acme Corp',14],['Invoice System Revamp','Vital Educators',12],
    ].map(([project,client,tasks],i)=><tr className="app-reveal" style={stagger(i+4)} key={project}><td><strong>{project} <span className="app-billable">Billable</span></strong><small>Delivery project for {client}</small></td><td>{client}<small>External client linked</small></td><td><span className="app-task-count">{tasks}</span></td></tr>)}</tbody></table></div>
  </div>
}

function PeopleView() {
  return <div className="app-people">
    <div className="app-people-toolbar"><span className="app-search"><Search />Search members...</span><span>Active Members 5</span><span>Pending Invitations 0</span></div>
    <div className="app-card"><table className="app-table app-people-table"><thead><tr><th><span className="app-checkbox" /></th><th>Member</th><th>Role</th><th>Actions</th></tr></thead><tbody>{[
      ['Marcus Chen','Organization Owner'],['Sarah Miller','Organization Admin'],['Priya Raman','Organization Manager'],['Diego Alvarez','Employee'],['Amina Okafor','Employee'],
    ].map(([name,role],i)=><tr className="app-reveal" style={stagger(i+1)} key={name}><td><span className="app-checkbox" /></td><td><strong>{name}</strong></td><td>{role}</td><td><MoreHorizontal /></td></tr>)}</tbody></table>
      <div className="app-pagination"><span>Rows per page</span><span className="app-page-size">10 <ChevronDown /></span><span>Page 1 of 1</span><span className="app-page-arrow"><ChevronLeft /></span><span className="app-page-arrow"><ChevronRight /></span></div>
    </div>
  </div>
}

function ActivityView() {
  return <div className="app-usage">
    <div className="app-card"><div className="app-usage-heading"><div><h4>Sarah Miller</h4><p>Total Time Worked: 38:26:00</p></div><span className="app-view-all">View All</span><ChevronUp /></div>
      <table className="app-table app-usage-table"><thead><tr><th>App Name</th><th>Duration</th></tr></thead><tbody>{[
        ['Visual Studio Code','18:12:40'],['Figma','07:22:06'],['Slack','05:04:52'],['Terminal','04:11:18'],['Google Chrome','02:26:51'],['Zoom','01:03:39'],
      ].map(([name,time],i)=><tr className="app-reveal" style={stagger(i+1)} key={name}><td>{name}</td><td>{time}</td></tr>)}</tbody></table>
    </div>
    <div className="app-card app-usage-heading app-reveal" style={stagger(7)}><div><h4>Diego Alvarez</h4><p>Total Time Worked: 37:11:57</p></div><span className="app-view-all">View All</span><ChevronDown /></div>
  </div>
}

function ReportsView() {
  return <div className="app-card app-reports">
    <div className="app-report-heading"><span>Overview</span><span className="app-pill">3 projects</span></div>
    <div className="app-report-body"><h4>Project breakdown</h4><p>Compare the time share and activity rate for each project in the current selection.</p>
      <div className="app-report-projects">{[
        {name:'Huble Web App',client:'Acme Corp',time:'64:12:00',activity:78,share:52},
        {name:'Invoice System Revamp',client:'Vital Educators',time:'38:40:00',activity:71,share:31},
        {name:'Internal Admin Dashboard',client:null,time:'21:04:00',activity:64,share:17},
      ].map((project,i)=><div className="app-report-project app-reveal" style={stagger(i+1)} key={project.name}><h5>{project.name}{project.client && <span className="app-client">{project.client}</span>}</h5><div className="app-report-details"><p>{project.time} tracked with<br />{project.activity}% activity</p><div className="app-time-share"><div><span>Time share</span><span><Counter value={project.share} delay={i*.09} />%</span></div><Bar value={project.share / 52 * 100} delay={160+i*90} /></div></div></div>)}</div>
    </div>
  </div>
}

const views = [TimesheetView, ProjectsView, PeopleView, ActivityView, ReportsView]

export function AppFeatureView({ index, enabled = true }: { index: number; enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: .3, once: true })
  const View = views[index]
  return <div ref={ref} className={`app-feature-view${enabled && inView ? ' app-feature-visible' : ''}`}>
    {enabled && inView ? <View /> : <div className="app-preview-placeholder" />}
  </div>
}
