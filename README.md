# Huble UI

A React homepage mockup for the gethuble.com marketing site. Build each section
from the supplied visual designs. The current mockup includes the navigation and hero, using a white and teal theme.

## Development

Use Node.js 22.12+ or a compatible newer LTS release (set up with Node.js 24).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Edits update automatically.

```sh
npm run build   # Type-check and generate production files in dist/
npm run lint    # Check code with Oxlint
npm run preview # Preview the production build locally
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS with the official Vite plugin
- Motion (`motion/react`) for animation; reduced-motion preferences are respected globally
- Lucide React for icons
- `clsx` + `tailwind-merge` via `cn()` for composing CSS classes

Tailwind is connected in `vite.config.ts` and imported in `src/index.css`.
Use the CSS `@theme` block for design tokens once the visual direction is supplied.

## Structure

```text
src/
  assets/             Images, fonts, and other imported assets
  components/
    ui/               Shared UI elements
    sections/         Homepage sections
  lib/utils.ts        Class-name helper
  pages/HomePage.tsx  Homepage composition
  App.tsx             Application and motion configuration
  index.css           Tailwind, theme tokens, and global base styles
public/               Static assets served directly
```

The mockup includes a noindex directive to discourage search engine indexing.

## Reference assets and links

The wordmark and fonts are from https://gethuble.com. The icon is user-supplied.
Navigation, sign-up, and download links use existing Huble destinations.
The demo link currently opens the live Huble homepage, where booking is handled.
The hero now includes a flowing teal background with small logo-inspired accents and a large app screenshot frame. The frame contains a screenshot captured from the live gethuble.com hero on October 27, 2026, including the full app sidebar and dashboard. The background has five floating logo marks in varied sizes.

To add the app screenshot, import the image in `HeroSection.tsx` and pass it to `<AppShowcase screenshotSrc={image} screenshotAlt="Description of the app view" />`. The screenshot keeps its natural aspect ratio so the full app view remains visible.

Smooth teal bands and small logo accents use slow 22–30 second loops. Visible pause controls are removed; reduced-motion preferences disable decorative motion automatically. The animation uses local SVG/CSS and needs no new dependency.

The company section below the screenshot keeps the six existing gethuble.com wordmarks: Northbeam, Kestrel, Parallax, stack/lab, Meridian, and Foldsend. `CompanyStrip.tsx` presents them in a monochrome, continuously scrolling row with faded edges. Hover pauses the row; reduced-motion preferences show all six in a static wrapping layout. Repeated wordmarks are hidden from screen readers. These are typographic treatments of the existing names, not newly sourced official logo images.

## Inside Huble walkthrough

`InsideHuble.tsx` and its scoped stylesheet add the next homepage section below the company strip. A mint window grows beneath “See what’s inside Huble” as the visitor scrolls, then reveals five chapters: Timesheets, Project Management, People, Activity, and Reports. The chapter links also move directly through the walkthrough. Native page scrolling remains in control; there is no wheel or touch interception.

Content covers all fifteen features from the live gethuble.com product section, reviewed October 28, 2026. The product panels recreate the five supplied working-app screens in HTML/CSS, preserving the displayed labels, values, cards, tables, and report bars. They are visual previews, not live application controls. Toggl’s expanding highlight was studied as interaction inspiration; the layout, styling, and chapter treatment are specific to this mockup.

The pinned experience requires a viewport at least 1000px wide and 720px tall. Smaller viewports and reduced-motion preferences show all five chapters in normal document flow with anchor navigation. Motion uses the existing `motion/react` dependency. `AppFeatureViews.tsx` and its stylesheet implement the app screens with 260ms staggered row reveals, 800ms left-to-right bar fills, and counters that settle on the supplied values. These reveal as the panel enters view and replay when a desktop chapter is revisited. Reduced-motion preferences show final values and disable the reveals.

## Tracking benefits

The benefits section uses a white background and four CSS/SVG illustrations with a single click/tap toggle per card. All preview content is React and CSS, based on the live gethuble.com timer, idle review, Today sessions, and billable project cards reviewed October 29, 2026. No screenshots are used in these cards. The timer ticks while its preview is visible; idle-time choices, Stop/Resume, the billable switch, and bill-rate editing are local demonstrations only. Hidden card faces are inert. Entry animations and ticking respect reduced-motion preferences, and timers stop while offscreen. Cards switch to two columns below 1100px and one below 580px.

Walkthrough chapter numbers have been removed from the navigation, labels, and footer. Summary text is 17px; feature descriptions are 14px on desktop and 15px on mobile, with darker colors for readability.

## Integrations

`IntegrationsSection.tsx` follows the benefits section with a deep teal (#102e29) background, mint typography, and an animated connection diagram. It uses the six integration names and SVG logos shown on gethuble.com, reviewed October 30, 2026; the locally saved logos are in `src/assets/integrations/`. Hover, keyboard focus, or tap highlights a tool's path to Huble and identifies its category. These are illustrative connections, not live account connection states. The CTA uses the existing Huble signup URL.

SVG connection signals run only while the section is in view and become static under reduced-motion preferences. The layout stacks below 1000px, with smaller logo nodes below 540px and 380px. No new dependencies or network calls are needed for the section.

## Customer stories

`CustomerStories.tsx` follows integrations with a warm-white, full-width story rail. The four quotes, names, roles, and companies are preserved from gethuble.com, reviewed October 30, 2026. Typography, initials, topic icons, and subtle card colors replace the meme and video-call imagery. No ratings, reviewer photos, verification badges, additional reviewers, or customer-count claims have been invented.

An identical second group enables the seamless visual loop and is hidden from assistive technology. Motion stops offscreen, on hover or focus, and permanently after manual browsing. Visitors can use keyboard arrows or native touch scrolling. The supplementary introduction, navigation buttons, and footer sentence are omitted for a cleaner presentation. Reduced-motion preferences disable automatic movement. Cards retain full quote text and use responsive widths; the CTA points to the existing signup destination.


## Pricing

`PricingSection.tsx` adds the one-plan pricing section after customer stories. A dark teal offer panel sits beside the complete 17-feature list. Native radio inputs switch between $99 monthly and $79 per month billed annually ($948 per year), with annual selected by default. The 20% savings label rounds the 20.2% difference against monthly billing. Prices and features were checked against both billing options at https://gethuble.com/pricing on October 30, 2026.

The price transition and card entrance respect reduced-motion preferences through the existing Motion configuration. The layout stacks below 780px; the feature list becomes one column below 400px. Header Pricing links navigate to this section, and the trial CTA retains the existing signup destination. Selecting a billing period only updates this preview; it does not purchase a plan or change an account.


## Footer

`SiteFooter.tsx` closes the homepage with a dark teal footer, the existing Huble wordmark, product and company links, platform download cards, and legal links. Destinations and the explicitly “in progress” compliance labels follow the live Huble footer reviewed October 30, 2026. The local Pricing link points to the homepage section. “System status” links to the status page without presenting a hard-coded operational claim.

Cookie preferences opens a native modal dialog with Escape dismissal, focus trapping, and focus return to its trigger. It describes the current preview, which installs no optional analytics or advertising tracking; there are no pretend consent toggles or live-service preference changes. Connect the production consent manager here if optional tracking is introduced. Footer columns wrap to three and two columns on smaller viewports. No floating chat widget or additional external scripts are added.
