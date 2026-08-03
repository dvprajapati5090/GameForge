import { motion } from "framer-motion";
import { CalendarDays, Users, ArrowRight, Trophy } from "lucide-react";
import { useState } from "react";

const tournaments = [
    { title: "Valorant Summer Cup", status: "Registration Open", statusAccent: '#e8003d', registered: 12, maxTeams: 32, date: "22 July" },
    { title: "Weekend Showdown",    status: "Draft",             statusAccent: '#C0C0C0', registered: 0,  maxTeams: 16, date: "30 July" },
];

export default function RecentTournaments() {
    const [btnHover, setBtnHover] = useState(false);
    const [hoveredRow, setHoveredRow] = useState(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e8003d', padding: '4px 12px', boxShadow: '0 0 10px rgba(232,0,61,0.4)' }}>
                                <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
                                    <Trophy size={11} color="#fff" />
                                </motion.div>
                                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Tournament Hub</span>
                            </div>
                            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.4), transparent)' }} />
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Recent Tournaments</h2>
                        <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>Manage your latest hosted events.</p>
                    </div>

                    <button
                        style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            border: `1px solid ${btnHover ? '#e8003d' : 'rgba(192,192,192,0.5)'}`,
                            background: btnHover ? '#e8003d' : 'rgba(255,255,255,0.04)',
                            padding: '8px 16px', fontSize: 10, fontWeight: 700,
                            color: btnHover ? '#fff' : '#C0C0C0',
                            cursor: 'pointer', fontFamily: '"Space Mono", monospace',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'all 0.18s ease', flexShrink: 0,
                            borderRadius: 999,
                        }}
                        onMouseEnter={() => setBtnHover(true)}
                        onMouseLeave={() => setBtnHover(false)}
                    >
                        View All <ArrowRight size={12} />
                    </button>
                </div>

                {/* Red→Silver divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.25), transparent)', marginBottom: 14 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {tournaments.map((tournament, index) => {
                        const isRed = tournament.statusAccent === '#e8003d';
                        const isHovered = hoveredRow === index;
                        return (
                            <motion.div
                                key={tournament.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.08 * index }}
                                style={{
                                    position: 'relative', overflow: 'hidden',
                                    border: `1px solid ${isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.12)'}`,
                                    borderLeft: `3px solid ${tournament.statusAccent}`,
                                    background: isHovered
                                        ? (isRed ? 'rgba(232,0,61,0.12)' : 'rgba(192,192,192,0.07)')
                                        : (isRed ? 'rgba(232,0,61,0.05)' : 'rgba(192,192,192,0.03)'),
                                    padding: '16px 18px',
                                    transition: 'all 0.18s ease',
                                    transform: isHovered ? 'translateX(4px)' : 'none',
                                    cursor: 'default',
                                    borderRadius: 12,
                                    boxShadow: isHovered ? `0 0 14px ${tournament.statusAccent}20` : 'none',
                                }}
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                {/* Hover shimmer sweep */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '200%' }}
                                        transition={{ duration: 0.7, ease: 'linear' }}
                                        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', width: '50%', pointerEvents: 'none' }}
                                    />
                                )}

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <h3 style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em' }}>{tournament.title}</h3>
                                        <div style={{
                                            fontSize: 8, fontWeight: 700, letterSpacing: '0.14em',
                                            border: `1px solid ${tournament.statusAccent}`,
                                            color: tournament.statusAccent,
                                            padding: '3px 10px',
                                            background: isRed ? 'rgba(232,0,61,0.1)' : 'rgba(192,192,192,0.07)',
                                            textTransform: 'uppercase',
                                            borderRadius: 999,
                                        }}>
                                            {tournament.status}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Users size={12} style={{ color: '#C0C0C0' }} />
                                            <span style={{ fontSize: 10, color: '#C0C0C0', opacity: 0.7, letterSpacing: '0.06em' }}>{tournament.registered} / {tournament.maxTeams} Teams</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <CalendarDays size={12} style={{ color: tournament.statusAccent }} />
                                            <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>{tournament.date}</span>
                                        </div>
                                    </div>

                                    {/* Calculated progress bar */}
                                    <div style={{ height: 3, background: 'rgba(192,192,192,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${tournament.maxTeams > 0 ? Math.min((tournament.registered / tournament.maxTeams) * 100, 100) : 0}%` }}
                                            transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                            style={{ height: '100%', background: `linear-gradient(to right, ${tournament.statusAccent}, ${tournament.statusAccent}88)`, borderRadius: 99 }}
                                        />
                                    </div>
                                    <span style={{ fontSize: 8, color: 'rgba(192,192,192,0.35)', letterSpacing: '0.08em', marginTop: 4, display: 'block' }}>
                                        {tournament.maxTeams > 0 ? `${Math.round((tournament.registered / tournament.maxTeams) * 100)}% filled` : 'Draft'}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
