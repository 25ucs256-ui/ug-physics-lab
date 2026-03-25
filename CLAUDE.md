# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UG Physics Laboratory portal for LNMIIT — a static website (no build system, no bundler, no package manager) for undergraduate physics lab students. Serves experiment info, video demonstrations, faculty directory, and an embedded PDF lab manual viewer.

## Development

Open `index.html` directly in a browser or use any static file server (e.g. `npx serve .` or VS Code Live Server). There are no build, lint, or test commands.

## Architecture

- **`index.html`** — Single-page app with all sections: hero, experiments directory, video showcase, faculty cards, facilities, contact, and an experiment detail modal.
- **`pdf-viewer.html`** — Standalone page that embeds a Google Drive PDF via iframe, accepts `?page=N` query param.
- **`assets/js/labData.js`** — Central data store. All experiment content (theory, procedure, resources, page references), YouTube video links, and faculty info live here as plain JS globals (`experiments`, `experimentVideos`, `facultyData`). Must be loaded before `main.js`.
- **`assets/js/main.js`** — Core UI logic. Renders experiment cards, video showcase, faculty swiper, pill navigation, scroll-reveal, stat counters, and the experiment detail modal. Runs everything inside a single `DOMContentLoaded` listener.
- **`assets/js/splashCursor.js`** — WebGL fluid simulation on the hero canvas. Disabled on mobile (< 768px).
- **`assets/js/electricEffect.js`** — Canvas-based electric lightning border effect for faculty cards. Uses GSAP-safe sizing (offsetWidth/offsetHeight, not getBoundingClientRect).
- **`assets/js/heroParticles.js`** — Floating particle animation on the hero section canvas.
- **`assets/css/index.css`** — All styles in one file. Uses CSS custom properties for theming (colors, spacing, typography). BEM-style class naming.

## Key External Dependencies (loaded via CDN)

- **GSAP 3.12.5** + ScrollTrigger + Flip — scroll animations, faculty card pin/flip transitions
- **Lenis 1.1.13** — smooth scroll (replaces native scroll; `data-lenis-prevent` attribute disables it on specific elements like the modal)
- **Spline Viewer** — 3D scene in hero, loaded dynamically only on desktop (> 768px)
- **Google Fonts** — Space Grotesk (headings) + Inter (body)

## Important Patterns

- Scroll restoration is manually disabled (`history.scrollRestoration = 'manual'`) both in an inline `<script>` in `<head>` and in `main.js` to prevent race conditions with Lenis/GSAP.
- `ScrollTrigger.refresh(true)` is called after 2 rAF frames post-DOMContentLoaded to ensure correct pin calculations.
- The experiment modal uses tabs (Theory, Procedure, Videos, Resources) populated dynamically from `labData.js` data.
- To add/edit experiments: modify the `experiments` array in `labData.js`. To add videos: modify `experimentVideos`. To add faculty: modify `facultyData`.
