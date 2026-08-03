/**
 * SettingsHeader — Gaming glass redesign (no Tailwind)
 */
import { Settings, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import FloatingParticles from "../ui/FloatingParticles";

const F = '"Space Mono", monospace';

export default function SettingsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: '2px solid #e8003d',
                background: 'rgba(7,0,10,0.72)',
                backdropFilter: 'blur(28px)',
                borderRadius: 24,
                padding: '32px 36px',
                fontFamily: F,
                boxShadow: '0 0 60px rgba(232,0,61,0.07), 0 24px 80px rgba(0,0,0,0.5)',
            }}
        >
            <FloatingParticles count={16} color="#e8003d" opacity={0.25} speed={0.5} />

            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.06) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
            }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {/* Icon */}
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                            background: 'linear-gradient(135deg, rgba(232,0,61,0.18), rgba(124,58,237,0.12))',
                            border: '1px solid rgba(232,0,61,0.35)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 24px rgba(232,0,61,0.2)',
                        }}
                    >
                        <Settings size={30} color="#e8003d" />
                    </motion.div>

                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: 9, color: 'rgba(232,0,61,0.7)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 6 }}
                        >
                            ACCOUNT PREFERENCES
                        </motion.p>
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1,
                            background: 'linear-gradient(90deg, #fff 0%, rgba(192,192,192,0.7) 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Settings</h1>
                        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(192,192,192,0.45)', letterSpacing: '0.04em' }}>
                            Manage your GameForge account and preferences.
                        </p>
                    </div>
                </div>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: 999,
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.3)',
                        boxShadow: '0 0 14px rgba(34,197,94,0.15)',
                    }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em' }}>ACCOUNT ACTIVE</span>
                </motion.div>
            </div>
        </motion.div>
    );
}