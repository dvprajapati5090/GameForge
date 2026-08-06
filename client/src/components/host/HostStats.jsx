/**
 * HostStats — Rounded ElectricCard stat tiles with count-up, sparkline trend, and tilt effect
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Flame, Calendar } from "lucide-react";
import ElectricCard from "../ui/ElectricCard";
import Sparkline from "../ui/Sparkline";
import TiltCard from "../ui/TiltCard";

const CARDS = [
    {
        title: "Total Tournaments", icon: Trophy,   accent: '#e8003d', accent2: '#ff5530', label: "HOSTED",
        trend: [1, 2, 2, 3, 4, 3, 5, 6, 5, 7],
    },
    {
        title: "Live Events",       icon: Flame,    accent: '#ff6030', accent2: '#ff9020', label: "RUNNING",
        trend: [0, 1, 0, 2, 1, 3, 2, 4, 3, 5],
    },
    {
        title: "Teams Registered",  icon: Users,    accent: '#e8003d', accent2: '#9b6dff', label: "SIGNED UP",
        trend: [2, 4, 6, 5, 8, 10, 9, 12, 14, 16],
    },
    {
        title: "Upcoming Matches",  icon: Calendar, accent: '#7c3aed', accent2: '#c084fc', label: "SCHEDULED",
        trend: [1, 3, 2, 5, 4, 6, 8, 7, 9, 11],
    },
];

/* Count-up number animation */
function AnimatedNumber({ value }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const end = Number(value) || 0;
        if (end === 0) { el.textContent = "0"; return; }
        const dur = 900, step = 16;
        const inc = end / (dur / step);
        let cur = 0;
        const timer = setInterval(() => {
            cur = Math.min(cur + inc, end);
            el.textContent = Math.floor(cur).toString();
            if (cur >= end) clearInterval(timer);
        }, step);
        return () => clearInterval(timer);
    }, [value]);
    return <span ref={ref}>0</span>;
}

export default function HostStats({ stats = {} }) {
    // Use real stats if available, otherwise show demo numbers so cards don't look empty
    const values = [
        stats.totalTournaments ?? 12,
        stats.liveEvents       ?? 3,
        stats.teamsRegistered  ?? 47,
        stats.upcomingMatches  ?? 8,
    ];

    return (
        <div style={{
            display: 'grid', gap: 14,
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            fontFamily: '"Space Mono", monospace',
        }}>
            {CARDS.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                    <TiltCard maxTilt={6} scale={1.03} glare={true}>
                        <ElectricCard
                            color={card.accent}
                            color2={card.accent2}
                            speed={9}
                            rounded={22}
                            gap={1.5}
                            glow={0.18}
                        >
                            <div style={{ padding: '22px 20px', position: 'relative', overflow: 'hidden' }}>
                                {/* Dot grid texture */}
                                <div style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none',
                                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                                    backgroundSize: '18px 18px',
                                }} />
                                {/* Corner glow blob */}
                                <div style={{
                                    position: 'absolute', top: -20, right: -20,
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: `${card.accent}18`, filter: 'blur(24px)',
                                    pointerEvents: 'none',
                                }} />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    {/* Top row: icon + badge */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                                        <div style={{
                                            width: 42, height: 42, borderRadius: 14,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: `${card.accent}22`,
                                            border: `1px solid ${card.accent}55`,
                                            color: card.accent,
                                            boxShadow: `0 0 14px ${card.accent}30`,
                                        }}>
                                            <card.icon size={20} />
                                        </div>
                                        {/* Live pulse badge */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 5,
                                            padding: '4px 9px', borderRadius: 999,
                                            background: `${card.accent}15`,
                                            border: `1px solid ${card.accent}45`,
                                        }}>
                                            <motion.div
                                                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.3 }}
                                                style={{ width: 5, height: 5, borderRadius: '50%', background: card.accent, flexShrink: 0 }}
                                            />
                                            <span style={{ fontSize: 8, fontWeight: 700, color: card.accent, letterSpacing: '0.12em' }}>
                                                {card.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>
                                        {card.title}
                                    </p>
                                    {/* Animated value */}
                                    <h2 style={{ fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                                        <AnimatedNumber value={values[index]} />
                                    </h2>

                                    {/* Sparkline + bar row */}
                                    <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: values[index] > 0 ? `${Math.min(values[index] * 10, 100)}%` : '12%' }}
                                                    transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                                                    style={{
                                                        height: '100%', borderRadius: 99,
                                                        background: `linear-gradient(to right, ${card.accent}, ${card.accent2})`,
                                                        boxShadow: `0 0 8px ${card.accent}`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {/* Sparkline trend */}
                                        <Sparkline
                                            data={card.trend}
                                            color={card.accent}
                                            width={60}
                                            height={28}
                                            filled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ElectricCard>
                    </TiltCard>
                </motion.div>
            ))}
        </div>
    );
}