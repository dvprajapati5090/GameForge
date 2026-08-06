/**
 * SecuritySettingsCard — Gaming glass inline styles (no Tailwind)
 * Includes: Change Password + Set/Update Security Question
 */
import { useState } from "react";
import { Shield, Lock, MonitorSmartphone, ArrowRight, HelpCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsSection from "./SettingsSection";
import ChangePasswordModal from "./ChangePasswordModal";
import { saveSecurityQuestion } from "../../services/auth.service";
import toast from "react-hot-toast";

const F = '"Space Mono", monospace';

const SECURITY_QUESTIONS = [
    "What was the name of your first pet?",
    "What city were you born in?",
    "What was your childhood nickname?",
    "What is the name of your favorite sports team?",
    "What was the make and model of your first car?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite movie?",
];

const STAT_TILES = [
    { Icon: Shield,            label: "Account",  value: "Protected",  color: '#22c55e', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)'   },
    { Icon: Lock,              label: "Password", value: "Up to Date", color: '#e8003d', bg: 'rgba(232,0,61,0.12)',   border: 'rgba(232,0,61,0.3)'    },
    { Icon: MonitorSmartphone, label: "Sessions", value: "1 Active",   color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)'  },
];

export default function SecuritySettingsCard() {
    const [changePassOpen, setChangePassOpen] = useState(false);
    const [sqOpen, setSqOpen] = useState(false);
    const [question, setQuestion] = useState(SECURITY_QUESTIONS[0]);
    const [answer, setAnswer] = useState('');
    const [saving, setSaving] = useState(false);

    async function handleSaveSecurityQuestion(e) {
        e.preventDefault();
        if (!answer.trim()) return;
        setSaving(true);
        try {
            await saveSecurityQuestion({ securityQuestion: question, securityAnswer: answer.trim() });
            toast.success('Security question saved!');
            setAnswer('');
            setSqOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to save security question');
        } finally {
            setSaving(false);
        }
    }

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

                    {/* Action buttons row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'flex-end' }}>
                        {/* Security Question button */}
                        <motion.button
                            whileHover={{ scale: 1.03, x: -3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSqOpen(prev => !prev)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '12px 24px', borderRadius: 12,
                                background: 'rgba(124,58,237,0.08)',
                                border: '1px solid rgba(124,58,237,0.35)',
                                color: '#a78bfa', fontSize: 11, fontWeight: 700,
                                fontFamily: F, cursor: 'pointer',
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; e.currentTarget.style.color = '#a78bfa'; }}
                        >
                            <HelpCircle size={13} /> Security Question
                        </motion.button>

                        {/* Change Password button */}
                        <motion.button
                            whileHover={{ scale: 1.03, x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setChangePassOpen(true)}
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

                    {/* Security Question inline form */}
                    <AnimatePresence>
                        {sqOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <form
                                    onSubmit={handleSaveSecurityQuestion}
                                    style={{
                                        padding: 24, borderRadius: 14,
                                        background: 'rgba(124,58,237,0.06)',
                                        border: '1px solid rgba(124,58,237,0.2)',
                                        display: 'flex', flexDirection: 'column', gap: 16,
                                        fontFamily: F,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                        <HelpCircle size={15} color="#a78bfa" />
                                        <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Set Security Question</p>
                                    </div>
                                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 4 }}>
                                        This question will be used to verify your identity when you forget your password.
                                    </p>

                                    {/* Question select */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                                            Choose a Question
                                        </label>
                                        <select
                                            value={question}
                                            onChange={e => setQuestion(e.target.value)}
                                            style={{
                                                width: '100%', padding: '11px 14px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(124,58,237,0.3)',
                                                borderRadius: 12, color: '#fff', fontSize: 12,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {SECURITY_QUESTIONS.map(q => (
                                                <option key={q} value={q} style={{ background: '#0d0d1a', color: '#fff' }}>{q}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Answer input */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                                            Your Answer
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={answer}
                                            onChange={e => setAnswer(e.target.value)}
                                            placeholder="Type your answer (not case-sensitive)..."
                                            style={{
                                                width: '100%', padding: '11px 14px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: 12, color: '#fff', fontSize: 12,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={() => { setSqOpen(false); setAnswer(''); }}
                                            style={{
                                                padding: '10px 20px', borderRadius: 12,
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'rgba(255,255,255,0.6)', fontSize: 11,
                                                fontFamily: F, cursor: 'pointer',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving || !answer.trim()}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                padding: '10px 22px', borderRadius: 12,
                                                background: saving || !answer.trim() ? 'rgba(124,58,237,0.3)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#fff', fontSize: 11, fontFamily: F,
                                                fontWeight: 700, letterSpacing: '0.06em',
                                                cursor: saving || !answer.trim() ? 'not-allowed' : 'pointer',
                                                boxShadow: '0 0 16px rgba(124,58,237,0.25)',
                                            }}
                                        >
                                            {saving
                                                ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</>
                                                : <><CheckCircle2 size={13} /> Save Question</>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </SettingsSection>

            <ChangePasswordModal open={changePassOpen} onClose={() => setChangePassOpen(false)} />
        </>
    );
}