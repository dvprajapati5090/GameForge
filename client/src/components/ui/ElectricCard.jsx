/**
 * ElectricCard — Reusable Electric Border Card
 *
 * Inspired by ReactBits electric-border: a conic-gradient "spark" rotates
 * around the border continuously, creating a living neon charge effect.
 *
 * Usage:
 *   <ElectricCard color="#e8003d" speed={4} rounded={16}>
 *     your content
 *   </ElectricCard>
 *
 * Props:
 *   color   — primary spark color  (default: #e8003d)
 *   color2  — secondary spark color (default: #ff6030)
 *   speed   — rotation seconds     (default: 4)
 *   rounded — border-radius px     (default: 16)
 *   gap     — gap between border and card bg px (default: 1.5)
 *   glow    — outer glow intensity 0-1 (default: 0.35)
 *   style   — extra style on wrapper
 *   className
 *   children
 *   onClick
 */

import { useRef, useEffect, useState } from "react";

const uid = (() => { let n = 0; return () => `ec-${++n}`; })();

export default function ElectricCard({
    color    = "#e8003d",
    color2   = "#ff5530",
    speed    = 4,
    rounded  = 16,
    gap      = 1.5,
    glow     = 0.35,
    style    = {},
    className = "",
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) {
    const id = useRef(uid()).current;
    const [hovered, setHovered] = useState(false);
    const animName = `ec-spin-${id}`;

    /* Parse hex → rgba helper */
    const hexAlpha = (hex, a) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${a})`;
    };

    const keyframes = `
        @keyframes ${animName} {
            0%   { --ec-angle: 0deg; }
            100% { --ec-angle: 360deg; }
        }
    `;

    /* We use a pseudo-element-style approach via an absolutely-positioned
       conic-gradient div that is clipped by the inner card bg.            */

    const outerStyle = {
        position  : "relative",
        borderRadius: rounded,
        padding   : gap,
        cursor    : onClick ? "pointer" : "default",
        transition: `box-shadow 0.4s ease`,
        boxShadow : hovered
            ? `0 0 32px ${hexAlpha(color, glow * 1.5)}, 0 0 64px ${hexAlpha(color, glow * 0.6)}, 0 20px 60px rgba(0,0,0,0.55)`
            : `0 0 18px ${hexAlpha(color, glow * 0.5)}, 0 8px 32px rgba(0,0,0,0.45)`,
        ...style,
    };

    return (
        <>
            <style>{keyframes}</style>

            <div
                id={id}
                style={outerStyle}
                className={className}
                onClick={onClick}
                onMouseEnter={() => { setHovered(true);  onMouseEnter?.(); }}
                onMouseLeave={() => { setHovered(false); onMouseLeave?.(); }}
            >
                {/* ── Rotating electric border ── */}
                <ElectricBorder
                    color={color}
                    color2={color2}
                    speed={speed}
                    rounded={rounded}
                    hovered={hovered}
                    animName={animName}
                    hexAlpha={hexAlpha}
                />

                {/* ── Card background ── */}
                <div style={{
                    position     : "relative",
                    borderRadius : rounded - gap,
                    overflow     : "hidden",
                    background   : "linear-gradient(145deg, rgba(14,6,22,0.96) 0%, rgba(8,2,12,0.98) 100%)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    zIndex       : 1,
                }}>
                    {children}
                </div>
            </div>
        </>
    );
}

/* ── Internal rotating border layer ──────────────────────────── */
function ElectricBorder({ color, color2, speed, rounded, hovered, animName, hexAlpha }) {
    const canvasRef = useRef(null);
    const rafRef    = useRef(null);
    const angleRef  = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const draw = (ts) => {
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            if (canvas.width !== W || canvas.height !== H) {
                canvas.width  = W;
                canvas.height = H;
            }
            ctx.clearRect(0, 0, W, H);

            angleRef.current = (angleRef.current + (hovered ? 0.6 : 0.28)) % 360;
            const rad = (angleRef.current * Math.PI) / 180;

            const cx = W / 2, cy = H / 2;
            const R  = Math.sqrt(cx * cx + cy * cy);
            const x1 = cx + R * Math.cos(rad);
            const y1 = cy + R * Math.sin(rad);
            const x2 = cx - R * Math.cos(rad);
            const y2 = cy - R * Math.sin(rad);

            const grad = ctx.createLinearGradient(x2, y2, x1, y1);
            grad.addColorStop(0,    hexAlpha(color, 0));
            grad.addColorStop(0.35, hexAlpha(color, 0));
            grad.addColorStop(0.45, hexAlpha(color2, 0.7));
            grad.addColorStop(0.5,  hexAlpha(color, 1));
            grad.addColorStop(0.55, hexAlpha(color2, 0.7));
            grad.addColorStop(0.65, hexAlpha(color, 0));
            grad.addColorStop(1,    hexAlpha(color, 0));

            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafRef.current);
    }, [hovered, color, color2]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position    : "absolute",
                inset       : 0,
                width       : "100%",
                height      : "100%",
                borderRadius: rounded,
                pointerEvents: "none",
            }}
        />
    );
}
