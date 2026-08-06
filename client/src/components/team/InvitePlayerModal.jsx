import { useState, useEffect } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useInvitePlayer from "../../hooks/useInvitePlayer";

const F = '"Space Mono", monospace';

export default function InvitePlayerModal({ open, onClose }) {
    const [username, setUsername] = useState("");
    const inviteMutation = useInvitePlayer();

    // Lock body scroll when open — prevents page jumping to top
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        inviteMutation.mutate(username.trim(), {
            onSuccess: () => { setUsername(""); onClose(); }
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                key="invite-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 500,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 16,
                    fontFamily: F,
                }}
            >
                <motion.div
                    key="invite-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: 440,
                        background: 'rgba(8,2,14,0.97)',
                        backdropFilter: 'blur(28px)',
                        border: '1px solid rgba(232,0,61,0.22)',
                        borderTop: '2px solid #e8003d',
                        borderRadius: 22,
                        padding: 32,
                        boxShadow: '0 0 60px rgba(232,0,61,0.12), 0 24px 80px rgba(0,0,0,0.7)',
                        position: 'relative',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 11,
                                background: 'rgba(232,0,61,0.15)', border: '1px solid rgba(232,0,61,0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8003d',
                            }}>
                                <UserPlus size={17} />
                            </div>
                            <div>
                                <p style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 3 }}>
                                    // RECRUIT
                                </p>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                                    Invite Player
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: 34, height: 34, borderRadius: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                            }}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'linear-gradient(to right, #e8003d, rgba(192,192,192,0.2), transparent)', marginBottom: 22 }} />

                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 22, lineHeight: 1.7 }}>
                        Invite a teammate by their GameForge username.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username..."
                                maxLength={20}
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
                            <p style={{ marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>
                                {username.length}/20
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button
                                type="button"
                                onClick={() => { setUsername(""); onClose(); }}
                                style={{
                                    padding: '10px 20px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(255,255,255,0.6)', fontSize: 11,
                                    fontFamily: F, cursor: 'pointer', letterSpacing: '0.06em',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={inviteMutation.isPending || !username.trim()}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 24px', borderRadius: 12,
                                    background: inviteMutation.isPending || !username.trim()
                                        ? 'rgba(232,0,61,0.3)'
                                        : 'linear-gradient(135deg, #e8003d, #b5002e)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff', fontSize: 11, fontFamily: F,
                                    cursor: inviteMutation.isPending || !username.trim() ? 'not-allowed' : 'pointer',
                                    fontWeight: 700, letterSpacing: '0.08em',
                                    boxShadow: '0 0 20px rgba(232,0,61,0.25)',
                                    opacity: !username.trim() ? 0.5 : 1,
                                }}
                            >
                                {inviteMutation.isPending ? (
                                    <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Inviting...</>
                                ) : 'Invite Player'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}