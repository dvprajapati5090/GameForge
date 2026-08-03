/**
 * SecuritySettingsCard — Gaming glass inline styles (no Tailwind)
 */
import { useState } from "react";
import { Shield, Lock, MonitorSmartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SettingsSection from "./SettingsSection";
import ChangePasswordModal from "./ChangePasswordModal";

const F = '"Space Mono", monospace';

const STAT_TILES = [
    { Icon: Shield,           label: "Account",  value: "Protected",   color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)'   },
    { Icon: Lock,             label: "Password", value: "Up to Date",   color: '#e8003d', bg: 'rgba(232,0,61,0.12)',   border: 'rgba(232,0,61,0.3)'    },
    { Icon: MonitorSmartphone,label: "Sessions", value: "1 Active",     color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)'  },
];

export default function SecuritySettingsCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsSection
                title="Security"
                description="Keep your GameForge account protected with strong authentication and password management."
                accent="#C0C0C0"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* Stat tiles row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                        {STAT_TILES.map(({ Icon, label, value, color, bg, border }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 * i }}
                                style={{
                                    padding: '16px', borderRadius: 14,
                                    border: `1px solid ${border}`,
                                    background: bg,
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    fontFamily: F,
                                }}
                            >
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                    background: `${color}18`, border: `1px solid ${color}40`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 0 10px ${color}20`,
                                }}>
                                    <Icon size={18} color={color} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 9, color: 'rgba(192,192,192,0.4)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                                    <p style={{ fontSize: 12, fontWeight: 700, color }}>{value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Action button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <motion.button
                            whileHover={{ scale: 1.03, x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setOpen(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '12px 24px', borderRadius: 12,
                                background: 'rgba(192,192,192,0.08)',
                                border: '1px solid rgba(192,192,192,0.35)',
                                color: '#C0C0C0', fontSize: 11, fontWeight: 700,
                                fontFamily: F, cursor: 'pointer',
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,0,61,0.5)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(192,192,192,0.35)'; e.currentTarget.style.color = '#C0C0C0'; }}
                        >
                            Change Password <ArrowRight size={13} />
                        </motion.button>
                    </div>
                </div>
            </SettingsSection>

            <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}