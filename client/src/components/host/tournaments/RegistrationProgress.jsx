/**
 * RegistrationProgress — Gaming glass-themed registration progress card
 * Replaces the Tailwind-based version with our Space Mono / red-silver theme
 */
import { motion } from "framer-motion";
import { Users, CheckSquare, Layers } from "lucide-react";
import ProgressRing from "../../ui/ProgressRing";

export default function RegistrationProgress({ registered = 0, maxTeams = 32 }) {
    const pct      = maxTeams > 0 ? Math.min((registered / maxTeams) * 100, 100) : 0;
    const remaining = maxTeams - registered;
    const isNearFull = pct >= 80;
    const isFull     = pct >= 100;
    const accent    = isFull ? '#22c55e' : isNearFull ? '#ff9020' : '#e8003d';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: `2px solid ${accent}`,
                background: 'rgba(7,0,10,0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                padding: '24px',
                fontFamily: '"Space Mono", monospace',
                boxShadow: `0 0 28px ${accent}15, 0 16px 48px rgba(0,0,0,0.45)`,
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: `${accent}08`, filter: 'blur(40px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <div style={{ background: `${accent}22`, border: `1px solid ${accent}55`, borderRadius: 8, padding: '4px 8px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                                    <Users size={11} color={accent} />
                                </motion.div>
                                <span style={{ fontSize: 9, fontWeight: 700, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                                    Team Registration
                                </span>
                            </div>
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Registration Progress</h3>
                        <p style={{ fontSize: 10, color: 'rgba(192,192,192,0.5)', marginTop: 4, letterSpacing: '0.06em' }}>
                            {isFull ? 'All slots filled!' : isNearFull ? `Only ${remaining} slot${remaining > 1 ? 's' : ''} remaining` : 'Registration open'}
                        </p>
                    </div>

                    {/* Circular progress ring */}
                    <ProgressRing
                        value={registered}
                        max={maxTeams}
                        size={80}
                        stroke={6}
                        color={accent}
                        label={`${Math.round(pct)}%`}
                        sublabel="filled"
                        animate
                    />
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, color: 'rgba(192,192,192,0.6)', letterSpacing: '0.06em' }}>Teams</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{registered} / {maxTeams}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
                            style={{
                                height: '100%', borderRadius: 999,
                                background: `linear-gradient(90deg, ${accent}, ${accent}aa)`,
                                boxShadow: `0 0 8px ${accent}80`,
                                position: 'relative', overflow: 'hidden',
                            }}
                        >
                            {/* Shimmer sweep */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                                style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    width: '50%',
                                }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    {[
                        { label: 'Registered', value: registered,       icon: CheckSquare, color: accent },
                        { label: 'Remaining',  value: remaining,        icon: Layers,      color: remaining > 0 ? '#C0C0C0' : '#22c55e' },
                        { label: 'Completion', value: `${Math.round(pct)}%`, icon: Users, color: accent },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            style={{
                                padding: '12px 14px', borderRadius: 14,
                                border: `1px solid ${stat.color}22`,
                                background: `${stat.color}08`,
                                textAlign: 'center',
                            }}
                        >
                            <stat.icon size={13} color={stat.color} style={{ margin: '0 auto 6px' }} />
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{stat.value}</div>
                            <div style={{ fontSize: 8, color: 'rgba(192,192,192,0.5)', marginTop: 3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
