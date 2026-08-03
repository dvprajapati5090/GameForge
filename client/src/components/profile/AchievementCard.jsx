/**
 * AchievementCard — Gaming glass achievement card with flip reveal + glow
 */
import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import FlipCard from "../ui/FlipCard";

export default function AchievementCard({ achievement, unlocked, index = 0 }) {
    const accent = unlocked ? '#ffc107' : 'rgba(255,255,255,0.15)';

    const front = (
        <div style={{
            height: '100%',
            position: 'relative', overflow: 'hidden',
            border: `1px solid ${unlocked ? 'rgba(255,193,7,0.35)' : 'rgba(255,255,255,0.08)'}`,
            borderTop: `2px solid ${unlocked ? '#ffc107' : 'rgba(255,255,255,0.15)'}`,
            background: unlocked
                ? 'linear-gradient(135deg, rgba(255,193,7,0.12) 0%, rgba(255,120,0,0.06) 100%)'
                : 'rgba(8,2,14,0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: 18,
            padding: '24px',
            fontFamily: '"Space Mono", monospace',
            boxShadow: unlocked ? '0 0 28px rgba(255,193,7,0.15), 0 12px 40px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.35)',
            display: 'flex', flexDirection: 'column',
        }}>
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }} />
            {/* Glow blob */}
            {unlocked && (
                <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,193,7,0.15)', filter: 'blur(30px)', pointerEvents: 'none' }} />
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <motion.div
                    animate={unlocked ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ fontSize: 44, marginBottom: 14, display: 'block', filter: unlocked ? 'drop-shadow(0 0 8px rgba(255,193,7,0.6))' : 'grayscale(1) opacity(0.35)' }}
                >
                    {achievement.icon}
                </motion.div>

                <h3 style={{ fontSize: 13, fontWeight: 700, color: unlocked ? '#fff' : 'rgba(255,255,255,0.4)', letterSpacing: '0.02em', marginBottom: 6 }}>
                    {achievement.title}
                </h3>
                <p style={{ fontSize: 10, color: 'rgba(192,192,192,0.45)', lineHeight: 1.6, letterSpacing: '0.04em' }}>
                    {achievement.description}
                </p>

                {/* Status */}
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {unlocked ? (
                        <motion.div
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 999, padding: '4px 10px' }}
                        >
                            <CheckCircle2 size={10} color="#22c55e" />
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e', letterSpacing: '0.12em' }}>UNLOCKED</span>
                        </motion.div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '4px 10px' }}>
                            <Lock size={10} color="rgba(255,255,255,0.3)" />
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>LOCKED</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover hint */}
            <div style={{ marginTop: 'auto', paddingTop: 12, fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textAlign: 'right' }}>
                HOVER FOR DETAILS →
            </div>
        </div>
    );

    const back = (
        <div style={{
            height: '100%',
            position: 'relative', overflow: 'hidden',
            border: `1px solid ${unlocked ? 'rgba(255,193,7,0.5)' : 'rgba(255,255,255,0.1)'}`,
            background: unlocked
                ? 'linear-gradient(135deg, rgba(255,193,7,0.18) 0%, rgba(255,80,0,0.12) 100%)'
                : 'rgba(12,4,20,0.9)',
            backdropFilter: 'blur(24px)',
            borderRadius: 18,
            padding: '24px',
            fontFamily: '"Space Mono", monospace',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: unlocked ? '#ffc107' : 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                    {unlocked ? 'Achievement Details' : 'Locked Achievement'}
                </div>
                <div style={{ fontSize: 32, marginBottom: 12, filter: unlocked ? 'none' : 'grayscale(1) opacity(0.3)' }}>
                    {achievement.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{achievement.title}</h3>
                <p style={{ fontSize: 10, color: 'rgba(192,192,192,0.6)', lineHeight: 1.7, marginBottom: 16 }}>
                    {achievement.description}
                </p>
                {unlocked ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.4)', borderRadius: 999, padding: '6px 14px' }}>
                        <CheckCircle2 size={11} color="#ffc107" />
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#ffc107', letterSpacing: '0.14em' }}>ACHIEVEMENT EARNED</span>
                    </div>
                ) : (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', fontStyle: 'italic' }}>
                        Keep playing to unlock this achievement
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
        >
            <FlipCard front={front} back={back} height={240} rounded={18} />
        </motion.div>
    );
}