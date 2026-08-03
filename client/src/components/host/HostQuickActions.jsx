import { motion } from "framer-motion";
import { PlusCircle, ListChecks, GitBranch, Users, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SpecularButton from "../ui/SpecularButton";

const actions = [
    { title: "Create Tournament", desc: "Start a new event",   icon: PlusCircle,  path: "/host/create-tournament", accent: '#e8003d' },
    { title: "My Tournaments",    desc: "View all events",     icon: ListChecks,  path: "/host/tournaments",       accent: '#C0C0C0' },
    { title: "Generate Brackets", desc: "Set up match tree",   icon: GitBranch,   path: "/host/tournaments",       accent: '#e8003d' },
    { title: "Registered Teams",  desc: "View registrations",  icon: Users,       path: "/host/tournaments",       accent: '#C0C0C0' },
];

export default function HostQuickActions() {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: '2px solid #C0C0C0',
                background: 'rgba(7,0,10,0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                fontFamily: '"Space Mono", monospace',
                boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#C0C0C0', padding: '4px 12px', borderRadius: 999 }}>
                            <Zap size={11} color="#000" />
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Quick Access</span>
                        </div>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(192,192,192,0.4), transparent)' }} />
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Quick Actions</h2>
                    <p style={{ marginTop: 5, fontSize: 11, color: '#C0C0C0', opacity: 0.55, lineHeight: 1.6 }}>Jump to your most-used host tools instantly.</p>
                </div>

                {/* Red divider */}
                <div style={{ height: 1, background: 'linear-gradient(to right, rgba(232,0,61,0.5), transparent)', marginBottom: 14 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {actions.map((action, index) => {
                        const isRed = action.accent === '#e8003d';
                        const isHovered = hoveredIndex === index;
                        return (
                            <motion.button
                                key={action.title}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.05 * index }}
                                onClick={() => navigate(action.path)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    width: '100%',
                                    border: `1px solid ${isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.12)'}`,
                                    borderLeft: `3px solid ${action.accent}`,
                                    background: isHovered
                                        ? (isRed ? '#e8003d' : '#C0C0C0')
                                        : (isRed ? 'rgba(232,0,61,0.05)' : 'rgba(192,192,192,0.03)'),
                                    padding: '12px 14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    transform: isHovered ? 'translateX(6px)' : 'none',
                                    fontFamily: '"Space Mono", monospace', textAlign: 'left',
                                    borderRadius: 12,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        width: 36, height: 36,
                                        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.3)' : action.accent}`,
                                        background: isHovered ? 'rgba(255,255,255,0.15)' : (isRed ? 'rgba(232,0,61,0.18)' : 'rgba(192,192,192,0.08)'),
                                        color: isHovered ? '#fff' : action.accent,
                                        transition: 'all 0.15s ease', flexShrink: 0,
                                        borderRadius: 10,
                                    }}>
                                        <action.icon size={16} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>{action.title}</div>
                                        <div style={{ fontSize: 9, color: isHovered ? 'rgba(255,255,255,0.7)' : '#C0C0C0', marginTop: 2, letterSpacing: '0.08em', opacity: isHovered ? 1 : 0.6 }}>{action.desc}</div>
                                    </div>
                                </div>
                                <ArrowRight size={14} style={{
                                    color: isHovered ? '#fff' : 'rgba(192,192,192,0.4)',
                                    transition: 'all 0.15s ease',
                                    transform: isHovered ? 'translateX(4px)' : 'none',
                                    flexShrink: 0,
                                }} />
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}