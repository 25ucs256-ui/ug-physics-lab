/* ============================================================
   UG Physics Lab — Lab Data
   All experiment content, YouTube links, and faculty info
   are centralised here so the UI logic stays clean.
   ============================================================ */

// ------- Faculty Data -------
const facultyData = [
    {
        name: "Anupam Singh",
        title: "Professor & Dean(Student Affairs)",
        education: "Ph.D., Carnegie Mellon University, USA",
        research: "High Energy Physics and Cosmology",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/1.jpg"
    },
    {
        name: "Ganesh Datt Sharma",
        title: "Professor & Dean(Research & Consultancy)",
        education: "Ph.D., IIT Delhi",
        research: "Organic Electronics, Organic Solar Cells, Dye Sensitized Solar Cells, Nano-Science and Technology",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/2.jpg"
    },
    {
        name: "Somnath Biswas",
        title: "Professor & HOD(Dept. of Physics)",
        education: "Ph.D., IIT Kharagpur",
        research: "Magnetic Nano-materials and Nano-Structures, Spintronic Devices, FET-based Sensor Devices, Materials for Fuel Cells and Hydrogen Storage",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/3.jpg"
    },
    {
        name: "Subhayan Biswas",
        title: "Associate Professor",
        education: "Ph.D., IACS, Kolkata",
        research: "Third Generation Solar Cells, Photocatalysis",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/4.jpg"
    },
    {
        name: "Amit Neogi",
        title: "Assistant Professor & Chief Warden",
        education: "Ph.D., IIT Kanpur",
        research: "Laser Plasma",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/5.jpg"
    },
    {
        name: "Anjishnu Sarkar",
        title: "Assistant Professor",
        education: "Ph.D., IIT Bombay",
        research: "Cosology, Particle Physics, Supersymmetric Model Building",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/6.jpg"
    },
    {
        name: "Ashok Garai",
        title: "Assistant Professor",
        education: "Ph.D., IIT Kanpur",
        research: "Theoretical & Computational Biophysics, Molecular Motors, Genetic Networks, Theory of Single Molecular Pulling Experiments, DNA Nanomechanics",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/7.jpg"
    },
    {
        name: "Manish Kumar Singh",
        title: "Assistant Professor",
        education: "Ph.D., MNNIT, Allahabad",
        research: "Solid State Physics, Electronics, Nanomaterials, Laser Ablation in Liquids & Biosensors",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/8.jpg"
    },
    {
        name: "Nabyendu Das",
        title: "Assistant Professor",
        education: "Ph.D., Institute of Physics, Bhubaneshwar",
        research: "Theoretical Condensed Matter Physics",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/9.jpg"
    },
    {
        name: "Pomita Ghoshal",
        title: "Assistant Professor",
        education: "Ph.D., HRI, Allahabad University",
        research: "Particle Physics",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/10.jpg"
    },
    {
        name: "Rakesh Tibrewala",
        title: "Assistant Professor",
        education: "Ph.D., Tata Institue of Fundamental Research, Mumbai",
        research: "General Relativity, Aspects of Quantum Gravity",
        image: "https://6468d2a2e49d3229436a4a4b--magical-arithmetic-010924.netlify.app/resources/images/faculty/11.jpg"
    }
];

// ------- YouTube Video Data (centralized) -------
const experimentVideos = {
    'error-analysis': [],
    'bar-pendulum': [
        { url: 'https://www.youtube.com/watch?v=34VvJvlhvq0', title: 'Bar Pendulum — Finding g' }
    ],
    'helmholtz-coil': [
        { url: 'https://www.youtube.com/watch?v=w90jgVHoI8g&t=4s', title: 'Helmholtz Coil Field Mapping' }
    ],
    'band-gap': [
        { url: 'https://www.youtube.com/watch?v=YM1Ohh-FM7Q', title: 'Band Gap Measurement Setup' },
        { url: 'https://www.youtube.com/watch?v=rJunKtwhYUI&t=2s', title: 'Reverse Current vs Temperature' }
    ],
    'prism-refractive-index': [
        { url: 'https://www.youtube.com/watch?v=tnWoL2XiWco', title: 'Spectrometer Levelling' },
        { url: 'https://www.youtube.com/watch?v=kQMNaP7X_Tg', title: 'Prism Angle Measurement' },
        { url: 'https://www.youtube.com/watch?v=6lSA7v1htfg', title: 'Minimum Deviation Method' }
    ],
    'newtons-rings': [
        { url: 'https://www.youtube.com/watch?v=FUb52bdzAOM', title: "Newton's Rings — Full Demo" }
    ],
    'gyroscope': [
        { url: 'https://www.youtube.com/watch?v=Hwyda3lleB8', title: 'Gyroscope Precession Demo' }
    ],
    'emi': [],
    'mechanical-waves': [
        { url: 'https://www.youtube.com/watch?v=v16gm2unMoo', title: 'Standing Waves on a String' },
        { url: 'https://www.youtube.com/watch?v=Y4ZuKgz_ui8', title: 'Resonance & Harmonics' }
    ],
    'fraunhofer': [
        { url: 'https://www.youtube.com/watch?v=uohd0TtqOaw&t=1s', title: 'Single-Slit Diffraction Pattern' },
        { url: 'https://www.youtube.com/watch?v=PgW7qaOZD0U', title: 'Measuring Fringe Positions' }
    ],
    'diffraction-grating': [
        { url: 'https://www.youtube.com/watch?v=N0lxwqANsd4', title: 'Grating Spectrometer Setup' },
        { url: 'https://www.youtube.com/watch?v=desLn3tMLcc', title: 'Spectral Line Measurement' }
    ]
};

// ------- Experiment Data -------
const experiments = {
    'error-analysis': {
        title: '1. Introduction to Error Analysis and Graph Drawing',
        cardTitle: '1. Error Analysis & Graph Drawing',
        cardDesc: 'Covers RC circuits, resonant rings, mass-spring systems, and resistivity measurements.',
        iconColor: 'blue',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="32" height="32" rx="2" opacity=".4"/><path d="M14 34 L22 20 L28 26 L36 14" opacity=".8"/><circle cx="14" cy="34" r="1.5" fill="currentColor" opacity=".8"/><circle cx="22" cy="20" r="1.5" fill="currentColor" opacity=".8"/><circle cx="28" cy="26" r="1.5" fill="currentColor" opacity=".8"/><circle cx="36" cy="14" r="1.5" fill="currentColor" opacity=".8"/></svg>`,
        category: 'Data Analysis',
        theory: `<h3>Overview</h3>
                <p>This introductory module covers fundamental techniques in experimental physics, including error propagation, statistical analysis, and linear regression.</p>
                <h3>Included Subtopics:</h3>
                <ul>
                    <li><strong>1.1.</strong> Finding τ and initial voltage across capacitor</li>
                    <li><strong>1.2.</strong> Resonant Rings</li>
                    <li><strong>1.3.</strong> Mass Spring System</li>
                    <li><strong>1.4.</strong> Resistivity of a nichrome wire</li>
                    <li><strong>1.5.</strong> To measure the electrical resistance of a given material</li>
                </ul>`,
        procedure: `<h3>General Procedure</h3>
                <p>For each subtopic, students will collect raw data, compute absolute and relative errors, and plot the required graphs using standard graphical rules (choosing appropriate scales, identifying anomalous data points, and determining the line of best fit).</p>`,
        videos: ['Introduction to Error Analysis', 'Plotting graphs and calculating slope'],
        resources: [
            { icon: '📄', label: "Lab Manual", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 21 }
        ]
    },
    'bar-pendulum': {
        title: '2. Acceleration due to gravity by bar pendulum',
        cardTitle: '2. Acceleration due to gravity',
        cardDesc: "Determine 'g' using a compound bar pendulum through simple harmonic motion analysis.",
        iconColor: 'cyan',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="24" y1="8" x2="24" y2="34" opacity=".6"/><rect x="22" y="8" width="4" height="26" rx="1" opacity=".4"/><circle cx="24" cy="12" r="1.5" fill="currentColor" opacity=".8"/><path d="M16 40 Q24 44 32 40" opacity=".3"/></svg>`,
        category: 'Mechanics',
        theory: `<h3>Principle</h3>
                <p>A bar pendulum is a compound pendulum. By measuring its time period of oscillation at various distances from its centre of gravity, we can determine the acceleration due to gravity (g) and the radius of gyration of the bar.</p>
                <h3>Key Equations</h3>
                <p><strong>T = 2π √((k² + l²) / gl)</strong></p>
                <p>where l is the distance from the pivot to the centre of gravity, and k is the radius of gyration.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Suspend the bar pendulum from the first hole and allow it to oscillate with a small amplitude.</li>
                    <li>Measure the time for 20 oscillations to calculate the time period T.</li>
                    <li>Repeat the measurement for all successive holes on both sides of the centre of gravity.</li>
                    <li>Plot a graph of time period T versus distance l.</li>
                    <li>Determine the equivalent length of a simple pendulum and calculate g.</li>
                </ol>`,
        videos: ["Bar Pendulum Demonstration"],
        resources: [
            { icon: '📄', label: "Lab Manual — Bar Pendulum", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 26 }
        ]
    },
    'helmholtz-coil': {
        title: '3. Helmholtz coil',
        cardTitle: '3. Helmholtz coil',
        cardDesc: 'Study the uniform magnetic field produced by a pair of identical parallel circular coils.',
        iconColor: 'violet',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><ellipse cx="14" cy="24" rx="6" ry="16" opacity=".5"/><ellipse cx="34" cy="24" rx="6" ry="16" opacity=".5"/><path d="M14 24 L34 24" stroke-dasharray="2 2" opacity=".4"/><line x1="8" y1="24" x2="40" y2="24" opacity=".2"/></svg>`,
        category: 'Electromagnetism',
        theory: `<h3>Principle</h3>
                <p>A Helmholtz coil consists of two identical circular magnetic coils placed symmetrically along a common axis, separated by a distance equal to their radius. This geometry produces a nearly uniform magnetic field in the central region.</p>
                <h3>Key Equations</h3>
                <p><strong>B = (8μ₀NI) / (5√5 R)</strong></p>
                <p>where N is the number of turns, I is the current, and R is the radius of the coils.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Place the compass needle or Hall probe at the centre of the coils.</li>
                    <li>Pass a steady current through both coils in the same direction.</li>
                    <li>Measure the magnetic field strength along the axis of the coils at various intervals.</li>
                    <li>Plot a graph of Magnetic Field (B) vs. Distance (x) along the axis.</li>
                </ol>`,
        videos: ["Magnetic Field of a Helmholtz Coil"],
        resources: [
            { icon: '📄', label: "Lab Manual — Helmholtz Coil", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 32 }
        ]
    },
    'band-gap': {
        title: '4. Measurement of band gap of semiconductor',
        cardTitle: '4. Band gap of semiconductor',
        cardDesc: 'Measure the energy band gap of a semiconductor diode by studying its reverse saturation current.',
        iconColor: 'blue',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="12" y1="18" x2="36" y2="18" opacity=".3"/><line x1="12" y1="30" x2="36" y2="30" opacity=".8"/><path d="M24 30 L24 18" stroke-dasharray="2 2" opacity=".6"/><circle cx="24" cy="24" r="2" fill="currentColor" opacity=".5"/></svg>`,
        category: 'Solid State',
        theory: `<h3>Principle</h3>
                <p>In a semiconductor, the reverse saturation current of a p-n junction diode is highly temperature-dependent. By measuring this current at various temperatures, the energy band gap of the material can be calculated.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Connect the semiconductor diode in reverse bias.</li>
                    <li>Immerse the diode in a temperature-controlled oil or water bath.</li>
                    <li>Measure the reverse saturation current at different temperatures as the bath cools.</li>
                    <li>Plot a graph of log(Is) versus 1/T (in Kelvin).</li>
                    <li>Calculate the band gap energy (Eg) from the slope of the graph.</li>
                </ol>`,
        videos: ["Measuring the Band Gap"],
        resources: [
            { icon: '📄', label: "Lab Manual — Band Gap", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 35 }
        ]
    },
    'prism-refractive-index': {
        title: '5. Refractive index of glass with the help of a prism',
        cardTitle: '5. Refractive index of glass',
        cardDesc: 'Determine the refractive index using a glass prism and a spectrometer.',
        iconColor: 'cyan',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polygon points="24,10 10,34 38,34" opacity=".4"/><path d="M4 24 L17 22 L31 28 L46 22" opacity=".8"/></svg>`,
        category: 'Optics',
        theory: `<h3>Principle</h3>
                <p>When light passes through a prism, it undergoes refraction. By measuring the angle of the prism and the angle of minimum deviation, we can determine the refractive index of the prism material.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Level the spectrometer and illuminate the slit with a monochromatic light source.</li>
                    <li>Determine the angle of the prism (A) by observing reflected light from the prism faces.</li>
                    <li>Find the position of minimum deviation (δm) for the spectral line.</li>
                    <li>Calculate the refractive index using the prism formula: μ = sin((A+δm)/2) / sin(A/2).</li>
                </ol>`,
        videos: ["Spectrometer and Prism Setup"],
        resources: [
            { icon: '📄', label: "Lab Manual — Prism Refractive Index", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 42 }
        ]
    },
    'newtons-rings': {
        title: "6. Wavelength of sodium light by Newton's rings",
        cardTitle: "6. Wavelength by Newton's rings",
        cardDesc: 'Observe interference fringes formed between a plano-convex lens and a glass surface.',
        iconColor: 'violet',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="24" cy="24" r="6" opacity=".9"/><circle cx="24" cy="24" r="11" opacity=".6"/><circle cx="24" cy="24" r="16" opacity=".35"/><circle cx="24" cy="24" r="21" opacity=".15"/></svg>`,
        category: 'Optics',
        theory: `<h3>Principle</h3>
                <p>Newton's Rings are a classic demonstration of thin-film interference. When a plano-convex lens of large radius of curvature is placed on a flat glass plate, an air film of variable thickness is formed between them. Monochromatic light reflected from the top and bottom surfaces of this air film interferes, producing alternating bright and dark circular fringes.</p>
                <h3>Key Equations</h3>
                <p>The radius of the <em>n</em>-th dark ring is given by:</p>
                <p><strong>rₙ = √(nλR)</strong></p>
                <p>where λ is the wavelength of light and R is the radius of curvature of the lens. By measuring ring diameters, λ or R can be determined experimentally.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Clean the plano-convex lens and glass plate thoroughly with lens tissue.</li>
                    <li>Place the lens on the glass plate with the curved surface downward, inside the Newton's Rings apparatus.</li>
                    <li>Adjust the microscope position until the cross-wire is focused on the air film.</li>
                    <li>Illuminate with monochromatic sodium light from the top at 45°.</li>
                    <li>Locate the central dark spot and adjust for clarity.</li>
                    <li>Measure the diameters of successive dark rings on both sides of the centre using the micrometer.</li>
                    <li>Record at least 15–20 ring diameters for accurate averaging.</li>
                    <li>Plot D² vs. ring number (n) and determine the slope to calculate λ or R.</li>
                </ol>`,
        videos: ["Demonstration of Newton's Rings setup", 'Finding and measuring ring diameters'],
        resources: [
            { icon: '📄', label: "Lab Manual — Newton's Rings", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 51 }
        ]
    },
    'gyroscope': {
        title: '7. Gyroscope',
        cardTitle: '7. Gyroscope',
        cardDesc: 'Study precession and angular momentum conservation using a spinning gyroscope.',
        iconColor: 'blue',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><ellipse cx="24" cy="24" rx="20" ry="8" opacity=".5"/><ellipse cx="24" cy="24" rx="8" ry="20" opacity=".5"/><circle cx="24" cy="24" r="14" opacity=".3"/><circle cx="24" cy="24" r="4"/></svg>`,
        category: 'Mechanics',
        theory: `<h3>Principle</h3>
                <p>A gyroscope demonstrates the conservation of angular momentum. When a spinning wheel is tilted, instead of falling, it precesses — rotating slowly about a vertical axis perpendicular to both the angular momentum vector and the applied torque.</p>
                <h3>Key Equations</h3>
                <p>The precession angular velocity is:</p>
                <p><strong>Ω = τ / L = Mgr / Iω</strong></p>
                <p>where M is mass, g is gravity, r is the distance from the pivot to the centre of mass, I is the moment of inertia, and ω is the spin angular velocity.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Mount the gyroscope on its gimbal stand on a level surface.</li>
                    <li>Spin the flywheel to a known RPM using the motor or string.</li>
                    <li>Release the gyroscope and observe the precessional motion.</li>
                    <li>Measure the precession rate (time for one full precession revolution).</li>
                    <li>Repeat for different spin speeds by varying the motor speed.</li>
                    <li>Record spin speed (ω) and precession rate (Ω) for each trial.</li>
                    <li>Plot Ω vs. 1/ω, which should be linear. Determine Mgr/I from the slope.</li>
                </ol>`,
        videos: ['Gyroscope precession demonstration', 'Measuring precession rate'],
        resources: [
            { icon: '📄', label: "Lab Manual — Gyroscope", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 57 }
        ]
    },
    'emi': {
        title: '8. Electromagnetic induction',
        cardTitle: '8. Electromagnetic induction',
        cardDesc: "Investigate Faraday's law by measuring induced EMF through changing magnetic flux.",
        iconColor: 'cyan',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 24 C12 14, 18 34, 24 24 C30 14, 36 34, 42 24" opacity=".8"/><path d="M6 24 C12 34, 18 14, 24 24 C30 34, 36 14, 42 24" opacity=".4"/><circle cx="12" cy="24" r="2" fill="currentColor" opacity=".6"/><circle cx="36" cy="24" r="2" fill="currentColor" opacity=".6"/></svg>`,
        category: 'Electromagnetism',
        theory: `<h3>Principle</h3>
                <p>Electromagnetic induction, discovered by Faraday, states that a changing magnetic flux through a circuit induces an electromotive force (EMF). Lenz's law dictates the direction of the induced current — it opposes the change that produced it.</p>
                <h3>Key Equations</h3>
                <p><strong>ε = −dΦ/dt = −N · d(BA cosθ)/dt</strong></p>
                <p>where Φ is the magnetic flux, N is the number of turns, B is the magnetic field, A is the area, and θ is the angle between B and the area normal.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Connect the pick-up coil to a galvanometer or digital voltmeter.</li>
                    <li>Position the bar magnet at various distances from the coil.</li>
                    <li>Move the magnet towards and away from the coil at a steady speed.</li>
                    <li>Record the induced EMF for each approach/withdrawal.</li>
                    <li>Vary the speed of magnet motion and observe the change in EMF magnitude.</li>
                    <li>Repeat with different numbers of coil turns (if available).</li>
                    <li>Verify that ε ∝ rate of flux change and ε ∝ N.</li>
                </ol>`,
        videos: ["Faraday's law demonstration", 'EMF measurement with oscilloscope'],
        resources: [
            { icon: '📄', label: "Lab Manual — EMI", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 61 }
        ]
    },
    'mechanical-waves': {
        title: '9. Mechanical waves',
        cardTitle: '9. Mechanical waves',
        cardDesc: 'Visualise transverse and longitudinal wave behaviour, resonance, and standing waves.',
        iconColor: 'violet',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 24 Q10 8, 16 24 Q22 40, 28 24 Q34 8, 40 24 Q46 40, 48 24" opacity=".8"/><path d="M4 28 Q10 16, 16 28 Q22 40, 28 28 Q34 16, 40 28" opacity=".35"/><circle cx="16" cy="24" r="1.5" fill="currentColor" opacity=".5"/><circle cx="28" cy="24" r="1.5" fill="currentColor" opacity=".5"/><circle cx="40" cy="24" r="1.5" fill="currentColor" opacity=".5"/></svg>`,
        category: 'Waves',
        theory: `<h3>Principle</h3>
                <p>Mechanical waves require a material medium for propagation. Standing waves form when two identical waves travel in opposite directions and superimpose, creating nodes (zero displacement) and antinodes (maximum displacement) at fixed positions.</p>
                <h3>Key Equations</h3>
                <p>For a vibrating string:</p>
                <p><strong>f = (n/2L)√(T/μ)</strong></p>
                <p>where n is the harmonic number, L is the string length, T is the tension, and μ is the linear mass density.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Set up the vibrating string apparatus with one end attached to a mechanical vibrator.</li>
                    <li>Pass the string over a pulley and attach a weight pan to provide tension.</li>
                    <li>Start the vibrator and slowly adjust the frequency.</li>
                    <li>Identify resonance conditions — clear standing wave patterns with visible nodes and antinodes.</li>
                    <li>Record the frequency, number of loops, and string length for each harmonic.</li>
                    <li>Change the tension by adding weights and repeat.</li>
                    <li>Verify that f ∝ √T and f ∝ 1/L experimentally.</li>
                </ol>`,
        videos: ['Standing waves on a string', 'Identifying harmonics and nodes'],
        resources: [
            { icon: '📄', label: "Lab Manual — Mechanical Waves", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 64 }
        ]
    },
    'fraunhofer': {
        title: '10. Fraunhoffer Diffraction',
        cardTitle: '10. Fraunhoffer Diffraction',
        cardDesc: 'Analyse far-field diffraction patterns from single and double slits to understand wave optics.',
        iconColor: 'blue',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="24" y1="4" x2="24" y2="44" opacity=".3"/><rect x="22" y="14" width="4" height="20" rx="1" opacity=".5"/><path d="M10 24 L22 20 M10 24 L22 28" opacity=".4"/><path d="M38 18 L26 22 M38 30 L26 26" opacity=".4"/></svg>`,
        category: 'Optics',
        theory: `<h3>Principle</h3>
                <p>Fraunhofer diffraction occurs when parallel light passes through a narrow slit and the resulting pattern is observed at a large distance (or at the focal plane of a lens). The intensity distribution follows a sinc² function.</p>
                <h3>Key Equations</h3>
                <p>For a single slit of width <em>a</em>:</p>
                <p><strong>I(θ) = I₀ [sin(β)/β]²</strong>, where <strong>β = (πa sinθ)/λ</strong></p>
                <p>Minima occur when a sinθ = mλ (m = ±1, ±2, …).</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Mount the laser source on the optical bench and align it horizontally.</li>
                    <li>Place the single-slit aperture in the beam path.</li>
                    <li>Position the screen at a known distance D from the slit.</li>
                    <li>Observe the central maximum flanked by secondary maxima and dark fringes.</li>
                    <li>Measure the positions of the first several minima on both sides of the central maximum.</li>
                    <li>Calculate slit width using a = mλD / yₘ, where yₘ is the distance from centre to the m-th minimum.</li>
                    <li>Repeat with a double slit to compare single- and double-slit patterns.</li>
                </ol>`,
        videos: ['Single-slit diffraction pattern', 'Measuring minima positions'],
        resources: [
            { icon: '📄', label: "Lab Manual — Fraunhofer Diffraction", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 68 }
        ]
    },
    'diffraction-grating': {
        title: '11. Diffraction grating',
        cardTitle: '11. Diffraction grating',
        cardDesc: "Determine wavelengths of spectral lines using a grating's multiple-slit interference.",
        iconColor: 'cyan',
        iconSvg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><line x1="16" y1="6" x2="16" y2="42" opacity=".4"/><line x1="21" y1="6" x2="21" y2="42" opacity=".4"/><line x1="26" y1="6" x2="26" y2="42" opacity=".4"/><line x1="31" y1="6" x2="31" y2="42" opacity=".4"/><path d="M6 24 L16 24" opacity=".6"/><circle cx="42" cy="24" r="2" fill="currentColor" opacity=".7"/><path d="M31 24 L42 24" opacity=".35"/></svg>`,
        category: 'Optics',
        theory: `<h3>Principle</h3>
                <p>A diffraction grating consists of a large number of equally spaced parallel slits. When light passes through, each slit acts as a source. Constructive interference produces sharp, bright maxima at specific angles determined by the grating equation.</p>
                <h3>Key Equations</h3>
                <p><strong>d sinθ = mλ</strong></p>
                <p>where d is the slit spacing (d = 1/N, N being lines per mm), m is the order, and λ is the wavelength. The resolving power is R = mN.</p>`,
        procedure: `<h3>Steps</h3>
                <ol>
                    <li>Mount the grating on the spectrometer table and level it.</li>
                    <li>Illuminate the slit with the mercury or sodium lamp.</li>
                    <li>Adjust the collimator so that a sharp slit image is seen in the telescope.</li>
                    <li>Rotate the telescope to locate the first-order (m=1) diffraction maxima on both sides.</li>
                    <li>Record the angular positions of each spectral line.</li>
                    <li>Move to the second-order (m=2) and repeat.</li>
                    <li>Calculate the wavelength of each line using d sinθ = mλ.</li>
                    <li>Compare measured values with standard wavelengths.</li>
                </ol>`,
        videos: ['Spectrometer alignment with grating', 'Measuring diffraction orders'],
        resources: [
            { icon: '📄', label: "Lab Manual — Diffraction Grating", href: 'https://drive.google.com/file/d/1bX3sVJKrp1cQPuetedc3lWPWRndXXRR2/view?usp=sharing', page: 72 }
        ]
    }
};

// ------- Experiment card rendering order -------
// Determines the order cards appear in the grid
const experimentOrder = [
    'error-analysis',
    'bar-pendulum',
    'helmholtz-coil',
    'band-gap',
    'prism-refractive-index',
    'newtons-rings',
    'gyroscope',
    'emi',
    'mechanical-waves',
    'fraunhofer',
    'diffraction-grating'
];

// ------- YouTube Helpers -------
function getYouTubeId(url) {
    const m = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : '';
}

function getYouTubeThumbnail(url) {
    const id = getYouTubeId(url);
    // maxresdefault is 1280x720, offering the highest definition available for YouTube thumbnails
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

function renderVideoCards(experimentId) {
    const vids = experimentVideos[experimentId] || [];
    if (!vids.length) {
        return `<div class="video-empty">
            <span class="video-empty__icon">📭</span>
            <p>No videos available for this experiment yet.</p>
        </div>`;
    }
    const cards = vids.map(v => {
        const id = getYouTubeId(v.url);
        const thumb = getYouTubeThumbnail(v.url);
        return `
        <a class="video-card" href="${v.url}" target="_blank" rel="noopener noreferrer">
            <div class="video-card__thumb">
                <img
                    src="${thumb}"
                    alt="${v.title}"
                    loading="lazy"
                    onload="if(this.naturalWidth<=120){this.onload=null;this.src='https://img.youtube.com/vi/${id}/hqdefault.jpg';}"
                >
                <div class="video-card__play">
                    <svg viewBox="0 0 68 68" fill="none">
                        <circle cx="34" cy="34" r="30" fill="rgba(0,0,0,0.55)"/>
                        <polygon points="27,20 27,48 52,34" fill="white"/>
                    </svg>
                </div>
            </div>
            <div class="video-card__info">
                <span class="video-card__label">${v.title}</span>
                <span class="video-card__link">▶ Watch</span>
            </div>
        </a>`;
    }).join('');
    return `<div class="video-card-grid">${cards}</div>`;
}
