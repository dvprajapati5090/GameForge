/**
 * AccountCard — Riot Account card with Electric Border
 */
import { ShieldCheck, Gamepad2, Trophy, Star, RefreshCw, Zap } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useSyncRiot from '../../hooks/useSyncRiot';
import ElectricCard from '../ui/ElectricCard';

const F = '"Space Mono", monospace';

function InfoChip({ icon, label, value }) {
    return (
        <div style={{
            padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 13,
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(8px)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7, color: 'rgba(255,255,255,0.38)' }}>
                {icon}
                <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>{value}</div>
        </div>
    );
}

export default function AccountCard({ player }) {
    const syncMutation  = useSyncRiot();
    const loggedInUser  = useAuthStore(s => s.user);
    const isOwnProfile  = loggedInUser?.username === player?.username;
    const isVerified    = player?.riotVerified;

    return (
        <ElectricCard
            color={isVerified ? '#e8003d' : '#4a4a6a'}
            color2={isVerified ? '#ff5530' : '#6a4aff'}
            speed={isVerified ? 7 : 10}
            rounded={18}
            gap={1.5}
            glow={isVerified ? 0.28 : 0.12}
            style={{ fontFamily: F }}
        >
            <div style={{ padding: 26 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                    <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                        Riot Account
                    </h2>
                    {isVerified && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '4px 12px', borderRadius: 999,
                            background: 'rgba(34,197,94,0.12)',
                            border: '1px solid rgba(34,197,94,0.35)',
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                            <span style={{ fontSize: 9, color: '#22c55e', letterSpacing: '0.18em', fontWeight: 700 }}>VERIFIED</span>
                        </div>
                    )}
                </div>

                {isVerified ? (
                    <>
                        {/* Riot ID display */}
                        <div style={{
                            marginBottom: 20, padding: '16px 18px',
                            background: 'rgba(232,0,61,0.06)',
                            border: '1px solid rgba(232,0,61,0.2)',
                            borderRadius: 14,
                        }}>
                            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                                Riot ID
                            </p>
                            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                                {player.riotGameName}
                                <span style={{ color: 'rgba(232,0,61,0.8)' }}>#{player.riotTagLine}</span>
                            </h3>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                            <InfoChip icon={<Trophy size={12} />}  label="Current Rank" value={player.currentRank || 'UNRANKED'} />
                            <InfoChip icon={<Star size={12} />}    label="Peak Rank"    value={player.highestRank || 'N/A'} />
                            <InfoChip icon={<Gamepad2 size={12} />} label="Level"       value={player.accountLevel} />
                            <InfoChip icon={<Zap size={12} />}     label="Rank Rating"  value={`${player.rankRating ?? 0} RR`} />
                        </div>

                        {/* Sync button */}
                        {isOwnProfile && (
                            <button
                                onClick={() => syncMutation.mutate()}
                                disabled={syncMutation.isPending}
                                style={{
                                    width: '100%', padding: '11px 0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    background: syncMutation.isPending
                                        ? 'rgba(255,255,255,0.06)'
                                        : 'linear-gradient(135deg, rgba(232,0,61,0.18), rgba(232,0,61,0.08))',
                                    color: '#fff',
                                    border: '1px solid rgba(232,0,61,0.35)',
                                    borderRadius: 12, fontSize: 11, fontFamily: F,
                                    cursor: syncMutation.isPending ? 'not-allowed' : 'pointer',
                                    letterSpacing: '0.08em', fontWeight: 700,
                                    transition: 'all 0.25s ease',
                                    opacity: syncMutation.isPending ? 0.6 : 1,
                                }}
                                onMouseEnter={e => { if (!syncMutation.isPending) { e.currentTarget.style.background = 'linear-gradient(135deg, #e8003d, #b5002e)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(232,0,61,0.4)'; }}}
                                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(232,0,61,0.18), rgba(232,0,61,0.08))'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <RefreshCw size={13} style={{ animation: syncMutation.isPending ? 'spin 1s linear infinite' : 'none' }} />
                                {syncMutation.isPending ? 'SYNCING...' : 'SYNC RIOT PROFILE'}
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        {/* Unverified state */}
                        <div style={{
                            padding: '24px 20px', borderRadius: 14,
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            textAlign: 'center', marginBottom: 22,
                        }}>
                            <ShieldCheck size={32} color="rgba(255,255,255,0.15)" style={{ margin: '0 auto 14px' }} />
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8 }}>
                                Connect your Riot account to unlock stats, ranks and tournament verification.
                            </p>
                        </div>
                        <button style={{
                            width: '100%', padding: '12px 0',
                            background: 'linear-gradient(135deg, #e8003d, #b5002e)',
                            color: '#fff', border: 'none', borderRadius: 12,
                            fontSize: 12, fontFamily: F, cursor: 'pointer',
                            fontWeight: 700, letterSpacing: '0.08em',
                            boxShadow: '0 0 20px rgba(232,0,61,0.35)',
                        }}>
                            CONNECT RIOT ACCOUNT
                        </button>
                    </>
                )}
            </div>
        </ElectricCard>
    );
}