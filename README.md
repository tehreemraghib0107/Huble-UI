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
