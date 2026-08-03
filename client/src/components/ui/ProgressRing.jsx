/**
 * ProgressRing — Animated SVG circular progress indicator
 *
 * Props:
 *   value    — current value
 *   max      — max value
 *   size     — diameter in px (default 72)
 *   stroke   — stroke width (default 5)
 *   color    — arc color (default '#e8003d')
 *   bg       — track color (default 'rgba(255,255,255,0.06)')
 *   label    — center label text
 *   sublabel — small text below label
 *   animate  — whether to animate on mount (default true)
 */
import { useEffect, useRef, useState } from "react";

export default function ProgressRing({
    value    = 0,
    max      = 100,
    size     = 72,
    stroke   = 5,
    color    = "#e8003d",
    bg       = "rgba(255,255,255,0.06)",
    label,
    sublabel,
    animate  = true,
    style    = {},
}) {
    const pct        = max > 0 ? Math.min(value / max, 1) : 0;
    const r          = (size - stroke) / 2;
    const circ       = 2 * Math.PI * r;
    const [dash, setDash] = useState(animate ? 0 : pct * circ);

    const rafRef = useRef(null);
    useEffect(() => {
        if (!animate) return;
        const target = pct * circ;
        const dur    = 900;
        let start    = null;
        const step   = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / dur, 1);
            /* ease-out */
            const eased = 1 - Math.pow(1 - progress, 3);
            setDash(eased * target);
            if (progress < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
    }, [pct, circ, animate]);

    const center = size / 2;

    return (
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0, ...style }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                {/* Track */}
                <circle
                    cx={center} cy={center} r={r}
                    fill="none"
                    stroke={bg}
                    strokeWidth={stroke}
                />
                {/* Arc */}
                <circle
                    cx={center} cy={center} r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ - dash}
                    style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: "stroke-dashoffset 0.05s" }}
                />
            </svg>
            {/* Center label */}
            {(label !== undefined || sublabel) && (
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                }}>
                    {label !== undefined && (
                        <span style={{ fontSize: size * 0.22, fontWeight: 700, color: "#fff", lineHeight: 1, fontFamily: '"Space Mono", monospace' }}>
                            {label}
                        </span>
                    )}
                    {sublabel && (
                        <span style={{ fontSize: size * 0.12, color: "rgba(255,255,255,0.4)", marginTop: 2, fontFamily: '"Space Mono", monospace', letterSpacing: "0.04em" }}>
                            {sublabel}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
