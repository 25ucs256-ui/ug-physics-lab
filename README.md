# ⚛️ UG Physics Laboratory — LNMIIT

A modern, interactive landing page for the Undergraduate Physics Laboratory at [LNMIIT Jaipur](https://www.lnmiit.ac.in/).

---

## 🌟 Features

- **Interactive Hero Section** — Spline 3D viewer with particle effects and splash cursor
- **Experiments Directory** — Filterable card grid for all General Physics & Optics experiments
- **Video Showcase** — Curated YouTube video library with category filters
- **Faculty Cards** — Scroll-animated cg-lusion cards for each faculty member
- **Facilities Overview** — HPC & Experimental Materials Science Lab details
- **Contact Section** — Complete institute contact information
- **PDF Lab Manual** — Direct link to the official lab manual

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 / CSS3 | Structure & Styling |
| Vanilla JavaScript | Interactivity & Logic |
| [GSAP 3](https://greensock.com/gsap/) | Scroll animations & transitions |
| [Lenis](https://lenis.studiofreight.com/) | Smooth scrolling |
| [Spline](https://spline.design/) | 3D interactive hero scene |
| Google Fonts | Typography (Space Grotesk) |

## 📁 Project Structure

```
ug-lab/
├── index.html          # Main HTML — page structure & all sections
├── index.css           # All styles — design system, components, animations
├── main.js             # Core logic — experiment cards, video showcase, modals
├── labData.js          # Data — experiments, faculty, videos, facilities
├── splashCursor.js     # WebGL splash/fluid cursor effect
├── electricEffect.js   # Electric arc canvas animation
├── heroParticles.js    # Particle field for the hero section
├── pdf-viewer.html     # In-page PDF viewer for the lab manual
├── background.png      # Background texture asset
└── cg-lusion-cards/    # Faculty card assets
    └── assets/
        └── card-front.png
```

## 🚀 Getting Started

This is a **static website** — no build step required.

1. Clone the repository:
   ```bash
   git clone https://github.com/25ucs256-ui/ug-lab.git
   ```

2. Open `index.html` in your browser, or serve with any static file server:
   ```bash
   npx serve .
   ```

## 📖 Lab Sections

- **UG Physics Lab** — General Physics experiments (Mechanics, Electricity, etc.)
- **UG Physics Optics Lab** — Optics experiments (Diffraction, Spectrometer, etc.)

## 📬 Contact

**Department of Physics, LNMIIT Jaipur**
- 📍 Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur-302031, Rajasthan, INDIA
- 📧 [info.lnmiit@lnmiit.ac.in](mailto:info.lnmiit@lnmiit.ac.in)

---

*Created by [Lakshit Singh](https://instagram.com/laksh.it_)*
