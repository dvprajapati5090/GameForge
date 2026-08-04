/**
 * TeamHero — Red/Silver gaming glass theme
 */
import { Shield, Crown, Users, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import FloatingParticles from "../ui/FloatingParticles";

const F = '"Space Mono", monospace';

function InfoChip({ icon, label, value }) {
    return (
        <div style={{
            minWidth: 140, padding: '14px 18px',
            border: '1px solid rgba(192,192,192,0.15)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            fontFamily: F,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(192,192,192,0.6)', marginBottom: 10 }}>
                {icon}
                <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>{label}</span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{value}</h3>
        </div>
    );
}

export default function TeamHero({ team }) {
    const createdDate = new Date(team.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(232,0,61,0.2)',
                borderTop: '2px solid #e8003d',
                borderRadius: 22,
                background: 'rgba(7,0,10,0.78)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                padding: '36px 40px',
                fontFamily: F,
                boxShadow: '0 0 48px rgba(232,0,61,0.08), 0 20px 60px rgba(0,0,0,0.5)',
            }}
        >
            {/* Floating particles */}
            <FloatingParticles count={14} color="#e8003d" opacity={0.25} speed={0.5} />

            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.07) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
            }} />

            {/* Corner accents */}
            <div style={{ position: 'absolute', left: 16, top: 16, width: 22, height: 22, borderLeft: '2px solid #e8003d', borderTop: '2px solid #e8003d', borderRadius: '4px 0 0 0', zIndex: 2 }} />
            <div style={{ position: 'absolute', right: 16, bottom: 16, width: 22, height: 22, borderRight: '2px solid rgba(192,192,192,0.2)', borderBottom: '2px solid rgba(192,192,192,0.2)', borderRadius: '0 0 4px 0', zIndex: 2 }} />

            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(232,0,61,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(192,192,192,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                gap: 32, flexWrap: 'wrap',
            }}>
                {/* Left: Logo + Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, minWidth: 0 }}>
                    {team.logo ? (
                        <img
                            src={team.logo}
                            alt={team.name}
                            style={{ width: 96, height: 96, borderRadius: 22, objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(232,0,61,0.3)', boxShadow: '0 0 24px rgba(232,0,61,0.2)' }}
                        />
                    ) : (
                        <div style={{
                            width: 96, height: 96, borderRadius: 22, flexShrink: 0,
                            background: 'linear-gradient(135deg, rgba(232,0,61,0.3) 0%, rgba(124,58,237,0.3) 100%)',
                            border: '2px solid rgba(232,0,61,0.4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 24px rgba(232,0,61,0.2)',
                        }}>
                            <Shield size={42} color="#e8003d" />
                        </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 8 }}>
                            Esports Team
                        </p>
                        <h1 style={{ fontSize: 'clamp(22px,4vw,40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
                            {team.name}
                        </h1>
                        <p style={{ fontSize: 12, color: 'rgba(192,192,192,0.5)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
                            {team.description || "No description added."}
                        </p>
                    </div>
                </div>

                {/* Right: chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    <InfoChip icon={<Crown size={14} color="rgba(192,192,192,0.6)" />} label="Captain" value={team.captain.displayName} />
                    <InfoChip icon={<Users size={14} color="rgba(192,192,192,0.6)" />} label="Members" value={`${team.members.length}/${team.maxMembers}`} />
                    <InfoChip icon={<CalendarDays size={14} color="rgba(192,192,192,0.6)" />} label="Created" value={createdDate} />
                </div>
            </div>
        </motion.div>
    );
}