import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Shield, CheckCircle2 } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

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

const F = '"Space Mono", monospace';

export default function StepSecurityQuestion({ form, setForm, next, back }) {

    const [answer, setAnswer] = useState(form.securityAnswer || '');
    const [question, setQuestion] = useState(form.securityQuestion || SECURITY_QUESTIONS[0]);

    function handleContinue() {
        setForm(prev => ({
            ...prev,
            securityQuestion: question,
            securityAnswer: answer.trim(),
        }));
        next();
    }

    const canContinue = answer.trim().length >= 2;

    return (
        <GlassCard className="relative overflow-hidden p-8 md:p-10">
            {/* Glow decorations */}
            <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-black blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black text-white shadow-lg shadow-white/10"
                        >
                            <Shield size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-mono text-white">Security Question</h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Set a secret question to recover your account if you forget your password.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Info banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    style={{
                        padding: '14px 18px', borderRadius: 12,
                        background: 'rgba(124,58,237,0.08)',
                        border: '1px solid rgba(124,58,237,0.25)',
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        fontFamily: F,
                    }}
                >
                    <HelpCircle size={16} color="#a78bfa" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                        This question will only be used to verify your identity when resetting your password.
                        Your answer is <strong style={{ color: 'rgba(255,255,255,0.8)' }}>not case-sensitive</strong>.
                    </p>
                </motion.div>

                {/* Choose question */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-3"
                >
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                        Choose Your Security Question
                    </label>
                    <select
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        style={{
                            width: '100%', padding: '12px 16px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 12, color: '#fff', fontSize: 13,
                            fontFamily: F, outline: 'none', boxSizing: 'border-box',
                            cursor: 'pointer',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    >
                        {SECURITY_QUESTIONS.map(q => (
                            <option key={q} value={q} style={{ background: '#0d0d1a', color: '#fff' }}>
                                {q}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Selected question display */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                        padding: '14px 18px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        fontFamily: F,
                    }}
                >
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
                        Your question:
                    </p>
                    <p style={{ fontSize: 14, color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>{question}</p>
                </motion.div>

                {/* Answer */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-3"
                >
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                        Your Answer
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        style={{
                            width: '100%', padding: '12px 16px',
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid ${answer.trim().length >= 2 ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.15)'}`,
                            borderRadius: 12, color: '#fff', fontSize: 13,
                            fontFamily: F, outline: 'none', boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                        onBlur={e => e.target.style.borderColor = answer.trim().length >= 2 ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.15)'}
                    />
                    {answer.trim().length >= 2 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <CheckCircle2 size={13} color="#22c55e" />
                            <span style={{ fontSize: 11, color: '#22c55e', fontFamily: F }}>Answer set</span>
                        </div>
                    )}
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: F, marginTop: 2 }}>
                        Remember this answer exactly — you'll need it to reset your password.
                    </p>
                </motion.div>

                {/* Navigation buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center justify-between pt-4"
                >
                    <Button variant="secondary" onClick={back}
                        className="rounded-2xl border border-white/10 bg-white/5 px-8 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-black"
                    >
                        ← Back
                    </Button>
                    <Button
                        onClick={handleContinue}
                        disabled={!canContinue}
                        className="min-w-[180px]"
                    >
                        Continue →
                    </Button>
                </motion.div>
            </div>
        </GlassCard>
    );
}
