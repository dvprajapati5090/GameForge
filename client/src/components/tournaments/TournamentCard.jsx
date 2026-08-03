/**
 * TournamentCard — Electric Border × gaming card
 */
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Users, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../host/tournaments/StatusBadge';
import ElectricCard from '../ui/ElectricCard';

function getStartsIn(date) {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return 'LIVE';
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
}

function shortFormat(format = '') {
    return format === 'SINGLE_ELIMINATION' ? 'SE'
        : format === 'DOUBLE_ELIMINATION' ? 'DE'
        : format;
}

export default function TournamentCard({ tournament }) {
    const navigate   = useNavigate();
    const registered = tournament.registrationCount ?? tournament.registeredTeams?.length ?? 0;
    const progress   = Math.min((registered / tournament.maxTeams) * 100, 100);
    const startsIn   = getStartsIn(tournament.tournamentStart);
    const isLive     = startsIn === 'LIVE';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <ElectricCard
                color={isLive ? '#ff2060' : '#e8003d'}
                color2={isLive ? '#ff8020' : '#ff5530'}
                speed={isLive ? 4 : 7}
                rounded={20}
                gap={1.5}
                glow={isLive ? 0.45 : 0.3}
                onClick={() => navigate(`/tournaments/${tournament._id}`)}
                style={{ fontFamily: '"Space Mono", monospace', cursor: 'pointer' }}
            >
                {/* ── Banner ── */}
                <div style={{ position: 'relative', height: 148, overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
                    {tournament.banner ? (
                        <img
                            src={tournament.banner}
                            alt={tournament.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%', height: '100%',
                            background: 'linear-gradient(135deg, rgba(232,0,61,0.15) 0%, rgba(255,80,48,0.07) 50%, rgba(8,2,12,0.8) 100%)',
                        }}>
                            {/* Grid pattern */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: 'linear-gradient(rgba(232,0,61,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,61,0.1) 1px, transparent 1px)',
                                backgroundSize: '28px 28px',
                            }} />
                            {/* Trophy icon watermark */}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06 }}>
                                <Trophy size={72} color="#e8003d" />
                            </div>
                        </div>
                    )}
                    {/* Scrim */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,2,12,0.96) 0%, rgba(8,2,12,0.3) 60%, transparent 100%)' }} />

                    {/* Badges row */}
                    <div style={{ position: 'absolute', left: 14, top: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span style={{
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(12px)',
                            padding: '4px 11px', borderRadius: 999,
                            fontSize: 10, color: 'rgba(255,255,255,0.8)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            letterSpacing: '0.06em',
                        }}>
                            {tournament.game}
                        </span>
                        <StatusBadge status={tournament.status} />
                        {isLive && (
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: 4,
                                background: 'rgba(232,0,61,0.2)',
                                border: '1px solid rgba(232,0,61,0.5)',
                                backdropFilter: 'blur(8px)',
                                padding: '4px 10px', borderRadius: 999,
                                fontSize: 10, color: '#ff6080', fontWeight: 700, letterSpacing: '0.1em',
                            }}>
                                <Zap size={9} fill="#ff6080" />
                                LIVE
                            </span>
                        )}
                    </div>

                    {/* Title + Prize */}
                    <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', flex: 1, marginRight: 10, lineHeight: 1.2 }}>
                            {tournament.name}
                        </h3>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>PRIZE</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#e8003d' }}>
                                ₹{Number(tournament.prizePool || 0).toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div style={{ padding: '16px 18px 20px' }}>
                    {/* Description */}
                    <p style={{
                        fontSize: 11.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.75,
                        marginBottom: 16,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {tournament.description || 'No description provided.'}
                    </p>

                    {/* Registration progress */}
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                                Registration
                            </span>
                            <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>
                                {registered}/{tournament.maxTeams}
                            </span>
                        </div>
                        {/* Track */}
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', borderRadius: 99,
                                width: `${progress}%`,
                                background: progress >= 100
                                    ? '#e8003d'
                                    : `linear-gradient(90deg, rgba(232,0,61,0.8), rgba(255,85,48,0.9))`,
                                boxShadow: `0 0 8px rgba(232,0,61,0.6)`,
                                transition: 'width 0.6s ease',
                            }} />
                        </div>
                    </div>

                    {/* Stat chips */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
                        {[
                            { icon: <Users size={12} />,  label: 'TEAMS',  value: tournament.maxTeams },
                            { icon: <Trophy size={12} />, label: 'FORMAT', value: shortFormat(tournament.format) },
                            { icon: <Clock size={12} />,  label: 'STARTS', value: startsIn },
                        ].map(s => (
                            <div key={s.label} style={{
                                padding: '9px 10px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 12,
                                background: 'rgba(255,255,255,0.025)',
                                backdropFilter: 'blur(6px)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.38)', marginBottom: 5 }}>
                                    {s.icon}
                                    <span style={{ fontSize: 8.5, letterSpacing: '0.1em' }}>{s.label}</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: s.label === 'STARTS' && isLive ? '#ff6080' : '#fff' }}>
                                    {s.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Date */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, color: 'rgba(255,255,255,0.28)', fontSize: 11 }}>
                        <Calendar size={12} />
                        {new Date(tournament.tournamentStart).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                        })}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={e => { e.stopPropagation(); navigate(`/tournaments/${tournament._id}`); }}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            padding: '11px 0',
                            background: 'linear-gradient(135deg, rgba(232,0,61,0.18) 0%, rgba(232,0,61,0.08) 100%)',
                            border: '1px solid rgba(232,0,61,0.35)',
                            borderRadius: 13,
                            color: '#fff', fontSize: 11.5,
                            fontFamily: '"Space Mono", monospace',
                            fontWeight: 700, cursor: 'pointer',
                            letterSpacing: '0.06em',
                            transition: 'all 0.25s ease',
                            backdropFilter: 'blur(8px)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #e8003d, #b5002e)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(232,0,61,0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(232,0,61,0.18) 0%, rgba(232,0,61,0.08) 100%)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        View Tournament <ArrowRight size={14} />
                    </button>
                </div>
            </ElectricCard>
        </motion.div>
    );
}