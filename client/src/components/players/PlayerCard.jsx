/**
 * PlayerCard — Electric Border × Apple Glass gaming card
 */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PlayerAvatar from './PlayerAvatar';
import PlayerStats from './PlayerStats';
import PlayerActions from './PlayerActions';
import ElectricCard from '../ui/ElectricCard';

export default function PlayerCard({ player }) {
    const navigate     = useNavigate();
    const riotCardUrl  = player.riotCard
        ? `https://media.valorant-api.com/playercards/${player.riotCard}/wideart.png`
        : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <ElectricCard
                color="#e8003d"
                color2="#ff5530"
                speed={7}
                rounded={20}
                gap={1.5}
                glow={0.3}
                onClick={() => navigate(`/players/${player.username}`)}
                style={{ fontFamily: '"Space Mono", monospace', cursor: 'pointer' }}
            >
                {/* ── Riot banner ── */}
                <div style={{ position: 'relative', height: 128, overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                    {riotCardUrl ? (
                        <img
                            src={riotCardUrl}
                            alt="Riot Card"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%', height: '100%',
                            background: 'linear-gradient(135deg, rgba(232,0,61,0.12) 0%, rgba(255,80,48,0.06) 50%, rgba(8,2,12,0.8) 100%)',
                        }}>
                            {/* grid pattern */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: 'linear-gradient(rgba(232,0,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,61,0.08) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }} />
                        </div>
                    )}
                    {/* scrim */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,2,12,0.95) 0%, transparent 65%)' }} />

                    {/* Verified badge */}
                    {player.riotVerified && (
                        <div style={{
                            position: 'absolute', top: 12, right: 12,
                            padding: '3px 10px', borderRadius: 999,
                            background: 'rgba(34,197,94,0.15)',
                            border: '1px solid rgba(34,197,94,0.4)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                            <span style={{ fontSize: 9, color: '#22c55e', letterSpacing: '0.14em', fontWeight: 700 }}>VERIFIED</span>
                        </div>
                    )}
                </div>

                {/* ── Avatar + Info ── */}
                <div style={{ padding: '0 20px 22px', marginTop: -32, position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                        <PlayerAvatar player={player} />
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: 18 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            {player.displayName}
                        </h2>
                        {/* Username badge */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                padding: '2px 10px', borderRadius: 999,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em',
                            }}>
                                <span style={{ color: 'rgba(232,0,61,0.7)' }}>@</span>{player.username}
                            </span>
                        </div>
                        {player.riotGameName && (
                            <p style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                                {player.riotGameName}
                                {player.riotTagLine && (
                                    <span style={{ color: 'rgba(232,0,61,0.75)' }}>#{player.riotTagLine}</span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Stats glass pill */}
                    <div style={{
                        padding: '12px 14px',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 14,
                        background: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(8px)',
                        marginBottom: 14,
                    }}>
                        <PlayerStats player={player} />
                    </div>

                    {/* Actions */}
                    <div onClick={e => e.stopPropagation()}>
                        <PlayerActions player={player} />
                    </div>
                </div>
            </ElectricCard>
        </motion.div>
    );
}