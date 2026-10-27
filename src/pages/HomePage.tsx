import { SiteHeader } from '../components/sections/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
      </main>
    </>
  )
}
