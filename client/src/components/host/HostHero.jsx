import { motion } from "framer-motion";
import { ShieldCheck, PlusCircle, ArrowRight, Crown, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import SpecularButton from "../ui/SpecularButton";
import FloatingParticles from "../ui/FloatingParticles";
import TypewriterText from "../ui/TypewriterText";

const HOST_PHRASES = [
    "Build The Ultimate Tournament.",
    "Manage. Broadcast. Dominate.",
    "Your Stage, Your Rules.",
    "The Arena Awaits.",
];

export default function HostHero() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: '2px solid #e8003d',
                background: 'rgba(7,0,10,0.72)',
                backdropFilter: 'blur(28px)',
                borderRadius: 24,
                fontFamily: '"Space Mono", monospace',
                boxShadow: '0 0 64px rgba(232,0,61,0.12), 0 24px 80px rgba(0,0,0,0.6)',
            }}
        >
            {/* Floating particles */}
            <FloatingParticles count={24} color="#e8003d" opacity={0.5} speed={0.65} />
            <FloatingParticles count={10} color="#ff6030" opacity={0.2} speed={0.35} />

            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }} />

            {/* Ambient glows */}
            <div style={{ position: 'absolute', top: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(232,0,61,0.1)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: -30, right: 100, width: 180, height: 180, borderRadius: '50%', background: 'rgba(232,0,61,0.05)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Corner accents */}
            <div style={{ position: 'absolute', left: 14, top: 14, width: 20, height: 20, borderLeft: '2px solid #e8003d', borderTop: '2px solid #e8003d', borderRadius: '4px 0 0 0', zIndex: 2 }} />
            <div style={{ position: 'absolute', right: 14, bottom: 14, width: 20, height: 20, borderRight: '2px solid rgba(192,192,192,0.4)', borderBottom: '2px solid rgba(192,192,192,0.4)', borderRadius: '0 0 4px 0', zIndex: 2 }} />

            <div style={{ position: 'relative', zIndex: 2, padding: '48px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left */}
                <div style={{ flex: '1 1 340px' }}>
                    {/* HOST CONTROL badge */}
                    <motion.div
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,0,61,0.15)', border: '1px solid rgba(232,0,61,0.4)', padding: '5px 14px', marginBottom: 20, borderRadius: 999, boxShadow: '0 0 16px rgba(232,0,61,0.25)' }}
                        animate={{ boxShadow: ['0 0 16px rgba(232,0,61,0.2)', '0 0 28px rgba(232,0,61,0.45)', '0 0 16px rgba(232,0,61,0.2)'] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                            <ShieldCheck size={11} color="#e8003d" />
                        </motion.div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#e8003d', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                            Host Control Center
                        </span>
                    </motion.div>

                    <h1 style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 8 }}>
                        Welcome back,
                    </h1>

                    {/* Animated gradient username */}
                    <motion.h1
                        style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 10 }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                        <span style={{
                            background: 'linear-gradient(90deg, #e8003d 0%, #ff8060 40%, #ff3060 70%, #e8003d 100%)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            @{user?.username || user?.displayName || 'Host'}.
                        </span>
                    </motion.h1>

                    {/* Typewriter */}
                    <div style={{ fontSize: 13, color: 'rgba(192,192,192,0.65)', marginBottom: 20, minHeight: 20 }}>
                        <TypewriterText texts={HOST_PHRASES} speed={55} pauseMs={2000} deleteMs={28} cursorColor="#e8003d" />
                    </div>

                    <p style={{ fontSize: 11, color: 'rgba(192,192,192,0.45)', lineHeight: 1.9, maxWidth: 420, marginBottom: 32 }}>
                        Create premium esports tournaments, manage registrations, generate brackets, monitor live matches, and oversee every event from one powerful dashboard.
                    </p>

                    <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.3), transparent)', marginBottom: 28 }} />

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <SpecularButton variant="red" size="md" onClick={() => navigate("/host/create-tournament")} icon={<PlusCircle size={13} />}>
                            Create Tournament
                        </SpecularButton>
                        <SpecularButton variant="silver" size="md" onClick={() => navigate("/host/tournaments")} icon={<ArrowRight size={13} />}>
                            My Tournaments
                        </SpecularButton>
                    </div>
                </div>

                {/* Right — stats panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '0 0 252px' }}>
                    {[
                        { label: 'Tournaments Hosted', value: '12', accent: '#e8003d', icon: Crown },
                        { label: 'Teams Registered',   value: '47', accent: '#7c3aed', icon: ShieldCheck },
                        { label: 'Live Right Now',      value: '3',  accent: '#ff6030', icon: Flame },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 + i * 0.1 }}
                            whileHover={{ x: -4, transition: { duration: 0.2 } }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '14px 18px', borderRadius: 16,
                                border: `1px solid ${stat.accent}33`,
                                borderLeft: `3px solid ${stat.accent}`,
                                background: `${stat.accent}0d`,
                                backdropFilter: 'blur(12px)',
                                cursor: 'default',
                                boxShadow: `0 0 18px ${stat.accent}0f`,
                            }}
                        >
                            <div style={{
                                width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `${stat.accent}20`,
                                border: `1px solid ${stat.accent}55`,
                                color: stat.accent,
                                boxShadow: `0 0 10px ${stat.accent}30`,
                            }}>
                                <stat.icon size={16} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>{stat.value}</p>
                                <p style={{ fontSize: 9, color: 'rgba(192,192,192,0.55)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</p>
                            </div>
                            <motion.div
                                animate={{ opacity: [1, 0.45, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                                style={{
                                    fontSize: 8, fontWeight: 700, letterSpacing: '0.14em',
                                    borderRadius: 999,
                                    background: stat.accent,
                                    color: '#fff', padding: '3px 9px', flexShrink: 0,
                                    boxShadow: `0 0 8px ${stat.accent}80`,
                                }}
                            >
                                LIVE
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}