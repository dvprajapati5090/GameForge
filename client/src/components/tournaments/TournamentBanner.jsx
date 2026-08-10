/**
 * TournamentBanner — Premium default banner when no banner image is uploaded
 */
import { Shield } from "lucide-react";

function DefaultBanner({ tournament }) {
    return (
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
            {/* Base dark gradient */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #0a0010 0%, #12001a 30%, #0e000d 60%, #080008 100%)",
            }} />

            {/* Dot grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(232,0,61,0.2) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
            }} />

            {/* Diagonal accent lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
                <line x1="-5%" y1="110%" x2="55%"  y2="-10%" stroke="rgba(232,0,61,0.15)" strokeWidth="1.5" />
                <line x1="15%"  y1="110%" x2="75%"  y2="-10%" stroke="rgba(232,0,61,0.08)" strokeWidth="1" />
                <line x1="40%"  y1="110%" x2="100%" y2="-10%" stroke="rgba(192,192,192,0.06)" strokeWidth="1" />
                <line x1="65%"  y1="110%" x2="120%" y2="-10%" stroke="rgba(124,58,237,0.06)" strokeWidth="1" />
            </svg>

            {/* Red glow top-left */}
            <div style={{
                position: "absolute", top: -40, left: "15%",
                width: 400, height: 200, borderRadius: "50%",
                background: "rgba(232,0,61,0.1)", filter: "blur(70px)",
            }} />
            {/* Purple glow bottom-right */}
            <div style={{
                position: "absolute", bottom: -40, right: "10%",
                width: 350, height: 180, borderRadius: "50%",
                background: "rgba(124,58,237,0.08)", filter: "blur(60px)",
            }} />

            {/* Large Shield watermark */}
            <div style={{
                position: "absolute", right: 60, top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.06, pointerEvents: "none",
            }}>
                <Shield size={260} color="#e8003d" />
            </div>

            {/* Centre text: game name */}
            <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 10,
            }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                }}>
                    <Shield size={28} color="rgba(232,0,61,0.7)" />
                    <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: "0.3em",
                        color: "rgba(232,0,61,0.5)",
                        fontFamily: '"Space Mono", monospace',
                        textTransform: "uppercase",
                    }}>
                        GAMEFORGE TOURNAMENT
                    </span>
                </div>
                {tournament?.game && (
                    <span style={{
                        fontSize: 13, fontWeight: 700, letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.12)",
                        fontFamily: '"Space Mono", monospace',
                        textTransform: "uppercase",
                    }}>
                        {tournament.game}
                    </span>
                )}
            </div>

            {/* Bottom red line */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 2,
                background: "linear-gradient(90deg, transparent 0%, #e8003d 30%, rgba(232,0,61,0.4) 70%, transparent 100%)",
            }} />
        </div>
    );
}

/** Shield icon used as team logo fallback */
export function TeamLogoFallback({ name, size = 56 }) {
    const initial = name?.charAt(0)?.toUpperCase() || "?";
    return (
        <div style={{
            width: size, height: size,
            borderRadius: 12,
            background: "linear-gradient(135deg, #1a0008 0%, #3a0015 50%, #e8003d22 100%)",
            border: "1px solid rgba(232,0,61,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            position: "relative", overflow: "hidden",
        }}>
            <Shield size={size * 0.45} color="rgba(232,0,61,0.35)" style={{ position: "absolute" }} />
            <span style={{
                fontSize: size * 0.38, fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                fontFamily: '"Space Mono", monospace',
                position: "relative", zIndex: 1,
            }}>
                {initial}
            </span>
        </div>
    );
}

export default function TournamentBanner({ tournament }) {
    return (
        <div style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(232,0,61,0.2)",
            background: "#08000f",
        }}>
            {/* Banner image / default */}
            <div style={{ position: "relative", height: 280 }}>
                {tournament.banner ? (
                    <img
                        src={tournament.banner}
                        alt={tournament.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                ) : (
                    <DefaultBanner tournament={tournament} />
                )}
            </div>

            {/* Info row below banner */}
            <div style={{
                padding: "20px 28px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "rgba(7,0,10,0.9)",
                borderTop: "1px solid rgba(232,0,61,0.15)",
            }}>
                <div>
                    <h2 style={{
                        fontSize: 22, fontWeight: 700, color: "#fff",
                        fontFamily: '"Space Mono", monospace',
                        letterSpacing: "-0.02em",
                    }}>
                        {tournament.name}
                    </h2>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.06em" }}>
                        {tournament.game}
                    </p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                        color: tournament.status === "LIVE" ? "#22c55e"
                            : tournament.status === "COMPLETED" ? "#fbbf24"
                            : "rgba(192,192,192,0.5)",
                        textTransform: "uppercase",
                    }}>
                        {tournament.status?.replace("_", " ")}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#ffc107", marginTop: 4 }}>
                        ₹{Number(tournament.prizePool || 0).toLocaleString("en-IN")}
                    </div>
                </div>
            </div>
        </div>
    );
}