/**
 * FeaturedTournament — Red/silver gaming glass theme
 */
import { Link } from "react-router-dom";
import { Trophy, Calendar, Users, ArrowRight, Zap } from "lucide-react";

const F = '"Space Mono", monospace';

export default function FeaturedTournament({ tournament }) {
    if (!tournament) return null;

    return (
        <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 22, height: 340,
            border: '1px solid rgba(232,0,61,0.2)',
            borderTop: '2px solid #e8003d',
            fontFamily: F,
            boxShadow: '0 0 48px rgba(232,0,61,0.1), 0 20px 60px rgba(0,0,0,0.5)',
        }}>
            {/* Banner image or gradient placeholder */}
            {tournament.banner ? (
                <img
                    src={tournament.banner}
                    alt={tournament.name}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(232,0,61,0.18) 0%, rgba(124,58,237,0.12) 50%, rgba(8,2,12,0.9) 100%)',
                }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'linear-gradient(rgba(232,0,61,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,61,0.08) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }} />
                </div>
            )}

            {/* Dark scrim — stronger on left for text readability */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(7,0,10,0.92) 0%, rgba(7,0,10,0.65) 55%, rgba(7,0,10,0.25) 100%)',
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 10, padding: '36px 44px', maxWidth: 560, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {/* Featured badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,193,7,0.15)',
                    border: '1px solid rgba(255,193,7,0.35)',
                    padding: '5px 14px', borderRadius: 999, marginBottom: 16,
                    alignSelf: 'flex-start',
                }}>
                    <Zap size={11} color="#ffc107" fill="#ffc107" />
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#ffc107', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        Featured Tournament
                    </span>
                </div>

                {/* Name */}
                <h2 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>
                    {tournament.name}
                </h2>

                {/* Description */}
                {tournament.description && (
                    <p style={{ fontSize: 12, color: 'rgba(192,192,192,0.55)', lineHeight: 1.7, marginBottom: 18,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {tournament.description}
                    </p>
                )}

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 22, marginBottom: 24, flexWrap: 'wrap' }}>
                    {[
                        { icon: <Trophy size={14} color="#ffc107" />, label: `₹ ${Number(tournament.prizePool || 0).toLocaleString('en-IN')}` },
                        { icon: <Users size={14} color="rgba(192,192,192,0.7)" />, label: `${tournament.registrationCount ?? 0} / ${tournament.maxTeams}` },
                        { icon: <Calendar size={14} color="rgba(192,192,192,0.7)" />, label: new Date(tournament.tournamentStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}>
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    to={`/tournaments/${tournament._id}`}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                        padding: '11px 24px', borderRadius: 14,
                        background: 'linear-gradient(135deg, #e8003d, #b5002e)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        color: '#fff', fontSize: 11, fontFamily: F,
                        fontWeight: 700, letterSpacing: '0.06em',
                        textDecoration: 'none',
                        boxShadow: '0 0 24px rgba(232,0,61,0.35)',
                        transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    View Tournament <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}