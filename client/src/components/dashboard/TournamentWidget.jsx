/**
 * TournamentWidget — Upcoming Tournaments with Flip card reveal on hover
 * Front: tournament summary. Back: details + quick register CTA.
 */
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Users, Trophy, ChevronRight } from "lucide-react";
import { useState } from "react";
import FlipCard from "../ui/FlipCard";

const GAME_TAGS = {
    "Valorant":         { color: '#ff4655', bg: 'rgba(255,70,85,0.12)' },
    "BGMI":             { color: '#ffc107', bg: 'rgba(255,193,7,0.12)' },
    "Counter Strike 2": { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
    "CS2":              { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
    "Free Fire":        { color: '#ff6030', bg: 'rgba(255,96,48,0.12)' },
};

const tournaments = [
    { id: 1, title: "Valorant Championship", game: "Valorant",         date: "25 Jul 2026", teams: 16, maxTeams: 32, prize: "₹10,000", registered: 14 },
    { id: 2, title: "BGMI Pro League",       game: "BGMI",             date: "28 Jul 2026", teams: 32, maxTeams: 32, prize: "₹25,000", registered: 28 },
    { id: 3, title: "CS2 Masters",           game: "Counter Strike 2", date: "02 Aug 2026", teams: 8,  maxTeams: 16, prize: "₹15,000", registered: 5 },
];

function TournamentFront({ t, accent }) {
    const isRed = accent === '#e8003d';
    const tag   = GAME_TAGS[t.game] || { color: '#e8003d', bg: 'rgba(232,0,61,0.1)' };
    return (
        <div style={{
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
            border: `1px solid ${isRed ? 'rgba(232,0,61,0.2)' : 'rgba(192,192,192,0.14)'}`,
            borderLeft: `3px solid ${accent}`,
            background: isRed ? 'rgba(232,0,61,0.06)' : 'rgba(192,192,192,0.04)',
            backdropFilter: 'blur(12px)',
            borderRadius: 14,
            padding: '14px 16px',
            fontFamily: '"Space Mono", monospace',
            cursor: 'default',
        }}>
            {/* Game tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 8, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: tag.bg, border: `1px solid ${tag.color}40`, color: tag.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {t.game}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#ffc107', fontWeight: 700 }}>
                    <Trophy size={11} color="#ffc107" />
                    {t.prize}
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.01em', marginBottom: 8 }}>{t.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'rgba(192,192,192,0.7)' }}>
                        <CalendarDays size={11} color={accent} />
                        {t.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'rgba(192,192,192,0.7)' }}>
                        <Users size={11} color="rgba(192,192,192,0.5)" />
                        {t.teams} teams
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textAlign: 'right' }}>
                HOVER FOR DETAILS →
            </div>
        </div>
    );
}

function TournamentBack({ t, accent }) {
    const pct = t.maxTeams > 0 ? Math.min(Math.round((t.registered / t.maxTeams) * 100), 100) : 0;
    const nearFull = pct >= 80;
    return (
        <div style={{
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
            border: `1px solid ${accent}55`,
            borderLeft: `3px solid ${accent}`,
            background: `linear-gradient(135deg, ${accent}18 0%, rgba(8,2,14,0.9) 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: 14,
            padding: '14px 16px',
            fontFamily: '"Space Mono", monospace',
        }}>
            <div>
                <p style={{ fontSize: 8, fontWeight: 700, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>Tournament Details</p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{t.title}</h3>
                <div style={{ fontSize: 11, color: '#ffc107', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Trophy size={12} color="#ffc107" /> Prize: {t.prize}
                </div>
            </div>

            {/* Registration progress */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 9, color: 'rgba(192,192,192,0.5)', letterSpacing: '0.08em' }}>Registration</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: nearFull ? '#ffc107' : '#fff' }}>{t.registered}/{t.maxTeams}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: nearFull ? '#ffc107' : accent, boxShadow: `0 0 6px ${nearFull ? '#ffc107' : accent}80`, transition: 'width 0.6s ease' }} />
                </div>
            </div>

            {/* CTA */}
            <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                width: '100%', padding: '9px', borderRadius: 10,
                background: accent, border: 'none', cursor: 'pointer',
                fontSize: 10, fontWeight: 700, color: '#fff',
                fontFamily: '"Space Mono", monospace', letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: `0 0 14px ${accent}60`,
                transition: 'all 0.18s ease',
            }}>
                Register Now <ChevronRight size={13} />
            </button>
        </div>
    );
}

export default function TournamentWidget() {
    const [btnHover, setBtnHover] = useState(false);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
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
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#e8003d', padding: '4px 12px', borderRadius: 999, boxShadow: '0 0 12px rgba(232,0,61,0.4)' }}>
                                <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
                                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Tournament Hub</span>
                            </div>
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Upcoming Tournaments</h2>
                        <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>Hover a card to see details and register.</p>
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
                            transition: 'all 0.18s ease', flexShrink: 0, borderRadius: 999,
                        }}
                        onMouseEnter={() => setBtnHover(true)}
                        onMouseLeave={() => setBtnHover(false)}
                    >
                        View All <ArrowRight size={12} />
                    </button>
                </div>

                <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.25), transparent)', marginBottom: 16 }} />

                {/* Flip Cards grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {tournaments.map((t, i) => {
                        const accent = i % 2 === 0 ? '#e8003d' : '#C0C0C0';
                        return (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.06 * i }}
                            >
                                <FlipCard
                                    front={<TournamentFront t={t} accent={accent} />}
                                    back={<TournamentBack t={t} accent={accent} />}
                                    height={128}
                                    rounded={14}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}