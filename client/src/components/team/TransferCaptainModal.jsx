import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, X } from "lucide-react";
import useTransferCaptain from "../../hooks/useTransferCaptain";

const F = '"Space Mono", monospace';

export default function TransferCaptainModal({ open, onClose, team }) {
    const [memberId, setMemberId] = useState("");
    const transferMutation = useTransferCaptain();

    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    if (!open) return null;

    const members = team.members.filter(member => member._id !== team.captain._id);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!memberId) return;
        transferMutation.mutate(memberId, { onSuccess: () => onClose() });
    };

    return (
        <AnimatePresence>
            <motion.div
                key="transfer-backdrop"
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
                    padding: 16, fontFamily: F,
                }}
            >
                <motion.div
                    key="transfer-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: 480,
                        background: 'rgba(8,2,14,0.97)',
                        backdropFilter: 'blur(28px)',
                        border: '1px solid rgba(255,193,7,0.22)',
                        borderTop: '2px solid #ffc107',
                        borderRadius: 22, padding: 32,
                        boxShadow: '0 0 60px rgba(255,193,7,0.08), 0 24px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 11,
                                background: 'rgba(255,193,7,0.12)', border: '1px solid rgba(255,193,7,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffc107',
                            }}>
                                <Crown size={17} />
                            </div>
                            <div>
                                <p style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 3 }}>
                                    // LEADERSHIP
                                </p>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                                    Transfer Captaincy
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
                    <div style={{ height: 1, background: 'linear-gradient(to right, #ffc107, rgba(192,192,192,0.2), transparent)', marginBottom: 22 }} />
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 20, lineHeight: 1.7 }}>
                        Select the new captain for your team.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {members.map((member) => (
                            <label
                                key={member._id}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '12px 16px', borderRadius: 14,
                                    border: `1px solid ${memberId === member._id ? 'rgba(255,193,7,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                    background: memberId === member._id ? 'rgba(255,193,7,0.08)' : 'rgba(255,255,255,0.02)',
                                    cursor: 'pointer', transition: 'all 0.18s ease',
                                }}
                            >
                                <input
                                    type="radio"
                                    value={member._id}
                                    checked={memberId === member._id}
                                    onChange={(e) => setMemberId(e.target.value)}
                                    style={{ accentColor: '#ffc107' }}
                                />
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{member.displayName}</p>
                                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>@{member.username}</p>
                                </div>
                            </label>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8 }}>
                            <button
                                type="button"
                                onClick={onClose}
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
                                disabled={!memberId || transferMutation.isPending}
                                style={{
                                    padding: '10px 24px', borderRadius: 12,
                                    background: !memberId ? 'rgba(255,193,7,0.2)' : 'linear-gradient(135deg, #ffc107, #e0a800)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: !memberId ? 'rgba(255,255,255,0.4)' : '#000',
                                    fontSize: 11, fontFamily: F,
                                    cursor: !memberId ? 'not-allowed' : 'pointer',
                                    fontWeight: 700, letterSpacing: '0.08em',
                                    opacity: !memberId ? 0.5 : 1,
                                }}
                            >
                                {transferMutation.isPending ? 'Transferring...' : 'Transfer'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}