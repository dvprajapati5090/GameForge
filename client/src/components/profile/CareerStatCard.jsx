/**
 * CareerStatCard — Gaming glass stat card with count-up, sparkline, and tilt
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TiltCard from "../ui/TiltCard";
import Sparkline from "../ui/Sparkline";

/* Accent colors cycling */
const ACCENTS = ['#e8003d', '#7c3aed', '#22c55e', '#ff9020', '#e8003d', '#7c3aed'];
const TRENDS  = [
    [2, 4, 3, 6, 5, 8, 7, 9, 11, 12],
    [1, 3, 2, 4, 5, 4, 6, 8, 7, 10],
    [3, 2, 4, 3, 5, 4, 3, 5, 4, 6],
    [0, 1, 0, 1, 2, 1, 2, 3, 2, 3],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [50, 55, 48, 60, 58, 62, 65, 61, 68, 70],
];

const ICON_MAP = {
    "🎮": { label: "Matches"    },
    "✅": { label: "Wins"       },
    "❌": { label: "Losses"     },
    "🏆": { label: "Championships" },
    "🏅": { label: "Tournaments" },
    "📈": { label: "Win Rate"   },
};

function AnimatedNumber({ value }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const raw = String(value).replace(/[^0-9.]/g, '');
        const end = parseFloat(raw) || 0;
        const suffix = String(value).replace(/[0-9.]/g, '');
        if (end === 0) { el.textContent = `0${suffix}`; return; }
        const dur = 900, step = 16;
        const inc = end / (dur / step);
        let cur = 0;
        const timer = setInterval(() => {
            cur = Math.min(cur + inc, end);
            el.textContent = `${Math.floor(cur)}${suffix}`;
            if (cur >= end) clearInterval(timer);
        }, step);
        return () => clearInterval(timer);
    }, [value]);
    return <span ref={ref}>0</span>;
}

export default function CareerStatCard({ title, value, icon, index = 0 }) {
    const accent = ACCENTS[index % ACCENTS.length];
    const trend  = TRENDS[index % TRENDS.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
        >
            <TiltCard maxTilt={7} scale={1.03} glare={true}>
                <div style={{
                    position: 'relative', overflow: 'hidden',
                    border: `1px solid ${accent}30`,
                    borderTop: `2px solid ${accent}`,
                    background: 'rgba(8,2,14,0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 18,
                    padding: '20px',
                    fontFamily: '"Space Mono", monospace',
                    boxShadow: `0 0 24px ${accent}12, 0 12px 40px rgba(0,0,0,0.4)`,
                }}>
                    {/* Dot grid */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                    }} />
                    {/* Corner glow */}
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: `${accent}18`, filter: 'blur(20px)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Icon box */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `${accent}15`, border: `1px solid ${accent}40`,
                                fontSize: 20, boxShadow: `0 0 10px ${accent}25`,
                            }}>
                                {icon}
                            </div>
                            {/* Trend sparkline */}
                            <Sparkline data={trend} color={accent} width={55} height={24} />
                        </div>

                        {/* Label */}
                        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 6 }}>
                            {title}
                        </p>
                        {/* Value */}
                        <h3 style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                            <AnimatedNumber value={value} />
                        </h3>

                        {/* Bottom bar */}
                        <div style={{ marginTop: 14, height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ duration: 1.1, delay: 0.3 + index * 0.08 }}
                                style={{ height: '100%', borderRadius: 99, background: `linear-gradient(to right, ${accent}, ${accent}66)`, boxShadow: `0 0 6px ${accent}` }}
                            />
                        </div>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
}