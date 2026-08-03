/**
 * ProfileSettingsCard — Gaming glass inline styles (no Tailwind)
 */
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, Trophy, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SettingsSection from "./SettingsSection";

const F = '"Space Mono", monospace';

const STAT_TILES = [
    { Icon: User,        label: "Profile",      value: "Complete",      color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)'  },
    { Icon: ShieldCheck, label: "Riot Account", value: "Connected ✓",   color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)'   },
    { Icon: Trophy,      label: "Status",       value: "Active Player", color: '#ffc107', bg: 'rgba(255,193,7,0.12)',  border: 'rgba(255,193,7,0.3)'   },
];

export default function ProfileSettingsCard() {
    const navigate = useNavigate();

    return (
        <SettingsSection
            title="Profile"
            description="Manage your display name, bio, Riot account and gaming information."
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
                                <p style={{ fontSize: 12, fontWeight: 700, color: color }}>{value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <motion.button
                        whileHover={{ scale: 1.03, x: 3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/profile")}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', borderRadius: 12,
                            background: '#e8003d', border: 'none',
                            color: '#fff', fontSize: 11, fontWeight: 700,
                            fontFamily: F, cursor: 'pointer',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            boxShadow: '0 0 20px rgba(232,0,61,0.4)',
                        }}
                    >
                        Open Profile <ArrowRight size={13} />
                    </motion.button>
                </div>
            </div>
        </SettingsSection>
    );
}