import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Crosshair, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../services/auth.service';

const F = '"Space Mono", monospace';

const VALORANT_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const passwordStrength = (() => {
        if (newPassword.length === 0) return null;
        if (newPassword.length < 8) return { label: 'Too short', color: '#ef4444', width: '25%' };
        if (newPassword.length < 12) return { label: 'Fair', color: '#f59e0b', width: '55%' };
        if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword))
            return { label: 'Strong', color: '#22c55e', width: '100%' };
        return { label: 'Good', color: '#3b82f6', width: '75%' };
    })();

    async function handleSubmit(e) {
        e.preventDefault();
        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await resetPassword({ token, newPassword });
            setSuccess(true);
            setTimeout(() => navigate('/login', { state: { success: 'Password reset successfully! Please log in.' } }), 3500);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Reset link is invalid or expired. Please request a new one.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: '#000', display: 'flex', fontFamily: F, overflow: 'hidden', position: 'relative' }}>
            {/* Left: Video panel */}
            <div className="hidden lg:block" style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden' }}>
                <video autoPlay muted loop playsInline src={VALORANT_VIDEO}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0) 60%, #000 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px' }} />
                <div style={{ position: 'absolute', bottom: 48, left: 48 }}>
                    <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>
                        GAMEFORGE // SECURITY
                    </p>
                    <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                        Secure<br />Your Account.
                    </h2>
                    <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 320 }}>
                        Choose a strong, unique password to protect your GameForge profile.
                    </p>
                </div>
            </div>

            {/* Right: Reset form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', position: 'relative', overflowY: 'auto' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
                    backgroundSize: '24px 24px' }} />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                    style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
                        <Crosshair size={22} color="#fff" />
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>GameForge</span>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                style={{
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: 'rgba(34,197,94,0.12)',
                                    border: '1px solid rgba(34,197,94,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 24px',
                                    boxShadow: '0 0 40px rgba(34,197,94,0.2)',
                                }}
                            >
                                <CheckCircle2 size={36} color="#22c55e" />
                            </motion.div>
                            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>
                                Password Reset!
                            </h1>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 8 }}>
                                Your password has been updated successfully.
                            </p>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
                                Redirecting to login...
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Icon + heading */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12,
                                    background: 'rgba(232,0,61,0.12)',
                                    border: '1px solid rgba(232,0,61,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <ShieldCheck size={18} color="#e8003d" />
                                </div>
                                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>
                                    Reset Password
                                </h1>
                            </div>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 40, letterSpacing: '0.05em' }}>
                                CHOOSE A NEW SECURE PASSWORD FOR YOUR ACCOUNT
                            </p>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {/* New Password */}
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>
                                        New Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showPw ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            placeholder="Min. 8 characters"
                                            required
                                            style={{
                                                width: '100%', padding: '12px 44px 12px 16px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 10, color: '#fff', fontSize: 14,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.5)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                        <button type="button" onClick={() => setShowPw(!showPw)}
                                            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}>
                                            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>

                                    {/* Password strength bar */}
                                    {passwordStrength && (
                                        <div style={{ marginTop: 8 }}>
                                            <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: passwordStrength.width }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ height: '100%', background: passwordStrength.color, borderRadius: 2 }}
                                                />
                                            </div>
                                            <p style={{ fontSize: 10, marginTop: 4, color: passwordStrength.color, letterSpacing: '0.08em' }}>
                                                {passwordStrength.label}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>
                                        Confirm Password
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter your password"
                                            required
                                            style={{
                                                width: '100%', padding: '12px 44px 12px 16px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: confirmPassword && confirmPassword !== newPassword
                                                    ? '1px solid rgba(255,80,80,0.6)'
                                                    : confirmPassword && confirmPassword === newPassword
                                                        ? '1px solid rgba(34,197,94,0.4)'
                                                        : '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 10, color: '#fff', fontSize: 14,
                                                fontFamily: F, outline: 'none', boxSizing: 'border-box',
                                            }}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}>
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {confirmPassword && confirmPassword !== newPassword && (
                                        <p style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,80,80,0.9)' }}>
                                            Passwords do not match
                                        </p>
                                    )}
                                    {confirmPassword && confirmPassword === newPassword && (
                                        <p style={{ marginTop: 6, fontSize: 11, color: 'rgba(34,197,94,0.9)' }}>
                                            ✓ Passwords match
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        width: '100%', padding: '13px 0', marginTop: 4,
                                        background: loading ? 'rgba(232,0,61,0.4)' : 'linear-gradient(135deg, #e8003d, #b5002e)',
                                        color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 10, fontSize: 13, fontWeight: 700,
                                        fontFamily: F, cursor: loading ? 'not-allowed' : 'pointer',
                                        letterSpacing: '0.08em',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        boxShadow: '0 0 20px rgba(232,0,61,0.25)',
                                    }}
                                    whileHover={!loading ? { scale: 1.02 } : {}}
                                    whileTap={!loading ? { scale: 0.98 } : {}}
                                >
                                    {loading ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> RESETTING...</> : 'RESET PASSWORD'}
                                </motion.button>
                            </form>

                            <p style={{ marginTop: 32, fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
                                Remembered your password?{' '}
                                <Link to="/login" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
                                    Sign in
                                </Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
