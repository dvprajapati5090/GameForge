import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert, X, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useDeleteAccount from "../../hooks/useDeleteAccount";

const F = '"Space Mono", monospace';

export default function DeleteAccountModal({ open, onClose }) {
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [showPwd, setShowPwd] = useState(false);

    const deleteMutation = useDeleteAccount();
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const isGoogleOnly =
        user?.authProviders?.includes("GOOGLE") &&
        !user?.authProviders?.includes("LOCAL");

    if (!open) return null;

    function handleDelete() {
        if (!isGoogleOnly && !password.trim()) { toast.error("Password is required."); return; }
        if (confirmation !== "DELETE") { toast.error('Type "DELETE" to confirm.'); return; }

        deleteMutation.mutate(
            { password: isGoogleOnly ? undefined : password },
            {
                onSuccess: () => {
                    logout();
                    onClose();
                    navigate("/login", { replace: true, state: { success: "Account deleted successfully." } });
                },
                onError: (error) => {
                    toast.error(error.response?.data?.message || "Failed to delete account.");
                }
            }
        );
    }

    const inputStyle = {
        width: '100%', padding: '11px 14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, color: '#fff', fontSize: 12, fontFamily: F,
        outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
    };
    const labelStyle = {
        display: 'block', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)', marginBottom: 8,
    };

    return (
        <AnimatePresence>
            <motion.div
                key="da-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 400,
                    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
                }}
            >
                <motion.div
                    key="da-panel"
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
                        border: '1px solid rgba(232,0,61,0.35)', borderTop: '2px solid #e8003d',
                        borderRadius: 22, padding: 32, fontFamily: F,
                        boxShadow: '0 0 60px rgba(232,0,61,0.15), 0 24px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: 'rgba(232,0,61,0.15)',
                                border: '1px solid rgba(232,0,61,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <TriangleAlert size={22} color="#e8003d" />
                            </div>
                            <div>
                                <p style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(232,0,61,0.7)', textTransform: 'uppercase', marginBottom: 5, fontWeight: 700 }}>
                                    // DANGER ZONE
                                </p>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                                    Delete Account
                                </h2>
                            </div>
                        </div>
                        <button onClick={onClose} style={{
                            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                        }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.2), transparent)', marginBottom: 20 }} />

                    {/* Warning box */}
                    <div style={{
                        padding: '16px 18px', borderRadius: 14, marginBottom: 20,
                        background: 'rgba(232,0,61,0.07)',
                        border: '1px solid rgba(232,0,61,0.2)',
                    }}>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 12, lineHeight: 1.6 }}>
                            Deleting your account will permanently remove:
                        </p>
                        <ul style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 2, listStyle: 'none', padding: 0 }}>
                            {['Your profile', 'Your team & memberships', 'Tournament registrations', 'Match history', 'All GameForge data'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: '#e8003d', fontSize: 10 }}>▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Google-only notice */}
                    {isGoogleOnly && (
                        <div style={{
                            padding: '12px 16px', borderRadius: 12, marginBottom: 16,
                            background: 'rgba(59,130,246,0.08)',
                            border: '1px solid rgba(59,130,246,0.2)',
                            fontSize: 12, color: 'rgba(147,197,253,0.8)',
                        }}>
                            This account uses Google Sign-In. No password required to delete.
                        </div>
                    )}

                    {/* Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                        {!isGoogleOnly && (
                            <div>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={13} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ ...inputStyle, paddingLeft: 40, paddingRight: 42 }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.6)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                    />
                                    <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: 4 }}>
                                        {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div>
                            <label style={labelStyle}>Type "DELETE" to confirm</label>
                            <input
                                value={confirmation}
                                onChange={(e) => setConfirmation(e.target.value)}
                                style={inputStyle}
                                placeholder="DELETE"
                                onFocus={e => e.target.style.borderColor = 'rgba(232,0,61,0.6)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <button onClick={onClose} style={{
                            padding: '10px 22px', borderRadius: 12,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: F,
                            cursor: 'pointer', letterSpacing: '0.06em',
                        }}>Cancel</button>
                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending || confirmation !== "DELETE"}
                            style={{
                                padding: '10px 28px', borderRadius: 12,
                                background: (deleteMutation.isPending || confirmation !== "DELETE")
                                    ? 'rgba(232,0,61,0.3)'
                                    : 'linear-gradient(135deg, #e8003d, #8b0000)',
                                border: '1px solid rgba(232,0,61,0.5)',
                                color: '#fff', fontSize: 11, fontFamily: F,
                                cursor: (deleteMutation.isPending || confirmation !== "DELETE") ? 'not-allowed' : 'pointer',
                                fontWeight: 700, letterSpacing: '0.08em',
                                opacity: (deleteMutation.isPending || confirmation !== "DELETE") ? 0.6 : 1,
                                boxShadow: confirmation === "DELETE" ? '0 0 20px rgba(232,0,61,0.35)' : 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
