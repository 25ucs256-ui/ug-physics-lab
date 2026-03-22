# ⚛️ UG Physics Laboratory 

> **A professional, interactive web portal designed for undergraduate students at LNMIIT to explore the fundamentals of Physics through experimentation and modern digital resources.**

---

## 🌟 Overview

The **UG Physics Laboratory Portal** is a high-performance, aesthetically rich web application that serves as a digital companion to the 1st-year B.Tech Physics course. It bridges the gap between theoretical knowledge and practical application by providing students with interactive 3D visuals, demonstrative videos, and digitized lab manuals.

### 🚀 [Live Demo (Vercel)](https://ug-physics-lab-v3.vercel.app) *(Replace with your actual Vercel URL once deployed)*

---

## ✨ Key Features

### 🌌 Immersive 3D Experience (Spline)
- **Interactive Robot Hero:** A high-fidelity 3D model that reacts to user presence.
- **Physics GPT AI Integration:** Direct access to an AI assistant explicitly for Physics queries.

### 🧪 Digital Experiments Directory
- **Dynamic Grid Navigation:** Explore the curriculum through an optimized, staggered-reveal grid.
- **Seamless Modal Transitions:** Uses **GSAP Flip** technology to expand experiment cards into full-screen interactive panels without jarring jumps.
- **Electric Border Effects:** Custom high-performance canvas lightning around active experiment panels.

### 📹 Curated Video Showcase
- **Cinema Mode:** Demo and walkthrough videos for every experiment, directly integrated with YouTube for visual learning.
- **Magnetic 3D Cards:** Advanced hover effects using trigonometric math for depth and lighting simulation.

### 📑 Integrated Lab Resources
- **Embedded PDF Viewer:** High-fidelity lab manual integration with direct page navigation.
- **Structured Theory & Procedure:** Every experiment includes centralized data for Theory, Procedure, and Tab-based resources.

### 🖱️ State-of-the-art UI/UX
- **Lenis Smooth Scroll:** Consistent, buttery-smooth scrolling across all browsers.
- **Floating Pill Navigation:** Smart, auto-tracking island navigation with sliding highlight indicators.
- **Splash Fluid Cursor:** WebGL-based fluid simulation that trails the mouse cursor on the hero section.

---

## 🛠️ Technology Stack

| Layer | Technologies used |
| :--- | :--- |
| **Frontend** | HTML5 Semantic Tags, Vanilla CSS (Modern Fluid Typography) |
| **Logic** | Pure Vanilla JavaScript (Modular ES6 Pattern) |
| **Animation** | [GSAP](https://gsap.com/) (ScrollTrigger, Flip, Timeline) |
| **3D Rendering** | [Spline](https://spline.design/) (WebGL Engine) |
| **Smooth Motion** | [Lenis](https://lenis.darkroom.engineering/) |
| **Styling** | Futuristic Glassmorphism, Neon/Electric Aesthetic |

---

## 📂 Project Structure

```text
ug-physics-lab/
├── assets/
│   ├── css/
│   │   └── index.css           # Centralized Design System & Tokens
│   ├── js/
│   │   ├── main.js             # Core UI Interactions & Logic
│   │   ├── labData.js          # Centralized Database for Experiments
│   │   ├── electricEffect.js   # Canvas Lightning Logic
│   │   ├── heroParticles.js    # Floating Particle System
│   │   └── splashCursor.js     # WebGL Fluid Overlay
│   └── images/
│       └── card-front.png      # High-end Faculty/Resource Graphics
├── index.html                  # Main Entry Point
├── pdf-viewer.html             # Specialized Manual View
└── .gitignore                  # Keeps your deployment clean
```

---

## 🚢 Deployment

The project is optimized for deployment via **Vercel** or **GitHub Pages**.

1. **Vercel:** Just import this repository. Vercel automatically detects the root `index.html`.
2. **Local:** Simply open `index.html` in any modern web browser.

---

## ✍️ Authors

- **Lakshit Singh** - *Development & Interactive Design*

---

> "Laboratory work is a very important part of a course in General Physics. It reinforces the student's understanding of fundamental concepts while developing scientific measurement skills."
