/**
 * TournamentHero — Red/Silver gaming glass theme
 */
import { Calendar, Trophy, Users, Gamepad2, Clock } from "lucide-react";
import StatusBadge from "../host/tournaments/StatusBadge";
import TournamentCountdown from "./TournamentCountdown";

const F = '"Space Mono", monospace';

function HeroCard({ icon, title, value }) {
    return (
        <div style={{
            borderRadius: 16, padding: '16px 18px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(192,192,192,0.12)',
            backdropFilter: 'blur(16px)',
            fontFamily: F,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(192,192,192,0.7)', marginBottom: 10 }}>
                {icon}
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{title}</span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {value}
            </h3>
        </div>
    );
}

export default function TournamentHero({ tournament }) {
    const registered = tournament.registeredTeams?.length || 0;

    return (
        <div className="tournament-hero-flex" style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 22, padding: '36px 40px',
            background: 'rgba(7,0,10,0.78)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(232,0,61,0.2)',
            borderTop: '2px solid #e8003d',
            fontFamily: F,
            boxShadow: '0 0 48px rgba(232,0,61,0.08), 0 20px 60px rgba(0,0,0,0.5)',
        }}>
            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.06) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
            }} />
            {/* Ambient glows */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(232,0,61,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Game + status */}
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                            <span style={{
                                padding: '5px 14px', borderRadius: 999,
                                background: 'rgba(232,0,61,0.15)',
                                border: '1px solid rgba(232,0,61,0.3)',
                                color: '#e8003d', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                            }}>
                                {tournament.game}
                            </span>
                            <StatusBadge status={tournament.status} />
                        </div>
                        {/* Title */}
                        <h1 style={{ fontSize: 'clamp(24px,4vw,46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
                            {tournament.name}
                        </h1>
                        <p style={{ fontSize: 12, color: 'rgba(192,192,192,0.55)', lineHeight: 1.7, maxWidth: 600 }}>
                            {tournament.description}
                        </p>
                    </div>

                    {/* Countdown + Prize */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20, flexShrink: 0 }}>
                        <TournamentCountdown
                            title={tournament.status === "REGISTRATION_OPEN" ? "Registration Ends In" : "Tournament Starts In"}
                            targetDate={tournament.status === "REGISTRATION_OPEN" ? tournament.registrationEnd : tournament.tournamentStart}
                        />
                        <div style={{
                            padding: '14px 22px', borderRadius: 16,
                            background: 'rgba(255,193,7,0.08)',
                            border: '1px solid rgba(255,193,7,0.2)',
                        }}>
                            <p style={{ fontSize: 9, color: 'rgba(192,192,192,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>Prize Pool</p>
                            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#ffc107', letterSpacing: '-0.02em' }}>
                                ₹{Number(tournament.prizePool || 0).toLocaleString('en-IN')}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginTop: 28 }}>
                    <HeroCard icon={<Users size={16} color="rgba(192,192,192,0.7)" />} title="Teams" value={`${registered}/${tournament.maxTeams}`} />
                    <HeroCard icon={<Gamepad2 size={16} color="rgba(192,192,192,0.7)" />} title="Mode" value={tournament.mode} />
                    <HeroCard icon={<Trophy size={16} color="rgba(192,192,192,0.7)" />} title="Format" value={tournament.format?.replaceAll("_", " ")} />
                    <HeroCard icon={<Calendar size={16} color="rgba(192,192,192,0.7)" />} title="Start Date" value={new Date(tournament.tournamentStart).toLocaleString()} />
                    <HeroCard icon={<Clock size={16} color="rgba(192,192,192,0.7)" />} title="Reg. Ends" value={new Date(tournament.registrationEnd).toLocaleString()} />
                    <HeroCard icon={<Users size={16} color="rgba(192,192,192,0.7)" />} title="Organizer" value={tournament.organizer?.displayName || tournament.organizer?.username} />
                </div>
            </div>
        </div>
    );
}