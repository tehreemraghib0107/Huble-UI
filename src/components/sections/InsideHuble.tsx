import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, BarChart3, Check, Clock3, FolderKanban, Layers3, Monitor, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppFeatureView } from './AppFeatureViews'
import './inside-huble.css'

type Chapter = {
  name: string
  short: string
  icon: LucideIcon
  title: string
  accent: string
  summary: string
  features: { title: string; description: string }[]
}

const chapters: Chapter[] = [
  {
    name: 'Timesheets', short: 'Timesheets', icon: Clock3,
    title: 'Every hour.', accent: 'All accounted for.',
    summary: 'From the first timer to the final timesheet, bring the working day into focus.',
    features: [
      { title: 'Time Entries', description: 'Start a timer or add hours manually.' },
      { title: 'Live View', description: 'See who is tracking across your organization, right now.' },
      { title: 'Time Review', description: 'Review daily, weekly, or custom periods by member, duration, and activity.' },
    ],
  },
  {
    name: 'Project Management', short: 'Projects', icon: FolderKanban,
    title: 'The work.', accent: 'And the whole picture.',
    summary: 'Keep projects, tasks, clients, and the hours behind them connected.',
    features: [
      { title: 'Project Hub', description: 'Create projects, organize tasks, assign teams, and track time.' },
      { title: 'Task Breakdown', description: 'Explore time by task and filter by priority.' },
      { title: 'Client', description: 'See each client’s projects, send invoices, and share reports.' },
    ],
  },
  {
    name: 'People', short: 'People', icon: Users,
    title: 'Your people.', accent: 'Working together.',
    summary: 'Give your organization a structure that makes everyday work easier.',
    features: [
      { title: 'Team Directory', description: 'Group members into teams and assign whole teams to projects.' },
      { title: 'Roles', description: 'Set organization roles for permissions and approvals.' },
      { title: 'Departments', description: 'Organize departments to understand workload beyond individuals.' },
    ],
  },
  {
    name: 'Activity', short: 'Activity', icon: Monitor,
    title: 'Less guessing.', accent: 'More understanding.',
    summary: 'Understand the tools and workflows behind the time your team records.',
    features: [
      { title: 'App Tracker', description: 'See tool usage and how it feeds productivity reports.' },
      { title: 'Web Insights', description: 'Understand browser time within tracked sessions.' },
      { title: 'Screenshot Capture', description: 'Optional screenshots, captured on an admin-controlled schedule.' },
    ],
  },
  {
    name: 'Reports', short: 'Reports', icon: BarChart3,
    title: 'Time, translated', accent: 'into clarity.',
    summary: 'Follow the hours from individual work to a picture you can act on.',
    features: [
      { title: 'Project Analytics', description: 'Understand where hours go across projects.' },
      { title: 'Activity Reports', description: 'Filter tool and workflow activity by person, team, or date.' },
      { title: 'Manual Time', description: 'Review manual entries and corrections, including who changed what and why.' },
    ],
  },
]

function ChapterContent({ index, id, enabled = true }: { index: number; id?: string; enabled?: boolean }) {
  const chapter = chapters[index]
  const Icon = chapter.icon
  return <article className="inside-chapter" id={id} aria-label={chapter.name}>
    <div className="inside-copy">
      <div className="inside-chapter-label"><span><Icon size={17} /></span>{chapter.name}<small>0{index + 1} / 05</small></div>
      <h3>{chapter.title}<br /><em>{chapter.accent}</em></h3>
      <p className="inside-summary">{chapter.summary}</p>
      <ul className="inside-feature-list">{chapter.features.map(feature => <li key={feature.title}><span className="inside-feature-dot" /><div><h4>{feature.title}</h4><p>{feature.description}</p></div></li>)}</ul>
    </div>
    <div className="inside-product-window" role="img" aria-label={`Huble ${chapter.name.toLowerCase()} app preview. ${chapter.features.map(feature => feature.title).join(', ')}.`}>
      <AppFeatureView index={index} enabled={enabled} />
    </div>
  </article>
}

function StaticWalkthrough() {
  return <section className="inside-static" id="product" aria-labelledby="inside-title">
    <header className="inside-static-heading"><span className="inside-eyebrow">ONE CONNECTED WORKSPACE</span><h2 id="inside-title">See what’s <em>inside</em> Huble.</h2><p>Log an hour. Connect it to the project, the timesheet, and the invoice.</p></header>
    <nav className="inside-static-nav" aria-label="Explore Huble features">{chapters.map((chapter, index) => <a href={`#inside-${index}`} key={chapter.name}>{chapter.short}<ArrowDown size={12} /></a>)}</nav>
    {chapters.map((chapter, index) => <ChapterContent index={index} id={`inside-${index}`} key={chapter.name} />)}
    <div className="inside-endnote"><Check size={16} /> One workspace. Every part of your working day.</div>
  </section>
}

function ScrollWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const introOpacity = useTransform(scrollYProgress, [0.025, 0.11], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.13], [0, -80])
  const openingWidth = useTransform(scrollYProgress, [0.025, 0.19], ['14%', '100%'])
  const openingHeight = useTransform(scrollYProgress, [0.025, 0.19], ['10%', '100%'])
  const openingRadius = useTransform(scrollYProgress, [0.025, 0.19], ['40px', '0px'])
  const openingTop = useTransform(scrollYProgress, [0.025, 0.19], ['65%', '50%'])
  const openingIconOpacity = useTransform(scrollYProgress, [0.02, 0.065], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.16, 0.215], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.16, 0.215], [55, 0])
  const progress = useTransform(scrollYProgress, [0.215, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', value => {
    setOpened(value >= 0.205)
    setActive(Math.min(4, Math.max(0, Math.floor((value - 0.215) / 0.157))))
  })

  function goToChapter(index: number) {
    if (!sectionRef.current) return
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
    const distance = sectionRef.current.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + distance * (0.235 + index * 0.157), behavior: 'smooth' })
  }

  return <section className="inside-scroll" id="product" ref={sectionRef} aria-label="See what's inside Huble">
    <div className="inside-sticky">
      <motion.div className="inside-intro" style={{ opacity: introOpacity, y: introY }} aria-hidden={opened} inert={opened}>
        <span className="inside-eyebrow">ONE CONNECTED WORKSPACE</span>
        <h2>See what’s<br /><em>inside</em> Huble.</h2>
        <p>Every hour has a story.<br />Follow it through your working day.</p>
      </motion.div>
      <motion.div className="inside-opening" style={{ width: openingWidth, height: openingHeight, borderRadius: openingRadius, top: openingTop }} aria-hidden="true">
        <motion.div className="inside-opening-symbol" style={{ opacity: openingIconOpacity }}><Layers3 size={22} /><span /><ArrowDown size={18} /></motion.div>
      </motion.div>
      <motion.button type="button" className="inside-enter" onClick={() => goToChapter(0)} style={{ opacity: introOpacity }} inert={opened} aria-hidden={opened}>Scroll to step inside <ArrowDown size={14} /></motion.button>
      <motion.div className="inside-experience" style={{ opacity: contentOpacity, y: contentY }} inert={!opened} aria-hidden={!opened}>
        <header className="inside-experience-header"><div><span className="inside-eyebrow">SEE WHAT’S INSIDE HUBLE</span><p>One connected workspace.</p></div><span className="inside-scroll-hint">Scroll to explore <ArrowDown size={13} /></span></header>
        <nav className="inside-chapter-nav" aria-label="Explore Huble features">{chapters.map((chapter, index) => <button type="button" key={chapter.name} aria-current={active === index ? 'step' : undefined} onClick={() => goToChapter(index)}><span>0{index + 1}</span>{chapter.short}{active === index && <ArrowRight size={13} />}</button>)}</nav>
        <div className="inside-chapter-stage"><AnimatePresence initial={false} mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .22, ease: 'easeOut' }}><ChapterContent index={active} enabled={opened} /></motion.div></AnimatePresence></div>
        <div className="inside-experience-footer"><span><i /> Time. Projects. People. All connected.</span><span>0{active + 1}<span className="inside-count-divider"> / </span>05</span></div>
        <div className="inside-progress-track"><motion.div style={{scaleX:progress}} /></div>
      </motion.div>
    </div>
  </section>
}

export function InsideHuble() {
  // Small viewports and reduced-motion users get every chapter in normal flow.
  const [scrollEnabled, setScrollEnabled] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1000px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)')
    const update = () => setScrollEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return scrollEnabled ? <ScrollWalkthrough /> : <StaticWalkthrough />
}
