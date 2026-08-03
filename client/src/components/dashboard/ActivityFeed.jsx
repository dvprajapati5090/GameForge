import { motion } from "framer-motion";
import { Trophy, Users, ShieldCheck, CheckCircle2, Star, Sword } from "lucide-react";

const F = '"Space Mono", monospace';

const ACTIVITY_ICONS = {
    Trophy:       { Icon: Trophy,       color: '#ffc107', bg: 'rgba(255,193,7,0.12)',  border: 'rgba(255,193,7,0.25)'  },
    Users:        { Icon: Users,        color: '#e8003d', bg: 'rgba(232,0,61,0.12)',   border: 'rgba(232,0,61,0.25)'   },
    ShieldCheck:  { Icon: ShieldCheck,  color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.25)'  },
    CheckCircle2: { Icon: CheckCircle2, color: '#22d3ee', bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.25)' },
    Star:         { Icon: Star,         color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.25)' },
    Sword:        { Icon: Sword,        color: '#ff6030', bg: 'rgba(255,96,48,0.12)',  border: 'rgba(255,96,48,0.25)'  },
};

const activities = [
    { iconKey: "Trophy",       title: "Won Valorant Match",               sub: "3 kills — MVP performance",            time: "2m ago"  },
    { iconKey: "Users",        title: "Player joined your team",           sub: "GhostRifle accepted your invite",       time: "15m ago" },
    { iconKey: "ShieldCheck",  title: "Team verified successfully",         sub: "GameForge Shield awarded",              time: "1h ago"  },
    { iconKey: "CheckCircle2", title: "Tournament registration approved",   sub: "Valorant Summer Cup · 22 July",         time: "Today"   },
    { iconKey: "Star",         title: "Achievement unlocked",               sub: "First Blood — 10-0 win streak",        time: "Yesterday" },
];

export default function ActivityFeed() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: '2px solid #C0C0C0',
                background: 'rgba(7,0,10,0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                fontFamily: F,
                boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <motion.div
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8003d', boxShadow: '0 0 6px rgba(232,0,61,0.8)' }}
                        />
                        <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(192,192,192,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Live Feed</span>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Recent Activity</h2>
                    <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.5, lineHeight: 1.6 }}>What's been happening in your arena.</p>
                </div>

                {/* Gradient divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.3), transparent)', marginBottom: 16 }} />

                {/* Activity rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {activities.map((item, index) => {
                        const { Icon, color, bg, border } = ACTIVITY_ICONS[item.iconKey] || ACTIVITY_ICONS.Trophy;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.04 * index }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '12px 10px', borderRadius: 12,
                                    transition: 'background 0.15s ease',
                                    cursor: 'default',
                                }}
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                            >
                                {/* Icon circle */}
                                <div style={{
                                    width: 40, height: 40, flexShrink: 0, borderRadius: 12,
                                    background: bg, border: `1px solid ${border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 0 10px ${color}20`,
                                }}>
                                    <Icon size={16} color={color} />
                                </div>

                                {/* Text */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.title}
                                    </p>
                                    <p style={{ fontSize: 9, color: 'rgba(192,192,192,0.45)', marginTop: 3, letterSpacing: '0.06em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.sub}
                                    </p>
                                </div>

                                {/* Timestamp */}
                                <span style={{ fontSize: 9, color: 'rgba(192,192,192,0.3)', letterSpacing: '0.06em', flexShrink: 0 }}>
                                    {item.time}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer link */}
                <motion.button
                    whileHover={{ x: 4 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        marginTop: 16, paddingTop: 14,
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: F, color: 'rgba(192,192,192,0.35)',
                        fontSize: 10, letterSpacing: '0.1em',
                    }}
                >
                    VIEW ALL ACTIVITY →
                </motion.button>
            </div>
        </motion.section>
    );
}