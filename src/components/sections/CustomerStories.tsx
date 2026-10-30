import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Compass, MessagesSquare, Globe2, ReceiptText } from 'lucide-react'
import { signupUrl } from './SiteHeader'
import './customer-stories.css'

// Existing quotes and attributions from gethuble.com, reviewed October 30, 2026.
// The second group is an identical visual loop, not additional endorsements.
const stories = [
  {
    name: 'Maya Kettner', initials: 'MK', role: 'Head of Delivery', company: 'Northbeam',
    theme: 'A clearer picture', icon: Compass,
    quote: 'I could tell the team felt busy, but not who actually needed support. Huble showed me the pattern behind it, so I could coach the right people instead of guessing.',
    highlight: 'The team got more productive because I finally knew where to focus.',
  },
  {
    name: 'Diego Fuentes', initials: 'DF', role: 'Ops Lead', company: 'Kestrel Studio',
    theme: 'Fewer status meetings', icon: MessagesSquare,
    quote: 'Our weekly status meeting is gone. My manager just checks Huble instead,',
    highlight: 'and actually knows more than the meeting ever told them.',
  },
  {
    name: 'Priya Nandan', initials: 'PN', role: 'PM', company: 'Meridian Labs',
    theme: 'Connected across time zones', icon: Globe2,
    quote: 'Half our team is twelve hours apart. We used to ping people just to check if they were around.',
    highlight: "Now we just look at Huble and know who's working right now.",
  },
  {
    name: 'Sam Okafor', initials: 'SO', role: 'Founder', company: 'Loop & Line',
    theme: 'Confidence in every invoice', icon: ReceiptText,
    quote: "Clients used to push back on our invoices because the hours didn't match what they remembered. Now the invoice traces back to the actual logged time, entry by entry,",
    highlight: "so there's nothing to argue about.",
  },
]

function StoryCard({ story, index }: { story: typeof stories[number]; index: number }) {
  const Icon = story.icon
  return <figure className={`customer-story story-tone-${index}`}>
    <div className="story-theme"><Icon size={17} aria-hidden="true" /><span>{story.theme}</span></div>
    <span className="story-quote-mark" aria-hidden="true">“</span>
    <blockquote><p>{story.quote} <strong>{story.highlight}</strong></p></blockquote>
    <figcaption>
      <div className="story-person"><span className="story-avatar" aria-hidden="true">{story.initials}</span><div><span className="story-name">{story.name}</span><span className="story-role">{story.role}</span></div></div>
      <span className={`story-company story-company-${index}`}>{story.company}</span>
    </figcaption>
  </figure>
}

export function CustomerStories() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const visible = useInView(sectionRef, { amount: .1 })
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [browsing, setBrowsing] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    const group = groupRef.current
    if (!rail || !group || !visible || reducedMotion || hovered || focused || browsing) return
    let frame = 0
    let previous = 0
    let position = rail.scrollLeft
    const animate = (time: number) => {
      if (previous && !document.hidden) {
        position += Math.min(time - previous, 48) * .022
        if (position >= group.offsetWidth) position -= group.offsetWidth
        rail.scrollLeft = position
      }
      previous = time
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [visible, reducedMotion, hovered, focused, browsing])

  function browse(direction: number) {
    const rail = railRef.current
    const group = groupRef.current
    if (!rail || !group) return
    setBrowsing(true)
    const step = group.offsetWidth / stories.length
    // Keep the native scroll position in the equivalent first loop before moving.
    if (direction < 0 && rail.scrollLeft < step) rail.scrollLeft += group.offsetWidth
    if (direction > 0 && rail.scrollLeft >= group.offsetWidth) rail.scrollLeft -= group.offsetWidth
    const next = direction > 0 ? Math.floor(rail.scrollLeft / step + .01) + 1 : Math.ceil(rail.scrollLeft / step - .01) - 1
    rail.scrollTo({ left: next * step, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return <section className="customer-stories" id="customer-stories" aria-labelledby="customer-stories-title" ref={sectionRef}>
    <header className="customer-stories-heading">
      <div><span className="stories-eyebrow">THE PEOPLE BEHIND THE WORK</span><h2 id="customer-stories-title">A better workday,<br /><em>in their own words.</em></h2></div>
    </header>
    <div className="stories-rail" ref={railRef} role="region" aria-label="Customer stories. Use the arrow keys or swipe to browse." tabIndex={0}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      onPointerDown={() => setBrowsing(true)} onWheel={() => setBrowsing(true)}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); browse(event.key === 'ArrowRight' ? 1 : -1) } }}>
      <div className="stories-track">
        <div className="stories-group" ref={groupRef}>{stories.map((story, index) => <StoryCard key={story.name} story={story} index={index} />)}</div>
        <div className="stories-group stories-repeat" aria-hidden="true">{stories.map((story, index) => <StoryCard key={story.name} story={story} index={index} />)}</div>
      </div>
    </div>
    <footer className="stories-footer"><a href={signupUrl}>Find your flow with Huble <ArrowUpRight size={18} aria-hidden="true" /></a></footer>
  </section>
}
