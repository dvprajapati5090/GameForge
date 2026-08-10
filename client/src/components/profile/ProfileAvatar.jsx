import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

/** Default banner — a dark gradient with GameForge branding pattern */
function DefaultBanner() {
    return (
        <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #0a0010 0%, #14001e 40%, #0d0008 70%, #08000f 100%)',
        }}>
            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(rgba(232,0,61,0.18) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }} />
            {/* Diagonal red accent lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
                <line x1="-10%" y1="100%" x2="60%"  y2="0%"  stroke="rgba(232,0,61,0.12)" strokeWidth="1.5" />
                <line x1="20%"  y1="100%" x2="90%"  y2="0%"  stroke="rgba(232,0,61,0.08)" strokeWidth="1" />
                <line x1="50%"  y1="100%" x2="120%" y2="0%"  stroke="rgba(192,192,192,0.06)" strokeWidth="1" />
            </svg>
            {/* Shield watermark */}
            <div style={{
                position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)',
                opacity: 0.04, pointerEvents: 'none',
            }}>
                <Shield size={220} color="#e8003d" />
            </div>
            {/* Glow blobs */}
            <div style={{ position: 'absolute', top: -30, left: '20%', width: 300, height: 150, borderRadius: '50%', background: 'rgba(232,0,61,0.07)', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', bottom: -30, right: '10%', width: 250, height: 130, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(50px)' }} />
        </div>
    );
}

export default function ProfileAvatar({ player }) {
    const profile = player;
    const banner = profile?.riotCard
        ? `https://media.valorant-api.com/playercards/${profile.riotCard}/largeart.png`
        : null;

    return (
        <div style={{
            position: 'relative',
            height: 320,
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
        }}>
            {/* Banner */}
            {banner ? (
                <img
                    src={banner}
                    alt="Player Card"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
            ) : (
                <DefaultBanner />
            )}

            {/* Dark gradient overlay — stronger at bottom so avatar reads cleanly */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.82) 100%)',
            }} />

            {/* Top-left: Shield icon badge (replaces old 60×60 card) */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                    position: 'absolute', top: 20, left: 20, zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 12,
                    background: 'rgba(232,0,61,0.15)',
                    border: '1px solid rgba(232,0,61,0.35)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Shield size={16} color="#e8003d" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ff4d7a', fontFamily: '"Space Mono", monospace', letterSpacing: '0.08em' }}>
                    GAMEFORGE
                </span>
            </motion.div>

            {/* Center avatar — vertically and horizontally centered in the banner */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Avatar ring — 148px, stays well inside 320px tall container */}
                <div style={{
                    width: 148,
                    height: 148,
                    borderRadius: '50%',
                    border: '3px solid rgba(232,0,61,0.6)',
                    padding: 3,
                    background: 'rgba(0,0,0,0.7)',
                    position: 'relative',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(232,0,61,0.2)',
                }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#111' }}>
                        {profile?.avatar ? (
                            <img src={profile.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : profile?.riotCard ? (
                            <img
                                src={`https://media.valorant-api.com/playercards/${profile.riotCard}/displayicon.png`}
                                alt="Player Card"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '100%', height: '100%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #3a0010 0%, #7a0020 50%, #e8003d 100%)',
                                fontSize: 52, fontWeight: 700, color: '#fff',
                                fontFamily: '"Space Mono", monospace',
                            }}>
                                {profile?.displayName?.charAt(0)?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Online dot */}
                    <div style={{
                        position: 'absolute', bottom: 6, right: 6,
                        width: 16, height: 16, borderRadius: '50%',
                        background: '#22c55e', border: '3px solid #000',
                        boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                    }} />
                </div>

                {/* Level badge */}
                <div style={{
                    marginTop: 8, padding: '4px 14px', borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.85)',
                    fontSize: 11, fontWeight: 700,
                    fontFamily: '"Space Mono", monospace',
                    color: 'rgba(255,255,255,0.8)',
                    letterSpacing: '0.08em',
                    backdropFilter: 'blur(8px)',
                }}>
                    LV {profile?.accountLevel ?? 1}
                </div>
            </motion.div>
        </div>
    );
}