import { SiteHeader } from '../components/sections/SiteHeader'
import { HeroSection } from '../components/sections/HeroSection'
import { CompanyStrip } from '../components/sections/CompanyStrip'
import { TrackingBenefits } from '../components/sections/TrackingBenefits'
import { InsideHuble } from '../components/sections/InsideHuble'
import { IntegrationsSection } from '../components/sections/IntegrationsSection'
import { CustomerStories } from '../components/sections/CustomerStories'
import { PricingSection } from '../components/sections/PricingSection'
import { SiteFooter } from '../components/sections/SiteFooter'

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
        <IntegrationsSection />
        <CustomerStories />
        <PricingSection />
      </main>
      <SiteFooter />
    </>
  )
}
