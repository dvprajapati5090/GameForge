import { motion } from "framer-motion";
import { CalendarDays, Users, ChevronRight, Trophy, Zap } from "lucide-react";
import { useState } from "react";
import CountdownTimer from "../ui/CountdownTimer";

const GAME_TAG_COLORS = {
    "Valorant":         "#ff4655",
    "BGMI":             "#ffc107",
    "Counter Strike 2": "#7c3aed",
    "CS2":              "#7c3aed",
    "Free Fire":        "#ff6030",
};

export default function UpcomingTournament({ tournament, index = 0 }) {
    const isRed  = index % 2 === 0;
    const accent = isRed ? '#e8003d' : '#C0C0C0';
    const tagColor = GAME_TAG_COLORS[tournament.game] || accent;
    const [hovered, setHovered] = useState(false);

    /* Build a target date from tournament.date string or ISO date */
    const targetDate = tournament.targetDate || tournament.date
        ? new Date(`${tournament.date} 2026`) // handle "25 Jul 2026" format
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.06 * index }}
            style={{
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                border: `1px solid ${hovered ? accent + '45' : (isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.12)')}`,
                borderLeft: `3px solid ${accent}`,
                background: hovered
                    ? (isRed ? 'rgba(232,0,61,0.12)' : 'rgba(192,192,192,0.07)')
                    : (isRed ? 'rgba(232,0,61,0.05)' : 'rgba(192,192,192,0.03)'),
                padding: '12px 14px',
                transition: 'all 0.2s ease',
                transform: hovered ? 'translateX(5px)' : 'none',
                cursor: 'pointer',
                fontFamily: '"Space Mono", monospace',
                borderRadius: 12,
                boxShadow: hovered ? `0 0 16px ${accent}20` : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Shimmer on hover */}
            {hovered && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', width: '50%', pointerEvents: 'none' }}
                />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                {/* Game icon box */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42,
                    border: `1px solid ${tagColor}55`,
                    background: `${tagColor}18`,
                    fontSize: 17, fontWeight: 700, color: tagColor, flexShrink: 0,
                    borderRadius: 12,
                    boxShadow: hovered ? `0 0 10px ${tagColor}30` : 'none',
                    transition: 'all 0.2s ease',
                }}>
                    {tournament.game.charAt(0)}
                </div>

                <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tournament.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: `${tagColor}18`, border: `1px solid ${tagColor}40`, color: tagColor, letterSpacing: '0.1em' }}>
                            {tournament.game}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Users size={9} color="rgba(192,192,192,0.5)" />
                            <span style={{ fontSize: 9, color: 'rgba(192,192,192,0.5)' }}>{tournament.teams}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                {/* Compact countdown or date */}
                <div style={{ textAlign: 'right' }}>
                    {targetDate && !isNaN(targetDate) ? (
                        <CountdownTimer
                            targetDate={targetDate}
                            compact={true}
                            accent={accent}
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
                            <CalendarDays size={10} color={accent} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{tournament.date}</span>
                        </div>
                    )}
                    {tournament.prize && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 3 }}>
                            <Trophy size={9} color="#ffc107" />
                            <span style={{ fontSize: 9, color: '#ffc107', fontWeight: 700 }}>{tournament.prize}</span>
                        </div>
                    )}
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 30, height: 30,
                    border: `1px solid ${accent}`,
                    background: hovered ? accent : 'transparent',
                    color: hovered ? '#fff' : accent,
                    transition: 'all 0.18s ease', flexShrink: 0,
                    borderRadius: 9,
                    boxShadow: hovered ? `0 0 10px ${accent}60` : 'none',
                }}>
                    <ChevronRight size={13} />
                </div>
            </div>
        </motion.div>
    );
}