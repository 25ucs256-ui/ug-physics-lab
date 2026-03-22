class HeroParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.particles = [];
        this.particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
        this.mouse = { x: null, y: null, radius: 150 };

        this.colors = ['#ffffff', '#60a5fa', '#a78bfa'];

        this.init();

        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            if (this.mouse.x != null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    p.x -= forceDirectionX * force * 2;
                    p.y -= forceDirectionY * force * 2;
                }
            }

            for (let j = index; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = 0.2 * (1 - (distance / 120));
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            this.ctx.globalAlpha = 0.8;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new HeroParticles('hero-particles-canvas');
});
