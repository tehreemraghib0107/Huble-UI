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

Smooth teal bands and small logo accents use slow 22–30 second loops. A pause/play control stops all decorative motion, and reduced-motion preferences disable it automatically. The animation uses local SVG/CSS and needs no new dependency.
