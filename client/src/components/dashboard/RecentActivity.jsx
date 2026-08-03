import { motion, AnimatePresence } from "framer-motion";
import { Trophy, UserPlus, ShieldCheck, Clock, Activity } from "lucide-react";
import { useState } from "react";

const activities = [
    { icon: Trophy,      title: "Won Valorant Match",         time: "2 min ago",  accent: '#e8003d', tag: 'WIN' },
    { icon: UserPlus,    title: "New teammate joined",         time: "10 min ago", accent: '#C0C0C0', tag: 'TEAM' },
    { icon: ShieldCheck, title: "Team verified",               time: "Today",      accent: '#e8003d', tag: 'INFO' },
    { icon: Clock,       title: "Tournament starts tomorrow",  time: "Tomorrow",   accent: '#C0C0C0', tag: 'UPCOMING' },
];

export default function RecentActivity() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: '2px solid #e8003d',
                background: 'rgba(7,0,10,0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                fontFamily: '"Space Mono", monospace',
                boxShadow: '0 0 32px rgba(232,0,61,0.06), 0 16px 48px rgba(0,0,0,0.45)',
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
                        {/* Red solid badge */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e8003d', padding: '4px 12px', borderRadius: 999 }}>
                            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                <Activity size={11} color="#fff" />
                            </motion.div>
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Live Feed</span>
                        </div>
                        {/* Silver line extending right */}
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.4), transparent)' }} />
                    </div>

                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                        Recent Activity
                    </h2>
                    <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>
                        Latest updates from your team and tournaments.
                    </p>
                </div>

                {/* Silver divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.35), transparent)', marginBottom: 14 }} />

                {/* Activity rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {activities.map((item, index) => {
                        const isRed = item.accent === '#e8003d';
                        const isHovered = hoveredIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.05 * index }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    border: `1px solid ${isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.12)'}`,
                                    borderLeft: `3px solid ${item.accent}`,
                                    background: isHovered
                                        ? (isRed ? 'rgba(232,0,61,0.14)' : 'rgba(192,192,192,0.09)')
                                        : (isRed ? 'rgba(232,0,61,0.05)' : 'rgba(192,192,192,0.03)'),
                                    padding: '12px 14px',
                                    transition: 'all 0.15s ease',
                                    transform: isHovered ? 'translateX(4px)' : 'none',
                                    cursor: 'default',
                                    borderRadius: 12,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {/* Icon box */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 36, height: 36,
                                        border: `1px solid ${item.accent}`,
                                        background: isRed ? 'rgba(232,0,61,0.2)' : 'rgba(192,192,192,0.1)',
                                        color: item.accent, flexShrink: 0,
                                        borderRadius: 10,
                                    }}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em' }}>{item.title}</h3>
                                        <p style={{ marginTop: 3, fontSize: 10, color: '#C0C0C0', opacity: 0.55, letterSpacing: '0.06em' }}>{item.time}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    {/* Tag */}
                                    <div style={{
                                        fontSize: 8, fontWeight: 700, letterSpacing: '0.14em',
                                        border: `1px solid ${item.accent}`,
                                        color: item.accent,
                                        padding: '2px 8px',
                                        background: isRed ? 'rgba(232,0,61,0.08)' : 'rgba(192,192,192,0.05)',
                                        borderRadius: 999,
                                    }}>
                                        {item.tag}
                                    </div>
                                    {/* Status dot */}
                                    <motion.div
                                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                                        style={{ width: 6, height: 6, borderRadius: '50%', background: item.accent, flexShrink: 0 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}