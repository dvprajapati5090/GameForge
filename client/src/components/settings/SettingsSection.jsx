/**
 * SettingsSection — Gaming glass card wrapper for settings sections
 * Replaces GlowCard + Tailwind className approach
 */
import { motion } from "framer-motion";

const F = '"Space Mono", monospace';

export default function SettingsSection({ title, description, children, accent = '#e8003d' }) {
    const isRed = accent === '#e8003d';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
            style={{
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(192,192,192,0.12)',
                borderTop: `2px solid ${accent}`,
                background: 'rgba(7,0,10,0.65)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                padding: '32px',
                fontFamily: F,
                boxShadow: `0 0 32px ${accent}08, 0 16px 48px rgba(0,0,0,0.4)`,
            }}
        >
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(192,192,192,0.07) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{title}</h2>
                    {description && (
                        <p style={{ marginTop: 6, fontSize: 11, color: 'rgba(192,192,192,0.45)', lineHeight: 1.7, letterSpacing: '0.04em' }}>{description}</p>
                    )}
                    <div style={{ marginTop: 16, height: 1, background: `linear-gradient(to right, ${accent}55, transparent)` }} />
                </div>

                {children}
            </div>
        </motion.div>
    );
}