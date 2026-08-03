/**
 * HostTournamentCard — Electric Border × Gaming glass × Host branding
 */
import { Calendar, Trophy, Users, ArrowRight, Swords, Zap, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ElectricCard from "../../ui/ElectricCard";
import RegistrationProgress from "./RegistrationProgress";
import StatusBadge from "./StatusBadge";

const F = '"Space Mono", monospace';

function shortFormat(format = "") {
    return format === "SINGLE_ELIMINATION" ? "SE"
        : format === "DOUBLE_ELIMINATION" ? "DE"
        : format;
}

export default function HostTournamentCard({ tournament }) {
    const navigate  = useNavigate();
    const isLive    = tournament.status === "ONGOING";
    const registered = tournament.registrationCount ?? tournament.registeredTeams?.length ?? 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <ElectricCard
                color={isLive ? "#ff2060" : "#e8003d"}
                color2={isLive ? "#ff8020" : "#9b6dff"}
                speed={isLive ? 4 : 8}
                rounded={20}
                gap={1.5}
                glow={isLive ? 0.38 : 0.22}
                style={{ fontFamily: F }}
            >
                <div style={{ padding: "26px 28px 24px", position: "relative" }}>
                    {/* ── Top row: icon + title + status ── */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
                            <div style={{
                                width: 52, height: 52, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                borderRadius: 16,
                                background: isLive
                                    ? "linear-gradient(145deg, rgba(255,32,96,0.25), rgba(255,128,32,0.12))"
                                    : "linear-gradient(145deg, rgba(232,0,61,0.22), rgba(155,109,255,0.1))",
                                border: `1px solid ${isLive ? "rgba(255,32,96,0.45)" : "rgba(232,0,61,0.38)"}`,
                                boxShadow: `0 0 18px ${isLive ? "rgba(255,32,96,0.35)" : "rgba(232,0,61,0.25)"}`,
                                color: isLive ? "#ff6080" : "#e8003d",
                            }}>
                                <Swords size={22} />
                            </div>

                            <div style={{ minWidth: 0 }}>
                                <h2 style={{
                                    fontSize: 20, fontWeight: 700, color: "#fff",
                                    letterSpacing: "-0.02em", lineHeight: 1.15,
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                }}>
                                    {tournament.name}
                                </h2>
                                <p style={{
                                    marginTop: 7, fontSize: 12, color: "rgba(255,255,255,0.4)",
                                    lineHeight: 1.6,
                                    display: "-webkit-box", WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical", overflow: "hidden",
                                }}>
                                    {tournament.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        <div style={{ flexShrink: 0 }}>
                            <StatusBadge status={tournament.status} />
                            {isLive && (
                                <div style={{
                                    marginTop: 8, display: "flex", alignItems: "center", gap: 5,
                                    padding: "4px 10px", borderRadius: 999,
                                    background: "rgba(255,32,96,0.15)",
                                    border: "1px solid rgba(255,32,96,0.45)",
                                    fontSize: 9, color: "#ff6080", fontWeight: 700, letterSpacing: "0.14em",
                                }}>
                                    <Zap size={9} fill="#ff6080" />
                                    LIVE
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Registration progress ── */}
                    <div style={{ marginBottom: 20 }}>
                        <RegistrationProgress
                            registered={registered}
                            maxTeams={tournament.maxTeams}
                        />
                    </div>

                    {/* ── Stat chips ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 22 }}>
                        {[
                            { icon: <Users size={13} />,   label: "TEAMS",  value: `${registered}/${tournament.maxTeams}` },
                            { icon: <Trophy size={13} />,  label: "PRIZE",  value: `₹${Number(tournament.prizePool || 0).toLocaleString("en-IN")}` },
                            { icon: <Calendar size={13} />, label: "STARTS", value: new Date(tournament.tournamentStart).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) },
                        ].map(s => (
                            <div key={s.label} style={{
                                padding: "10px 12px",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 13,
                                background: "rgba(255,255,255,0.025)",
                                backdropFilter: "blur(8px)",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.38)", marginBottom: 6 }}>
                                    {s.icon}
                                    <span style={{ fontSize: 8.5, letterSpacing: "0.1em" }}>{s.label}</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* ── CTA ── */}
                    <button
                        onClick={() => navigate(`/host/tournaments/${tournament._id}`)}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            padding: "12px 0",
                            background: "linear-gradient(135deg, rgba(232,0,61,0.18) 0%, rgba(232,0,61,0.08) 100%)",
                            border: "1px solid rgba(232,0,61,0.38)",
                            borderRadius: 14,
                            color: "#fff", fontSize: 12, fontFamily: F,
                            fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em",
                            transition: "all 0.25s ease",
                            backdropFilter: "blur(8px)",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "linear-gradient(135deg, #e8003d, #b5002e)";
                            e.currentTarget.style.boxShadow = "0 0 22px rgba(232,0,61,0.45)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "linear-gradient(135deg, rgba(232,0,61,0.18) 0%, rgba(232,0,61,0.08) 100%)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <Settings2 size={14} />
                        Manage Tournament
                        <ArrowRight size={14} />
                    </button>
                </div>
            </ElectricCard>
        </motion.div>
    );
}