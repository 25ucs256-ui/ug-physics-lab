/* ============================================================
   UG Physics Lab — Main JavaScript
   Handles: Nav scroll, hamburger, wave interference canvas,
            stat counters, scroll-reveal, nav active state
   ============================================================ */

// ─── Disable browser scroll restoration ─────────────────────────────────────
// Chrome/Firefox restore scroll AFTER DOMContentLoaded, AFTER Lenis takes
// control of the scroll system. The browser's late-restore attempt gets
// silently blocked by Lenis (which sets overflow:hidden on html/body), leaving
// the page in an undefined mid-animation state. Setting 'manual' here prevents
// the browser from even attempting a late scroll restore. Every GSAP scroll-
// animation site does this. The page always starts clean at Y=0.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    // Force Y=0 — GSAP pin spacer math is only correct from a clean baseline.
    window.scrollTo(0, 0);

    // Guarantee hero never collapses while Spline loads off-screen.
    const heroSection = document.getElementById('hero');
    if (heroSection) heroSection.style.minHeight = '100vh';

    initPillNav();
    initHeroSpotlight();
    initSplashCursor('hero-splash-canvas', 'hero');
    renderExperimentGrid();
    initScrollReveal();
    initStatCounters();
    initPillNavActiveState();
    initExperimentModal();
    initVideoShowcase();
    initFacultySwiper();  // registers all ScrollTrigger instances at Y=0

    // Force ScrollTrigger to recalculate all pins/starts/ends after the DOM
    // has fully painted (2 rAF frames = guaranteed post-layout).
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh(true);
            }
        });
    });
});

// ------- Data is loaded from labData.js (included before this script) -------
// Globals provided by labData.js: facultyData, experimentVideos, experiments



/* ---------- Pill Nav: Sliding Indicator ---------- */
function initPillNav() {
    const nav = document.getElementById('pill-nav');
    const track = nav?.querySelector('.pill-nav__track');
    const indicator = document.getElementById('pill-indicator');
    const links = nav?.querySelectorAll('.pill-nav__link');
    if (!nav || !track || !indicator || !links?.length) return;

    function moveIndicator(link) {
        const trackRect = track.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const padding = parseFloat(getComputedStyle(track).paddingLeft) || 4;

        indicator.style.left = (linkRect.left - trackRect.left) + 'px';
        indicator.style.width = linkRect.width + 'px';
    }

    // Set initial indicator position
    const activeLink = nav.querySelector('.pill-nav__link.active');
    if (activeLink) {
        // Wait for fonts/layout to settle then position
        requestAnimationFrame(() => {
            requestAnimationFrame(() => moveIndicator(activeLink));
        });
    }

    // Click handler
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moveIndicator(link);
        });
    });

    // Reposition on resize
    window.addEventListener('resize', () => {
        const current = nav.querySelector('.pill-nav__link.active');
        if (current) moveIndicator(current);
    });

    // Expose for external use (scroll tracking)
    window._pillNavMoveIndicator = moveIndicator;
}

/* ---------- Hero Spotlight Area Interactive Glow ---------- */
function initHeroSpotlight() {
    const hero = document.getElementById('hero');
    const glow = document.getElementById('hero-spotlight-glow');
    if (!hero || !glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTracking = false;

    // Smooth pursuit setup
    const updateGlow = () => {
        if (!isTracking) return;
        // LERP interpolation for ultra-smooth trailing effect
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        // CSS transform gives GPU-accelerated movement
        glow.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`;
        requestAnimationFrame(updateGlow);
    };

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        if (!isTracking) {
            isTracking = true;
            // Initialize positions instantly so there is no huge trail on first hover
            mouseX = targetX;
            mouseY = targetY;
            glow.style.opacity = '1';
            requestAnimationFrame(updateGlow);
        }
    });

    hero.addEventListener('mouseleave', () => {
        isTracking = false;
        glow.style.opacity = '0.5';
        // Reset to center smoothly via CSS transition fallback or leave at edge
        glow.style.transform = 'translate(-50%, -50%)';
    });

    // Remove Spline watermark explicitly from the Shadow DOM
    const spline = document.querySelector('spline-viewer');
    if (spline) {
        // Spline loads its UI asynchronously into the shadow root
        const hideLogoInterval = setInterval(() => {
            const logo = spline.shadowRoot?.querySelector('#logo');
            if (logo) {
                logo.remove();
                clearInterval(hideLogoInterval); // Target acquired and destroyed
            }
        }, 100);

        // Safety fallback so the interval doesn't run forever if the logo changes ID
        setTimeout(() => clearInterval(hideLogoInterval), 6000);
    }
}

/* ---------- Scroll-reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
}

/* ---------- Animated stat counters ---------- */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat__number[data-target]');
    if (!stats.length) return;

    let triggered = false;
    const statsBar = document.getElementById('stats-bar');
    if (!statsBar) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                stats.forEach(el => animateCounter(el));
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsBar);
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quad
        const ease = 1 - (1 - progress) * (1 - progress);
        el.textContent = Math.round(ease * target);

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target + '+';
        }
    }

    requestAnimationFrame(tick);
}

/* ---------- Render Experiment Grid Dynamically ---------- */
function renderExperimentGrid() {
    const grid = document.getElementById('exp-grid');
    if (!grid) return;

    // Use the explicit order defined in labData.js
    grid.innerHTML = experimentOrder.map(id => {
        const exp = experiments[id];
        if (!exp) return '';

        return `
            <div class="exp-card reveal" data-experiment="${id}" role="button" tabindex="0">
                <div class="exp-card__icon exp-card__icon--${exp.iconColor}">
                    ${exp.iconSvg}
                </div>
                <h3 class="exp-card__title">${exp.cardTitle || exp.title}</h3>
                <p class="exp-card__text">${exp.cardDesc}</p>
            </div>
        `;
    }).join('');
}

/* ---------- Pill Nav: active link tracking on scroll ---------- */
function initPillNavActiveState() {
    const navLinks = Array.from(document.querySelectorAll('.pill-nav__link'));
    if (!navLinks.length) return;

    // Only observe sections that actually have a corresponding nav link
    const sections = navLinks
        .map(link => document.getElementById(link.getAttribute('data-section')))
        .filter(Boolean);

    if (!sections.length) return;

    // Use a more forgiving observer to capture short sections + bottom of the page
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('data-section') === id;
                    link.classList.toggle('active', isActive);
                    if (isActive && window._pillNavMoveIndicator) {
                        window._pillNavMoveIndicator(link);
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-10% 0px -40% 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Fallback: check if user reached the very bottom of the page
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            const contactLink = navLinks.find(l => l.getAttribute('data-section') === 'contact');
            if (contactLink && !contactLink.classList.contains('active')) {
                navLinks.forEach(link => link.classList.remove('active'));
                contactLink.classList.add('active');
                if (window._pillNavMoveIndicator) {
                    window._pillNavMoveIndicator(contactLink);
                }
            }
        }
    }, { passive: true });
}

/* ---------- Experiment Detail Modal ---------- */
function initExperimentModal() {
    // Register Flip securely locally if available
    if (typeof Flip !== "undefined") {
        gsap.registerPlugin(Flip);
    }

    const modal = document.getElementById('exp-modal');
    const backdrop = document.getElementById('exp-modal-backdrop');
    const closeBtn = document.getElementById('exp-modal-close');
    const titleEl = document.getElementById('exp-modal-title');
    const eyebrowEl = document.getElementById('exp-modal-eyebrow');
    const tabsWrap = document.getElementById('exp-modal-tabs');
    const contentEl = document.getElementById('exp-modal-content');
    const cards = document.querySelectorAll('.exp-card[data-experiment]');

    if (!modal || !cards.length) return;

    const modalPanel = modal.querySelector('.exp-modal__panel');

    // ------- Renderers for each tab -------
    function renderTab(experimentId, tabName) {
        const exp = experiments[experimentId];
        if (!exp) return '<p>Experiment data not found.</p>';

        switch (tabName) {
            case 'theory':
                return exp.theory;

            case 'procedure':
                return exp.procedure;

            case 'videos':
                return renderVideoCards(experimentId);

            case 'resources':
                return exp.resources.map(r => {
                    const linkHref = r.page
                        ? `pdf-viewer.html?page=${r.page}`
                        : r.href;
                    return `<a class="resource-link" href="${linkHref}" target="_blank" rel="noopener noreferrer">
                        <span class="resource-link__icon">${r.icon}</span>
                        <span>${r.label}</span>
                    </a>`;
                }).join('');

            default:
                return '<p>Content not available.</p>';
        }
    }

    // ------- State -------
    let currentExperiment = null;
    let currentTab = 'theory';
    let currentCardNode = null; // keep track of the clicked element for seamless collapse

    // ------- Open / Close -------
    function openModal(experimentId, clickedCard) {
        const exp = experiments[experimentId];
        if (!exp) return;

        currentExperiment = experimentId;
        currentTab = 'theory';
        currentCardNode = clickedCard;

        eyebrowEl.textContent = `// ${exp.category}`;
        titleEl.textContent = exp.title;

        // Reset tab states
        tabsWrap.querySelectorAll('.exp-modal__tab').forEach(t => {
            const isTheory = t.dataset.tab === 'theory';
            t.classList.toggle('active', isTheory);
            t.setAttribute('aria-selected', isTheory);
        });

        contentEl.innerHTML = renderTab(experimentId, 'theory');
        contentEl.scrollTop = 0;

        // --- FLIP Expansion Animation ---

        // 1. Temporarily display modal structure to ensure it has physical dimensions
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // clear lingering inline styles just in case
        gsap.set(modalPanel, { clearProps: "all" });

        // 2. Instantly fit the panel exactly over the grid card's position & size
        Flip.fit(modalPanel, currentCardNode);

        // 3. SECURE THE STARTING STATE (the small, card-sized state)
        const initialState = Flip.getState(modalPanel, { props: "borderRadius" });

        // 4. Strip inline styles so the panel instantly snaps to its true CSS layout (large modal)
        gsap.set(modalPanel, { clearProps: "all" });

        // Hide the original grid card so it looks like it transformed INTO the modal
        gsap.set(currentCardNode, { opacity: 0 });

        // 5. Play animation FROM the small recorded state, TO its current large layout.
        //    Start the electric glow AFTER Flip finishes — not during — so the canvas
        //    is sized correctly once the panel has fully settled at its final dimensions.
        Flip.from(initialState, {
            duration: 0.6,
            ease: "power3.out",
            scale: true,
            absolute: true,
            onComplete: () => startModalGlow()
        });
    }

    function closeModal() {
        // Stop the electric glow immediately before any Flip collapse starts,
        // so the canvas animation never runs while GSAP is transforming the panel.
        modalElectricEffect._stopAll();

        if (!currentCardNode) {
            fallbackClose();
            return;
        }

        // --- FLIP Collapse Animation ---

        // 1. Capture current uncollapsed state (large modal)
        const expandedState = Flip.getState(modalPanel, { props: "borderRadius" });

        // 2. Clear any active transforms/props to prevent conflicts, then fit the panel over the card's original bounds
        gsap.set(modalPanel, { clearProps: "all" });
        Flip.fit(modalPanel, currentCardNode);

        // 3. Animate FROM the large state TO this newly fitted small layout
        Flip.from(expandedState, {
            duration: 0.5,
            ease: "power3.inOut",
            scale: true,
            absolute: true,
            onComplete: fallbackClose
        });
    }

    function fallbackClose() {
        modalElectricEffect._stopAll();  // guard: stop if still running
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        gsap.set(modalPanel, { clearProps: "all" });

        if (currentCardNode) {
            gsap.set(currentCardNode, { opacity: 1 });
        }
        currentExperiment = null;
        currentCardNode = null;
    }

    // ------- Electric border effect on the modal panel -------
    // One persistent instance attached to the modal panel.
    // Starts the idle glow when the modal opens; surges on each tab click.
    const modalElectricEffect = new ElectricCardEffect(modalPanel, {
        color: '#60a5fa',
        idleSpeed: 0.35,
        idleChaos: 0.06,
        surgeSpeed: 5.5,
        surgeChaos: 0.28,
        surgeDuration: 280   // ms — surge ends then tab content switches
    });

    const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // Start / stop idle glow in sync with modal open/close
    function startModalGlow() { if (!touchDevice) modalElectricEffect._startIdle(); }
    function stopModalGlow() { modalElectricEffect._stopIdle(); }

    // ------- Tab switching (with electric surge) -------
    function switchTab(tabName) {
        if (!currentExperiment || tabName === currentTab) return;

        // Surge first, then commit the content swap inside the callback
        modalElectricEffect.surge(() => {
            currentTab = tabName;

            tabsWrap.querySelectorAll('.exp-modal__tab').forEach(t => {
                const isActive = t.dataset.tab === tabName;
                t.classList.toggle('active', isActive);
                t.setAttribute('aria-selected', isActive);
            });

            contentEl.innerHTML = renderTab(currentExperiment, tabName);
            contentEl.scrollTop = 0;

            // Resume idle glow after surge (desktop)
            if (!touchDevice) modalElectricEffect._startIdle();
        });
    }

    // ------- Event Listeners -------
    // Cards open the modal directly (no card-level electric effect).
    cards.forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.experiment, card));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.dataset.experiment, card);
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Tab clicks — surge then switch content
    tabsWrap.addEventListener('click', e => {
        const tab = e.target.closest('.exp-modal__tab');
        if (tab) switchTab(tab.dataset.tab);
    });

    // ---- Scroll isolation: stop wheel/touch events from reaching Lenis ----
    // Lenis attaches its wheel listener to the window. By stopping propagation
    // on the modal content, the event never bubbles up to Lenis — so the Modal
    // scrolls its own overflow instead of scrolling the page.
    contentEl.addEventListener('wheel', e => {
        const atTop = contentEl.scrollTop === 0;
        const atBottom = contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 1;
        // Only block if there is actually overflow to scroll within the modal
        if (contentEl.scrollHeight > contentEl.clientHeight) {
            // Also prevent page scroll when user hits the boundary
            if (!(atTop && e.deltaY < 0) && !(atBottom && e.deltaY > 0)) {
                e.stopPropagation();
            } else {
                e.stopPropagation(); // always block — don't let page scroll either
            }
        }
    }, { passive: false });

    // Touch devices
    contentEl.addEventListener('touchmove', e => {
        if (contentEl.scrollHeight > contentEl.clientHeight) {
            e.stopPropagation();
        }
    }, { passive: false });
}

/* ---------- Awesome Video Showcase (Cinema Mode) ---------- */
function initVideoShowcase() {
    const filters = document.getElementById('vshow-filters');
    const heroEl = document.getElementById('vshow-hero');
    const gridEl = document.getElementById('vshow-grid');
    if (!filters || !heroEl || !gridEl) return;

    // 1. Gather all videos from our global data
    let allVideos = [];
    for (const [expId, exp] of Object.entries(experiments)) {
        const vids = experimentVideos[expId] || [];
        vids.forEach(v => {
            allVideos.push({
                ...v,
                id: getYouTubeId(v.url),
                experimentTitle: exp.title,
                category: exp.category,
                expId: expId,
                thumb: getYouTubeThumbnail(v.url)
            });
        });
    }

    // 1.5 Generate Filter Pills based on Experiment Order
    experimentOrder.forEach((expId, index) => {
        const pill = document.createElement('button');
        pill.className = 'vshow__pill';
        pill.setAttribute('data-filter', expId);
        pill.textContent = `Exp ${index + 1}`;
        filters.appendChild(pill);
    });

    // 2. Render function for filtering
    function renderShowcase(filterVal) {
        // Filter
        const filtered = allVideos.filter(v => filterVal === 'all' || v.expId === filterVal);

        if (filtered.length === 0) {
            heroEl.innerHTML = '';
            gridEl.innerHTML = `<div class="video-empty" style="grid-column: 1/-1;">
                <span class="video-empty__icon">📭</span>
                <p>No videos found for this category.</p>
            </div>`;
            return;
        }

        // The first video becomes the "Featured" hero card
        const feat = filtered[0];
        heroEl.innerHTML = `
            <a href="${feat.url}" target="_blank" rel="noopener noreferrer" class="vshow-card feat-card magnetic" data-tilt>
                <div class="vshow-card__bg">
                    <img src="${feat.thumb}" alt="${feat.title}" onload="if(this.naturalWidth <= 120) { this.onload=null; this.src='https://img.youtube.com/vi/${feat.id}/hqdefault.jpg'; }" loading="lazy">
                    <div class="vshow-card__overlay"></div>
                </div>
                <div class="vshow-card__content">
                    <span class="vshow-badge">✨ Featured Showcase</span>
                    <h3 class="vshow-title">${feat.title}</h3>
                    <p class="vshow-exp">${feat.experimentTitle}</p>
                </div>
                <div class="vshow-play-btn">
                    <svg viewBox="0 0 68 68" fill="none"><circle cx="34" cy="34" r="33" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><circle cx="34" cy="34" r="28" fill="rgba(0,0,0,0.6)"/><polygon points="27,20 27,48 50,34" fill="white"/></svg>
                </div>
                <div class="glow"></div>
            </a>
        `;

        // Remaining videos in the grid
        const rest = filtered.slice(1);
        gridEl.innerHTML = rest.map((v) => `
            <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="vshow-card req-card magnetic" data-tilt>
                <div class="vshow-card__bg">
                    <img src="${v.thumb}" alt="${v.title}" onload="if(this.naturalWidth <= 120) { this.onload=null; this.src='https://img.youtube.com/vi/${v.id}/hqdefault.jpg'; }" loading="lazy">
                    <div class="vshow-card__overlay"></div>
                </div>
                <div class="vshow-card__content">
                    <h4 class="vshow-title-sm">${v.title}</h4>
                    <p class="vshow-cat">${v.category}</p>
                </div>
                <div class="vshow-play-sm">
                    <svg viewBox="0 0 68 68" fill="none"><circle cx="34" cy="34" r="28" fill="rgba(0,0,0,0.6)"/><polygon points="27,20 27,48 50,34" fill="white"/></svg>
                </div>
                <div class="glow"></div>
            </a>
        `).join('');

        // Apply magnetic 3D tilt effect to newly created cards
        initMagneticCards();
    }

    // 3. Magnetic Hover Effect (3D Tilt & Glow)
    function initMagneticCards() {
        const cards = document.querySelectorAll('.magnetic');

        cards.forEach(card => {
            const glow = card.querySelector('.glow');

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate position relative to center (-1 to 1)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const percentX = (x - centerX) / centerX;
                const percentY = -((y - centerY) / centerY); // Flipped Y for natural tilt

                // Max tilt angles: Front card gets bigger tilt
                const isFeat = card.classList.contains('feat-card');
                const maxTilt = isFeat ? 8 : 12;

                card.style.transform = `perspective(1000px) rotateY(${percentX * maxTilt}deg) rotateX(${percentY * maxTilt}deg) scale3d(${isFeat ? 1.02 : 1.04}, ${isFeat ? 1.02 : 1.04}, 1)`;

                // Update glow position
                if (glow) {
                    glow.style.transform = `translate(${x}px, ${y}px)`;
                    glow.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
                if (glow) glow.style.opacity = '0';
            });
        });
    }

    // 4. Handle Pill Clicks
    filters.addEventListener('click', e => {
        if (!e.target.classList.contains('vshow__pill')) return;

        // Update active state
        filters.querySelectorAll('.vshow__pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');

        // Render
        renderShowcase(e.target.dataset.filter);
    });

    // Initial render
    renderShowcase('all');
}

/* ---------- Faculty CG-Lusion Cards (GSAP Scroll Animation) ---------- */
function initFacultySwiper() {
    const section = document.querySelector('.faculty-cards-section');
    const wrapper = document.getElementById('faculty-wrapper');
    if (!section || !wrapper || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // --- Lenis smooth scroll (initialized at Y=0, synced via DOMContentLoaded reset) ---
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const numCards = facultyData.length;

    // --- Build card HTML ---
    let cardsHTML = '';
    facultyData.forEach((fac, i) => {
        cardsHTML += `
            <div class="fcard" id="fcard-${i}">
                <div class="fcard-wrapper">
                    <div class="fcard-inner">
                        <div class="fcard-front">
                            <!-- Image handles directly via CSS background to simulate the playing card -->
                        </div>
                        <div class="fcard-back">
                            <img class="fcard-back__photo" 
                                 src="${fac.image}" 
                                 alt="${fac.name}"
                                 loading="lazy">
                            <h3 class="fcard-back__name">${fac.name}</h3>
                            <p class="fcard-back__role">${fac.title}</p>
                            <div class="fcard-back__divider"></div>
                            <div class="fcard-back__details">
                                <p><strong>Education:</strong> ${fac.education}</p>
                                <p><strong>Research:</strong> ${fac.research}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Add scroll hint at the bottom of the section
    cardsHTML += `
        <div class="faculty-scroll-hint">
            <span class="faculty-scroll-hint__text">Scroll to reveal</span>
            <div class="faculty-scroll-hint__arrow"></div>
        </div>
    `;

    wrapper.innerHTML = cardsHTML;

    // --- GSAP Animation Setup ---
    const cards = gsap.utils.toArray('.fcard');

    // Grid parameters
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1200 && !isMobile;
    const cols = isMobile ? 1 : (isTablet ? 2 : 4);
    const gapX = isMobile ? 0 : (isTablet ? 340 : 340); // Increased from 310 to 340 for horizontal breathability
    const gapY = Math.max(window.innerHeight * 0.9, 500); // Massive vertical gap so you never see the next row

    // Calculate maximum rows to know how far to pan up
    const maxRow = Math.ceil(numCards / cols) - 1;
    // We only need to pan if there is more than 1 row
    const maxScrollY = maxRow > 0 ? (maxRow * gapY) : 0;

    // Total scroll height: generous budget so rows don't feel rushed.
    const totalScrollHeight = window.innerHeight * (1.8 + maxRow * 1.3);

    // Initial messy stack state in the exact center
    cards.forEach((card) => {
        gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: (Math.random() - 0.5) * 16,
            transformOrigin: "center center"
        });
    });

    // Pin the main section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.faculty-cards-section',
            start: 'top top',
            end: () => `+=${totalScrollHeight}`,
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
        }
    });

    // Softly fade out scroll hint upon scrolling
    const hint = section.querySelector('.faculty-scroll-hint');
    if (hint) {
        ScrollTrigger.create({
            trigger: '.faculty-cards-section',
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.25}`,
            onUpdate: (self) => {
                hint.style.opacity = Math.max(0, 0.6 - self.progress * 2);
            }
        });
    }

    // ─── Phase 1: Staggered spread — one card flies out at a time ──────────────
    // The user wants very little scroll to spread them, so we make this phase very short.
    const cardSpreadGap = 0.003;   // tiny delay between cards
    const singleSpreadDur = 0.05;   // fast move
    // Spread completes quickly, ~8% of total scroll
    const spreadDuration = (numCards - 1) * cardSpreadGap + singleSpreadDur; // ≈0.08 for 11 cards

    cards.forEach((card, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        let cardsInThisRow = cols;
        if (row === maxRow && numCards % cols !== 0) {
            cardsInThisRow = numCards % cols;
        }

        const offsetX = (cardsInThisRow - 1) / 2;
        const targetX = (col - offsetX) * gapX;
        const targetY = row * gapY;

        tl.to(card, {
            x: targetX,
            y: targetY,
            rotation: 0,
            ease: 'back.out(1.1)',
            duration: singleSpreadDur
        }, i * cardSpreadGap);
    });

    // ─── Phase 2+3: Pan each row into view, flip cards slowly ───────────────
    // The remaining ~92% of scroll time is split evenly across all rows.
    // The flips take longer so progressive unfolding is highly visible and slow.
    const numRows = maxRow + 1;
    const timeRemaining = 1.0 - spreadDuration;
    const timePerRow = timeRemaining / numRows;
    const panDuration = Math.min(0.12, timePerRow * 0.3); // smooth, fast pan between rows

    // Make flip stagger step and flip duration larger so it feels "slow" 
    const flipStaggerStep = 0.035;
    const singleFlipDur = 0.12;

    for (let r = 0; r < numRows; r++) {
        const rowCards = cards.filter((_, i) => Math.floor(i / cols) === r);
        const rowStartTime = spreadDuration + r * timePerRow;

        if (r > 0) {
            // Pan to the row completely before starting its flips
            tl.to('.faculty-cards-wrapper', {
                y: -r * gapY,
                ease: 'power2.inOut',
                duration: panDuration
            }, rowStartTime);
        }

        // Row 0 starts flipping right as spread ends.
        // Other rows start flipping as soon as they have mostly panned into view.
        const flipStart = (r === 0)
            ? spreadDuration
            : rowStartTime + panDuration * 0.6;

        rowCards.forEach((card, ci) => {
            const frontEl = card.querySelector('.fcard-front');
            const backEl = card.querySelector('.fcard-back');
            const t = flipStart + ci * flipStaggerStep;
            tl.to(frontEl, { rotateY: -180, ease: 'power2.inOut', duration: singleFlipDur }, t);
            tl.to(backEl, { rotateY: 0, ease: 'power2.inOut', duration: singleFlipDur }, t);
        });
    }

    // ─── Phase 4: Zero-gravity float ─────────────────────────────────────────────
    // Triggered at 88% scroll progress so the user sees it WHILE the section is
    // still pinned — large amplitude (28-50px) makes it obviously visible.
    const floatCards = () => {
        cards.forEach((card) => {
            const amplitude = 12 + Math.random() * 12;  // 12–24 px (smaller amplitude)
            const duration = 1.0 + Math.random() * 1.0;  // 1.0–2.0 s per half-cycle (much faster)
            const delay = Math.random() * duration;
            const rotDelta = (Math.random() - 0.5) * 4; // ±2° wobble

            gsap.to(card, {
                y: `+=${amplitude}`,
                rotation: rotDelta,
                ease: 'sine.inOut',
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                overwrite: false
            });
        });
    };

    // Start floating immediately after the spread completes (before/during flips)
    let floatStarted = false;
    ScrollTrigger.create({
        trigger: '.faculty-cards-section',
        start: 'top top',
        end: () => `+=${totalScrollHeight}`,
        onUpdate: (self) => {
            // Use spreadDuration (~0.08) instead of 0.88 so it floats while flipping
            if (!floatStarted && self.progress >= spreadDuration) {
                floatStarted = true;
                floatCards();
            }
        }
    });
}
