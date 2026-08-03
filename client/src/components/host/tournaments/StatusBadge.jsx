/**
 * StatusBadge — Gaming-themed tournament status indicator
 */
import { motion } from "framer-motion";
import { Zap, Clock, CheckCircle2, FileText, PlayCircle } from "lucide-react";

const STATUS_CONFIG = {
    DRAFT: {
        label: "Draft",
        color: "#C0C0C0",
        bg: "rgba(192,192,192,0.08)",
        border: "rgba(192,192,192,0.25)",
        icon: FileText,
        pulse: false,
    },
    REGISTRATION_OPEN: {
        label: "Open",
        color: "#22c55e",
        bg: "rgba(34,197,94,0.1)",
        border: "rgba(34,197,94,0.35)",
        icon: Clock,
        pulse: true,
    },
    REGISTRATION_CLOSED: {
        label: "Closed",
        color: "#ff9020",
        bg: "rgba(255,144,32,0.1)",
        border: "rgba(255,144,32,0.35)",
        icon: Clock,
        pulse: false,
    },
    ONGOING: {
        label: "Live",
        color: "#e8003d",
        bg: "rgba(232,0,61,0.12)",
        border: "rgba(232,0,61,0.45)",
        icon: Zap,
        pulse: true,
    },
    LIVE: {
        label: "Live",
        color: "#e8003d",
        bg: "rgba(232,0,61,0.12)",
        border: "rgba(232,0,61,0.45)",
        icon: Zap,
        pulse: true,
    },
    COMPLETED: {
        label: "Completed",
        color: "#7c3aed",
        bg: "rgba(124,58,237,0.1)",
        border: "rgba(124,58,237,0.35)",
        icon: CheckCircle2,
        pulse: false,
    },
    CANCELLED: {
        label: "Cancelled",
        color: "rgba(255,255,255,0.3)",
        bg: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.1)",
        icon: FileText,
        pulse: false,
    },
};

export default function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.DRAFT;
    const Icon = cfg.icon;

    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, position: "relative" }}>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 999,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                fontFamily: '"Space Mono", monospace',
                boxShadow: cfg.pulse ? `0 0 12px ${cfg.color}30` : "none",
            }}>
                {cfg.pulse ? (
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color, flexShrink: 0 }}
                    />
                ) : (
                    <Icon size={10} color={cfg.color} />
                )}
                <span style={{ fontSize: 9, fontWeight: 700, color: cfg.color, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {cfg.label}
                </span>
            </div>
        </div>
    );
}