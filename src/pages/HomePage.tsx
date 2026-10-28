import { SiteHeader } from '../components/sections/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { CompanyStrip } from '../components/sections/CompanyStrip'
import { TrackingBenefits } from '../components/sections/TrackingBenefits'
import { InsideHuble } from '../components/sections/InsideHuble'

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <CompanyStrip />
        <InsideHuble />
        <TrackingBenefits />
      </main>
    </>
  )
}
