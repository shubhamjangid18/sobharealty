# Sobharealty — Premium One-Page Website

A single-page, premium construction/real-estate website built with
**React + Vite**, plain **JSX/CSS** (no CSS framework), and
**Framer Motion** for cinematic scroll and load animations.

Inspired by the tone of sobharealty.com — dark, editorial, materials-led —
but built as fully original code and copy.

## Getting started (VS Code)

```bash
# 1. Unzip and open the folder in VS Code
cd sobharealty

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
# → opens http://localhost:5173

# 4. Build for production
npm run build
# → outputs to /dist

# 5. Preview the production build
npm run preview
```

Requires Node.js 18+.

## Folder structure

```
sobharealty/
├── index.html                 # HTML shell + Google Fonts (Fraunces / Inter / IBM Plex Mono)
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Composes every section, controls preloader state
    ├── App.css
    ├── index.css                # Design tokens: colors, type, spacing, .btn/.eyebrow utilities
    │
    ├── components/              # One component = one .jsx + one .css, same name
    │   ├── PreLoader.jsx / .css      # Load-in "blueprint draw" animation
    │   ├── MeasureLine.jsx / .css    # Signature element — fixed scroll-progress "tape measure"
    │   ├── Navbar.jsx / .css         # Sticky nav, solidifies on scroll, mobile menu
    │   ├── Hero.jsx / .css           # Full-bleed hero, staggered headline reveal
    │   ├── Marquee.jsx / .css        # Auto-scrolling project name ticker
    │   ├── About.jsx / .css          # Brand philosophy / statement section
    │   ├── Pillars.jsx / .css        # 3-step process: Craftsmanship / Design / Quality
    │   ├── Stats.jsx / .css          # Count-up animated stats strip
    │   ├── Projects.jsx / .css       # Residence/project card grid
    │   ├── Amenities.jsx / .css      # Amenities grid
    │   ├── Testimonials.jsx / .css   # Quote carousel
    │   ├── Contact.jsx / .css        # Enquiry form + contact details
    │   ├── Footer.jsx / .css
    │   └── FloatingCTA.jsx / .css    # Sticky "Enquire Now" pill, appears after hero
    │
    └── hooks/
        ├── useReveal.js         # IntersectionObserver-based scroll-reveal hook
        └── useCountUp.js        # Eased count-up animation hook (used by Stats)
```

## Design system

- **Palette** — ink black, warm ivory, concrete grey, brushed brass accent
  (`src/index.css` → `:root` CSS variables). Change values there to re-theme
  the entire site.
- **Type** — `Fraunces` (display serif) for headlines, `Inter` for body
  copy, `IBM Plex Mono` for labels/eyebrows/numerals — a nod to
  architectural drawing callouts.
- **Signature element** — the brass "measure line" fixed to the left edge
  of the viewport (`MeasureLine.jsx`), which fills as the visitor scrolls,
  like a site surveyor's plumb line.
- **Motion** — Framer Motion powers the preloader, hero headline stagger,
  scroll-triggered reveals (`useReveal`) and the animated stat counters
  (`useCountUp`). Respects `prefers-reduced-motion`.

## Swapping in real imagery

Every visual "photo" placeholder (hero background, About frame, project
card media) is currently a CSS gradient so the project runs with zero
external assets. To use real photography:

1. Drop images into `src/assets/`.
2. Import them in the relevant component, e.g. in `Hero.jsx`:
   ```jsx
   import heroImg from "../assets/hero.jpg";
   ```
3. Replace the corresponding `background:` gradient in the component's
   `.css` file with `background-image: url(...)`, or set it inline via
   the imported image.

## Customizing content

All copy (headline, pillars, amenities, testimonials, project list,
contact details) lives directly inside each component file as plain
arrays/JSX — no CMS or data layer — so it's easy to find-and-replace with
your own project names, stats and contact details.
