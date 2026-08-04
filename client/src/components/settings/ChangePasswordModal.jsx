import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useChangePassword from "../../hooks/useChangePassword";
import useAuthStore from "../../store/authStore";

const F = '"Space Mono", monospace';

function PasswordInput({ label, value, onChange }) {
    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label style={{
                display: 'block', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)', marginBottom: 8,
            }}>
                {label}
            </label>
            <div style={{ position: 'relative' }}>
                <Lock size={13} style={{
                    position: 'absolute', left: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    color: focused ? '#e8003d' : 'rgba(255,255,255,0.25)',
                    transition: 'color 0.2s', pointerEvents: 'none',
                }} />
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    onFocus={e => { setFocused(true); e.target.style.borderColor = 'rgba(232,0,61,0.6)'; }}
                    onBlur={e => { setFocused(false); e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                    style={{
                        width: '100%', padding: '11px 42px 11px 40px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 12, color: '#fff', fontSize: 12,
                        fontFamily: F, outline: 'none', transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    style={{
                        position: 'absolute', right: 12, top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none', border: 'none',
                        color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: 4,
                    }}
                >
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
            </div>
        </div>
    );
}

export default function ChangePasswordModal({ open, onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePasswordMutation = useChangePassword();
    const user = useAuthStore((state) => state.user);

    const isGoogleOnly =
        user?.authProviders?.includes("GOOGLE") &&
        !user?.authProviders?.includes("LOCAL");

    if (!open) return null;

    // Google-only users
    if (isGoogleOnly) {
        return (
            <AnimatePresence>
                <motion.div
                    key="cp-google-backdrop"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 400,
                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
                    }}
                >
                    <motion.div
                        key="cp-google-panel"
                        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            zIndex: 401, width: '100%', maxWidth: 480,
                            background: 'rgba(8,2,14,0.95)',
                            backdropFilter: 'blur(28px)',
                            border: '1px solid rgba(232,0,61,0.2)', borderTop: '2px solid #e8003d',
                            borderRadius: 22, padding: 32, fontFamily: F,
                        }}
                    >
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                            Password Managed by Google
                        </h2>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                            This GameForge account uses Google Sign-In.<br />
                            Password changes must be made from your Google Account.
                        </p>
                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={onClose} style={{
                                padding: '10px 24px', borderRadius: 12,
                                background: 'linear-gradient(135deg, #e8003d, #b5002e)',
                                border: 'none', color: '#fff', fontSize: 11,
                                fontFamily: F, fontWeight: 700, cursor: 'pointer',
                            }}>Close</button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    function handleSubmit() {
        if (!currentPassword.trim()) { toast.error("Current password is required."); return; }
        if (!newPassword.trim()) { toast.error("New password is required."); return; }
        if (newPassword.length < 8) { toast.error("Password must be at least 8 characters."); return; }
        if (!/[A-Z]/.test(newPassword)) { toast.error("Password must contain an uppercase letter."); return; }
        if (!/[a-z]/.test(newPassword)) { toast.error("Password must contain a lowercase letter."); return; }
        if (!/\d/.test(newPassword)) { toast.error("Password must contain a number."); return; }
        if (!confirmPassword.trim()) { toast.error("Please confirm your password."); return; }
        if (newPassword !== confirmPassword) { toast.error("Passwords do not match."); return; }
        if (currentPassword === newPassword) { toast.error("New password cannot be same as current."); return; }

        changePasswordMutation.mutate(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    toast.success("Password updated successfully.");
                    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
                    onClose();
                },
                onError: (error) => {
                    toast.error(error.response?.data?.message || "Failed to update password.");
                }
            }
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                key="cp-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 400,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
                }}
            >
                <motion.div
                    key="cp-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 32 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        zIndex: 401, width: '100%', maxWidth: 480,
                        maxHeight: '90vh', overflowY: 'auto',
                        background: 'rgba(8,2,14,0.95)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        border: '1px solid rgba(232,0,61,0.2)', borderTop: '2px solid #e8003d',
                        borderRadius: 22, padding: 32, fontFamily: F,
                        boxShadow: '0 0 60px rgba(232,0,61,0.12), 0 24px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div>
                            <p style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>
                                // SECURITY
                            </p>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                                Change Password
                            </h2>
                        </div>
                        <button onClick={onClose} style={{
                            width: 36, height: 36, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                        }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.2), transparent)', marginBottom: 24 }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <PasswordInput label="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        <PasswordInput label="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <PasswordInput label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button onClick={onClose} style={{
                                padding: '10px 22px', borderRadius: 12,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: F,
                                cursor: 'pointer', letterSpacing: '0.06em',
                            }}>Cancel</button>
                            <button
                                onClick={handleSubmit}
                                disabled={changePasswordMutation.isPending}
                                style={{
                                    padding: '10px 28px', borderRadius: 12,
                                    background: 'linear-gradient(135deg, #e8003d, #b5002e)',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    color: '#fff', fontSize: 11, fontFamily: F,
                                    cursor: changePasswordMutation.isPending ? 'not-allowed' : 'pointer',
                                    fontWeight: 700, letterSpacing: '0.08em',
                                    boxShadow: '0 0 20px rgba(232,0,61,0.3)',
                                    opacity: changePasswordMutation.isPending ? 0.7 : 1,
                                }}
                            >
                                {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}