/**
 * AccountSettingsCard — Gaming glass inline styles (no Tailwind)
 */
import { useState } from "react";
import { ShieldAlert, Database, AlertTriangle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import SettingsSection from "./SettingsSection";
import DeleteAccountModal from "./DeleteAccountModal";

const F = '"Space Mono", monospace';

const STAT_TILES = [
    { Icon: ShieldAlert,   label: "Account",  value: "Active",           color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)'  },
    { Icon: Database,      label: "Data",     value: "Stored Securely",  color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)'  },
    { Icon: AlertTriangle, label: "Warning",  value: "Permanent Action", color: '#e8003d', bg: 'rgba(232,0,61,0.1)',     border: 'rgba(232,0,61,0.3)'    },
];

export default function AccountSettingsCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsSection
                title="Account"
                description="Manage your account lifecycle. Deleting your account is permanent and cannot be undone."
                accent="#e8003d"
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

                    {/* Danger zone warning */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        style={{
                            padding: '16px 20px', borderRadius: 12,
                            background: 'rgba(232,0,61,0.06)',
                            border: '1px dashed rgba(232,0,61,0.3)',
                            display: 'flex', alignItems: 'center', gap: 12,
                            fontFamily: F,
                        }}
                    >
                        <AlertTriangle size={16} color="#e8003d" />
                        <p style={{ fontSize: 11, color: 'rgba(232,0,61,0.7)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                            Danger Zone — This action permanently deletes all your data, tournaments, and team memberships.
                        </p>
                    </motion.div>

                    {/* Delete button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setOpen(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '12px 24px', borderRadius: 12,
                                background: 'rgba(232,0,61,0.12)',
                                border: '1px solid rgba(232,0,61,0.5)',
                                color: '#e8003d', fontSize: 11, fontWeight: 700,
                                fontFamily: F, cursor: 'pointer',
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                transition: 'all 0.15s ease',
                                boxShadow: '0 0 16px rgba(232,0,61,0.15)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#e8003d'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 24px rgba(232,0,61,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,0,61,0.12)'; e.currentTarget.style.color = '#e8003d'; e.currentTarget.style.boxShadow = '0 0 16px rgba(232,0,61,0.15)'; }}
                        >
                            <Trash2 size={14} /> Delete Account
                        </motion.button>
                    </div>
                </div>
            </SettingsSection>

            <DeleteAccountModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}