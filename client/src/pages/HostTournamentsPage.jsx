/**
 * HostTournamentsPage — Gaming glass theme × Electric card design
 */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Trophy, Zap } from "lucide-react";

import useHostTournaments from "../hooks/useHostTournaments";
import HostTournamentCard from "../components/host/tournaments/HostTournamentCard";
import EmptyTournament from "../components/tournaments/EmptyTournament";

const F = '"Space Mono", monospace';

export default function HostTournamentsPage() {
    const { data, isLoading } = useHostTournaments();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 16, fontFamily: F }}>
                <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: "2px solid rgba(232,0,61,0.2)",
                    borderTop: "2px solid #e8003d",
                    animation: "spin 1s linear infinite",
                }} />
                <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
                    Loading Tournaments...
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const tournaments = data?.data?.tournaments || [];

    if (!tournaments.length) {
        return <EmptyTournament />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: F, paddingBottom: 48 }}
        >
            {/* ── Header ── */}
            <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>
                    // TOURNAMENT MANAGEMENT
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <div>
                        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                            My Tournaments
                        </h1>
                        <p style={{ marginTop: 10, fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
                            {tournaments.length} event{tournaments.length !== 1 ? "s" : ""} hosted
                        </p>
                    </div>

                    {/* Create button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/host/create-tournament")}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "12px 22px",
                            background: "linear-gradient(135deg, #e8003d, #b5002e)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: 14,
                            color: "#fff", fontSize: 12, fontFamily: F,
                            fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer",
                            boxShadow: "0 0 24px rgba(232,0,61,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                            whiteSpace: "nowrap", flexShrink: 0,
                        }}
                    >
                        <Plus size={15} />
                        Create Tournament
                    </motion.button>
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
                {[
                    { label: "Total", value: tournaments.length, icon: <Trophy size={14} />, color: "#e8003d" },
                    { label: "Live",  value: tournaments.filter(t => t.status === "ONGOING").length, icon: <Zap size={14} />, color: "#ff6030" },
                    { label: "Open",  value: tournaments.filter(t => t.status === "REGISTRATION_OPEN").length, icon: <Plus size={14} />, color: "#9b6dff" },
                ].map(s => (
                    <div key={s.label} style={{
                        padding: "14px 18px",
                        border: `1px solid ${s.color}22`,
                        borderRadius: 14,
                        background: `${s.color}0a`,
                        backdropFilter: "blur(12px)",
                        display: "flex", alignItems: "center", gap: 12,
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: `${s.color}20`, border: `1px solid ${s.color}40`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: s.color,
                        }}>{s.icon}</div>
                        <div>
                            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</p>
                            <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Tournament cards ── */}
            <div style={{ display: "grid", gap: 18 }}>
                {tournaments.map((tournament, index) => (
                    <motion.div
                        key={tournament._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06, duration: 0.35 }}
                    >
                        <HostTournamentCard tournament={tournament} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}