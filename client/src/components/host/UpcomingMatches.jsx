import { motion } from "framer-motion";
import { CalendarDays, Clock3, Swords, ArrowRight } from "lucide-react";
import { useState } from "react";

const matches = [
    { title: "Quarter Final", teams: "Team Alpha vs Team Bravo",              time: "Today • 7:00 PM",     accent: '#e8003d' },
    { title: "Semi Final",    teams: "Winner Match 1 vs Winner Match 2", time: "Tomorrow • 6:30 PM", accent: '#C0C0C0' },
];

export default function UpcomingMatches() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
                position: 'relative', overflow: 'hidden',
                borderTop: '2px solid #C0C0C0',
                border: '1px solid rgba(192,192,192,0.1)',
                borderTop: '2px solid #C0C0C0',
                background: '#000000',
                fontFamily: '"Space Mono", monospace',
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#C0C0C0', padding: '4px 12px', borderRadius: 999 }}>
                            <CalendarDays size={11} color="#000" />
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Match Schedule</span>
                        </div>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.4), transparent)' }} />
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Upcoming Matches</h2>
                    <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>Your next scheduled tournament matches.</p>
                </div>

                {/* Red divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, rgba(232,0,61,0.5), transparent)', marginBottom: 14 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {matches.map((match, index) => {
                        const isRed = match.accent === '#e8003d';
                        const isHovered = hoveredIndex === index;
                        return (
                            <motion.div
                                key={match.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.06 * index }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    borderLeft: `3px solid ${match.accent}`,
                                    border: `1px solid ${isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.12)'}`,
                                    borderLeft: `3px solid ${match.accent}`,
                                    background: isHovered
                                        ? (isRed ? 'rgba(232,0,61,0.14)' : 'rgba(192,192,192,0.09)')
                                        : (isRed ? 'rgba(232,0,61,0.05)' : 'rgba(192,192,192,0.03)'),
                                    padding: '14px 16px',
                                    transition: 'all 0.15s ease',
                                    transform: isHovered ? 'translateX(6px)' : 'none',
                                    cursor: 'default',
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    {/* Icon box */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 40, height: 40, flexShrink: 0,
                                        border: `1px solid ${match.accent}`,
                                        background: isRed ? 'rgba(232,0,61,0.2)' : 'rgba(192,192,192,0.1)',
                                        color: match.accent,
                                    }}>
                                        <Swords size={18} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>{match.title}</h3>
                                        <p style={{ marginTop: 3, fontSize: 10, color: '#C0C0C0', opacity: 0.6, letterSpacing: '0.04em' }}>{match.teams}</p>
                                        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Clock3 size={11} style={{ color: match.accent }} />
                                            <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>{match.time}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pulsing status dot + arrow */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                                    <motion.div
                                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                        style={{ width: 6, height: 6, borderRadius: '50%', background: match.accent }}
                                    />
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 28, height: 28,
                                        border: `1px solid ${match.accent}`,
                                        background: isHovered ? match.accent : 'transparent',
                                        color: isHovered ? '#fff' : match.accent,
                                        transition: 'all 0.15s ease',
                                    }}>
                                        <ArrowRight size={13} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}