/**
 * FloatingParticles — Canvas-based drifting particle field
 * Renders soft glowing dots that slowly drift upward and fade.
 *
 * Props:
 *   count    — number of particles (default 40)
 *   color    — hex particle color (default '#e8003d')
 *   opacity  — max particle opacity (default 0.55)
 *   speed    — drift speed multiplier (default 1)
 */
import { useRef, useEffect } from "react";

export default function FloatingParticles({
    count   = 40,
    color   = "#e8003d",
    opacity = 0.55,
    speed   = 1,
    style   = {},
}) {
    const canvasRef = useRef(null);
    const rafRef    = useRef(null);

    /* Parse hex → [r, g, b] — supports #rgb and #rrggbb */
    const hex2rgb = (hex) => {
        if (!hex || hex[0] !== '#') return [200, 0, 61]; // fallback
        const h = hex.length === 4
            ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
            : hex;
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return [isNaN(r) ? 200 : r, isNaN(g) ? 0 : g, isNaN(b) ? 61 : b];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx   = canvas.getContext("2d");
        const [r, g, b] = hex2rgb(color);

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        /* Init particles */
        const particles = Array.from({ length: count }, () => ({
            x:    Math.random() * canvas.width,
            y:    Math.random() * canvas.height,
            vx:   (Math.random() - 0.5) * 0.3 * speed,
            vy:   -(Math.random() * 0.4 + 0.1) * speed,
            r:    Math.random() * 2 + 0.5,
            a:    Math.random() * opacity,
            life: Math.random(),  /* 0-1, wraps */
            lifeSpeed: Math.random() * 0.003 + 0.001,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.life += p.lifeSpeed;
                if (p.life > 1) {
                    /* Reset particle at bottom */
                    p.life = 0;
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                    p.a = Math.random() * opacity;
                }

                p.x += p.vx;
                p.y += p.vy;

                /* Fade in/out based on life */
                const alpha = p.a * Math.sin(p.life * Math.PI);

                /* Glow effect via shadow */
                ctx.shadowBlur  = p.r * 6;
                ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.5})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.fill();
            });
            ctx.shadowBlur = 0;
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [count, color, opacity, speed]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
                ...style,
            }}
        />
    );
}
