# Mudit Agarwal — Portfolio

Animated WebGL portfolio (Vite + React + React Three Fiber + GSAP + Lenis),
visually inspired by redoyanulhaque.me and rebuilt from scratch with original
code and content.

## Run

```bash
npm install
npm run dev        # dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Edit content

All text, links, projects, timeline, and tech-stack entries live in
**`src/data/site.js`** — no component edits needed for content changes.

- Replace the resume: overwrite `public/assets/CV.pdf`
- Project poster images: put real screenshots in `public/assets/projects/`
  and set each project's `image` field (posters currently render as styled
  gradient cards)
- 3D character: `public/assets/models/RobotExpressive.glb` (CC0, from the
  three.js examples). Swap in any rigged GLB with an `Idle`/`Sitting` clip —
  e.g. a Ready Player Me avatar — and adjust `src/scenes/`.

## Structure

- `src/sections/` — Hero, WhatIDo, Career, Work (pinned horizontal gallery),
  TechStack, Footer
- `src/scenes/` — React Three Fiber scenes (hero avatar, desk scene)
- `src/components/` — Preloader, CustomCursor, Navbar, SocialRail
- `src/lib/` — GSAP/ScrollTrigger registration, Lenis smooth-scroll provider

## Deploy (free)

Ready for Vercel (`vercel.json` SPA rewrite included): import the repo at
vercel.com → framework "Vite" → deploy. Netlify or GitHub Pages work too
(add an SPA fallback for client-side routing).

## Dev verification scripts

`scripts/drive.mjs` and `scripts/mobile_check.mjs` drive headless Chrome
through every section and save screenshots (needs `npm run dev` on port 5199;
set `OUT_DIR` to where screenshots should go).
