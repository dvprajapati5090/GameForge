import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import NotificationPanel from "./NotificationPanel";
import { markAllNotificationsRead } from "../../services/notification.service";

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const { data, refetch } = useNotifications();
    const notifications = data?.data || [];
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsRead();
            await refetch();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            {/* Bell button */}
            <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                style={{
                    position: "relative",
                    width: 38, height: 38,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: open ? "rgba(232,0,61,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${open ? "rgba(232,0,61,0.45)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    color: open ? "#e8003d" : "#C0C0C0",
                    transition: "all 0.2s ease",
                    boxShadow: open ? "0 0 14px rgba(232,0,61,0.25)" : "none",
                }}
            >
                <motion.div
                    animate={unreadCount > 0
                        ? { rotate: [0, -14, 14, -10, 10, -6, 6, 0] }
                        : {}}
                    transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 4 }}
                >
                    <Bell size={18} />
                </motion.div>

                {/* Unread badge */}
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                            position: "absolute", top: -5, right: -5,
                            minWidth: 18, height: 18, borderRadius: 999,
                            background: "#e8003d",
                            border: "2px solid #07000a",
                            color: "#fff", fontSize: 9, fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "0 4px",
                            fontFamily: '"Space Mono", monospace',
                            boxShadow: "0 0 8px rgba(232,0,61,0.6)",
                        }}
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}

                {/* Outer pulse ring when unread */}
                {unreadCount > 0 && (
                    <motion.span
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            position: "absolute", top: -5, right: -5,
                            width: 18, height: 18, borderRadius: 999,
                            border: "1px solid #e8003d",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </motion.button>

            {/* Dropdown panel */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: "absolute", right: 0, top: "calc(100% + 10px)",
                        width: 380, maxWidth: "95vw",
                        background: "rgba(8,2,14,0.95)",
                        backdropFilter: "blur(32px)",
                        border: "1px solid rgba(232,0,61,0.2)",
                        borderRadius: 20,
                        boxShadow: "0 0 40px rgba(232,0,61,0.1), 0 24px 80px rgba(0,0,0,0.7)",
                        padding: "20px",
                        zIndex: 9999,
                        fontFamily: '"Space Mono", monospace',
                    }}
                >
                    {/* Neon top line */}
                    <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, #e8003d, transparent)" }} />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                        <div>
                            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Notifications</h2>
                            <p style={{ fontSize: 10, color: "rgba(192,192,192,0.5)", marginTop: 4, letterSpacing: "0.06em" }}>
                                {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up!"}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                style={{
                                    fontSize: 10, fontWeight: 700, color: "#e8003d",
                                    background: "rgba(232,0,61,0.1)", border: "1px solid rgba(232,0,61,0.3)",
                                    borderRadius: 999, padding: "5px 12px", cursor: "pointer",
                                    fontFamily: '"Space Mono", monospace', letterSpacing: "0.06em",
                                    transition: "all 0.18s ease",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,0,61,0.2)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,0,61,0.1)"; }}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div style={{ maxHeight: 420, overflowY: "auto", paddingRight: 4 }}>
                        <NotificationPanel notifications={notifications} />
                    </div>
                </motion.div>
            )}
        </div>
    );
}