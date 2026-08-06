import useLeaveTeam from "../../hooks/useLeaveTeam";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const F = '"Space Mono", monospace';

export default function LeaveTeamModal({ open, onClose }) {
    const leaveMutation = useLeaveTeam();
    const navigate = useNavigate();

    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [open]);

    if (!open) return null;

    const handleLeave = () => {
        leaveMutation.mutate(undefined, {
            onSuccess: () => { onClose(); navigate("/team"); }
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                key="leave-backdrop"
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
                    key="leave-panel"
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%', maxWidth: 420,
                        background: 'rgba(8,2,14,0.97)',
                        backdropFilter: 'blur(28px)',
                        border: '1px solid rgba(232,0,61,0.22)',
                        borderTop: '2px solid #e8003d',
                        borderRadius: 22, padding: 32,
                        boxShadow: '0 0 60px rgba(232,0,61,0.12), 0 24px 80px rgba(0,0,0,0.7)',
                    }}
                >
                    {/* Warning icon */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: 'rgba(232,0,61,0.12)', border: '1px solid rgba(232,0,61,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8003d',
                        }}>
                            <AlertTriangle size={26} />
                        </div>
                    </div>

                    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '-0.02em', marginBottom: 12 }}>
                        Leave Team
                    </h2>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.7, marginBottom: 6 }}>
                        Are you sure you want to leave this team?
                    </p>
                    <p style={{ fontSize: 11, color: 'rgba(232,0,61,0.6)', textAlign: 'center', lineHeight: 1.7, marginBottom: 28 }}>
                        If you&apos;re the captain, transfer captaincy first.
                    </p>

                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1, padding: '11px 0', borderRadius: 12,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                color: 'rgba(255,255,255,0.6)', fontSize: 12,
                                fontFamily: F, cursor: 'pointer', letterSpacing: '0.06em',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLeave}
                            disabled={leaveMutation.isPending}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '11px 0', borderRadius: 12,
                                background: leaveMutation.isPending ? 'rgba(232,0,61,0.3)' : 'linear-gradient(135deg,#e8003d,#b5002e)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#fff', fontSize: 12, fontFamily: F,
                                cursor: leaveMutation.isPending ? 'not-allowed' : 'pointer',
                                fontWeight: 700, letterSpacing: '0.08em',
                                boxShadow: '0 0 20px rgba(232,0,61,0.25)',
                            }}
                        >
                            <LogOut size={14} />
                            {leaveMutation.isPending ? 'Leaving...' : 'Leave Team'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}