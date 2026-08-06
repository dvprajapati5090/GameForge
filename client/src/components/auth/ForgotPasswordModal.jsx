import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSecurityQuestion, forgotPassword } from '../../services/auth.service';

const F = '"Space Mono", monospace';

/**
 * ForgotPasswordModal — 3-step flow:
 *   Step 1: Enter email → fetch security question
 *   Step 2: Answer security question → send reset email
 *   Step 3: Success screen
 */
export default function ForgotPasswordModal({ open, onClose }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    // Lock body scroll
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    // Reset when closed
    useEffect(() => {
        if (!open) {
            setStep(1);
            setEmail('');
            setQuestion('');
            setAnswer('');
        }
    }, [open]);

    async function handleFetchQuestion(e) {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        try {
            const res = await getSecurityQuestion(email.trim());
            if (!res.data?.found) {
                // For security: don't reveal if email exists; still advance
                toast.error('No account found with that email address.');
                return;
            }
            if (!res.data?.question) {
                // Account has no security question (registered before the feature) —
                // skip directly to sending the reset email
                await forgotPassword({ email: email.trim() });
                setStep(3);
                return;
            }
            setQuestion(res.data.question);
            setStep(2);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmitAnswer(e) {
        e.preventDefault();
        if (!answer.trim()) return;
        setLoading(true);
        try {
            await forgotPassword({ email: email.trim(), securityAnswer: answer.trim() });
            setStep(3);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Incorrect answer. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="fp-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 16,
                    fontFamily: F,
                }}
            >
                <motion.div
                    key="fp-panel"
                    initial={{ opacity: 0, scale: 0.9, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 32 }}
                    transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={e => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: 460,
                        background: 'rgba(8,2,14,0.98)',
                        backdropFilter: 'blur(28px)',
                        border: '1px solid rgba(232,0,61,0.22)',
                        borderTop: '3px solid #e8003d',
                        borderRadius: 22,
                        padding: 36,
                        boxShadow: '0 0 80px rgba(232,0,61,0.12), 0 32px 80px rgba(0,0,0,0.8)',
                        position: 'relative',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: 16, right: 16,
                            width: 34, height: 34, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                        }}
                    >
                        <X size={15} />
                    </button>

                    {/* Step indicator dots */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
                        {[1, 2, 3].map(s => (
                            <div key={s} style={{
                                height: 3, borderRadius: 2,
                                flex: step >= s ? 2 : 1,
                                background: step >= s ? '#e8003d' : 'rgba(255,255,255,0.1)',
                                transition: 'all 0.3s ease',
                            }} />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* ──── Step 1: Email ──── */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                                    background: 'rgba(232,0,61,0.12)',
                                    border: '1px solid rgba(232,0,61,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Mail size={22} color="#e8003d" />
                                </div>

                                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>
                                    // PASSWORD RECOVERY
                                </p>
                                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                                    Forgot Password?
                                </h2>
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 28, lineHeight: 1.7 }}>
                                    Enter your account email. We'll find your security question to verify it's really you.
                                </p>

                                <form onSubmit={handleFetchQuestion} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="agent@gameforge.gg"
                                            style={{
                                                width: '100%', padding: '11px 14px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: 12, color: '#fff', fontSize: 13,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.6)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || !email.trim()}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            padding: '12px 0', borderRadius: 12, width: '100%',
                                            background: loading || !email.trim() ? 'rgba(232,0,61,0.3)' : 'linear-gradient(135deg, #e8003d, #b5002e)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff', fontSize: 12, fontFamily: F,
                                            fontWeight: 700, letterSpacing: '0.08em',
                                            cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                                            boxShadow: '0 0 20px rgba(232,0,61,0.2)',
                                        }}
                                    >
                                        {loading ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Searching...</> : <>Find Account <ArrowRight size={14} /></>}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* ──── Step 2: Security Question ──── */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                                    background: 'rgba(124,58,237,0.12)',
                                    border: '1px solid rgba(124,58,237,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Shield size={22} color="#7c3aed" />
                                </div>

                                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>
                                    // IDENTITY VERIFICATION
                                </p>
                                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                                    Security Check
                                </h2>
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 24, lineHeight: 1.7 }}>
                                    Answer your security question to prove it's you.
                                </p>

                                {/* Security question box */}
                                <div style={{
                                    padding: '14px 18px', borderRadius: 12, marginBottom: 20,
                                    background: 'rgba(124,58,237,0.08)',
                                    border: '1px solid rgba(124,58,237,0.25)',
                                }}>
                                    <p style={{ fontSize: 10, color: 'rgba(124,58,237,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                                        Your Security Question:
                                    </p>
                                    <p style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>
                                        {question}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmitAnswer} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                                            Your Answer
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            autoFocus
                                            value={answer}
                                            onChange={e => setAnswer(e.target.value)}
                                            placeholder="Type your answer..."
                                            style={{
                                                width: '100%', padding: '11px 14px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                borderRadius: 12, color: '#fff', fontSize: 13,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                        />
                                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 6 }}>
                                            Answers are not case-sensitive
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            style={{
                                                padding: '11px 20px', borderRadius: 12,
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: F,
                                                cursor: 'pointer', letterSpacing: '0.06em',
                                            }}
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading || !answer.trim()}
                                            style={{
                                                flex: 1,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                                padding: '11px 0', borderRadius: 12,
                                                background: loading || !answer.trim() ? 'rgba(232,0,61,0.3)' : 'linear-gradient(135deg, #e8003d, #b5002e)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#fff', fontSize: 12, fontFamily: F,
                                                fontWeight: 700, letterSpacing: '0.08em',
                                                cursor: loading || !answer.trim() ? 'not-allowed' : 'pointer',
                                                boxShadow: '0 0 20px rgba(232,0,61,0.2)',
                                            }}
                                        >
                                            {loading ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</> : <>Send Reset Link <ArrowRight size={14} /></>}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* ──── Step 3: Success ──── */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ textAlign: 'center', padding: '8px 0' }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                    style={{
                                        width: 72, height: 72, borderRadius: '50%',
                                        background: 'rgba(34,197,94,0.12)',
                                        border: '1px solid rgba(34,197,94,0.4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 24px',
                                        boxShadow: '0 0 32px rgba(34,197,94,0.2)',
                                    }}
                                >
                                    <CheckCircle2 size={32} color="#22c55e" />
                                </motion.div>

                                <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>
                                    // EMAIL SENT
                                </p>
                                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
                                    Reset Link Sent!
                                </h2>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>
                                    Check your inbox at <span style={{ color: '#fff', fontWeight: 600 }}>{email}</span>.
                                    The reset link expires in <span style={{ color: '#e8003d', fontWeight: 700 }}>30 minutes</span>.
                                </p>

                                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} />

                                <button
                                    onClick={onClose}
                                    style={{
                                        width: '100%', padding: '12px 0', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#fff', fontSize: 12, fontFamily: F,
                                        fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer',
                                    }}
                                >
                                    Back to Login
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
