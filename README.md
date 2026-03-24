# UG Physics Laboratory Explorer

Welcome to the **UG Physics Laboratory** project web portal! This interactive web platform provides students and faculty with an immersive, digitally simulated environment to explore laboratory resources, study experiments, and connect seamlessly on any computer or mobile device.

## 🌟 Key Features

* **Fully Responsive Design**: Hand-crafted layouts meticulously optimized for giant desktop monitors down to tiny mobile phone screens. We emphasize clean typography and frictionless reading without squinting or pinching.
* **Interactive Faculty Deck**: An ultra-smooth, native gesture-powered horizontal unfolding swipe carousel for exploring faculty members effortlessly on the go.
* **Responsive Lab Manual Viewer**: A sleek, full-screen PDF experiment protocol viewer stripped of clunky native UI, fortified with an ambient dismissible toast notification for flawless navigation and an expanded canvas.
* **High-Performance Animations**: Lightning-fast hardware-accelerated transitions that natively track mobile layouts to provide 60 FPS buttery-smooth experiences without compromising battery life.
* **Intelligent Modals**: Fully robust modals preventing background layout shifts or unexpected overflow clips.

## 📱 Mobile-First Optimizations

We recently introduced significant quality-of-life adjustments to specifically accommodate modern smartphones:
- Redesigned the *Meet the Faculty* 3D deck into a space-efficient tap-to-expand card carousel.
- Safely placed crucial navigation hints completely inside device bounds so they don't clip against standard phone boundaries.
- Optimized the Physics "electrical surge" canvas animations, intelligently bypassing heavy rendering sequences exclusively on low-resource mobile screens to maintain lightning-fast responsiveness.
- Redesigned the document viewer components to ensure that nested scroll bars and tools stay natively tucked away until needed.

## 🚀 Technical Architecture

Built purely relying on zero-dependency native web fundamentals alongside precision animation engines:
- **HTML5:** Semantic, accessible components defining flawless layouts.
- **CSS3:** Custom layout tokens pushing edge-of-the-browser properties for native touch scrolling, fluid breakpoints, and blur filters.
- **JavaScript (Vanilla + GSAP):** Direct DOM manipulations and robust interaction hooks prioritizing the native Browser Engine. GreenSock handles timeline sequences where layout interpolation goes beyond static transitions.

## 🛠 Usage

1. **Viewing the Lab:** Open the main `index.html` link on any device.
2. **Accessing Menus:** Tap directly on modal triggers to pull up dynamic experiment overviews for *Theory*, *Procedure*, *Resources*, and *Videos*.
3. **Exploring Faculty:** From a phone, tap the stacked deck to smoothly fan out the roster horizontally.
4. **Learning Materials:** Access the dedicated PDF web viewer to load specific protocol pages effortlessly!

---

*This project represents our ongoing commitment to elevating the digital science learning experience for every student, regardless of the device they connect from.*
